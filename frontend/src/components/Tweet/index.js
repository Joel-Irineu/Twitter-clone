import React from 'react';
import api from '../../services/api';

import like from '../../assets/like.svg';
import './styles.css';

export default function Tweet(props) {
  const {tweet} = props;

  async function handleLike(){
    const {_id} = tweet;

    await api.post(`/likes/${_id}`);
  }

  return (
    <li className="tweet">
      <strong>@{tweet.author}</strong>
      <p>{tweet.content}</p>
      <button type='button' onClick={handleLike}>
        <img src={like} alt="like"/>
        {tweet.likes}
      </button>
    </li>
  );
}
