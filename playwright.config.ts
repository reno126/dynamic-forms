import { defineConfig, devices } from '@playwright/test';
import path from 'path';

const PORT = process.env.PORT || 3000;

const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
    timeout: 30 * 1000,
    testDir: path.join(__dirname, 'tests', 'e2e'),
    retries: process.env.CI ? 2 : 0,
    outputDir: 'test-results/',
    forbidOnly: !!process.env.CI,
    workers: process.env.CI ? 1 : undefined,
    reporter: process.env.CI ? 'list' : 'html',

    webServer: {
        command: `npm run dev -- --port ${PORT}`,
        url: baseURL,
        timeout: 120 * 1000,
        reuseExistingServer: false,
    },

    use: {
        baseURL,
        trace: 'on-first-retry',
    },

    projects: [
        {
            name: 'desktop-chrome',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
}); 
