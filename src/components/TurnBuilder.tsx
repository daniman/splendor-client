import React, { Dispatch, SetStateAction, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Button } from '@apollo/space-kit/Button';
import { colors } from '@apollo/space-kit/colors';
import { PURCHASE_CARD_MUTATION, RESERVE_CARD_FROM_STACK_MUTATION, 
  RESERVE_CARD_MUTATION, TAKE_COINS_MUTATION } from '../gql/mutations';
import { Card, PlaceholderCard } from './Card';
import { TurnCoins } from './TurnCoins';
import { TopOfDeck } from './CardRowAndStack';
import * as Types from '../types';
import { playWav } from '../modules/playWav';

export const TurnBuilder: React.FC<{
  gameId: string;
  globalBank: { gemColor: Types.GemColor; quantity: number }[];
  activePlayer: Types.PlayerSelection;
  turnCardState: Types.CardSelection | TopOfDeck | null;
  setTurnCardState: Dispatch<
    SetStateAction<Types.CardSelection | TopOfDeck | null>
  >;
  turnCoinState: Types.GemColor[];
  setTurnCoinState: Dispatch<SetStateAction<Types.GemColor[]>>;
  returnCoinState: Types.GemColor[];
  setReturnCoinState: Dispatch<SetStateAction<Types.GemColor[]>>;
}> = ({
  gameId,
  globalBank,
  activePlayer,
  turnCardState,
  setTurnCardState,
  turnCoinState,
  setTurnCoinState,
  returnCoinState,
  setReturnCoinState,
}) => {
  const [takeGems, { error: takeGemsError }] = 
    useMutation<Types.TakeCoins>(TAKE_COINS_MUTATION);
  const [purchaseCard, { error: purchaseCardError }] = 
    useMutation<Types.PurchaseCard>(PURCHASE_CARD_MUTATION);
  const [reserveCard, { error: reserveCardError }] = 
    useMutation<Types.ReserveCard>(RESERVE_CARD_MUTATION);
  const [reserveCardFromStack, { error: reserveCardFromStackError }] = 
    useMutation<Types.ReserveCardFromStack>(RESERVE_CARD_FROM_STACK_MUTATION);

  const [showGQLError, setShowGQLError] = useState(true); // state to show gql errors
  
  const handleGQLError = (e: String) => { // error handler for gql errors
    playWav('smb3_bump');
    setShowGQLError(true);
  };

  const gqlError = // coalesce all the gql errors
    takeGemsError ||
    purchaseCardError ||
    reserveCardError ||
    reserveCardFromStackError;
  
  if (showGQLError && gqlError) { // clear gql errors after 3000ms
    setTimeout(() => setShowGQLError(false), 3000);
  }

  return (
    <div style={{ border: '3px dotted yellow', padding: 10 }}>
      <h3 style={{ marginTop: 0, marginBottom: 20 }}>
        <span role="img" aria-label="waving">
          👋
        </span>{' '}
        It's your turn!
      </h3>
      {!turnCardState && !turnCoinState.length && (
        <code>Take some gems, purchase a card, or reserve a card.</code>
      )}
      <div style={{ display: 'grid', width: 'fit-content' }}>
        {Array.from(new Set([...turnCoinState, ...returnCoinState])).map(
          (gemColor, i) => (
            <>
              <TurnCoins
                coinState={turnCoinState}
                setCoinState={setTurnCoinState}
                gemColor={gemColor}
                column={i}
                key={gemColor}
              />
              <TurnCoins
                coinState={returnCoinState}
                setCoinState={setReturnCoinState}
                gemColor={gemColor}
                column={i}
                key={`-${gemColor}`}
                inverted={true}
              />
            </>
          )
        )}
      </div>
      <div>
        {turnCardState &&
          (!!(turnCardState as Types.CardSelection).id ? (
            <Card
              card={turnCardState as Types.CardSelection}
              style={{ marginLeft: 0, marginRight: 0 }}
              onSelect={() => {
                setTurnCardState(null);
              }}
            />
          ) : (
            <PlaceholderCard
              label={(turnCardState as TopOfDeck).type}
              style={{ marginLeft: 0, marginRight: 0 }}
              onClick={() => {
                setTurnCardState(null);
                setReturnCoinState([]);
              }}
            />
          ))}
      </div>
      <div style={{ marginTop: 20 }}>
        <Button
          size="small"
          theme="dark"
          color={colors.pink.base}
          style={{ marginRight: 10 }}
          disabled={turnCoinState.length === 0}
          onClick={() => {
            let confirmed = true;
            let otherColorsAvailable = false;
            for (const chipCount of globalBank) {
              if (!turnCoinState.includes(chipCount.gemColor) && chipCount.quantity > 0 && chipCount.gemColor !== 'YELLOW') {
                otherColorsAvailable = true;
                break;
              }
            }
            const playerBankSize = activePlayer.bank.reduce((acc, cur) => acc + cur.quantity, 0);
            if (turnCoinState.length < 3 &&
              turnCoinState.length + playerBankSize < 10 &&
              new Set(turnCoinState).size === turnCoinState.length &&
              otherColorsAvailable) {
              confirmed = window.confirm(
                'You can take more chips than this. Are you sure?'
              );
            }
            if (confirmed) {
              takeGems({
                variables: {
                  gameId,
                  playerId: activePlayer.id,
                  gemList: turnCoinState,
                  returnGemList: returnCoinState,
                },
              })
                .then(() => {
                  setTurnCoinState([]);
                  setReturnCoinState([]);
                })
                .catch((e) => handleGQLError(e));
            }}
          }
        >
          Take Gems
        </Button>
        <Button
          size="small"
          theme="dark"
          color={colors.pink.base}
          style={{ marginRight: 10 }}
          disabled={!turnCardState || !!(turnCardState as TopOfDeck).type}
          title={
            turnCardState && !!(turnCardState as TopOfDeck).type
              ? 'You cannot purchase a card from the top of a deck.'
              : ''
          }
          onClick={() => {
            purchaseCard({
              variables: {
                gameId,
                playerId: activePlayer.id,
                cardId: (turnCardState as Types.CardSelection)?.id,
              },
            })
              .then(() => {
                setTurnCardState(null);
                setReturnCoinState([]);
              })
              .catch((e) => handleGQLError(e));
          }}
        >
          Purchase
        </Button>
        <Button
          size="small"
          theme="dark"
          color={colors.pink.base}
          disabled={
            !turnCardState ||
            activePlayer.reservedCards
              .filter((c) => !!c)
              .map((c) => c!.id)
              .includes((turnCardState as Types.CardSelection).id)
          }
          onClick={() => {
            let confirmed = true;
            if (globalBank.find((b) => b.gemColor === 'YELLOW')?.quantity === 0) {
              confirmed = window.confirm(
                'Are you sure you want to reserve when no gold gems are available?'
              );
            }

            if (confirmed) {
              if (
                turnCardState &&
                !!(turnCardState as Types.CardSelection).id
              ) {
                reserveCard({
                  variables: {
                    gameId,
                    playerId: activePlayer.id,
                    cardId: (turnCardState as Types.CardSelection)?.id,
                    returnGemList: returnCoinState,
                  },
                })
                  .then(() => {
                    setTurnCardState(null);
                    setReturnCoinState([]);
                  })
                  .catch((e) => handleGQLError(e));
              } else {
                reserveCardFromStack({ // reserve from top of deck
                  variables: {
                    gameId,
                    playerId: activePlayer.id,
                    stack: (turnCardState as TopOfDeck)?.type,
                    returnGemList: returnCoinState,
                  },
                })
                  .then(() => {
                    setTurnCardState(null);
                    setReturnCoinState([]);
                  })
                  .catch((e) => handleGQLError(e));
              }
            }
          }}
        >
          Reserve
        </Button>
      </div>
      {showGQLError && gqlError && (
        <div style={{ marginTop: 20 }}>
          <code>{gqlError.graphQLErrors.map((e) => e.message).join('; ')}</code>
        </div>
      )}
    </div>
  );
};
