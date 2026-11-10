import { schema, t, type SchemaType } from "@colyseus/schema";
import { ItemState } from "./ItemState.js";
import { UniqueIdGenerator } from "../../helpers/UniqueIdGenerator.js";

export const PlayerState = schema({

  sessionId:t.string(),
  name:t.string().default(UniqueIdGenerator.generate("player")),

  x:t.number().default(0),
  y:t.number().default(0),

  hp:t.number().default(100),
  ap:t.number().view(),

  inventory:t.array(ItemState).view(),
  gearId: t.string(),
  weaponId:t.string()



});
export type PlayerState = SchemaType<typeof PlayerState>;