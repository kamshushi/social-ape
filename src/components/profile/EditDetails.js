import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// redux
import { connect } from "react-redux";
import { editUserDetails } from "../../redux/actions/userActions";

const styles = (theme) => ({
  ...theme.spreadIt,
  button: {
    float: "right",
  },
});

const mapStateToProps = (state) => {
  return {
    credentials: state.user.credentials,
  };
};

const EditDetails = (props) => {
  const [userDetails, setUserDetails] = useState({});
  const [open, setOpen] = useState(false);

  const { credentials, classes } = props;
  useEffect(() => {
    mapUserDetailsToState(credentials);
  }, [credentials]);
  const handleOpen = () => {
    setOpen(true);
    mapUserDetailsToState(credentials);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const mapUserDetailsToState = (credentials) => {
    setUserDetails({
      bio: credentials.bio ? credentials.bio : "",
      website: credentials.website ? credentials.website : "",
      location: credentials.location ? credentials.location : "",
    });
  };
  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = () => {
    props.editUserDetails(userDetails);
    handleClose();
  };
  return (
    <Fragment>
      <MyButton
        tip="Edit Details"
        placement="top"
        onClick={handleOpen}
        btnClassName={classes.button}
      >
        <EditIcon color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              row="3"
              placeholder="A short bio about yourself"
              className={classes.textField}
              value={userDetails.bio}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="website"
              type="text"
              label="Website"
              placeholder="Your personal/professional website"
              className={classes.textField}
              value={userDetails.website}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="Where you live"
              className={classes.textField}
              value={userDetails.location}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

EditDetails.propTypes = {
  editUserDetails: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { editUserDetails })(
  withStyles(styles)(EditDetails)
);
