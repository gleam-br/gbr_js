///
///
///
///
import gleam/dynamic
import gleam/dynamic/decode.{type Dynamic, DecodeError}

fn wrap_cast(raw, f) {
  case f(raw) {
    Ok(event) -> Ok(event)
    Error(Nil) -> Error(DecodeError("Event", dynamic.classify(raw), []))
  }
}

pub type JsEvent(sub)

@external(javascript, "./dom/event_ffi.mjs", "castEvent")
fn do_cast_event(raw: Dynamic) -> Result(JsEvent(Dynamic), Nil)

pub fn cast_event(raw) {
  wrap_cast(raw, do_cast_event)
}

pub type UIEvent(sub)

// event only knows about event target not Element/Document etc
@external(javascript, "./dom/event_ffi.mjs", "target")
pub fn target(event: JsEvent(t)) -> Dynamic

@external(javascript, "./dom/event_ffi.mjs", "currentTarget")
pub fn current_target(event: JsEvent(t)) -> Dynamic

@external(javascript, "./dom/event_ffi.mjs", "preventDefault")
pub fn prevent_default(event: JsEvent(t)) -> Nil

@external(javascript, "./dom/event_ffi.mjs", "stopPropagation")
pub fn stop_propagation(event: JsEvent(t)) -> Nil

pub type KeyboardEvent

@external(javascript, "./dom/event_ffi.mjs", "castKeyboardEvent")
fn do_cast_keyboard_event(
  raw: Dynamic,
) -> Result(JsEvent(UIEvent(KeyboardEvent)), Nil)

pub fn cast_keyboard_event(raw) {
  wrap_cast(raw, do_cast_keyboard_event)
}

@external(javascript, "./dom/event_ffi.mjs", "altKey")
pub fn alt_key(event: JsEvent(UIEvent(KeyboardEvent))) -> Bool

@external(javascript, "./dom/event_ffi.mjs", "code")
pub fn code(event: JsEvent(UIEvent(KeyboardEvent))) -> String

@external(javascript, "./dom/event_ffi.mjs", "ctrlKey")
pub fn ctrl_key(event: JsEvent(UIEvent(KeyboardEvent))) -> Bool

@external(javascript, "./dom/event_ffi.mjs", "isComposing")
pub fn is_composing(event: JsEvent(UIEvent(KeyboardEvent))) -> Bool

@external(javascript, "./dom/event_ffi.mjs", "key")
pub fn key(event: JsEvent(UIEvent(KeyboardEvent))) -> String

@external(javascript, "./dom/event_ffi.mjs", "metaKey")
pub fn meta_key(event: JsEvent(UIEvent(KeyboardEvent))) -> Bool

@external(javascript, "./dom/event_ffi.mjs", "shiftKey")
pub fn shift_key(event: JsEvent(UIEvent(KeyboardEvent))) -> Bool
