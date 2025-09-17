import { HttpException } from '@/Exceptions/HttpException';
import { UserDTO, UserLoginDTO } from '@/User/user.dto';
import HttpStatusCodes from '@/Utils/HttpStatusCodes';
import { isEmpty } from '@/Utils/util';
import { AuthRole, type ICookie } from '@Authentication/auth.interface';
import { type ITokenPayload } from '@Token/token.interface';
import { generateTokens } from '@Token/token.util';
import { IUser } from '@/User/user.interface';
import { findUserModelByRole, MapUserRoleToAuth } from '@/User/user.util';

import traineeModel from '@/Trainee/trainee.model';
import { compare, genSalt, hash } from 'bcrypt';

import { UserRole } from '@/User/user.enum';
import instructorModel from '@/Instructor/instructor.model';
import adminModel from '@/Admin/admin.model';
import { IAdmin } from '@/Admin/admin.interface';
import { IInstructor } from '@/Instructor/instructor.interface';
import TraineeService from '@/Trainee/trainee.dao';
import InstructorService from '@/Instructor/instructor.dao';
import AdminService from '@/Admin/admin.dao';
import { sendResetPasswordEmail, sendVerifyEmail } from '@/Common/Email Service/email.template';
import { Types } from 'mongoose';
import { ITrainee } from '@/Trainee/trainee.interface';
import { access } from 'fs';

class AuthService {
  instructorService = new InstructorService();

  public async signup(userData: UserDTO, role: UserRole, isCorporate = false): Promise<any> {
    if (isEmpty(userData)) throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'userData is empty');

    // check if email and username already exists
    const query = {
      $or: [{ 'email.address': userData?.email?.address ?? '' }, { username: userData?.username ?? '' }],
    };

    const trainee = await traineeModel.findOne(query);
    if (trainee) {
      if (trainee.email.address === userData?.email?.address)
        throw new HttpException(HttpStatusCodes.BAD_REQUEST, `This email ${userData.email.address} already exists`);
      if (trainee.username === userData?.username)
        throw new HttpException(HttpStatusCodes.BAD_REQUEST, `This username ${userData.username} already exists`);
    }

    const instructor = await instructorModel.findOne(query);
    if (instructor) {
      if (instructor.email.address === userData?.email?.address)
        throw new HttpException(HttpStatusCodes.BAD_REQUEST, `This email ${userData.email.address} already exists`);
      if (instructor.username === userData?.username)
        throw new HttpException(HttpStatusCodes.BAD_REQUEST, `This username ${userData.username} already exists`);
    }

    const admin = await adminModel.findOne(query);
    if (admin) {
      if (admin.email.address === userData?.email?.address)
        throw new HttpException(HttpStatusCodes.BAD_REQUEST, `This email ${userData.email.address} already exists`);
      if (admin.username === userData?.username)
        throw new HttpException(HttpStatusCodes.BAD_REQUEST, `This username ${userData.username} already exists`);
    }

    userData.email.isVerified = true;
    if (isCorporate) userData.isCorporate = true;

    const userModel = findUserModelByRole(role);
    const createUserData = await userModel.create({
      ...userData,
    });

