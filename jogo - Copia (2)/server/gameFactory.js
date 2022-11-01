
import createGame from '../common/game.js';
import createServerGame from './serverGameDecorator.js'

function create(httpServer)
{
   const game = createGame();
   const serverGame  = createServerGame(game, httpServer);

   teste(game);

   return serverGame;
}

function teste(game)
{   
   for(let x=0; x<20; x++)
      game.state.board.setCell(x, 0, {id: 1, imgIndex: 1, points: 2, isEdible: true});
   game.state.board.setCell(1, 1, {id: 2, imgIndex: 3, points: 2, isEdible: true});
   game.state.board.setCell(2, 2, {id: 3, imgIndex: 2, points: 2, isEdible: true});

   game.state.board.setCell(3, 3, {color: 'red', imgIndex: 0, isEdible: false});
   game.state.board.setCell(4, 4, {color: 'red', imgIndex: 0, isEdible: false});
   game.state.board.setCell(5, 5, {color: 'red', imgIndex: 0, isEdible: false});
}

export default {
   create: create
}