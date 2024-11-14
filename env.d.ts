declare namespace NodeJS {
  interface ProcessEnv {
    HOST: string;
    PGUSER: string;
    PASSWORD: string;
    DATABASE: string;
    PORT: string;
  }
}
