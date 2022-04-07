const formatErrors = (errors) => {
  const result = {};

  if (errors && errors.length > 0) {
    errors.forEach((error) => {
      if (error["field"] === undefined) {
        result["message"] = error.message;
      } else {
        result[error.field] = error.message;
      }
    });
  }

  return result;
};

export default formatErrors;
