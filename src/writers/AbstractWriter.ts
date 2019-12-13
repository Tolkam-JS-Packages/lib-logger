import { IEvent, IWriter, TSeverityLevel } from '../types';
import { severities, severityCodes } from '../severityLevels';

abstract class AbstractWriter implements IWriter {

    private levels: TSeverityLevel[] = [];

    /**
     * @inheritDoc
     */
    public handleAll(): void {
        this.levels = severityCodes;
    }

    /**
     * @inheritDoc
     */
    public handleAllExcept(...levels: TSeverityLevel[]): void {
        this.levels = severityCodes.filter(i => levels.indexOf(i) < 0);
    }

    /**
     * @inheritDoc
     */
    public handleMax(level: TSeverityLevel): void {
        this.levels = severityCodes.filter(i => i >= level);
    }

    /**
     * @inheritDoc
     */
    public handleMin(level: TSeverityLevel): void {
        this.levels = severityCodes.filter(i => i <= level);
    }

    /**
     * @inheritDoc
     */
    public handleOnly(...levels: TSeverityLevel[]): void {
        this.levels = levels;
    }

    /**
     * @inheritDoc
     */
    public isCapable(level: TSeverityLevel): boolean {
        return this.levels.indexOf(level) !== -1;
    }

    /**
     * @inheritDoc
     */
    abstract write(event: IEvent): void;

    /**
     * Gets severity level codes
     */
    private codes(): TSeverityLevel[] {
        const values = [];
        for (const key in severities) {
            values.push(severities[key]);
        }
        return values;
    }
}

export default AbstractWriter;