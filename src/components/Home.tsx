import React, { useState } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import { LoadingSpinner } from '@apollo/space-kit/Loaders';
import { Button } from '@apollo/space-kit/Button';
import { colors } from '@apollo/space-kit/colors';
import { Modal } from '@apollo/space-kit/Modal';
import { TextField } from '@apollo/space-kit/TextField';
import { Link } from 'react-router-dom';
import { Small } from './Lobby';

import * as Types from '../types';

const ALL_GAMES_QUERY = gql`
  query AllGames {
    allGames {
      id
      name
      state
      players {
        id
      }
    }
  }
`;

const CREATE_GAME_MUTATION = gql`
  mutation CreateGame($name: String!) {
    newGame(name: $name) {
      id
      name
    }
  }
`;

export const Home: React.FC = () => {
  const { data, loading, error } = useQuery<Types.AllGames>(ALL_GAMES_QUERY, {
    pollInterval: 3000,
  });
  const [
    createGame,
    { loading: createLoading, error: createError },
  ] = useMutation<Types.JoinGame>(CREATE_GAME_MUTATION, {
    refetchQueries: [{ query: ALL_GAMES_QUERY }],
  });
  const [gameName, setGameName] = useState('');
  const [open, setOpen] = useState(false);

  if (loading) return <LoadingSpinner theme="dark" size="small" />;
  if (error) return <div style={{ color: 'red' }}>{error.message}</div>;
  if (!data || !data.allGames) return <div>No game list was found :(</div>;

  const onClose = () => {
    setOpen(false);
    setGameName('');
  };

  return (
    <div className="row">
      <h1>Games:</h1>
      {data.allGames.map(({ id, name, state, players }, i) => (
        <Link to={`/${id}`}>
          <h3 style={{ color: 'white', marginTop: 0, marginBottom: 10 }}>
            <div style={{ display: 'inline-block' }} className="clickable">
              <code style={{ marginRight: 10 }}>{state}</code>
              <span style={{ marginRight: 10 }}>{name}</span>
              <Small>{players.length} players</Small>
            </div>
          </h3>
        </Link>
      ))}
      <Button
        theme="dark"
        style={{ marginRight: 10, marginTop: 20 }}
        color={colors.pink.dark}
        onClick={() => {
          setOpen(true);
        }}
      >
        Create Game
      </Button>
      {open && (
        <Modal
          className="text-black"
          title="Name of the game?"
          size="small"
          onClose={onClose}
          primaryAction={
            <Button
              loading={createLoading}
              color={colors.blue.base}
              onClick={() => {
                createGame({
                  variables: { name: gameName },
                })
                  .then(onClose)
                  .catch((e) => {
                    console.error(e.message);
                  });
              }}
            >
              Create
            </Button>
          }
          secondaryAction={<Button onClick={onClose}>Cancel</Button>}
        >
          <TextField
            autoFocus={true}
            error={createError?.graphQLErrors.map((e) => e.message).join('; ')}
            className="width-full"
            label="Game Name"
            size="standard"
            value={gameName}
            onChange={(e) => {
              setGameName(e.target.value);
            }}
          />
        </Modal>
      )}
    </div>
  );
};
