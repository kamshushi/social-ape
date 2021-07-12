import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//redux
const mapStateToProps = (state) => {
  return {
    authenticated: state.user.authenticated,
  };
};

const AuthRoute = ({ component: Component, authenticated, ...rest }) => {
  return (
    <div>
      <Route
        {...rest}
        render={(props) =>
          authenticated === true ? (
            <Redirect to="/" />
          ) : (
            <Component {...props} />
          )
        }
      />
    </div>
  );
};

AuthRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(AuthRoute);
