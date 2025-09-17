import React from 'react';
import { ListItem, ListItemIcon, ListItemText, ListSubheader } from '@material-ui/core';
import { ShoppingCart, Home, BarChart, Assignment, Language, DateRange, Sms, Create, Dvr, Add } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const style = { textDecoration:'none', color:'inherit' }

export const mainListItems = (
  <div>
    <Link to="/landing" style={style}>
      <ListItem button>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </Link>
    <Link to="/mycourses" style={style}>
      <ListItem button>
        <ListItemIcon>
          <ShoppingCart />
        </ListItemIcon>
        <ListItemText primary="My Courses" />
      </ListItem>
    </Link>
    <Link to="/reports" style={style}>
      <ListItem button>
        <ListItemIcon>
          <BarChart />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItem>
    </Link>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Overview</ListSubheader>
    <Link to="intro" style={style}>
      <ListItem button>
        <ListItemIcon>
          <Dvr />
        </ListItemIcon>
        <ListItemText primary="Introduction" />
      </ListItem>
    </Link>
    <Link to="topic1" style={style}>
      <ListItem button>
        <ListItemIcon>
          <Create />
        </ListItemIcon>
        <ListItemText primary="Topic 1" />
      </ListItem>
    </Link>
    <Link to="quiz1" style={style}>
      <ListItem button>
        <ListItemIcon>
          <Assignment />
        </ListItemIcon>
        <ListItemText primary="Quiz 1" />
      </ListItem>
    </Link>
    <Link to="topic2" style={style}>
      <ListItem button>
        <ListItemIcon>
          <Create />
        </ListItemIcon>
        <ListItemText primary="Topic 2" />
      </ListItem>
    </Link>
    <Link to="finalquiz" style={style}>
      <ListItem button>
        <ListItemIcon>
          <Assignment />
        </ListItemIcon>
        <ListItemText primary="Final Quiz" />
      </ListItem>
    </Link>
  </div>
);

export const advantagesItems = (
  <div>
    <ListItem>
      <ListItemIcon>
        <Language />
      </ListItemIcon>
      <ListItemText primary="100% online courses" />
    </ListItem>
    <ListItem>
      <ListItemIcon>
        <DateRange />
      </ListItemIcon>
      <ListItemText primary="Flexible Schedule" />
    </ListItem>
    <ListItem>
      <ListItemIcon>
        <Sms />
      </ListItemIcon>
      <ListItemText primary="English" />
    </ListItem>
  </div>
);

export const mainListItemsInstructor = (
  <div>
    <Link to="/landing" style={style}>
      <ListItem button>
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </Link>
    <Link to="/mycourses" style={style}>
      <ListItem button>
        <ListItemIcon>
          <ShoppingCart />
        </ListItemIcon>
        <ListItemText primary="My Courses" />
      </ListItem>
    </Link>
    {/* <Link style={style}> */}
    <a href="https://forms.gle/DsiF5mZcp92ibjL78" target="__blank">
      <ListItem button>
        <ListItemIcon>
          <Add />
        </ListItemIcon>
        <ListItemText primary="Add a course" />
      </ListItem>
    </a>
    {/* </Link> */}
  </div>
);