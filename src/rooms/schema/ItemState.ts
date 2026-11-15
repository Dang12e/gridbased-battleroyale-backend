import { schema, t, type SchemaType } from "@colyseus/schema";

export const ItemState = schema({

  itemId:t.string(),
  itemTypeId:t.string(),
  category:t.string(),
  durability:t.number(),
  
  x:t.number(),
  y:t.number()
});
export type ItemState = SchemaType<typeof ItemState>;

export const nullItemState=new ItemState({
  itemId:"none",
  itemTypeId:"none",
  category:"none",
  durability:0,
  x:-12,
  y:-22,
});
