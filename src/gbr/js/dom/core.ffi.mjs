/**
* @packageDocumentation
* @module core
*
* FFI to core javascript functions
*/

import {
  Ok as GleamOk,
  Error as GleamError,
  BitArray as BitArrayInner,
} from "../../../gleam.mjs";

import {
  toBitArray as toBitArrayInner,
} from "../../../../gleam_stdlib/gleam.mjs";

import {
  unwrap as opt_unwrap
} from "../../../../gleam_stdlib/gleam/option.mjs";

// Browser check variables
//
// If you support IE, our recommendation is that you sign-in using Redirect APIs
// If you as a developer are testing using Edge InPrivate mode, please add "isEdge" to the if check
//
const ua = window.navigator.userAgent;
const msie = ua.indexOf("MSIE ");
const msie11 = ua.indexOf("Trident/");
const msedge = ua.indexOf("Edge/");
const firefox = ua.indexOf("Firefox");

/** Is browser Internet Explorer */
export const isIE = msie > 0 || msie11 > 0;

/** Is browser Edge */
export const isEdge = msedge > 0;

/** Is browser Firefox
 *
 * > Only needed if you need to support the redirect flow in Firefox incognito
 */
export const isFirefox = firefox > 0;

/** Helper function to create gleam result.Ok */
export const newOk = (result) => new GleamOk(result);

/** Helper function to create gleam result.Error (avoid conflict js global constructor Error) */
export const newError = (msg) => new GleamError(msg);

/** Alias to unwrap value from gleam type option.Option */
export const unwrap = opt_unwrap

/** Alias to gleam type BitArray (avoid conflict to js BitArray) */
export const BitArray = BitArrayInner

/** Helper to convert js type bit array to gleam type */
export const toBitArray = (array) => toBitArrayInner(array);

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

/**
 * Executes app function in mode, 'sync' or 'async', with req param
 *
 * > The request param of function should be a js object with key/value structure
 * > Not use to function that needs multi parameters
 *
 * If you no pass req param the functino is call without parameters
 *
 * @param {*} app Application, js object, with the function to execute
 * @param {*} mode 'sync' or 'async'
 * @param {*} fn Function to execute
 * @param {*} req Function param request
 * @returns The execute return in result.Ok(a) or result.Error(String)
 */
export function tryExecute_(app, mode, fn, req) {
  if (!app || typeof app !== 'object') {
    return newError(`Try execute app is null or is not a object type`)
  }

  let exe = try_

  if (mode === 'async') {
    exe = tryAsync_
  }

  return exe(
    () => isObjectEmpty(req) ? app[`${fn}`]() : app[`${fn}`](req),
    `exec ${mode} ${fn} ${req && req != {} ? 'w/' : 'without'} request`)
}

/**
 * Execute callback, mode 'sync', when is ok return:
 *
 * - result.Ok(Option(a))
 *
 * > Option result from callback execute, or else:
 *
 * - result.Error(String)
 *
 * > Error message
 *
 * @param {*} cb Function without params to execute.
 * @param {*} errMsg Prefix error msg, when execute throw error
 *
 * @returns Result(Option(return), String)
 */
export function try_(cb, errMsg) {
  try {
    let result = cb()

    if (result) {
      return newOk(new Some(result))
    }

    return newOk(new None)
  } catch (error) {
    return newError(`${errMsg} : ${getError(error)}`)
  }
}

/**
 * Execute callback, mode 'async', when is ok return:
 *
 * - result.Ok(Option(a))
 *
 * > Option result from callback execute, or else:
 *
 * - result.Error(String)
 *
 * > Error message
 *
 * @param {*} cb Function without params to execute.
 * @param {*} errMsg Prefix error msg, when execute throw error
 *
 * @returns Result(Option(return), String)
 */
export async function tryAsync_(cb, errMsg) {
  try {
    const result = await cb()

    if (result) {
      return newOk(new Some(result))
    }

    return newOk(new None())
  } catch (error) {
    return newError(`${errMsg} : ${getError(error)}`);
  }
}

/**
 * Execute the check if object instance is instance of at type
 *
 * This executes `a instanceof B`, if true:
 *
 * - Return the result.Ok(a)
 *
 * Else,
 *
 * - Return the result.Error(String)
 *
 * @param {*} instance Object instance to check
 * @param {*} whatsInstanceOf Type to check instance of.
 * @param {*} errMsg Error message, when callback thow error.
 * @returns Instance when instance of type, else error.
 */
export function tryInstanceOf_(instance, whatsInstanceOf, errMsg) {
  try {
    if (!whatsInstanceOf) {
      return newError(`${errMsg} not found: ${whatsInstanceOf}`);
    }

    if (!(instance instanceof whatsInstanceOf)) {
      return newError(`${errMsg} ${typeof instance} not instance of ${whatsInstanceOf}`)
    }

    return newOk(instance);
  } catch (error) {
    return newError(`${errMsg} instance of ${getError(error)}`)
  }
}

/**
 * Check value is not null then:
 *
 * - Return result.Ok(value), or else:
 *
 * - Return result.Error(String)
 */
export function checkNull(value, errMsg) {
  if (value === null && value === undefined) {
    return newError(`${errMsg} : Value is null`);
  } else {
    return newOk(value);
  }
}

/**
 * Convert object error or another in string
 *
 * @param {*} error Error instance
 * @returns String representation of error.
 */
export const getError = (error) => error
  ? error.message ? error.message
    : error['0'] ? error['0']
      : `${JSON.stringify(error)}`
  : "Unknown error";

// PRIVATE
//

/** TODO */
async function tryOr(tryCb, orCb, info) {
  try {
    const result = await tryCb()

    if (emptyKeyValue(result)) {
      return newOk()
    }

    return newOk(result)
  } catch (error) {

    if (!(error instanceof msal.InteractionRequiredAuthError)) {
      return newError(error, info + " [ERROR]")
    }

    try {
      const result = await orCb()

      return newOk(result)
    } catch (error2) {
      return newError(error2, info + " fallback [ERROR]")
    }
  }
}
