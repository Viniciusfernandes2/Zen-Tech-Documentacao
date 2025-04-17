import mongoose from 'mongoose';

const ReservScheme = new mongoose.Schema({
    Date: { type: String, required: true },
    Time: { type: String, required: true },
    Temp_C: { type: String, required: true },
    Hum_: { type: String, required: true },
    Press_Bar: { type: String, required: true },
    TempCabine_C: { type: String, required: true },
    Charge: { type: String, required: true },
    SR_Wm2: { type: String, required: true },
    WindPeak_ms: { type: String, required: true },
    WindSpeed_Inst: { type: String, required: true },
    WindSpeed_Avg: { type: String, required: true },
    WindDir_Inst: { type: String, required: true },
    WindDir_Avg: { type: String, required: true }
}, { versionKey: false });

const Reserv = mongoose.model('Station', ReservScheme,'reservatorio');// coloque o nome exato que esta a colection do bd do pc de vcs, aqui ta reservatorio
export default Reserv;
