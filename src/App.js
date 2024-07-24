import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InvitationForm from './Components/InvitationForm';
import InvitationPage from './Components/InvitationPage';
import MovieVoting from './Components/MovieVoting'; 

const App = () => {
    const [user, setUser] = useState(null);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<InvitationForm setUser={setUser} />} />
                <Route path="/invitation" element={<InvitationPage />}/>
            </Routes>
        </Router>
    );
};

export default App;
