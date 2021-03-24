import AssetManager from "./AssetManager.js";
import Mixer from "./Mixer.js";
import InputManager from "./InputManager.js";
import Game from "./Game.js";


const TILE_WIDTH = 32;
const TILE_HEIGHT = 32;
const VIEW_WIDTH = 32*32;
const VIEW_HEIGHT = 24*32;

let t0 = 0;
let dt = 0;
let idAnim = null;

const input = new InputManager();
const mixer = new Mixer(32);
const assets = new AssetManager(mixer);

const canvas = document.querySelector("canvas");
canvas.width = VIEW_WIDTH;
canvas.height = VIEW_HEIGHT;

const game = new Game(canvas, assets, input);

Start();

function Start()
{
    game.Start();
    idAnim = requestAnimationFrame((t) => {Update(t);});
}


function Update(t)
{
    t0 = t0 ?? t;
    dt = (t - t0) / 1000;

    game.cena.Update(dt, input);
    game.cena.UpdatePhysics(dt);
    game.cena.LateUpdate(dt);
    game.cena.Draw(dt);

    idAnim = requestAnimationFrame((t) => {Update(t);});

    t0 = t;
}

function Stop()
{
    cancelAnimationFrame(idAnim);
    t0 = null;
    dt = 0;
}