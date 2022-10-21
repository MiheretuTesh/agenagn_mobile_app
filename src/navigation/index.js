import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  getHousesDataForNonLoginUser,
  getHousesDataLoginUser,
} from '../features/dashboard/dashboard.Slice';

import {AuthDrawer, AppDrawer} from './Drawer.Navigation';

const Navigation = props => {
  const [userLoggedIn, stateUserLoggedIn] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (props.tokenData !== '') {
      dispatch(getHousesDataLoginUser(token));
    } else {
      dispatch(getHousesDataForNonLoginUser);
    }
  }, []);

  const {token} = useSelector(state => state.houses);

  const loginState = useSelector(state => state.auth);

  useEffect(() => {
    if (loginState.token !== '') {
      stateUserLoggedIn(true);
    }
  }, [loginState.token]);

  return (
    <>
      {userLoggedIn || props.tokenData !== null ? (
        <>
          {
            <AuthDrawer
              {...props}
              token={props.tokenData}
              isLoggedIn={userLoggedIn}
              stateUserLoggedIn={stateUserLoggedIn}
            />
          }
        </>
      ) : (
        <AppDrawer
          {...props}
          token={props.tokenData}
          isLoggedIn={userLoggedIn}
          stateUserLoggedIn={stateUserLoggedIn}
        />
      )}
    </>
  );
};

export default Navigation;
