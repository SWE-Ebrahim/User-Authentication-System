import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import './index.css'
import './styles/globals.css'
import App from './App'

// Entry point of the React application
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode enables additional checks and warnings for React components
  <React.StrictMode>
    {/* Redux Provider makes the store available to all components in the app */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)