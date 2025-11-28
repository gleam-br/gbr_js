////
//// Javascript document
////
//// - https://developer.mozilla.org/en-US/docs/Web/API/Document
////

import gleam/javascript/array.{type Array}
import gleam/javascript/promise.{type Promise}

import gbr/js/jselement.{type JsElement}
import gbr/js/jsevent.{type JsEvent}

pub type JsDocument

@external(javascript, "./dom/document.ffi.mjs", "querySelector")
pub fn query_selector(selector: String) -> Result(JsElement, String)

@external(javascript, "./dom/document.ffi.mjs", "querySelectorAll")
pub fn query_selector_all(selector: String) -> Array(JsElement)

@external(javascript, "./dom/document.ffi.mjs", "addEventListener")
pub fn add_event_listener(type_: String, listener: fn(JsEvent(t)) -> Nil) -> Nil

@external(javascript, "./dom/document.ffi.mjs", "createElement")
pub fn create_element(tag_name: String) -> JsElement

@external(javascript, "./dom/document.ffi.mjs", "createTextNode")
pub fn create_text_node(content: String) -> JsElement

@external(javascript, "./dom/document.ffi.mjs", "body")
pub fn body() -> JsElement

@external(javascript, "./dom/document.ffi.mjs", "getElementById")
pub fn get_element_by_id(id: String) -> Result(JsElement, String)

@external(javascript, "./dom/document.ffi.mjs", "getElementsByTagName")
pub fn get_elements_by_tag_name(tag_name: String) -> Array(JsElement)

@external(javascript, "./dom/document.ffi.mjs", "readyState")
pub fn ready_state() -> String

/// Get the [`hidden`](https://developer.mozilla.org/en-US/docs/Web/API/Document/hidden)
/// attribute value of the current document
@external(javascript, "./dom/document.ffi.mjs", "hidden")
pub fn hidden() -> Bool

/// Get the [`visibilityState`](https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilityState)
/// attribute value of the current document. It should be either `"visible"` or `"hidden"`.
@external(javascript, "./dom/document.ffi.mjs", "visibilityState")
pub fn visibility_state() -> String

/// Get the [`title`](https://developer.mozilla.org/en-US/docs/Web/API/Document/title)
/// attribute value of the current document.
@external(javascript, "./dom/document.ffi.mjs", "title")
pub fn title() -> String

/// Set the [`title`](https://developer.mozilla.org/en-US/docs/Web/API/Document/title)
/// attribute value of the current document.
@external(javascript, "./dom/document.ffi.mjs", "setTitle")
pub fn set_title(title: String) -> Nil

/// returns the Element that is currently being presented in fullscreen mode in this document.
@external(javascript, "./dom/document.ffi.mjs", "fullscreenElement")
pub fn fullscreen_element(document: JsDocument) -> Result(JsElement, String)

/// exitFullscreen() requests that the element on this document which is currently being presented in fullscreen mode be taken out of fullscreen mode, restoring the previous state of the screen.
@external(javascript, "./dom/document.ffi.mjs", "exitFullscreen")
pub fn exit_fullscreen(document: JsDocument) -> Promise(Result(Nil, String))
