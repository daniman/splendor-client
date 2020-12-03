import React, { useEffect, useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import { NEW_MESSAGE_MUTATION } from '../gql/mutations';
import { autocompletePlayerName } from '../modules/autocompletePlayerName';
import { playWav } from '../modules/playWav';
import * as Types from '../types';

export const Messages: React.FC<{
  messages: Types.GameBoard_game_messages[];
  gameId: String;
  playerId: String;
  players: Types.GameBoard_game_players[];
}> = ({ messages, gameId, playerId, players }) => {
  const [text, setText] = useState('');
  const [newMessage, { error: newMessageError }] = useMutation<
    Types.NewMessage
  >(NEW_MESSAGE_MUTATION);

  if (newMessageError) console.log(newMessageError);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const keyHandler = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((text.includes('@') || text.includes('^')) && e.key !== 'Backspace') {
      const start = Math.max(text.lastIndexOf('@'), text.lastIndexOf('^')) + 1;
      const foundPlayer = autocompletePlayerName(text.substr(start), players);
      if (foundPlayer) setText(text.substr(0, start) + foundPlayer + ' ');
    }
    if (e.key === 'Enter') postNewMessage();
  };

  const postNewMessage = () => {
    newMessage({ variables: { gameId, playerId, text } });
    setText('');
  };

  const myMessages = messages.filter((el) => {
    if (el.playerId === playerId) return true;
    // always see your own message
    else if (el.text.includes('@')) {
      if (el.text.includes(`@${playerId}`)) return true;
      else return false;
    } else if (el.text.includes('^')) {
      if (el.text.includes(`^${playerId}`)) return false;
      else return true;
    } else return true;
  });

  useEffect(() => {
    playWav('smb3_tail');
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [myMessages.length]);

  return (
    <div>
      <h3 style={{ marginTop: 0 }}>Messages:</h3>
      <div className="messages">
        {myMessages.slice().map((m, i) => (
          <div key={m?.when} className="message">
            <div className={m?.playerId === playerId ? 'fromMe' : ''}>
              <code>{m?.playerId}</code> <span>{m.text}</span>
            </div>
          </div>
        ))}
        <div
          style={{ float: 'left', clear: 'both' }}
          ref={messagesEndRef}
        ></div>
      </div>
      <input
        type="text"
        value={text}
        className="newMessage"
        onKeyUp={keyHandler}
        onChange={(e) => setText(e.target.value)}
      />
      <p className="messageInstructions">
        You can direct a message to a specific player by using{' '}
        <code>@username</code> anywhere in the message or you can{' '}
        <em>exclude</em> a player with <code>^username</code>. User names
        autocomplete.
      </p>
    </div>
  );
};
