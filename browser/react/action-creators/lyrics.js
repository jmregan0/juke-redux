import { SET_LYRICS } from '../constants';


export function setLyrics(text){
  return {
    type: SET_LYRICS,
    lyric: text
  }
}
