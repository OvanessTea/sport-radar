import { transformSportName } from '../sport_name.transform';

describe('transformSportName', () => {
    it('should correctly capitalize first letter of each word', () => {
        const input = 'American football';
        const result = transformSportName(input);

        expect(result).toBe('American Football');
    });

    it('should split on capital letters', () => {
        const input = 'IceHockey';
        const result = transformSportName(input);

        expect(result).toBe('Ice Hockey');
    });

    it('should not change already correct strings', () => {
        const input = 'American Football';
        const result = transformSportName(input);

        expect(result).toBe('American Football');
    });

    it('should handle empty sport name', () => {
        const input = '';
        const result = transformSportName(input);

        expect(result).toBe('');
    });
});