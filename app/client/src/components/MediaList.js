import React, { Component } from 'react';

class MediaList extends Component {
    render() {
        const { instagramMediaItens } = this.props;
        return (
            <div>
                <div className="row">
                    { instagramMediaItens.map(media =>
                        <div className="col s12 m6" key={media.id}>
                            <div className="card hoverable">
                                <img width="100%"
                                    src={media.images.standard_resolution.url}
                                    alt="img"
                                />

                                <div className="card-content">
                                    <div className="row valign-wrapper">
                                        <div className="col s3">
                                            <a
                                                href={"https://www.instagram.com/"+ media.user.username}
                                                target="_blink"
                                            >
                                                <img
                                                    src={media.user.profile_picture}
                                                    alt=""
                                                    className="circle responsive-img"
                                                />
                                            </a>
                                        </div>
                                        <div className="col s9">
                                            <div className="row" />
                                            <div className="row black-text">
                                                <div className="col s12">
                                                    <h5>@{media.user.username}</h5>
                                                </div>
                                                <div className="col s1">
                                                    <i className="tiny material-icons">
                                                        comment
                                                    </i>
                                                </div>
                                                <div className="col s1">{media.comments.count}</div>
                                                <div className="col s1">
                                                    <i className="tiny material-icons">
                                                        favorite
                                                    </i>
                                                </div>
                                                <div className="col s1">{media.likes.count}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-action">
                                    <a href={media.link}>
                                        Ver no Intagram
                                    </a>
                                </div>
                            </div>
                        </div>
                )}

                </div>
            </div>
        );
    }
}

export default MediaList;
