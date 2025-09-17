import { type IInstructor } from '@Instructor/instructor.interface';
import { Document, model, Schema } from 'mongoose';
import { genSalt, hash } from 'bcrypt';
import Email from '@/User/user.schema';
import { Gender } from '@/User/user.enum';
import { requiredString } from '@/Common/Models/common';

const instructorSchema = new Schema<IInstructor>(
  {
    _teachedCourses: [
      {
        _course: {
          ref: 'Course',
          type: Schema.Types.ObjectId,
        },
        _id: false,
        earning: {
          default: 0,
          type: Number,
        },
      },
    ],
    active: {
      default: true,
      type: Boolean,
    },
    balance: {
      default: 0,
      type: Number,
    },
    bankAccount: {
      default: {},
      type: {
        accountHolderName: String,
        accountNumber: String,
        bankName: String,
        branchAddress: String,
        branchName: String,
        swiftCode: String,
      },
    },
    biography: String,
    country: String,
    dateOfBirth: {
      trim: true,
      type: Date,
    },
    email: {
      required: true,
      type: Email,
      unique: true,
    },
    gender: {
      enum: Object.values(Gender),
      type: String,
    },
    lastLogin: {
      type: Date,
    },
    name: requiredString,
    password: { ...requiredString, minlength: 8 },
    phone: String,
    profileImage: {
      default: 'https://i.stack.imgur.com/l60Hf.png',
      type: String,
    },
    rating: {
      averageRating: {
        max: 5,
        min: 0,
        required: true,
        type: Number,
      },
      reviews: [
        {
          _trainee: {
            ref: 'Trainee',
            type: Schema.Types.ObjectId,
          },
          comment: String,
          createdAt: Date,
          rating: {
            max: 5,
            min: 0,
            required: true,
            type: Number,
          },
        },
      ],
    },
    socialMedia: {
      default: {},
      type: {
        facebook: String,
        github: String,
        linkedin: String,
        personalWebsite: String,
        youtube: String,
      },
    },
    speciality: {
      default: '',
      type: String,
    },
    title: {
      type: String,
      default: '',
    },
    username: {
      match: [/^[a-zA-Z0-9]+$/, ' username is invalid'],
      required: [true, " username can't be blank"],
      type: String,
      unique: true,
    },
  },
  {
    versionKey: false,
  },
);

instructorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await genSalt();
  this.password = await hash(this.password, salt);
  next();
});

const instructorModel = model<IInstructor & Document>('Instructor', instructorSchema);

export default instructorModel;
