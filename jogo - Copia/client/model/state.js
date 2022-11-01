import createBoard from "./board.js";

export default function createState (boardWidth, boardHeight)
{
   const state = {
      board: createBoard(boardWidth, boardHeight),

      currentPlayer: null,

      players: [],

      removePlayer: (player) =>
      {
         const index = players.findIndex(element => element.id = player.id);
         players.splice(index, 1);
      },

      set: (state) =>
      {
         board = state.board;
         currentPlayer = state.currentPlayer;
      }
   }

   return state;
} 