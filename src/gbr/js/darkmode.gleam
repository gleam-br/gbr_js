////
//// 🌒 Browser dark mode module
////
//// The easy way to manage your dark mode web app.
////

import gleam/bool
import gleam/io
import gleam/option.{type Option}
import gleam/result

import gbr/js/jsdocument
import gbr/js/jselement
import gbr/js/jsglobal as global
import gbr/js/jsstorage as storage
import gbr/js/jstoken_list as token_list

// Alias
//

type DarkMode =
  BrowserDarkMode

/// Browser dark mode type
///
/// - name: Name of key storage in local storage
/// - selector: Where is the class setting dark mode
/// - class: Class style setting dark mode
///
pub opaque type BrowserDarkMode {
  BrowserDarkMode(name: String, selector: String, class: String)
}

/// New default browser dark mode type
///
pub fn new() {
  let name = const_key_storage
  let selector = const_element_selector
  let class = const_class_darkmode

  BrowserDarkMode(name:, selector:, class:)
}

/// Set name to storage state to toggle dark mode in your app
///
/// - in: Dark mode info
/// - name: Local storage key name to manage state dark mode, e.g. selector="browser/darkmode"
///
pub fn name(in: DarkMode, name: String) -> DarkMode {
  BrowserDarkMode(..in, name:)
}

/// Set selector that set class to toggle dark mode in your app
///
/// - in: Dark mode info
/// - selector: Selector element to set dark mode, e.g. selector="body"
///
pub fn selector(in: DarkMode, selector: String) -> DarkMode {
  BrowserDarkMode(..in, selector:)
}

/// Set class that set dark mode in your app
///
/// - in: Dark mode info
/// - class: Class style to set dark mode, e.g. class="dark"
///
pub fn class(in: DarkMode, class: String) -> DarkMode {
  BrowserDarkMode(..in, class:)
}

/// Is enabled dark mode from match media class
///
/// - in: Dark mode info
///
pub fn is_enabled(in: DarkMode) -> Result(Bool, String) {
  let BrowserDarkMode(name:, class:, ..) = in

  use db <- result.map(storage.local())

  let get_item = storage.get_item(db, name)

  case get_item {
    Ok(item) -> item == bool.to_string(True)
    Error(err) -> {
      io.println_error(err)
      global.match_media("(prefers-color-scheme: " <> class <> ")")
    }
  }
}

/// Set dark mode from user media class
///
pub fn from_media(in: DarkMode) -> Result(Bool, String) {
  let BrowserDarkMode(class:, ..) = in

  case is_enabled(in) {
    Ok(True) -> {
      jsdocument.body()
      |> jselement.class_list()
      |> token_list.add_one(class)
      Ok(True)
    }
    Ok(False) -> {
      jsdocument.body()
      |> jselement.class_list()
      |> token_list.remove_one(class)
      Ok(False)
    }
    Error(err) -> Error(err)
  }
}

/// Toggle dark mode
///
/// - force: If included, turns the toggle into a one way-only operation.
///
pub fn toggle(in: DarkMode, force: Option(Bool)) -> Result(Bool, String) {
  let BrowserDarkMode(name:, class:, ..) = in

  let enabled =
    jsdocument.body()
    |> jselement.class_list()
    |> token_list.toggle(class, force)

  use db <- result.try(storage.local())

  use _ <- result.map(
    db
    |> storage.set_item(name, bool.to_string(enabled)),
  )

  enabled
}

// PRIVATE
//

const const_key_storage = "browser/darkmode"

const const_element_selector = "body"

const const_class_darkmode = "dark"
