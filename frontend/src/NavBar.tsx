import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import useUser from './hooks/useUser';

const NavBar = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <nav>
            {user ? (
                <button
                    className="login"
                    onClick={() => {
                        signOut(getAuth());
                    }}
                >
                    LOG OUT
                </button>
            ) : (
                <button
                    className="login"
                    onClick={() => {
                        navigate('/login', {
                            state: { from: location.pathname },
                        });
                    }}
                >
                    LOG IN
                </button>
            )}
            <Link className="about" to="/">
                i
            </Link>
            <Link to="/soundtrack_aor">SOUNDTRACK AOR</Link>
            <Link to="/popwave">popwave</Link>
            <Link to="/80s_90s_jazz_fusion">
                80s & 90s Jazz Fusion/Smooth Jazz
            </Link>
        </nav>
    );
};

export default NavBar;
