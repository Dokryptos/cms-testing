import { type SchemaTypeDefinition } from "sanity";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [projectType],
};

// import { eventType } from "./evenType";
import { projectType } from "./projectType";
