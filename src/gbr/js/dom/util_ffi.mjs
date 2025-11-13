/**
 * Módulo c/ funções utilitárias.
 */
import { BitArray as BitArrayInner, Ok, Error as GleamError } from "../../../gleam.mjs";
import { toBitArray as toBitArrayInner, } from "../../../../gleam_stdlib/gleam.mjs";

import { unwrap as opt_unwrap } from "../../../../gleam_stdlib/gleam/option.mjs";


export const unwrap = opt_unwrap
export const BitArray = BitArrayInner
export const toBitArray = (array) => toBitArrayInner(array);

export const newOk = (result) => new Ok(result);
export const newError = (msg) => new GleamError(msg);
export const getError = (error) => error
  ? error.message ? error.message
    : error['0'] ? error['0']
      : `${error}`
  : "Unknown error";

export function checkNull(value, errMsg) {
  if (value !== null && value !== undefined) {
    return new Ok(value);
  } else {
    return newError(errMsg + " : " + "Value is null");
  }
}

export function maybe(cb, errMsg) {
  try {
    return newOk(cb());
  } catch (error) {
    return newError(errMsg + " : " + getError(error));
  }
}

export async function maybeAsync(cb, errMsg) {
  try {
    return newOk(await cb());
  } catch (error) {
    return newError(errMsg, ":", getError(error));
  }
}

export function maybeInstanceOf(obj, whatsInstanceOf, errMsg) {
  try {
    if (!whatsInstanceOf) {
      return newError(errMsg, "not found:", whatsInstanceOf);
    }

    if (!(obj instanceof whatsInstanceOf)) {
      return newError(errMsg, typeof obj, "not is of", whatsInstanceOf)
    }

    return newOk(obj);
  } catch (error) {
    return newError(errMsg, "instance of:" + getError(error));
  }
}

export function unexpectError(msg) {
  throw new Error("Unexpected error: " + msg);
}
