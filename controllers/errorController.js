const AppError = require('./../utils/appError');

const handleCastErrorDB = err => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  // console.log(value);

  const message = `Duplicate field value: ${value}. Pleaser use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
  // console.log(`Errors are : ${errors}`);
  // console.log(`err.errors are : ${err.errors}`);

  const errors = Object.values(err.errors).map(el => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handelJWTExpired = () =>
  new AppError('Your token has expired. PLease Login Again.', 401);

const handleJWTError = () =>
  new AppError('Invalid Token. Please login again!', 401);

const sendErrorDev = (err, req, res) => {
  // A) API
  console.log(req);
  console.log(req.orignalUrl);
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  }

  // B) RENDERED WEBSITE
  console.error('ERROR ***', AppError);

  return res.status(err.statusCode).render('error', {
    title: 'Something went Wrong!',
    msg: err.message
  });
};

const sendErrorProd = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith('/api')) {
    //A) Operational, trusted error : send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message
      });
    }
    //B) Programming or other unkown error: don't leak details
    // 1) Log error
    console.error('ERROR ***', AppError);

    // 2) Send generic message
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong.'
    });
  }

  // B) RENDERED WEBSITE

  //A) Operational, trusted error : send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something went Wrong!',
      msg: err.message
    });
  }

  //B) Programming or other unkown error: don't leak details

  // Programming or other unkowns error: don't leak details
  // 1) Log error
  console.error('ERROR ***', AppError);

  // 2) Send generic message
  return res.status(err.statusCode).render('error', {
    title: 'Something went Wrong!',
    msg: 'Please try again later.'
  });
};
module.exports = (err, req, res, next) => {
  //   console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production ') {
    let error = Object.create(err);
    error.message = err.message;

    if (err.name === 'CastError') error = handleCastErrorDB(err);
    if (err.code === 11000) error = handleDuplicateFieldsDB(err);
    if (err.name === 'ValidatonError') error = handleValidationErrorDB(err);
    // if (error.statusCode === 500) error = handleValidationErrorDB(err);
    if (error.name === 'JsonWebTokenError') error = handleJWTError(err);
    if (error.name === 'TokenExpiredError') error = handelJWTExpired();
    sendErrorProd(error, req, res);
  }
};
