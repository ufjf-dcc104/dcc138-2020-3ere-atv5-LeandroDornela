import GameObject from "./GameObject.js";

export default class Enemy extends GameObject
{
    column = 0;
    frames = 2;
    samples = 4;

    Draw(ctx, dt)
    {
        this.column = (this.column >= this.frames - 1) ? 0 : this.column + this.samples * dt; 

        if(this.vx != 0 || this.vy != 0)
        {
            ctx.drawImage(this.cena.assets.img("enemy_walk"),
            Math.round(this.column)*this.width, 0, this.width, this.height,
            this.position_x - this.width/2, this.position_y - this.height/2, this.width, this.height);
        }
        else
        {
            ctx.drawImage(this.cena.assets.img("enemy_idle"),
            Math.round(this.column)*this.width, 0, this.width, this.height,
            this.position_x - this.width/2, this.position_y - this.height/2, this.width, this.height);
        }
    }

    OnMapCollision()
    {
        this.vx = 30*Math.random() * this.RandomRangeInt(-1,2);
        this.vy = 30*Math.random() * this.RandomRangeInt(-1,2);
    }

    RandomRangeInt(from, to)
    {
        return (Math.floor(Math.random() * (to - from) ) + from);
    }
}