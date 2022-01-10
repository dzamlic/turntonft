import { Metadata } from '../../actions';
import { Store, WhitelistedCreator } from '../../models/metaplex';
import { ParsedAccount } from '../accounts/types';
export declare const isMetadataPartOfStore: (m: ParsedAccount<Metadata>, store: ParsedAccount<Store> | null, whitelistedCreatorsByCreator: Record<string, ParsedAccount<WhitelistedCreator>>) => boolean;
//# sourceMappingURL=isMetadataPartOfStore.d.ts.map