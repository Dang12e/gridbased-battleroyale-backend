import { Client } from "colyseus";
import { MyRoomState } from "../rooms/schema/MyRoomState.js";
import { PlayerCommand } from "./afafaf.js";
import { Command } from "./Command.js";
import { MoveCommand } from "./MoveCommand.js";
import { GameMap } from "../objects/GameMap.js";
import { AttackCommand } from "./AttackCommand.js";
import { UseItemCommand } from "./UseItemCommand.js";
import { EquipGearCommand } from "./EquipGearCommand.js";

export class CommandRegistery
{
    public static commands = new Map<string, Command<any>>([
        //Khai báo command tại đây
        ["move", new MoveCommand("move")],
  ["attack", new AttackCommand("attack")],
  ["useItem", new UseItemCommand("useItem")],
  ["equipGear",new EquipGearCommand("equipGear")]

    ]);
  constructor()
  {
    
  }
    public static exacuteCommand<TPayload=any>(id:string,roomstate:MyRoomState,client:Client,payload: TPayload,map:GameMap,clientMap:Map<string,Client>)
    {
        const command= this.commands.get(id);
        command.execute(roomstate,client,payload,map,clientMap);
    }
}