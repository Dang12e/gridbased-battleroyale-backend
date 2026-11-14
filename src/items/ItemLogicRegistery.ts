import { DLEventEnum } from "../Enums/DLEventEnum.js";
import { StatsEnum } from "../Enums/StatsEnum.js";
import { BaseItemLogic } from "./BaseItemLogic.js";
import { Gear, GearStat } from "./Gear/Gear.js";

export class ItemLogicRegistery{
    private static itemLogics:Map<string,BaseItemLogic>=new Map([
        //Khai báo logic Item tại đây
        ["kelvet",new Gear([new GearStat(StatsEnum.maxHp,0.25)],"kelvet",1,20,DLEventEnum.onHit,"gear")]

    ]);

    public static getItemLogic(id:string)
    {
       
        const itemlogic=this.itemLogics.get(id);
        if (!itemlogic) {
            console.error(`[ItemLogicRegistery] Không tìm thấy logic cho itemId: "${id}"`);
            throw new Error(`ItemLogic cho ID "${id}" không tồn tại.`);
        }
        return itemlogic;

    }
}