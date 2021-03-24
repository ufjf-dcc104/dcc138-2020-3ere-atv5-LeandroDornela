export default class Game
{
    constructor(canvas, assets, input)
    {
        this.canvas = canvas;
        this.assets = assets;
        this.input = input;
        this.cenas = new Map();
        this.cena = null;
    }

    AddScene(chave, cena)
    {
        this.cenas.set(chave, cena);
        cena.game = this;
        cena.canvas = this.canvas;
        cena.assets = this.assets;
        cena.input = this.input;

        if(this.cena === null)
        {
            this.cena = cena;
        }
    }

    SelectScene(chave)
    {
        if(this.cenas.has(chave))
        {
            this.cena = this.cenas.get(chave);
        }
    }

    Start()
    {
        this.cena?.Start();
    }

    Stop()
    {
        //this.cena?.parar();
    }
}