import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ladyW from "../Images/LADYW.png";
import TUC from "../Images/TUC.png";
import "./Formstyles.css";

const InvitationForm = ({ setUser }) => {
    const [title, setTitle] = useState('Lord');
    const [name, setName] = useState('');
    const [passkey, setPasskey] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://movie-night-backend.vercel.app/invite', { title, name, passkey }, { withCredentials: true })
            .then(response => {
                const { role, title, name } = response.data;
                setUser({ role, title, name });
                navigate('/invitation', { state: { role, title, name } });
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    setError(error.response.data.error);
                } else {
                    setError("An error occurred. Please try again.");
                }
            });
    };

    return (
        <div className="overlay">
            <div className="popup">
                <div className="header">
                    <img src={ladyW} alt="Image Before Hello" className="pop" />
                    <h1>Hello,</h1>
                    <img src={TUC} alt="Image After Hello" className="pop" />
                </div>
                {error && <p className="error">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <label htmlFor="title">Title:</label>
                        <select id="title" value={title} onChange={(e) => setTitle(e.target.value)} required>
                            <option value="Lord">Lord</option>
                            <option value="Lady">Lady</option>
                            <option value="Mr">Mr</option>
                            <option value="Mrs">Mrs</option>
                            <option value="Batty">Batty</option>
                        </select>
                    </div>
                    <div className="field">
                        <label htmlFor="name">Name:</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="field">
                        <label htmlFor="passkey">PassCode:</label>
                        <input type="password" id="passkey" value={passkey} onChange={(e) => setPasskey(e.target.value)} required />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default InvitationForm;
