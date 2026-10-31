import {defineConfig} from '@playwright/test';
export default defineConfig({timeout:90000,testDir:'./tests/browser',use:{baseURL:'http://127.0.0.1:3000',headless:true,channel:'chrome'},workers:1,reporter:'list'});
