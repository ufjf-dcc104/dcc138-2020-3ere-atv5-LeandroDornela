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

input.configurarTeclado({
    ArrowLeft:"ESQUERDA",
    ArrowRight:"DIREITA",
    ArrowUp:"CIMA",
    ArrowDown:"BAIXO",
})



const pc = new Sprite({x:100,y:100,w:32,h:32,color:"blue"});
//const en1 = new Sprite({x:320,y:200,w:32,h:32,color:"red"});
//const en2 = new Sprite({x:320,y:100,w:32,h:32,color:"red"});

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

function perseguePC(dt)
{
    this.vx = 50 * Math.sign(pc.x - this.x);
    this.vy = 50 * Math.sign(pc.y - this.y);
}

mapa1.carregaMapa(modeloMapa1);
cena1.configuraMapa(mapa1);

assets.carregaImagem("orc", "assets/orc.png");
assets.carregaAudio("coin", "assets/coin.wav")

SpawnEnemies(RandomRange(5, 20));

cena1.adicionar(pc);
//cena1.adicionar(en1);
//cena1.adicionar(en2);

//en1.controlar = perseguePC;

cena1.iniciar();

cena1.desenhar();


document.addEventListener("keydown", (e)=>{
    switch(e.key)
    {
        case "s":
            cena1.iniciar();
            break;
        case "d":
            cena1.parar();
            break;
        case "c":
            assets.play("coin");
            break;
    }
})

function SpawnEnemies(numEnemies)
{
    for (let i = 0; i < numEnemies; i++)
    {
        let id = RandomRange(0, mapa1.freePositions.length);
        const newEn = new Sprite({
            x:mapa1.freePositions[id].c * 32 + 32/2,
            y:mapa1.freePositions[id].l * 32 + 32/2,
            w:32,
            h:32,
            color:"red"});

        cena1.adicionar(newEn);
    }
}

function RandomRange(a, b)
{
    return (Math.floor(Math.random() * b) + a);
}