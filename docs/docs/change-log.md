---
sidebar_position: 15
---

# Changelog

## Version 0.0.45

- Reworked connect: connect not creating offline signers, clients and signing clients

- Added Actions:

  - `getOfflineSigners`

- Removed Actions:

  - `createClients`
  - `createSigningClients`
  - `createQueryClient`
  - `getBalances`
  - `getBalanceStaked`

- Breaking Change:

  - `useSendTokens` - added mutation param `signingClient?: SigningStargateClient | SigningCosmWasmClient`
  - `useSendIbcTokens` - added mutation param `signingClient?: SigningStargateClient`
  - `useInstantiateContract` - added mutation param `signingClient?: SigningCosmWasmClient`
  - `useExecuteContract` - added mutation param `signingClient?: SigningCosmWasmClient`
  - `getQuerySmart` - added param `client?: CosmWasmClient`
  - `getQueryRaw` - added param `client?: CosmWasmClient`

- Improved `useBalances` returning all balances from an account not from provided chainInfo(`GrazChain`)

- Added Hooks:

  - `useStargateClient`
  - `useCosmwasmClient`
  - `useTendermintClient`
  - `useStargateSigningClient`
  - `useStargateTmSigningClient`
  - `useCosmwasmSigningClient`
  - `useCosmwasmTmSigningClient`

- Removed Hooks:
  - `useClients`
  - `useSigningClients`
  - `useQueryClient`

## Version 0.0.44

- ✅ Added Vectis Wallet integration

## Version 0.0.43

- ✅ Added `useActiveWalletType` hook

## Version 0.0.42

- ✅ [WalletConnect v2 support](./wallet-connect.md)
- ✅ Added more `WalletType` for connecting WalletConnect wallets
- 🗑️ Deprecated constants, will be removed in next version `mainnetChains`, `mainnetChainsArray`, `testnetChains`, `testnetChainsArray`. Use [`graz generate`](./generate-chain-info.mdx)👍
- 🛠️ Splitted internal store between user session and graz internal
