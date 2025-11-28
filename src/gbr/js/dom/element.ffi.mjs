import {
  maybe,
  maybeAsync,
  maybeInstanceOf,
  checkNull,
  newOk,
  newError
} from "./util_ffi.mjs"

export function cast(raw) {
  return maybeInstanceOf(raw, Element, `Error cast element`);
}

export function getAttribute(element, name) {
  return checkNull(maybe(
    () => element.getAttribute(name),
    `Error get attr=${name}`));
}

export function setAttribute(element, name, value) {
  element.setAttribute(name, value);
}

export function addEventListener(element, type, listener) {
  return element.addEventListener(type, listener);
}

export function setInnerHTML(element, content) {
  element.innerHTML = content;
}

export function innerText(element) {
  return element.innerText;
}

export function setInnerText(element, content) {
  element.innerText = content;
}

export function insertAdjacentElement(target, position, element) {
  return maybe(
    () => target.insertAdjacentElement(position, element),
    `Error ${target} insert ${position} adj ${element}`);
}

export function insertAdjacentHTML(target, position, element) {
  return maybe(
    () => target.insertAdjacentHTML(position, element),
    `Error ${target} insert ${position} html ${element}`);
}

export function insertAdjacentText(target, position, element) {
  return maybe(
    () => target.insertAdjacentHTML(position, element),
    `Error ${target} insert ${position} text ${element}`);
}

export function nextElementSibling(element) {
  return checkNull(maybe(
    () => element.nextElementSibling,
    "Error next sibling"));
}

export function closest(element, selector) {
  return checkNull(maybe(
    () => element.closest(selector),
    `Error closest=${selector}`));
}

export async function requestFullscreen(element) {
  return await maybeAsync(
    () => element.requestFullscreen(),
    "Error request fullscreen");
}

export function scrollIntoView(element) {
  element.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

export function scrollHeight(element) {
  return element.scrollHeight;
}

export function scrollLeft(element) {
  return element.scrollLeft;
}

export function scrollTop(element) {
  return element.scrollTop;
}

export function scrollWidth(element) {
  return element.scrollWidth;
}

export function setScrollHeight(element, value) {
  element.scrollHeight = value;
}

export function setScrollLeft(element, value) {
  element.scrollLeft = value;
}

export function setScrollTop(element, value) {
  element.scrollTop = value;
}

export function setScrollWidth(element, value) {
  element.scrollWidth = value;
}

export function value(element) {
  return checkNull(element.value);
}

export function setValue(element, value) {
  element.value = value;
}

export function selectionStart(element) {
  return checkNull(element.selectionStart);
}

export function setSelectionRange(element, start, end) {
  element.setSelectionRange(start, end);
}

export function focus(element) {
  element.focus();
}

export function blur(element) {
  element.blur();
}

export function appendChild(parent, child) {
  parent.appendChild(child);
}

export function remove(element) {
  element.remove();
}

export function datasetGet(el, key) {
  if (key in el.dataset) {
    return newOk(el.dataset[key]);
  }

  return newError(undefined);
}

export function getChecked(el) {
  return el.checked;
}

export function setTextContent(element, text) {
  element.textContent = text;
}

export function contains(element, other) {
  return element.contains(other);
}

export function classList(element) {
  return element.classList;
}
