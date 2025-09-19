import { CategoryRoute } from './dataServices/CategoryDataService';
import { CoursesRoutes } from './dataServices/CoursesDataService';
import { InstructorRoutes } from './dataServices/InstructorDataService';
import { AdminRoutes } from './dataServices/AdminDataService';

import { AuthRoutes } from './dataServices/AuthDataService';
import { TraineeRoutes } from './dataServices/TraineeDataService';
import { NewsLetterRoutes } from './dataServices/NewsLetterDataService';

import { PaymentRoutes } from './dataServices/PaymenrDataService';

import { ReportDataService } from '@services/axios/dataServices/ReportDataService';

/**
 * HTTP methods
 */
export type VERBS = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
/**
 * User routes are defined in the dataServices/UserDataService.ts file
 * and are used to define the routes for the user data service
 * @param  verb - The HTTP verb to use for the request
 */
export type AuthRoutesType<T extends 'GET' | 'POST'> =
  typeof AuthRoutes[T][keyof Partial<typeof AuthRoutes[T]>];

export type CategoryRouteType = typeof CategoryRoute['GET'][keyof Partial<
  typeof CategoryRoute['GET']
>];

export type AdminRoutesType = typeof AdminRoutes['POST'][keyof Partial<
  typeof AdminRoutes['POST']
>];

export type InstructorRouteType<T extends 'GET' | 'POST' | 'PATCH' | 'DELETE'> =
  typeof InstructorRoutes[T][keyof Partial<typeof InstructorRoutes[T]>];

export type TraineeRouteType<T extends 'GET' | 'POST' | 'DELETE' | 'PATCH'> =
  typeof TraineeRoutes[T][keyof Partial<typeof TraineeRoutes[T]>];

export type NewsLetterRouteType<T extends 'GET' | 'POST' | 'DELETE'> =
  typeof NewsLetterRoutes[T][keyof Partial<typeof NewsLetterRoutes[T]>];

export type ReportRouteType<T extends 'GET' | 'POST' | 'PATCH'> =
  typeof ReportDataService[T][keyof Partial<typeof ReportDataService[T]>];

export type CourseRouteType<T extends 'GET' | 'POST' | 'PUT' | 'DELETE'> =
  typeof CoursesRoutes[T][keyof Partial<typeof CoursesRoutes[T]>];

export type PaymentRouteType = typeof PaymentRoutes['POST'][keyof Partial<
  typeof PaymentRoutes['POST']
>];

/**
 * All GET routes that are available for the  data service
 */
export type GETRoutesType =
  | CategoryRouteType
  | CourseRouteType<'GET'>
  | InstructorRouteType<'GET'>
  | AuthRoutesType<'GET'>
  | TraineeRouteType<'GET'>
  | NewsLetterRouteType<'GET'>
  | ReportRouteType<'GET'>;
/**
 * All POST routes that are available for the  data service
 */
export type POSTRoutesType =
  | AdminRoutesType
  | AuthRoutesType<'POST'>
  | TraineeRouteType<'POST'>
  | NewsLetterRouteType<'POST'>
  | InstructorRouteType<'POST'>
  | ReportRouteType<'POST'>
  | PaymentRouteType;

/**
 * All Delete Requests
 */

export type DELETERoutesType =
  | TraineeRouteType<'DELETE'>
  | NewsLetterRouteType<'DELETE'>
  | CourseRouteType<'DELETE'>
  | InstructorRouteType<'DELETE'>;

/**
 * All PUT routes that are available for the  data service
 */
export type PUTRoutesType = CourseRouteType<'PUT'>;
export type PATCHRoutesType =
  | ReportRouteType<'PATCH'>
  | InstructorRouteType<'PATCH'>
  | TraineeRouteType<'PATCH'>;
//export type DELETERoutesType = null;
