import Grid from "@material-ui/core/Grid";
import React, { useState, useEffect } from "react";
import axios from "axios";
import data from "../data.json";

import Scream from "../components/Scream";
import Profile from "../components/Profile";

const Home = () => {
  const [screams, setScreams] = useState(null);

  //Adding fetched screams to the screams state
  useEffect(() => {
    setScreams(data.slice(0, 2));
    // axios
    //   .get(
    //     "https://europe-west1-socialape-d081e.cloudfunctions.net/api/screams"
    //   )
    //   .then((res) => {
    //     //Adding only first 20 screams
    //     setScreams(res.data.slice(0, 20));
    //   })
    //   .catch((error) => console.log(error));
  }, []);

  let recentScreamsMarkup = screams ? (
    screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
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

export default Home;
