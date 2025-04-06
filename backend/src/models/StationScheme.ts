import mongoose from 'mongoose';

const StationScheme = new mongoose.Schema({
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
    WindDir_Avg: { type: Number, required: true }
}, { versionKey: false });

const Station = mongoose.model('Station', StationScheme,'abp');
export default Station;
