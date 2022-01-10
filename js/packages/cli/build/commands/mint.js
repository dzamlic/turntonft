"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mint = void 0;
var web3_js_1 = require("@solana/web3.js");
var accounts_1 = require("../helpers/accounts");
var constants_1 = require("../helpers/constants");
var anchor = __importStar(require("@project-serum/anchor"));
var spl_token_1 = require("@solana/spl-token");
var instructions_1 = require("../helpers/instructions");
function mint(keypair, env, configAddress, splTokenAccountKey) {
    return __awaiter(this, void 0, void 0, function () {
        var mint, userKeyPair, anchorProgram, userTokenAccountAddress, uuid, _a, candyMachineAddress, candyMachine, remainingAccounts, candyMachineTokenMintKey, token, tokenAccount, metadataAddress, masterEdition, _b, _c, _d, _e;
        var _f, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    mint = web3_js_1.Keypair.generate();
                    userKeyPair = accounts_1.loadWalletKey(keypair);
                    return [4 /*yield*/, accounts_1.loadAnchorProgram(userKeyPair, env)];
                case 1:
                    anchorProgram = _h.sent();
                    return [4 /*yield*/, accounts_1.getTokenWallet(userKeyPair.publicKey, mint.publicKey)];
                case 2:
                    userTokenAccountAddress = _h.sent();
                    uuid = accounts_1.uuidFromConfigPubkey(configAddress);
                    return [4 /*yield*/, accounts_1.getCandyMachineAddress(configAddress, uuid)];
                case 3:
                    _a = __read.apply(void 0, [_h.sent(), 1]), candyMachineAddress = _a[0];
                    return [4 /*yield*/, anchorProgram.account.candyMachine.fetch(candyMachineAddress)];
                case 4:
                    candyMachine = _h.sent();
                    remainingAccounts = [];
                    if (!splTokenAccountKey) return [3 /*break*/, 6];
                    candyMachineTokenMintKey = candyMachine.tokenMint;
                    if (!candyMachineTokenMintKey) {
                        throw new Error('Candy machine data does not have token mint configured. Can\'t use spl-token-account');
                    }
                    token = new spl_token_1.Token(anchorProgram.provider.connection, candyMachine.tokenMint, constants_1.TOKEN_PROGRAM_ID, userKeyPair);
                    return [4 /*yield*/, token.getAccountInfo(splTokenAccountKey)];
                case 5:
                    tokenAccount = _h.sent();
                    if (!candyMachine.tokenMint.equals(tokenAccount.mint)) {
                        throw new Error("Specified spl-token-account's mint (" + tokenAccount.mint.toString() + ") does not match candy machine's token mint (" + candyMachine.tokenMint.toString() + ")");
                    }
                    if (!tokenAccount.owner.equals(userKeyPair.publicKey)) {
                        throw new Error("Specified spl-token-account's owner (" + tokenAccount.owner.toString() + ") does not match user public key (" + userKeyPair.publicKey + ")");
                    }
                    remainingAccounts.push({ pubkey: splTokenAccountKey, isWritable: true, isSigner: false });
                    remainingAccounts.push({ pubkey: userKeyPair.publicKey, isWritable: false, isSigner: true });
                    _h.label = 6;
                case 6: return [4 /*yield*/, accounts_1.getMetadata(mint.publicKey)];
                case 7:
                    metadataAddress = _h.sent();
                    return [4 /*yield*/, accounts_1.getMasterEdition(mint.publicKey)];
                case 8:
                    masterEdition = _h.sent();
                    _c = (_b = anchorProgram.rpc).mintNft;
                    _f = {
                        accounts: {
                            config: configAddress,
                            candyMachine: candyMachineAddress,
                            payer: userKeyPair.publicKey,
                            //@ts-ignore
                            wallet: candyMachine.wallet,
                            mint: mint.publicKey,
                            metadata: metadataAddress,
                            masterEdition: masterEdition,
                            mintAuthority: userKeyPair.publicKey,
                            updateAuthority: userKeyPair.publicKey,
                            tokenMetadataProgram: constants_1.TOKEN_METADATA_PROGRAM_ID,
                            tokenProgram: constants_1.TOKEN_PROGRAM_ID,
                            systemProgram: web3_js_1.SystemProgram.programId,
                            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
                            clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
                        },
                        signers: [mint, userKeyPair],
                        remainingAccounts: remainingAccounts
                    };
                    _e = (_d = anchor.web3.SystemProgram).createAccount;
                    _g = {
                        fromPubkey: userKeyPair.publicKey,
                        newAccountPubkey: mint.publicKey,
                        space: spl_token_1.MintLayout.span
                    };
                    return [4 /*yield*/, anchorProgram.provider.connection.getMinimumBalanceForRentExemption(spl_token_1.MintLayout.span)];
                case 9: return [4 /*yield*/, _c.apply(_b, [(_f.instructions = [
                            _e.apply(_d, [(_g.lamports = _h.sent(),
                                    _g.programId = constants_1.TOKEN_PROGRAM_ID,
                                    _g)]),
                            spl_token_1.Token.createInitMintInstruction(constants_1.TOKEN_PROGRAM_ID, mint.publicKey, 0, userKeyPair.publicKey, userKeyPair.publicKey),
                            instructions_1.createAssociatedTokenAccountInstruction(userTokenAccountAddress, userKeyPair.publicKey, userKeyPair.publicKey, mint.publicKey),
                            spl_token_1.Token.createMintToInstruction(constants_1.TOKEN_PROGRAM_ID, mint.publicKey, userTokenAccountAddress, userKeyPair.publicKey, [], 1)
                        ],
                            _f)])];
                case 10: return [2 /*return*/, _h.sent()];
            }
        });
    });
}
exports.mint = mint;
