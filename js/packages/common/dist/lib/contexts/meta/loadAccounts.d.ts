import { Metadata } from '../../actions';
import { Connection } from '@solana/web3.js';
import { MetaState } from './types';
import { ParsedAccount } from '../accounts/types';
export declare const USE_SPEED_RUN = false;
export declare const limitedLoadAccounts: (connection: Connection) => Promise<MetaState>;
export declare const loadAccounts: (connection: Connection, all: boolean) => Promise<MetaState>;
export declare const makeSetter: (state: MetaState) => (prop: keyof MetaState, key: string, value: ParsedAccount<any>) => MetaState;
export declare const metadataByMintUpdater: (metadata: ParsedAccount<Metadata>, state: MetaState, all: boolean) => Promise<MetaState>;
//# sourceMappingURL=loadAccounts.d.ts.map