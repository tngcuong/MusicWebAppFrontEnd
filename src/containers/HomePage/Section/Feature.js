import React, { Component } from "react";
import "./Feature.scss";

class Feature extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="feature-container">
                <div className="container-up">
                    <div className="container-up-header">
                        <div className="header-icon">
                            <i className="fas fa-user-friends"></i><span>Artist you should follow</span>
                        </div>
                        <div className="btn-refresh">
                            <i className="fas fa-sync"></i><span>Refresh</span>
                        </div>
                    </div>
                    <div className="container-up-content">
                        <div className="avatar" style={{
                            backgroundImage: `url("https://i1.sndcdn.com/avatars-9zUywCtaJFz7CniW-pDCoHQ-t120x120.jpg")`,
                            backgroundPosition: 'center center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}>

                        </div>
                        <div className="info-song">
                            <div className="name">
                                Ha
                            </div>
                            <div className="info">
                                <div className="follower">
                                    <i className="fas fa-user-friends"></i> <span>100</span>
                                </div>
                                <div className="tracks">
                                    <a style={{
                                        backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCI+CiAgICA8cmVjdCB4PSI1IiB5PSIxMiIgZmlsbD0icmdiKDM0LCAzNCwgMzQpIiB3aWR0aD0iMiIgaGVpZ2h0PSI0Ii8+CiAgICA8cmVjdCB4PSIyMSIgeT0iMTIiIGZpbGw9InJnYigzNCwgMzQsIDM0KSIgd2lkdGg9IjIiIGhlaWdodD0iNCIvPgogICAgPHJlY3QgeD0iMTciIHk9IjEwIiBmaWxsPSJyZ2IoMzQsIDM0LCAzNCkiIHdpZHRoPSIyIiBoZWlnaHQ9IjgiLz4KICAgIDxyZWN0IHg9IjkiIHk9IjgiIGZpbGw9InJnYigzNCwgMzQsIDM0KSIgd2lkdGg9IjIiIGhlaWdodD0iMTIiLz4KICAgIDxyZWN0IHg9IjEzIiB5PSI1IiBmaWxsPSJyZ2IoMzQsIDM0LCAzNCkiIHdpZHRoPSIyIiBoZWlnaHQ9IjE4Ii8+Cjwvc3ZnPgo=")`,
                                        backgroundPosition: 'center center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat'
                                    }}></a>
                                    <span>2</span>
                                </div>

                            </div>
                        </div>


                    </div>
                </div>
                <div className="container-down">
                    <div className="container-down-header">
                        <div><i className="fas fa-heart"></i> <span>9 likes</span></div>
                        <div className="view-all">View all</div>
                    </div>
                    <div className="container-down-content">
                        <div className='track-avatar' style={{
                            backgroundImage: `url("https://musicwebapp.blob.core.windows.net/65e052d2db16cb6da786b727/660e4d44a7321572fd7528ea-319075813_5721223647958010_4242088866700155513_n.jpg")`,
                            backgroundPosition: 'center center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}></div>
                        <div className='artist-info'>
                            <div className="name">Lucas</div>
                            <div className="name-song">Hello</div>
                            <div className="like"><i className="fas fa-heart"></i> <span>9 </span></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Feature;