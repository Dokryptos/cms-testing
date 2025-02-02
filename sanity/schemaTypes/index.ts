import { type SchemaTypeDefinition } from "sanity";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [artistType, projectType],
};

// import { eventType } from "./evenType";
import { artistType } from "./artistTypes";
import { projectType } from "./projectType";
