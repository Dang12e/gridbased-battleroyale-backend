import { Client } from "colyseus";
import { MyRoomState } from "../rooms/schema/MyRoomState.js";
import { Command } from "./Command.js";
import { GameMap } from "../roomdata/GameMap.js";
import { Vector2Helper } from "../helpers/Vector2Helper.js";
import { StatsEnum } from "../Enums/StatsEnum.js";
import { DurabilityHandler } from "../objects/DurabilityHandler.js";
import { DLEventEnum } from "../Enums/DLEventEnum.js";
import { DefaultPlayerStats } from "../rooms/schema/PlayerState.js";
import { Playerdata } from "../roomdata/Playerdata.js";
import { BlackBoard } from "../roomdata/BlackBoard.js";

export class MoveCommand extends Command<Movepayload>
{
    public execute(client: Client, blackBoard: BlackBoard, payload: Movepayload): void {
      const map=blackBoard.map;
       const playerdata=blackBoard.playersdata.get(client.sessionId)
       const player=playerdata.getPlayerState();
      if(Vector2Helper.isInRange(player.x,player.y,payload.x,payload.y,DefaultPlayerStats.stats[StatsEnum.speed]))
      {
        if(payload.x>map.width&&
          payload.x<0 &&
          payload.y>map.height&&
          payload.y<0
        ){
          client.send("movement invalid");
          return;
        }

        let cellplayerid=map.getCell(payload.x,payload.y).player_id;
        if(cellplayerid)
        {
          client.send("movement invalid");
          return
        }
        const curCell=map.getCell(player.x,player.y);
        curCell.player_id=null;
        player.x=payload.x;
        player.y=payload.y;
        cellplayerid=player.sessionId;
        DurabilityHandler.handleDurability(DLEventEnum.move,playerdata);
        console.log("move: "+player.x+" ,"+player.y)
      }
      else
      {
        client.send("movement invalid");
      }
    }
    
    constructor(id:string)
    {
        super(id);
    }
 
}
export class Movepayload{
   constructor(public x:number,public y:number)
   {

   }
}