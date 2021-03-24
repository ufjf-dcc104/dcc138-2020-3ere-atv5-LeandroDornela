import Scene from "./Scene.js";

export default class EndScene extends Scene
{
    Update(dt)
    {
        if(this.assets.acabou())
        {
            if(this.input.comandos.get("PROXIMA_CENA"))
            {
                this.game.SelectScene("jogo");
            }
        }
    }

    Draw()
    {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);

        this.ctx.font = "16px Arial";
        this.ctx.fillStyle = "white";
        this.ctx.textAlign = "center";
        this.ctx.fillText("GAME OVER", this.canvas.width/2, this.canvas.height/2);
        this.ctx.fillText(this.game.points, this.canvas.width/2, this.canvas.height/2 + 24);

        if(this.assets.acabou())
        {
            this.ctx.fillText("Aperte espaço para jogar novamente.", this.canvas.width/2, this.canvas.height - 8);
        }
        
    }
}