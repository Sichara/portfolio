(function(){var debug=0,sep='&',w=window,d=document,l=location,lh=l.host,lpn=l.pathname,ft='function',st='string',prt='prototype',_gaq=(w._gaq=w._gaq||[]),q=(w._oaq=w._oaq||[]),dn=lh,ppn=lpn,mpa={ns:'mpa',dv:['internal','none','1','1','0','none','default','original'],kl:['source','slot','page','row','position','content','scope','hash']},m={_debugMode:function(mode){debug=mode},_setProductPath:function(p){ppn=p},_setDomainName:function(h){dn=h},_setSeparator:function(s){sep=s}},exec=function(arr){try{if(arr instanceof Array){var f=arr.slice(0,1)[0],a=arr.slice(1);if(typeof f==st)f=typeof m[f]==ft?m[f]:typeof w[f]==ft?w[f]:f;if(f instanceof Function)f.apply(w,a)}}catch(e){if(debug&&console)console.error(e)}},D=function(mask){this.m=mask;this.d={}};D[prt]={fromParams:function(h){h=(h[0]=='#'?h.slice(1):h).split(sep);for(var i=j=0,p,n,v={};h[i];i++){if((p=h[i].indexOf('='))>=0&&h[i].slice(0,4)=='oam_'&&this.m.kl.indexOf(n=h[i].slice(4,p))>=0&&++j)v[n]=unescape(h[i].slice(p+1))}if(j)this.d=v;this.j=!!j;return this},fromString:function(s){this.d={};for(var i=0,v=s.match(/((?:\\\.)|[^.])+/g)||[];v[i];i++)this.d[this.m.kl[i]]=v[i].replace("\\\.",".");return this},toString:function(){var r=this.m.dv.slice(),i;for(var n in this.d)if((i=this.m.kl.indexOf(n))>=0)r[i]=this.d[n].replace(".","\\\.");return r.join('.')}};var C=function(){};C[prt]={h:lh,p:'/',d:0,sec:0,s:function(v){v=encodeURIComponent(v)+'; domain='+this.h+'; path='+this.p;if(this.d){var dt=new Date();dt.setTime(dt.getTime()+this.d*24*60*60*1000);v+='; expires='+dt.toGMTString()}if(this.sec)v+='; secure';d.cookie=this.k+'='+v},g:function(){var v=d.cookie.match('(?:^|;)\\s*'+this.k.replace(/([.*+?^${}()|[\]\/\\])/g,'\\$1')+'=([^;]*)');return v?decodeURIComponent(v[1]):0}};var PC=function(ns,id){this.d=7;this.h=dn;this.p=lpn.search(ppn)===0?ppn:lpn;this.k='__oa'+ns+'_'+id};PC[prt]=new C();PC[prt]._g=PC[prt].g;PC[prt].g=function(){var v=this._g()||'';v=v.match(/(.*)\.(\d+)$/)||['',v,0];v[2]=parseInt(v[2]);return v.slice(1)};PC[prt]._s=PC[prt].s;PC[prt].s=function(v,s){if(v)this._s(v+'.'+s);else{this.d=-1;this._s()}};var GC=function(ns,id){this.d=30;this.h=dn;this.id=''+id;this.k='__oa'+ns};GC[prt]=new C();GC[prt]._l=function(){this.vs=[];this.ks=[];var v=(this._g()||'').match(/((?:\\\|)|[^|])+/g)||[];for(var i=0;v[i];i++){v[i]=v[i].match(/(.*)\.(\d+)$/)||['',v[i],0];if(v[i][2]){this.vs.push(v[i][1].replace("\\\|","|"));this.ks.push(v[i][2])}}};GC[prt]._g=GC[prt].g;GC[prt].g=function(){this._l();var v=this.vs[this.ks.indexOf(this.id)]||'';v=v.match(/(.*)\.(\d+)$/)||['',v,0];v[2]=parseInt(v[2]);return v.slice(1)};GC[prt]._s=GC[prt].s;GC[prt].s=function(v,s){this._l();var i=this.ks.indexOf(this.id);if(i>=0){this.vs.splice(i,1);this.ks.splice(i,1)}if(v){this.vs.unshift(v+'.'+s);this.ks.unshift(this.id)}v=[];for(var i=0;this.ks[i];i++){v.push(this.vs[i].replace("|","\\\|")+'.'+this.ks[i])}this._s(v.slice(0,10).join('|'))};for(var i=0;q[i];i++)exec(q[i]);q.push=exec})();