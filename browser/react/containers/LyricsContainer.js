import React from 'react';
import store from '../store';
import { getState } from 'redux';

export default class LyricsContainer extends React.Component{
  constructor(props){
    super(props)
    this.state = store.getState()
  }

  componentDidMount(){
    this.unsubscribeFromStore = store.subscribe(() => {
      this.setState(store.getState());
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromStore();
  }

  render (){
    return (
      <h1>HELLO HELLO HELLO</h1>
    );
  }
}
