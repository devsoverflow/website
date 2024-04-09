---
publishDate: 2024-04-09
author: 'Josudev'
author_url: 'https://josudev.vercel.app/'
language: 'en'
title: 'RobotScript'
description: 'A web rework of R-Info, an old desktop IDE for learning programing basics and concurrency.'
image:
  url: '/content/showcase/robotscript-banner.png'
  alt: 'RobotScript showcase banner'
links:
  repository: 'https://github.com/josu-dev/RobotScript'
  website: 'https://josu-dev.github.io/RobotScript/'
tags: ['open-source', 'ide', 'language-learning', 'web']
---

RobotScript represents a modernized iteration of the R-Info programming environment utilized within the educational framework of the "Facultad de Informatica de la UNLP." The overarching aim is to propel the concept into contemporary times, enriching the array of tools available and refining both interface and accessibility. By transitioning into a web-based platform, it seamlessly integrates into any browser, eliminating the necessity for downloads or installations.

The project's core objective was the revamping of the existing Java-based desktop application into a self-contained web page, thereby ensuring universal accessibility across browsers without requiring any downloads or installations.

## Features

- **Syntax Highlighting**: The code editor has syntax highlighting for the language.
- **Compile**: The code can be compiled to check for syntax errors and semantic errors.
- **Run**: The code can be run to see how the program behaves.
- **Documentation**: The language has a documentation section where the user can see the syntax of the language.
- **Responsive**: The web page is responsive and can be used on any device.

## Differences

## Sintax

There are some syntax differences between R-Info and RobotScript, as follows:

Literal values:

| R-Info | RobotScript |
| :-: | :-: |
| V | true |
| F | false |
| { | /* |
| } | */ |

Expressions evaluated on `si`, `repetir`, and `mientras` control flow sentences must be enclosed in parentheses:

- R-Info

    ```text
    si 16 < amount

    repetir 5

    mientras (56 > n) & state
    ```

- RobotScript

    ```text
    si (16 < amount)

    repetir (5)

    mientras ((56 > n) & state)
    ```

## Execution

The current runner implementation simulates concurrency by offering each robot an opportunity to execute a single instruction. There's a possibility that this instruction might not succeed; in such cases, the robot will attempt it again in the next iteration. This process continues until all robots complete their tasks or until at least one fails.

This approach aims to mimic varying processing speeds among robots.

## Documentation

The documentation comprises two primary sections:

- **Language Documentation**: This section encompasses the language's syntax, semantics, and code examples illustrating various language components such as variables, control flow, functions, etc.

- **Syntax Diagram**: Here, you'll find a visual representation of the language's syntax flow, aiding in understanding the syntax declarations.

Access the documentation at [the language docs](https://josu-dev.github.io/RobotScript/docs/language/).
