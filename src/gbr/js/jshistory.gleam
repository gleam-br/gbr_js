////
//// Global window history javascript element
////

@external(javascript, "./dom/history.ffi.mjs", "pushState")
pub fn push(url: String) -> Result(Nil, String)

@external(javascript, "./dom/history.ffi.mjs", "replaceState")
pub fn replace(url: String) -> Result(Nil, String)
