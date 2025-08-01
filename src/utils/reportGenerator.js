// import { Parser } from 'json2csv';

// export function generateCsvFromAnalysis(analysisDoc) {
// const rows = [];

// // Summary rows
// rows.push({
// Section: 'Summary',
// Title: 'Accessibility Score',
// Help: '',
// HelpURL: '',
// Impact: '',
// Nodes: '',
// Value: analysisDoc?.summary?.score ?? '',
// });

// rows.push({
// Section: 'Summary',
// Title: 'Total Violations (axe-core)',
// Help: '',
// HelpURL: '',
// Impact: '',
// Nodes: '',
// Value: analysisDoc?.summary?.totalViolations ?? '',
// });

// rows.push({}); // Empty row for spacing

// // axe-core violations
// if (analysisDoc?.details?.axe?.violations?.length) {
// analysisDoc.details.axe.violations.forEach((v) => {
// rows.push({
// Section: 'axe-core',
// Title: v?.description ?? '',
// Help: v?.help ?? '',
// HelpURL: v?.helpUrl ?? '',
// Impact: v?.impact ?? '',
// Nodes: v?.nodes?.length ?? 0,
// Value: '',
// });
// });
// }

// // Lighthouse audits (score < 1)
// const audits = analysisDoc?.details?.lighthouse?.audits ?? {};
// for (const key in audits) {
// const audit = audits[key];
// if (audit?.score !== undefined && audit.score < 1) {
// rows.push({
// Section: 'Lighthouse',
// Title: audit?.title || key,
// Help: audit?.description || '',
// HelpURL: '',
// Impact: audit?.scoreDisplayMode || '',
// Nodes: '',
// Value: audit?.score,
// });
// }
// }

// const fields = ['Section', 'Title', 'Help', 'HelpURL', 'Impact', 'Nodes', 'Value'];
// const json2csv = new Parser({ fields });
// const csv = json2csv.parse(rows);

// return csv;
// }


export function generateCsvFromAnalysis(analysis) {
const rows = [];

rows.push(['URL', analysis.url]);
rows.push(['Date', new Date(analysis.timestamp).toLocaleString()]);
rows.push(['Accessibility Score', analysis.summary.score]);
rows.push(['Total Violations', analysis.summary.totalViolations]);
rows.push([]);
rows.push(['Issue Type', 'Impact', 'Description', 'Help URL', 'Nodes']);

analysis.details.axe.violations.forEach((v) => {
const selectors = v.nodes.map((n) => n.target.join(', ')).join(' | ');
rows.push([v.id, v.impact, v.description, v.helpUrl, selectors]);
});

return rows.map(row =>
row.map(value => `"${String(value).replace(/"/g, '""')}"`).join(',')
).join('\n');
}