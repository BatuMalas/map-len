import type { DMSCoordinate } from '../types/coordinate';

/**
 * Mengonversi format DMS ke Decimal Degrees.
 * Formula: DD = d + (m/60) + (s/3600)
 * Directions S and W result in negative values.
 * 
 * @param degrees - Derajat (must be >= 0)
 * @param minutes - Menit (0-59)
 * @param seconds - Detik (0-59.99...)
 * @param direction - Arah (N/S/E/W)
 * @returns Hasil konversi DD (bisa negatif)
 */
export const dmsToDD = (
    degrees: number,
    minutes: number,
    seconds: number,
    direction: 'N' | 'S' | 'E' | 'W'
): number => {
    let dd = Math.abs(degrees) + (Math.abs(minutes) / 60) + (Math.abs(seconds) / 3600);

    if (direction === 'S' || direction === 'W') {
        dd = dd * -1;
    }

    return parseFloat(dd.toFixed(6));
};

/**
 * Mengonversi Decimal Degrees ke format DMS.
 * 
 * @param dd - Decimal Degrees value
 * @param isLatitude - True untuk latitude, false untuk longitude
 * @returns Object DMS {degrees, minutes, seconds, direction}
 */
export const ddToDMS = (dd: number, isLatitude: boolean): DMSCoordinate => {
    const absolute = Math.abs(dd);
    const degrees = Math.floor(absolute);
    const minutesNotTruncated = (absolute - degrees) * 60;
    const minutes = Math.floor(minutesNotTruncated);
    const seconds = parseFloat(((minutesNotTruncated - minutes) * 60).toFixed(2));

    let direction: 'N' | 'S' | 'E' | 'W';

    if (isLatitude) {
        direction = dd >= 0 ? 'N' : 'S';
    } else {
        direction = dd >= 0 ? 'E' : 'W';
    }

    return {
        degrees,
        minutes,
        seconds,
        direction
    };
};

/**
 * Formats DMS object into string string "40° 26' 46" N"
 */
export const formatDMS = (dms: DMSCoordinate): string => {
    return `${dms.degrees}° ${dms.minutes}' ${dms.seconds}" ${dms.direction}`;
};
