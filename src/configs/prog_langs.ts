import type { ProgrammingLanguage } from 'astro:db';

export type ProgLang = typeof ProgrammingLanguage.$inferSelect;

export const progLangs: ProgLang[] = [
  {
    id: 'go',
    name: 'go',
    color: '#00ADD8',
    icon: '/prog_langs/icons/go.svg'
  },
  // {
  //   id:'java',
  //   name:'java',
  //   icon: '/prog_langs/icons/java.svg',
  // },
  {
    id: 'javascript',
    name: 'javascript',
    color: '#F7DF1E',
    icon: '/prog_langs/icons/javascript.svg'
  },
  {
    id: 'php',
    name: 'php',
    color: '#777BB4',
    icon: '/prog_langs/icons/php.svg'
  },
  {
    id: 'python',
    name: 'python',
    color: '#3776AB',
    icon: '/prog_langs/icons/python.svg'
  },
  {
    id: 'ruby',
    name: 'ruby',
    color: '#CC342D',
    icon: '/prog_langs/icons/ruby.svg'
  },
  {
    id: 'rust',
    name: 'rust',
    color: '#000000',
    icon: '/prog_langs/icons/rust.svg'
  },
  {
    id: 'cristal',
    name: 'cristal',
    color: '#000000',
    icon: '/prog_langs/icons/cristal.svg'
  },
  {
    id: 'typescript',
    name: 'typescript',
    color: '#3178C6',
    icon: '/prog_langs/icons/typescript.svg'
  },
  {
    id: 'zig',
    name: 'zig',
    color: '#F7A41D',
    icon: '/prog_langs/icons/zig.svg'
  },
  {
    id: 'c',
    name: 'c',
    color: '#A8B9CC',
    icon: '/prog_langs/icons/c.svg'
  },
  {
    id: 'csharp',
    name: 'c#',
    color: '#512BD4',
    icon: '/prog_langs/icons/csharp.svg'
  },
  {
    id: 'c++',
    name: 'c++',
    color: '#00599C',
    icon: '/prog_langs/icons/c++.svg'
  }
];
