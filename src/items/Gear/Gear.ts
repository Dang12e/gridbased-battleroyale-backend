import { Client } from "colyseus";
import { DLEventEnum } from "../../Enums/DLEventEnum.js";
import { GameMap } from "../../roomdata/GameMap.js";
import { MyRoomState } from "../../rooms/schema/MyRoomState.js";
import { PlayerState } from "../../rooms/schema/PlayerState.js";
import { BaseItemLogic } from "../BaseItemLogic.js"
import { InventoryEnum } from "../../Enums/InventoryEnum.js";
import { ItemState } from "../../rooms/schema/ItemState.js";
import { BlackBoard } from "../../roomdata/BlackBoard.js";
import { Player } from "../../objects/Player.js";

export class Gear extends BaseItemLogic<any>{
    public onBroken(playerdata: Player): void {
        this.deleteGear(playerdata);
        this.unsubEvent(playerdata.getDlEvents());
       this.unsubModifiers(playerdata);
    }
    
    public onEquip(playerdata: Player, blackBoard:BlackBoard, index: InventoryEnum, item: ItemState): void {
        this.toInventory(item,playerdata,index,blackBoard);
        this.subEvent(playerdata.getDlEvents(),InventoryEnum.gear);
        this.subModifiers(playerdata);
    }
    public use(client: Client, blackBoard: BlackBoard, payload: any): void {
        
    }
    
    
    
    public onDrop(playerdata:Player,blackBoard:BlackBoard,index:InventoryEnum): void {
       this.drop(index,playerdata,blackBoard);
       this.unsubEvent(playerdata.getDlEvents());
       this.unsubModifiers(playerdata);
    }

    constructor(public stats:GearStat[],id:string,durabilityCost:number,maxDurability:number,dllossevent:DLEventEnum,category:string)
    {
        super(id,durabilityCost,maxDurability,dllossevent,category);
    }

    protected unsubModifiers(playerdata:Player)
    {
        const playerstat=playerdata.getModifiers();
        this.stats.forEach(stat=>{
            playerstat[stat.index]=0
        })

    }
    protected subModifiers(playerdata:Player)
    {
        const playerstat=playerdata.getModifiers();
        this.stats.forEach(stat=>{
            playerstat[stat.index]=stat.value
        })

    }
    private deleteGear(playerdata:Player)
    {
        const item=playerdata.getInventory()[InventoryEnum.gear];
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