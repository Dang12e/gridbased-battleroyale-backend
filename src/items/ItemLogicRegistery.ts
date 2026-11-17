import { DLEventEnum } from "../Enums/DLEventEnum.js";
import { StatsEnum } from "../Enums/StatsEnum.js";
import { AK36 } from "./AK36.js";
import { BaseItemLogic } from "./BaseItemLogic.js";
import { Gear, GearStat } from "./Gear/Gear.js";
import { Medkit } from "./Medkit.js";

export class ItemLogicRegistery{
    private static itemLogics:Map<string,BaseItemLogic<any>>=new Map<string,BaseItemLogic<any>>([
        //Khai báo logic Item tại đây
        ["Kelvet",new Gear([new GearStat(StatsEnum.maxHp,0.25)],"Kelvet",1,20,DLEventEnum.onHit,"gear")],
        ["AK36",new AK36("AK36",2,30,DLEventEnum.attack,"weapon",3,true,30,2)],
        ["Medkit",new Medkit(25,"Medkit",1,10,DLEventEnum.none,"consummable")]

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