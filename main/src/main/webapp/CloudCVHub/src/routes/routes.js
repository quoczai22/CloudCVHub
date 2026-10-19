export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  CV_LIST: '/dashboard/cvs',
  CV_UPLOAD: '/dashboard/upload',
  CV_EDIT: (id = ':id') => `/dashboard/edit/${id}`,
  PROFILE: '/dashboard/profile',
};

export default ROUTES;
