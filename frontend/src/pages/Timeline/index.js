import React, {useState, useEffect, useMemo} from 'react';
import socketio from 'socket.io-client';
import api from '../../services/api';

import Tweet from '../../components/Tweet';
import twitterLogo from '../../assets/twitter.svg';

import './styles.css';

export default function Timeline(){
  const [newTweet, setNewTweet] = useState([]);
  const [tweets, setTweets] = useState([]);
  const socket = useMemo(() =>  socketio('http://localhost:3333', {
    //query: {tweets}
  }), []);


  useEffect(() => {
      socket.on('tweet', data =>{
        setTweets([data, ... tweets]);
      })
      socket.on('like', data =>{
        setTweets(tweets.map(tweet =>
          tweet._id == data._id ? data : tweet
        ));
      })

  }, [tweets]);
  

  useEffect(() => {
    async function loadTweets(){
      const response = await api.get('/tweets');

      setTweets(response.data);
    }

    //subscibeToEvents()
    loadTweets();
  }, [])

  // function subscibeToEvents(){
  //   const io = socket('http://localhost:3333');

  //   io.on('tweet', data => {
  //     setTweets([data, ...tweets])
  //   })
  // }


  async function handleNewTweet(e){
    if(e.keyCode !== 13) return;

    const content = newTweet;
    const author = localStorage.getItem('@GoTwitter:username');

    try{
      await api.post('tweets', {content, author})

      setNewTweet('');

    }catch(err){
    alert('Falha ao Tweetar, tente novamente!')
    }
  }

  return (
    <div className="timeline-wrapper">
      <img height={24} src={twitterLogo} alt="GoTwitter"/>

      <form>
        <textarea
          value={newTweet}
          onChange={e => setNewTweet(e.target.value)}
          onKeyDown={handleNewTweet}
          placeholder="O que esta acontecendo?"
        />
      </form>

      <ul className="tweet-list">
        {tweets.map(tweet => {
          return(
            <Tweet key={tweet._id} tweet={tweet} />
          )
        })}
      </ul>
    </div>
  )
}
