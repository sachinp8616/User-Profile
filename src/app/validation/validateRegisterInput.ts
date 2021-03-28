import validator from 'validator';
import isEmpty from './is-empty';

const validateRegisterInput = (data: any) => {
  let errors: any = {};

  data.userName = !isEmpty(data.userName) ? data.userName : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';

  if (!validator.matches(data.userName, /^[a-zA-Z]([._-]?[a-zA-Z0-9]+)*$/)) {
    errors.userName = 'Username must starts with letter.';
  }

  if (!validator.isLength(data.userName, { min: 6, max: 15 })) {
    errors.userName = 'User name must have min 6 & max 15 characters.';
  }

  if (validator.isEmpty(data.userName)) {
    errors.userName = 'User name field is required.';
  }

  if (!validator.isLength(data.password, { min: 6, max: 15 })) {
    errors.password = 'Password must have min 6 & max 15 characters.';
  }

  if (
    !validator.matches(
      data.password,
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{6,}$/
    )
  ) {
    errors.password =
      'Password must have at least one Special char, number, small letter, caps letter.';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'Password field is required.';
  }

  if (!validator.equals(data.password2, data.password)) {
    errors.password2 = 'Password does not match.';
  }
  if (validator.isEmpty(data.password2)) {
    errors.password2 = 'Confirm Password field is required.';
  }

  return {
    errors: errors,
    isInvalid: !isEmpty(errors),
  };
};

export default validateRegisterInput;
