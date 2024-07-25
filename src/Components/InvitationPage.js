import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.css'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicketAlt, faCompactDisc, faEnvelopeOpenText, faChampagneGlasses } from '@fortawesome/free-solid-svg-icons';
import LadyWhistle from "../Images/Untitled-1.png";
import TUC1 from "../Images/UTURISTIC COMMUNITY.png";
import domtoimage from 'dom-to-image';

const InvitationPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [content, setContent] = useState('');
    const [singer, setSinger] = useState('');
    const [song, setSong] = useState('');
    const [inviteeName, setInviteeName] = useState('');
    const [inviteeLetter, setInviteeLetter] = useState('');
    const [showAnimation, setShowAnimation] = useState(false);
    const [inviteCount, setInviteCount] = useState(0);

    const role = location.state?.role || '';
    const title = location.state?.title || '';
    const name = location.state?.name || '';

    useEffect(() => {
        const adminContent = `
         Esteemed Administrators,

It is with the utmost pleasure that I, Lady Whistledown, extend to you a most exclusive invitation. On the eve of July 26th, you are cordially summoned to partake in an evening of merriment and entertainment at our esteemed Games and Movie Night. Your presence is not merely requested; it is essential to ensure the evening's success.

We shall commence our revelries promptly, and you are entreated to bring your wit, charm, and competitive spirit. Our gathering will be a delightful mélange of games, where strategy and cunning shall reign, followed by a cinematic experience that promises to be both enchanting and exhilarating.

To ensure the smooth orchestration of the evening, I must humbly request your assistance in specific roles:

Chris, please take charge of the media.
Tunde, the snacks are on you.
Eniola, your expertise in setup is greatly needed.
Ini, kindly take charge of the order of events.
Nehemiah, you would be incharge of hosting and relating with the audience.
 Jonah and Joshua, please i would like to invite y'all to be our co-hosts for the games, more information will be passed across to you all personally, thank you
The festivities shall span a period of 3 - 4 hours, within which time I am certain we shall create memories to be cherished.

Pray, do not disappoint. Your attendance and contributions will undoubtedly elevate the evening to one of grandeur and delight.

Yours most faithfully,

Lady Whistledown
        `;

        const guestContent = `
            It is with great pleasure that I, Lady Whistledown, invite you to a night of splendid entertainment and conviviality. On the night of July 26th, you are cordially welcomed to join us for an evening that promises both thrilling games and an enchanting cinematic experience.

            Our gathering will commence with a series of engaging games, designed to spark both laughter and friendly competition. Following this, we shall indulge in a movie that will captivate and delight all present.

            The festivities are set to last for three hours, providing ample opportunity for both amusement and the forging of delightful memories.

            Your presence would be most welcomed, and I assure you, it shall be an evening to remember.

            With highest regards,

            Lady Whistledown
        `;

        setContent(role === 'Admin' ? adminContent : guestContent);
    }, [role]);

    const handleDownload = (nodeId, filename) => {
        if (inviteCount >= 3 ) {
            alert("You have reached the maximum number of downloads allowed.");
            return;
        }

        const node = document.getElementById(nodeId);

        domtoimage.toBlob(node)
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = filename;
                link.click();
                setInviteCount(inviteCount + 1);
            })
            .catch(error => console.error('Error generating image: ', error));
    };

    const handleSongSubmit = (e) => {
        e.preventDefault();
        fetch('https://movie-night-backend-git-master-the-shaelles-projects.vercel.app/submit-song', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ singer, song })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                setSinger('');
                setSong('');
            })
            .catch(error => console.error('Error submitting song: ', error));
    };
    
    const handleInviteeSubmit = (e) => {
        e.preventDefault();
        const newLetter = `
            Hello, Courtesy of one of the Uturistic Community members, you have been invited. It is with great pleasure that I, Lady Whistledown alongside the Uturistic Team, invite you to a night of splendid entertainment and conviviality. You were invited by ${name}, and we hope you enjoy the movie and what we have planned. We assure you that at the end of it all, you'll be a part of TUC ${inviteeName}.
        `;
        setInviteeLetter(newLetter);
        setShowAnimation(true); // Trigger animation when invitee letter is generated
    
        fetch('https://movie-night-backend-git-master-the-shaelles-projects.vercel.app/invitee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, inviteeName, letter: newLetter })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                setInviteeName('');
            })
            .catch(error => console.error('Error submitting invitee: ', error));
    };
    
    if (!location.state) {
        navigate('/');
        return null;
    }

    return (
        <div className="main-container">
            <section className={`invitation-container ${showAnimation ? 'fade-in' : ''}`} id="invitation">
                <div className="header">
                    <img src={LadyWhistle} alt="Lady Whistledown" className="inline-image" />
                    <h1>Welcome</h1>
                    <FontAwesomeIcon icon={faTicketAlt} size="2x" className="icon" />
                    <img src={TUC1} alt="TUC" className="inline-image" />
                </div>
                <div className="content" id="letter">
                    <h1>Dear {title} {name},</h1>
                    <div id="letter-content">
                        <p>{content}</p>
                    </div>
                </div>
                <div className="footer">
                    <p>Yours sincerely,</p>
                    <p>Lady Whistledown</p>
                    <FontAwesomeIcon icon={faEnvelopeOpenText} size="2x" className="icon icon_bounce" />
                </div>
            </section>
            <button className="btn" onClick={() => handleDownload('invitation', 'invitation.png')}>
                <FontAwesomeIcon icon={faTicketAlt} size="1x" className="icon" />
                Download Invitation
            </button>
            <div className="side-section">
                <div className="spotify-section">
                    <h2>Add a Song to the Spotify Listening Party</h2>
                   
                    <p><a href="https://spotify.link/8dwSkx0KtLb" target="_blank" rel="noopener noreferrer" className='song_link'>click here</a> to add your fave as you join our Spotify listening party.</p>
                    <p>Let’s listen and choose the music together in real time.</p>
                    <FontAwesomeIcon icon={faCompactDisc} size="2x" className="icon" />
                </div>
                <div className="invite-section">
                    <h2>Invite Someone</h2>
                    <form onSubmit={handleInviteeSubmit}>
                        <div className="field">
                            <label className='invitee_label' htmlFor="inviteeName">Invitee's Name:</label>
                            <input className='invitee_input' type="text" id="inviteeName" value={inviteeName} onChange={(e) => setInviteeName(e.target.value)} required />
                        </div>
                        <button type="submit">Generate Invitation</button>
                    </form>
                    <div className={`invitee-letter ${showAnimation ? 'fade-in' : ''}`} id="invitee-invitation">
                        {inviteeName && (
                            <>
                                <h3>Hello Invite for {inviteeName} from {name}</h3>
                                <p>{inviteeLetter}</p>
                              
                            </>
                        )}
                    </div>
                    <button className="btn" onClick={() => handleDownload('invitee-invitation', `${inviteeName}_invitation.png`)}>
                                    <FontAwesomeIcon icon={faChampagneGlasses} size="1x" className="icon iconglass" />
                                    Download Invitee's Invitation
                                </button>
                </div>
            </div>
        </div>
    );
};

export default InvitationPage;
