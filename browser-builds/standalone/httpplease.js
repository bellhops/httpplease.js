!function(a){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=a();else if("function"==typeof define&&define.amd)define([],a);else{var b;"undefined"!=typeof window?b=window:"undefined"!=typeof global?b=global:"undefined"!=typeof self&&(b=self),b.httpplease=a()}}(function(){return function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b){"use strict";function c(a,b){var c=new Error(a);c.name="RequestError",this.name=c.name,this.message=c.message,c.stack&&(this.stack=c.stack),this.toString=function(){return this.message};for(var d in b)b.hasOwnProperty(d)&&(this[d]=b[d])}var d=a("./response");c.prototype=Error.prototype,c.create=function(a,b,e){var f=new c(a,e);return d.call(f,b),f},b.exports=c},{"./response":4}],2:[function(a,b){"use strict";function c(a,b){function f(c,f){var i,n,o,p,q,r;for(c=new k(l(a,c)),e=0;e<b.length;e++)n=b[e],n.processRequest&&n.processRequest(c);for(e=0;e<b.length;e++)if(n=b[e],n.createXHR){i=n.createXHR(c);break}i=i||new g,c.xhr=i,o=m(h(function(a){clearTimeout(q),i.onload=i.onerror=i.onabort=i.onreadystatechange=i.ontimeout=i.onprogress=null;var g=d(c,a),h=g&&g.isHttpError?g:new j(c);for(e=0;e<b.length;e++)n=b[e],n.processResponse&&n.processResponse(h);g?c.onerror&&c.onerror(g):c.onload&&c.onload(h),f&&f(g,h)})),r="onload"in i&&"onerror"in i,i.onload=function(){o()},i.onerror=o,i.onabort=function(){o()},i.onreadystatechange=function(){if(4===i.readyState){if(c.aborted)return o();if(!r){var a;try{a=i.status}catch(b){}var b=0===a?new Error("Internal XHR Error"):null;return o(b)}}},i.ontimeout=function(){},i.onprogress=function(){},i.open(c.method,c.url),c.timeout&&(q=setTimeout(function(){c.timedOut=!0,o();try{i.abort()}catch(a){}},c.timeout));for(p in c.headers)c.headers.hasOwnProperty(p)&&i.setRequestHeader(p,c.headers[p]);return i.send(c.body),c}a=a||{},b=b||[];var i,n=["get","post","put","head","patch","delete"],o=function(a){return function(b,c){return b=new k(b),b.method=a,f(b,c)}};for(e=0;e<n.length;e++)i=n[e],f[i]=o(i);return f.plugins=function(){return b},f.defaults=function(d){return d?c(l(a,d),b):a},f.use=function(){var d=Array.prototype.slice.call(arguments,0);return c(a,b.concat(d))},f.bare=function(){return c()},f.Request=k,f.Response=j,f}function d(a,b){if(a.aborted)return i("Request aborted",a,{name:"Abort"});if(a.timedOut)return i("Request timeout",a,{name:"Timeout"});var c,d=a.xhr,e=Math.floor(d.status/100);switch(e){case 0:case 2:if(!b)return;return i(b.message,a);case 4:if(404===d.status&&!a.errorOn404)return;c="Client";break;case 5:c="Server";break;default:c="HTTP"}var f=c+" Error: The server returned a status of "+d.status+' for the request "'+a.method.toUpperCase()+" "+a.url+'"';return i(f,a)}var e,f=a("../plugins/cleanurl"),g=a("./xhr"),h=a("./utils/delay"),i=a("./error").create,j=a("./response"),k=a("./request"),l=a("xtend"),m=a("./utils/once");b.exports=c({},[f])},{"../plugins/cleanurl":9,"./error":1,"./request":3,"./response":4,"./utils/delay":5,"./utils/once":6,"./xhr":7,xtend:8}],3:[function(a,b){"use strict";function c(a){var b="string"==typeof a?{url:a}:a||{};this.method=b.method?b.method.toUpperCase():"GET",this.url=b.url,this.headers=b.headers||{},this.body=b.body,this.timeout=b.timeout||0,this.errorOn404=null!=b.errorOn404?b.errorOn404:!0,this.onload=b.onload,this.onerror=b.onerror}c.prototype.abort=function(){return this.aborted?void 0:(this.aborted=!0,this.xhr.abort(),this)},c.prototype.header=function(a,b){var c;for(c in this.headers)if(this.headers.hasOwnProperty(c)&&a.toLowerCase()===c.toLowerCase()){if(1===arguments.length)return this.headers[c];delete this.headers[c];break}return null!=b?(this.headers[a]=b,b):void 0},b.exports=c},{}],4:[function(a,b){"use strict";function c(a){var b,c,d,e=a.xhr;if(this.request=a,this.xhr=e,this.headers={},!a.aborted&&!a.timedOut){if(this.status=e.status||0,this.text=e.responseText,this.body=e.response||e.responseText,this.contentType=e.contentType||e.getResponseHeader&&e.getResponseHeader("Content-Type"),e.getAllResponseHeaders)for(c=e.getAllResponseHeaders().split("\n"),b=0;b<c.length;b++)(d=c[b].match(/\s*([^\s]+):\s+([^\s]+)/))&&(this.headers[d[1]]=d[2]);this.isHttpError=this.status>=400}}var d=a("./request");c.prototype.header=d.prototype.header,b.exports=c},{"./request":3}],5:[function(a,b){"use strict";b.exports=function(a){return function(){var b=Array.prototype.slice.call(arguments,0),c=function(){return a.apply(null,b)};setTimeout(c,0)}}},{}],6:[function(a,b){"use strict";b.exports=function(a){var b,c=!1;return function(){return c||(c=!0,b=a.apply(this,arguments)),b}}},{}],7:[function(a,b){b.exports=window.XMLHttpRequest},{}],8:[function(a,b){function c(){for(var a={},b=0;b<arguments.length;b++){var c=arguments[b];for(var d in c)c.hasOwnProperty(d)&&(a[d]=c[d])}return a}b.exports=c},{}],9:[function(a,b){"use strict";b.exports={processRequest:function(a){a.url=a.url.replace(/[^%]+/g,function(a){return encodeURI(a)})}}},{}]},{},[2])(2)});