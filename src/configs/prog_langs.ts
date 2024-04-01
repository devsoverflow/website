import type { ProgrammingLanguage } from 'astro:db';

export type ProgLang = typeof ProgrammingLanguage.$inferSelect;

export const prog_langs: ProgLang[] = [
  {
    id: 'go',
    name: 'go',
    color: '#00ADD8',
    icon: '/prog_langs/icons/go.svg',
    homepage: 'https://go.dev/'
  },
  {
    id:'java',
    name:'java',
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
    icon: '/prog_langs/icons/c++.svg',
    homepage: 'https://isocpp.org/'
  }
];
