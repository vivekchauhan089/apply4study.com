// eslint-disable-next-line import/no-cycle
import { CourseCardPreview } from './CourseCard';

import { CourseCardProps } from '@/pages/guest/landing/types';

function CourseCardOverlay(props: CourseCardProps) {
  return (
    <div
      className='text-dark text-start p-2 bg-light card shadow'
      style={{
        width: '100%',
        height: '100%'
      }}
    >
      <h4>{props.title}</h4>
      <CourseCardPreview
        image={props.image}
        previewVideoURL={props.previewVideoURL}
        title={props.title}
      />
      <hr />
      <p>{props.description}</p>
      {props.outline?.length ? (
        <ul className='list-group card shadow'>
          {props.outline.slice(0, 3).map(o => (
            <li key={o} className='list-group-item  border-0'>
              {' '}
              &#x2713; &nbsp; {o}
            </li>
          ))}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
}

export default CourseCardOverlay;
