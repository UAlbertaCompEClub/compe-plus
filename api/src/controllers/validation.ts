import { Validator as FluentValidator } from 'fluentvalidation-ts';
import ValidationException from '../exceptions/ValidationException';
import { validate as uuidValidate } from 'uuid';

/**
 * Validator class that adds an extra method to the fluentvalidation-ts validator that
 * throws a ValidationException.
 */
class Validator<TModel> extends FluentValidator<TModel> {
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
    validateAndThrow(value: TModel): void {
        const validationResults = this.validate(value);

        if (Object.keys(validationResults).length > 0) {
            throw new ValidationException(this.validatorFor, validationResults);
        }
    }
}

/**
 * Test whether a field is a valid uuid.
 */
const beAValidUuid = {
    predicate: (field: string | undefined): boolean => {
        return field ? uuidValidate(field) : false;
    },
    message: 'Must be a UUID',
};

/**
 * Test whether a field is of the union type resume_review_state.
 */
const beAResumeReviewState = {
    predicate: (field: string | undefined): boolean => {
        return field ? ['canceled', 'finished', 'reviewing', 'seeking_reviewer'].includes(field) : false;
    },
    message: 'Must be a "canceled", "finished", "reviewing", or "seeking_reviewer"',
};

export { beAValidUuid, beAResumeReviewState };
export default Validator;
