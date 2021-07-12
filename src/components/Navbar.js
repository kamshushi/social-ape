import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
// redux
import { connect } from "react-redux";
//Material UI Stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import NotificationsIcon from "@material-ui/icons/Notifications";

const mapStateToProps = (state) => {
  return {
    authenticated: state.user.authenticated,
  };
};

const navbar = (props) => {
  const { authenticated } = props;
  return (
    <AppBar position="fixed">
      <Toolbar className="nav-container">
        {authenticated ? (
          <Fragment>
            <MyButton tip="Post a scream">
              <AddIcon color="primary" />
            </MyButton>
            <Link to="/">
              <MyButton tip="Home">
                <HomeIcon color="primary" />
              </MyButton>
            </Link>
            <MyButton tip="Notifications">
              <NotificationsIcon color="primary" />
            </MyButton>
          </Fragment>
        ) : (
          <Fragment>
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/signup">
              Signup
            </Button>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
};

navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(navbar);
