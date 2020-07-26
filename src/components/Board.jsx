import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { LoadingSpinner } from '@apollo/space-kit/Loaders';
import moment from 'moment';
import { TurnBuilder } from './TurnBuilder';
import { Bank } from './Bank';
import { canSelectFromBank } from '../modules/coinRules';
import { MoveLog } from './MoveLog';
import { Miniboard } from './Miniboard';
import { NobleCards } from './NobleCards';
import { PurchasedCards } from './PurchasedCards';
import { ReservedCards } from './ReservedCards';
import { TurnIndicator } from './TurnIndicator';
import { playWav } from '../modules/playWav';
import { NobleStack } from './NobleStack';
import { GameCardStacks } from './GameCardStacks';
import { usePrevious } from '../modules/usePrevious';

import * as Types from '../types';

export const Board = ({ subscribeToGame, playerId, data, loading, error }) => {
  useEffect(() => subscribeToGame());

  const turn = data?.game?.currentTurn?.id;
  const lastTurn = data?.game?.turns.slice(-1)[0];
  const prevTurn = usePrevious(turn);

  const [ticker, setTicker] = useState('');
  useEffect(() => {
    const interval = setInterval(() => {
      const diff = moment().diff(lastTurn ? lastTurn.when : new Date());
      setTicker(moment(diff).format('mm:ss'));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [playerId, lastTurn]);

  useEffect(() => {
    if ( playerId === 'sudo' || (prevTurn !== playerId && turn === playerId) ) {
      playWav('smb3_jump');
    }
  }, [playerId, prevTurn, turn, lastTurn]);
  
  const [showingPlayerId, setShowingPlayerId] = useState(playerId);
  const [turnCoinState, setTurnCoinState] = useState([]);
  const [returnCoinState, setReturnCoinState] = useState([]);
  const [turnCardState, setTurnCardState] = useState(null);

  /* compute points available to purchase cards and attract nobles for the SHOWING PLAYER
  * this can be used for client-side validation of purchases and/or
  * indicating what % of a card the user has resources for
  * TBD: uncomment the line below when implementing such features
  * const { purchasingPoints, noblePoints } = playerResources(showingPlayer.bank, showingPlayer.purchasedCards);
  */

  if (loading) return <LoadingSpinner theme="dark" size="small" />;
  else if (error) return <div style={{ color: 'red' }}>{error.message}</div>;
  else if (data && data.game) {
    const game = data.game;
    const canAct = !!playerId && game.state !== Types.GameState.COMPLETE && playerId === game.currentTurn?.id;
    const activePlayer = game.currentTurn || game.players[0];
    const showingPlayer = showingPlayerId ? game.players.find((p => p.id === showingPlayerId)) : game.players[0];
  
    return (
      <>
        <Helmet>
          <title>
            {game.name} {canAct ? `| 👋 it's your turn!` : ''}
          </title>
        </Helmet>

        <TurnIndicator
          name={game.name}
          state={game.state}
          players={game.players}
          localPlayerId={playerId}
        />

        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <Bank
              bank={game.bank.map(({ gemColor, quantity }) => ({
                gemColor,
                quantity:
                  quantity - turnCoinState.filter((c) => c === gemColor).length,
              }))}
              style={{ marginTop: 20 }}
              onSelect={(color) => {
                if (canAct) {
                  const bank = game?.bank;
                  const playerBank = game?.currentTurn?.bank;
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

            <NobleStack nobles={game.nobles} />

            <GameCardStacks
              cardStacks={game.cardStacks}
              canAct={canAct}
              turnCardState={turnCardState}
              setTurnCardState={setTurnCardState}
            />
          </div>
          <div
            className="col-lg-6 col-md-12 col-sm-12 col-xs-12"
            // style={
            //   canAct
            //     ? { border: '2px dotted yellow' }
            //     : { border: '1px dotted grey' }
            // }
          >
            {canAct && (
              <TurnBuilder
                globalBank={data.game.bank}
                gameId={game.id}
                goldAvailableInBank={
                  !!game.bank.find((b) => b.gemColor === 'YELLOW')
                    ? game.bank.find((b) => b.gemColor === 'YELLOW')
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
              gameState={game.state}
              ticker={ticker}
              players={game.players}
              setShowingPlayerId={setShowingPlayerId}
              showingPlayer={showingPlayer}
              activePlayer={activePlayer}
              localPlayerId={playerId}
            />

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
              bank={game.bank}
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
            <MoveLog turns={game.turns} />
          </div>
        </div>
      </>
    );
  } else return (<></>)
}