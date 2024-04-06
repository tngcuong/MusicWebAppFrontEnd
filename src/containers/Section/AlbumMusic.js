import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

import "./AlbumMusic.scss";

class AlbumMusic extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
        <>
            <div className='album-container'>
                <div className='album-content-left'>
                    <img className='thumbnail'></img>
                    <div className='info'>
                        <h3 className='name'></h3>
                        <span>
                            <span></span>
                            <span className='update-at'></span>
                        </span>
                        <span className='artist'></span>
                        <span className='liked'></span>
                    </div>
                </div>
            </div>
        </>
        );
    }
}


const mapStateToProps = state => {
    return {
      
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AlbumMusic);