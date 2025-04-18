import mongoose, { Document } from 'mongoose';

// Interface para tipar o documento
export interface IStation extends Document {
  Date: string;
  Time: string;
  Temp_C: number;
  Hum_: number;
  Press_Bar: number;
  TempCabine_C: number;
  Charge: number;
  SR_Wm2: number;
  WindPeak_ms: number;
  WindSpeed_Inst: number;
  WindSpeed_Avg: number;
  WindDir_Inst: number;
  WindDir_Avg: number;
}

const StationScheme = new mongoose.Schema<IStation>(
  {
    Date: { type: String, required: true },
    Time: { type: String, required: true },
    Temp_C: { type: Number, required: true },
    Hum_: { type: Number, required: true },
    Press_Bar: { type: Number, required: true },
    TempCabine_C: { type: Number, required: true },
    Charge: { type: Number, required: true },
    SR_Wm2: { type: Number, required: true },
    WindPeak_ms: { type: Number, required: true },
    WindSpeed_Inst: { type: Number, required: true },
    WindSpeed_Avg: { type: Number, required: true },
    WindDir_Inst: { type: Number, required: true },
    WindDir_Avg: { type: Number, required: true },
  },
  { versionKey: false }
);

const Station = mongoose.model<IStation>('Station', StationScheme, 'stations');
export default Station;