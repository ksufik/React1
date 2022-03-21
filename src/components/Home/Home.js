import React, { useState } from "react"
import { CircularProgress } from "@material-ui/core";
import { Link, Outlet } from "react-router-dom";
import { logIn, register } from "../../services/firebase";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";

export function Home({ isSignUp }) {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleSignUp = async () => {
        setLoading(true);
        try {
            await register(email, password);
        } catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    };

    const handleSignIn = async () => {
        setLoading(true);
        try {
            await logIn(email, password);
        } catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignUp) {
            handleSignUp();
        } else {
            handleSignIn();
        }

        setEmail("");
        setPassword("");
    };


    // const handleSignIn = async (email, password) => {
    //     setLoading(true);
    //     try {
    //         await logIn(email, password);
    //     }
    //     catch (err) {
    //         console.log(err);
    //         setError(err.message);
    //     }
    //     finally {
    //         setLoading(false);
    //     }
    // };

    return (
        <>
            <h1>This is Home</h1>
            {loading ? <CircularProgress /> :
                <>
                    <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <Input type="text" value={email} onChange={handleChangeEmail} />
                        </div>
                        <div>
                            <Input type="password" value={password} currentPassword={password} onChange={handleChangePassword} />
                        </div>
                        <div>
                            <Button className='button__mt20' type="submit" value="Подтвердить" />
                        </div>

                        {error && <h4>{error}</h4>}
                    </form>
                    <Link to={`${isSignUp ? "/" : "/signup"}`} onClick={() => setError('')}>
                        {isSignUp ? "SignIn" : "SignUp"}
                    </Link>
                </>
            }
        </>
    )
}