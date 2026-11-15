import { Client } from "colyseus";
import { GameMap } from "../roomdata/GameMap.js";
import { MyRoomState } from "../rooms/schema/MyRoomState.js";
import { Command } from "./Command.js";
import { InventoryEnum } from "../Enums/InventoryEnum.js";
import { ItemLogicRegistery } from "../items/ItemLogicRegistery.js";
import { Playerdata } from "../roomdata/Playerdata.js";
import { BlackBoard } from "../roomdata/BlackBoard.js";

export class DropCommand extends Command<number>{
    public execute(client: Client, blackBoard: BlackBoard, payload: number): void {
        console.log(payload);
        const playerdata=blackBoard.playersdata.get(client.sessionId);
        const item=playerdata.getInventory()[payload];
        console.log("item"+item+" "+"item.id: "+ item.itemId);
        if(item &&item.itemId&& item.itemId!="none")
        {
            ItemLogicRegistery.getItemLogic(item.itemTypeId).onDrop(playerdata,blackBoard,payload);
        }
        else{
            client.send("cant drop")
        }
    }
   

}