/**
 * Severity level codes
 * according to RFC 5424
 */
// 0 	Emergency: system is unusable
// 1 	Alert: action must be taken immediately
// 2 	Critical: critical conditions
// 3 	Error: error conditions
// 4 	Warning: warning conditions
// 5 	Notice: normal but significant condition
// 6 	Informational: informational messages
// 7 	Debug: debug-level messages
export type TSeverityLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface IEvent {
    issuer: string;
    severity: TSeverityLevel;
    payload: unknown;
}

export interface IWriter {

    // Sets to handle all severity levels
    handleAll: () => void;

    // Sets severity levels to exclude from handling
    handleAllExcept: (...levels: TSeverityLevel[]) => void;

    // Sets explicit severity levels to handle
    handleOnly: (...levels: TSeverityLevel[]) => void;

    // Sets the minimum handled level
    handleMin: (level: TSeverityLevel) => void;

    // Sets the maximum handled level
    handleMax: (level: TSeverityLevel) => void;

    // Checks if capable to write event of given severity level
    isCapable: (level: TSeverityLevel) => boolean;

    write: (event: IEvent) => void;
}