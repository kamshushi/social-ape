import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// MUI
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";
// Redux
import { connect } from "react-redux";
import { markNotificationsRead } from "../../redux/actions/userActions";

const Notifications = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const { notifications } = props;
  dayjs.extend(relativeTime);

  const handleOpen = (e) => {
    setAnchorEl(e.target);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const onMenuOpened = () => {
    let unreadNotificationsIds = notifications
      .filter((notif) => !notif.read)
      .map((notif) => notif.notificationId);
    props.markNotificationsRead(unreadNotificationsIds);
  };

  let notificationsIcon;
  if (notifications && notifications.length > 0) {
    const unreadNotifCount = notifications.filter(
      (notif) => notif.read === false
    ).length;
    unreadNotifCount > 0
      ? (notificationsIcon = (
          <Badge badgeContent={unreadNotifCount} color="secondary">
            <NotificationsIcon />
          </Badge>
        ))
      : (notificationsIcon = <NotificationsIcon />);
  } else {
    notificationsIcon = <NotificationsIcon />;
  }

  let notificationsMarkup =
    notifications && notifications.length > 0 ? (
      notifications.map((notif) => {
        const action = notif.type === "like" ? "liked" : "commeted on";
        const time = dayjs(notif.createdAt).fromNow();
        const iconColor = notif.read ? "primary" : "secondary";
        const icon =
          notif.type === "like" ? (
            <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
          ) : (
            <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
          );
        return (
          <MenuItem key={notif.createdAt} onClick={handleClose}>
            {icon}
            <Typography
              component={Link}
              color="textSecondary"
              variant="body1"
              to={`/users/${notif.recipient}/scream/${notif.screamId}`}
            >
              {notif.sender} {action} your scream {time}
            </Typography>
          </MenuItem>
        );
      })
    ) : (
      <MenuItem onClick={handleClose}>You have no notifications yet</MenuItem>
    );
  return (
    <Fragment>
      <Tooltip placement="top" title="Notifications">
        <IconButton
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
        >
          {notificationsIcon}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onEntered={onMenuOpened}
        style={{ top: "40px" }}
      >
        {notificationsMarkup}
      </Menu>
    </Fragment>
  );
};

Notifications.propTypes = {
  markNotificationsRead: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
});
export default connect(mapStateToProps, { markNotificationsRead })(
  Notifications
);
