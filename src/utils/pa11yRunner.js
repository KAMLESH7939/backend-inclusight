const { exec } = require('child_process');
const { URL } = require('url');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const { AxePuppeteer } = require('@axe-core/puppeteer');
const puppeteer = require('puppeteer');

const runLighthouse = async (targetUrl) => {
const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
const options = {
logLevel: 'info',
output: 'json',
onlyCategories: ['accessibility'],
port: chrome.port,
};
const runnerResult = await lighthouse(targetUrl, options);
await chrome.kill();

const report = JSON.parse(runnerResult.report);
const accessibilityScore = report.categories.accessibility.score * 100;
return {
score: accessibilityScore,
audits: report.audits,
};
};

const runAxeCore = async (targetUrl) => {
const browser = await puppeteer.launch({ headless: 'new' });
const page = await browser.newPage();
await page.goto(targetUrl, { waitUntil: 'networkidle0' });

const results = await new AxePuppeteer(page).analyze();
await browser.close();

return results;
};

exports.analyzeWebsite = async (req, res) => {
try {
const { url } = req.body;
const parsedUrl = new URL(url); // Validate

const lighthouseResult = await runLighthouse(url);
const axeResult = await runAxeCore(url);

res.status(200).json({
  success: true,
  lighthouse: lighthouseResult,
  axe: axeResult,
});
} catch (err) {
console.error('Analysis failed:', err.message);
res.status(500).json({ success: false, message: 'Analysis failed', error: err.message });
}
};

