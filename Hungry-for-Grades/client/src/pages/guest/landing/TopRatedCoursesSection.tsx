import { useQuery } from '@tanstack/react-query';

import { Link } from 'react-router-dom';

import { mapCourseToCardProps } from './types';

import CourseCard from '@/components/courseCard/CourseCard';

import LoaderCards from '@/components/loader/loaderCard/LoaderCards';
import { getTopRatedCourses } from '@/services/axios/dataServices/CoursesDataService';
import { UseCountry } from '@/store/countryStore';

function TopRatedCourses() {
  const country = UseCountry();
  const { data, isLoading, isError } = useQuery(['topRated', country], () =>
    getTopRatedCourses(country, 1)
  );
  const coursesMapped = data?.data.map(mapCourseToCardProps);
  if (isLoading) {
    return (
      <div className='container'>
        <LoaderCards numberOfCards={6} />
      </div>
    );
  } else if (isError) {
    return <></>;
  } else if (coursesMapped) {
    return (
      <section className='container' id='rated-courses'>
        <h2 className='text-dark text-left mb-2'>Top Rated Courses</h2>
        <div className='row'>
          {coursesMapped?.map(course => (
            <div key={course.id} className='col-12 col-md-6 col-lg-4'>
              <CourseCard enrolled={false} percent={-1} pprops={course} />
            </div>
          ))}
        </div>
        <p className='text-end'>
          <Link
            style={{
              zIndex: '999'
            }}
            to='/courses'
          >
            View all courses
          </Link>
        </p>
      </section>
    );
  }
  return <></>;
}

export default TopRatedCourses;
