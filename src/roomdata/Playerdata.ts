import { Player } from "../objects/Player.js";

export class Playerdata
{
    constructor(public playerDataMap:Map<string,Player>=new Map<string,Player>())
    {

    }
}