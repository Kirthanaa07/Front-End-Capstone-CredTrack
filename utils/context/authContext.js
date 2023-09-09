// Context API Docs: https://beta.reactjs.org/learn/passing-data-deeply-with-context

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { firebase } from '../client';
import { createUserDb, getSingleUserDb, updateUserDb } from '../../api/userData';
import { getSinglePhysicianDb } from '../../api/physicianData';

const AuthContext = createContext();

AuthContext.displayName = 'AuthContext'; // Context object accepts a displayName string property. React DevTools uses this string to determine what to display for the context. https://reactjs.org/docs/context.html#contextdisplayname

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);

  // there are 3 states for the user:
  // null = application initial state, not yet loaded
  // false = user is not logged in, but the app has loaded
  // an object/value = user is logged in

  useEffect(() => {
    firebase.auth().onAuthStateChanged((fbUser) => {
      if (fbUser) {
        getSingleUserDb(fbUser.uid).then((data) => {
          if (data) {
            getSinglePhysicianDb(fbUser.uid).then((physician) => {
              if (physician) {
                setUser({ ...fbUser, isAdmin: data.isAdmin, isPhysician: true });
              } else {
                setUser({ ...fbUser, isAdmin: data.isAdmin, isPhysician: false });
              }
            });
          } else {
            createUserDb({
              uid: fbUser.uid,
              displayName: fbUser.displayName,
              isAdmin: false,
            }).then(({ name }) => {
              const patchPayload = { userId: name };
              updateUserDb(patchPayload);
              getSinglePhysicianDb(fbUser.uid).then((physician) => {
                if (physician) {
                  setUser({ ...fbUser, isAdmin: false, isPhysician: true });
                } else {
                  setUser({ ...fbUser, isAdmin: false, isPhysician: false });
                }
              });
            });
          }
        });
      } else {
        setUser(false);
      }
    }); // creates a single global listener for auth state changed
  }, []);

  const value = useMemo( // https://reactjs.org/docs/hooks-reference.html#usememo
    () => ({
      user,
      userLoading: user === null,
      // as long as user === null, will be true
      // As soon as the user value !== null, value will be false
    }),
    [user],
  );

  return <AuthContext.Provider value={value} {...props} />;
};
const AuthConsumer = AuthContext.Consumer;

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth, AuthConsumer };
