import React from 'react';
import moment from 'moment';
import * as Types from '../types';
import { Small } from './Lobby';

export const MoveLog: React.FC<{
  turns: Types.GameBoard_game_turns[];
}> = ( { turns } ) => (
  <div>
    <h3 style={{ marginTop: 0 }}>Turn Log:</h3>
    <div className='moveLog'>
      {turns
        .slice()
        .reverse()
        .map((t, i) => (
          <div key={i}>
            <span
              style={{ marginRight: 10, opacity: 0.8 }}
              className="mono"
            >
              {moment(t.when).format('h:mm')}
            </span>
            <code>{t.playerId}</code>{' '}
            {t.__typename === 'TakeGems' ? (
              <span>
                <Small>took</Small> <code>{t.gems.join(', ')}</code>{' '}
                <Small>gems</Small>
              </span>
            ) : t.__typename === 'PurchaseCard' ? (
              <span>
                <Small>purchased a</Small>{' '}
                <code>{t.card ? t.card.gemColor : 'mysterious'}</code>{' '}
                <Small>card</Small>
              </span>
            ) : (
              <span>
                <Small>reserved a</Small>{' '}
                {t.card ? (
                  <span>
                    <code>{t.card.pointValue}</code> <Small>point</Small>{' '}
                    <code>{t.card.gemColor}</code>
                  </span>
                ) : t.cardType ? (
                  <code>TYPE {t.cardType}</code>
                ) : (
                  <code>MYSTERY</code>
                )}{' '}
                <Small>card</Small>
              </span>
            )}{' '}
            <Small>{moment(t.when).fromNow()}</Small>.
          </div>
        ))
      }
    </div>
  </div>
);
