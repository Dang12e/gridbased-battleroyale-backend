import { Client } from "colyseus";
import { MyRoomState } from "../rooms/schema/MyRoomState.js";
import { Command } from "./Command.js";

export class MoveCommand extends Command<Movepayload>
{
    constructor(id:string)
    {
        super(id);
    }
  public override execute(roomstate: MyRoomState, client:Client, payload: Movepayload): void {
      const player=roomstate.players.get(client.sessionId);
      player.x=payload.x;
      player.y=payload.y;
      client.send("move")
    
  }
}
export class Movepayload{
   constructor(public x:number,public y:number)
   {

   }
}