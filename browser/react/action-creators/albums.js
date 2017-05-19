import { RECEIVE_ALBUMS, RECEIVE_ALBUM } from '../constants';
import { convertAlbum, convertAlbums } from '../utils';
import axios from 'axios';


//// synchronous
const setAlbums = albums => {
    return {
        type: RECEIVE_ALBUMS,
        albums: albums
    }
}

const setAlbum = selectedAlbum => {
    return {
        type: RECEIVE_ALBUM,
        selectedAlbum: selectedAlbum
    }
}


////// asynchronous
export const selectAlbum = albumId => {
    return dispatch => {
        axios
            .get(`/api/albums/${albumId}`)
            .then(res => setAlbum(convertAlbum(res.data)) )
            .then(res => dispatch(res));
    }
}

export const selectAlbums = () => {
    return dispatch => {
        axios
            .get('/api/albums')
            .then(res => setAlbums(convertAlbums(res.data)))
            .then(res => dispatch(res));
    }
}