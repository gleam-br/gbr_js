/**
* @packageDocumentation
* @module location
*
* FFI to window.location
*/

import {
  maybe,
  newError
} from "./util_ffi.mjs";

export function href(location, url) {
  maybe(
    () => { location.href = url },
    `Error set location href ${url}`)
}

export function get(location, property) {
  maybe(
    () => location[property],
    `Error set location href ${url}`)
}

export function reload(location) {
  maybe(
    () => location.reload(),
    `Error reload location`)
}

export function getHash(location) {
  const hash = maybe(
    () => location.hash,
    "Error location hash");

  if (hash == "") {
    return newError("Empty location hash");
  }

  return maybe(
    () => decodeURIComponent(hash.slice(1)),
    `Error decode location hash`);
}

export function getSearch(location) {
  const search = maybe(
    () => location.search,
    "Error location search");

  if (search == "") {
    return newError("Empty location search");
  }

  return maybe(
    () => decodeURIComponent(search.slice(1)),
    `Error decode location search`);
}
