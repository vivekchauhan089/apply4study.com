import TopRatedCourses from './TopRatedCoursesSection';

import TopInstructorsSection from './topInstructorsSection/TopInstructorsSection';

import TestmonialSection from './testmonialSection/TestmonialSection';

import FeatureSection from './featureSection/FeatureSection';

import MainSection from './mainSection/MainSection';

import Based from './basedOnYourChoices/Based';
import MostPopularCoursesSection from './MostPopularCoursesSection';

import CarouselComponent from '@/components/carousel/CarouselComponent';
/* import Sponsers from './sponsers/Sponsers';
 */
/* import InstructorBillboard from '@/components/instructorBillboard/InstructorBillboard';
 */
function Landing() {
  return (
    <>
      <MainSection />
      <FeatureSection />
      {/*       <InstructorBillboard />
       */}
      <TopRatedCourses />
      <MostPopularCoursesSection />
      <Based />
      <CarouselComponent />
      <TopInstructorsSection />
      <TestmonialSection />
    </>
  );
}

export default Landing;
