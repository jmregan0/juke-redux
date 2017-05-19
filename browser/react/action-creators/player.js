import {
    START_PLAYING,
    STOP_PLAYING,
    SET_CURRENT_SONG,
    SET_LIST
} from '../constants';
import AUDIO from '../audio';
import { skip } from '../utils';

//// synchronous
const startPlaying = () => ({
    type: START_PLAYING
});

const stopPlaying = () => ({
    type: STOP_PLAYING
});

const setCurrentSong = (song) => ({
    type: SET_CURRENT_SONG,
    song: song,
});

const setSonglist = songList => ({
    type: SET_LIST,
    songList: songList
});


//// asynchronous
export const play = () => {
    return dispatch => {
        AUDIO.play();
        dispatch(startPlaying());
    }
}

export const pause = () => {
    return dispatch => {
        AUDIO.pause();
        dispatch(stopPlaying());
    }
}

export const load = (song, songList) => {
    return dispatch => {
        AUDIO.src = song.audioUrl;
        AUDIO.load();
        dispatch(setCurrentSong(song));
        dispatch(setSongList(songList));
    }
}

export const startSong = (song, songList) => {
    return dispatch => {
        dispatch(pause());
        dispatch(load(song, songList));
        dispatch(play());
    }
}

export const toggleOne = (song, songList) => {
    return (dispatch, getState) => {
        const { currentSong } = getState().player;
        if (song.id !== currentSong.id)
            dispatch(startSong(song, songList));
        else
            dispatch(toggle());
    }
}

export const toggle = () => {
    return (dispatch, getState) => {
        if (getState().player.isPlaying)
            dispatch(pause());
        else
            dispatch(play());
    }
}

export const next = () => {
    return (dispatch, getState) => {
        dispatch(startSong(...skip(1, getState().player)));
    }
}

export const prev = () => {
    return (dispatch, getState) => {
        dispatch(startSong(...skip(-1, getState().player)))
    }
}

