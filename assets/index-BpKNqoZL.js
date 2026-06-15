const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/parsePdf-DaCYyddH.js","assets/index-CwTUgQBg.js","assets/index-Eob3uywQ.css","assets/parseDocx-BkNEtFKP.js"])))=>i.map(i=>d[i]);
import{_ as o}from"./index-CwTUgQBg.js";const a=new Set(["txt","md","markdown"]),s=t=>t.replace(/\r/g,`
`).replace(/[ \t]+\n/g,`
`).replace(/\n{3,}/g,`

`).trim(),p=async t=>{const e=t.name.split(".").pop()?.toLowerCase()??"";if(t.type==="application/pdf"||e==="pdf"){const{parsePdf:r}=await o(async()=>{const{parsePdf:n}=await import("./parsePdf-DaCYyddH.js");return{parsePdf:n}},__vite__mapDeps([0,1,2]));return r(t)}if(t.type==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||e==="docx"){const{parseDocx:r}=await o(async()=>{const{parseDocx:n}=await import("./parseDocx-BkNEtFKP.js");return{parseDocx:n}},__vite__mapDeps([3,1,2]));return r(t)}if(t.type.startsWith("text/")||a.has(e))return s(await t.text());throw new Error("Поддерживаются PDF, DOCX, TXT и MD.")},i=Object.freeze(Object.defineProperty({__proto__:null,parseResumeFile:p},Symbol.toStringTag,{value:"Module"}));export{i,s as n};
