export default class Cena
{
    constructor(canvas)
    {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2s");
    }

    desenhar()
    {
        this.fillStyle = "grey";
        this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);
    }
}