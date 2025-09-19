import { INote } from './note.interface';
import { PaginatedRequest } from './request.interface';

import {
  CreditCard,
  IUser,
  Note,
  Reminder,
  SubmittedQuestion
} from './user.interface';

import { Level } from '@/enums/level.enum';

//import { PaginatedResponse } from './response.interface';

interface ICourseFilters extends PaginatedRequest {
  category?: string;
  country?: string;
  durationHigh?: number;
  durationLow?: number;
  level?: Level;
  priceHigh?: number;
  priceLow?: number;
  searchTerm?: string;
  sortBy?: number; // 0 for Most Viewed, 1 for Most Rated, -1 don't sort
  subcategory?: string;
}

interface IBaseCourse {
  captions: string[];
  category: string;
  description: string;
  keywords: string[];
  language: string;
  level: Level;
  previewVideoURL: string;
  price: IPrice;
  subcategory: string[];
  thumbnail: string;
  title: string;
  duration?: number;
  outline: string[];
  sections: ICourseSection[];
}

export interface IAddCourseRequest extends IBaseCourse {
  instructorID: string;
}

export type Announcement = {
  _id: string;
  createdAt: Date;
  description: string;
  title: string;
};

export type FrequentlyAskedQuestion = {
  _id: string;
  answer: string;
  question: string;
  votes: number;
};

export interface ICourse extends IBaseCourse {
  _id: string;
  _instructor: Instructor[];
  numberOfEnrolledTrainees: number;
  rating: Rating;
  examGrades?: {
    average: number;
    totalAttempts: number;
  };
  announcements: Announcement[];
  frequentlyAskedQuestions: FrequentlyAskedQuestion[];
}

export type CourseDiscount = {
  endDate: Date;
  percentage: number;
  startDate: Date;
};

export type IPrice = {
  currency: string;
  currentValue: number;
  discounts: Array<CourseDiscount>;
};
export type ReviewDTO = {
  comment: string;
  rating: number;
};
export type Review = {
  _trainee: ITrainee;
  createdAt: Date;
} & ReviewDTO;
export type ICourseReview = {
  _traineeId: string | undefined;
  comment: string;
  createdAt: Date;
  rating: number;
};
export type Rating = {
  averageRating: number;
  reviews: Review[];
};

export type Email = {
  address: string;
  isValidated: boolean;
  _id: string;
};

export type SocialMedia = {
  facebook: string;
  github: string;
  linkin: string;
  personalWebsite: string;
  youtube: string;
  _id: string;
};

export type Instructor = {
  _id: string;
  name: string;
  profileImage: string;
  email: Email;
  biography: string;
  balance: number;
  active: boolean;
  bankAccount: {
    _id: string;
  };
  socialMedia: SocialMedia;
  speciality: string;
  title: string;
  username: string;
  phone: string;
  gender: string;
  __v: string;
  lastLogin: string;
};

export type ICourseLesson = {
  _id?: string;
  description: string;
  duration?: number;
  title: string;
  videoURL: string;
  progress?: number;
};

export type ICourseQuestion = {
  _id?: string;
  answer: string;
  options: string[];
  question: string;
};

export type ICourseExercise = {
  _id?: string | undefined;
  title: string;
  numberOfQuestions: number;
  questions: ICourseQuestion[];
};

export type ICourseSection = {
  _id?: string;
  description: string;
  lessons: ICourseLesson[];
  exercises: ICourseExercise[];
  title: string;
};

export type EnrolledCourse = {
  _course: ICourse;
  _submittedQuestions: SubmittedQuestion[];
  _visitedLessons?: string[];
  dateOfCompletion?: Date;
  // null or undefined signifies incomplete (not certified yet)
  dateOfEnrollment: Date;
  examGrade?: number;
  notes?: Note[];
  progress?: number;
  reminder?: Reminder;
  subscribedNotification?: boolean;
};

export interface ITrainee extends IUser {
  _cart: string[];
  _enrolledCourses?: EnrolledCourse[];
  _lastViewedCourse?: ICourse | string;
  _wishlist: string[];
  balance: number;
  currency: string;
  creditCards: CreditCard[];
  preferredSkills: string[];
  notes: INote[];
  isCorporate: boolean;
}

export { type ICourseFilters };
