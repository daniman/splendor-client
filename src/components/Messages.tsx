import React, { useEffect, useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import { NEW_MESSAGE_MUTATION } from '../gql/mutations';
import { playWav } from '../modules/playWav';
import * as Types from '../types';

export const Messages: React.FC<{
  messages: Types.GameBoard_game_messages[];
  gameId: String;
  playerId: String;
}> = ({ messages, gameId, playerId }) => {
  const [text, setText] = useState('');
  const [newMessage, { error: newMessageError }] = useMutation<
    Types.NewMessage
  >(NEW_MESSAGE_MUTATION);
  if (newMessageError) console.log(newMessageError);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const postNewMessage = () => {
    console.log(text);
    newMessage({ variables: { gameId, playerId, text } });
    setText('');
  };

  useEffect(() => {
    playWav('smb3_tail');
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div>
      <h3 style={{ marginTop: 0 }}>Messages:</h3>
      <div className="messages">
        {messages.slice().map((m, i) => (
          <div key={m?.when}>
            <code>{m?.playerId}</code> <span>{m.text}</span>
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
        onKeyUp={(e) => {
          if (e.key === 'Enter') postNewMessage();
        }}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
};
