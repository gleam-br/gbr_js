/**
* @packageDocumentation
* @module location
*
* FFI to window.location
*/

import {
  maybe,
} from "./util_ffi.mjs";


export function load(url) {
  maybe(
    () => { globalThis.location.href = url },
    `Error set location href ${url}`)
}

export function reload() {
  maybe(
    () => globalThis.location.reload(),
    `Error reload location`)
}
