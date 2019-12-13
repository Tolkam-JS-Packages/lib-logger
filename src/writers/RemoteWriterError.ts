export default class RemoteWriterError extends Error {
    constructor(...params: any[]) {
        super(...params);
        if ((Error as any).captureStackTrace) {
            (Error as any).captureStackTrace(this, RemoteWriterError);
        }
        this.name = this.constructor.name;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}