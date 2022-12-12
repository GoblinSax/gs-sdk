import { Event, EventFilter, BigNumberish, BytesLike, BigNumber, BaseContract, Signer, CallOverrides, Overrides, ContractTransaction, PopulatedTransaction, utils, ethers } from 'ethers';
import { FunctionFragment, Result, EventFragment } from '@ethersproject/abi';
import { Listener, Provider } from '@ethersproject/providers';

interface TypedEvent<TArgsArray extends Array<any> = any, TArgsObject = any> extends Event {
    args: TArgsArray & TArgsObject;
}
interface TypedEventFilter<_TEvent extends TypedEvent> extends EventFilter {
}
interface TypedListener<TEvent extends TypedEvent> {
    (...listenerArg: [...__TypechainArgsArray<TEvent>, TEvent]): void;
}
type __TypechainArgsArray<T> = T extends TypedEvent<infer U> ? U : never;
interface OnEvent<TRes> {
    <TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>, listener: TypedListener<TEvent>): TRes;
    (eventName: string, listener: Listener): TRes;
}
type PromiseOrValue<T> = T | Promise<T>;

type OfferStruct = {
    loanPrincipalAmount: PromiseOrValue<BigNumberish>;
    maximumRepaymentAmount: PromiseOrValue<BigNumberish>;
    nftCollateralId: PromiseOrValue<BigNumberish>;
    nftCollateralContract: PromiseOrValue<string>;
    loanDuration: PromiseOrValue<BigNumberish>;
    loanAdminFeeInBasisPoints: PromiseOrValue<BigNumberish>;
    loanERC20Denomination: PromiseOrValue<string>;
    referrer: PromiseOrValue<string>;
};
type OfferStructOutput = [
    BigNumber,
    BigNumber,
    BigNumber,
    string,
    number,
    number,
    string,
    string
] & {
    loanPrincipalAmount: BigNumber;
    maximumRepaymentAmount: BigNumber;
    nftCollateralId: BigNumber;
    nftCollateralContract: string;
    loanDuration: number;
    loanAdminFeeInBasisPoints: number;
    loanERC20Denomination: string;
    referrer: string;
};
type SignatureStruct = {
    nonce: PromiseOrValue<BigNumberish>;
    expiry: PromiseOrValue<BigNumberish>;
    signer: PromiseOrValue<string>;
    signature: PromiseOrValue<BytesLike>;
};
type SignatureStructOutput = [BigNumber, BigNumber, string, string] & {
    nonce: BigNumber;
    expiry: BigNumber;
    signer: string;
    signature: string;
};
type BorrowerSettingsStruct = {
    revenueSharePartner: PromiseOrValue<string>;
    referralFeeInBasisPoints: PromiseOrValue<BigNumberish>;
};
type BorrowerSettingsStructOutput = [string, number] & {
    revenueSharePartner: string;
    referralFeeInBasisPoints: number;
};
interface BnplInterface extends utils.Interface {
    functions: {
        "ASSET_TYPE_ERC1155()": FunctionFragment;
        "ASSET_TYPE_ERC721()": FunctionFragment;
        "HUNDRED_PERCENT()": FunctionFragment;
        "acceptOwnership()": FunctionFragment;
        "execute((address,bytes32,bytes,uint256,address,address,(uint256,uint256,uint256,bytes),(uint256,uint256,uint256,address,uint32,uint16,address,address),(uint256,uint256,address,bytes),(address,uint16)))": FunctionFragment;
        "feeReceiver()": FunctionFragment;
        "getChainID()": FunctionFragment;
        "getLoanCap(uint256)": FunctionFragment;
        "invalidateNonce(uint256)": FunctionFragment;
        "isModuleAllowed(address)": FunctionFragment;
        "isValidNonce(address,uint256)": FunctionFragment;
        "loanCapBps()": FunctionFragment;
        "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)": FunctionFragment;
        "onERC1155Received(address,address,uint256,uint256,bytes)": FunctionFragment;
        "onERC721Received(address,address,uint256,bytes)": FunctionFragment;
        "owner()": FunctionFragment;
        "pendingOwner()": FunctionFragment;
        "renounceOwnership()": FunctionFragment;
        "setFeeReceiver(address)": FunctionFragment;
        "setLoanCapBps(uint256)": FunctionFragment;
        "setModuleAllowance(address,bool)": FunctionFragment;
        "supportsInterface(bytes4)": FunctionFragment;
        "transferOwnership(address)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "ASSET_TYPE_ERC1155" | "ASSET_TYPE_ERC721" | "HUNDRED_PERCENT" | "acceptOwnership" | "execute" | "feeReceiver" | "getChainID" | "getLoanCap" | "invalidateNonce" | "isModuleAllowed" | "isValidNonce" | "loanCapBps" | "onERC1155BatchReceived" | "onERC1155Received" | "onERC721Received" | "owner" | "pendingOwner" | "renounceOwnership" | "setFeeReceiver" | "setLoanCapBps" | "setModuleAllowance" | "supportsInterface" | "transferOwnership"): FunctionFragment;
    encodeFunctionData(functionFragment: "ASSET_TYPE_ERC1155", values?: undefined): string;
    encodeFunctionData(functionFragment: "ASSET_TYPE_ERC721", values?: undefined): string;
    encodeFunctionData(functionFragment: "HUNDRED_PERCENT", values?: undefined): string;
    encodeFunctionData(functionFragment: "acceptOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "execute", values: [Bnpl.ExecutionStruct]): string;
    encodeFunctionData(functionFragment: "feeReceiver", values?: undefined): string;
    encodeFunctionData(functionFragment: "getChainID", values?: undefined): string;
    encodeFunctionData(functionFragment: "getLoanCap", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "invalidateNonce", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "isModuleAllowed", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "isValidNonce", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "loanCapBps", values?: undefined): string;
    encodeFunctionData(functionFragment: "onERC1155BatchReceived", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>[],
        PromiseOrValue<BigNumberish>[],
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "onERC1155Received", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "onERC721Received", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "pendingOwner", values?: undefined): string;
    encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
    encodeFunctionData(functionFragment: "setFeeReceiver", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setLoanCapBps", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "setModuleAllowance", values: [PromiseOrValue<string>, PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [PromiseOrValue<string>]): string;
    decodeFunctionResult(functionFragment: "ASSET_TYPE_ERC1155", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ASSET_TYPE_ERC721", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "HUNDRED_PERCENT", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "acceptOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "execute", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "feeReceiver", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getChainID", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getLoanCap", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "invalidateNonce", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isModuleAllowed", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isValidNonce", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "loanCapBps", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "onERC1155BatchReceived", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "onERC1155Received", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "onERC721Received", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pendingOwner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setFeeReceiver", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setLoanCapBps", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setModuleAllowance", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    events: {
        "BnplExecuted(address,address,uint256,address,uint256)": EventFragment;
        "ModuleAllowance(address,bool)": EventFragment;
        "OwnershipTransferStarted(address,address)": EventFragment;
        "OwnershipTransferred(address,address)": EventFragment;
        "SetAllowedMarketModules(address)": EventFragment;
        "SetFeeReceiver(address)": EventFragment;
        "SetLoanCap(uint256)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "BnplExecuted"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ModuleAllowance"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferStarted"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SetAllowedMarketModules"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SetFeeReceiver"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "SetLoanCap"): EventFragment;
}
interface BnplExecutedEventObject {
    borrower: string;
    lender: string;
    loanId: BigNumber;
    obligationReceipt: string;
    smartNftId: BigNumber;
}
type BnplExecutedEvent = TypedEvent<[
    string,
    string,
    BigNumber,
    string,
    BigNumber
], BnplExecutedEventObject>;
type BnplExecutedEventFilter = TypedEventFilter<BnplExecutedEvent>;
interface ModuleAllowanceEventObject {
    module: string;
    allowed: boolean;
}
type ModuleAllowanceEvent = TypedEvent<[
    string,
    boolean
], ModuleAllowanceEventObject>;
type ModuleAllowanceEventFilter = TypedEventFilter<ModuleAllowanceEvent>;
interface OwnershipTransferStartedEventObject {
    previousOwner: string;
    newOwner: string;
}
type OwnershipTransferStartedEvent = TypedEvent<[
    string,
    string
], OwnershipTransferStartedEventObject>;
type OwnershipTransferStartedEventFilter = TypedEventFilter<OwnershipTransferStartedEvent>;
interface OwnershipTransferredEventObject$1 {
    previousOwner: string;
    newOwner: string;
}
type OwnershipTransferredEvent$1 = TypedEvent<[
    string,
    string
], OwnershipTransferredEventObject$1>;
type OwnershipTransferredEventFilter$1 = TypedEventFilter<OwnershipTransferredEvent$1>;
interface SetAllowedMarketModulesEventObject {
    module: string;
}
type SetAllowedMarketModulesEvent = TypedEvent<[
    string
], SetAllowedMarketModulesEventObject>;
type SetAllowedMarketModulesEventFilter = TypedEventFilter<SetAllowedMarketModulesEvent>;
interface SetFeeReceiverEventObject {
    feeReceiver: string;
}
type SetFeeReceiverEvent = TypedEvent<[
    string
], SetFeeReceiverEventObject>;
type SetFeeReceiverEventFilter = TypedEventFilter<SetFeeReceiverEvent>;
interface SetLoanCapEventObject {
    loanCap: BigNumber;
}
type SetLoanCapEvent = TypedEvent<[BigNumber], SetLoanCapEventObject>;
type SetLoanCapEventFilter = TypedEventFilter<SetLoanCapEvent>;
declare namespace Bnpl {
    type ServiceFeeStruct = {
        amount: PromiseOrValue<BigNumberish>;
        nonce: PromiseOrValue<BigNumberish>;
        expiry: PromiseOrValue<BigNumberish>;
        signature: PromiseOrValue<BytesLike>;
    };
    type ServiceFeeStructOutput = [
        BigNumber,
        BigNumber,
        BigNumber,
        string
    ] & {
        amount: BigNumber;
        nonce: BigNumber;
        expiry: BigNumber;
        signature: string;
    };
    type ExecutionStruct = {
        module: PromiseOrValue<string>;
        assetType: PromiseOrValue<BytesLike>;
        buyData: PromiseOrValue<BytesLike>;
        totalPrice: PromiseOrValue<BigNumberish>;
        loanContract: PromiseOrValue<string>;
        loanCoordinator: PromiseOrValue<string>;
        serviceFeeData: Bnpl.ServiceFeeStruct;
        offer: OfferStruct;
        lenderSignature: SignatureStruct;
        borrowerSettings: BorrowerSettingsStruct;
    };
    type ExecutionStructOutput = [
        string,
        string,
        string,
        BigNumber,
        string,
        string,
        Bnpl.ServiceFeeStructOutput,
        OfferStructOutput,
        SignatureStructOutput,
        BorrowerSettingsStructOutput
    ] & {
        module: string;
        assetType: string;
        buyData: string;
        totalPrice: BigNumber;
        loanContract: string;
        loanCoordinator: string;
        serviceFeeData: Bnpl.ServiceFeeStructOutput;
        offer: OfferStructOutput;
        lenderSignature: SignatureStructOutput;
        borrowerSettings: BorrowerSettingsStructOutput;
    };
}
interface Bnpl extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: BnplInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        ASSET_TYPE_ERC1155(overrides?: CallOverrides): Promise<[string]>;
        ASSET_TYPE_ERC721(overrides?: CallOverrides): Promise<[string]>;
        HUNDRED_PERCENT(overrides?: CallOverrides): Promise<[BigNumber]>;
        acceptOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        execute(_params: Bnpl.ExecutionStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        feeReceiver(overrides?: CallOverrides): Promise<[string]>;
        getChainID(overrides?: CallOverrides): Promise<[BigNumber]>;
        getLoanCap(_price: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        invalidateNonce(_nonce: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        isModuleAllowed(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        isValidNonce(_lender: PromiseOrValue<string>, _nonce: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean]>;
        loanCapBps(overrides?: CallOverrides): Promise<[BigNumber]>;
        onERC1155BatchReceived(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>[], arg3: PromiseOrValue<BigNumberish>[], arg4: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        onERC1155Received(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BigNumberish>, arg4: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        onERC721Received(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        pendingOwner(overrides?: CallOverrides): Promise<[string]>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setFeeReceiver(_feeReceiver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setLoanCapBps(_loanCapBps: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setModuleAllowance(_module: PromiseOrValue<string>, _allowed: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        supportsInterface(_interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    ASSET_TYPE_ERC1155(overrides?: CallOverrides): Promise<string>;
    ASSET_TYPE_ERC721(overrides?: CallOverrides): Promise<string>;
    HUNDRED_PERCENT(overrides?: CallOverrides): Promise<BigNumber>;
    acceptOwnership(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    execute(_params: Bnpl.ExecutionStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    feeReceiver(overrides?: CallOverrides): Promise<string>;
    getChainID(overrides?: CallOverrides): Promise<BigNumber>;
    getLoanCap(_price: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    invalidateNonce(_nonce: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    isModuleAllowed(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    isValidNonce(_lender: PromiseOrValue<string>, _nonce: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
    loanCapBps(overrides?: CallOverrides): Promise<BigNumber>;
    onERC1155BatchReceived(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>[], arg3: PromiseOrValue<BigNumberish>[], arg4: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    onERC1155Received(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BigNumberish>, arg4: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    onERC721Received(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    owner(overrides?: CallOverrides): Promise<string>;
    pendingOwner(overrides?: CallOverrides): Promise<string>;
    renounceOwnership(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setFeeReceiver(_feeReceiver: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setLoanCapBps(_loanCapBps: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setModuleAllowance(_module: PromiseOrValue<string>, _allowed: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    supportsInterface(_interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        ASSET_TYPE_ERC1155(overrides?: CallOverrides): Promise<string>;
        ASSET_TYPE_ERC721(overrides?: CallOverrides): Promise<string>;
        HUNDRED_PERCENT(overrides?: CallOverrides): Promise<BigNumber>;
        acceptOwnership(overrides?: CallOverrides): Promise<void>;
        execute(_params: Bnpl.ExecutionStruct, overrides?: CallOverrides): Promise<boolean>;
        feeReceiver(overrides?: CallOverrides): Promise<string>;
        getChainID(overrides?: CallOverrides): Promise<BigNumber>;
        getLoanCap(_price: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        invalidateNonce(_nonce: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        isModuleAllowed(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        isValidNonce(_lender: PromiseOrValue<string>, _nonce: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        loanCapBps(overrides?: CallOverrides): Promise<BigNumber>;
        onERC1155BatchReceived(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>[], arg3: PromiseOrValue<BigNumberish>[], arg4: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        onERC1155Received(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BigNumberish>, arg4: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        onERC721Received(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        owner(overrides?: CallOverrides): Promise<string>;
        pendingOwner(overrides?: CallOverrides): Promise<string>;
        renounceOwnership(overrides?: CallOverrides): Promise<void>;
        setFeeReceiver(_feeReceiver: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        setLoanCapBps(_loanCapBps: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        setModuleAllowance(_module: PromiseOrValue<string>, _allowed: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<void>;
        supportsInterface(_interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "BnplExecuted(address,address,uint256,address,uint256)"(borrower?: PromiseOrValue<string> | null, lender?: PromiseOrValue<string> | null, loanId?: null, obligationReceipt?: null, smartNftId?: null): BnplExecutedEventFilter;
        BnplExecuted(borrower?: PromiseOrValue<string> | null, lender?: PromiseOrValue<string> | null, loanId?: null, obligationReceipt?: null, smartNftId?: null): BnplExecutedEventFilter;
        "ModuleAllowance(address,bool)"(module?: PromiseOrValue<string> | null, allowed?: null): ModuleAllowanceEventFilter;
        ModuleAllowance(module?: PromiseOrValue<string> | null, allowed?: null): ModuleAllowanceEventFilter;
        "OwnershipTransferStarted(address,address)"(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferStartedEventFilter;
        OwnershipTransferStarted(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferStartedEventFilter;
        "OwnershipTransferred(address,address)"(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter$1;
        OwnershipTransferred(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter$1;
        "SetAllowedMarketModules(address)"(module?: PromiseOrValue<string> | null): SetAllowedMarketModulesEventFilter;
        SetAllowedMarketModules(module?: PromiseOrValue<string> | null): SetAllowedMarketModulesEventFilter;
        "SetFeeReceiver(address)"(feeReceiver?: PromiseOrValue<string> | null): SetFeeReceiverEventFilter;
        SetFeeReceiver(feeReceiver?: PromiseOrValue<string> | null): SetFeeReceiverEventFilter;
        "SetLoanCap(uint256)"(loanCap?: null): SetLoanCapEventFilter;
        SetLoanCap(loanCap?: null): SetLoanCapEventFilter;
    };
    estimateGas: {
        ASSET_TYPE_ERC1155(overrides?: CallOverrides): Promise<BigNumber>;
        ASSET_TYPE_ERC721(overrides?: CallOverrides): Promise<BigNumber>;
        HUNDRED_PERCENT(overrides?: CallOverrides): Promise<BigNumber>;
        acceptOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        execute(_params: Bnpl.ExecutionStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        feeReceiver(overrides?: CallOverrides): Promise<BigNumber>;
        getChainID(overrides?: CallOverrides): Promise<BigNumber>;
        getLoanCap(_price: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        invalidateNonce(_nonce: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        isModuleAllowed(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        isValidNonce(_lender: PromiseOrValue<string>, _nonce: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        loanCapBps(overrides?: CallOverrides): Promise<BigNumber>;
        onERC1155BatchReceived(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>[], arg3: PromiseOrValue<BigNumberish>[], arg4: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        onERC1155Received(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BigNumberish>, arg4: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        onERC721Received(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        pendingOwner(overrides?: CallOverrides): Promise<BigNumber>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setFeeReceiver(_feeReceiver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setLoanCapBps(_loanCapBps: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setModuleAllowance(_module: PromiseOrValue<string>, _allowed: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        supportsInterface(_interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        ASSET_TYPE_ERC1155(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        ASSET_TYPE_ERC721(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        HUNDRED_PERCENT(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        acceptOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        execute(_params: Bnpl.ExecutionStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        feeReceiver(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getChainID(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getLoanCap(_price: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        invalidateNonce(_nonce: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        isModuleAllowed(arg0: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isValidNonce(_lender: PromiseOrValue<string>, _nonce: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        loanCapBps(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        onERC1155BatchReceived(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>[], arg3: PromiseOrValue<BigNumberish>[], arg4: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        onERC1155Received(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BigNumberish>, arg4: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        onERC721Received(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        pendingOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        renounceOwnership(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setFeeReceiver(_feeReceiver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setLoanCapBps(_loanCapBps: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setModuleAllowance(_module: PromiseOrValue<string>, _allowed: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        supportsInterface(_interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transferOwnership(newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}

interface Erc20Interface extends utils.Interface {
    functions: {
        "name()": FunctionFragment;
        "approve(address,uint256)": FunctionFragment;
        "totalSupply()": FunctionFragment;
        "transferFrom(address,address,uint256)": FunctionFragment;
        "decimals()": FunctionFragment;
        "balanceOf(address)": FunctionFragment;
        "symbol()": FunctionFragment;
        "transfer(address,uint256)": FunctionFragment;
        "allowance(address,address)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "name" | "approve" | "totalSupply" | "transferFrom" | "decimals" | "balanceOf" | "symbol" | "transfer" | "allowance"): FunctionFragment;
    encodeFunctionData(functionFragment: "name", values?: undefined): string;
    encodeFunctionData(functionFragment: "approve", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "totalSupply", values?: undefined): string;
    encodeFunctionData(functionFragment: "transferFrom", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "decimals", values?: undefined): string;
    encodeFunctionData(functionFragment: "balanceOf", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
    encodeFunctionData(functionFragment: "transfer", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "allowance", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "totalSupply", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "decimals", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "allowance", data: BytesLike): Result;
    events: {
        "Approval(address,address,uint256)": EventFragment;
        "Transfer(address,address,uint256)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}
interface ApprovalEventObject$1 {
    owner: string;
    spender: string;
    value: BigNumber;
}
type ApprovalEvent$1 = TypedEvent<[
    string,
    string,
    BigNumber
], ApprovalEventObject$1>;
type ApprovalEventFilter$1 = TypedEventFilter<ApprovalEvent$1>;
interface TransferEventObject$1 {
    from: string;
    to: string;
    value: BigNumber;
}
type TransferEvent$1 = TypedEvent<[
    string,
    string,
    BigNumber
], TransferEventObject$1>;
type TransferEventFilter$1 = TypedEventFilter<TransferEvent$1>;
interface Erc20 extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: Erc20Interface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        name(overrides?: CallOverrides): Promise<[string]>;
        approve(_spender: PromiseOrValue<string>, _value: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        totalSupply(overrides?: CallOverrides): Promise<[BigNumber]>;
        transferFrom(_from: PromiseOrValue<string>, _to: PromiseOrValue<string>, _value: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        decimals(overrides?: CallOverrides): Promise<[number]>;
        balanceOf(_owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber] & {
            balance: BigNumber;
        }>;
        symbol(overrides?: CallOverrides): Promise<[string]>;
        transfer(_to: PromiseOrValue<string>, _value: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        allowance(_owner: PromiseOrValue<string>, _spender: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
    };
    name(overrides?: CallOverrides): Promise<string>;
    approve(_spender: PromiseOrValue<string>, _value: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
    transferFrom(_from: PromiseOrValue<string>, _to: PromiseOrValue<string>, _value: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    decimals(overrides?: CallOverrides): Promise<number>;
    balanceOf(_owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    symbol(overrides?: CallOverrides): Promise<string>;
    transfer(_to: PromiseOrValue<string>, _value: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    allowance(_owner: PromiseOrValue<string>, _spender: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    callStatic: {
        name(overrides?: CallOverrides): Promise<string>;
        approve(_spender: PromiseOrValue<string>, _value: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
        transferFrom(_from: PromiseOrValue<string>, _to: PromiseOrValue<string>, _value: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        decimals(overrides?: CallOverrides): Promise<number>;
        balanceOf(_owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        symbol(overrides?: CallOverrides): Promise<string>;
        transfer(_to: PromiseOrValue<string>, _value: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        allowance(_owner: PromiseOrValue<string>, _spender: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    filters: {
        "Approval(address,address,uint256)"(owner?: PromiseOrValue<string> | null, spender?: PromiseOrValue<string> | null, value?: null): ApprovalEventFilter$1;
        Approval(owner?: PromiseOrValue<string> | null, spender?: PromiseOrValue<string> | null, value?: null): ApprovalEventFilter$1;
        "Transfer(address,address,uint256)"(from?: PromiseOrValue<string> | null, to?: PromiseOrValue<string> | null, value?: null): TransferEventFilter$1;
        Transfer(from?: PromiseOrValue<string> | null, to?: PromiseOrValue<string> | null, value?: null): TransferEventFilter$1;
    };
    estimateGas: {
        name(overrides?: CallOverrides): Promise<BigNumber>;
        approve(_spender: PromiseOrValue<string>, _value: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        totalSupply(overrides?: CallOverrides): Promise<BigNumber>;
        transferFrom(_from: PromiseOrValue<string>, _to: PromiseOrValue<string>, _value: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        decimals(overrides?: CallOverrides): Promise<BigNumber>;
        balanceOf(_owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        symbol(overrides?: CallOverrides): Promise<BigNumber>;
        transfer(_to: PromiseOrValue<string>, _value: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        allowance(_owner: PromiseOrValue<string>, _spender: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    };
    populateTransaction: {
        name(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        approve(_spender: PromiseOrValue<string>, _value: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        totalSupply(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transferFrom(_from: PromiseOrValue<string>, _to: PromiseOrValue<string>, _value: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        decimals(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        balanceOf(_owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transfer(_to: PromiseOrValue<string>, _value: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        allowance(_owner: PromiseOrValue<string>, _spender: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
    };
}

declare namespace LoanData {
    type LoanTermsStruct = {
        loanPrincipalAmount: PromiseOrValue<BigNumberish>;
        maximumRepaymentAmount: PromiseOrValue<BigNumberish>;
        nftCollateralId: PromiseOrValue<BigNumberish>;
        loanERC20Denomination: PromiseOrValue<string>;
        loanDuration: PromiseOrValue<BigNumberish>;
        loanInterestRateForDurationInBasisPoints: PromiseOrValue<BigNumberish>;
        loanAdminFeeInBasisPoints: PromiseOrValue<BigNumberish>;
        nftCollateralWrapper: PromiseOrValue<string>;
        loanStartTime: PromiseOrValue<BigNumberish>;
        nftCollateralContract: PromiseOrValue<string>;
        borrower: PromiseOrValue<string>;
    };
    type LoanTermsStructOutput = [
        BigNumber,
        BigNumber,
        BigNumber,
        string,
        number,
        number,
        number,
        string,
        BigNumber,
        string,
        string
    ] & {
        loanPrincipalAmount: BigNumber;
        maximumRepaymentAmount: BigNumber;
        nftCollateralId: BigNumber;
        loanERC20Denomination: string;
        loanDuration: number;
        loanInterestRateForDurationInBasisPoints: number;
        loanAdminFeeInBasisPoints: number;
        nftCollateralWrapper: string;
        loanStartTime: BigNumber;
        nftCollateralContract: string;
        borrower: string;
    };
    type LoanExtrasStruct = {
        revenueSharePartner: PromiseOrValue<string>;
        revenueShareInBasisPoints: PromiseOrValue<BigNumberish>;
        referralFeeInBasisPoints: PromiseOrValue<BigNumberish>;
    };
    type LoanExtrasStructOutput = [string, number, number] & {
        revenueSharePartner: string;
        revenueShareInBasisPoints: number;
        referralFeeInBasisPoints: number;
    };
    type OfferStruct = {
        loanPrincipalAmount: PromiseOrValue<BigNumberish>;
        maximumRepaymentAmount: PromiseOrValue<BigNumberish>;
        nftCollateralId: PromiseOrValue<BigNumberish>;
        nftCollateralContract: PromiseOrValue<string>;
        loanDuration: PromiseOrValue<BigNumberish>;
        loanAdminFeeInBasisPoints: PromiseOrValue<BigNumberish>;
        loanERC20Denomination: PromiseOrValue<string>;
        referrer: PromiseOrValue<string>;
    };
    type OfferStructOutput = [
        BigNumber,
        BigNumber,
        BigNumber,
        string,
        number,
        number,
        string,
        string
    ] & {
        loanPrincipalAmount: BigNumber;
        maximumRepaymentAmount: BigNumber;
        nftCollateralId: BigNumber;
        nftCollateralContract: string;
        loanDuration: number;
        loanAdminFeeInBasisPoints: number;
        loanERC20Denomination: string;
        referrer: string;
    };
    type SignatureStruct = {
        nonce: PromiseOrValue<BigNumberish>;
        expiry: PromiseOrValue<BigNumberish>;
        signer: PromiseOrValue<string>;
        signature: PromiseOrValue<BytesLike>;
    };
    type SignatureStructOutput = [BigNumber, BigNumber, string, string] & {
        nonce: BigNumber;
        expiry: BigNumber;
        signer: string;
        signature: string;
    };
    type BorrowerSettingsStruct = {
        revenueSharePartner: PromiseOrValue<string>;
        referralFeeInBasisPoints: PromiseOrValue<BigNumberish>;
    };
    type BorrowerSettingsStructOutput = [string, number] & {
        revenueSharePartner: string;
        referralFeeInBasisPoints: number;
    };
}
interface NftfiInterface extends utils.Interface {
    functions: {
        "HUNDRED_PERCENT()": FunctionFragment;
        "LOAN_COORDINATOR()": FunctionFragment;
        "LOAN_TYPE()": FunctionFragment;
        "acceptOffer((uint256,uint256,uint256,address,uint32,uint16,address,address),(uint256,uint256,address,bytes),(address,uint16))": FunctionFragment;
        "adminFeeInBasisPoints()": FunctionFragment;
        "cancelLoanCommitmentBeforeLoanHasBegun(uint256)": FunctionFragment;
        "drainERC1155Airdrop(address,uint256,address)": FunctionFragment;
        "drainERC20Airdrop(address,address)": FunctionFragment;
        "drainERC721Airdrop(address,uint256,address)": FunctionFragment;
        "getERC20Permit(address)": FunctionFragment;
        "getPayoffAmount(uint32)": FunctionFragment;
        "getWhetherNonceHasBeenUsedForUser(address,uint256)": FunctionFragment;
        "hub()": FunctionFragment;
        "liquidateOverdueLoan(uint32)": FunctionFragment;
        "loanIdToLoan(uint32)": FunctionFragment;
        "loanIdToLoanExtras(uint32)": FunctionFragment;
        "loanRepaidOrLiquidated(uint32)": FunctionFragment;
        "maximumLoanDuration()": FunctionFragment;
        "mintObligationReceipt(uint32)": FunctionFragment;
        "onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)": FunctionFragment;
        "onERC1155Received(address,address,uint256,uint256,bytes)": FunctionFragment;
        "onERC721Received(address,address,uint256,bytes)": FunctionFragment;
        "owner()": FunctionFragment;
        "pause()": FunctionFragment;
        "paused()": FunctionFragment;
        "payBackLoan(uint32)": FunctionFragment;
        "pullAirdrop(uint32,address,bytes,address,uint256,bool,uint256)": FunctionFragment;
        "renegotiateLoan(uint32,uint32,uint256,uint256,uint256,uint256,bytes)": FunctionFragment;
        "setERC20Permit(address,bool)": FunctionFragment;
        "setERC20Permits(address[],bool[])": FunctionFragment;
        "supportsInterface(bytes4)": FunctionFragment;
        "transferOwnership(address)": FunctionFragment;
        "unpause()": FunctionFragment;
        "updateAdminFee(uint16)": FunctionFragment;
        "updateMaximumLoanDuration(uint256)": FunctionFragment;
        "wrapCollateral(uint32)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "HUNDRED_PERCENT" | "LOAN_COORDINATOR" | "LOAN_TYPE" | "acceptOffer" | "adminFeeInBasisPoints" | "cancelLoanCommitmentBeforeLoanHasBegun" | "drainERC1155Airdrop" | "drainERC20Airdrop" | "drainERC721Airdrop" | "getERC20Permit" | "getPayoffAmount" | "getWhetherNonceHasBeenUsedForUser" | "hub" | "liquidateOverdueLoan" | "loanIdToLoan" | "loanIdToLoanExtras" | "loanRepaidOrLiquidated" | "maximumLoanDuration" | "mintObligationReceipt" | "onERC1155BatchReceived" | "onERC1155Received" | "onERC721Received" | "owner" | "pause" | "paused" | "payBackLoan" | "pullAirdrop" | "renegotiateLoan" | "setERC20Permit" | "setERC20Permits" | "supportsInterface" | "transferOwnership" | "unpause" | "updateAdminFee" | "updateMaximumLoanDuration" | "wrapCollateral"): FunctionFragment;
    encodeFunctionData(functionFragment: "HUNDRED_PERCENT", values?: undefined): string;
    encodeFunctionData(functionFragment: "LOAN_COORDINATOR", values?: undefined): string;
    encodeFunctionData(functionFragment: "LOAN_TYPE", values?: undefined): string;
    encodeFunctionData(functionFragment: "acceptOffer", values: [
        LoanData.OfferStruct,
        LoanData.SignatureStruct,
        LoanData.BorrowerSettingsStruct
    ]): string;
    encodeFunctionData(functionFragment: "adminFeeInBasisPoints", values?: undefined): string;
    encodeFunctionData(functionFragment: "cancelLoanCommitmentBeforeLoanHasBegun", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "drainERC1155Airdrop", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "drainERC20Airdrop", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "drainERC721Airdrop", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>
    ]): string;
    encodeFunctionData(functionFragment: "getERC20Permit", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "getPayoffAmount", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getWhetherNonceHasBeenUsedForUser", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "hub", values?: undefined): string;
    encodeFunctionData(functionFragment: "liquidateOverdueLoan", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "loanIdToLoan", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "loanIdToLoanExtras", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "loanRepaidOrLiquidated", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "maximumLoanDuration", values?: undefined): string;
    encodeFunctionData(functionFragment: "mintObligationReceipt", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "onERC1155BatchReceived", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>[],
        PromiseOrValue<BigNumberish>[],
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "onERC1155Received", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "onERC721Received", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "owner", values?: undefined): string;
    encodeFunctionData(functionFragment: "pause", values?: undefined): string;
    encodeFunctionData(functionFragment: "paused", values?: undefined): string;
    encodeFunctionData(functionFragment: "payBackLoan", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "pullAirdrop", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<string>,
        PromiseOrValue<BytesLike>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<boolean>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "renegotiateLoan", values: [
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "setERC20Permit", values: [PromiseOrValue<string>, PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "setERC20Permits", values: [PromiseOrValue<string>[], PromiseOrValue<boolean>[]]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "transferOwnership", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "unpause", values?: undefined): string;
    encodeFunctionData(functionFragment: "updateAdminFee", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "updateMaximumLoanDuration", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "wrapCollateral", values: [PromiseOrValue<BigNumberish>]): string;
    decodeFunctionResult(functionFragment: "HUNDRED_PERCENT", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "LOAN_COORDINATOR", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "LOAN_TYPE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "acceptOffer", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "adminFeeInBasisPoints", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "cancelLoanCommitmentBeforeLoanHasBegun", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "drainERC1155Airdrop", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "drainERC20Airdrop", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "drainERC721Airdrop", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getERC20Permit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getPayoffAmount", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getWhetherNonceHasBeenUsedForUser", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hub", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "liquidateOverdueLoan", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "loanIdToLoan", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "loanIdToLoanExtras", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "loanRepaidOrLiquidated", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "maximumLoanDuration", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mintObligationReceipt", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "onERC1155BatchReceived", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "onERC1155Received", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "onERC721Received", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pause", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "paused", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "payBackLoan", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "pullAirdrop", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renegotiateLoan", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setERC20Permit", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setERC20Permits", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "unpause", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateAdminFee", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "updateMaximumLoanDuration", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "wrapCollateral", data: BytesLike): Result;
    events: {
        "AdminFeeUpdated(uint16)": EventFragment;
        "ERC20Permit(address,bool)": EventFragment;
        "LoanLiquidated(uint32,address,address,uint256,uint256,uint256,uint256,address)": EventFragment;
        "LoanRenegotiated(uint32,address,address,uint32,uint256,uint256,uint256)": EventFragment;
        "LoanRepaid(uint32,address,address,uint256,uint256,uint256,uint256,uint256,address,address,address)": EventFragment;
        "LoanStarted(uint32,address,address,tuple,tuple)": EventFragment;
        "MaximumLoanDurationUpdated(uint256)": EventFragment;
        "OwnershipTransferred(address,address)": EventFragment;
        "Paused(address)": EventFragment;
        "Unpaused(address)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "AdminFeeUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ERC20Permit"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "LoanLiquidated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "LoanRenegotiated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "LoanRepaid"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "LoanStarted"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "MaximumLoanDurationUpdated"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Paused"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Unpaused"): EventFragment;
}
interface AdminFeeUpdatedEventObject {
    newAdminFee: number;
}
type AdminFeeUpdatedEvent = TypedEvent<[
    number
], AdminFeeUpdatedEventObject>;
type AdminFeeUpdatedEventFilter = TypedEventFilter<AdminFeeUpdatedEvent>;
interface ERC20PermitEventObject {
    erc20Contract: string;
    isPermitted: boolean;
}
type ERC20PermitEvent = TypedEvent<[
    string,
    boolean
], ERC20PermitEventObject>;
type ERC20PermitEventFilter = TypedEventFilter<ERC20PermitEvent>;
interface LoanLiquidatedEventObject {
    loanId: number;
    borrower: string;
    lender: string;
    loanPrincipalAmount: BigNumber;
    nftCollateralId: BigNumber;
    loanMaturityDate: BigNumber;
    loanLiquidationDate: BigNumber;
    nftCollateralContract: string;
}
type LoanLiquidatedEvent = TypedEvent<[
    number,
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    string
], LoanLiquidatedEventObject>;
type LoanLiquidatedEventFilter = TypedEventFilter<LoanLiquidatedEvent>;
interface LoanRenegotiatedEventObject {
    loanId: number;
    borrower: string;
    lender: string;
    newLoanDuration: number;
    newMaximumRepaymentAmount: BigNumber;
    renegotiationFee: BigNumber;
    renegotiationAdminFee: BigNumber;
}
type LoanRenegotiatedEvent = TypedEvent<[
    number,
    string,
    string,
    number,
    BigNumber,
    BigNumber,
    BigNumber
], LoanRenegotiatedEventObject>;
type LoanRenegotiatedEventFilter = TypedEventFilter<LoanRenegotiatedEvent>;
interface LoanRepaidEventObject {
    loanId: number;
    borrower: string;
    lender: string;
    loanPrincipalAmount: BigNumber;
    nftCollateralId: BigNumber;
    amountPaidToLender: BigNumber;
    adminFee: BigNumber;
    revenueShare: BigNumber;
    revenueSharePartner: string;
    nftCollateralContract: string;
    loanERC20Denomination: string;
}
type LoanRepaidEvent = TypedEvent<[
    number,
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    string,
    string,
    string
], LoanRepaidEventObject>;
type LoanRepaidEventFilter = TypedEventFilter<LoanRepaidEvent>;
interface LoanStartedEventObject {
    loanId: number;
    borrower: string;
    lender: string;
    loanTerms: LoanData.LoanTermsStructOutput;
    loanExtras: LoanData.LoanExtrasStructOutput;
}
type LoanStartedEvent = TypedEvent<[
    number,
    string,
    string,
    LoanData.LoanTermsStructOutput,
    LoanData.LoanExtrasStructOutput
], LoanStartedEventObject>;
type LoanStartedEventFilter = TypedEventFilter<LoanStartedEvent>;
interface MaximumLoanDurationUpdatedEventObject {
    newMaximumLoanDuration: BigNumber;
}
type MaximumLoanDurationUpdatedEvent = TypedEvent<[
    BigNumber
], MaximumLoanDurationUpdatedEventObject>;
type MaximumLoanDurationUpdatedEventFilter = TypedEventFilter<MaximumLoanDurationUpdatedEvent>;
interface OwnershipTransferredEventObject {
    previousOwner: string;
    newOwner: string;
}
type OwnershipTransferredEvent = TypedEvent<[
    string,
    string
], OwnershipTransferredEventObject>;
type OwnershipTransferredEventFilter = TypedEventFilter<OwnershipTransferredEvent>;
interface PausedEventObject {
    account: string;
}
type PausedEvent = TypedEvent<[string], PausedEventObject>;
type PausedEventFilter = TypedEventFilter<PausedEvent>;
interface UnpausedEventObject {
    account: string;
}
type UnpausedEvent = TypedEvent<[string], UnpausedEventObject>;
type UnpausedEventFilter = TypedEventFilter<UnpausedEvent>;
interface Nftfi extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: NftfiInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        HUNDRED_PERCENT(overrides?: CallOverrides): Promise<[number]>;
        LOAN_COORDINATOR(overrides?: CallOverrides): Promise<[string]>;
        LOAN_TYPE(overrides?: CallOverrides): Promise<[string]>;
        acceptOffer(_offer: LoanData.OfferStruct, _signature: LoanData.SignatureStruct, _borrowerSettings: LoanData.BorrowerSettingsStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        adminFeeInBasisPoints(overrides?: CallOverrides): Promise<[number]>;
        cancelLoanCommitmentBeforeLoanHasBegun(_nonce: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        drainERC1155Airdrop(_tokenAddress: PromiseOrValue<string>, _tokenId: PromiseOrValue<BigNumberish>, _receiver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        drainERC20Airdrop(_tokenAddress: PromiseOrValue<string>, _receiver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        drainERC721Airdrop(_tokenAddress: PromiseOrValue<string>, _tokenId: PromiseOrValue<BigNumberish>, _receiver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        getERC20Permit(_erc20: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        getPayoffAmount(_loanId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[BigNumber]>;
        getWhetherNonceHasBeenUsedForUser(_user: PromiseOrValue<string>, _nonce: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean]>;
        hub(overrides?: CallOverrides): Promise<[string]>;
        liquidateOverdueLoan(_loanId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        loanIdToLoan(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber,
            BigNumber,
            string,
            number,
            number,
            number,
            string,
            BigNumber,
            string,
            string
        ] & {
            loanPrincipalAmount: BigNumber;
            maximumRepaymentAmount: BigNumber;
            nftCollateralId: BigNumber;
            loanERC20Denomination: string;
            loanDuration: number;
            loanInterestRateForDurationInBasisPoints: number;
            loanAdminFeeInBasisPoints: number;
            nftCollateralWrapper: string;
            loanStartTime: BigNumber;
            nftCollateralContract: string;
            borrower: string;
        }>;
        loanIdToLoanExtras(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            string,
            number,
            number
        ] & {
            revenueSharePartner: string;
            revenueShareInBasisPoints: number;
            referralFeeInBasisPoints: number;
        }>;
        loanRepaidOrLiquidated(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean]>;
        maximumLoanDuration(overrides?: CallOverrides): Promise<[BigNumber]>;
        mintObligationReceipt(_loanId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        onERC1155BatchReceived(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>[], arg3: PromiseOrValue<BigNumberish>[], arg4: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        onERC1155Received(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BigNumberish>, arg4: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        onERC721Received(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        owner(overrides?: CallOverrides): Promise<[string]>;
        pause(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        paused(overrides?: CallOverrides): Promise<[boolean]>;
        payBackLoan(_loanId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        pullAirdrop(_loanId: PromiseOrValue<BigNumberish>, _target: PromiseOrValue<string>, _data: PromiseOrValue<BytesLike>, _nftAirdrop: PromiseOrValue<string>, _nftAirdropId: PromiseOrValue<BigNumberish>, _is1155: PromiseOrValue<boolean>, _nftAirdropAmount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        renegotiateLoan(_loanId: PromiseOrValue<BigNumberish>, _newLoanDuration: PromiseOrValue<BigNumberish>, _newMaximumRepaymentAmount: PromiseOrValue<BigNumberish>, _renegotiationFee: PromiseOrValue<BigNumberish>, _lenderNonce: PromiseOrValue<BigNumberish>, _expiry: PromiseOrValue<BigNumberish>, _lenderSignature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setERC20Permit(_erc20: PromiseOrValue<string>, _permit: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setERC20Permits(_erc20s: PromiseOrValue<string>[], _permits: PromiseOrValue<boolean>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        supportsInterface(_interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        transferOwnership(_newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        unpause(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        updateAdminFee(_newAdminFeeInBasisPoints: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        updateMaximumLoanDuration(_newMaximumLoanDuration: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        wrapCollateral(_loanId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    HUNDRED_PERCENT(overrides?: CallOverrides): Promise<number>;
    LOAN_COORDINATOR(overrides?: CallOverrides): Promise<string>;
    LOAN_TYPE(overrides?: CallOverrides): Promise<string>;
    acceptOffer(_offer: LoanData.OfferStruct, _signature: LoanData.SignatureStruct, _borrowerSettings: LoanData.BorrowerSettingsStruct, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    adminFeeInBasisPoints(overrides?: CallOverrides): Promise<number>;
    cancelLoanCommitmentBeforeLoanHasBegun(_nonce: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    drainERC1155Airdrop(_tokenAddress: PromiseOrValue<string>, _tokenId: PromiseOrValue<BigNumberish>, _receiver: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    drainERC20Airdrop(_tokenAddress: PromiseOrValue<string>, _receiver: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    drainERC721Airdrop(_tokenAddress: PromiseOrValue<string>, _tokenId: PromiseOrValue<BigNumberish>, _receiver: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    getERC20Permit(_erc20: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    getPayoffAmount(_loanId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
    getWhetherNonceHasBeenUsedForUser(_user: PromiseOrValue<string>, _nonce: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
    hub(overrides?: CallOverrides): Promise<string>;
    liquidateOverdueLoan(_loanId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    loanIdToLoan(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
        BigNumber,
        BigNumber,
        BigNumber,
        string,
        number,
        number,
        number,
        string,
        BigNumber,
        string,
        string
    ] & {
        loanPrincipalAmount: BigNumber;
        maximumRepaymentAmount: BigNumber;
        nftCollateralId: BigNumber;
        loanERC20Denomination: string;
        loanDuration: number;
        loanInterestRateForDurationInBasisPoints: number;
        loanAdminFeeInBasisPoints: number;
        nftCollateralWrapper: string;
        loanStartTime: BigNumber;
        nftCollateralContract: string;
        borrower: string;
    }>;
    loanIdToLoanExtras(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
        string,
        number,
        number
    ] & {
        revenueSharePartner: string;
        revenueShareInBasisPoints: number;
        referralFeeInBasisPoints: number;
    }>;
    loanRepaidOrLiquidated(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
    maximumLoanDuration(overrides?: CallOverrides): Promise<BigNumber>;
    mintObligationReceipt(_loanId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    onERC1155BatchReceived(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>[], arg3: PromiseOrValue<BigNumberish>[], arg4: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    onERC1155Received(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BigNumberish>, arg4: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    onERC721Received(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    owner(overrides?: CallOverrides): Promise<string>;
    pause(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    paused(overrides?: CallOverrides): Promise<boolean>;
    payBackLoan(_loanId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    pullAirdrop(_loanId: PromiseOrValue<BigNumberish>, _target: PromiseOrValue<string>, _data: PromiseOrValue<BytesLike>, _nftAirdrop: PromiseOrValue<string>, _nftAirdropId: PromiseOrValue<BigNumberish>, _is1155: PromiseOrValue<boolean>, _nftAirdropAmount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    renegotiateLoan(_loanId: PromiseOrValue<BigNumberish>, _newLoanDuration: PromiseOrValue<BigNumberish>, _newMaximumRepaymentAmount: PromiseOrValue<BigNumberish>, _renegotiationFee: PromiseOrValue<BigNumberish>, _lenderNonce: PromiseOrValue<BigNumberish>, _expiry: PromiseOrValue<BigNumberish>, _lenderSignature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setERC20Permit(_erc20: PromiseOrValue<string>, _permit: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setERC20Permits(_erc20s: PromiseOrValue<string>[], _permits: PromiseOrValue<boolean>[], overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    supportsInterface(_interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    transferOwnership(_newOwner: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    unpause(overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    updateAdminFee(_newAdminFeeInBasisPoints: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    updateMaximumLoanDuration(_newMaximumLoanDuration: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    wrapCollateral(_loanId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        HUNDRED_PERCENT(overrides?: CallOverrides): Promise<number>;
        LOAN_COORDINATOR(overrides?: CallOverrides): Promise<string>;
        LOAN_TYPE(overrides?: CallOverrides): Promise<string>;
        acceptOffer(_offer: LoanData.OfferStruct, _signature: LoanData.SignatureStruct, _borrowerSettings: LoanData.BorrowerSettingsStruct, overrides?: CallOverrides): Promise<void>;
        adminFeeInBasisPoints(overrides?: CallOverrides): Promise<number>;
        cancelLoanCommitmentBeforeLoanHasBegun(_nonce: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        drainERC1155Airdrop(_tokenAddress: PromiseOrValue<string>, _tokenId: PromiseOrValue<BigNumberish>, _receiver: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        drainERC20Airdrop(_tokenAddress: PromiseOrValue<string>, _receiver: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        drainERC721Airdrop(_tokenAddress: PromiseOrValue<string>, _tokenId: PromiseOrValue<BigNumberish>, _receiver: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        getERC20Permit(_erc20: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        getPayoffAmount(_loanId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getWhetherNonceHasBeenUsedForUser(_user: PromiseOrValue<string>, _nonce: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        hub(overrides?: CallOverrides): Promise<string>;
        liquidateOverdueLoan(_loanId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        loanIdToLoan(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            BigNumber,
            BigNumber,
            BigNumber,
            string,
            number,
            number,
            number,
            string,
            BigNumber,
            string,
            string
        ] & {
            loanPrincipalAmount: BigNumber;
            maximumRepaymentAmount: BigNumber;
            nftCollateralId: BigNumber;
            loanERC20Denomination: string;
            loanDuration: number;
            loanInterestRateForDurationInBasisPoints: number;
            loanAdminFeeInBasisPoints: number;
            nftCollateralWrapper: string;
            loanStartTime: BigNumber;
            nftCollateralContract: string;
            borrower: string;
        }>;
        loanIdToLoanExtras(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            string,
            number,
            number
        ] & {
            revenueSharePartner: string;
            revenueShareInBasisPoints: number;
            referralFeeInBasisPoints: number;
        }>;
        loanRepaidOrLiquidated(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        maximumLoanDuration(overrides?: CallOverrides): Promise<BigNumber>;
        mintObligationReceipt(_loanId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        onERC1155BatchReceived(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>[], arg3: PromiseOrValue<BigNumberish>[], arg4: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        onERC1155Received(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BigNumberish>, arg4: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        onERC721Received(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        owner(overrides?: CallOverrides): Promise<string>;
        pause(overrides?: CallOverrides): Promise<void>;
        paused(overrides?: CallOverrides): Promise<boolean>;
        payBackLoan(_loanId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        pullAirdrop(_loanId: PromiseOrValue<BigNumberish>, _target: PromiseOrValue<string>, _data: PromiseOrValue<BytesLike>, _nftAirdrop: PromiseOrValue<string>, _nftAirdropId: PromiseOrValue<BigNumberish>, _is1155: PromiseOrValue<boolean>, _nftAirdropAmount: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        renegotiateLoan(_loanId: PromiseOrValue<BigNumberish>, _newLoanDuration: PromiseOrValue<BigNumberish>, _newMaximumRepaymentAmount: PromiseOrValue<BigNumberish>, _renegotiationFee: PromiseOrValue<BigNumberish>, _lenderNonce: PromiseOrValue<BigNumberish>, _expiry: PromiseOrValue<BigNumberish>, _lenderSignature: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        setERC20Permit(_erc20: PromiseOrValue<string>, _permit: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<void>;
        setERC20Permits(_erc20s: PromiseOrValue<string>[], _permits: PromiseOrValue<boolean>[], overrides?: CallOverrides): Promise<void>;
        supportsInterface(_interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        transferOwnership(_newOwner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        unpause(overrides?: CallOverrides): Promise<void>;
        updateAdminFee(_newAdminFeeInBasisPoints: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        updateMaximumLoanDuration(_newMaximumLoanDuration: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        wrapCollateral(_loanId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "AdminFeeUpdated(uint16)"(newAdminFee?: null): AdminFeeUpdatedEventFilter;
        AdminFeeUpdated(newAdminFee?: null): AdminFeeUpdatedEventFilter;
        "ERC20Permit(address,bool)"(erc20Contract?: PromiseOrValue<string> | null, isPermitted?: null): ERC20PermitEventFilter;
        ERC20Permit(erc20Contract?: PromiseOrValue<string> | null, isPermitted?: null): ERC20PermitEventFilter;
        "LoanLiquidated(uint32,address,address,uint256,uint256,uint256,uint256,address)"(loanId?: PromiseOrValue<BigNumberish> | null, borrower?: PromiseOrValue<string> | null, lender?: PromiseOrValue<string> | null, loanPrincipalAmount?: null, nftCollateralId?: null, loanMaturityDate?: null, loanLiquidationDate?: null, nftCollateralContract?: null): LoanLiquidatedEventFilter;
        LoanLiquidated(loanId?: PromiseOrValue<BigNumberish> | null, borrower?: PromiseOrValue<string> | null, lender?: PromiseOrValue<string> | null, loanPrincipalAmount?: null, nftCollateralId?: null, loanMaturityDate?: null, loanLiquidationDate?: null, nftCollateralContract?: null): LoanLiquidatedEventFilter;
        "LoanRenegotiated(uint32,address,address,uint32,uint256,uint256,uint256)"(loanId?: PromiseOrValue<BigNumberish> | null, borrower?: PromiseOrValue<string> | null, lender?: PromiseOrValue<string> | null, newLoanDuration?: null, newMaximumRepaymentAmount?: null, renegotiationFee?: null, renegotiationAdminFee?: null): LoanRenegotiatedEventFilter;
        LoanRenegotiated(loanId?: PromiseOrValue<BigNumberish> | null, borrower?: PromiseOrValue<string> | null, lender?: PromiseOrValue<string> | null, newLoanDuration?: null, newMaximumRepaymentAmount?: null, renegotiationFee?: null, renegotiationAdminFee?: null): LoanRenegotiatedEventFilter;
        "LoanRepaid(uint32,address,address,uint256,uint256,uint256,uint256,uint256,address,address,address)"(loanId?: PromiseOrValue<BigNumberish> | null, borrower?: PromiseOrValue<string> | null, lender?: PromiseOrValue<string> | null, loanPrincipalAmount?: null, nftCollateralId?: null, amountPaidToLender?: null, adminFee?: null, revenueShare?: null, revenueSharePartner?: null, nftCollateralContract?: null, loanERC20Denomination?: null): LoanRepaidEventFilter;
        LoanRepaid(loanId?: PromiseOrValue<BigNumberish> | null, borrower?: PromiseOrValue<string> | null, lender?: PromiseOrValue<string> | null, loanPrincipalAmount?: null, nftCollateralId?: null, amountPaidToLender?: null, adminFee?: null, revenueShare?: null, revenueSharePartner?: null, nftCollateralContract?: null, loanERC20Denomination?: null): LoanRepaidEventFilter;
        "LoanStarted(uint32,address,address,tuple,tuple)"(loanId?: PromiseOrValue<BigNumberish> | null, borrower?: PromiseOrValue<string> | null, lender?: PromiseOrValue<string> | null, loanTerms?: null, loanExtras?: null): LoanStartedEventFilter;
        LoanStarted(loanId?: PromiseOrValue<BigNumberish> | null, borrower?: PromiseOrValue<string> | null, lender?: PromiseOrValue<string> | null, loanTerms?: null, loanExtras?: null): LoanStartedEventFilter;
        "MaximumLoanDurationUpdated(uint256)"(newMaximumLoanDuration?: null): MaximumLoanDurationUpdatedEventFilter;
        MaximumLoanDurationUpdated(newMaximumLoanDuration?: null): MaximumLoanDurationUpdatedEventFilter;
        "OwnershipTransferred(address,address)"(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter;
        OwnershipTransferred(previousOwner?: PromiseOrValue<string> | null, newOwner?: PromiseOrValue<string> | null): OwnershipTransferredEventFilter;
        "Paused(address)"(account?: null): PausedEventFilter;
        Paused(account?: null): PausedEventFilter;
        "Unpaused(address)"(account?: null): UnpausedEventFilter;
        Unpaused(account?: null): UnpausedEventFilter;
    };
    estimateGas: {
        HUNDRED_PERCENT(overrides?: CallOverrides): Promise<BigNumber>;
        LOAN_COORDINATOR(overrides?: CallOverrides): Promise<BigNumber>;
        LOAN_TYPE(overrides?: CallOverrides): Promise<BigNumber>;
        acceptOffer(_offer: LoanData.OfferStruct, _signature: LoanData.SignatureStruct, _borrowerSettings: LoanData.BorrowerSettingsStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        adminFeeInBasisPoints(overrides?: CallOverrides): Promise<BigNumber>;
        cancelLoanCommitmentBeforeLoanHasBegun(_nonce: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        drainERC1155Airdrop(_tokenAddress: PromiseOrValue<string>, _tokenId: PromiseOrValue<BigNumberish>, _receiver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        drainERC20Airdrop(_tokenAddress: PromiseOrValue<string>, _receiver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        drainERC721Airdrop(_tokenAddress: PromiseOrValue<string>, _tokenId: PromiseOrValue<BigNumberish>, _receiver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        getERC20Permit(_erc20: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        getPayoffAmount(_loanId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getWhetherNonceHasBeenUsedForUser(_user: PromiseOrValue<string>, _nonce: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        hub(overrides?: CallOverrides): Promise<BigNumber>;
        liquidateOverdueLoan(_loanId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        loanIdToLoan(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        loanIdToLoanExtras(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        loanRepaidOrLiquidated(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        maximumLoanDuration(overrides?: CallOverrides): Promise<BigNumber>;
        mintObligationReceipt(_loanId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        onERC1155BatchReceived(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>[], arg3: PromiseOrValue<BigNumberish>[], arg4: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        onERC1155Received(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BigNumberish>, arg4: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        onERC721Received(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        owner(overrides?: CallOverrides): Promise<BigNumber>;
        pause(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        paused(overrides?: CallOverrides): Promise<BigNumber>;
        payBackLoan(_loanId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        pullAirdrop(_loanId: PromiseOrValue<BigNumberish>, _target: PromiseOrValue<string>, _data: PromiseOrValue<BytesLike>, _nftAirdrop: PromiseOrValue<string>, _nftAirdropId: PromiseOrValue<BigNumberish>, _is1155: PromiseOrValue<boolean>, _nftAirdropAmount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        renegotiateLoan(_loanId: PromiseOrValue<BigNumberish>, _newLoanDuration: PromiseOrValue<BigNumberish>, _newMaximumRepaymentAmount: PromiseOrValue<BigNumberish>, _renegotiationFee: PromiseOrValue<BigNumberish>, _lenderNonce: PromiseOrValue<BigNumberish>, _expiry: PromiseOrValue<BigNumberish>, _lenderSignature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setERC20Permit(_erc20: PromiseOrValue<string>, _permit: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setERC20Permits(_erc20s: PromiseOrValue<string>[], _permits: PromiseOrValue<boolean>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        supportsInterface(_interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        transferOwnership(_newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        unpause(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        updateAdminFee(_newAdminFeeInBasisPoints: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        updateMaximumLoanDuration(_newMaximumLoanDuration: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        wrapCollateral(_loanId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        HUNDRED_PERCENT(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        LOAN_COORDINATOR(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        LOAN_TYPE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        acceptOffer(_offer: LoanData.OfferStruct, _signature: LoanData.SignatureStruct, _borrowerSettings: LoanData.BorrowerSettingsStruct, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        adminFeeInBasisPoints(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        cancelLoanCommitmentBeforeLoanHasBegun(_nonce: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        drainERC1155Airdrop(_tokenAddress: PromiseOrValue<string>, _tokenId: PromiseOrValue<BigNumberish>, _receiver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        drainERC20Airdrop(_tokenAddress: PromiseOrValue<string>, _receiver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        drainERC721Airdrop(_tokenAddress: PromiseOrValue<string>, _tokenId: PromiseOrValue<BigNumberish>, _receiver: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        getERC20Permit(_erc20: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getPayoffAmount(_loanId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getWhetherNonceHasBeenUsedForUser(_user: PromiseOrValue<string>, _nonce: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        hub(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        liquidateOverdueLoan(_loanId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        loanIdToLoan(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        loanIdToLoanExtras(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        loanRepaidOrLiquidated(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        maximumLoanDuration(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        mintObligationReceipt(_loanId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        onERC1155BatchReceived(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>[], arg3: PromiseOrValue<BigNumberish>[], arg4: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        onERC1155Received(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BigNumberish>, arg4: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        onERC721Received(arg0: PromiseOrValue<string>, arg1: PromiseOrValue<string>, arg2: PromiseOrValue<BigNumberish>, arg3: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        pause(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        paused(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        payBackLoan(_loanId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        pullAirdrop(_loanId: PromiseOrValue<BigNumberish>, _target: PromiseOrValue<string>, _data: PromiseOrValue<BytesLike>, _nftAirdrop: PromiseOrValue<string>, _nftAirdropId: PromiseOrValue<BigNumberish>, _is1155: PromiseOrValue<boolean>, _nftAirdropAmount: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        renegotiateLoan(_loanId: PromiseOrValue<BigNumberish>, _newLoanDuration: PromiseOrValue<BigNumberish>, _newMaximumRepaymentAmount: PromiseOrValue<BigNumberish>, _renegotiationFee: PromiseOrValue<BigNumberish>, _lenderNonce: PromiseOrValue<BigNumberish>, _expiry: PromiseOrValue<BigNumberish>, _lenderSignature: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setERC20Permit(_erc20: PromiseOrValue<string>, _permit: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setERC20Permits(_erc20s: PromiseOrValue<string>[], _permits: PromiseOrValue<boolean>[], overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        supportsInterface(_interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transferOwnership(_newOwner: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        unpause(overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        updateAdminFee(_newAdminFeeInBasisPoints: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        updateMaximumLoanDuration(_newMaximumLoanDuration: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        wrapCollateral(_loanId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}

interface NftfiNoteReceiptInterface extends utils.Interface {
    functions: {
        "BASE_URI_ROLE()": FunctionFragment;
        "DEFAULT_ADMIN_ROLE()": FunctionFragment;
        "LOAN_COORDINATOR_ROLE()": FunctionFragment;
        "approve(address,uint256)": FunctionFragment;
        "balanceOf(address)": FunctionFragment;
        "baseURI()": FunctionFragment;
        "burn(uint256)": FunctionFragment;
        "exists(uint256)": FunctionFragment;
        "getApproved(uint256)": FunctionFragment;
        "getRoleAdmin(bytes32)": FunctionFragment;
        "grantRole(bytes32,address)": FunctionFragment;
        "hasRole(bytes32,address)": FunctionFragment;
        "hub()": FunctionFragment;
        "isApprovedForAll(address,address)": FunctionFragment;
        "loans(uint256)": FunctionFragment;
        "mint(address,uint256,bytes)": FunctionFragment;
        "name()": FunctionFragment;
        "ownerOf(uint256)": FunctionFragment;
        "renounceRole(bytes32,address)": FunctionFragment;
        "revokeRole(bytes32,address)": FunctionFragment;
        "safeTransferFrom(address,address,uint256)": FunctionFragment;
        "safeTransferFrom(address,address,uint256,bytes)": FunctionFragment;
        "setApprovalForAll(address,bool)": FunctionFragment;
        "setBaseURI(string)": FunctionFragment;
        "setLoanCoordinator(address)": FunctionFragment;
        "supportsInterface(bytes4)": FunctionFragment;
        "symbol()": FunctionFragment;
        "tokenURI(uint256)": FunctionFragment;
        "transferFrom(address,address,uint256)": FunctionFragment;
    };
    getFunction(nameOrSignatureOrTopic: "BASE_URI_ROLE" | "DEFAULT_ADMIN_ROLE" | "LOAN_COORDINATOR_ROLE" | "approve" | "balanceOf" | "baseURI" | "burn" | "exists" | "getApproved" | "getRoleAdmin" | "grantRole" | "hasRole" | "hub" | "isApprovedForAll" | "loans" | "mint" | "name" | "ownerOf" | "renounceRole" | "revokeRole" | "safeTransferFrom(address,address,uint256)" | "safeTransferFrom(address,address,uint256,bytes)" | "setApprovalForAll" | "setBaseURI" | "setLoanCoordinator" | "supportsInterface" | "symbol" | "tokenURI" | "transferFrom"): FunctionFragment;
    encodeFunctionData(functionFragment: "BASE_URI_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "DEFAULT_ADMIN_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "LOAN_COORDINATOR_ROLE", values?: undefined): string;
    encodeFunctionData(functionFragment: "approve", values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "balanceOf", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "baseURI", values?: undefined): string;
    encodeFunctionData(functionFragment: "burn", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "exists", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getApproved", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "getRoleAdmin", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "grantRole", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "hasRole", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "hub", values?: undefined): string;
    encodeFunctionData(functionFragment: "isApprovedForAll", values: [PromiseOrValue<string>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "loans", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "mint", values: [
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "name", values?: undefined): string;
    encodeFunctionData(functionFragment: "ownerOf", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "renounceRole", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "revokeRole", values: [PromiseOrValue<BytesLike>, PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "safeTransferFrom(address,address,uint256)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    encodeFunctionData(functionFragment: "safeTransferFrom(address,address,uint256,bytes)", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>,
        PromiseOrValue<BytesLike>
    ]): string;
    encodeFunctionData(functionFragment: "setApprovalForAll", values: [PromiseOrValue<string>, PromiseOrValue<boolean>]): string;
    encodeFunctionData(functionFragment: "setBaseURI", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "setLoanCoordinator", values: [PromiseOrValue<string>]): string;
    encodeFunctionData(functionFragment: "supportsInterface", values: [PromiseOrValue<BytesLike>]): string;
    encodeFunctionData(functionFragment: "symbol", values?: undefined): string;
    encodeFunctionData(functionFragment: "tokenURI", values: [PromiseOrValue<BigNumberish>]): string;
    encodeFunctionData(functionFragment: "transferFrom", values: [
        PromiseOrValue<string>,
        PromiseOrValue<string>,
        PromiseOrValue<BigNumberish>
    ]): string;
    decodeFunctionResult(functionFragment: "BASE_URI_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "DEFAULT_ADMIN_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "LOAN_COORDINATOR_ROLE", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "approve", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "baseURI", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "burn", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "exists", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getApproved", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "getRoleAdmin", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "hub", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "isApprovedForAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "loans", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "name", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "ownerOf", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "renounceRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeTransferFrom(address,address,uint256)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "safeTransferFrom(address,address,uint256,bytes)", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setApprovalForAll", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setBaseURI", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "setLoanCoordinator", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "supportsInterface", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "symbol", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "tokenURI", data: BytesLike): Result;
    decodeFunctionResult(functionFragment: "transferFrom", data: BytesLike): Result;
    events: {
        "Approval(address,address,uint256)": EventFragment;
        "ApprovalForAll(address,address,bool)": EventFragment;
        "RoleAdminChanged(bytes32,bytes32,bytes32)": EventFragment;
        "RoleGranted(bytes32,address,address)": EventFragment;
        "RoleRevoked(bytes32,address,address)": EventFragment;
        "Transfer(address,address,uint256)": EventFragment;
    };
    getEvent(nameOrSignatureOrTopic: "Approval"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "ApprovalForAll"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleAdminChanged"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleGranted"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "RoleRevoked"): EventFragment;
    getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}
interface ApprovalEventObject {
    owner: string;
    approved: string;
    tokenId: BigNumber;
}
type ApprovalEvent = TypedEvent<[
    string,
    string,
    BigNumber
], ApprovalEventObject>;
type ApprovalEventFilter = TypedEventFilter<ApprovalEvent>;
interface ApprovalForAllEventObject {
    owner: string;
    operator: string;
    approved: boolean;
}
type ApprovalForAllEvent = TypedEvent<[
    string,
    string,
    boolean
], ApprovalForAllEventObject>;
type ApprovalForAllEventFilter = TypedEventFilter<ApprovalForAllEvent>;
interface RoleAdminChangedEventObject {
    role: string;
    previousAdminRole: string;
    newAdminRole: string;
}
type RoleAdminChangedEvent = TypedEvent<[
    string,
    string,
    string
], RoleAdminChangedEventObject>;
type RoleAdminChangedEventFilter = TypedEventFilter<RoleAdminChangedEvent>;
interface RoleGrantedEventObject {
    role: string;
    account: string;
    sender: string;
}
type RoleGrantedEvent = TypedEvent<[
    string,
    string,
    string
], RoleGrantedEventObject>;
type RoleGrantedEventFilter = TypedEventFilter<RoleGrantedEvent>;
interface RoleRevokedEventObject {
    role: string;
    account: string;
    sender: string;
}
type RoleRevokedEvent = TypedEvent<[
    string,
    string,
    string
], RoleRevokedEventObject>;
type RoleRevokedEventFilter = TypedEventFilter<RoleRevokedEvent>;
interface TransferEventObject {
    from: string;
    to: string;
    tokenId: BigNumber;
}
type TransferEvent = TypedEvent<[
    string,
    string,
    BigNumber
], TransferEventObject>;
type TransferEventFilter = TypedEventFilter<TransferEvent>;
interface NftfiNoteReceipt extends BaseContract {
    connect(signerOrProvider: Signer | Provider | string): this;
    attach(addressOrName: string): this;
    deployed(): Promise<this>;
    interface: NftfiNoteReceiptInterface;
    queryFilter<TEvent extends TypedEvent>(event: TypedEventFilter<TEvent>, fromBlockOrBlockhash?: string | number | undefined, toBlock?: string | number | undefined): Promise<Array<TEvent>>;
    listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
    listeners(eventName?: string): Array<Listener>;
    removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
    removeAllListeners(eventName?: string): this;
    off: OnEvent<this>;
    on: OnEvent<this>;
    once: OnEvent<this>;
    removeListener: OnEvent<this>;
    functions: {
        BASE_URI_ROLE(overrides?: CallOverrides): Promise<[string]>;
        DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<[string]>;
        LOAN_COORDINATOR_ROLE(overrides?: CallOverrides): Promise<[string]>;
        approve(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        balanceOf(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[BigNumber]>;
        baseURI(overrides?: CallOverrides): Promise<[string]>;
        burn(_tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        exists(_tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[boolean]>;
        getApproved(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        getRoleAdmin(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[string]>;
        grantRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        hasRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        hub(overrides?: CallOverrides): Promise<[string]>;
        isApprovedForAll(owner: PromiseOrValue<string>, operator: PromiseOrValue<string>, overrides?: CallOverrides): Promise<[boolean]>;
        loans(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            string,
            BigNumber
        ] & {
            loanCoordinator: string;
            loanId: BigNumber;
        }>;
        mint(_to: PromiseOrValue<string>, _tokenId: PromiseOrValue<BigNumberish>, _data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        name(overrides?: CallOverrides): Promise<[string]>;
        ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        renounceRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        revokeRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "safeTransferFrom(address,address,uint256)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        "safeTransferFrom(address,address,uint256,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, _data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setApprovalForAll(operator: PromiseOrValue<string>, approved: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setBaseURI(_customBaseURI: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        setLoanCoordinator(_account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
        supportsInterface(_interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<[boolean]>;
        symbol(overrides?: CallOverrides): Promise<[string]>;
        tokenURI(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[string]>;
        transferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<ContractTransaction>;
    };
    BASE_URI_ROLE(overrides?: CallOverrides): Promise<string>;
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;
    LOAN_COORDINATOR_ROLE(overrides?: CallOverrides): Promise<string>;
    approve(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    balanceOf(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
    baseURI(overrides?: CallOverrides): Promise<string>;
    burn(_tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    exists(_tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
    getApproved(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    getRoleAdmin(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
    grantRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    hasRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    hub(overrides?: CallOverrides): Promise<string>;
    isApprovedForAll(owner: PromiseOrValue<string>, operator: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
    loans(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
        string,
        BigNumber
    ] & {
        loanCoordinator: string;
        loanId: BigNumber;
    }>;
    mint(_to: PromiseOrValue<string>, _tokenId: PromiseOrValue<BigNumberish>, _data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    name(overrides?: CallOverrides): Promise<string>;
    ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    renounceRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    revokeRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "safeTransferFrom(address,address,uint256)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    "safeTransferFrom(address,address,uint256,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, _data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setApprovalForAll(operator: PromiseOrValue<string>, approved: PromiseOrValue<boolean>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setBaseURI(_customBaseURI: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    setLoanCoordinator(_account: PromiseOrValue<string>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    supportsInterface(_interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
    symbol(overrides?: CallOverrides): Promise<string>;
    tokenURI(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
    transferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
        from?: PromiseOrValue<string>;
    }): Promise<ContractTransaction>;
    callStatic: {
        BASE_URI_ROLE(overrides?: CallOverrides): Promise<string>;
        DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;
        LOAN_COORDINATOR_ROLE(overrides?: CallOverrides): Promise<string>;
        approve(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        balanceOf(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        baseURI(overrides?: CallOverrides): Promise<string>;
        burn(_tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        exists(_tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<boolean>;
        getApproved(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        getRoleAdmin(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<string>;
        grantRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        hasRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        hub(overrides?: CallOverrides): Promise<string>;
        isApprovedForAll(owner: PromiseOrValue<string>, operator: PromiseOrValue<string>, overrides?: CallOverrides): Promise<boolean>;
        loans(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<[
            string,
            BigNumber
        ] & {
            loanCoordinator: string;
            loanId: BigNumber;
        }>;
        mint(_to: PromiseOrValue<string>, _tokenId: PromiseOrValue<BigNumberish>, _data: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        name(overrides?: CallOverrides): Promise<string>;
        ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        renounceRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        revokeRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        "safeTransferFrom(address,address,uint256)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
        "safeTransferFrom(address,address,uint256,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, _data: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<void>;
        setApprovalForAll(operator: PromiseOrValue<string>, approved: PromiseOrValue<boolean>, overrides?: CallOverrides): Promise<void>;
        setBaseURI(_customBaseURI: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        setLoanCoordinator(_account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<void>;
        supportsInterface(_interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<boolean>;
        symbol(overrides?: CallOverrides): Promise<string>;
        tokenURI(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<string>;
        transferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<void>;
    };
    filters: {
        "Approval(address,address,uint256)"(owner?: PromiseOrValue<string> | null, approved?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<BigNumberish> | null): ApprovalEventFilter;
        Approval(owner?: PromiseOrValue<string> | null, approved?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<BigNumberish> | null): ApprovalEventFilter;
        "ApprovalForAll(address,address,bool)"(owner?: PromiseOrValue<string> | null, operator?: PromiseOrValue<string> | null, approved?: null): ApprovalForAllEventFilter;
        ApprovalForAll(owner?: PromiseOrValue<string> | null, operator?: PromiseOrValue<string> | null, approved?: null): ApprovalForAllEventFilter;
        "RoleAdminChanged(bytes32,bytes32,bytes32)"(role?: PromiseOrValue<BytesLike> | null, previousAdminRole?: PromiseOrValue<BytesLike> | null, newAdminRole?: PromiseOrValue<BytesLike> | null): RoleAdminChangedEventFilter;
        RoleAdminChanged(role?: PromiseOrValue<BytesLike> | null, previousAdminRole?: PromiseOrValue<BytesLike> | null, newAdminRole?: PromiseOrValue<BytesLike> | null): RoleAdminChangedEventFilter;
        "RoleGranted(bytes32,address,address)"(role?: PromiseOrValue<BytesLike> | null, account?: PromiseOrValue<string> | null, sender?: PromiseOrValue<string> | null): RoleGrantedEventFilter;
        RoleGranted(role?: PromiseOrValue<BytesLike> | null, account?: PromiseOrValue<string> | null, sender?: PromiseOrValue<string> | null): RoleGrantedEventFilter;
        "RoleRevoked(bytes32,address,address)"(role?: PromiseOrValue<BytesLike> | null, account?: PromiseOrValue<string> | null, sender?: PromiseOrValue<string> | null): RoleRevokedEventFilter;
        RoleRevoked(role?: PromiseOrValue<BytesLike> | null, account?: PromiseOrValue<string> | null, sender?: PromiseOrValue<string> | null): RoleRevokedEventFilter;
        "Transfer(address,address,uint256)"(from?: PromiseOrValue<string> | null, to?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<BigNumberish> | null): TransferEventFilter;
        Transfer(from?: PromiseOrValue<string> | null, to?: PromiseOrValue<string> | null, tokenId?: PromiseOrValue<BigNumberish> | null): TransferEventFilter;
    };
    estimateGas: {
        BASE_URI_ROLE(overrides?: CallOverrides): Promise<BigNumber>;
        DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>;
        LOAN_COORDINATOR_ROLE(overrides?: CallOverrides): Promise<BigNumber>;
        approve(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        balanceOf(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        baseURI(overrides?: CallOverrides): Promise<BigNumber>;
        burn(_tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        exists(_tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getApproved(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        getRoleAdmin(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        grantRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        hasRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        hub(overrides?: CallOverrides): Promise<BigNumber>;
        isApprovedForAll(owner: PromiseOrValue<string>, operator: PromiseOrValue<string>, overrides?: CallOverrides): Promise<BigNumber>;
        loans(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        mint(_to: PromiseOrValue<string>, _tokenId: PromiseOrValue<BigNumberish>, _data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        name(overrides?: CallOverrides): Promise<BigNumber>;
        ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        renounceRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        revokeRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "safeTransferFrom(address,address,uint256)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        "safeTransferFrom(address,address,uint256,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, _data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setApprovalForAll(operator: PromiseOrValue<string>, approved: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setBaseURI(_customBaseURI: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        setLoanCoordinator(_account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
        supportsInterface(_interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<BigNumber>;
        symbol(overrides?: CallOverrides): Promise<BigNumber>;
        tokenURI(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<BigNumber>;
        transferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<BigNumber>;
    };
    populateTransaction: {
        BASE_URI_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        LOAN_COORDINATOR_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        approve(to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        balanceOf(owner: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        baseURI(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        burn(_tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        exists(_tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getApproved(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        getRoleAdmin(role: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        grantRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        hasRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        hub(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        isApprovedForAll(owner: PromiseOrValue<string>, operator: PromiseOrValue<string>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        loans(arg0: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        mint(_to: PromiseOrValue<string>, _tokenId: PromiseOrValue<BigNumberish>, _data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        name(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        ownerOf(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        renounceRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        revokeRole(role: PromiseOrValue<BytesLike>, account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "safeTransferFrom(address,address,uint256)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        "safeTransferFrom(address,address,uint256,bytes)"(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, _data: PromiseOrValue<BytesLike>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setApprovalForAll(operator: PromiseOrValue<string>, approved: PromiseOrValue<boolean>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setBaseURI(_customBaseURI: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        setLoanCoordinator(_account: PromiseOrValue<string>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
        supportsInterface(_interfaceId: PromiseOrValue<BytesLike>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        symbol(overrides?: CallOverrides): Promise<PopulatedTransaction>;
        tokenURI(tokenId: PromiseOrValue<BigNumberish>, overrides?: CallOverrides): Promise<PopulatedTransaction>;
        transferFrom(from: PromiseOrValue<string>, to: PromiseOrValue<string>, tokenId: PromiseOrValue<BigNumberish>, overrides?: Overrides & {
            from?: PromiseOrValue<string>;
        }): Promise<PopulatedTransaction>;
    };
}

type GS_API_CreateOfferResponse = {
    success: boolean;
    body: {
        result: {
            nft: {
                id: string;
                address: string;
            };
            lender: {
                address: string;
                nonce: string;
            };
            borrower: {
                address: string;
            };
            referrer: {
                address: string;
            };
            terms: {
                loan: {
                    duration: number;
                    repayment: string;
                    principal: string;
                    currency: string;
                    expiry: number;
                    interest: {
                        prorated: boolean;
                        bps: number;
                    };
                };
            };
            nftfi: {
                contract: {
                    name: string;
                };
                fee: {
                    bps: string;
                };
            };
            id: string;
            signature: string;
            service_fee: {
                service_fee: BigNumber;
                fee_receiver: string;
                fee_receiver_nonce: string;
                signature_expiry: number;
                bnpl_contract: string;
                chain_id: number;
                signature: string;
            };
        };
    };
    reason?: string;
    message?: string;
};
type GS_API_GetLoanTerms = {
    success: boolean;
    body: {
        maxLoan: number;
        price: number;
        offers: Record<string, {
            LTV: number;
            APR: number;
            FEE: number;
        }[]>;
    };
    message?: string;
};
type GS_API_Collections = {
    whitelist: {
        slug: string;
        asset_contract: string;
    }[];
};
type GS_API_VaultData = {
    vaultData: {
        strategy: string;
        vault: string;
        privatekey: string;
    }[];
};
type AlchemyGetLoans = {
    ownedNfts: {
        contract: {
            address: string;
        };
        id: {
            tokenId: string;
        };
        title: string;
    }[];
};
declare enum Version {
    MAINNET = "mainnet",
    GOERLI = "goerli"
}
declare enum LoanType {
    NFTfi = 0,
    BNPL = 1
}
type GetLoansReturnType = Record<string, {
    loanType: LoanType;
    loanInfo: Awaited<ReturnType<Nftfi["loanIdToLoan"]>>;
}>;

declare class GoblinSaxAPI {
    envConfig: {
        gs_api: string;
        os_api: string;
        alchemy_api: string;
        nftfi: string;
        nftfi_promissory_note: string;
        nftfi_obligation_receipt: string;
        nftfi_loanContract: string;
        nftfi_loanCoordinator: string;
        weth: string;
        bnpl: string;
        os_module: string;
    };
    signer: ethers.providers.JsonRpcSigner;
    apiKey: string;
    version: Version;
    nftfi_contract: Nftfi;
    nftfi_note: NftfiNoteReceipt;
    nftfi_obligation: NftfiNoteReceipt;
    weth_contract: Erc20;
    bnpl_contract: Bnpl;
    gs_lender: string;
    constructor(signer: ethers.providers.JsonRpcSigner, apiKey: string, version: Version);
    getWhitelist(): Promise<GS_API_Collections["whitelist"]>;
    getVaultData(): Promise<GS_API_VaultData["vaultData"]>;
    getTerms(collection: string, assetId: string): Promise<GS_API_GetLoanTerms["body"]>;
    repayLoan(loanId: ethers.BigNumberish): Promise<void>;
    getLoans(alchemyApiKey: string): Promise<GetLoansReturnType>;
    checkApprovedWETH(): Promise<Boolean>;
    approveSpendingWETH(): Promise<ethers.ContractTransaction>;
    checkApprovedNFT(collection: any): Promise<Boolean>;
    approveSpendingNFT(collection: any): Promise<ethers.ContractTransaction>;
    createOffer(collection: string, assetId: string, duration: string, borrowerAddress: string, principal: ethers.BigNumberish, apr: number): Promise<{
        offer: {
            loanPrincipalAmount: string;
            maximumRepaymentAmount: string;
            nftCollateralId: string;
            nftCollateralContract: string;
            loanDuration: number;
            loanAdminFeeInBasisPoints: string;
            loanERC20Denomination: string;
            referrer: string;
        };
        borrowerSettings: {
            revenueSharePartner: string;
            referralFeeInBasisPoints: number;
        };
        signature: {
            nonce: string;
            expiry: number;
            signer: string;
            signature: string;
        };
        serviceFee: {
            fee: BigNumber;
            feeReceiver: string;
            feeReceiverNonce: string;
            signatureExpiry: number;
            bnplContract: string;
            chainId: number;
            signature: string;
        };
    }>;
    beginLoan(collection: string, assetId: string, duration: string, borrowerAddress: string, principal: string, apr: number): Promise<ethers.ContractTransaction>;
    getOSListing(collection: string, assetId: string): Promise<any>;
    getBnplLoanCap(marketPrice: string): Promise<BigNumber>;
    bnplAllowance(token: string, marketPrice: string, principal: string, gsFee: string): Promise<{
        isAllowanceRequired: boolean;
        approve: () => Promise<ethers.ContractTransaction>;
    }>;
    bnplOS(collection: string, assetId: string, duration: string, borrowerAddress: string, principal: string, apr: number): Promise<ethers.ContractTransaction>;
    executeBnpl(collection: string, assetId: string, marketPrice: BigNumberish, assetType: "ERC721" | "ERC1155", duration: string, borrowerAddress: string, principal: string, apr: number, buyData: string, module: string): Promise<ethers.ContractTransaction>;
}

export { AlchemyGetLoans, GS_API_Collections, GS_API_CreateOfferResponse, GS_API_GetLoanTerms, GS_API_VaultData, GetLoansReturnType, GoblinSaxAPI, LoanType, Version };
