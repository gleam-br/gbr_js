pub type Date

@external(javascript, "./dom/date.ffi.mjs", "now")
pub fn now() -> Date

@external(javascript, "./dom/date.ffi.mjs", "toISOString")
pub fn to_iso_string(date: Date) -> String

@external(javascript, "./dom/date.ffi.mjs", "new_")
pub fn new(string: String) -> Date

@external(javascript, "./dom/date.ffi.mjs", "year")
pub fn year(date: Date) -> Int

@external(javascript, "./dom/date.ffi.mjs", "month")
pub fn month(date: Date) -> Int

@external(javascript, "./dom/date.ffi.mjs", "date")
pub fn date(date: Date) -> Int

@external(javascript, "./dom/date.ffi.mjs", "day")
pub fn day(date: Date) -> Int

@external(javascript, "./dom/date.ffi.mjs", "hours")
pub fn hours(date: Date) -> Int

@external(javascript, "./dom/date.ffi.mjs", "minutes")
pub fn minutes(date: Date) -> Int

@external(javascript, "./dom/date.ffi.mjs", "seconds")
pub fn seconds(date: Date) -> Int

@external(javascript, "./dom/date.ffi.mjs", "getTime")
pub fn get_time(date: Date) -> Int
