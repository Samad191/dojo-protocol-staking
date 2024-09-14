import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Theme from './theme'
import AppLayout from './router/Layout'
import { AppWalletProvider } from './WalletProvider'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

let password = 'dojocode918'

// console.log = () => {};
// console.log = () => console.error = () => console.warn = () => {}

// prompt password
// let _password = prompt('Enter password')

// if password is correct
// if (_password === password) {
  root.render(
    // <React.StrictMode>
      <Theme>
        <AppWalletProvider>
          <AppLayout />
        </AppWalletProvider>
      </Theme>
    // </React.StrictMode>
  )
// }
