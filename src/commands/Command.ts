import { Client } from "colyseus";
import { MyRoomState } from "../rooms/schema/MyRoomState.js";
import { GameMap } from "../roomdata/GameMap.js";
import { Playerdata } from "../roomdata/Playerdata.js";
import { BlackBoard } from "../roomdata/BlackBoard.js";



export abstract class Command<TPayload=any>{
   readonly id: string;
   
   constructor(id:string)
   {
    this.id=id;
   }
   public abstract execute(
      client:Client,
      blackBoard:BlackBoard,
      payload:TPayload
      ):void;
   
  
}