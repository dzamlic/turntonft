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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var commander_1 = require("commander");
var anchor = __importStar(require("@project-serum/anchor"));
var bn_js_1 = __importDefault(require("bn.js"));
var various_1 = require("./helpers/various");
var spl_token_1 = require("@solana/spl-token");
var web3_js_1 = require("@solana/web3.js");
var constants_1 = require("./helpers/constants");
var accounts_1 = require("./helpers/accounts");
var upload_1 = require("./commands/upload");
var cache_1 = require("./helpers/cache");
var mint_1 = require("./commands/mint");
var sign_1 = require("./commands/sign");
var signAll_1 = require("./commands/signAll");
var loglevel_1 = __importDefault(require("loglevel"));
commander_1.program.version('0.0.1');
if (!fs.existsSync(constants_1.CACHE_PATH)) {
    fs.mkdirSync(constants_1.CACHE_PATH);
}
loglevel_1.default.setLevel(loglevel_1.default.levels.INFO);
programCommand('upload')
    .argument('<directory>', 'Directory containing images named from 0-n', function (val) {
    return fs.readdirSync("" + val).map(function (file) { return path.join(val, file); });
})
    .option('-n, --number <number>', 'Number of images to upload')
    .action(function (files, options, cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, number, keypair, env, cacheName, pngFileCount, jsonFileCount, parsedNumber, elemCount, startMs, warn, successful, endMs, timeTaken;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = cmd.opts(), number = _a.number, keypair = _a.keypair, env = _a.env, cacheName = _a.cacheName;
                pngFileCount = files.filter(function (it) {
                    return it.endsWith(constants_1.EXTENSION_PNG);
                }).length;
                jsonFileCount = files.filter(function (it) {
                    return it.endsWith(constants_1.EXTENSION_JSON);
                }).length;
                parsedNumber = parseInt(number);
                elemCount = parsedNumber ? parsedNumber : pngFileCount;
                if (pngFileCount !== jsonFileCount) {
                    throw new Error("number of png files (" + pngFileCount + ") is different than the number of json files (" + jsonFileCount + ")");
                }
                if (elemCount < pngFileCount) {
                    throw new Error("max number (" + elemCount + ")cannot be smaller than the number of elements in the source folder (" + pngFileCount + ")");
                }
                loglevel_1.default.info("Beginning the upload for " + elemCount + " (png+json) pairs");
                startMs = Date.now();
                loglevel_1.default.info("started at: " + startMs.toString());
                warn = false;
                _b.label = 1;
            case 1: return [4 /*yield*/, upload_1.upload(files, cacheName, env, keypair, elemCount)];
            case 2:
                successful = _b.sent();
                if (successful) {
                    warn = false;
                    return [3 /*break*/, 4];
                }
                else {
                    warn = true;
                    loglevel_1.default.warn("upload was not successful, rerunning");
                }
                _b.label = 3;
            case 3: return [3 /*break*/, 1];
            case 4:
                endMs = Date.now();
                timeTaken = new Date(endMs - startMs).toISOString().substr(11, 8);
                loglevel_1.default.info("ended at: " + new Date(endMs).toString() + ". time taken: " + timeTaken);
                if (warn) {
                    loglevel_1.default.info("not all images have been uplaoded, rerun this step.");
                }
                return [2 /*return*/];
        }
    });
}); });
programCommand('verify')
    .action(function (directory, cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, env, keypair, cacheName, cacheContent, walletKeyPair, anchorProgram, configAddress, config, allGood, keys, i, key, thisSlice, name_1, uri, cacheItem, configData, lineCount;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = cmd.opts(), env = _a.env, keypair = _a.keypair, cacheName = _a.cacheName;
                cacheContent = cache_1.loadCache(cacheName, env);
                walletKeyPair = accounts_1.loadWalletKey(keypair);
                return [4 /*yield*/, accounts_1.loadAnchorProgram(walletKeyPair, env)];
            case 1:
                anchorProgram = _b.sent();
                configAddress = new web3_js_1.PublicKey(cacheContent.program.config);
                return [4 /*yield*/, anchorProgram.provider.connection.getAccountInfo(configAddress)];
            case 2:
                config = _b.sent();
                allGood = true;
                keys = Object.keys(cacheContent.items);
                for (i = 0; i < keys.length; i++) {
                    loglevel_1.default.debug('Looking at key ', i);
                    key = keys[i];
                    thisSlice = config.data.slice(constants_1.CONFIG_ARRAY_START + 4 + constants_1.CONFIG_LINE_SIZE * i, constants_1.CONFIG_ARRAY_START + 4 + constants_1.CONFIG_LINE_SIZE * (i + 1));
                    name_1 = various_1.fromUTF8Array(__spreadArray([], __read(thisSlice.slice(4, 36))));
                    uri = various_1.fromUTF8Array(__spreadArray([], __read(thisSlice.slice(40, 240))));
                    cacheItem = cacheContent.items[key];
                    if (!name_1.match(cacheItem.name) || !uri.match(cacheItem.link)) {
                        //leaving here for debugging reasons, but it's pretty useless. if the first upload fails - all others are wrong
                        // log.info(
                        //   `Name (${name}) or uri (${uri}) didnt match cache values of (${cacheItem.name})` +
                        //   `and (${cacheItem.link}). marking to rerun for image`,
                        //   key,
                        // );
                        cacheItem.onChain = false;
                        allGood = false;
                    }
                    else {
                        loglevel_1.default.debug('Name', name_1, 'with', uri, 'checked out');
                    }
                }
                if (!allGood) {
                    cache_1.saveCache(cacheName, env, cacheContent);
                    throw new Error("not all NFTs checked out. check out logs above for details");
                }
                return [4 /*yield*/, anchorProgram.account.config.fetch(configAddress)];
            case 3:
                configData = (_b.sent());
                lineCount = new bn_js_1.default(config.data.slice(247, 247 + 4), undefined, 'le');
                loglevel_1.default.info("uploaded (" + lineCount.toNumber() + ") out of (" + configData.data.maxNumberOfLines + ")");
                if (configData.data.maxNumberOfLines > lineCount.toNumber()) {
                    throw new Error("predefined number of NFTs (" + configData.data.maxNumberOfLines + ") is smaller than the uploaded one (" + lineCount.toNumber() + ")");
                }
                else {
                    loglevel_1.default.info('ready to deploy!');
                }
                cache_1.saveCache(cacheName, env, cacheContent);
                return [2 /*return*/];
        }
    });
}); });
programCommand('verify_price')
    .option('-p, --price <string>')
    .option('--cache-path <string>')
    .action(function (directory, cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, keypair, env, price, cacheName, cachePath, lamports, cacheContent, walletKeyPair, anchorProgram, _b, candyMachine, machine, candyMachineLamports;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = cmd.opts(), keypair = _a.keypair, env = _a.env, price = _a.price, cacheName = _a.cacheName, cachePath = _a.cachePath;
                lamports = various_1.parsePrice(price);
                if (isNaN(lamports)) {
                    return [2 /*return*/, loglevel_1.default.error("verify_price requires a --price to be set")];
                }
                loglevel_1.default.info("Expected price is: " + lamports);
                cacheContent = cache_1.loadCache(cacheName, env, cachePath);
                if (!cacheContent) {
                    return [2 /*return*/, loglevel_1.default.error("No cache found, can't continue. Make sure you are in the correct directory where the assets are located or use the --cache-path option.")];
                }
                walletKeyPair = accounts_1.loadWalletKey(keypair);
                return [4 /*yield*/, accounts_1.loadAnchorProgram(walletKeyPair, env)];
            case 1:
                anchorProgram = _c.sent();
                return [4 /*yield*/, accounts_1.getCandyMachineAddress(new web3_js_1.PublicKey(cacheContent.program.config), cacheContent.program.uuid)];
            case 2:
                _b = __read.apply(void 0, [_c.sent(), 1]), candyMachine = _b[0];
                return [4 /*yield*/, anchorProgram.account.candyMachine.fetch(candyMachine)];
            case 3:
                machine = _c.sent();
                candyMachineLamports = machine.data.price.toNumber();
                loglevel_1.default.info("Candymachine price is: " + candyMachineLamports);
                if (lamports != candyMachineLamports) {
                    throw new Error("Expected price and CandyMachine's price do not match!");
                }
                loglevel_1.default.info("Good to go!");
                return [2 /*return*/];
        }
    });
}); });
programCommand('create_candy_machine')
    .option('-p, --price <string>', 'Price denominated in SOL or spl-token override', '1')
    .option('-t, --spl-token <string>', 'SPL token used to price NFT mint. To use SOL leave this empty.')
    .option('-a, --spl-token-account <string>', 'SPL token account that receives mint payments. Only required if spl-token is specified.')
    .option('-s, --sol-treasury-account <string>', 'SOL account that receives mint payments.')
    .action(function (directory, cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, keypair, env, price, cacheName, splToken, splTokenAccount, solTreasuryAccount, parsedPrice, cacheContent, walletKeyPair, anchorProgram, wallet, remainingAccounts, splTokenKey, splTokenAccountKey, token, mintInfo, tokenAccount, solAccountKey, config, _b, candyMachine, bump;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = cmd.opts(), keypair = _a.keypair, env = _a.env, price = _a.price, cacheName = _a.cacheName, splToken = _a.splToken, splTokenAccount = _a.splTokenAccount, solTreasuryAccount = _a.solTreasuryAccount;
                parsedPrice = various_1.parsePrice(price);
                cacheContent = cache_1.loadCache(cacheName, env);
                walletKeyPair = accounts_1.loadWalletKey(keypair);
                return [4 /*yield*/, accounts_1.loadAnchorProgram(walletKeyPair, env)];
            case 1:
                anchorProgram = _c.sent();
                wallet = walletKeyPair.publicKey;
                remainingAccounts = [];
                if (!(splToken || splTokenAccount)) return [3 /*break*/, 4];
                if (solTreasuryAccount) {
                    throw new Error("If spl-token-account or spl-token is set then sol-treasury-account cannot be set");
                }
                if (!splToken) {
                    throw new Error("If spl-token-account is set, spl-token must also be set");
                }
                splTokenKey = new web3_js_1.PublicKey(splToken);
                splTokenAccountKey = new web3_js_1.PublicKey(splTokenAccount);
                if (!splTokenAccount) {
                    throw new Error("If spl-token is set, spl-token-account must also be set");
                }
                token = new spl_token_1.Token(anchorProgram.provider.connection, splTokenKey, spl_token_1.TOKEN_PROGRAM_ID, walletKeyPair);
                return [4 /*yield*/, token.getMintInfo()];
            case 2:
                mintInfo = _c.sent();
                if (!mintInfo.isInitialized) {
                    throw new Error("The specified spl-token is not initialized");
                }
                return [4 /*yield*/, token.getAccountInfo(splTokenAccountKey)];
            case 3:
                tokenAccount = _c.sent();
                if (!tokenAccount.isInitialized) {
                    throw new Error("The specified spl-token-account is not initialized");
                }
                if (!tokenAccount.mint.equals(splTokenKey)) {
                    throw new Error("The spl-token-account's mint (" + tokenAccount.mint.toString() + ") does not match specified spl-token " + splTokenKey.toString());
                }
                wallet = splTokenAccountKey;
                parsedPrice = various_1.parsePrice(price, Math.pow(10, mintInfo.decimals));
                remainingAccounts.push({ pubkey: splTokenKey, isWritable: false, isSigner: false });
                _c.label = 4;
            case 4:
                if (solTreasuryAccount) {
                    solAccountKey = new web3_js_1.PublicKey(solTreasuryAccount);
                    wallet = solAccountKey;
                }
                config = new web3_js_1.PublicKey(cacheContent.program.config);
                return [4 /*yield*/, accounts_1.getCandyMachineAddress(config, cacheContent.program.uuid)];
            case 5:
                _b = __read.apply(void 0, [_c.sent(), 2]), candyMachine = _b[0], bump = _b[1];
                return [4 /*yield*/, anchorProgram.rpc.initializeCandyMachine(bump, {
                        uuid: cacheContent.program.uuid,
                        price: new anchor.BN(parsedPrice),
                        itemsAvailable: new anchor.BN(Object.keys(cacheContent.items).length),
                        goLiveDate: null,
                    }, {
                        accounts: {
                            candyMachine: candyMachine,
                            wallet: wallet,
                            config: config,
                            authority: walletKeyPair.publicKey,
                            payer: walletKeyPair.publicKey,
                            systemProgram: anchor.web3.SystemProgram.programId,
                            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
                        },
                        signers: [],
                        remainingAccounts: remainingAccounts,
                    })];
            case 6:
                _c.sent();
                cache_1.saveCache(cacheName, env, cacheContent);
                loglevel_1.default.info("create_candy_machine finished. candy machine pubkey: " + candyMachine.toBase58());
                return [2 /*return*/];
        }
    });
}); });
programCommand('update_candy_machine')
    .option('-d, --date <string>', 'timestamp - eg "04 Dec 1995 00:12:00 GMT"')
    .option('-p, --price <string>', 'SOL price')
    .action(function (directory, cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, keypair, env, date, price, cacheName, cacheContent, secondsSinceEpoch, lamports, walletKeyPair, anchorProgram, _b, candyMachine, tx;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = cmd.opts(), keypair = _a.keypair, env = _a.env, date = _a.date, price = _a.price, cacheName = _a.cacheName;
                cacheContent = cache_1.loadCache(cacheName, env);
                secondsSinceEpoch = date ? Date.parse(date) / 1000 : null;
                lamports = price ? various_1.parsePrice(price) : null;
                walletKeyPair = accounts_1.loadWalletKey(keypair);
                return [4 /*yield*/, accounts_1.loadAnchorProgram(walletKeyPair, env)];
            case 1:
                anchorProgram = _c.sent();
                return [4 /*yield*/, accounts_1.getCandyMachineAddress(new web3_js_1.PublicKey(cacheContent.program.config), cacheContent.program.uuid)];
            case 2:
                _b = __read.apply(void 0, [_c.sent(), 1]), candyMachine = _b[0];
                return [4 /*yield*/, anchorProgram.rpc.updateCandyMachine(lamports ? new anchor.BN(lamports) : null, secondsSinceEpoch ? new anchor.BN(secondsSinceEpoch) : null, {
                        accounts: {
                            candyMachine: candyMachine,
                            authority: walletKeyPair.publicKey,
                        },
                    })];
            case 3:
                tx = _c.sent();
                if (date)
                    loglevel_1.default.info(" - updated startDate timestamp: " + secondsSinceEpoch + " (" + date + ")");
                if (lamports)
                    loglevel_1.default.info(" - updated price: " + lamports + " lamports (" + price + " SOL)");
                loglevel_1.default.info('updated_candy_machine Done', tx);
                return [2 /*return*/];
        }
    });
}); });
programCommand('mint_one_token')
    .option('-t, --spl-token-account <string>', 'SPL token account to payfrom')
    .action(function (directory, cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, keypair, env, cacheName, splTokenAccount, cacheContent, configAddress, splTokenAccountKey, tx;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = cmd.opts(), keypair = _a.keypair, env = _a.env, cacheName = _a.cacheName, splTokenAccount = _a.splTokenAccount;
                cacheContent = cache_1.loadCache(cacheName, env);
                configAddress = new web3_js_1.PublicKey(cacheContent.program.config);
                splTokenAccountKey = splTokenAccount ? new web3_js_1.PublicKey(splTokenAccount) : undefined;
                return [4 /*yield*/, mint_1.mint(keypair, env, configAddress, splTokenAccountKey)];
            case 1:
                tx = _b.sent();
                loglevel_1.default.info('Done', tx);
                return [2 /*return*/];
        }
    });
}); });
programCommand('sign')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .option('-m, --metadata <string>', 'base58 metadata account id')
    .action(function (directory, cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, keypair, env, metadata;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = cmd.opts(), keypair = _a.keypair, env = _a.env, metadata = _a.metadata;
                return [4 /*yield*/, sign_1.signMetadata(metadata, keypair, env)];
            case 1:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); });
