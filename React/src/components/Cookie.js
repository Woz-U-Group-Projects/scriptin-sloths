import { createStore } from 'redux';
import { sessionService } from 'redux-react-session';
import { combineReducers } from 'redux';
import { sessionReducer } from 'redux-react-session';
 
const reducers = {
  // ... your other reducers here ...
  session: sessionReducer
};

const reducer = combineReducers(reducers);
 
const store = createStore(reducer)

const validateSession = (session) => {
  // check if your session is still valid
  return true;
}

const options = { refreshOnCheckAuth: true, redirectPath: '/home', driver: 'COOKIES', validateSession };
 
sessionService.initSessionService(store, options)
  .then(() => console.log('Redux React Session is ready and a session was refreshed from your storage'))
  .catch(() => console.log('Redux React Session is ready and there is no session in your storage'));