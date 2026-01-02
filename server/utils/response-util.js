module.exports = async (resBody, req, res, next) => {
  res.status(resBody.status || 200).json({
    message: resBody.message || 'Done',
    data: resBody.data || '',
  });
};