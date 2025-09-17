/* eslint-disable css-modules/no-unused-class */
import { Field, Form, Formik } from 'formik';
import { useCallback, useState } from 'react';
//import Modal from 'react-modal';

import StarRatingComponent from 'react-star-rating-component';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-toastify';

import { Modal } from 'react-bootstrap';

import styles from './rate-course.module.scss';

import Loader from '@/components/loader/loaderpage/Loader';
import { toastOptions } from '@/components/toast/options';
import { useTraineeId } from '@/hooks/useTraineeId';
import { ICourseReview, ITrainee, Review } from '@/interfaces/course.interface';
import {
  addReviewToCourse,
  deleteCourseReview,
  getTraineeReviewById,
  updateCourseReview
} from '@/services/axios/dataServices/TraineeDataService';

const ratingNames = ['Awful', 'Poor', 'Average', 'Very good', 'Excellent'];

function RateCourse(props: { courseid: string }) {
  const traineeId = useTraineeId();
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery(
    ['getMyCourseReview', props.courseid],
    () => getTraineeReviewById(props.courseid, traineeId)
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [starTempValue, setStarTempValue] = useState<number | null>(null);
  const openPopup = useCallback(() => setModalOpen(true), [setModalOpen]);
  const closePopup = useCallback(() => setModalOpen(false), [setModalOpen]);
  const deleteReview = async () => {
    try {
      await deleteCourseReview(props.courseid, traineeId);
      queryClient.removeQueries(['getMyCourseReview', props.courseid]);
      toast('Review deleted successfully', toastOptions);
    } catch {
      toast.error('Error deleting review', toastOptions);
    }
    closePopup();
  };
  const submitRating = useCallback(
    async (review: ICourseReview) => {
      if (!review.rating) {
        return;
      }
      const r = !data
        ? {
            _trainee: { _id: review._traineeId } as ITrainee,
            comment: review.comment,
            createdAt: review.createdAt,
            rating: review.rating
          }
        : {
            comment: review.comment,
            rating: review.rating
          };

      const res = await (data
        ? updateCourseReview(props.courseid, review._traineeId, r)
        : addReviewToCourse(props.courseid, r as Review));
      if (!res) {
        toast.error('Error submitting review', toastOptions);
        closePopup();
      }
      if (res) {
        toast('Review submitted successfully', toastOptions);
        closePopup();
        queryClient.removeQueries(['getMyCourseReview', props.courseid]);
      }
    },
    [props.courseid, closePopup, queryClient, data]
  );
  const resetTempStarValue = useCallback(
    () => setStarTempValue(null),
    [setStarTempValue]
  );
  if (isLoading) {
    return (
      <div className='container'>
        <Loader />
      </div>
    );
  } else if (isError) {
    return <></>;
  }
  const initialValues = !data
    ? {
        _traineeId: traineeId,
        comment: '',
        createdAt: new Date(),
        rating: 0
      }
    : {
        _traineeId: traineeId,
        comment: data.comment,
        createdAt: data.createdAt,
        rating: data.rating
      };
  const value = !data ? undefined : data.rating;
  return (
    <>
      {value !== undefined ? (
        <div className='text-star mx-2 btn btn-link'>
          <button
            style={{
              border: 'none'
            }}
            type='button'
            onClick={openPopup}
          >
            <strong style={{ fontSize: '0.9rem', lineHeight: '0' }}>
              Your Review:
            </strong>
            <h6
              className={`${styles['rating-container'] ?? ''} mx-1`}
              style={{ lineHeight: '-1' }}
            >
              <StarRatingComponent
                editing={
                  false
                } /* is component available for editing, default `true` */
                name='currentRating' /* name of the radio input, it is required */
                value={
                  value
                } /* number of selected icon (`0` - none, `1` - first) */
              />
            </h6>
          </button>
        </div>
      ) : (
        <button
          className='text-dark mx-2 btn btn-link'
          style={{ textDecoration: 'none' }}
          type='button'
          onClick={openPopup}
        >
          <div>Rate course</div>
        </button>
      )}
      <Modal show={modalOpen} onHide={closePopup}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Your Review</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Formik initialValues={initialValues} onSubmit={submitRating}>
            {formikProps => (
              <Form>
                <div className='py-2'>
                  <h4 className='text-center'>Enter your review</h4>
                  <h6 className='text-center'>
                    {ratingNames[
                      (starTempValue ?? formikProps.values.rating) - 1
                    ] ?? 'Not rated'}
                  </h6>
                  <h1 className='text-center'>
                    <StarRatingComponent
                      editing /* is component available for editing, default `true` */
                      name='newRating' /* name of the radio input, it is required */
                      value={
                        starTempValue === null
                          ? formikProps.values.rating
                          : starTempValue
                      } /* number of selected icon (`0` - none, `1` - first) */
                      // eslint-disable-next-line react/jsx-no-bind
                      onStarClick={nextValue => {
                        formikProps.setValues({
                          ...formikProps.values,
                          rating: nextValue
                        });
                      }}
                      onStarHover={setStarTempValue}
                      onStarHoverOut={resetTempStarValue}
                    />
                  </h1>
                  <div className='form-group mx-4'>
                    <Field
                      className='form-control'
                      component='textarea'
                      name='comment'
                      placeholder='Tell us your opinion about this course.'
                    />
                  </div>
                  <Modal.Footer>
                    <button className='btn btn-primary' type='submit'>
                      Submit Review
                    </button>
                    {data && (
                      <button
                        className='btn btn-secondary'
                        type='button'
                        onClick={deleteReview}
                      >
                        Delete Review
                      </button>
                    )}
                  </Modal.Footer>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RateCourse;
