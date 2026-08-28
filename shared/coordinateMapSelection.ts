export type CoordinateMapSelection = { latitude: number; longitude: number; label: string };

export function coordinateMapTarget({ latitude, longitude, label }: CoordinateMapSelection) {
  return { center: [latitude, longitude] as [number, number], zoom: 17, markerKey: `${latitude}:${longitude}:${label}` };
}
