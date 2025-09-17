import StarRatings from 'react-star-ratings';

import useQueryGetInstructor from './useQueryGetInstructor';

import styles from './Main.module.scss';

import ReviewList from '@/pages/InstructorProfile/ReviewList';
import { UseUser } from '@/store/userStore';
import { IUser } from '@/interfaces/user.interface';

export default function Main() {
  const user = UseUser();

  const data = useQueryGetInstructor(user as IUser);

  const info = data?.data?.data?.data;

  return (
    <div
      className='py-5'
      style={{
        backgroundColor: '#F8F9FA'
      }}
    >
      <div className={`${styles.container ?? ''} container`}>
        <div>
          <h2 style={{ fontSize: '1.5rem' }}>Rating:</h2>
          <div>
            <span style={{ fontSize: '25px', fontWeight: '500' }}>
              {' '}
              {info?.rating.averageRating}{' '}
            </span>
            <StarRatings
              numberOfStars={5}
              rating={info?.rating.averageRating}
              starDimension='40px'
              starRatedColor='rgb(229, 152, 25)'
              starSpacing='0px'
            />
          </div>
          <hr style={{ color: 'white' }} />
          <hr style={{ color: 'white' }} />
          <hr style={{ color: 'white' }} />
          <div>
            <h2 style={{ fontSize: '1.5rem' }}>Reviews:</h2>
            <ReviewList text={user?._id as string} />
          </div>
        </div>
      </div>
    </div>
  );
}
