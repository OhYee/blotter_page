import initialWASM, { WASMPackage, WASMFuncReturn } from '@/utils/wasm';

export type HashType = 'sha1' | 'sha224' | 'sha256' | 'sha384' | 'sha512';
export type Crypto = WASMPackage<{
  defaultBase64Key: string;
  base64: (input: Uint8Array, key?: string) => WASMFuncReturn<string>;
  debase64: (input: string, key?: string) => WASMFuncReturn<Uint8Array>;
  sha1: (input: Uint8Array) => WASMFuncReturn<Uint8Array>;
  sha224: (input: Uint8Array) => WASMFuncReturn<Uint8Array>;
  sha256: (input: Uint8Array) => WASMFuncReturn<Uint8Array>;
  sha384: (input: Uint8Array) => WASMFuncReturn<Uint8Array>;
  sha512: (input: Uint8Array) => WASMFuncReturn<Uint8Array>;
  encrypto_replace: (input: string, key: string) => WASMFuncReturn<string>;
  decrypto_replace: (input: string, key: string) => WASMFuncReturn<string>;
  caesar: string;
  hmac: (input: Uint8Array, key: Uint8Array, algorithm: HashType) => WASMFuncReturn<Uint8Array>;
  totp: (
    key: Uint8Array,
    diff: number,
    digit: number,
  ) => WASMFuncReturn<{ code: number; left: number }>;
  des_encrypto: (input: Uint8Array, key: Uint8Array) => WASMFuncReturn<Uint8Array>;
  des_decrypto: (input: Uint8Array, key: Uint8Array) => WASMFuncReturn<Uint8Array>;
}>;

async function initialCrypto(callback?: () => void): Promise<Crypto> {
  return await initialWASM('//static.oyohyee.com/crypto.wasm', 'ohyee_crypto', callback);
}

export default initialCrypto;
