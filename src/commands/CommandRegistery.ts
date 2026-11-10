import { PlayerCommand } from "./afafaf.js";
import { Command } from "./Command.js";
import { MoveCommand } from "./MoveCommand.js";

export class CommandRegistery
{
    public static commands = new Map<PlayerCommand, Command>([
    [PlayerCommand.MOVE, new MoveCommand(PlayerCommand.MOVE)]
  ]);
    public static exacuteCommand(id:PlayerCommand,param:any)
    {
        const command= this.commands.get(id);
        command.exacute(param);
    }
}