import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import store from './store'
import App from './App'

const delay = 10

ReactDOM.render(
  <Provider store={store}>
    <App delay={delay} />
  </Provider>,
  document.getElementById(`app`)
)
