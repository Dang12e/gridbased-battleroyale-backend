import { Client } from "colyseus";
import { GameMap } from "../roomdata/GameMap.js";
import { MyRoomState } from "../rooms/schema/MyRoomState.js";
import { Command } from "./Command.js";
import { ItemLogicRegistery } from "../items/ItemLogicRegistery.js";
import { Playerdata } from "../roomdata/Playerdata.js";
import { BlackBoard } from "../roomdata/BlackBoard.js";

export class UseItemCommand extends Command<number>
{
    public execute(client: Client, blackBoard: BlackBoard, payload: number): void {
        const playerdata=blackBoard.playersdata.get(client.sessionId);
       const item=playerdata.getInventory()[payload];
       if(item&&item.itemId&&item.itemId!="none")
       {
        
        ItemLogicRegistery.getItemLogic(item.itemTypeId).use(client,blackBoard,payload,playerdata);
       }
       else client.send("invalid item")
    }
    
    


}

