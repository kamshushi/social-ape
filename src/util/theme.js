const theme = {
  palette: {
    primary: {
      light: "#33c9dc",
      main: "#00bcd4",
      dark: "#008394",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: "#fff",
    },
  },
  typography: {
    useNextVariants: true,
  },
  spreadIt: {
    form: {
      textAlign: "center",
    },
    pageTitle: {
      margin: "5px auto",
    },
    image: {
      margin: "20px auto 10px auto",
    },
    textField: {
      margin: "10px auto",
    },
    button: {
      position: "relative",
      marginTop: 20,
      minHeight: 40,
    },
    customError: {
      color: "red",
      fontSize: "0.8rem",
      marginTop: 10,
    },
    progress: {
      position: "absolute",
    },
    invisibleSeparator: {
      border: "none",
      margin: 4,
    },
    visibleSeparator: {
      width: "100%",
      borderBottom: "1px solid rgba(0,0,0,0.1)",
      marginBottom: 20,
    },
  },
};
export default theme;
