import GameObject from "./GameObject.js";

export default class Player extends GameObject
{
    Update(dt, input)
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

    OnCollision(object)
    {
        if(object.tag == "enemy")
        {
            this.cena.assets.play("collide");
        }
    }

    OnMapCollision()
    {
        this.cena.assets.play("collide_wall");
    }
}