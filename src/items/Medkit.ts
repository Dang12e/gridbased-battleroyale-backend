import { Client } from "colyseus";
import { GameMap } from "../roomdata/GameMap.js";
import { MyRoomState } from "../rooms/schema/MyRoomState.js";
import { DefaultPlayerStats, PlayerState } from "../rooms/schema/PlayerState.js";
import { BaseItemLogic } from "./BaseItemLogic.js";
import { DLEventEnum } from "../Enums/DLEventEnum.js";
import { StatsEnum } from "../Enums/StatsEnum.js";
import { DurabilityHandler } from "../objects/DurabilityHandler.js";
import { InventoryEnum } from "../Enums/InventoryEnum.js";
import { ItemState } from "../rooms/schema/ItemState.js";
import { BlackBoard } from "../roomdata/BlackBoard.js";
import { Player } from "../objects/Player.js";
import { Playerdata } from "../roomdata/Playerdata.js";

export class Medkit extends BaseItemLogic<number>
{
    public onBroken(playerdata: Player): void {
        
    }
    public use(client: Client, blackBoard: BlackBoard, payload: number): void {
        const playerdata=blackBoard.playersdata.get(client.sessionId);
        const player=playerdata.playerstate;
        const item=blackBoard.playersdata.get(client.sessionId).getInventory()[payload];
        DurabilityHandler.handleItemDub(item,playerdata,payload);
        let temp= player.hp+this.healValue;
        const maxHp=DefaultPlayerStats.stats[StatsEnum.maxHp];
        if(temp>maxHp) temp=maxHp;
        player.hp=temp;
    }
    
    public onEquip(playerdata: Player, blackBoard:BlackBoard, index: InventoryEnum, item: ItemState): void {
        this.toInventory(item,playerdata,index,blackBoard);
    }
    public onDrop(playerdata:Player,blackBoard:BlackBoard, index: InventoryEnum): void {
        this.drop(index,playerdata,blackBoard);
    }
    
   

    constructor(public healValue:number,id:string,durabilityCost:number,maxDurability:number,dllossevent:DLEventEnum,category:string)
        {
          super(id,durabilityCost,maxDurability,dllossevent,category);
        }

     
        
    
    

    
}