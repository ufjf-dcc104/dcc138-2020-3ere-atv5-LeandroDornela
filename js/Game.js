import LoadingScene from "./LoadingScene.js";
import EndScene from "./EndScene.js";
import Level1 from "./Level1.js";

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


    Start()
    {
        // Scenes
        let loadingScene = new LoadingScene(this.canvas, this.assets);
        this.AddScene("loading", loadingScene);
        let cena1 = new Level1(this.canvas, this.assets);
        this.AddScene("jogo", cena1);
        let endScene = new EndScene(this.canvas, this.assets);
        this.AddScene("end", endScene);


        // Assets
        this.assets.carregaImagem("orc", "assets/orc.png");
        this.assets.carregaImagem("rocks", "assets/rocks.png");
        this.assets.carregaImagem("lava", "assets/lava.png");
        this.assets.carregaAudio("collide", "assets/collide.wav");
        this.assets.carregaAudio("collide_wall", "assets/collide_wall.wav");

        // Input
        this.input.configurarTeclado({
            ArrowLeft:"ESQUERDA",
            ArrowRight:"DIREITA",
            ArrowUp:"CIMA",
            ArrowDown:"BAIXO",
            " ": "PROXIMA_CENA"
        })

        this.cena?.Start();
    }


    Stop()
    {
        this.cena?.Stop();
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
            this.cena.Start();
        }
    }
}