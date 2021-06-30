import { AsyncValidator as AsyncFluentValidator } from 'fluentvalidation-ts';
import { validate as uuidValidate } from 'uuid';

import ValidationException from '../exceptions/ValidationException';
import * as userRepository from '../repositories/userRepository';

/**
 * Validator class that adds an extra method to the fluentvalidation-ts validator that
 * throws a ValidationException.
 */
class Validator<TModel> extends AsyncFluentValidator<TModel> {
    public validatorFor: string;

    /**
     * Create a Validator.
     * @param validatorFor What part of the request is being validated.
     */
    constructor(validatorFor: string) {
        super();
        this.validatorFor = validatorFor;
    }

    /** Validate the given value and throw an ValidationException if the value is invalid. */
    async validateAndThrow(value: TModel): Promise<void> {
        const validationResults = await this.validateAsync(value);

        if (Object.keys(validationResults).length > 0) {
            throw new ValidationException(this.validatorFor, validationResults);
        }
    }
}

/**
 * Test whether a field is a valid uuid.
 */
const beAValidUuid = {
    predicate: async (field: string | undefined): Promise<boolean> => {
        return field ? uuidValidate(field) : false;
    },
    message: 'Must be a UUID',
};

/**
 * Test whether a field is of the union type resume_review_state.
 */
const beAResumeReviewState = {
    predicate: async (field: string | undefined): Promise<boolean> => {
        return field ? ['canceled', 'finished', 'reviewing', 'seeking_reviewer'].includes(field) : false;
    },
    message: 'Must be one of "canceled", "finished", "reviewing", or "seeking_reviewer"',
};

/**
 * Test whether a user already exists in the database.
 */
const beAValidUser = {
    predicate: async (field: string | undefined): Promise<boolean> => {
        if (field === undefined) {
            return false;
        }
        const matches = await userRepository.get(field);
        return matches.length == 1;
    },
    message: 'Must be a user that already exists',
};

// TODO test
/**
 * Test whether a field is properly URI encoded.
 */
const beProperlyUriEncoded = {
    predicate: async (field: string | undefined): Promise<boolean> => {
        if (field === undefined) {
            return false;
        }
        try {
            decodeURIComponent(field);
        } catch (e) {
            return false;
        }
        return true;
    },
    message: 'Must be properly encoded with encodeURIComponent',
};

export { beAResumeReviewState, beAValidUser, beAValidUuid, beProperlyUriEncoded };
export default Validator;
