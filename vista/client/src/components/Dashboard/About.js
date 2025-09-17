/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { List, Typography, Container, Grid, Paper } from '@material-ui/core';
import clsx from 'clsx';
import useStyles from './DashboardStyles';
import { advantagesItems } from './listItems';
import details from './details.json';

export default function About () {
  const classes = useStyles();
  const [stat, setStat] = useState('Enroll');
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
            <Typography component="h3" variant="h4" color="inherit" gutterBottom className={classes.head}>
              {details.name}
            </Typography>
          <Grid container spacing={5}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Typography component="h3" variant="h5" color="inherit" className={classes.subhead}>
                  About this Course
                </Typography>
                <Typography component="h6" variant="h6" className={classes.disabled}>
                  {details.about}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <List>{advantagesItems}</List>
                {/* enroll button --------------------------*/}

                <a href="form.html" target="__blank" className={classes.payment}>{stat}</a>
      
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography component="h6" variant="h5" color="inherit" className={classes.subhead}>
                  Instructor's Note
                </Typography>
                <Typography component="h6" variant="h6" className={classes.disabled}>
                  {details.note}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
  );
}