import { combineReducers } from 'redux';
import lyricReducer from './lyrics-reducer';
import playerReducer from './player-reducer';
import albumsReducer from './albums-reducer'

const reducer = combineReducers({
    lyrics: lyricReducer,
    player: playerReducer,
    albums: albumsReducer
});

export default reducer;