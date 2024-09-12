// kisan.model.js
import mongoose from "mongoose";

const kisanSchema = new mongoose.Schema({
    kisanID: { type: String, required: true, unique: true },
    isValid: { type: Boolean, default: true },
});

const Kisan = mongoose.model("Kisan", kisanSchema);
export { Kisan };