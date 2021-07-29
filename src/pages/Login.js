import React, { useState } from "react";
import PropTypes from "prop-types";
import AppIcon from "../images/icon.png";
import { Link } from "react-router-dom";
//MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
//Redux stuff
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const styles = (theme) => {
  return { ...theme.spreadIt };
};
//connecting redux
const mapStateToProps = (state) => {
  return {
    UI: state.UI,
  };
};
const mapActionsToProps = {
  loginUser,
};

const Login = (props) => {
  // const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ email: "", password: "" });

  const {
    classes,
    UI: { loading, errors },
  } = props;
  //Form Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();
    props.loginUser(formData, props.history);
  };
  //Change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="monkey" className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          Login
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            helperText={errors.email}
            error={errors.email ? true : false}
            className={classes.textField}
            value={formData.email}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            helperText={errors.password}
            error={errors.password ? true : false}
            className={classes.textField}
            value={formData.password}
            onChange={handleChange}
            fullWidth
          />
          {errors.general && (
            <Typography variant="body2" className={classes.customError}>
              {errors.general}
            </Typography>
          )}
          <Button
            disabled={loading}
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >
            {loading ? (
              <CircularProgress size={30} className={classes.progress} />
            ) : (
              `Login`
            )}
          </Button>
          <br />
          <small>
            Don't have an account ? <Link to="/signup">Signup</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Login));
