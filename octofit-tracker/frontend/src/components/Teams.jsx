import { useEffect, useState } from 'react'

const normalizeListResponse = (payload) => {
  if (Array.isArray(payload)) return payload
  if (payload && Array.isArray(payload.results)) return payload.results
  if (payload && Array.isArray(payload.items)) return payload.items
  if (payload && Array.isArray(payload.data)) return payload.data
  return []
}

function Teams({ apiBaseUrl }) {
  const [teams, setTeams] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true)
        setError('')
        const response = await fetch(`${apiBaseUrl}/teams/`)
        if (!response.ok) throw new Error('Failed to fetch teams')
        const payload = await response.json()
        setTeams(normalizeListResponse(payload))
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : 'Failed to fetch teams')
      } finally {
        setLoading(false)
      }
    }

    fetchTeams()
  }, [apiBaseUrl])

  return (
    <section>
      <h2 className="h4 mb-3">Teams</h2>
      {loading && <p>Loading teams...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row g-3">
          {teams.map((team) => (
            <article className="col-12 col-md-6" key={team._id ?? team.id ?? team.name}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h3 className="h6 card-title">{team.name ?? 'Unnamed Team'}</h3>
                  <p className="card-text text-muted mb-2">{team.description ?? 'No description'}</p>
                  <p className="mb-0">Score: {team.score ?? 0}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Teams
