[![Package Version](https://img.shields.io/hexpm/v/gbr_js)](https://hex.pm/packages/gbr_js)
[![Hex Docs](https://img.shields.io/badge/hex-docs-ffaff3)](https://hexdocs.pm/gbr_js/)

# 🎃 Gleam javascript library.

Javascript library to gleam by @gleam-br.

```sh
gleam add gbr_js@1
```

```gleam
import gbr/js

pub fn main() -> Nil {
  js.try()
}
```

## Development

```sh
gleam run   # Run the project
gleam test  # Run the tests
```

## 🌄 Roadmap

- [ ] Unit tests
- [ ] More docs
- [x] GH workflow
  - [x] test & build
  - [x] changelog & issue to doc
  - [x] ~~auto publish~~ manual publish
    - [x] `gleam publish`
