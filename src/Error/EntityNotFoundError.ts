import { ApolloError } from "apollo-server";

export const ENTITY_NOT_FOUND_CODE = 'ENTITY_NOT_FOUND';

class EntityNotFoundError extends ApolloError {
  constructor(
    entity: string,
    extensions: { invalidArgs: Record<string, any> }
  ) {
    super(
      entity,
      ENTITY_NOT_FOUND_CODE,
      extensions
    );
  }
}

export default EntityNotFoundError;