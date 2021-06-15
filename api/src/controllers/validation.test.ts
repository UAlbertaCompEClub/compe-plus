import { mocked } from 'ts-jest/utils';
import { v4 } from 'uuid';
import type * as s from 'zapatos/schema';

import ValidationException from '../exceptions/ValidationException';
import * as userRepository from '../repositories/userRepository';
import Validator, { beAResumeReviewState, beAValidUser, beAValidUuid } from './validation';

jest.mock('../repositories/userRepository');
const mockUserRepository = mocked(userRepository, true);

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
    const v = new TestValidator();

    it('still allows validations to be set with this.ruleFor() syntax', async () => {
        expect(Object.keys(await v.validateAsync({ a: 'asdfdd', b: 3 })).length).toEqual(2);
        expect(Object.keys(await v.validateAsync({ a: 'a', b: 2 })).length).toEqual(0);
    });

    it('provides an additonal method to validate and throw an exception', async () => {
        await expect(v.validateAndThrow({ a: 'aaaadsfasdf', b: 5 })).rejects.toThrow(ValidationException);
        await expect(v.validateAndThrow({ a: 'a', b: 2 })).resolves.not.toThrow(ValidationException);
    });
});

type TestUuidType = {
    a: string;
    b?: string;
};

class TestUuidValidator extends Validator<TestUuidType> {
    constructor() {
        super('test');

        this.ruleFor('a').mustAsync(beAValidUuid);

        this.ruleFor('b')
            .mustAsync(beAValidUuid)
            .when((t) => t.b !== undefined);
    }
}

describe('beAValidUuid helper', () => {
    const v = new TestUuidValidator();

    it('correctly verifies a string is a uuid', async () => {
        await expect(v.validateAndThrow({ a: 'asdf' })).rejects.toThrowError(ValidationException);
        await expect(v.validateAndThrow({ a: v4() })).resolves.not.toThrowError(ValidationException);
    });

    it('correctly verifies strings that can be undefined', async () => {
        await expect(v.validateAndThrow({ a: v4(), b: 'asdf' })).rejects.toThrowError(ValidationException);
        await expect(v.validateAndThrow({ a: v4(), b: v4() })).resolves.not.toThrowError(ValidationException);
    });
});

type TestUnionType = {
    a: s.resume_review_state;
};

class TestUnionValidator extends Validator<TestUnionType> {
    constructor() {
        super('test');

        this.ruleFor('a').mustAsync(beAResumeReviewState);
    }
}

describe('beAResumeReviewState helper', () => {
    const v = new TestUnionValidator();

    it('correctly verifies strings as in union or not', async () => {
        for (const s of ['canceled', 'finished', 'reviewing', 'seeking_reviewer']) {
            await expect(v.validateAndThrow({ a: s as s.resume_review_state })).resolves.not.toThrowError(ValidationException);
        }
        await expect(v.validateAndThrow({ a: 'asdf' as s.resume_review_state })).rejects.toThrowError(ValidationException);
    });
});

type TestValidUserType = {
    a: string;
};

class TestValidUserValidator extends Validator<TestValidUserType> {
    constructor() {
        super('test');

        this.ruleFor('a').mustAsync(beAValidUser);
    }
}

describe('beAValidUser helper', () => {
    const u: s.users.JSONSelectable = {
        id: '67e8ff47-8c31-4725-885c-e0e40455e7f5',
        email: 'email@domain.com',
        ccid: 'myccid',
        program: 'compe',
        year: 4,
        given_name: 'bob',
        family_name: 'saggit',
        full_name: 'bob saggit',
        photo_url: 'asdf.com',
        created_at: '2021-06-14T06:09:19.373404+00:00',
        updated_at: '2021-06-14T06:09:19.373404+00:00',
    };
    const v = new TestValidUserValidator();

    it('does not throw if user exists', async () => {
        mockUserRepository.get.mockResolvedValueOnce([u]);

        await expect(v.validateAndThrow({ a: '67e8ff47-8c31-4725-885c-e0e40455e7f5' })).resolves.not.toThrowError(ValidationException);
    });

    it('throws if user does not exist', async () => {
        mockUserRepository.get.mockResolvedValueOnce([]);

        await expect(v.validateAndThrow({ a: '67e8ff47-8c31-4725-885c-e0e40455e7f5' })).rejects.toThrowError(ValidationException);
    });
});
