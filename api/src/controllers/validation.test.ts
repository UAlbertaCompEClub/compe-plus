import { mocked } from 'ts-jest/utils';
import { v4 } from 'uuid';
import type * as s from 'zapatos/schema';

import ValidationException from '../exceptions/ValidationException';
import * as resumeReviewRepository from '../repositories/resumeReviewRepository';
import * as userRepository from '../repositories/userRepository';
import testConstants from '../util/testConstants';
import Validator, { beAResumeReviewState, beAValidResumeReview, beAValidUrl, beAValidUser, beAValidUuid, beProperlyBase64Encoded, beProperlyUriEncoded } from './validation';

jest.mock('../repositories/userRepository');
const mockUserRepository = mocked(userRepository, true);

jest.mock('../repositories/resumeReviewRepository');
const mockresumeReviewRepository = mocked(resumeReviewRepository, true);

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
    const v = new TestValidUserValidator();

    it('does not throw if user exists', async () => {
        mockUserRepository.get.mockResolvedValueOnce([testConstants.user1]);

        await expect(v.validateAndThrow({ a: 'google-oauth2|999937999992352499990' })).resolves.not.toThrowError(ValidationException);
    });

    it('throws if user does not exist', async () => {
        mockUserRepository.get.mockResolvedValueOnce([]);

        await expect(v.validateAndThrow({ a: 'google-oauth2|999937999992352499990' })).rejects.toThrowError(ValidationException);
    });
});

type TestUriType = {
    a: string;
    b?: string;
};

class TestUriValidator extends Validator<TestUriType> {
    constructor() {
        super('test');

        this.ruleFor('a').mustAsync(beProperlyUriEncoded);

        this.ruleFor('b')
            .mustAsync(beProperlyUriEncoded)
            .when((t) => t.b !== undefined);
    }
}

describe('beProperlyUriEncoded helper', () => {
    const v = new TestUriValidator();

    it('correctly verifies a string is properly url encoded', async () => {
        await expect(v.validateAndThrow({ a: '%E0%A4%A' })).rejects.toThrowError(ValidationException);
        await expect(v.validateAndThrow({ a: '%7C' })).resolves.not.toThrowError(ValidationException);
    });

    it('correctly verifies strings that can be undefined', async () => {
        await expect(v.validateAndThrow({ a: '%7C', b: '%E0%A4%A' })).rejects.toThrowError(ValidationException);
        await expect(v.validateAndThrow({ a: '%7C', b: '%7C' })).resolves.not.toThrowError(ValidationException);
    });
});

type TestUrlType = {
    a: string;
    b?: string;
};

class TestUrlValidator extends Validator<TestUrlType> {
    constructor() {
        super('test');

        this.ruleFor('a').mustAsync(beAValidUrl);

        this.ruleFor('b')
            .mustAsync(beAValidUrl)
            .when((t) => t.b !== undefined);
    }
}

describe('beAValidUrl helper', () => {
    const v = new TestUrlValidator();

    it('correctly verifies a string is a url', async () => {
        await expect(v.validateAndThrow({ a: 'bleh' })).rejects.toThrowError(ValidationException);
        await expect(v.validateAndThrow({ a: 'https://hi.com' })).resolves.not.toThrowError(ValidationException);
    });

    it('correctly verifies strings that can be undefined', async () => {
        await expect(v.validateAndThrow({ a: 'https://hi.com', b: 'bleh' })).rejects.toThrowError(ValidationException);
        await expect(v.validateAndThrow({ a: 'https://hi.com', b: 'https://hi.com' })).resolves.not.toThrowError(ValidationException);
    });
});

type TestBase64Type = {
    a: string;
    b?: string;
};

class TestBase64Validator extends Validator<TestBase64Type> {
    constructor() {
        super('test');

        this.ruleFor('a').mustAsync(beProperlyBase64Encoded);

        this.ruleFor('b')
            .mustAsync(beProperlyBase64Encoded)
            .when((t) => t.b !== undefined);
    }
}

describe('beProperlyBase64Encoded helper', () => {
    const v = new TestBase64Validator();

    it('correctly verifies a string is properly base64 encoded', async () => {
        await expect(v.validateAndThrow({ a: '&&&' })).rejects.toThrowError(ValidationException);
        await expect(v.validateAndThrow({ a: 'JiYmCg==' })).resolves.not.toThrowError(ValidationException);
    });

    it('correctly verifies strings that can be undefined', async () => {
        await expect(v.validateAndThrow({ a: 'JiYmCg==', b: '&&&' })).rejects.toThrowError(ValidationException);
        await expect(v.validateAndThrow({ a: 'JiYmCg==', b: 'JiYmCg==' })).resolves.not.toThrowError(ValidationException);
    });
});

type TestValidResumeReviewType = {
    a: string;
};

class TestValidResumeReviewValidator extends Validator<TestValidResumeReviewType> {
    constructor() {
        super('test');

        this.ruleFor('a').mustAsync(beAValidResumeReview);
    }
}

describe('beAValidUser helper', () => {
    const v = new TestValidResumeReviewValidator();

    it('does not throw if resume review exists', async () => {
        mockresumeReviewRepository.get.mockResolvedValueOnce([testConstants.resumeReview1]);

        await expect(v.validateAndThrow({ a: '67e8ff47-8c31-4725-885c-e0e40455e7f5' })).resolves.not.toThrowError(ValidationException);
    });

    it('throws if resume review does not exist', async () => {
        mockresumeReviewRepository.get.mockResolvedValueOnce([]);

        await expect(v.validateAndThrow({ a: '67e8ff47-8c31-4725-885c-e0e40455e7f5' })).rejects.toThrowError(ValidationException);
    });
});
