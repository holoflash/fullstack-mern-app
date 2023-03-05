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
        <>
            <h1>Log in</h1>
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
            <button onClick={logIn}>Log In</button>
            <Link to="/create-account">Don't have an account? Create one here</Link>
        </>
    )
}

export default LoginPage
