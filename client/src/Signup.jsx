import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [platforms, setPlatforms] = useState({
        codeforces: "",
        github: "",
        leetcode: "",
        geeksforgeeks: "",
        hackerrank: ""
    });

    const navigate = useNavigate();

    const handlePlatformChange = (platform, value) => {
        setPlatforms(prev => ({
            ...prev,
            [platform]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/register', { name, email, password, platforms })
            .then(result => {
                console.log(result);
                navigate('/login');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input type="text" placeholder="Enter name" autoComplete="off" className="form-control rounded-0"
                            onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="text" placeholder="Enter email" autoComplete="off" className="form-control rounded-0"
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder="Enter password" autoComplete="off" className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    {/* Platform Selection */}
                    <div className="mb-3">
                        <label><strong>Select Platforms & Enter Usernames</strong></label>
                        {["codeforces", "github", "leetcode", "geeksforgeeks", "hackerrank"].map(platform => (
                            <div key={platform} className="mb-2">
                                <input
                                    type="text"
                                    placeholder={`${platform} username`}
                                    className="form-control rounded-0"
                                    onChange={(e) => handlePlatformChange(platform, e.target.value)}
                                />
                            </div>
                        ))}
                    </div>

                    <button type="submit" className="btn btn-success w-100 rounded-0">Register</button>
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </form>
            </div>
        </div>
    );
}

export default Signup;
