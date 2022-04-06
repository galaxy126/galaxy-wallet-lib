const bip39 = require('bip39');
const bip32 = require('bip32');
const hdkey = require('hdkey');
const ethUtil = require('ethereumjs-util');
/* const wallet = require('ethereumjs-wallet'); */
const bchaddr = require('bchaddrjs');
/* const mnemonic = require('bitcore-mnemonic') */
const Buffer = require('buffer').Buffer

/* const metamask = async () => {
    const mnemonic = '';
    const hdpath = "m/44'/60'/0'/0/";
    const seed = await bip39.mnemonicToSeed(mnemonic)

    const hdwallet = wallet.hdkey.fromMasterSeed(seed);
    const address_index = 1
    const w = hdwallet.derivePath(hdpath + address_index).getWallet();
    const address = "0x" + w.getAddress().toString("hex");
    console.log(address)
}
metamask() */

module.exports = {
    bip39,
    bip32,
    hdkey,
    Buffer,
    bchaddr,
    ethUtil,
}