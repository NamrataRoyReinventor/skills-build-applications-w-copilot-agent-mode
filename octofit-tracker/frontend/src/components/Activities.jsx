import { useEffect, useState } from 'react'

const normalizeListResponse = (payload) => {
  if (Array.isArray(payload)) return payload
  if (payload && Array.isArray(payload.results)) return payload.results
  if (payload && Array.isArray(payload.items)) return payload.items
  if (payload && Array.isArray(payload.data)) return payload.data
  return []
}

function Activities({ apiBaseUrl }) {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const codespaceEndpoint = `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  const endpoint = import.meta.env.VITE_CODESPACE_NAME?.trim()
    ? codespaceEndpoint
    : `${apiBaseUrl}/api/activities/`

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true)
        setError('')
        const response = await fetch(endpoint)
        if (!response.ok) throw new Error('Failed to fetch activities')
        const payload = await response.json()
        setActivities(normalizeListResponse(payload))
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : 'Failed to fetch activities')
      } finally {
        setLoading(false)
      }
    }

    fetchActivities()
  }, [endpoint])

  return (
    <section>
      <h2 className="h4 mb-3">Activities</h2>
      {loading && <p>Loading activities...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-sm align-middle">
            <thead>
              <tr>
                <th>Type</th>
                <th>Duration (min)</th>
                <th>Calories</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id ?? activity.id}>
                  <td>{activity.type ?? '-'}</td>
                  <td>{activity.durationMinutes ?? 0}</td>
                  <td>{activity.calories ?? 0}</td>
                  <td>{activity.user?.username ?? activity.user ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default Activities
