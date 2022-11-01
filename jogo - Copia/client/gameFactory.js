import createRender from "./view/render.js";
import createGame from "./control/game.js";



export default 
{
   create: create
}

function create(document, canvas, cols, lines)
{
   const game = createGame(document, cols, lines);
   const render = createRender(game, canvas);
   game.render = render;
}