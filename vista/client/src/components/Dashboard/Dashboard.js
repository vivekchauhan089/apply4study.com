/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Toolbar, List, Typography, Divider, IconButton, AppBar, Drawer, CssBaseline } from '@material-ui/core';
import { Menu, ChevronLeft, PowerSettingsNew } from '@material-ui/icons';
import clsx from 'clsx';
import useStyles from './DashboardStyles';
import { mainListItems, secondaryListItems, mainListItemsInstructor } from './listItems';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import About from './About';
import Intro from './Intro';
import QuestionCard from '../QuestionCard/QuestionCard';
import useDetails from '../useDetails';
import Home from '../Home/Home';
import UserRouter from '../router';
import Analysis from '../Analysis/Analysis';
import MyCourse from '../MyCourses/MyCourse';

export default function Dashboard () {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [setData, getData, user] = useDetails();

  useEffect(() => {
    // axios.get('http://localhost:9000/dashboard', {withCredentials:true})
    //   .then((res) => console.log(res));
    getData();
  }, [])

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const username = user.name === null? 'Vidhan Shah':user.name;
  const role = user.role === 'instructor'? true:false;
  const redirect = user.name === null? true:false;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Router>
      
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <Menu />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          {/* logout --------------------------- */}
          <IconButton>
            <a href="/">
              <PowerSettingsNew style={{fill: "white"}} />
            </a>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <Typography component="h6" variant="h6" color="inherit" my={2}>
              {username}
            </Typography>
            <ChevronLeft />
          </IconButton>
        </div> 
        <Divider />
        <Switch>
          <Route path="/course">
            <List>{mainListItems}</List>
            <Divider />
            <List>{secondaryListItems}</List>
          </Route>
          <Route>
          <List>{role?mainListItemsInstructor:mainListItems}</List>
            <Divider />
          </Route>
        </Switch>
      </Drawer>
      <Switch>
        <Route path="/mycourses"><MyCourse /></Route>
        <Route path="/reports"><Analysis /></Route>
        <Route path="/landing">
            <Home />
        </Route>
        <Route path="/course/intro"><Intro topic={0} /></Route>
        <Route path="/course/topic1"><Intro topic={1} /></Route>
        <Route path="/course/topic2"><Intro topic={2} /></Route>
        <Route path="/course/quiz1"><QuestionCard title="Quiz 1" /></Route>
        <Route path="/course/finalquiz"><QuestionCard title="Final Quiz" /></Route>
        <Route path="/course/:courseId"><About /></Route>
      </Switch>
    </Router>
    </div>
  );
}