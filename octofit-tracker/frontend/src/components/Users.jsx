import { useEffect, useState } from 'react'

const normalizeListResponse = (payload) => {
  if (Array.isArray(payload)) return payload
  if (payload && Array.isArray(payload.results)) return payload.results
  if (payload && Array.isArray(payload.items)) return payload.items
  if (payload && Array.isArray(payload.data)) return payload.data
  return []
}

function Users({ apiBaseUrl }) {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const codespaceEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  const endpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
    ? codespaceEndpoint
    : `${apiBaseUrl}/api/users/`

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        setError('')
        const response = await fetch(endpoint)
        if (!response.ok) throw new Error('Failed to fetch users')
        const payload = await response.json()
        setUsers(normalizeListResponse(payload))
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : 'Failed to fetch users')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [endpoint])

  return (
    <section>
      <h2 className="h4 mb-3">Users</h2>
      {loading && <p>Loading users...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-sm align-middle">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id ?? user.id ?? user.email}>
                  <td>{user.username ?? '-'}</td>
                  <td>{user.email ?? '-'}</td>
                  <td>{user.points ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Users
