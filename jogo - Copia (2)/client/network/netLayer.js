
export default function createNetLayer()
{
   const netLayer = {
      eventListeners: []
   }

   netLayer.connect = function ()
   {
      console.log("connecting");
      const socket = io();
      console.log("connected");

      if (socket)
      {
         netLayer.socket = socket;
         
         netLayer.eventListeners.forEach(element => {

            socket.on(element.eventName, element.fnListener);
         });
      }
   }

   netLayer.sendCommand = function (commandName, data)
   {
      this.socket.emit(commandName, data);
   }

   netLayer.addEventListener = function(eventName, fnListener)
   {
      netLayer.eventListeners.push({eventName: eventName, fnListener: fnListener});
   }

   return netLayer;
}