import * as changeCase from 'change-case-object';
import { CamelCasedProperties, SnakeCasedProperties } from 'type-fest';

/**
 * Decode a user value that is encoded in a query.
 * @param user User encoded in query.
 * @returns Decoded user value.
 */
export const decodeQueryToUser = (user?: string): string | undefined => {
    return user ? decodeURIComponent(user) : undefined;
};

/**
 * Convert fields of an object to camel case.
 * @param object Object to convert fields of.
 * @returns Object with fields converted to camel case.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const toCamelCase = <T extends Object>(object: T): CamelCasedProperties<T> => {
    return <CamelCasedProperties<T>>changeCase.camelCase(object);
};

/**
 * Convert a list of objects fields to camel case.
 * @param objects List of objects to convert fields of.
 * @returns Objects with their fields converted to camel case.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const manyToCamelCase = <T extends Object>(objects: T[]): CamelCasedProperties<T>[] => {
    return objects.map((o: T) => toCamelCase(o));
};

/**
 * Convert fields of an object to snake case.
 * @param object Object to convert fields of.
 * @returns Object with fields converted to camel case.
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const toSnakeCase = <T extends Object>(object: T): SnakeCasedProperties<T> => {
    return <SnakeCasedProperties<T>>changeCase.snakeCase(object);
};

/**
 * Build the key for a document in S3.
 * @param resumeReview Id of resume review.
 * @param document Id of document.
 * @returns Document's key in S3.
 */
export const documentS3Key = (resumeReview: string, document: string): string => {
    return `resume-reviews/${resumeReview}/documents/${document}`;
};
