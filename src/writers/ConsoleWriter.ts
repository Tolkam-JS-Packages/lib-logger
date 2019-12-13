import { IEvent } from '../types';
import AbstractWriter from './AbstractWriter';
import { severities, severityNames } from '../severityLevels';

export default class ConsoleWriter extends AbstractWriter {

    /**
     * @inheritDoc
     */
    public write(event: IEvent): void {
        const { severity } = event;

        let method = 'log';
        if(severity < severities.WARNING) {
            method = 'error';
        } else if(severity < severities.INFO) {
            method = 'warn';
        } else if(severity === severities.INFO) {
            method = 'info';
        }

        console[method](
            `[${event.issuer}.${severityNames[severity]}]:`,
            event.payload
        );
    }
}