import { Level, Coupon, Question, Section, ICourse } from '@Course/course.interface';

import { IsDate, IsEnum, IsNumber, IsString, IsUrl } from 'class-validator';

export class FrequentlyAskedQuestionDTO {
  answer: string;
  @IsString()
  question: string;
  @IsNumber()
  votes: number;
}

export class AnnouncementDTO {
  @IsDate()
  createdAt: Date;
  @IsString()
  description: string;
  title: string;
}

export class PriceDTO {
  currency: string;
  currentValue: number;
  discounts: DiscountDTO[];
}

export class QuestionDTO {
  answer: string;
  options: string[];
  question: string;
}

export class SectionDTO {
  description: string;
  exercises: Question[];
  lessons: LessonDTO[];
  title: string;
}
export class LessonDTO {
  description: string;
  duration: number;
  title: string;
  videoURL: string;
}

export class CouponDTO {
  code: string;
  count: number;
  discount: DiscountDTO;
  expiryDate: Date;
}

export class DiscountDTO {
  endDate: Date;
  percentage: number;
  startDate: Date;
}

export class CourseDTO {
  @IsString()
  instructorID: string; // One to many is handled for now
  announcements: AnnouncementDTO[];
  captions: string[];
  category: string;
  coupouns: Coupon[];
  description: string;
  @IsNumber()
  duration: number;
  exam: Question[];
  frequentlyAskedQuestions: FrequentlyAskedQuestionDTO[];
  keywords: string[];
  language: string;
  @IsEnum(Level)
  level: Level;
  outline: string[];
  @IsUrl()
  previewVideoURL: string;
  price: PriceDTO;
  sections: Section[];
  subcategory: string;
  @IsUrl()
  thumbnail: string;
  title: string;
}

export type CategoryDTO = {
  label: string;
  subcategory: { label: string }[];
};

export type GetAllCoursesDTO = {
  courses: ICourse[];
  priceMax: number;
};
