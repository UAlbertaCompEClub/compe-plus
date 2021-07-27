import * as changeCase from 'change-case-object';
import { CamelCasedProperties } from 'type-fest';

export const decodeQueryToUser = (user?: string): string | undefined => {
    return user ? decodeURIComponent(user) : undefined;
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const toCamelCase = <T extends Object>(object: T): CamelCasedProperties<T> => {
    return <CamelCasedProperties<T>>changeCase.camelCase(object);
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const manyToCamelCase = <T extends Object>(object: T[]): CamelCasedProperties<T>[] => {
    return object.map((o: T) => <CamelCasedProperties<T>>changeCase.camelCase(o));
};
