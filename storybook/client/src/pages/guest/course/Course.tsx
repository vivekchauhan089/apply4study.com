import { useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';

import CourseContent from './CourseContent';
import CourseOverview from './CourseOverview';
import CourseHeader from './CourseHeader';

import CourseReviewList from './CourseReviewList';
import CoursePreviewBox from './CoursePreviewBox';

import styles from './course.module.scss';

import CourseFooter from './CourseFooter';

import { getCourseByID } from '@/services/axios/dataServices/CoursesDataService';
import { UseCountry } from '@/store/countryStore';

import { UseCacheStoreSetData } from '@/store/cacheStore';
import ErrorMessage from '@/components/error/message/ErrorMessage';
import Loader from '@/components/loader/loaderpage/Loader';

function Course() {
  const country = UseCountry();
  const { courseid } = useParams();
  const { isError, isLoading, data } = useQuery(
    ['courseByID', courseid, country],
    () => getCourseByID(courseid, country)
  );

  const useCacheStoreSetData = UseCacheStoreSetData();

  if (isError) {
    return <ErrorMessage />;
  }
  if (isLoading) {
    return <Loader />;
  }
  if (!data) {
    return <></>;
  }
  const category = data?.category;
  const subCategory = data?.subcategory.at(0);
  if (category && subCategory) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCacheStoreSetData({
      category: category,
      subCategory: subCategory
    });
  }

  return (
    <div>
      <div className={`${styles['preview-box-container'] ?? ''} mt-4`}>
        <CoursePreviewBox {...data} />
      </div>
      <div className='bg-dark'>
        <div className='container'>
          <div className={`${styles['content-container'] ?? ''}`}>
            <CourseHeader
              videoClassName={`${
                styles['header-preview-video-container'] ?? ''
              }`}
              {...data}
            />
          </div>
        </div>
      </div>
      <div className='container'>
        <div className={`${styles['content-container'] ?? ''}`}>
          <section>
            <CourseOverview {...data} />
          </section>
          <section>
            <CourseContent {...data} />
          </section>
          <a
            href='/'
            id='reviews'
            style={{
              display: 'block',
              position: 'relative',
              top: '-57px',
              visibility: 'hidden'
            }}
          >
            Reviews
          </a>
          <section>
            <CourseReviewList id={data._id} />
          </section>
        </div>
      </div>
      <div className={`${styles['footer-container'] ?? ''}`}>
        <CourseFooter {...data} />
      </div>
    </div>
  );
}

export default Course;
