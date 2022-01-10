"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processMetaplexAccounts = void 0;
const web3_js_1 = require("@solana/web3.js");
const metaplex_1 = require("../../models/metaplex");
const utils_1 = require("../../utils");
const cache_1 = require("../accounts/cache");
const processMetaplexAccounts = async ({ account, pubkey }, setter, useAll) => {
    if (!isMetaplexAccount(account))
        return;
    try {
        const STORE_ID = utils_1.programIds().store;
        if (isAuctionManagerV1Account(account) ||
            isAuctionManagerV2Account(account)) {
            const storeKey = new web3_js_1.PublicKey(account.data.slice(1, 33));
            if ((STORE_ID && storeKey.equals(STORE_ID)) || useAll) {
                const auctionManager = metaplex_1.decodeAuctionManager(account.data);
                const parsedAccount = {
                    pubkey,
                    account,
                    info: auctionManager,
                };
                setter('auctionManagersByAuction', auctionManager.auction, parsedAccount);
            }
        }
        if (isBidRedemptionTicketV1Account(account) ||
            isBidRedemptionTicketV2Account(account)) {
            const ticket = metaplex_1.decodeBidRedemptionTicket(account.data);
            const parsedAccount = {
                pubkey,
                account,
                info: ticket,
            };
            setter('bidRedemptions', pubkey, parsedAccount);
            if (ticket.key == metaplex_1.MetaplexKey.BidRedemptionTicketV2) {
                const asV2 = ticket;
                if (asV2.winnerIndex) {
                    setter('bidRedemptionV2sByAuctionManagerAndWinningIndex', asV2.auctionManager + '-' + asV2.winnerIndex.toNumber(), parsedAccount);
                }
            }
        }
        if (isPayoutTicketV1Account(account)) {
            const ticket = metaplex_1.decodePayoutTicket(account.data);
            const parsedAccount = {
                pubkey,
                account,
                info: ticket,
            };
            setter('payoutTickets', pubkey, parsedAccount);
        }
        if (isPrizeTrackingTicketV1Account(account)) {
            const ticket = metaplex_1.decodePrizeTrackingTicket(account.data);
            const parsedAccount = {
                pubkey,
                account,
                info: ticket,
            };
            setter('prizeTrackingTickets', pubkey, parsedAccount);
        }
        if (isStoreV1Account(account)) {
            const store = metaplex_1.decodeStore(account.data);
            const parsedAccount = {
                pubkey,
                account,
                info: store,
            };
            if (STORE_ID && pubkey === STORE_ID.toBase58()) {
                setter('store', pubkey, parsedAccount);
            }
            setter('stores', pubkey, parsedAccount);
        }
        if (isSafetyDepositConfigV1Account(account)) {
            const config = metaplex_1.decodeSafetyDepositConfig(account.data);
            const parsedAccount = {
                pubkey,
                account,
                info: config,
            };
            setter('safetyDepositConfigsByAuctionManagerAndIndex', config.auctionManager + '-' + config.order.toNumber(), parsedAccount);
        }
        if (isWhitelistedCreatorV1Account(account)) {
            const parsedAccount = cache_1.cache.add(pubkey, account, metaplex_1.WhitelistedCreatorParser, false);
            // TODO: figure out a way to avoid generating creator addresses during parsing
            // should we store store id inside creator?
            if (STORE_ID) {
                const isWhitelistedCreator = await metaplex_1.isCreatorPartOfTheStore(parsedAccount.info.address, pubkey);
                if (isWhitelistedCreator) {
                    setter('whitelistedCreatorsByCreator', parsedAccount.info.address, parsedAccount);
                }
            }
            if (useAll) {
                setter('creators', parsedAccount.info.address + '-' + pubkey, parsedAccount);
            }
        }
    }
    catch {
        // ignore errors
        // add type as first byte for easier deserialization
    }
};
exports.processMetaplexAccounts = processMetaplexAccounts;
const isMetaplexAccount = (account) => account.owner === utils_1.METAPLEX_ID;
const isAuctionManagerV1Account = (account) => account.data[0] === metaplex_1.MetaplexKey.AuctionManagerV1;
const isAuctionManagerV2Account = (account) => account.data[0] === metaplex_1.MetaplexKey.AuctionManagerV2;
const isBidRedemptionTicketV1Account = (account) => account.data[0] === metaplex_1.MetaplexKey.BidRedemptionTicketV1;
const isBidRedemptionTicketV2Account = (account) => account.data[0] === metaplex_1.MetaplexKey.BidRedemptionTicketV2;
const isPayoutTicketV1Account = (account) => account.data[0] === metaplex_1.MetaplexKey.PayoutTicketV1;
const isPrizeTrackingTicketV1Account = (account) => account.data[0] === metaplex_1.MetaplexKey.PrizeTrackingTicketV1;
const isStoreV1Account = (account) => account.data[0] === metaplex_1.MetaplexKey.StoreV1;
const isSafetyDepositConfigV1Account = (account) => account.data[0] === metaplex_1.MetaplexKey.SafetyDepositConfigV1;
const isWhitelistedCreatorV1Account = (account) => account.data[0] === metaplex_1.MetaplexKey.WhitelistedCreatorV1;
//# sourceMappingURL=processMetaplexAccounts.js.map