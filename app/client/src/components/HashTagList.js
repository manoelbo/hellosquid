import React, { Component } from 'react';

class HashTagList extends Component {

    onHashtagSelect(selectedHashtag) {
        this.props.updateSelectedHashTag(selectedHashtag);
    }

    onCloseClick(id) {
        this.props.removeHashTag(id);
    }

    changeSlectedStyle(hashtag) {
        if(hashtag === this.props.selectedHashtag) {
            return { 'fontWeight': '900', 'textDecoration': 'underline' }
        }
        return {};
    }

    render() {
        const { hashtags } = this.props;
        return (
            <div className="section">
                <div className="row">
                    <div className="col s12">
                        {hashtags.map(hashtag => (
                            <div
                                className="chip hoverable"
                                key={hashtag._id}

                                style={this.changeSlectedStyle(hashtag.hashtag)}
                            >
                                <span
                                    style={{'cursor': 'pointer'}}
                                    onClick={() => this.onHashtagSelect(hashtag.hashtag)}
                                    > #{hashtag.hashtag} </span>
                                <i
                                    className="close material-icons"
                                    onClick={() => this.onCloseClick(hashtag._id)}
                                >close</i>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default HashTagList;
