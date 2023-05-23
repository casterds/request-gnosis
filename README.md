# Request Network Implementation In React App TestNet

## Steps

### Generateing Request
- Connect Wallet to goerli testnet
- Set Request Configuration
    
    - set currency (in goerli network only support FAU token)
    - set amount 
    - set payer address

- Click Request button to sign request
- In my Network ERC20 Payment table select unpaid request and share link with payer

### Pay Request
- Payer Can link or in his History table can select unpaid request
- If payer has enough funds then ACCEPT REQUEST button will be work without problems

### History Table
- History table shows the history of requests between payer and payee.
- Payee can cancel unprocessed requests
- Payer will approve the requests


# Help Links

## Faucet Test Token in Goerli 
- https://erc20faucet.com/
## Supported by request network protocol
- https://docs.request.network/


### Task Cases

- Implemented the payment appliaction on gnosis Testnet.
- integrated all the requirements and it works fine.
- payment token are supported by the request network. for gnosis chiado testnet doesn't have payment token in request network. it payment request applicable for xDai currency only.
- Integrated with Banana wallet.
 
    - Due to account abstraction in banana, facing some issue to sign a transaction.
    - In RequestNetwork config, banana wallet provider doesn't config with signature Provider,
    - Signature provider connect with privateKey, but in the banana wallet doesn't have privateKe becuse of account abstraction
    - For createRequest, we can't execute using signer wallet.
