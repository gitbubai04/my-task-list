import { lazy } from 'react';

function delayForDemo(promise: any) {
    return new Promise(resolve => {
        setTimeout(resolve, 1000);
    }).then(() => promise);
}

const Login = lazy(() => delayForDemo(import('./Auth/index')));
const HomePage = lazy(() => delayForDemo(import('./Dashboard/Home')));
const MyProfile = lazy(() => delayForDemo(import('./Dashboard/MyProfile')));
const EmpView = lazy(() => delayForDemo(import('./Dashboard/Home/ViewEmp')));

export {
    Login,
    HomePage,
    MyProfile,
    EmpView
}

