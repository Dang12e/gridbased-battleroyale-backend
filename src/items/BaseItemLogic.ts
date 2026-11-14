import { Client } from "colyseus";
import { MyRoomState } from "../rooms/schema/MyRoomState.js";
import { InventoryEnum } from "../Enums/InventoryEnum.js";
import { PlayerState } from "../rooms/schema/PlayerState.js";
import { GameMap } from "../objects/GameMap.js";
import { DLEventEnum } from "../Enums/DLEventEnum.js";
import { ItemLogicRegistery } from "./ItemLogicRegistery.js";
import { ArraySchema } from "@colyseus/schema";
import { ItemState } from "../rooms/schema/ItemState.js";

export abstract class BaseItemLogic<TPayload=any>{


   constructor(public id:string,
      public durabilityCost:number,
      public maxDurability:number,
      public durabilityLossEvent:DLEventEnum,
      public category:string
   )
   {

   }

   public abstract use(client: Client,roomstate:MyRoomState,playerstate:PlayerState,payload:TPayload,map:GameMap,clientMap:Map<string,Client>):void;
   public abstract onBroken(playerstate:PlayerState):void;
   public abstract onEquip(playerstate:PlayerState,roomstate:MyRoomState,index:InventoryEnum,item:ItemState):void;
   public abstract onDrop(playerstate:PlayerState,roomstate:MyRoomState,index:InventoryEnum):void;
   protected unsubEvent(dlevents:ArraySchema<number>)
   {
      dlevents[this.durabilityLossEvent]=-1;

   }
   protected subEvent(dlevents:ArraySchema<number>,inventoryIndex:InventoryEnum)
   {
      dlevents[this.durabilityLossEvent]=inventoryIndex;
      
   }
   protected toInventory(item:ItemState,playerstate:PlayerState,index:InventoryEnum,roomstate:MyRoomState)
   {
     roomstate.droppedItems.delete(item.itemId);
     playerstate.inventory[index]=item;
   }
   protected drop(index:InventoryEnum,playerstate:PlayerState,roomstate:MyRoomState)
   {
      
     const item=playerstate.inventory[index];
     roomstate.droppedItems.set(item.itemId,item);


   }

   
  
}