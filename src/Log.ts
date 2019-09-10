export class Log {

    private static LOG_TYPES = ['error', 'warning', 'info', 'debug']
    public type: string
    public message: string

    constructor(type: string, message: string) {
        if (!Log.LOG_TYPES.includes(type)) {
            throw new Error('Tipo de mensaje no permitido')
        }
        this.type = type
        this.message = message
    }

    toText(): string {
        return `
        New Log
            Type: ${this.type}
            Message: ${this.message}
        `
    }
}