import React, { useState } from "react"
import { Link, Outlet } from "react-router-dom";
import { logIn } from "../../services/firebase";
import { SignForm } from "../SignForm/SignForm";

export function Home() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignIn = async (email, password) => {
        setLoading(true);
        try {
            await logIn(email, password);
        }
        catch (err) {
            console.log(err);
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h1>This is Home</h1>
            <SignForm onSubmit={handleSignIn} error={error} loading={loading} />
            <Link to="/signup">Sign Up</Link>
        </>
    )
}