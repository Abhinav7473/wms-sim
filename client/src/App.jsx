import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import axios from 'axios'
import './App.css'
import Scene from './components/Scene'

function RobotPanel({ robots }) {
  return (
    <div className="robot-panel">
      <h2>Robot Status</h2>
      <div className="robot-list">
        {robots.map(robot => (
          <div key={robot.id} className="robot-card">
            <div className="robot-header">
              <span className="robot-id">{robot.id}</span>
              <span className={`status-badge status-${robot.status}`}>
                {robot.status}
              </span>
            </div>
            <div className="robot-details">
              <div>Battery: {robot.battery}%</div>
              <div>Position: ({robot.position[0].toFixed(1)}, {robot.position[2].toFixed(1)})</div>
              {robot.current_task && <div>Task: {robot.current_task}</div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function App() {
  const [robots, setRobots] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRobots = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/robots/')
        setRobots(response.data)
        setLoading(false)
      } catch (err) {
        console.error('Failed to fetch robots:', err)
        setError('Failed to connect to backend.')
        setLoading(false)
        
        setRobots([
          { id: 'R001', position: [-18, 0, 5], status: 'idle', battery: 85, current_task: null, aruco_marker_id: 1 },
          { id: 'R002', position: [-10, 0, 0], status: 'moving', battery: 72, current_task: 'PICK-A123', aruco_marker_id: 2 },
          { id: 'R003', position: [12, 0, 8], status: 'picking', battery: 91, current_task: 'PICK-B456', aruco_marker_id: 3 },
          { id: 'R004', position: [18, 0, -12], status: 'idle', battery: 100, current_task: null, aruco_marker_id: 4 },
        ])
      }
    }

    fetchRobots()
    const interval = setInterval(fetchRobots, 2000)
    return () => clearInterval(interval)
  }, [])

  if (loading) {
    return <div className="loading">Loading warehouse data...</div>
  }

  return (
    <div className="app">
      <header className="header">
        <h1>WMS Digital Twin</h1>
        <div className="header-stats">
          <span>Active Robots: {robots.length}</span>
          <span>•</span>
          <span>Real-time Sync</span>
        </div>
      </header>

      {error && <div className="error-banner">⚠️ {error} (Using mock data)</div>}

      <div className="main-container">
        <div className="canvas-container">
          <Canvas shadows>
            <Scene robots={robots} />
          </Canvas>
        </div>
        <RobotPanel robots={robots} />
      </div>
    </div>
  )
}

export default App