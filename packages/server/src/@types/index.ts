import { Session } from 'express-session';
import { Ir2Session } from '@monorepo/common';

declare module 'express-session' {
    interface Session {
        // optional ir2? or always there cause maybe we give it...
        ir2?: Ir2Session;
    }
}

declare module 'http' {
    interface IncomingMessage {
        session: Session; // TODO: session type
    }
}
