import createBoard from "./board.js";

export default function createState (boardWidth, boardHeight)
{
   const state = {
      board: createBoard(boardWidth, boardHeight),
      players: [],
      currentPlayerId: 0,
   }

   state.getCurrentPlayerId = () => state.currentPlayerId;
   state.setCurrentPlayerId = (id) => state.currentPlayerId = id;

   state.removePlayer = function (playerId)
   {
      const players = this.players; 
      const index = players.findIndex(player => player.id === playerId);
      players.splice(index, 1);
   }

   state.getPlayer= function (playerId)
   {
      const players = this.players; 
      const index = players.findIndex(player => player.id === playerId)
      return players[index];
   }

   state.set = function (newState)
   {
      this.board.set(newState.board);
      this.players = newState.players;
      this.currentPlayerId = newState.currentPlayerId;
   }

   return state;
} 