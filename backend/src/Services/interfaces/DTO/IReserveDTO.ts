export interface IReserveDTO {
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