import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import Map from 'ol/Map';

/**
 * Sumber data vektor untuk marker.
 * Digunakan untuk menyimpan feature marker yang akan ditampilkan di peta.
 */
export const markerSource = new VectorSource();

/**
 * Layer vektor yang menampilkan marker di peta.
 * Menggunakan zIndex 100 agar selalu tampil di atas layer dasar.
 */
export const markerLayer = new VectorLayer({
    source: markerSource,
    zIndex: 100
});

/**
 * Membuat marker baru pada koordinat tertentu.
 * Fungsi ini akan menghapus marker sebelumnya (jika ada) dan menambahkan marker baru.
 * 
 * @param lonList - Longitude (Garis Bujur) dalam format Decimal Degrees
 * @param latList - Latitude (Garis Lintang) dalam format Decimal Degrees
 * @returns Feature openlayers yang baru dibuat
 */
export const createMarker = (lonList: number, latList: number): Feature => {
    // Clear existing markers if we only want one at a time (optional, based on reqs)
    markerSource.clear();

    const marker = new Feature({
        geometry: new Point(fromLonLat([lonList, latList])),
    });

    marker.setStyle(
        new Style({
            image: new Icon({
                anchor: [0.5, 1],
                src: 'https://openlayers.org/en/latest/examples/data/icon.png', // Fallback or local asset
                scale: 1
            }),
        })
    );

    markerSource.addFeature(marker);
    return marker;
};

/**
 * Memusatkan tampilan peta ke koordinat tertentu dengan animasi.
 * 
 * @param map - Instance OpenLayers Map
 * @param lon - Longitude tujuan
 * @param lat - Latitude tujuan
 */
export const centerMap = (map: Map, lon: number, lat: number) => {
    map.getView().animate({
        center: fromLonLat([lon, lat]),
        zoom: 12,
        duration: 2000
    });
};
