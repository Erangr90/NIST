import { useNavigate } from "react-router-dom"
import "../styles/home.css"
function Home() {
  const navigate = useNavigate()
  return (
    <div className="home-div">
      <h1 className="home-title">Welcome to the Home Page</h1>
      <div className="home-buttons">
        <button className="home-btn" onClick={() => navigate("/login")}>
          Login
        </button>
        <button className="home-btn" onClick={() => navigate("/register")}>
          Register
        </button>
      </div>
    </div>
  )
}

export default Home
