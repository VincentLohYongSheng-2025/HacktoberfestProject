import {test,expect} from '@playwright/test';
test('configured AI shows READY before the founder requests an analysis',async({page})=>{
 const providerCalls:string[]=[];page.on('request',r=>{if(r.url().endsWith('/api/analyse'))providerCalls.push(r.url());});
 await page.goto('/');await page.getByRole('button',{name:'Start a market pilot'}).click();
 await expect(page.getByText('READY',{exact:true})).toBeVisible();await expect(page.getByText(/API configured ·/)).toBeVisible();await expect(page.getByText('NOT REQUESTED',{exact:true})).toHaveCount(0);expect(providerCalls).toEqual([]);
 const status=await page.request.get('/api/ai/status');const payload=await status.json();expect(payload.configured).toBe(true);expect(Object.keys(payload).sort()).toEqual(['configured','model','provider']);
});
test('an unconfigured server is never labelled ready',async({page})=>{
 await page.route('**/api/ai/status',route=>route.fulfill({json:{configured:false,model:'test-model',provider:'test'}}));
 await page.goto('/');await page.getByRole('button',{name:'Start a market pilot'}).click();await expect(page.getByText('SETUP NEEDED',{exact:true})).toBeVisible();await expect(page.getByText('READY',{exact:true})).toHaveCount(0);
});
