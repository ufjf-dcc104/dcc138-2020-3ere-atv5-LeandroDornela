import LoadingScene from "./LoadingScene.js";
import EndScene from "./EndScene.js";
import Level1 from "./Level1.js";
import Level2 from "./Level2.js";

export default class Game
{
    constructor(canvas, assets, input)
    {
        this.canvas = canvas;
        this.assets = assets;
        this.input = input;
        this.cenas = new Map();
        this.cena = null;

        this.points = 0;
    }


    Start()
    {
        // Scenes
        let loadingScene = new LoadingScene(this.canvas, this.assets);
        this.AddScene("loading", loadingScene);
        let level1 = new Level1(this.canvas, this.assets);
        this.AddScene("level1", level1);
        let level2 = new Level2(this.canvas, this.assets);
        this.AddScene("level2", level2);
        let endScene = new EndScene(this.canvas, this.assets);
        this.AddScene("end", endScene);


        // Assets
        this.assets.carregaImagem("ground", "assets/ground.png");
        this.assets.carregaImagem("wall", "assets/wall.png");

        this.assets.carregaImagem("player_walk", "assets/player_walk.png");
        this.assets.carregaImagem("player_idle", "assets/player_idle.png");

        this.assets.carregaImagem("enemy_idle", "assets/enemy_idle.png");
        this.assets.carregaImagem("enemy_walk", "assets/enemy_walk.png");

        this.assets.carregaImagem("coin", "assets/coin.png");
        this.assets.carregaImagem("door", "assets/door.png");

        this.assets.carregaAudio("collide", "assets/collide.wav");
        this.assets.carregaAudio("coin", "assets/coin.wav");
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

    AddCoin()
    {
        this.points++;
    }
}