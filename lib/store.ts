import 'server-only';
import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {randomBytes,createHmac,timingSafeEqual} from 'node:crypto';
import {join} from 'node:path';
import type {Workspace} from './contracts';
import {cookies} from 'next/headers';
import {atomicWrite} from './atomic-file';
export const dataDirectory=process.env.VERCEL?'/tmp/hopasean-demo':join(process.cwd(),'.data');
const dir=dataDirectory;
const empty=():Workspace=>({briefs:[],matches:[],pilots:[],aiCache:{},aiRequests:0,audit:[]});
const processState=globalThis as typeof globalThis & {pilotbridgeWriteQueue?:Promise<void>};
processState.pilotbridgeWriteQueue??=Promise.resolve();let secretPromise:Promise<string>|undefined;
async function secret(){if(process.env.SESSION_SECRET)return process.env.SESSION_SECRET;return secretPromise??=(async()=>{await mkdir(dir,{recursive:true});try{return await readFile(join(dir,'session.key'),'utf8');}catch{const s=randomBytes(32).toString('hex');await writeFile(join(dir,'session.key'),s,{mode:0o600});return s;}})();}
export async function sign(value:string){return value+'.'+createHmac('sha256',await secret()).update(value).digest('hex');}
export async function verify(s:string|undefined){if(!s)return null;const i=s.lastIndexOf('.');if(i<0)return null;const v=s.slice(0,i),expected=await sign(v);return s.length===expected.length&&timingSafeEqual(Buffer.from(s),Buffer.from(expected))?v:null;}
export async function session(){if(process.env.DEMO_MODE!=='true'&&process.env.NODE_ENV==='production')throw Error('Local demo disabled. Configure DEMO_MODE=true for isolated synthetic use.');const c=await cookies();if(c.get('pb_partner_account')?.value)throw Error('FORBIDDEN');const owner=await verify(c.get('pb_session')?.value);if(!owner||!/^[a-f0-9-]{36}$/.test(owner))throw Error('UNAUTHENTICATED');return {owner,operator:await verify(c.get('pb_operator')?.value)===owner};}
export async function readWorkspace(owner:string){if(!/^[a-f0-9-]{36}$/.test(owner))throw Error('Invalid owner');await mkdir(dir,{recursive:true});try{return JSON.parse(await readFile(join(dir,owner+'.json'),'utf8')) as Workspace;}catch(e){if((e as NodeJS.ErrnoException).code==='ENOENT')return empty();throw e;}}
export async function transact<T>(owner:string,fn:(w:Workspace)=>Promise<T>|T):Promise<T>{const previous=processState.pilotbridgeWriteQueue!;let release!:()=>void;processState.pilotbridgeWriteQueue=new Promise<void>(r=>release=r);await previous;try{const w=await readWorkspace(owner),result=await fn(w);await atomicWrite(join(dir,owner+'.json'),JSON.stringify(w));return result;}finally{release();}}
export function own<T extends {owner:string}>(rows:T[],id:string,owner:string):T{const row=rows.find(x=>(x as T&{id:string}).id===id&&x.owner===owner);if(!row)throw Error('NOT_FOUND');return row;}
export function audit(w:Workspace,action:string,resource:string){w.audit.push({at:new Date().toISOString(),action,resource});}
