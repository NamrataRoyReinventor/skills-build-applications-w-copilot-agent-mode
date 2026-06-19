import { useEffect, useState } from 'react'

const normalizeListResponse = (payload) => {
  if (Array.isArray(payload)) return payload
  if (payload && Array.isArray(payload.results)) return payload.results
  if (payload && Array.isArray(payload.items)) return payload.items
  if (payload && Array.isArray(payload.data)) return payload.data
  return []
}

function Workouts({ apiBaseUrl }) {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true)
        setError('')
        const response = await fetch(`${apiBaseUrl}/workouts/`)
        if (!response.ok) throw new Error('Failed to fetch workouts')
        const payload = await response.json()
        setWorkouts(normalizeListResponse(payload))
      } catch (fetchError) {
        setError(fetchError instanceof Error ? fetchError.message : 'Failed to fetch workouts')
      } finally {
        setLoading(false)
      }
    }

    fetchWorkouts()
  }, [apiBaseUrl])

  return (
    <section>
      <h2 className="h4 mb-3">Workouts</h2>
      {loading && <p>Loading workouts...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row g-3">
          {workouts.map((workout) => (
            <article className="col-12 col-md-6" key={workout._id ?? workout.id ?? workout.title}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h3 className="h6 card-title">{workout.title ?? 'Workout'}</h3>
                  <p className="mb-1">Difficulty: {workout.difficulty ?? 'n/a'}</p>
                  <p className="mb-0">Duration: {workout.durationMinutes ?? 0} min</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Workouts
