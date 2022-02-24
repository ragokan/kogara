declare global {
  var __VUE_PROD_DEVTOOLS__: boolean;
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
    }
  }
}

export {};
