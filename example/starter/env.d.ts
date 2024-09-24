declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_CAPSULE_ENV?: "DEV" | "SANDBOX" | "BETA" | "PROD";
  }
}
