import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import MyButton from "../util/MyButton";
//dayjs stuff
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
//MUI Stuff
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import ChatIcon from "@material-ui/icons/Chat";

// redux
import { connect } from "react-redux";
import { likeScream, UnlikeScream } from "../redux/actions/dataActions";

const styles = {
  card: {
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
    objectFit: "cover",
  },
  content: {
    padding: 25,
  },
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = {
  likeScream,
  UnlikeScream,
};

const Scream = (props) => {
  dayjs.extend(relativeTime);

  const {
    classes,
    scream: {
      body,
      createdAt,
      userImage,
      userHandle,
      screamId,
      likeCount,
      commentCount,
    },
  } = props;
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.image}
        image={userImage}
        title="Profile image"
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/users/${userHandle}`}
          color="primary"
        >
          {userHandle}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        {/* {likeButton}
        <span>{likeCount} Likes</span>
        <MyButton tip="comments" placement="top">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} comments</span> */}
      </CardContent>
    </Card>
  );
};

Scream.propTypes = {
  likeScream: PropTypes.func.isRequired,
  unlikeScream: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

//this makes me access a classes object in this component's props
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Scream));
