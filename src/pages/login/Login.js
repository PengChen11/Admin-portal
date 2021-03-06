import React, { useState } from 'react';
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  // Tabs,
  // Tab,
  TextField,
  Fade,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
// import classnames from "classnames";

// styles
import useStyles from './styles';

// logo
import logo from './logo.svg';
// import google from "../../images/google.svg";

// context
import { useUserDispatch, loginUser } from '../../context/UserContext';

function Login(props) {
  var classes = useStyles();

  // global
  var userDispatch = useUserDispatch();

  // local
  var [isLoading, setIsLoading] = useState(false);
  var [error, setError] = useState(null);
  // var [activeTabId, setActiveTabId] = useState(0);
  // var [nameValue, setNameValue] = useState("");
  var [loginValue, setLoginValue] = useState('');
  var [passwordValue, setPasswordValue] = useState('');

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>Admin Portal</Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <h2 style={{fontSize:'5vmin'}}>Welcome back!</h2>

          <React.Fragment>
            {/* <Typography variant="h1" className={classes.greeting}>
                Good Morning, User
              </Typography>
              <Button size="large" className={classes.googleButton}>
                <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;Sign in with Google
              </Button>
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>or</Typography>
                <div className={classes.formDivider} />
              </div> */}
            <Fade in={error}>
              <Typography color="secondary" className={classes.errorMessage}>
                  Something is wrong with your login or password :(
              </Typography>
            </Fade>
            <TextField
              id="username"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={loginValue}
              onChange={e => setLoginValue(e.target.value)}
              margin="normal"
              placeholder="User Name"
              type="text"
              fullWidth
            />
            <TextField
              id="password"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={passwordValue}
              onChange={e => setPasswordValue(e.target.value)}
              margin="normal"
              placeholder="Password"
              type="password"
              fullWidth
            />
            <div className={classes.formButtons}>
              {isLoading ? (
                <CircularProgress size={26} className={classes.loginLoader} />
              ) : (
                <Button
                  disabled={
                    loginValue.length === 0 || passwordValue.length === 0
                  }
                  onClick={() =>
                    loginUser(
                      userDispatch,
                      loginValue,
                      passwordValue,
                      props.history,
                      setIsLoading,
                      setError,
                    )
                  }
                  variant="contained"
                  color="primary"
                  size="large"
                >
                    Login
                </Button>
              )}
              <Button
                color="primary"
                size="large"
                className={classes.forgetButton}
              >
                  Forget Password
              </Button>
            </div>
          </React.Fragment>
        </div>
        <Typography color="primary" className={classes.copyright}>
        © 2020-{new Date().getFullYear()} <a style={{ textDecoration: 'none', color: 'inherit' }} href="https://pengchen.work" rel="noopener noreferrer" target="_blank">pengchen.work</a>, all rights reserved.
        </Typography>
      </div>
    </Grid>
  );
}
import PropTypes from 'prop-types';
Login.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Login);
