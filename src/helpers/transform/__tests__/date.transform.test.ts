import { dateTransform } from '../date.transform';

describe('transformDate', () => {
    it('should transform date to correct format', () => {
        const input = '2022-02-06T20:42:13Z';
        const result = dateTransform(input);

        // YYYY-MM-DD HH:MM:SS
        expect(result).toMatch('2022-02-06 20:42:13');
    });

    it('should handle invalid date', () => {
        const input = 'invalid-date';
        const result = dateTransform(input);

        expect(result).toContain("Invalid Date");
    });

    it('should handle different timezones', () => {
        const input1 = '2022-02-06T20:42:13Z';
        const input2 = '2022-02-06T20:42:13+00:00';
        const result1 = dateTransform(input1);
        const result2 = dateTransform(input2);

        expect(result1).toMatch('2022-02-06 20:42:13');
        expect(result2).toMatch('2022-02-06 20:42:13');
    });

    it('should handle different case dates', () => {
        const input1 = '2022-02-06T20:42:13.000Z';
        const input2 = '2022-02-06T20:42:13z';

        const result1 = dateTransform(input1);
        const result2 = dateTransform(input2);

        expect(result1).toMatch('2022-02-06 20:42:13');
        expect(result2).toMatch('2022-02-06 20:42:13');
    });

    it('should handle edge case dates', () => {
        const input = '2024-02-29T00:00:00Z' // Leap year
        const result = dateTransform(input)

        expect(result).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
    });
});