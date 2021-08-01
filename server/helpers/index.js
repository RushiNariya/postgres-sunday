module.exports = (res, status, data, error) => {
  res.status(status).json({
    status:status,
    data: data,
    error : error
  })
};
