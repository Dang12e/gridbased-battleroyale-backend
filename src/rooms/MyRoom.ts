import { Room, Client, CloseCode, validate } from "colyseus";
import { MyRoomState } from "./schema/MyRoomState.js";
import { Player } from "../objects/Player.js";
import { GameMap } from "../roomdata/GameMap.js";
import { MapSchema, StateView } from "@colyseus/schema";
import { ItemState } from "./schema/ItemState.js";
import { PlayerState } from "./schema/PlayerState.js";
import { GameCommandQueue } from "../roomdata/GameCommandQueue.js";
import { Movepayload } from "../commands/MoveCommand.js";
import { Target } from "../commands/AttackCommand.js";
import { PickupPayload } from "../commands/PickupCommand.js";
import { GlobalMessages } from "./schema/Messageschema.js";
import { BlackBoard } from "../roomdata/BlackBoard.js";

export class MyRoom extends Room<{ state: MyRoomState }> {
  testitemid:number;
  maxClients = 4;
  state = new MyRoomState({
   droppedItems: new MapSchema<ItemState>(),
   players: new MapSchema<PlayerState>()
  });
  
  private blackBoard: BlackBoard;


  private gamecommandsQueue: GameCommandQueue=new GameCommandQueue();




  map=new GameMap(20,20);
  

  messages = {
    //thêm lệnh tại đây
    
   "move": validate(GlobalMessages.vector2, (client,goal) => {
            this.gamecommandsQueue.pushCommand(client.sessionId,"move",new Movepayload(goal.x,goal.y));
            client.send("move_command_queued");
        }),
    "attack": validate(GlobalMessages.vector2, (client,target) => {
            this.gamecommandsQueue.pushCommand(client.sessionId,"attack",new Target(target.x,target.y));
            client.send("attack_command_queued");
        }),

    "useItem": validate(GlobalMessages.index, (client,index) => {
            this.gamecommandsQueue.pushCommand(client.sessionId,"useItem",index.index);
            client.send("useItem_command_queued");
        }),
    "equipGear": validate(GlobalMessages.id, (client,id) => {
            this.gamecommandsQueue.pushCommand(client.sessionId,"equipGear",id.id);
            client.send("quipGear_command_queued");
        }),
    "equipWeapon": validate(GlobalMessages.id, (client,id) => {
            this.gamecommandsQueue.pushCommand(client.sessionId,"equipWeapon",id.id);
            client.send("equipWeeapon_command_queued");
        }),
    "drop": validate(GlobalMessages.index, (client,index) => {
      console.log("drop index: "+index);
            this.gamecommandsQueue.pushCommand(client.sessionId,"drop",index.index);
            client.send("drop_command_queued");
        }),
    "pickup": validate(GlobalMessages.pickup, (client,pickup) => {
            this.gamecommandsQueue.pushCommand(client.sessionId,"pickup",new PickupPayload(pickup.index,pickup.id));
            client.send("pickup_command_queued");
        })
    

    
  };

  onCreate(options: any) {
    this.blackBoard=new BlackBoard(this.state.players,this.state.droppedItems);
    
    this.patchRate = 200;
    this.clock.setInterval(() => {
      this.update();
    }, 200);
    this.state.droppedItems.set("1",new ItemState({itemId:"1",itemTypeId:"kelvet",category:"gear",durability:10,x:0,y:0}))
    this.state.droppedItems.set("2",new ItemState({itemId:"2",itemTypeId:"AK36",category:"weapon",durability:30,x:0,y:0}))
    this.state.droppedItems.set("3",new ItemState({itemId:"3",itemTypeId:"Medkit",category:"consummable",durability:10,x:0,y:0}))
    this.state.droppedItems.set("4",new ItemState({itemId:"4",itemTypeId:"kelvet",category:"gear",durability:10,x:1,y:0}))
    
    
    
  }

  update(){
        this.executeCommand();
      
  }

  onJoin(client: Client, options: any) {
    console.log(`Client kết nối: ${client.sessionId}`);
    this.blackBoard.clientMap.set(client.sessionId,client);
    const playerdata=new Player(client,client.sessionId,0);
    playerdata.instantiate(this.blackBoard.players);
    this.blackBoard.playersdata.set(playerdata.getId(),playerdata);
    client.send("welcome", { message: "Chào mừng bạn vào game!", sessionId: playerdata.getId() });
    
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
      this.gamecommandsQueue.executeCommands(this.blackBoard);
      
  }

  public findClientByID(sessionID: string):Client
  {
    return this.clients.find(client=>{client.sessionId==sessionID});
  }

}
