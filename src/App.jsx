import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import LoginPage from './LoginPage'
import HomePage from './HomePage'
import JobsPage from './JobsPage'
import './App.css'
import NotFound from './NotFound'
import JobItemDetails from './JobItemDetails'
const App = () => (
    <Routes>
      <Route path="/" element={ <LoginPage /> }/>
      <Route path="/home" element={
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>} />
      <Route path="/jobsPage" element={<ProtectedRoute>
        <JobsPage />
        </ProtectedRoute>} />
      <Route path="/job/:id" element={<ProtectedRoute>
        <JobItemDetails />
      </ProtectedRoute>} />
      <Route path="*" element={
        <ProtectedRoute>
          <NotFound />
        </ProtectedRoute>} />
    </Routes>
)

export default App
