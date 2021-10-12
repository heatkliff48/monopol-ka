import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { useDiceContext } from '../contexts/DiceContext';
import { getAllUsers } from '../redux/actions/AllUsersActions';
import { startGame } from '../redux/actions/gameActions';
import { getGameUsers } from '../redux/actions/gameUsersActions';
import { Button } from './atoms/Button';
import { PlayersList } from './Playerslist';

const LobbyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 40px;
  border: 3px solid black;
  background-color: white;
  width: 50%;
  height: 500px;
  margin: 10px;
  border-radius: 10px;
`;

const GroupDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

export const Lobby = () => {
  const { showAddUsers, setShowAddUsers, setCurrentKey } = useDiceContext();
  const dispatch = useDispatch();
  const params = useParams();
  // const currentGame = useSelector((state) => state.currentGame);
  const user = useSelector((state) => state.user);
  const allUsers = useSelector((state) => state.allUsers);
  const gameUsers = useSelector((state) => state.gameUsers);
  console.log(gameUsers);

  useEffect(() => {
    setCurrentKey(params.id);
    dispatch(getGameUsers(params.id));
  }, []);

  const addUsersHandler = () => {
    dispatch(getAllUsers(user.id));
    setShowAddUsers(!showAddUsers);
  };
  const startGamehandler = () => {
    dispatch(startGame(params.id));
  };
  return (
    <LobbyWrapper>
      <GroupDiv>
        <p>waiting for other players...</p>
        <Button text={'add Players'} onClick={() => addUsersHandler()}></Button>
      </GroupDiv>
      <div>
        <Button text={'Start Game'} onClick={() => startGamehandler()} />
      </div>
    </LobbyWrapper>
  );
};
