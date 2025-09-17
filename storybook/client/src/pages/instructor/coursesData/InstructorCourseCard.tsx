/* eslint-disable sonarjs/cognitive-complexity */

import { BsFillTrashFill } from 'react-icons/bs';

import { Link } from 'react-router-dom';

import { useCallback, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { Modal } from 'react-bootstrap';

import { AiOutlineWarning } from 'react-icons/ai';

import styles from './InstructorCourseCard.module.scss';

import { formatCurrency } from '@/utils/currency';
import { deleteCourse } from '@/services/axios/dataServices/CoursesDataService';
import { CourseDiscount } from '@/interfaces/course.interface';
import { ITeachedCourse } from '@/interfaces/instructor.interface';
import ShareButton from '@/components/buttons/shareButton/ShareButton';

function getOriginalPrice(
  price: number,
  discounts: CourseDiscount[]
): number | undefined {
  if (!discounts?.length) {
    return undefined;
  }
  const now = new Date();
  const discount = discounts.find(
    d => new Date(d?.startDate) <= now && new Date(d?.endDate) > now
  );
  if (!discount) {
    return undefined;
  }
  return (price / (100 - discount.percentage)) * 100;
}

function InstructorCourseCard(props: ITeachedCourse) {
  const data = props?._course ?? '';
  const earned = props.earning;
  const photo = data?.thumbnail ?? '';
  const title = data?.title ?? '';
  const price = data?.price ?? '';
  const enrolled = data?.numberOfEnrolledTrainees ?? 0;
  const averageExamGrades = data?.examGrades?.average ?? 0;
  const rating = data?.rating?.averageRating ?? '';
  const discount = data?.price?.discounts;
  const oldPrice = getOriginalPrice(price.currentValue, discount);
  const courseId = data._id;
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const showDeleteConfirmation = useCallback(() => {
    setModalOpen(true);
  }, [setModalOpen]);
  const closeDeleteConfirmation = useCallback(() => {
    setModalOpen(false);
  }, [setModalOpen]);
  const callDeleteCourse = useCallback(async () => {
    closeDeleteConfirmation();
    await deleteCourse(courseId);
    await queryClient.invalidateQueries({
      queryKey: ['search-instructor-courses'],
      exact: false
    });
  }, [courseId, queryClient, closeDeleteConfirmation]);
  if (!props._course.price) return <></>;
  return (
    <div className={`${styles.cardContainer ?? ''}`}>
      <div
        className={`rows d-flex flex-column  mx-auto px-0 my-3 d-flex flex-md-row flex-column`}
        style={{ minHeight: '8rem' }}
      >
        <div
          className={`col d-flex  align-center ${styles.border_div || ''}`}
          style={{ height: '8rem', paddingLeft: '0' }}
        >
          <div>
            <img
              alt='course'
              className='img-fluid'
              src={photo}
              style={{
                height: '8rem',
                objectFit: 'fill'
              }}
            />
          </div>

          <div
            className='p-2 d-flex flex-column justify-content-around'
            style={{ width: '90%' }}
          >
            <h6 className={styles.courseTitle}>{title}</h6>
            <div className='d-flex align-items-center justify-content-between'>
              <div
                className={`bg-primary px-2 rounded-pill text-white

                 ${styles.fnt_sm || ''}`}
              >
                live
              </div>
              <div className={styles.fnt_sm}>
                <div
                  style={{
                    textDecoration: 'line-through',
                    display: 'inline-block'
                  }}
                >
                  {formatCurrency(oldPrice, price.currency)}
                </div>
                &nbsp;&nbsp;
                {formatCurrency(
                  price?.currentValue ? price.currentValue : 0,
                  price?.currency ? price.currency : 'US'
                )}{' '}
              </div>
            </div>
          </div>
        </div>
        <hr className={`d-md-block d-none ${styles.hr || ''}`} />
        <div
          className={`col d-flex align-center px-0 border-top border-bottom border-primary ${
            styles.border_div || ''
          }`}
          style={{ height: '8rem' }}
        >
          <div className={`col ${styles.altCol || ''}`}>
            <div className={styles.sec}>
              <div className={styles.partOne}>Total earned</div>
              <div>
                <h5>{formatCurrency(earned, price.currency)} </h5>
              </div>
            </div>
          </div>
          <hr className={styles.hr} />
          <div className={`col ${styles.altCol || ''}`}>
            <div className={styles.sec}>
              <div className={styles.partOne}>Enrolled students</div>
              <div>
                <h4>{enrolled}</h4>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`col d-flex align-center px-0 border-top border-bottom border-primary ${
            styles.border_div || ''
          }`}
          style={{ height: '8rem' }}
        >
          <hr className={`d-md-block d-none  ${styles.hr || ''}`} />
          <div className={`col  ${styles.altCol || ''}`}>
            <div className={styles.sec}>
              <div className={styles.partOne}>Course rating</div>
              <div>
                <h4>{rating}</h4>
              </div>
            </div>
          </div>
          <hr className={styles.hr} />
          <div className={`col ${styles.altCol || ''}`}>
            <div className={styles.sec}>
              <div
                className={`${
                  styles.partOne ?? ''
                } d-flex justify-content-center`}
              >
                Average Exam Grades
              </div>
              <div>
                <h4>{averageExamGrades}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.cardButtons ?? ''}`}>
        <Link className='btn btn-primary btn-lg' to={`/course/${data?._id}`}>
          View Course
        </Link>
        <Link
          to={`/instructor/hussein/${props._course.title}/${props._course._id}`}
        >
          <button className='btn btn-primary btn-lg' type='button'>
            Discounts
          </button>
        </Link>

        <ShareButton link={`course/${courseId}`} />
        <button
          className='btn btn-secondary btn-lg ms-3'
          type='button'
          onClick={showDeleteConfirmation}
        >
          Delete
          <BsFillTrashFill />
        </button>
      </div>
      <Modal show={modalOpen} onHide={closeDeleteConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>
            <span className='text-dark'>Confirm Course Deletion</span>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h1 className='text-center text-danger'>
            <AiOutlineWarning />
          </h1>
          <p className='text-danger' role='alert'>
            Are you sure you want to delete this course? This action cannot be
            undone!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button
            className='btn btn-danger'
            type='button'
            onClick={callDeleteCourse}
          >
            Yes
          </button>
          <button
            className='btn btn-secondary'
            type='button'
            onClick={closeDeleteConfirmation}
          >
            No
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default InstructorCourseCard;
