// This type definition has also been submitted to DefinitelyTyped:
// https://github.com/DefinitelyTyped/DefinitelyTyped/pull/36300
// Including it here while we wait for it to be accepted.
declare module "solid-auth-client" {
    import { EventEmitter } from 'events';

    export interface Session {
        webId: string;
    }
    export interface SolidAuthClient extends EventEmitter {
        fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;
        currentSession(): Promise<Session | undefined>;
        trackSession(callback: (session?: Session) => void): void;
        login(identityProvider: string): Promise<void>;
        logout(): Promise<void>;
        popupLogin(params: { popupUri: string }): Promise<Session>;
    }
    
    declare const instantiated: SolidAuthClient;
    export default instantiated;
}
