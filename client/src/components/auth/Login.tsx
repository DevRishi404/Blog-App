import { useState } from "react";
import { useAuth } from "./AuthProvider";
import './Login.css'

const Login = () => {
    const auth = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        if (email !== '' && password !== '') {
            auth.loginAction({ email, password });
            return;
        }
    }

    return (
        <>
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            aria-label="Email"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            aria-label="Password"
                            required
                        />
                    </div>

                    <div>
                        <button type="button" onClick={handleSubmit}>Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login;