function programCommand(name) {
    return commander_1.program
        .command(name)
        .option('-e, --env <string>', 'Solana cluster env name', 'devnet')
        .option('-k, --keypair <path>', "Solana wallet location", '--keypair not provided')
        .option('-l, --log-level <string>', 'log level', setLogLevel)
        .option('-c, --cache-name <string>', 'Cache file name', 'temp');
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function setLogLevel(value, prev) {
    if (value === undefined || value === null) {
        return;
    }
    loglevel_1.default.info("setting the log value to: " + value);
    loglevel_1.default.setLevel(value);
}
programCommand("sign_candy_machine_metadata")
    .option('-cndy, --candy-address <string>', 'Candy machine address', '')
    .option('-b, --batch-size <string>', 'Batch size', '10')
    .action(function (directory, cmd) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, keypair, env, cacheName, candyAddress, batchSize, cacheContent, config, _b, candyMachine, bump, batchSizeParsed, walletKeyPair, anchorProgram;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = cmd.opts(), keypair = _a.keypair, env = _a.env, cacheName = _a.cacheName, candyAddress = _a.candyAddress, batchSize = _a.batchSize;
                if (!keypair || keypair == '') {
                    loglevel_1.default.info("Keypair required!");
                    return [2 /*return*/];
                }
                if (!(!candyAddress || candyAddress == '')) return [3 /*break*/, 2];
                loglevel_1.default.info("Candy machine address required! Using from saved list.");
                cacheContent = cache_1.loadCache(cacheName, env);
                config = new web3_js_1.PublicKey(cacheContent.program.config);
                return [4 /*yield*/, accounts_1.getCandyMachineAddress(config, cacheContent.program.uuid)];
            case 1:
                _b = __read.apply(void 0, [_c.sent(), 2]), candyMachine = _b[0], bump = _b[1];
                candyAddress = candyMachine.toBase58();
                _c.label = 2;
            case 2:
                batchSizeParsed = parseInt(batchSize);
                if (!parseInt(batchSize)) {
                    loglevel_1.default.info("Batch size needs to be an integer!");
                    return [2 /*return*/];
                }
                walletKeyPair = accounts_1.loadWalletKey(keypair);
                return [4 /*yield*/, accounts_1.loadAnchorProgram(walletKeyPair, env)];
            case 3:
                anchorProgram = _c.sent();
                loglevel_1.default.info("Creator pubkey: ", walletKeyPair.publicKey.toBase58());
                loglevel_1.default.info("Environment: ", env);
                loglevel_1.default.info("Candy machine address: ", candyAddress);
                loglevel_1.default.info("Batch Size: ", batchSizeParsed);
                return [4 /*yield*/, signAll_1.signAllMetadataFromCandyMachine(anchorProgram.provider.connection, walletKeyPair, candyAddress, batchSizeParsed)];
            case 4:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); });
commander_1.program.parse(process.argv);
