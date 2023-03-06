import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const location = useLocation()

    const logIn = async () => {
        try {
            await signInWithEmailAndPassword(getAuth(), email, password)
            if (location.state && location.state.from) {
                navigate(location.state.from)
            } else {
                navigate('/')
            }
        } catch (e) {
            setError(e.message)
        }
    }

    return (
        <div className="container log-in">
            <h1>LOG IN</h1>
            {error && <p className='error'>{error}</p>}
            <input
                placeholder='Your email address'
                value={email}
                onChange={(e => setEmail(e.target.value))}
            />
            <input
                type="password"
                placeholder='Your password'
                value={password}
                onChange={(e => setPassword(e.target.value))}
            />
            <button onClick={logIn}>LOG IN</button>
            <Link className="auth-link" to="/create-account">Don't have an account? Create one here</Link>
        </div>
    )
}

export default LoginPage
