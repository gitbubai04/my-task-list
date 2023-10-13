import { lazy } from 'react';

const Login = lazy(() => import('./Auth/index'));
const HomePage = lazy(() => import('./Dashboard/Home'));
const MyProfile = lazy(() => import('./Dashboard/MyProfile'));
const EmpView = lazy(() => import('./Dashboard/Home/ViewEmp'));

export {
    Login,
    HomePage,
    MyProfile,
    EmpView
}