export default class GameObject
{
    constructor({x=0,y=0,w=0,h=0,vx=0,vy=0})
    {
        this.position_x = x;
        this.position_y = y;
        this.width = w;
        this.height = h;
        this.vx = vx;
        this.vy = vy;
        this.cena = null;

        this.mx = 0;
        this.my = 0;

        this.tag = "untaged";
    }

    Update(dt, input)
    {
        
    }

    UpdatePhysics(dt)
    {

    }

    LateUpdate(dt)
    {
        
    }

    Draw(ctx)
    {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position_x - this.width/2, this.position_y - this.height/2, this.width, this.height);
        ctx.strokeStyle = "yellow";
        ctx.strokeRect(
            this.mx*this.cena.map.SIZE,
            this.my*this.cena.map.SIZE,
            this.cena.map.SIZE,
            this.cena.map.SIZE
        )
    }

    OnCollisionEnter(object)
    {

    }


    //#region ==================== PHYSICS ====================
    Move(dt)
    {
        this.position_x = this.position_x + this.vx * dt;
        this.position_y = this.position_y + this.vy * dt;

        this.mx = Math.floor(this.position_x / this.cena.map.SIZE);
        this.my = Math.floor(this.position_y / this.cena.map.SIZE);
    }

    CollideWith(outro)
    {
        return !(
            (this.position_x - this.width/2 > outro.position_x + outro.width/2) ||
            (this.position_x + this.width/2 < outro.position_x - outro.width/2) ||
            (this.position_y - this.height/2 > outro.position_y + outro.height/2) ||
            (this.position_y + this.height/2 < outro.position_y - outro.height/2)
        )
    }

    UpdateMapPhysics(dt)
    {
        this.Move(dt);

        this.RightRestrictions(this.mx + 1, this.my - 1);
        this.RightRestrictions(this.mx + 1, this.my);
        this.RightRestrictions(this.mx + 1, this.my + 1);
        this.LeftRestrictions(this.mx - 1, this.my - 1);
        this.LeftRestrictions(this.mx - 1, this.my);
        this.LeftRestrictions(this.mx - 1, this.my + 1);
        this.DownRestrictions(this.mx - 1, this.my + 1);
        this.DownRestrictions(this.mx, this.my + 1);
        this.DownRestrictions(this.mx + 1, this.my + 1);
        this.UpRestrictions(this.mx - 1, this.my - 1);
        this.UpRestrictions(this.mx, this.my - 1);
        this.UpRestrictions(this.mx + 1, this.my - 1);
    }

    RightRestrictions(pmx, pmy)
    {
        if(this.vx > 0)
        {
            const SIZE = this.cena.map.SIZE;
            if(this.cena.map.tiles[pmy][pmx]!=0)
            {
                const tile = {x:pmx*SIZE+SIZE/2, y:pmy*SIZE+SIZE/2, w:SIZE, h:SIZE};
                if(this.CollideWith(tile))
                {
                    this.cena.assets.play("collide_wall");
                    this.vx = -this.vx;
                    this.position_x = tile.x - tile.w/2 - this.width/2 - 1;
                }
            }
        }
    }

    LeftRestrictions(pmx, pmy)
    {
        if(this.vx < 0)
        {
            const SIZE = this.cena.map.SIZE;
            if(this.cena.map.tiles[pmy][pmx]!=0)
            {
                const tile = {x:pmx*SIZE+SIZE/2, y:pmy*SIZE+SIZE/2, w:SIZE, h:SIZE};
                if(this.CollideWith(tile))
                {
                    this.cena.assets.play("collide_wall");
                    this.vx = -this.vx;
                    this.position_x = tile.x + tile.w/2 + this.width/2 + 1;
                }
            }
        }
    }

    DownRestrictions(pmx, pmy)
    {
        if(this.vy > 0)
        {
            const SIZE = this.cena.map.SIZE;
            if(this.cena.map.tiles[pmy][pmx]!=0)
            {
                const tile = {x:pmx*SIZE+SIZE/2, y:pmy*SIZE+SIZE/2, w:SIZE, h:SIZE};
                if(this.CollideWith(tile))
                {
                    this.cena.assets.play("collide_wall");
                    this.vy = -this.vy;
                    this.position_y = tile.y - tile.h/2 - this.height/2 - 1;
                }
            }
        }
    }

    UpRestrictions(pmx, pmy)
    {
        if(this.vy < 0)
        {
            const SIZE = this.cena.map.SIZE;
            if(this.cena.map.tiles[pmy][pmx]!=0)
            {
                const tile = {x:pmx*SIZE+SIZE/2, y:pmy*SIZE+SIZE/2, w:SIZE, h:SIZE};
                if(this.CollideWith(tile))
                {
                    this.cena.assets.play("collide_wall");
                    this.vy = -this.vy;
                    this.position_y = tile.y + tile.h/2 + this.height/2 + 1;
                }
            }
        }
    }
    //#endregion
}