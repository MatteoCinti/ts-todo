interface ErrnoException extends Error {
  code?: number;
}

export const newError = (message: string, code: number): ErrnoException => {
  const error: ErrnoException = new Error(message);
  error.code = code;
  return error;
};

export const customErrorHandler = (err, req, res, _) => {
  console.error(err);
  res.status(err.code || 500).json(err.message);
};
