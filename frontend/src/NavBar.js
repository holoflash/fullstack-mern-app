import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import useUser from './hooks/useUser'

const NavBar = () => {

    const { user } = useUser()
    const navigate = useNavigate()
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/soundtrack_aor">SOUNDTRACK AOR</Link>
                </li>
                <li>
                    <Link to="/popwave">Popwave</Link>
                </li>
                <li>
                    <Link to="/80s_90s_jazz_fusion">80s & 90s Jazz Fusion/Smooth Jazz</Link>
                </li>
            </ul>
            <div className="nav-right">
                {user
                    ? <button onClick={() => { signOut(getAuth()) }}>Log Out</button>
                    : <button onClick={() => { navigate('/login') }}>Log In</button>
                }
            </div>
        </nav>
    );
}

export default NavBar