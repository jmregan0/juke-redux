import React from 'react';
import store from '../store';
import { getState } from 'redux';

import axios from 'axios';
import { hashHistory } from 'react-router';

import initialState from '../initialState';
import AUDIO from '../audio';

import { 
  play, pause, load, startSong, toggleOne, toggle, next, prev 
} from '../action-creators/player';

// import Albums from '../components/Albums.js';
// import Album from '../components/Album';
import Sidebar from '../components/Sidebar';
import Player from '../components/Player';

import { convertAlbum, convertAlbums, convertSong } from '../utils';

export default class AppContainer extends React.Component {

  constructor () {
    super();
    this.state = Object.assign({}, 
        initialState,
        store.getState()
    );

    this.toggle = this.toggle.bind(this);
    this.toggleOne = this.toggleOne.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
        
    this.selectArtist = this.selectArtist.bind(this);
    
    this.addPlaylist = this.addPlaylist.bind(this);
    this.selectPlaylist = this.selectPlaylist.bind(this);
    this.loadSongs = this.loadSongs.bind(this);
    this.addSongToPlaylist = this.addSongToPlaylist.bind(this);
  }

  componentDidMount () {
    
    // state
    this.unsubscribe = store.subscribe(() => {
        this.setState(store.getState());
    });
    
    AUDIO.addEventListener('ended', () =>
      this.next());
    AUDIO.addEventListener('timeupdate', () =>
      this.setProgress(AUDIO.currentTime / AUDIO.duration));
    
  }

  componentWillUnmount () {
    this.unsubscribe();
  }

  // player functionality
  play () { store.dispatch(play()) }
  pause () { store.dispatch(pause()) }
  load (song, songList) { store.dispatch(load(song, songList)) }
  startSong (song, songList) { store.dispatch(startSong(song, songList)) }
  toggleOne (song, songList) { store.dispatch(toggleOne(song, songList)) }
  toggle () { store.dispatch(toggle()) }
  next () { store.dispatch(next()) }
  prev () { store.dispatch(prev()) }
  setProgress (progress) {
    this.setState({ progress: progress });
  }

  selectArtist (artistId) {
    Promise
      .all([
        axios.get(`/api/artists/${artistId}`),
        axios.get(`/api/artists/${artistId}/albums`),
        axios.get(`/api/artists/${artistId}/songs`)
      ])
      .then(res => res.map(r => r.data))
      .then(data => this.onLoadArtist(...data));
  }

  onLoadArtist (artist, albums, songs) {
    songs = songs.map(convertSong);
    albums = convertAlbums(albums);
    artist.albums = albums;
    artist.songs = songs;

    this.setState({ selectedArtist: artist });
  }

  addPlaylist (playlistName) {
    axios.post('/api/playlists', { name: playlistName })
      .then(res => res.data)
      .then(playlist => {
        this.setState({
          playlists: [...this.state.playlists, playlist]
        }, () => {
          hashHistory.push(`/playlists/${playlist.id}`)
        });
      });
  }

  selectPlaylist (playlistId) {
    axios.get(`/api/playlists/${playlistId}`)
      .then(res => res.data)
      .then(playlist => {
        playlist.songs = playlist.songs.map(convertSong);
        this.setState({
          selectedPlaylist: playlist
        });
      });
  }

  loadSongs (songs) {
    axios.get('/api/songs')
      .then(res => res.data)
      .then(songs => {
        this.setState({
          songs: songs
        });
      });
  }

  addSongToPlaylist (playlistId, songId) {
    return axios.post(`/api/playlists/${playlistId}/songs`, {
      id: songId
    })
      .then(res => res.data)
      .then(song => {
        const selectedPlaylist = this.state.selectedPlaylist;
        const songs = this.state.selectedPlaylist.songs;
        const newSongs = [...songs, convertSong(song)];
        const newSelectedPlaylist = Object.assign({}, selectedPlaylist, {
          songs: newSongs
        });

        this.setState({
          selectedPlaylist: newSelectedPlaylist
        });
      });
  }

  render () {

    const props = Object.assign({}, this.state, {
      toggleOne: this.toggleOne,
      toggle: this.toggle,
      selectAlbum: this.selectAlbum,
      selectArtist: this.selectArtist,
      addPlaylist: this.addPlaylist,
      selectPlaylist: this.selectPlaylist,
      loadSongs: this.loadSongs,
      addSongToPlaylist: this.addSongToPlaylist
    });

    return (
      <div id="main" className="container-fluid">
        <div className="col-xs-2">
          <Sidebar playlists={this.state.playlists} />
        </div>
        <div className="col-xs-10">
        {
          this.props.children 
          && React.cloneElement(this.props.children, props)
        }
        </div>
        <Player
          currentSong={this.state.player.currentSong}
          currentSongList={this.state.player.currentSongList}
          isPlaying={this.state.player.isPlaying}
          progress={this.state.progress}
          next={this.next}
          prev={this.prev}
          toggle={this.toggle}
        />
      </div>
    );
  }
}

