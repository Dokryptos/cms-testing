import { type SchemaTypeDefinition } from "sanity";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [artistType, photoType],
};

// import { eventType } from "./evenType";
import { artistType } from "./artistTypes";
import { photoType } from "./photoType";
