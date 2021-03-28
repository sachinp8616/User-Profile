import * as moment from 'moment';
import validator from 'validator';
import isEmpty from './is-empty';

const validateProfileInput = (data: any) => {
  let errors: any = {};

  data.fname = !isEmpty(data.fname) ? data.fname : '';
  data.lname = !isEmpty(data.lname) ? data.lname : '';
  data.dob = !isEmpty(data.dob) ? data.dob : '';
  data.gender = !isEmpty(data.gender) ? data.gender : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.mobile = !isEmpty(data.mobile) ? data.mobile : '';

  if (!validator.isLength(data.fname, { min: 2, max: 20 })) {
    errors.fname = 'First Name must have min 2 & max 20 characters';
  }

  if (!validator.isLength(data.lname, { min: 2, max: 20 })) {
    errors.lname = 'Last Name must have min 2 & max 20 characters';
  }

  if (moment().diff(data.dob, 'year') < 18) {
    errors.dob = 'Age should be greater than 18 years.';
  }

  if (!validator.isEmail(data.email)) {
    errors.email = 'Email must be a valid email address.';
  }

  if (!validator.isNumeric(data.mobile)) {
    errors.mobile = 'Mobile only contains digits';
  }

  if (!validator.isLength(data.mobile, { min: 10, max: 10 })) {
    errors.mobile = 'Please enter valid 10 digit mobile number.';
  }

  return {
    errors: errors,
    isInvalid: !isEmpty(errors),
  };
};

export default validateProfileInput;
