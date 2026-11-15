import { Client } from "colyseus";
import { DLEventEnum } from "../../Enums/DLEventEnum.js";
import { GameMap } from "../../objects/GameMap.js";
import { MyRoomState } from "../../rooms/schema/MyRoomState.js";
import { PlayerState } from "../../rooms/schema/PlayerState.js";
import { BaseItemLogic } from "../BaseItemLogic.js"
import { InventoryEnum } from "../../Enums/InventoryEnum.js";
import { ItemState } from "../../rooms/schema/ItemState.js";

export class Gear extends BaseItemLogic{
    public use(client: Client, roomstate: MyRoomState, playerstate: PlayerState, payload: any, map: GameMap, clientMap: Map<string, Client>): void {
        
    }
    public onBroken(playerstate: PlayerState): void {
        this.deleteGear(playerstate);
        this.unsubEvent(playerstate.durabilityLossEvents);
       this.unsubModifiers(playerstate);
       
    }
    public onEquip(playerstate:PlayerState,roomstate:MyRoomState,index:InventoryEnum,item:ItemState): void {
        this.toInventory(item,playerstate,index,roomstate);
        this.subEvent(playerstate.durabilityLossEvents,InventoryEnum.gear);
        this.subModifiers(playerstate);
    }
    public onDrop(playerstate: PlayerState, roomstate: MyRoomState,index:InventoryEnum): void {
       this.drop(index,playerstate,roomstate);
       this.unsubEvent(playerstate.durabilityLossEvents);
       this.unsubModifiers(playerstate);
    }

    constructor(public stats:GearStat[],id:string,durabilityCost:number,maxDurability:number,dllossevent:DLEventEnum,category:string)
    {
        super(id,durabilityCost,maxDurability,dllossevent,category);
    }

    protected unsubModifiers(playerstate:PlayerState)
    {
        const playerstat=playerstate.modifiers;
        this.stats.forEach(stat=>{
            playerstat[stat.index]=0
        })

    }
    protected subModifiers(playerstate:PlayerState)
    {
        const playerstat=playerstate.modifiers;
        this.stats.forEach(stat=>{
            playerstat[stat.index]=stat.value
        })

    }
    private deleteGear(playerstate:PlayerState)
    {
        const item=playerstate.inventory[InventoryEnum.gear];
        item.itemId="none";
        item.itemTypeId="none";
        item.category="none"
        item.durability=0;
    }
    

}
export class GearStat{
    constructor(public index:number,public value:number)
    {

    }
}