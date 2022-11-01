

export default function createClientNetDecorator(game)
{

   const clientNetDecor = {    game:game,
   
      setState: game.setState,
      getState: game.getState,
      addPlayer: game.addPlayer,
      removePlayer: game.removePlayer,
      handleCommand: game.handleCommand,
      handleCredentials: game.handleCredentials,
   }

   //------------------------------------------------------------------------
   clientNetDecor.connect = function ()
   {
      console.log("connecting");
      const socket = io();
      console.log("connected");

      if (socket)
      {
         clientNetDecor.socket = socket;

         socket.on('setup', game.setState);

         socket.on('refresh', state => {
            const id = game.getState().getCurrentPlayerId();
            game.setState(state);
            game.getState().setCurrentPlayerId(id);
         });
      }
   }

   //------------------------------------------------------------------------
   clientNetDecor.send = function (eventName, ...data)
   {
      clientNetDecor.socket.emit(eventName, ...data)
   }

   //------------------------------------------------------------------------
   return  clientNetDecor;
}