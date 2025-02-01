import { type SchemaTypeDefinition } from "sanity";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [artistType, eventType],
};

// import { eventType } from "./evenType";
import { artistType } from "./artistTypes";
import { eventType } from "./evenType";
