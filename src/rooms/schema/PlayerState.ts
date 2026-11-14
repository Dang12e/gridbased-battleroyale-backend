import { ArraySchema, schema, t, type SchemaType } from "@colyseus/schema";
import { ItemState } from "./ItemState.js";
import { UniqueIdGenerator } from "../../helpers/UniqueIdGenerator.js";

export const PlayerState = schema({

  sessionId:t.string(),
  name:t.string().default(UniqueIdGenerator.generate("player")),

  x:t.number().default(0),
  y:t.number().default(0),

  hp:t.number().default(100),
  ap:t.number().view(),
  stats:t.array("number").default(new ArraySchema<number>(0,2,3,100)),
  modifiers:t.array("number").default(new ArraySchema<number>(0,0,0,0)),
  inventory:t.array(ItemState).default(new ArraySchema<ItemState>(...Array.from({length:10},()=>new ItemState()))),
  durabilityLossEvents:t.array("number").default(new ArraySchema<number>(-1,-1,-1))

});
export type PlayerState = SchemaType<typeof PlayerState>;