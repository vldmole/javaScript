
import createRender from "./render.js";

export default function createWebViewCtrl(state, document)
{
   const nickName   = document.getElementById('gamerName');
   const bConnect   = document.getElementById('bConnect');
   const canvas     = document.getElementById('gameScreen');
   const gamersList = document.getElementById('gamersList');
   
   const webView = {
      nickName: nickName,
      bConnect: bConnect,
      canvas: canvas,
      gamersList: gamersList,
      render: createRender(state, canvas, gamersList), 
      getNickName: () => webView.nickName.value,
      setConnectButtonAction: (fn) => bConnect.onclick = fn,
   }

   return webView;
}