import { IReserve } from "../../models/ReserveSchema";
import { IReserveResponse } from "../interfaces/IReserveResponse";

export class ReserveResponse {
  public static stationResponse(colinas: IReserve, message?: string): IReserveResponse {
    return {
      message: message,
      IStationDTO: {
        Date: colinas.Date,
        Time: colinas.Time,
        Temp_C: colinas.Temp_C,
        Hum_: colinas.Hum_,
        Press_Bar: colinas.Press_Bar,
        TempCabine_C: colinas.TempCabine_C,
        Charge: colinas.Charge,
        SR_Wm2: colinas.SR_Wm2,
        WindPeak_ms: colinas.WindPeak_ms,
        WindSpeed_Inst: colinas.WindSpeed_Inst,
        WindSpeed_Avg: colinas.WindSpeed_Avg,
        WindDir_Inst: colinas.WindDir_Inst,
        WindDir_Avg: colinas.WindDir_Avg,
      }
    }
  }
}