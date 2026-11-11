import { Client } from "colyseus";
import { CommandRegistery } from "../commands/CommandRegistery.js";
import { MyRoom } from "../rooms/MyRoom.js";
import { MyRoomState } from "../rooms/schema/MyRoomState.js";
import { GameMap } from "./GameMap.js";

export class GameCommandQueue
{
    private commandQueues:Map<string,TempCommand<any>[]>=new Map();

    public pushCommand<TPayload=any>(sessionid:string,command_id:string,payload:TPayload)
    {
          const command = new TempCommand<TPayload>(command_id, payload);
        
        if (!this.commandQueues.has(sessionid)) {
            this.commandQueues.set(sessionid, [command]);
        } else {
            this.commandQueues.get(sessionid)!.push(command);
        }
    }

    public executeCommands<TPayload=any>(roomstate:MyRoomState,map:GameMap,clientsMap:Map<string,Client>)
    {
        
         this.commandQueues.forEach((command,key) => {
            const client = clientsMap.get(key);
            if(client)
            {
                console.log("found client")
            const tcommands=command as (TempCommand<TPayload>[]);
            const tcommand=tcommands.shift();
            if(tcommand)
            CommandRegistery.exacuteCommand(tcommand.command_id,roomstate,client,tcommand.payload,map);
            else
            this.commandQueues.delete(key);
            }
        });
        
    }
}
export class TempCommand<TPayload=any>
{
  constructor(public command_id:string,public payload:TPayload)
  {

  }
}