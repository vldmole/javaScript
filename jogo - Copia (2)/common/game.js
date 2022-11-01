import createState from './model/state.js';

const game = {};

export default function createGame(cols=30, lines=20) 
{
   const DIRECTIONS = {LEFT: 0, RIGHT: 1, UP: 2, DOWN: 3};
 
   game.state = createState(cols,lines);
   game.state.DIRECTIONS = DIRECTIONS;

   //---------------------------------------------------------------------------------------
   game.setState = function (state)
   {
      game.state.set(state);
   }

   //---------------------------------------------------------------------------------------
   game.getState = function ()
   {
      return game.state;
   }
   
   //---------------------------------------------------------------------------------------
   game.addPlayer = function (playerId)
   {
      const players = game.state.players;
      const xPos = game.state.board.width/2;
      const yPos = game.state.board.height/2;
    
      const player = {
         id: playerId, 
         x: xPos, 
         y: yPos, 
         imgIndex:0, 
         nickName: "Newly Gamer ", 
         pointSum: 0 
      }

      players.push(player);
   }

   //-------------------------------------------------------------------------------------
   game.removePlayer = function (playerId)
   {
      return game.state.removePlayer(playerId);
   }

   //-------------------------------------------------------------------------------------
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

   //-------------------------------------------------------------------------------------
   function doEat (player)  
   {
      const board = game.state.board;
      if(board.cell[player.x][player.y] == null)
         return;
      
      const fruit = board.cell[player.x][player.y];
      board.cell[player.x][player.y] = null;

      player.pointSum += fruit.points;
   }
   game.doEat = doEat;

   //-------------------------------------------------------------------------------------
   game.handleCommand = function (command, playerId)
   {      
      if(!playerId)
         playerId = game.state.currentPlayerId;

      const player = game.state.getPlayer(playerId);
        
      if(player == null)
         return;

      if (command)
      {
         command.execute(player);
         doEat(player); 
      }
   };

   //-------------------------------------------------------------------------------------
   game.handleCredentials = function(credentials)
   {
      const player = game.state.getPlayer(credentials.playerId);
      player.nickName = credentials.nickName; 
   }

   //-------------------------------------------------------------------------------------
   return game;
}