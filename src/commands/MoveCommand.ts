import { Client } from "colyseus";
import { MyRoomState } from "../rooms/schema/MyRoomState.js";
import { Command } from "./Command.js";
import { GameMap } from "../objects/GameMap.js";
import { Vector2Helper } from "../helpers/Vector2Helper.js";
import { StatsEnum } from "../Enums/StatsEnum.js";
import { DurabilityHandler } from "../objects/DurabilityHandler.js";
import { DLEventEnum } from "../Enums/DLEventEnum.js";

export class MoveCommand extends Command<Movepayload>
{
    public execute(roomstate: MyRoomState, client: Client, payload: Movepayload, map: GameMap, clientMap: Map<string, Client>): void {
        const player=roomstate.players.get(client.sessionId);
      if(Vector2Helper.isInRange(player.x,player.y,payload.x,payload.y,player.stats[StatsEnum.speed]))
      {
        player.x=payload.x;
        player.y=payload.y;
        DurabilityHandler.handleDurability(DLEventEnum.move,client.sessionId,roomstate);
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