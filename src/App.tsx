import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';

import LoginPage from './pages/Login/LoginPage';
import Home from './pages/Home';
import UserManagement from './pages/Admin/UserManagement';
import CollaboratorManagement from './pages/Admin/CollaboratorManagement';
import CollaboratorForm from './pages/Admin/CollaboratorForm';
import { AuthProvider, useAuth } from './contexts/AuthContext';

setupIonicReact();

/** Redirects authenticated users to the correct dashboard based on role */
const DashboardRedirect: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500 text-lg animate-pulse">Carregando...</div>
      </div>
    );
  }

  if (!user) return <Redirect to="/login" />;

  // Redirect to home as requested
  return <Redirect to="/home" />;
};

/** Redirects already-logged-in users away from the login page */
const LoginRoute: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;
  if (user) return <Redirect to="/home" />;
  return <LoginPage />;
};

const App: React.FC = () => (
  <IonApp>
    <AuthProvider>
      <IonReactRouter>
        <IonRouterOutlet>
          <Switch>
            <Route exact path="/login" component={LoginRoute} />
            <Route exact path="/dashboard/users" component={UserManagement} />
            <Route exact path="/dashboard/collaborators" component={CollaboratorManagement} />
            <Route exact path="/dashboard/collaborators/new" component={CollaboratorForm} />
            <Route exact path="/dashboard/collaborators/edit/:id" component={CollaboratorForm} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/dashboard" component={DashboardRedirect} />
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
          </Switch>
        </IonRouterOutlet>
      </IonReactRouter>
    </AuthProvider>
  </IonApp>
);

export default App;
