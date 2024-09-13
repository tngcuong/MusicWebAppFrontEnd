import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { withRouter } from 'react-router';
import moment from 'moment';
import "./Profile.scss";

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import HomeHeader from '../../HomePage/HomeHeader';
import { getLikedSongByUserId } from '../../../services/songService';
import { getFollowerByUserId } from '../../../services/userService';
import CountLiked from '../../Partial/CountLiked';
import Loader from '../../../components/Loader';

import AllComponent from './All';
import TracksComponent from './Tracks';
import LikedTracksComponent from './LikedTracks';
import PlayListsComponent from './PlayLists';
import PopularTracksComponent from './PopularTracks';
import { updateCoverAvatar } from '../../../services/accountService';
import EditProfile from './Partial/EditProfile';
import UploadSong from './Partial/UploadPage';
import FollowBtn from '../../Partial/FollowBtn';
import NameSong from '../../Partial/NameSong';
import NameUser from '../../Partial/NameUser';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            All: true,
            PopularTracks: false,
            Tracks: false,
            PlayLists: false,
            LikedTracks: false,
            ProfileUser: {},
            LikedTracksUser: [],
            Followers: [],
            previewImg: "",
            isOpenPreview: false,
            avatar: null,
            coverAvatar: null,
            isOpenEditModal: false,
            isOpenUploadModal: false,
        }
    }

    async componentDidUpdate(preProps, prevState) {
        if (this.props.profileUser !== preProps.profileUser) {
            this.setState({
                ProfileUser: { ...this.props.profileUser },
                previewImg: this.props.profileUser.avatar
            })
            this.getLikedSong(this.props.match.params.profile)
            this.getFollower(this.props.match.params.profile)
        }

        if (this.props.match.params.profile !== preProps.match.params.profile) {
            this.props.getUser(this.props.match.params.profile)
            this.getLikedSong(this.props.match.params.profile)
            this.getFollower(this.props.match.params.profile)
            this.setState({
                previewImg: this.props.profileUser.avatar
            })
        }
        if (this.props.isLoadingAccount !== preProps.isLoadingAccount) {
            this.props.getUser(this.props.match.params.profile)
        }
        if (this.props.isLiked === !preProps.isLiked) {
            await this.getLikedSong()
        }

    }

    componentDidMount() {
        this.props.getCurrentUser()
        this.getLikedSong(this.props.match.params.profile)
        this.props.getUser(this.props.match.params.profile)
        this.setState({
            ProfileUser: { ...this.props.profileUser },
            previewImg: this.props.profileUser.avatar
        })
        this.props.showPlayer(true)
    }

    handleChangePage = (id) => {
        let updatedState = { ...this.state };
        let i = 1;
        updatedState[id] = true;
        Object.keys(updatedState).forEach(key => {
            if (key !== id && i <= 5) {
                updatedState[key] = false;
            }
            i += 1;
        });
        this.setState({ ...updatedState });

    }

    getLikedSong = async (idUser) => {
        try {
            let data = await getLikedSongByUserId(idUser)
            console.log(data);
            if (data && data.errorCode === 200) {
                this.setState({
                    LikedTracksUser: [...data.content.listSong]
                })
            } else {

            }
        } catch (error) {
            console.log(error);
        }
    }


    getFollower = async (idUser) => {
        try {
            let data = await getFollowerByUserId(idUser)
            console.log(data);
            if (data && data.errorCode === 200) {
                this.setState({
                    Followers: [...data.content]
                })
            } else {

            }
        } catch (error) {
            console.log(error);
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImg) return
        this.setState({
            isOpenPreview: true
        })
    }

    handleChangeAvatar = (e) => {
        let data = e.target.files
        let file = data[0]
        if (file) {
            this.props.updateAvatar({
                id: this.props.match.params.profile,
                avatar: file
            })
        }
    }

    handleChangeCoverAvatar = (e) => {
        let data = e.target.files
        let file = data[0]
        if (file) {
            this.props.updateCoverAvatar({
                id: this.props.match.params.profile,
                coverAvatar: file
            })
        }

    }

    toggleEditModal = () => {
        this.setState({
            isOpenEditModal: !this.state.isOpenEditModal
        })
    }

    toggleUploadModal = () => {
        this.setState({
            isOpenUploadModal: !this.state.isOpenUploadModal
        })
    }

    handleEditProfile = () => {
        this.setState({
            isOpenEditModal: true
        })
    }

    handleUploadSong = () => {
        this.setState({
            isOpenUploadModal: true
        })
    }

    render() {
        const { ProfileUser, All, PopularTracks, Tracks, PlayLists, LikedTracks, LikedTracksUser, Followers } = this.state;
        const { currentUser } = this.props
        const idUser = this.props.match.params.profile
        const coverAvater = this.state.ProfileUser?.coverAvatar
        console.log(coverAvater);

        return (
            <div>
                {this.props.isLoadingAccount === true && <Loader></Loader>}
                <HomeHeader isShowBanner={false} />
                <div className='profile-container'>

                    <div
                        className="profile-banner"
                        style={{
                            backgroundImage: coverAvater?.slice(0, 5) === 'https' ? `url("${coverAvater}")` : coverAvater?.startsWith('linear-gradient') ? coverAvater : 'none',
                            backgroundPosition: 'center center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: coverAvater?.slice(0, 5) === 'https' || coverAvater?.startsWith('linear-gradient') ? 'transparent' : `${coverAvater}`,
                        }}
                    >
                        <div className='profile-right'>
                            <div className='profile-avatar' style={{
                                backgroundImage: `url("${ProfileUser.avatar}")`,
                                backgroundPosition: 'center center',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat'
                            }}
                                htmlFor='previewImg'
                                onClick={() => { this.openPreviewImage() }}
                            >
                                {this.state.isOpenPreview == true &&
                                    <Lightbox
                                        id="lightbox"
                                        mainSrc={this.state.previewImg}
                                        onCloseRequest={() => this.setState({ isOpenPreview: false })}
                                    />
                                }
                                {idUser === currentUser.id &&
                                    <div className='btn-upload-avatar' onClick={(e) => e.stopPropagation()}>
                                        <label className='lb-upload-avatar' htmlFor='upload-avatar'><i className="fas fa-camera"></i> Upload image </label>
                                        <input
                                            onChange={(e) => { this.handleChangeAvatar(e) }}
                                            id='upload-avatar'
                                            type='file'
                                            accept='image/jpeg,image/pjpeg,image/gif,image/png'
                                            hidden></input>
                                    </div>
                                }


                            </div>
                            <div className='profile-name'>
                                <div className='around-name'>
                                    <h2 className='name'>{ProfileUser.name}</h2>
                                </div>

                                <h3 className='description'>{ProfileUser.description}</h3>
                            </div>
                        </div>

                        <div className='upload-header'>
                            {idUser === currentUser.id && <div className='btn-upload-header'>
                                <label className='lb-upload-header' htmlFor='upload-header'><i className="fas fa-camera"></i> Upload header </label>
                                <input
                                    onChange={(e) => { this.handleChangeCoverAvatar(e) }}
                                    id='upload-header'
                                    type='file'
                                    accept='image/jpeg,image/pjpeg,image/gif,image/png'
                                    hidden></input>
                                <div className="tooltiptext">
                                    For best results, upload PNG or JPG images of at least 1200x240 pixels. 2MB file-size limit.
                                </div>
                            </div >
                            }

                        </div>
                    </div>
                    <div className='profile-middle'>
                        <div className='profile-item'>
                            <ul className='profile-list-item'>
                                <li className={All === true ? "m-active" : ""} onClick={() => { this.handleChangePage("All") }}>All</li>
                                <li className={Tracks === true ? "m-active" : ""} onClick={() => { this.handleChangePage("Tracks") }}>Tracks</li>
                                <li className={LikedTracks === true ? "m-active" : ""} onClick={() => { this.handleChangePage("LikedTracks") }}>Liked Tracks</li>
                                <li className={PopularTracks === true ? "m-active" : ""} onClick={() => { this.handleChangePage("PopularTracks") }}>Popular Tracks</li>
                                <li className={PlayLists === true ? "m-active" : ""} onClick={() => { this.handleChangePage("PlayLists") }}>PlayLists</li>
                            </ul>
                        </div>
                        <div className='actions'>
                            {idUser === currentUser.id && <div className='btn-edit'>
                                {this.state.isOpenEditModal === true && <EditProfile
                                    toggleFromParent={this.toggleEditModal}
                                    isOpen={this.state.isOpenEditModal}
                                    currentUser={ProfileUser}
                                    size="xl"
                                    centered
                                ></EditProfile>}
                                <span onClick={() => { this.handleEditProfile() }}><i className="fas fa-pencil-alt"></i> Edit</span>
                            </div>}
                            {idUser === currentUser.id && <div className='btn-upload'>
                                {this.state.isOpenUploadModal === true && <UploadSong
                                    toggleFromParent={this.toggleUploadModal}
                                    isOpen={this.state.isOpenUploadModal}
                                    size="xl"
                                    centered
                                ></UploadSong>}

                                <span onClick={() => { this.handleUploadSong() }}><i className="fas fa-cloud-upload-alt"></i> Upload</span>
                            </div>}
                            <div className='btn-follow-container'>
                                {idUser != currentUser.id && <FollowBtn idUser={ProfileUser.id} />}
                            </div>

                        </div>

                    </div>
                    <div className='profile-content'>
                        <div className='profile-content-left'>
                            {
                                All === true && <AllComponent />
                            }
                            {
                                Tracks === true && <TracksComponent />
                            }
                            {
                                LikedTracks === true && <LikedTracksComponent />
                            }
                            {
                                PlayLists === true && <PlayListsComponent />
                            }
                            {
                                PopularTracks === true && <PopularTracksComponent />
                            }
                        </div>
                        <div className='profile-content-right'>
                            <div className='content-right'>
                                <div className='header'>
                                    <table className='table-stat'>
                                        <tbody>
                                            <tr>
                                                <td className='info-stat'>
                                                    <a>
                                                        <h3>Followers</h3>
                                                        <div>{ProfileUser?.followers}</div>
                                                    </a>
                                                </td>
                                                <td className='info-stat'>
                                                    <a>
                                                        <h3>Following</h3>
                                                        <div>{ProfileUser?.following?.length}</div>
                                                    </a>
                                                </td>
                                                <td className='info-stat'>
                                                    <a>
                                                        <h3>Tracks</h3>
                                                        <div>{ProfileUser?.tracks?.length}</div>
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className='profile-liked-song'>

                                    {LikedTracksUser && LikedTracksUser.length > 0 &&
                                        <div className='liked-song-stat'>
                                            <a className='link-liked-song'>
                                                <div>
                                                    <span><i className="fas fa-heart"></i></span>
                                                    <span>{LikedTracksUser.length}</span>
                                                </div>
                                                {/* <span className='view-all'>View All</span> */}
                                            </a>
                                        </div>
                                    }


                                    <div className='list-liked-song'>
                                        <div className='list'>
                                            {LikedTracksUser && LikedTracksUser.length > 0 &&
                                                LikedTracksUser.slice(0, 3).map((item, index) => {
                                                    return (
                                                        <div className='liked-song' key={item.id}>
                                                            <div className='liked-song-img'>
                                                                <div className='img' style={{
                                                                    backgroundImage: `url("${item.image}")`,
                                                                    backgroundPosition: 'center center',
                                                                    backgroundSize: 'cover',
                                                                    backgroundRepeat: 'no-repeat'
                                                                }}>
                                                                </div>
                                                            </div>
                                                            <div className='details'>
                                                                <div className='name'>
                                                                    <p className='artist-name'>{item.user?.name && <NameUser user={item.user} />}</p>
                                                                    <p className='song-name'>{item.name && <NameSong song={item} />}</p>
                                                                </div>
                                                                <div className='count-like'>
                                                                    <i className="fas fa-heart"></i>
                                                                    <CountLiked idSong={item.id}></CountLiked>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                    <div className='follower-container'>
                                        <div className='follower-stat'>
                                            <a className='link-follower'>
                                                <div>
                                                    <span> <i className="fas fa-user-friends"></i><span>Fans also like</span></span>
                                                </div>
                                                {/* <span className='view-all'>View All</span> */}
                                            </a>
                                        </div>
                                        <div className='list-follower'>
                                            <div className='list'>
                                                {Followers && Followers.length > 0 &&
                                                    Followers.slice(0, 3).map((item, index) => {
                                                        return (
                                                            <div className='follower' key={item.id}>
                                                                <div className='follower-img'>
                                                                    <div className='img' style={{
                                                                        backgroundImage: `url("${item.avatar}")`,
                                                                        backgroundPosition: 'center center',
                                                                        backgroundSize: 'cover',
                                                                        backgroundRepeat: 'no-repeat'
                                                                    }}>
                                                                    </div>
                                                                </div>
                                                                <div className='details-follower'>
                                                                    <div className='name'>
                                                                        <p className='follower-name'>{item.name && <NameUser user ={item}/>}</p>
                                                                        <div className='details'>
                                                                            <div className='detail-track'>
                                                                                <a style={{
                                                                                    backgroundImage: `url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCI+CiAgICA8cmVjdCB4PSI1IiB5PSIxMiIgZmlsbD0icmdiKDM0LCAzNCwgMzQpIiB3aWR0aD0iMiIgaGVpZ2h0PSI0Ii8+CiAgICA8cmVjdCB4PSIyMSIgeT0iMTIiIGZpbGw9InJnYigzNCwgMzQsIDM0KSIgd2lkdGg9IjIiIGhlaWdodD0iNCIvPgogICAgPHJlY3QgeD0iMTciIHk9IjEwIiBmaWxsPSJyZ2IoMzQsIDM0LCAzNCkiIHdpZHRoPSIyIiBoZWlnaHQ9IjgiLz4KICAgIDxyZWN0IHg9IjkiIHk9IjgiIGZpbGw9InJnYigzNCwgMzQsIDM0KSIgd2lkdGg9IjIiIGhlaWdodD0iMTIiLz4KICAgIDxyZWN0IHg9IjEzIiB5PSI1IiBmaWxsPSJyZ2IoMzQsIDM0LCAzNCkiIHdpZHRoPSIyIiBoZWlnaHQ9IjE4Ii8+Cjwvc3ZnPgo=")`,
                                                                                    backgroundPosition: 'center center',
                                                                                    backgroundSize: 'cover',
                                                                                    backgroundRepeat: 'no-repeat'
                                                                                }}></a>
                                                                                <p className='count-track'>{item.listSong?.length > 0 && item.listSong?.length}</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        detailAlbum: state.album.detailAlbum,
        isPlaying: state.album.isPlaying,
        userAlbums: state.album.userAlbums,
        profileUser: state.user.user,
        isLiked: state.song.isLiked,
        currentUser: state.user.currentUser,
        isLoadingAccount: state.account.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDetailAlbum: (id) => dispatch(actions.getDetailAlbumStart(id)),
        getAlbumByUserId: (id) => dispatch(actions.getAlbumByUserIdStart(id)),
        setCurrentAlbum: (album) => dispatch(actions.setCurrentAlbum(album)),
        setCurrentSong: (song) => dispatch(actions.getCurrentSong(song)),
        playSong: (flag) => dispatch(actions.playMusic(flag)),
        getUser: (id) => dispatch(actions.getUserIdStart(id)),
        showPlayer: (flag) => dispatch(actions.showPlayer(flag)),
        getCurrentUser: () => dispatch(actions.getCurrentUserStart()),
        updateAvatar: (info) => dispatch(actions.updateAvatarStart(info)),
        updateCoverAvatar: (info) => dispatch(actions.updateCoverAvatarStart(info)),
    };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile));