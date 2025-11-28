////
//// Core javascript module
////
//// Manage globalThis instance

import gleam/javascript/promise.{type Promise}
import gleam/option.{type Option}

pub type Global

pub type Object

pub type Window =
  Global

pub type TimerID

/// A long integer value, the request ID, that uniquely identifies the entry in
/// the callback list. This is a non-zero value, but you may not make any other
/// assumptions about its value. You can pass this value to window.cancelAnimationFrame()
/// to cancel the refresh callback request.
pub type RequestID

/// https://developer.mozilla.org/en-US/docs/Web/API/WakeLockSentinel
///
pub type WakeLockSentinel

@external(javascript, "./dom/util.ffi.mjs", "isIE")
pub fn is_ie() -> Bool

@external(javascript, "./dom/util.ffi.mjs", "isEdge")
pub fn is_edge() -> Bool

@external(javascript, "./dom/util.ffi.mjs", "isFirefox")
pub fn is_firefox() -> Bool

@external(javascript, "./dom/core.ffi.mjs", "global")
pub fn global() -> Global

@external(javascript, "./dom/core.ffi.mjs", "get")
pub fn get(in: Global, property: String) -> Result(a, String)

@external(javascript, "./dom/core.ffi.mjs", "newObject")
pub fn new_object() -> Object

@external(javascript, "./dom/core.ffi.mjs", "getObjectKey")
pub fn get_object_key(in: Object, property: String) -> Result(a, String)

@external(javascript, "./dom/core.ffi.mjs", "getObjectInnerKey")
pub fn get_object_inner_key(
  in: Object,
  inner: String,
  property: String,
) -> Result(a, String)

@external(javascript, "./dom/util.ffi.mjs", "try_")
pub fn try(cb: fn(a) -> b, prefix_error: String) -> Result(Option(b), String)

@external(javascript, "./dom/util.ffi.mjs", "tryAsync_")
pub fn try_async(
  cb: fn(a) -> b,
  prefix_error: String,
) -> Promise(Result(Option(b), String))

pub fn try_execute(app: a, cb: fn(b) -> c, req: b) -> Result(c, String) {
  try_execute_(app, "sync", cb, req)
}

pub fn try_execute_async(
  app: a,
  cb: fn(b) -> c,
  req: b,
) -> Promise(Result(c, String)) {
  try_execute_(app, "async", cb, req)
}

@external(javascript, "./dom/util.ffi.mjs", "tryExecute_")
fn try_execute_(app: a, mode: String, cb: fn(b) -> c, req: b) -> d
