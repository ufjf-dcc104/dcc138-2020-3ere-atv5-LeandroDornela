export default class Mapa
{
    constructor(lines=8, columns=12, size=32)
    {
        this.LINES = lines;
        this.COLUMNS = columns;
        this.SIZE = size;
        this.tiles = [];

        for (let l = 0; l < this.LINES; l++) {
            this.tiles[l] = [];
            for (let c = 0; c < this.COLUMNS; c++) {
                this.tiles[l][c] = 0;      
            }
        }
        this.cena = null;
    }

    desenhar(ctx)
    {
        for (let l = 0; l < this.LINES; l++) {
            //this.tiles[l] = [];
            for (let c = 0; c < this.COLUMNS; c++) {
                switch(this.tiles[l][c])
                {
                    case 1:
                        ctx.fillStyle = "white";
                        ctx.fillRect(c*this.SIZE, l*this.SIZE, this.SIZE, this.SIZE);
                        ctx.lineWidth = 1;
                        ctx.strokeStyle = "green";
                        ctx.strokeRect(c*this.SIZE, l*this.SIZE, this.SIZE, this.SIZE);
                        break;
                        default:
                        ctx.fillStyle = "black";
                        ctx.fillRect(c*this.SIZE, l*this.SIZE, this.SIZE, this.SIZE);
                        ctx.lineWidth = 1;
                        ctx.strokeStyle = "grey";
                        ctx.strokeRect(c*this.SIZE, l*this.SIZE, this.SIZE, this.SIZE);
                        break;
                }      
            }
        }
    }

    carregaMapa(modelo)
    {
        this.LINES = modelo.length;
        this.COLUMNS = modelo[0]?.length ?? 0;
        this.tiles = [];
        for (let l = 0; l < this.LINES; l++) {
            this.tiles[l] = [];
            for (let c = 0; c < this.COLUMNS; c++) {
                this.tiles[l][c] = modelo[l][c];
            }
        }
    }
}