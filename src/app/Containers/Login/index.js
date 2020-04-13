import React, {useState, useEffect} from 'react'
import {Typography, Paper, Avatar, Button, FormControl, Input, InputLabel} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import {Link, withRouter} from 'react-router-dom'

import {loginUser} from '../../common/thunks/user'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

const Login = ({classes, getInfo, createNotification}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showErrorEmail, setShowErrorEmail] = useState(false);
  const [disabledLogin, setDisabledLogin] = useState(true);
  useEffect(() => {
    if (password === '') {
      return setDisabledLogin(true);
    }
    if (!validateEmail(email)) {
      return setDisabledLogin(true);
    }
    setDisabledLogin(false);
  }, [email, password]);

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const {err} = await loginUser({email, password});
    if (err) {
      createNotification('errorAuth', 'Invalid email or password.');
    } else {
      getInfo();
    }
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    const stateError = !validateEmail(e.target.value);
    setShowErrorEmail(stateError);
  };

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <FormControl error={showErrorEmail} margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="off" autoFocus value={email}
                   onChange={onChangeEmail}/>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="off" value={password}
                   onChange={e => setPassword(e.target.value)}/>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={disabledLogin}
            className={classes.submit}>
            Sign in
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            color="secondary"
            component={Link}
            to="/register"
            className={classes.submit}>
            Register
          </Button>
        </form>
      </Paper>
    </main>
  )
};

export default withRouter(withStyles(styles)(Login))
