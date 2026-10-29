const V="fb-v40";
self.addEventListener("install",e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(["./","./manifest.webmanifest"])));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET"||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith(fetch(e.request).then(r=>{const c=r.clone();caches.open(V).then(x=>x.put(e.request,c));return r}).catch(()=>caches.match(e.request)))});
/* v224: push alerts when the app is closed. The server sends JSON {title, body, tag, url, actions:[{action,title}], data}. */
self.addEventListener("push",e=>{let d={};try{d=e.data?e.data.json():{}}catch(x){d={title:"FighterBase",body:e.data?e.data.text():""}}
 e.waitUntil(self.registration.showNotification(d.title||"FighterBase",{body:d.body||"",tag:d.tag||"fb",icon:"icon-192.png",badge:"icon-192.png",data:{url:d.url||"./",d:d.data||{}},actions:(d.actions||[]).slice(0,2)}))});
self.addEventListener("notificationclick",e=>{e.notification.close();const dd=e.notification.data||{};const act=e.action||"";
 const u=new URL(dd.url||"./",self.registration.scope);if(act)u.hash=(u.hash||"#")+(u.hash?"&":"")+"fbact="+encodeURIComponent(act);
 e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(cs=>{for(const c of cs){if("focus" in c){c.navigate&&c.navigate(u.href);return c.focus()}}return self.clients.openWindow(u.href)}))});
