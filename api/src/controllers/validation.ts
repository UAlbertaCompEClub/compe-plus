import { Validator as FluentValidator } from 'fluentvalidation-ts';
import ValidationException from '../exceptions/ValidationException';

// TODO comment
class Validtor<TModel> extends FluentValidator<TModel> {
    public validatorFor: string;

    constructor(validatorFor: string) {
        super();
        this.validatorFor = validatorFor;
    }

    validateAndThrow(value: TModel): void {
        const validationResults = this.validate(value);

        if (Object.keys(validationResults).length > 0) {
            throw new ValidationException(this.validatorFor, validationResults);
        }
    }
}

export default Validtor;
