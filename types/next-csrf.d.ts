declare module 'next-csrf' {
  export function initCSRF(config: { secret: string }): {
    csrf: any;
    setup: any;
  };
}
