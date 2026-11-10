import { Command } from "./Command.js";

export class MoveCommand extends Command
{
    constructor(id:number)
    {
        super(id);
    }
  public override exacute(param: any): void {
      const c_x= param.x++;
      const c_y= param.y++;
      console.log("player moved!");


  }
}