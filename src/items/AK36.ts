import { Client } from "colyseus";
import { Target } from "../commands/AttackCommand.js";
import { GameMap } from "../objects/GameMap.js";
import { MyRoomState } from "../rooms/schema/MyRoomState.js";
import { PlayerState } from "../rooms/schema/PlayerState.js";
import { BaseItemLogic } from "./BaseItemLogic.js";
import { IWeapon } from "./IWeapon.js";
import { DurabilityHandler } from "../objects/DurabilityHandler.js";
import { DLEventEnum } from "../Enums/DLEventEnum.js";
import { InventoryEnum } from "../Enums/InventoryEnum.js";
import { ItemState } from "../rooms/schema/ItemState.js";



export class AK36 extends BaseItemLogic<Target> implements IWeapon
{
    public onDrop(playerstate: PlayerState, roomstate: MyRoomState, index: InventoryEnum): void {
        this.drop(index,playerstate,roomstate);
        this.unsubEvent(playerstate.durabilityLossEvents);
    }
    
    
    
    
    constructor(id:string,durabilityCost:number,maxDurability:number,dllossevent:DLEventEnum,category:string,
        range: number,
    diagonalAttack: boolean,
    damage: number,
    numberOfHit: number,
    )
    {
        super(id,durabilityCost,maxDurability,dllossevent,category);
        this.range=range;
        this.diagonalAttack=diagonalAttack;
        this.damage=damage
        this.numberOfHit=numberOfHit;
    }
    range: number;
    diagonalAttack: boolean;
    damage: number;
    numberOfHit: number;

    
    public use(client:Client,roomstate: MyRoomState, playerstate: PlayerState, payload: Target, map: GameMap, clientMap: Map<string, Client>): void {
        const target = payload;
        const cell = map.getCell(target.x, target.y);
        if(cell.player_id)
        {
            const player=roomstate.players.get(cell.player_id);
            player.hp-=this.damage*this.numberOfHit;
            const target_client=clientMap.get(cell.player_id);
            target_client?.send("gunshot",playerstate);
            DurabilityHandler.handleDurability(DLEventEnum.onHit,player.sessionId,roomstate);
        }
        
        
    }
    
   
    

    
    public onBroken(playerstate: PlayerState): void {
        
    }

    public onEquip(playerstate:PlayerState,roomstate:MyRoomState,index:InventoryEnum,item:ItemState): void {
        this.toInventory(item,playerstate,index,roomstate);
      this.subEvent(playerstate.durabilityLossEvents,InventoryEnum.weapon)
    }

    

   
   
    



}

