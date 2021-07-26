import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

// MUI
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
// redux
import { connect } from "react-redux";
import { submitComment } from "../../redux/actions/dataActions";

const styles = (theme) => ({
  ...theme.spreadIt,
});

const CommentForm = (props) => {
  const [body, setBody] = useState("");

  const {
    classes,
    screamId,
    authenticated,
    UI: { errors },
  } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    props.submitComment(screamId, { body: body });
  };
  const handleChange = (e) => {
    setBody(e.target.value);
  };
  useEffect(() => {
    if (Object.keys(errors).length === 0) {
      setBody("");
    }
  }, [errors]);
  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on Scream"
          error={errors.comment ? true : false}
          helperText={errors.comment}
          value={body}
          onChange={handleChange}
          fullWidth
          className={classes.TextField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Submit
        </Button>
      </form>
      <hr className={classes.visibleSeparator} />
    </Grid>
  ) : null;

  return commentFormMarkup;
};

CommentForm.propTypes = {
  screamId: PropTypes.string.isRequired,
  UI: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  submitComment: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  return {
    UI: state.UI,
    authenticated: state.user.authenticated,
  };
};
export default connect(mapStateToProps, { submitComment })(
  withStyles(styles)(CommentForm)
);
