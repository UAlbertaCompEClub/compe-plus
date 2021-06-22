import { v4 } from 'uuid';
import type * as s from 'zapatos/schema';

import ValidationException from '../exceptions/ValidationException';
import Validator, { beAResumeReviewState, beAValidUuid } from './validation';

type TestType = {
    a: string;
    b: number;
};

class TestValidator extends Validator<TestType> {
    constructor() {
        super('test');

        this.ruleFor('a').maxLength(5);

        this.ruleFor('b').equal(2);
    }
}

describe('custom validator class', () => {
    it('still allows validations to be set with this.ruleFor() syntax', () => {
        const v = new TestValidator();

        expect(Object.keys(v.validate({ a: 'asdfdd', b: 3 })).length).toEqual(2);
        expect(Object.keys(v.validate({ a: 'a', b: 2 })).length).toEqual(0);
    });

    it('provides an additonal method to validate and throw an exception', () => {
        const v = new TestValidator();

        expect(() => v.validateAndThrow({ a: 'aaaadsfasdf', b: 5 })).toThrowError(ValidationException);
        expect(() => v.validateAndThrow({ a: 'a', b: 2 })).not.toThrowError(ValidationException);
    });
});

type TestUuidType = {
    a: string;
    b?: string;
};

class TestUuidValidator extends Validator<TestUuidType> {
    constructor() {
        super('test');

        this.ruleFor('a').must(beAValidUuid);

        this.ruleFor('b')
            .must(beAValidUuid)
            .when((t) => t.b !== undefined);
    }
}

describe('beAValidUuid helper', () => {
    it('correctly verifies a string is a uuid', () => {
        const v = new TestUuidValidator();

        expect(() => v.validateAndThrow({ a: 'asdf' })).toThrowError(ValidationException);
        expect(() => v.validateAndThrow({ a: v4() })).not.toThrowError(ValidationException);
    });

    it('correctly verifies strings that can be undefined', () => {
        const v = new TestUuidValidator();

        expect(() => v.validateAndThrow({ a: v4(), b: 'asdf' })).toThrowError(ValidationException);
        expect(() => v.validateAndThrow({ a: v4(), b: v4() })).not.toThrowError(ValidationException);
    });
});

type TestUnionType = {
    a: s.resume_review_state;
};

class TestUnionValidator extends Validator<TestUnionType> {
    constructor() {
        super('test');

        this.ruleFor('a').must(beAResumeReviewState);
    }
}

describe('beAResumeReviewState helper', () => {
    it('correctly verifies strings as in union or not', () => {
        const v = new TestUnionValidator();

        for (const s of ['canceled', 'finished', 'reviewing', 'seeking_reviewer']) {
            expect(() => v.validateAndThrow({ a: s as s.resume_review_state })).not.toThrowError(ValidationException);
        }
        expect(() => v.validateAndThrow({ a: 'asdf' as s.resume_review_state })).toThrowError(ValidationException);
    });
});
