"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryExtendedMetadata = void 0;
const cache_1 = require("../accounts/cache");
const getMultipleAccounts_1 = require("../accounts/getMultipleAccounts");
const parsesrs_1 = require("../accounts/parsesrs");
const queryExtendedMetadata = async (connection, mintToMeta) => {
    const mintToMetadata = { ...mintToMeta };
    const mints = await getMultipleAccounts_1.getMultipleAccounts(connection, [...Object.keys(mintToMetadata)].filter(k => !cache_1.cache.get(k)), 'single');
    mints.keys.forEach((key, index) => {
        const mintAccount = mints.array[index];
        if (mintAccount) {
            const mint = cache_1.cache.add(key, mintAccount, parsesrs_1.MintParser, false);
            if (!mint.info.supply.eqn(1) || mint.info.decimals !== 0) {
                // naive not NFT check
                delete mintToMetadata[key];
            }
            else {
                // const metadata = mintToMetadata[key];
            }
        }
    });
    // await Promise.all([...extendedMetadataFetch.values()]);
    const metadata = [...Object.values(mintToMetadata)];
    return {
        metadata,
        mintToMetadata,
    };
};
exports.queryExtendedMetadata = queryExtendedMetadata;
//# sourceMappingURL=queryExtendedMetadata.js.map