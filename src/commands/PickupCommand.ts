import { Client } from "colyseus";
import { GameMap } from "../objects/GameMap.js";
import { MyRoomState } from "../rooms/schema/MyRoomState.js";
import { Command } from "./Command.js";
import { InventoryEnum } from "../Enums/InventoryEnum.js";
import { ItemLogicRegistery } from "../items/ItemLogicRegistery.js";

export class PickupCommand extends Command<PickupPayload>
{
    public execute(roomstate: MyRoomState, client: Client, payload: PickupPayload, map: GameMap, clientMap: Map<string, Client>): void {
        if(payload.index>Number(InventoryEnum.maxValue) && payload.index<=Number(InventoryEnum.gear))
        {
            client.send("invalid inventory index");
        }
        const player=roomstate.players.get(client.sessionId);
        const droppedItems=roomstate.droppedItems;
        const item=droppedItems.get(payload.itemId);
        if(item && item.category=="consumable" && (item.x==player.x&&item.y==player.y))
        {
            const inventory=player.inventory;
            const drop=inventory[payload.index];
            if(drop&& drop.itemTypeId!="none") ItemLogicRegistery.getItemLogic(drop.itemTypeId).onDrop(player,roomstate,payload.index);
            ItemLogicRegistery.getItemLogic(item.itemTypeId).onEquip(player,roomstate,payload.index,item);

        }
        else{
            client.send("Invalid Item");
        }
        
        
    }
    
}
export class PickupPayload
{
    
    constructor(public index:InventoryEnum,public itemId:string)
    {

    }
}
