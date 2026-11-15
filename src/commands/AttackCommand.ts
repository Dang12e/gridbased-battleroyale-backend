import { Client } from "colyseus";
import { GameMap } from "../roomdata/GameMap.js";
import { MyRoomState } from "../rooms/schema/MyRoomState.js";
import { Command } from "./Command.js";
import { InventoryEnum } from "../Enums/InventoryEnum.js";
import { ItemLogicRegistery } from "../items/ItemLogicRegistery.js";
import { DurabilityHandler } from "../objects/DurabilityHandler.js";
import { DLEventEnum } from "../Enums/DLEventEnum.js";
import { Playerdata } from "../roomdata/Playerdata.js";
import { BlackBoard } from "../roomdata/BlackBoard.js";

export class AttackCommand extends Command<Target>{
    public execute(client:Client,
          blackBoard:BlackBoard,
          payload:Target): void {
        const playerdata=blackBoard.playersdata.get(client.sessionId);
        const weapon=playerdata.getInventory()[InventoryEnum.weapon]
        
        
        if(weapon && weapon.itemId!="none"&&DurabilityHandler.handleDurability(DLEventEnum.attack,playerdata))
        {
            ItemLogicRegistery.getItemLogic(weapon.itemTypeId).use(client,blackBoard,payload,playerdata);
            
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