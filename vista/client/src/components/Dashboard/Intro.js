/* eslint-disable no-unused-vars */
import React from 'react';
import { List, Typography, Container, Grid, Paper } from '@material-ui/core';
import clsx from 'clsx';
import useStyles from './DashboardStyles';
import details from './details.json';
import CodeDisplay from '../CodeDisplay';

export default function Intro (props) {
  const classes = useStyles();
  
  const detail = details.topics[props.topic];
  const url = detail.url;
  const string = url.split("=");

  return (
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
            <Typography component="h3" variant="h4" color="inherit" gutterBottom className={classes.head}>
              {detail.title}
            </Typography>

          <Grid container spacing={8}>
            <Grid item xs={12} md={6}>    
                <Paper style={{marginBottom: "3vw",padding: "0",backgroundColor: "#000",textAlign: 'center'}}>

                  <iframe  
                  src={`https://www.youtube.com/embed/${string[1]}`} 
                  title="YouTube video player" 
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen 
                  className={classes.video}
                  />

                </Paper>

                <Paper className={classes.paper}>
                  <Typography component="h6" variant="h5" color="inherit" className={classes.subhead}>
                    Additional Resources
                  </Typography>
                  <Typography component="h6" variant="h6" className={classes.disabled}>
                    {detail.text}
                  </Typography>
                  <CodeDisplay />
                </Paper>
            </Grid>

            <Grid item xs={12} md={5}>
              <Paper style={{marginBottom: "3vw",padding: "0",backgroundColor: "#000",textAlign: 'center', position: 'fixed', marginRight: '10px'}}>
                <iframe src="https://ide.codingblocks.com/" className={classes.editor} title="Coding Blocks" frameborder="0" allowfullscreen />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
  );
}