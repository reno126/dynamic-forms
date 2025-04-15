import { defineConfig, devices } from '@playwright/test';
import path from 'path';

// Use process.env.PORT by default and fallback to 3000
const PORT = process.env.PORT || 3000;

// Set web server config here.
const baseURL = `http://localhost:${PORT}`;

export default defineConfig({
    timeout: 30 * 1000,
    testDir: path.join(__dirname, 'e2e'),
    retries: process.env.CI ? 2 : 0,
    outputDir: 'test-results/',
    forbidOnly: !!process.env.CI,
    workers: process.env.CI ? 1 : undefined,
    reporter: 'html',

    webServer: {
        command: 'npm run dev',
        url: baseURL,
        timeout: 120 * 1000,
        reuseExistingServer: !process.env.CI,
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