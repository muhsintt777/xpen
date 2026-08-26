export const SUCCESS_TYPE = {
  OK: 'OK',
  CREATED: 'CREATED',
  ACCEPTED: 'ACCEPTED',
  NO_CONTENT: 'NO_CONTENT',
} as const;

export type SuccessType = (typeof SUCCESS_TYPE)[keyof typeof SUCCESS_TYPE];

export const SUCCESS_STATUS_CODE: Record<SuccessType, number> = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
} as const;
