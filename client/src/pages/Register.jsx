import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export function Register() {
    const navigate = useNavigate();

    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function updateFullname(e) {
        setFullname(e.target.value);
    }

    function updateEmail(e) {
        setEmail(e.target.value);
    }

    function updatePassword(e) {
        setPassword(e.target.value);
    }

    function submitHandler(e) {
        e.preventDefault();
        if (fullname && email && password) {
            fetch('http://localhost:3001/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ fullname, email, password }),
            })
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'ok') {
                        navigate('/login');
                    }
                })
                .catch(err => console.error(err));
        }
    }

    return (
        <div className="container">
            <div className="row">
                <form onSubmit={submitHandler} className="col-12 col-sm-8 col-md-6 col-lg-4 m-auto">
                    <h1 className="h3 mb-3 fw-normal">Please register</h1>

                    <div className="form-floating mb-3">
                        <input onChange={updateFullname} value={fullname} type="text" className="form-control" id="fullname" />
                        <label htmlFor="fullname">Full name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={updateEmail} value={email} type="email" className="form-control" id="email" />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input onChange={updatePassword} value={password} type="password" className="form-control" id="password" placeholder="Password" />
                        <label htmlFor="password">Password</label>
                    </div>

                    <button className="btn btn-primary w-100 py-2" type="submit">Register</button>
                </form>
            </div>
        </div>
    )
}