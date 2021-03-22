import Cena from "./Cena.js";
import Sprite from "./Sprite.js";

const canvas = document.querySelector("canvas");
const cena1 = new Cena(canvas);

cena1.desenhar();

const pc = new Sprite({x:0,y:0,w:32,h:32,color:"blue"});
const en1 = new Sprite({x:100,y:100,w:32,h:32,color:"red"});

cena1.adicionar(pc);
cena1.adicionar(en1);

cena1.quadro(0);