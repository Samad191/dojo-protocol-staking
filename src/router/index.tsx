import { FC } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom'
import Navbar from '../components/Navbar'
import Staking from '../pages/Staking'

const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path='/' element={<Staking />} />

      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}

const AppRouter: FC = () => {
  return (
    <Router>
      <Navbar />
      <AppRoutes />
    </Router>
  )
}

export default AppRouter
