export default class Cena
{
    constructor(canvas, assets = null)
    {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.sprites = [];
        this.aRemover = [];
        this.assets = assets;
        this.mapa = null;
    }

    Start()
    {
        
    }

    Update(dt)
    {
        if(this.assets.acabou)
        {
            for (const sprite of this.sprites) {
                sprite.passo(dt);
            }
        }
    }

    UpdatePhysics()
    {
        for (let a = 0; a < this.sprites.length - 1; a++) {
            const spriteA = this.sprites[a];
            for (let b = a+1; b < this.sprites.length; b++) {
                const spriteB = this.sprites[b];
                if(spriteA.colidiuCom(spriteB))
                {
                    this.OnCollide(spriteA, spriteB);
                }
            }
        }
    }

    LateUpdate()
    {
        for (const alvo of this.aRemover) {
            const idx = this.sprites.indexOf(alvo);
            if(idx >= 0)
            {
                this.sprites.splice(idx, 1);
            }
        }

        this.aRemover = [];
    }

    Draw()
    {
        this.ctx.fillStyle = "grey";
        this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);

        this.mapa?.desenhar(this.ctx);

        if(this.assets.acabou())
        {
            for (let s = 0; s < this.sprites.length; s++) {
                const sprite = this.sprites[s];
                sprite.desenhar(this.ctx);
            }
        }

        this.ctx.fillStyle = "yellow";
        this.ctx.fillText(this.assets?.progresso(), 10, 20);
    }

    AddObject(sprite)
    {
        sprite.cena = this;
        this.sprites.push(sprite);
    }


    OnCollide(a, b)
    {
        if(!this.aRemover.includes(a))
        {
            this.assets.play("collide");
            console.log("collision");
            this.aRemover.push(a);
        }
        if(!this.aRemover.includes(b))
        {
            this.aRemover.push(b);
        }
    }

    ConfigMap(mapa)
    {
        this.mapa = mapa;
        this.mapa.cena = this;
    }
}