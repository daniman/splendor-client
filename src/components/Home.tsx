import React, { useState, useEffect } from 'react';
import { LoadingSpinner } from '@apollo/space-kit/Loaders';
import { Button } from '@apollo/space-kit/Button';
import { colors } from '@apollo/space-kit/colors';
import { Modal } from '@apollo/space-kit/Modal';
import { TextField } from '@apollo/space-kit/TextField';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { CREATE_GAME_MUTATION } from '../gql/mutations';
import { Small } from './Lobby';

import * as Types from '../types';

export const Home: React.FC<{subscribeToNewGames: any, data: Types.AllGames | undefined, loading: boolean, error:any}> =
 ({ subscribeToNewGames, data, loading, error }) => {
  useEffect(() => subscribeToNewGames());

  const [ createGame, { loading: createLoading, error: createError }] = 
    useMutation(CREATE_GAME_MUTATION);
  const [gameName, setGameName] = useState('');
  const [open, setOpen] = useState(false);

  if (loading) return <LoadingSpinner theme="dark" size="small" />;
  if (!data || !data.allGames) return <div>No game list was found :(</div>;
  if (error) return <div style={{ color: 'red' }}>{error.message}</div>;

  const onClose = () => {
    setOpen(false);
    setGameName('');
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <h1>Games:</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          {data.allGames.map(({ id, name, state, players }) => (
            <h3
              key={id}
              style={{ color: 'white', marginTop: 0, marginBottom: 10 }}
            >
              <Link to={`/${id}`} key={id}>
                <div style={{ display: 'inline-block' }} className="clickable">
                  <code style={{ marginRight: 10 }}>{state}</code>
                  <span style={{ marginRight: 10 }}>{name}</span>
                  <Small>{players.length} players</Small>
                </div>
              </Link>
            </h3>
          ))}
        </div>
      </div>
      <div>
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
        <p>
          <a
            href="https://cdn.1j1ju.com/medias/7f/91/ba-splendor-rulebook.pdf"
            target="_new"
          >
            The Rules of Splendor
          </a>
        </p>
        {open && (
          <Modal
            className="text-black"
            as={
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  createGame({
                    variables: { name: gameName },
                  })
                    .then(onClose)
                    .catch((e) => {
                      console.error(e.message);
                    });
                }}
                noValidate={true}
              />
            }
            title="Name of the game?"
            size="small"
            onClose={onClose}
            primaryAction={
              <Button
                type="submit"
                loading={createLoading}
                color={colors.blue.base}
              >
                Create
              </Button>
            }
            secondaryAction={
              <Button type="button" onClick={onClose}>
                Cancel
              </Button>
            }
          >
            <TextField
              autoFocus={true}
              error={createError?.graphQLErrors
                .map((e) => e.message)
                .join('; ')}
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
    </>
  );
};
