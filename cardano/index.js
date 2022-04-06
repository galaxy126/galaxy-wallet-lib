class Loader {
    async load() {
      if (this._wasm) return;
      this._wasm = await import("@emurgo/cardano-serialization-lib-browser/");
    }
  
    get Cardano() {
      return this._wasm;
    }
}

  
async function Cardano() {
    const loader = new Loader()
    await loader.load();
    return loader.Cardano;
}

module.exports = Cardano