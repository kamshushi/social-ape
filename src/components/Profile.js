import React, { Fragment, useRef } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import EditDetails from "./EditDetails";
import MyButton from "../util/MyButton";
//MUI stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import ToolTip from "@material-ui/core/Tooltip";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
//Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
//redux
import { connect } from "react-redux";
import { logoutUser, uploadImage } from "../redux/actions/userActions";

const styles = (theme) => ({
  paper: {
    padding: 20,
  },
  profile: {
    "& .image-wrapper": {
      textAlign: "center",
      position: "relative",
      "& button": {
        position: "absolute",
        top: "80%",
        left: "70%",
      },
    },
    "& .profile-image": {
      width: 200,
      height: 200,
      objectFit: "cover",
      maxWidth: "100%",
      borderRadius: "50%",
    },
    "& .profile-details": {
      textAlign: "center",
      "& span, svg": {
        verticalAlign: "middle",
      },
      "& a": {
        color: theme.palette.primary.main,
      },
    },
    "& hr": {
      border: "none",
      margin: "0 0 10px 0",
    },
    "& svg.button": {
      "&:hover": {
        cursor: "pointer",
      },
    },
  },
  buttons: {
    textAlign: "center",
    "& a": {
      margin: "20px 10px",
    },
  },
});

//connecting redux
const mapStateToProps = (state) => {
  return {
    user: state.user,
    UI: state.UI,
  };
};
const mapDispatchToProps = {
  logoutUser,
  uploadImage,
};

const Profile = (props) => {
  const fileInput = useRef(null);
  const {
    classes,
    user: {
      loading,
      authenticated,
      credentials: { handle, createdAt, imageUrl, bio, website, location },
    },
  } = props;

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    props.uploadImage(formData);
  };
  const handleEditPicture = () => {
    fileInput.current.click();
  };

  const handleLogout = () => {
    props.logoutUser();
  };

  let profileMarkup = !loading ? (
    authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={imageUrl} alt="profile" className="profile-image" />
            <input
              ref={fileInput}
              hidden="hidden"
              type="file"
              id="imageInput"
              onChange={handleImageChange}
            />

            <MyButton
              tip="Edit profile picture..."
              onClick={handleEditPicture}
              btnClassName="button"
              placement="top"
            >
              <EditIcon color="primary" />
            </MyButton>
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink
              component={Link}
              to={`/users/${handle}`}
              color="primary"
              variant="h5"
            >
              @{handle}
            </MuiLink>
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            {location && (
              <Fragment>
                <LocationOn color="primary" /> <span>{location}</span>
                <hr />
              </Fragment>
            )}
            {website && (
              <Fragment>
                <LinkIcon color="primary" />
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {" "}
                  {website}
                </a>
                <hr />
              </Fragment>
            )}
            <CalendarToday color="primary" />{" "}
            <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
          </div>
          <MyButton tip="Logout" onClick={handleLogout} placement="top">
            <KeyboardReturn color="primary" />
          </MyButton>
          <EditDetails />
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          No profile found, please login again
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/login"
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/signup"
            >
              Signup
            </Button>
          </div>
        </Typography>
      </Paper>
    )
  ) : (
    <p>loading...</p>
  );
  return profileMarkup;
};

Profile.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Profile));
