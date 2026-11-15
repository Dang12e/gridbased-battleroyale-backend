import { Client } from "colyseus";
import { GameMap } from "../roomdata/GameMap.js";
import { MyRoomState } from "../rooms/schema/MyRoomState.js";
import { Command } from "./Command.js";
import { InventoryEnum } from "../Enums/InventoryEnum.js";
import { ItemLogicRegistery } from "../items/ItemLogicRegistery.js";
import { Playerdata } from "../roomdata/Playerdata.js";
import { BlackBoard } from "../roomdata/BlackBoard.js";

export class EquipGearCommand extends Command<string>
{
    public execute(client: Client, blackBoard: BlackBoard, payload: string): void {

        
        const playerdata=blackBoard.playersdata.get(client.sessionId);
        const player=playerdata.getPlayerState();
        const droppedItems=blackBoard.droppedItems;
        const gear=droppedItems.get(payload)
        if(gear&& gear.category=="gear"&& (gear.x==player.x&&gear.y==player.y))
        {
            console.log(gear.itemTypeId);
            const inventory=playerdata.getInventory();
            const drop=inventory[InventoryEnum.gear];
            if(drop&&drop.itemId&&drop.itemId!="none") ItemLogicRegistery.getItemLogic(drop.itemTypeId).onDrop(playerdata,blackBoard,InventoryEnum.gear);
            ItemLogicRegistery.getItemLogic(gear.itemTypeId).onEquip(playerdata,blackBoard,InventoryEnum.gear,gear);
            
        }
        else
            client.send("invalid gear");
    }
    
}
