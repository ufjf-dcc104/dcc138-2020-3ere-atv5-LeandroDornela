import Cena from "./Cena.js";

export default class LoadingScene extends Cena
{
    Update(dt)
    {
        if(this.assets.acabou())
        {
            if(this.input.comandos.get("PROXIMA_CENA"))
            {
                this.game.selecionaCena("jogo");
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
        this.ctx.fillText(this.assets?.progresso(), this.canvas.width/2, this.canvas.height - 32);

        if(this.assets.acabou())
        {
            this.ctx.fillText("Aperte espaço para continuar.", this.canvas.width/2, this.canvas.height - 8);
        }
    }
}