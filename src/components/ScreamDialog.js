import React, { Fragment, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import MyButton from "../util/MyButton";
import PropTypes from "prop-types";
import dayjs from "dayjs";
// MUI
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import CloseIcon from "@material-ui/icons/Close";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
// redux
import { connect } from "react-redux";
import { getScream } from "../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.spreadIt,
  invisibleSeparator: {
    border: "none",
    margin: 4,
  },
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover",
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    position: "absolute",
    left: "90%",
  },
  circularProgress: {},
});

const ScreamDialog = (props) => {
  const [open, setOpen] = useState(false);

  const {
    classes,
    scream: {
      screamId,
      body,
      createdAt,
      likeCount,
      commentCount,
      userImage,
      userHandle,
    },
    UI: { loading },
  } = props;

  const handleOpen = () => {
    setOpen(true);
    props.getScream(props.screamId);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const dialogMarkup = loading ? (
    <CircularProgress className={classes.circularProgress} size={100} />
  ) : (
    <Grid container spacing={16}>
      <Grid item sm={5}>
        <img src={userImage} alt="Profile" className={classes.profileImage} />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body1">{body}</Typography>
      </Grid>
    </Grid>
  );
  return (
    <Fragment>
      <MyButton
        onClick={handleOpen}
        tip="Expand Scream"
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

ScreamDialog.propTypes = {
  getScream: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  return {
    scream: state.data.scream,
    UI: state.UI,
  };
};
const mapDispatchToProps = {
  getScream,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ScreamDialog));
