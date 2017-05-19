import React from 'react';
import store from '../store';
import Albums from '../components/Albums';
import { selectAlbum, selectAlbums } from '../action-creators/albums';


export default class AlbumsContainer extends React.Component {
    
    constructor () {
        super();
        
        this.state = store.getState().albums;
        
        this.selectAlbum = this.selectAlbum.bind(this);
    }
    
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState(store.getState().albums);
        });
        
        // albums, artists, playlists
        store.dispatch(selectAlbums());
    }
    
    componentWillUnmount () {
        this.unsubscribe();
    }
    
    // albums album functionalisty
    selectAlbum (albumId) {
      store.dispatch(selectAlbum(albumId));
    }
    
    render () {
        return (
            <Albums 
                albums={this.state.albums}
                selectAlbum={this.selectAlbum}
            />
        );
    }
}