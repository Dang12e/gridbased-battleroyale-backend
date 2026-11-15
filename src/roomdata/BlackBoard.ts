import { Client } from "colyseus";
import { Player } from "../objects/Player.js";
import { MyRoomState } from "../rooms/schema/MyRoomState.js";
import { GameMap } from "./GameMap.js";
import { ArraySchema, MapSchema } from "@colyseus/schema";
import { PlayerState } from "../rooms/schema/PlayerState.js";
import { ItemState } from "../rooms/schema/ItemState.js";

export class BlackBoard
{
   
    constructor(
    public players:MapSchema<PlayerState>,
    public droppedItems:MapSchema<ItemState>,
    public map:GameMap=new GameMap(20,20),
    public playersdata:Map<string,Player>=new Map<string,Player>(),
    public clientMap:Map<string,Client>=new Map<string,Client>(),)
    {
        

    }
}