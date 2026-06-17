const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/parsePdf-W9WPeXqu.js","assets/index-_v9dH7Ex.js","assets/index-BQpvdfkO.css","assets/parseDocx-CrSEEsW-.js"])))=>i.map(i=>d[i]);
import{_ as o}from"./index-_v9dH7Ex.js";const a=new Set(["txt","md","markdown"]),s=t=>t.replace(/\r/g,`
`).replace(/[ \t]+\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),p=async t=>{const e=t.name.split(".").pop()?.toLowerCase()??"";if(t.type==="application/pdf"||e==="pdf"){const{parsePdf:r}=await o(async()=>{const{parsePdf:n}=await import("./parsePdf-W9WPeXqu.js");return{parsePdf:n}},__vite__mapDeps([0,1,2]));return r(t)}if(t.type==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||e==="docx"){const{parseDocx:r}=await o(async()=>{const{parseDocx:n}=await import("./parseDocx-CrSEEsW-.js");return{parseDocx:n}},__vite__mapDeps([3,1,2]));return r(t)}if(t.type.startsWith("text/")||a.has(e))return s(await t.text());throw new Error("Поддерживаются PDF, DOCX, TXT и MD.")},i=Object.freeze(Object.defineProperty({__proto__:null,parseResumeFile:p},Symbol.toStringTag,{value:"Module"}));export{i,s as n};
