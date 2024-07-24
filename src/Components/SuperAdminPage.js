import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css'; 

const SuperAdminPage = () => {
    const navigate = useNavigate();
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4568/admin/songs', {
            method: 'GET',
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            setSongs(data);
        })
        .catch(error => {
            console.error('Error fetching songs:', error);
            navigate('/'); // Redirect to login if unauthorized
        });
    }, [navigate]);

    return (
        <div className="superadmin-container">
            <h1>Submitted Songs</h1>
            <table className="songs-table">
                <thead>
                    <tr>
                        <th>Artist</th>
                        <th>Song</th>
                        <th>Submitted By</th>
                    </tr>
                </thead>
                <tbody>
                    {songs.map((song, index) => (
                        <tr key={index}>
                            <td>{song.singer}</td>
                            <td>{song.song}</td>
                            <td>{song.submittedBy}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SuperAdminPage;
