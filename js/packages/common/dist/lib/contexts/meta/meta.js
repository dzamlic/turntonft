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
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMeta = exports.MetaProvider = void 0;
const react_1 = __importStar(require("react"));
const queryExtendedMetadata_1 = require("./queryExtendedMetadata");
const subscribeAccountsChange_1 = require("./subscribeAccountsChange");
const getEmptyMetaState_1 = require("./getEmptyMetaState");
const loadAccounts_1 = require("./loadAccounts");
const connection_1 = require("../connection");
const store_1 = require("../store");
const hooks_1 = require("../../hooks");
const MetaContext = react_1.default.createContext({
    ...getEmptyMetaState_1.getEmptyMetaState(),
    isLoading: false,
});
function MetaProvider({ children = null }) {
    const connection = connection_1.useConnection();
    const { isReady, storeAddress } = store_1.useStore();
    const searchParams = hooks_1.useQuerySearch();
    const all = searchParams.get('all') == 'true';
    const [state, setState] = react_1.useState(getEmptyMetaState_1.getEmptyMetaState());
    const [isLoading, setIsLoading] = react_1.useState(true);
    const updateMints = react_1.useCallback(async (metadataByMint) => {
        try {
            if (!all) {
                const { metadata, mintToMetadata } = await queryExtendedMetadata_1.queryExtendedMetadata(connection, metadataByMint);
                setState(current => ({
                    ...current,
                    metadata,
                    metadataByMint: mintToMetadata,
                }));
            }
        }
        catch (er) {
            console.error(er);
        }
    }, [setState]);
    react_1.useEffect(() => {
        (async () => {
            if (!storeAddress) {
                if (isReady) {
                    setIsLoading(false);
                }
                return;
            }
            else if (!state.store) {
                setIsLoading(true);
            }
            console.log('-----> Query started');
            const nextState = !loadAccounts_1.USE_SPEED_RUN
                ? await loadAccounts_1.loadAccounts(connection, all)
                : await loadAccounts_1.limitedLoadAccounts(connection);
            console.log('------->Query finished');
            setState(nextState);
            setIsLoading(false);
            console.log('------->set finished');
            updateMints(nextState.metadataByMint);
        })();
    }, [connection, setState, updateMints, storeAddress, isReady]);
    react_1.useEffect(() => {
        if (isLoading) {
            return;
        }
        return subscribeAccountsChange_1.subscribeAccountsChange(connection, all, () => state, setState);
    }, [connection, setState, isLoading]);
    // TODO: fetch names dynamically
    // TODO: get names for creators
    // useEffect(() => {
    //   (async () => {
    //     const twitterHandles = await connection.getProgramAccounts(NAME_PROGRAM_ID, {
    //      filters: [
    //        {
    //           dataSize: TWITTER_ACCOUNT_LENGTH,
    //        },
    //        {
    //          memcmp: {
    //           offset: VERIFICATION_AUTHORITY_OFFSET,
    //           bytes: TWITTER_VERIFICATION_AUTHORITY.toBase58()
    //          }
    //        }
    //      ]
    //     });
    //     const handles = twitterHandles.map(t => {
    //       const owner = new PublicKey(t.account.data.slice(32, 64));
    //       const name = t.account.data.slice(96, 114).toString();
    //     });
    //     console.log(handles);
    //   })();
    // }, [whitelistedCreatorsByCreator]);
    return (react_1.default.createElement(MetaContext.Provider, { value: {
            ...state,
            isLoading,
        } }, children));
}
exports.MetaProvider = MetaProvider;
const useMeta = () => {
    const context = react_1.useContext(MetaContext);
    return context;
};
exports.useMeta = useMeta;
//# sourceMappingURL=meta.js.map