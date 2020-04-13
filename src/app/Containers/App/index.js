import React, {useEffect, useState} from 'react';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {CssBaseline} from '@material-ui/core';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import Dashboard from '../Dashboard';
import Register from '../Register';
import Login from '../Login';
import AuthRoute from '../../Components/AuthRoute';
import {getUserInfo} from '../../common/thunks/user';
import {getToken, deleteToken} from '../../common/localStorage';

const theme = createMuiTheme();

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [showLoader, setLoader] = useState(true);
  const [userInfo, setUserInfo] = useState({});
  const [openNotif, setOpenNotif] = React.useState(false);
  const [typeMessage, setTypeMessage] = React.useState('success');
  const [textMessage, setTextMessage] = React.useState('');

  useEffect(() => {
    if (getToken()) {
      getInfo();
    } else {
      setLoader(false);
    }
  }, []);

  const getInfo = async () => {
    const {res, err} = await getUserInfo();
    if (err) {
      checkError(err);
    } else {
      setUserInfo(res.user_info_token);
      setIsAuth(true);
    }
    if (showLoader) {
      setLoader(false)
    }
  };

  const checkError = (error) => {
    const unauthorizedErrorStatus = 401;
    const userNotFoundStatus = 400;
    const {status} = error.response;
    if (status === unauthorizedErrorStatus || status === userNotFoundStatus) {
      deleteToken();
      setIsAuth(false);
    }
  };
  const createNotification = (type, message, error) => {
    switch (type) {
      case 'info':
        setTypeMessage(type);
        setTextMessage(message);
        setOpenNotif(true);
        break;
      case 'success':
        setTypeMessage(type);
        setTextMessage(message);
        setOpenNotif(true);
        break;
      case 'warning':
        setTypeMessage(type);
        setTextMessage(message);
        setOpenNotif(true);
        break;
      case 'error':
        setTypeMessage(type);
        setTextMessage(message);
        setOpenNotif(true);
        checkError(error);
        break;
      case 'errorAuth':
        setTypeMessage('error');
        setTextMessage(message);
        setOpenNotif(true);
        break;
    }
  };

  const handleCloseNotif = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenNotif(false);
  };

  if (showLoader) {
    return null
  }

  return (<>
    <MuiThemeProvider theme={theme}>
      <CssBaseline/>
      <Router>
        <Switch>
          <AuthRoute
            setIsAuth={setIsAuth}
            isAuth={isAuth}
            getInfo={getInfo}
            userInfo={userInfo}
            createNotification={createNotification}
            exact
            protectedRoute
            path='/'
            component={Dashboard}
          />
          <AuthRoute exact isAuth={isAuth} getInfo={getInfo} createNotification={createNotification} path='/login'
                     component={Login}/>
          <AuthRoute exact isAuth={isAuth} getInfo={getInfo} createNotification={createNotification} path='/register'
                     component={Register}/>
        </Switch>
      </Router>
    </MuiThemeProvider>
    <Snackbar open={openNotif} autoHideDuration={3000} onClose={handleCloseNotif}>
      <Alert onClose={handleCloseNotif} severity={typeMessage}>
        {textMessage}
      </Alert>
    </Snackbar>
  </>)
};

export default App
