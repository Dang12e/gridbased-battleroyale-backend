import { schema, t, type SchemaType } from "@colyseus/schema";
import { ItemState } from "./ItemState.js";

export const DroppedItemsState = schema({

  droppedItems:t.map(ItemState)

});
export type DroppedItemsState = SchemaType<typeof DroppedItemsState>;