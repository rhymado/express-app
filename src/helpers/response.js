const writeResponse = (res, headers, status, result) => {
  let response;
  if (headers) {
    for (let header in headers) {
      res.append(header, headers[header]);
    }
  }
  if (result) {
    response = {
      success: true,
      result,
    };
  }

  res.status(status).json(response);
};

const writeError = (res, status, err) => {
  res.status(status).json(new Error(err));
};

module.exports = {
  writeResponse,
  writeError,
};
