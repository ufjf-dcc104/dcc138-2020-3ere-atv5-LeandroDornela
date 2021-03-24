import Cena from "./Cena.js";

export default class Level1 extends Cena
{
    OnCollide(a, b)
    {
        if(!this.aRemover.includes(a))
        {
            this.assets.play("collide");
            this.aRemover.push(a);
        }
        if(!this.aRemover.includes(b))
        {
            this.aRemover.push(b);
        }

        if(a.tag == "player" && b.tag == "enemy")
        {
            console.log("game over");
            this.game.selecionaCena("end");
        }
    }
}