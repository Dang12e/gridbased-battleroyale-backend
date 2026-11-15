import { Client } from "colyseus";
import { GameMap } from "../roomdata/GameMap.js";
import { MyRoomState } from "../rooms/schema/MyRoomState.js";
import { Command } from "./Command.js";
import { InventoryEnum } from "../Enums/InventoryEnum.js";
import { ItemLogicRegistery } from "../items/ItemLogicRegistery.js";
import { Playerdata } from "../roomdata/Playerdata.js";
import { BlackBoard } from "../roomdata/BlackBoard.js";

export class EquipWeaponCommand extends Command<string>
{
    public execute(client: Client, blackBoard: BlackBoard, payload: string): void {
        const playerdata=blackBoard.playersdata.get(client.sessionId);
        const player=playerdata.getPlayerState();
        const droppedItems=blackBoard.droppedItems;
        const weapon=droppedItems.get(payload);
        if(weapon&& weapon.category=="weapon"&& (weapon.x==player.x&&weapon.y==player.y))
        {
            const inventory=playerdata.getInventory();
            const drop=inventory[InventoryEnum.weapon];
            if(drop&&drop.itemId&&drop.itemId!="none") ItemLogicRegistery.getItemLogic(drop.itemTypeId).onDrop(playerdata,blackBoard,InventoryEnum.weapon);
            ItemLogicRegistery.getItemLogic(weapon.itemTypeId).onEquip(playerdata,blackBoard,InventoryEnum.weapon,weapon);
            
        }
        else
            client.send("invalid weapon");
    }
    
    
}
