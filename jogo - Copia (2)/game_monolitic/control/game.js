import createState from '../model/state.js';
import createCommands from './commands.js';

export default function createGame(window, cols, lines)
{
   const game = 
   {
      DIRECTIONS: {LEFT: 0, RIGHT: 1, UP: 2, DOWN: 3},

      state: createState(cols,lines),
   }

   game.addPlayer = function (player)
   {
      return this.state.players.push(player);
   };

   function removePLayer(player)
   {
      return this.state.removePlayer(player);
   }
   game.removePlayer = removePLayer;


   function canMoveTo (x, y)
   {
      const board = game.state.board;
      if(x < 0 || y < 0 || x >= board.width || y >= board.height) 
         return false;

      if(board.cell[x][y] == null)
         return true;
      
      if(board.cell[x][y].isEdible)
         return true;
      
      return false;
   }
   game.canMoveTo = canMoveTo;


   function doEat (player)  
   {
      const board = game.state.board;
      if(board.cell[player.x][player.y] == null)
         return;
      
      const fruit = board.cell[player.x][player.y];
      board.setCell(player.x, player.y, null);

      player.pointSum += fruit.points;
   }
   game.doEat = doEat;

   

   game.moveCommands = createCommands(game);
   console.log(game.moveCommands);
   game.handleMovements = (commandName) =>
   {
      const command = game.moveCommands.getCommand(commandName);
      if (command)
      {
         const player = game.state.currentPlayer;
         command.execute(player);
         doEat(player);
      }
   };
   
   function keydownListener(event)
   {   
                  
      let commandName = event.key; 

      if(event.shiftKey)
         commandName = `Shift${commandName}`; 
      
      game.handleMovements(commandName);             
   }
   window.addEventListener('keydown', keydownListener);


            
   game.addPlayer({id: 4, x: 10, y: 6, imgIndex: 0, pointSum: 0});
   game.addPlayer({id: 5, x: 11, y: 6, imgIndex: 1, pointSum: 0});
   game.addPlayer({id: 6, x: 12, y: 6, imgIndex: 3, pointSum: 0});

   game.state.currentPlayer = game.state.players[2];
   console.log(game.state.currentPlayer);
   console.log(game.state.players); 

   for(let x=0; x<20; x++)
      game.state.board.setCell(x, 0, {id: 1, imgIndex: 1, points: 2, isEdible: true});
   game.state.board.setCell(1, 1, {id: 2, imgIndex: 3, points: 2, isEdible: true});
   game.state.board.setCell(2, 2, {id: 3, imgIndex: 2, points: 2, isEdible: true});
   
   game.state.board.setCell(3, 3, {color: 'red', imgIndex: 0, isEdible: false});
   game.state.board.setCell(4, 4, {color: 'red', imgIndex: 0, isEdible: false});
   game.state.board.setCell(5, 5, {color: 'red', imgIndex: 0, isEdible: false});

   return game;
}