interface ErrnoException extends Error {
  code?: number;
}

export const newError = (message: string, code: number): ErrnoException => {
  const error: ErrnoException = new Error(message)
  error.code = code;
  return error;
}