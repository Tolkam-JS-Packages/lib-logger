# tolkam/lib-logger

Simple logger with multiple transports support.

## Usage

````ts
import { Manager, ConsoleWriter, severities } from '@tolkam/lib-logger';

const logManager = new Manager();
const writer = new ConsoleWriter();

writer.handleAllExcept(severities.DEBUG);
logManager.addWriter(writer);

logManager.debug('debug message');
logManager.warning('warn message');
logManager.error('error message');
````

## Documentation

The code is rather self-explanatory and API is intended to be as simple as possible. Please, read the sources/Docblock if you have any questions. See [Usage](#usage) for quick start.

## License

Proprietary / Unlicensed 🤷
