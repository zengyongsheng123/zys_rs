const fs = require('fs').promises;

const importObject = {
  a: {
    a: () => 0,
    b: () => 0,
    c: () => {},
    d: () => 0,
  },
};

async function run() {
  try {
    const wasmBuffer = await fs.readFile('111.wasm');
    const { instance } = await WebAssembly.instantiate(wasmBuffer, importObject);
    console.log("var7:", instance.exports.h(100));
    instance.exports.g(200);
    console.log("var925:", new DataView(instance.exports.e.buffer).getBigInt64(4096, true));
  } catch (err) {
    console.error("Error:", err);
  }
}

run();