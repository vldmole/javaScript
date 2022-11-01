   document.write("\
      <canvas id='screen' width=600 height=600></canvas>\
      <script type='module'>\
         import gameFactory from './gameFactory.js';\
         const elmnt = document.getElementById('game');\
         const cols = elmnt.getAttribute('cols');\
         const lines = elmnt.getAttribute('lines');\
         gameFactory.create(document, document.getElementById('screen'), cols, lines);\
      <\/script>\
   ");
