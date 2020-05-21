export interface WASMFuncReturn<T> {
  success: string;
  return: T;
}
export interface WASMPackage<T> {
  exports: T;
  exit: () => void;
}

async function initialWASM<T>(
  url: string,
  pkgName: string,
  callback?: () => void,
): Promise<WASMPackage<T>> {
  if (!WebAssembly.instantiateStreaming) {
    // polyfill
    WebAssembly.instantiateStreaming = async (
      resp: Promise<Response>,
      importObject: Record<string, Record<string, WebAssembly.ImportValue>>,
    ) => {
      const source = await (await resp).arrayBuffer();
      return await WebAssembly.instantiate(source, importObject);
    };
  }

  const go = new (window.global as any).Go();
  let mod, inst;
  try {
    const result = await WebAssembly.instantiateStreaming(fetch(url), go.importObject);
    mod = result.module;
    inst = result.instance;
    go.run(inst);
    return (window.global as any)[pkgName];
  } catch (err) {
    console.error(err);
    if (!!callback) callback();
    throw err;
  }
}

export default initialWASM;
