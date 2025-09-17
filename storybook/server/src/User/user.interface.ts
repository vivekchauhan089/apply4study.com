import { Types } from 'mongoose';
import { Gender, UserRole } from './user.enum';

export interface IUser {
  _id: Types.ObjectId;
  active: boolean;
  country: string;
  createdAt: Date;
  dateOfBirth: Date;
  email: {
    address: string;
    isVerified: Boolean;
  };
  gender: Gender;
  lastLogin: Date;
  name: string;
  password: string;
  phone: string;
  profileImage: string;
  role?: UserRole;
  username: string;
}
