import gleeunit

pub fn main() -> Nil {
  gleeunit.main()
}

// gleeunit test functions end in `_test`
pub fn gbr_js_todo_test() {
  let name = "Gleam pt-BR"
  let greeting = "Hello, " <> name <> " js library testing...!"

  assert greeting == "Hello, Gleam pt-BR js library testing...!"
}
