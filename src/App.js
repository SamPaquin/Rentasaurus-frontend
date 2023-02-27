import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { AuthContext } from "./shared/context/AuthContext";
import Home from "./home/Home";
import LoadingEgg from "./shared/components/UIElements/LoadingEgg";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { useAuth } from "./shared/hooks/auth-hook";

const Auth = React.lazy(() => import("./auth/Auth"));
const ExistingReport = React.lazy(() =>
  import("./reports/pages/ExistingReport")
);
const NewReport = React.lazy(() => import("./reports/pages/NewReport"));
const UpdateReport = React.lazy(() => import("./reports/pages/UpdateReport"));
const UserReports = React.lazy(() => import("./reports/pages/UserReports"));

const App = () => {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/:userId/reports" exact>
          <UserReports />
        </Route>
        <Route path="/reports/new" exact>
          <NewReport />
        </Route>
        <Route path="/reports/edit/:reportId">
          <UpdateReport />
        </Route>
        <Route path="/reports/report/:reportId">
          <ExistingReport />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/:userId/reports" exact>
          <UserReports />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Suspense
            fallback={
              <div className="center">
                <LoadingEgg />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
