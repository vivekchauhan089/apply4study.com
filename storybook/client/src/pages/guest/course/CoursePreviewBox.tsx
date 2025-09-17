import { MdOndemandVideo } from 'react-icons/md';

import { GrCertificate } from 'react-icons/gr';

import { CgInfinity } from 'react-icons/cg';

import { AiOutlineInfoCircle } from 'react-icons/ai';

import { toast } from 'react-toastify';

import styles from './course-preview-box.module.scss';

import { ICourse } from '@/interfaces/course.interface';
import Price from '@/components/courseCard/Price';
import { formatDuration } from '@/utils/duration';
import useCourseButtons from '@/hooks/useCourseButtons';
import {
  useWishListDeleteQuery,
  useCartDeleteQuery,
  addtoWishList,
  addtoCart
} from '@/components/courseCard/cardButtons/buttons';
import usePostQuery from '@/hooks/usePostQuery';
import {
  UseCartStoreInCart,
  UseCartStoreAddCourse,
  UseCartStoreRemoveCourse
} from '@/store/cartStore';
import { UseUser } from '@/store/userStore';
import {
  UseWishListAddCourse,
  UseWishListRemoveCourse,
  UseWishListInCart
} from '@/store/wishListStore';
import { ReportDataService } from '@/services/axios/dataServices/ReportDataService';
import { Reason, Status } from '@/interfaces/reports.interface';
import { toastOptions } from '@/components/toast/options';
import useRedirectToLogin from '@/hooks/useRedirectToLogin';

function parseYoutubeUrl(url: string) {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7]?.length == 11 ? match[7] : '';
}

function getEmbedUrl(url: string) {
  const id = parseYoutubeUrl(url);
  if (!id) {
    return '';
  }
  return `https://www.youtube.com/embed/${id}`;
}

function CoursePreviewBox(props: ICourse) {
  const redirectToLogin = useRedirectToLogin();
  const isInCart = UseCartStoreInCart()(props?._id);
  const addCourseToWishList = UseWishListAddCourse();
  const removeCourseToWishList = UseWishListRemoveCourse();
  const isInWishList = UseWishListInCart()(props?._id);
  const addCourseToCart = UseCartStoreAddCourse();
  const removeCourseToCart = UseCartStoreRemoveCourse();
  const user = UseUser();
  //Actual Post Requests
  const { mutateAsync: addToWishListFromTheButton } = usePostQuery();
  const { mutateAsync: addToCartFromTheButton } = usePostQuery();
  const { mutateAsync: makeCourseRequest } = usePostQuery();

  //console.log(isInCart);

  //Actual Delete
  const { refetch: actualDeleteWishList } = useWishListDeleteQuery(
    user?._id as string,
    props?._id
  );
  const { refetch: actualDeleteCart } = useCartDeleteQuery(
    user?._id as string,
    props?._id
  );

  async function requestAccessToCourse() {
    const req = ReportDataService.POST.makeReport;
    req.payload = {
      _course: props?._id,
      _user: user?._id,
      reason: Reason.COUSE_REQUEST,
      status: Status.UNSEEN
    };

    const ress = await toast.promise(
      makeCourseRequest(req),
      {
        pending: 'requesting access to this course ...'
      },
      toastOptions
    );

    if (!ress?.status)
      toast.error(
        'You have already requested access to this course before',
        toastOptions
      );
    else
      toast.success(
        'Your request is sent to the admin successfully',
        toastOptions
      );
  }

  const emberUrl = getEmbedUrl(props.previewVideoURL);
  const { requestAccess, viewCourse, addToCart, addToWishList } =
    useCourseButtons(props._id);
  return (
    <div className={`${styles['preview-box'] ?? ''} p-2 text-dark`}>
      <p
        style={{
          width: '90%',
          paddingBottom: '50.625%',
          margin: '0 auto'
        }}
      >
        {emberUrl && (
          <iframe
            allowFullScreen
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            src={emberUrl}
            style={{
              width: '100%',
              position: 'absolute',
              left: 0,
              top: 0,
              border: 0
            }}
            title={props.title}
          />
        )}
      </p>

      {!viewCourse && (
        <div className='mx-2'>
          <Price {...props.price} />
        </div>
      )}
      {addToCart && (
        <div className='my-2 text-center mx-2'>
          <button
            className='btn btn-dark my-1 w-100'
            type='button'
            onClick={async () => {
              if (!user) {
                redirectToLogin();
                return;
              }
              const xx = await addtoCart(
                props?._id,
                isInCart,
                isInWishList,
                user,
                addCourseToCart,
                removeCourseToWishList,
                removeCourseToCart,
                addToCartFromTheButton
              );
              if (xx == 1) {
                await actualDeleteCart();
              } else if (xx == 2) {
                await actualDeleteWishList();
              }
            }}
          >
            {!isInCart && <strong>Add to Cart</strong>}
            {isInCart && <strong>Remove from Cart</strong>}
          </button>
        </div>
      )}
      {addToWishList && (
        <div className='my-2 text-center mx-2'>
          <button
            className='btn btn-light border border-2 my-1 w-100'
            type='button'
            onClick={async () => {
              if (!user) {
                redirectToLogin();
                return;
              }
              const xx = await addtoWishList(
                props?._id,
                isInCart,
                isInWishList,
                user,
                addCourseToWishList,
                removeCourseToWishList,
                removeCourseToCart,
                addToWishListFromTheButton
              );
              if (xx == 1) {
                await actualDeleteCart();
              } else if (xx == 2) {
                //alert('I will Delete Back ' + props?.id);
                await actualDeleteWishList();
                //alert('Done');
              }
            }}
          >
            {!isInWishList && <strong>Add to Wishlist</strong>}
            {isInWishList && <strong>Remove from Wishlist</strong>}
          </button>
        </div>
      )}
      {requestAccess && (
        <div className='my-2 text-center mx-2'>
          <button
            className='btn btn-dark my-1 w-100'
            type='button'
            onClick={async () => {
              await requestAccessToCourse();
            }}
          >
            <strong>Request access</strong>
          </button>
        </div>
      )}
      {viewCourse && (
        <div className='my-2 text-start mx-2'>
          <AiOutlineInfoCircle />
          &nbsp;
          <small>You are already enrolled in this course.</small>
          <button
            className='btn btn-dark my-1 w-100'
            type='button'
            onClick={viewCourse}
          >
            Go to course
          </button>
        </div>
      )}
      <div className='text-dark mx-2 my-2'>
        <strong>This course includes:</strong>
        <br />
        <MdOndemandVideo />
        &nbsp;
        <span>
          {formatDuration((props.duration ?? 0) * 60)} on-demand video
        </span>
        <br />
        <CgInfinity />
        &nbsp;
        <span>Full lifetime access</span>
        <br />
        <GrCertificate />
        &nbsp;
        <span>Certificate of completion</span>
      </div>
    </div>
  );
}

export default CoursePreviewBox;
