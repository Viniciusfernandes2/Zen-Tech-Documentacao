import mongoose from 'mongoose';

const ColinasScheme = new mongoose.Schema({
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

const Colinas = mongoose.model('Colinas', ColinasScheme,'colina');// coloque o nome exato que esta a colection do bd do pc de vcs, aqui esta colina
export default Colinas;
