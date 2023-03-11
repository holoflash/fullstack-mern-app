import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import enterKeySubmit from '../util/enterKeySubmit';

const CreateAccountPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const createAccount = async () => {
        try {
            if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }
            await createUserWithEmailAndPassword(getAuth(), email, password);
            if (location.state && location.state.from) {
                navigate(location.state.from);
            } else {
                navigate('/');
            }
        } catch (error) {
            let message = 'Unkown Error';
            if (error instanceof Error) message = error.message;
            setError(message);
        }
    };

    return (
        <div className="container create-account">
            <h1>CREATE ACCOUNT</h1>
            {error && <p className="error">{error}</p>}
            <input
                required
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => enterKeySubmit(e, createAccount)}
            />
            <input
                required
                type="password"
                placeholder="Your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => enterKeySubmit(e, createAccount)}
            />
            <input
                required
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyDown={(e) => enterKeySubmit(e, createAccount)}
            />
            <button onClick={createAccount}>SIGN UP</button>
            <Link className="auth-link" to="/login">
                Already have an account? Log in here
            </Link>
        </div>
    );
};

export default CreateAccountPage;
