import { assert } from 'chai';
import { Logger } from '../src/Logger';
import { Log } from '../src/Log';
import sinon from 'sinon';

describe('Logger', () => {
  let logger: Logger;

  before(() => {
    logger = new Logger();
  });

  describe('Status', () => {
    it('puede ser activado', () => {
      logger.activate();

      assert.ok(logger.isActivated());
    });

    it('puede ser desactivado', () => {
      logger.deactivate();

      assert.ok(!logger.isActivated());
    });
  });

  describe('Logging', () => {

    let winstonStub: {log: sinon.SinonStub};
    let winstonLoggerStub: sinon.SinonStub;

    before(() => {
      winstonStub = { log: sinon.stub() };
      winstonLoggerStub = sinon.stub(Logger.prototype, 'winstonLogger').returns(winstonStub);
    });

    after(() => {
      winstonLoggerStub.restore();
    });

    describe('cuando esta desactivado', () => {
      it('lasando un error', () => {
        const log = new Log('info', 'esto es un test');
        try {
          logger.log(log);
        } catch (e) {
          assert.equal(e.message, 'El logger no esta activado');
        }
      });
    });

    describe('cuando esta activo', () => {
      it('le dice a winston que logeo', () => {
        const log = new Log('info', 'this is a test');
        logger.activate();
        logger.log(log);

        assert.ok(winstonStub.log.calledOnce);
      });
    });
  });
});
