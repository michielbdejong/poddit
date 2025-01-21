// Type definitions for solid__react 1.6
// Project: https://github.com/solid/react-components
// Definitions by: Vincent Tunru <https://github.com/Vinnl>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8

declare module "solid-file-client" {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    export function createFile(url: string, contents: string): Promise<any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    export function createFolder(url: string): Promise<any>;
    export function checkSession(): Promise<{webId: string}>;
}
