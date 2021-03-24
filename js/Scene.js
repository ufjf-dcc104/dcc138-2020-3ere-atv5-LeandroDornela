export default class Scene
{
    constructor(canvas, assets = null)
    {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.objects = [];
        this.aRemover = [];
        this.assets = assets;
        this.map = null;
        this.game = null;
    }

    Start()
    {
        console.log("Scene Start.");
    }

    Update(dt, input)
    {
        if(this.assets.acabou())
        {
            for (const sprite of this.objects)
            {
                sprite.Update(dt, input);
            }
        }
    }

    UpdatePhysics(dt)
    {
        // Verifica as colisões
        for (let a = 0; a < this.objects.length - 1; a++)
        {
            const object_a = this.objects[a];

            for (let b = a+1; b < this.objects.length; b++)
            {
                const object_b = this.objects[b];
                if(object_a.CollideWith(object_b))
                {
                    //this.OnCollide(object_a, object_b);
                    object_a.OnCollision(object_b);
                }
            }
        }

        // Atualiza colisões com o mapa e fisica
        for (let i = 0; i < this.objects.length; i++)
        {
            this.objects[i].UpdatePhysics(dt);
            this.objects[i].UpdateMapPhysics(dt);
        }
    }

    LateUpdate(dt)
    {
        for (const alvo of this.aRemover) {
            const idx = this.objects.indexOf(alvo);
            if(idx >= 0)
            {
                this.objects.splice(idx, 1);
            }
        }

        this.aRemover = [];

        for (let i = 0; i < this.objects.length; i++)
        {
            this.objects[i].LateUpdate(dt);
        }
    }

    Draw()
    {
        this.ctx.fillStyle = "grey";
        this.ctx.fillRect(0,0,this.canvas.width, this.canvas.height);

        this.map?.Draw(this.ctx);

        if(this.assets.acabou())
        {
            for (let s = 0; s < this.objects.length; s++) {
                const sprite = this.objects[s];
                sprite.Draw(this.ctx);
            }
        }

        //this.ctx.fillStyle = "yellow";
        //this.ctx.fillText(this.assets?.progresso(), 10, 20);
    }

    AddObject(sprite)
    {
        sprite.cena = this;
        this.objects.push(sprite);
    }

    Stop()
    {

    }


    /*
    OnCollide(a, b)
    {
        if(!this.aRemover.includes(a))
        {
            this.
            this.aRemover.push(a);
        }
        if(!this.aRemover.includes(b))
        {
            this.aRemover.push(b);
        }
    }
    */
}