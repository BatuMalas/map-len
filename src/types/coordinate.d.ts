export interface DMSCoordinate {
    degrees: number;
    minutes: number;
    seconds: number;
    direction: 'N' | 'S' | 'E' | 'W';
}

export interface DDCoordinate {
    latitude: number;
    longitude: number;
}

export interface ConversionResult {
    dd: number;
    dms: DMSCoordinate;
}
