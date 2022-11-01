
export default function createKeyboardCommandManager(commandSet)
{
   const commandManager = {
      listenersArray: [], 
   } 

   
   //--------------------------------------------------------------------
   commandManager.dispatchCommand = function (command)
   {
      for(let listen of this.listenersArray)
         listen(command);
   }

   //--------------------------------------------------------------------
   commandManager.addCommandListener = function (listener)
   {
      commandManager.listenersArray.push(listener);
   }
   

   //--------------------------------------------------------------------
   commandManager.reset = function()
   {
      commandManager.listenersArray = [];
   }

   //--------------------------------------------------------------------
   commandManager.keydownListener = function (event)
   {   
      let commandName = event.key; 

      if(event.shiftKey)
         commandName = `Shift${commandName}`; 

      const command = commandSet.getCommand(commandName);
      if(command)
         commandManager.dispatchCommand(command);
   }

   
   //--------------------------------------------------------------------
   return commandManager;
}
