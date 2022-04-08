import { deepFreeze } from './object';
import ValueObject from "../../domain/value-objects/value-object";

class StubValueObject extends ValueObject { }

describe('object Unit Tests', () => {

    it('should not freeze a scalar value', () => {
        const str = deepFreeze('a');
        expect(typeof str).toBe('string');

        let boolean = deepFreeze(true);
        expect(typeof boolean).toBe('boolean');

        boolean = deepFreeze(false);
        expect(typeof boolean).toBe('boolean');

        let num = deepFreeze(5);
        expect(typeof num).toBe('number');
    });

    it('should must be a immutable object', () => {
        const obj = deepFreeze(
            {
                prop1: 'value1',
                deep: { prop2: 'value2', prop3: new Date() }
            }
        );

        const vo = new StubValueObject(obj);

        expect(() => (vo as any).value.prop1 = 'Teste').toThrow(
            "Cannot assign to read only property 'prop1' of object '#<Object>'"
        );

        expect(() => (vo as any).value.deep.prop2 = 'Teste').toThrow(
            "Cannot assign to read only property 'prop2' of object '#<Object>'"
        );

        expect((vo as any).value.deep.prop3).toBeInstanceOf(Date)

    });
})