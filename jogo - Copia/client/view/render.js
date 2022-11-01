
export default function createRender(game, canvas)
{
   const board = game.state.board;

   const state = {
      playerImages: [],
      otherPlayerImages: [],
      contentImages: [],
      IMAGE_SIZE: { width: canvas.width / board.width, height: canvas.height / board.height },
      width: canvas.width,
      height: canvas.height,
   }

   
   //--------------------------------------------------------------------------------------------------
   function loadImages(state)
   {
      const image = new Image();
      image.src =  `./view/img/bloco.jpg`;
      state.contentImages.push(image);

      ['fruit_01', 'fruit_02', 'fruit_03', 'fruit_04', 'fruit_05'].forEach(fileName =>
      {
         const image = new Image();
         image.src = `./view/img/${fileName}.png`;

         state.contentImages.push(image);
      });

      Object.entries(game.DIRECTIONS).forEach(([key, value]) => 
      {
         const image = new Image();
         image.src = `./view/img/player_${key}.png`;
         
         state.playerImages.push(image);
      });

      Object.entries(game.DIRECTIONS).forEach(([key, value]) => 
      {
         const image = new Image();
         image.src = `./view/img/other_player_${key}.png`;

         state.otherPlayerImages.push(image);
      });
   }
   loadImages(state);

   //----------------------------------------------------------------------------------------
   function renderScreen(context, gameState, state, flag) 
   {      
      context.clearRect(0, 0, state.width, state.height);      

      flag=!flag;
      const board = gameState.board;
      for(let x=0; x < board.width; x++)
      {
         for(let y=0; y < board.height; y++)
         {
            const content = board.cell[x][y];
            if(content)
            {
               const image = state.contentImages[content.imgIndex];
               const posX = x * state.IMAGE_SIZE.width;
               const posY = y * state.IMAGE_SIZE.height;
               context.drawImage(image, posX, posY, state.IMAGE_SIZE.width, state.IMAGE_SIZE.height);                     
            }
         }
      }

      for(let player of gameState.players)
      {
         const image = ( player.id == gameState.currentPlayer.id ) ? 
                           state.playerImages[player.imgIndex]
                        :  state.otherPlayerImages[player.imgIndex];

         const posX = player.x * state.IMAGE_SIZE.width;
         const posY = player.y * state.IMAGE_SIZE.height;
         context.drawImage(image, posX, posY, state.IMAGE_SIZE.width, state.IMAGE_SIZE.height);
      }

      requestAnimationFrame(()=>renderScreen(context, gameState, state, flag));
   }

   const context = canvas.getContext("2d");
   renderScreen(context, game.state, state, false);

   return {

   }
}
