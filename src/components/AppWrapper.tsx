import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MdChevronLeft from "@material-ui/icons/ChevronLeft";
import IconCloudDownload from "@material-ui/icons/CloudDownload";
import IconList from "@material-ui/icons/List";
import MdMenu from "@material-ui/icons/Menu";
import clsx from "clsx";
import React, { FunctionComponent, useState } from "react";
import { Link, RouteChildrenProps } from "react-router-dom";

interface Props {
  navigator: RouteChildrenProps;
}
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    height: "100%",
    width: "100%",
    // flexGrow: 1,
    // padding: theme.spacing(3),
    // marginLeft: theme.spacing(9) + 1,
  },
}));

const AppWrapper: FunctionComponent<Props> = ({ children, navigator }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  console.log(navigator);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, { [classes.appBarShift]: open })}
      >
        <Toolbar>
          <IconButton
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
            edge="start"
            color="inherit"
            onClick={handleDrawerOpen}
          >
            <MdMenu />
          </IconButton>
          <Typography variant="h6" noWrap>
            Typescript dojo
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            <MdChevronLeft />
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to="/app/todos">
            <ListItem
              button
              selected={navigator.location.pathname === "/app/todos"}
            >
              <ListItemIcon>
                <IconList />
              </ListItemIcon>
              <ListItemText primary="Todos" />
            </ListItem>
          </Link>
          <Link to="/app/fetch">
            <ListItem
              button
              selected={navigator.location.pathname === "/app/fetch"}
            >
              <ListItemIcon>
                <IconCloudDownload />
              </ListItemIcon>
              <ListItemText primary="Fetch" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Box>{children}</Box>
      </main>
    </React.Fragment>
  );
};

export default AppWrapper;
