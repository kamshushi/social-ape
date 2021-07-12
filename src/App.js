import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MuiThemeProvider } from "@material-ui/core/styles/";
import { createMuiTheme } from "@material-ui/core/styles/";
import themeFile from "./util/theme";
import jwtDecode from "jwt-decode";
//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/actionTypes";
import { logoutUser, getUserData } from "./redux/actions/userActions";
//Components
import Navbar from "./components/Navbar";
import AuthRoute from "./util/AuthRoute";
//Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import axios from "axios";

const theme = createMuiTheme(themeFile);

//if token is expired, user logs out
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    (logoutUser());
    // window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route path="/" component={Home} exact></Route>
                <AuthRoute path="/login" component={Login}></AuthRoute>
                <AuthRoute path="/signup" component={Signup}></AuthRoute>
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
