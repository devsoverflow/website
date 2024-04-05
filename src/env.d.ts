/// <reference path="../.astro/db-types.d.ts" />
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    session: import('lucia').Session | null;
    user: import('lucia').User | null;
  }
}

// https://docs.astro.build/es/guides/environment-variables/#intellisense-para-typescript
interface ImportMetaEnv {
  // Project-specific environment variables
  readonly DISCORD_CLIENT_ID: string;
  readonly DISCORD_CLIENT_SECRET: string;

  readonly DISCORD_SERVER_ID: string;

  readonly SHARED_DATABASE_URL: string;
  readonly SHARED_DATABASE_AUTH_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
