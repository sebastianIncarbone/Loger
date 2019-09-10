import { Log } from '../src/Log';
import { assert } from 'chai';

describe('Log', () => {
  describe('Instantiating', () => {
    describe('When the type is not allowed', () => {
      it('fails', () => {
        try {
          const log = new Log('invalid type', 'this will fail');
        } catch (e) {
          assert.equal('Tipo de mensaje no permitido', e.message);
        }
      });
    });
  });
  describe('Text conversion', () => {
    it('can convert itself to text', () => {
      const logType = 'info';
      const message = 'this is a test message';
      const log = new Log(logType, message);

      const expected =
                `New Log
            Type: ${logType}
            Message: ${message}`;

      assert.equal(log.toText(), expected);
    });
  });
});
