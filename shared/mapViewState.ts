import type { PandalRecord } from "./pujaData";
import { hasSourceBackedCoordinate } from "./mapRecordRules";

export type MapSelectionState = {
  mode: "pinned" | "address-preview";
  selected: PandalRecord;
  addressPreview: PandalRecord | null;
};

export const mapSelectionFor = (record: PandalRecord): MapSelectionState => hasSourceBackedCoordinate(record)
  ? { mode: "pinned", selected: record, addressPreview: null }
  : { mode: "address-preview", selected: record, addressPreview: record };
