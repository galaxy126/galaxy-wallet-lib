const Cardano = require('cardano-wallet-browser');

module.exports = {
	docs: [
		'https://www.npmjs.com/package/cardano-wallet',
		'https://input-output-hk.github.io/cardano-wallet/api/edge/#tag/Transactions'
	],
	createAddress: (key=null) => {
		try {
			const mnemonic = generateMnemonic();
			let password = Math.random().toString(36).substring(2, 15);
			let settings = Cardano.BlockchainSettings.mainnet();
			let entropy = Cardano.Entropy.from_english_mnemonics(mnemonic);
			// recover the wallet
			let wallet = Cardano.Bip44RootPrivateKey.recover(entropy, password);
			
			// create a wallet account
			let account = wallet.bip44_account(Cardano.AccountIndex.new(0 | 0x80000000));
			let account_public = account.public();
			// create an address
			let chain_pub = account_public.bip44_chain(false);
			let index = Math.round(Math.random()*89999998+10000001);
			let key_pub = chain_pub.address_key(Cardano.AddressKeyIndex.new(index));
			let address = key_pub.bootstrap_era_address(settings);
			return {
				address: address.to_base58(),
				mnemonic,
				password,
				index
			}
		} catch (err) {
			console.log(err)
			return null;
		}
	},

	checkAddress: addr => WAValidator.validate(addr, 'ada'),
	transfer: (from, to) => {
		return new Promise(async resolve=>{
			try{
				const inputs = [
					{ pointer: { id: "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef", index: 1 }, value: 1 },
					{ pointer: { id: "fedcba9876543210fedcba9876543210fedcba9876543210fedcba9876543210", index: 0 }, value: 1 }
				];
				const outputs = [
					{ address: "Ae2tdPwUPEZCEhYAUVU7evPfQCJjyuwM6n81x6hSjU9TBMSy2YwZEVydssL", value: "1826205" }
				];
				 
				// the fee algorithm (i.e. the function to compute the fees of a transaction)
				const fee_algorithm = Wallet.LinearFeeAlgorithm.default();
				 
				let transaction_builder = new Wallet.TransactionBuilder();
				 
				for (let index = 0; index < inputs.length; index++) {
					const pointer = Wallet.TxoPointer.from_json(inputs[index].pointer);
					const value = Wallet.Coin.from(inputs[index].value, 0);
					transaction_builder.add_input(pointer, value);
				}
				 
				for (let index = 0; index < outputs.length; index++) {
					const txout = Wallet.TxOut.from_json(outputs[index]);
					transaction_builder.add_output(txout);
				}
				 
				// verify the balance and the fees:
				const balance = transaction_builder.get_balance(fee_algorithm);
				if (balance.is_negative()) {
					console.error("not enough inputs, ", balance.value().to_str());
					throw Error("Not enough inputs");
				} else {
					if (balance.is_zero()) {
					console.info("Perfect balance no dust");
					} else {
					console.warn("Loosing some coins in extra fees: ", balance.value().to_str());
					}
				}
				 
				// Warning: this function does not throw exception if the transaction is not
				// balanced. This is your job to make sure your transaction's inputs and outputs
				// and fees are balanced.
				let transaction = transaction_builder.make_transaction();
				let transaction_finalizer = new Wallet.TransactionFinalized(transaction);
 
				for (let index = 0; index < inputs.length; index++) {
					const witness = Wallet.Witness.new_extended_key(
						settings,
						key_prv,
						transaction_finalizer.id()
					);
					transaction_finalizer.add_witness(witness);
				}
				
				// at this stage the transaction is ready to be sent
				const signed_transaction = transaction_finalizer.finalize();
				console.log("ready to send transaction: ", signed_transaction.to_hex());
				console.log(signed_transaction.to_json());


				resolve({err:'未知错误'});
			}catch(err){
				resolve({err});
			}
		})
	}
}