import {test} from 'node:test';import assert from 'node:assert/strict';
import {aiOperation} from '../lib/ai';import type {Workspace} from '../lib/contracts';
const workspace=():Workspace=>({briefs:[],matches:[],pilots:[],aiCache:{},aiRequests:0,audit:[]});
process.env.AI_API_KEY='test-fixture-not-a-real-key';process.env.AI_PROVIDER='mock';process.env.AI_BASE_URL='https://fixture.invalid';process.env.AI_MODEL='fixture-model';
const response=(message:unknown)=>new Response(JSON.stringify({id:'fixture',choices:[{message}],usage:{total_tokens:10}}),{status:200});
const call={id:'call-fixture',type:'function',function:{name:'assess_partners',arguments:JSON.stringify({read:true})}};
test('AI failure fixtures remain bounded and cannot mutate deterministic assessments',async()=>{
 globalThis.fetch=async()=>{throw new DOMException('fixture timeout','TimeoutError');};let r=await aiOperation(workspace(),'match',{fixture:1},['DEMO-OEM-01'],['DEMO-OEM-01-E1'],'demo');assert.equal(r.status,'DEGRADED');assert.match(r.reason!,/deadline/);
 globalThis.fetch=async()=>response({tool_calls:[{...call,function:{...call.function,name:'write_sql'}}]});r=await aiOperation(workspace(),'match',{fixture:2},[],[],'demo');assert.equal(r.status,'DEGRADED');assert.match(r.reason!,/not allowed/);
 globalThis.fetch=async()=>response({content:JSON.stringify({recommendations:[],action:'HUMAN_REVIEW',limitations:['SYNTHETIC_DATA']})});r=await aiOperation(workspace(),'match',{fixture:3},[],[],'demo');assert.equal(r.status,'DEGRADED');assert.match(r.reason!,/omitted assessment/);
 let i=0;globalThis.fetch=async()=>++i===1?response({tool_calls:[call]}):response({content:JSON.stringify({recommendations:[{partnerId:'UNKNOWN',evidenceIds:[],factors:['quality']}],action:'HUMAN_REVIEW',limitations:['SYNTHETIC_DATA']})});r=await aiOperation(workspace(),'match',{fixture:4},['DEMO-OEM-01'],['DEMO-OEM-01-E1'],'demo');assert.equal(r.status,'DEGRADED');assert.match(r.reason!,/Unsupported record/);
 globalThis.fetch=async()=>response({tool_calls:[call]});const bounded=workspace();r=await aiOperation(bounded,'match',{fixture:5},[],[],'demo');assert.equal(r.status,'DEGRADED');assert.equal(bounded.aiRequests,4);assert.equal(r.toolTrace.length,4);
});
test('validated fixture result caches by input and evidence snapshot; quota does not retry',async()=>{
 let calls=0;globalThis.fetch=async()=>++calls%2===1?response({tool_calls:[call]}):response({content:JSON.stringify({recommendations:[{partnerId:'DEMO-OEM-01',evidenceIds:['DEMO-OEM-01-E1'],factors:['quality']}],action:'HUMAN_REVIEW',limitations:['SYNTHETIC_DATA']})});const w=workspace();const first=await aiOperation(w,'match',{revision:1},['DEMO-OEM-01'],['DEMO-OEM-01-E1'],'demo');assert.equal(first.status,'LIVE');assert.equal(first.toolTrace.length,1);assert.equal((await aiOperation(w,'match',{revision:1},['DEMO-OEM-01'],['DEMO-OEM-01-E1'],'demo')).status,'CACHED');assert.equal(calls,2);assert.equal((await aiOperation(w,'match',{revision:2},['DEMO-OEM-01'],['DEMO-OEM-01-E1'],'demo')).status,'LIVE');assert.equal(calls,4);w.aiRequests=30;assert.equal((await aiOperation(w,'match',{revision:3},[],[],'demo')).status,'DEGRADED');assert.equal(calls,4);
});



test('extraction normalises channel casing, spacing, dashes and duplicates without inventing unsupported channels',async()=>{
 const extract={product:'Kopi Harimau',target_units:'3,000',channels:['retail','E-Commerce',' e commerce ','Food Service'],budget:600000,agency_budget:120000,deadline:'2026-12-20'};
 globalThis.fetch=async()=>response({content:JSON.stringify(extract)});
 const good=await aiOperation(workspace(),'extract',{text:'fixture'},[],[],'demo');
 assert.equal(good.status,'LIVE');assert.deepEqual(good.suggestions?.channels,['Retail','E-commerce','Foodservice']);assert.equal(good.suggestions?.target_units,3000);
 globalThis.fetch=async()=>response({content:JSON.stringify({...extract,channels:['unsupported marketplace']})});
 const bad=await aiOperation(workspace(),'extract',{text:'unsupported fixture'},[],[],'demo');
 assert.equal(bad.status,'DEGRADED');assert.match(bad.reason!,/sales channels/);assert.doesNotMatch(bad.reason!,/invalid_value|invalid_type|\[\s*\{/);
 globalThis.fetch=async()=>response({content:JSON.stringify({...extract,channels:null})});
 const missing=await aiOperation(workspace(),'extract',{text:'missing fixture'},[],[],'demo');assert.equal(missing.suggestions?.channels,null);
});
