"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onChangeAccount = void 0;
const utils_1 = require("../../utils");
const onChangeAccount = (process, setter, all) => async (info) => {
    const pubkey = utils_1.pubkeyToString(info.accountId);
    await process({
        pubkey,
        account: info.accountInfo,
    }, setter, all);
};
exports.onChangeAccount = onChangeAccount;
//# sourceMappingURL=onChangeAccount.js.map