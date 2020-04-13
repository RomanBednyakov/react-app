import React, {useState} from 'react';
import {Typography, Paper, Avatar, Button, FormControl, Input, InputLabel} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import withStyles from '@material-ui/core/styles/withStyles';
import {Link, withRouter} from 'react-router-dom';

import {registerUser} from '../../common/thunks/user';

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

const Register = ({classes, getInfo, createNotification}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [copyPassword, setCopyPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [showErrorEmail, setShowErrorEmail] = useState(false);
  const [showErrorEmailMatch, setShowErrorEmailMatch] = useState(false);

  const setButtonState = () => {
    return !(validateEmail(email) && password === copyPassword);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    const {err} = await registerUser({username: name, password: password, email: email});
    if (err) {
      createNotification('errorAuth', 'A user with that email already exists');
      setShowErrorEmail(true);
    } else {
      getInfo();
    }
  };

  const onChangeCopyPassword = (e) => {
    const {value} = e.target;
    setCopyPassword(value);
    setShowError(value !== password);
  };
  const onChangePassword = (e) => {
    const {value} = e.target;
    setPassword(value);
    setShowError(value !== copyPassword);
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const onChangeEmail = (e) => {
    setShowErrorEmailMatch(false);
    setEmail(e.target.value);
    const stateError = !validateEmail(e.target.value);
    setShowErrorEmail(stateError);
    setButtonState();
  };

  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Register Account
        </Typography>
        <form className={classes.form} onSubmit={onSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input id="name" name="name" autoComplete="off" autoFocus value={name}
                   onChange={e => setName(e.target.value)}/>
          </FormControl>
          <FormControl error={showErrorEmail} margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="off" value={email}
                   onChange={onChangeEmail} aria-describedby="Email don`t correct"/>
            {showErrorEmailMatch && 'That email exists'}
          </FormControl>
          <FormControl error={showError} margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="off" value={password}
                   onChange={onChangePassword} aria-describedby="Password don`t match"/>
          </FormControl>
          <FormControl error={showError} margin="normal" required fullWidth>
            <InputLabel htmlFor="copyPassword">Match password</InputLabel>
            <Input name="copyPassword" type="password" id="copyPassword" autoComplete="off"
                   value={copyPassword} onChange={onChangeCopyPassword}
                   aria-describedby="Password don`t match"/>
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={setButtonState()}
          >
            Register
          </Button>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            component={Link}
            to="/login"
            className={classes.submit}>
            Go back to Login
          </Button>
        </form>
      </Paper>
    </main>
  )
};

export default withRouter(withStyles(styles)(Register))
