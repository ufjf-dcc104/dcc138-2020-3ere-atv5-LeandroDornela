import AssetManager from "./AssetManager.js";
import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Mixer from "./Mixer.js";
import Sprite from "./Sprite.js";
import modeloMapa1 from "../maps/map1.js";
import InputManager from "./InputManager.js";

const input = new InputManager();
const mixer = new Mixer(10);
const assets = new AssetManager(mixer);
const canvas = document.querySelector("canvas");
canvas.width = 32*32;
canvas.height = 24*32;
const mapa1 = new Mapa(24, 32, 32);
const cena1 = new Cena(canvas, assets);
const SPAWN_INTERVAL = 4;
let spawnTimer = 0;
let t0 = 0;
let dt = 0;
let idAnim = null;
const pc = new Sprite({x:48,y:48,w:32,h:32,color:"green"});

document.addEventListener("keydown", (e)=>{
    switch(e.key)
    {
        case "s":
            break;
        case "d":
            break;
        case "c":
            assets.play("coin");
            break;
    }
})

Start();
idAnim = requestAnimationFrame((t) => {Update(t);});

function Start()
{
    mapa1.carregaMapa(modeloMapa1);
    cena1.configuraMapa(mapa1);
    cena1.adicionar(pc);
    assets.carregaImagem("orc", "assets/orc.png");
    assets.carregaAudio("coin", "assets/coin.wav");

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

    SpawnEnemies(RandomRangeInt(50, 100), 32, "red", 20);

    //cena1.desenhar();
}


function Update(t)
{
    t0 = t0 ?? t;
    dt = (t - t0) / 1000;

    cena1.passo(dt);
    cena1.checaColisao();
    cena1.removerSprites();
    cena1.desenhar();

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
        cena1.adicionar(newEn);
    }
}


function RandomRangeInt(from, to)
{
    return (Math.floor(Math.random() * (to - from) ) + from);
}

/*
function perseguePC(dt)
{
    this.vx = 50 * Math.sign(pc.x - this.x);
    this.vy = 50 * Math.sign(pc.y - this.y);
}
*/