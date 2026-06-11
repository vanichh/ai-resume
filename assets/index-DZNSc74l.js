const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/parsePdf-C7ltus0I.js","assets/index-DqjJGsQ-.js","assets/index-BXKsQD4I.css","assets/parseDocx-CaotBRDV.js"])))=>i.map(i=>d[i]);
import{_ as o}from"./index-DqjJGsQ-.js";const a=new Set(["txt","md","markdown"]);function p(t){return t.replace(/\r/g,`
`).replace(/[ \t]+\n/g,`
`).replace(/\n{3,}/g,`

`).trim()}async function s(t){const e=t.name.split(".").pop()?.toLowerCase()??"";if(t.type==="application/pdf"||e==="pdf"){const{parsePdf:r}=await o(async()=>{const{parsePdf:n}=await import("./parsePdf-C7ltus0I.js");return{parsePdf:n}},__vite__mapDeps([0,1,2]));return r(t)}if(t.type==="application/vnd.openxmlformats-officedocument.wordprocessingml.document"||e==="docx"){const{parseDocx:r}=await o(async()=>{const{parseDocx:n}=await import("./parseDocx-CaotBRDV.js");return{parseDocx:n}},__vite__mapDeps([3,1,2]));return r(t)}if(t.type.startsWith("text/")||a.has(e))return p(await t.text());throw new Error("Поддерживаются PDF, DOCX, TXT и MD.")}const i=Object.freeze(Object.defineProperty({__proto__:null,parseResumeFile:s},Symbol.toStringTag,{value:"Module"}));export{i,p as n};
