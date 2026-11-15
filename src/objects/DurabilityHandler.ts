import { Client } from "colyseus";
import { DLEventEnum } from "../Enums/DLEventEnum.js";
import { MyRoomState } from "../rooms/schema/MyRoomState.js";
import { ItemLogicRegistery } from "../items/ItemLogicRegistery.js";
import { PlayerState } from "../rooms/schema/PlayerState.js";
import { Player } from "./Player.js";
import { ItemState } from "../rooms/schema/ItemState.js";
import { InventoryEnum } from "../Enums/InventoryEnum.js";

export class DurabilityHandler{
    public static handleDurability(event:DLEventEnum, playerdata:Player):boolean
    {
        console.log("dub event "+ event);
        
        const itemindex=playerdata.getDlEvents()[event];
        console.log("dub inventory Index: "+itemindex);
        if(itemindex!=-1) 
            {
                const item=playerdata.getInventory()[itemindex];
                const itemlogic=ItemLogicRegistery.getItemLogic(item.itemTypeId);
                const durab=item.durability-itemlogic.durabilityCost;
                if(durab>=0) 
                    {
                        if(durab==0) itemlogic.onBroken(playerdata);
                        item.durability=durab;
                        playerdata.updateInventory(itemindex);
                        console.log("dub true");
                        return true;
                    }
                else
                    {
                       
                       itemlogic.onBroken(playerdata);
                       playerdata.updateInventory(itemindex);
                        console.log("dub false");
                       return false;
                      
                    } 
            }
            console.log("dub false no index");
        return false;

    }

    public static handleItemDub(item:ItemState,playerdata:Player,index:InventoryEnum)
    {

        if(--item.durability<=0)
        {
         this.deleteItem(item);
         

        
        }
        playerdata.updateInventory(index);

    }
    private static deleteItem(item:ItemState)
    {
       item.itemId="none";
        item.itemTypeId="none";
        item.category="none"
        item.durability=0;
    }
}