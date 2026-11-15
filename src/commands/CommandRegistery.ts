import { Client } from "colyseus";
import { MyRoomState } from "../rooms/schema/MyRoomState.js";
import { PlayerCommand } from "./afafaf.js";
import { Command } from "./Command.js";
import { MoveCommand } from "./MoveCommand.js";
import { GameMap } from "../roomdata/GameMap.js";
import { AttackCommand } from "./AttackCommand.js";
import { UseItemCommand } from "./UseItemCommand.js";
import { EquipGearCommand } from "./EquipGearCommand.js";
import { EquipWeaponCommand } from "./EquipWeaponCommand.js";
import { PickupCommand } from "./PickupCommand.js";
import { DropCommand } from "./DropCommand.js";
import { Playerdata } from "../roomdata/Playerdata.js";
import { BlackBoard } from "../roomdata/BlackBoard.js";

export class CommandRegistery
{
    public static commands = new Map<string, Command<any>>([
        //Khai báo command tại đây
  ["move", new MoveCommand("move")],
  ["attack", new AttackCommand("attack")],
  ["useItem", new UseItemCommand("useItem")],
  ["equipGear",new EquipGearCommand("equipGear")],
  ["equipWeapon", new EquipWeaponCommand("equipWeapon")],
  ["pickup",new PickupCommand("pickup")],
  ["drop",new DropCommand("drop")],
  ["useItem",new UseItemCommand("useItem")]

    ]);
  constructor()
  {
    
  }
    public static exacuteCommand<TPayload=any>(command_id:string,client:Client,
          blackBoard:BlackBoard,
          payload:TPayload)
    {
        const command= this.commands.get(command_id);
        command.execute(client,blackBoard,payload);
    }
}