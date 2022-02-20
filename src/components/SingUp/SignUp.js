import { Link } from "react-router-dom"
import { SignForm } from "../SignForm/SignForm"
import { register } from '../../services/firebase'
import { useState } from "react"

export const SignUp = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignUp = async (email, password) => {
        setLoading(true);
        try {
            await register(email, password);
        }
        catch (err) {
            console.log(err);
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
            <h3>Sign Up</h3>
            <SignForm onSubmit={handleSignUp} error={error} loading={loading} />
            <Link to="/">Sign In</Link>
        </>
    )
}