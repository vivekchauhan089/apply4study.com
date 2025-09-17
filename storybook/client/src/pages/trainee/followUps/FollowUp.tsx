import { useQuery } from '@tanstack/react-query';

import { FiSend } from 'react-icons/fi';

import { useState } from 'react';

import { Modal } from 'react-bootstrap';

import styles from './FollowUp.module.scss';

import { AllReport, Message, Report } from '@/interfaces/reports.interface';
import { UseUser } from '@/store/userStore';
import { ReportDataService } from '@/services/axios/dataServices/ReportDataService';
import { getRequest } from '@/services/axios/http-verbs';

import usePostQuery from '@/hooks/usePostQuery';
import { TraineeRoutes } from '@/services/axios/dataServices/TraineeDataService';
import { HttpResponse } from '@/interfaces/response.interface';
import { ITrainee } from '@/interfaces/course.interface';
import LoaderComponent from '@/components/loader/loaderComponent/LoaderComponent';
import ErrorMessage from '@/components/error/message/ErrorMessage';

async function getReport(id: string) {
  const report = ReportDataService.GET.getReportById;

  report.URL = `/report/${id}`;

  const response = await getRequest<HttpResponse<Report>>(report);

  const person = TraineeRoutes.GET.getTrainee;
  person.URL = `/trainee/${response?.data?.data?._user as unknown as string}`;

  const person2 = await getRequest<HttpResponse<ITrainee>>(person);

  return {
    report: response?.data?.data,
    img: person2?.data?.data?.profileImage
  };
}

export default function FollowUp(props: {
  report: AllReport;
  func: () => void;
  trainee: string;
}) {
  const user = UseUser();

  const [txt, setTxt] = useState<string>('');

  const [update, setUpdate] = useState(0);

  const { data } = useQuery(
    ['follow-ups', update, location, props?.report?._id],
    () => getReport(props?.report?._id),
    {
      cacheTime: 1000 * 60 * 60 * 24,
      retryDelay: 1000,
      enabled: true // 1 second
    }
  );

  function closeModal() {
    setUpdate(update + 1);
    props?.func();
  }

  const { mutateAsync: sendMessage, isLoading, isError } = usePostQuery();

  const report = data?.report as unknown as AllReport;

  let i = -1;
  const img =
    props?.trainee == 'true'
      ? 'https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg?w=640'
      : data?.img;

  const toShow =
    report?.followUp?.length > 0 ? (
      report?.followUp?.map((message: Message) => {
        const sender: boolean = (props?.trainee == 'true') !== message?.isAdmin;

        return (
          <div key={++i} className='row my-2'>
            <div className='col-1'>
              {!sender && (
                <img
                  alt={'Some Dude'}
                  height='35'
                  src={img}
                  style={{ borderRadius: '50px' }}
                  width='40'
                />
              )}
            </div>
            <div
              className={`col-11 d-flex ${
                sender ? 'justify-content-end' : 'justify-content-start'
              }`}
            >
              <div
                className={` ${
                  sender ? styles.sender || '' : styles.receiver || ''
                }`}
                style={{ minWidth: '3rem', padding: '0.5rem 0.7rem' }}
              >
                {message.content}
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <div
        className='text-center alert alert-primary'
        style={{ fontSize: '1.5rem', fontWeight: '500', marginTop: '2rem' }}
      >
        No Follow Ups with the {props?.trainee == 'true' ? 'Admin' : 'User'}
      </div>
    );

  async function SendMessage() {
    const message = ReportDataService.POST.sendMessage;

    message.URL = `/report/${report?._id}/user/${user?._id as string}`;

    message.payload = {
      content: `${txt}`
    };

    const dd = await sendMessage(message);
    console.log(dd);
    setUpdate(update + 1);
    setTxt('');
  }

  return (
    <>
      <Modal show onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Follow Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='container mx-auto' style={{ maxWidth: '40rem' }}>
            {/*<div
          className='text-center'
          style={{
            fontSize: '1.5rem',
            fontWeight: '500',
            color: '#a00407',
            marginBottom: '2rem'
          }}
        >
          Follow Ups with the {props?.trainee == 'true' ? 'Admin' : 'User'}
        </div>*/}
            <div className={styles.message_holder}>
              {isError && <ErrorMessage />}
              {isLoading && <LoaderComponent />}
              {!isError && !isLoading && report && toShow}
              <div id='scroll-here' />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className={styles.send_message}>
            <textarea
              className={styles.message}
              value={txt}
              onChange={e => setTxt(e.target.value)}
            />
            <button
              style={{ border: 'none' }}
              type='button'
              onClick={() => SendMessage()}
            >
              <FiSend style={{ color: '#a00407', fontSize: '1.4rem' }} />
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
