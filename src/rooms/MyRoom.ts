import { Room, Client, CloseCode } from "colyseus";
import { MyRoomState } from "./schema/MyRoomState.js";
import { Player } from "../objects/Player.js";
import { GameMap } from "../objects/GameMap.js";

export class MyRoom extends Room<{ state: MyRoomState }> {
  maxClients = 4;
  state = new MyRoomState();
  players= new Map<string,Player>();
  map=new GameMap(20,20);
  

  messages = {
    
   "move": (client:Client, message: { dx: number, dy: number }) => {
            
            
        }
    
  };

  onCreate(options: any) {

    
    this.patchRate = 200;
    this.clock.setInterval(() => {
      this.update();
    }, 200);
    
    
  }

  update(){

  }

  onJoin(client: Client, options: any) {
    console.log(`Client kết nối: ${client.sessionId}`);
       
    
    client.send("welcome", { message: "Chào mừng bạn vào game!", sessionId: client.sessionId });
  }

  onLeave(client: Client, code: CloseCode) {
    /**
     * Called when a client leaves the room.
     */
    console.log(client.sessionId, "left!", code);
  }

  onDispose() {
    /**
     * Called when the room is disposed.
     */
    console.log("room", this.roomId, "disposing...");
  }

}
