import { Room, Client, CloseCode } from "colyseus";
import { MyRoomState } from "./schema/MyRoomState.js";
import { Player } from "../objects/Player.js";
import { GameMap } from "../objects/GameMap.js";
import { MapSchema, StateView } from "@colyseus/schema";
import { ItemState } from "./schema/ItemState.js";
import { PlayerState } from "./schema/PlayerState.js";
import { Command } from "../commands/Command.js";
import { PlayerCommand } from "../commands/afafaf.js";
import { CommandRegistery } from "../commands/CommandRegistery.js";

export class MyRoom extends Room<{ state: MyRoomState }> {
  maxClients = 4;
  state = new MyRoomState({
   droppedItems: new MapSchema<ItemState>(),
   players: new MapSchema<PlayerState>()
  });
  private playerCommandQueues: Map<string,PlayerCommand[]>=new Map();
  players= new Map<string,Player>();
  map=new GameMap(20,20);
  

  messages = {
    
   "move": (client:Client, message: { dx: number, dy: number }) => {
            if (!this.playerCommandQueues.has(client.sessionId)) {
        this.playerCommandQueues.set(client.sessionId, []);
      }
      
      
      this.playerCommandQueues.get(client.sessionId)!.push(PlayerCommand.MOVE);
            
        }
    
  };

  onCreate(options: any) {

    
    this.patchRate = 200;
    this.clock.setInterval(() => {
      this.update();
    }, 200);
    
    
  }

  update(){
         this.playerCommandQueues.forEach((v,k)=>
        {
           const queue = this.playerCommandQueues.get(k);

      // Nếu hàng đợi tồn tại và có lệnh đang chờ
      if (queue && queue.length > 0) {
        // RÚT RA 1 LỆNH DUY NHẤT (Lệnh đầu tiên xếp hàng - FIFO)
        const currentCommand = queue.shift(); 

        // Thực hiện lệnh
        CommandRegistery.exacuteCommand(currentCommand,this.state.players.get(k));
      }
        });
  }

  onJoin(client: Client, options: any) {
    console.log(`Client kết nối: ${client.sessionId}`);
   const player= new PlayerState();
   player.sessionId=client.sessionId;
    this.state.players.set(client.sessionId,player);
    client.view=new StateView();
    client.view.add(player);
    client.send("welcome", { message: "Chào mừng bạn vào game!", sessionId: player.sessionId });
  }

  onLeave(client: Client, code: CloseCode) {
    this.state.players.delete(client.sessionId);
    console.log(client.sessionId, "left!", code);
  }

  onDispose() {
    /**
     * Called when the room is disposed.
     */
    console.log("room", this.roomId, "disposing...");
  }

}
