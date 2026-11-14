import { Client } from "colyseus";
import { GameMap } from "../objects/GameMap.js";
import { MyRoomState } from "../rooms/schema/MyRoomState.js";
import { Command } from "./Command.js";
import { InventoryEnum } from "../Enums/InventoryEnum.js";
import { ItemLogicRegistery } from "../items/ItemLogicRegistery.js";

export class EquipWeaponCommand extends Command<string>
{
    public execute(roomstate: MyRoomState, client: Client, payload: string, map: GameMap, clientMap: Map<string, Client>): void {
        const player=roomstate.players.get(client.sessionId);
        const droppedItems=roomstate.droppedItems;
        const weapon=droppedItems.get(payload);
        if(weapon&& weapon.category=="weapon"&& (weapon.x==player.x&&weapon.y==player.y))
        {
            const inventory=player.inventory;
            const drop=inventory[InventoryEnum.weapon];
            if(drop&&drop.itemId!="none") ItemLogicRegistery.getItemLogic(drop.itemTypeId).onDrop(player,roomstate,InventoryEnum.weapon);
            ItemLogicRegistery.getItemLogic(weapon.itemTypeId).onEquip(player,roomstate,InventoryEnum.weapon,weapon);
            
        }
        else
            client.send("invalid weapon");
        
    }
    
}
