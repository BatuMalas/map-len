import { describe, it, expect } from 'vitest';
import { dmsToDD, ddToDMS, formatDMS } from './geoConverter';

describe('GeoConverter Utils', () => {
    describe('dmsToDD', () => {
        it('should correctly convert N coordinates', () => {
            const result = dmsToDD(40, 26, 46, 'N');
            expect(result).toBeCloseTo(40.446111, 4);
        });

        it('should correctly convert S coordinates (negative)', () => {
            const result = dmsToDD(40, 26, 46, 'S');
            expect(result).toBeCloseTo(-40.446111, 4);
        });

        it('should correctly convert W coordinates (negative)', () => {
            const result = dmsToDD(74, 0, 21.6, 'W');
            expect(result).toBeCloseTo(-74.006000, 4);
        });

        it('should handle zero values', () => {
            const result = dmsToDD(0, 0, 0, 'N');
            expect(result).toBe(0);
        });
    });

    describe('ddToDMS', () => {
        it('should correctly convert positive latitude (N)', () => {
            const result = ddToDMS(40.446111, true);
            expect(result).toEqual({
                degrees: 40,
                minutes: 26,
                seconds: 46,
                direction: 'N'
            });
        });

        it('should correctly convert negative longitude (W)', () => {
            const result = ddToDMS(-74.0060, false);
            expect(result.degrees).toBe(74);
            expect(result.direction).toBe('W');
        });

        describe('formatDMS', () => {
            it('should format DMS custom object correctly', () => {
                const dms = { degrees: 40, minutes: 26, seconds: 46, direction: 'N' as const };
                expect(formatDMS(dms)).toBe("40° 26' 46\" N");
            });
        });
    });
});
