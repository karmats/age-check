import * as util from './util'

describe('util test', () => {

    it('should return year as number', () => {
        expect(util.validateYear('1981')).toBe(1981)
    })

    it('should throw error when input is not a number', () => {
        expect(() => util.validateYear('hej')).toThrow(TypeError)
    })

    it('should throw error when year is before 1900', () => {
        expect(() => util.validateYear('1899')).toThrow(RangeError)
    })

    it('should throw error when year is after this year', () => {
        expect(() => util.validateYear(new Date().getFullYear().toString())).toThrow(RangeError)
    })

    it('should return month as number', () => {
        // JS month = month - 1
        expect(util.validateMonth('01')).toBe(0)
    })

    it('should throw error when month is invalid', () => {
        expect(() => util.validateMonth('00')).toThrow(RangeError)
        expect(() => util.validateMonth('13')).toThrow(RangeError)
    })

    it('should return day as number', () => {
        expect(util.validateDay('07')).toBe(7)
    })

    it('should throw error when day is invalid', () => {
        expect(() => util.validateMonth('00')).toThrow(RangeError)
        expect(() => util.validateMonth('32')).toThrow(RangeError)
    })

    it('should be age of 18', () => {
        const now = new Date();
        const dob = new Date(now.getUTCFullYear() - 18, 0, 1)
        expect(util.age(dob)).toBe(18);
    })

    it('should be age of 17 when birthday is later this year', () => {
        const now = new Date();
        const dob = new Date(now.getUTCFullYear() - 18, now.getUTCMonth() + 5, 1)
        expect(util.age(dob)).toBe(17);
    })

    it('should be age of 17 when birthday is later this month', () => {
        const now = new Date();
        const dob = new Date(now.getUTCFullYear() - 18, now.getUTCMonth(), now.getUTCDate() + 5)
        expect(util.age(dob)).toBe(17);
    })

})
