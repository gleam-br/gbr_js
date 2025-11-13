import { newOk, newError } from "./util_ffi.mjs";

export async function showDirectoryPicker() {
  try {
    return newOk(await window.showDirectoryPicker());
  } catch (error) {
    return newError(error.toString());
  }
}

export function name(handle) {
  return handle.name
}

export async function getDirectoryHandle(directoryHandle, name, create) {
  try {
    return newOk(await directoryHandle.getDirectoryHandle(name, { create }));
  } catch (error) {
    return newError(error.toString());
  }
}

export async function getFileHandle(directoryHandle, name, create) {
  try {
    return newOk(await directoryHandle.getFileHandle(name, { create }));
  } catch (error) {
    return newError(error.toString());
  }
}

export async function removeEntry(directoryHandle, name, recursive) {
  try {
    return newOk(await directoryHandle.removeEntry(name, { recursive }));
  } catch (error) {
    return newError(error.toString());
  }
}

export async function allEntries(directoryHandle) {
  try {
    const dirs = [];
    const files = [];
    for await (const entry of directoryHandle.values()) {
      if (entry.kind === "file") {
        files.push(entry);
      } else {
        dirs.push(entry);
      }
    }
    return newOk([dirs, files]);
  } catch (error) {
    return newError(error.toString());
  }
}

export async function showOpenFilePicker() {
  try {
    return newOk(await window.showOpenFilePicker());
  } catch (error) {
    return newError(error.toString());
  }
}

export async function showSaveFilePicker() {
  try {
    return newOk(await window.showSaveFilePicker());
  } catch (error) {
    return newError(error.toString());
  }
}

export async function getFile(fileHandle) {
  try {
    return newOk(await fileHandle.getFile());
  } catch (error) {
    return newError(error.toString());
  }
}

export async function createWritable(fileHandle) {
  try {
    return newOk(await fileHandle.createWritable());
  } catch (error) {
    return newError(error.toString());
  }
}

export async function write(writableStream, bitArray) {
  try {
    return newOk(await writableStream.write(bitArray.rawBuffer));
  } catch (error) {
    return newError(error.toString());
  }
}

export async function close(writableStream) {
  try {
    return newOk(await writableStream.close());
  } catch (error) {
    return newError(error.toString());
  }
}
