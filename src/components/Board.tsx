import React, { useState } from 'react';
import * as Types from '../types';
import { Helmet } from 'react-helmet';
import { useQuery, gql } from '@apollo/client';
import { LoadingSpinner } from '@apollo/space-kit/Loaders';
import { CardRowAndStack } from './CardRowAndStack';
import { NobleCard } from './NobleCard';
import { TurnBuilder, GAME_FRAGMENT } from './TurnBuilder';
import { Bank } from './Bank';
import { canSelectFromBank } from '../modules/coinRules';
import { MoveLog } from './MoveLog';
import { Miniboard } from './Miniboard';
import { NobleCards } from './NobleCards';
import { PurchasedCards } from './PurchasedCards';
import { ReservedCards } from './ReservedCards';
import { TurnIndicator } from './TurnIndicator';
import { playWav } from '../modules/playWav';

export type TopOfDeck = { type: Types.CardStackType };

const GAME_BOARD_QUERY = gql`
  query GameBoard($gameId: ID!, $playerId: ID) {
    game(id: $gameId) {
      ...GameSelection
    }
  }
  ${GAME_FRAGMENT}
`;

export const Board: React.FC<{ gameId: string }> = ({ gameId }) => {
  const { data, loading, error } = useQuery<Types.GameBoard>(GAME_BOARD_QUERY, {
    variables: { gameId, playerId: localStorage.getItem(`splendor:${gameId}`) },
    pollInterval: 3000,
  });

  const [showingPlayerId, setShowingPlayerId] = useState('');
  const [turnCoinState, setTurnCoinState] = useState<Types.GemColor[]>([]);
  const [returnCoinState, setReturnCoinState] = useState<Types.GemColor[]>([]);
  const [turnCardState, setTurnCardState] = useState<
    Types.CardSelection | TopOfDeck | null
  >(null);

  if (loading) return <LoadingSpinner theme="dark" size="small" />;
  if (error) return <div style={{ color: 'red' }}>{error.message}</div>;
  if (!data || !data.game) return <div>No game found :(</div>;

  const localPlayerId = localStorage.getItem(`splendor:${data.game.id}`);
  const activePlayer = data.game.currentTurn || data.game.players[0];
  const showingPlayer =
    (showingPlayerId &&
      data.game.players.find((p) => p.id === showingPlayerId)) ||
    data.game.players[0];

  const canAct =
    !!localPlayerId &&
    (localPlayerId === data.game.currentTurn?.id || localPlayerId === 'sudo');

  return (
    <>
      <Helmet>
        <title>
          {data.game.name} {canAct ? `| 👋 it's your turn!` : ''}
        </title>
      </Helmet>
      <div className="row">
        <div className="col-lg-6">
          <TurnIndicator 
            game={data.game} 
            activePlayer={activePlayer} 
          />

          <div style={{ position: 'relative', marginBottom: 30 }}>
            <div style={{ display: 'flex' }}>
              {data.game.nobles.map((card) => (
                <NobleCard key={card.id} card={card} />
              ))}
            </div>
          </div>

          <Bank
            bank={data.game.bank.map(({ gemColor, quantity }) => ({
              gemColor,
              quantity:
                quantity - turnCoinState.filter((c) => c === gemColor).length,
            }))}
            style={{ marginBottom: 40 }}
            onSelect={(color) => {
              if (canAct){
                const bank = data?.game?.bank;
                const playerBank = data?.game?.currentTurn?.bank;
                const csfb = canSelectFromBank(color,turnCoinState,playerBank,bank,returnCoinState);
                if (!csfb.err) {
                  playWav('smb3_coin');
                  setTurnCoinState([...turnCoinState, color]);
                } else {
                  playWav('smb3_bump');
                }
                // TBD: csfb.msg contains the error message, this needs to be displayed somewhere
              }
            }}
          />

          <div style={{ position: 'relative', marginBottom: 40 }}>
            {data.game.cardStacks.map(({ type, remaining, cards }) => (
              <CardRowAndStack
                key={type}
                cards={cards}
                turnCardState={turnCardState}
                remaining={remaining}
                level={type}
                onSelect={(card: Types.CardSelection | TopOfDeck) => {
                  canAct && setTurnCardState(card);
                }}
              />
            ))}
          </div>
        </div>

        <div className="col-lg-6">
          {canAct && (
            <TurnBuilder
              gameId={gameId}
              goldAvailableInBank={
                !!data.game.bank.find((b) => b.gemColor === 'YELLOW')
                  ? data.game.bank.find((b) => b.gemColor === 'YELLOW')!
                      .quantity > 0
                  : false
              }
              activePlayer={activePlayer}
              turnCardState={turnCardState}
              setTurnCardState={setTurnCardState}
              turnCoinState={turnCoinState}
              setTurnCoinState={setTurnCoinState}
              returnCoinState={returnCoinState}
              setReturnCoinState={setReturnCoinState}
            />
          )}

          <Miniboard 
            players={data.game.players} 
            setShowingPlayerId={setShowingPlayerId} 
            showingPlayer={showingPlayer}
            activePlayer={activePlayer} />

          <Bank
            bank={showingPlayer.bank.map(({ gemColor, quantity }) => ({
              gemColor,
              quantity:
                quantity - returnCoinState.filter((c) => c === gemColor).length,
            }))}
            onSelect={(color) => {
              canAct && setReturnCoinState([...returnCoinState, color]);
            }}
          />

          <NobleCards
            cards={showingPlayer.nobles}
          />

          <PurchasedCards 
            cards={showingPlayer.purchasedCards} 
            bank={data.game.bank} 
          />
          <ReservedCards 
            cards={showingPlayer.reservedCards} 
            canAct={canAct}
            turnCardState={turnCardState}
            setTurnCardState={setTurnCardState}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <MoveLog turns={data.game.turns}/>
        </div>
      </div>
    </>
  );
};
