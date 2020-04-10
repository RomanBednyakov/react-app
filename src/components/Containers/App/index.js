import React, {useEffect, useState} from 'react';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import {CssBaseline} from '@material-ui/core';
import {BrowserRouter as Router, Switch} from 'react-router-dom';

import Dashboard from '../Dashboard';
import Register from '../Register';
import Login from '../Login';
import AuthRoute from '../../Components/AuthRoute';
import ProtectedRoute from '../../Components/ProtectedRoute';
import {getUserInfo, getToken, deleteToken} from '../../common/api';

const theme = createMuiTheme();

const App = () => {
    const [isAuth, setIsAuth] = useState(false);
    const [showLoader, setLoader] = useState(true);
    const [userInfo, setUserInfo] = useState({});

    useEffect( () => {
        if (getToken()) {
            getInfo().then(() => {});
        } else {
            setLoader(false)
        }
    }, []);

    const getInfo = async () => {
        const response = await getUserInfo();
        if (response) {
            setUserInfo(response.user_info_token);
            setIsAuth(true);
        } else {
            setIsAuth(false);
        }
        setLoader(false)
    };

    const redirectToLogin = () => {
        deleteToken();
        setIsAuth(false);
    };

    const checkError = (error) => {
        if (401 === error.response.status) {
            deleteToken();
            setIsAuth(false);
        }
    };

    if (showLoader) {
        return null
    }

    return (<MuiThemeProvider theme={theme}>
        <CssBaseline/>
        <Router>
            <Switch>
                <ProtectedRoute
                    setIsAuth={setIsAuth}
                    isAuth={isAuth}
                    getInfo={getInfo}
                    checkError={checkError}
                    userInfo={userInfo}
                    exact
                    path='/'
                    component={Dashboard}
                />
                <AuthRoute exact isAuth={isAuth} getInfo={getInfo} path='/login' component={Login}/>
                <AuthRoute exact isAuth={isAuth} getInfo={getInfo} path='/register' component={Register}/>
            </Switch>
        </Router>
    </MuiThemeProvider>)

}

export default App
