import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ReactQueryProvider } from './app/config/react-query'
import { persistor, store } from './app/store'
import './index.css'
import { Toaster } from 'sonner'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ReactQueryProvider>
          <App />
          <Toaster />
        </ReactQueryProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
