import { schema, t, type SchemaType } from "@colyseus/schema";

export const ItemState = schema({

  itemId:t.string(),
  itemTypeId:t.string(),
  durability:t.number(),
  
  x:t.number(),
  y:t.number()
});
export type ItemState = SchemaType<typeof ItemState>;