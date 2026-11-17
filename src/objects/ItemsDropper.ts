import { MapSchema } from "@colyseus/schema";
import { GameMap } from "../roomdata/GameMap.js";
import { ItemState } from "../rooms/schema/ItemState.js";
import { generateId } from "colyseus";
import { ItemLogicRegistery } from "../items/ItemLogicRegistery.js";

export class ItemDropper
{
    public static dropItems(map:GameMap,itemrequirements:ItemRequirement[],droppedItems:MapSchema<ItemState>)
    {
        const rows=map.height;
        const cols=map.width;
        itemrequirements.forEach(itemrequirement=>
            {
                console.log("requirements: ")
                console.log(itemrequirement)
                for(let i=0;i<itemrequirement.quantity;i++)
                {
                const r=Math.floor(Math.random()*rows)
                const c=Math.floor(Math.random()*cols)

                const itemID=generateId()
                map.getCell(c,r).itemIds.push(itemID);
                const itemstate=new ItemState();
                const itemlogic=ItemLogicRegistery.getItemLogic(itemrequirement.type);
                itemstate.x=c;itemstate.y=r;
                itemstate.itemId=itemID;
                itemstate.itemTypeId=itemrequirement.type;
                itemstate.durability=itemlogic.maxDurability;
                itemstate.category=itemlogic.category;
                droppedItems.set(itemID,itemstate);
                console.log("item set");

                }

            }
        )
       

    }
}

export interface ItemRequirement
{
  type:string
  quantity:number
}