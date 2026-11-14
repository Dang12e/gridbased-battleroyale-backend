import { Client } from "colyseus";
import { GameMap } from "../objects/GameMap.js";
import { MyRoomState } from "../rooms/schema/MyRoomState.js";
import { Command } from "./Command.js";
import { InventoryEnum } from "../Enums/InventoryEnum.js";
import { ItemLogicRegistery } from "../items/ItemLogicRegistery.js";

export class DropCommand extends Command<number>{
    public execute(roomstate: MyRoomState, client: Client, payload: number, map: GameMap, clientMap: Map<string, Client>): void {
      
        const player=roomstate.players.get(client.sessionId);
        const item=player.inventory[payload];
        if(item && item.itemId!="none")
        {
            ItemLogicRegistery.getItemLogic(item.itemTypeId).onDrop(player,roomstate,payload);
        }
        else{
            client.send("cant drop")
        }
                
    }

}