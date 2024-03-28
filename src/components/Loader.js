import React, { Component, Fragment } from 'react';
import "./Loader.scss";

class Loader extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="loader-container">
                <div className="spinner"></div>
            </div>
        );
    }
}

export default Loader;