import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ScreamSkeleton from "../util/ScreamSkeleton";
import Scream from "../components/scream/Scream";
import StaticProfile from "../components/profile/StaticProfile";
import ProfileSkeleton from "../util/ProfileSkeleton";
// MUI
import Grid from "@material-ui/core/Grid";
// redux
import { connect } from "react-redux";
import { setCurrentUser } from "../redux/actions/dataActions";

const User = (props) => {
  const [screamIdParam, setScreamIdParam] = useState(null);

  const {
    data: {
      currentUser: { user, screams },
      loading,
    },
    setCurrentUser,
  } = props;
  useEffect(() => {
    const userHandle = props.match.params.handle;
    const screamId = props.match.params.screamId;
    if (screamId) {
      setScreamIdParam(screamId);
    }
    setCurrentUser(userHandle);
  }, []);

  const screamsMarkup = loading ? (
    <ScreamSkeleton />
  ) : screams === null ? (
    <p>No screams from this user</p>
  ) : !screamIdParam ? (
    screams.map((scream) => {
      console.log("waht");
      return <Scream key={scream.screamId} scream={scream} />;
    })
  ) : (
    screams.map((scream) => {
      if (scream.screamId !== screamIdParam) {
        return <Scream key={scream.screamId} scream={scream} />;
      } else {
        return <Scream key={scream.screamId} scream={scream} openDialog />;
      }
    })
  );
  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {screamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        {user === null ? <ProfileSkeleton /> : <StaticProfile profile={user} />}
      </Grid>
    </Grid>
  );
};

User.propTypes = {
  data: PropTypes.object.isRequired,
  setCurrentUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};

export default connect(mapStateToProps, { setCurrentUser })(User);
