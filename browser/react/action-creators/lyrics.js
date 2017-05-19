import { SET_LYRICS } from '../constants';
import axios from 'axios';


///// synchronous
export const setLyrics = function (text) {
    return {
        type: SET_LYRICS,
        lyric: text
    }
}

////// asynchronous
export const fetchLyrics = (artist, song) => {
    return function (dispatch, getState) {
        axios
            .get(`/api/lyrics/${artist}/${song}`)
            .then(res => dispatch(setLyrics(res.data.lyric)))
    }
    
}

// not complete
const fetchAlbumsFromServer = () => {
    return dispatch => {
        axios
            .get('/api/albums')
            .then(res => recieveAlbumsFromServer(res.data))
            .then(res => dispatch(res));
    }
}

// side effects like using audio
// belong here even though not async
const playSong = songId => {
    return dispatch => {
        audio.play();
        dispatch(selectSong(songId));
    }
}

// example of composing several actions into one
const doSeveralThings = (id1, id2) => {
    return dispatch => {
        dispatch(do1thing(id1));
        dispatch(do2thing(id2));
    }
}