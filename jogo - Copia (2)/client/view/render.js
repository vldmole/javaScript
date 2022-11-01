
export default function createRender(gameState, canvas, htmlList)
{
   const board = gameState.board;

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

      Object.entries(gameState.DIRECTIONS).forEach(([key, value]) => 
      {
         const image = new Image();
         image.src = `./view/img/player_${key}.png`;
         
         state.playerImages.push(image);
      });

      Object.entries(gameState.DIRECTIONS).forEach(([key, value]) =>
      {
         const image = new Image();
         image.src = `./view/img/other_player_${key}.png`;

         state.otherPlayerImages.push(image);
      });
   }
   loadImages(state);

   //----------------------------------------------------------------------------------------
   function renderScreen(context, gameState, state) 
   {      
      context.clearRect(0, 0, state.width, state.height);      

      renderBoard(context, gameState.board, state.contentImages, state.IMAGE_SIZE)

      renderPlayers(context, gameState.players, gameState.currentPlayerId, state)

      renderPlayersList(htmlList, gameState.players);

      requestAnimationFrame(()=>renderScreen(context, gameState, state));
   }

   const context = canvas.getContext("2d");
   renderScreen(context, gameState, state, false);

   //------------------------------------------------------------------------------------------
   function renderBoard(context, board, contentImages, imageSize)
   {
      for(let x=0; x < board.width; x++)
      {
         for(let y=0; y < board.height; y++)
         {
            const content = board.cell[x][y];
            if(content)
            {
               const image = contentImages[content.imgIndex];
               const posX = x * imageSize.width;
               const posY = y * imageSize.height;
               context.drawImage(image, posX, posY, imageSize.width, imageSize.height);                     
            }
         }
      }
   }

   //-----------------------------------------------------------------------------------------
   function renderPlayers(context, players, currentPlayerId, state)
   {
      if(players.length == 0)
         return;
      
      const otherPlayerImages = state.otherPlayerImages;
      const width = state.IMAGE_SIZE.width;
      const height = state.IMAGE_SIZE.height

      let currPlayer = null;
      for(let player of players)
      {
         if(player.id === currentPlayerId)
         {
            currPlayer = player;
         } 
         else 
         {
            const image = otherPlayerImages[player.imgIndex];      
            const posX = player.x * width;
            const posY = player.y * height;

            context.drawImage(image, posX, posY, width, height);
         }
      }    
      const image = state.playerImages[currPlayer.imgIndex];
      const posX = currPlayer.x * width;
      const posY = currPlayer.y * height;
      context.drawImage(image, posX, posY, width, height);
   }

   //-----------------------------------------------------------------------------------------
   function renderPlayersList(htmlList, players)
   {
      players.sort((playerA, playerB) => (playerB.pointSum - playerA.pointSum));

      let count=0;
      let listHml ="";
      for(let player of players)
      {
         const points = `${player.pointSum}`;
         const credentials = player.nickName.padEnd(38-points.length, '.'); 
         listHml += `<li>${credentials} ${points}</li>`;
         if(++count > 15)
            break;
      }
      htmlList.innerHTML = listHml;
    }
}
