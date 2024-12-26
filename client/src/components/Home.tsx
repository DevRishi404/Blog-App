import { useAuth } from "./auth/AuthProvider";


const Home = () => {

    const auth = useAuth();

    return (
        <>
            <h1>Home Page</h1>
            <button onClick={() => auth.logOut()}>Log out</button>
        </>
    )
}

export default Home;