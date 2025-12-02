/**
* @packageDocumentation
* @module history
*
* FFI to window.history
*/

import {
  maybe,
} from "./util_ffi.mjs";


export function replaceState(url) {
  maybe(
    () => globalThis.history.replaceState({}, "", url),
    `Error replace history ${url}`)
}

export function pushState(url) {
  maybe(
    () => globalThis.history.pushState({}, "", url),
    `Error push history ${url}`)
}

