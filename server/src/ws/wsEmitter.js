const {
  NEW_GAME_CREATE,
  NEW_PERSON,
  DEL_GAME,
  START_GAME_SOCKET,
} = require('../constants/event');
const myEmitter = require('../ee');

function registerWsEmitter(map) {
  myEmitter.on(NEW_GAME_CREATE, (game) => {
    for (let [id, userConnect] of map) {
      userConnect.send(
        JSON.stringify({
          type: NEW_GAME_CREATE,
          payload: game,
        })
      );
    }
  });

  myEmitter.on(NEW_PERSON, (test) => {
    for (let [id, userConnect] of map) {
      test.map((el) => {
        if (el.id == id) {
          userConnect.send(
            JSON.stringify({
              type: NEW_PERSON,
              payload: game,
            })
          );
        }
      });
    }
  });

  myEmitter.on(START_GAME_SOCKET, (data) => {
    for (let [id, userConnect] of map) {
      console.log(data);
      data.users.map((el) => {
        if (id === el.id) {
          console.log(1);
          userConnect.send(
            JSON.stringify({
              type: START_GAME_SOCKET,
              payload: data.gameid,
            })
          );
        }
      });
    }
  });
}
module.exports = registerWsEmitter;
