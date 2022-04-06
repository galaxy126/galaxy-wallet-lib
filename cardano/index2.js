
let _wasm = null

const cardano = async () => {
    if (_wasm) return _wasm;
    /**
     * @private
     */
    _wasm = await import("@emurgo/cardano-serialization-lib-browser");
    return _wasm
}

module.exports = cardano