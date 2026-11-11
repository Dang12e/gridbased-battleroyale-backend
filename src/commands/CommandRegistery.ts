import { Client } from "colyseus";
import { MyRoomState } from "../rooms/schema/MyRoomState.js";
import { PlayerCommand } from "./afafaf.js";
import { Command } from "./Command.js";
import { MoveCommand } from "./MoveCommand.js";
import { GameMap } from "../objects/GameMap.js";

export class CommandRegistery
{
    public static commands = new Map<string, Command<any>>([[
        "move",new MoveCommand("move")
    ]]);
  constructor()
  {
    
  }
    public static exacuteCommand<TPayload=any>(id:string,roomstate:MyRoomState,client:Client,payload: TPayload,map:GameMap)
    {
        const command= this.commands.get(id);
        command.execute(roomstate,client,payload,map);
    }
}