////
//// Global window javascript element
////

import gleam/javascript/promise.{type Promise}

import gbr/js/jscore.{
  type Global, type RequestID, type TimerID, type WakeLockSentinel, type Window,
}
import gbr/js/jsdocument.{type JsDocument}
import gbr/js/jsevent.{type JsEvent}

pub fn self() -> Global {
  jscore.global()
}

@external(javascript, "./dom/global.ffi.mjs", "encodeURI")
pub fn encode_uri(a: String) -> String

@external(javascript, "./dom/global.ffi.mjs", "decodeURI")
pub fn decode_uri(a: String) -> String

@external(javascript, "./dom/global.ffi.mjs", "decodeURIComponent")
pub fn decode_uri_component(a: String) -> String

// https://tc39.es/ecma262/multipage/global-object.html#sec-globalthis
@external(javascript, "./dom/global.ffi.mjs", "setTimeout")
pub fn set_timeout(delay: Int, callback: fn() -> anything) -> TimerID

@external(javascript, "./dom/global.ffi.mjs", "clearTimeout")
pub fn clear_timeout(timer: TimerID) -> Nil

@external(javascript, "./dom/global.ffi.mjs", "setInterval")
pub fn set_interval(delay: Int, callback: fn() -> anything) -> TimerID

@external(javascript, "./dom/global.ffi.mjs", "clearInterval")
pub fn clear_interval(id: TimerID) -> Nil

@external(javascript, "./dom/global.ffi.mjs", "alert")
pub fn alert(a: String) -> Nil

@external(javascript, "./dom/global.ffi.mjs", "prompt")
pub fn prompt(a: String) -> Result(String, Nil)

@external(javascript, "./dom/global.ffi.mjs", "addEventListener")
pub fn add_event_listener(type_: String, listener: fn(JsEvent(t)) -> Nil) -> Nil

pub fn dom_content_loaded(listener: fn(JsEvent(t)) -> Nil) -> Nil {
  add_event_listener("DOMContentLoaded", listener)
}

@external(javascript, "./dom/global.ffi.mjs", "document")
pub fn document(window: Window) -> JsDocument

@external(javascript, "./dom/global.ffi.mjs", "requestWakeLock")
pub fn request_wake_lock() -> Promise(Result(WakeLockSentinel, Nil))

// window.loacation
@external(javascript, "./dom/global.ffi.mjs", "location")
pub fn location() -> String

@external(javascript, "./dom/global.ffi.mjs", "locationOf")
pub fn location_of(window: Window) -> Result(String, String)

@external(javascript, "./dom/global.ffi.mjs", "setLocation")
pub fn set_location(window: Window, url: String) -> Nil

@external(javascript, "./dom/global.ffi.mjs", "origin")
pub fn origin() -> String

@external(javascript, "./dom/global.ffi.mjs", "pathname")
pub fn pathname() -> String

// reload exists on the location object but exposed at top level here
@external(javascript, "./dom/global.ffi.mjs", "reload")
pub fn reload() -> Nil

@external(javascript, "./dom/global.ffi.mjs", "reloadOf")
pub fn reload_of(window: Window) -> Nil

// window.history
@external(javascript, "./dom/global.ffi.mjs", "historyPushState")
pub fn history_push() -> Result(Nil, String)

@external(javascript, "./dom/global.ffi.mjs", "historyReplaceState")
pub fn history_replace() -> Result(Nil, String)

@external(javascript, "./dom/global.ffi.mjs", "host")
pub fn host() -> String

@external(javascript, "./dom/global.ffi.mjs", "focus")
pub fn focus(window: Window) -> Nil

@external(javascript, "./dom/global.ffi.mjs", "getHash")
pub fn get_hash() -> Result(String, Nil)

@external(javascript, "./dom/global.ffi.mjs", "getSearch")
pub fn get_search() -> Result(String, Nil)

@external(javascript, "./dom/global.ffi.mjs", "innerHeight")
pub fn inner_height(window: Window) -> Int

@external(javascript, "./dom/global.ffi.mjs", "innerWidth")
pub fn inner_width(window: Window) -> Int

@external(javascript, "./dom/global.ffi.mjs", "outerHeight")
pub fn outer_height(window: Window) -> Int

@external(javascript, "./dom/global.ffi.mjs", "outerWidth")
pub fn outer_width(window: Window) -> Int

@external(javascript, "./dom/global.ffi.mjs", "screenX")
pub fn screen_x(window: Window) -> Int

@external(javascript, "./dom/global.ffi.mjs", "screenY")
pub fn screen_y(window: Window) -> Int

@external(javascript, "./dom/global.ffi.mjs", "screenTop")
pub fn screen_top(window: Window) -> Int

@external(javascript, "./dom/global.ffi.mjs", "screenLeft")
pub fn screen_left(window: Window) -> Int

@external(javascript, "./dom/global.ffi.mjs", "scrollX")
pub fn scroll_x(window: Window) -> Int

@external(javascript, "./dom/global.ffi.mjs", "scrollY")
pub fn scroll_y(window: Window) -> Int

//TODO trocar Json -> Dynamic ??
//@external(javascript, "../../worker_ffi.mjs", "onMessage")
//pub fn on_message(worker: Window, handle: fn(Json) -> Nil) -> Nil

@external(javascript, "./dom/global.ffi.mjs", "open")
pub fn open(
  url: String,
  name: String,
  features: String,
) -> Result(Window, String)

@external(javascript, "./dom/global.ffi.mjs", "close")
pub fn close(window: Window) -> Bool

@external(javascript, "./dom/global.ffi.mjs", "closed")
pub fn closed(window: Window) -> Bool

@external(javascript, "./dom/global.ffi.mjs", "queueMicrotask")
pub fn queue_microtask(callback: fn() -> Nil) -> Nil

@external(javascript, "./dom/global.ffi.mjs", "requestAnimationFrame")
pub fn request_animation_frame(callback: fn(Float) -> Nil) -> RequestID

@external(javascript, "./dom/global.ffi.mjs", "cancelAnimationFrame")
pub fn cancel_animation_frame(request_id: RequestID) -> Nil

@external(javascript, "./dom/global.ffi.mjs", "matchMedia")
pub fn match_media(selector: String) -> Bool
