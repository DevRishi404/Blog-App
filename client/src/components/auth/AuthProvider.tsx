import { createContext, useContext, ReactNode, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

interface loginModel {
    email: string,
    password: string
}

interface authContext {
    user: any;
    token: string,
    loginAction: (data: loginModel) => Promise<void>;
    logOut: () => void;
    registerAction: (data: loginModel) => Promise<void>;
}

const AuthContext = createContext<authContext | undefined>(undefined);


const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || "");
    const navigate = useNavigate();

    const loginAction = async (data: loginModel): Promise<any> => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', data);

            if (response.status === 200) {
                // setUser(response.data.user);
                setToken(response.data.token);
                localStorage.setItem('token', response.data.token);
                navigate("/");
                return;
            }

            throw new Error(response.data.message);

        } catch (e) {
            console.error(e)
        }
    };

    const registerAction = async (data :loginModel) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', data);

            if(response.status === 201) {
                console.log(response);
            }
        } catch(e) {

        }
    }

    const logOut = () => {
        setUser(null);
        setToken("");
        localStorage.removeItem('token');
        navigate("/login")
    }


    return (
        <AuthContext.Provider value={{ user, token, loginAction, logOut,  registerAction}}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}