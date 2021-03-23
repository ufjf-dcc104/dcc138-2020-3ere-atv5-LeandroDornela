import AssetManager from "./AssetManager.js";
import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import Mixer from "./Mixer.js";
import Sprite from "./Sprite.js";

const mixer = new Mixer(10);
const assets = new AssetManager(mixer);
const canvas = document.querySelector("canvas");
canvas.width = 16*32;
canvas.height = 9*32;
const cena1 = new Cena(canvas, assets);
const mapa1 = new Mapa();

const pc = new Sprite({x:0,y:100,w:32,h:32,color:"blue",vx:10});
const en1 = new Sprite({x:100,y:100,w:32,h:32,color:"red"});

cena1.configuraMapa(mapa1);
assets.carregaImagem("orc", "assets/orc.png");
assets.carregaAudio("coin", "assets/coin.wav")

cena1.adicionar(pc);
cena1.adicionar(en1);

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