    return createUserData;
  }

  public async login(userData: UserLoginDTO): Promise<{
    accessToken: string;
    cookie: ICookie;
    findUser: IUser;
    firstLogin: boolean;
    refreshToken: string;
    role: UserRole;
  }> {
    if (isEmpty(userData)) throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'user data is empty');

    let userModel: typeof traineeModel | typeof instructorModel | typeof adminModel, findInstructor: IInstructor, findAdmin: IAdmin;

    let role: UserRole;
    const query = {
      $or: [{ 'email.address': userData?.email?.address ?? '' }, { username: userData?.username ?? '' }],
    };

    const findTrainee = await traineeModel.findOne(query).select('-active');
    userModel = findTrainee ? traineeModel : null;
    role = findTrainee ? UserRole.TRAINEE : null;

    if (!userModel) {
      findInstructor = await instructorModel.findOne(query).select('-active');
      userModel = findInstructor ? instructorModel : null;
      role = findInstructor ? UserRole.INSTRUCTOR : null;
    }
    if (!userModel) {
      findAdmin = await adminModel.findOne(query).select('-active');
      userModel = findAdmin ? adminModel : null;
      role = findAdmin ? UserRole.ADMIN : null;
    }

    if (!userModel) throw new HttpException(HttpStatusCodes.CONFLICT, "Email or Username doesn't exist. Please Sign Up First");

    const findUser = findTrainee ?? findInstructor ?? findAdmin;

    // check if user logged in before or not
    const firstLogin = !findUser.lastLogin;

    // check Password Hashing
    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);

    if (!isPasswordMatching) throw new HttpException(HttpStatusCodes.CONFLICT, 'Password is invalid. Please try again');

    // activate user
    await userModel.updateOne({ _id: findUser._id }, { $set: { active: true, lastLogin: new Date() } });

    // generate token
    const isCorporate = role == UserRole.TRAINEE ? findTrainee.isCorporate : null;
    const TokenPayload = {
      _id: findUser._id,
      role: MapUserRoleToAuth(role, isCorporate),
    };
    const { accessToken, refreshToken } = await generateTokens(TokenPayload);

    const cookie = this.createCookie(refreshToken);

    delete findUser.password;
    findUser.role = role;

    return { accessToken, cookie, findUser, firstLogin, refreshToken, role };
  }

  public async logout(tokenPayload: ITokenPayload): Promise<IUser> {
    if (isEmpty(tokenPayload)) throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'Token is empty');
    const { role, _id } = tokenPayload;
    const userModel = findUserModelByRole(role);
    if (!userModel) throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'Role is Wrong');
    const findUser = await userModel
      .findOneAndUpdate(
        { _id: _id },
        {
          $set: {
            active: false,
          },
        },
        { new: true },
      )
      .lean();

    if (!findUser) throw new HttpException(HttpStatusCodes.CONFLICT, `this id ${_id} was not found`);

    return findUser;
  }

  // change any user password
  public async changePassword(userId: string, role: AuthRole, oldPassword: string, newPassword: string, isReset: boolean): Promise<IUser> {
    if (!Types.ObjectId.isValid(userId)) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Invalid ObjectId');

    const userModel = findUserModelByRole(role);
    if (!userModel) throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'Role does not exist');

    const user = await userModel.findById(userId).lean();
    if (!user) throw new HttpException(HttpStatusCodes.BAD_REQUEST, `No matching user found`);

    if (!isReset) {
      const isPasswordMatching: boolean = await compare(oldPassword, user.password);
      if (!isPasswordMatching) throw new HttpException(HttpStatusCodes.BAD_REQUEST, 'Current Password is invalid. Please try again');
    }

    const salt = await genSalt();
    newPassword = await hash(newPassword, salt);
    console.log(newPassword);

    const updatedUser = await userModel.findByIdAndUpdate(userId, { password: newPassword });
    return updatedUser;
  }

  //forget pass
  public sendResetPasswordEmail = async (
    userEmail: string,
  ): Promise<{
    cookie: ICookie;
  }> => {
    userEmail = userEmail.toLowerCase();
    const trainee = await new TraineeService().getTraineeByEmail(userEmail);
    const instructor = await new InstructorService().getInstructorByEmail(userEmail);
    const admin = await new AdminService().getAdminByEmail(userEmail);
    const user = trainee ?? instructor ?? admin;
    if (!user) throw new HttpException(HttpStatusCodes.NOT_FOUND, 'Email does not belong to a user');

    const username = user.name;
    const userId = user._id.toString();

    let role: UserRole = UserRole.TRAINEE;
    if (instructor) role = UserRole.INSTRUCTOR;
    if (admin) role = UserRole.ADMIN;

    // generate token
    const isCorporate = role == UserRole.TRAINEE ? trainee.isCorporate : null;
    const TokenPayload = {
      _id: user._id,
      role: MapUserRoleToAuth(role, isCorporate),
    };
    const { accessToken, refreshToken } = await generateTokens(TokenPayload);
    const cookie = this.createCookie(refreshToken);

    //send email
    sendResetPasswordEmail(userEmail, username, userId, role, accessToken);

    return { cookie };
  };

  public sendVerificationEmail = async (email: string, username: string, name:string): Promise<Number> => {

    email=email.toLowerCase();

    email = email.toLowerCase();
    const query = {
      $or: [{ 'email.address': email?? '' }, { username: username ?? '' }],
    };

    const trainee = await traineeModel.findOne(query);
    if (trainee) {
      if (trainee.email.address === email)
        throw new HttpException(HttpStatusCodes.BAD_REQUEST, `This email ${email} already exists`);
      if (trainee.username === username)
        throw new HttpException(HttpStatusCodes.BAD_REQUEST, `This username ${username} already exists`);
    }

    // //generate a 6 digit code
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    // //send email
    sendVerifyEmail(email, name, verificationCode);

    // // save code
    return verificationCode;
    
  };

  // creates a cookie
  public createCookie(refreshToken: string): ICookie {
    return {
      name: 'Authorization',
      options: {
        httpOnly: true, // only accessible by a web server
        maxAge: 1000 * 60 * 60 * 24 * 7, // expires in 1 week
        secure: false, //https
      },
      value: refreshToken,
    };
  }


  
}

export default AuthService;
