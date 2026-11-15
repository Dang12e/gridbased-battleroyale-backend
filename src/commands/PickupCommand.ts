import { Client } from "colyseus";
import { Command } from "./Command.js";
import { InventoryEnum } from "../Enums/InventoryEnum.js";
import { ItemLogicRegistery } from "../items/ItemLogicRegistery.js";

import { BlackBoard } from "../roomdata/BlackBoard.js";

export class PickupCommand extends Command<PickupPayload>
{
    public execute(client: Client, blackBoard: BlackBoard, payload: PickupPayload): void {
        
        if(payload.index>Number(InventoryEnum.maxValue) && payload.index<=Number(InventoryEnum.gear))
        {
            client.send("invalid inventory index");
        }
        const player=blackBoard.players.get(client.sessionId);
        const playerdata=blackBoard.playersdata.get(client.sessionId);
        const droppedItems=blackBoard.droppedItems;
        const item=droppedItems.get(payload.itemId);
        if(item && item.category=="consummable" && (item.x==player.x&&item.y==player.y))
        {
            const inventory=playerdata.getInventory();
            const drop=inventory[payload.index];
            if(drop&&drop.itemId&& drop.itemTypeId!="none") ItemLogicRegistery.getItemLogic(drop.itemTypeId).onDrop(playerdata,blackBoard,payload.index);
            ItemLogicRegistery.getItemLogic(item.itemTypeId).onEquip(playerdata,blackBoard,payload.index,item);

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
