export default function createBoard (width, height) 
{
   const board = {
      width: width,
      height: height,
      cell: [],

      reset: () => {
         return cell.forEach(col => col.fill(null));
      }, 

      clearCell: function (x, y) 
      {
         return this.cell[x][y] = null;
      },

      setCell: function (x, y, value)
      {
         return this.cell[x][y] = value;
      }
   }

   for(let i=0; i<board.width; i++)
      board.cell.push(new Array(board.height).fill(null) );

   return board;
}