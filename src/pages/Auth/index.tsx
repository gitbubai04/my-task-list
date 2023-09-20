import React from 'react'
import { AuthBtn, AuthWrap, AuthBody } from './style'
import Login from './Login'
import Signup from './Signup'
import { Screen, ScreenArgs } from '../../Helper/Type';

export const SCREEN: Screen = {
  LOGIN: 'LOGIN',
  SIGNIN: 'SIGNIN'
};



function Index() {
  const [screen, setScreen] = React.useState<ScreenArgs>(SCREEN.SIGNIN);

  const handelscreenType = (type: ScreenArgs) => {
    console.log('screen', screen);
    if (type === SCREEN.LOGIN && screen !== SCREEN.LOGIN) {
      setScreen(SCREEN.LOGIN);
    } else if (type === SCREEN.SIGNIN && screen !== SCREEN.SIGNIN) {
      setScreen(SCREEN.SIGNIN);
    }
  };

  return (
    <AuthWrap>
      <div className='login-outer-body'>
        <div className='auth-button-wrap'>
          <AuthBtn
            className={screen === SCREEN.LOGIN ? 'active-tab' : ''}
            onClick={() => handelscreenType(SCREEN.LOGIN)}
          >
            Login
          </AuthBtn>
          <AuthBtn
            className={screen === SCREEN.SIGNIN ? 'active-tab' : ''}
            onClick={() => handelscreenType(SCREEN.SIGNIN)}
          >
            Register
          </AuthBtn>
        </div>
        <AuthBody>
          {screen === SCREEN.LOGIN && (
            <Login />
          )}

          {screen === SCREEN.SIGNIN && (
            <Signup screen={screen} setScreen={setScreen}/>
          )}

        </AuthBody>
      </div>
    </AuthWrap>
  )
}

export default Index