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

                        <div className="btn-follow">
                            <span className="icon-follow" style={{
                                backgroundImage: `url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNCIgaGVpZ2h0PSIxNCIgdmlld0JveD0iMCAwIDE0IDE0Ij4KICA8cGF0aCBmaWxsPSJyZ2IoMzQsIDM0LCAzNCkiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTUuNTQyIDEuMTY3YzIuNzcgMCAzLjM4NiAyLjkxNiAyLjE1NSA2LjEyNSAzLjE2OSAxLjMwOCAzLjM4NiAzLjk3NyAzLjM4NiA0Ljk1OEgwYzAtLjk4MS4yMTgtMy42NSAzLjM4Ny00Ljk1OC0xLjIzMi0zLjIxOC0uNjE2LTYuMTI1IDIuMTU1LTYuMTI1em0wIDEuMTY2Yy0xLjU4NCAwLTIuMTI3IDEuNzctMS4wNjYgNC41NDIuMjI2LjU5LS4wNiAxLjI1NC0uNjQ0IDEuNDk1LTEuNTE3LjYyNi0yLjI2MyAxLjU3Mi0yLjUzNyAyLjcxM2g4LjQ5NGMtLjI3NS0xLjE0MS0xLjAyLTIuMDg3LTIuNTM3LTIuNzEzYTEuMTY3IDEuMTY3IDAgMCAxLS42NDQtMS40OTZjMS4wNi0yLjc2NC41MTYtNC41NC0xLjA2Ni00LjU0em02LjQxNC0uNTgzYy4xNyAwIC4yOTQuMTMuMjk0LjI5MlYzLjVoMS40NThjLjE1NyAwIC4yOTIuMTMyLjI5Mi4yOTR2LjU3OGMwIC4xNy0uMTMuMjk1LS4yOTIuMjk1SDEyLjI1djEuNDU4YS4yOTYuMjk2IDAgMCAxLS4yOTQuMjkyaC0uNTc4YS4yODkuMjg5IDAgMCAxLS4yOTUtLjI5MlY0LjY2N0g5LjYyNWEuMjk2LjI5NiAwIDAgMS0uMjkyLS4yOTV2LS41NzhjMC0uMTcuMTMxLS4yOTQuMjkyLS4yOTRoMS40NThWMi4wNDJjMC0uMTU3LjEzMi0uMjkyLjI5NS0uMjkyaC41Nzh6Ii8+Cjwvc3ZnPgo=")`,
                                backgroundPosition: 'center center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat'
                            }}></span>
                            <span className="text-follow">
                                Follow
                            </span>
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