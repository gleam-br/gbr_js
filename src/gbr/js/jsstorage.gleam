//// Bindings to local and session storage.

/// A Storage object (local or session).
///
/// See [https://developer.mozilla.org/en-US/docs/Web/API/Storage](https://developer.mozilla.org/en-US/docs/Web/API/Storage).
pub type Storage

/// Attempts to get the local storage object, fails if it's not available.
@external(javascript, "./dom/storage.ffi.mjs", "localStorage")
pub fn local() -> Result(Storage, String)

/// Attempts to get the session storage object, fails if it's not available.
@external(javascript, "./dom/storage.ffi.mjs", "sessionStorage")
pub fn session() -> Result(Storage, String)

/// Returns the amount of items in the storage.
@external(javascript, "./dom/storage.ffi.mjs", "length")
pub fn length(storage: Storage) -> Int

/// Returns the key of the item with the index `index`, if it exists.
@external(javascript, "./dom/storage.ffi.mjs", "key")
pub fn key(storage: Storage, index: Int) -> Result(String, String)

/// Returns the item with the specified key, if it exists.
@external(javascript, "./dom/storage.ffi.mjs", "getItem")
pub fn get_item(storage: Storage, key: String) -> Result(String, String)

/// Adds or updates an item with the specified key. If the storage is full, an error is returned.
@external(javascript, "./dom/storage.ffi.mjs", "setItem")
pub fn set_item(
  storage: Storage,
  key: String,
  value: String,
) -> Result(Nil, String)

/// Removes an item with the specified key.
@external(javascript, "./dom/storage.ffi.mjs", "removeItem")
pub fn remove_item(storage: Storage, key: String) -> Result(Nil, String)

/// Clears the storage of all items.
@external(javascript, "./dom/storage.ffi.mjs", "clear")
pub fn clear(storage: Storage) -> Result(Nil, String)
