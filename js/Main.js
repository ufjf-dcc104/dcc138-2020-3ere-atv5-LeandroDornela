import AssetManager from "./AssetManager.js";
import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Mixer from "./Mixer.js";
import Sprite from "./Sprite.js";
import modeloMapa1 from "../maps/map1.js";
import InputManager from "./InputManager.js";
import Game from "./Game.js";
import LoadingScene from "./LoadingScene.js";

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

const mapa1 = new Mapa(24, 32, 32);
const loadingScene = new LoadingScene(canvas, assets);
const cena1 = new Cena(canvas, assets);
const pc = new Sprite({x:50,y:50,w:16,h:16,color:"white"});

const game = new Game(canvas, assets, input);
game.adicionarCena("loading", loadingScene);
game.adicionarCena("jogo", cena1);

const SPAWN_INTERVAL = 4;
let spawnTimer = 0;


document.addEventListener("keydown", (e)=>{
    switch(e.key)
    {
        case "s":
            break;
        case "d":
            break;
        case "c":
            assets.play("collide");
            break;
    }
})

Start();
idAnim = requestAnimationFrame((t) => {Update(t);});


function Start()
{
    mapa1.carregaMapa(modeloMapa1);
    
    //cena1.Start();
    game.iniciar();

    cena1.ConfigMap(mapa1);
    cena1.AddObject(pc);
    assets.carregaImagem("orc", "assets/orc.png");
    assets.carregaImagem("rocks", "assets/rocks.png");
    assets.carregaImagem("lava", "assets/lava.png");
    assets.carregaAudio("collide", "assets/collide.wav");
    assets.carregaAudio("collide_wall", "assets/collide_wall.wav");

    input.configurarTeclado({
        ArrowLeft:"ESQUERDA",
        ArrowRight:"DIREITA",
        ArrowUp:"CIMA",
        ArrowDown:"BAIXO",
    })

    pc.controlar = function(dt)
    {
        if(input.comandos.get("ESQUERDA"))
        {
            this.vx = -50;
        }
        else if(input.comandos.get("DIREITA"))
        {
            this.vx = 50;
        }
        else
        {
            this.vx = 0;
        }

        if(input.comandos.get("CIMA"))
        {
            this.vy = -50;
        }
        else if(input.comandos.get("BAIXO"))
        {
            this.vy = 50;
        }
        else
        {
            this.vy = 0;
        }
    }

    SpawnEnemies(RandomRangeInt(5, 20), 32, "red", 20);
}


function Update(t)
{
    if(spawnTimer >= SPAWN_INTERVAL)
    {
        spawnTimer = 0;

        AddNewRandomEnemy(32, "yellow", 50);
    }
    else
    {
        spawnTimer += dt;
    }


    t0 = t0 ?? t;
    dt = (t - t0) / 1000;

    game.cena.Update(dt);
    game.cena.UpdatePhysics();
    game.cena.LateUpdate();
    game.cena.Draw();

    idAnim = requestAnimationFrame((t) => {Update(t);});

    t0 = t;
}


function Stop()
{
    cancelAnimationFrame(idAnim);
    t0 = null;
    dt = 0;
}


function SpawnEnemies(numEnemies, enemySize, enemyColor, enemySpeed)
{
    for (let i = 0; i < numEnemies; i++)
    {
        AddNewRandomEnemy(enemySize, enemyColor, enemySpeed);
    }
}


function RandomRangeInt(from, to)
{
    return (Math.floor(Math.random() * (to - from) ) + from);
}

function AddNewRandomEnemy(enemySize, enemyColor, enemySpeed)
{
    let id = RandomRangeInt(0, mapa1.freePositions.length);
        const newEn = new Sprite({
            x:mapa1.freePositions[id].c * 32 + 32/2,
            y:mapa1.freePositions[id].l * 32 + 32/2,
            w:enemySize,
            h:enemySize,
            color:enemyColor,
            vx:enemySpeed * Math.random() * RandomRangeInt(-1,2),
            vy:enemySpeed * Math.random() * RandomRangeInt(-1,2)
        });
        mapa1.freePositions.splice(id, 1);
        cena1.AddObject(newEn);
}

/*
function perseguePC(dt)
{
    this.vx = 50 * Math.sign(pc.x - this.x);
    this.vy = 50 * Math.sign(pc.y - this.y);
}
*/