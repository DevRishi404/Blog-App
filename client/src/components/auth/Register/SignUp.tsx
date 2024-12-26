import { useState } from "react";


const SignUp = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        console.log(`${email} - ${password}`);
        if(email !== '' && password !== null) {
            return;
        }
        // const response = await signUp({email, password});
        // console.log(response);
    }

    return (
        <>
            <div>
                <div>
                    Sign Up
                </div>

                <div>
                    <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div>
                    <button type="button" onClick={handleSubmit}>Submit</button>
                </div>

                <div>Already a member? Login</div>
            </div>
        </>
    )
}

export default SignUp;