import AssetManager from "./AssetManager.js";
import Cena from "./Cena.js";
import Mixer from "./Mixer.js";
import Sprite from "./Sprite.js";

const assets = new AssetManager();
assets.carregaImagem("orc", "assets/orc.png");
assets.carregaAudio("coin", "assets/coin.wav")

const mixer = new Mixer(10);
const canvas = document.querySelector("canvas");
const cena1 = new Cena(canvas, assets);

cena1.desenhar();

const pc = new Sprite({x:0,y:100,w:32,h:32,color:"blue",vx:10});
const en1 = new Sprite({x:100,y:100,w:32,h:32,color:"red"});

cena1.adicionar(pc);
cena1.adicionar(en1);

cena1.iniciar();

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
            mixer.play(assets.audio("coin"));
            break;
    }
})