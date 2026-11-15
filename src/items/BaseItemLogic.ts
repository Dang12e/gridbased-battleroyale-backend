import { Client } from "colyseus";
import { MyRoomState } from "../rooms/schema/MyRoomState.js";
import { InventoryEnum } from "../Enums/InventoryEnum.js";
import { PlayerState } from "../rooms/schema/PlayerState.js";
import { GameMap } from "../roomdata/GameMap.js";
import { DLEventEnum } from "../Enums/DLEventEnum.js";
import { ItemLogicRegistery } from "./ItemLogicRegistery.js";
import { ArraySchema } from "@colyseus/schema";
import { ItemState, nullItemState } from "../rooms/schema/ItemState.js";
import { BlackBoard } from "../roomdata/BlackBoard.js";
import { Player } from "../objects/Player.js";

export abstract class BaseItemLogic<TPayload=any>{


   constructor(public id:string,
      public durabilityCost:number,
      public maxDurability:number,
      public durabilityLossEvent:DLEventEnum,
      public category:string
   )
   {

   }

   public abstract use(client:Client,blackBoard:BlackBoard,payload:TPayload,playerdata:Player):void;
   public abstract onBroken(playerdata:Player):void;
   public abstract onEquip(playerdata:Player,blackBoard:BlackBoard,index:InventoryEnum,item:ItemState):void;
   public abstract onDrop(playerdata:Player,blackBoard:BlackBoard,index:InventoryEnum):void;
   protected unsubEvent(dlevents:Array<number>)
   {
      dlevents[this.durabilityLossEvent]=-1;

   }
   protected subEvent(dlevents:Array<number>,inventoryIndex:InventoryEnum)
   {
      dlevents[this.durabilityLossEvent]=inventoryIndex;

      
   }
   protected toInventory(item:ItemState,playerdata:Player,index:InventoryEnum,blackBoard:BlackBoard)
   {
     blackBoard.droppedItems.delete(item.itemId);
     playerdata.getInventory()[index]=item;
     playerdata.updateInventory(index);
   }
   protected drop(index:InventoryEnum,playerdata:Player,blackBoard:BlackBoard)
   {
     
     const item=playerdata.getInventory()[index];
     const temp=new ItemState({
      itemId:item.itemId,
      itemTypeId:item.itemTypeId,
      category:item.category,
      durability:item.durability,
      x:playerdata.getPlayerState().x,
      y:playerdata.getPlayerState().y
     });
     blackBoard.map.getCell(temp.x,temp.y).itemIds.push(item.itemId);
     blackBoard.droppedItems.set(item.itemId,temp);
     this.removeRef(item,nullItemState);
     playerdata.updateInventory(index);


   }
   private removeRef(itemslot:ItemState,nullitem:ItemState)
   {
      itemslot.assign(nullitem);

   }

   
  
}