import React, { useEffect, useState } from 'react';

import CoursePlayer from "./CoursePlayer";

const AvailableCourses = () => {
    const [activeTab, setActiveTab] = useState('popular');

    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [playingVideo, setPlayingVideo] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8083/api/courses", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMjM0LCJ1c2VyX3R5cGVfaWQiOjAsInJvbGUiOiJndWVzdCIsImlhdCI6MTc1ODg4NDcwOCwiZXhwIjoxNzY0MDY4NzA4fQ.zWg19kpqcRf0sxKzrioWP_HzogoC5fHQPeGHTE6nZpc" // token in header
            },
            body: JSON.stringify({
                "user_id": "68d27fa20a1b391f84d652ba",
                "source": "Livguard"
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.data) {
              setCourses(data.data);
            } else {
              console.error("Error:", data.error);
            }
        })
        .catch(err => console.error(err));
    }, []);

    const handlePlay = (course, video) => {
        setSelectedCourse({
            courseId: course._id,
            lessons: course.videos.map(v => ({
              id: v._id.toString(),
              title: v.name,
              src: v.url
            })),
            startLessonId: video._id.toString()
        });
    };

    const chunkArray = (arr, size) => {
      const result = [];
      for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
      }
      return result;
    };


    const closeModal = () => setSelectedCourse(null);

    return (
        <section className="course-posts section light-background">
            <div className="container mx-auto p-4">
                <div className="section-title" data-aos="fade-up">
                    <h5>Popular Courses</h5>
                    <p>We offer a variety of courses to suit your learning needs. Explore our options and find the perfect fit for you.</p>
                </div>

                {/* Tab Buttons */}
                <div className="text-center mb-5 tabs">
                    <button className={`btn theme-btn mx-2 ${activeTab === 'popular' ? 'active' : ''}`} onClick={() => setActiveTab('popular')} >
                        For Students
                    </button>
                    <button className={`btn theme-btn mx-2 ${activeTab === 'recommended' ? 'active' : ''}`} onClick={() => setActiveTab('recommended')} >
                        For Teachers
                    </button>
                </div>
                {activeTab === 'popular' && (
                    <>
                        {chunkArray(courses, 3).map((row, rowIndex) => (
                        <div className="row gy-4 featured">
                            {row.map(course => (
                            <div className="col-lg-4">
                                <article>                                    
                                    <div className="post-img">
                                        <div>
                                            <img alt="" className="img-fluid" src={course.courseImage ?? '/static/media/blog-1.97a1a61032fc6b5b3c4c.jpg'} />
                                        </div>
                                    </div>                            
                                    <p className="post-category"> Study Tips</p>
                                    <h3 className="title mb-2">{course.courseName} - <sup>₹</sup>19<span>/month</span></h3>
                                    <a href="#" className="buy-btn">Enroll Now</a>
                                    <ul>
                                        {course.videos.map(video => (
                                          <li key={video.id} className="d-flex justify-content-between align-items-center">
                                            <span>
                                              <i className="bi bi-play-circle"></i> {video.title}
                                            </span>
                                            <button
                                              className="btn btn-sm btn-primary"
                                              onClick={() => handlePlay(course, video)} // use your play handler
                                            >
                                              ▶ Play
                                            </button>
                                          </li>
                                        ))}
                                    </ul>                                    
                                </article>
                            </div>
                            ))}
                        </div>
                        ))}
                    </>                        
                )}

                {activeTab === 'recommended' && (
                    <>
                        {chunkArray(courses, 3).map((row, rowIndex) => (
                        <div className="row gy-4 featured">
                            {row.map(course => (
                            <div className="col-lg-4">
                                <article>
                                    <div className="post-img">
                                        <div>
                                            <img alt="" className="img-fluid" src="/static/media/blog-1.97a1a61032fc6b5b3c4c.jpg" />
                                        </div>
                                    </div>                            
                                    <p className="post-category"> Study Tips</p>
                                    <h3 className="title mb-2">{course.courseName} - <sup>₹</sup>19<span>/month</span></h3>
                                    <a href="#" className="buy-btn">Enroll Now</a>
                                    <ul>
                                        {course.videos.map(video => (
                                          <li key={video.id} className="d-flex justify-content-between align-items-center">
                                            <span>
                                              <i className="bi bi-play-circle"></i> {video.name}
                                            </span>
                                            <button
                                              className="btn btn-sm btn-primary"
                                              onClick={() => handlePlay(video.url)} // use your play handler
                                            >
                                              ▶ Play
                                            </button>
                                          </li>
                                        ))}
                                    </ul>                                    
                                </article>
                            </div>
                            ))}
                        </div>
                        ))}
                    </>
                )}
            
                {/* Modal for Video Player */}
                {isModalOpen && currentLesson && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-[9999]">
                        <div className="relative bg-white rounded-lg shadow-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto p-4">
                            {/* Close button */}
                            <button
                              onClick={closeModal}
                              className="absolute top-3 right-3 text-gray-700 hover:text-black text-2xl"
                            >✖</button>

                            <CoursePlayer
                              userId="68d27fa20a1b391f84d652ba" // your real Mongo ObjectId
                              courseId={selectedCourse.courseId.toString()}
                              lessons={selectedCourse.lessons}
                              startLessonId={selectedCourse.startLessonId}
                            />
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AvailableCourses;
