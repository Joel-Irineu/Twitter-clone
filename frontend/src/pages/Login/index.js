import React, { useState} from 'react';
import {useHistory} from 'react-router-dom';

import twitterLogo from '../../assets/twitter.svg';

import './styles.css';

export default function Login() {
  const [username, setUsername] = useState([]);
  const history = useHistory();

  async function handleSubmit(e){
    e.preventDefault();

    try{
        localStorage.setItem('@GoTwitter:username', username);

        history.push('/timeline')
    }catch(err){
      alert('Falha no login, tente novamente!')
    }
  }

  return (
    <div className="login-wrapper">
      <img src={twitterLogo} alt="GOTwitter"/>
      <form onSubmit={handleSubmit} >
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Nome de usuário"
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  )
}
