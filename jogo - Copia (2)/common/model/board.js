export default function createBoard (width, height) 
{
   const board = {
      width: width,
      height: height,
      cell: [],
   }

   board.reset = function () {
      board.cell.forEach(col => col.fill(null));
   }

   board.clearCell= function (x, y) 
   {
      board.cell[x][y] = null;
   }

   board.setCell= (x, y, value) =>
   {
      board.cell[x][y] = value;
   }

   board.set= (other)=>
   {
      for(let col=0; col<board.cell.length; col++)
      {
         for(let lin=0; lin<board.cell[col].length; lin++)
            board.cell[col][lin] = other.cell[col][lin]; 
      }
   }

   for(let i=0; i<board.width; i++)
      board.cell.push(new Array(board.height).fill(null) );

   return board;
}