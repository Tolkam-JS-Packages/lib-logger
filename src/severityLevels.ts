import { TSeverityLevel } from './types';

/**
 * Severity level codes
 * according to RFC 5424
 */
const severities = {
    DEBUG: 7 as const,
    INFO: 6 as const,
    NOTICE: 5 as const,
    WARNING: 4 as const,
    ERROR: 3 as const,
    CRITICAL: 2 as const,
    ALERT: 1 as const,
    EMERGENCY: 0 as const,
};

const severityCodes = Array.from(Array(8).keys()) as TSeverityLevel[];

const severityNames = (() => {
    const names = {};
    Object.keys(severities).forEach(key => names[severities[key]] = key);
    return names;
})();

export { severities, severityCodes, severityNames };