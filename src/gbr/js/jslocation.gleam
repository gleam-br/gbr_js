////
//// Global window location javascript element
////

@external(javascript, "./dom/location.ffi.mjs", "load")
pub fn load(href: String) -> Result(Nil, String)

@external(javascript, "./dom/location.ffi.mjs", "reload")
pub fn reload() -> Result(Nil, String)
