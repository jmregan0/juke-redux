import React from 'react';
import store from '../store';
import { getState } from 'redux';
import Lyrics from '../components/Lyrics';
import { fetchLyrics } from '../action-creators/lyrics';



class LyricsContainer extends React.Component{
    constructor () {
        super();
        
        this.state = Object
            .assign({
                artistQuery: '',
                songQuery: ''
            }, store.getState());
        
        this.setArtist = this.setArtist.bind(this);
        this.setSong = this.setSong.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount () {
        this.unsubscribeFromStore = store.subscribe(() => {
            this.setState(store.getState());
        })
    }

    componentWillUnmount () {
        this.unsubscribeFromStore();
    }
    
    handleSubmit(e) {
        e.preventDefault();
        store.dispatch(
            fetchLyrics(this.state.artistQuery, this.state.songQuery)
        )
    }
    
    setArtist (val) {
        this.setState({ artistQuery : val });
    }
    
    setSong (val) {
        this.setState({ songQuery : val });
    }

    render () {
        return (
            <div>
            <Lyrics 
                text={this.state.lyrics.text}
                handleSubmit={this.handleSubmit}
                setArtist={this.setArtist}
                setSong={this.setSong}
                artistQuery={this.state.artistQuery}
                songQuery={this.state.songQuery}
            />
            </div>
        );
    }
}


export default LyricsContainer;