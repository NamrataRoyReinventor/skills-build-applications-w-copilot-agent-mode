import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities'
import Leaderboard from './components/Leaderboard'
import Teams from './components/Teams'
import Users from './components/Users'
import Workouts from './components/Workouts'
import './App.css'

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  const apiBaseUrl = codespaceName?.trim()
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000'

  return (
    <div className="app-shell">
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div className="container py-2">
          <span className="navbar-brand fw-bold">OctoFit Tracker</span>
          <div className="navbar-nav gap-2">
            <NavLink className="btn btn-outline-primary btn-sm" to="/users">
              Users
            </NavLink>
            <NavLink className="btn btn-outline-primary btn-sm" to="/teams">
              Teams
            </NavLink>
            <NavLink className="btn btn-outline-primary btn-sm" to="/activities">
              Activities
            </NavLink>
            <NavLink className="btn btn-outline-primary btn-sm" to="/leaderboard">
              Leaderboard
            </NavLink>
            <NavLink className="btn btn-outline-primary btn-sm" to="/workouts">
              Workouts
            </NavLink>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        {!codespaceName?.trim() && (
          <div className="alert alert-warning" role="alert">
            VITE_CODESPACE_NAME is not set. Falling back to localhost API.
          </div>
        )}
        <p className="text-muted small mb-4">API Base URL: {apiBaseUrl}</p>

        <Routes>
          <Route path="/" element={<Navigate replace to="/users" />} />
          <Route path="/users" element={<Users apiBaseUrl={apiBaseUrl} />} />
          <Route path="/teams" element={<Teams apiBaseUrl={apiBaseUrl} />} />
          <Route path="/activities" element={<Activities apiBaseUrl={apiBaseUrl} />} />
          <Route path="/leaderboard" element={<Leaderboard apiBaseUrl={apiBaseUrl} />} />
          <Route path="/workouts" element={<Workouts apiBaseUrl={apiBaseUrl} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
