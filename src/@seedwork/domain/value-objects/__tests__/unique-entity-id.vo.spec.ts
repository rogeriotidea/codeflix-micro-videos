import InvalidUuidError from "../../errors/invalid-uuid.error";
import UniqueEntityId from "../unique-entity-id.vo";
import { v4 as uuidv4, validate as uuidValidate } from 'uuid'

function spyValidateMethod() {
    return jest.spyOn(UniqueEntityId.prototype as any, 'validate')
}

describe('UniqueEntityId Unit Tests', () => {

    const validateSpy = spyValidateMethod()

    beforeEach(() => validateSpy.mockClear())

    it('should throw error when uuid is invalid', () => {
        //const validateSpy = spyValidateMethod();
        expect(() => new UniqueEntityId('fake id')).toThrow(new InvalidUuidError());
        expect(validateSpy).toHaveBeenCalled();
    });

    it('should accept a uuid passed in constructor', () => {
        //const validateSpy = spyValidateMethod();
        const uuid: string = "8e492937-fb38-47aa-a230-ca91e40d0c4f"
        const vo = new UniqueEntityId(uuid);
        expect(vo.value).toBe(uuid);
        expect(validateSpy).toHaveBeenCalled();
    });

    it('should accept a uuid passed in constructor', () => {
        //const validateSpy = spyValidateMethod();
        const vo = new UniqueEntityId();
        expect(uuidValidate(vo.value)).toBeTruthy();
        expect(validateSpy).toHaveBeenCalled();
    });
});