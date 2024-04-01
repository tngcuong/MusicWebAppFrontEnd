import React, { Component, Fragment } from 'react';
import "./Loader.scss";

class Loader extends Component {
    render() {
        return (
            <div className="loader-container">
                <div className="spinner"></div>
            </div>
        );
    }
}

export default Loader;