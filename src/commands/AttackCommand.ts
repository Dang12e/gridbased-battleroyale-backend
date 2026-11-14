import { Client } from "colyseus";
import { GameMap } from "../objects/GameMap.js";
import { MyRoomState } from "../rooms/schema/MyRoomState.js";
import { Command } from "./Command.js";
import { InventoryEnum } from "../Enums/InventoryEnum.js";
import { ItemLogicRegistery } from "../items/ItemLogicRegistery.js";
import { DurabilityHandler } from "../objects/DurabilityHandler.js";
import { DLEventEnum } from "../Enums/DLEventEnum.js";

export class AttackCommand extends Command<Target>{
    public execute(roomstate: MyRoomState, client: Client, payload: Target, map: GameMap, clientMap: Map<string, Client>): void {
        const player=roomstate.players.get(client.sessionId);
        const weapon=player.inventory[InventoryEnum.weapon]
        if(weapon && weapon.itemId!="none"&&DurabilityHandler.handleDurability(DLEventEnum.attack,client.sessionId,roomstate))
        {
            ItemLogicRegistery.getItemLogic(weapon.itemTypeId).use(client,roomstate,player,payload,map,clientMap);
            client.send("gun shot")
        }
        else{
            client.send("Invalid weapon or out of ammo");
        }
    }
    

}

export class Target{
    constructor(public x:number,public y:number)
    {

    }
}