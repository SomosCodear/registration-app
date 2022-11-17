import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { SerializedError } from '@reduxjs/toolkit';

export const extractApiError = (error: FetchBaseQueryError | SerializedError): string => {
  if ('message' in error && error.message) {
    return error.message;
  }
  if ('data' in error && error.data) {
    return (error.data as { error: string }).error;
  }

  return 'Unknown error';
};
