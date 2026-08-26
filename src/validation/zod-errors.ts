import { ZodError } from 'zod';

export const getZodErrMessage = (payload: ZodError): string => {
  const messages = payload.issues.map((issue) => {
    if (issue.path.length === 0) {
      return issue.message;
    }

    const path = issue.path.reduce<string>(
      (formattedPath, segment) =>
        typeof segment === 'number'
          ? `${formattedPath}[${String(segment)}]`
          : formattedPath
            ? `${formattedPath}.${String(segment)}`
            : String(segment),
      '',
    );

    return `${path}: ${issue.message}`;
  });

  return messages.join(', ') || 'Validation failed';
};