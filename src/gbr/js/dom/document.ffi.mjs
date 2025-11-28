import { checkNull, maybeAsync } from "./util_ffi.mjs";

export function querySelector(query) {
  return checkNull(document.querySelector(query), `Error doc query=${query}`)
}

export function querySelectorAll(query) {
  return Array.from(document.querySelectorAll(query));
}

export function addEventListener(type, listener) {
  return document.addEventListener(type, listener);
}

export function createElement(tagName) {
  return document.createElement(tagName);
}

export function createTextNode(content) {
  return document.createTextNode(content);
}

export function body() {
  return document.body;
}

export function getElementById(id) {
  return checkNull(document.getElementById(id), `Error doc by id=${id}`);
}

export function getElementsByTagName(tagName) {
  return Array.from(document.getElementsByTagName(tagName));
}

export function readyState() {
  return document.readyState;
}

export function hidden() {
  return document.hidden;
}

export function visibilityState() {
  return document.visibilityState;
}

export function title() {
  return document.title;
}

export function setTitle(title) {
  document.title = title;
}

export function fullscreenElement(document) {
  return checkNull(document.fullscreenElement, "Error doc full screen")
}

export async function exitFullscreen(document) {
  return await maybeAsync(
    () => document.exitFullscreen(),
    "Error doc exit full screen")
}
