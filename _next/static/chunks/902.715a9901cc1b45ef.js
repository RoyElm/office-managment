(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[902],{1857:(e,t,r)=>{"use strict";r.d(t,{h:()=>S});var n,i=r(2115),s=Object.defineProperty,o=Object.getOwnPropertySymbols,l=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable,u=(e,t,r)=>t in e?s(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,h=(e,t)=>{for(var r in t||(t={}))l.call(t,r)&&u(e,r,t[r]);if(o)for(var r of o(t))a.call(t,r)&&u(e,r,t[r]);return e},c=(e,t)=>{var r={};for(var n in e)l.call(e,n)&&0>t.indexOf(n)&&(r[n]=e[n]);if(null!=e&&o)for(var n of o(e))0>t.indexOf(n)&&a.call(e,n)&&(r[n]=e[n]);return r};(e=>{let t=class t{constructor(e,r,n,s){if(this.version=e,this.errorCorrectionLevel=r,this.modules=[],this.isFunction=[],e<t.MIN_VERSION||e>t.MAX_VERSION)throw RangeError("Version value out of range");if(s<-1||s>7)throw RangeError("Mask value out of range");this.size=4*e+17;let o=[];for(let e=0;e<this.size;e++)o.push(!1);for(let e=0;e<this.size;e++)this.modules.push(o.slice()),this.isFunction.push(o.slice());this.drawFunctionPatterns();let l=this.addEccAndInterleave(n);if(this.drawCodewords(l),-1==s){let e=1e9;for(let t=0;t<8;t++){this.applyMask(t),this.drawFormatBits(t);let r=this.getPenaltyScore();r<e&&(s=t,e=r),this.applyMask(t)}}i(0<=s&&s<=7),this.mask=s,this.applyMask(s),this.drawFormatBits(s),this.isFunction=[]}static encodeText(r,n){let i=e.QrSegment.makeSegments(r);return t.encodeSegments(i,n)}static encodeBinary(r,n){let i=e.QrSegment.makeBytes(r);return t.encodeSegments([i],n)}static encodeSegments(e,n,s=1,l=40,a=-1,u=!0){let h,c;if(!(t.MIN_VERSION<=s&&s<=l&&l<=t.MAX_VERSION)||a<-1||a>7)throw RangeError("Invalid value");for(h=s;;h++){let r=8*t.getNumDataCodewords(h,n),i=o.getTotalBits(e,h);if(i<=r){c=i;break}if(h>=l)throw RangeError("Data too long")}for(let e of[t.Ecc.MEDIUM,t.Ecc.QUARTILE,t.Ecc.HIGH])u&&c<=8*t.getNumDataCodewords(h,e)&&(n=e);let d=[];for(let t of e)for(let e of(r(t.mode.modeBits,4,d),r(t.numChars,t.mode.numCharCountBits(h),d),t.getData()))d.push(e);i(d.length==c);let f=8*t.getNumDataCodewords(h,n);i(d.length<=f),r(0,Math.min(4,f-d.length),d),r(0,(8-d.length%8)%8,d),i(d.length%8==0);for(let e=236;d.length<f;e^=253)r(e,8,d);let m=[];for(;8*m.length<d.length;)m.push(0);return d.forEach((e,t)=>m[t>>>3]|=e<<7-(7&t)),new t(h,n,m,a)}getModule(e,t){return 0<=e&&e<this.size&&0<=t&&t<this.size&&this.modules[t][e]}getModules(){return this.modules}drawFunctionPatterns(){for(let e=0;e<this.size;e++)this.setFunctionModule(6,e,e%2==0),this.setFunctionModule(e,6,e%2==0);this.drawFinderPattern(3,3),this.drawFinderPattern(this.size-4,3),this.drawFinderPattern(3,this.size-4);let e=this.getAlignmentPatternPositions(),t=e.length;for(let r=0;r<t;r++)for(let n=0;n<t;n++)(0!=r||0!=n)&&(0!=r||n!=t-1)&&(r!=t-1||0!=n)&&this.drawAlignmentPattern(e[r],e[n]);this.drawFormatBits(0),this.drawVersion()}drawFormatBits(e){let t=this.errorCorrectionLevel.formatBits<<3|e,r=t;for(let e=0;e<10;e++)r=r<<1^(r>>>9)*1335;let s=(t<<10|r)^21522;i(s>>>15==0);for(let e=0;e<=5;e++)this.setFunctionModule(8,e,n(s,e));this.setFunctionModule(8,7,n(s,6)),this.setFunctionModule(8,8,n(s,7)),this.setFunctionModule(7,8,n(s,8));for(let e=9;e<15;e++)this.setFunctionModule(14-e,8,n(s,e));for(let e=0;e<8;e++)this.setFunctionModule(this.size-1-e,8,n(s,e));for(let e=8;e<15;e++)this.setFunctionModule(8,this.size-15+e,n(s,e));this.setFunctionModule(8,this.size-8,!0)}drawVersion(){if(this.version<7)return;let e=this.version;for(let t=0;t<12;t++)e=e<<1^(e>>>11)*7973;let t=this.version<<12|e;i(t>>>18==0);for(let e=0;e<18;e++){let r=n(t,e),i=this.size-11+e%3,s=Math.floor(e/3);this.setFunctionModule(i,s,r),this.setFunctionModule(s,i,r)}}drawFinderPattern(e,t){for(let r=-4;r<=4;r++)for(let n=-4;n<=4;n++){let i=Math.max(Math.abs(n),Math.abs(r)),s=e+n,o=t+r;0<=s&&s<this.size&&0<=o&&o<this.size&&this.setFunctionModule(s,o,2!=i&&4!=i)}}drawAlignmentPattern(e,t){for(let r=-2;r<=2;r++)for(let n=-2;n<=2;n++)this.setFunctionModule(e+n,t+r,1!=Math.max(Math.abs(n),Math.abs(r)))}setFunctionModule(e,t,r){this.modules[t][e]=r,this.isFunction[t][e]=!0}addEccAndInterleave(e){let r=this.version,n=this.errorCorrectionLevel;if(e.length!=t.getNumDataCodewords(r,n))throw RangeError("Invalid argument");let s=t.NUM_ERROR_CORRECTION_BLOCKS[n.ordinal][r],o=t.ECC_CODEWORDS_PER_BLOCK[n.ordinal][r],l=Math.floor(t.getNumRawDataModules(r)/8),a=s-l%s,u=Math.floor(l/s),h=[],c=t.reedSolomonComputeDivisor(o);for(let r=0,n=0;r<s;r++){let i=e.slice(n,n+u-o+(r<a?0:1));n+=i.length;let s=t.reedSolomonComputeRemainder(i,c);r<a&&i.push(0),h.push(i.concat(s))}let d=[];for(let e=0;e<h[0].length;e++)h.forEach((t,r)=>{(e!=u-o||r>=a)&&d.push(t[e])});return i(d.length==l),d}drawCodewords(e){if(e.length!=Math.floor(t.getNumRawDataModules(this.version)/8))throw RangeError("Invalid argument");let r=0;for(let t=this.size-1;t>=1;t-=2){6==t&&(t=5);for(let i=0;i<this.size;i++)for(let s=0;s<2;s++){let o=t-s,l=(t+1&2)==0?this.size-1-i:i;!this.isFunction[l][o]&&r<8*e.length&&(this.modules[l][o]=n(e[r>>>3],7-(7&r)),r++)}}i(r==8*e.length)}applyMask(e){if(e<0||e>7)throw RangeError("Mask value out of range");for(let t=0;t<this.size;t++)for(let r=0;r<this.size;r++){let n;switch(e){case 0:n=(r+t)%2==0;break;case 1:n=t%2==0;break;case 2:n=r%3==0;break;case 3:n=(r+t)%3==0;break;case 4:n=(Math.floor(r/3)+Math.floor(t/2))%2==0;break;case 5:n=r*t%2+r*t%3==0;break;case 6:n=(r*t%2+r*t%3)%2==0;break;case 7:n=((r+t)%2+r*t%3)%2==0;break;default:throw Error("Unreachable")}!this.isFunction[t][r]&&n&&(this.modules[t][r]=!this.modules[t][r])}}getPenaltyScore(){let e=0;for(let r=0;r<this.size;r++){let n=!1,i=0,s=[0,0,0,0,0,0,0];for(let o=0;o<this.size;o++)this.modules[r][o]==n?5==++i?e+=t.PENALTY_N1:i>5&&e++:(this.finderPenaltyAddHistory(i,s),n||(e+=this.finderPenaltyCountPatterns(s)*t.PENALTY_N3),n=this.modules[r][o],i=1);e+=this.finderPenaltyTerminateAndCount(n,i,s)*t.PENALTY_N3}for(let r=0;r<this.size;r++){let n=!1,i=0,s=[0,0,0,0,0,0,0];for(let o=0;o<this.size;o++)this.modules[o][r]==n?5==++i?e+=t.PENALTY_N1:i>5&&e++:(this.finderPenaltyAddHistory(i,s),n||(e+=this.finderPenaltyCountPatterns(s)*t.PENALTY_N3),n=this.modules[o][r],i=1);e+=this.finderPenaltyTerminateAndCount(n,i,s)*t.PENALTY_N3}for(let r=0;r<this.size-1;r++)for(let n=0;n<this.size-1;n++){let i=this.modules[r][n];i==this.modules[r][n+1]&&i==this.modules[r+1][n]&&i==this.modules[r+1][n+1]&&(e+=t.PENALTY_N2)}let r=0;for(let e of this.modules)r=e.reduce((e,t)=>e+ +!!t,r);let n=this.size*this.size,s=Math.ceil(Math.abs(20*r-10*n)/n)-1;return i(0<=s&&s<=9),i(0<=(e+=s*t.PENALTY_N4)&&e<=2568888),e}getAlignmentPatternPositions(){if(1==this.version)return[];{let e=Math.floor(this.version/7)+2,t=32==this.version?26:2*Math.ceil((4*this.version+4)/(2*e-2)),r=[6];for(let n=this.size-7;r.length<e;n-=t)r.splice(1,0,n);return r}}static getNumRawDataModules(e){if(e<t.MIN_VERSION||e>t.MAX_VERSION)throw RangeError("Version number out of range");let r=(16*e+128)*e+64;if(e>=2){let t=Math.floor(e/7)+2;r-=(25*t-10)*t-55,e>=7&&(r-=36)}return i(208<=r&&r<=29648),r}static getNumDataCodewords(e,r){return Math.floor(t.getNumRawDataModules(e)/8)-t.ECC_CODEWORDS_PER_BLOCK[r.ordinal][e]*t.NUM_ERROR_CORRECTION_BLOCKS[r.ordinal][e]}static reedSolomonComputeDivisor(e){if(e<1||e>255)throw RangeError("Degree out of range");let r=[];for(let t=0;t<e-1;t++)r.push(0);r.push(1);let n=1;for(let i=0;i<e;i++){for(let e=0;e<r.length;e++)r[e]=t.reedSolomonMultiply(r[e],n),e+1<r.length&&(r[e]^=r[e+1]);n=t.reedSolomonMultiply(n,2)}return r}static reedSolomonComputeRemainder(e,r){let n=r.map(e=>0);for(let i of e){let e=i^n.shift();n.push(0),r.forEach((r,i)=>n[i]^=t.reedSolomonMultiply(r,e))}return n}static reedSolomonMultiply(e,t){if(e>>>8!=0||t>>>8!=0)throw RangeError("Byte out of range");let r=0;for(let n=7;n>=0;n--)r=r<<1^(r>>>7)*285^(t>>>n&1)*e;return i(r>>>8==0),r}finderPenaltyCountPatterns(e){let t=e[1];i(t<=3*this.size);let r=t>0&&e[2]==t&&e[3]==3*t&&e[4]==t&&e[5]==t;return(r&&e[0]>=4*t&&e[6]>=t?1:0)+(r&&e[6]>=4*t&&e[0]>=t?1:0)}finderPenaltyTerminateAndCount(e,t,r){return e&&(this.finderPenaltyAddHistory(t,r),t=0),t+=this.size,this.finderPenaltyAddHistory(t,r),this.finderPenaltyCountPatterns(r)}finderPenaltyAddHistory(e,t){0==t[0]&&(e+=this.size),t.pop(),t.unshift(e)}};function r(e,t,r){if(t<0||t>31||e>>>t!=0)throw RangeError("Value out of range");for(let n=t-1;n>=0;n--)r.push(e>>>n&1)}function n(e,t){return(e>>>t&1)!=0}function i(e){if(!e)throw Error("Assertion error")}t.MIN_VERSION=1,t.MAX_VERSION=40,t.PENALTY_N1=3,t.PENALTY_N2=3,t.PENALTY_N3=40,t.PENALTY_N4=10,t.ECC_CODEWORDS_PER_BLOCK=[[-1,7,10,15,20,26,18,20,24,30,18,20,24,26,30,22,24,28,30,28,28,28,28,30,30,26,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,10,16,26,18,24,16,18,22,22,26,30,22,22,24,24,28,28,26,26,26,26,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28,28],[-1,13,22,18,26,18,24,18,22,20,24,28,26,24,20,30,24,28,28,26,30,28,30,30,30,30,28,30,30,30,30,30,30,30,30,30,30,30,30,30,30],[-1,17,28,22,16,22,28,26,26,24,28,24,28,22,24,24,30,28,28,26,28,30,24,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30,30]],t.NUM_ERROR_CORRECTION_BLOCKS=[[-1,1,1,1,1,1,2,2,2,2,4,4,4,4,4,6,6,6,6,7,8,8,9,9,10,12,12,12,13,14,15,16,17,18,19,19,20,21,22,24,25],[-1,1,1,1,2,2,4,4,4,5,5,5,8,9,9,10,10,11,13,14,16,17,17,18,20,21,23,25,26,28,29,31,33,35,37,38,40,43,45,47,49],[-1,1,1,2,2,4,4,6,6,8,8,8,10,12,16,12,17,16,18,21,20,23,23,25,27,29,34,34,35,38,40,43,45,48,51,53,56,59,62,65,68],[-1,1,1,2,4,4,4,5,6,8,8,11,11,16,16,18,16,19,21,25,25,25,34,30,32,35,37,40,42,45,48,51,54,57,60,63,66,70,74,77,81]],e.QrCode=t;let s=class e{constructor(e,t,r){if(this.mode=e,this.numChars=t,this.bitData=r,t<0)throw RangeError("Invalid argument");this.bitData=r.slice()}static makeBytes(t){let n=[];for(let e of t)r(e,8,n);return new e(e.Mode.BYTE,t.length,n)}static makeNumeric(t){if(!e.isNumeric(t))throw RangeError("String contains non-numeric characters");let n=[];for(let e=0;e<t.length;){let i=Math.min(t.length-e,3);r(parseInt(t.substring(e,e+i),10),3*i+1,n),e+=i}return new e(e.Mode.NUMERIC,t.length,n)}static makeAlphanumeric(t){let n;if(!e.isAlphanumeric(t))throw RangeError("String contains unencodable characters in alphanumeric mode");let i=[];for(n=0;n+2<=t.length;n+=2){let s=45*e.ALPHANUMERIC_CHARSET.indexOf(t.charAt(n));r(s+=e.ALPHANUMERIC_CHARSET.indexOf(t.charAt(n+1)),11,i)}return n<t.length&&r(e.ALPHANUMERIC_CHARSET.indexOf(t.charAt(n)),6,i),new e(e.Mode.ALPHANUMERIC,t.length,i)}static makeSegments(t){return""==t?[]:e.isNumeric(t)?[e.makeNumeric(t)]:e.isAlphanumeric(t)?[e.makeAlphanumeric(t)]:[e.makeBytes(e.toUtf8ByteArray(t))]}static makeEci(t){let n=[];if(t<0)throw RangeError("ECI assignment value out of range");if(t<128)r(t,8,n);else if(t<16384)r(2,2,n),r(t,14,n);else if(t<1e6)r(6,3,n),r(t,21,n);else throw RangeError("ECI assignment value out of range");return new e(e.Mode.ECI,0,n)}static isNumeric(t){return e.NUMERIC_REGEX.test(t)}static isAlphanumeric(t){return e.ALPHANUMERIC_REGEX.test(t)}getData(){return this.bitData.slice()}static getTotalBits(e,t){let r=0;for(let n of e){let e=n.mode.numCharCountBits(t);if(n.numChars>=1<<e)return 1/0;r+=4+e+n.bitData.length}return r}static toUtf8ByteArray(e){e=encodeURI(e);let t=[];for(let r=0;r<e.length;r++)"%"!=e.charAt(r)?t.push(e.charCodeAt(r)):(t.push(parseInt(e.substring(r+1,r+3),16)),r+=2);return t}};s.NUMERIC_REGEX=/^[0-9]*$/,s.ALPHANUMERIC_REGEX=/^[A-Z0-9 $%*+.\/:-]*$/,s.ALPHANUMERIC_CHARSET="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";let o=s;e.QrSegment=s})(n||(n={})),(e=>{(e=>{let t=class{constructor(e,t){this.ordinal=e,this.formatBits=t}};t.LOW=new t(0,1),t.MEDIUM=new t(1,0),t.QUARTILE=new t(2,3),t.HIGH=new t(3,2),e.Ecc=t})(e.QrCode||(e.QrCode={}))})(n||(n={})),(e=>{(e=>{let t=class{constructor(e,t){this.modeBits=e,this.numBitsCharCount=t}numCharCountBits(e){return this.numBitsCharCount[Math.floor((e+7)/17)]}};t.NUMERIC=new t(1,[10,12,14]),t.ALPHANUMERIC=new t(2,[9,11,13]),t.BYTE=new t(4,[8,16,16]),t.KANJI=new t(8,[8,10,12]),t.ECI=new t(7,[0,0,0]),e.Mode=t})(e.QrSegment||(e.QrSegment={}))})(n||(n={}));var d=n,f={L:d.QrCode.Ecc.LOW,M:d.QrCode.Ecc.MEDIUM,Q:d.QrCode.Ecc.QUARTILE,H:d.QrCode.Ecc.HIGH},m="#FFFFFF",g="#000000";function p(e,t=0){let r=[];return e.forEach(function(e,n){let i=null;e.forEach(function(s,o){if(!s&&null!==i){r.push(`M${i+t} ${n+t}h${o-i}v1H${i+t}z`),i=null;return}if(o===e.length-1){if(!s)return;null===i?r.push(`M${o+t},${n+t} h1v1H${o+t}z`):r.push(`M${i+t},${n+t} h${o+1-i}v1H${i+t}z`);return}s&&null===i&&(i=o)})}),r.join("")}function _(e,t){return e.slice().map((e,r)=>r<t.y||r>=t.y+t.h?e:e.map((e,r)=>(r<t.x||r>=t.x+t.w)&&e))}function y({value:e,level:t,minVersion:r,includeMargin:n,marginSize:s,imageSettings:o,size:l,boostLevel:a}){let u=i.useMemo(()=>{let n=(Array.isArray(e)?e:[e]).reduce((e,t)=>(e.push(...d.QrSegment.makeSegments(t)),e),[]);return d.QrCode.encodeSegments(n,f[t],r,void 0,void 0,a)},[e,t,r,a]),{cells:h,margin:c,numCells:m,calculatedImageSettings:g}=i.useMemo(()=>{let e=u.getModules(),t=null!=s?Math.max(Math.floor(s),0):4*!!n,r=e.length+2*t,i=function(e,t,r,n){if(null==n)return null;let i=e.length+2*r,s=Math.floor(.1*t),o=i/t,l=(n.width||s)*o,a=(n.height||s)*o,u=null==n.x?e.length/2-l/2:n.x*o,h=null==n.y?e.length/2-a/2:n.y*o,c=null==n.opacity?1:n.opacity,d=null;if(n.excavate){let e=Math.floor(u),t=Math.floor(h),r=Math.ceil(l+u-e),n=Math.ceil(a+h-t);d={x:e,y:t,w:r,h:n}}return{x:u,y:h,h:a,w:l,excavation:d,opacity:c,crossOrigin:n.crossOrigin}}(e,l,t,o);return{cells:e,margin:t,numCells:r,calculatedImageSettings:i}},[u,l,o,n,s]);return{qrcode:u,margin:c,cells:h,numCells:m,calculatedImageSettings:g}}var v=function(){try{new Path2D().addPath(new Path2D)}catch(e){return!1}return!0}();i.forwardRef(function(e,t){let{value:r,size:n=128,level:s="L",bgColor:o=m,fgColor:l=g,includeMargin:a=!1,minVersion:u=1,boostLevel:d,marginSize:f,imageSettings:S}=e,E=c(e,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","marginSize","imageSettings"]),{style:R}=E,C=c(E,["style"]),w=null==S?void 0:S.src,M=i.useRef(null),A=i.useRef(null),N=i.useCallback(e=>{M.current=e,"function"==typeof t?t(e):t&&(t.current=e)},[t]),[F,P]=i.useState(!1),{margin:b,cells:z,numCells:I,calculatedImageSettings:O}=y({value:r,level:s,minVersion:u,boostLevel:d,includeMargin:a,marginSize:f,imageSettings:S,size:n});i.useEffect(()=>{if(null!=M.current){let e=M.current,t=e.getContext("2d");if(!t)return;let r=z,i=A.current,s=null!=O&&null!==i&&i.complete&&0!==i.naturalHeight&&0!==i.naturalWidth;s&&null!=O.excavation&&(r=_(z,O.excavation));let a=window.devicePixelRatio||1;e.height=e.width=n*a;let u=n/I*a;t.scale(u,u),t.fillStyle=o,t.fillRect(0,0,I,I),t.fillStyle=l,v?t.fill(new Path2D(p(r,b))):z.forEach(function(e,r){e.forEach(function(e,n){e&&t.fillRect(n+b,r+b,1,1)})}),O&&(t.globalAlpha=O.opacity),s&&t.drawImage(i,O.x+b,O.y+b,O.w,O.h)}}),i.useEffect(()=>{P(!1)},[w]);let k=h({height:n,width:n},R),T=null;return null!=w&&(T=i.createElement("img",{src:w,key:w,style:{display:"none"},onLoad:()=>{P(!0)},ref:A,crossOrigin:null==O?void 0:O.crossOrigin})),i.createElement(i.Fragment,null,i.createElement("canvas",h({style:k,height:n,width:n,ref:N,role:"img"},C)),T)}).displayName="QRCodeCanvas";var S=i.forwardRef(function(e,t){let{value:r,size:n=128,level:s="L",bgColor:o=m,fgColor:l=g,includeMargin:a=!1,minVersion:u=1,boostLevel:d,title:f,marginSize:v,imageSettings:S}=e,E=c(e,["value","size","level","bgColor","fgColor","includeMargin","minVersion","boostLevel","title","marginSize","imageSettings"]),{margin:R,cells:C,numCells:w,calculatedImageSettings:M}=y({value:r,level:s,minVersion:u,boostLevel:d,includeMargin:a,marginSize:v,imageSettings:S,size:n}),A=C,N=null;null!=S&&null!=M&&(null!=M.excavation&&(A=_(C,M.excavation)),N=i.createElement("image",{href:S.src,height:M.h,width:M.w,x:M.x+R,y:M.y+R,preserveAspectRatio:"none",opacity:M.opacity,crossOrigin:M.crossOrigin}));let F=p(A,R);return i.createElement("svg",h({height:n,width:n,viewBox:`0 0 ${w} ${w}`,ref:t,role:"img"},E),!!f&&i.createElement("title",null,f),i.createElement("path",{fill:o,d:`M0,0 h${w}v${w}H0z`,shapeRendering:"crispEdges"}),i.createElement("path",{fill:l,d:F,shapeRendering:"crispEdges"}),N)});S.displayName="QRCodeSVG"},2269:(e,t,r)=>{"use strict";var n=r(9509);r(8375);var i=r(2115),s=function(e){return e&&"object"==typeof e&&"default"in e?e:{default:e}}(i),o=void 0!==n&&n.env&&!0,l=function(e){return"[object String]"===Object.prototype.toString.call(e)},a=function(){function e(e){var t=void 0===e?{}:e,r=t.name,n=void 0===r?"stylesheet":r,i=t.optimizeForSpeed,s=void 0===i?o:i;u(l(n),"`name` must be a string"),this._name=n,this._deletedRulePlaceholder="#"+n+"-deleted-rule____{}",u("boolean"==typeof s,"`optimizeForSpeed` must be a boolean"),this._optimizeForSpeed=s,this._serverSheet=void 0,this._tags=[],this._injected=!1,this._rulesCount=0;var a="undefined"!=typeof window&&document.querySelector('meta[property="csp-nonce"]');this._nonce=a?a.getAttribute("content"):null}var t,r=e.prototype;return r.setOptimizeForSpeed=function(e){u("boolean"==typeof e,"`setOptimizeForSpeed` accepts a boolean"),u(0===this._rulesCount,"optimizeForSpeed cannot be when rules have already been inserted"),this.flush(),this._optimizeForSpeed=e,this.inject()},r.isOptimizeForSpeed=function(){return this._optimizeForSpeed},r.inject=function(){var e=this;if(u(!this._injected,"sheet already injected"),this._injected=!0,"undefined"!=typeof window&&this._optimizeForSpeed){this._tags[0]=this.makeStyleTag(this._name),this._optimizeForSpeed="insertRule"in this.getSheet(),this._optimizeForSpeed||(o||console.warn("StyleSheet: optimizeForSpeed mode not supported falling back to standard mode."),this.flush(),this._injected=!0);return}this._serverSheet={cssRules:[],insertRule:function(t,r){return"number"==typeof r?e._serverSheet.cssRules[r]={cssText:t}:e._serverSheet.cssRules.push({cssText:t}),r},deleteRule:function(t){e._serverSheet.cssRules[t]=null}}},r.getSheetForTag=function(e){if(e.sheet)return e.sheet;for(var t=0;t<document.styleSheets.length;t++)if(document.styleSheets[t].ownerNode===e)return document.styleSheets[t]},r.getSheet=function(){return this.getSheetForTag(this._tags[this._tags.length-1])},r.insertRule=function(e,t){if(u(l(e),"`insertRule` accepts only strings"),"undefined"==typeof window)return"number"!=typeof t&&(t=this._serverSheet.cssRules.length),this._serverSheet.insertRule(e,t),this._rulesCount++;if(this._optimizeForSpeed){var r=this.getSheet();"number"!=typeof t&&(t=r.cssRules.length);try{r.insertRule(e,t)}catch(t){return o||console.warn("StyleSheet: illegal rule: \n\n"+e+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),-1}}else{var n=this._tags[t];this._tags.push(this.makeStyleTag(this._name,e,n))}return this._rulesCount++},r.replaceRule=function(e,t){if(this._optimizeForSpeed||"undefined"==typeof window){var r="undefined"!=typeof window?this.getSheet():this._serverSheet;if(t.trim()||(t=this._deletedRulePlaceholder),!r.cssRules[e])return e;r.deleteRule(e);try{r.insertRule(t,e)}catch(n){o||console.warn("StyleSheet: illegal rule: \n\n"+t+"\n\nSee https://stackoverflow.com/q/20007992 for more info"),r.insertRule(this._deletedRulePlaceholder,e)}}else{var n=this._tags[e];u(n,"old rule at index `"+e+"` not found"),n.textContent=t}return e},r.deleteRule=function(e){if("undefined"==typeof window)return void this._serverSheet.deleteRule(e);if(this._optimizeForSpeed)this.replaceRule(e,"");else{var t=this._tags[e];u(t,"rule at index `"+e+"` not found"),t.parentNode.removeChild(t),this._tags[e]=null}},r.flush=function(){this._injected=!1,this._rulesCount=0,"undefined"!=typeof window?(this._tags.forEach(function(e){return e&&e.parentNode.removeChild(e)}),this._tags=[]):this._serverSheet.cssRules=[]},r.cssRules=function(){var e=this;return"undefined"==typeof window?this._serverSheet.cssRules:this._tags.reduce(function(t,r){return r?t=t.concat(Array.prototype.map.call(e.getSheetForTag(r).cssRules,function(t){return t.cssText===e._deletedRulePlaceholder?null:t})):t.push(null),t},[])},r.makeStyleTag=function(e,t,r){t&&u(l(t),"makeStyleTag accepts only strings as second parameter");var n=document.createElement("style");this._nonce&&n.setAttribute("nonce",this._nonce),n.type="text/css",n.setAttribute("data-"+e,""),t&&n.appendChild(document.createTextNode(t));var i=document.head||document.getElementsByTagName("head")[0];return r?i.insertBefore(n,r):i.appendChild(n),n},t=[{key:"length",get:function(){return this._rulesCount}}],function(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}(e.prototype,t),e}();function u(e,t){if(!e)throw Error("StyleSheet: "+t+".")}var h=function(e){for(var t=5381,r=e.length;r;)t=33*t^e.charCodeAt(--r);return t>>>0},c={};function d(e,t){if(!t)return"jsx-"+e;var r=String(t),n=e+r;return c[n]||(c[n]="jsx-"+h(e+"-"+r)),c[n]}function f(e,t){"undefined"==typeof window&&(t=t.replace(/\/style/gi,"\\/style"));var r=e+t;return c[r]||(c[r]=t.replace(/__jsx-style-dynamic-selector/g,e)),c[r]}var m=function(){function e(e){var t=void 0===e?{}:e,r=t.styleSheet,n=void 0===r?null:r,i=t.optimizeForSpeed,s=void 0!==i&&i;this._sheet=n||new a({name:"styled-jsx",optimizeForSpeed:s}),this._sheet.inject(),n&&"boolean"==typeof s&&(this._sheet.setOptimizeForSpeed(s),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),this._fromServer=void 0,this._indices={},this._instancesCounts={}}var t=e.prototype;return t.add=function(e){var t=this;void 0===this._optimizeForSpeed&&(this._optimizeForSpeed=Array.isArray(e.children),this._sheet.setOptimizeForSpeed(this._optimizeForSpeed),this._optimizeForSpeed=this._sheet.isOptimizeForSpeed()),"undefined"==typeof window||this._fromServer||(this._fromServer=this.selectFromServer(),this._instancesCounts=Object.keys(this._fromServer).reduce(function(e,t){return e[t]=0,e},{}));var r=this.getIdAndRules(e),n=r.styleId,i=r.rules;if(n in this._instancesCounts){this._instancesCounts[n]+=1;return}var s=i.map(function(e){return t._sheet.insertRule(e)}).filter(function(e){return -1!==e});this._indices[n]=s,this._instancesCounts[n]=1},t.remove=function(e){var t=this,r=this.getIdAndRules(e).styleId;if(function(e,t){if(!e)throw Error("StyleSheetRegistry: "+t+".")}(r in this._instancesCounts,"styleId: `"+r+"` not found"),this._instancesCounts[r]-=1,this._instancesCounts[r]<1){var n=this._fromServer&&this._fromServer[r];n?(n.parentNode.removeChild(n),delete this._fromServer[r]):(this._indices[r].forEach(function(e){return t._sheet.deleteRule(e)}),delete this._indices[r]),delete this._instancesCounts[r]}},t.update=function(e,t){this.add(t),this.remove(e)},t.flush=function(){this._sheet.flush(),this._sheet.inject(),this._fromServer=void 0,this._indices={},this._instancesCounts={}},t.cssRules=function(){var e=this,t=this._fromServer?Object.keys(this._fromServer).map(function(t){return[t,e._fromServer[t]]}):[],r=this._sheet.cssRules();return t.concat(Object.keys(this._indices).map(function(t){return[t,e._indices[t].map(function(e){return r[e].cssText}).join(e._optimizeForSpeed?"":"\n")]}).filter(function(e){return!!e[1]}))},t.styles=function(e){var t,r;return t=this.cssRules(),void 0===(r=e)&&(r={}),t.map(function(e){var t=e[0],n=e[1];return s.default.createElement("style",{id:"__"+t,key:"__"+t,nonce:r.nonce?r.nonce:void 0,dangerouslySetInnerHTML:{__html:n}})})},t.getIdAndRules=function(e){var t=e.children,r=e.dynamic,n=e.id;if(r){var i=d(n,r);return{styleId:i,rules:Array.isArray(t)?t.map(function(e){return f(i,e)}):[f(i,t)]}}return{styleId:d(n),rules:Array.isArray(t)?t:[t]}},t.selectFromServer=function(){return Array.prototype.slice.call(document.querySelectorAll('[id^="__jsx-"]')).reduce(function(e,t){return e[t.id.slice(2)]=t,e},{})},e}(),g=i.createContext(null);g.displayName="StyleSheetContext";var p=s.default.useInsertionEffect||s.default.useLayoutEffect,_="undefined"!=typeof window?new m:void 0;function y(e){var t=_||i.useContext(g);return t&&("undefined"==typeof window?t.add(e):p(function(){return t.add(e),function(){t.remove(e)}},[e.id,String(e.dynamic)])),null}y.dynamic=function(e){return e.map(function(e){return d(e[0],e[1])}).join(" ")},t.style=y},5695:(e,t,r)=>{"use strict";var n=r(8999);r.o(n,"useSearchParams")&&r.d(t,{useSearchParams:function(){return n.useSearchParams}})},8375:()=>{},9137:(e,t,r)=>{"use strict";e.exports=r(2269).style}}]);