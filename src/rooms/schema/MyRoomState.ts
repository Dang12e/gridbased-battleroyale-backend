import { schema, t, type SchemaType } from "@colyseus/schema";
import { DroppedItemsState } from "./DroppedItemsState.js";
import { PlayerState } from "./PlayerState.js";
import { ItemState } from "./ItemState.js";

export const MyRoomState = schema({

  droppedItems: t.map(ItemState),
  players:t.map(PlayerState)

});
export type MyRoomState = SchemaType<typeof MyRoomState>;
