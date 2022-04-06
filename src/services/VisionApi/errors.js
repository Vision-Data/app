const formatErrors = (errors) => {
  const result = {};
  errors.forEach((error) => {
    if (error["field"] === undefined) {
      result["message"] = error.message;
    } else {
      result[error.field] = error.message;
    }
  });

  return result;
};

export default formatErrors;
