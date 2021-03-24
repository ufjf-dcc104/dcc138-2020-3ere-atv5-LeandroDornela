import Scene from "./Scene.js";
import modeloMapa1 from "../maps/map1.js";
import GameObject from "./GameObject.js";
import Mapa from "./Mapa.js";
import Player from "./Player.js";
import Enemy from "./Enemy.js";

export default class Level1 extends Scene
{
    constructor(canvas, assets)
    {
        super(canvas, assets);

        this.map = new Mapa(24, 32, 32);
        this.SPAWN_INTERVAL = 4;
        this.spawnTimer = 0;
        this.player = null;
    }
    

    Start()
    {
        super.Start();

        // Setup do mapa
        this.map.LoadMap(modeloMapa1, this);
        
        

        this.SpawnEnemies(this.RandomRangeInt(5, 20), 32, "red", 20);
    }

    Update(dt, input)
    {
        super.Update(dt, input);

        if(this.spawnTimer >= this.SPAWN_INTERVAL)
        {
            this.spawnTimer = 0;

            this.AddNewRandomEnemy(32, "yellow", 50);
        }
        else
        {
            this.spawnTimer += dt;
        }
    }

    MapPositionID(id, i, j)
    {
        switch(id)
        {
            case 2:
                // player
                this.player = new Player({x:i*32 + 16,y:j*32 + 16,w:32,h:32,color:"white"});
                this.player.tag = "player";
                this.AddObject(this.player);
                break;
            case 3:
                // coin
                break;
            case 4:
                // door
            break;
        }
    }

    SpawnEnemies(numEnemies, enemySize, enemyColor, enemySpeed)
    {
        for (let i = 0; i < numEnemies; i++)
        {
            this.AddNewRandomEnemy(enemySize, enemyColor, enemySpeed);
        }
    }

    AddNewRandomEnemy(enemySize, enemyColor, enemySpeed)
    {
        let id = this.RandomRangeInt(0, this.map.freePositions.length);
            const newEn = new Enemy({
                x:this.map.freePositions[id].c * 32 + 32/2,
                y:this.map.freePositions[id].l * 32 + 32/2,
                w:enemySize,
                h:enemySize,
                color:enemyColor,
                vx:enemySpeed * Math.random() * this.RandomRangeInt(-1,2),
                vy:enemySpeed * Math.random() * this.RandomRangeInt(-1,2)
            });
            this.map.freePositions.splice(id, 1);
            newEn.tag = "enemy";
            this.AddObject(newEn);
    }

    RandomRangeInt(from, to)
    {
        return (Math.floor(Math.random() * (to - from) ) + from);
    }

    /*
    OnCollide(a, b)
    {
        if(!this.aRemover.includes(a))
        {
            this.assets.play("collide");
            this.aRemover.push(a);
        }
        if(!this.aRemover.includes(b))
        {
            this.aRemover.push(b);
        }

        if(a.tag == "player" && b.tag == "enemy")
        {
            console.log("game over");
            this.game.SelecScene("end");
        }
    }
    */
}