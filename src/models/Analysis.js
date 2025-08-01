import mongoose from 'mongoose';

const AnalysisSchema = new mongoose.Schema({
url: {
type: String,
required: true,
},
timestamp: {
type: Date,
default: Date.now,
},
summary: {
score: { type: Number, required: true },
totalViolations: { type: Number, required: true },
},
details: {
lighthouse: {
score: Number,
audits: Object,
},
axe: {
violations: Array,
passes: Array,
incomplete: Array,
inapplicable: Array,
},
},
});

const Analysis = mongoose.model('Analysis', AnalysisSchema);
export default Analysis;