import {createStore, applyMiddleware, compose} from 'redux'
import {createBrowserHistory} from 'history'
import {routerMiddleware} from 'connected-react-router'
import thunk from 'redux-thunk'
import {persistStore, persistReducer} from 'redux-persist'
import expireReducer from 'redux-persist-expire'
import immutableTransform from 'redux-persist-transform-immutable'
import storage from 'redux-persist/lib/storage'
import createGraphQLSubscriptionsMiddleware from 'redux-graphql-subscriptions'
import createEncryptor from 'redux-persist-transform-encrypt'
// import { createOffline } from '@redux-offline/redux-offline'
// import offlineConfig from '@redux-offline/redux-offline/lib/defaults/index'
// import createSagaMiddleware from 'redux-saga'
// import axios from 'axios'

import reducers from './reducers' // Or wherever you keep your reducers
// import sagas from './sagas'

const history = createBrowserHistory()
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const subscriptionOption = {
  inactivityTimeout: 60000,
  lazy: true,
  reconnect: true,
  reconnectionAttempts: 5,
  timeout: 30000
}

const subscriptionUrl = process.env.REACT_APP_WS_URL || 'ws://localhost:4000'

// create graphql subscription middleware
const graphQLSubscriptionsMiddleware = createGraphQLSubscriptionsMiddleware(
  subscriptionUrl,
  subscriptionOption
)

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['notification', 'router', 'support', 'form', 'upload'],
  whitelist: ['auth'],
  transforms: [
    expireReducer('auth', {
      // (Optional) Key to be used for the time relative to which store is to be expired
      persistedAtKey: 'login',
      // (Required) Seconds after which store will be expired
      expireSeconds: 60 * 60 * 24,
      // (Optional) State to be used for resetting e.g. provide initial reducer state
      expiredState: {
        token: null,
        user: null,
        stores: [],
        permissions: [],
        isLoading: false,
        isRegister: false,
        error: ''
      },
      // (Optional) Use it if you don't want to manually set the time and want the store to
      // be automatically expired if the record is not updated in the `expireSeconds` time
      autoExpire: true
    }),
    // immutableTransform(),
    createEncryptor({
      secretKey: process.env.REACT_APP_REDUX_PERSIST_KEY,
      onError: function (error) {
        // Handle the error.
      }
    })
  ],
}

// using axios for effect
// const effect = (effect, _action) => axios(effect)
// const {
//   middleware: offlineMiddleware,
//   enhanceReducer: offlineEnhanceReducer,
//   enhanceStore: offlineEnhanceStore
// } = createOffline({
//   ...offlineConfig,
//   effect,
//   persist: false
// })

// persisted reducer
const persistedReducer = persistReducer(
  persistConfig,
  reducers(history)
  // offlineEnhanceReducer(reducers(history))
)


// create the saga middleware
// const sagaMiddleware = createSagaMiddleware()

// Create a history of your choosing (we're using a browser history in this case)

// Build the middleware for intercepting and dispatching navigation actions
// thunk
// offline middleware
// router middleware
// graphql subscriptions middleware
const middleware = [
  thunk,
  // sagaMiddleware,
  // offlineMiddleware,
  routerMiddleware(history),
  graphQLSubscriptionsMiddleware
]

// create store
// persist reducer
// offline store
// middleware
const store = createStore(
  persistedReducer,
  {},
  composeEnhancer(
    // offlineEnhanceStore,
    applyMiddleware(...middleware)
  )
)

// then run the saga
// sagaMiddleware.run(sagas)

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers', () => {
    store.replaceReducer(reducers(history));
  });
}

const persistor = persistStore(store)

export default {history, store, persistor}
