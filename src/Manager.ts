import { IWriter, TSeverityLevel } from './types';
import { severities } from './severityLevels';
import Event from './Event';

class Manager {

    private writers: IWriter[] = [];

    /**
     * @param instanceName
     */
    public constructor(private instanceName = 'default') {
    }

    /**
     * Adds writer
     *
     * @param writer
     *
     * @returns {this}
     */
    public addWriter(writer: IWriter): this {
        this.writers.push(writer);

        return this;
    }

    /**
     * Adds writers
     *
     * @param writers
     *
     * @returns {this}
     */
    public addWriters(writers: IWriter[]): this {
        for(const writer of writers) {
            this.addWriter(writer);
        }

        return this;
    }

    /**
     * Helpers
     */
    public emergency(payload: any): boolean {
        return this.log(payload, severities.EMERGENCY);
    }

    public alert(payload: any): boolean {
        return this.log(payload, severities.ALERT);
    }

    public critical(payload: any): boolean {
        return this.log(payload, severities.CRITICAL);
    }

    public error(payload: any): boolean {
        return this.log(payload, severities.ERROR);
    }

    public warning(payload: any): boolean {
        return this.log(payload, severities.WARNING);
    }

    public notice(payload: any): boolean {
        return this.log(payload, severities.NOTICE);
    }

    public info(payload: any): boolean {
        return this.log(payload, severities.INFO);
    }

    public debug(payload: any): boolean {
        return this.log(payload, severities.DEBUG);
    }

    /**
     * Logs the event
     *
     * @param payload
     * @param severity
     */
    public log(payload: any, severity: TSeverityLevel): boolean {
        const { writers } = this;

        if(!writers.length) {
            return false;
        }

        for(const writer of writers) {
            if(!writer.isCapable(severity)) {
                continue;
            }

            writer.write(new Event(this.instanceName, severity, payload));
        }

        return true;
    }
}

export default Manager;