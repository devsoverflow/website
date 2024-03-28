# Bug fixes during development of the site

## 3/21/2024

- `Module astro:db has no exported member named db` - Fix: https://github.com/withastro/astro/issues/10507

## 3/25/2024

- In order to use `Image` component for optimizing images with vercel adapter must set:
  ```js
  {
    adapter: vercel({
      imageService: true
    });
  }
  ```

## 3/27/2024

- Foreign types not working inside svelte, fix with .npmrc https://github.com/withastro/language-tools/issues/599
