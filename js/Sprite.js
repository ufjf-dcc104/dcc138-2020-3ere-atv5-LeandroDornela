export default class Sprite
{
    constructor({x=0,y=0,w=0,h=0,color="black",vx=0,vy=0})
    {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color;

        this.vx = vx;
        this.vy = vy;
    }

    desenhar(ctx)
    {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    }

    passo(dt)
    {
        this.x = this.x + this.vx * dt;
        this.y = this.y + this.vy * dt;
    }

    colidiuCom(outro)
    {
        return !(
            (this.x > outro.x + outro.w) ||
            (this.x + this.w < outro.x) ||
            (this.y > outro.y + outro.h) ||
            (this.y + this.h < outro.y)
        )
    }
}