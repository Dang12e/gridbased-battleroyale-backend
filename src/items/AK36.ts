import { Client } from "colyseus";
import { Target } from "../commands/AttackCommand.js";
import { GameMap } from "../roomdata/GameMap.js";
import { MyRoomState } from "../rooms/schema/MyRoomState.js";
import { PlayerState } from "../rooms/schema/PlayerState.js";
import { BaseItemLogic } from "./BaseItemLogic.js";
import { IWeapon } from "./IWeapon.js";
import { DurabilityHandler } from "../objects/DurabilityHandler.js";
import { DLEventEnum } from "../Enums/DLEventEnum.js";
import { InventoryEnum } from "../Enums/InventoryEnum.js";
import { ItemState } from "../rooms/schema/ItemState.js";
import { BlackBoard } from "../roomdata/BlackBoard.js";
import { Player } from "../objects/Player.js";



export class AK36 extends BaseItemLogic<Target> implements IWeapon
{
    public onBroken(playerdata: Player): void {
     
    }
    public use(client: Client, blackBoard: BlackBoard, payload: Target): void {
        console.log(`target ${payload.x}, ${payload.y}`);
        const target = payload;
        const cell = blackBoard.map.getCell(target.x, target.y);
        if(!cell)
        {
            client.send("target invalid");
            return;
        }
        console.log("attack "+cell+" at id: "+ cell.player_id);
        if(cell.player_id)
        {
            const player=blackBoard.players.get(cell.player_id);
            player.hp-=this.damage*this.numberOfHit;
            const target_client=blackBoard.clientMap.get(cell.player_id);
            target_client?.send("gunshot",player);
            DurabilityHandler.handleDurability(DLEventEnum.onHit,blackBoard.playersdata.get(player.sessionId));
        }
        client.send("gun shot");
    }
    public onDrop(playerdata:Player,blackBoard:BlackBoard , index: InventoryEnum): void {
        this.drop(index,playerdata,blackBoard);
        this.unsubEvent(playerdata.getDlEvents());
    }
    
    
    
    
    constructor(id:string,durabilityCost:number,maxDurability:number,dllossevent:DLEventEnum,category:string,
        range: number,
    diagonalAttack: boolean,
    damage: number,
    numberOfHit: number,
    )
    {
        super(id,durabilityCost,maxDurability,dllossevent,category);
        this.range=range;
        this.diagonalAttack=diagonalAttack;
        this.damage=damage
        this.numberOfHit=numberOfHit;
    }
    range: number;
    diagonalAttack: boolean;
    damage: number;
    numberOfHit: number;

    
   
    
   
    

    
    

    public onEquip(playerdata:Player,blackBoard:BlackBoard,index:InventoryEnum,item:ItemState): void {
        this.toInventory(item,playerdata,index,blackBoard);
      this.subEvent(playerdata.getDlEvents(),InventoryEnum.weapon);
    }

    

   
   
    



}

