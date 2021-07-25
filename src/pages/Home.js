import Grid from "@material-ui/core/Grid";
import React, { useState, useEffect } from "react";
import axios from "axios";
import data from "../data.json";
import PropTypes from "prop-types";

import Scream from "../components/Scream";
import Profile from "../components/Profile";
// redux
import { connect } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";

const mapStateToProps = (state) => {
  return {
    data: state.data,
  };
};

const Home = (props) => {
  const {
    getScreams,
    data: { screams, loading },
  } = props;
  //Adding fetched screams to the screams state
  useEffect(() => {
    getScreams();
  }, []);

  let recentScreamsMarkup = !loading ? (
    screams
      .slice(0, 20)
      .map((scream) => <Scream key={scream.screamId} scream={scream} />)
  ) : (
    <p>Loading....</p>
  );

  return (
    <Grid container spacing={2}>
      <Grid item sm={8} xs={12}>
        {recentScreamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
};

Home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getScreams })(Home);
