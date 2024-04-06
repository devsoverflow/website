import type { ProgrammingLanguage } from 'astro:db';

export type ProgLang = typeof ProgrammingLanguage.$inferSelect;

// List:
// Python x
// JavaScript x
// TypeScript x
// Java x
// C# x
// C++ x
// Markdown x
// Go x
// C x
// HTML X
// Rust x
// PHP x
// Bash x
// Kotlin x
// CSS x
// Swift x
// R x
// Dart x
// Dockerfile x
// SQL x
// Ruby x
// PowerShell x
// JSON x
// Lua x
// Scala x
// XML x
// Objective-C x
// Assembly x
// Makefile x
// GDScript x
// Haskell x
// MATLAB x
// Elixir x
// Julia x
// Perl x
// Clojure x
// Delphi x
// Zig x
// Groovy x
// YAML x
// OCaml x
// Arduino x
// Fortran x
// Pascal x
// F# x
// WebAssembly x
// Crystal x
// Erlang x
// Odin x
// Nim x
// Lisp x
// Scratch
// Smalltalk
// COBOL
// Caret
// Elm

export const prog_langs: ProgLang[] = [
  {
    id: 'go',
    name: 'go',
    color: '#00ADD8',
    icon: '/prog_langs/icons/go.svg',
    homepage: 'https://go.dev/'
  },
  {
    id: 'java',
    name: 'java',
    icon: '/prog_langs/icons/java.svg',
    color: '#007396',
    homepage: 'https://dev.java/'
  },
  {
    id: 'javascript',
    name: 'javascript',
    color: '#F7DF1E',
    icon: '/prog_langs/icons/javascript.svg',
    homepage: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript'
  },
  {
    id: 'php',
    name: 'php',
    color: '#777BB4',
    icon: '/prog_langs/icons/php.svg',
    homepage: 'https://www.php.net/'
  },
  {
    id: 'python',
    name: 'python',
    color: '#3776AB',
    icon: '/prog_langs/icons/python.svg',
    homepage: 'https://www.python.org/'
  },
  {
    id: 'ruby',
    name: 'ruby',
    color: '#CC342D',
    icon: '/prog_langs/icons/ruby.svg',
    homepage: 'https://www.ruby-lang.org/en/'
  },
  {
    id: 'rust',
    name: 'rust',
    color: '#000000',
    icon: '/prog_langs/icons/rust.svg',
    homepage: 'https://www.rust-lang.org/'
  },
  {
    id: 'cristal',
    name: 'cristal',
    color: '#000000',
    icon: '/prog_langs/icons/cristal.svg',
    homepage: 'https://crystal-lang.org/'
  },
  {
    id: 'typescript',
    name: 'typescript',
    color: '#3178C6',
    icon: '/prog_langs/icons/typescript.svg',
    homepage: 'https://www.typescriptlang.org/'
  },
  {
    id: 'zig',
    name: 'zig',
    color: '#F7A41D',
    icon: '/prog_langs/icons/zig.svg',
    homepage: 'https://ziglang.org/'
  },
  {
    id: 'c',
    name: 'c',
    color: '#A8B9CC',
    icon: '/prog_langs/icons/c.svg',
    homepage: 'https://devdocs.io/c/'
  },
  {
    id: 'csharp',
    name: 'c#',
    color: '#512BD4',
    icon: '/prog_langs/icons/csharp.svg',
    homepage: 'https://dotnet.microsoft.com/en-us/languages/csharp'
  },
  {
    id: 'cplusplus',
    name: 'c++',
    color: '#00599C',
    icon: '/prog_langs/icons/cplusplus.svg',
    homepage: 'https://isocpp.org/'
  },
  {
    id: 'markdown',
    name: 'Markdown',
    color: '#000000',
    icon: '/prog_langs/icons/markdown.svg',
    homepage: 'https://commonmark.org/'
  },
  {
    id: 'html',
    name: 'HTML',
    color: '#E44D26',
    icon: '/prog_langs/icons/html.svg',
    homepage: 'https://html.spec.whatwg.org/multipage/'
  },
  {
    id: 'bash',
    name: 'Bash',
    color: '#293138',
    icon: '/prog_langs/icons/bash.svg',
    homepage: 'https://www.gnu.org/software/bash/'
  },
  {
    id: 'kotlin',
    name: 'Kotlin',
    color: '#0095D5',
    icon: '/prog_langs/icons/kotlin.svg',
    homepage: 'https://kotlinlang.org/'
  },
  {
    id: 'css',
    name: 'CSS',
    color: '#1572B6',
    icon: '/prog_langs/icons/css.svg',
    homepage: 'https://www.w3.org/Style/CSS/'
  },
  {
    id: 'swift',
    name: 'Swift',
    color: '#FA7343',
    icon: '/prog_langs/icons/swift.svg',
    homepage: 'https://swift.org/'
  },
  {
    id: 'r',
    name: 'R',
    color: '#276dc3',
    icon: '/prog_langs/icons/r.svg',
    homepage: 'https://www.r-project.org/'
  },
  {
    id: 'dart',
    name: 'Dart',
    color: '#0175C2',
    icon: '/prog_langs/icons/dart.svg',
    homepage: 'https://dart.dev/'
  },
  {
    id: 'dockerfile',
    name: 'Dockerfile',
    color: '#384d54',
    icon: '/prog_langs/icons/dockerfile.svg',
    homepage: 'https://docs.docker.com/reference/dockerfile/'
  },
  {
    id: 'sql',
    name: 'SQL',
    color: '#ffda44',
    icon: '/prog_langs/icons/sql.svg',
    homepage: 'https://en.wikipedia.org/wiki/SQL'
  },
  {
    id: 'powershell',
    name: 'PowerShell',
    color: '#2C5591',
    icon: '/prog_langs/icons/powershell.svg',
    homepage: 'https://docs.microsoft.com/en-us/powershell/'
  },
  {
    id: 'json',
    name: 'JSON',
    color: '#000000',
    icon: '/prog_langs/icons/json.svg',
    homepage: 'https://www.json.org/json-en.html'
  },
  {
    id: 'lua',
    name: 'Lua',
    color: '#000080',
    icon: '/prog_langs/icons/lua.svg',
    homepage: 'https://www.lua.org/'
  },
  {
    id: 'scala',
    name: 'Scala',
    color: '#de3423',
    icon: '/prog_langs/icons/scala.svg',
    homepage: 'https://www.scala-lang.org/'
  },
  {
    id: 'xml',
    name: 'XML',
    color: '#000000',
    icon: '/prog_langs/icons/xml.svg',
    homepage: 'https://www.w3.org/XML/'
  },
  {
    id: 'objectivec',
    name: 'Objective-C',
    color: '#0b5a9d',
    icon: '/prog_langs/icons/objectivec.svg',
    homepage: 'https://developer.apple.com/documentation/objectivec'
  },
  {
    id: 'assembly',
    name: 'ASM',
    color: '#00FF00',
    icon: '/prog_langs/icons/asm.svg',
    homepage: 'https://en.wikipedia.org/wiki/Assembly_language'
  },
  {
    id: 'gdscript',
    name: 'GDScript',
    color: '#478cbf',
    icon: '/prog_langs/icons/gdscript.svg',
    homepage: 'https://docs.godotengine.org/es/4.x/tutorials/scripting/gdscript/index.html'
  },
  {
    id: 'haskell',
    name: 'Haskell',
    color: '#5E5187',
    icon: '/prog_langs/icons/haskell.svg',
    homepage: 'https://www.haskell.org/'
  },
  {
    id: 'matlab',
    name: 'MATLAB',
    color: '#0076A8',
    icon: '/prog_langs/icons/matlab.svg',
    homepage: 'https://www.mathworks.com/products/matlab.html'
  },
  {
    id: 'elixir',
    name: 'Elixir',
    color: '#6e4a7e',
    icon: '/prog_langs/icons/elixir.svg',
    homepage: 'https://elixir-lang.org/'
  },
  {
    id: 'julia',
    name: 'Julia',
    color: '#9558B2',
    icon: '/prog_langs/icons/julia.svg',
    homepage: 'https://julialang.org/'
  },
  {
    id: 'perl',
    name: 'Perl',
    color: '#39457E',
    icon: '/prog_langs/icons/perl.svg',
    homepage: 'https://www.perl.org/'
  },
  {
    id: 'clojure',
    name: 'Clojure',
    color: '#63B132',
    icon: '/prog_langs/icons/clojure.svg',
    homepage: 'https://clojure.org/'
  },
  {
    id: 'delphi',
    name: 'Delphi',
    color: '#f32232',
    icon: '/prog_langs/icons/delphi.svg',
    homepage: 'https://www.embarcadero.com/products/delphi'
  },
  {
    id: 'groovy',
    name: 'Groovy',
    color: '#619cbc',
    icon: '/prog_langs/icons/groovy.svg',
    homepage: 'https://groovy-lang.org/'
  },
  {
    id: 'yaml',
    name: 'YAML',
    color: '#000000',
    icon: '/prog_langs/icons/yaml.svg',
    homepage: 'https://yaml.org/'
  },
  {
    id: 'ocaml',
    name: 'OCaml',
    color: '#EC670F',
    icon: '/prog_langs/icons/ocaml.svg',
    homepage: 'https://ocaml.org/'
  },
  {
    id: 'arduino',
    name: 'Arduino',
    color: '#00979D',
    icon: '/prog_langs/icons/arduino.svg',
    homepage: 'https://www.arduino.cc/'
  },
  {
    id: 'fortran',
    name: 'Fortran',
    color: '#734c94',
    icon: '/prog_langs/icons/fortran.svg',
    homepage: 'https://fortran-lang.org/'
  },
  {
    id: 'pascal',
    name: 'Pascal',
    color: '#253183',
    icon: '/prog_langs/icons/pascal.svg',
    homepage: 'https://www.freepascal.org/'
  },
  {
    id: 'fsharp',
    name: 'F#',
    color: '#30B9DB',
    icon: '/prog_langs/icons/fsharp.svg',
    homepage: 'https://fsharp.org/'
  },
  {
    id: 'webassembly',
    name: 'WebAssembly',
    color: '#654FF0',
    icon: '/prog_langs/icons/webassembly.svg',
    homepage: 'https://webassembly.org/'
  },
  {
    id: 'erlang',
    name: 'Erlang',
    color: '#A90533',
    icon: '/prog_langs/icons/erlang.svg',
    homepage: 'https://www.erlang.org/'
  },
  {
    id: 'odin',
    name: 'Odin',
    color: '#189cff',
    icon: '/prog_langs/icons/odin.svg',
    homepage: 'https://odin-lang.org/'
  },
  {
    id: 'nim',
    name: 'Nim',
    color: '#f3d400',
    icon: '/prog_langs/icons/nim.svg',
    homepage: 'https://nim-lang.org/'
  },
  {
    id: 'lisp',
    name: 'Lisp',
    color: '#000000',
    icon: '/prog_langs/icons/lisp.svg',
    homepage: 'https://lisp-lang.org/'
  },
  {
    id: 'makefile',
    name: 'Makefile',
    color: '#000000',
    icon: '/prog_langs/icons/makefile.svg',
    homepage: 'https://www.gnu.org/software/make/'
  }
];
