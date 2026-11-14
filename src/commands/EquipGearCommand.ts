import { Client } from "colyseus";
import { GameMap } from "../objects/GameMap.js";
import { MyRoomState } from "../rooms/schema/MyRoomState.js";
import { Command } from "./Command.js";
import { InventoryEnum } from "../Enums/InventoryEnum.js";
import { ItemLogicRegistery } from "../items/ItemLogicRegistery.js";

export class EquipGearCommand extends Command<string>
{
    public execute(roomstate: MyRoomState, client: Client, payload: string, map: GameMap, clientMap: Map<string, Client>): void {
        const player=roomstate.players.get(client.sessionId);
        const droppedItems=roomstate.droppedItems;
        const gear=droppedItems.get(payload)
        if(gear&& gear.category=="gear"&& (gear.x==player.x&&gear.y==player.y))
        {
            console.log(gear.itemTypeId);
            const inventory=player.inventory;
            const drop=inventory[InventoryEnum.gear];
            if(drop&&drop.itemId!="none"&&drop.itemId) ItemLogicRegistery.getItemLogic(drop.itemTypeId).onDrop(player,roomstate,InventoryEnum.gear);
            ItemLogicRegistery.getItemLogic(gear.itemTypeId).onEquip(player,roomstate,InventoryEnum.gear,gear);
            
        }
        else
            client.send("invalid gear");
        
    }
    
}
