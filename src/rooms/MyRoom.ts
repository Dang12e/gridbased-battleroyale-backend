import { Room, Client, CloseCode } from "colyseus";
import { MyRoomState } from "./schema/MyRoomState.js";
import { Player } from "../objects/Player.js";
import { GameMap } from "../objects/GameMap.js";
import { MapSchema, StateView } from "@colyseus/schema";
import { ItemState } from "./schema/ItemState.js";
import { PlayerState } from "./schema/PlayerState.js";
import { GameCommandQueue } from "../objects/GameCommandQueue.js";
import { Movepayload } from "../commands/MoveCommand.js";
import { Target } from "../commands/AttackCommand.js";
import { UniqueIdGenerator } from "../helpers/UniqueIdGenerator.js";

export class MyRoom extends Room<{ state: MyRoomState }> {
  testitemid:number;
  maxClients = 4;
  state = new MyRoomState({
   droppedItems: new MapSchema<ItemState>(),
   players: new MapSchema<PlayerState>()
  });
  private clientsMap: Map<string,Client>=new Map();


  private gamecommandsQueue: GameCommandQueue=new GameCommandQueue();




  map=new GameMap(20,20);
  

  messages = {
    //thêm lệnh tại đây
    
   "move": (client:Client, message: { dx: number, dy: number }) => {
            this.gamecommandsQueue.pushCommand(client.sessionId,"move",new Movepayload(message.dx,message.dy));
            client.send("move_command_queued");
        },
    "attack": (client:Client, message: { dx: number, dy: number }) => {
            this.gamecommandsQueue.pushCommand(client.sessionId,"attack",new Target(message.dx,message.dy));
            client.send("attack_command_queued");
        },

    "useItem": (client:Client, message: { index: number}) => {
            this.gamecommandsQueue.pushCommand(client.sessionId,"useItem",message.index);
            client.send("useItem_command_queued");
        },
    "equipGear": (client:Client, message: { itemid: string}) => {
            this.gamecommandsQueue.pushCommand(client.sessionId,"equipGear",message.itemid);
            client.send("equipGear_command_queued");
        }
    
  };

  onCreate(options: any) {

    
    this.patchRate = 200;
    this.clock.setInterval(() => {
      this.update();
    }, 200);
    this.state.droppedItems.set("1",new ItemState({itemId:"1",itemTypeId:"kelvet",category:"gear",durability:10,x:0,y:0}))
    
    
    
  }

  update(){
        this.executeCommand();
      
  }

  onJoin(client: Client, options: any) {
    console.log(`Client kết nối: ${client.sessionId}`);
    this.clientsMap.set(client.sessionId,client);
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

  executeCommand()
  {
      this.gamecommandsQueue.executeCommands(this.state,this.map,this.clientsMap);
      
  }

  public findClientByID(sessionID: string):Client
  {
    return this.clients.find(client=>{client.sessionId==sessionID});
  }

}
