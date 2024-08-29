import React from 'react';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import './HomeFooter.scss';

class Footer extends React.Component {
    render() {
        return (
            <footer className="footer">
                <div className="footer__content">
                    <div className="footer__section">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/artists">Artists</a></li>
                            <li><a href="/albums">Albums</a></li>
                            <li><a href="/events">Events</a></li>
                            <li><a href="/about">About Us</a></li>
                        </ul>
                    </div>
                    <div className="footer__section">
                        <h3>Genre</h3>
                        <ul>
                            <li><a href="/genre/pop">Pop</a></li>
                            <li><a href="/genre/rock">Rock</a></li>
                            <li><a href="/genre/hip-hop">Hip Hop</a></li>
                            <li><a href="/genre/electronic">Electronic</a></li>
                            <li><a href="/genre/classical">Classical</a></li>
                        </ul>
                    </div>
                    <div className="footer__section">
                        <h3>Community</h3>
                        <ul>
                            <li><a href="/forum">Forum</a></li>
                            <li><a href="/fan-club">Fan Club</a></li>
                            <li><a href="/news">News</a></li>
                        </ul>
                        <div className="footer__social-icons">
                            <a href="https://facebook.com" aria-label="Facebook"><Facebook size={24} /></a>
                            <a href="https://twitter.com" aria-label="Twitter"><Twitter size={24} /></a>
                            <a href="https://instagram.com" aria-label="Instagram"><Instagram size={24} /></a>
                            <a href="https://youtube.com" aria-label="YouTube"><Youtube size={24} /></a>
                        </div>
                    </div>
                    <div className="footer__section">
                        <h3>Newsletter</h3>
                        <p>Stay updated with our latest releases and events!</p>
                        <form className="footer__newsletter">
                            <input type="email" placeholder="Enter your email" aria-label="Email for newsletter" />
                            <button type="submit">Subscribe</button>
                        </form>
                    </div>
                </div>
                <div className="footer__copyright">
                    &copy; {new Date().getFullYear()} Museek Web. All rights reserved.
                </div>
            </footer>
        );
    }
}

export default Footer;