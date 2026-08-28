import type { PandalRecord } from "./pujaData";

export const hasSourceBackedCoordinate = (record: PandalRecord) => record.latitude !== 0 && record.longitude !== 0 && Boolean(record.coordinateSource && record.coordinateRetrievedAt && record.coordinateConfidence);

export const findAddressPreviewRecords = (records: PandalRecord[], query: string) => {
  const normalized = query.trim().toLowerCase();
  return records.filter(record => record.mapSearchUrl && !hasSourceBackedCoordinate(record) && (!normalized || `${record.name} ${record.address} ${record.subArea}`.toLowerCase().includes(normalized)));
};
