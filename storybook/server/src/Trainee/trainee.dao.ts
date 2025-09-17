import { HttpException } from '@/Exceptions/HttpException';
import { UserRole } from '@/User/user.enum';
import { IUser } from '@/User/user.interface';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { isEmpty } from 'class-validator';
import { CartDTO, TraineeDTO, WishlistDTO } from './trainee.dto';
import { Cart, EnrolledCourse, INote, ITrainee, SubmittedQuestion, Wishlist } from './trainee.interface';
import traineeModel from './trainee.model';
import AuthService from '@Authentication/auth.dao';
import { PaginatedData } from '@/Utils/PaginationResponse';
import mongoose, { Types } from 'mongoose';
import courseModel from '@/Course/course.model';
import { ICourse, Price } from '@/Course/course.interface';
import { getConversionRate, getCurrentPrice, getPriceAfterDiscount } from '@Course/course.common';
import CourseService from '@/Course/course.dao';
import { sendCertificateEmail } from '@/Common/Email Service/email.template';

class TraineeService {
  public authService = new AuthService();
  public courseService = new CourseService();
  //create trainee service
  public createCorporateTrainee = async (traineeData: TraineeDTO): Promise<ITrainee> => {
    // User should be created before corporate trainee
    if (isEmpty(traineeData)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee data is empty');

    const createdCorporateTrainee = traineeModel.create({ ...traineeData, isCorporate: true });
    return createdCorporateTrainee;
  };

  //sign up individual trainee service
  public createIndividualTrainee = async (traineeData: TraineeDTO): Promise<ITrainee> => {
    if (isEmpty(traineeData)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee data is empty');

    const createdTrainee = traineeModel.create({ ...traineeData });
    return createdTrainee;
  };

  public getTraineeById = async (traineeId: string): Promise<ITrainee> => {
    const trainee: ITrainee = await traineeModel.findById(traineeId).select('-password');
    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee not found');

    return trainee;
  };
  public getTrainees = async (): Promise<ITrainee[]> => {
    const trainees = await traineeModel.find().select('-password ');

    return trainees;
  };
  // get how many trainees are active
  public getActiveTrainees = async (): Promise<number> => {
    return await traineeModel.count({ active: true });
  };

  // get how many trainees are inactive
  public getInactiveTrainees = async (): Promise<number> => {
    return await traineeModel.count({ active: false });
  };

  public getTraineeByEmail = async (traineeEmail: string): Promise<ITrainee> => {
    if (isEmpty(traineeEmail)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Email is empty');

    const trainee: ITrainee = await traineeModel.findOne({ 'email.address': traineeEmail }).select('-password');
    return trainee;
  };

  // get trainee by username
  public getTraineeByUsername = async (traineeUsername: string): Promise<ITrainee> => {
    if (isEmpty(traineeUsername)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Username is empty');

    const trainee: ITrainee = await traineeModel.findOne({ username: traineeUsername }).select('-password');
    return trainee;
  };

  //delete trainee
  public deleteTrainee = async (traineeId: string): Promise<ITrainee> => {
    const deletedTrainee: ITrainee = await traineeModel.findByIdAndDelete(traineeId);
    return deletedTrainee;
  };

  //update trainee
  public updateTrainee = async (traineeId: string, traineeData: TraineeDTO): Promise<ITrainee> => {
    if (isEmpty(traineeId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'No Trainee with this id');

    const updatedTrainee = await traineeModel.findById(traineeId);
    updatedTrainee.set(traineeData);

    await updatedTrainee.save();

    return updatedTrainee;
  };

  //update notes
  public updateNotes = async (traineeId: string, notes: INote[]): Promise<void> => {
    if (isEmpty(traineeId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'No Trainee with this id ');

    const updatedTrainee = await traineeModel.findById(traineeId);
    updatedTrainee.set({
      notes,
    });

    await updatedTrainee.save();
  };

  //trainee sign up
  public addIndividualTrainee = async (traineeData: TraineeDTO): Promise<ITrainee> => {
    if (isEmpty(traineeData)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'No Trainee with this id');

    const createdTrainee = await this.authService.signup(traineeData, UserRole.TRAINEE);
    return createdTrainee;
  };

  //get trainee's enrolled courses
  public getTraineeEnrolledCourses = async (traineeId: string, page: number, pageLimit: number): Promise<PaginatedData<EnrolledCourse>> => {
    if (!mongoose.Types.ObjectId.isValid(traineeId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee Id is invalid');

    const trainee: ITrainee = await traineeModel.findById(traineeId).populate({
      path: '_enrolledCourses._course',
      populate: {
        path: '_instructor',
        select: 'rating.AverageRating name profileImage',
      },
      select: 'price rating.averageRating captions title duration language level previewVideoURL thumbnail category subcategory',
    });
    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee not found');

    // date of completion null or undefined means not certified
    const traineeEnrolledCourses = trainee._enrolledCourses;

    const toBeSkipped = (page - 1) * pageLimit;

    const totalCourses = traineeEnrolledCourses.length;
    const totalPages = Math.ceil(totalCourses / pageLimit);
    const paginatedCourses = traineeEnrolledCourses.slice(toBeSkipped, toBeSkipped + pageLimit);

    return {
      data: paginatedCourses,
      page,
      pageSize: paginatedCourses.length,
      totalPages,
      totalResults: totalCourses,
    };
  };

  // get enrolled course info
  public getEnrolledCourseById = async (traineeId: string, courseId: string): Promise<EnrolledCourse> => {
    if (!mongoose.Types.ObjectId.isValid(traineeId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee Id is invalid');
    if (!mongoose.Types.ObjectId.isValid(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is invalid');

    const trainee = await traineeModel.findOne({ '_enrolledCourses._course': courseId, _id: traineeId }).populate({
      match: { _id: courseId },
      path: '_enrolledCourses._course',
      populate: {
        path: '_instructor',
        select: 'name rating.averageRating profileImage title speciality',
      },
      select: '-rating.reviews -captions -coupouns -exam',
    });
    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee does not exist or is not enrolled in this course');

    // get enrolled course (null if trainee not enrolled)
    const enrolledCourse = trainee._enrolledCourses.find(course => course._course !== null) ?? null;

    // Adjust Last Visited Course
    if (enrolledCourse) await this.markLastVisitedCourse(traineeId, courseId);

    return enrolledCourse;
  };

  // check if trainee is enrolled in a course
  public isTraineeEnrolled = async (traineeId: string, courseId: string): Promise<boolean> => {
    const trainee = await traineeModel.findOne({ '_enrolledCourses._course': courseId, _id: traineeId });
    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee does not exist or is not enrolled in this course');

    return !!trainee;
  };

  // enroll trainee in a course
  public enrollTrainee = async (traineeId: string, courseId: string): Promise<ICourse> => {
    if (!mongoose.Types.ObjectId.isValid(traineeId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee Id is invalid');
    if (!mongoose.Types.ObjectId.isValid(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is invalid');

    const trainee = await traineeModel.findById(traineeId);
    const course = await courseModel.findById(courseId);

    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee not found');
    if (!course) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course not found');

    // check if trainee is already enrolled in the course
    const isTraineeEnrolled = trainee._enrolledCourses.some(enrolledCourse => enrolledCourse._course._id.toString() == courseId);
    if (isTraineeEnrolled) return course;

    course.numberOfEnrolledTrainees++;
    trainee._enrolledCourses.push({
      _course: course,
      _submittedQuestions: [],
      dateOfEnrollment: new Date(),
      _submittedExamAnswers: [],
      seenAnswers: false,
    });

    await course.save();
    await trainee.save();

    return course;
  };

  // unroll trainee from a course
  public unrollTrainee = async (traineeId: string, courseId: string): Promise<ICourse> => {
    if (!mongoose.Types.ObjectId.isValid(traineeId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee Id is invalid');
    if (!mongoose.Types.ObjectId.isValid(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is invalid');

    const trainee = await traineeModel.findById(traineeId);
    const course = await courseModel.findById(courseId);

    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee not found');
    if (!course) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course not found');

    course.numberOfEnrolledTrainees--;

    // update trainee to remove course from his enrolled courses
    trainee._enrolledCourses = trainee._enrolledCourses.filter(enrolledCourse => enrolledCourse._course._id.toString() != courseId);
    await course.save();
    await trainee.save();

    return course;
  };

  // add to cart
  public addToCart = async (traineeId: string, courseId: string): Promise<ICourse[]> => {
    if (!mongoose.Types.ObjectId.isValid(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    const course = await courseModel.findById(courseId);
    if (!course) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course not found');

    //const trainee = await traineeModel.findByIdAndUpdate(traineeId, { $addToSet: { _cart: courseId } }, { new: true });
    const trainee = await traineeModel.findById(traineeId);
    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee does not exist');

    const existingCart = trainee._cart.map(course => course._id.toString());
    if (existingCart.includes(courseId)) {
      throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'Course already in cart');
    }

    const traineeCart: any[] = trainee._cart;
    traineeCart.push(courseId);

    await trainee.save();
    return traineeCart;
  };
  // add to wishlist
  public addToWishlist = async (traineeId: string, courseId: string): Promise<ICourse[]> => {
    if (!mongoose.Types.ObjectId.isValid(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    const course = await courseModel.findById(courseId);
    if (!course) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course not found');

    //const trainee = await traineeModel.findByIdAndUpdate(traineeId, { $addToSet: { _wishlist: courseId } }, { new: true });
    const trainee = await traineeModel.findById(traineeId);
    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee does not exist');

    const existingWishlist = trainee._wishlist.map(course => course._id.toString());
    if (existingWishlist.includes(courseId)) {
      throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'Course already in wishlist');
    }

    const traineeWishlist: any[] = trainee._wishlist;
    traineeWishlist.push(courseId);

    await trainee.save();
    return traineeWishlist;
  };

  //remove from cart
  public removeFromCart = async (traineeId: string, courseId: string, country: string): Promise<ICourse[]> => {
    if (isEmpty(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course id is empty');
    if (!mongoose.Types.ObjectId.isValid(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    const course = await courseModel.findById(courseId);
    if (!course) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course not found');

    const trainee = await traineeModel.findByIdAndUpdate(traineeId, { $pull: { _cart: courseId } }, { new: true });
    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee does not exist');

    //convert price to local currency
    // const conversionRate = await getConversionRate(country);
    // for (const course of trainee._cart) {
    //   course.price = await getCurrentPrice(course.price, conversionRate, country);
    // }
    return trainee._cart;
  };

  public removeFromWishlist = async (traineeId: string, courseId: string, country: string): Promise<ICourse[]> => {
    if (isEmpty(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course id is empty');
    if (!mongoose.Types.ObjectId.isValid(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    const course = await courseModel.findById(courseId);
    if (!course) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course not found');

    const trainee = await traineeModel.findByIdAndUpdate(traineeId, { $pull: { _wishlist: courseId } }, { new: true });
    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee does not exist');

    //convert price to local currency
    // const conversionRate = await getConversionRate(country);
    // for (const course of trainee._wishlist) {
    //   course.price = await getCurrentPrice(course.price, conversionRate, country);
    // }

    return trainee._wishlist;
  };

  public getCart = async (traineeId: string, country: string, page: number, pageLimit: number): Promise<CartDTO> => {
    if (!mongoose.Types.ObjectId.isValid(traineeId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee Id is invalid');

    const trainee = await traineeModel.findById(traineeId).populate({
      path: '_cart',
      populate: {
        path: '_instructor',
        select: 'name rating.averageRating profileImage title speciality',
      },
      select: 'rating.averageRating price title description category subcategory thumbnail',
    });
    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee does not exist');

    //convert price to local currency
    const conversionRate = await getConversionRate(country);

    const cartCourses = trainee._cart;
    let totalCost = 0;
    for (const course of cartCourses) {
      totalCost += getPriceAfterDiscount(course.price);
    }
    totalCost *= conversionRate;
    totalCost = Math.round(totalCost * 100) / 100;

    const totalCourses = cartCourses.length;
    const toBeSkipped = pageLimit * (page - 1);

    const totalPages = Math.ceil(totalCourses / pageLimit);
    const paginatedCourses = cartCourses.slice(toBeSkipped, toBeSkipped + pageLimit);

    // Get price after discount then change it to the needed currency
    for (const cartCourse of paginatedCourses) {
      const newPrice: Price = await getCurrentPrice(cartCourse.price, conversionRate, country);
      cartCourse.price = newPrice;
    }

    return {
      data: paginatedCourses,
      page,
      pageSize: paginatedCourses.length,
      totalCost,
      totalPages,
      totalResults: totalCourses,
    };
  };

  public getWishlist = async (traineeId: string, country: string, page: number, pageLimit: number): Promise<WishlistDTO> => {
    const trainee = await traineeModel.findById(traineeId).populate({
      path: '_wishlist',
      populate: {
        path: '_instructor',
        select: 'name rating.averageRating profileImage title speciality',
      },
      select: 'rating.averageRating price title description category subcategory thumbnail',
    });
    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee does not exist');
    //convert price to local currency
    const conversionRate = await getConversionRate(country);

    const wishlistCourses = trainee._wishlist;
    let totalCost = 0;
    for (const course of wishlistCourses) {
      totalCost += getPriceAfterDiscount(course.price);
    }
    totalCost *= conversionRate;
    totalCost = Math.round(totalCost * 100) / 100;

    const totalCourses = wishlistCourses.length;
    const toBeSkipped = pageLimit * (page - 1);

    const totalPages = Math.ceil(totalCourses / pageLimit);
    const paginatedCourses = wishlistCourses.slice(toBeSkipped, toBeSkipped + pageLimit);

    // Get price after discount then change it to the needed currency
    for (const cartCourse of paginatedCourses) {
      const newPrice: Price = await getCurrentPrice(cartCourse.price, conversionRate, country);
      cartCourse.price = newPrice;
    }

    return {
      data: paginatedCourses,
      page,
      pageSize: paginatedCourses.length,
      totalCost,
      totalPages,
      totalResults: totalCourses,
    };
  };

  // empty wishlist
  public emptyWishlist = async (traineeId: string): Promise<ICourse[]> => {
    const trainee = await traineeModel.findByIdAndUpdate(traineeId, { $set: { _wishlist: [] } });
    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee does not exist');
    return trainee._wishlist;
  };

  //empty cart
  public emptyCart = async (traineeId: string): Promise<ICourse[]> => {
    const trainee = await traineeModel.findByIdAndUpdate(traineeId, { $set: { _cart: [] } });
    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee does not exist');
    return trainee._cart;
  };

  // get last viewed course
  public getLastViewedCourse = async (traineeId: string): Promise<EnrolledCourse> => {
    if (!mongoose.Types.ObjectId.isValid(traineeId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee Id is invalid');

    const trainee = await traineeModel.findById(traineeId);
    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee does not exist');

    const lastViewedCourse = trainee._lastViewedCourse;
    if (!lastViewedCourse) return null;

    const traineeData = await traineeModel.findById(traineeId).populate({
      match: { _id: lastViewedCourse?.toString() },
      path: '_enrolledCourses._course',
      select: 'title description category subcategory thumbnail',
    });

    // get matching course
    const lastViewedEnrolledCourse = traineeData._enrolledCourses.filter(enrolledCourse => enrolledCourse._course != null);
    return lastViewedEnrolledCourse[0] ?? null;
  };

  public getTraineeBalance = async (traineeId: string): Promise<number> => {
    if (!mongoose.Types.ObjectId.isValid(traineeId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee Id is an invalid Object Id');

    const trainee: ITrainee = await traineeModel.findById(traineeId);
    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee does not exist');
    return trainee?.balance ?? 0;
  };

  // Updates trainee's progress in a course only if trainee is enrolled in that course
  public updateTraineeProgressInCourseIfEnrolled = async (userId: string, courseId: string, lessonId: string): Promise<number> => {
    const course = await this.courseService.getCourseById(courseId);

    //get total number of lessons in course
    const totalLessonsCount = course.sections.reduce((acc, section) => acc + section.lessons.length, 0);

    //add to visited lessons for trainee (only if trainee is enrolled in it)
    const trainee = await traineeModel.findById(userId);

    // Do nothing if trainee does not exist
    if (!trainee) return;

    // get matching enrolled course
    const enrolledCourse = trainee._enrolledCourses.find(enrolledCourse => enrolledCourse._course.toString() == courseId);
    if (!enrolledCourse) return;

    // add lesson to visited lessons if it is not already there
    const lessonObjectId = new mongoose.Types.ObjectId(lessonId);
    if (!enrolledCourse._visitedLessons.includes(lessonObjectId)) enrolledCourse._visitedLessons.push(lessonObjectId);

    // Update Progress for Student in enrolled course
    enrolledCourse.progress = (enrolledCourse._visitedLessons.length / totalLessonsCount) * 100;
    enrolledCourse.progress = Math.trunc(enrolledCourse.progress); //remove decimal part

    await trainee.save();
    return enrolledCourse.progress;
  };

  public markLastVisitedCourse = async (traineeId: string, courseId: string): Promise<void> => {
    if (!mongoose.Types.ObjectId.isValid(traineeId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee Id is an invalid Object Id');

    const trainee = await traineeModel.findById(traineeId);
    if (!trainee) return;

    const course = await this.courseService.getCourseById(courseId);
    if (!course) return;

    trainee._lastViewedCourse = new mongoose.Types.ObjectId(courseId);

    await trainee.save();
  };

  // get trainee's submitted questions along with their answers in an exercise
  public getTraineeSubmittedQuestionsInCourse = async (traineeId: string, courseId: string, exerciseId: string): Promise<SubmittedQuestion[]> => {
    if (!mongoose.Types.ObjectId.isValid(traineeId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee Id is an invalid Object Id');

    const trainee = await traineeModel.findById(traineeId);
    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee does not exist');

    const enrolledCourse = trainee._enrolledCourses.find(enrolledCourse => enrolledCourse._course.toString() == courseId);
    if (!enrolledCourse) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee is not enrolled in this course or Course does not exist');

    const exercise = await this.courseService.getExerciseById(courseId, exerciseId);

    // get exercise question Ids
    const exerciseQuestionIds = exercise.questions.map(question => question._id.toString());

    // get submitted questions for this exercise
    const submittedQuestions = enrolledCourse._submittedQuestions.filter(submittedQuestion =>
      exerciseQuestionIds.includes(submittedQuestion._questionId.toString()),
    );

    return submittedQuestions;
  };

  // add trainee's submitted question in an exercise
  public addorUpdateTraineeSubmittedQuestion = async (
    traineeId: string,
    courseId: string,
    exerciseId: string,
    questionId: string,
    answer: string,
  ): Promise<void> => {
    if (!mongoose.Types.ObjectId.isValid(traineeId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee Id is an invalid Object Id');

    const trainee = await traineeModel.findById(traineeId);
    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee does not exist');

    const enrolledCourse = trainee._enrolledCourses.find(enrolledCourse => enrolledCourse._course.toString() == courseId);
    if (!enrolledCourse) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee is not enrolled in this course or Course does not exist');

    const exercise = await this.courseService.getExerciseById(courseId, exerciseId);
    if (!exercise) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Exercise does not exist');

    // check if question is in exercise
    const question = exercise.questions.find(question => question._id.toString() == questionId);
    if (!question) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Question does not exist in this exercise');

    // check if question is already submitted
    const submittedQuestionIndex = enrolledCourse._submittedQuestions.findIndex(
      submittedQuestion => submittedQuestion._questionId.toString() == questionId,
    );

    if (submittedQuestionIndex >= 0) {
      enrolledCourse._submittedQuestions.splice(submittedQuestionIndex, 1);
    }
    // add submitted question
    const newSubmittedQuestion: SubmittedQuestion = {
      _questionId: new mongoose.Types.ObjectId(questionId),
      submittedAnswer: answer,
    };

    enrolledCourse._submittedQuestions.push(newSubmittedQuestion);

    await trainee.save();
  };

  // submit exam for trainee
  public submitExam = async (traineeId: string, courseId: string, examAnswers: string[]): Promise<number> => {
    if (!mongoose.Types.ObjectId.isValid(traineeId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee Id is an invalid Object Id');
    if (!mongoose.Types.ObjectId.isValid(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    const trainee = await traineeModel.findById(traineeId);
    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee does not exist');

    const enrolledCourse = trainee._enrolledCourses.find(enrolledCourse => enrolledCourse._course.toString() == courseId);
    if (!enrolledCourse) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee is not enrolled in this course or Course does not exist');

    const exam = await this.courseService.getCourseExam(courseId);
    //check exam correct answers against student exam answers
    let correctAnswersCount = 0;
    for (let i = 0; i < examAnswers.length; i++) {
      if (examAnswers[i] == exam[i].answer) {
        correctAnswersCount++;
      }
    }

    const examGrade = (correctAnswersCount / exam.length) * 100;
    enrolledCourse.examGrade = examGrade;
    await this.courseService.modifyAverageExamGrade(courseId, examGrade);
    enrolledCourse._submittedExamAnswers = examAnswers;

    if (examGrade >= 50) {
      // Only Certify if at least 50%
      enrolledCourse.dateOfCompletion = new Date();
    }
    await trainee.save();
    return examGrade;
  };

  // get trainee's submitted exam answers
  // calling it implies that trainee has seen exam answers (his answers is compared against correct ones)
  public getTraineeSubmittedExamAnswers = async (traineeId: string, courseId: string): Promise<string[]> => {
    if (!mongoose.Types.ObjectId.isValid(traineeId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee Id is an invalid Object Id');
    if (!mongoose.Types.ObjectId.isValid(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    const trainee = await traineeModel.findById(traineeId);
    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee does not exist');

    const enrolledCourse = trainee._enrolledCourses.find(enrolledCourse => enrolledCourse._course.toString() == courseId);
    if (!enrolledCourse) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee is not enrolled in this course or Course does not exist');

    enrolledCourse.seenAnswers = true;
    await trainee.save();

    return enrolledCourse._submittedExamAnswers;
  };

  // get trainee's viewed lessons
  public getTraineeViewedLessons = async (traineeId: string, courseId: string): Promise<Types.ObjectId[]> => {
    if (!mongoose.Types.ObjectId.isValid(traineeId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee Id is an invalid Object Id');
    if (!mongoose.Types.ObjectId.isValid(courseId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Course Id is an invalid Object Id');

    const trainee = await traineeModel.findById(traineeId);
    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee does not exist');

    //get enrolled course
    const enrolledCourse = trainee._enrolledCourses.find(enrolledCourse => enrolledCourse._course.toString() == courseId);
    if (!enrolledCourse) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee is not enrolled in this course or Course does not exist');

    //get viewed lessons
    const viewedLessons = enrolledCourse._visitedLessons;
    return viewedLessons;
  };

  // get trainee's certified courses
  public getTraineeCertifiedCourses = async (traineeId: string): Promise<EnrolledCourse[]> => {
    if (!mongoose.Types.ObjectId.isValid(traineeId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee Id is an invalid Object Id');

    const trainee = await traineeModel.findById(traineeId).populate({
      path: '_enrolledCourses._course',
      populate: {
        path: '_instructor',
        select: 'name rating.averageRating profileImage title speciality',
      },
      select: 'rating.averageRating title description _instructor category subcategory previewVideoURL thumbnail',
    });
    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee does not exist');

    // select courses that trainee finished (implied certified)
    const certifiedCourses = trainee._enrolledCourses.filter(enrolledCourse => enrolledCourse.dateOfCompletion);
    return certifiedCourses;
  };

  // update trainee balance
  // amount param should be in USD
  public updateTraineeBalance = async (traineeId: string, amount: number): Promise<void> => {
    if (!mongoose.Types.ObjectId.isValid(traineeId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee Id is an invalid Object Id');

    const trainee = await traineeModel.findById(traineeId);
    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee does not exist');

    amount = Math.floor(amount * 100) / 100;
    trainee.balance += amount;
    await trainee.save();
  };

  // send certificate by email
  public sendCertificateByEmail = async (traineeId: string, courseId: string, certificatePDF: string, isAuto: boolean): Promise<void> => {
    const trainee = await traineeModel.findById(traineeId);
    if (!trainee) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee does not exist');

    const enrolledCourse = trainee._enrolledCourses.find(enrolledCourse => enrolledCourse._course.toString() == courseId);
    if (!enrolledCourse) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Trainee is not enrolled in this course or Course does not exist');
    if (enrolledCourse.progress != 100) throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'Course is not completed yet, progress must be 100%');

    console.log(Boolean(enrolledCourse.dateOfCompletion));
    if (isAuto) {
      // email is sent auto only once (after course completion)
      if (enrolledCourse.dateOfCompletion)
        throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'Certificate already sent automatically by mail before');
      //date of completion should be set
      enrolledCourse.dateOfCompletion = new Date();
      await trainee.save();
    }

    await sendCertificateEmail(certificatePDF, trainee.email.address, trainee.name, enrolledCourse._course.title, `${enrolledCourse.examGrade}`);
  };
}
export default TraineeService;

/*

Object : UserID COurseID Q A
GET :
API : Ask userID, CourseID Q POST A ""
API : Answer PATCH COURSEID USERID A --> asjifaskjf




*/
