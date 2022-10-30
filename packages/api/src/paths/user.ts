import refs from '../res/openapi-refs.json'
import { OpenAPIV3PathsObject } from '../types'

const userRegister: OpenAPIV3PathsObject = {
  '/user/register': {
    post: {
      operationId: 'userRegister',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: refs.UserRegister
            }
          }
        },
        required: true
      },
      responses: {
        200: {
          content: {
            'application/json': {
              schema: {
                properties: {
                  user: {
                    $ref: refs.User
                  }
                },
                required: ['user'],
                type: 'object'
              }
            }
          },
          description: 'OK'
        },
        400: {
          content: {
            'application/json': {
              schema: {
                $ref: refs.Error
              }
            }
          },
          description: 'Bad Request'
        },
        422: {
          content: {
            'application/json': {
              schema: {
                $ref: refs.Error
              }
            }
          },
          description: 'Unprocessable Entity'
        },
        500: {
          content: {
            'application/json': {
              schema: {
                $ref: refs.Error
              }
            }
          },
          description: 'Internal Server'
        }
      },
      tags: ['user'],
      'x-eov-operation-handler': 'user'
    }
  }
}

export default {
  ...userRegister
}
