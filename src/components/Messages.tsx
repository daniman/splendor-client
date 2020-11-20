import React from 'react';
import { useMutation } from '@apollo/client';
import { NEW_MESSAGE_MUTATION } from '../gql/mutations';
import * as Types from '../types';

export const Messages: React.FC<{
  messages: Types.GameBoard_game_messages[];
}> = ({ messages }) => {
  const [newMessage, { error: newMessageError }] = 
    useMutation<Types.NewMessage>(NEW_MESSAGE_MUTATION);
    console.log(newMessage);
    console.log(newMessageError);
  return (
    <div>
      <h3 style={{ marginTop: 0 }}>Messages:</h3>
      <div className="moveLog">
        {messages.slice().map((m, i) => (
          <div key={m?.when}>
            <code>{m?.playerId}</code> <span>m.text</span>
          </div>
        ))}
      </div>
    </div>
  );
};
