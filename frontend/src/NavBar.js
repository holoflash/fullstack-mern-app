import { Link, useNavigate, useLocation } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import useUser from './hooks/useUser'

const NavBar = () => {

    const { user } = useUser()
    const navigate = useNavigate()
    const location = useLocation()

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">⌂</Link>
                </li>
                <li>
                    <Link to="/soundtrack_aor">SOUNDTRACK AOR</Link>
                </li>
                <li>
                    <Link to="/popwave">popwave</Link>
                </li>
                <li>
                    <Link to="/80s_90s_jazz_fusion">80s & 90s Jazz Fusion/Smooth Jazz</Link>
                </li>
                {user
                    ? <button onClick={() => { signOut(getAuth()) }}>Log Out</button>
                    : <button onClick={() => { navigate('/login', { state: { from: location.pathname } }) }}>Log In</button>
                }
            </ul>
        </nav>
    );
}

export default NavBar