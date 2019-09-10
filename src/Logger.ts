import winston from 'winston'
// @ts-ignore
import {Loggly} from 'winston-loggly-bulk'
import {Log} from './Log'
import fs from 'fs'

export class Logger {

    private activated = false

    constructor() {
        this.winstonLogger().add(new Loggly({
            token: 'b85b6b0a-a08b-48a6-911d-d64477382163',
            subdomain: 'luwo',
            tags: ['Winston-NodeJS'],
            json: true
        }));
    }

    winstonLogger(): any {
        return winston
    }

    activate(): void {
        this.activated = true
    }

    deactivate(): void {
        this.activated = false
    }

    isActivated(): boolean {
        return this.activated
    }

    async log(log: Log): Promise<void> {
        if (!this.isActivated()) {
            throw new Error('El logger no esta activado')
        }
        fs.writeFileSync('history.txt', log.toText(), {flag: 'a'})
        await this.winstonLogger().log(log.type, log.message)
    }
}
