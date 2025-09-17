import { Rating } from '@/Common/Types/common.types';
import { ICourse } from '@/Course/course.interface';
import { IUser } from '@/User/user.interface';

export interface IInstructor extends IUser {
  _teachedCourses: ITeachedCourse[];
  balance: number;
  bankAccount: BankAccount;
  biography: string;
  rating: Rating;
  socialMedia: SocialMedia;
  speciality: string;
  title: string;
}

export interface ITeachedCourse {
  _course: ICourse;
  earning: number;
}

type BankAccount = {
  accountHolderName: string;
  accountNumber: string;
  bankName: string;
  branchAddress: string;
  branchName: string;
  swiftCode: string;
};

export type SocialMedia = {
  facebook: string;
  github: string;
  linkedin: string;
  personalWebsite: string;
  youtube: string;
};
