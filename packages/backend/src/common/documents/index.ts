import { ServerResponse } from "../types";

export const internalServerErrorSchema = {
  schema: {
    type: 'object',
    properties: {
      message: { type: 'string', example: 'Something went wrong, please, try again' },
      status: { type: 'number', example: 500 },
      data: { type: 'null', example: null },
      error: { type: 'string', example: 'Internal server error' }
    }
  }
};

export const notFoundSchema = {
  schema: {
    type: 'object',
    properties: {
      message: { type: 'string', example: 'Movie not found' },
      status: { type: 'number', example: 404 },
      data: { type: 'null', example: null },
      error: { type: 'null', example: null }
    }
  }
};

export const unauthorizedSchema = {
  schema: {
    type: 'object',
    properties: {
      message: { type: 'string', example: 'Unathorized' },
      statusCode: { type: 'number', example: 401 }
    }
  }
};


export const responseSchema = {
  type: ServerResponse
};