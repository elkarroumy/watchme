import { ServerResponse } from '../types';
import { HttpStatus } from '@nestjs/common';

export const internalServerErrorSchema = {
  schema: {
    type: 'object',
    properties: {
      message: { type: 'string', example: 'Something went wrong, please, try again' },
      status: { type: 'number', example: HttpStatus.INTERNAL_SERVER_ERROR },
      data: { type: 'null', example: null }
    }
  }
};

export const notFoundSchema = {
  schema: {
    type: 'object',
    properties: {
      message: { type: 'string', example: 'Movie not found' },
      status: { type: 'number', example: HttpStatus.NOT_FOUND },
      data: { type: 'null', example: null }
    }
  }
};

export const unauthorizedSchema = {
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: HttpStatus.UNAUTHORIZED },
      message: { type: 'string', example: 'Unathorized' },
      data: { type: 'null', example: null }
    }
  }
};

export const forbiddenSchema = {
  schema: {
    type: 'object',
    properties: {
      status: { type: 'number', example: HttpStatus.FORBIDDEN },
      message: { type: 'string', example: 'Access denied' },
      data: { type: 'null', example: null }
    }
  }
};

export const responseSchema = {
  type: ServerResponse
};
