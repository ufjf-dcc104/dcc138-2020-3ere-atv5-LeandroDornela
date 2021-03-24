import GameObject from "./GameObject.js";

export default class Door extends GameObject
{
    nextScene = "end";

    Draw(ctx, dt)
    {
        ctx.drawImage(this.cena.assets.img("door"),
            0, 0, this.width, this.height,
            this.position_x - this.width/2, this.position_y - this.height/2, this.width, this.height);
    }
}