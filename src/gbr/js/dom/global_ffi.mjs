/**
 * Módulo c/ funções javascript globais
 */
import {
  maybe,
  maybeAsync,
  checkNull,
  newOk,
  newError
} from './util_ffi.mjs'

export function self() {
  return globalThis;
}

export function setTimeout(delay, callback) {
  return globalThis.setTimeout(callback, delay);
}

export function clearTimeout(timer) {
  globalThis.clearTimeout(timer);
}

export function setInterval(delay, callback) {
  return globalThis.setInterval(callback, delay);
}

export function clearInterval(timer) {
  globalThis.clearInterval(timer);
}

export function encodeURI(value) {
  return globalThis.encodeURI(value);
}

export function decodeURI(value) {
  return globalThis.decodeURI(value);
}

export function decodeURIComponent(value) {
  return globalThis.decodeURIComponent(value);
}

export function alert(message) {
  window.alert(message);
}

export function prompt(message, defaultValue) {
  return checkNull(maybe(
    () => window.prompt(message, defaultValue),
    `Error prompt=${message}`))
}

export function addEventListener(type, listener) {
  return window.addEventListener(type, listener);
}

export function document(window) {
  return window.document;
}

export async function requestWakeLock() {
  return await maybeAsync(
    () => window.navigator.wakeLock.request("screen"),
    "Error requesting wake lock");
}

export function location() {
  return window.location.href;
}

/**
 * Location href from window object passed
 */
export function locationOf(w) {
  return maybe(
    () => w.location.href,
    `Error location href=${w}`)
}

export function setLocation(w, url) {
  w.location.href = url;
}

export function host() {
  return window.location.host;
}

export function origin() {
  return window.location.origin;
}

export function pathname() {
  return window.location.pathname;
}

export function reload() {
  return window.location.reload();
}

export function reloadOf(w) {
  return w.location.reload();
}

export function focus(w) {
  return w.focus();
}

export function getHash() {
  const hash = maybe(
    () => window.location.hash,
    "Error location hash");

  if (hash == "") {
    return newError("Empty location hash");
  }

  return newOk(decodeURIComponent(hash.slice(1)));
}

export function getSearch() {
  const search = maybe(
    () => window.location.search,
    "Error location search");

  if (search == "") {
    return newError("Empty location search");
  }

  return newOk(decodeURIComponent(search.slice(1)));
}

export function innerHeight(w) {
  return w.innerHeight;
}

export function innerWidth(w) {
  return w.innerWidth;
}

export function outerHeight(w) {
  return w.outerHeight;
}

export function outerWidth(w) {
  return w.outerWidth;
}

export function screenX(w) {
  return w.screenX;
}

export function screenY(w) {
  return w.screenY;
}

export function screenTop(w) {
  return w.screenTop;
}

export function screenLeft(w) {
  return w.screenLeft;
}

export function scrollX(w) {
  return w.scrollX;
}

export function scrollY(w) {
  return w.scrollY;
}

export function open(url, target, features) {
  return maybe(
    () => window.open(url, target, features),
    `Error open url=${url} target=${target}`)
}

export function close(w) {
  w.close();
}

export function closed(w) {
  return w.closed;
}

export function queueMicrotask(callback) {
  return window.queueMicrotask(callback);
}

export function requestAnimationFrame(callback) {
  return window.requestAnimationFrame(callback);
}

export function cancelAnimationFrame(callback) {
  return window.cancelAnimationFrame(callback);
}

export function getCurrentPosition(success, error) {
  globalThis.navigator.geolocation.getCurrentPosition(success, error)
}

export function matchMedia(selector) {
  return window.matchMedia(selector).matches
}
