////
//// Javascript element
////
//// - https://developer.mozilla.org/en-US/docs/Web/API/Element
////

import gleam/dynamic
import gleam/dynamic/decode.{type Dynamic, DecodeError}
import gleam/javascript/promise.{type Promise}

import gbr/js/jsevent.{type JsEvent}
import gbr/js/jstoken_list.{type DomTokenList}

pub type JsElement

@external(javascript, "./dom/element.ffi.mjs", "cast")
fn do_cast(raw: Dynamic) -> Result(JsElement, String)

pub fn cast(raw) {
  case do_cast(raw) {
    Ok(element) -> Ok(element)
    Error(_) -> Error(DecodeError("Element", dynamic.classify(raw), []))
  }
}

@external(javascript, "./dom/element.ffi.mjs", "addEventListener")
pub fn add_event_listener(
  a: JsElement,
  b: String,
  c: fn(JsEvent(t)) -> Nil,
) -> fn() -> Nil

@external(javascript, "./dom/element.ffi.mjs", "getAttribute")
pub fn get_attribute(element: JsElement, name: String) -> Result(String, String)

@external(javascript, "./dom/element.ffi.mjs", "setAttribute")
pub fn set_attribute(element: JsElement, name: String, value: String) -> Nil

@external(javascript, "./dom/element.ffi.mjs", "setInnerHTML")
pub fn set_inner_html(element: JsElement, value: String) -> Nil

@external(javascript, "./dom/element.ffi.mjs", "setInnerText")
pub fn set_inner_text(element: JsElement, value: String) -> Nil

@external(javascript, "./dom/element.ffi.mjs", "innerText")
pub fn inner_text(element: JsElement) -> String

pub type Position {
  BeforeBegin
  AfterBegin
  BeforeEnd
  AfterEnd
}

fn position_to_string(position) {
  case position {
    BeforeBegin -> "beforebegin"
    AfterBegin -> "afterbegin"
    BeforeEnd -> "beforeend"
    AfterEnd -> "afterend"
  }
}

@external(javascript, "./dom/element.ffi.mjs", "insertAdjacentElement")
fn do_insert_adjacent_element(
  target: JsElement,
  position: String,
  element: JsElement,
) -> Result(JsElement, String)

pub fn insert_adjacent_element(
  target: JsElement,
  position: Position,
  element: JsElement,
) -> Result(JsElement, String) {
  let position = position_to_string(position)
  do_insert_adjacent_element(target, position, element)
}

@external(javascript, "./dom/element.ffi.mjs", "insertAdjacentHTML")
fn do_insert_adjacent_html(
  target: JsElement,
  position: String,
  html: String,
) -> Result(JsElement, String)

pub fn insert_adjacent_html(
  target: JsElement,
  position: Position,
  html: String,
) -> Result(JsElement, String) {
  let position = position_to_string(position)
  do_insert_adjacent_html(target, position, html)
}

@external(javascript, "./dom/element.ffi.mjs", "insertAdjacentText")
fn do_insert_adjacent_text(
  target: JsElement,
  position: String,
  text: String,
) -> Result(JsElement, String)

pub fn insert_adjacent_text(
  target: JsElement,
  position: Position,
  text: String,
) -> Result(JsElement, String) {
  let position = position_to_string(position)
  do_insert_adjacent_text(target, position, text)
}

@external(javascript, "./dom/element.ffi.mjs", "nextElementSibling")
pub fn next_element_sibling(element: JsElement) -> Result(JsElement, String)

@external(javascript, "./dom/element.ffi.mjs", "closest")
pub fn closest(
  element: JsElement,
  selector: String,
) -> Result(JsElement, String)

@external(javascript, "./dom/element.ffi.mjs", "requestFullscreen")
pub fn request_fullscreen(element: JsElement) -> Promise(Result(Nil, String))

@external(javascript, "./dom/element.ffi.mjs", "scrollIntoView")
pub fn scroll_into_view(element: JsElement) -> Nil

@external(javascript, "./dom/element.ffi.mjs", "scrollHeight")
pub fn scroll_height(element: JsElement) -> Float

@external(javascript, "./dom/element.ffi.mjs", "scrollLeft")
pub fn scroll_left(element: JsElement) -> Float

@external(javascript, "./dom/element.ffi.mjs", "scrollTop")
pub fn scroll_top(element: JsElement) -> Float

@external(javascript, "./dom/element.ffi.mjs", "scrollWidth")
pub fn scroll_width(element: JsElement) -> Float

@external(javascript, "./dom/element.ffi.mjs", "setScrollHeight")
pub fn set_scroll_height(element: JsElement, value: Float) -> Nil

@external(javascript, "./dom/element.ffi.mjs", "setScrollLeft")
pub fn set_scroll_left(element: JsElement, value: Float) -> Nil

@external(javascript, "./dom/element.ffi.mjs", "setScrollTop")
pub fn set_scroll_top(element: JsElement, value: Float) -> Nil

@external(javascript, "./dom/element.ffi.mjs", "setScrollWidth")
pub fn set_scroll_width(element: JsElement, value: Float) -> Nil

@external(javascript, "./dom/element.ffi.mjs", "appendChild")
pub fn append_child(parent: JsElement, child: JsElement) -> Nil

@external(javascript, "./dom/element.ffi.mjs", "remove")
pub fn remove(a: JsElement) -> Nil

@external(javascript, "./dom/element.ffi.mjs", "datasetGet")
pub fn dataset_get(element: JsElement, key: String) -> Result(String, String)

// HTMLDataElement
@external(javascript, "./dom/element.ffi.mjs", "value")
pub fn value(element: JsElement) -> Result(String, String)

@external(javascript, "./dom/element.ffi.mjs", "setValue")
pub fn set_value(element: JsElement, value: String) -> Nil

// Inputs
@external(javascript, "./dom/element.ffi.mjs", "focus")
pub fn focus(element: JsElement) -> Nil

@external(javascript, "./dom/element.ffi.mjs", "blur")
pub fn blur(element: JsElement) -> Nil

@external(javascript, "./dom/element.ffi.mjs", "selectionStart")
pub fn selection_start(element: JsElement) -> Result(Int, String)

@external(javascript, "./dom/element.ffi.mjs", "setSelectionRange")
pub fn set_selection_range(element: JsElement, start: Int, end: Int) -> Nil

@external(javascript, "./dom/element.ffi.mjs", "setTextContent")
pub fn set_text_content(element: JsElement, text: String) -> Nil

@external(javascript, "./dom/element.ffi.mjs", "getChecked")
pub fn get_checked(element: JsElement) -> Bool

@external(javascript, "./dom/element.ffi.mjs", "contains")
pub fn contains(element: JsElement, other: JsElement) -> Bool

@external(javascript, "./dom/element.ffi.mjs", "classList")
pub fn class_list(element: JsElement) -> DomTokenList
