import { ArraySchema, MapSchema } from "@colyseus/schema";
import { ItemState } from "../rooms/schema/ItemState.js";
import { InventoryEnum } from "../Enums/InventoryEnum.js";
import { PlayerState } from "../rooms/schema/PlayerState.js";
import { Client } from "colyseus";


export class Player {
    public playerstate: PlayerState = new PlayerState();

    constructor(
        public client:Client,
        private id: string,
        private ap: number,
        private modifiers: Array<number> = new Array<number>(0, 0, 0, 0),
        private dlEvents: Array<number> = new Array<number>(-1, -1, -1),
        private inventory: Array<ItemState> = new Array<ItemState>(...Array.from({ length: InventoryEnum.length }, () => new ItemState()))
    ) {}

    public updateInventory(index:InventoryEnum)
    {
        const item=this.inventory[index]
        this.client.send("inventorychange",{index:index,item:item});
        console.log(item);
    }

    
    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getAp(): number {
        return this.ap;
    }

    public setAp(ap: number): void {
        this.ap = ap;
    }

    public getModifiers(): Array<number> {
        return this.modifiers;
    }

    public setModifiers(modifiers: ArraySchema<number>): void {
        this.modifiers = modifiers;
    }

    public getDlEvents(): Array<number> {
        return this.dlEvents;
    }

    public setDlEvents(dlEvents: Array<number>): void {
        this.dlEvents = dlEvents;
    }

    public getInventory(): Array<ItemState> {
        return this.inventory;
    }

    public setInventory(inventory: Array<ItemState>): void {
        this.inventory = inventory;
    }

    public getPlayerState(): PlayerState {
        return this.playerstate;
    }

    public setPlayerState(playerstate: PlayerState): void {
        this.playerstate = playerstate;
    }

    public instantiate(players: MapSchema<PlayerState>) {
        players.set(this.id, this.playerstate);
        this.playerstate.sessionId=this.id;
    }
}


