export default class Mapa
{
    constructor(lines=8, columns=12, size=32)
    {
        this.LINES = lines;
        this.COLUMNS = columns;
        this.SIZE = size;
        this.tiles = [];
        this.freePositions = [];
        this.walls = [];
        this.cena = null;

        for (let l = 0; l < this.LINES; l++) {
            this.tiles[l] = [];
            for (let c = 0; c < this.COLUMNS; c++) {
                this.tiles[l][c] = 0;      
            }
        }
        
    }

    Draw(ctx)
    {
        if(!this.cena) return;

        for (let l = 0; l < this.LINES; l++) {
            //this.tiles[l] = [];
            for (let c = 0; c < this.COLUMNS; c++) {
                switch(this.tiles[l][c])
                {
                    case 1:
                        ctx.drawImage(this.cena.assets.img("wall"), c*this.SIZE, l*this.SIZE, this.SIZE, this.SIZE);
                        break;
                    case 2:
                        // player
                        ctx.drawImage(this.cena.assets.img("ground"), c*this.SIZE, l*this.SIZE, this.SIZE, this.SIZE);
                        break;
                    case 3:
                        // coin
                        ctx.drawImage(this.cena.assets.img("ground"), c*this.SIZE, l*this.SIZE, this.SIZE, this.SIZE);
                        break;
                    case 4:
                        // door
                        ctx.drawImage(this.cena.assets.img("ground"), c*this.SIZE, l*this.SIZE, this.SIZE, this.SIZE);
                        break;
                    default:
                        ctx.drawImage(this.cena.assets.img("ground"), c*this.SIZE, l*this.SIZE, this.SIZE, this.SIZE);
                }  
            }
        }
    }

    LoadMap(modelo, cena)
    {
        this.cena = cena;
        this.LINES = modelo.length;
        this.COLUMNS = modelo[0]?.length ?? 0;
        this.tiles = [];
        for (let l = 0; l < this.LINES; l++) {
            this.tiles[l] = [];
            for (let c = 0; c < this.COLUMNS; c++) {
                this.tiles[l][c] = modelo[l][c];
                if(this.tiles[l][c] == 0)
                {
                    this.freePositions.push({l,c});
                }
                else if(this.tiles[l][c] == 1)
                {
                    this.walls.push({l,c});
                }
                else if(this.tiles[l][c] == 2)
                {
                    this.cena.MapPositionID(2, l, c);
                }
                else if(this.tiles[l][c] == 3)
                {
                    this.cena.MapPositionID(3, l, c);
                }
                else if(this.tiles[l][c] == 4)
                {
                    this.cena.MapPositionID(4, l, c);
                }
            }
        }
    }
}