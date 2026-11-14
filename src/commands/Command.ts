import { Client } from "colyseus";
import { MyRoomState } from "../rooms/schema/MyRoomState.js";
import { GameMap } from "../objects/GameMap.js";



export abstract class Command<TPayload=any>{
   readonly id: string;
   
   constructor(id:string)
   {
    this.id=id;
   }
   public abstract execute(roomstate: MyRoomState,client:Client ,payload: TPayload,map:GameMap,clientMap:Map<string,Client>):void;
   
  
}