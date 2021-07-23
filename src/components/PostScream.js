import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import ToolTip from "@material-ui/core/Tooltip";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

// redux
import { connect } from "react-redux";
import { postScream } from "../redux/actions/dataActions";
import { clearErrors } from "../redux/actions/uiActions";

const styles = (theme) => {
  return {
    ...theme.spreadIt,
    submitButton: {
      position: "relative",
    },
    progressSpinner: {
      position: "absolute",
    },
    closeButton: {
      position: "absolute",
      left: "90%",
      top: "10%",
    },
  };
};
const PostScream = (props) => {
  const [open, setOpen] = useState(false);
  const [body, setBody] = useState({ body: "" });
  // const [errors, setErrors] = useState({});

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    console.log("cleared");
    props.clearErrors();
    setOpen(false);
  };
  const handleChange = (e) => {
    setBody({
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    props.postScream(body);
    setBody("");
  };
  // useEffect(() => {
  //   if (!props.UI.errors && !props.UI.loading) {
  //     handleClose();
  //   }
  // }, [props.UI.errors]);
  const {
    classes,
    UI: { errors, loading },
  } = props;
  return (
    <Fragment>
      <MyButton onClick={handleOpen} tip="Post a Scream">
        <AddIcon />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Post a new Scream</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="SCREAM!!"
              multiline
              rows="3"
              placeholder="Scream at your fellow apes"
              error={errors.body ? true : false}
              helperText={errors.body}
              className={classes.textField}
              onChange={handleChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={loading}
            >
              Submit
              {loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

PostScream.propTypes = {
  postScream: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    UI: state.UI,
  };
};

export default connect(mapStateToProps, { postScream, clearErrors })(
  withStyles(styles)(PostScream)
);
