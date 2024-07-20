import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InvitationForm from './Components/InvitationForm';
import InvitationPage from './Components/InvitationPage';
import MainPage from './Components/MainPage'; // Import MainPage component

const App = () => {
    const [user, setUser] = useState(null);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<InvitationForm setUser={setUser} />} />
                <Route path="/invitation" element={<InvitationPage />} />
                <Route path="/mainpage" element={<MainPage />} /> 
            </Routes>
            <MainPage/>
        </Router>
    );
};

export default App;
