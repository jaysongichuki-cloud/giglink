import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './auth/ProtectedRoute'
import Home from './pages/Home'
import BrowseGigs from './pages/BrowseGigs'
import GigDetail from './pages/GigDetail'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CreateGig from './pages/CreateGig'
import EditGig from './pages/EditGig'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/gigs" element={<BrowseGigs />} />
        <Route path="/gigs/:id" element={<GigDetail />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateGig />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gigs/:id/edit"
          element={
            <ProtectedRoute>
              <EditGig />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
