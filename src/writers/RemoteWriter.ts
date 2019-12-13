import { rateLimit } from '@tolkam/lib-utils';
import { IEvent } from '../types';
import { severityNames } from '../severityLevels';
import AbstractWriter from './AbstractWriter';
import WriterError from './RemoteWriterError';

class RemoteWriter extends AbstractWriter {

    /**
     * @type {IOptions}
     */
    private readonly options: IOptions;

    /**
     * @type {string}
     */
    private prevEvent: string;

    /**
     * @param options
     */
    public constructor(options: IOptions) {
        super();
        this.options = {
            paramName: 'event',
            ...options
        };

        // write once per second
        this.write = rateLimit(this.write, 1000);
    }

    /**
     * @inheritDoc
     */
    public write = (event: IEvent): void => {
        const { url, paramName, request, serializer } = this.options;

        // unable to write own errors
        if(event.payload instanceof WriterError) {
            console.error(`Can't write own error:`, event.payload);
            return;
        }

        const encoded = encodeURIComponent(btoa(
            serializer ? serializer(event) : this.serialize(event)
        ));

        // simple check to avoid multiple reports of the same event
        if(encoded === this.prevEvent) {
            return;
        }

        const requestInit: RequestInit = {
            ...request,
            method: 'POST',
            body: new URLSearchParams(
                `${paramName}=${(encoded)}`
            ),
        };

        fetch(url, requestInit)
            .then((r: Response) => {
                if(!r.ok) {
                    throw new WriterError(
                        `Invalid endpoint response ${r.status} (${r.statusText})`
                    );
                }
            }).catch((e) => {
                let error = e;

                // convert native errors to own
                if(e instanceof Error && !(e instanceof WriterError)) {
                    error = new WriterError(e.message);
                }

                setTimeout(() => { throw error });
            });

        this.prevEvent = encoded;
    };

    /**
     * Serializes event
     *
     * @param event
     */
    private serialize(event: IEvent): string {
        const { issuer, payload, severity } = event;
        const { navigator, screen, location } = window;

        const formatted: any = {
            issuer,
            severity: severityNames[severity],
            url: location.href,
            environment: {
                userAgent: navigator.userAgent,
                screen: {
                    w: screen.availWidth,
                    h: screen.availHeight,
                    orientation: screen.orientation.type
                },
                connection: (navigator as any)?.connection?.effectiveType,
            }
        };

        if(payload instanceof Error) {
            const { name, message } = payload;

            // trim long traces
            const stack = payload.stack
                ? payload.stack.substring(0, 1024)
                : '';

            formatted.error = { name, message, stack };
        } else {
            formatted.raw = payload;
        }

        return JSON.stringify(formatted);
    }
}

interface IOptions {
    // endpoint url
    url: string;

    // POST parameter name
    paramName?: string;

    // custom event serializer
    serializer?: (event: IEvent) => string;

    // additional fetch request config
    request?: Omit<RequestInit, 'body' | 'window' | 'method'>;
}

export default RemoteWriter;
