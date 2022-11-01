export default function createEventListenerManager()
{
   const manager = {
      map: new Map(),
   }

   //----------------------------------------------------------------
   manager.addEventListener = function(eventName, fnListener)
   {
      const map = manager.map;
      if(!map.has(eventName))
         map.set(eventName, []);
      
      map.get(eventName).push(fnListener);
   }

   //----------------------------------------------------------------
   manager.removeEventListener = function(eventName, fnListener)
   {
      const array = manager.map.get(eventName);

      const index = array.indexOf(fnListener);
      if(index >=0)
         manager.map.set(eventName, array.slice(index, 1));
   }

   //----------------------------------------------------------------
   manager.dispatchWithData = function (eventName, ...data)
   {
      const array = manager.map.get(eventName);
      if(array)
         array.forEach(fnListener => fnListener(...data));
   }

   //----------------------------------------------------------------
   manager.dispatchWithoutData = function (eventName)
   {
      const array = manager.map.get(eventName);
      array.forEach(fnListener => fnListener);
   }

   //----------------------------------------------------------------
   return manager;
}