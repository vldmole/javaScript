
export default function createCommands(game) 
{
   const commands = [
      { 
         name: 'ArrowUp',
         execute: (player) => 
         {                     
            player.imgIndex = game.DIRECTIONS.UP;
            if( game.canMoveTo(player.x, player.y - 1) )
               player.y -= 1;
         }
      },
      {
         name: 'ArrowDown',
         execute: (player) => 
         {
            player.imgIndex = game.DIRECTIONS.DOWN;
            if ( game.canMoveTo( player.x, player.y + 1) )
               player.y += 1;
         }
      },
      {
         name: 'ArrowLeft',
         execute: (player) => 
         {
            player.imgIndex = game.DIRECTIONS.LEFT;
            if( game.canMoveTo(player.x - 1, player.y) )
               player.x -= 1;
         }
      },
      {
         name: 'ArrowRight',
         execute: (player) => 
         {
            player.imgIndex = game.DIRECTIONS.RIGHT;
            if( game.canMoveTo(player.x + 1, player.y) )
               player.x += 1;
         }
      },
      { 
         name: 'ShiftArrowUp',
         execute: (player) => 
         {
            player.imgIndex = game.DIRECTIONS.UP;
            if( game.canMoveTo(player.x, player.y -2) )
               player.y -= 2;
         }
      },
      {
         name: 'ShiftArrowDown',
         execute: (player) => 
         {
            player.imgIndex = game.DIRECTIONS.DOWN;
            if( game.canMoveTo( player.x, player.y + 2) )
               player.y += 2;
         }
      },
      {
         name: 'ShiftArrowLeft',

         execute: (player) => 
         {
            player.imgIndex = game.DIRECTIONS.LEFT;
            if( game.canMoveTo (player.x - 2, player.y) )
               player.x -= 2;
         }
      },
      {
         name: 'ShiftArrowRight',
         execute: (player) => 
         {
            player.imgIndex = game.DIRECTIONS.RIGHT;
            if( game.canMoveTo(player.x + 2, player.y) )
               player.x += 2;
         }
      },
   ];

   
      return {
         getCommand: (commandName)=>       {
            return commands.filter(command => commandName === command.name)[0];
         }
      }
   }