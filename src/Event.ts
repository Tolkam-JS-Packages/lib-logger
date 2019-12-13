import { IEvent, TSeverityLevel } from './types';

class Event implements IEvent {

    /**
     * @param issuer
     * @param severity
     * @param payload
     */
    public constructor(
        public readonly issuer: string,
        public readonly severity: TSeverityLevel,
        public readonly payload: unknown,
    ) {}
}

export default  Event;