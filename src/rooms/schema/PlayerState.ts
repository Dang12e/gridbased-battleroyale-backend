import { schema, t, type SchemaType } from "@colyseus/schema";
import { ItemState } from "./ItemState.js";

export const PlayerState = schema({

  sessionId:t.string(),
  name:t.string(),

  x:t.number(),
  y:t.number(),

  hp:t.number(),
  ap:t.number().view(),

  inventory:t.array(ItemState).view(),
  gearId: t.string(),
  weaponId:t.string()



});
export type PlayerState = SchemaType<typeof PlayerState>;