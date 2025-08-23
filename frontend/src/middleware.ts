export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
  '/patient',
  '/doctor',
    '/records',
    '/upload',
    '/consents',
  '/request-access',
  '/api/records',
  '/api/consents',
  ],
};
