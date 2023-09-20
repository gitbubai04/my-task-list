import { lazy } from 'react';

const Login = lazy(() => import('./Auth/index'));
const HomePage = lazy(() => import('./Dashboard/Home'));


export {
    Login,
    HomePage
}