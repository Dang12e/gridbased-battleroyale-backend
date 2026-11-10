import { schema, t, type SchemaType } from "@colyseus/schema";
import { DroppedItemsState } from "./DroppedItemsState.js";
import { PlayerState } from "./PlayerState.js";

export const MyRoomState = schema({

  droppedItems: t.map(DroppedItemsState),
  players:t.map(PlayerState)

});
export type MyRoomState = SchemaType<typeof MyRoomState>;
