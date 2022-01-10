"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeAccountsChange = void 0;
const utils_1 = require("../../utils");
const loadAccounts_1 = require("./loadAccounts");
const onChangeAccount_1 = require("./onChangeAccount");
const processAuctions_1 = require("./processAuctions");
const processMetaData_1 = require("./processMetaData");
const processMetaplexAccounts_1 = require("./processMetaplexAccounts");
const processVaultData_1 = require("./processVaultData");
const subscribeAccountsChange = (connection, all, getState, setState) => {
    const subscriptions = [];
    const updateStateValue = (prop, key, value) => {
        const state = getState();
        const nextState = loadAccounts_1.makeSetter({ ...state })(prop, key, value);
        setState(nextState);
    };
    subscriptions.push(connection.onProgramAccountChange(utils_1.toPublicKey(utils_1.VAULT_ID), onChangeAccount_1.onChangeAccount(processVaultData_1.processVaultData, updateStateValue, all)));
    subscriptions.push(connection.onProgramAccountChange(utils_1.toPublicKey(utils_1.AUCTION_ID), onChangeAccount_1.onChangeAccount(processAuctions_1.processAuctions, updateStateValue, all)));
    subscriptions.push(connection.onProgramAccountChange(utils_1.toPublicKey(utils_1.METAPLEX_ID), onChangeAccount_1.onChangeAccount(processMetaplexAccounts_1.processMetaplexAccounts, updateStateValue, all)));
    subscriptions.push(connection.onProgramAccountChange(utils_1.toPublicKey(utils_1.METADATA_PROGRAM_ID), onChangeAccount_1.onChangeAccount(processMetaData_1.processMetaData, async (prop, key, value) => {
        if (prop === 'metadataByMint') {
            const state = getState();
            const nextState = await loadAccounts_1.metadataByMintUpdater(value, state, all);
            setState(nextState);
        }
        else {
            updateStateValue(prop, key, value);
        }
    }, all)));
    return () => {
        subscriptions.forEach(subscriptionId => {
            connection.removeProgramAccountChangeListener(subscriptionId);
        });
    };
};
exports.subscribeAccountsChange = subscribeAccountsChange;
//# sourceMappingURL=subscribeAccountsChange.js.map