import { Link, useNavigate, useLocation } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import useUser from './hooks/useUser'

const NavBar = () => {

    const { user } = useUser()
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <nav>
            <div className="nav">
                <div className="nav-section">
                    <Link to="/">⌂</Link>
                </div>
                <div className="nav-section">
                    <Link to="/soundtrack_aor">SOUNDTRACK AOR</Link>
                </div>
                <div className="nav-section">
                    <Link to="/popwave">popwave</Link>
                </div>
                <div className="nav-section">
                    <Link to="/80s_90s_jazz_fusion">80s & 90s Jazz Fusion/Smooth Jazz</Link>
                </div>
                {user
                    ? <button onClick={() => { signOut(getAuth()) }}>LOG OUT</button>
                    : <button onClick={() => { navigate('/login', { state: { from: location.pathname } }) }}>LOG IN</button>
                }
            </div>
        </nav>
    );
}

export default NavBar