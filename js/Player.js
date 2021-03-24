import GameObject from "./GameObject.js";

export default class Player extends GameObject
{
    column = 0;
    frames = 2;
    samples = 4;
    
    Update(dt, input)
    {
        if(input.comandos.get("ESQUERDA"))
        {
            this.vx = -50;
            this.walking_x = true;
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

    Draw(ctx, dt)
    {
        this.column = (this.column >= this.frames - 1) ? 0 : this.column + this.samples * dt; 

        if(this.vx != 0 || this.vy != 0)
        {
            ctx.drawImage(this.cena.assets.img("player_walk"),
            Math.round(this.column)*this.width, 0, this.width, this.height,
            this.position_x - this.width/2, this.position_y - this.height/2, this.width, this.height);
        }
        else
        {
            ctx.drawImage(this.cena.assets.img("player_idle"),
            Math.round(this.column)*this.width, 0, this.width, this.height,
            this.position_x - this.width/2, this.position_y - this.height/2, this.width, this.height);
        }
    }

    OnCollision(object)
    {
        if(object.tag == "enemy")
        {
            this.cena.assets.play("collide");
            this.cena.game.SelectScene("end");
        }

        if(object.tag == "coin")
        {
            this.cena.assets.play("coin");
            this.cena.game.AddCoin();

            if(!this.cena.aRemover.includes(object))
            {
                this.cena.aRemover.push(object);
            }
        }

        if(object.tag == "door")
        {
            this.cene.game.SelectScene(object.nextScene);
        }
    }

    OnMapCollision()
    {
        this.cena.assets.play("collide_wall");
    }
}