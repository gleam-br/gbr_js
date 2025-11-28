/**
* @packageDocumentation
* @module core
*
* FFI to core javascript functions
*/

/**
 * Return globalThis/window instance
 *
 * @returns Instance of globalThis/window
 */
export function global() {
  if (globalThis) return globalThis
  if (window) return window
}

export function newObject() {
  return {}
}

export function isObjectEmpty(result) {
  return !result
    || result === undefined
    || result === null
    || (typeof result === "object" && result == {})
}

export function setObjectKey(result, key, value) {
  if (!result) result = {}
  result[key] = value
  return result
}

export function setObjectInnerKey(result, parent, key, value) {
  if (!result) result = {}
  if (!result[parent]) result[parent] = {}
  result[parent][key] = value
  return result
}

export function getObjectKey(result, key) {
  if (result
    && result[key]
    && result[key] !== undefined
    && result[key] !== null) {
    return new Some(result[key])
  }
  return new None()
}

export function getObjectInnerKey(result, parent, key) {
  if (result
    && result[parent]
    && result[parent] !== undefined
    && result[parent] !== null
    && result[parent][key]
    && result[parent][key] !== undefined
    && result[parent][key] !== null
  ) return new Some(result[parent][key])
  return new None()
}
