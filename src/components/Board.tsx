import React, { useState } from 'react';
import * as Types from '../types';
import { Helmet } from 'react-helmet';
import { useQuery, gql } from '@apollo/client';
import { LoadingSpinner } from '@apollo/space-kit/Loaders';
import { TurnBuilder, GAME_FRAGMENT } from './TurnBuilder';
import { Bank } from './Bank';
import { canSelectFromBank } from '../modules/coinRules';
import { cookie } from '../modules/cookie';
import { MoveLog } from './MoveLog';
import { Miniboard } from './Miniboard';
import { NobleCards } from './NobleCards';
import { PurchasedCards } from './PurchasedCards';
import { ReservedCards } from './ReservedCards';
import { TurnIndicator } from './TurnIndicator';
import { playWav } from '../modules/playWav';
import { NobleStack } from './NobleStack';
import { GameCardStacks } from './GameCardStacks';

export type TopOfDeck = { type: Types.CardStackType };

const GAME_BOARD_QUERY = gql`
  query GameBoard($gameId: ID!, $playerId: ID) {
    game(id: $gameId) {
      ...GameSelection
    }
  }
  ${GAME_FRAGMENT}
`;

export const Board: React.FC<{
  gameId: string;
  localPlayerId: string | null;
  ticker: string;
}> = ({ gameId, localPlayerId, ticker }) => {
  const { data, loading, error } = useQuery<Types.GameBoard>(GAME_BOARD_QUERY, {
    variables: { gameId, playerId: cookie.get(`splendor:${gameId}`) },
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

  const activePlayer = data.game.currentTurn || data.game.players[0];
  const showingPlayer =
    (showingPlayerId &&
      data.game.players.find((p) => p.id === showingPlayerId)) ||
    data.game.players[0];

  /* compute points available to purchase cards and attract nobles for the SHOWING PLAYER
   * this can be used for client-side validation of purchases and/or
   * indicating what % of a card the user has resources for */
  // TBD: uncomment the line below when implementing such features
  // const { purchasingPoints, noblePoints } = playerResources(showingPlayer.bank, showingPlayer.purchasedCards);

  // const canAct = true;
  const canAct =
    !!localPlayerId &&
    data.game.state !== Types.GameState.COMPLETE &&
    localPlayerId === data.game.currentTurn?.id;

  return (
    <>
      <Helmet>
        <title>
          {data.game.name} {canAct ? `| 👋 it's your turn!` : ''}
        </title>
      </Helmet>

      <TurnIndicator
        name={data.game.name}
        state={data.game.state}
        players={data.game.players}
        activePlayer={activePlayer}
        localPlayerId={localPlayerId}
        ticker={ticker}
      />

      <div className="row">
        <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
          <Bank
            bank={data.game.bank.map(({ gemColor, quantity }) => ({
              gemColor,
              quantity:
                quantity - turnCoinState.filter((c) => c === gemColor).length,
            }))}
            style={{ marginTop: 20 }}
            onSelect={(color) => {
              if (canAct) {
                const bank = data?.game?.bank;
                const playerBank = data?.game?.currentTurn?.bank;
                const csfb = canSelectFromBank(
                  color,
                  turnCoinState,
                  playerBank,
                  bank,
                  returnCoinState
                );
                if (!csfb.err) {
                  setTurnCoinState([...turnCoinState, color]);
                } else {
                  playWav('smb3_bump');
                }
                // TBD: csfb.msg contains the error message, this needs to be displayed somewhere
              }
            }}
          />

          <NobleStack nobles={data.game.nobles} />

          <GameCardStacks
            cardStacks={data.game.cardStacks}
            canAct={canAct}
            turnCardState={turnCardState}
            setTurnCardState={setTurnCardState}
          />
        </div>
        <div
          className="col-lg-6 col-md-12 col-sm-12 col-xs-12"
          style={
            canAct
              ? { border: '2px dotted yellow' }
              : { border: '1px dotted grey' }
          }
        >
          <Miniboard
            players={data.game.players}
            setShowingPlayerId={setShowingPlayerId}
            showingPlayer={showingPlayer}
            activePlayer={activePlayer}
            localPlayerId={localPlayerId}
          />

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

          <Bank
            bank={showingPlayer.bank.map(({ gemColor, quantity }) => ({
              gemColor,
              quantity:
                quantity - returnCoinState.filter((c) => c === gemColor).length,
            }))}
            onSelect={(color) => {
              if (canAct) {
                setReturnCoinState([...returnCoinState, color]);
              }
            }}
          />

          <NobleCards cards={showingPlayer.nobles} />

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
          <MoveLog turns={data.game.turns} />
        </div>
      </div>
    </>
  );
};
