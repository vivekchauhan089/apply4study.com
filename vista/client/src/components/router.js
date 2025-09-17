import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AppBar, Button, CssBaseline, Toolbar, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ExitToApp, PersonAdd } from '@material-ui/icons';
import SignInSide from './logIn';
import SignUp from './register'; 
import Home from './Home/Home';

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: 'rgb(91, 50, 226)',
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
    color: '#fff',
    borderColor: '#fff',
  },
}));

export default function userRouter() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <Router>
      <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            <Link to="/">
              <img src={require('../assets/images/logo.png')} height="60" alt="logo" style={{marginTop:"5px",float:"left"}} />
            </Link>
          </Typography>
            {/* For sm-xl screen sizes */}
            <Box display={{ xs: 'none', sm: 'block' }}>
                <Link to="/logIn">
                 <Button href="#" color="primary" variant="outlined" className={classes.link}>Login</Button>
                </Link>
                <Link to="/register">
                  <Button href="#" color="primary" variant="outlined" className={classes.link}>Sign Up</Button>
                </Link>
            </Box>
            {/* for xs screen size */}
            <Box display={{ xs: 'block', sm: 'none' }}>
                <Link to="/logIn">
                  <Button href="#" color="primary">
                    <ExitToApp className={classes.link} />
                  </Button>
                </Link>
                <Link to="/register">
                  <Button href="#" color="primary">
                    <PersonAdd className={classes.link} />
                  </Button>
                </Link>
            </Box>
        </Toolbar>
      </AppBar>
      <Switch>
        <Route path="/logIn"><SignInSide/></Route>
        <Route path="/register"><SignUp /></Route>
        {/* dashboard-------------------------------------------- */}
        {/* <Route path="/dashboard"><Dashboard /></Route> */}
        {/* home------------------------------------------------------- */}
        <Route exact path="/"><Home /></Route>
      </Switch>
      </Router>
    </React.Fragment>
  );
}