declare namespace NodeJS {
  interface ProcessEnv {
    // system
    readonly NODE_ENV: 'development' | 'production';
    readonly VERCEL_ENV: 'development' | 'preview' | 'production';
    readonly VERCEL_GIT_COMMIT_REF: string;
    readonly VERCEL_URL: string;
    // private
    readonly ALCHEMY_API_KEY: string;
    // public
    readonly NEXT_PUBLIC_WALLET_CONNECT_APP_NAME: string;
    readonly NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: string;
  }
}
