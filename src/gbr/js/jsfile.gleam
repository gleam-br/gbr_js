import gleam/javascript/promise.{type Promise}

pub type File

@external(javascript, "./dom/file.ffi.mjs", "new_")
pub fn new(bits: BitArray, name: String) -> File

// A promise that resolves with a string which contains the blob's data as a text string.
// The data is always presumed to be in UTF-8 format.
@external(javascript, "./dom/file.ffi.mjs", "text")
pub fn text(file: File) -> Promise(String)

@external(javascript, "./dom/file.ffi.mjs", "bytes")
pub fn bytes(file: File) -> Promise(BitArray)

@external(javascript, "./dom/file.ffi.mjs", "name")
pub fn name(file: File) -> String

@external(javascript, "./dom/file.ffi.mjs", "mime")
pub fn mime(file: File) -> String

@external(javascript, "./dom/file.ffi.mjs", "size")
pub fn size(file: File) -> Int

@external(javascript, "./dom/file.ffi.mjs", "createObjectURL")
pub fn create_object_url(object: File) -> String
