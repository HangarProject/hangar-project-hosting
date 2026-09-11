import{n as e,t}from"./jsx-runtime-QtymfJMM.js";import{S as n,_ as r,b as i,c as a,d as o,f as s,g as c,h as l,i as u,l as d,m as f,n as p,o as m,p as ee,s as h,t as g,u as te,v as ne,x as re,y as _}from"./GameClock-DEevSeTa.js";function ie(e){return e.maximumDurationSeconds??(e.routes??[]).map(e=>e.nodes.reduce((e,t)=>e+t.event.durationSeconds,0)).sort((e,t)=>t-e).slice(0,e.type===`short`?3:1).reduce((e,t)=>e+t,0)+(e.type===`short`?2*(e.shortBreakSeconds??60):0)}function v(e,t){let n=t.map(t=>{let n=e.routes?.find(e=>e.id===t);if(!n)throw Error(`Unknown itinerary route.`);return structuredClone(n)}),r=[],i=[],a=[];return n.forEach((t,o)=>{let s=r.length;r.push(...t.nodes.map(e=>({...e,routeId:t.id}))),i.push({routeId:t.id,name:t.name,start:s,end:r.length}),o<n.length-1&&a.push({afterNodeIndex:r.length-1,durationSeconds:e.shortBreakSeconds??60,nextRouteId:n[o+1].id})}),{...structuredClone(e),maximumDurationSeconds:ie(e),routes:n,nodes:r,boundaries:i,breaks:a,selectedRouteIds:[...t]}}function y(e,t){let n=[],r=[],i=0;for(let a of t.routeIds){let o=e.routes.find(e=>e.id===a),s=t.routes.find(e=>e.routeId===a);n.push(...s.dice),r.push(...s.hints.map(e=>i+e)),i+=o.nodes.length}return{dice:n,hints:r,rolled:t.routeIds.length>0&&t.routes.every(e=>e.rolled)}}function b(e,t,n){let r=e.nodes.slice(0,n+1).reduce((e,t)=>e+t.event.durationSeconds,0),i=(e.breaks??[]).filter(e=>e.afterNodeIndex<n).reduce((e,t)=>e+t.durationSeconds,0);return Date.parse(t)+(r+i)*1e3}function ae(e,t,n){for(let r of e.breaks??[]){let i=b(e,t,r.afterNodeIndex),a=i+r.durationSeconds*1e3;if(n>=i&&n<a)return{...r,startedAt:new Date(i).toISOString(),endsAt:new Date(a).toISOString(),origin:e.origin}}}function x(e,t,n){let r=[];for(let i of e.boundaries??[]){let a=i.start===0?Date.parse(t):b(e,t,i.start)-e.nodes[i.start].event.durationSeconds*1e3;a<=n&&r.push({kind:`route-start`,at:new Date(a).toISOString(),routeId:i.routeId,name:i.name})}for(let i of e.breaks??[]){let a=b(e,t,i.afterNodeIndex);for(let[t,o]of[[`break-start`,a],[`break-end`,a+i.durationSeconds*1e3]])o<=n&&r.push({kind:t,at:new Date(o).toISOString(),routeId:i.nextRouteId,name:e.origin.name})}return r.sort((e,t)=>Date.parse(e.at)-Date.parse(t.at)||(e.kind===`break-end`?-1:+(t.kind===`break-end`)))}function S(e){let t=2166136261;for(let n of e)t=Math.imul(t^n.charCodeAt(0),16777619);return()=>{t+=1831565813;let e=Math.imul(t^t>>>15,1|t);return e^=e+Math.imul(e^e>>>7,61|e),((e^e>>>14)>>>0)/4294967296}}function oe(e,t){return e.schemaVersion===2?{day:t,contentId:e.id,missions:e.missions.map(n=>{let r=e.locations.find(e=>e.id===n.locationId),i=n.routeIds.map(t=>{let n=e.routes.find(e=>e.id===t);return{id:t,name:n.name,nodes:n.nodes.map(n=>({id:n.id,routeId:t,position:structuredClone(n.position),event:structuredClone(e.events.find(e=>e.id===n.eventId))}))}}),a=e.routes.find(e=>e.id===n.routeIds[0]),o={id:t+`/`+n.id,locationId:r.id,locationName:r.name,locationPosition:r.position,locationDescription:r.description,route:{id:n.id,name:n.name,nodes:[]},events:[],structure:{type:n.type,origin:structuredClone(e.origins.find(t=>t.id===(a.originId??e.baseOriginId))),shortBreakSeconds:e.shortBreakSeconds??60,routes:i,nodes:[]}};return n.type===`long`?w(o,n.routeIds):o})}:{day:t,contentId:e.id,missions:e.locations.map(n=>{let r=S(`${t}/${e.id}/${n.id}`),i=n.routeIds[Math.floor(r()*n.routeIds.length)],a=e.routes.find(e=>e.id===i);return structuredClone({id:`${t}/${n.id}`,locationId:n.id,locationName:n.name,locationPosition:n.position,locationDescription:n.description,route:a,events:[...new Set(a.nodes.map(e=>e.eventId))].map(t=>e.events.find(e=>e.id===t))})})}}function C(e,t,n){if(e.structure){let n=e.structure.type===`long`?[e.structure.routes[0].id]:[];return{missionId:e.id,day:t,rolled:!1,dice:[],revealedNodeIndices:[],confirmed:!1,itinerary:{locked:e.structure.type===`long`,routeIds:n,routes:n.map(e=>({routeId:e,rolled:!1,dice:[],hints:[]}))}}}let r=S(`${e.id}/${n}`),i=e.route.nodes.map((e,t)=>t);for(let e=i.length-1;e>0;e--){let t=Math.floor(r()*(e+1));[i[e],i[t]]=[i[t],i[e]]}return{missionId:e.id,rolled:!1,day:t,revealedNodeIndices:i.slice(0,Math.ceil(i.length*.25)).sort((e,t)=>e-t),dice:e.route.nodes.filter(t=>e.events.find(e=>e.id===t.eventId).dc!==0).map(()=>1+Math.floor(r()*6))}}function w(e,t){let n=v(e.structure,t);return{...structuredClone(e),structure:n,route:{...e.route,nodes:n.nodes.map(e=>({id:e.id,eventId:e.event.id,position:e.position}))},events:[...new Map(n.nodes.map(e=>[e.event.id,e.event])).values()]}}var T=e(),E=class extends Error{issues;constructor(e){super(e.map(e=>`${e.path}: ${e.message}`).join(`
`)),this.issues=e,this.name=`ContentValidationError`}};function D(e){let t=[],n=(e,n)=>t.push({path:e,message:n}),r;try{r=JSON.parse(e)}catch{throw new E([{path:`$`,message:`Invalid JSON.`}])}if(r?.schemaVersion===2)return re(r,D,(e,t)=>{throw new E([{path:e,message:t}])});let i=(e,t)=>!e||typeof e!=`object`||Array.isArray(e)?(n(t,`Expected an object.`),{}):e,a=(e,t,r)=>!Array.isArray(e)||!e.length||e.length>r?(n(t,`Expected 1–${r} entries.`),[]):e,o=(e,t,r=2e3)=>{(typeof e!=`string`||!e.trim()||e.length>r)&&n(t,`Expected nonempty text up to ${r} characters.`)},s=(e,t)=>{(typeof e!=`string`||!/^[a-zA-Z0-9][a-zA-Z0-9_-]{0,63}$/.test(e))&&n(t,`Use 1–64 letters, numbers, hyphens or underscores; start with a letter or number.`)},c=(e,t,r,i)=>{(typeof e!=`number`||!Number.isSafeInteger(e)||e<r||e>i)&&n(t,`Expected an integer from ${r} to ${i}.`)},l=(e,t)=>{let r=i(e,t);for(let[e,i]of[[`x`,1280],[`y`,720]])(typeof r[e]!=`number`||!Number.isFinite(r[e])||r[e]<0||r[e]>i)&&n(`${t}.${e}`,`Expected a coordinate from 0 to ${i}.`)},u=(e,t)=>{e!==void 0&&(typeof e!=`string`||!/^(assets\/[a-zA-Z0-9_/-]+\.(png|jpg|jpeg|webp)|blob:[a-zA-Z0-9_-]+)$/.test(e))&&n(t,`Use assets/name.png (PNG/JPEG/WebP) or blob:asset-id.`)},d=i(r,`$`);d.schemaVersion!==1&&n(`schemaVersion`,`Only content schemaVersion 1 is supported.`),s(d.id,`id`),o(d.name,`name`,120);let f=a(d.events,`events`,500).map((e,t)=>i(e,`events[${t}]`)),p=a(d.routes,`routes`,100).map((e,t)=>i(e,`routes[${t}]`)),m=a(d.locations,`locations`,100).map((e,t)=>i(e,`locations[${t}]`));for(let[e,t]of[[`events`,f],[`routes`,p],[`locations`,m]]){let r=new Set;t.forEach((t,i)=>{s(t.id,`${e}[${i}].id`),r.has(t.id)&&n(`${e}[${i}].id`,`Duplicate ID.`),r.add(t.id)})}if(f.forEach((e,t)=>{let r=`events[${t}]`;o(e.title,`${r}.title`,120),o(e.description,`${r}.description`),u(e.storyImage,`${r}.storyImage`),c(e.durationSeconds,`${r}.durationSeconds`,1,604800),c(e.dc,`${r}.dc`,0,100),(e.dc===0?e.resourceHint!==null:![`supplies`,`gear`,`materials`].includes(String(e.resourceHint)))&&n(`${r}.resourceHint`,`Empty events require null; other events require supplies, gear or materials.`);for(let t of[`success`,`failure`]){let a=i(e[t],`${r}.${t}`);o(a.text,`${r}.${t}.text`);let s=i(a.rewards,`${r}.${t}.rewards`);for(let i of[`supplies`,`gear`,`materials`])c(s[i],`${r}.${t}.rewards.${i}`,0,1e6),(t===`failure`||e.dc===0)&&s[i]!==0&&n(`${r}.${t}.rewards.${i}`,`Failures and empty events grant zero rewards.`)}}),p.forEach((e,t)=>{let r=`routes[${t}]`;o(e.name,`${r}.name`,120);let s=0;a(e.nodes,`${r}.nodes`,100).forEach((e,t)=>{let a=i(e,`${r}.nodes[${t}]`),o=f.find(e=>e.id===a.eventId);o||n(`${r}.nodes[${t}].eventId`,`Unknown event ID.`),o?.dc===0&&s++,l(a.position,`${r}.nodes[${t}].position`)}),s>2&&n(`${r}.nodes`,`Routes may contain at most two empty nodes.`)}),m.forEach((e,t)=>{let r=`locations[${t}]`;o(e.name,`${r}.name`,120),o(e.description,`${r}.description`),l(e.position,`${r}.position`);let i=a(e.routeIds,`${r}.routeIds`,100);new Set(i).size!==i.length&&n(`${r}.routeIds`,`Duplicate route IDs.`),i.forEach((e,t)=>{p.some(t=>t.id===e)||n(`${r}.routeIds[${t}]`,`Unknown route ID.`)})}),t.length)throw new E(t);return r}var O=`{
  "schemaVersion": 2,
  "id": "milestone4-fixture",
  "name": "長短程任務測試",
  "events": [
    {
      "id": "supply-cache",
      "title": "補給箱",
      "description": "檢查倉庫中的補給箱。",
      "durationSeconds": 60,
      "dc": 8,
      "resourceHint": "supplies",
      "success": {
        "text": "取得可用補給品。",
        "rewards": {
          "supplies": 10,
          "gear": 0,
          "materials": 0
        }
      },
      "failure": {
        "text": "補給箱已損壞。",
        "rewards": {
          "supplies": 0,
          "gear": 0,
          "materials": 0
        }
      }
    },
    {
      "id": "gear-locker",
      "title": "裝備櫃",
      "description": "搜索留在據點的裝備。",
      "durationSeconds": 45,
      "dc": 1,
      "resourceHint": "gear",
      "success": {
        "text": "取得可用裝備。",
        "rewards": {
          "supplies": 0,
          "gear": 5,
          "materials": 0
        }
      },
      "failure": {
        "text": "未找到可用裝備。",
        "rewards": {
          "supplies": 0,
          "gear": 0,
          "materials": 0
        }
      }
    },
    {
      "id": "material-wreck",
      "title": "廢棄機具",
      "description": "從機具中回收材料。",
      "durationSeconds": 90,
      "dc": 10,
      "resourceHint": "materials",
      "success": {
        "text": "回收材料完成。",
        "rewards": {
          "supplies": 0,
          "gear": 0,
          "materials": 3
        }
      },
      "failure": {
        "text": "機具已無法拆解。",
        "rewards": {
          "supplies": 0,
          "gear": 0,
          "materials": 0
        }
      }
    },
    {
      "id": "quiet-street",
      "title": "安靜街道",
      "description": "隊伍沿著街道通過，沒有遭遇事件。",
      "durationSeconds": 30,
      "dc": 0,
      "resourceHint": null,
      "success": {
        "text": "通過街道。",
        "rewards": {
          "supplies": 0,
          "gear": 0,
          "materials": 0
        }
      },
      "failure": {
        "text": "空節點不進行判定。",
        "rewards": {
          "supplies": 0,
          "gear": 0,
          "materials": 0
        }
      }
    },
    {
      "id": "sealed-vault",
      "title": "封閉庫房",
      "description": "測試用高難度事件，用於檢查失敗後繼續任務。",
      "durationSeconds": 20,
      "dc": 100,
      "resourceHint": "supplies",
      "success": {
        "text": "庫房開啟。",
        "rewards": {
          "supplies": 2,
          "gear": 0,
          "materials": 0
        }
      },
      "failure": {
        "text": "無法開啟庫房，隊伍繼續前進。",
        "rewards": {
          "supplies": 0,
          "gear": 0,
          "materials": 0
        }
      }
    }
  ],
  "routes": [
    {
      "id": "short-1",
      "name": "短程路線 1",
      "nodes": [
        {
          "eventId": "supply-cache",
          "position": {
            "x": 556,
            "y": 328
          },
          "id": "node-1"
        },
        {
          "eventId": "quiet-street",
          "position": {
            "x": 494,
            "y": 304
          },
          "id": "node-2"
        },
        {
          "eventId": "gear-locker",
          "position": {
            "x": 432,
            "y": 280
          },
          "id": "node-3"
        }
      ]
    },
    {
      "id": "short-2",
      "name": "短程路線 2",
      "nodes": [
        {
          "eventId": "supply-cache",
          "position": {
            "x": 640,
            "y": 295
          },
          "id": "node-1"
        },
        {
          "eventId": "quiet-street",
          "position": {
            "x": 640,
            "y": 263
          },
          "id": "node-2"
        },
        {
          "eventId": "gear-locker",
          "position": {
            "x": 640,
            "y": 232
          },
          "id": "node-3"
        },
        {
          "eventId": "material-wreck",
          "position": {
            "x": 640,
            "y": 200
          },
          "id": "node-4"
        }
      ]
    },
    {
      "id": "short-3",
      "name": "短程路線 3",
      "nodes": [
        {
          "eventId": "supply-cache",
          "position": {
            "x": 724,
            "y": 328
          },
          "id": "node-1"
        },
        {
          "eventId": "quiet-street",
          "position": {
            "x": 786,
            "y": 304
          },
          "id": "node-2"
        },
        {
          "eventId": "gear-locker",
          "position": {
            "x": 848,
            "y": 280
          },
          "id": "node-3"
        }
      ]
    },
    {
      "id": "short-4",
      "name": "短程路線 4",
      "nodes": [
        {
          "eventId": "supply-cache",
          "position": {
            "x": 724,
            "y": 393
          },
          "id": "node-1"
        },
        {
          "eventId": "quiet-street",
          "position": {
            "x": 766,
            "y": 408
          },
          "id": "node-2"
        },
        {
          "eventId": "gear-locker",
          "position": {
            "x": 807,
            "y": 424
          },
          "id": "node-3"
        },
        {
          "eventId": "material-wreck",
          "position": {
            "x": 848,
            "y": 440
          },
          "id": "node-4"
        }
      ]
    },
    {
      "id": "short-5",
      "name": "短程路線 5",
      "nodes": [
        {
          "eventId": "supply-cache",
          "position": {
            "x": 640,
            "y": 425
          },
          "id": "node-1"
        },
        {
          "eventId": "quiet-street",
          "position": {
            "x": 640,
            "y": 473
          },
          "id": "node-2"
        },
        {
          "eventId": "gear-locker",
          "position": {
            "x": 640,
            "y": 520
          },
          "id": "node-3"
        }
      ]
    },
    {
      "id": "long-1",
      "name": "長程巡查",
      "nodes": [
        {
          "eventId": "supply-cache",
          "position": {
            "x": 556,
            "y": 393
          },
          "id": "node-1"
        },
        {
          "eventId": "quiet-street",
          "position": {
            "x": 525,
            "y": 404
          },
          "id": "node-2"
        },
        {
          "eventId": "gear-locker",
          "position": {
            "x": 494,
            "y": 416
          },
          "id": "node-3"
        },
        {
          "eventId": "material-wreck",
          "position": {
            "x": 463,
            "y": 428
          },
          "id": "node-4"
        },
        {
          "eventId": "sealed-vault",
          "position": {
            "x": 432,
            "y": 440
          },
          "id": "node-5"
        }
      ]
    }
  ],
  "locations": [
    {
      "id": "warehouse",
      "name": "倉庫區",
      "description": "本機測試用倉庫區。",
      "position": {
        "x": 760,
        "y": 250
      }
    },
    {
      "id": "workshop",
      "name": "工坊區",
      "description": "本機測試用工坊區。",
      "position": {
        "x": 521,
        "y": 224
      }
    }
  ],
  "origins": [
    {
      "id": "base",
      "name": "基地",
      "position": {
        "x": 640,
        "y": 360
      }
    },
    {
      "id": "outpost",
      "name": "前進據點",
      "position": {
        "x": 350,
        "y": 520
      }
    }
  ],
  "baseOriginId": "base",
  "shortBreakSeconds": 60,
  "missions": [
    {
      "id": "warehouse-short",
      "locationId": "warehouse",
      "name": "倉庫區短程任務",
      "type": "short",
      "routeIds": ["short-1", "short-2", "short-3", "short-4", "short-5"]
    },
    {
      "id": "warehouse-long",
      "locationId": "warehouse",
      "name": "倉庫區長程任務",
      "type": "long",
      "routeIds": ["long-1"]
    },
    {
      "id": "workshop-long",
      "locationId": "workshop",
      "name": "工坊區長程任務",
      "type": "long",
      "routeIds": ["long-1"]
    }
  ]
}
`,k=()=>({supplies:0,gear:0,materials:0});function se(e,t=e.nextNodeIndex){return e.mission.structure?b(e.mission.structure,e.startedAt,t):Date.parse(e.startedAt)+e.mission.route.nodes.slice(0,t+1).reduce((t,n)=>t+e.mission.events.find(e=>e.id===n.eventId).durationSeconds*1e3,0)}function ce(e,t,n){let r=e.activeRun,i=k(),a=k();for(let e of[`supplies`,`gear`,`materials`])i[e]=t===`Cleared`?r.earned[e]:Math.ceil(r.earned[e]/2),a[e]=r.earned[e]-i[e];e.pendingResults={id:r.id,run:r,status:t,finishedAt:new Date(n).toISOString(),retained:i,lost:a,submission:`pending`},e.activeRun=null}function A(e,t,n){let r=e.activeRun;if(r&&!e.pendingResults)for(r.mission.structure&&(r.phaseLog=x(r.mission.structure,r.startedAt,t));r.nextNodeIndex<r.mission.route.nodes.length;){let i=se(r);if(t<i)return;let a=r.nextNodeIndex,o=r.mission.events.find(e=>e.id===r.mission.route.nodes[a].eventId),s=o.dc===0,c=s?void 0:n(),l=s?void 0:r.dice[r.consumedDice];if(!s&&(!Number.isInteger(c)||c<1||c>10||!Number.isInteger(l)))throw Error(`Invalid saved dice or d10 result.`);let u=s||c+l>=o.dc,d=!s&&u?{...o.success.rewards}:k();r.log.push({nodeIndex:a,resolvedAt:new Date(i).toISOString(),outcome:s?`empty`:u?`success`:`failure`,...s?{}:{roll:c,modifier:l},text:(u?o.success:o.failure).text,rewards:d});for(let e of[`supplies`,`gear`,`materials`])r.earned[e]+=d[e];s||r.consumedDice++,r.nextNodeIndex++,r.nextNodeIndex===r.mission.route.nodes.length&&ce(e,`Cleared`,i)}}var j=class{name;database;constructor(e=`hangar-simulation-v1`){this.name=e}open(){return this.database||=new Promise((e,t)=>{let n=indexedDB.open(this.name,1);n.onupgradeneeded=()=>{n.result.createObjectStore(`state`),n.result.createObjectStore(`images`)},n.onsuccess=()=>{let t=n.result;t.onversionchange=()=>{t.close(),this.database=void 0},e(t)},n.onerror=()=>{this.database=void 0,t(n.error)},n.onblocked=()=>{this.database=void 0,t(Error(`Close older Hangar tabs to open local storage.`))}}),this.database}async update(e,t=!1){let n=await this.open();return new Promise((r,i)=>{let a=n.transaction(t?[`state`,`images`]:[`state`],`readwrite`),o=a.objectStore(`state`),s=o.get(`current`),c,l;s.onsuccess=()=>{try{let n=s.result;if(n&&n.schemaVersion!==1)throw Error(`Unsupported saved-state version. Export or reset the local fixtures explicitly.`);let r=e(n);r.state.revision=(n?.revision??0)+1,o.put(r.state,`current`),t&&a.objectStore(`images`).clear(),c=r.result}catch(e){l=e,a.abort()}},a.oncomplete=()=>r(c),a.onabort=()=>i(l??a.error??Error(`Local storage transaction was aborted.`)),a.onerror=()=>{}})}async putImage(e,t){let n=await this.open();return new Promise((r,i)=>{let a=n.transaction(`images`,`readwrite`);a.objectStore(`images`).put(t,e),a.oncomplete=()=>r(),a.onabort=()=>i(a.error??Error(`Image save failed.`))})}async getImage(e){let t=await this.open();return new Promise((n,r)=>{let i=t.transaction(`images`,`readonly`).objectStore(`images`).get(e);i.onsuccess=()=>n(i.result),i.onerror=()=>r(i.error)})}},M=()=>({preparations:{},usedDispatchDays:[],activeRun:null,pendingResults:null,history:[],contributions:k()}),N=()=>({schemaVersion:1,revision:0,content:D(O),players:[`alpha`,`bravo`,`charlie`].map((e,t)=>({id:e,displayName:`測試玩家 ${t+1}`,squad:{name:`測試隊伍 ${t+1}`,members:[{id:`${e}-commander`,name:`指揮官 ${t+1}`},{id:`${e}-member`,name:`隊員 ${t+1}`}]}})),selectedPlayerId:`alpha`,signedInPlayerId:null,progress:{alpha:M(),bravo:M(),charlie:M()},dailyLists:{},clockOffsetMs:0,organizationTotals:k()}),le=()=>{let e=new OffscreenCanvas(1,1),t=e.getContext(`2d`);return t.fillStyle=`#d9d9d9`,t.fillRect(0,0,1,1),e.convertToBlob({type:`image/png`})},P=new class{store;clock;rollD10;constructor(e=new j,t=Date.now,n=()=>Math.floor(Math.random()*10)+1){this.store=e,this.clock=t,this.rollD10=n}view(e){let t=this.clock()+e.clockOffsetMs;if(!Number.isFinite(t)||Math.abs(t)>864e13)throw Error(`Simulation time is outside the supported date range.`);let n=u(t);for(let n of Object.values(e.progress))A(n,t,this.rollD10);let r=e.dailyLists[n]??=oe(e.content,n),i=e.players.find(t=>t.id===e.selectedPlayerId),a=e.progress[i.id];if(!a.activeRun&&!a.pendingResults){a.committedMissionId?.slice(0,10)!==n&&delete a.committedMissionId,a.selectedMissionId?.slice(0,10)!==n&&(a.selectedMissionId=r.missions[0]?.id);for(let[e,t]of Object.entries(a.preparations))t.day!==n&&delete a.preparations[e]}a.committedMissionId?.slice(0,10)===n&&(a.selectedMissionId=a.committedMissionId);for(let e of r.missions)a.preparations[e.id]??=C(e,n,i.id);return{state:e,now:new Date(t).toISOString(),day:n,dailyList:r,player:i,progress:a}}async change(e=()=>{},t=!0){let n=await this.store.update(t=>{let n=t??N();return e(n),{state:n,result:this.view(n)}}),r=await this.store.getImage(`sample-story`),i=r?await createImageBitmap(r).catch(()=>void 0):void 0;return i?i.close():await this.store.putImage(`sample-story`,await le()),t&&window.dispatchEvent(new Event(`hangar:simulation-changed`)),n}getView(){return this.change(void 0,!1)}requireMissionChoice(e,t){if(e.progress.committedMissionId&&e.progress.committedMissionId!==t)throw Error(`已擲骰並確定任務，請完成目前任務並提交結果後再選擇。`)}requirePlayer(e,t){if(e.signedInPlayerId!==t||e.selectedPlayerId!==t)throw Error(`玩家已變更或已登出，請重新登入。`);return e.players.find(e=>e.id===t)}signIn(e,t){return this.change(n=>{let r=e.trim().toLowerCase();if(t!==`demo`||!n.players.some(e=>e.id===r))throw Error(`測試帳號不存在或測試密碼不正確。測試密碼為 demo。`);n.selectedPlayerId=r,n.signedInPlayerId=r})}register(e,t,n){return this.change(r=>{let i=e.trim().toLowerCase();if(!/^[a-z0-9][a-z0-9_-]{2,23}$/.test(i))throw Error(`帳號需為 3–24 個英文字母、數字、底線或連字號，並以字母或數字開頭。`);if(!t.trim()||t.trim().length>24)throw Error(`顯示名稱需為 1–24 個字元。`);if(n!==`demo`)throw Error(`本機模擬的測試密碼固定為 demo，請勿使用真實密碼。`);if(r.players.some(e=>e.id===i))throw Error(`此測試帳號已存在。`);r.players.push({id:i,displayName:t.trim(),squad:{name:`${t.trim()}的隊伍`,members:[]}}),r.progress[i]=M(),r.selectedPlayerId=i,r.signedInPlayerId=i})}signOut(){return this.change(e=>{e.signedInPlayerId=null})}async saveSquad(e,t){if(!t.name.trim()||t.name.trim().length>32)throw Error(`隊伍名稱需為 1–32 個字元。`);if(t.members.length>5)throw Error(`隊伍最多五位成員。`);if(new Set(t.members.map(e=>e.id)).size!==t.members.length)throw Error(`隊員 ID 不可重複。`);for(let e of t.members){if(!e.id||!e.name.trim()||e.name.trim().length>24)throw Error(`隊員名稱需為 1–24 個字元。`);if(e.portraitImage&&!await this.getImage(e.portraitImage))throw Error(`找不到隊員圖片，請重新上傳。`)}return this.change(n=>{let r=this.requirePlayer(n,e),i=r.squad.members[0];if(i&&t.members[0]?.id!==i.id)throw Error(`指揮官不可移除或更換位置。`);r.squad=structuredClone({...t,name:t.name.trim(),members:t.members.map(e=>({...e,name:e.name.trim()}))})})}moveSquadMember(e,t,n){return this.change(r=>{let i=this.requirePlayer(r,e).squad.members,a=i.findIndex(e=>e.id===t),o=a+n;if(n!==-1&&n!==1||a<=0||o<=0||o>=i.length)throw Error(`指揮官位置固定，隊員只能在其餘位置間移動。`);[i[a],i[o]]=[i[o],i[a]]})}confirmPreparation(e,t,n){return this.change(r=>{this.requirePlayer(r,e);let i=this.view(r);this.requireMissionChoice(i,t);let a=i.progress.preparations[t];if(!a||a.day!==i.day&&i.progress.committedMissionId!==t)throw Error(`任務日已變更，請重新選擇任務。`);if(i.progress.activeRun||i.progress.pendingResults)throw Error(`請先完成目前任務及結果處理。`);if(JSON.stringify(n)!==JSON.stringify(a.dice))throw Error(`修正骰已在其他視窗變更，請重新檢查排列。`);if(a.itinerary&&(!a.itinerary.locked||!a.rolled||!a.itinerary.routes.every(e=>e.rolled)))throw Error(`Lock the itinerary and roll every selected route before confirming.`);a.confirmed=!0})}selectMission(e,t){return this.change(n=>{this.requirePlayer(n,e);let r=this.view(n);if(this.requireMissionChoice(r,t),!r.dailyList.missions.some(e=>e.id===t))throw Error(`任務日已變更，請重新選擇地點。`);if(r.progress.activeRun||r.progress.pendingResults)throw Error(`請先完成目前任務及結果處理。`);r.progress.selectedMissionId=t})}dispatch(e,t){return this.change(n=>{this.requirePlayer(n,e);let r=this.view(n);this.requireMissionChoice(r,t);let i=f(r,t);if(i)throw Error(i);let a=r.dailyList.missions.find(e=>e.id===t);r.progress.activeRun={id:crypto.randomUUID(),missionDay:r.day,mission:a.structure?w(a,r.progress.preparations[t].itinerary.routeIds):structuredClone(a),squad:structuredClone(r.player.squad),startedAt:r.now,nextNodeIndex:0,dice:[...r.progress.preparations[t].dice],consumedDice:0,earned:k(),log:[]},r.progress.usedDispatchDays.push(r.day)})}selectPlayer(e){return this.change(t=>{if(!t.players.some(t=>t.id===e))throw Error(`Unknown simulated player.`);t.selectedPlayerId=e,t.signedInPlayerId&&=e})}setSubmissionFailure(e){return this.change(t=>{t.progress[t.selectedPlayerId].failNextSubmission=e})}retreat(e,t){return this.change(n=>{this.requirePlayer(n,e);let r=this.view(n);if(r.progress.pendingResults?.run.id!==t){if(!r.progress.activeRun||r.progress.activeRun.id!==t)throw Error(`任務已變更，請重新讀取。`);ce(r.progress,`Aborted`,Date.parse(r.now))}})}async submitResults(e,t){let n=!1,r=await this.change(r=>{this.requirePlayer(r,e);let i=r.progress[e];if(i.history.some(e=>e.id===t&&e.submission===`submitted`))return;let a=i.pendingResults;if(!a||a.id!==t)throw Error(`結果已變更，請重新讀取後再提交。`);if(i.failNextSubmission){i.failNextSubmission=!1,n=!0;return}for(let e of[`supplies`,`gear`,`materials`])i.contributions[e]+=a.retained[e],r.organizationTotals[e]+=a.retained[e];a.submission=`submitted`,i.history.push(a),i.pendingResults=null,delete i.committedMissionId,delete i.preparations[a.run.mission.id],delete i.selectedMissionId});if(n)throw Error(`模擬提交失敗，資源尚未入帳。結果已保留，請再次提交。`);return r}advanceTime(e){return!Number.isSafeInteger(e)||e<1||e>604800?Promise.reject(Error(`Advance time by 1–604800 whole seconds.`)):this.change(t=>{t.clockOffsetMs+=e*1e3})}async importContent(e){if(new TextEncoder().encode(e).byteLength>2e6)throw new E([{path:`$`,message:`Content JSON must be at most 2 MB.`}]);let t=D(e);for(let[e,n]of t.events.entries()){let t=n.storyImage;if(t?.startsWith(`blob:`)&&t!==`blob:sample-story`&&!await this.getImage(t))throw new E([{path:`events[${e}].storyImage`,message:`Missing local image ${t}. Upload the image in this browser first.`}])}return this.change(e=>{e.content=t})}async exportContent(){return JSON.stringify((await this.getView()).state.content,null,2)}async resetFixtures(){await this.store.update(()=>({state:N(),result:void 0}),!0);let e=await this.getView();return window.dispatchEvent(new Event(`hangar:simulation-changed`)),e}setItinerary(e,t,r,i){return this.change(a=>{this.requirePlayer(a,e);let o=this.view(a),s=o.progress.preparations[t];this.requireMissionChoice(o,t);let c=o.dailyList.missions.find(e=>e.id===t);if(!s?.itinerary||!c?.structure||o.progress.activeRun||o.progress.pendingResults)throw Error(`Preparation unavailable.`);if(s.itinerary.routes.some(e=>e.rolled))throw Error(`Itinerary cannot change after rolling.`);let l=n(c.structure.routes.map(e=>e.id),r,c.structure.type===`short`?3:1);s.itinerary={locked:i,routeIds:l,routes:l.map(e=>({routeId:e,rolled:!1,dice:[],hints:[]}))},s.dice=[],s.revealedNodeIndices=[],s.rolled=!1,s.confirmed=!1})}rollPreparation(e,t,n){return this.change(r=>{this.requirePlayer(r,e);let i=this.view(r);this.requireMissionChoice(i,t);let a=i.progress.preparations[t];if(!a||a.day!==i.day&&i.progress.committedMissionId!==t||i.progress.activeRun||i.progress.pendingResults)throw Error(`Preparation is unavailable.`);if(a.itinerary){let r=i.dailyList.missions.find(e=>e.id===t);if(r.structure?.type===`long`&&(a.itinerary.locked=!0),!a.itinerary.locked)throw Error(`Lock the itinerary before rolling.`);let o=a.itinerary.routes.find(e=>e.routeId===n),s=r.structure.routes.find(e=>e.id===n);if(!o||!s)throw Error(`Invalid route.`);if(!o.rolled){let i=S(t+`/`+e+`/`+n);o.dice=s.nodes.filter(e=>e.event.dc!==0).map(()=>1+Math.floor(i()*6));let c=s.nodes.map((e,t)=>t);for(let e=c.length-1;e>0;e--){let t=Math.floor(i()*(e+1));[c[e],c[t]]=[c[t],c[e]]}o.hints=c.slice(0,Math.ceil(c.length/4)),o.rolled=!0;let l=y(r.structure,a.itinerary);a.dice=l.dice,a.revealedNodeIndices=l.hints,a.rolled=l.rolled,a.confirmed=!1}i.progress.committedMissionId=t;return}a.rolled=!0,i.progress.committedMissionId=t})}saveDiceOrder(e,t,n){return this.change(r=>{n&&this.requirePlayer(r,n);let i=this.view(r);this.requireMissionChoice(i,e);let a=i.progress.preparations[e];if(!a||a.day!==i.day&&i.progress.committedMissionId!==e)throw Error(`Preparation is not available for this mission day.`);if(i.progress.activeRun||i.progress.pendingResults)throw Error(`Finish the current fixture before changing preparation.`);if(!t.every(e=>Number.isInteger(e)&&e>=1&&e<=6)||t.length!==a.dice.length||[...t].sort().join(`,`)!==[...a.dice].sort().join(`,`))throw Error(`Dice can be reordered, never rerolled.`);if(a.itinerary){if(!a.itinerary.locked||!a.rolled)throw Error(`Lock the itinerary and roll every route before ordering modifiers.`);let e=0;for(let n of a.itinerary.routes){let r=t.slice(e,e+n.dice.length);if([...r].sort().join(`,`)!==[...n.dice].sort().join(`,`))throw Error(`Modifiers must stay within their route.`);n.dice=r,e+=r.length}}a.dice=[...t],a.confirmed=!1})}loadScenario(e){return[`idle`,`active`,`pending`].includes(e)?this.change(t=>{let n=this.view(t),r=t.progress[n.player.id]=M();for(let e of n.dailyList.missions)r.preparations[e.id]=C(e,n.day,n.player.id);if(e===`idle`)return;let i=structuredClone(n.dailyList.missions[0]);if(i.structure){i=w(i,i.structure.routes.slice(0,i.structure.type===`short`?3:1).map(e=>e.id));let e=C({...i,structure:void 0},n.day,n.player.id);r.preparations[i.id]=e}let a=r.preparations[i.id],o=i.events.find(e=>e.id===i.route.nodes[0].eventId),s=o.dc===0,c=s||10+a.dice[0]>=o.dc,l=c?o.success:o.failure,u={id:crypto.randomUUID(),missionDay:n.day,mission:i,squad:structuredClone(n.player.squad),startedAt:new Date(Date.parse(n.now)-o.durationSeconds*1e3).toISOString(),nextNodeIndex:1,dice:[...a.dice],consumedDice:+!s,earned:structuredClone(l.rewards),log:[{nodeIndex:0,resolvedAt:n.now,outcome:s?`empty`:c?`success`:`failure`,...s?{}:{roll:10,modifier:a.dice[0]},text:l.text,rewards:structuredClone(l.rewards)}]};if(r.usedDispatchDays=[n.day],e===`active`)r.activeRun=u;else{let e=k(),t=k();for(let n of[`supplies`,`gear`,`materials`])e[n]=Math.ceil(u.earned[n]*.5),t[n]=u.earned[n]-e[n];r.pendingResults={id:crypto.randomUUID(),run:u,status:`Aborted`,finishedAt:n.now,retained:e,lost:t,submission:`pending`}}}):Promise.reject(Error(`Unknown fixture scenario.`))}async saveImage(e){if(![`image/png`,`image/jpeg`,`image/webp`].includes(e.type)||e.size>5e6||e.size===0)throw Error(`Use a PNG, JPEG or WebP image up to 5 MB.`);(await createImageBitmap(e).catch(()=>{throw Error(`The file is not a decodable image.`)})).close();let t=crypto.randomUUID();return await this.store.putImage(t,e),`blob:${t}`}getImage(e){return/^blob:[a-zA-Z0-9_-]+$/.test(e)?this.store.getImage(e.slice(5)):Promise.reject(Error(`Expected a local blob:asset-id reference.`))}},ue=`{
  "schemaVersion": 1,
  "id": "hangar-mock-v1",
  "name": "本機測試任務",
  "events": [
    {
      "id": "supply-cache",
      "title": "補給箱",
      "description": "檢查倉庫中的補給箱。",
      "storyImage": "blob:sample-story",
      "durationSeconds": 60,
      "dc": 8,
      "resourceHint": "supplies",
      "success": {
        "text": "取得可用補給品。",
        "rewards": { "supplies": 10, "gear": 0, "materials": 0 }
      },
      "failure": {
        "text": "補給箱已損壞。",
        "rewards": { "supplies": 0, "gear": 0, "materials": 0 }
      }
    },
    {
      "id": "gear-locker",
      "title": "裝備櫃",
      "description": "搜索留在據點的裝備。",
      "durationSeconds": 45,
      "dc": 1,
      "resourceHint": "gear",
      "success": {
        "text": "取得可用裝備。",
        "rewards": { "supplies": 0, "gear": 5, "materials": 0 }
      },
      "failure": {
        "text": "未找到可用裝備。",
        "rewards": { "supplies": 0, "gear": 0, "materials": 0 }
      }
    },
    {
      "id": "material-wreck",
      "title": "廢棄機具",
      "description": "從機具中回收材料。",
      "durationSeconds": 90,
      "dc": 10,
      "resourceHint": "materials",
      "success": {
        "text": "回收材料完成。",
        "rewards": { "supplies": 0, "gear": 0, "materials": 3 }
      },
      "failure": {
        "text": "機具已無法拆解。",
        "rewards": { "supplies": 0, "gear": 0, "materials": 0 }
      }
    },
    {
      "id": "quiet-street",
      "title": "安靜街道",
      "description": "隊伍沿著街道通過，沒有遭遇事件。",
      "durationSeconds": 30,
      "dc": 0,
      "resourceHint": null,
      "success": { "text": "通過街道。", "rewards": { "supplies": 0, "gear": 0, "materials": 0 } },
      "failure": {
        "text": "空節點不進行判定。",
        "rewards": { "supplies": 0, "gear": 0, "materials": 0 }
      }
    },
    {
      "id": "sealed-vault",
      "title": "封閉庫房",
      "description": "測試用高難度事件，用於檢查失敗後繼續任務。",
      "durationSeconds": 20,
      "dc": 100,
      "resourceHint": "supplies",
      "success": { "text": "庫房開啟。", "rewards": { "supplies": 2, "gear": 0, "materials": 0 } },
      "failure": {
        "text": "無法開啟庫房，隊伍繼續前進。",
        "rewards": { "supplies": 0, "gear": 0, "materials": 0 }
      }
    }
  ],
  "routes": [
    {
      "id": "warehouse-route",
      "name": "倉庫巡查",
      "nodes": [
        { "eventId": "supply-cache", "position": { "x": 399, "y": 503 } },
        { "eventId": "quiet-street", "position": { "x": 440, "y": 478 } },
        { "eventId": "gear-locker", "position": { "x": 476, "y": 445 } },
        { "eventId": "material-wreck", "position": { "x": 517, "y": 408 } },
        { "eventId": "sealed-vault", "position": { "x": 558, "y": 390 } }
      ]
    },
    {
      "id": "workshop-route",
      "name": "工坊巡查",
      "nodes": [
        { "eventId": "gear-locker", "position": { "x": 520, "y": 380 } },
        { "eventId": "material-wreck", "position": { "x": 570, "y": 340 } },
        { "eventId": "supply-cache", "position": { "x": 620, "y": 300 } },
        { "eventId": "quiet-street", "position": { "x": 670, "y": 260 } }
      ]
    }
  ],
  "locations": [
    {
      "id": "warehouse",
      "name": "倉庫區",
      "description": "本機測試用倉庫區。",
      "position": { "x": 760, "y": 250 },
      "routeIds": ["warehouse-route", "workshop-route"]
    },
    {
      "id": "workshop",
      "name": "工坊區",
      "description": "本機測試用工坊區。",
      "position": { "x": 521, "y": 224 },
      "routeIds": ["workshop-route"]
    }
  ]
}
`,F=t();function I(e,t){let n=URL.createObjectURL(e),r=document.createElement(`a`);r.href=n,r.download=t,r.click(),setTimeout(()=>URL.revokeObjectURL(n),1e3)}function de(){let[e,t]=(0,T.useState)(),[n,r]=(0,T.useState)(!1),[i,o]=(0,T.useState)(``),[s,c]=(0,T.useState)(``),[l,u]=(0,T.useState)(!1),[d,f]=(0,T.useState)(`blob:sample-story`),[p,m]=(0,T.useState)(``),[ee,h]=(0,T.useState)(0);async function g(e,n=``){r(!0),o(``),c(``);try{let r=await e();r&&t(r),c(n)}catch(e){o(e instanceof E?e.issues.map(e=>`${e.path}: ${e.message}`).join(`
`):e instanceof Error?e.message:`Local simulation operation failed.`)}finally{r(!1)}}return(0,T.useEffect)(()=>{let e=!1,n=()=>{P.getView().then(n=>{e||t(e=>!e||n.state.revision>=e.state.revision?n:e)}).catch(t=>{e||o(String(t))})};return n(),window.addEventListener(`hangar:simulation-changed`,n),()=>{e=!0,window.removeEventListener(`hangar:simulation-changed`,n)}},[]),(0,T.useEffect)(()=>{let e=!1,t=``;return m(``),P.getImage(d).then(n=>{n&&!e&&(t=URL.createObjectURL(n),m(t))}).catch(t=>{e||o(String(t))}),()=>{e=!0,t&&URL.revokeObjectURL(t)}},[d,ee,!!e]),(0,F.jsxs)(`details`,{className:`simulation-panel`,children:[(0,F.jsx)(`summary`,{children:`Local simulation · developer tools`}),(0,F.jsxs)(`div`,{className:`simulation-panel__body`,"aria-busy":n,children:[(0,F.jsx)(`p`,{children:`上方畫面已連接本機玩家、隊伍、任務及派遣服務。此面板可切換玩家、匯入內容及載入測試情境；時間推進會結算事件；結果可提交至本機基地。已登入時切換玩家也會切換上方畫面。`}),i&&(0,F.jsx)(`pre`,{className:`simulation-error`,role:`alert`,children:i}),s&&(0,F.jsx)(`p`,{role:`status`,children:s}),(0,F.jsxs)(`fieldset`,{disabled:n,children:[(0,F.jsx)(`legend`,{children:`測試資料與時間`}),(0,F.jsxs)(`div`,{className:`simulation-controls`,children:[(0,F.jsxs)(`label`,{children:[`模擬玩家`,` `,(0,F.jsx)(`select`,{"aria-label":`Simulated player`,value:e?.player.id??``,disabled:!e,onChange:e=>void g(()=>P.selectPlayer(e.target.value)),children:e?.state.players.map(e=>(0,F.jsx)(`option`,{value:e.id,children:e.displayName},e.id))})]}),(0,F.jsx)(a,{onClick:()=>void g(()=>P.getView()),children:`重新讀取`}),(0,F.jsx)(a,{onClick:()=>void g(()=>P.advanceTime(60)),children:`時間 +60 秒`}),(0,F.jsx)(a,{onClick:()=>void g(()=>P.advanceTime(86400)),children:`時間 +1 天`})]}),e&&(0,F.jsxs)(`p`,{className:`simulation-clock`,children:[`模擬時間：`,(0,F.jsx)(`time`,{children:e.now}),` · 任務日：`,(0,F.jsx)(`strong`,{"data-testid":`mission-day`,children:e.day}),`（03:00 Asia/Taipei (UTC+8) 切換）`]}),(0,F.jsxs)(`div`,{className:`simulation-controls`,children:[(0,F.jsx)(a,{onClick:()=>void g(()=>P.loadScenario(`idle`),`目前玩家已載入待命資料。`),children:`載入待命資料`}),(0,F.jsx)(a,{onClick:()=>void g(()=>P.loadScenario(`active`),`目前玩家已載入進行中資料；會依時間自動推進。`),children:`載入進行中資料`}),(0,F.jsx)(a,{onClick:()=>void g(()=>P.loadScenario(`pending`),`目前玩家已載入待提交結果；可由結算畫面提交。`),children:`載入待提交資料`})]}),(0,F.jsxs)(`label`,{children:[(0,F.jsx)(`input`,{type:`checkbox`,checked:e?.progress.failNextSubmission??!1,onChange:e=>void g(()=>P.setSubmissionFailure(e.target.checked))}),` `,`模擬下次資源提交失敗（一次）`]}),(0,F.jsx)(`p`,{className:`muted`,children:`載入測試情境會取代目前玩家的進度。完整重置會清除此網站來源的所有模擬玩家、內容、進度、時間偏移及上傳圖片。`}),l?(0,F.jsxs)(`div`,{className:`simulation-controls`,children:[(0,F.jsx)(a,{variant:`danger`,onClick:()=>void g(async()=>{let e=await P.resetFixtures();return u(!1),f(`blob:sample-story`),h(e=>e+1),e},`本機測試資料已重置。`),children:`確認重置本機模擬`}),(0,F.jsx)(a,{onClick:()=>u(!1),children:`取消重置`})]}):(0,F.jsx)(a,{variant:`danger`,onClick:()=>u(!0),children:`重置本機模擬`})]}),(0,F.jsxs)(`fieldset`,{disabled:n,children:[(0,F.jsx)(`legend`,{children:`內容匯入與匯出`}),(0,F.jsx)(a,{onClick:()=>void g(()=>P.importContent(O),`新版長短程任務已匯入，推進至下一個任務日後生效。`),children:`載入長短程任務範例`}),(0,F.jsxs)(`div`,{className:`simulation-controls`,children:[(0,F.jsxs)(`label`,{children:[`匯入內容 JSON`,` `,(0,F.jsx)(`input`,{"aria-label":`Import content JSON`,type:`file`,accept:`.json,application/json`,onChange:e=>{let t=e.target.files?.[0];e.target.value=``,t&&g(async()=>{if(t.size>2e6)throw Error(`Content JSON must be at most 2 MB.`);return P.importContent(await t.text())},`內容已儲存；既有任務日快照保留，新內容於下一個未建立的任務日使用。`)}})]}),(0,F.jsx)(a,{onClick:()=>void g(async()=>I(new Blob([await P.exportContent()],{type:`application/json`}),`hangar-content.json`)),children:`匯出內容 JSON`}),(0,F.jsx)(a,{onClick:()=>I(new Blob([ue],{type:`application/json`}),`hangar-sample.json`),children:`下載範例 JSON`})]}),(0,F.jsxs)(`p`,{children:[`目前內容：`,(0,F.jsx)(`strong`,{"data-testid":`content-name`,children:e?.state.content.name??`讀取中…`})]}),(0,F.jsx)(`p`,{className:`muted`,children:`匯入失敗會保留原內容。JSON 只包含內容定義；blob 圖片參照需在同一瀏覽器中存在，圖片檔案不會嵌入 JSON。`}),(0,F.jsxs)(`label`,{children:[`上傳測試圖片`,` `,(0,F.jsx)(`input`,{"aria-label":`Upload local image`,type:`file`,accept:`image/png,image/jpeg,image/webp`,onChange:e=>{let t=e.target.files?.[0];e.target.value=``,t&&g(async()=>{f(await P.saveImage(t)),h(e=>e+1)},`圖片已儲存至 IndexedDB，可將參照填入 storyImage。`)}})]}),(0,F.jsxs)(`p`,{children:[`圖片參照：`,(0,F.jsx)(`code`,{"data-testid":`image-reference`,children:d})]}),p&&(0,F.jsx)(`img`,{className:`simulation-image`,src:p,alt:`本機儲存圖片預覽（範例為 1px 佔位圖）`}),(0,F.jsx)(a,{onClick:()=>void g(async()=>{let e=await P.getImage(d);if(!e)throw Error(`Local image not found.`);I(e,`hangar-image.${e.type===`image/jpeg`?`jpg`:e.type===`image/webp`?`webp`:`png`}`)}),children:`下載目前圖片`})]}),e&&(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(`div`,{className:`simulation-table-wrap`,children:(0,F.jsxs)(`table`,{"aria-label":`Shared daily missions`,children:[(0,F.jsx)(`thead`,{children:(0,F.jsxs)(`tr`,{children:[(0,F.jsx)(`th`,{children:`共用任務 ID`}),(0,F.jsx)(`th`,{children:`地點 / 路線`}),(0,F.jsx)(`th`,{children:`目前玩家已知節點`}),(0,F.jsx)(`th`,{children:`已儲存修正骰`})]})}),(0,F.jsx)(`tbody`,{children:e.dailyList.missions.map(t=>{let n=e.progress.preparations[t.id],r=t.structure&&n.itinerary?.routeIds.length?w(t,n.itinerary.routeIds):t;return(0,F.jsxs)(`tr`,{children:[(0,F.jsx)(`td`,{children:r.id}),(0,F.jsxs)(`td`,{children:[r.locationName,` / `,r.route.name]}),(0,F.jsx)(`td`,{children:n.revealedNodeIndices.map(e=>`${e+1} (${r.events.find(t=>t.id===r.route.nodes[e].eventId).resourceHint??`empty`})`).join(`, `)}),(0,F.jsx)(`td`,{children:n.dice.join(`, `)})]},r.id)})})]})}),(0,F.jsxs)(`p`,{"data-testid":`saved-progress`,children:[`已儲存進度：`,e.progress.activeRun?`進行中`:e.progress.pendingResults?`待提交`:`待命`,` `,`· 派遣記錄：`,e.progress.usedDispatchDays.join(`, `)||`無`]}),(0,F.jsxs)(`details`,{children:[(0,F.jsx)(`summary`,{children:`檢查目前玩家資料`}),(0,F.jsx)(`pre`,{"data-testid":`progress-json`,children:JSON.stringify(e.progress,null,2)})]})]})]})]})}function L({reference:e,label:t,square:n=!1}){let[r,i]=(0,T.useState)(null);return(0,T.useEffect)(()=>{let t=!1,n=``;return i(null),e?.startsWith(`blob:`)?P.getImage(e).then(e=>{e&&!t&&(n=URL.createObjectURL(e),i(n))}).catch(()=>{}):e?.startsWith(`assets/`)&&i(`./${e}`),()=>{t=!0,n&&URL.revokeObjectURL(n)}},[e]),(0,F.jsx)(h,{src:r,label:t,square:n})}function fe(){let[e,t]=(0,T.useState)(),[n,r]=(0,T.useState)(``),[i,a]=(0,T.useState)(!1),o=(0,T.useRef)(!1),s=(0,T.useCallback)(e=>t(t=>!t||e.state.revision>=t.state.revision?e:t),[]),c=(0,T.useCallback)(async()=>{try{s(await P.getView())}catch(e){r(e instanceof Error?e.message:`無法讀取本機資料。`)}},[s]);(0,T.useEffect)(()=>{c();let e=()=>{c()};window.addEventListener(`hangar:simulation-changed`,e),window.addEventListener(`focus`,e);let t=setInterval(e,1e3);return()=>{clearInterval(t),window.removeEventListener(`hangar:simulation-changed`,e),window.removeEventListener(`focus`,e)}},[c]);async function l(e,t){if(!o.current){o.current=!0,a(!0),r(``);try{s(await e()),t?.()}catch(e){r(e instanceof Error?e.message:`本機操作失敗。`)}finally{o.current=!1,a(!1)}}}return{view:e,error:n,setError:r,busy:i,perform:l,refresh:c}}var pe=[[`title`,`標題畫面`],[`loading`,`讀取過渡`],[`map`,`地圖檢視`],[`preparation`,`任務進行前`],[`mission`,`任務進行中`],[`team`,`隊伍及資源管理`],[`history`,`上回任務記錄`],[`results`,`任務結算畫面`]],me=()=>pe.find(([e])=>e===location.hash.slice(1))?.[0]??`map`,R=e=>[e.supplies,e.gear,e.materials],he=e=>(e.structure?.breaks??[]).reduce((e,t)=>e+t.durationSeconds,0)+e.route.nodes.reduce((t,n)=>t+e.events.find(e=>e.id===n.eventId).durationSeconds,0),ge={supplies:`補`,gear:`裝`,materials:`材`,empty:`空`},_e=(e,t)=>e.outcome===`empty`?`空節點（不擲骰、不消耗修正骰）`:`${e.outcome===`success`?`成功`:`失敗`}（1d10［${e.roll}］ + ${e.modifier} = ${e.roll+e.modifier}，DC ${t}）`;function ve({mission:e,children:t}){return(0,F.jsxs)(o,{title:`MISSION FILE`,className:`mission-file`,children:[(0,F.jsx)(`h2`,{children:e.route.name}),(0,F.jsx)(`p`,{className:`cyan`,children:e.locationName}),(0,F.jsx)(`p`,{children:e.structure?.type===`short`?`最長預計時間：${ie(e.structure)} 秒`:`預計費時：${he(e)} 秒`}),(0,F.jsx)(h,{src:_.location,label:`地點圖片`}),(0,F.jsx)(`p`,{className:`muted`,children:e.structure?.type===`short`&&!e.structure.selectedRouteIds?.length?`五條路線選三條；路線之間休息，最後一條完成即結算。`:`路線節點：${e.route.nodes.length}`}),t]})}function ye({run:e}){return(0,F.jsxs)(`div`,{className:`mission-log`,children:[(0,F.jsx)(`h2`,{children:`作戰歷程`}),e?(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(`p`,{className:`muted`,children:e.mission.route.name}),(0,F.jsxs)(`p`,{children:[`修正骰：`,e.dice.join(`、`)||`無`]}),(0,F.jsxs)(`p`,{children:[`出發時間：`,e.startedAt]}),!e.log.length&&(0,F.jsx)(`p`,{children:`隊伍已出發，尚無事件紀錄。`}),(0,F.jsx)(c,{entries:e.phaseLog}),e.log.map(t=>(0,F.jsxs)(`section`,{children:[(0,F.jsx)(`hr`,{}),(0,F.jsxs)(`h3`,{children:[`節點 `,t.nodeIndex+1,` ·`,` `,t.outcome===`empty`?`空節點`:t.outcome===`success`?`成功`:`失敗`]}),(0,F.jsxs)(`p`,{children:[e.mission.events.find(n=>n.id===e.mission.route.nodes[t.nodeIndex].eventId)?.title,` `,`· DC`,` `,e.mission.events.find(n=>n.id===e.mission.route.nodes[t.nodeIndex].eventId)?.dc]}),(0,F.jsx)(`time`,{children:t.resolvedAt}),(0,F.jsx)(`p`,{children:t.text}),(0,F.jsx)(`p`,{className:`cyan`,children:_e(t,e.mission.events.find(n=>n.id===e.mission.route.nodes[t.nodeIndex].eventId).dc)}),(0,F.jsx)(s,{values:R(t.rewards)})]},t.nodeIndex))]}):(0,F.jsx)(`p`,{className:`muted`,children:`尚無任務紀錄。`})]})}function be(){let{view:e,error:t,setError:n,busy:c,perform:u,refresh:re}=fe(),[v,y]=(0,T.useState)(me),[b,x]=(0,T.useState)(null),[S,oe]=(0,T.useState)(!0),[C,E]=(0,T.useState)(``),[D,O]=(0,T.useState)(``),[k,ce]=(0,T.useState)(0),[A,j]=(0,T.useState)(``),[M,N]=(0,T.useState)(),[le,ue]=(0,T.useState)(``),[I,be]=(0,T.useState)(!1),[xe,Se]=(0,T.useState)(0),[Ce,we]=(0,T.useState)(null),[Te,Ee]=(0,T.useState)(!1),[De,Oe]=(0,T.useState)(!0),[ke,Ae]=(0,T.useState)(50),[je,Me]=(0,T.useState)(``);(0,T.useEffect)(()=>{if(!je)return;let e=window.setTimeout(()=>Me(``),4e3);return()=>window.clearTimeout(e)},[je]);let z=!!e?.state.signedInPlayerId,B=e?.progress.activeRun,Ne=B&&e?Math.max(0,Math.floor((Date.parse(e.now)-Date.parse(B.startedAt))/1e3)):0,Pe=B&&e?Math.max(0,Math.ceil((se(B)-Date.parse(e.now))/1e3)):0,V=e?.progress.pendingResults,H=e?.progress.history.at(-1),U=z?V?`results`:B&&[`map`,`preparation`].includes(v)?`mission`:v===`results`||v===`mission`&&!B||v===`title`?`map`:v:`title`,W=e?.dailyList.missions.find(t=>t.id===e.progress.selectedMissionId)??e?.dailyList.missions[0],G=W&&e?.progress.preparations[W.id],K=W?.structure&&G?.itinerary?.routeIds.length?w(W,G.itinerary.routeIds):W,q=U===`mission`?B?.mission:K,J=q&&{...q,route:{...q.route,nodes:i(q.route.nodes,q.structure?.origin?.position)}},Y=B?.mission.structure?ae(B.mission.structure,B.startedAt,Date.parse(e.now)):void 0,X=e?.player.squad,Z=()=>{x(null),n(``)},Q=e=>{V&&z||(y(e),x(null),Me(``),n(``))};(0,T.useEffect)(()=>{let e=e=>{let t=new URL(e.newURL).hash.slice(1);y(pe.find(([e])=>e===t)?.[0]??`map`),x(null)};return window.addEventListener(`hashchange`,e),()=>window.removeEventListener(`hashchange`,e)},[]),(0,T.useEffect)(()=>{e&&history.replaceState(null,``,`#${U}`)},[U,e,v]),(0,T.useEffect)(()=>{x(null),Se(0),we(null),y(e=>e===`preparation`?`map`:e)},[e?.player.id,e?.day,z]),(0,T.useEffect)(()=>{O(``)},[z]),(0,T.useEffect)(()=>{if(!M){ue(``);return}let e=URL.createObjectURL(M);return ue(e),()=>URL.revokeObjectURL(e)},[M]);let Fe=e=>{e.preventDefault(),u(()=>P.signIn(C,D),()=>{O(``),y(`loading`)})},Ie=e=>{ce(e),j(X?.members[e]?.name??``),N(void 0),be(!1),n(``),x(`edit`)},Le=t=>{if(t.preventDefault(),!e||!X)return;let n=e.player.id,r=structuredClone(X),i=r.members[k]??{id:crypto.randomUUID(),name:``};i.name=A,I&&delete i.portraitImage,r.members[k]=i,u(async()=>(M&&(i.portraitImage=await P.saveImage(M)),P.saveSquad(n,r)),Z)},Re=(t,n)=>{if(!e||!K||!G||c||t===n||t<0||n<0||t>=G.dice.length||n>=G.dice.length)return;let r=[...G.dice],[i]=r.splice(t,1);r.splice(n,0,i),u(()=>P.saveDiceOrder(K.id,r,e.player.id))},$=J?.events.find(e=>e.id===J.route.nodes[xe]?.eventId),ze=B?.log.find(e=>e.nodeIndex===xe),Be=U===`mission`&&!!B&&xe<B.nextNodeIndex+ +!Y,Ve=Be||!!(J&&e?.progress.preparations[J.id]?.revealedNodeIndices.includes(xe)),He=[`map`,`preparation`,`mission`,`results`].includes(U)?`map`:U,Ue=e&&K?f(e,K.id):`讀取任務中…`;return(0,F.jsxs)(`div`,{className:Te?`app reduce-motion`:`app`,children:[(0,F.jsx)(`a`,{className:`skip-link`,href:`#main-content`,onClick:e=>{e.preventDefault(),document.getElementById(`main-content`)?.focus()},children:`跳至主要內容`}),(0,F.jsxs)(`aside`,{className:`preview-toolbar`,"aria-label":`Development preview`,children:[(0,F.jsx)(`span`,{children:`HGP · Phase 1 local simulation`}),(0,F.jsxs)(`label`,{children:[`Screen`,` `,(0,F.jsx)(`select`,{"aria-label":`Preview screen`,value:U,disabled:!z||!!V||c,onChange:e=>Q(e.target.value),children:pe.map(([e,t])=>(0,F.jsx)(`option`,{value:e,disabled:e===`title`||e===`results`&&!V||e===`mission`&&!B,children:t},e))})]}),(0,F.jsx)(`span`,{children:`測試帳號 alpha / bravo / charlie · 密碼 demo`})]}),(0,F.jsxs)(`main`,{id:`main-content`,className:`stage stage--${U}`,tabIndex:-1,children:[U===`title`?(0,F.jsxs)(F.Fragment,{children:[(0,F.jsxs)(`div`,{className:`title-content`,children:[(0,F.jsx)(`div`,{className:`title-brand`,children:(0,F.jsx)(h,{src:_.brand,label:`HGP`,square:!0})}),(0,F.jsx)(`h1`,{children:`－ 派遣任務終端系統 －`}),(0,F.jsxs)(`form`,{onSubmit:Fe,className:`login-form`,children:[(0,F.jsxs)(`div`,{className:`login-fields`,children:[(0,F.jsx)(d,{label:`帳號`,placeholder:`alpha`,autoComplete:`off`,required:!0,maxLength:24,value:C,onChange:e=>E(e.target.value)}),(0,F.jsx)(d,{label:`密碼`,type:`password`,placeholder:`demo`,autoComplete:`off`,required:!0,value:D,onChange:e=>O(e.target.value)})]}),(0,F.jsxs)(`div`,{className:`login-actions`,children:[(0,F.jsx)(a,{variant:`primary`,disabled:c||!e,onClick:()=>{n(``),x(`register`)},children:`註冊`}),(0,F.jsx)(a,{variant:`primary`,type:`submit`,disabled:c||!e,children:`登入`})]})]}),(0,F.jsx)(`p`,{className:`login-help`,children:`本機模擬，測試密碼固定為 demo。請勿輸入真實密碼。資料僅儲存在此瀏覽器，不會與其他玩家同步。`})]}),(0,F.jsxs)(`div`,{className:`title-footer`,children:[(0,F.jsxs)(`div`,{className:`button-row`,children:[(0,F.jsx)(a,{onClick:()=>x(`about`),children:`關於`}),(0,F.jsx)(a,{onClick:()=>x(`recovery`),children:`忘記密碼`})]}),(0,F.jsx)(`small`,{children:`系統版本 0.1.0`})]})]}):U===`loading`?(0,F.jsxs)(`section`,{className:`loading-content`,"aria-labelledby":`loading-title`,children:[(0,F.jsx)(`h1`,{id:`loading-title`,children:`本機資料已載入`}),(0,F.jsx)(`progress`,{"aria-label":`載入進度`,max:`100`,value:`100`}),(0,F.jsx)(a,{onClick:()=>Q(`map`),children:`繼續`})]}):(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(`div`,{className:`map-background ${_.map?``:`map-background--placeholder`}`,"aria-hidden":`true`,style:_.map?{backgroundImage:`url(${_.map})`}:void 0}),(0,F.jsxs)(`header`,{className:`system-header`,children:[(0,F.jsxs)(`div`,{className:`brand-placeholder`,children:[`HGP`,(0,F.jsx)(`br`,{}),`logo`]}),(0,F.jsxs)(`div`,{children:[(0,F.jsx)(`p`,{children:`HANGAR PROJECT`}),(0,F.jsx)(g,{now:e?.now}),(0,F.jsx)(`small`,{children:e?.player.displayName})]})]}),[`map`,`preparation`,`mission`].includes(U)&&(0,F.jsxs)(F.Fragment,{children:[(0,F.jsxs)(p,{src:_.map,follow:S,children:[!_.map&&(0,F.jsx)(`span`,{className:`map-placeholder-label`,children:`地圖素材預留`}),U===`map`&&(0,F.jsx)(ne,{origin:K?.structure?.origin}),U===`map`?e?.dailyList.missions.filter((e,t,n)=>e.locationId===K?.locationId?e.id===K.id:n.findIndex(t=>t.locationId===e.locationId)===t).map(t=>{let n=e.state.content.locations.find(e=>e.id===t.locationId),r=t.locationPosition??n?.position??t.route.nodes[0].position;return(0,F.jsx)(`button`,{className:`map-marker ${K?.id===t.id?`is-selected`:``}`,style:{left:`${r.x/12.8}%`,top:`${r.y/7.2}%`},"aria-label":`選擇地點 ${t.locationName}`,"aria-pressed":K?.id===t.id,disabled:c||!!e?.progress.committedMissionId&&e.progress.committedMissionId!==t.id,onClick:()=>{e&&u(()=>P.selectMission(e.player.id,t.id))},children:(0,F.jsx)(`span`,{})},t.id)}):J&&(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(r,{nodes:J.route.nodes,origin:J.structure?.origin,boundaries:J.structure?.boundaries}),U===`mission`&&B&&(0,F.jsx)(`span`,{className:`squad-marker`,"aria-label":`隊伍目前位於節點 ${B.nextNodeIndex+1}`,style:{left:`${(Y?.origin.position??J.route.nodes[B.nextNodeIndex].position).x/12.8}%`,top:`${(Y?.origin.position??J.route.nodes[B.nextNodeIndex].position).y/7.2}%`},children:`◆`}),J.route.nodes.map((t,n)=>{let r=U===`mission`&&!!B&&n<B.nextNodeIndex+ +!Y||e?.progress.preparations[J.id]?.revealedNodeIndices.includes(n),i=J.events.find(e=>e.id===t.eventId),a=r?ge[i.resourceHint??`empty`]:`?`;return(0,F.jsx)(`button`,{className:`route-node ${U===`mission`&&!Y&&B?.nextNodeIndex===n?`is-current`:``}`,style:{left:`${t.position.x/12.8}%`,top:`${t.position.y/7.2}%`},"aria-label":`路線節點 ${n+1}：${r?a:`未揭露`}`,onClick:()=>{Se(n),x(`details`)},children:a},n)})]})]}),(0,F.jsxs)(`div`,{className:`map-scale`,children:[(0,F.jsxs)(`label`,{children:[(0,F.jsx)(`input`,{type:`checkbox`,checked:S,onChange:e=>oe(e.target.checked)}),`跟隨選中目標`]}),(0,F.jsx)(`div`,{children:`地圖比例尺`})]})]}),U===`map`&&K&&(0,F.jsxs)(F.Fragment,{children:[(0,F.jsxs)(`aside`,{className:`location-sidebar`,children:[(0,F.jsxs)(o,{children:[(0,F.jsx)(`h2`,{children:K.locationName}),K.structure&&(0,F.jsx)(`div`,{className:`button-row`,role:`group`,"aria-label":`任務類型`,children:e.dailyList.missions.filter(e=>e.locationId===K.locationId).map(t=>(0,F.jsx)(a,{className:t.id===K.id?`mission-type-selected`:``,"aria-pressed":t.id===K.id,disabled:c||!!e?.progress.usedDispatchDays.includes(e.day)||!!e?.progress.committedMissionId&&e.progress.committedMissionId!==t.id,onClick:()=>void u(()=>P.selectMission(e.player.id,t.id)),children:t.structure?.type===`short`?`短程任務`:`長程任務`},t.id))}),(0,F.jsx)(h,{src:_.location,label:`地點圖片`}),(0,F.jsx)(`p`,{className:`muted`,children:K.locationDescription??e?.state.content.locations.find(e=>e.id===K.locationId)?.description})]}),(0,F.jsxs)(o,{className:`location-mission`,children:[(0,F.jsx)(`h2`,{children:K.route.name}),(0,F.jsx)(`p`,{children:K.structure?.type===`short`?`最長預計時間：${ie(W.structure)} 秒`:`預計時間：${he(K)} 秒`}),(0,F.jsxs)(`p`,{className:`allowance`,children:[`今日派遣剩餘：`,+!e?.progress.usedDispatchDays.includes(e.day),` 次`]}),(0,F.jsx)(a,{onClick:()=>Q(`preparation`),children:`詳情`})]})]}),(0,F.jsxs)(`p`,{className:`reset-label`,children:[`任務日 `,e?.day,` · 03:00 Asia/Taipei (UTC+8) 刷新`]})]}),U===`preparation`&&K&&(0,F.jsx)(`aside`,{className:`right-sidebar preparation-sidebar`,children:(0,F.jsxs)(ve,{mission:K,children:[(0,F.jsx)(a,{disabled:c,onClick:()=>Q(`map`),children:`返回地圖`}),(0,F.jsxs)(`p`,{className:`allowance`,children:[`今日派遣剩餘：`,+!e?.progress.usedDispatchDays.includes(e.day),` 次`]}),(0,F.jsxs)(`div`,{className:`button-row`,children:[(0,F.jsx)(a,{disabled:c||!!B||!!V||!e||e.progress.usedDispatchDays.includes(e.day),onClick:()=>x(`dice`),children:`行前準備`}),(0,F.jsx)(a,{disabled:c||!!Ue,onClick:()=>{e&&u(()=>P.dispatch(e.player.id,K.id),()=>Q(`mission`))},children:`出發`})]}),(0,F.jsx)(`p`,{className:`muted`,role:`status`,children:Ue||`整支隊伍已準備就緒。`})]})}),U===`mission`&&B&&(0,F.jsxs)(F.Fragment,{children:[(0,F.jsxs)(`section`,{className:`mission-banner`,children:[(0,F.jsx)(`div`,{className:`mission-strip`,children:`MISSION IN PROGRESS`}),(0,F.jsxs)(`div`,{className:`mission-banner__body`,children:[(0,F.jsxs)(`div`,{children:[(0,F.jsxs)(`p`,{children:[(0,F.jsx)(l,{phase:Y,now:Date.parse(e.now),next:B.mission.structure?.routes?.find(e=>e.id===Y?.nextRouteId)?.name}),!Y&&(0,F.jsxs)(F.Fragment,{children:[` `,`已經過 `,Ne,` 秒 · 本節點剩餘 `,Pe,` 秒`,` `]})]}),(0,F.jsxs)(`p`,{className:`muted`,children:[`已完成節點 `,B.nextNodeIndex,`/`,B.mission.route.nodes.length]})]}),(0,F.jsxs)(`div`,{children:[(0,F.jsx)(`h2`,{children:B.mission.route.name}),(0,F.jsx)(`progress`,{"aria-label":`任務進度`,value:Ne,max:he(B.mission)}),(0,F.jsx)(a,{disabled:!!Y,onClick:()=>{Se(B.nextNodeIndex),x(`details`)},children:`詳細資訊`})]})]})]}),(0,F.jsx)(`aside`,{className:`right-sidebar active-sidebar`,children:(0,F.jsxs)(o,{children:[(0,F.jsx)(`h2`,{children:B.mission.route.name}),(0,F.jsx)(`p`,{className:`cyan`,children:B.mission.locationName}),(0,F.jsx)(`h3`,{children:B.squad.name}),(0,F.jsx)(`ul`,{className:`squad-list`,children:B.squad.members.map(e=>(0,F.jsx)(`li`,{children:e.name},e.id))}),(0,F.jsx)(s,{values:R(B.earned)}),(0,F.jsx)(`p`,{className:`event-outcome`,role:`status`,children:B.log.at(-1)?.text??`正在前往第一個節點。`},B.nextNodeIndex),(0,F.jsx)(a,{onClick:()=>x(`log`),children:`作戰歷程`}),(0,F.jsx)(a,{variant:`danger`,disabled:c,onClick:()=>x(`retreat`),children:`召回隊伍`})]})})]}),U===`team`&&X&&e&&(0,F.jsxs)(`div`,{className:`team-layout`,children:[(0,F.jsxs)(o,{title:`隊伍管理`,tone:`cyan`,children:[(0,F.jsxs)(`div`,{className:`squad-summary`,children:[(0,F.jsx)(L,{reference:X.badgeImage,label:`隊徽`,square:!0}),(0,F.jsx)(`h2`,{children:X.name}),(0,F.jsx)(a,{"aria-label":`修改隊伍名稱`,onClick:()=>{j(X.name),x(`squad`)},children:`修改`})]}),(0,F.jsx)(ee,{memberCount:X.members.length},`${e.player.id}-${X.members.length}`),(0,F.jsx)(`div`,{className:`members`,children:X.members.map((t,n)=>(0,F.jsxs)(`div`,{className:`member-row`,children:[n>0&&(0,F.jsxs)(`div`,{className:`member-order`,children:[(0,F.jsx)(a,{"aria-label":`將${t.name}向前移動`,disabled:c||n===1,onClick:()=>void u(()=>P.moveSquadMember(e.player.id,t.id,-1)),children:(0,F.jsx)(`span`,{"aria-hidden":`true`,children:`▲`})}),(0,F.jsx)(a,{"aria-label":`將${t.name}向後移動`,disabled:c||n===X.members.length-1,onClick:()=>void u(()=>P.moveSquadMember(e.player.id,t.id,1)),children:(0,F.jsx)(`span`,{"aria-hidden":`true`,children:`▼`})})]}),(0,F.jsx)(`div`,{className:`member-portrait`,children:(0,F.jsx)(L,{reference:t.portraitImage,label:`${t.name}頭像`,square:!0})}),(0,F.jsxs)(`span`,{children:[n===0?`指揮官`:`隊員 ${n}`,`　`,t.name]}),(0,F.jsx)(a,{"aria-label":`修改隊員 ${n+1}`,disabled:c,onClick:()=>Ie(n),children:`修改`})]},t.id))}),(0,F.jsx)(a,{disabled:c||X.members.length>=5,onClick:()=>Ie(X.members.length),children:`新增隊員`})]}),(0,F.jsxs)(`div`,{className:`team-resources`,children:[(0,F.jsxs)(o,{title:`隊伍獲取物資統計`,tone:`cyan`,children:[(0,F.jsx)(`h3`,{className:`section-label`,children:`已提交資源`}),(0,F.jsx)(s,{values:R(e.progress.contributions),vertical:!0}),(0,F.jsx)(`h3`,{className:`section-label`,children:`持有特殊道具`}),(0,F.jsx)(`p`,{className:`muted`,children:`尚無特殊道具`})]}),(0,F.jsx)(o,{title:`基地物資統計`,children:(0,F.jsx)(s,{values:R(e.state.organizationTotals)})})]})]}),U===`history`&&(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(`section`,{className:`history-panel`,children:(0,F.jsx)(ye,{run:H?.run})}),H&&(0,F.jsx)(`aside`,{className:`right-sidebar history-sidebar`,children:(0,F.jsxs)(ve,{mission:H.run.mission,children:[(0,F.jsxs)(`p`,{children:[H.status===`Cleared`?`路線已完成`:`任務已中止`,` ·`,` `,H.status]}),(0,F.jsx)(`h3`,{children:H.run.squad.name}),(0,F.jsx)(`ul`,{children:H.run.squad.members.map(e=>(0,F.jsx)(`li`,{children:e.name},e.id))}),(0,F.jsx)(`h3`,{children:`已提交資源`}),(0,F.jsx)(s,{values:R(H.retained)}),H.status===`Aborted`&&(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(`h3`,{children:`損失物資`}),(0,F.jsx)(s,{values:R(H.lost)})]})]})})]}),U===`results`&&V&&(0,F.jsxs)(te,{title:V.status===`Cleared`?`MISSION COMPLETED`:`MISSION ABORTED`,mandatory:!0,className:`modal--results`,children:[t&&(0,F.jsx)(`p`,{role:`alert`,className:`warning`,children:t}),(0,F.jsxs)(`section`,{className:`result-summary`,"aria-label":`任務結算`,children:[(0,F.jsx)(`h2`,{children:V.run.mission.route.name}),(0,F.jsxs)(`div`,{className:`result-team`,children:[(0,F.jsx)(L,{reference:V.run.squad.badgeImage,label:`隊徽`,square:!0}),(0,F.jsx)(`p`,{children:V.run.squad.name})]}),(0,F.jsxs)(`p`,{className:`result-status result-status--${V.status.toLowerCase()}`,children:[V.status===`Cleared`?`路線已完成`:`任務已中止`,` · `,V.status]})]}),(0,F.jsxs)(`section`,{className:`result-resources`,"aria-label":`結算物資`,children:[(0,F.jsx)(`h3`,{className:`section-label`,children:`本次獲取物資`}),(0,F.jsx)(s,{values:R(V.retained)}),V.status===`Aborted`&&(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(`h3`,{className:`section-label`,children:`損失物資`}),(0,F.jsx)(s,{values:R(V.lost)})]}),(0,F.jsxs)(`p`,{children:[`已完成節點 `,V.run.log.length,`/`,V.run.mission.route.nodes.length,` · 成功 `,V.run.log.filter(e=>e.outcome===`success`).length,` · 失敗 `,V.run.log.filter(e=>e.outcome===`failure`).length]}),(0,F.jsxs)(`details`,{children:[(0,F.jsx)(`summary`,{children:`檢視作戰歷程`}),(0,F.jsx)(ye,{run:V.run})]}),(0,F.jsxs)(`div`,{className:`result-actions`,children:[(0,F.jsx)(a,{disabled:c||!e,onClick:()=>{e&&u(()=>P.submitResults(e.player.id,V.id),()=>{y(`map`),Me(`資源已提交，任務紀錄已保存。`)})},children:c?`提交中…`:`提交資源`}),(0,F.jsx)(`p`,{className:`muted`,children:`提交後將更新本機隊伍與基地資源，並保存任務紀錄。`}),(0,F.jsx)(a,{disabled:c,onClick:()=>void u(()=>P.signOut(),()=>y(`title`)),children:`開發測試：返回登入`})]})]})]}),(0,F.jsxs)(`nav`,{className:`bottom-nav`,"aria-label":`主要導覽`,children:[(0,F.jsx)(a,{variant:`primary`,className:He===`map`?`is-active`:``,onClick:()=>Q(`map`),children:`地圖檢視`}),(0,F.jsx)(a,{variant:`primary`,className:He===`team`?`is-active`:``,onClick:()=>Q(`team`),children:`隊伍資源管理`}),(0,F.jsx)(a,{variant:`primary`,className:He===`history`?`is-active`:``,onClick:()=>Q(`history`),children:`上回任務紀錄`}),(0,F.jsx)(a,{variant:`primary`,onClick:()=>x(`logout`),children:`登出系統`})]})]}),!e&&(0,F.jsx)(`p`,{className:`notice`,children:`正在讀取本機資料…`}),t&&!b&&U!==`results`&&(0,F.jsxs)(`div`,{className:`notice`,role:`alert`,children:[t,(0,F.jsx)(a,{onClick:()=>void re(),children:`重新讀取`})]}),je&&(0,F.jsx)(`p`,{className:`notice`,role:`status`,children:je})]}),(0,F.jsxs)(`footer`,{className:`preview-footer`,children:[`Local simulation · saved in this browser · timed progression · local resource submission`,` `,(0,F.jsx)(a,{onClick:()=>x(`settings`),disabled:U===`results`,children:`系統設定`})]}),(0,F.jsx)(de,{}),b&&U!==`results`&&(0,F.jsxs)(te,{title:{retreat:`確認召回隊伍`,about:`關於`,recovery:`忘記密碼`,register:`註冊`,settings:`系統設定`,edit:`修改隊員`,squad:`修改隊伍`,logout:`確認登出`,dice:`行前準備`,log:`作戰歷程`,details:`任務資訊`}[b],className:b===`dice`&&W?.structure?.type===`short`?`modal--itinerary`:``,onClose:Z,children:[t&&(0,F.jsx)(`p`,{role:`alert`,className:`warning`,children:t}),b===`about`&&(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(`h3`,{children:`Hangar Project`}),(0,F.jsx)(`p`,{children:`派遣任務終端系統`}),(0,F.jsx)(`p`,{className:`muted`,children:`Phase 1 · 本機模擬`})]}),b===`recovery`&&(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(`p`,{children:`本機測試密碼固定為 demo。此模擬不寄送密碼重設郵件。`}),(0,F.jsx)(a,{onClick:Z,children:`確定`})]}),b===`register`&&(0,F.jsxs)(`form`,{onSubmit:e=>{e.preventDefault();let t=new FormData(e.currentTarget);u(()=>P.register(String(t.get(`account`)),String(t.get(`displayName`)),String(t.get(`password`))),()=>{Z(),y(`loading`)})},children:[(0,F.jsx)(d,{label:`帳號`,name:`account`,required:!0,minLength:3,maxLength:24}),(0,F.jsx)(d,{label:`顯示名稱`,name:`displayName`,required:!0,maxLength:24}),(0,F.jsx)(d,{label:`密碼`,name:`password`,type:`password`,required:!0,autoComplete:`off`}),(0,F.jsx)(`p`,{className:`muted`,children:`測試密碼固定為 demo，不儲存密碼，請勿使用真實帳密。`}),(0,F.jsx)(a,{type:`submit`,disabled:c,children:`註冊`})]}),b===`settings`&&(0,F.jsxs)(F.Fragment,{children:[(0,F.jsxs)(`label`,{className:`setting-row`,children:[`背景音樂`,` `,(0,F.jsx)(`input`,{type:`checkbox`,checked:De,onChange:e=>Oe(e.target.checked)}),` `,`靜音`]}),(0,F.jsxs)(`label`,{className:`setting-row`,children:[`音量`,` `,(0,F.jsx)(`input`,{type:`range`,min:`0`,max:`100`,value:ke,onChange:e=>Ae(Number(e.target.value))})]}),(0,F.jsxs)(`label`,{className:`setting-row`,children:[`減少動態效果`,` `,(0,F.jsx)(`input`,{type:`checkbox`,checked:Te,onChange:e=>Ee(e.target.checked)})]}),(0,F.jsx)(`p`,{className:`muted`,children:`尚未載入音訊。`}),(0,F.jsx)(a,{onClick:Z,children:`確定`})]}),b===`squad`&&e&&X&&(0,F.jsxs)(`form`,{onSubmit:t=>{t.preventDefault(),u(()=>P.saveSquad(e.player.id,{...X,name:A}),Z)},children:[(0,F.jsx)(d,{label:`隊伍名稱`,value:A,required:!0,maxLength:32,onChange:e=>j(e.target.value)}),(0,F.jsx)(a,{type:`submit`,disabled:c,children:`確定`})]}),b===`edit`&&e&&X&&(0,F.jsxs)(`form`,{onSubmit:Le,children:[(0,F.jsx)(d,{label:`隊員名稱`,value:A,required:!0,maxLength:24,onChange:e=>j(e.target.value)}),(0,F.jsx)(`div`,{className:`portrait-preview`,children:le?(0,F.jsx)(h,{src:le,label:`頭像預覽`,square:!0}):(0,F.jsx)(L,{reference:I?void 0:X.members[k]?.portraitImage,label:`頭像預覽`,square:!0})}),(0,F.jsxs)(`label`,{children:[`隊員頭像`,` `,(0,F.jsx)(`input`,{"aria-label":`隊員頭像`,type:`file`,accept:`image/png,image/jpeg,image/webp`,onChange:e=>{let t=e.target.files?.[0];if(t&&(![`image/png`,`image/jpeg`,`image/webp`].includes(t.type)||t.size>5e6)){n(`請選擇 5 MB 以下的 PNG、JPEG 或 WebP 圖片。`);return}n(``),N(t)}})]}),(0,F.jsx)(a,{onClick:()=>{N(void 0),be(!0)},children:`移除頭像`}),(0,F.jsx)(a,{type:`submit`,disabled:c,children:`確定`}),k>0&&k<X.members.length&&(0,F.jsx)(a,{variant:`danger`,disabled:c,onClick:()=>void u(()=>P.saveSquad(e.player.id,{...X,members:X.members.filter((e,t)=>t!==k)}),Z),children:`移除隊員`})]}),b===`retreat`&&B&&e&&(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(`p`,{children:`召回將中止任務。未完成節點不計獎勵，僅保留已完成節點資源的一半，各類資源分別向上取整。`}),(0,F.jsx)(`p`,{children:`今日派遣次數不會退還。確認時會先結算已到期的節點。`}),(0,F.jsx)(a,{variant:`danger`,disabled:c,onClick:()=>void u(()=>P.retreat(e.player.id,B.id),Z),children:`確認召回`}),(0,F.jsx)(a,{disabled:c,onClick:Z,children:`取消`})]}),b===`logout`&&(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(`p`,{children:`確認登出系統？進度會保留在本機。`}),(0,F.jsx)(a,{disabled:c,onClick:()=>void u(()=>P.signOut(),()=>{Z(),y(`title`)}),children:`確定`})]}),b===`dice`&&G?.itinerary&&W?.structure?.type===`short`&&e&&(0,F.jsx)(F.Fragment,{children:(0,F.jsx)(m,{origin:W.structure.origin,routes:W.structure.routes.map(e=>({id:e.id,name:e.name,nodeCount:e.nodes.length,nodes:e.nodes})),preparation:G.itinerary,busy:c,save:(t,n)=>void u(()=>P.setItinerary(e.player.id,W.id,t,n)),roll:t=>void u(()=>P.rollPreparation(e.player.id,W.id,t)),order:t=>void u(()=>P.saveDiceOrder(W.id,t,e.player.id)),confirm:()=>void u(()=>P.confirmPreparation(e.player.id,W.id,G.dice),Z)})}),b===`dice`&&(!G?.itinerary||K?.structure?.type===`long`)&&e&&K&&G&&(0,F.jsxs)(F.Fragment,{children:[G.rolled===!1&&(0,F.jsx)(a,{disabled:c,onClick:()=>void u(()=>P.rollPreparation(e.player.id,K.id,G.itinerary?.routeIds[0])),children:`擲修正骰(d6)`}),(0,F.jsx)(`p`,{children:`排列修正骰`}),(0,F.jsx)(`p`,{className:`muted`,children:`首次擲骰後即確定本次任務，完成並提交結果前無法更換任務。`}),(0,F.jsx)(`ol`,{className:`dice-list`,children:(G.rolled===!1?[]:G.dice).map((e,t)=>(0,F.jsxs)(`li`,{draggable:!c,onDragStart:e=>{we(t),e.dataTransfer.effectAllowed=`move`,e.dataTransfer.setData(`text/plain`,String(t))},onDragOver:e=>e.preventDefault(),onDrop:e=>{e.preventDefault(),Ce!==null&&Re(Ce,t),we(null)},onDragEnd:()=>we(null),children:[(0,F.jsx)(`span`,{className:`die`,children:e}),(0,F.jsxs)(`div`,{children:[(0,F.jsx)(a,{disabled:c||t===0,"aria-label":`將第 ${t+1} 顆骰子左移`,onClick:()=>Re(t,t-1),children:`◀`}),(0,F.jsx)(a,{disabled:c||t===G.dice.length-1,"aria-label":`將第 ${t+1} 顆骰子右移`,onClick:()=>Re(t,t+1),children:`▶`})]})]},t))}),!G.dice.length&&(0,F.jsx)(`p`,{children:`此路線沒有需要修正骰的事件。`}),(0,F.jsx)(`p`,{className:`muted`,children:`可拖曳或使用移動按鈕。順序立即儲存；確認後才能派遣，不可重擲。`}),(0,F.jsx)(a,{disabled:c||G.rolled===!1,onClick:()=>void u(()=>P.confirmPreparation(e.player.id,K.id,G.dice),Z),children:`確認排列`})]}),b===`log`&&(0,F.jsx)(ye,{run:B}),b===`details`&&ze&&$&&(0,F.jsxs)(`section`,{className:`event-outcome`,children:[(0,F.jsx)(`h3`,{children:_e(ze,$.dc)}),(0,F.jsx)(`p`,{children:ze.text})]}),b===`details`&&(Be&&$?(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(`h3`,{children:$.title}),(0,F.jsx)(`p`,{children:$.description}),$.storyImage&&(0,F.jsx)(L,{reference:$.storyImage,label:`事件圖片`}),(0,F.jsxs)(`p`,{children:[`節點時間：`,$.durationSeconds,` 秒`]}),(0,F.jsx)(`p`,{className:`cyan`,children:$.dc===0?`空節點：不擲骰、不消耗修正骰、沒有獎勵。`:`1d10 + 修正骰 ≥ DC ${$.dc}`})]}):Ve&&$?(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(`h3`,{children:`已揭露節點`}),(0,F.jsxs)(`p`,{children:[`資源提示：`,$.resourceHint===`supplies`?`補給品`:$.resourceHint===`gear`?`裝備`:$.resourceHint===`materials`?`材料`:`空節點`]})]}):(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(`h3`,{children:`未揭露節點`}),(0,F.jsx)(`p`,{children:`此節點的事件資訊尚未揭露。`})]}))]})]})}export{be as default};