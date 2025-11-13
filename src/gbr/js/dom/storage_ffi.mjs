/**
 * Módulo c/ funções para manipulação do Web Storage API `Storage`.
 */
import { newError, maybe, checkNull, maybeInstanceOf, maybeAsync, } from "./util_ffi.mjs"

export function getStorage() {
  return maybe(() => {
    const storage = globalThis?.navigator?.storage
    if (globalThis.StorageManager && storage instanceof StorageManager) {
      return storage
    } else {
      throw new Error("No available storage manager!")
    }
  }, "Error get storage")
}

export async function estimate(storageManager) {
  return await maybeAsync(async () => {
    const { quota, usage } = await storageManager.estimate()
    return [quota, usage]
  }, "Error estimate")
}

export async function getDirectory(storageManager) {
  return await maybeAsync(storageManager.getDirectory, "Error directory")
}

export async function persist(storageManager) {
  return await maybeAsync(storageManager.persist, "Error persist")
}

export async function persisted(storageManager) {
  return await maybeAsync(storageManager.persisted, "Error persisted")
}

export function localStorage() {
  try {
    return maybeInstanceOf(globalThis.localStorage, globalThis.Storage,
      "localStorage");
  } catch (error) {
    return newError("Error localStorage: " + String.toString(error));
  }
}

export function sessionStorage() {
  try {
    return maybeInstanceOf(globalThis.sessionStorage, globalThis.Storage,
      "sessionStorage");
  } catch (error) {
    return newError("Error sessionStorage: " + String.toString(error));
  }
}

export function length(storage) {
  return storage.length;
}

export function key(storage, index) {
  return checkNull(storage.key(index), index);
}

export function getItem(storage, keyName) {
  return checkNull(storage.getItem(keyName), keyName);
}

export function setItem(storage, keyName, keyValue) {
  return maybe(() => storage.setItem(keyName, keyValue),
    "Error set item ", "key:", keyName, "value:", keyValue);
}

export function removeItem(storage, keyName) {
  return maybe(() => storage.removeItem(keyName),
    "Error remove item ", "key:", keyName);
}

export function clear(storage) {
  return maybe(() => storage.clear(),
    "Error clear", typeof storage);
}
