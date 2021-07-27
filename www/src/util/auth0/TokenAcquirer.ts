import { GetTokenSilentlyOptions } from '@auth0/auth0-react';

type TokenAcquirer = (options?: GetTokenSilentlyOptions) => Promise<string>;

export default TokenAcquirer;
