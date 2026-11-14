import { Client } from "colyseus";
import { DLEventEnum } from "../Enums/DLEventEnum.js";
import { MyRoomState } from "../rooms/schema/MyRoomState.js";
import { ItemLogicRegistery } from "../items/ItemLogicRegistery.js";
import { PlayerState } from "../rooms/schema/PlayerState.js";
import { Player } from "./Player.js";
import { ItemState } from "../rooms/schema/ItemState.js";

export class DurabilityHandler{
    public static handleDurability(event:DLEventEnum, player_id:string,roomstate:MyRoomState):boolean
    {
        const player=roomstate.players.get(player_id);
        const itemindex=player.durabilityLossEvents[event];
        if(itemindex&&itemindex!=-1) 
            {
                const item=player.inventory[itemindex];
                const itemlogic=ItemLogicRegistery.getItemLogic(item.itemTypeId);
                const durab=item.durability-itemlogic.durabilityCost;
                if(durab>0) 
                    {
                        item.durability=durab;
                        return true;
                    }
                else
                    {
                       
                       itemlogic.onBroken(player);
                       return false;
                    } 
            }
        return false;

    }

    public static handleItemDub(item:ItemState)
    {

        if(--item.durability>=0)
        {
         this.deleteItem(item);
        
        }

    }
    private static deleteItem(item:ItemState)
    {
       item.itemId="none";
        item.itemTypeId="none";
        item.category="none"
        item.durability=0;
    }
}