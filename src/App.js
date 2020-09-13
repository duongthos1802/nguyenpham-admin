import React, { Component, useEffect } from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { PersistGate } from 'redux-persist/es/integration/react'
import { IntlProvider, addLocaleData } from 'react-intl'
import { Route, Switch } from 'react-router-dom'

// import locale
import locale_en from 'react-intl/locale-data/en'
import locale_vi from 'react-intl/locale-data/vi'

// import translate messages
import translations from './i18n/locales'

// import AppNavigation from './AppNavigation'

import configStore from './configStore'
import { LANGUAGE } from './constants'
import Admin from './areas/Admin'

// add locale data
addLocaleData([...locale_en, ...locale_vi])

const App = () => {

  const locale = localStorage.getItem(LANGUAGE)
  const language = locale || 'en'
  // const locale = window.location.search.replace('?locale=', '') || 'vi'
  const messages = translations[language]

  return (
    <IntlProvider locale={language} key={locale} messages={messages}>
      <Provider store={configStore.store}>
        <PersistGate persistor={configStore.persistor}>
          {/* ConnectedRouter will use the store from Provider automatically */}
          <ConnectedRouter history={configStore.history}>
            {/* <ScrollToTop> */}
            <Switch key={'switch'}>
              <Route path={'/'} name={'Admin'} component={Admin}/>
            </Switch>
            {/* </ScrollToTop> */}
          </ConnectedRouter>
        </PersistGate>
      </Provider>
    </IntlProvider>
  )
}

export default App
