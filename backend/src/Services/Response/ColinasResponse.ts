import { IColinas } from "../../models/ColinasScheme";
import { IColinasResponse } from "../interfaces/IColinasResponse";

export class ColinasResponse {
  public static colinasResponse(colinas: IColinas, message?: string): IColinasResponse {
    return {
      message: message,
      IColinasDTO: {
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