import { Client } from "colyseus";
import { GameMap } from "../objects/GameMap.js";
import { MyRoomState } from "../rooms/schema/MyRoomState.js";
import { PlayerState } from "../rooms/schema/PlayerState.js";
import { BaseItemLogic } from "./BaseItemLogic.js";
import { DLEventEnum } from "../Enums/DLEventEnum.js";
import { StatsEnum } from "../Enums/StatsEnum.js";
import { DurabilityHandler } from "../objects/DurabilityHandler.js";
import { InventoryEnum } from "../Enums/InventoryEnum.js";

export class Medkit extends BaseItemLogic<number>
{
    public onDrop(playerstate: PlayerState, roomstate: MyRoomState, index: InventoryEnum): void {
        this.drop(index,playerstate,roomstate);
    }
    
   

    constructor(public healValue:number,id:string,durabilityCost:number,maxDurability:number,dllossevent:DLEventEnum,category:string)
        {
          super(id,durabilityCost,maxDurability,dllossevent,category);
        }

     public use(client: Client, roomstate: MyRoomState, playerstate: PlayerState, payload: number, map: GameMap, clientMap: Map<string, Client>): void {
        const item=playerstate.inventory[payload];
        DurabilityHandler.handleItemDub(item);
        let temp= playerstate.hp+this.healValue;
        const maxHp=playerstate.stats[StatsEnum.maxHp]
        if(temp>maxHp) temp=maxHp;
        playerstate.hp=temp;


    }
        
    
    public onBroken(playerstate: PlayerState): void {
        
    }
    public onEquip(playerstate: PlayerState): void {
        
    }

    
}