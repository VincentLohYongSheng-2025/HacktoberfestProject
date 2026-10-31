import {open,rename,rm} from 'node:fs/promises';
import {randomUUID} from 'node:crypto';
import {setTimeout as delay} from 'node:timers/promises';

// Windows scanners/readers can briefly hold the destination without delete sharing.
// Retry replacement; never unlink or truncate the last committed workspace.
export async function atomicWrite(file:string,content:string,replace:typeof rename=rename,wait:(ms:number)=>Promise<unknown>=delay){
 const temp=file+'.'+randomUUID()+'.tmp';
 try{
  const handle=await open(temp,'wx',0o600);
  try{await handle.writeFile(content,'utf8');await handle.sync();}finally{await handle.close();}
  for(let attempt=0;;attempt++){
   try{await replace(temp,file);return;}
   catch(error){const code=(error as NodeJS.ErrnoException).code;if(!['EPERM','EACCES','EBUSY'].includes(code||''))throw error;if(attempt>=7)throw Error('Your workspace could not be saved because Windows is holding the file. Your previous saved data is safe. Please retry in a moment.');await wait(Math.min(25*2**attempt,250));}
  }
 }finally{await rm(temp,{force:true}).catch(()=>{});}
}
