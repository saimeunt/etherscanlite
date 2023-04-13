declare namespace NodeJS {
  interface ProcessEnv {
    // system
    readonly NODE_ENV: 'development' | 'production';
    readonly VERCEL_ENV: 'development' | 'preview' | 'production';
    readonly VERCEL_GIT_COMMIT_REF: string;
    readonly VERCEL_URL: string;
    // private
    // public
    readonly NEXT_PUBLIC_ALCHEMY_API_KEY: string;
    readonly NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: string;
  }
}
