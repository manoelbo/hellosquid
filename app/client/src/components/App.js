import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import HashTagList from './HashTagList';
import MediaList from './MediaList';
import * as HashTagsAPI from '../HashTagsAPI';

class App extends Component {
    state = {
        hashtags: [],
        selectedHashtag: '',
        instagramMediaItens: [],
        searchTerm: '',
        searchResult: [],
        isLoading: false
    };

    componentDidMount() {
        this.setIsLodingOn();
        HashTagsAPI.getAll().then(hashtags => {
            this.setIsLodingOff();
            this.setState({
                hashtags,
                selectedHashtag: hashtags[0].hashtag
            });

            this.setIsLodingOn();
            HashTagsAPI.searchOnInstagram(hashtags[0].hashtag).then(result => {
                this.setIsLodingOff();
                if (result) {
                    this.setState({ instagramMediaItens: result.data });
                }
            });
        });
    }

    setIsLodingOn() {
        this.setState({
            isLoading: true
        });
    }

    setIsLodingOff() {
        this.setState({
            isLoading: false
        });
    }

    updateSelectedHashTag(selectedHashtag) {
        this.setIsLodingOn();
        this.setState({
            selectedHashtag
        });

        HashTagsAPI.searchOnInstagram(selectedHashtag).then(result => {
            this.setIsLodingOff();
            if (result) {
                this.setState({ instagramMediaItens: result.data });
            }
        });
    }

    removeHashTag(id) {
        HashTagsAPI.removeById(id).then(() => {
            this.setState(state => ({
                hashtags: state.hashtags.filter(hashtag => hashtag._id !== id)
            }));
        });
    }

    searchOnChange(term) {
        this.setState({
            searchTerm: term
        });
        this.setIsLodingOn();
        HashTagsAPI.searchOnInstagram(term).then(result => {
            this.setIsLodingOff();
            if (result) {
                this.setState({ searchResult: result.data });
            }
        });
    }

    addHashTag() {
        HashTagsAPI.addHashTag(this.state.searchTerm).then(newHashtag => {
            const newArray = [
                ...this.state.hashtags,
                {
                    _id: newHashtag._id,
                    hashtag: newHashtag.hashtag,
                    _v: 0
                }
            ];
            console.log(newArray);

            this.setState({
                hashtags: newArray,
                selectedHashtag: newHashtag.hashtag,
                instagramMediaItens: this.state.searchResult
            });
        });
    }

    render() {
        const {
            hashtags,
            searchResult,
            searchTerm,
            instagramMediaItens,
            isLoading
        } = this.state;
        return (
            <div>
                <nav>
                    <div className="nav-wrapper">
                        <a className="brand-logo center">Hello Squid</a>
                    </div>
                </nav>

                <Route
                    exact
                    path="/"
                    render={() => (
                        <div className="container">
                            {hashtags.length > 0 && (
                                <div>
                                    <HashTagList
                                        hashtags={this.state.hashtags}
                                        selectedHashtag={
                                            this.state.selectedHashtag
                                        }
                                        updateSelectedHashTag={this.updateSelectedHashTag.bind(
                                            this
                                        )}
                                        removeHashTag={this.removeHashTag.bind(
                                            this
                                        )}
                                    />

                                    {isLoading === true && (
                                        <div className="progress">
                                            <div className="indeterminate" />
                                        </div>
                                    )}
                                    <MediaList
                                        instagramMediaItens={
                                            this.state.instagramMediaItens
                                        }
                                    />
                                </div>
                            )}

                            {hashtags.length === 0 && (
                                <h5>
                                    {' '}
                                    Nenhuma tag cadastrada, faça uma bucas para
                                    adicionar uma nova tag{' '}
                                </h5>
                            )}

                            {instagramMediaItens.length === 0 &&
                                hashtags.length !== 0 && (
                                    <h5> Nenhum resultado com essa tag </h5>
                                )}

                            <Link
                                to="/search"
                                className="btn-floating btn-large waves-effect waves-light indigo hoverable"
                                style={{
                                    position: 'fixed',
                                    right: '30px',
                                    bottom: '30px'
                                }}
                            >
                                <i className="material-icons ">search</i>
                            </Link>
                        </div>
                    )}
                />

                <Route
                    path="/search"
                    render={() => (
                        <div className="container">
                            <div className="row">
                                <div className="col s12">
                                    <input
                                        placeholder="busca"
                                        value={searchTerm}
                                        onChange={event =>
                                            this.searchOnChange(
                                                event.target.value
                                            )
                                        }
                                    />
                                    {isLoading === true &&
                                        searchTerm.length > 2 && (
                                            <div className="progress">
                                                <div className="indeterminate" />
                                            </div>
                                        )}
                                    <MediaList
                                        instagramMediaItens={
                                            this.state.searchResult
                                        }
                                    />
                                </div>
                            </div>

                            {searchResult.length === 0 &&
                                searchTerm.length > 2 && (
                                    <h5>
                                        {' '}
                                        Nada encontrado, tente 'dog' ou 'natal'
                                        por exemplo{' '}
                                    </h5>
                                )}

                            <Link
                                to="/"
                                onClick={() => this.addHashTag()}
                                className={
                                    'btn-floating btn-large waves-effect waves-light indigo hoverable ' +
                                    (this.state.searchResult.length < 1
                                        ? 'disabled'
                                        : 'pulse')
                                }
                                style={{
                                    position: 'fixed',
                                    right: '30px',
                                    bottom: '30px'
                                }}
                            >
                                <i className="material-icons ">add</i>
                            </Link>
                            <Link
                                to="/"
                                className="btn-floating btn-large waves-effect waves-light hoverable indigo"
                                style={{
                                    position: 'fixed',
                                    left: '30px',
                                    bottom: '30px'
                                }}
                            >
                                <i className="material-icons ">
                                    keyboard_arrow_left
                                </i>
                            </Link>
                        </div>
                    )}
                />
            </div>
        );
    }
}

export default App;
