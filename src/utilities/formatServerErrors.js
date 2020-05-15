export const formatRegisterErrorsToFormikErrors = (responseErrors) => {
  const errors = { ...responseErrors.response.data.errors };
  Object.keys(errors).forEach((key) => {
    errors[key] = errors[key].toString();
  });
  return errors;
};

export const formatLoginErrorToStr = (responseError) => {
  return Object.keys(responseError.response.data.errors).map(
    (key) => `${key}: ${responseError.response.data.errors[key][0]}`
  );
};