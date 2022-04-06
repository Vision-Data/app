const formatErrors = (errors) => {
  const result = {};
  errors.forEach((error) => {
    result[error.field] = error.message;
  });

  return result;
};

export default formatErrors;
