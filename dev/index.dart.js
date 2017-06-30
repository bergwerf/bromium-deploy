(function(){var supportsDirectProtoAccess=function(){var z=function(){}
z.prototype={p:{}}
var y=new z()
if(!(y.__proto__&&y.__proto__.p===z.prototype.p))return false
try{if(typeof navigator!="undefined"&&typeof navigator.userAgent=="string"&&navigator.userAgent.indexOf("Chrome/")>=0)return true
if(typeof version=="function"&&version.length==0){var x=version()
if(/^\d+\.\d+\.\d+\.\d+$/.test(x))return true}}catch(w){}return false}()
function map(a){a=Object.create(null)
a.x=0
delete a.x
return a}var A=map()
var B=map()
var C=map()
var D=map()
var E=map()
var F=map()
var G=map()
var H=map()
var J=map()
var K=map()
var L=map()
var M=map()
var N=map()
var O=map()
var P=map()
var Q=map()
var R=map()
var S=map()
var T=map()
var U=map()
var V=map()
var W=map()
var X=map()
var Y=map()
var Z=map()
function I(){}init()
function setupProgram(a,b){"use strict"
function generateAccessor(a9,b0,b1){var g=a9.split("-")
var f=g[0]
var e=f.length
var d=f.charCodeAt(e-1)
var c
if(g.length>1)c=true
else c=false
d=d>=60&&d<=64?d-59:d>=123&&d<=126?d-117:d>=37&&d<=43?d-27:0
if(d){var a0=d&3
var a1=d>>2
var a2=f=f.substring(0,e-1)
var a3=f.indexOf(":")
if(a3>0){a2=f.substring(0,a3)
f=f.substring(a3+1)}if(a0){var a4=a0&2?"r":""
var a5=a0&1?"this":"r"
var a6="return "+a5+"."+f
var a7=b1+".prototype.g"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}if(a1){var a4=a1&2?"r,v":"v"
var a5=a1&1?"this":"r"
var a6=a5+"."+f+"=v"
var a7=b1+".prototype.s"+a2+"="
var a8="function("+a4+"){"+a6+"}"
if(c)b0.push(a7+"$reflectable("+a8+");\n")
else b0.push(a7+a8+";\n")}}return f}function defineClass(a2,a3){var g=[]
var f="function "+a2+"("
var e=""
var d=""
for(var c=0;c<a3.length;c++){if(c!=0)f+=", "
var a0=generateAccessor(a3[c],g,a2)
d+="'"+a0+"',"
var a1="p_"+a0
f+=a1
e+="this."+a0+" = "+a1+";\n"}if(supportsDirectProtoAccess)e+="this."+"$deferredAction"+"();"
f+=") {\n"+e+"}\n"
f+=a2+".builtin$cls=\""+a2+"\";\n"
f+="$desc=$collectedClasses."+a2+"[1];\n"
f+=a2+".prototype = $desc;\n"
if(typeof defineClass.name!="string")f+=a2+".name=\""+a2+"\";\n"
f+=a2+"."+"$__fields__"+"=["+d+"];\n"
f+=g.join("")
return f}init.createNewIsolate=function(){return new I()}
init.classIdExtractor=function(c){return c.constructor.name}
init.classFieldsExtractor=function(c){var g=c.constructor.$__fields__
if(!g)return[]
var f=[]
f.length=g.length
for(var e=0;e<g.length;e++)f[e]=c[g[e]]
return f}
init.instanceFromClassId=function(c){return new init.allClasses[c]()}
init.initializeEmptyInstance=function(c,d,e){init.allClasses[c].apply(d,e)
return d}
var z=supportsDirectProtoAccess?function(c,d){var g=c.prototype
g.__proto__=d.prototype
g.constructor=c
g["$is"+c.name]=c
return convertToFastObject(g)}:function(){function tmp(){}return function(a0,a1){tmp.prototype=a1.prototype
var g=new tmp()
convertToSlowObject(g)
var f=a0.prototype
var e=Object.keys(f)
for(var d=0;d<e.length;d++){var c=e[d]
g[c]=f[c]}g["$is"+a0.name]=a0
g.constructor=a0
a0.prototype=g
return g}}()
function finishClasses(a4){var g=init.allClasses
a4.combinedConstructorFunction+="return [\n"+a4.constructorsList.join(",\n  ")+"\n]"
var f=new Function("$collectedClasses",a4.combinedConstructorFunction)(a4.collected)
a4.combinedConstructorFunction=null
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.name
var a0=a4.collected[c]
var a1=a0[0]
a0=a0[1]
g[c]=d
a1[c]=d}f=null
var a2=init.finishedClasses
function finishClass(c1){if(a2[c1])return
a2[c1]=true
var a5=a4.pending[c1]
if(a5&&a5.indexOf("+")>0){var a6=a5.split("+")
a5=a6[0]
var a7=a6[1]
finishClass(a7)
var a8=g[a7]
var a9=a8.prototype
var b0=g[c1].prototype
var b1=Object.keys(a9)
for(var b2=0;b2<b1.length;b2++){var b3=b1[b2]
if(!u.call(b0,b3))b0[b3]=a9[b3]}}if(!a5||typeof a5!="string"){var b4=g[c1]
var b5=b4.prototype
b5.constructor=b4
b5.$isf=b4
b5.$deferredAction=function(){}
return}finishClass(a5)
var b6=g[a5]
if(!b6)b6=existingIsolateProperties[a5]
var b4=g[c1]
var b5=z(b4,b6)
if(a9)b5.$deferredAction=mixinDeferredActionHelper(a9,b5)
if(Object.prototype.hasOwnProperty.call(b5,"%")){var b7=b5["%"].split(";")
if(b7[0]){var b8=b7[0].split("|")
for(var b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=true}}if(b7[1]){b8=b7[1].split("|")
if(b7[2]){var b9=b7[2].split("|")
for(var b2=0;b2<b9.length;b2++){var c0=g[b9[b2]]
c0.$nativeSuperclassTag=b8[0]}}for(b2=0;b2<b8.length;b2++){init.interceptorsByTag[b8[b2]]=b4
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$ise)b5.$deferredAction()}var a3=Object.keys(a4.pending)
for(var e=0;e<a3.length;e++)finishClass(a3[e])}function finishAddStubsHelper(){var g=this
while(!g.hasOwnProperty("$deferredAction"))g=g.__proto__
delete g.$deferredAction
var f=Object.keys(g)
for(var e=0;e<f.length;e++){var d=f[e]
var c=d.charCodeAt(0)
var a0
if(d!=="^"&&d!=="$reflectable"&&c!==43&&c!==42&&(a0=g[d])!=null&&a0.constructor===Array&&d!=="<>")addStubs(g,a0,d,false,[])}convertToFastObject(g)
g=g.__proto__
g.$deferredAction()}function mixinDeferredActionHelper(c,d){var g
if(d.hasOwnProperty("$deferredAction"))g=d.$deferredAction
return function foo(){if(!supportsDirectProtoAccess)return
var f=this
while(!f.hasOwnProperty("$deferredAction"))f=f.__proto__
if(g)f.$deferredAction=g
else{delete f.$deferredAction
convertToFastObject(f)}c.$deferredAction()
f.$deferredAction()}}function processClassData(b1,b2,b3){b2=convertToSlowObject(b2)
var g
var f=Object.keys(b2)
var e=false
var d=supportsDirectProtoAccess&&b1!="f"
for(var c=0;c<f.length;c++){var a0=f[c]
var a1=a0.charCodeAt(0)
if(a0==="v"){processStatics(init.statics[b1]=b2.v,b3)
delete b2.v}else if(a1===43){w[g]=a0.substring(1)
var a2=b2[a0]
if(a2>0)b2[g].$reflectable=a2}else if(a1===42){b2[g].$D=b2[a0]
var a3=b2.$methodsWithOptionalArguments
if(!a3)b2.$methodsWithOptionalArguments=a3={}
a3[a0]=g}else{var a4=b2[a0]
if(a0!=="^"&&a4!=null&&a4.constructor===Array&&a0!=="<>")if(d)e=true
else addStubs(b2,a4,a0,false,[])
else g=a0}}if(e)b2.$deferredAction=finishAddStubsHelper
var a5=b2["^"],a6,a7,a8=a5
var a9=a8.split(";")
a8=a9[1]?a9[1].split(","):[]
a7=a9[0]
a6=a7.split(":")
if(a6.length==2){a7=a6[0]
var b0=a6[1]
if(b0)b2.$S=function(b4){return function(){return init.types[b4]}}(b0)}if(a7)b3.pending[b1]=a7
b3.combinedConstructorFunction+=defineClass(b1,a8)
b3.constructorsList.push(b1)
b3.collected[b1]=[m,b2]
i.push(b1)}function processStatics(a3,a4){var g=Object.keys(a3)
for(var f=0;f<g.length;f++){var e=g[f]
if(e==="^")continue
var d=a3[e]
var c=e.charCodeAt(0)
var a0
if(c===43){v[a0]=e.substring(1)
var a1=a3[e]
if(a1>0)a3[a0].$reflectable=a1
if(d&&d.length)init.typeInformation[a0]=d}else if(c===42){m[a0].$D=d
var a2=a3.$methodsWithOptionalArguments
if(!a2)a3.$methodsWithOptionalArguments=a2={}
a2[e]=a0}else if(typeof d==="function"){m[a0=e]=d
h.push(e)
init.globalFunctions[e]=d}else if(d.constructor===Array)addStubs(m,d,e,true,h)
else{a0=e
processClassData(e,d,a4)}}}function addStubs(b2,b3,b4,b5,b6){var g=0,f=b3[g],e
if(typeof f=="string")e=b3[++g]
else{e=f
f=b4}var d=[b2[b4]=b2[f]=e]
e.$stubName=b4
b6.push(b4)
for(g++;g<b3.length;g++){e=b3[g]
if(typeof e!="function")break
if(!b5)e.$stubName=b3[++g]
d.push(e)
if(e.$stubName){b2[e.$stubName]=e
b6.push(e.$stubName)}}for(var c=0;c<d.length;g++,c++)d[c].$callName=b3[g]
var a0=b3[g]
b3=b3.slice(++g)
var a1=b3[0]
var a2=a1>>1
var a3=(a1&1)===1
var a4=a1===3
var a5=a1===1
var a6=b3[1]
var a7=a6>>1
var a8=(a6&1)===1
var a9=a2+a7!=d[0].length
var b0=b3[2]
if(typeof b0=="number")b3[2]=b0+b
var b1=2*a7+a2+3
if(a0){e=tearOff(d,b3,b5,b4,a9)
b2[b4].$getter=e
e.$getterStub=true
if(b5){init.globalFunctions[b4]=e
b6.push(a0)}b2[a0]=e
d.push(e)
e.$stubName=a0
e.$callName=null}}Function.prototype.$1=function(c){return this(c)}
Function.prototype.$2=function(c,d){return this(c,d)}
Function.prototype.$0=function(){return this()}
Function.prototype.$3=function(c,d,e){return this(c,d,e)}
Function.prototype.$4=function(c,d,e,f){return this(c,d,e,f)}
Function.prototype.$5=function(c,d,e,f,g){return this(c,d,e,f,g)}
Function.prototype.$6=function(c,d,e,f,g,a0){return this(c,d,e,f,g,a0)}
function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.dv"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.dv"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.dv(this,c,d,true,[],f).prototype
return g}:tearOffGetter(c,d,f,a0)}var y=0
if(!init.libraries)init.libraries=[]
if(!init.mangledNames)init.mangledNames=map()
if(!init.mangledGlobalNames)init.mangledGlobalNames=map()
if(!init.statics)init.statics=map()
if(!init.typeInformation)init.typeInformation=map()
if(!init.globalFunctions)init.globalFunctions=map()
var x=init.libraries
var w=init.mangledNames
var v=init.mangledGlobalNames
var u=Object.prototype.hasOwnProperty
var t=a.length
var s=map()
s.collected=map()
s.pending=map()
s.constructorsList=[]
s.combinedConstructorFunction="function $reflectable(fn){fn.$reflectable=1;return fn};\n"+"var $desc;\n"
for(var r=0;r<t;r++){var q=a[r]
var p=q[0]
var o=q[1]
var n=q[2]
var m=q[3]
var l=q[4]
var k=!!q[5]
var j=l&&l["^"]
if(j instanceof Array)j=j[0]
var i=[]
var h=[]
processStatics(l,s)
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.X=function(){}
var dart=[["","",,H,{"^":"",oh:{"^":"f;a"}}],["","",,J,{"^":"",
v:function(a){return void 0},
cD:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
cy:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.dA==null){H.mw()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.b(new P.cr("Return interceptor for "+H.j(y(a,z))))}w=a.constructor
v=w==null?null:w[$.$get$d3()]
if(v!=null)return v
v=H.mE(a)
if(v!=null)return v
if(typeof a=="function")return C.H
y=Object.getPrototypeOf(a)
if(y==null)return C.w
if(y===Object.prototype)return C.w
if(typeof w=="function"){Object.defineProperty(w,$.$get$d3(),{value:C.o,enumerable:false,writable:true,configurable:true})
return C.o}return C.o},
e:{"^":"f;",
A:function(a,b){return a===b},
gC:function(a){return H.aA(a)},
k:["fc",function(a){return H.cm(a)}],
"%":"AnimationEffectReadOnly|AnimationEffectTiming|AnimationTimeline|AppBannerPromptResult|AudioListener|BarProp|Bluetooth|BluetoothAdvertisingData|BluetoothCharacteristicProperties|BluetoothRemoteGATTServer|BluetoothRemoteGATTService|BluetoothUUID|Body|CHROMIUMSubscribeUniform|CHROMIUMValuebuffer|CSS|Cache|CacheStorage|CanvasGradient|CanvasPattern|CanvasRenderingContext2D|CircularGeofencingRegion|Client|Clients|CompositorProxy|ConsoleBase|CredentialsContainer|Crypto|DOMFileSystemSync|DOMImplementation|DOMParser|DOMStringMap|DataTransfer|Database|DeprecatedStorageInfo|DeprecatedStorageQuota|DeviceRotationRate|DirectoryEntrySync|DirectoryReader|DirectoryReaderSync|EXTBlendMinMax|EXTColorBufferFloat|EXTDisjointTimerQuery|EXTFragDepth|EXTShaderTextureLOD|EXTTextureFilterAnisotropic|EXT_blend_minmax|EXT_frag_depth|EXT_sRGB|EXT_shader_texture_lod|EXT_texture_filter_anisotropic|EXTsRGB|EffectModel|EntrySync|FileEntrySync|FileReaderSync|FileWriterSync|FontFace|FormData|Geofencing|GeofencingRegion|Geolocation|Geoposition|HMDVRDevice|HTMLAllCollection|Headers|IDBFactory|IDBKeyRange|IdleDeadline|ImageBitmap|ImageBitmapRenderingContext|InjectedScriptHost|InputDeviceCapabilities|IntersectionObserver|IntersectionObserverEntry|KeyframeEffect|MIDIInputMap|MIDIOutputMap|MediaDeviceInfo|MediaDevices|MediaError|MediaKeyStatusMap|MediaKeySystemAccess|MediaKeys|MediaMetadata|MediaSession|MemoryInfo|MessageChannel|Metadata|MutationObserver|NFC|NavigatorStorageUtils|NodeFilter|NodeIterator|NonDocumentTypeChildNode|NonElementParentNode|OESElementIndexUint|OESStandardDerivatives|OESTextureFloat|OESTextureFloatLinear|OESTextureHalfFloat|OESTextureHalfFloatLinear|OESVertexArrayObject|OES_element_index_uint|OES_standard_derivatives|OES_texture_float|OES_texture_float_linear|OES_texture_half_float|OES_texture_half_float_linear|OES_vertex_array_object|OffscreenCanvas|PagePopupController|PerformanceObserver|PerformanceObserverEntryList|PerformanceTiming|PeriodicWave|Permissions|PositionSensorVRDevice|Presentation|PushManager|PushMessageData|PushSubscription|RTCCertificate|RTCIceCandidate|RTCStatsResponse|Range|ReadableByteStream|ReadableByteStreamReader|ReadableStreamReader|Request|Response|SQLResultSet|SQLTransaction|SVGAnimatedAngle|SVGAnimatedBoolean|SVGAnimatedEnumeration|SVGAnimatedInteger|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedPreserveAspectRatio|SVGAnimatedRect|SVGAnimatedString|SVGAnimatedTransformList|SVGPreserveAspectRatio|SVGUnitTypes|Screen|SharedArrayBuffer|SourceInfo|SpeechRecognitionAlternative|StorageInfo|StorageManager|StorageQuota|StylePropertyMap|SubtleCrypto|SyncManager|TextMetrics|TreeWalker|URLSearchParams|USBAlternateInterface|USBConfiguration|USBDevice|USBEndpoint|USBInTransferResult|USBInterface|USBIsochronousInTransferPacket|USBIsochronousInTransferResult|USBIsochronousOutTransferPacket|USBIsochronousOutTransferResult|USBOutTransferResult|UnderlyingSourceBase|VRDevice|VREyeParameters|VRFieldOfView|VTTRegion|ValidityState|VideoPlaybackQuality|VideoTrack|WEBGL_compressed_texture_atc|WEBGL_compressed_texture_etc1|WEBGL_compressed_texture_pvrtc|WEBGL_compressed_texture_s3tc|WEBGL_debug_renderer_info|WEBGL_debug_shaders|WEBGL_depth_texture|WEBGL_draw_buffers|WEBGL_lose_context|WebGLBuffer|WebGLCompressedTextureASTC|WebGLCompressedTextureATC|WebGLCompressedTextureETC1|WebGLCompressedTexturePVRTC|WebGLCompressedTextureS3TC|WebGLDebugRendererInfo|WebGLDebugShaders|WebGLDepthTexture|WebGLDrawBuffers|WebGLExtensionLoseContext|WebGLFramebuffer|WebGLLoseContext|WebGLProgram|WebGLQuery|WebGLRenderbuffer|WebGLSampler|WebGLShader|WebGLShaderPrecisionFormat|WebGLSync|WebGLTexture|WebGLTimerQueryEXT|WebGLTransformFeedback|WebGLVertexArrayObject|WebGLVertexArrayObjectOES|WebKitCSSMatrix|WebKitMutationObserver|WindowClient|WorkerConsole|Worklet|WorkletGlobalScope|XMLSerializer|XPathEvaluator|XPathExpression|XPathNSResolver|XPathResult|XSLTProcessor|mozRTCIceCandidate"},
jm:{"^":"e;",
k:function(a){return String(a)},
gC:function(a){return a?519018:218159},
$isbW:1},
jn:{"^":"e;",
A:function(a,b){return null==b},
k:function(a){return"null"},
gC:function(a){return 0}},
d4:{"^":"e;",
gC:function(a){return 0},
k:["fd",function(a){return String(a)}],
$isjo:1},
jI:{"^":"d4;"},
bS:{"^":"d4;"},
bP:{"^":"d4;",
k:function(a){var z=a[$.$get$dX()]
return z==null?this.fd(a):J.au(z)},
$S:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}},
$isi:1},
bM:{"^":"e;$ti",
dP:function(a,b){if(!!a.immutable$list)throw H.b(new P.n(b))},
b1:function(a,b){if(!!a.fixed$length)throw H.b(new P.n(b))},
q:function(a,b){this.b1(a,"add")
a.push(b)},
eB:function(a,b){this.b1(a,"removeAt")
if(b<0||b>=a.length)throw H.b(P.bw(b,null,null))
return a.splice(b,1)[0]},
a3:function(a,b){var z
this.b1(a,"remove")
for(z=0;z<a.length;++z)if(J.H(a[z],b)){a.splice(z,1)
return!0}return!1},
h6:function(a,b){var z,y
this.b1(a,"addAll")
for(z=b.length,y=0;y<b.length;b.length===z||(0,H.P)(b),++y)a.push(b[y])},
X:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.b(new P.a9(a))}},
aO:function(a,b){return new H.d9(a,b,[H.z(a,0),null])},
a2:function(a,b){var z,y,x
z=a.length
if(z===0)throw H.b(H.ah())
if(0>=z)return H.a(a,0)
y=a[0]
for(x=1;x<z;++x){y=b.$2(y,a[x])
if(z!==a.length)throw H.b(new P.a9(a))}return y},
w:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
gaj:function(a){if(a.length>0)return a[0]
throw H.b(H.ah())},
gaN:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.b(H.ah())},
aa:function(a,b,c,d,e){var z,y,x
this.dP(a,"setRange")
P.dc(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.E(P.aj(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.b(H.ey())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x<0||x>=d.length)return H.a(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x<0||x>=d.length)return H.a(d,x)
a[b+y]=d[x]}},
f9:function(a,b){this.dP(a,"sort")
H.bR(a,0,a.length-1,b)},
U:function(a,b){var z
for(z=0;z<a.length;++z)if(J.H(a[z],b))return!0
return!1},
k:function(a){return P.cd(a,"[","]")},
gO:function(a){return new J.hC(a,a.length,0,null)},
gC:function(a){return H.aA(a)},
gi:function(a){return a.length},
si:function(a,b){this.b1(a,"set length")
if(b<0)throw H.b(P.aj(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.b(H.U(a,b))
if(b>=a.length||b<0)throw H.b(H.U(a,b))
return a[b]},
j:function(a,b,c){if(!!a.immutable$list)H.E(new P.n("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.b(H.U(a,b))
if(b>=a.length||b<0)throw H.b(H.U(a,b))
a[b]=c},
$isr:1,
$asr:I.X,
$isd:1,
$asd:null,
$isc:1,
$asc:null,
v:{
jl:function(a,b){var z
if(typeof a!=="number"||Math.floor(a)!==a)throw H.b(P.cO(a,"length","is not an integer"))
if(a<0||a>4294967295)throw H.b(P.aj(a,0,4294967295,"length",null))
z=H.A(new Array(a),[b])
z.fixed$length=Array
return z}}},
og:{"^":"bM;$ti"},
hC:{"^":"f;a,b,c,d",
gH:function(){return this.d},
D:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.b(H.P(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
bN:{"^":"e;",
av:function(a,b){var z
if(typeof b!=="number")throw H.b(H.a3(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gcz(b)
if(this.gcz(a)===z)return 0
if(this.gcz(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gcz:function(a){return a===0?1/a<0:a<0},
cL:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.b(new P.n(""+a+".toInt()"))},
bC:function(a){var z,y
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){z=a|0
return a===z?z:z-1}y=Math.floor(a)
if(isFinite(y))return y
throw H.b(new P.n(""+a+".floor()"))},
a4:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.b(new P.n(""+a+".round()"))},
k:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gC:function(a){return a&0x1FFFFFFF},
G:function(a,b){if(typeof b!=="number")throw H.b(H.a3(b))
return a+b},
B:function(a,b){if(typeof b!=="number")throw H.b(H.a3(b))
return a-b},
aA:function(a,b){if(typeof b!=="number")throw H.b(H.a3(b))
return a/b},
Z:function(a,b){if(typeof b!=="number")throw H.b(H.a3(b))
return a*b},
bU:function(a,b){if(typeof b!=="number")throw H.b(H.a3(b))
if((a|0)===a)if(b>=1||!1)return a/b|0
return this.dC(a,b)},
al:function(a,b){return(a|0)===a?a/b|0:this.dC(a,b)},
dC:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.b(new P.n("Result of truncating division is "+H.j(z)+": "+H.j(a)+" ~/ "+b))},
cg:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
ag:function(a,b){if(typeof b!=="number")throw H.b(H.a3(b))
return a<b},
ap:function(a,b){if(typeof b!=="number")throw H.b(H.a3(b))
return a>b},
$isam:1},
eA:{"^":"bN;",$isL:1,$isl:1,$isam:1},
ez:{"^":"bN;",$isL:1,$isam:1},
bO:{"^":"e;",
fB:function(a,b){if(b>=a.length)throw H.b(H.U(a,b))
return a.charCodeAt(b)},
h9:function(a,b,c){if(c>b.length)throw H.b(P.aj(c,0,b.length,null,null))
return new H.lF(b,a,c)},
h8:function(a,b){return this.h9(a,b,0)},
G:function(a,b){if(typeof b!=="string")throw H.b(P.cO(b,null,null))
return a+b},
hw:function(a,b){var z,y
z=b.length
y=a.length
if(z>y)return!1
return b===this.aT(a,y-z)},
fa:function(a,b,c){var z
if(c>a.length)throw H.b(P.aj(c,0,a.length,null,null))
z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)},
cY:function(a,b){return this.fa(a,b,0)},
d0:function(a,b,c){if(c==null)c=a.length
H.md(c)
if(b<0)throw H.b(P.bw(b,null,null))
if(typeof c!=="number")return H.m(c)
if(b>c)throw H.b(P.bw(b,null,null))
if(c>a.length)throw H.b(P.bw(c,null,null))
return a.substring(b,c)},
aT:function(a,b){return this.d0(a,b,null)},
Z:function(a,b){var z,y
if(typeof b!=="number")return H.m(b)
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.b(C.y)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
hT:function(a,b,c){var z
c=a.length
z=b.length
if(c+z>c)c-=z
return a.lastIndexOf(b,c)},
hS:function(a,b){return this.hT(a,b,null)},
hj:function(a,b,c){if(c>a.length)throw H.b(P.aj(c,0,a.length,null,null))
return H.mY(a,b,c)},
av:function(a,b){var z
if(typeof b!=="string")throw H.b(H.a3(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
k:function(a){return a},
gC:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gi:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.b(H.U(a,b))
if(b>=a.length||b<0)throw H.b(H.U(a,b))
return a[b]},
$isr:1,
$asr:I.X,
$isu:1}}],["","",,H,{"^":"",
ah:function(){return new P.Z("No element")},
ey:function(){return new P.Z("Too few elements")},
bR:function(a,b,c,d){if(c-b<=32)H.di(a,b,c,d)
else H.dh(a,b,c,d)},
di:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.O(a);z<=c;++z){x=y.h(a,z)
w=z
while(!0){if(!(w>b&&J.ab(d.$2(y.h(a,w-1),x),0)))break
v=w-1
y.j(a,w,y.h(a,v))
w=v}y.j(a,w,x)}},
dh:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.d.al(c-b+1,6)
y=b+z
x=c-z
w=C.d.al(b+c,2)
v=w-z
u=w+z
t=J.O(a)
s=t.h(a,y)
r=t.h(a,v)
q=t.h(a,w)
p=t.h(a,u)
o=t.h(a,x)
if(J.ab(d.$2(s,r),0)){n=r
r=s
s=n}if(J.ab(d.$2(p,o),0)){n=o
o=p
p=n}if(J.ab(d.$2(s,q),0)){n=q
q=s
s=n}if(J.ab(d.$2(r,q),0)){n=q
q=r
r=n}if(J.ab(d.$2(s,p),0)){n=p
p=s
s=n}if(J.ab(d.$2(q,p),0)){n=p
p=q
q=n}if(J.ab(d.$2(r,o),0)){n=o
o=r
r=n}if(J.ab(d.$2(r,q),0)){n=q
q=r
r=n}if(J.ab(d.$2(p,o),0)){n=o
o=p
p=n}t.j(a,y,s)
t.j(a,w,q)
t.j(a,x,o)
t.j(a,v,t.h(a,b))
t.j(a,u,t.h(a,c))
m=b+1
l=c-1
if(J.H(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.h(a,k)
i=d.$2(j,r)
h=J.v(i)
if(h.A(i,0))continue
if(h.ag(i,0)){if(k!==m){t.j(a,k,t.h(a,m))
t.j(a,m,j)}++m}else for(;!0;){i=d.$2(t.h(a,l),r)
h=J.bj(i)
if(h.ap(i,0)){--l
continue}else{g=l-1
if(h.ag(i,0)){t.j(a,k,t.h(a,m))
f=m+1
t.j(a,m,t.h(a,l))
t.j(a,l,j)
l=g
m=f
break}else{t.j(a,k,t.h(a,l))
t.j(a,l,j)
l=g
break}}}}e=!0}else{for(k=m;k<=l;++k){j=t.h(a,k)
if(J.bZ(d.$2(j,r),0)){if(k!==m){t.j(a,k,t.h(a,m))
t.j(a,m,j)}++m}else if(J.ab(d.$2(j,p),0))for(;!0;)if(J.ab(d.$2(t.h(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.bZ(d.$2(t.h(a,l),r),0)){t.j(a,k,t.h(a,m))
f=m+1
t.j(a,m,t.h(a,l))
t.j(a,l,j)
m=f}else{t.j(a,k,t.h(a,l))
t.j(a,l,j)}l=g
break}}e=!1}h=m-1
t.j(a,b,t.h(a,h))
t.j(a,h,r)
h=l+1
t.j(a,c,t.h(a,h))
t.j(a,h,p)
H.bR(a,b,m-2,d)
H.bR(a,l+2,c,d)
if(e)return
if(m<y&&l>x){for(;J.H(d.$2(t.h(a,m),r),0);)++m
for(;J.H(d.$2(t.h(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.h(a,k)
if(J.H(d.$2(j,r),0)){if(k!==m){t.j(a,k,t.h(a,m))
t.j(a,m,j)}++m}else if(J.H(d.$2(j,p),0))for(;!0;)if(J.H(d.$2(t.h(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.bZ(d.$2(t.h(a,l),r),0)){t.j(a,k,t.h(a,m))
f=m+1
t.j(a,m,t.h(a,l))
t.j(a,l,j)
m=f}else{t.j(a,k,t.h(a,l))
t.j(a,l,j)}l=g
break}}H.bR(a,m,l,d)}else H.bR(a,m,l,d)},
d:{"^":"ac;$ti",$asd:null},
bt:{"^":"d;$ti",
gO:function(a){return new H.eB(this,this.gi(this),0,null)},
aO:function(a,b){return new H.d9(this,b,[H.R(this,"bt",0),null])},
a2:function(a,b){var z,y,x
z=this.gi(this)
if(z===0)throw H.b(H.ah())
y=this.w(0,0)
for(x=1;x<z;++x){y=b.$2(y,this.w(0,x))
if(z!==this.gi(this))throw H.b(new P.a9(this))}return y},
bd:function(a,b){var z,y,x
z=H.A([],[H.R(this,"bt",0)])
C.a.si(z,this.gi(this))
for(y=0;y<this.gi(this);++y){x=this.w(0,y)
if(y>=z.length)return H.a(z,y)
z[y]=x}return z},
cM:function(a){return this.bd(a,!0)}},
kj:{"^":"bt;a,b,c,$ti",
gfG:function(){var z=J.at(this.a)
return z},
gh2:function(){var z,y
z=J.at(this.a)
y=this.b
if(y>z)return z
return y},
gi:function(a){var z,y
z=J.at(this.a)
y=this.b
if(y>=z)return 0
return z-y},
w:function(a,b){var z,y
z=this.gh2()+b
if(b>=0){y=this.gfG()
if(typeof y!=="number")return H.m(y)
y=z>=y}else y=!0
if(y)throw H.b(P.F(b,this,"index",null,null))
return J.dI(this.a,z)},
bd:function(a,b){var z,y,x,w,v,u,t,s
z=this.b
y=this.a
x=J.O(y)
w=x.gi(y)
v=w-z
if(v<0)v=0
u=H.A(new Array(v),this.$ti)
for(t=0;t<v;++t){s=x.w(y,z+t)
if(t>=u.length)return H.a(u,t)
u[t]=s
if(x.gi(y)<w)throw H.b(new P.a9(this))}return u}},
eB:{"^":"f;a,b,c,d",
gH:function(){return this.d},
D:function(){var z,y,x,w
z=this.a
y=J.O(z)
x=y.gi(z)
if(this.b!==x)throw H.b(new P.a9(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.w(z,w);++this.c
return!0}},
eE:{"^":"ac;a,b,$ti",
gO:function(a){return new H.jy(null,J.c1(this.a),this.b,this.$ti)},
gi:function(a){return J.at(this.a)},
$asac:function(a,b){return[b]},
v:{
cg:function(a,b,c,d){if(!!a.$isd)return new H.e5(a,b,[c,d])
return new H.eE(a,b,[c,d])}}},
e5:{"^":"eE;a,b,$ti",$isd:1,
$asd:function(a,b){return[b]}},
jy:{"^":"jk;a,b,c,$ti",
D:function(){var z=this.b
if(z.D()){this.a=this.c.$1(z.gH())
return!0}this.a=null
return!1},
gH:function(){return this.a}},
d9:{"^":"bt;a,b,$ti",
gi:function(a){return J.at(this.a)},
w:function(a,b){return this.b.$1(J.dI(this.a,b))},
$asd:function(a,b){return[b]},
$asbt:function(a,b){return[b]},
$asac:function(a,b){return[b]}},
eh:{"^":"f;$ti",
si:function(a,b){throw H.b(new P.n("Cannot change the length of a fixed-length list"))},
q:function(a,b){throw H.b(new P.n("Cannot add to a fixed-length list"))}}}],["","",,H,{"^":"",
bU:function(a,b){var z=a.b5(b)
if(!init.globalState.d.cy)init.globalState.f.bc()
return z},
h3:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.v(y).$isc)throw H.b(P.a8("Arguments to main must be a List: "+H.j(y)))
init.globalState=new H.lp(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$d1()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.kY(P.d7(null,H.bA),0)
x=P.l
y.z=new H.G(0,null,null,null,null,null,0,[x,H.cv])
y.ch=new H.G(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.lo()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.eu,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.lq)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=P.ax(null,null,null,x)
v=new H.aB(0,null,!1)
u=new H.cv(y,new H.G(0,null,null,null,null,null,0,[x,H.aB]),w,init.createNewIsolate(),v,new H.av(H.bH()),new H.av(H.bH()),!1,!1,[],P.ax(null,null,null,null),null,null,!1,!0,P.ax(null,null,null,null))
w.q(0,0)
u.aD(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.aX(a,{func:1,args:[,]}))u.b5(new H.mW(z,a))
else if(H.aX(a,{func:1,args:[,,]}))u.b5(new H.mX(z,a))
else u.b5(a)
init.globalState.f.bc()},
j9:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.ja()
return},
ja:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.b(new P.n("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.b(new P.n('Cannot extract URI from "'+z+'"'))},
eu:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.ct(!0,[]).aw(b.data)
y=J.O(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.ct(!0,[]).aw(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.ct(!0,[]).aw(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.l
p=P.ax(null,null,null,q)
o=new H.aB(0,null,!1)
n=new H.cv(y,new H.G(0,null,null,null,null,null,0,[q,H.aB]),p,init.createNewIsolate(),o,new H.av(H.bH()),new H.av(H.bH()),!1,!1,[],P.ax(null,null,null,null),null,null,!1,!0,P.ax(null,null,null,null))
p.q(0,0)
n.aD(0,o)
init.globalState.f.a.ac(0,new H.bA(n,new H.j5(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.bc()
break
case"spawn-worker":if($.ew!=null)H.jb(z)
break
case"message":if(y.h(z,"port")!=null)J.an(y.h(z,"port"),y.h(z,"msg"))
init.globalState.f.bc()
break
case"close":init.globalState.ch.a3(0,$.$get$d2().h(0,a))
a.terminate()
init.globalState.f.bc()
break
case"log":H.j4(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.a0(["command","print","msg",z])
q=new H.ak(!0,P.ar(null,P.l)).T(q)
y.toString
self.postMessage(q)}else P.bk(y.h(z,"msg"))
break
case"error":throw H.b(y.h(z,"msg"))}},
jb:function(a){var z,y
z=J.O(a)
y=z.h(a,"replyPort")
H.ex(z.h(a,"functionName"),z.h(a,"uri"),z.h(a,"args"),z.h(a,"msg"),!1,z.h(a,"isSpawnUri"),z.h(a,"startPaused")).bJ(new H.jc(y),new H.jd(y))},
j4:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.a0(["command","log","msg",a])
x=new H.ak(!0,P.ar(null,P.l)).T(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.Q(w)
z=H.M(w)
y=P.b3(z)
throw H.b(y)}},
ex:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t
if(b!=null&&J.hh(b,".dart"))b=J.as(b,".js")
z=$.bx
$.bx=z+1
y=new H.aB(z,null,!1)
x=init.globalState.d
x.aD(z,y)
x.as()
w=new H.dd(y,null)
w.bV(y)
x=new P.C(0,$.q,null,[null])
v=new P.b6(x,[null])
w.gaj(w).bI(new H.je(v))
u=new H.ba(y,init.globalState.d.a)
if(init.globalState.y===!0&&!0){if(c!=null)c=P.aJ(c,!0,P.u)
if(init.globalState.x===!0){z=init.globalState.Q
y=P.a0(["command","spawn-worker","functionName",a,"args",c,"msg",d,"uri",b,"isSpawnUri",f,"startPaused",g,"replyPort",u])
y=new H.ak(!0,P.ar(null,P.l)).T(y)
z.toString
self.postMessage(y)}else{if(b==null)b=$.$get$d1()
t=new Worker(b)
t.onerror=function(h,i,j){return function(k){return h(k,i,j)}}(H.jg,b,new H.jf(v))
t.onmessage=function(h,i){return function(j){j.onerror=null
return h(i,j)}}(H.eu,t)
z=init.globalState.c++
$.$get$d2().j(0,t,z)
init.globalState.ch.j(0,z,t)
y=P.l
z=P.a0(["command","start","id",z,"replyTo",new H.ak(!0,P.ar(null,y)).T(u),"args",c,"msg",new H.ak(!0,P.ar(null,y)).T(d),"isSpawnUri",f,"startPaused",g,"functionName",a])
t.postMessage(new H.ak(!0,P.ar(null,y)).T(z))}}else H.j7(a,b,c,d,f,g,u)
return x},
j7:function(a,b,c,d,e,f,g){var z,y,x,w,v,u
z={}
z.a=c
z.b=d
if(b!=null)throw H.b(new P.n("Currently spawnUri is not supported without web workers."))
z.b=H.fD(d)
if(c!=null)z.a=P.aJ(c,!0,P.u)
y=init.globalState.f
x=init.globalState.a++
w=P.l
v=P.ax(null,null,null,w)
u=new H.aB(0,null,!1)
w=new H.cv(x,new H.G(0,null,null,null,null,null,0,[w,H.aB]),v,init.createNewIsolate(),u,new H.av(H.bH()),new H.av(H.bH()),!1,!1,[],P.ax(null,null,null,null),null,null,!1,!0,P.ax(null,null,null,null))
v.q(0,0)
w.aD(0,u)
y.a.ac(0,new H.bA(w,new H.j8(z,a,e,f,g),"nonworker start"))},
ev:function(a,b,c,d,e,f){var z,y,x
z=init.globalState.d
y=z.a
$.eO=$.eO+("_"+y)
$.eP=$.eP+("_"+y)
y=z.e.geZ()
x=z.f
J.an(f,["spawned",y,x,z.r])
y=new H.j6(a,b,c,d,z)
if(e===!0){z.dJ(x,x)
init.globalState.f.a.ac(0,new H.bA(z,y,"start isolate"))}else y.$0()},
jg:function(a,b,c){var z
a.preventDefault()
z=a.message
c.$1(z==null?"Error spawning worker for "+H.j(b):"Error spawning worker for "+H.j(b)+" ("+z+")")
return!0},
fD:function(a){return new H.ct(!0,[]).aw(new H.ak(!1,P.ar(null,P.l)).T(a))},
mW:{"^":"h:0;a,b",
$0:function(){this.b.$1(this.a.a)},
$isi:1},
mX:{"^":"h:0;a,b",
$0:function(){this.b.$2(this.a.a,null)},
$isi:1},
lp:{"^":"f;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",v:{
lq:function(a){var z=P.a0(["command","print","msg",a])
return new H.ak(!0,P.ar(null,P.l)).T(z)}}},
cv:{"^":"f;a,b,c,hP:d<,cu:e<,ez:f<,r,hK:x?,hO:y<,z,Q,ch,cx,cy,db,dx",
dJ:function(a,b){if(!this.f.A(0,a))return
if(this.Q.q(0,b)&&!this.y)this.y=!0
this.as()},
ia:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.a3(0,a)
if(z.a===0){for(z=this.z;y=z.length,y!==0;){if(0>=y)return H.a(z,-1)
x=z.pop()
y=init.globalState.f.a
w=y.b
v=y.a
u=v.length
w=(w-1&u-1)>>>0
y.b=w
if(w<0||w>=u)return H.a(v,w)
v[w]=x
if(w===y.c)y.dg();++y.d}this.y=!1}this.as()},
h7:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.v(a),y=0;x=this.ch,y<x.length;y+=2)if(z.A(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.a(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
i9:function(a){var z,y,x
if(this.ch==null)return
for(z=J.v(a),y=0;x=this.ch,y<x.length;y+=2)if(z.A(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.E(new P.n("removeRange"))
P.dc(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
f6:function(a,b){if(!this.r.A(0,a))return
this.db=b},
hD:function(a,b,c){var z=J.v(b)
if(!z.A(b,0))z=z.A(b,1)&&!this.cy
else z=!0
if(z){J.an(a,c)
return}z=this.cx
if(z==null){z=P.d7(null,null)
this.cx=z}z.ac(0,new H.li(a,c))},
hC:function(a,b){var z
if(!this.r.A(0,a))return
z=J.v(b)
if(!z.A(b,0))z=z.A(b,1)&&!this.cy
else z=!0
if(z){this.am()
return}z=this.cx
if(z==null){z=P.d7(null,null)
this.cx=z}z.ac(0,this.ghQ())},
hE:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.bk(a)
if(b!=null)P.bk(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.au(a)
y[1]=b==null?null:J.au(b)
for(x=new P.dq(z,z.r,null,null),x.c=z.e;x.D();)J.an(x.d,y)},
b5:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.Q(u)
v=H.M(u)
this.hE(w,v)
if(this.db===!0){this.am()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.ghP()
if(this.cx!=null)for(;t=this.cx,!t.ga9(t);)this.cx.eC().$0()}return y},
hA:function(a){var z=J.O(a)
switch(z.h(a,0)){case"pause":this.dJ(z.h(a,1),z.h(a,2))
break
case"resume":this.ia(z.h(a,1))
break
case"add-ondone":this.h7(z.h(a,1),z.h(a,2))
break
case"remove-ondone":this.i9(z.h(a,1))
break
case"set-errors-fatal":this.f6(z.h(a,1),z.h(a,2))
break
case"ping":this.hD(z.h(a,1),z.h(a,2),z.h(a,3))
break
case"kill":this.hC(z.h(a,1),z.h(a,2))
break
case"getErrors":this.dx.q(0,z.h(a,1))
break
case"stopErrors":this.dx.a3(0,z.h(a,1))
break}},
ed:function(a){return this.b.h(0,a)},
aD:function(a,b){var z=this.b
if(z.bA(0,a))throw H.b(P.b3("Registry: ports must be registered only once."))
z.j(0,a,b)},
as:function(){var z=this.b
if(z.gi(z)-this.c.a>0||this.y||!this.x)init.globalState.z.j(0,this.a,this)
else this.am()},
am:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.aK(0)
for(z=this.b,y=z.geR(z),y=y.gO(y);y.D();)y.gH().fA()
z.aK(0)
this.c.aK(0)
init.globalState.z.a3(0,this.a)
this.dx.aK(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.a(z,v)
J.an(w,z[v])}this.ch=null}},"$0","ghQ",0,0,1]},
li:{"^":"h:1;a,b",
$0:function(){J.an(this.a,this.b)},
$isi:1},
kY:{"^":"f;a,b",
hm:function(){var z=this.a
if(z.b===z.c)return
return z.eC()},
eF:function(){var z,y,x
z=this.hm()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.bA(0,init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.ga9(y)}else y=!1
else y=!1
else y=!1
if(y)H.E(P.b3("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.ga9(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.a0(["command","close"])
x=new H.ak(!0,new P.fw(0,null,null,null,null,null,0,[null,P.l])).T(x)
y.toString
self.postMessage(x)}return!1}z.i6()
return!0},
du:function(){if(self.window!=null)new H.kZ(this).$0()
else for(;this.eF(););},
bc:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.du()
else try{this.du()}catch(x){z=H.Q(x)
y=H.M(x)
w=init.globalState.Q
v=P.a0(["command","error","msg",H.j(z)+"\n"+H.j(y)])
v=new H.ak(!0,P.ar(null,P.l)).T(v)
w.toString
self.postMessage(v)}}},
kZ:{"^":"h:1;a",
$0:function(){if(!this.a.eF())return
P.ko(C.p,this)},
$isi:1},
bA:{"^":"f;a,b,I:c>",
i6:function(){var z=this.a
if(z.ghO()){z.z.push(this)
return}z.b5(this.b)}},
lo:{"^":"f;"},
j5:{"^":"h:0;a,b,c,d,e,f",
$0:function(){H.ev(this.a,this.b,this.c,this.d,this.e,this.f)},
$isi:1},
jc:{"^":"h:2;a",
$1:function(a){J.an(this.a,a)},
$isi:1},
jd:{"^":"h:4;a",
$1:function(a){J.an(this.a,["spawn failed",a])},
$isi:1},
je:{"^":"h:2;a",
$1:function(a){var z,y
z=J.O(a)
y=this.a
if(J.H(z.h(a,0),"spawned"))y.a8(0,a)
else y.cr(z.h(a,1))},
$isi:1},
jf:{"^":"h:4;a",
$1:function(a){return this.a.cr(a)},
$isi:1},
j8:{"^":"h:0;a,b,c,d,e",
$0:function(){var z=this.a
H.ev(init.globalFunctions[this.b](),z.a,z.b,this.c,this.d,this.e)},
$isi:1},
j6:{"^":"h:1;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.shK(!0)
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
if(H.aX(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.aX(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.as()},
$isi:1},
fl:{"^":"f;",$isde:1},
ba:{"^":"fl;b,a",
N:function(a,b){var z,y,x
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gdi())return
x=H.fD(b)
if(J.H(z.gcu(),y)){z.hA(x)
return}init.globalState.f.a.ac(0,new H.bA(z,new H.lt(this,x),"receive"))},
A:function(a,b){if(b==null)return!1
return b instanceof H.ba&&J.H(this.b,b.b)},
gC:function(a){return this.b.gc7()},
$isde:1},
lt:{"^":"h:0;a,b",
$0:function(){var z=this.a.b
if(!z.gdi())z.ft(0,this.b)},
$isi:1},
ds:{"^":"fl;b,c,a",
N:function(a,b){var z,y,x
z=P.a0(["command","message","port",this,"msg",b])
y=new H.ak(!0,P.ar(null,P.l)).T(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
A:function(a,b){if(b==null)return!1
return b instanceof H.ds&&J.H(this.b,b.b)&&J.H(this.a,b.a)&&J.H(this.c,b.c)},
gC:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.f7()
y=this.a
if(typeof y!=="number")return y.f7()
x=this.c
if(typeof x!=="number")return H.m(x)
return(z<<16^y<<8^x)>>>0},
$isde:1},
aB:{"^":"f;c7:a<,b,di:c<",
fA:function(){this.c=!0
this.b=null},
by:function(a){var z,y
if(this.c)return
this.c=!0
this.b=null
z=init.globalState.d
y=this.a
z.b.a3(0,y)
z.c.a3(0,y)
z.as()},
ft:function(a,b){if(this.c)return
this.b.$1(b)},
geZ:function(){return new H.ba(this,init.globalState.d.a)},
$isjS:1},
dd:{"^":"a6;a,b",
P:function(a,b,c,d){var z=this.b
z.toString
return new P.b7(z,[H.z(z,0)]).P(a,b,c,d)},
bG:function(a,b,c){return this.P(a,null,b,c)},
by:[function(a){this.a.by(0)
this.b.by(0)},"$0","ghf",0,0,1],
bV:function(a){var z=new P.lL(null,0,null,null,null,null,this.ghf(this),[null])
this.b=z
this.a.b=z.gh5(z)},
$asa6:I.X},
kk:{"^":"f;a,b,c",
fn:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.ac(0,new H.bA(y,new H.km(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.aE(new H.kn(this,b),0),a)}else throw H.b(new P.n("Timer greater than 0."))},
v:{
kl:function(a,b){var z=new H.kk(!0,!1,null)
z.fn(a,b)
return z}}},
km:{"^":"h:1;a,b",
$0:function(){this.a.c=null
this.b.$0()},
$isi:1},
kn:{"^":"h:1;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()},
$isi:1},
av:{"^":"f;c7:a<",
gC:function(a){var z=this.a
if(typeof z!=="number")return z.ir()
z=C.b.cg(z,0)^C.b.al(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
A:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.av){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
ak:{"^":"f;a,b",
T:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.j(0,a,z.gi(z))
z=J.v(a)
if(!!z.$isch)return["buffer",a]
if(!!z.$iscj)return["typed",a]
if(!!z.$isr)return this.f2(a)
if(!!z.$isj3){x=this.gf_()
w=z.gbE(a)
w=H.cg(w,x,H.R(w,"ac",0),null)
w=P.aJ(w,!0,H.R(w,"ac",0))
z=z.geR(a)
z=H.cg(z,x,H.R(z,"ac",0),null)
return["map",w,P.aJ(z,!0,H.R(z,"ac",0))]}if(!!z.$isjo)return this.f3(a)
if(!!z.$ise)this.eN(a)
if(!!z.$isjS)this.bf(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isba)return this.f4(a)
if(!!z.$isds)return this.f5(a)
if(!!z.$ish){v=a.$static_name
if(v==null)this.bf(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isav)return["capability",a.a]
if(!(a instanceof P.f))this.eN(a)
return["dart",init.classIdExtractor(a),this.f1(init.classFieldsExtractor(a))]},"$1","gf_",2,0,2],
bf:function(a,b){throw H.b(new P.n((b==null?"Can't transmit:":b)+" "+H.j(a)))},
eN:function(a){return this.bf(a,null)},
f2:function(a){var z=this.f0(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.bf(a,"Can't serialize indexable: ")},
f0:function(a){var z,y,x
z=[]
C.a.si(z,a.length)
for(y=0;y<a.length;++y){x=this.T(a[y])
if(y>=z.length)return H.a(z,y)
z[y]=x}return z},
f1:function(a){var z
for(z=0;z<a.length;++z)C.a.j(a,z,this.T(a[z]))
return a},
f3:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.bf(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.si(y,z.length)
for(x=0;x<z.length;++x){w=this.T(a[z[x]])
if(x>=y.length)return H.a(y,x)
y[x]=w}return["js-object",z,y]},
f5:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
f4:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gc7()]
return["raw sendport",a]}},
ct:{"^":"f;a,b",
aw:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.b(P.a8("Bad serialized message: "+H.j(a)))
switch(C.a.gaj(a)){case"ref":if(1>=a.length)return H.a(a,1)
z=a[1]
y=this.b
if(z>>>0!==z||z>=y.length)return H.a(y,z)
return y[z]
case"buffer":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return x
case"typed":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return x
case"fixed":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
y=H.A(this.b3(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return H.A(this.b3(x),[null])
case"mutable":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return this.b3(x)
case"const":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
y=H.A(this.b3(x),[null])
y.fixed$length=Array
return y
case"map":return this.hp(a)
case"sendport":return this.hq(a)
case"raw sendport":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.ho(a)
case"function":if(1>=a.length)return H.a(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.a(a,1)
return new H.av(a[1])
case"dart":y=a.length
if(1>=y)return H.a(a,1)
w=a[1]
if(2>=y)return H.a(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.b3(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.b("couldn't deserialize: "+H.j(a))}},"$1","ghn",2,0,2],
b3:function(a){var z,y,x
z=J.O(a)
y=0
while(!0){x=z.gi(a)
if(typeof x!=="number")return H.m(x)
if(!(y<x))break
z.j(a,y,this.aw(z.h(a,y)));++y}return a},
hp:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
w=P.d6()
this.b.push(w)
y=J.hr(y,this.ghn()).cM(0)
for(z=J.O(y),v=J.O(x),u=0;u<z.gi(y);++u){if(u>=y.length)return H.a(y,u)
w.j(0,y[u],this.aw(v.h(x,u)))}return w},
hq:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
if(3>=z)return H.a(a,3)
w=a[3]
if(J.H(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.ed(w)
if(u==null)return
t=new H.ba(u,x)}else t=new H.ds(y,w,x)
this.b.push(t)
return t},
ho:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.O(y)
v=J.O(x)
u=0
while(!0){t=z.gi(y)
if(typeof t!=="number")return H.m(t)
if(!(u<t))break
w[z.h(y,u)]=this.aw(v.h(x,u));++u}return w}}}],["","",,H,{"^":"",
mp:function(a){return init.types[a]},
fW:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.v(a).$ist},
j:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.au(a)
if(typeof z!=="string")throw H.b(H.a3(a))
return z},
aA:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
eQ:function(a){var z,y,x,w,v,u,t,s
z=J.v(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.z||!!J.v(a).$isbS){v=C.r(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.h.fB(w,0)===36)w=C.h.aT(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.fX(H.cz(a),0,null),init.mangledGlobalNames)},
cm:function(a){return"Instance of '"+H.eQ(a)+"'"},
p8:[function(){return Date.now()},"$0","m1",0,0,29],
eN:function(){var z,y
if($.bQ!=null)return
$.bQ=1000
$.aN=H.m1()
if(typeof window=="undefined")return
z=window
if(z==null)return
y=z.performance
if(y==null)return
if(typeof y.now!="function")return
$.bQ=1e6
$.aN=new H.jQ(y)},
a5:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
jP:function(a){return a.b?H.a5(a).getUTCFullYear()+0:H.a5(a).getFullYear()+0},
jN:function(a){return a.b?H.a5(a).getUTCMonth()+1:H.a5(a).getMonth()+1},
jJ:function(a){return a.b?H.a5(a).getUTCDate()+0:H.a5(a).getDate()+0},
jK:function(a){return a.b?H.a5(a).getUTCHours()+0:H.a5(a).getHours()+0},
jM:function(a){return a.b?H.a5(a).getUTCMinutes()+0:H.a5(a).getMinutes()+0},
jO:function(a){return a.b?H.a5(a).getUTCSeconds()+0:H.a5(a).getSeconds()+0},
jL:function(a){return a.b?H.a5(a).getUTCMilliseconds()+0:H.a5(a).getMilliseconds()+0},
db:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.b(H.a3(a))
return a[b]},
eR:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.b(H.a3(a))
a[b]=c},
m:function(a){throw H.b(H.a3(a))},
a:function(a,b){if(a==null)J.at(a)
throw H.b(H.U(a,b))},
U:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.b_(!0,b,"index",null)
z=J.at(a)
if(!(b<0)){if(typeof z!=="number")return H.m(z)
y=b>=z}else y=!0
if(y)return P.F(b,a,"index",null,z)
return P.bw(b,"index",null)},
a3:function(a){return new P.b_(!0,a,null,null)},
bh:function(a){if(typeof a!=="number")throw H.b(H.a3(a))
return a},
md:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.b(H.a3(a))
return a},
b:function(a){var z
if(a==null)a=new P.cl()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.h4})
z.name=""}else z.toString=H.h4
return z},
h4:function(){return J.au(this.dartException)},
E:function(a){throw H.b(a)},
P:function(a){throw H.b(new P.a9(a))},
Q:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.n_(a)
if(a==null)return
if(a instanceof H.cY)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.d.cg(x,16)&8191)===10)switch(w){case 438:return z.$1(H.d5(H.j(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.j(y)+" (Error "+w+")"
return z.$1(new H.eL(v,null))}}if(a instanceof TypeError){u=$.$get$f4()
t=$.$get$f5()
s=$.$get$f6()
r=$.$get$f7()
q=$.$get$fb()
p=$.$get$fc()
o=$.$get$f9()
$.$get$f8()
n=$.$get$fe()
m=$.$get$fd()
l=u.ad(y)
if(l!=null)return z.$1(H.d5(y,l))
else{l=t.ad(y)
if(l!=null){l.method="call"
return z.$1(H.d5(y,l))}else{l=s.ad(y)
if(l==null){l=r.ad(y)
if(l==null){l=q.ad(y)
if(l==null){l=p.ad(y)
if(l==null){l=o.ad(y)
if(l==null){l=r.ad(y)
if(l==null){l=n.ad(y)
if(l==null){l=m.ad(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.eL(y,l==null?null:l.method))}}return z.$1(new H.kF(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.f_()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.b_(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.f_()
return a},
M:function(a){var z
if(a instanceof H.cY)return a.b
if(a==null)return new H.fx(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.fx(a,null)},
mL:function(a){if(a==null||typeof a!='object')return J.Y(a)
else return H.aA(a)},
mo:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.j(0,a[y],a[x])}return b},
my:function(a,b,c,d,e,f,g){switch(c){case 0:return H.bU(b,new H.mz(a))
case 1:return H.bU(b,new H.mA(a,d))
case 2:return H.bU(b,new H.mB(a,d,e))
case 3:return H.bU(b,new H.mC(a,d,e,f))
case 4:return H.bU(b,new H.mD(a,d,e,f,g))}throw H.b(P.b3("Unsupported number of arguments for wrapped closure"))},
aE:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.my)
a.$identity=z
return z},
hP:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.v(c).$isc){z.$reflectionInfo=c
x=H.jW(z).r}else x=c
w=d?Object.create(new H.k6().constructor.prototype):Object.create(new H.cR(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.ao
$.ao=J.as(u,1)
v=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.dR(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.mp,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.dQ:H.cS
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.b("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.dR(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
hM:function(a,b,c,d){var z=H.cS
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
dR:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.hO(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.hM(y,!w,z,b)
if(y===0){w=$.ao
$.ao=J.as(w,1)
u="self"+H.j(w)
w="return function(){var "+u+" = this."
v=$.bq
if(v==null){v=H.c9("self")
$.bq=v}return new Function(w+H.j(v)+";return "+u+"."+H.j(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.ao
$.ao=J.as(w,1)
t+=H.j(w)
w="return function("+t+"){return this."
v=$.bq
if(v==null){v=H.c9("self")
$.bq=v}return new Function(w+H.j(v)+"."+H.j(z)+"("+t+");}")()},
hN:function(a,b,c,d){var z,y
z=H.cS
y=H.dQ
switch(b?-1:a){case 0:throw H.b(new H.jY("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
hO:function(a,b){var z,y,x,w,v,u,t,s
z=H.hF()
y=$.dP
if(y==null){y=H.c9("receiver")
$.dP=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.hN(w,!u,x,b)
if(w===1){y="return function(){return this."+H.j(z)+"."+H.j(x)+"(this."+H.j(y)+");"
u=$.ao
$.ao=J.as(u,1)
return new Function(y+H.j(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.j(z)+"."+H.j(x)+"(this."+H.j(y)+", "+s+");"
u=$.ao
$.ao=J.as(u,1)
return new Function(y+H.j(u)+"}")()},
dv:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.v(c).$isc){c.fixed$length=Array
z=c}else z=c
return H.hP(a,b,z,!!d,e,f)},
mm:function(a){var z=J.v(a)
return"$S" in z?z.$S():null},
aX:function(a,b){var z
if(a==null)return!1
z=H.mm(a)
return z==null?!1:H.fV(z,b)},
mZ:function(a){throw H.b(new P.hS(a))},
bH:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
fS:function(a){return init.getIsolateTag(a)},
A:function(a,b){a.$ti=b
return a},
cz:function(a){if(a==null)return
return a.$ti},
fT:function(a,b){return H.dC(a["$as"+H.j(b)],H.cz(a))},
R:function(a,b,c){var z=H.fT(a,b)
return z==null?null:z[c]},
z:function(a,b){var z=H.cz(a)
return z==null?null:z[b]},
bl:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.fX(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.j(a)
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.bl(z,b)
return H.m_(a,b)}return"unknown-reified-type"},
m_:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.bl(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.bl(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.bl(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.mn(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.bl(r[p],b)+(" "+H.j(p))}w+="}"}return"("+w+") => "+z},
fX:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.dj("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.J=v+", "
u=a[y]
if(u!=null)w=!1
v=z.J+=H.bl(u,c)}return w?"":"<"+z.k(0)+">"},
dC:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
bX:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.cz(a)
y=J.v(a)
if(y[b]==null)return!1
return H.fP(H.dC(y[d],z),c)},
fP:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.aa(a[y],b[y]))return!1
return!0},
bi:function(a,b,c){return a.apply(b,H.fT(b,c))},
aa:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="ck")return!0
if('func' in b)return H.fV(a,b)
if('func' in a)return b.builtin$cls==="i"||b.builtin$cls==="f"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){v=H.bl(w,null)
if(!('$is'+v in y.prototype))return!1
u=y.prototype["$as"+v]}else u=null
if(!z&&u==null||!x)return!0
z=z?a.slice(1):null
x=b.slice(1)
return H.fP(H.dC(u,z),x)},
fO:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.aa(z,v)||H.aa(v,z)))return!1}return!0},
m8:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.aa(v,u)||H.aa(u,v)))return!1}return!0},
fV:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.aa(z,y)||H.aa(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.fO(x,w,!1))return!1
if(!H.fO(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.aa(o,n)||H.aa(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.aa(o,n)||H.aa(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.aa(o,n)||H.aa(n,o)))return!1}}return H.m8(a.named,b.named)},
qA:function(a){var z=$.dy
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
qw:function(a){return H.aA(a)},
qv:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
mE:function(a){var z,y,x,w,v,u
z=$.dy.$1(a)
y=$.cw[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.cB[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.fN.$2(a,z)
if(z!=null){y=$.cw[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.cB[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.dB(x)
$.cw[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.cB[z]=x
return x}if(v==="-"){u=H.dB(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.fZ(a,x)
if(v==="*")throw H.b(new P.cr(z))
if(init.leafTags[z]===true){u=H.dB(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.fZ(a,x)},
fZ:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.cD(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
dB:function(a){return J.cD(a,!1,null,!!a.$ist)},
mK:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.cD(z,!1,null,!!z.$ist)
else return J.cD(z,c,null,null)},
mw:function(){if(!0===$.dA)return
$.dA=!0
H.mx()},
mx:function(){var z,y,x,w,v,u,t,s
$.cw=Object.create(null)
$.cB=Object.create(null)
H.ms()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.h0.$1(v)
if(u!=null){t=H.mK(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
ms:function(){var z,y,x,w,v,u,t
z=C.E()
z=H.bg(C.B,H.bg(C.G,H.bg(C.q,H.bg(C.q,H.bg(C.F,H.bg(C.C,H.bg(C.D(C.r),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.dy=new H.mt(v)
$.fN=new H.mu(u)
$.h0=new H.mv(t)},
bg:function(a,b){return a(b)||b},
mY:function(a,b,c){var z
if(typeof b==="string")return a.indexOf(b,c)>=0
else{z=J.h9(b,C.h.aT(a,c))
z=z.ga9(z)
return!z}},
jV:{"^":"f;a,b,c,d,e,f,r,x",v:{
jW:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.jV(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
jQ:{"^":"h:0;a",
$0:function(){return C.b.bC(1000*this.a.now())},
$isi:1},
kC:{"^":"f;a,b,c,d,e,f",
ad:function(a){var z,y,x
z=new RegExp(this.a).exec(a)
if(z==null)return
y=Object.create(null)
x=this.b
if(x!==-1)y.arguments=z[x+1]
x=this.c
if(x!==-1)y.argumentsExpr=z[x+1]
x=this.d
if(x!==-1)y.expr=z[x+1]
x=this.e
if(x!==-1)y.method=z[x+1]
x=this.f
if(x!==-1)y.receiver=z[x+1]
return y},
v:{
aq:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.kC(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
cp:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
fa:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
eL:{"^":"a_;a,b",
k:function(a){var z=this.b
if(z==null)return"NullError: "+H.j(this.a)
return"NullError: method not found: '"+H.j(z)+"' on null"}},
jq:{"^":"a_;a,b,c",
k:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.j(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.j(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.j(this.a)+")"},
v:{
d5:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.jq(a,y,z?null:b.receiver)}}},
kF:{"^":"a_;a",
k:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
cY:{"^":"f;a,ab:b<"},
n_:{"^":"h:2;a",
$1:function(a){if(!!J.v(a).$isa_)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a},
$isi:1},
fx:{"^":"f;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
mz:{"^":"h:0;a",
$0:function(){return this.a.$0()},
$isi:1},
mA:{"^":"h:0;a,b",
$0:function(){return this.a.$1(this.b)},
$isi:1},
mB:{"^":"h:0;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)},
$isi:1},
mC:{"^":"h:0;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)},
$isi:1},
mD:{"^":"h:0;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)},
$isi:1},
h:{"^":"f;",
k:function(a){return"Closure '"+H.eQ(this).trim()+"'"},
geU:function(){return this},
$isi:1,
geU:function(){return this}},
f2:{"^":"h;"},
k6:{"^":"f2;",
k:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
cR:{"^":"f2;a,b,c,d",
A:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.cR))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gC:function(a){var z,y
z=this.c
if(z==null)y=H.aA(this.a)
else y=typeof z!=="object"?J.Y(z):H.aA(z)
z=H.aA(this.b)
if(typeof y!=="number")return y.is()
return(y^z)>>>0},
k:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.j(this.d)+"' of "+H.cm(z)},
v:{
cS:function(a){return a.a},
dQ:function(a){return a.c},
hF:function(){var z=$.bq
if(z==null){z=H.c9("self")
$.bq=z}return z},
c9:function(a){var z,y,x,w,v
z=new H.cR("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
jY:{"^":"a_;I:a>",
k:function(a){return"RuntimeError: "+H.j(this.a)}},
G:{"^":"f;a,b,c,d,e,f,r,$ti",
gi:function(a){return this.a},
ga9:function(a){return this.a===0},
gbE:function(a){return new H.jt(this,[H.z(this,0)])},
geR:function(a){return H.cg(this.gbE(this),new H.jp(this),H.z(this,0),H.z(this,1))},
bA:function(a,b){var z,y
if(typeof b==="string"){z=this.b
if(z==null)return!1
return this.d9(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return this.d9(y,b)}else return this.hL(b)},
hL:function(a){var z=this.d
if(z==null)return!1
return this.b8(this.bo(z,this.b7(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.aY(z,b)
return y==null?null:y.gax()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.aY(x,b)
return y==null?null:y.gax()}else return this.hM(b)},
hM:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.bo(z,this.b7(a))
x=this.b8(y,a)
if(x<0)return
return y[x].gax()},
j:function(a,b,c){var z,y,x,w,v,u
if(typeof b==="string"){z=this.b
if(z==null){z=this.c9()
this.b=z}this.d3(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.c9()
this.c=y}this.d3(y,b,c)}else{x=this.d
if(x==null){x=this.c9()
this.d=x}w=this.b7(b)
v=this.bo(x,w)
if(v==null)this.cf(x,w,[this.ca(b,c)])
else{u=this.b8(v,b)
if(u>=0)v[u].sax(c)
else v.push(this.ca(b,c))}}},
cG:function(a,b,c){var z
if(this.bA(0,b))return this.h(0,b)
z=c.$0()
this.j(0,b,z)
return z},
a3:function(a,b){if(typeof b==="string")return this.ds(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.ds(this.c,b)
else return this.hN(b)},
hN:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.bo(z,this.b7(a))
x=this.b8(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.dE(w)
return w.gax()},
aK:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
X:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.b(new P.a9(this))
z=z.c}},
d3:function(a,b,c){var z=this.aY(a,b)
if(z==null)this.cf(a,b,this.ca(b,c))
else z.sax(c)},
ds:function(a,b){var z
if(a==null)return
z=this.aY(a,b)
if(z==null)return
this.dE(z)
this.da(a,b)
return z.gax()},
ca:function(a,b){var z,y
z=new H.js(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
dE:function(a){var z,y
z=a.gfV()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
b7:function(a){return J.Y(a)&0x3ffffff},
b8:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.H(a[y].ge9(),b))return y
return-1},
k:function(a){return P.jz(this)},
aY:function(a,b){return a[b]},
bo:function(a,b){return a[b]},
cf:function(a,b,c){a[b]=c},
da:function(a,b){delete a[b]},
d9:function(a,b){return this.aY(a,b)!=null},
c9:function(){var z=Object.create(null)
this.cf(z,"<non-identifier-key>",z)
this.da(z,"<non-identifier-key>")
return z},
$isj3:1,
$isS:1,
$asS:null},
jp:{"^":"h:2;a",
$1:function(a){return this.a.h(0,a)},
$isi:1},
js:{"^":"f;e9:a<,ax:b@,c,fV:d<"},
jt:{"^":"d;a,$ti",
gi:function(a){return this.a.a},
gO:function(a){var z,y
z=this.a
y=new H.ju(z,z.r,null,null)
y.c=z.e
return y},
X:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.b(new P.a9(z))
y=y.c}}},
ju:{"^":"f;a,b,c,d",
gH:function(){return this.d},
D:function(){var z=this.a
if(this.b!==z.r)throw H.b(new P.a9(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
mt:{"^":"h:2;a",
$1:function(a){return this.a(a)},
$isi:1},
mu:{"^":"h:12;a",
$2:function(a,b){return this.a(a,b)},
$isi:1},
mv:{"^":"h:4;a",
$1:function(a){return this.a(a)},
$isi:1},
ki:{"^":"f;a,b,c",
h:function(a,b){if(b!==0)H.E(P.bw(b,null,null))
return this.c}},
lF:{"^":"ac;a,b,c",
gO:function(a){return new H.lG(this.a,this.b,this.c,null)},
$asac:function(){return[P.jB]}},
lG:{"^":"f;a,b,c,d",
D:function(){var z,y,x,w,v,u,t
z=this.c
y=this.b
x=y.length
w=this.a
v=w.length
if(z+x>v){this.d=null
return!1}u=w.indexOf(y,z)
if(u<0){this.c=v+1
this.d=null
return!1}t=u+x
this.d=new H.ki(u,w,y)
this.c=t===this.c?t+1:t
return!0},
gH:function(){return this.d}}}],["","",,H,{"^":"",
mn:function(a){var z=H.A(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
mO:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":"",
k:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.b(P.a8("Invalid length "+H.j(a)))
return a},
fC:function(a,b,c){if(typeof b!=="number"||Math.floor(b)!==b)throw H.b(P.a8("Invalid view offsetInBytes "+H.j(b)))},
a2:function(a){return a},
jF:function(a){return new Float32Array(H.k(a))},
eK:function(a){return new Uint16Array(H.a2(a))},
ch:{"^":"e;",
b0:function(a,b,c){var z
H.fC(a,b,c)
z=new Uint32Array(a,b,c)
return z},
F:function(a,b,c){var z
H.fC(a,b,c)
z=new Float32Array(a,b,c)
return z},
$isch:1,
$ishL:1,
"%":"ArrayBuffer"},
cj:{"^":"e;au:buffer=",
fQ:function(a,b,c,d){var z=P.aj(b,0,c,d,null)
throw H.b(z)},
d5:function(a,b,c,d){if(b>>>0!==b||b>c)this.fQ(a,b,c,d)},
$iscj:1,
"%":"DataView;ArrayBufferView;da|eG|eI|ci|eH|eJ|az"},
da:{"^":"cj;",
gi:function(a){return a.length},
dA:function(a,b,c,d,e){var z,y,x
z=a.length
this.d5(a,b,z,"start")
this.d5(a,c,z,"end")
if(b>c)throw H.b(P.aj(b,0,c,null,null))
y=c-b
x=d.length
if(x-e<y)throw H.b(new P.Z("Not enough elements"))
if(e!==0||x!==y)d=d.subarray(e,e+y)
a.set(d,b)},
$isr:1,
$asr:I.X,
$ist:1,
$ast:I.X},
ci:{"^":"eI;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.E(H.U(a,b))
return a[b]},
j:function(a,b,c){if(b>>>0!==b||b>=a.length)H.E(H.U(a,b))
a[b]=c},
aa:function(a,b,c,d,e){if(!!J.v(d).$isci){this.dA(a,b,c,d,e)
return}this.d1(a,b,c,d,e)},
bj:function(a,b,c,d){return this.aa(a,b,c,d,0)}},
eG:{"^":"da+D;",$asr:I.X,$isd:1,
$asd:function(){return[P.L]},
$ast:I.X,
$isc:1,
$asc:function(){return[P.L]}},
eI:{"^":"eG+eh;",$asr:I.X,
$asd:function(){return[P.L]},
$ast:I.X,
$asc:function(){return[P.L]}},
az:{"^":"eJ;",
j:function(a,b,c){if(b>>>0!==b||b>=a.length)H.E(H.U(a,b))
a[b]=c},
aa:function(a,b,c,d,e){if(!!J.v(d).$isaz){this.dA(a,b,c,d,e)
return}this.d1(a,b,c,d,e)},
bj:function(a,b,c,d){return this.aa(a,b,c,d,0)},
$isd:1,
$asd:function(){return[P.l]},
$isc:1,
$asc:function(){return[P.l]}},
eH:{"^":"da+D;",$asr:I.X,$isd:1,
$asd:function(){return[P.l]},
$ast:I.X,
$isc:1,
$asc:function(){return[P.l]}},
eJ:{"^":"eH+eh;",$asr:I.X,
$asd:function(){return[P.l]},
$ast:I.X,
$asc:function(){return[P.l]}},
jE:{"^":"ci;",$isd:1,
$asd:function(){return[P.L]},
$isc:1,
$asc:function(){return[P.L]},
"%":"Float32Array"},
oC:{"^":"ci;",$isd:1,
$asd:function(){return[P.L]},
$isc:1,
$asc:function(){return[P.L]},
"%":"Float64Array"},
oD:{"^":"az;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.E(H.U(a,b))
return a[b]},
$isd:1,
$asd:function(){return[P.l]},
$isc:1,
$asc:function(){return[P.l]},
"%":"Int16Array"},
oE:{"^":"az;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.E(H.U(a,b))
return a[b]},
$isd:1,
$asd:function(){return[P.l]},
$isc:1,
$asc:function(){return[P.l]},
"%":"Int32Array"},
oF:{"^":"az;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.E(H.U(a,b))
return a[b]},
$isd:1,
$asd:function(){return[P.l]},
$isc:1,
$asc:function(){return[P.l]},
"%":"Int8Array"},
oG:{"^":"az;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.E(H.U(a,b))
return a[b]},
$isd:1,
$asd:function(){return[P.l]},
$isc:1,
$asc:function(){return[P.l]},
"%":"Uint16Array"},
jG:{"^":"az;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.E(H.U(a,b))
return a[b]},
$isd:1,
$asd:function(){return[P.l]},
$isc:1,
$asc:function(){return[P.l]},
"%":"Uint32Array"},
oH:{"^":"az;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.E(H.U(a,b))
return a[b]},
$isd:1,
$asd:function(){return[P.l]},
$isc:1,
$asc:function(){return[P.l]},
"%":"CanvasPixelArray|Uint8ClampedArray"},
oI:{"^":"az;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.E(H.U(a,b))
return a[b]},
$isd:1,
$asd:function(){return[P.l]},
$isc:1,
$asc:function(){return[P.l]},
"%":";Uint8Array"}}],["","",,P,{"^":"",
kL:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.m9()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.aE(new P.kN(z),1)).observe(y,{childList:true})
return new P.kM(z,y,x)}else if(self.setImmediate!=null)return P.ma()
return P.mb()},
q7:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.aE(new P.kO(a),0))},"$1","m9",2,0,7],
q8:[function(a){++init.globalState.f.b
self.setImmediate(H.aE(new P.kP(a),0))},"$1","ma",2,0,7],
q9:[function(a){P.dl(C.p,a)},"$1","mb",2,0,7],
bd:function(a,b){P.fB(null,a)
return b.ghz()},
a7:function(a,b){P.fB(a,b)},
bc:function(a,b){J.he(b,a)},
bb:function(a,b){b.dT(H.Q(a),H.M(a))},
fB:function(a,b){var z,y,x,w
z=new P.lQ(b)
y=new P.lR(b)
x=J.v(a)
if(!!x.$isC)a.ci(z,y)
else if(!!x.$isa4)a.bJ(z,y)
else{w=new P.C(0,$.q,null,[null])
w.a=4
w.c=a
w.ci(z,null)}},
bf:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.q.toString
return new P.m7(z)},
fG:function(a,b){if(H.aX(a,{func:1,args:[P.ck,P.ck]})){b.toString
return a}else{b.toString
return a}},
ei:function(a,b,c){var z
if(a==null)a=new P.cl()
z=$.q
if(z!==C.e)z.toString
z=new P.C(0,z,null,[c])
z.c_(a,b)
return z},
b1:function(a){return new P.fA(new P.C(0,$.q,null,[a]),[a])},
fF:function(a,b,c){$.q.toString
a.a7(b,c)},
m2:function(){var z,y
for(;z=$.be,z!=null;){$.bD=null
y=J.dK(z)
$.be=y
if(y==null)$.bC=null
z.ghd().$0()}},
qu:[function(){$.dt=!0
try{P.m2()}finally{$.bD=null
$.dt=!1
if($.be!=null)$.$get$dn().$1(P.fR())}},"$0","fR",0,0,1],
fL:function(a){var z=new P.fj(a,null)
if($.be==null){$.bC=z
$.be=z
if(!$.dt)$.$get$dn().$1(P.fR())}else{$.bC.b=z
$.bC=z}},
m6:function(a){var z,y,x
z=$.be
if(z==null){P.fL(a)
$.bD=$.bC
return}y=new P.fj(a,null)
x=$.bD
if(x==null){y.b=z
$.bD=y
$.be=y}else{y.b=x.b
x.b=y
$.bD=y
if(y.b==null)$.bC=y}},
h2:function(a){var z=$.q
if(C.e===z){P.aW(null,null,C.e,a)
return}z.toString
P.aW(null,null,z,z.cn(a,!0))},
pF:function(a,b){return new P.lE(null,a,!1,[b])},
bV:function(a){return},
m3:[function(a,b){var z=$.q
z.toString
P.bF(null,null,z,a,b)},function(a){return P.m3(a,null)},"$2","$1","mc",2,2,6],
qt:[function(){},"$0","fQ",0,0,1],
m5:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){z=H.Q(u)
y=H.M(u)
$.q.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.bm(x)
w=t
v=x.gab()
c.$2(w,v)}}},
lS:function(a,b,c,d){var z=a.aJ(0)
if(!!J.v(z).$isa4&&z!==$.$get$aH())z.aS(new P.lV(b,c,d))
else b.a7(c,d)},
lT:function(a,b){return new P.lU(a,b)},
lW:function(a,b,c){var z=a.aJ(0)
if(!!J.v(z).$isa4&&z!==$.$get$aH())z.aS(new P.lX(b,c))
else b.aq(c)},
lP:function(a,b,c){$.q.toString
a.bX(b,c)},
ko:function(a,b){var z=$.q
if(z===C.e){z.toString
return P.dl(a,b)}return P.dl(a,z.cn(b,!0))},
dl:function(a,b){var z=C.d.al(a.a,1000)
return H.kl(z<0?0:z,b)},
bF:function(a,b,c,d,e){var z={}
z.a=d
P.m6(new P.m4(z,e))},
fI:function(a,b,c,d){var z,y
y=$.q
if(y===c)return d.$0()
$.q=c
z=y
try{y=d.$0()
return y}finally{$.q=z}},
fK:function(a,b,c,d,e){var z,y
y=$.q
if(y===c)return d.$1(e)
$.q=c
z=y
try{y=d.$1(e)
return y}finally{$.q=z}},
fJ:function(a,b,c,d,e,f){var z,y
y=$.q
if(y===c)return d.$2(e,f)
$.q=c
z=y
try{y=d.$2(e,f)
return y}finally{$.q=z}},
aW:function(a,b,c,d){var z=C.e!==c
if(z)d=c.cn(d,!(!z||!1))
P.fL(d)},
kN:{"^":"h:2;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()},
$isi:1},
kM:{"^":"h:13;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)},
$isi:1},
kO:{"^":"h:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()},
$isi:1},
kP:{"^":"h:0;a",
$0:function(){--init.globalState.f.b
this.a.$0()},
$isi:1},
lQ:{"^":"h:2;a",
$1:function(a){return this.a.$2(0,a)},
$isi:1},
lR:{"^":"h:8;a",
$2:function(a,b){this.a.$2(1,new H.cY(a,b))},
$isi:1},
m7:{"^":"h:14;a",
$2:function(a,b){this.a(a,b)},
$isi:1},
kR:{"^":"b7;a,$ti"},
kS:{"^":"fo;y,fT:z<,Q,x,a,b,c,d,e,f,r,$ti",
br:[function(){},"$0","gbq",0,0,1],
bt:[function(){},"$0","gbs",0,0,1]},
fm:{"^":"f;ar:c<,$ti",
gbp:function(){return this.c<4},
dt:function(a){var z,y
z=a.Q
y=a.z
if(z==null)this.d=y
else z.z=y
if(y==null)this.e=z
else y.Q=z
a.Q=a
a.z=a},
dB:function(a,b,c,d){var z,y,x,w
if((this.c&4)!==0){if(c==null)c=P.fQ()
z=new P.kX($.q,0,c)
z.dv()
return z}z=$.q
y=d?1:0
x=new P.kS(0,null,null,this,null,null,null,z,y,null,null,this.$ti)
x.bW(a,b,c,d,H.z(this,0))
x.Q=x
x.z=x
x.y=this.c&1
w=this.e
this.e=x
x.z=null
x.Q=w
if(w==null)this.d=x
else w.z=x
if(this.d===x)P.bV(this.a)
return x},
dn:function(a){var z
if(a.gfT()===a)return
z=a.y
if((z&2)!==0)a.y=z|4
else{this.dt(a)
if((this.c&2)===0&&this.d==null)this.c0()}return},
dq:function(a){},
dr:function(a){},
bY:["fe",function(){if((this.c&4)!==0)return new P.Z("Cannot add new events after calling close")
return new P.Z("Cannot add new events while doing an addStream")}],
q:function(a,b){if(!this.gbp())throw H.b(this.bY())
this.a0(b)},
fI:function(a){var z,y,x,w
z=this.c
if((z&2)!==0)throw H.b(new P.Z("Cannot fire new event. Controller is already firing an event"))
y=this.d
if(y==null)return
x=z&1
this.c=z^3
for(;y!=null;){z=y.y
if((z&1)===x){y.y=z|2
a.$1(y)
z=y.y^=1
w=y.z
if((z&4)!==0)this.dt(y)
y.y&=4294967293
y=w}else y=y.z}this.c&=4294967293
if(this.d==null)this.c0()},
c0:function(){if((this.c&4)!==0&&this.r.a===0)this.r.ak(null)
P.bV(this.b)}},
fz:{"^":"fm;a,b,c,d,e,f,r,$ti",
gbp:function(){return P.fm.prototype.gbp.call(this)===!0&&(this.c&2)===0},
bY:function(){if((this.c&2)!==0)return new P.Z("Cannot fire new event. Controller is already firing an event")
return this.fe()},
a0:function(a){var z=this.d
if(z==null)return
if(z===this.e){this.c|=2
z.aE(0,a)
this.c&=4294967293
if(this.d==null)this.c0()
return}this.fI(new P.lK(this,a))}},
lK:{"^":"h;a,b",
$1:function(a){a.aE(0,this.b)},
$S:function(){return H.bi(function(a){return{func:1,args:[[P.bz,a]]}},this.a,"fz")},
$isi:1},
a4:{"^":"f;$ti"},
fn:{"^":"f;hz:a<,$ti",
dT:[function(a,b){if(a==null)a=new P.cl()
if(this.a.a!==0)throw H.b(new P.Z("Future already completed"))
$.q.toString
this.a7(a,b)},function(a){return this.dT(a,null)},"cr","$2","$1","ghg",2,2,6]},
b6:{"^":"fn;a,$ti",
a8:function(a,b){var z=this.a
if(z.a!==0)throw H.b(new P.Z("Future already completed"))
z.ak(b)},
a7:function(a,b){this.a.c_(a,b)}},
fA:{"^":"fn;a,$ti",
a8:function(a,b){var z=this.a
if(z.a!==0)throw H.b(new P.Z("Future already completed"))
z.aq(b)},
a7:function(a,b){this.a.a7(a,b)}},
fr:{"^":"f;cb:a<,b,c,d,e",
gh4:function(){return this.b.b},
ge7:function(){return(this.c&1)!==0},
ghH:function(){return(this.c&2)!==0},
ge6:function(){return this.c===8},
hF:function(a){return this.b.b.cJ(this.d,a)},
hV:function(a){if(this.c!==6)return!0
return this.b.b.cJ(this.d,J.bm(a))},
hB:function(a){var z,y,x
z=this.e
y=J.o(a)
x=this.b.b
if(H.aX(z,{func:1,args:[,,]}))return x.ie(z,y.gV(a),a.gab())
else return x.cJ(z,y.gV(a))},
hG:function(){return this.b.b.eE(this.d)}},
C:{"^":"f;ar:a<,b,fZ:c<,$ti",
gfR:function(){return this.a===2},
gc8:function(){return this.a>=4},
bJ:function(a,b){var z=$.q
if(z!==C.e){z.toString
if(b!=null)b=P.fG(b,z)}return this.ci(a,b)},
bI:function(a){return this.bJ(a,null)},
ci:function(a,b){var z=new P.C(0,$.q,null,[null])
this.bZ(new P.fr(null,z,b==null?1:3,a,b))
return z},
aS:function(a){var z,y
z=$.q
y=new P.C(0,z,null,this.$ti)
if(z!==C.e)z.toString
this.bZ(new P.fr(null,y,8,a,null))
return y},
bZ:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.gc8()){y.bZ(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.aW(null,null,z,new P.l5(this,a))}},
dl:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gcb()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.gc8()){v.dl(a)
return}this.a=v.a
this.c=v.c}z.a=this.bv(a)
y=this.b
y.toString
P.aW(null,null,y,new P.lc(z,this))}},
bu:function(){var z=this.c
this.c=null
return this.bv(z)},
bv:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gcb()
z.a=y}return y},
aq:function(a){var z,y
z=this.$ti
if(H.bX(a,"$isa4",z,"$asa4"))if(H.bX(a,"$isC",z,null))P.cu(a,this)
else P.fs(a,this)
else{y=this.bu()
this.a=4
this.c=a
P.b9(this,y)}},
a7:[function(a,b){var z=this.bu()
this.a=8
this.c=new P.c7(a,b)
P.b9(this,z)},function(a){return this.a7(a,null)},"it","$2","$1","gbl",2,2,6],
ak:function(a){var z
if(H.bX(a,"$isa4",this.$ti,"$asa4")){this.fw(a)
return}this.a=1
z=this.b
z.toString
P.aW(null,null,z,new P.l7(this,a))},
fw:function(a){var z
if(H.bX(a,"$isC",this.$ti,null)){if(a.a===8){this.a=1
z=this.b
z.toString
P.aW(null,null,z,new P.lb(this,a))}else P.cu(a,this)
return}P.fs(a,this)},
c_:function(a,b){var z
this.a=1
z=this.b
z.toString
P.aW(null,null,z,new P.l6(this,a,b))},
$isa4:1,
v:{
l4:function(a,b){var z=new P.C(0,$.q,null,[b])
z.a=4
z.c=a
return z},
fs:function(a,b){var z,y,x
b.a=1
try{a.bJ(new P.l8(b),new P.l9(b))}catch(x){z=H.Q(x)
y=H.M(x)
P.h2(new P.la(b,z,y))}},
cu:function(a,b){var z,y,x
for(;a.gfR();)a=a.c
z=a.gc8()
y=b.c
if(z){b.c=null
x=b.bv(y)
b.a=a.a
b.c=a.c
P.b9(b,x)}else{b.a=2
b.c=a
a.dl(y)}},
b9:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z={}
z.a=a
y={}
for(x=a;!0;w={},w.a=y.a,w.b=y.b,y=w){v=x.a===8
if(b==null){if(v){u=x.c
x=x.b
t=J.bm(u)
s=u.gab()
x.toString
P.bF(null,null,x,t,s)}return}for(;b.gcb()!=null;b=r){r=b.a
b.a=null
P.b9(z.a,b)}q=z.a.c
y.a=v
y.b=q
x=!v
if(!x||b.ge7()||b.ge6()){p=b.gh4()
if(v){t=z.a.b
t.toString
t=t==null?p==null:t===p
if(!t)p.toString
else t=!0
t=!t}else t=!1
if(t){x=z.a
u=x.c
x=x.b
t=J.bm(u)
s=u.gab()
x.toString
P.bF(null,null,x,t,s)
return}o=$.q
if(o==null?p!=null:o!==p)$.q=p
else o=null
if(b.ge6())new P.lf(z,y,v,b).$0()
else if(x){if(b.ge7())new P.le(y,b,q).$0()}else if(b.ghH())new P.ld(z,y,b).$0()
if(o!=null)$.q=o
x=y.b
if(!!J.v(x).$isa4){n=b.b
if(x.a>=4){m=n.c
n.c=null
b=n.bv(m)
n.a=x.a
n.c=x.c
z.a=x
continue}else P.cu(x,n)
return}}n=b.b
b=n.bu()
x=y.a
t=y.b
if(!x){n.a=4
n.c=t}else{n.a=8
n.c=t}z.a=n
x=n}}}},
l5:{"^":"h:0;a,b",
$0:function(){P.b9(this.a,this.b)},
$isi:1},
lc:{"^":"h:0;a,b",
$0:function(){P.b9(this.b,this.a.a)},
$isi:1},
l8:{"^":"h:2;a",
$1:function(a){var z=this.a
z.a=0
z.aq(a)},
$isi:1},
l9:{"^":"h:15;a",
$2:function(a,b){this.a.a7(a,b)},
$1:function(a){return this.$2(a,null)},
$isi:1},
la:{"^":"h:0;a,b,c",
$0:function(){this.a.a7(this.b,this.c)},
$isi:1},
l7:{"^":"h:0;a,b",
$0:function(){var z,y
z=this.a
y=z.bu()
z.a=4
z.c=this.b
P.b9(z,y)},
$isi:1},
lb:{"^":"h:0;a,b",
$0:function(){P.cu(this.b,this.a)},
$isi:1},
l6:{"^":"h:0;a,b,c",
$0:function(){this.a.a7(this.b,this.c)},
$isi:1},
lf:{"^":"h:1;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.hG()}catch(w){y=H.Q(w)
x=H.M(w)
if(this.c){v=J.bm(this.a.a.c)
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.c7(y,x)
u.a=!0
return}if(!!J.v(z).$isa4){if(z instanceof P.C&&z.gar()>=4){if(z.gar()===8){v=this.b
v.b=z.gfZ()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.bI(new P.lg(t))
v.a=!1}},
$isi:1},
lg:{"^":"h:2;a",
$1:function(a){return this.a},
$isi:1},
le:{"^":"h:1;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.hF(this.c)}catch(x){z=H.Q(x)
y=H.M(x)
w=this.a
w.b=new P.c7(z,y)
w.a=!0}},
$isi:1},
ld:{"^":"h:1;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.hV(z)===!0&&w.e!=null){v=this.b
v.b=w.hB(z)
v.a=!1}}catch(u){y=H.Q(u)
x=H.M(u)
w=this.a
v=J.bm(w.a.c)
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.c7(y,x)
s.a=!0}},
$isi:1},
fj:{"^":"f;hd:a<,az:b*"},
a6:{"^":"f;$ti",
aO:function(a,b){return new P.lr(b,this,[H.R(this,"a6",0),null])},
a2:function(a,b){var z,y
z={}
y=new P.C(0,$.q,null,[H.R(this,"a6",0)])
z.a=!1
z.b=null
z.c=null
z.c=this.P(new P.ke(z,this,b,y),!0,new P.kf(z,y),y.gbl())
return y},
gi:function(a){var z,y
z={}
y=new P.C(0,$.q,null,[P.l])
z.a=0
this.P(new P.ka(z),!0,new P.kb(z,y),y.gbl())
return y},
cM:function(a){var z,y,x
z=H.R(this,"a6",0)
y=H.A([],[z])
x=new P.C(0,$.q,null,[[P.c,z]])
this.P(new P.kg(this,y),!0,new P.kh(y,x),x.gbl())
return x},
gaj:function(a){var z,y
z={}
y=new P.C(0,$.q,null,[H.R(this,"a6",0)])
z.a=null
z.a=this.P(new P.k8(z,this,y),!0,new P.k9(y),y.gbl())
return y}},
ke:{"^":"h;a,b,c,d",
$1:function(a){var z=this.a
if(z.a)P.m5(new P.kc(z,this.c,a),new P.kd(z,this.b),P.lT(z.c,this.d))
else{z.b=a
z.a=!0}},
$S:function(){return H.bi(function(a){return{func:1,args:[a]}},this.b,"a6")},
$isi:1},
kc:{"^":"h:0;a,b,c",
$0:function(){return this.b.$2(this.a.b,this.c)},
$isi:1},
kd:{"^":"h;a,b",
$1:function(a){this.a.b=a},
$S:function(){return H.bi(function(a){return{func:1,args:[a]}},this.b,"a6")},
$isi:1},
kf:{"^":"h:0;a,b",
$0:function(){var z,y,x,w
x=this.a
if(!x.a)try{x=H.ah()
throw H.b(x)}catch(w){z=H.Q(w)
y=H.M(w)
P.fF(this.b,z,y)}else this.b.aq(x.b)},
$isi:1},
ka:{"^":"h:2;a",
$1:function(a){++this.a.a},
$isi:1},
kb:{"^":"h:0;a,b",
$0:function(){this.b.aq(this.a.a)},
$isi:1},
kg:{"^":"h;a,b",
$1:function(a){this.b.push(a)},
$S:function(){return H.bi(function(a){return{func:1,args:[a]}},this.a,"a6")},
$isi:1},
kh:{"^":"h:0;a,b",
$0:function(){this.b.aq(this.a)},
$isi:1},
k8:{"^":"h;a,b,c",
$1:function(a){P.lW(this.a.a,this.c,a)},
$S:function(){return H.bi(function(a){return{func:1,args:[a]}},this.b,"a6")},
$isi:1},
k9:{"^":"h:0;a",
$0:function(){var z,y,x,w
try{x=H.ah()
throw H.b(x)}catch(w){z=H.Q(w)
y=H.M(w)
P.fF(this.a,z,y)}},
$isi:1},
k7:{"^":"f;"},
dr:{"^":"f;ar:b<,$ti",
gfU:function(){if((this.b&8)===0)return this.a
return this.a.gbL()},
aG:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.fy(null,null,0,this.$ti)
this.a=z}return z}y=this.a
y.gbL()
return y.gbL()},
gbw:function(){if((this.b&8)!==0)return this.a.gbL()
return this.a},
aF:function(){if((this.b&4)!==0)return new P.Z("Cannot add event after closing")
return new P.Z("Cannot add event while adding a stream")},
de:function(){var z=this.c
if(z==null){z=(this.b&2)!==0?$.$get$aH():new P.C(0,$.q,null,[null])
this.c=z}return z},
q:[function(a,b){var z=this.b
if(z>=4)throw H.b(this.aF())
if((z&1)!==0)this.a0(b)
else if((z&3)===0)this.aG().q(0,new P.b8(b,null,this.$ti))},"$1","gh5",2,0,function(){return H.bi(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"dr")}],
by:function(a){var z=this.b
if((z&4)!==0)return this.de()
if(z>=4)throw H.b(this.aF())
z|=4
this.b=z
if((z&1)!==0)this.aH()
else if((z&3)===0)this.aG().q(0,C.m)
return this.de()},
dB:function(a,b,c,d){var z,y,x,w,v
if((this.b&3)!==0)throw H.b(new P.Z("Stream has already been listened to."))
z=$.q
y=d?1:0
x=new P.fo(this,null,null,null,z,y,null,null,this.$ti)
x.bW(a,b,c,d,H.z(this,0))
w=this.gfU()
y=this.b|=1
if((y&8)!==0){v=this.a
v.sbL(x)
v.af(0)}else this.a=x
x.h0(w)
x.c6(new P.lC(this))
return x},
dn:function(a){var z,y,x,w,v,u
z=null
if((this.b&8)!==0)z=this.a.aJ(0)
this.a=null
this.b=this.b&4294967286|2
w=this.r
if(w!=null)if(z==null)try{z=w.$0()}catch(v){y=H.Q(v)
x=H.M(v)
u=new P.C(0,$.q,null,[null])
u.c_(y,x)
z=u}else z=z.aS(w)
w=new P.lB(this)
if(z!=null)z=z.aS(w)
else w.$0()
return z},
dq:function(a){if((this.b&8)!==0)this.a.R(0)
P.bV(this.e)},
dr:function(a){if((this.b&8)!==0)this.a.af(0)
P.bV(this.f)}},
lC:{"^":"h:0;a",
$0:function(){P.bV(this.a.d)},
$isi:1},
lB:{"^":"h:1;a",
$0:function(){var z=this.a.c
if(z!=null&&z.a===0)z.ak(null)},
$isi:1},
lM:{"^":"f;",
a0:function(a){this.gbw().aE(0,a)},
aH:function(){this.gbw().d4()}},
kQ:{"^":"f;$ti",
a0:function(a){this.gbw().aW(new P.b8(a,null,[H.z(this,0)]))},
aH:function(){this.gbw().aW(C.m)}},
fk:{"^":"dr+kQ;a,b,c,d,e,f,r,$ti"},
lL:{"^":"dr+lM;a,b,c,d,e,f,r,$ti"},
b7:{"^":"lD;a,$ti",
gC:function(a){return(H.aA(this.a)^892482866)>>>0},
A:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.b7))return!1
return b.a===this.a}},
fo:{"^":"bz;x,a,b,c,d,e,f,r,$ti",
cc:function(){return this.x.dn(this)},
br:[function(){this.x.dq(this)},"$0","gbq",0,0,1],
bt:[function(){this.x.dr(this)},"$0","gbs",0,0,1]},
bz:{"^":"f;ar:e<,$ti",
h0:function(a){if(a==null)return
this.r=a
if(!a.ga9(a)){this.e=(this.e|64)>>>0
this.r.bh(this)}},
bb:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.dO()
if((z&4)===0&&(this.e&32)===0)this.c6(this.gbq())},
R:function(a){return this.bb(a,null)},
af:function(a){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.ga9(z)}else z=!1
if(z)this.r.bh(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.c6(this.gbs())}}}},
aJ:function(a){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.c1()
z=this.f
return z==null?$.$get$aH():z},
c1:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.dO()
if((this.e&32)===0)this.r=null
this.f=this.cc()},
aE:["ff",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.a0(b)
else this.aW(new P.b8(b,null,[H.R(this,"bz",0)]))}],
bX:["fg",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.dz(a,b)
else this.aW(new P.kW(a,b,null))}],
d4:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.aH()
else this.aW(C.m)},
br:[function(){},"$0","gbq",0,0,1],
bt:[function(){},"$0","gbs",0,0,1],
cc:function(){return},
aW:function(a){var z,y
z=this.r
if(z==null){z=new P.fy(null,null,0,[H.R(this,"bz",0)])
this.r=z}z.q(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.bh(this)}},
a0:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.cK(this.a,a)
this.e=(this.e&4294967263)>>>0
this.c2((z&4)!==0)},
dz:function(a,b){var z,y
z=this.e
y=new P.kU(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.c1()
z=this.f
if(!!J.v(z).$isa4&&z!==$.$get$aH())z.aS(y)
else y.$0()}else{y.$0()
this.c2((z&4)!==0)}},
aH:function(){var z,y
z=new P.kT(this)
this.c1()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.v(y).$isa4&&y!==$.$get$aH())y.aS(z)
else z.$0()},
c6:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.c2((z&4)!==0)},
c2:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.ga9(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.ga9(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.br()
else this.bt()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.bh(this)},
bW:function(a,b,c,d,e){var z=this.d
z.toString
this.a=a
this.b=P.fG(b==null?P.mc():b,z)
this.c=c==null?P.fQ():c}},
kU:{"^":"h:1;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.aX(y,{func:1,args:[P.f,P.b5]})
w=z.d
v=this.b
u=z.b
if(x)w.ig(u,v,this.c)
else w.cK(u,v)
z.e=(z.e&4294967263)>>>0},
$isi:1},
kT:{"^":"h:1;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.cI(z.c)
z.e=(z.e&4294967263)>>>0},
$isi:1},
lD:{"^":"a6;$ti",
P:function(a,b,c,d){return this.a.dB(a,d,c,!0===b)},
bG:function(a,b,c){return this.P(a,null,b,c)},
eb:function(a){return this.P(a,null,null,null)}},
fp:{"^":"f;az:a*"},
b8:{"^":"fp;E:b>,a,$ti",
cF:function(a){a.a0(this.b)}},
kW:{"^":"fp;V:b>,ab:c<,a",
cF:function(a){a.dz(this.b,this.c)}},
kV:{"^":"f;",
cF:function(a){a.aH()},
gaz:function(a){return},
saz:function(a,b){throw H.b(new P.Z("No events after a done."))}},
lu:{"^":"f;ar:a<",
bh:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.h2(new P.lv(this,a))
this.a=1},
dO:function(){if(this.a===1)this.a=3}},
lv:{"^":"h:0;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=J.dK(x)
z.b=w
if(w==null)z.c=null
x.cF(this.b)},
$isi:1},
fy:{"^":"lu;b,c,a,$ti",
ga9:function(a){return this.c==null},
q:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{J.ht(z,b)
this.c=b}}},
kX:{"^":"f;a,ar:b<,c",
dv:function(){if((this.b&2)!==0)return
var z=this.a
z.toString
P.aW(null,null,z,this.gh_())
this.b=(this.b|2)>>>0},
bb:function(a,b){this.b+=4},
R:function(a){return this.bb(a,null)},
af:function(a){var z=this.b
if(z>=4){z-=4
this.b=z
if(z<4&&(z&1)===0)this.dv()}},
aJ:function(a){return $.$get$aH()},
aH:[function(){var z=(this.b&4294967293)>>>0
this.b=z
if(z>=4)return
this.b=(z|1)>>>0
this.a.cI(this.c)},"$0","gh_",0,0,1]},
lE:{"^":"f;a,b,c,$ti"},
lV:{"^":"h:0;a,b,c",
$0:function(){return this.a.a7(this.b,this.c)},
$isi:1},
lU:{"^":"h:8;a,b",
$2:function(a,b){P.lS(this.a,this.b,a,b)},
$isi:1},
lX:{"^":"h:0;a,b",
$0:function(){return this.a.aq(this.b)},
$isi:1},
dp:{"^":"a6;$ti",
P:function(a,b,c,d){return this.fE(a,d,c,!0===b)},
bG:function(a,b,c){return this.P(a,null,b,c)},
fE:function(a,b,c,d){return P.l3(this,a,b,c,d,H.R(this,"dp",0),H.R(this,"dp",1))},
dh:function(a,b){b.aE(0,a)},
fN:function(a,b,c){c.bX(a,b)},
$asa6:function(a,b){return[b]}},
fq:{"^":"bz;x,y,a,b,c,d,e,f,r,$ti",
aE:function(a,b){if((this.e&2)!==0)return
this.ff(0,b)},
bX:function(a,b){if((this.e&2)!==0)return
this.fg(a,b)},
br:[function(){var z=this.y
if(z==null)return
z.R(0)},"$0","gbq",0,0,1],
bt:[function(){var z=this.y
if(z==null)return
z.af(0)},"$0","gbs",0,0,1],
cc:function(){var z=this.y
if(z!=null){this.y=null
return z.aJ(0)}return},
iu:[function(a){this.x.dh(a,this)},"$1","gfK",2,0,function(){return H.bi(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"fq")}],
iw:[function(a,b){this.x.fN(a,b,this)},"$2","gfM",4,0,16],
iv:[function(){this.d4()},"$0","gfL",0,0,1],
fs:function(a,b,c,d,e,f,g){this.y=this.x.a.bG(this.gfK(),this.gfL(),this.gfM())},
$asbz:function(a,b){return[b]},
v:{
l3:function(a,b,c,d,e,f,g){var z,y
z=$.q
y=e?1:0
y=new P.fq(a,null,null,null,null,z,y,null,null,[f,g])
y.bW(b,c,d,e,g)
y.fs(a,b,c,d,e,f,g)
return y}}},
lr:{"^":"dp;b,a,$ti",
dh:function(a,b){var z,y,x,w
z=null
try{z=this.b.$1(a)}catch(w){y=H.Q(w)
x=H.M(w)
P.lP(b,y,x)
return}b.aE(0,z)}},
c7:{"^":"f;V:a>,ab:b<",
k:function(a){return H.j(this.a)},
$isa_:1},
lO:{"^":"f;"},
m4:{"^":"h:0;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.cl()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.b(z)
x=H.b(z)
x.stack=J.au(y)
throw x},
$isi:1},
lx:{"^":"lO;",
cI:function(a){var z,y,x,w
try{if(C.e===$.q){x=a.$0()
return x}x=P.fI(null,null,this,a)
return x}catch(w){z=H.Q(w)
y=H.M(w)
x=P.bF(null,null,this,z,y)
return x}},
cK:function(a,b){var z,y,x,w
try{if(C.e===$.q){x=a.$1(b)
return x}x=P.fK(null,null,this,a,b)
return x}catch(w){z=H.Q(w)
y=H.M(w)
x=P.bF(null,null,this,z,y)
return x}},
ig:function(a,b,c){var z,y,x,w
try{if(C.e===$.q){x=a.$2(b,c)
return x}x=P.fJ(null,null,this,a,b,c)
return x}catch(w){z=H.Q(w)
y=H.M(w)
x=P.bF(null,null,this,z,y)
return x}},
cn:function(a,b){if(b)return new P.ly(this,a)
else return new P.lz(this,a)},
hc:function(a,b){return new P.lA(this,a)},
h:function(a,b){return},
eE:function(a){if($.q===C.e)return a.$0()
return P.fI(null,null,this,a)},
cJ:function(a,b){if($.q===C.e)return a.$1(b)
return P.fK(null,null,this,a,b)},
ie:function(a,b,c){if($.q===C.e)return a.$2(b,c)
return P.fJ(null,null,this,a,b,c)}},
ly:{"^":"h:0;a,b",
$0:function(){return this.a.cI(this.b)},
$isi:1},
lz:{"^":"h:0;a,b",
$0:function(){return this.a.eE(this.b)},
$isi:1},
lA:{"^":"h:2;a,b",
$1:function(a){return this.a.cK(this.b,a)},
$isi:1}}],["","",,P,{"^":"",
jv:function(a,b){return new H.G(0,null,null,null,null,null,0,[a,b])},
d6:function(){return new H.G(0,null,null,null,null,null,0,[null,null])},
a0:function(a){return H.mo(a,new H.G(0,null,null,null,null,null,0,[null,null]))},
jj:function(a,b,c){var z,y
if(P.du(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$bG()
y.push(a)
try{P.m0(a,z)}finally{if(0>=y.length)return H.a(y,-1)
y.pop()}y=P.f1(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
cd:function(a,b,c){var z,y,x
if(P.du(a))return b+"..."+c
z=new P.dj(b)
y=$.$get$bG()
y.push(a)
try{x=z
x.J=P.f1(x.gJ(),a,", ")}finally{if(0>=y.length)return H.a(y,-1)
y.pop()}y=z
y.J=y.gJ()+c
y=z.gJ()
return y.charCodeAt(0)==0?y:y},
du:function(a){var z,y
for(z=0;y=$.$get$bG(),z<y.length;++z)if(a===y[z])return!0
return!1},
m0:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gO(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.D())return
w=H.j(z.gH())
b.push(w)
y+=w.length+2;++x}if(!z.D()){if(x<=5)return
if(0>=b.length)return H.a(b,-1)
v=b.pop()
if(0>=b.length)return H.a(b,-1)
u=b.pop()}else{t=z.gH();++x
if(!z.D()){if(x<=4){b.push(H.j(t))
return}v=H.j(t)
if(0>=b.length)return H.a(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gH();++x
for(;z.D();t=s,s=r){r=z.gH();++x
if(x>100){while(!0){if(!(y>75&&x>3))break
if(0>=b.length)return H.a(b,-1)
y-=b.pop().length+2;--x}b.push("...")
return}}u=H.j(t)
v=H.j(s)
y+=v.length+u.length+4}}if(x>b.length+2){y+=5
q="..."}else q=null
while(!0){if(!(y>80&&b.length>3))break
if(0>=b.length)return H.a(b,-1)
y-=b.pop().length+2
if(q==null){y+=5
q="..."}}if(q!=null)b.push(q)
b.push(u)
b.push(v)},
ax:function(a,b,c,d){return new P.lk(0,null,null,null,null,null,0,[d])},
jz:function(a){var z,y,x
z={}
if(P.du(a))return"{...}"
y=new P.dj("")
try{$.$get$bG().push(a)
x=y
x.J=x.gJ()+"{"
z.a=!0
a.X(0,new P.jA(z,y))
z=y
z.J=z.gJ()+"}"}finally{z=$.$get$bG()
if(0>=z.length)return H.a(z,-1)
z.pop()}z=y.gJ()
return z.charCodeAt(0)==0?z:z},
fw:{"^":"G;a,b,c,d,e,f,r,$ti",
b7:function(a){return H.mL(a)&0x3ffffff},
b8:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].ge9()
if(x==null?b==null:x===b)return y}return-1},
v:{
ar:function(a,b){return new P.fw(0,null,null,null,null,null,0,[a,b])}}},
lk:{"^":"lh;a,b,c,d,e,f,r,$ti",
gO:function(a){var z=new P.dq(this,this.r,null,null)
z.c=this.e
return z},
gi:function(a){return this.a},
U:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.fD(b)},
fD:function(a){var z=this.d
if(z==null)return!1
return this.bn(z[this.bm(a)],a)>=0},
ed:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.U(0,a)?a:null
else return this.fS(a)},
fS:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.bm(a)]
x=this.bn(y,a)
if(x<0)return
return J.c_(y,x).gdd()},
q:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.d6(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.d6(x,b)}else return this.ac(0,b)},
ac:function(a,b){var z,y,x
z=this.d
if(z==null){z=P.lm()
this.d=z}y=this.bm(b)
x=z[y]
if(x==null)z[y]=[this.c3(b)]
else{if(this.bn(x,b)>=0)return!1
x.push(this.c3(b))}return!0},
a3:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.d7(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.d7(this.c,b)
else return this.fW(0,b)},
fW:function(a,b){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.bm(b)]
x=this.bn(y,b)
if(x<0)return!1
this.d8(y.splice(x,1)[0])
return!0},
aK:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
d6:function(a,b){if(a[b]!=null)return!1
a[b]=this.c3(b)
return!0},
d7:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.d8(z)
delete a[b]
return!0},
c3:function(a){var z,y
z=new P.ll(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
d8:function(a){var z,y
z=a.gfC()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
bm:function(a){return J.Y(a)&0x3ffffff},
bn:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.H(a[y].gdd(),b))return y
return-1},
$isd:1,
$asd:null,
v:{
lm:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
ll:{"^":"f;dd:a<,b,fC:c<"},
dq:{"^":"f;a,b,c,d",
gH:function(){return this.d},
D:function(){var z=this.a
if(this.b!==z.r)throw H.b(new P.a9(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
lh:{"^":"jZ;$ti"},
D:{"^":"f;$ti",
gO:function(a){return new H.eB(a,this.gi(a),0,null)},
w:function(a,b){return this.h(a,b)},
aO:function(a,b){return new H.d9(a,b,[H.R(a,"D",0),null])},
a2:function(a,b){var z,y,x
z=this.gi(a)
if(z===0)throw H.b(H.ah())
y=this.h(a,0)
for(x=1;x<z;++x){y=b.$2(y,this.h(a,x))
if(z!==this.gi(a))throw H.b(new P.a9(a))}return y},
hx:function(a,b,c){var z,y,x
z=this.gi(a)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.h(a,x))
if(z!==this.gi(a))throw H.b(new P.a9(a))}return y},
q:function(a,b){var z=this.gi(a)
this.si(a,z+1)
this.j(a,z,b)},
aa:["d1",function(a,b,c,d,e){var z,y,x,w,v
P.dc(b,c,this.gi(a),null,null,null)
z=c-b
if(z===0)return
if(H.bX(d,"$isc",[H.R(a,"D",0)],"$asc")){y=e
x=d}else{x=new H.kj(d,e,null,[H.R(d,"D",0)]).bd(0,!1)
y=0}w=J.O(x)
if(y+z>w.gi(x))throw H.b(H.ey())
if(y<b)for(v=z-1;v>=0;--v)this.j(a,b+v,w.h(x,y+v))
else for(v=0;v<z;++v)this.j(a,b+v,w.h(x,y+v))},function(a,b,c,d){return this.aa(a,b,c,d,0)},"bj",null,null,"giq",6,2,null],
bQ:function(a,b,c){var z,y,x
if(!!J.v(c).$isc)this.bj(a,b,b+c.length,c)
else for(z=c.length,y=0;y<z;++y,b=x){x=b+1
this.j(a,b,c[y])}},
k:function(a){return P.cd(a,"[","]")},
$isd:1,
$asd:null,
$isc:1,
$asc:null},
lN:{"^":"f;",
j:function(a,b,c){throw H.b(new P.n("Cannot modify unmodifiable map"))},
$isS:1,
$asS:null},
jx:{"^":"f;",
h:function(a,b){return this.a.h(0,b)},
j:function(a,b,c){this.a.j(0,b,c)},
X:function(a,b){this.a.X(0,b)},
gi:function(a){var z=this.a
return z.gi(z)},
k:function(a){return this.a.k(0)},
$isS:1,
$asS:null},
kG:{"^":"jx+lN;a,$ti",$isS:1,$asS:null},
jA:{"^":"h:3;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.J+=", "
z.a=!1
z=this.b
y=z.J+=H.j(a)
z.J=y+": "
z.J+=H.j(b)},
$isi:1},
jw:{"^":"bt;a,b,c,d,$ti",
gO:function(a){return new P.ln(this,this.c,this.d,this.b,null)},
ga9:function(a){return this.b===this.c},
gi:function(a){return(this.c-this.b&this.a.length-1)>>>0},
w:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(0>b||b>=z)H.E(P.F(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.a(y,w)
return y[w]},
q:function(a,b){this.ac(0,b)},
aK:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.a(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
k:function(a){return P.cd(this,"{","}")},
eC:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.b(H.ah());++this.d
y=this.a
x=y.length
if(z>=x)return H.a(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
ac:function(a,b){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.a(z,y)
z[y]=b
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.dg();++this.d},
dg:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.A(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.a.aa(y,0,w,z,x)
C.a.aa(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
fk:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.A(z,[b])},
$asd:null,
v:{
d7:function(a,b){var z=new P.jw(null,0,0,0,[b])
z.fk(a,b)
return z}}},
ln:{"^":"f;a,b,c,d,e",
gH:function(){return this.e},
D:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.E(new P.a9(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.a(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
k_:{"^":"f;$ti",
aO:function(a,b){return new H.e5(this,b,[H.z(this,0),null])},
k:function(a){return P.cd(this,"{","}")},
a2:function(a,b){var z,y
z=new P.dq(this,this.r,null,null)
z.c=this.e
if(!z.D())throw H.b(H.ah())
y=z.d
for(;z.D();)y=b.$2(y,z.d)
return y},
$isd:1,
$asd:null},
jZ:{"^":"k_;$ti"}}],["","",,P,{"^":"",
e7:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.au(a)
if(typeof a==="string")return JSON.stringify(a)
return P.i0(a)},
i0:function(a){var z=J.v(a)
if(!!z.$ish)return z.k(a)
return H.cm(a)},
b3:function(a){return new P.l2(a)},
ay:function(a,b,c,d){var z,y,x
if(c){if(a<0)H.E(P.a8("Length must be a non-negative integer: "+a))
z=H.A(new Array(a),[d])}else z=J.jl(a,d)
if(a!==0&&!0)for(y=z.length,x=0;x<y;++x)z[x]=b
return z},
aJ:function(a,b,c){var z,y
z=H.A([],[c])
for(y=J.c1(a);y.D();)z.push(y.gH())
return z},
bk:function(a){H.mO(H.j(a))},
bW:{"^":"f;"},
"+bool":0,
bK:{"^":"f;h3:a<,b",
A:function(a,b){if(b==null)return!1
if(!(b instanceof P.bK))return!1
return this.a===b.a&&this.b===b.b},
av:function(a,b){return C.d.av(this.a,b.gh3())},
gC:function(a){var z=this.a
return(z^C.d.cg(z,30))&1073741823},
k:function(a){var z,y,x,w,v,u,t
z=P.hU(H.jP(this))
y=P.bL(H.jN(this))
x=P.bL(H.jJ(this))
w=P.bL(H.jK(this))
v=P.bL(H.jM(this))
u=P.bL(H.jO(this))
t=P.hV(H.jL(this))
if(this.b)return z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t+"Z"
else return z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t},
q:function(a,b){return P.hT(this.a+b.ghI(),this.b)},
ghX:function(){return this.a},
d2:function(a,b){var z
if(!(Math.abs(this.a)>864e13))z=!1
else z=!0
if(z)throw H.b(P.a8(this.ghX()))},
v:{
hT:function(a,b){var z=new P.bK(a,b)
z.d2(a,b)
return z},
hU:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.j(z)
if(z>=10)return y+"00"+H.j(z)
return y+"000"+H.j(z)},
hV:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
bL:function(a){if(a>=10)return""+a
return"0"+a}}},
L:{"^":"am;"},
"+double":0,
b2:{"^":"f;aX:a<",
G:function(a,b){return new P.b2(this.a+b.gaX())},
B:function(a,b){return new P.b2(this.a-b.gaX())},
Z:function(a,b){return new P.b2(C.d.a4(this.a*b))},
bU:function(a,b){if(b===0)throw H.b(new P.io())
if(typeof b!=="number")return H.m(b)
return new P.b2(C.d.bU(this.a,b))},
ag:function(a,b){return C.d.ag(this.a,b.gaX())},
ap:function(a,b){return C.d.ap(this.a,b.gaX())},
ghI:function(){return C.d.al(this.a,1000)},
A:function(a,b){if(b==null)return!1
if(!(b instanceof P.b2))return!1
return this.a===b.a},
gC:function(a){return this.a&0x1FFFFFFF},
av:function(a,b){return C.d.av(this.a,b.gaX())},
k:function(a){var z,y,x,w,v
z=new P.i_()
y=this.a
if(y<0)return"-"+new P.b2(0-y).k(0)
x=z.$1(C.d.al(y,6e7)%60)
w=z.$1(C.d.al(y,1e6)%60)
v=new P.hZ().$1(y%1e6)
return""+C.d.al(y,36e8)+":"+H.j(x)+":"+H.j(w)+"."+H.j(v)}},
hZ:{"^":"h:9;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a},
$isi:1},
i_:{"^":"h:9;",
$1:function(a){if(a>=10)return""+a
return"0"+a},
$isi:1},
a_:{"^":"f;",
gab:function(){return H.M(this.$thrownJsError)}},
cl:{"^":"a_;",
k:function(a){return"Throw of null."}},
b_:{"^":"a_;a,b,u:c>,I:d>",
gc5:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gc4:function(){return""},
k:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.j(z)
w=this.gc5()+y+x
if(!this.a)return w
v=this.gc4()
u=P.e7(this.b)
return w+v+": "+H.j(u)},
v:{
a8:function(a){return new P.b_(!1,null,null,a)},
cO:function(a,b,c){return new P.b_(!0,a,b,c)}}},
eS:{"^":"b_;e,f,a,b,c,d",
gc5:function(){return"RangeError"},
gc4:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.j(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.j(z)
else if(x>z)y=": Not in range "+H.j(z)+".."+H.j(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.j(z)}return y},
v:{
bw:function(a,b,c){return new P.eS(null,null,!0,a,b,"Value not in range")},
aj:function(a,b,c,d,e){return new P.eS(b,c,!0,a,d,"Invalid value")},
dc:function(a,b,c,d,e,f){if(0>a||a>c)throw H.b(P.aj(a,0,c,"start",f))
if(a>b||b>c)throw H.b(P.aj(b,a,c,"end",f))
return b}}},
il:{"^":"b_;e,i:f>,a,b,c,d",
gc5:function(){return"RangeError"},
gc4:function(){if(J.bZ(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.j(z)},
v:{
F:function(a,b,c,d,e){var z=e!=null?e:J.at(b)
return new P.il(b,z,!0,a,c,"Index out of range")}}},
n:{"^":"a_;I:a>",
k:function(a){return"Unsupported operation: "+this.a}},
cr:{"^":"a_;I:a>",
k:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.j(z):"UnimplementedError"}},
Z:{"^":"a_;I:a>",
k:function(a){return"Bad state: "+this.a}},
a9:{"^":"a_;a",
k:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.j(P.e7(z))+"."}},
jH:{"^":"f;",
k:function(a){return"Out of Memory"},
gab:function(){return},
$isa_:1},
f_:{"^":"f;",
k:function(a){return"Stack Overflow"},
gab:function(){return},
$isa_:1},
hS:{"^":"a_;a",
k:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+H.j(z)+"' during its initialization"}},
l2:{"^":"f;I:a>",
k:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.j(z)},
$isee:1},
io:{"^":"f;",
k:function(a){return"IntegerDivisionByZeroException"},
$isee:1},
i1:{"^":"f;u:a>,dj",
k:function(a){return"Expando:"+H.j(this.a)},
h:function(a,b){var z,y
z=this.dj
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.E(P.cO(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.db(b,"expando$values")
return y==null?null:H.db(y,z)},
j:function(a,b,c){var z,y
z=this.dj
if(typeof z!=="string")z.set(b,c)
else{y=H.db(b,"expando$values")
if(y==null){y=new P.f()
H.eR(b,"expando$values",y)}H.eR(y,z,c)}}},
l:{"^":"am;"},
"+int":0,
ac:{"^":"f;$ti",
aO:function(a,b){return H.cg(this,b,H.R(this,"ac",0),null)},
a2:function(a,b){var z,y
z=this.gO(this)
if(!z.D())throw H.b(H.ah())
y=z.gH()
for(;z.D();)y=b.$2(y,z.gH())
return y},
bd:function(a,b){return P.aJ(this,!0,H.R(this,"ac",0))},
cM:function(a){return this.bd(a,!0)},
gi:function(a){var z,y
z=this.gO(this)
for(y=0;z.D();)++y
return y},
ga9:function(a){return!this.gO(this).D()},
w:function(a,b){var z,y,x
if(b<0)H.E(P.aj(b,0,null,"index",null))
for(z=this.gO(this),y=0;z.D();){x=z.gH()
if(b===y)return x;++y}throw H.b(P.F(b,this,"index",null,y))},
k:function(a){return P.jj(this,"(",")")}},
jk:{"^":"f;"},
c:{"^":"f;$ti",$isd:1,$asd:null,$asc:null},
"+List":0,
S:{"^":"f;$ti",$asS:null},
ck:{"^":"f;",
gC:function(a){return P.f.prototype.gC.call(this,this)},
k:function(a){return"null"}},
"+Null":0,
am:{"^":"f;"},
"+num":0,
f:{"^":";",
A:function(a,b){return this===b},
gC:function(a){return H.aA(this)},
k:function(a){return H.cm(this)},
toString:function(){return this.k(this)}},
jB:{"^":"f;"},
b5:{"^":"f;"},
f0:{"^":"f;a,b",
cX:function(a){var z,y
if(this.b!=null){z=this.a
y=J.af($.aN.$0(),this.b)
if(typeof y!=="number")return H.m(y)
this.a=z+y
this.b=null}}},
u:{"^":"f;"},
"+String":0,
dj:{"^":"f;J<",
gi:function(a){return this.J.length},
k:function(a){var z=this.J
return z.charCodeAt(0)==0?z:z},
v:{
f1:function(a,b,c){var z=J.c1(b)
if(!z.D())return a
if(c.length===0){do a+=H.j(z.gH())
while(z.D())}else{a+=H.j(z.gH())
for(;z.D();)a=a+c+H.j(z.gH())}return a}}}}],["","",,W,{"^":"",
dV:function(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,function(b,c){return c.toUpperCase()})},
nD:[function(a){return"wheel"},"$1","mr",2,0,30],
aV:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
fu:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
fM:function(a){var z=$.q
if(z===C.e)return a
return z.hc(a,!0)},
x:{"^":"e6;","%":"HTMLBRElement|HTMLBaseElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLDivElement|HTMLFontElement|HTMLFrameElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLLabelElement|HTMLLegendElement|HTMLMarqueeElement|HTMLModElement|HTMLOptGroupElement|HTMLParagraphElement|HTMLPictureElement|HTMLPreElement|HTMLQuoteElement|HTMLShadowElement|HTMLSpanElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableElement|HTMLTableHeaderCellElement|HTMLTableRowElement|HTMLTableSectionElement|HTMLTemplateElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement;HTMLElement"},
n2:{"^":"x;l:type%",
k:function(a){return String(a)},
$ise:1,
"%":"HTMLAnchorElement"},
n6:{"^":"ag;I:message=","%":"ApplicationCacheErrorEvent"},
n7:{"^":"x;",
k:function(a){return String(a)},
$ise:1,
"%":"HTMLAreaElement"},
aF:{"^":"e;",$isf:1,"%":"AudioTrack"},
nb:{"^":"eb;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.F(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(new P.n("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.n("Cannot resize immutable List."))},
w:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isr:1,
$asr:function(){return[W.aF]},
$isd:1,
$asd:function(){return[W.aF]},
$ist:1,
$ast:function(){return[W.aF]},
$isc:1,
$asc:function(){return[W.aF]},
"%":"AudioTrackList"},
e8:{"^":"w+D;",$isd:1,
$asd:function(){return[W.aF]},
$isc:1,
$asc:function(){return[W.aF]}},
eb:{"^":"e8+I;",$isd:1,
$asd:function(){return[W.aF]},
$isc:1,
$asc:function(){return[W.aF]}},
nc:{"^":"w;ay:level=","%":"BatteryManager"},
cQ:{"^":"e;l:type=",$iscQ:1,"%":";Blob"},
ne:{"^":"x;",$ise:1,"%":"HTMLBodyElement"},
nf:{"^":"x;u:name=,l:type%,E:value=","%":"HTMLButtonElement"},
ng:{"^":"x;L:height},K:width%",
eX:function(a,b,c){return a.getContext(b)},
eW:function(a,b){return this.eX(a,b,null)},
"%":"HTMLCanvasElement"},
nh:{"^":"B;i:length=",$ise:1,"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
ni:{"^":"w;",$ise:1,"%":"CompositorWorker"},
nk:{"^":"e;bk:speed=","%":"Coordinates"},
nl:{"^":"e;u:name=,l:type=","%":"Credential|FederatedCredential|PasswordCredential"},
nm:{"^":"e;l:type=","%":"CryptoKey"},
nn:{"^":"aw;u:name=","%":"CSSKeyframesRule|MozCSSKeyframesRule|WebKitCSSKeyframesRule"},
aw:{"^":"e;l:type=",$isf:1,"%":"CSSCharsetRule|CSSFontFaceRule|CSSGroupingRule|CSSImportRule|CSSKeyframeRule|CSSMediaRule|CSSNamespaceRule|CSSPageRule|CSSStyleRule|CSSSupportsRule|CSSViewportRule|MozCSSKeyframeRule|WebKitCSSKeyframeRule;CSSRule"},
no:{"^":"ip;i:length=",
eY:function(a,b){var z=this.fJ(a,b)
return z!=null?z:""},
fJ:function(a,b){if(W.dV(b) in a)return a.getPropertyValue(b)
else return a.getPropertyValue(P.e2()+b)},
fv:function(a,b){var z,y
z=$.$get$dW()
y=z[b]
if(typeof y==="string")return y
y=W.dV(b) in a?b:P.e2()+b
z[b]=y
return y},
h1:function(a,b,c,d){a.setProperty(b,c,d)},
sbz:function(a,b){a.color=b},
gae:function(a){return a.position},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
ip:{"^":"e+hQ;"},
hQ:{"^":"f;",
sbz:function(a,b){this.h1(a,this.fv(a,"color"),b,"")},
gae:function(a){return this.eY(a,"position")}},
nq:{"^":"e;l:type=","%":"DataTransferItem"},
nr:{"^":"e;i:length=",
dH:function(a,b,c){return a.add(b,c)},
q:function(a,b){return a.add(b)},
h:function(a,b){return a[b]},
"%":"DataTransferItemList"},
nt:{"^":"e;m:x=,n:y=","%":"DeviceAcceleration"},
nu:{"^":"ag;E:value=","%":"DeviceLightEvent"},
nv:{"^":"B;",$ise:1,"%":"DocumentFragment|ShadowRoot"},
nw:{"^":"e;I:message=,u:name=","%":"DOMError|FileError"},
nx:{"^":"e;I:message=",
gu:function(a){var z=a.name
if(P.e3()===!0&&z==="SECURITY_ERR")return"SecurityError"
if(P.e3()===!0&&z==="SYNTAX_ERR")return"SyntaxError"
return z},
k:function(a){return String(a)},
"%":"DOMException"},
ny:{"^":"e;",
eh:[function(a,b){return a.next(b)},function(a){return a.next()},"hZ","$1","$0","gaz",0,2,17],
"%":"Iterator"},
nz:{"^":"hW;",
gat:function(a){return a.b},
"%":"DOMMatrix"},
hW:{"^":"e;",
gat:function(a){return a.b},
"%":";DOMMatrixReadOnly"},
nA:{"^":"hX;",
gm:function(a){return a.x},
gn:function(a){return a.y},
gao:function(a){return a.z},
"%":"DOMPoint"},
hX:{"^":"e;",
gm:function(a){return a.x},
gn:function(a){return a.y},
"%":";DOMPointReadOnly"},
hY:{"^":"e;",
k:function(a){return"Rectangle ("+H.j(a.left)+", "+H.j(a.top)+") "+H.j(this.gK(a))+" x "+H.j(this.gL(a))},
A:function(a,b){var z
if(b==null)return!1
z=J.v(b)
if(!z.$isW)return!1
return a.left===z.gb9(b)&&a.top===z.gbe(b)&&this.gK(a)===z.gK(b)&&this.gL(a)===z.gL(b)},
gC:function(a){var z,y,x,w
z=a.left
y=a.top
x=this.gK(a)
w=this.gL(a)
return W.fu(W.aV(W.aV(W.aV(W.aV(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),w&0x1FFFFFFF))},
gco:function(a){return a.bottom},
gL:function(a){return a.height},
gb9:function(a){return a.left},
gcH:function(a){return a.right},
gbe:function(a){return a.top},
gK:function(a){return a.width},
gm:function(a){return a.x},
gn:function(a){return a.y},
$isW:1,
$asW:I.X,
"%":";DOMRectReadOnly"},
nB:{"^":"iK;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.F(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(new P.n("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.n("Cannot resize immutable List."))},
w:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isr:1,
$asr:function(){return[P.u]},
$isd:1,
$asd:function(){return[P.u]},
$ist:1,
$ast:function(){return[P.u]},
$isc:1,
$asc:function(){return[P.u]},
"%":"DOMStringList"},
iq:{"^":"e+D;",$isd:1,
$asd:function(){return[P.u]},
$isc:1,
$asc:function(){return[P.u]}},
iK:{"^":"iq+I;",$isd:1,
$asd:function(){return[P.u]},
$isc:1,
$asc:function(){return[P.u]}},
nC:{"^":"e;i:length=,E:value=",
q:function(a,b){return a.add(b)},
"%":"DOMTokenList"},
e6:{"^":"B;",
gaL:function(a){return P.jU(a.clientLeft,a.clientTop,a.clientWidth,a.clientHeight,null)},
k:function(a){return a.localName},
gei:function(a){return new W.K(a,"change",!1,[W.ag])},
gej:function(a){return new W.K(a,"click",!1,[W.a1])},
gek:function(a){return new W.K(a,"mousedown",!1,[W.a1])},
gel:function(a){return new W.K(a,"mousemove",!1,[W.a1])},
gem:function(a){return new W.K(a,"mouseout",!1,[W.a1])},
gen:function(a){return new W.K(a,"mouseup",!1,[W.a1])},
geo:function(a){return new W.K(a,W.mr().$1(a),!1,[W.bT])},
ges:function(a){return new W.K(a,"touchcancel",!1,[W.ad])},
geu:function(a){return new W.K(a,"touchend",!1,[W.ad])},
gev:function(a){return new W.K(a,"touchmove",!1,[W.ad])},
gew:function(a){return new W.K(a,"touchstart",!1,[W.ad])},
$ise:1,
"%":";Element"},
nE:{"^":"x;L:height},u:name=,l:type%,K:width%","%":"HTMLEmbedElement"},
nF:{"^":"e;u:name=","%":"DirectoryEntry|Entry|FileEntry"},
nG:{"^":"ag;V:error=,I:message=","%":"ErrorEvent"},
ag:{"^":"e;l:type=",
i3:function(a){return a.preventDefault()},
"%":"AnimationEvent|AnimationPlayerEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|BlobEvent|ClipboardEvent|CloseEvent|CustomEvent|DeviceMotionEvent|DeviceOrientationEvent|ExtendableEvent|ExtendableMessageEvent|FetchEvent|FontFaceSetLoadEvent|GamepadEvent|GeofencingEvent|HashChangeEvent|IDBVersionChangeEvent|InstallEvent|MIDIConnectionEvent|MIDIMessageEvent|MediaEncryptedEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|MessageEvent|NotificationEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PopStateEvent|PresentationConnectionAvailableEvent|ProgressEvent|PromiseRejectionEvent|PushEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|ServicePortConnectEvent|ServiceWorkerMessageEvent|SpeechRecognitionEvent|StorageEvent|SyncEvent|TrackEvent|TransitionEvent|USBConnectionEvent|WebGLContextEvent|WebKitTransitionEvent;Event|InputEvent"},
w:{"^":"e;",
fu:function(a,b,c,d){return a.addEventListener(b,H.aE(c,1),!1)},
fX:function(a,b,c,d){return a.removeEventListener(b,H.aE(c,1),!1)},
$isf:1,
$isw:1,
"%":"Animation|ApplicationCache|AudioContext|BluetoothDevice|BluetoothRemoteGATTCharacteristic|CanvasCaptureMediaStreamTrack|CrossOriginServiceWorkerClient|DOMApplicationCache|EventSource|MIDIAccess|MediaKeySession|MediaQueryList|MediaRecorder|MediaSource|MediaStream|MediaStreamTrack|MessagePort|Notification|OfflineAudioContext|OfflineResourceList|Performance|PermissionStatus|PresentationReceiver|PresentationRequest|RTCDTMFSender|RTCPeerConnection|ServicePortCollection|ServiceWorkerContainer|ServiceWorkerRegistration|SpeechRecognition|SpeechSynthesis|SpeechSynthesisUtterance|USB|WorkerPerformance|mozRTCPeerConnection|webkitAudioContext|webkitRTCPeerConnection;EventTarget;e8|eb|e9|ec|ea|ed"},
nZ:{"^":"x;u:name=,l:type=","%":"HTMLFieldSetElement"},
ap:{"^":"cQ;u:name=",$isf:1,$isap:1,"%":"File"},
eg:{"^":"iL;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.F(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(new P.n("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.n("Cannot resize immutable List."))},
w:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isr:1,
$asr:function(){return[W.ap]},
$isd:1,
$asd:function(){return[W.ap]},
$ist:1,
$ast:function(){return[W.ap]},
$isc:1,
$asc:function(){return[W.ap]},
$iseg:1,
"%":"FileList"},
ir:{"^":"e+D;",$isd:1,
$asd:function(){return[W.ap]},
$isc:1,
$asc:function(){return[W.ap]}},
iL:{"^":"ir+I;",$isd:1,
$asd:function(){return[W.ap]},
$isc:1,
$asc:function(){return[W.ap]}},
o_:{"^":"w;V:error=","%":"FileReader"},
o0:{"^":"e;l:type=","%":"Stream"},
o1:{"^":"e;u:name=","%":"DOMFileSystem"},
o2:{"^":"w;V:error=,i:length=,ae:position=","%":"FileWriter"},
o4:{"^":"w;",
q:function(a,b){return a.add(b)},
"%":"FontFaceSet"},
o6:{"^":"x;i:length=,u:name=","%":"HTMLFormElement"},
aI:{"^":"e;aM:index=",$isf:1,"%":"Gamepad"},
o7:{"^":"e;E:value=","%":"GamepadButton"},
o8:{"^":"x;bz:color}","%":"HTMLHRElement"},
o9:{"^":"e;i:length=","%":"History"},
oa:{"^":"iM;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.F(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(new P.n("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.n("Cannot resize immutable List."))},
w:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isr:1,
$asr:function(){return[W.B]},
$isd:1,
$asd:function(){return[W.B]},
$ist:1,
$ast:function(){return[W.B]},
$isc:1,
$asc:function(){return[W.B]},
"%":"HTMLCollection|HTMLFormControlsCollection|HTMLOptionsCollection"},
is:{"^":"e+D;",$isd:1,
$asd:function(){return[W.B]},
$isc:1,
$asc:function(){return[W.B]}},
iM:{"^":"is+I;",$isd:1,
$asd:function(){return[W.B]},
$isc:1,
$asc:function(){return[W.B]}},
ob:{"^":"ik;",
N:function(a,b){return a.send(b)},
"%":"XMLHttpRequest"},
ik:{"^":"w;","%":"XMLHttpRequestUpload;XMLHttpRequestEventTarget"},
oc:{"^":"x;L:height},u:name=,K:width%","%":"HTMLIFrameElement"},
er:{"^":"e;",$iser:1,"%":"ImageData"},
od:{"^":"x;L:height},K:width%",
a8:function(a,b){return a.complete.$1(b)},
"%":"HTMLImageElement"},
of:{"^":"x;L:height},u:name=,l:type%,E:value=,K:width%",$ise:1,"%":"HTMLInputElement"},
oi:{"^":"x;u:name=,l:type=","%":"HTMLKeygenElement"},
oj:{"^":"x;E:value=","%":"HTMLLIElement"},
jr:{"^":"dk;",
q:function(a,b){return a.add(b)},
"%":"CalcLength;LengthValue"},
ol:{"^":"x;l:type%","%":"HTMLLinkElement"},
om:{"^":"e;",
k:function(a){return String(a)},
"%":"Location"},
on:{"^":"x;u:name=","%":"HTMLMapElement"},
oq:{"^":"co;at:b=","%":"Matrix"},
jC:{"^":"x;V:error=","%":"HTMLAudioElement;HTMLMediaElement"},
os:{"^":"ag;I:message=","%":"MediaKeyMessageEvent"},
ot:{"^":"e;i:length=","%":"MediaList"},
ov:{"^":"x;l:type%","%":"HTMLMenuElement"},
ow:{"^":"x;l:type%","%":"HTMLMenuItemElement"},
ox:{"^":"x;u:name=","%":"HTMLMetaElement"},
oy:{"^":"x;E:value=","%":"HTMLMeterElement"},
oz:{"^":"jD;",
ip:function(a,b,c){return a.send(b,c)},
N:function(a,b){return a.send(b)},
"%":"MIDIOutput"},
jD:{"^":"w;u:name=,l:type=","%":"MIDIInput;MIDIPort"},
aL:{"^":"e;l:type=",$isf:1,"%":"MimeType"},
oA:{"^":"iW;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.F(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(new P.n("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.n("Cannot resize immutable List."))},
w:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isr:1,
$asr:function(){return[W.aL]},
$isd:1,
$asd:function(){return[W.aL]},
$ist:1,
$ast:function(){return[W.aL]},
$isc:1,
$asc:function(){return[W.aL]},
"%":"MimeTypeArray"},
iC:{"^":"e+D;",$isd:1,
$asd:function(){return[W.aL]},
$isc:1,
$asc:function(){return[W.aL]}},
iW:{"^":"iC+I;",$isd:1,
$asd:function(){return[W.aL]},
$isc:1,
$asc:function(){return[W.aL]}},
a1:{"^":"ff;",
gaL:function(a){return new P.bv(a.clientX,a.clientY,[null])},
$isf:1,
$isa1:1,
"%":"PointerEvent;DragEvent|MouseEvent"},
oB:{"^":"e;l:type=","%":"MutationRecord"},
oJ:{"^":"e;a_:storage=",$ise:1,"%":"Navigator"},
oK:{"^":"e;I:message=,u:name=","%":"NavigatorUserMediaError"},
oL:{"^":"w;l:type=","%":"NetworkInformation"},
B:{"^":"w;",
k:function(a){var z=a.nodeValue
return z==null?this.fc(a):z},
$isf:1,
$isw:1,
"%":"Document|HTMLDocument|XMLDocument;Node"},
oM:{"^":"iX;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.F(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(new P.n("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.n("Cannot resize immutable List."))},
w:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isr:1,
$asr:function(){return[W.B]},
$isd:1,
$asd:function(){return[W.B]},
$ist:1,
$ast:function(){return[W.B]},
$isc:1,
$asc:function(){return[W.B]},
"%":"NodeList|RadioNodeList"},
iD:{"^":"e+D;",$isd:1,
$asd:function(){return[W.B]},
$isc:1,
$asc:function(){return[W.B]}},
iX:{"^":"iD+I;",$isd:1,
$asd:function(){return[W.B]},
$isc:1,
$asc:function(){return[W.B]}},
oO:{"^":"dk;E:value=","%":"NumberValue"},
oP:{"^":"x;l:type%","%":"HTMLOListElement"},
oQ:{"^":"x;L:height},u:name=,l:type%,K:width%","%":"HTMLObjectElement"},
oS:{"^":"x;aM:index=,E:value=","%":"HTMLOptionElement"},
oU:{"^":"x;u:name=,l:type=,E:value=","%":"HTMLOutputElement"},
oV:{"^":"x;u:name=,E:value=","%":"HTMLParamElement"},
oW:{"^":"e;",$ise:1,"%":"Path2D"},
oY:{"^":"e;u:name=","%":"PerformanceCompositeTiming|PerformanceEntry|PerformanceMark|PerformanceMeasure|PerformanceRenderTiming|PerformanceResourceTiming"},
oZ:{"^":"e;l:type=","%":"PerformanceNavigation"},
p_:{"^":"co;i:length=","%":"Perspective"},
aM:{"^":"e;i:length=,u:name=",$isf:1,"%":"Plugin"},
p0:{"^":"iY;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.F(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(new P.n("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.n("Cannot resize immutable List."))},
w:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isr:1,
$asr:function(){return[W.aM]},
$isd:1,
$asd:function(){return[W.aM]},
$ist:1,
$ast:function(){return[W.aM]},
$isc:1,
$asc:function(){return[W.aM]},
"%":"PluginArray"},
iE:{"^":"e+D;",$isd:1,
$asd:function(){return[W.aM]},
$isc:1,
$asc:function(){return[W.aM]}},
iY:{"^":"iE+I;",$isd:1,
$asd:function(){return[W.aM]},
$isc:1,
$asc:function(){return[W.aM]}},
p3:{"^":"e;I:message=","%":"PositionError"},
p4:{"^":"dk;m:x=,n:y=","%":"PositionValue"},
p5:{"^":"w;E:value=","%":"PresentationAvailability"},
p6:{"^":"w;",
N:function(a,b){return a.send(b)},
"%":"PresentationConnection"},
p7:{"^":"ag;I:message=","%":"PresentationConnectionCloseEvent"},
p9:{"^":"x;ae:position=,E:value=","%":"HTMLProgressElement"},
pf:{"^":"co;m:x=,n:y=","%":"Rotation"},
pg:{"^":"w;",
N:function(a,b){return a.send(b)},
"%":"DataChannel|RTCDataChannel"},
ph:{"^":"e;l:type%","%":"RTCSessionDescription|mozRTCSessionDescription"},
pi:{"^":"e;l:type=","%":"RTCStatsReport"},
pj:{"^":"w;l:type=","%":"ScreenOrientation"},
pk:{"^":"x;l:type%","%":"HTMLScriptElement"},
pm:{"^":"e;dX:deltaY=","%":"ScrollState"},
pn:{"^":"x;i:length=,u:name=,l:type=,E:value=","%":"HTMLSelectElement"},
po:{"^":"e;l:type=","%":"Selection"},
pp:{"^":"e;u:name=","%":"ServicePort"},
pq:{"^":"w;",$ise:1,"%":"SharedWorker"},
pr:{"^":"kI;u:name=","%":"SharedWorkerGlobalScope"},
ps:{"^":"jr;l:type=,E:value=","%":"SimpleLength"},
pv:{"^":"x;u:name=","%":"HTMLSlotElement"},
aO:{"^":"w;",$isf:1,$isw:1,"%":"SourceBuffer"},
pw:{"^":"ec;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.F(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(new P.n("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.n("Cannot resize immutable List."))},
w:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isr:1,
$asr:function(){return[W.aO]},
$isd:1,
$asd:function(){return[W.aO]},
$ist:1,
$ast:function(){return[W.aO]},
$isc:1,
$asc:function(){return[W.aO]},
"%":"SourceBufferList"},
e9:{"^":"w+D;",$isd:1,
$asd:function(){return[W.aO]},
$isc:1,
$asc:function(){return[W.aO]}},
ec:{"^":"e9+I;",$isd:1,
$asd:function(){return[W.aO]},
$isc:1,
$asc:function(){return[W.aO]}},
px:{"^":"x;l:type%","%":"HTMLSourceElement"},
aP:{"^":"e;",$isf:1,"%":"SpeechGrammar"},
py:{"^":"iZ;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.F(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(new P.n("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.n("Cannot resize immutable List."))},
w:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isr:1,
$asr:function(){return[W.aP]},
$isd:1,
$asd:function(){return[W.aP]},
$ist:1,
$ast:function(){return[W.aP]},
$isc:1,
$asc:function(){return[W.aP]},
"%":"SpeechGrammarList"},
iF:{"^":"e+D;",$isd:1,
$asd:function(){return[W.aP]},
$isc:1,
$asc:function(){return[W.aP]}},
iZ:{"^":"iF+I;",$isd:1,
$asd:function(){return[W.aP]},
$isc:1,
$asc:function(){return[W.aP]}},
pz:{"^":"ag;V:error=,I:message=","%":"SpeechRecognitionError"},
aQ:{"^":"e;i:length=",$isf:1,"%":"SpeechRecognitionResult"},
pA:{"^":"ag;u:name=","%":"SpeechSynthesisEvent"},
pB:{"^":"e;u:name=","%":"SpeechSynthesisVoice"},
pE:{"^":"e;",
h:function(a,b){return a.getItem(b)},
j:function(a,b,c){a.setItem(b,c)},
X:function(a,b){var z,y
for(z=0;!0;++z){y=a.key(z)
if(y==null)return
b.$2(y,a.getItem(y))}},
gi:function(a){return a.length},
$isS:1,
$asS:function(){return[P.u,P.u]},
"%":"Storage"},
pH:{"^":"x;l:type%","%":"HTMLStyleElement"},
pJ:{"^":"e;l:type=","%":"StyleMedia"},
aR:{"^":"e;l:type=",$isf:1,"%":"CSSStyleSheet|StyleSheet"},
dk:{"^":"e;","%":"KeywordValue|TransformValue;StyleValue"},
pM:{"^":"x;u:name=,l:type=,E:value=","%":"HTMLTextAreaElement"},
aS:{"^":"w;",$isf:1,$isw:1,"%":"TextTrack"},
aD:{"^":"w;",$isf:1,$isw:1,"%":";TextTrackCue"},
pP:{"^":"j_;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.F(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(new P.n("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.n("Cannot resize immutable List."))},
w:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isr:1,
$asr:function(){return[W.aD]},
$isd:1,
$asd:function(){return[W.aD]},
$ist:1,
$ast:function(){return[W.aD]},
$isc:1,
$asc:function(){return[W.aD]},
"%":"TextTrackCueList"},
iG:{"^":"e+D;",$isd:1,
$asd:function(){return[W.aD]},
$isc:1,
$asc:function(){return[W.aD]}},
j_:{"^":"iG+I;",$isd:1,
$asd:function(){return[W.aD]},
$isc:1,
$asc:function(){return[W.aD]}},
pQ:{"^":"ed;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.F(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(new P.n("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.n("Cannot resize immutable List."))},
w:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isr:1,
$asr:function(){return[W.aS]},
$isd:1,
$asd:function(){return[W.aS]},
$ist:1,
$ast:function(){return[W.aS]},
$isc:1,
$asc:function(){return[W.aS]},
"%":"TextTrackList"},
ea:{"^":"w+D;",$isd:1,
$asd:function(){return[W.aS]},
$isc:1,
$asc:function(){return[W.aS]}},
ed:{"^":"ea+I;",$isd:1,
$asd:function(){return[W.aS]},
$isc:1,
$asc:function(){return[W.aS]}},
pR:{"^":"e;i:length=","%":"TimeRanges"},
aT:{"^":"e;",
gaL:function(a){return new P.bv(C.b.a4(a.clientX),C.b.a4(a.clientY),[null])},
$isf:1,
"%":"Touch"},
ad:{"^":"ff;eG:targetTouches=",$isf:1,$isad:1,"%":"TouchEvent"},
kp:{"^":"j0;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.F(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(new P.n("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.n("Cannot resize immutable List."))},
gaj:function(a){if(a.length>0)return a[0]
throw H.b(new P.Z("No elements"))},
gaN:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.b(new P.Z("No elements"))},
w:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isr:1,
$asr:function(){return[W.aT]},
$isd:1,
$asd:function(){return[W.aT]},
$ist:1,
$ast:function(){return[W.aT]},
$isc:1,
$asc:function(){return[W.aT]},
"%":"TouchList"},
iH:{"^":"e+D;",$isd:1,
$asd:function(){return[W.aT]},
$isc:1,
$asc:function(){return[W.aT]}},
j0:{"^":"iH+I;",$isd:1,
$asd:function(){return[W.aT]},
$isc:1,
$asc:function(){return[W.aT]}},
pS:{"^":"e;l:type=","%":"TrackDefault"},
pT:{"^":"e;i:length=","%":"TrackDefaultList"},
co:{"^":"e;","%":"Skew;TransformComponent"},
pW:{"^":"co;m:x=,n:y=","%":"Translation"},
ff:{"^":"ag;","%":"CompositionEvent|FocusEvent|KeyboardEvent|SVGZoomEvent|TextEvent;UIEvent"},
pX:{"^":"e;",
k:function(a){return String(a)},
$ise:1,
"%":"URL"},
pZ:{"^":"e;ae:position=","%":"VRPositionState"},
q_:{"^":"jC;L:height},K:width%","%":"HTMLVideoElement"},
q0:{"^":"w;i:length=","%":"VideoTrackList"},
q3:{"^":"aD;ae:position=","%":"VTTCue"},
q4:{"^":"e;i:length=","%":"VTTRegionList"},
q5:{"^":"w;",
N:function(a,b){return a.send(b)},
"%":"WebSocket"},
bT:{"^":"a1;",
gdX:function(a){if(a.deltaY!==undefined)return a.deltaY
throw H.b(new P.n("deltaY is not supported"))},
$isf:1,
$isa1:1,
$isbT:1,
"%":"WheelEvent"},
kH:{"^":"w;u:name=",
fY:function(a,b){return a.requestAnimationFrame(H.aE(b,1))},
fH:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
$ise:1,
"%":"DOMWindow|Window"},
q6:{"^":"w;",$ise:1,"%":"Worker"},
kI:{"^":"w;",$ise:1,"%":"CompositorWorkerGlobalScope|DedicatedWorkerGlobalScope|ServiceWorkerGlobalScope;WorkerGlobalScope"},
qa:{"^":"B;u:name=,E:value=","%":"Attr"},
qb:{"^":"e;co:bottom=,L:height=,b9:left=,cH:right=,be:top=,K:width=",
k:function(a){return"Rectangle ("+H.j(a.left)+", "+H.j(a.top)+") "+H.j(a.width)+" x "+H.j(a.height)},
A:function(a,b){var z,y,x
if(b==null)return!1
z=J.v(b)
if(!z.$isW)return!1
y=a.left
x=z.gb9(b)
if(y==null?x==null:y===x){y=a.top
x=z.gbe(b)
if(y==null?x==null:y===x){y=a.width
x=z.gK(b)
if(y==null?x==null:y===x){y=a.height
z=z.gL(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gC:function(a){var z,y,x,w
z=J.Y(a.left)
y=J.Y(a.top)
x=J.Y(a.width)
w=J.Y(a.height)
return W.fu(W.aV(W.aV(W.aV(W.aV(0,z),y),x),w))},
$isW:1,
$asW:I.X,
"%":"ClientRect"},
qc:{"^":"j1;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.F(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(new P.n("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.n("Cannot resize immutable List."))},
w:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isr:1,
$asr:function(){return[P.W]},
$isd:1,
$asd:function(){return[P.W]},
$ist:1,
$ast:function(){return[P.W]},
$isc:1,
$asc:function(){return[P.W]},
"%":"ClientRectList|DOMRectList"},
iI:{"^":"e+D;",$isd:1,
$asd:function(){return[P.W]},
$isc:1,
$asc:function(){return[P.W]}},
j1:{"^":"iI+I;",$isd:1,
$asd:function(){return[P.W]},
$isc:1,
$asc:function(){return[P.W]}},
qd:{"^":"j2;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.F(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(new P.n("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.n("Cannot resize immutable List."))},
w:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isr:1,
$asr:function(){return[W.aw]},
$isd:1,
$asd:function(){return[W.aw]},
$ist:1,
$ast:function(){return[W.aw]},
$isc:1,
$asc:function(){return[W.aw]},
"%":"CSSRuleList"},
iJ:{"^":"e+D;",$isd:1,
$asd:function(){return[W.aw]},
$isc:1,
$asc:function(){return[W.aw]}},
j2:{"^":"iJ+I;",$isd:1,
$asd:function(){return[W.aw]},
$isc:1,
$asc:function(){return[W.aw]}},
qe:{"^":"B;",$ise:1,"%":"DocumentType"},
qf:{"^":"hY;",
gL:function(a){return a.height},
gK:function(a){return a.width},
gm:function(a){return a.x},
gn:function(a){return a.y},
"%":"DOMRect"},
qg:{"^":"iN;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.F(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(new P.n("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.n("Cannot resize immutable List."))},
w:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isr:1,
$asr:function(){return[W.aI]},
$isd:1,
$asd:function(){return[W.aI]},
$ist:1,
$ast:function(){return[W.aI]},
$isc:1,
$asc:function(){return[W.aI]},
"%":"GamepadList"},
it:{"^":"e+D;",$isd:1,
$asd:function(){return[W.aI]},
$isc:1,
$asc:function(){return[W.aI]}},
iN:{"^":"it+I;",$isd:1,
$asd:function(){return[W.aI]},
$isc:1,
$asc:function(){return[W.aI]}},
qi:{"^":"x;",$ise:1,"%":"HTMLFrameSetElement"},
qj:{"^":"iO;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.F(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(new P.n("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.n("Cannot resize immutable List."))},
w:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isr:1,
$asr:function(){return[W.B]},
$isd:1,
$asd:function(){return[W.B]},
$ist:1,
$ast:function(){return[W.B]},
$isc:1,
$asc:function(){return[W.B]},
"%":"MozNamedAttrMap|NamedNodeMap"},
iu:{"^":"e+D;",$isd:1,
$asd:function(){return[W.B]},
$isc:1,
$asc:function(){return[W.B]}},
iO:{"^":"iu+I;",$isd:1,
$asd:function(){return[W.B]},
$isc:1,
$asc:function(){return[W.B]}},
qn:{"^":"w;",$ise:1,"%":"ServiceWorker"},
qo:{"^":"iP;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.F(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(new P.n("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.n("Cannot resize immutable List."))},
w:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isr:1,
$asr:function(){return[W.aQ]},
$isd:1,
$asd:function(){return[W.aQ]},
$ist:1,
$ast:function(){return[W.aQ]},
$isc:1,
$asc:function(){return[W.aQ]},
"%":"SpeechRecognitionResultList"},
iv:{"^":"e+D;",$isd:1,
$asd:function(){return[W.aQ]},
$isc:1,
$asc:function(){return[W.aQ]}},
iP:{"^":"iv+I;",$isd:1,
$asd:function(){return[W.aQ]},
$isc:1,
$asc:function(){return[W.aQ]}},
qp:{"^":"iQ;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.F(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(new P.n("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.n("Cannot resize immutable List."))},
w:function(a,b){if(b<0||b>=a.length)return H.a(a,b)
return a[b]},
$isr:1,
$asr:function(){return[W.aR]},
$isd:1,
$asd:function(){return[W.aR]},
$ist:1,
$ast:function(){return[W.aR]},
$isc:1,
$asc:function(){return[W.aR]},
"%":"StyleSheetList"},
iw:{"^":"e+D;",$isd:1,
$asd:function(){return[W.aR]},
$isc:1,
$asc:function(){return[W.aR]}},
iQ:{"^":"iw+I;",$isd:1,
$asd:function(){return[W.aR]},
$isc:1,
$asc:function(){return[W.aR]}},
qr:{"^":"e;",$ise:1,"%":"WorkerLocation"},
qs:{"^":"e;",$ise:1,"%":"WorkerNavigator"},
l_:{"^":"a6;a,b,c,$ti",
P:function(a,b,c,d){return W.T(this.a,this.b,a,!1,H.z(this,0))},
bG:function(a,b,c){return this.P(a,null,b,c)}},
K:{"^":"l_;a,b,c,$ti"},
l0:{"^":"k7;a,b,c,d,e,$ti",
aJ:function(a){if(this.b==null)return
this.dF()
this.b=null
this.d=null
return},
bb:function(a,b){if(this.b==null)return;++this.a
this.dF()},
R:function(a){return this.bb(a,null)},
af:function(a){if(this.b==null||this.a<=0)return;--this.a
this.dD()},
dD:function(){var z,y,x
z=this.d
y=z!=null
if(y&&this.a<=0){x=this.b
x.toString
if(y)J.h7(x,this.c,z,!1)}},
dF:function(){var z,y,x
z=this.d
y=z!=null
if(y){x=this.b
x.toString
if(y)J.h8(x,this.c,z,!1)}},
fq:function(a,b,c,d,e){this.dD()},
v:{
T:function(a,b,c,d,e){var z=W.fM(new W.l1(c))
z=new W.l0(0,a,b,z,!1,[e])
z.fq(a,b,c,!1,e)
return z}}},
l1:{"^":"h:2;a",
$1:function(a){return this.a.$1(a)},
$isi:1},
I:{"^":"f;$ti",
gO:function(a){return new W.i2(a,this.gi(a),-1,null)},
q:function(a,b){throw H.b(new P.n("Cannot add to immutable List."))},
aa:function(a,b,c,d,e){throw H.b(new P.n("Cannot setRange on immutable List."))},
bj:function(a,b,c,d){return this.aa(a,b,c,d,0)},
$isd:1,
$asd:null,
$isc:1,
$asc:null},
i2:{"^":"f;a,b,c,d",
D:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.c_(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gH:function(){return this.d}}}],["","",,P,{"^":"",
mk:function(a){var z,y,x,w,v
if(a==null)return
z=P.d6()
y=Object.getOwnPropertyNames(a)
for(x=y.length,w=0;w<y.length;y.length===x||(0,H.P)(y),++w){v=y[w]
z.j(0,v,a[v])}return z},
mh:function(a){var z,y
z=new P.C(0,$.q,null,[null])
y=new P.b6(z,[null])
a.then(H.aE(new P.mi(y),1))["catch"](H.aE(new P.mj(y),1))
return z},
cV:function(){var z=$.e0
if(z==null){z=J.c0(window.navigator.userAgent,"Opera",0)
$.e0=z}return z},
e3:function(){var z=$.e1
if(z==null){z=P.cV()!==!0&&J.c0(window.navigator.userAgent,"WebKit",0)
$.e1=z}return z},
e2:function(){var z,y
z=$.dY
if(z!=null)return z
y=$.dZ
if(y==null){y=J.c0(window.navigator.userAgent,"Firefox",0)
$.dZ=y}if(y)z="-moz-"
else{y=$.e_
if(y==null){y=P.cV()!==!0&&J.c0(window.navigator.userAgent,"Trident/",0)
$.e_=y}if(y)z="-ms-"
else z=P.cV()===!0?"-o-":"-webkit-"}$.dY=z
return z},
lH:{"^":"f;",
b6:function(a){var z,y,x
z=this.a
y=z.length
for(x=0;x<y;++x)if(z[x]===a)return x
z.push(a)
this.b.push(null)
return y},
an:function(a){var z,y,x,w,v,u
z={}
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
y=J.v(a)
if(!!y.$isbK)return new Date(a.a)
if(!!y.$isap)return a
if(!!y.$iscQ)return a
if(!!y.$iseg)return a
if(!!y.$iser)return a
if(!!y.$isch||!!y.$iscj)return a
if(!!y.$isS){x=this.b6(a)
w=this.b
v=w.length
if(x>=v)return H.a(w,x)
u=w[x]
z.a=u
if(u!=null)return u
u={}
z.a=u
if(x>=v)return H.a(w,x)
w[x]=u
y.X(a,new P.lJ(z,this))
return z.a}if(!!y.$isc){x=this.b6(a)
z=this.b
if(x>=z.length)return H.a(z,x)
u=z[x]
if(u!=null)return u
return this.hl(a,x)}throw H.b(new P.cr("structured clone of other type"))},
hl:function(a,b){var z,y,x,w,v
z=J.O(a)
y=z.gi(a)
x=new Array(y)
w=this.b
if(b>=w.length)return H.a(w,b)
w[b]=x
for(v=0;v<y;++v){w=this.an(z.h(a,v))
if(v>=x.length)return H.a(x,v)
x[v]=w}return x}},
lJ:{"^":"h:3;a,b",
$2:function(a,b){this.a.a[a]=this.b.an(b)},
$isi:1},
kJ:{"^":"f;",
b6:function(a){var z,y,x,w
z=this.a
y=z.length
for(x=0;x<y;++x){w=z[x]
if(w==null?a==null:w===a)return x}z.push(a)
this.b.push(null)
return y},
an:function(a){var z,y,x,w,v,u,t,s,r
z={}
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
if(a instanceof Date){y=a.getTime()
x=new P.bK(y,!0)
x.d2(y,!0)
return x}if(a instanceof RegExp)throw H.b(new P.cr("structured clone of RegExp"))
if(typeof Promise!="undefined"&&a instanceof Promise)return P.mh(a)
w=Object.getPrototypeOf(a)
if(w===Object.prototype||w===null){v=this.b6(a)
x=this.b
u=x.length
if(v>=u)return H.a(x,v)
t=x[v]
z.a=t
if(t!=null)return t
t=P.d6()
z.a=t
if(v>=u)return H.a(x,v)
x[v]=t
this.hy(a,new P.kK(z,this))
return z.a}if(a instanceof Array){v=this.b6(a)
x=this.b
if(v>=x.length)return H.a(x,v)
t=x[v]
if(t!=null)return t
u=J.O(a)
s=u.gi(a)
t=this.c?new Array(s):a
if(v>=x.length)return H.a(x,v)
x[v]=t
if(typeof s!=="number")return H.m(s)
x=J.aY(t)
r=0
for(;r<s;++r)x.j(t,r,this.an(u.h(a,r)))
return t}return a}},
kK:{"^":"h:3;a,b",
$2:function(a,b){var z,y
z=this.a.a
y=this.b.an(b)
J.h6(z,a,y)
return y},
$isi:1},
lI:{"^":"lH;a,b"},
fi:{"^":"kJ;a,b,c",
hy:function(a,b){var z,y,x,w
for(z=Object.keys(a),y=z.length,x=0;x<z.length;z.length===y||(0,H.P)(z),++x){w=z[x]
b.$2(w,a[w])}}},
mi:{"^":"h:2;a",
$1:function(a){return this.a.a8(0,a)},
$isi:1},
mj:{"^":"h:2;a",
$1:function(a){return this.a.cr(a)},
$isi:1}}],["","",,P,{"^":"",
lY:function(a){var z,y,x
z=new P.C(0,$.q,null,[null])
y=new P.fA(z,[null])
a.toString
x=W.ag
W.T(a,"success",new P.lZ(a,y),!1,x)
W.T(a,"error",y.ghg(),!1,x)
return z},
hR:{"^":"e;",
eh:[function(a,b){a.continue(b)},function(a){return this.eh(a,null)},"hZ","$1","$0","gaz",0,2,18],
"%":";IDBCursor"},
np:{"^":"hR;",
gE:function(a){return new P.fi([],[],!1).an(a.value)},
"%":"IDBCursorWithValue"},
ns:{"^":"w;u:name=","%":"IDBDatabase"},
lZ:{"^":"h:2;a,b",
$1:function(a){this.b.a8(0,new P.fi([],[],!1).an(this.a.result))},
$isi:1},
d_:{"^":"e;u:name=",$isf:1,$isd_:1,"%":"IDBIndex"},
oR:{"^":"e;u:name=",
dH:function(a,b,c){var z,y,x,w,v
try{z=null
z=this.fO(a,b)
w=P.lY(z)
return w}catch(v){y=H.Q(v)
x=H.M(v)
w=P.ei(y,x,null)
return w}},
q:function(a,b){return this.dH(a,b,null)},
fP:function(a,b,c){return a.add(new P.lI([],[]).an(b))},
fO:function(a,b){return this.fP(a,b,null)},
ix:[function(a,b){return a.index(b)},"$1","gaM",2,0,19],
"%":"IDBObjectStore"},
pe:{"^":"w;V:error=","%":"IDBOpenDBRequest|IDBRequest|IDBVersionChangeRequest"},
pU:{"^":"w;V:error=","%":"IDBTransaction"}}],["","",,P,{"^":"",ji:{"^":"h:2;a,b,c,d,e",
$1:function(a){var z,y,x
y=J.O(a)
z=new P.et(y.h(a,1),y.h(a,2),y.h(a,3))
if(this.e)if(!this.a){y=z.gez()
x=new Array(2)
x.fixed$length=Array
x[0]="resume"
x[1]=y
J.an(z.gcu(),x)}return z},
$isi:1},et:{"^":"f;cu:a<,ez:b<,c",
hR:function(a){J.an(this.a,["kill",this.c,a])},
am:function(){return this.hR(1)},
v:{
jh:function(a,b,c,d,e,f){var z,y,x,w,v,u
z=!1
try{if(!H.aX(a,{func:1,args:[,]})){w=P.a8(a)
throw H.b(w)}$.ew=!0
v=a instanceof H.h?a.$static_name:null
if(v==null)H.E(new P.n("only top-level functions can be spawned."))
w=H.ex(v,null,null,b,!1,!1,z===!0).bI(new P.ji(!1,c,e,d,z))
return w}catch(u){y=H.Q(u)
x=H.M(u)
w=P.ei(y,x,P.et)
return w}}}}}],["","",,P,{"^":"",
bB:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
fv:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
qz:[function(a,b){return Math.min(H.bh(a),H.bh(b))},"$2","fY",4,0,function(){return{func:1,args:[,,]}}],
qy:[function(a,b){return Math.max(H.bh(a),H.bh(b))},"$2","cE",4,0,function(){return{func:1,args:[,,]}}],
jR:function(a){return C.f},
lj:{"^":"f;",
a1:function(){return Math.random()}},
bv:{"^":"f;m:a>,n:b>,$ti",
k:function(a){return"Point("+H.j(this.a)+", "+H.j(this.b)+")"},
A:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof P.bv))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gC:function(a){var z,y
z=J.Y(this.a)
y=J.Y(this.b)
return P.fv(P.bB(P.bB(0,z),y))},
G:function(a,b){var z,y,x,w
z=this.a
y=J.o(b)
x=y.gm(b)
if(typeof z!=="number")return z.G()
if(typeof x!=="number")return H.m(x)
w=this.b
y=y.gn(b)
if(typeof w!=="number")return w.G()
if(typeof y!=="number")return H.m(y)
return new P.bv(z+x,w+y,this.$ti)},
B:function(a,b){var z,y,x,w
z=this.a
y=J.o(b)
x=y.gm(b)
if(typeof z!=="number")return z.B()
if(typeof x!=="number")return H.m(x)
w=this.b
y=y.gn(b)
if(typeof w!=="number")return w.B()
if(typeof y!=="number")return H.m(y)
return new P.bv(z-x,w-y,this.$ti)},
Z:function(a,b){var z,y
z=this.a
if(typeof z!=="number")return z.Z()
y=this.b
if(typeof y!=="number")return y.Z()
return new P.bv(z*b,y*b,this.$ti)}},
lw:{"^":"f;$ti",
gcH:function(a){var z=this.a
if(typeof z!=="number")return z.G()
return z+this.c},
gco:function(a){var z=this.b
if(typeof z!=="number")return z.G()
return z+this.d},
k:function(a){return"Rectangle ("+H.j(this.a)+", "+H.j(this.b)+") "+this.c+" x "+this.d},
A:function(a,b){var z,y,x,w
if(b==null)return!1
z=J.v(b)
if(!z.$isW)return!1
y=this.a
x=z.gb9(b)
if(y==null?x==null:y===x){x=this.b
w=z.gbe(b)
if(x==null?w==null:x===w){if(typeof y!=="number")return y.G()
if(y+this.c===z.gcH(b)){if(typeof x!=="number")return x.G()
z=x+this.d===z.gco(b)}else z=!1}else z=!1}else z=!1
return z},
gC:function(a){var z,y,x,w
z=this.a
y=J.Y(z)
x=this.b
w=J.Y(x)
if(typeof z!=="number")return z.G()
if(typeof x!=="number")return x.G()
return P.fv(P.bB(P.bB(P.bB(P.bB(0,y),w),z+this.c&0x1FFFFFFF),x+this.d&0x1FFFFFFF))}},
W:{"^":"lw;b9:a>,be:b>,K:c>,L:d>,$ti",$asW:null,v:{
jU:function(a,b,c,d,e){var z,y
if(typeof c!=="number")return c.ag()
if(c<0)z=-c*0
else z=c
if(typeof d!=="number")return d.ag()
if(d<0)y=-d*0
else y=d
return new P.W(a,b,z,y,[e])}}}}],["","",,P,{"^":"",n0:{"^":"b4;",$ise:1,"%":"SVGAElement"},n3:{"^":"e;E:value=","%":"SVGAngle"},n5:{"^":"y;",$ise:1,"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},nH:{"^":"y;m:x=,n:y=",$ise:1,"%":"SVGFEBlendElement"},nI:{"^":"y;l:type=,m:x=,n:y=",$ise:1,"%":"SVGFEColorMatrixElement"},nJ:{"^":"y;m:x=,n:y=",$ise:1,"%":"SVGFEComponentTransferElement"},nK:{"^":"y;m:x=,n:y=",$ise:1,"%":"SVGFECompositeElement"},nL:{"^":"y;m:x=,n:y=",$ise:1,"%":"SVGFEConvolveMatrixElement"},nM:{"^":"y;m:x=,n:y=",$ise:1,"%":"SVGFEDiffuseLightingElement"},nN:{"^":"y;m:x=,n:y=",$ise:1,"%":"SVGFEDisplacementMapElement"},nO:{"^":"y;m:x=,n:y=",$ise:1,"%":"SVGFEFloodElement"},nP:{"^":"y;m:x=,n:y=",$ise:1,"%":"SVGFEGaussianBlurElement"},nQ:{"^":"y;m:x=,n:y=",$ise:1,"%":"SVGFEImageElement"},nR:{"^":"y;m:x=,n:y=",$ise:1,"%":"SVGFEMergeElement"},nS:{"^":"y;m:x=,n:y=",$ise:1,"%":"SVGFEMorphologyElement"},nT:{"^":"y;m:x=,n:y=",$ise:1,"%":"SVGFEOffsetElement"},nU:{"^":"y;m:x=,n:y=","%":"SVGFEPointLightElement"},nV:{"^":"y;m:x=,n:y=",$ise:1,"%":"SVGFESpecularLightingElement"},nW:{"^":"y;m:x=,n:y=","%":"SVGFESpotLightElement"},nX:{"^":"y;m:x=,n:y=",$ise:1,"%":"SVGFETileElement"},nY:{"^":"y;l:type=,m:x=,n:y=",$ise:1,"%":"SVGFETurbulenceElement"},o3:{"^":"y;m:x=,n:y=",$ise:1,"%":"SVGFilterElement"},o5:{"^":"b4;m:x=,n:y=","%":"SVGForeignObjectElement"},i4:{"^":"b4;","%":"SVGCircleElement|SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},b4:{"^":"y;",$ise:1,"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},oe:{"^":"b4;m:x=,n:y=",$ise:1,"%":"SVGImageElement"},br:{"^":"e;E:value=",$isf:1,"%":"SVGLength"},ok:{"^":"iR;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.F(b,a,null,null,null))
return a.getItem(b)},
j:function(a,b,c){throw H.b(new P.n("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.n("Cannot resize immutable List."))},
w:function(a,b){return this.h(a,b)},
$isd:1,
$asd:function(){return[P.br]},
$isc:1,
$asc:function(){return[P.br]},
"%":"SVGLengthList"},ix:{"^":"e+D;",$isd:1,
$asd:function(){return[P.br]},
$isc:1,
$asc:function(){return[P.br]}},iR:{"^":"ix+I;",$isd:1,
$asd:function(){return[P.br]},
$isc:1,
$asc:function(){return[P.br]}},oo:{"^":"y;",$ise:1,"%":"SVGMarkerElement"},op:{"^":"y;m:x=,n:y=",$ise:1,"%":"SVGMaskElement"},or:{"^":"e;at:b=","%":"SVGMatrix"},bu:{"^":"e;E:value=",$isf:1,"%":"SVGNumber"},oN:{"^":"iS;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.F(b,a,null,null,null))
return a.getItem(b)},
j:function(a,b,c){throw H.b(new P.n("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.n("Cannot resize immutable List."))},
w:function(a,b){return this.h(a,b)},
$isd:1,
$asd:function(){return[P.bu]},
$isc:1,
$asc:function(){return[P.bu]},
"%":"SVGNumberList"},iy:{"^":"e+D;",$isd:1,
$asd:function(){return[P.bu]},
$isc:1,
$asc:function(){return[P.bu]}},iS:{"^":"iy+I;",$isd:1,
$asd:function(){return[P.bu]},
$isc:1,
$asc:function(){return[P.bu]}},oX:{"^":"y;m:x=,n:y=",$ise:1,"%":"SVGPatternElement"},p1:{"^":"e;m:x=,n:y=","%":"SVGPoint"},p2:{"^":"e;i:length=","%":"SVGPointList"},pa:{"^":"e;m:x=,n:y=","%":"SVGRect"},pb:{"^":"i4;m:x=,n:y=","%":"SVGRectElement"},pl:{"^":"y;l:type%",$ise:1,"%":"SVGScriptElement"},pG:{"^":"iT;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.F(b,a,null,null,null))
return a.getItem(b)},
j:function(a,b,c){throw H.b(new P.n("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.n("Cannot resize immutable List."))},
w:function(a,b){return this.h(a,b)},
$isd:1,
$asd:function(){return[P.u]},
$isc:1,
$asc:function(){return[P.u]},
"%":"SVGStringList"},iz:{"^":"e+D;",$isd:1,
$asd:function(){return[P.u]},
$isc:1,
$asc:function(){return[P.u]}},iT:{"^":"iz+I;",$isd:1,
$asd:function(){return[P.u]},
$isc:1,
$asc:function(){return[P.u]}},pI:{"^":"y;l:type%","%":"SVGStyleElement"},y:{"^":"e6;",
gei:function(a){return new W.K(a,"change",!1,[W.ag])},
gej:function(a){return new W.K(a,"click",!1,[W.a1])},
gek:function(a){return new W.K(a,"mousedown",!1,[W.a1])},
gel:function(a){return new W.K(a,"mousemove",!1,[W.a1])},
gem:function(a){return new W.K(a,"mouseout",!1,[W.a1])},
gen:function(a){return new W.K(a,"mouseup",!1,[W.a1])},
geo:function(a){return new W.K(a,"mousewheel",!1,[W.bT])},
ges:function(a){return new W.K(a,"touchcancel",!1,[W.ad])},
geu:function(a){return new W.K(a,"touchend",!1,[W.ad])},
gev:function(a){return new W.K(a,"touchmove",!1,[W.ad])},
gew:function(a){return new W.K(a,"touchstart",!1,[W.ad])},
$ise:1,
"%":"SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGMetadataElement|SVGStopElement|SVGTitleElement;SVGElement"},pK:{"^":"b4;m:x=,n:y=",$ise:1,"%":"SVGSVGElement"},pL:{"^":"y;",$ise:1,"%":"SVGSymbolElement"},f3:{"^":"b4;","%":";SVGTextContentElement"},pN:{"^":"f3;",$ise:1,"%":"SVGTextPathElement"},pO:{"^":"f3;m:x=,n:y=","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement"},by:{"^":"e;l:type=",$isf:1,"%":"SVGTransform"},pV:{"^":"iU;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.F(b,a,null,null,null))
return a.getItem(b)},
j:function(a,b,c){throw H.b(new P.n("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.n("Cannot resize immutable List."))},
w:function(a,b){return this.h(a,b)},
$isd:1,
$asd:function(){return[P.by]},
$isc:1,
$asc:function(){return[P.by]},
"%":"SVGTransformList"},iA:{"^":"e+D;",$isd:1,
$asd:function(){return[P.by]},
$isc:1,
$asc:function(){return[P.by]}},iU:{"^":"iA+I;",$isd:1,
$asd:function(){return[P.by]},
$isc:1,
$asc:function(){return[P.by]}},pY:{"^":"b4;m:x=,n:y=",$ise:1,"%":"SVGUseElement"},q1:{"^":"y;",$ise:1,"%":"SVGViewElement"},q2:{"^":"e;",$ise:1,"%":"SVGViewSpec"},qh:{"^":"y;",$ise:1,"%":"SVGGradientElement|SVGLinearGradientElement|SVGRadialGradientElement"},qk:{"^":"y;",$ise:1,"%":"SVGCursorElement"},ql:{"^":"y;",$ise:1,"%":"SVGFEDropShadowElement"},qm:{"^":"y;",$ise:1,"%":"SVGMPathElement"}}],["","",,P,{"^":"",kD:{"^":"f;",$isd:1,
$asd:function(){return[P.l]},
$isc:1,
$asc:function(){return[P.l]}},i3:{"^":"f;",$isd:1,
$asd:function(){return[P.L]},
$isc:1,
$asc:function(){return[P.L]}}}],["","",,P,{"^":"",n8:{"^":"e;i:length=","%":"AudioBuffer"},n9:{"^":"dO;au:buffer=","%":"AudioBufferSourceNode"},cP:{"^":"w;","%":"AnalyserNode|AudioChannelMerger|AudioChannelSplitter|AudioDestinationNode|AudioGainNode|AudioPannerNode|ChannelMergerNode|ChannelSplitterNode|DelayNode|DynamicsCompressorNode|GainNode|IIRFilterNode|JavaScriptAudioNode|MediaStreamAudioDestinationNode|PannerNode|RealtimeAnalyserNode|ScriptProcessorNode|StereoPannerNode|WaveShaperNode|webkitAudioPannerNode;AudioNode"},na:{"^":"e;E:value=","%":"AudioParam"},dO:{"^":"cP;","%":"MediaElementAudioSourceNode|MediaStreamAudioSourceNode;AudioSourceNode"},nd:{"^":"cP;l:type%","%":"BiquadFilterNode"},nj:{"^":"cP;au:buffer=","%":"ConvolverNode"},oT:{"^":"dO;l:type%","%":"Oscillator|OscillatorNode"}}],["","",,P,{"^":"",n1:{"^":"e;u:name=,l:type=","%":"WebGLActiveInfo"},n4:{"^":"e;",
hv:function(a,b,c,d,e,f){return a.drawElementsInstancedANGLE(b,c,d,e,f)},
ij:function(a,b,c){return a.vertexAttribDivisorANGLE(b,c)},
"%":"ANGLEInstancedArrays|ANGLE_instanced_arrays"},pc:{"^":"e;",
cm:function(a,b,c){return a.attachShader(b,c)},
bx:function(a,b,c){return a.bindBuffer(b,c)},
dL:function(a,b,c){return a.blendFunc(b,c)},
dM:function(a,b,c,d){return a.bufferData(b,c,d)},
dN:function(a,b,c,d){return a.bufferSubData(b,c,d)},
dQ:function(a,b){return a.clear(b)},
dR:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
cq:function(a,b){return a.compileShader(b)},
b2:function(a){return a.createBuffer()},
dU:function(a){return a.createProgram()},
cw:function(a,b){return a.createShader(b)},
dV:function(a,b){return a.cullFace(b)},
dY:function(a,b){return a.depthFunc(b)},
e_:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
e3:function(a,b){return a.enable(b)},
e4:function(a,b){return a.enableVertexAttribArray(b)},
cO:function(a,b,c){return a.getAttribLocation(b,c)},
cP:function(a,b){return a.getExtension(b)},
cR:function(a,b){return a.getProgramInfoLog(b)},
cS:function(a,b,c){return a.getProgramParameter(b,c)},
bN:function(a,b){return a.getShaderInfoLog(b)},
bO:function(a,b,c){return a.getShaderParameter(b,c)},
cT:function(a,b,c){return a.getUniformLocation(b,c)},
ea:function(a,b){return a.linkProgram(b)},
bS:function(a,b,c){return a.shaderSource(b,c)},
eI:function(a,b,c){return a.uniform1f(b,c)},
eJ:function(a,b,c){return a.uniform3fv(b,c)},
eK:function(a,b,c){return a.uniform4fv(b,c)},
eL:function(a,b,c,d){return a.uniformMatrix4fv(b,!1,d)},
eQ:function(a,b){return a.useProgram(b)},
eS:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,!1,f,g)},
eT:function(a,b,c,d,e){return a.viewport(b,c,d,e)},
"%":"WebGLRenderingContext"},pd:{"^":"e;",
cm:function(a,b,c){return a.attachShader(b,c)},
bx:function(a,b,c){return a.bindBuffer(b,c)},
dL:function(a,b,c){return a.blendFunc(b,c)},
dM:function(a,b,c,d){return a.bufferData(b,c,d)},
dN:function(a,b,c,d){return a.bufferSubData(b,c,d)},
dQ:function(a,b){return a.clear(b)},
dR:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
cq:function(a,b){return a.compileShader(b)},
b2:function(a){return a.createBuffer()},
dU:function(a){return a.createProgram()},
cw:function(a,b){return a.createShader(b)},
dV:function(a,b){return a.cullFace(b)},
dY:function(a,b){return a.depthFunc(b)},
e_:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
e3:function(a,b){return a.enable(b)},
e4:function(a,b){return a.enableVertexAttribArray(b)},
cO:function(a,b,c){return a.getAttribLocation(b,c)},
cP:function(a,b){return a.getExtension(b)},
cR:function(a,b){return a.getProgramInfoLog(b)},
cS:function(a,b,c){return a.getProgramParameter(b,c)},
bN:function(a,b){return a.getShaderInfoLog(b)},
bO:function(a,b,c){return a.getShaderParameter(b,c)},
cT:function(a,b,c){return a.getUniformLocation(b,c)},
ea:function(a,b){return a.linkProgram(b)},
bS:function(a,b,c){return a.shaderSource(b,c)},
eI:function(a,b,c){return a.uniform1f(b,c)},
eJ:function(a,b,c){return a.uniform3fv(b,c)},
eK:function(a,b,c){return a.uniform4fv(b,c)},
eL:function(a,b,c,d){return a.uniformMatrix4fv(b,!1,d)},
eQ:function(a,b){return a.useProgram(b)},
eS:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,!1,f,g)},
eT:function(a,b,c,d,e){return a.viewport(b,c,d,e)},
$ise:1,
"%":"WebGL2RenderingContext"},kE:{"^":"e;",$isf:1,"%":"WebGLUniformLocation"},qq:{"^":"e;",$ise:1,"%":"WebGL2RenderingContextBase"}}],["","",,P,{"^":"",pC:{"^":"e;I:message=","%":"SQLError"},pD:{"^":"iV;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.F(b,a,null,null,null))
return P.mk(a.item(b))},
j:function(a,b,c){throw H.b(new P.n("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.n("Cannot resize immutable List."))},
w:function(a,b){return this.h(a,b)},
$isd:1,
$asd:function(){return[P.S]},
$isc:1,
$asc:function(){return[P.S]},
"%":"SQLResultSetRowList"},iB:{"^":"e+D;",$isd:1,
$asd:function(){return[P.S]},
$isc:1,
$asc:function(){return[P.S]}},iV:{"^":"iB+I;",$isd:1,
$asd:function(){return[P.S]},
$isc:1,
$asc:function(){return[P.S]}}}],["","",,N,{"^":"",c8:{"^":"f;a,b,c",
bB:function(a,b){var z,y,x
z=this.c
z.cG(0,b,new N.hD())
z=z.h(0,b)
y=this.a
x=y.b
if(x==null)x=$.aN.$0()
J.dE(z,J.af(J.bI(J.aZ(J.af(x,y.a),1e6),$.aC),this.b.h(0,b)))},
i4:function(){var z=this.c
z.gbE(z).X(0,this.geA())},
iz:[function(a){var z,y,x,w,v,u
z=this.c.h(0,a)
y=J.aY(z)
x=J.dD(y.a2(z,new N.hE()),y.gi(z))
w=0
v=0
while(!0){u=y.gi(z)
if(typeof u!=="number")return H.m(u)
if(!(v<u))break
u=J.af(y.h(z,v),x)
H.bh(u)
w+=Math.pow(u,2);++v}u=y.gi(z)
if(typeof u!=="number")return H.m(u)
w=Math.sqrt(w/u)
P.bk("# "+H.j(a)+"\nNumber of measurments: "+H.j(y.gi(z))+"\nAverage time (\xb5s): "+H.j(x)+"\nStandard dev (\xb5s): "+H.j(w)+"\n")},"$1","geA",2,0,20]},hD:{"^":"h:0;",
$0:function(){return H.A([],[P.l])},
$isi:1},hE:{"^":"h:3;",
$2:function(a,b){return J.as(a,b)},
$isi:1},hG:{"^":"f;a,b,c,d,e,f,r,x,y",
Y:function(a){var z=0,y=P.b1(),x,w=this,v,u
var $async$Y=P.bf(function(b,c){if(b===1)return P.bb(c,y)
while(true)switch(z){case 0:v=w.a
v.p("group: loadSimulation")
v.p("Loading new simulation...")
z=3
return P.a7(w.R(0),$async$Y)
case 3:z=w.f?4:6
break
case 4:z=7
return P.a7(w.d.Y(a),$async$Y)
case 7:u=c
z=5
break
case 6:w.e.a=a
u=!0
case 5:v.p("Loaded simulation.")
w.af(0)
$.$get$al().p("groupEnd")
x=u
z=1
break
case 1:return P.bc(x,y)}})
return P.bd($async$Y,y)},
R:function(a){var z=0,y=P.b1(),x=this,w,v
var $async$R=P.bf(function(b,c){if(b===1)return P.bb(c,y)
while(true)switch(z){case 0:z=x.r?2:3
break
case 2:w=x.a
w.p("Pausing engine...")
if(x.f){v=x.d
v=v.d!=null&&!v.y}else v=!1
z=v?4:6
break
case 4:z=7
return P.a7(x.d.R(0),$async$R)
case 7:x.r=!1
z=5
break
case 6:x.r=!1
case 5:w.p("Paused engine.")
case 3:return P.bc(null,y)}})
return P.bd($async$R,y)},
af:function(a){var z
if(!this.r){z=this.a
z.p("Resuming engine...")
this.r=!0
if(this.f){if(this.d.af(0))z.p("Resumed engine.")}else z.p("Resumed engine.")}},
aU:function(){var z=0,y=P.b1(),x,w=this,v,u,t
var $async$aU=P.bf(function(a,b){if(a===1)return P.bb(b,y)
while(true)switch(z){case 0:v=w.a
v.p("group: switchToIsolate")
v.p("Switching to isolate...")
z=!w.f?3:5
break
case 3:z=6
return P.a7(w.R(0),$async$aU)
case 6:u=w.e.a
w.f=!0
z=7
return P.a7(w.Y(u),$async$aU)
case 7:t=b
$.$get$al().p("groupEnd")
x=t
z=1
break
z=4
break
case 5:v.aR("Already rendering in isolate!")
$.$get$al().p("groupEnd")
x=!1
z=1
break
case 4:case 1:return P.bc(x,y)}})
return P.bd($async$aU,y)},
aC:function(){var z=0,y=P.b1(),x,w=this,v,u,t
var $async$aC=P.bf(function(a,b){if(a===1)return P.bb(b,y)
while(true)switch(z){case 0:v=w.a
v.p("group: switchToMainThread")
v.p("Switching to main thread...")
z=w.f?3:5
break
case 3:z=6
return P.a7(w.R(0),$async$aC)
case 6:z=7
return P.a7(w.d.ic(),$async$aC)
case 7:u=b
w.f=!1
z=8
return P.a7(w.Y(u),$async$aC)
case 8:t=b
$.$get$al().p("groupEnd")
x=t
z=1
break
z=4
break
case 5:v.aR("Already rendering on main thread!")
$.$get$al().p("groupEnd")
x=!1
z=1
break
case 4:case 1:return P.bc(x,y)}})
return P.bd($async$aC,y)},
i5:function(){var z,y
if(this.f){this.a.p("Retrieving benchmarks from isolate...")
this.d.ib().bI(new N.hJ(this))}else{z=this.e.b
y=z.c
y.gbE(y).X(0,z.geA())}},
fh:function(a){var z=this.y
this.x=new P.b7(z,[H.z(z,0)])
this.d.a.eb(new N.hI(this))},
v:{
hH:function(a){var z,y,x,w,v
z=N.aK("bromium.engine.BromiumEngine")
y=[null]
x=new P.fk(null,0,null,null,null,null,null,y)
w=new N.k0(null,x,N.aK("bromium.engine.SimulationIsolate"),null,null,null,0,!1,!0,!1,null,null,null,null)
w.a=new P.b7(x,[null])
x=new P.f0(0,0)
if($.aC==null){H.eN()
$.aC=$.bQ}v=P.u
x.cX(0)
z=new N.hG(z,new G.jX(null,null,null),-1,w,new N.eX(null,new N.c8(x,new H.G(0,null,null,null,null,null,0,[v,P.l]),new H.G(0,null,null,null,null,null,0,[v,[P.c,P.am]]))),!0,!1,null,new P.fk(null,0,null,null,null,null,null,y))
z.fh(!0)
return z}}},hI:{"^":"h:2;a",
$1:function(a){var z,y,x
z=this.a
y=z.b
y.eO(0,a);++z.c
z=z.y
y=y.cQ()
if(z.b>=4)H.E(z.aF())
x=z.b
if((x&1)!==0)z.a0(y)
else if((x&3)===0)z.aG().q(0,new P.b8(y,null,[H.z(z,0)]))},
$isi:1},hJ:{"^":"h:2;a",
$1:function(a){this.a.a.p("Retrieved benchmarks.")
a.i4()},
$isi:1},d0:{"^":"f;a,f8:b<"},k0:{"^":"f;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy",
ib:function(){var z,y,x
z=this.c
z.p("Retrieving benchmarks...")
y=N.c8
x=[y]
if(this.d!=null){this.f.N(0,2)
z=new P.C(0,$.q,null,x)
this.cx=new P.b6(z,[y])
return z}else{z.bR("No isolate is active!")
z=new P.C(0,$.q,null,x)
z.ak(null)
return z}},
ic:function(){var z,y,x
z=this.c
z.p("Retrieving simulation...")
y=G.eV
x=[y]
if(this.d!=null){this.f.N(0,4)
z=new P.C(0,$.q,null,x)
this.cy=new P.b6(z,[y])
return z}else{z.bR("No isolate is active!")
z=new P.C(0,$.q,null,x)
z.ak(null)
return z}},
am:function(){var z,y,x
z=this.c
z.p("Killing isolate...")
y=this.d
if(y!=null){z=P.bW
x=[z]
if(this.x){this.ch=new P.b6(new P.C(0,$.q,null,x),[z])
this.x=!1
this.z=!0
y.am()
return this.ch.a}else{y.am()
this.d=null
z=new P.C(0,$.q,null,x)
z.ak(!0)
return z}}else{z.aR("No isolate is active!")
z=new P.C(0,$.q,null,[P.bW])
z.ak(!1)
return z}},
R:function(a){var z,y,x
z=this.c
z.p("Pausing isolate...")
y=P.bW
x=[y]
if(this.x){z=new P.C(0,$.q,null,x)
this.Q=new P.b6(z,[y])
this.x=!1
return z}else{z.aR("No isolate is running!")
z=new P.C(0,$.q,null,x)
z.ak(!1)
return z}},
af:function(a){var z,y
z=this.c
z.p("Resuming isolate...")
if(this.d!=null){y=this.f
if(y!=null)if(!this.x){this.r=0
this.z=!1
this.x=!0
this.y=!1
y.N(0,1)
return!0}else{z.aR("Isolate is already running!")
return!1}else{z.bR("Isolate is active but we have no send port!")
return!1}}else{z.aR("No isolate is active!")
return!1}},
Y:function(a){var z=0,y=P.b1(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i
var $async$Y=P.bf(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=t.c
q.p("group: loadSimulation")
q.p("Loading new simulation...")
p=P.bW
o=new P.C(0,$.q,null,[p])
a.cN()
n=t.b
m=a.b
if(n.b>=4)H.E(n.aF())
l=n.b
if((l&1)!==0)n.a0(m)
else if((l&3)===0)n.aG().q(0,new P.b8(m,null,[H.z(n,0)]))
z=t.d!=null?3:4
break
case 3:z=5
return P.a7(t.am(),$async$Y)
case 5:case 4:n=$.bx
$.bx=n+1
m=new H.aB(n,null,!1)
l=init.globalState.d
l.aD(n,m)
l.as()
l=new H.dd(m,null)
l.bV(m)
t.e=l
l=l.b
l.toString
new P.b7(l,[H.z(l,0)]).P(new N.k2(t,new P.b6(o,[p])),null,null,null)
t.x=!1
t.y=!0
w=7
q.p("Spawning isolate...")
i=t
z=10
return P.a7(P.jh(N.ml(),new N.d0(new H.ba(t.e.a,init.globalState.d.a),G.eZ(a)),null,null,null,!1),$async$Y)
case 10:i.d=c
w=2
z=9
break
case 7:w=6
j=v
p=H.Q(j)
if(!!J.v(p).$isee){s=p
r=H.M(j)
q.cV("Failed to spawn isolate!",s,r)
$.$get$al().p("groupEnd")
x=!1
z=1
break}else throw j
z=9
break
case 6:z=2
break
case 9:q.p("Succesfully spawned isolate.")
$.$get$al().p("groupEnd")
x=o
z=1
break
case 1:return P.bc(x,y)
case 2:return P.bb(v,y)}})
return P.bd($async$Y,y)},
v:{
pu:[function(a){var z,y,x,w,v,u,t
if($.dg)P.bk("[ISOLATE] Started isolate.")
if($.dg)P.bk("[ISOLATE] Unpacking simulation...")
z=a.gf8().eM()
if($.dg)P.bk("[ISOLATE] Finished unpacking the simulation.")
y=a.a
x=new P.f0(0,0)
if($.aC==null){H.eN()
$.aC=$.bQ}w=P.u
x.cX(0)
v=new N.eX(null,new N.c8(x,new H.G(0,null,null,null,null,null,0,[w,P.l]),new H.G(0,null,null,null,null,null,0,[w,[P.c,P.am]])))
v.a=z
x=$.bx
$.bx=x+1
w=new H.aB(x,null,!1)
u=init.globalState.d
u.aD(x,w)
u.as()
t=new H.dd(w,null)
t.bV(w)
u=t.b
u.toString
new P.b7(u,[H.z(u,0)]).P(new N.k1(z,y,v),null,null,null)
y.N(0,new H.ba(w,init.globalState.d.a))},"$1","ml",2,0,31]}},k2:{"^":"h:2;a,b",
$1:function(a){var z,y,x
z=J.v(a)
if(!!z.$ishL){z=this.a
y=z.b
if(y.b>=4)H.E(y.aF())
x=y.b
if((x&1)!==0)y.a0(a)
else if((x&3)===0)y.aG().q(0,new P.b8(a,null,[H.z(y,0)]))
if(++z.r%128===0&&z.f!=null)if(z.x)z.f.N(0,1)
else{y=z.c
if(z.z){y.p("Killed isolate.")
z.d=null
z.z=!1
z.y=!0
z.ch.a8(0,!0)}else{y.p("Paused isolate.")
z.y=!0
z.Q.a8(0,!0)}}}else if(!!z.$isc8){z=this.a
z.c.p("Retrieved benchmarks.")
z.cx.a8(0,a)}else if(!!z.$iseY){z=this.a
z.c.p("Retrieved compressed simulation.")
z.cy.a8(0,a.eM())}else if(!!z.$isde){z=this.a
z.c.p("Retrieved isolate send port.")
z.f=a
this.b.a8(0,!0)}},
$isi:1},k1:{"^":"h:21;a,b,c",
$1:function(a){var z,y,x
if(typeof a!=="number")return a.im()
if((a&1)!==0)for(z=this.c,y=this.b,x=128;x>0;--x){z.dW()
z.a.cN()
y.N(0,J.cK(z.a))}if((a&2)!==0)this.b.N(0,this.c.b)
if((a&4)!==0)this.b.N(0,G.eZ(this.a))},
$isi:1},eX:{"^":"f;a,b",
dW:function(){var z,y,x,w
z=this.b
y=z.b
x=z.a
if(this.a.ghW().length===0){w=x.b
if(w==null)w=$.aN.$0()
y.j(0,"particlesRandomMotionFast",J.bI(J.aZ(J.af(w,x.a),1e6),$.aC))
D.mM(this.a)
z.bB(0,"particlesRandomMotionFast")}else{w=x.b
if(w==null)w=$.aN.$0()
y.j(0,"particlesRandomMotionNormal",J.bI(J.aZ(J.af(w,x.a),1e6),$.aC))
D.mN(this.a)
z.bB(0,"particlesRandomMotionNormal")}if(this.a.ghb().length!==0){w=x.b
if(w==null)w=$.aN.$0()
y.j(0,"reactionsFastVoxel",J.bI(J.aZ(J.af(w,x.a),1e6),$.aC))
D.mP(this.a)
z.bB(0,"reactionsFastVoxel")}if(this.a.geH().length!==0){w=x.b
if(w==null)w=$.aN.$0()
y.j(0,"reactionsUnbindRandom",J.bI(J.aZ(J.af(w,x.a),1e6),$.aC))
D.mR(this.a)
z.bB(0,"reactionsUnbindRandom")}}}}],["","",,D,{"^":"",
mM:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=J.dF(J.cK(a),a.gey(),a.gex().length*7)
y=H.k(3)
x=new Float32Array(y)
w=new T.p(x)
for(v=z.length,u=a.x,t=0,s=0;s<v;++t,s=s+1+4){Z.h1(C.f,w)
if(t>=u.length)return H.a(u,t)
r=J.dL(u[t])
q=s+1
p=z[s]
if(0>=y)return H.a(x,0)
o=x[0]
if(typeof r!=="number")return H.m(r)
z[s]=p+o*r
s=q+1
if(q>=v)return H.a(z,q)
o=z[q]
if(1>=y)return H.a(x,1)
z[q]=o+x[1]*r
if(s>=v)return H.a(z,s)
o=z[s]
if(2>=y)return H.a(x,2)
z[s]=o+x[2]*r}},
mN:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=new T.p(new Float32Array(H.k(3)))
$OUTER$0:for(y=a.gex(),x=y.length,w=a.y,v=0;v<y.length;y.length===x||(0,H.P)(y),++v){u=y[v]
if(!u.gbD()){Z.h1(C.f,z)
z.ah(0,u.d)
z.q(0,u.b)
t=u.a
for(s=u.x,r=u.r,q=0;q<w.length;++q){if(q>=s.length)return H.a(s,q)
if(J.H(s[q],0)){if(q>=w.length)return H.a(w,q)
p=w[q]
o=p.a
n=J.hi(J.dD(o.ee(z),u.d))
if(q>=s.length)return H.a(s,q)
s[q]=n
m=C.a.U(r,q)
l=o.U(0,z)
k=!m&&l
j=m&&!l
if(p.fb(t,k,j)){C.a.a3(r,p.b)
s=u.a
n=p.r
if(s>>>0!==s||s>=n.length)return H.a(n,s)
n[s]=n[s]-1
u.cZ(p.b,o,!0)
o=p.x
s=u.a
if(s>>>0!==s||s>=o.length)return H.a(o,s)
o[s]=o[s]+1
continue $OUTER$0}if(k){o=p.c
if(t>>>0!==t||t>=o.length)return H.a(o,t)
if(o[t]===0)o=!1
else{o=$.$get$bE().a1()
n=p.c
if(t>=n.length)return H.a(n,t)
n=o<n[t]
o=n}o=!o}else o=!1
if(!o)if(j){o=p.d
if(t>>>0!==t||t>=o.length)return H.a(o,t)
if(o[t]===0)o=!1
else{o=$.$get$bE().a1()
n=p.d
if(t>=n.length)return H.a(n,t)
n=o<n[t]
o=n}o=!o}else o=!1
else o=!0
if(o)continue $OUTER$0
else if(k){r.push(p.b)
o=p.r
n=u.a
if(n>>>0!==n||n>=o.length)return H.a(o,n)
o[n]=o[n]+1}else if(j){C.a.a3(r,p.b)
o=u.a
n=p.r
if(o>>>0!==o||o>=n.length)return H.a(n,o)
n[o]=n[o]-1}}else{if(q>=s.length)return H.a(s,q)
o=J.af(s[q],1)
if(q>=s.length)return H.a(s,q)
s[q]=o}}u.b.t(z)}}},
mP:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=H.A(new Array(a.gi1().length),[[P.c,D.dm]])
for(y=a.x,x=z.length,w=[D.dm],v=0;v<y.length;++v){u=y[v]
t=J.o(u)
s=t.gl(u)
if(s>>>0!==s||s>=x)return H.a(z,s)
if(z[s]==null){s=t.gl(u)
r=H.A([],w)
if(s>>>0!==s||s>=x)return H.a(z,s)
z[s]=r}s=t.gl(u)
if(s>>>0!==s||s>=x)return H.a(z,s)
s=z[s]
t=t.gae(u)
r=J.o(t)
s.push(new D.dm(v,17179869184*(C.b.cL(r.gm(t)*50)+65536)+131072*(C.b.cL(r.gn(t)*50)+65536)+(C.b.cL(r.gao(t)*50)+65536)))}for(v=0;v<x;++v){w=z[v]
if(w!=null){t=new D.mQ()
s=w.length-1
if(s-0<=32)H.di(w,0,s,t)
else H.dh(w,0,s,t)}}q=H.A([],[G.b0])
for(w=a.f,p=0;p<w.length;++p){o=w[p]
t=o.gaP().a
if(t>>>0!==t||t>=x)return H.a(z,t)
if(z[t]!=null){t=o.gcE().a
if(t>>>0!==t||t>=x)return H.a(z,t)
t=z[t]==null}else t=!0
if(t)continue
t=o.gaP().a
if(t>>>0!==t||t>=x)return H.a(z,t)
t=z[t].length
s=o.gcE().a
if(s>>>0!==s||s>=x)return H.a(z,s)
n=t<z[s].length
m=n?o.b.a:o.c.a
l=n?o.c.a:o.b.a
if(m>>>0!==m||m>=x)return H.a(z,m)
k=0
j=0
$REACTION$1:for(;t=z[m],s=t.length,k<s;++k){if(k<0)return H.a(t,k)
t=t[k]
i=t.b
if(l>>>0!==l||l>=x)return H.a(z,l)
while(!0){s=z[l]
r=s.length
if(j<0||j>=r)return H.a(s,j)
s=s[j]
h=s.b
if(!(h<i))break;++j
if(j===r)break $REACTION$1}t=t.a
r=y.length
if(t>=r)return H.a(y,t)
g=y[t]
s=s.a
if(s>=r)return H.a(y,s)
f=y[s]
if(h===i){t=n?g:f
t=o.ih(t,n?f:g)}else t=!1
if(t){t=z[m]
if(k>=t.length)return H.a(t,k)
t=t[k]
s=z[l]
if(j>=s.length)return H.a(s,j)
q.push(new G.b0(t.a,s[j].a,p))
s=z[m];(s&&C.a).eB(s,k)
s=z[l];(s&&C.a).eB(s,j);--k
if(j===z[l].length)break $REACTION$1}}}a.ha(q)},
mR:function(a){var z,y,x,w,v,u,t,s,r,q
z=P.l
y=new H.G(0,null,null,null,null,null,0,[z,[P.c,[S.ae,P.l,P.L]]])
for(z=[z,P.L],x=0;x<a.geH().length;++x){w=a.r
if(x>=w.length)return H.a(w,x)
v=w[x]
y.cG(0,v.gaP().a,new D.mS())
w=y.h(0,v.gaP().a)
u=v.a.a
if(0>=u.length)return H.a(u,0)
J.dE(w,new S.ae(x,u[0],z))}for(z=a.x,w=a.r,x=0;u=z.length,x<u;++x){if(x<0)return H.a(z,x)
t=J.c4(z[x])
if(y.bA(0,t))for(u=J.c1(y.h(0,t));u.D();){v=u.gH()
s=C.f.a1()
r=v.gcA()
if(typeof r!=="number")return H.m(r)
if(s<r){u=v.a
if(u>>>0!==u||u>=w.length)return H.a(w,u)
a.ii(x,w[u].gi7())
q=x-1
x=q
break}}}},
dm:{"^":"f;a,ef:b<"},
mQ:{"^":"h:3;",
$2:function(a,b){return a.gef()-b.gef()},
$isi:1},
mS:{"^":"h:0;",
$0:function(){return H.A([],[[S.ae,P.l,P.L]])},
$isi:1}}],["","",,D,{}],["","",,Z,{"^":"",
e4:function(a,b){var z,y,x
z=J.cG(a,b,1)
if(0>=z.length)return H.a(z,0)
z=z[0]
if(z>=3)return H.a(C.u,z)
b+=4
switch(C.u[z]){case C.j:return new Z.c6(new T.cN(new T.p(C.c.F(a,b,3)),new T.p(C.c.F(a,b+12,3))),C.j)
case C.k:z=C.c.F(a,b,3)
y=C.c.F(a,b+12,1)
x=y.length
if(x===0)H.E(H.ah())
if(0>=x)return H.a(y,0)
return new Z.cn(new T.p(z),y[0],C.k)
case C.l:z=C.c.F(a,b,3)
y=C.c.F(a,b+12,3)
z=new Z.cX(new T.p(z),null,null,null,C.l)
z.c=new T.p(y)
z.d=C.i.a2(y,P.fY())
z.e=C.i.a2(y,P.cE())
return z
default:return}},
mf:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g
z=b.c.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
w=x*x
if(1>=y)return H.a(z,1)
x=z[1]
v=x*x
if(2>=y)return H.a(z,2)
z=z[2]
u=z*z
t=w*v
s=w*u
r=v*u
z=b.b
y=H.k(3)
x=new Float32Array(y)
q=new T.p(x)
q.t(a.a)
q.ai(z)
if(0>=y)return H.a(x,0)
p=x[0]
if(1>=y)return H.a(x,1)
o=x[1]
if(2>=y)return H.a(x,2)
n=x[2]
x=a.b.a
y=x.length
if(0>=y)return H.a(x,0)
m=x[0]
if(1>=y)return H.a(x,1)
l=x[1]
if(2>=y)return H.a(x,2)
k=x[2]
j=r*m*m+s*l*l+t*k*k
i=r*2*p*m+s*2*o*l+t*2*n*k
h=i*i-4*j*(r*p*p+s*o*o+t*n*n-t*u)
if(h<0)return
else{g=Math.sqrt(h)
z=-i
y=2*j
return[(z+g)/y,(z-g)/y]}},
mg:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=H.k(3)
y=new Float32Array(z)
x=new T.p(y)
x.t(a.a)
x.ai(b.a)
if(0>=z)return H.a(y,0)
w=y[0]
if(1>=z)return H.a(y,1)
v=y[1]
if(2>=z)return H.a(y,2)
u=y[2]
y=a.b.a
z=y.length
if(0>=z)return H.a(y,0)
t=y[0]
if(1>=z)return H.a(y,1)
s=y[1]
if(2>=z)return H.a(y,2)
r=y[2]
q=t*t+s*s+r*r
p=w*t+v*s+u*r
y=b.b
y=J.aZ(y,y)
if(typeof y!=="number")return H.m(y)
o=p*p-4*q*(w*w+v*v+u*u-y)
if(o<0)return
else{n=Math.sqrt(o)
z=-p
y=2*q
return[(z+n)/y,(z-n)/y]}},
h1:function(a,b){var z,y,x,w,v
do{z=a.a1()-0.5
y=a.a1()-0.5
x=a.a1()-0.5}while(Math.sqrt(z*z+y*y+x*x)>=0.25)
w=b.a
v=w.length
if(0>=v)return H.a(w,0)
w[0]=2*z
if(1>=v)return H.a(w,1)
w[1]=2*y
if(2>=v)return H.a(w,2)
w[2]=2*x},
c6:{"^":"ca;b,a",
k:function(a){return"AABB domain {min: "+this.b.a.k(0)+", max: "+this.b.b.k(0)+"}"},
gaZ:function(){var z,y
z=this.b
y=z.a.a.byteLength
z=z.b.a.byteLength
if(typeof y!=="number")return y.G()
if(typeof z!=="number")return H.m(z)
return y+z},
b_:function(a,b,c){var z,y,x,w
z=T.hB(a,b)
y=this.b
x=z.a
x.t(y.a)
w=z.b
w.t(y.b)
this.b=z
z=x.a.byteLength
if(typeof z!=="number")return H.m(z)
w=w.a.byteLength
if(typeof w!=="number")return H.m(w)
return b+z+w},
cj:function(a,b){return this.b_(a,b,!0)},
cs:function(){return this.b},
U:function(a,b){var z,y,x,w,v,u,t,s
z=this.b
y=z.a.a
x=y.length
if(0>=x)return H.a(y,0)
w=y[0]
v=b.a
u=v.length
if(0>=u)return H.a(v,0)
t=v[0]
if(w<t){if(1>=x)return H.a(y,1)
w=y[1]
if(1>=u)return H.a(v,1)
s=v[1]
if(w<s){if(2>=x)return H.a(y,2)
y=y[2]
if(2>=u)return H.a(v,2)
v=v[2]
if(y<v){z=z.b.a
y=z.length
if(0>=y)return H.a(z,0)
if(z[0]>t){if(1>=y)return H.a(z,1)
if(z[1]>s){if(2>=y)return H.a(z,2)
z=z[2]>v}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1
return z}},
cW:{"^":"f;aM:a>,b",
k:function(a){return this.b}},
ca:{"^":"f;l:a*",
hi:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
new Float32Array(H.k(3))
z=this.cs()
y=z.a
x=H.k(3)
w=new Float32Array(x)
v=new T.p(w)
v.t(z.b)
v.ai(y)
do{u=C.f.a1()
t=C.f.a1()
s=C.f.a1()
r=new Float32Array(3)
if(0>=3)return H.a(r,0)
r[0]=u
if(1>=3)return H.a(r,1)
r[1]=t
if(2>=3)return H.a(r,2)
r[2]=s
s=r[0]
if(0>=x)return H.a(w,0)
r[0]=s*w[0]
s=r[1]
if(1>=x)return H.a(w,1)
r[1]=s*w[1]
s=r[2]
if(2>=x)return H.a(w,2)
r[2]=s*w[2]
q=new T.p(new Float32Array(3))
q.t(y)
q.q(0,new T.p(r))
p=this.U(0,q)
if(p&&a.length!==0)for(u=a.length,o=0;o<a.length;a.length===u||(0,H.P)(a),++o)if(a[o].U(0,q)){p=!1
break}}while(!p)
return q},
hh:function(a){return this.hi(a,null)},
S:function(a,b,c){var z,y
z=(a&&C.c).b0(a,b,1)
y=J.hl(this.a)
if(0>=z.length)return H.a(z,0)
z[0]=y
if(typeof b!=="number")return b.G()
return this.cj(a,b+4)},
M:function(a,b){return this.S(a,b,!0)}},
cX:{"^":"ca;cp:b<,c,d,e,a",
scU:function(a){this.c=a
this.d=C.i.a2(a.a,P.fY())
this.e=C.i.a2(this.c.a,P.cE())},
k:function(a){return"ellipsoid domain {center: "+this.b.k(0)+", semiAxes: "+J.au(this.c)+"}"},
gaZ:function(){var z,y
z=this.b.a.byteLength
y=this.c.a.byteLength
if(typeof z!=="number")return z.G()
if(typeof y!=="number")return H.m(y)
return z+y},
b_:function(a,b,c){var z,y
z=D.bY(a,b,this.b,!0)
this.b=z
z=z.a.byteLength
if(typeof z!=="number")return H.m(z)
y=b+z
this.scU(D.bY(a,y,this.c,!0))
z=this.c.a.byteLength
if(typeof z!=="number")return H.m(z)
return y+z},
cj:function(a,b){return this.b_(a,b,!0)},
cs:function(){var z,y,x,w
z=this.b
y=this.c
x=new T.p(new Float32Array(H.k(3)))
x.t(z)
x.ai(y)
y=this.b
z=this.c
w=new T.p(new Float32Array(H.k(3)))
w.t(y)
w.q(0,z)
return T.bn(x,w)},
U:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=J.af(b,this.b)
y=J.o(z)
x=y.gm(z)
w=y.gm(z)
v=this.c.a
if(0>=v.length)return H.a(v,0)
v=v[0]
u=y.gn(z)
t=y.gn(z)
s=this.c.a
if(1>=s.length)return H.a(s,1)
s=s[1]
r=y.gao(z)
y=y.gao(z)
q=this.c.a
if(2>=q.length)return H.a(q,2)
q=q[2]
return x*w/(v*v)+u*t/(s*s)+r*y/(q*q)<1},
ee:function(a){var z,y,x,w,v
z=this.b
y=H.k(3)
x=new Float32Array(y)
w=new T.p(x)
w.t(a)
w.ai(z)
if(0>=y)return H.a(x,0)
z=x[0]
if(1>=y)return H.a(x,1)
w=x[1]
if(2>=y)return H.a(x,2)
x=x[2]
v=Math.sqrt(z*z+w*w+x*x)
z=this.e
if(typeof z!=="number")return H.m(z)
if(v>z)z=v-z
else{z=this.d
if(typeof z!=="number")return H.m(z)
z=v<z?z-v:0}return z},
ct:function(a){return Z.mf(a,this)}},
cn:{"^":"ca;cp:b<,c,a",
k:function(a){return"spherical domain {center: "+this.b.k(0)+", radius: "+H.j(this.c)+"}"},
gaZ:function(){var z=this.b.a.byteLength
if(typeof z!=="number")return z.G()
return z+4},
b_:function(a,b,c){var z,y,x
z=D.bY(a,b,this.b,!0)
this.b=z
z=z.a.byteLength
if(typeof z!=="number")return H.m(z)
y=b+z
z=(a&&C.c).F(a,y,1)
x=this.c
if(0>=z.length)return H.a(z,0)
z[0]=x
return y+4},
cj:function(a,b){return this.b_(a,b,!0)},
cs:function(){var z,y,x
z=this.c
if(typeof z!=="number")return z.io()
y=new T.p(new Float32Array(H.k(3)))
y.bT(-z)
y.q(0,this.b)
z=this.c
x=new T.p(new Float32Array(H.k(3)))
x.bT(z)
x.q(0,this.b)
return T.bn(y,x)},
U:function(a,b){var z,y
z=J.at(J.af(b,this.b))
y=this.c
if(typeof y!=="number")return H.m(y)
return z<y},
ee:function(a){var z,y,x,w
z=this.b
y=H.k(3)
x=new Float32Array(y)
w=new T.p(x)
w.t(a)
w.ai(z)
if(0>=y)return H.a(x,0)
z=x[0]
if(1>=y)return H.a(x,1)
w=x[1]
if(2>=y)return H.a(x,2)
x=x[2]
x=Math.sqrt(z*z+w*w+x*x)
w=this.c
if(typeof w!=="number")return H.m(w)
return Math.abs(x-w)},
ct:function(a){var z,y,x
z=this.b
y=this.c
x=new T.p(new Float32Array(H.k(3)))
x.t(z)
return Z.mg(a,new T.k5(x,y))}}}],["","",,N,{"^":"",hK:{"^":"i5;z,Q,ch,cx,cy,db,dx,dy,fr,a,b,c,d,e,f,r,x,y",
hs:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.z
if(z.r&&!z.f){y=z.e
y.dW()
x=z.b
y.a.cN()
x.eO(0,J.cK(y.a));++z.c
y=z.y
x=x.cQ()
if(y.b>=4)H.E(y.aF())
w=y.b
if((w&1)!==0)y.a0(x)
else if((w&3)===0)y.aG().q(0,new P.b8(x,null,[H.z(y,0)]))}y=z.c
if(y>this.fr){this.fr=y
y=this.ch
x=z.b
w=x.a
v=x.c
x=x.b.a
if(3>=x.length)return H.a(x,3)
y.aQ(J.dF(w,v,x[3]*7))}this.Q.b=b
y=this.cy
J.cM(y.a,y.d)
y=this.e
x=this.cy.Q.h(0,"uViewportRatio")
w=this.b
v=this.c
if(typeof w!=="number")return w.aA()
if(typeof v!=="number")return H.m(v)
J.hw(y,x,w/v)
J.hx(this.e,this.cy.Q.h(0,"uLightPosition"),new Float32Array(H.a2([3,3,10])))
v=this.Q
z=z.b
w=z.b.a
if(3>=w.length)return H.a(w,3)
v.ht(0,4,w[3],P.a0(["aParticlePosition",1,"aParticleColor",1,"aParticleRadius",1]))
u=z.eV()
for(z=u.length,t=0;t<z;++t){s=u[t]
y=J.v(s)
if(!!y.$isc6){y=this.dx
x=s.b
r=new T.ai(new Float32Array(16))
r.bi()
w=x.a
v=new Float32Array(3)
q=new T.p(v)
q.t(x.b)
q.ai(w)
w=w.a
x=w.length
if(0>=x)return H.a(w,0)
p=w[0]
if(1>=x)return H.a(w,1)
o=w[1]
if(2>=x)return H.a(w,2)
r.bK(0,p,o,w[2])
if(0>=3)return H.a(v,0)
w=v[0]
if(1>=3)return H.a(v,1)
o=v[1]
if(2>=3)return H.a(v,2)
r.bP(0,w,o,v[2])
v=b.Z(0,r)
y.a.b=v
y.b.b=v
n=this.dx}else if(!!y.$iscn){y=this.dy
x=s.b
w=s.c
v=new Float32Array(3)
if(2>=3)return H.a(v,2)
v[2]=w
v[1]=w
v[0]=w
v=b.Z(0,S.ep(x,new T.p(v)))
y.a.b=v
y.b.b=v
n=this.dy}else if(!!y.$iscX){y=this.dy
x=b.Z(0,S.ep(s.b,s.c))
y.a.b=x
y.b.b=x
n=this.dy}else n=null
if(n!=null){y=this.db
J.cM(y.a,y.d)
J.cI(this.e,1029)
y=this.e
x=this.db.Q.h(0,"uLineColor")
w=new Float32Array(4)
w[3]=0.3
w[2]=1
w[1]=1
w[0]=1
J.dN(y,x,w)
y=n.b
y.cd()
y.d.bF(y.c)
m=y.d.b
J.dH(y.a,4,m,5123,0)
J.cI(this.e,1028)
x=this.e
w=this.db.Q.h(0,"uLineColor")
v=new Float32Array(4)
v[3]=1
v[2]=1
v[1]=1
v[0]=1
J.dN(x,w,v)
y.cd()
y.d.bF(y.c)
m=y.d.b
J.dH(y.a,4,m,5123,0)}}}}}],["","",,G,{"^":"",es:{"^":"f;a,b,$ti",
j:function(a,b,c){this.b.j(0,b,this.a.length)
this.a.push(c)},
h:function(a,b){return this.b.h(0,b)},
gi:function(a){return this.a.length},
ba:function(a){var z=new Float32Array(H.k(this.a.length))
a.X(0,new G.im(this,z))
return z}},im:{"^":"h:3;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.b.h(0,a)
if(y>>>0!==y||y>=z.length)return H.a(z,y)
z[y]=b},
$isi:1},eF:{"^":"f;a,aM:b>,c,d,e,f,r,x,bk:y>",
fb:function(a,b,c){var z,y
if(b){z=this.e
if(a>>>0!==a||a>=z.length)return H.a(z,a)
if(z[a]===0)z=!1
else{z=$.$get$bE().a1()
y=this.e
if(a>=y.length)return H.a(y,a)
y=z<y[a]
z=y}return z}else if(c){z=this.f
if(a>>>0!==a||a>=z.length)return H.a(z,a)
if(z[a]===0)z=!1
else{z=$.$get$bE().a1()
y=this.f
if(a>=y.length)return H.a(y,a)
y=z<y[a]
z=y}return z}else return!1},
gcW:function(){var z,y,x,w,v,u,t
z=this.a.gaZ()
y=this.c.byteLength
if(typeof y!=="number")return H.m(y)
x=this.d.byteLength
if(typeof x!=="number")return H.m(x)
w=this.e.byteLength
if(typeof w!=="number")return H.m(w)
v=this.f.byteLength
if(typeof v!=="number")return H.m(v)
u=this.r.byteLength
if(typeof u!=="number")return H.m(u)
t=this.x.byteLength
if(typeof t!=="number")return H.m(t)
return 4+z+y+x+w+v+u+t},
S:function(a,b,c){var z,y
z=this.a.S(a,b,!0)
y=D.cF(a,z,!0,this.c)
this.c=y
y=y.byteLength
if(typeof y!=="number")return H.m(y)
z+=y
y=D.cF(a,z,!0,this.d)
this.d=y
y=y.byteLength
if(typeof y!=="number")return H.m(y)
z+=y
y=D.cF(a,z,!0,this.e)
this.e=y
y=y.byteLength
if(typeof y!=="number")return H.m(y)
z+=y
y=D.cF(a,z,!0,this.f)
this.f=y
y=y.byteLength
if(typeof y!=="number")return H.m(y)
z+=y
y=D.h5(a,z,!0,this.r)
this.r=y
y=y.byteLength
if(typeof y!=="number")return H.m(y)
z+=y
y=D.h5(a,z,!0,this.x)
this.x=y
y=y.byteLength
if(typeof y!=="number")return H.m(y)
return z+y},
M:function(a,b){return this.S(a,b,!0)},
v:{"^":"ou<"}},eM:{"^":"f;l:a*,b,c,bk:d>,e,d_:f<,b4:r<,hY:x<",
gae:function(a){return this.b},
sbz:function(a,b){return this.c.cv(b.a)},
si8:function(a,b){var z=this.e.a
if(0>=z.length)return H.a(z,0)
z[0]=b
return},
e8:function(a){return C.a.U(this.r,a)},
cZ:function(a,b,c){var z,y,x,w,v,u
this.f=a
if(c){z=b.gcp()
y=this.b
x=b.gcp()
w=new T.p(new Float32Array(H.k(3)))
w.t(y)
w.ai(x)
v=T.jT(z,w)
u=b.ct(v)
w=this.b
z=(u&&C.a).a2(u,P.cE())
x=new T.p(new Float32Array(H.k(3)))
x.t(v.b)
x.ah(0,z)
x.q(0,v.a)
w.t(x)}},
gbD:function(){return this.f!==-1},
bM:function(){var z=this.f
if(!(z!==-1)){z=this.r
z=z.length!==0?C.a.gaN(z):-1}return z},
S:function(a,b,c){var z,y
z=D.bY(a,b,this.b,!0)
this.b=z
z=z.a.byteLength
if(typeof b!=="number")return b.G()
if(typeof z!=="number")return H.m(z)
y=b+z
z=D.bY(a,y,this.c,!0)
this.c=z
z=z.a.byteLength
if(typeof z!=="number")return H.m(z)
return this.e.S(a,y+z,!0)},
M:function(a,b){return this.S(a,b,!0)}},V:{"^":"f;dZ:a<,bk:b>,c"},eU:{"^":"f;",
S:function(a,b,c){return this.a.S(a,b,!0)},
M:function(a,b){return this.S(a,b,!0)}},N:{"^":"f;l:a*,b",
gd_:function(){return this.b===1}},bp:{"^":"eU;aP:b<,cE:c<,i0:d<,a",
ih:function(a,b){var z,y,x,w
z=this.b
if(!J.H(J.c4(a),z.a)||!J.H(J.c4(b),this.c.a))throw H.b(P.a8("[a] should correspond to [particleA] and [b] to [particleB]"))
y=this.a
x=y.a
if(0>=x.length)return H.a(x,0)
if(x[0]!==1){x=$.$get$bE().a1()
y=y.a
if(0>=y.length)return H.a(y,0)
y=x<y[0]}else y=!0
if(y){switch(z.b){case 0:if(a.gb4().length===0)return!1
w=C.a.gaN(a.r)
break
case 1:if(!a.gbD())return!1
w=a.f
break
default:w=-1}switch(this.c.b){case 0:if(b.gb4().length===0)z=!1
else{z=C.a.gaN(b.r)
z=z==null?w==null:z===w}return z
case 1:if(!b.gbD())z=!1
else{z=b.f
z=z==null?w==null:z===w}return z
case 2:return!b.e8(w)}}return!1}},b0:{"^":"f;a,at:b>,c"},cq:{"^":"eU;aP:b<,i7:c<,a"},jX:{"^":"f;au:a>,b,ey:c<",
eO:function(a,b){var z,y,x
this.a=b
z=new G.eW(null)
z.S(b,0,!1)
this.b=z
z=z.a
y=z.length
if(1>=y)return H.a(z,1)
x=z[1]
if(2>=y)return H.a(z,2)
this.c=24+4*(x+z[2])},
cQ:function(){var z,y,x,w,v,u,t,s,r,q
z=this.b.a
if(5>=z.length)return H.a(z,5)
z=new Array(z[5])
z.fixed$length=Array
y=H.A(z,[[S.ae,[P.c,P.l],[P.c,P.l]]])
z=this.b.a
if(4>=z.length)return H.a(z,4)
x=z[4]
z=P.l
w=[P.c,P.l]
w=[w,w]
v=y.length
u=0
while(!0){t=this.b.a
if(5>=t.length)return H.a(t,5)
if(!(u<t[5]))break
t=Z.e4(this.a,x).gaZ()
s=this.b.a
if(0>=s.length)return H.a(s,0)
s=s[0]
x=x+(4+t)+16*s
r=J.cG(this.a,x,s)
s=r.byteLength
if(typeof s!=="number")return H.m(s)
x+=s
s=this.a
t=this.b.a
if(0>=t.length)return H.a(t,0)
q=J.cG(s,x,t[0])
t=q.byteLength
if(typeof t!=="number")return H.m(t)
x+=t
t=P.aJ(r,!0,z)
s=P.aJ(q,!0,z)
if(u>=v)return H.a(y,u)
y[u]=new S.ae(t,s,w);++u}return y},
eV:function(){var z,y,x,w,v,u,t
z=this.b.a
if(5>=z.length)return H.a(z,5)
y=H.A(new Array(z[5]),[Z.ca])
z=this.b
x=z.a
if(4>=x.length)return H.a(x,4)
w=x[4]
x=y.length
v=0
while(!0){z=z.a
if(5>=z.length)return H.a(z,5)
if(!(v<z[5]))break
z=Z.e4(this.a,w)
if(v>=x)return H.a(y,v)
y[v]=z
z=z.gaZ()
u=this.b
t=u.a
if(0>=t.length)return H.a(t,0)
w=w+(4+z)+24*t[0];++v
z=u}return y}},eV:{"^":"f;a,au:b>,c,ey:d<,i1:e<,hb:f<,eH:r<,ex:x<,hW:y<",
dc:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p
z=this.e
if(a>>>0!==a||a>=z.length)return H.a(z,a)
y=z[a]
z=y.gdZ()
x=y.b
w=y.c
v=this.y
u=v.length
w=new Float32Array(H.a2([w])).buffer
w=(w&&C.c).F(w,0,1)
t=P.l
s=H.A([],[t])
r=new G.eM(a,b,z,x,new D.aG(w),-1,s,P.ay(u,0,!0,t))
t=this.x
r.M(this.b,this.d+28*t.length)
t.push(r)
if(c!=null)for(z=c.length,q=0;q<c.length;c.length===z||(0,H.P)(c),++q){p=c[q]
if(p>>>0!==p||p>=v.length)return H.a(v,p)
x=v[p]
s.push(x.b)
x=x.r
w=r.a
if(w>>>0!==w||w>=x.length)return H.a(x,w)
x[w]=x[w]+1}else this.eP(r)
return r},
fF:function(a,b){return this.dc(a,b,null)},
dK:function(a,b,c,d){var z
this.a.p("group: addRandomParticles")
this.a.p("Add "+c+" particles:\n  type: "+H.j(a)+"\n  domain: "+b.k(0))
this.ce(c,0)
for(z=0;z<c;++z)this.fF(a,b.hh(d))
$.$get$al().p("groupEnd")},
aI:function(a,b,c){return this.dK(a,b,c,C.M)},
dI:function(a){var z,y,x,w,v
this.a.p("group: addMembrane")
this.a.p("Add membrane:\n  domain: "+a.a.k(0))
this.ce(0,a.gcW())
z=this.y
a.b=z.length
y=this.b
x=this.c.a
if(4>=x.length)return H.a(x,4)
a.M(y,x[4]+this.gcl())
z.push(a)
for(z=this.x,y=z.length,w=0;w<z.length;z.length===y||(0,H.P)(z),++w){v=z[w]
this.eP(v)
C.a.q(v.ghY(),0)}$.$get$al().p("groupEnd")},
eD:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=this.x
if(a>>>0!==a||a>=z.length)return H.a(z,a)
y=z[a]
for(x=y.gb4(),w=x.length,v=this.y,u=0;t=x.length,u<t;t===w||(0,H.P)(x),++u){s=x[u]
if(s>>>0!==s||s>=v.length)return H.a(v,s)
r=v[s]
q=y.a
r=r.r
if(q>>>0!==q||q>=r.length)return H.a(r,q)
r[q]=r[q]-1}x=y.f
if(x!==-1){if(x>>>0!==x||x>=v.length)return H.a(v,x)
x=v[x]
w=y.a
x=x.x
if(w>>>0!==w||w>=x.length)return H.a(x,w)
x[w]=x[w]-1}if(0>=z.length)return H.a(z,-1)
p=z.pop()
if(a<z.length){p.M(this.b,this.d+a*28)
if(a>=z.length)return H.a(z,a)
z[a]=p}},
e2:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=J.o(a)
y=z.gl(a)
x=this.e
if(b>>>0!==b||b>=x.length)return H.a(x,b)
w=x[b]
z.sl(a,b)
z.sbz(a,w.gdZ())
z.si8(a,w.c)
a.d=w.b
for(z=a.r,x=z.length,v=this.y,u=0;t=z.length,u<t;t===x||(0,H.P)(z),++u){s=z[u]
if(s>>>0!==s||s>=v.length)return H.a(v,s)
r=v[s].r
q=r.length
if(y>>>0!==y||y>=q)return H.a(r,y)
r[y]=r[y]-1
if(b>=q)return H.a(r,b)
r[b]=r[b]+1}z=a.f
if(z!==-1){if(z>>>0!==z||z>=v.length)return H.a(v,z)
z=v[z].x
x=z.length
if(y>>>0!==y||y>=x)return H.a(z,y)
z[y]=z[y]-1
if(b>=x)return H.a(z,b)
z[b]=z[b]+1}},
e1:function(a,b,c,d){var z,y,x
switch(c){case 1:if(b===-1)throw H.b(P.a8("ctxMembrane cannot be -1 if location is sticked"))
z=a.f
if(z==null?b!=null:z!==b){z=a.r
if(C.a.U(z,b)){y=this.y
if(b>>>0!==b||b>=y.length)return H.a(y,b)
y=y[b]
C.a.a3(z,y.b)
z=a.a
y=y.r
if(z>>>0!==z||z>=y.length)return H.a(y,z)
y[z]=y[z]-1}z=this.y
if(b>>>0!==b||b>=z.length)return H.a(z,b)
z=z[b]
a.cZ(z.b,z.a,d)
z=z.x
y=a.a
if(y>>>0!==y||y>=z.length)return H.a(z,y)
z[y]=z[y]+1}break
case 0:z=a.r
if(!C.a.U(z,b)){y=a.f
if(y==null?b==null:y===b){y=this.y
if(b>>>0!==b||b>=y.length)return H.a(y,b)
y=y[b]
x=a.a
y=y.x
if(x>>>0!==x||x>=y.length)return H.a(y,x)
y[x]=y[x]-1
a.f=-1}y=this.y
if(b>>>0!==b||b>=y.length)return H.a(y,b)
y=y[b]
z.push(y.b)
y=y.r
z=a.a
if(z>>>0!==z||z>=y.length)return H.a(y,z)
y[z]=y[z]+1}break
case 2:if(b!==-1){z=a.r
if(C.a.U(z,b)){y=this.y
if(b>>>0!==b||b>=y.length)return H.a(y,b)
y=y[b]
C.a.a3(z,y.b)
z=a.a
y=y.r
if(z>>>0!==z||z>=y.length)return H.a(y,z)
y[z]=y[z]-1}else{z=a.f
if(z==null?b==null:z===b){y=this.y
if(z>>>0!==z||z>=y.length)return H.a(y,z)
z=y[z]
y=a.a
z=z.x
if(y>>>0!==y||y>=z.length)return H.a(z,y)
z[y]=z[y]-1
a.f=-1}}}break}},
e0:function(a,b,c){return this.e1(a,b,c,!0)},
eP:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.y
if(z.length===0)return
y=J.o(a)
x=y.gae(a)
w=new Float32Array(3)
if(0>=3)return H.a(w,0)
w[0]=1
if(1>=3)return H.a(w,1)
w[1]=0
if(2>=3)return H.a(w,2)
w[2]=0
v=new T.p(new Float32Array(3))
v.t(x)
x=new T.p(new Float32Array(3))
x.t(new T.p(w))
u=new T.eT(v,x)
t=H.A([],[[S.ae,P.l,P.L]])
for(x=[P.l,P.L],s=0;s<z.length;++s){r=z[s].a
if(r.U(0,y.gae(a))){q=r.ct(u)
t.push(new S.ae(s,(q&&C.a).a2(q,P.cE()),x))}}y=new G.k4()
x=t.length-1
if(x-0<=32)H.di(t,0,x,y)
else H.dh(t,0,x,y)
for(y=t.length,p=0;p<t.length;t.length===y||(0,H.P)(t),++p){o=t[p].a
if(!a.e8(o)){if(o>>>0!==o||o>=z.length)return H.a(z,o)
x=z[o]
w=x.b
a.r.push(w)
x=x.r
w=a.a
if(w>>>0!==w||w>=x.length)return H.a(x,w)
x[w]=x[w]+1}}},
ha:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
for(z=a.length,y=0;y<z;++y){x=a[y]
w=x.a
v=x.b
if(w>v)a[y]=new G.b0(v,w,x.c)}C.a.f9(a,new G.k3())
for(z=a.length,x=this.x,w=this.f,u=0;u<a.length;a.length===z||(0,H.P)(a),++u){t=a[u]
v=t.a
s=t.b
r=t.c
q=x.length
if(v>=q)return H.a(x,v)
p=x[v]
if(s>=q)return H.a(x,s)
o=x[s]
if(r>=w.length)return H.a(w,r)
n=w[r].gi0()
this.e2(p,n.a)
v=n.b
if(v===1){if(r>=w.length)return H.a(w,r)
q=w[r].gaP()
if(r>=w.length)return H.a(w,r)
r=w[r].gcE().b===1
if(q.b===1)r=!r}else r=!1
if(r)if(!p.gbD()){r=J.bJ(o)
p.b.cv(J.cL(r))}r=p.bM()
q=o.bM()
this.e1(p,Math.max(H.bh(r),H.bh(q)),v,!1)
this.eD(s)}},
ii:function(a,b){var z,y,x,w,v,u
if(b.length!==0){z=this.x
if(a<0||a>=z.length)return H.a(z,a)
y=z[a]
x=P.aJ(y.gb4(),!0,P.l)
w=y.bM()
this.e2(y,C.a.gaj(b).a)
this.e0(y,w,C.a.gaj(b).b)
this.ce(b.length-1,0)
for(v=1;v<b.length;++v){u=b[v]
this.e0(this.dc(u.a,y.b,x),w,u.b)}}else this.eD(a)},
i2:function(){var z,y,x,w,v,u,t,s,r,q
z=this.x
y=z.length
if(y!==0){if(0>=y)return H.a(z,0)
x=J.dG(J.bJ(z[0]))
if(0>=z.length)return H.a(z,0)
w=J.dG(J.bJ(z[0]))
for(y=x.a,v=y.length,u=w.a,t=u.length,s=1;s<z.length;++s){r=J.bJ(z[s])
if(0>=v)return H.a(y,0)
q=J.o(r)
y[0]=Math.min(y[0],q.gm(r))
if(1>=v)return H.a(y,1)
y[1]=Math.min(y[1],q.gn(r))
if(2>=v)return H.a(y,2)
y[2]=Math.min(y[2],q.gao(r))
if(s>=z.length)return H.a(z,s)
r=J.bJ(z[s])
if(0>=t)return H.a(u,0)
q=J.o(r)
u[0]=Math.max(u[0],q.gm(r))
if(1>=t)return H.a(u,1)
u[1]=Math.max(u[1],q.gn(r))
if(2>=t)return H.a(u,2)
u[2]=Math.max(u[2],q.gao(r))}return T.bn(x,w)}else{z=new Float32Array(H.k(3))
y=new T.p(new Float32Array(H.k(3)))
y.bT(1)
return T.bn(new T.p(z),y)}},
M:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=this.x
this.a.p("Transfer to a larger buffer:\n  particle count: "+z.length+"\n  extra particles: "+H.j(a)+"\n  extra membrane bytes: "+H.j(b))
y=this.f
x=y.length
w=this.r
v=w.length
u=z.length
if(typeof a!=="number")return H.m(a)
t=24+4*(x+v)+28*(u+a+1e4)
u=this.gcl()
if(typeof b!=="number")return H.m(b)
s=t+u+b+120
this.a.p("New buffer size: "+H.j(s)+" bytes")
r=new DataView(new ArrayBuffer(H.k(s))).buffer
u=this.c
q=u.M(r,0)
u=u.a
if(4>=u.length)return H.a(u,4)
u[4]=t
for(x=y.length,p=0;p<y.length;y.length===x||(0,H.P)(y),++p)q=y[p].M(r,q)
for(y=w.length,p=0;p<w.length;w.length===y||(0,H.P)(w),++p)q=w[p].M(r,q)
for(y=z.length,p=0;p<z.length;z.length===y||(0,H.P)(z),++p)q=z[p].M(r,q)
for(z=this.y,y=z.length,q=t,p=0;p<z.length;z.length===y||(0,H.P)(z),++p)q=z[p].M(r,q)
this.b=r
this.a.p("Buffer transfer has finished.")},
gcl:function(){var z,y,x,w
for(z=this.y,y=z.length,x=0,w=0;w<z.length;z.length===y||(0,H.P)(z),++w)x+=z[w].gcW()
return x},
ce:function(a,b){var z,y,x,w,v
if(a>0){z=this.d
y=this.x.length
x=this.c.a
if(4>=x.length)return H.a(x,4)
w=z+28*(y+a)<x[4]?0:a}else w=a
if(b>0){z=this.c.a
if(4>=z.length)return H.a(z,4)
z=z[4]
y=this.gcl()
x=this.b.byteLength
if(typeof x!=="number")return H.m(x)
v=z+y+b<=x?0:b}else v=b
if(w!==0||v!==0)this.M(w,v)},
cN:function(){var z,y,x
z=this.x.length
y=this.c.a
x=y.length
if(3>=x)return H.a(y,3)
y[3]=z
z=this.y.length
if(5>=x)return H.a(y,5)
y[5]=z},
fl:function(a,b,c){var z,y,x
this.a.p("group: Simulation")
z=this.c.a
y=z.length
if(1>=y)return H.a(z,1)
x=z[1]
if(2>=y)return H.a(z,2)
this.d=24+4*(x+z[2])
this.M(0,0)
$.$get$al().p("groupEnd")},
v:{
df:function(a,b,c){var z,y,x,w,v,u,t
z=N.aK("bromium.structs.Simulation")
y=a.length
x=b.length
w=c.length
v=new G.eW(null)
u=H.k(6)
t=new Uint32Array(u)
v.a=t
if(0>=u)return H.a(t,0)
t[0]=y
if(1>=u)return H.a(t,1)
t[1]=x
if(2>=u)return H.a(t,2)
t[2]=w
v=new G.eV(z,null,v,0,a,b,c,[],[])
v.fl(a,b,c)
return v}}},k4:{"^":"h:22;",
$2:function(a,b){return J.hd(b.gcA(),a.gcA())},
$isi:1},k3:{"^":"h:23;",
$2:function(a,b){var z,y
z=J.dJ(b)
y=J.dJ(a)
if(typeof z!=="number")return z.B()
if(typeof y!=="number")return H.m(y)
return z-y},
$isi:1},eW:{"^":"f;a",
S:function(a,b,c){var z=J.o(a)
if(c){z=z.b0(a,b,6)
C.v.bQ(z,0,this.a)}else z=z.b0(a,b,6)
this.a=z
if(typeof b!=="number")return b.G()
return b+24},
M:function(a,b){return this.S(a,b,!0)},
v:{"^":"pt<"}},eY:{"^":"f;a,b",
eM:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=this.b
y=z.x
if(y.length!==0)return z
else{z.a=N.aK("bromium.structs.Simulation")
x=z.b
w=z.d
v=z.y.length
for(u=x&&C.c,t=z.e,s=P.l,r=[s],q=0;p=this.a,o=p.length,q<o;q=n){n=q+1
if(q<0)return H.a(p,q)
m=p[q]
q=n+1
if(n<0||n>=o)return H.a(p,n)
l=p[n]
k=H.A([],r)
while(!0){p=this.a
n=q+1
if(q<0||q>=p.length)return H.a(p,q)
j=p[q]
if(!(j!==-1))break
k.push(j)
q=n}p=u.F(x,w,3)
o=p.byteLength
if(typeof o!=="number")return H.m(o)
w+=o
o=C.c.F(x,w,3)
i=o.byteLength
if(typeof i!=="number")return H.m(i)
w+=i
i=C.c.F(x,w,1)
w+=4
if(m<0||m>=t.length)return H.a(t,m)
y.push(new G.eM(m,new T.p(p),new T.p(o),J.dL(t[m]),new D.aG(i),l,k,P.ay(v,0,!0,s)))}return z}},
fm:function(a){var z,y,x,w,v
z=this.b
z.a=null
y=H.A([],[P.l])
for(z=z.x,x=z.length,w=0;w<z.length;z.length===x||(0,H.P)(z),++w){v=z[w]
y.push(J.c4(v))
y.push(v.gd_())
C.a.h6(y,v.gb4())
y.push(-1)}C.a.si(z,0)
this.a=new Int16Array(H.a2(y))},
v:{
eZ:function(a){var z=new G.eY(null,a)
z.fm(a)
return z}}}}],["","",,D,{"^":"",
cF:function(a,b,c,d){var z=(a&&C.c).F(a,b,d.length)
C.i.bQ(z,0,d)
return z},
h5:function(a,b,c,d){var z=(a&&C.c).b0(a,b,d.length)
C.v.bQ(z,0,d)
return z},
bY:function(a,b,c,d){var z=new T.p((a&&C.c).F(a,b,3))
z.cv(c.a)
return z},
aG:{"^":"f;a",
S:function(a,b,c){var z,y
z=this.a
if(0>=z.length)return H.a(z,0)
y=z[0]
z=(a&&C.c).F(a,b,1)
this.a=z
if(0>=z.length)return H.a(z,0)
z[0]=y
z=z.byteLength
if(typeof b!=="number")return b.G()
if(typeof z!=="number")return H.m(z)
return b+z},
M:function(a,b){return this.S(a,b,!0)}}}],["","",,S,{"^":"",bo:{"^":"f;a,l:b>,c,d,e"},ft:{"^":"f;au:f>",
aQ:function(a){var z,y,x,w,v
z=a.length
y=this.a
x=this.d
w=this.f
v=J.o(y)
if(z===this.b){v.bx(y,x,w)
v.dN(y,x,0,a)}else{this.b=z
v.bx(y,x,w)
v.dM(y,x,a,this.c)}},
bF:function(a){var z,y,x,w,v,u
z=this.a
y=J.o(z)
y.bx(z,this.d,this.f)
for(x=this.e,w=x.length,v=0;v<x.length;x.length===w||(0,H.P)(x),++v){u=x[v]
y.eS(z,a.f.h(0,u.a),u.c,u.b,!1,u.d,u.e)}}},cb:{"^":"ft;a,b,c,d,e,f,$ti"},em:{"^":"cb;a,b,c,d,e,f",
$ascb:function(){return[P.kD]}},eq:{"^":"ft;"},ii:{"^":"eq;r,a,b,c,d,e,f"},ij:{"^":"eq;r,a,b,c,d,e,f"},i5:{"^":"f;",
dw:function(){var z=window
C.x.fH(z)
C.x.fY(z,W.fM(new S.i6(this)))},
fi:function(a,b){var z,y,x,w
z=this.a
this.e=J.hp(z,"webgl")
y=S.kr(z,1.1)
this.r=y
y.a.a=-10
J.hc(this.e,0,0,0,1)
J.cJ(this.e,2884)
J.cI(this.e,1028)
J.cJ(this.e,2929)
J.hf(this.e,513)
J.cJ(this.e,3042)
J.ha(this.e,770,771)
y=z.clientWidth
this.b=y
z=z.clientHeight
this.c=z
J.hA(this.e,0,0,y,z)
z=this.b
y=this.c
if(typeof z!=="number")return z.aA()
if(typeof y!=="number")return H.m(y)
x=new Float32Array(H.k(16))
w=Math.tan(this.d*0.017453292519943295*0.5)
x[0]=0
x[1]=0
x[2]=0
x[3]=0
x[4]=0
x[5]=0
x[6]=0
x[7]=0
x[8]=0
x[9]=0
x[10]=0
x[11]=0
x[12]=0
x[13]=0
x[14]=0
x[15]=0
x[0]=1/(w*(z/y))
x[5]=1/w
x[10]=-1.000002000002
x[11]=-1
x[14]=-0.002000002000002
this.f=new T.ai(x)}},i6:{"^":"h:24;a",
$1:function(a){var z,y,x,w,v,u
z=this.a
J.hb(z.e,16640)
y=z.f
y.toString
x=new T.ai(new Float32Array(H.k(16)))
x.t(y)
x.bK(0,0,0,z.r.a.a)
x.cD(0,z.r.a.f)
y=z.x.a
w=y.length
if(0>=w)return H.a(y,0)
v=y[0]
if(1>=w)return H.a(y,1)
u=y[1]
if(2>=w)return H.a(y,2)
x.bK(0,-v,-u,-y[2])
z.hs(a,x)
if(!z.y)z.dw()},
$isi:1},i7:{"^":"el;a,b",v:{
i8:function(a,b,c,d,e,f){var z,y,x,w
z=$.$get$cZ()
y=z.d
x=T.J
w=P.ay(y,e,!1,x)
y=new B.cs(4,0,4,y,new Float32Array(H.k(y*4)))
y.aV(w,4,0,0)
y=S.cc(a,b,z,y,$.$get$ek())
z=$.$get$cZ()
w=z.d
x=P.ay(w,c,!1,x)
w=new B.cs(4,0,4,w,new Float32Array(H.k(w*4)))
w.aV(x,4,0,0)
return new S.i7(y,S.cc(a,b,z,w,$.$get$ej()))}}},el:{"^":"f;"},en:{"^":"f;a,b,c,d,e",
cd:function(){var z,y,x
z=this.c
J.cM(z.a,z.d)
z=this.c
z=z.Q.h(0,z.y)
y=this.b
J.hy(this.a,z,!1,y.ga_(y))
for(z=this.e,y=z.length,x=0;x<z.length;z.length===y||(0,H.P)(z),++x)z[x].bF(this.c)},
hu:function(a,b,c,d,e,f){var z,y
this.cd()
this.d.bF(this.c)
z=e===-1?this.d.b:e
y=J.dM(this.a,"ANGLE_instanced_arrays")
d.X(0,new S.i9(this,y))
J.hg(y,b,z,5123,f,c)},
ht:function(a,b,c,d){return this.hu(a,b,c,d,-1,0)},
fj:function(a,b,c,d,e){var z,y,x,w,v
z=this.a
y=J.o(z)
x=new S.em(z,0,35044,34963,[],y.b2(z))
x.aQ(e)
this.d=x
x=this.e
w=[]
v=new S.ii(3,z,0,35044,34962,w,y.b2(z))
v.aQ(c.e)
w.push(new S.bo(this.c.r,5126,3,0,0))
x.push(v)
if(this.c.x!=null){w=[]
z=new S.ij(4,z,0,35044,34962,w,y.b2(z))
z.aQ(d.e)
w.push(new S.bo(this.c.x,5126,4,0,0))
x.push(z)}},
v:{
cc:function(a,b,c,d,e){var z=new S.en(a,null,b,null,[])
z.fj(a,b,c,d,e)
return z}}},i9:{"^":"h:25;a,b",
$2:function(a,b){J.hz(this.b,this.a.c.f.h(0,a),b)},
$isi:1},eo:{"^":"f;a,b,c,d,e,f,r,x,y,z,Q",
dS:function(){var z,y,x,w,v
z=this.a
y=J.o(z)
x=y.cw(z,35633)
y.bS(z,x,this.b)
y.cq(z,x)
w=y.cw(z,35632)
y.bS(z,w,this.c)
y.cq(z,w)
v=y.dU(z)
this.d=v
y.cm(z,v,x)
y.cm(z,this.d,w)
y.ea(z,this.d)
if(y.bO(z,x,35713)!==!0)throw H.b(P.b3(y.bN(z,x)))
if(y.bO(z,w,35713)!==!0)throw H.b(P.b3(y.bN(z,w)))
if(y.cS(z,this.d,35714)!==!0)throw H.b(P.b3(y.cR(z,this.d)))
z=P.u
this.f=new H.G(0,null,null,null,null,null,0,[z,P.l])
C.a.X(this.e,new S.ia(this))
this.Q=new H.G(0,null,null,null,null,null,0,[z,P.kE])
C.a.X(this.z,new S.ib(this))}},ia:{"^":"h:4;a",
$1:function(a){var z,y,x
z=this.a
y=z.a
x=J.o(y)
z.f.j(0,a,x.cO(y,z.d,a))
x.e4(y,z.f.h(0,a))},
$isi:1},ib:{"^":"h:4;a",
$1:function(a){var z=this.a
z.Q.j(0,a,J.hq(z.a,z.d,a))},
$isi:1},ic:{"^":"el;a,b",v:{
id:function(a,b,c,d,e,f,g,h){var z,y,x,w,v,u
z=S.ie(b,c)
y=z.d
x=T.J
w=P.ay(y,g,!1,x)
v=y*4
u=new B.cs(4,0,4,y,new Float32Array(H.k(v)))
u.aV(w,4,0,0)
u=S.cc(a,d,z,u,S.ih(b,c))
x=P.ay(y,e,!1,x)
y=new B.cs(4,0,4,y,new Float32Array(H.k(v)))
y.aV(x,4,0,0)
return new S.ic(u,S.cc(a,d,z,y,S.ig(b,c)))},
ep:function(a,b){var z,y,x,w,v
z=new T.ai(new Float32Array(16))
z.bi()
y=a.a
x=y.length
if(0>=x)return H.a(y,0)
w=y[0]
if(1>=x)return H.a(y,1)
v=y[1]
if(2>=x)return H.a(y,2)
z.bK(0,w,v,y[2])
y=b.a
v=y.length
if(0>=v)return H.a(y,0)
w=y[0]
if(1>=v)return H.a(y,1)
x=y[1]
if(2>=v)return H.a(y,2)
z.bP(0,w,x,y[2])
return z},
ie:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=(a-1)*b+2
y=new B.fg(3,0,3,z,new Float32Array(H.k(3*z)))
y.fp(z,3,0,0)
z=new T.p(new Float32Array(H.k(3)))
z.a5(0,0,1)
y.aB(0,0,z)
z=new T.p(new Float32Array(H.k(3)))
z.a5(0,0,-1)
y.aB(0,1,z)
for(z=6.283185307179586/b,x=3.141592653589793/a,w=2,v=1;v<a;++v){u=x*v
for(t=0;t<b;++t,w=r){s=z*t
r=w+1
q=Math.sin(u)
p=Math.cos(s)
o=Math.sin(u)
n=Math.sin(s)
m=Math.cos(u)
l=new Float32Array(3)
if(0>=3)return H.a(l,0)
l[0]=q*p
if(1>=3)return H.a(l,1)
l[1]=o*n
if(2>=3)return H.a(l,2)
l[2]=m
y.aB(0,w,new T.p(l))}}return y},
ih:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=H.k((a-1)*b*4+b*2)
y=new Uint16Array(z)
for(x=0,w=1;w<a;++w)for(v=w===1,u=2+(w-1)*b,t=0;t<b;++t,x=r){s=u+t
r=x+1
q=r+1
if(v){if(x<0||x>=z)return H.a(y,x)
y[x]=0
if(r<0||r>=z)return H.a(y,r)
y[r]=s}else{if(x<0||x>=z)return H.a(y,x)
y[x]=s-b
if(r<0||r>=z)return H.a(y,r)
y[r]=s}x=q+1
r=x+1
if(t===0){if(q<0||q>=z)return H.a(y,q)
y[q]=s+b-1
if(x<0||x>=z)return H.a(y,x)
y[x]=s}else{if(q<0||q>=z)return H.a(y,q)
y[q]=s-1
if(x<0||x>=z)return H.a(y,x)
y[x]=s}}for(v=2+(a-2)*b,t=0;t<b;++t){r=x+1
if(x<0||x>=z)return H.a(y,x)
y[x]=1
x=r+1
if(r<0||r>=z)return H.a(y,r)
y[r]=v+t}return y},
ig:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=a-1
y=H.k(z*b*6)
x=new Uint16Array(y)
for(w=0,v=1;v<a;++v)for(u=v===z,t=v===1,s=2+(v-1)*b,r=0;r<b;++r){q=s+r
p=r===0?q+b-1:q-1
o=t?0:q-b
n=u?1:p+b
m=w+1
if(w<0||w>=y)return H.a(x,w)
x[w]=q
w=m+1
if(m<0||m>=y)return H.a(x,m)
x[m]=p
m=w+1
if(w<0||w>=y)return H.a(x,w)
x[w]=o
w=m+1
if(m<0||m>=y)return H.a(x,m)
x[m]=q
m=w+1
if(w<0||w>=y)return H.a(x,w)
x[w]=n
w=m+1
if(m<0||m>=y)return H.a(x,m)
x[m]=p}return x}}},ls:{"^":"f;a,b,c,d,e,f"},kq:{"^":"f;a,b",
eq:function(a,b){var z=this.a
z.b=!0
z.c=a
z.d=b},
er:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
if(!this.a.b)return
z=new Float32Array(H.k(16))
y=new T.ai(z)
y.bi()
x=this.a.c
if(typeof a!=="number")return a.B()
if(typeof x!=="number")return H.m(x)
x=(a-x)/100
w=Math.cos(x)
v=Math.sin(x)
x=z[0]
u=z[8]
t=-v
s=z[1]
r=z[9]
q=z[2]
p=z[10]
o=z[3]
n=z[11]
z[0]=x*w+u*t
z[1]=s*w+r*t
z[2]=q*w+p*t
z[3]=o*w+n*t
z[8]=x*v+u*w
z[9]=s*v+r*w
z[10]=q*v+p*w
z[11]=o*v+n*w
n=this.a.d
if(typeof b!=="number")return b.B()
if(typeof n!=="number")return H.m(n)
n=(b-n)/100
w=Math.cos(n)
v=Math.sin(n)
n=z[4]
o=z[8]
p=z[5]
q=z[9]
r=z[6]
s=z[10]
u=z[7]
x=z[11]
t=-v
z[4]=n*w+o*v
z[5]=p*w+q*v
z[6]=r*w+s*v
z[7]=u*w+x*v
z[8]=n*t+o*w
z[9]=p*t+q*w
z[10]=r*t+s*w
z[11]=u*t+x*w
y.cD(0,this.a.f)
x=this.a
x.f=y
x.c=a
x.d=b},
bH:function(a){var z=this.a
z.b=!1
if(a<2)z.e=0},
ep:function(){return this.bH(0)},
fo:function(a,b){var z,y
z=new T.ai(new Float32Array(H.k(16)))
z.bi()
this.a=new S.ls(0,!1,0,0,0,z)
z=J.o(a)
y=z.gek(a)
W.T(y.a,y.b,new S.ks(this),!1,H.z(y,0))
y=z.gel(a)
W.T(y.a,y.b,new S.kt(this),!1,H.z(y,0))
y=z.gew(a)
W.T(y.a,y.b,new S.ku(this),!1,H.z(y,0))
y=z.gev(a)
W.T(y.a,y.b,new S.kv(this),!1,H.z(y,0))
y=z.gen(a)
W.T(y.a,y.b,new S.kw(this),!1,H.z(y,0))
y=z.gem(a)
W.T(y.a,y.b,new S.kx(this),!1,H.z(y,0))
W.T(a,"touchleave",new S.ky(this),!1,W.ad)
y=z.geu(a)
W.T(y.a,y.b,new S.kz(this),!1,H.z(y,0))
y=z.ges(a)
W.T(y.a,y.b,new S.kA(this),!1,H.z(y,0))
z=z.geo(a)
W.T(z.a,z.b,new S.kB(this),!1,H.z(z,0))},
v:{
kr:function(a,b){var z=new S.kq(null,b)
z.fo(a,b)
return z}}},ks:{"^":"h:10;a",
$1:function(a){var z,y
z=J.o(a)
y=z.gaL(a)
y=y.gm(y)
z=z.gaL(a)
this.a.eq(y,z.gn(z))},
$isi:1},kt:{"^":"h:10;a",
$1:function(a){var z,y
z=J.o(a)
y=z.gaL(a)
y=y.gm(y)
z=z.gaL(a)
this.a.er(y,z.gn(z))},
$isi:1},ku:{"^":"h:5;a",
$1:function(a){var z=J.o(a)
z.i3(a)
z=z.geG(a)
z=(z&&C.n).gaj(z)
this.a.eq(C.b.a4(z.pageX),C.b.a4(z.pageY))},
$isi:1},kv:{"^":"h:5;a",
$1:function(a){var z,y,x,w,v,u
z=J.c3(a).length
y=a.targetTouches
x=y&&C.n
if(z>1){z=x.gaj(y)
y=C.b.a4(z.pageX)
z=C.b.a4(z.pageY)
x=a.targetTouches
x=(x&&C.n).gaN(x)
w=y-C.b.a4(x.pageX)
v=z-C.b.a4(x.pageY)
u=Math.sqrt(w*w+v*v)
z=this.a.a
y=z.e
if(y>0)z.a*=y/u
z.e=u}else{z=x.gaj(y)
this.a.er(C.b.a4(z.pageX),C.b.a4(z.pageY))}},
$isi:1},kw:{"^":"h:2;a",
$1:function(a){return this.a.ep()},
$isi:1},kx:{"^":"h:2;a",
$1:function(a){return this.a.ep()},
$isi:1},ky:{"^":"h:5;a",
$1:function(a){return this.a.bH(J.c3(a).length)},
$isi:1},kz:{"^":"h:5;a",
$1:function(a){return this.a.bH(J.c3(a).length)},
$isi:1},kA:{"^":"h:5;a",
$1:function(a){return this.a.bH(J.c3(a).length)},
$isi:1},kB:{"^":"h:26;a",
$1:function(a){var z,y,x
z=this.a
y=J.hk(a)
if(typeof y!=="number")return y.ap()
x=z.b
y=y>0?x:1/x
z.a.a*=y},
$isi:1}}],["","",,N,{"^":"",d8:{"^":"f;u:a>,b,c,fz:d>,e,f",
ge5:function(){var z,y,x
z=this.b
y=z==null||J.H(J.hn(z),"")
x=this.a
return y?x:z.ge5()+"."+x},
gay:function(a){var z
if($.cA){z=this.c
if(z!=null)return z
z=this.b
if(z!=null)return J.hm(z)}return $.fH},
say:function(a,b){if($.cA&&this.b!=null)this.c=b
else{if(this.b!=null)throw H.b(new P.n('Please set "hierarchicalLoggingEnabled" to true if you want to change the level on a non-root logger.'))
$.fH=b}},
gi_:function(){return this.df()},
hU:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o
x=a.b
if(x>=J.c5(this.gay(this))){if(!!J.v(b).$isi)b=b.$0()
w=b
if(typeof w!=="string"){v=b
b=J.au(b)}else v=null
if(d==null&&x>=$.mT.b)try{x="autogenerated stack trace for "+a.k(0)+" "+H.j(b)
throw H.b(x)}catch(u){z=H.Q(u)
y=H.M(u)
d=y
if(c==null)c=z}e=$.q
x=b
w=this.ge5()
t=c
s=d
r=Date.now()
q=$.eC
$.eC=q+1
p=new N.ce(a,x,v,w,new P.bK(r,!1),q,t,s,e)
if($.cA)for(o=this;o!=null;){o.dm(p)
o=o.b}else $.$get$cf().dm(p)}},
cB:function(a,b,c,d){return this.hU(a,b,c,d,null)},
hJ:function(a,b,c){return this.cB(C.t,a,b,c)},
p:function(a){return this.hJ(a,null,null)},
il:function(a,b,c){return this.cB(C.L,a,b,c)},
aR:function(a){return this.il(a,null,null)},
cV:function(a,b,c){return this.cB(C.K,a,b,c)},
bR:function(a){return this.cV(a,null,null)},
df:function(){if($.cA||this.b==null){var z=this.f
if(z==null){z=new P.fz(null,null,0,null,null,null,null,[N.ce])
this.f=z}return new P.kR(z,[H.z(z,0)])}else return $.$get$cf().df()},
dm:function(a){var z=this.f
if(z!=null){if(!z.gbp())H.E(z.bY())
z.a0(a)}},
v:{
aK:function(a){return $.$get$eD().cG(0,a,new N.me(a))}}},me:{"^":"h:0;a",
$0:function(){var z,y,x,w
z=this.a
if(C.h.cY(z,"."))H.E(P.a8("name shouldn't start with a '.'"))
y=C.h.hS(z,".")
if(y===-1)x=z!==""?N.aK(""):null
else{x=N.aK(C.h.d0(z,0,y))
z=C.h.aT(z,y+1)}w=new H.G(0,null,null,null,null,null,0,[P.u,N.d8])
w=new N.d8(z,x,null,w,new P.kG(w,[null,null]),null)
if(x!=null)J.hj(x).j(0,z,w)
return w},
$isi:1},bs:{"^":"f;u:a>,E:b>",
A:function(a,b){if(b==null)return!1
return b instanceof N.bs&&this.b===b.b},
ag:function(a,b){return C.d.ag(this.b,C.d.gE(b))},
ap:function(a,b){return C.d.ap(this.b,C.d.gE(b))},
av:function(a,b){var z=J.c5(b)
if(typeof z!=="number")return H.m(z)
return this.b-z},
gC:function(a){return this.b},
k:function(a){return this.a}},ce:{"^":"f;ay:a>,I:b>,c,cC:d<,e,f,V:r>,ab:x<,y",
k:function(a){return"["+this.a.a+"] "+this.d+": "+H.j(this.b)}}}],["","",,L,{"^":"",
fE:function(a,b){if(typeof b!=="number")return H.m(b)
a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6}}],["","",,S,{"^":"",ae:{"^":"f;a,cA:b<,$ti",
k:function(a){return"["+H.j(this.a)+", "+H.j(this.b)+"]"},
A:function(a,b){if(b==null)return!1
return b instanceof S.ae&&b.a===this.a&&J.H(b.b,this.b)},
gC:function(a){var z,y,x
z=J.Y(this.a)
y=J.Y(this.b)
y=L.fE(L.fE(0,z&0x1FFFFFFF),J.Y(y))
x=536870911&y+((67108863&y)<<3)
x^=x>>>11
return 536870911&x+((16383&x)<<15)}}}],["","",,A,{"^":"",
dz:function(a){var z,y
z=C.i.hx(a,0,new A.mq())
if(typeof z!=="number")return H.m(z)
y=536870911&z+((67108863&z)<<3)
y^=y>>>11
return 536870911&y+((16383&y)<<15)},
mq:{"^":"h:3;",
$2:function(a,b){var z,y
z=J.as(a,J.Y(b))
if(typeof z!=="number")return H.m(z)
y=536870911&z
y=536870911&y+((524287&y)<<10)
return y^y>>>6},
$isi:1}}],["","",,T,{"^":"",
cT:function(){var z=new T.J(new Float32Array(H.k(4)))
z.a6(0,0,1,1)
return z},
dS:function(){var z=new T.J(new Float32Array(H.k(4)))
z.a6(0,1,1,1)
return z},
dT:function(){var z=new T.J(new Float32Array(H.k(4)))
z.a6(0,0.5019607843137255,0,1)
return z},
cU:function(){var z=new T.J(new Float32Array(H.k(4)))
z.a6(1,0,0,1)
return z},
dU:function(){var z=new T.J(new Float32Array(H.k(4)))
z.a6(1,1,0,1)
return z},
cN:{"^":"f;a,b",v:{
bn:function(a,b){var z,y
z=new T.p(new Float32Array(H.k(3)))
z.t(a)
y=new T.p(new Float32Array(H.k(3)))
y.t(b)
return new T.cN(z,y)},
hB:function(a,b){return new T.cN(new T.p(J.o(a).F(a,b,3)),new T.p(C.c.F(a,b+12,3)))}}},
ai:{"^":"f;dk:a<",
ga_:function(a){return this.a},
iy:[function(a,b,c){return J.as(J.aZ(c,4),b)},"$2","gaM",4,0,27],
t:function(a){var z,y
z=a.a
y=this.a
y[15]=z[15]
y[14]=z[14]
y[13]=z[13]
y[12]=z[12]
y[11]=z[11]
y[10]=z[10]
y[9]=z[9]
y[8]=z[8]
y[7]=z[7]
y[6]=z[6]
y[5]=z[5]
y[4]=z[4]
y[3]=z[3]
y[2]=z[2]
y[1]=z[1]
y[0]=z[0]},
k:function(a){return"[0] "+this.bg(0).k(0)+"\n[1] "+this.bg(1).k(0)+"\n[2] "+this.bg(2).k(0)+"\n[3] "+this.bg(3).k(0)+"\n"},
ghr:function(){return 4},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=16)return H.a(z,b)
return z[b]},
j:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=16)return H.a(z,b)
z[b]=c},
A:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.ai){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]&&z[4]===x[4]&&z[5]===x[5]&&z[6]===x[6]&&z[7]===x[7]&&z[8]===x[8]&&z[9]===x[9]&&z[10]===x[10]&&z[11]===x[11]&&z[12]===x[12]&&z[13]===x[13]&&z[14]===x[14]&&z[15]===x[15]}else z=!1
return z},
gC:function(a){return A.dz(this.a)},
bg:function(a){var z,y,x
z=new Float32Array(H.k(4))
y=this.a
if(a>=16)return H.a(y,a)
z[0]=y[a]
x=4+a
if(x>=16)return H.a(y,x)
z[1]=y[x]
x=8+a
if(x>=16)return H.a(y,x)
z[2]=y[x]
x=12+a
if(x>=16)return H.a(y,x)
z[3]=y[x]
return new T.J(z)},
Z:function(a,b){var z
if(typeof b==="number"){z=new T.ai(new Float32Array(H.k(16)))
z.t(this)
z.bP(0,b,null,null)
return z}if(b.ghr()===4){z=new T.ai(new Float32Array(H.k(16)))
z.t(this)
z.cD(0,b)
return z}throw H.b(P.a8(b))},
G:function(a,b){var z=new T.ai(new Float32Array(H.k(16)))
z.t(this)
z.q(0,b)
return z},
B:function(a,b){var z,y,x
z=new Float32Array(H.k(16))
y=new T.ai(z)
y.t(this)
x=b.gdk()
z[0]=C.b.B(z[0],x.h(0,0))
z[1]=C.b.B(z[1],x.h(0,1))
z[2]=C.b.B(z[2],x.h(0,2))
z[3]=C.b.B(z[3],x.h(0,3))
z[4]=C.b.B(z[4],x.h(0,4))
z[5]=C.b.B(z[5],x.h(0,5))
z[6]=C.b.B(z[6],x.h(0,6))
z[7]=C.b.B(z[7],x.h(0,7))
z[8]=C.b.B(z[8],x.h(0,8))
z[9]=C.b.B(z[9],x.h(0,9))
z[10]=C.b.B(z[10],x.h(0,10))
z[11]=C.b.B(z[11],x.h(0,11))
z[12]=C.b.B(z[12],x.h(0,12))
z[13]=C.b.B(z[13],x.h(0,13))
z[14]=C.b.B(z[14],x.h(0,14))
z[15]=C.b.B(z[15],x.h(0,15))
return y},
bK:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=J.v(b)
y=!!z.$isJ
x=y?z.gik(b):1
if(!!z.$isp||y){w=z.gm(b)
v=z.gn(b)
u=z.gao(b)}else{u=d
v=c
w=b}z=this.a
y=z[0]
t=z[4]
s=z[8]
r=z[12]
q=z[1]
p=z[5]
o=z[9]
n=z[13]
m=z[2]
l=z[6]
k=z[10]
j=z[14]
i=z[3]
h=z[7]
g=z[11]
f=z[15]
z[12]=y*w+t*v+s*u+r*x
z[13]=q*w+p*v+o*u+n*x
z[14]=m*w+l*v+k*u+j*x
z[15]=i*w+h*v+g*u+f*x},
bP:function(a,b,c,d){var z,y,x,w,v,u
z=J.v(b)
y=!!z.$isJ
x=y?z.gik(b):1
if(!!z.$isp||y){w=z.gm(b)
v=z.gn(b)
u=z.gao(b)}else{v=c==null?b:c
u=d==null?b:d
w=b}z=this.a
z[0]=z[0]*w
z[1]=z[1]*w
z[2]=z[2]*w
z[3]=z[3]*w
z[4]=z[4]*v
z[5]=z[5]*v
z[6]=z[6]*v
z[7]=z[7]*v
z[8]=z[8]*u
z[9]=z[9]*u
z[10]=z[10]*u
z[11]=z[11]*u
z[12]=z[12]*x
z[13]=z[13]*x
z[14]=z[14]*x
z[15]=z[15]*x},
bi:function(){var z=this.a
z[0]=1
z[1]=0
z[2]=0
z[3]=0
z[4]=0
z[5]=1
z[6]=0
z[7]=0
z[8]=0
z[9]=0
z[10]=1
z[11]=0
z[12]=0
z[13]=0
z[14]=0
z[15]=1},
q:function(a,b){var z,y
z=b.gdk()
y=this.a
y[0]=y[0]+z[0]
y[1]=y[1]+z[1]
y[2]=y[2]+z[2]
y[3]=y[3]+z[3]
y[4]=y[4]+z[4]
y[5]=y[5]+z[5]
y[6]=y[6]+z[6]
y[7]=y[7]+z[7]
y[8]=y[8]+z[8]
y[9]=y[9]+z[9]
y[10]=y[10]+z[10]
y[11]=y[11]+z[11]
y[12]=y[12]+z[12]
y[13]=y[13]+z[13]
y[14]=y[14]+z[14]
y[15]=y[15]+z[15]},
cD:function(a8,a9){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7
z=this.a
y=z[0]
x=z[4]
w=z[8]
v=z[12]
u=z[1]
t=z[5]
s=z[9]
r=z[13]
q=z[2]
p=z[6]
o=z[10]
n=z[14]
m=z[3]
l=z[7]
k=z[11]
j=z[15]
i=a9.a
h=i[0]
g=i[4]
f=i[8]
e=i[12]
d=i[1]
c=i[5]
b=i[9]
a=i[13]
a0=i[2]
a1=i[6]
a2=i[10]
a3=i[14]
a4=i[3]
a5=i[7]
a6=i[11]
a7=i[15]
z[0]=y*h+x*d+w*a0+v*a4
z[4]=y*g+x*c+w*a1+v*a5
z[8]=y*f+x*b+w*a2+v*a6
z[12]=y*e+x*a+w*a3+v*a7
z[1]=u*h+t*d+s*a0+r*a4
z[5]=u*g+t*c+s*a1+r*a5
z[9]=u*f+t*b+s*a2+r*a6
z[13]=u*e+t*a+s*a3+r*a7
z[2]=q*h+p*d+o*a0+n*a4
z[6]=q*g+p*c+o*a1+n*a5
z[10]=q*f+p*b+o*a2+n*a6
z[14]=q*e+p*a+o*a3+n*a7
z[3]=m*h+l*d+k*a0+j*a4
z[7]=m*g+l*c+k*a1+j*a5
z[11]=m*f+l*b+k*a2+j*a6
z[15]=m*e+l*a+k*a3+j*a7}},
eT:{"^":"f;a,b",v:{
jT:function(a,b){var z,y
z=new T.p(new Float32Array(H.k(3)))
z.t(a)
y=new T.p(new Float32Array(H.k(3)))
y.t(b)
return new T.eT(z,y)}}},
k5:{"^":"f;a,b"},
p:{"^":"f;ck:a<",
ga_:function(a){return this.a},
a5:function(a,b,c){var z,y
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
z[0]=a
if(1>=y)return H.a(z,1)
z[1]=b
if(2>=y)return H.a(z,2)
z[2]=c},
t:function(a){var z,y,x,w,v
z=a.gck()
y=this.a
x=z.length
if(0>=x)return H.a(z,0)
w=z[0]
v=y.length
if(0>=v)return H.a(y,0)
y[0]=w
if(1>=x)return H.a(z,1)
w=z[1]
if(1>=v)return H.a(y,1)
y[1]=w
if(2>=x)return H.a(z,2)
x=z[2]
if(2>=v)return H.a(y,2)
y[2]=x},
bT:function(a){var z=this.a
if(2>=z.length)return H.a(z,2)
z[2]=a
z[1]=a
z[0]=a},
k:function(a){var z,y,x
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x="["+H.j(z[0])+","
if(1>=y)return H.a(z,1)
x=x+H.j(z[1])+","
if(2>=y)return H.a(z,2)
return x+H.j(z[2])+"]"},
A:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b instanceof T.p){z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
w=b.a
v=w.length
if(0>=v)return H.a(w,0)
if(x===w[0]){if(1>=y)return H.a(z,1)
x=z[1]
if(1>=v)return H.a(w,1)
if(x===w[1]){if(2>=y)return H.a(z,2)
z=z[2]
if(2>=v)return H.a(w,2)
w=z===w[2]
z=w}else z=!1}else z=!1}else z=!1
return z},
gC:function(a){return A.dz(this.a)},
B:function(a,b){var z=new T.p(new Float32Array(H.k(3)))
z.t(this)
z.ai(b)
return z},
G:function(a,b){var z=new T.p(new Float32Array(H.k(3)))
z.t(this)
z.q(0,b)
return z},
aA:function(a,b){var z
if(typeof b!=="number")return H.m(b)
z=new T.p(new Float32Array(H.k(3)))
z.t(this)
z.ah(0,1/b)
return z},
Z:function(a,b){var z=new T.p(new Float32Array(H.k(3)))
z.t(this)
z.ah(0,b)
return z},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=z.length)return H.a(z,b)
return z[b]},
j:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=z.length)return H.a(z,b)
z[b]=c},
gi:function(a){var z,y,x,w
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
z=z[2]
return Math.sqrt(x*x+w*w+z*z)},
q:function(a,b){var z,y,x,w,v
z=b.gck()
y=this.a
x=y.length
if(0>=x)return H.a(y,0)
w=y[0]
v=z.length
if(0>=v)return H.a(z,0)
y[0]=w+z[0]
if(1>=x)return H.a(y,1)
w=y[1]
if(1>=v)return H.a(z,1)
y[1]=w+z[1]
if(2>=x)return H.a(y,2)
x=y[2]
if(2>=v)return H.a(z,2)
y[2]=x+z[2]},
ai:function(a){var z,y,x,w,v
z=a.gck()
y=this.a
x=y.length
if(0>=x)return H.a(y,0)
w=y[0]
v=z.length
if(0>=v)return H.a(z,0)
y[0]=w-z[0]
if(1>=x)return H.a(y,1)
w=y[1]
if(1>=v)return H.a(z,1)
y[1]=w-z[1]
if(2>=x)return H.a(y,2)
x=y[2]
if(2>=v)return H.a(z,2)
y[2]=x-z[2]},
ah:function(a,b){var z,y
z=this.a
if(2>=z.length)return H.a(z,2)
y=z[2]
if(typeof b!=="number")return H.m(b)
z[2]=y*b
z[1]=z[1]*b
z[0]=z[0]*b},
bC:function(a){var z,y
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
z[0]=Math.floor(z[0])
if(1>=y)return H.a(z,1)
z[1]=Math.floor(z[1])
if(2>=y)return H.a(z,2)
z[2]=Math.floor(z[2])},
he:function(a){var z=new T.p(new Float32Array(H.k(3)))
z.t(this)
return z},
hk:function(a,b){var z,y,x
z=this.a
y=b+2
x=a.length
if(y>=x)return H.a(a,y)
y=a[y]
if(2>=z.length)return H.a(z,2)
z[2]=y
y=b+1
if(y>=x)return H.a(a,y)
z[1]=a[y]
if(b>=x)return H.a(a,b)
z[0]=a[b]},
cv:function(a){return this.hk(a,0)},
gat:function(a){var z=this.a
if(2>=z.length)return H.a(z,2)
return z[2]},
gm:function(a){var z=this.a
if(0>=z.length)return H.a(z,0)
return z[0]},
gn:function(a){var z=this.a
if(1>=z.length)return H.a(z,1)
return z[1]},
gao:function(a){var z=this.a
if(2>=z.length)return H.a(z,2)
return z[2]},
v:{
aU:function(a,b,c){var z=new Float32Array(3)
if(0>=3)return H.a(z,0)
z[0]=a
if(1>=3)return H.a(z,1)
z[1]=b
if(2>=3)return H.a(z,2)
z[2]=c
return new T.p(z)}}},
J:{"^":"f;dG:a<",
ga_:function(a){return this.a},
a6:function(a,b,c,d){var z=this.a
z[3]=d
z[2]=c
z[1]=b
z[0]=a},
t:function(a){var z,y
z=a.a
y=this.a
y[3]=z[3]
y[2]=z[2]
y[1]=z[1]
y[0]=z[0]},
k:function(a){var z=this.a
return H.j(z[0])+","+H.j(z[1])+","+H.j(z[2])+","+H.j(z[3])},
A:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.J){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]}else z=!1
return z},
gC:function(a){return A.dz(this.a)},
B:function(a,b){var z,y,x
z=new Float32Array(H.k(4))
y=new T.J(z)
y.t(this)
x=b.gdG()
z[0]=z[0]-x[0]
z[1]=z[1]-x[1]
z[2]=z[2]-x[2]
z[3]=z[3]-x[3]
return y},
G:function(a,b){var z=new T.J(new Float32Array(H.k(4)))
z.t(this)
z.q(0,b)
return z},
aA:function(a,b){var z=new T.J(new Float32Array(H.k(4)))
z.t(this)
if(typeof b!=="number")return H.m(b)
z.ah(0,1/b)
return z},
Z:function(a,b){var z=new T.J(new Float32Array(H.k(4)))
z.t(this)
z.ah(0,b)
return z},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=4)return H.a(z,b)
return z[b]},
j:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=4)return H.a(z,b)
z[b]=c},
gi:function(a){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
w=z[2]
z=z[3]
return Math.sqrt(y*y+x*x+w*w+z*z)},
q:function(a,b){var z,y
z=b.gdG()
y=this.a
y[0]=y[0]+z[0]
y[1]=y[1]+z[1]
y[2]=y[2]+z[2]
y[3]=y[3]+z[3]},
ah:function(a,b){var z=this.a
z[0]=z[0]*b
z[1]=z[1]*b
z[2]=z[2]*b
z[3]=z[3]*b},
bC:function(a){var z=this.a
z[0]=Math.floor(z[0])
z[1]=Math.floor(z[1])
z[2]=Math.floor(z[2])
z[3]=Math.floor(z[3])},
gW:function(){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
z=z[2]
w=new T.p(new Float32Array(H.k(3)))
w.a5(y,x,z)
return w},
gat:function(a){return this.a[2]},
gm:function(a){return this.a[0]},
gn:function(a){return this.a[1]}}}],["","",,B,{"^":"",fg:{"^":"fh;a,b,c,d,e",
eg:function(){return new T.p(new Float32Array(H.k(3)))},
ec:function(a,b,c){var z,y,x,w,v
if(typeof b!=="number")return H.m(b)
z=this.b+this.c*b
y=c.ga_(c)
x=this.e
w=x.length
if(z<0||z>=w)return H.a(x,z)
v=x[z]
if(0>=y.length)return H.a(y,0)
y[0]=v
v=c.ga_(c)
y=z+1
if(y<0||y>=w)return H.a(x,y)
y=x[y]
if(1>=v.length)return H.a(v,1)
v[1]=y
y=c.ga_(c)
v=z+2
if(v<0||v>=w)return H.a(x,v)
v=x[v]
if(2>=y.length)return H.a(y,2)
y[2]=v},
aB:function(a,b,c){var z,y,x,w,v,u,t
if(typeof b!=="number")return H.m(b)
z=this.b+this.c*b
y=J.cL(c)
x=this.e
w=z+0
v=J.c_(y,0)
u=x.length
if(w>>>0!==w||w>=u)return H.a(x,w)
x[w]=v
v=z+1
w=y.length
if(1>=w)return H.a(y,1)
t=y[1]
if(v>>>0!==v||v>=u)return H.a(x,v)
x[v]=t
t=z+2
if(2>=w)return H.a(y,2)
w=y[2]
if(t>>>0!==t||t>=u)return H.a(x,t)
x[t]=w}},cs:{"^":"fh;a,b,c,d,e",
eg:function(){return new T.J(new Float32Array(H.k(4)))},
ec:function(a,b,c){var z,y,x,w,v
if(typeof b!=="number")return H.m(b)
z=this.b+this.c*b
y=c.ga_(c)
x=this.e
w=x.length
if(z<0||z>=w)return H.a(x,z)
v=x[z]
if(0>=y.length)return H.a(y,0)
y[0]=v
v=c.ga_(c)
y=z+1
if(y<0||y>=w)return H.a(x,y)
y=x[y]
if(1>=v.length)return H.a(v,1)
v[1]=y
y=c.ga_(c)
v=z+2
if(v<0||v>=w)return H.a(x,v)
v=x[v]
if(2>=y.length)return H.a(y,2)
y[2]=v
v=c.ga_(c)
y=z+3
if(y<0||y>=w)return H.a(x,y)
y=x[y]
if(3>=v.length)return H.a(v,3)
v[3]=y},
aB:function(a,b,c){var z,y,x,w,v,u,t
if(typeof b!=="number")return H.m(b)
z=this.b+this.c*b
y=J.cL(c)
x=this.e
w=z+0
v=J.c_(y,0)
u=x.length
if(w>>>0!==w||w>=u)return H.a(x,w)
x[w]=v
v=z+1
w=y.length
if(1>=w)return H.a(y,1)
t=y[1]
if(v>>>0!==v||v>=u)return H.a(x,v)
x[v]=t
t=z+2
if(2>=w)return H.a(y,2)
v=y[2]
if(t>>>0!==t||t>=u)return H.a(x,t)
x[t]=v
v=z+3
if(3>=w)return H.a(y,3)
w=y[3]
if(v>>>0!==v||v>=u)return H.a(x,v)
x[v]=w}},fh:{"^":"f;",
gi:function(a){return this.d},
gau:function(a){return this.e},
h:function(a,b){var z=this.eg()
this.ec(0,b,z)
return z},
j:function(a,b,c){this.aB(0,b,c)},
aV:function(a,b,c,d){var z,y
if(this.c<this.a)throw H.b(P.a8("Stride cannot be smaller than the vector size."))
for(z=this.d,y=0;y<z;++y){if(y>=a.length)return H.a(a,y)
this.aB(0,y,a[y])}},
fp:function(a,b,c,d){if(this.c<this.a)throw H.b(P.a8("Stride cannot be smaller than the vector size."))}}}],["","",,T,{"^":"",
h_:function(a,b){var z,y
if(b!=null){z="%c"+a
y="color: "+b+";"
console.log(z,y)}else console.log(a)},
mU:function(){var z,y
z=P.a0([300,"black",400,"black",500,"black",700,"gray",800,"green",900,"orange",1000,"orangered",1200,"red"])
y=$.$get$cf()
J.hs(y,C.I)
y.gi_().eb(new T.mV(z,[]))},
mV:{"^":"h:28;a,b",
$1:function(a){var z,y,x
z=J.o(a)
if(J.hu(z.gI(a),"group: ")){z=a.gcC()+"."+J.hv(a.b,7)
console.group(z)
this.b.push(a.d)}else if(J.H(z.gI(a),"groupEnd")){console.groupEnd()
z=this.b
if(0>=z.length)return H.a(z,-1)
z.pop()}else{y=this.b
y=y.length!==0&&a.gcC()===C.a.gaN(y)
x=this.a
if(y)T.h_(H.j(z.gI(a)),x.h(0,J.c5(z.gay(a))))
else T.h_("["+a.gcC()+"] "+H.j(a.b),x.h(0,a.a.b))
if(z.gV(a)!=null){z=z.gV(a)
console.error(z)}}},
$isi:1}}],["","",,E,{"^":"",
qx:[function(){var z,y,x,w,v,u,t,s
T.mU()
z=N.hH(!0)
y=document
x=y.querySelector("#bromium-canvas")
w=J.o(x)
w.sK(x,y.body.clientWidth)
v=w.gK(x)
if(typeof v!=="number")return v.aA()
w.sL(x,C.A.a4(v/5*2))
u=new N.hK(z,null,null,null,null,null,null,null,-1,x,null,null,30,null,null,null,null,!0)
u.fi(x,30)
J.dM(u.e,"OES_standard_derivatives")
v=new S.eo(u.e,"attribute vec2 aImposterPosition;\nattribute vec3 aParticlePosition;\nattribute vec3 aParticleColor;\nattribute float aParticleRadius;\n\nuniform mat4 uViewMatrix;\nuniform float uViewportRatio;\n\nvarying vec3 sphereColor;\nvarying vec3 spherePosition;\nvarying vec2 impostorPosition;\n\nvoid main(void) {\n  vec2 imp = vec2(aImposterPosition.x / uViewportRatio, aImposterPosition.y);\n  vec4 position = uViewMatrix * vec4(aParticlePosition, 1.0);\n\n  sphereColor = aParticleColor;\n  impostorPosition = aImposterPosition;\n  spherePosition = position.xyz;\n\n  gl_Position = position + aParticleRadius * vec4(imp, 0.0, 0.0);\n}\n","#extension GL_OES_standard_derivatives : enable\n\nprecision mediump float;\n\n//uniform highp mat4 uViewMatrix;\nuniform vec3 uLightPosition;\n\nvarying vec3 sphereColor;\nvarying vec3 spherePosition;\nvarying vec2 impostorPosition;\n\nvoid main()\n{\n    float dist = length(impostorPosition);\n\n    if (dist > 1.0) {\n      discard;\n    }\n\n    // Lighting\n    // 1. Project light on sphere\n    // 2. Compute radial gradient\n\n    // With view matrix (light spot moves when rotating).\n    //vec4 light = uViewMatrix * vec4(uLightPosition, 1.0);\n    //light = light - vec4(spherePosition, 0.0);\n    //light = light / length(light.xyz);\n\n    // Without view matrix (light spots are fixed).\n    vec3 light = uLightPosition - spherePosition;\n    light = light / length(light);\n\n    // Compute distance from radial center to fragment coordinate.\n    float rdist = length(impostorPosition - light.xy);\n\n    // Apply radial gradients.\n    vec3 color = sphereColor;\n    color = mix(vec3(1.0, 1.0, 1.0), color, 0.5 + 0.5 * smoothstep(0.0, 1.0, rdist));\n    color = mix(color, vec3(0.0, 0.0, 0.0), smoothstep(0.6, 2.0, rdist));\n    color = mix(color, vec3(0.0, 0.0, 0.0), smoothstep(1.0, 1.5, rdist));\n\n    gl_FragColor = vec4(color, 1.0);\n\n    // Anti-aliased circles.\n    //float delta = fwidth(dist);\n    //float alpha = smoothstep(1.0, 1.0 - delta, dist);\n    //gl_FragColor = mix(vec4(0.0, 0.0, 0.0, 0.0), vec4(sphereColor, 1.0), alpha);\n}\n",null,["aImposterPosition","aParticlePosition","aParticleColor","aParticleRadius"],null,null,null,null,["uViewMatrix","uViewportRatio","uLightPosition"],null)
u.cy=v
v.r="aParticlePosition"
v.x="aParticleColor"
v.y="uViewMatrix"
v.dS()
v=new S.eo(u.e,"attribute vec3 aVertexPosition;\n\nuniform mat4 uViewMatrix;\n\nvarying vec3 vertex;\n\nvoid main(void) {\n  gl_PointSize = 1.5;\n  gl_Position = uViewMatrix * vec4(aVertexPosition, 1.0);\n\n  vertex = aVertexPosition;\n}\n","// License: CC0 (http://creativecommons.org/publicdomain/zero/1.0/)\n#extension GL_OES_standard_derivatives : enable\n\nprecision mediump float;\n\nuniform vec4 uLineColor;\n\nvarying vec3 vertex;\n\nvoid main() {\n  // Pick a coordinate to visualize in a grid\n  vec2 coord = vertex.xz * 10.0;\n\n  // Compute anti-aliased world-space grid lines\n  vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);\n  float line = min(grid.x, grid.y);\n\n  // Just visualize the grid lines directly\n  gl_FragColor = uLineColor * vec4(1.0 - min(line, 1.0));\n}\n",null,["aVertexPosition"],null,null,null,null,["uViewMatrix","uLineColor"],null)
u.db=v
v.r="aVertexPosition"
v.y="uViewMatrix"
v.dS()
v=u.e
w=new T.J(new Float32Array(H.k(4)))
w.a6(0,0,0,1)
t=new T.J(new Float32Array(H.k(4)))
t.a6(1,1,1,0.1)
u.dx=S.i8(v,u.db,t,null,w,null)
w=u.e
t=new T.J(new Float32Array(H.k(4)))
t.a6(0,0,0,1)
v=new T.J(new Float32Array(H.k(4)))
v.a6(1,1,1,0.3)
u.dy=S.id(w,40,80,u.db,v,null,t,null)
t=u.e
v=new S.en(t,null,null,null,[])
u.Q=v
v.c=u.cy
v=[]
w=[P.i3]
u.ch=new S.cb(t,0,35044,34962,v,J.cH(t),w)
v.push(new S.bo("aParticlePosition",5126,3,28,0))
u.ch.e.push(new S.bo("aParticleColor",5126,3,28,12))
u.ch.e.push(new S.bo("aParticleRadius",5126,1,28,24))
u.Q.e.push(u.ch)
v=u.e
t=[]
u.cx=new S.cb(v,0,35044,34962,t,J.cH(v),w)
t.push(new S.bo("aImposterPosition",5126,2,0,0))
u.cx.aQ(new Float32Array(H.a2([1,1,1,-1,-1,-1,-1,1])))
u.Q.e.push(u.cx)
t=u.Q
w=u.e
t.d=new S.em(w,0,35044,34963,[],J.cH(w))
u.Q.d.aQ(new Uint16Array(H.a2([0,1,2,0,2,3])))
s=y.querySelector("#simulation-select")
w=J.ho(s)
W.T(w.a,w.b,new E.mF(z,u,s),!1,H.z(w,0))
w=J.c2(y.querySelector("#resume-simulation"))
W.T(w.a,w.b,new E.mG(z),!1,H.z(w,0))
w=J.c2(y.querySelector("#pause-simulation"))
W.T(w.a,w.b,new E.mH(z),!1,H.z(w,0))
w=J.c2(y.querySelector("#toggle-isolates"))
W.T(w.a,w.b,new E.mI(z),!1,H.z(w,0))
y=J.c2(y.querySelector("#print-benchmark"))
W.T(y.a,y.b,new E.mJ(z),!1,H.z(y,0))},"$0","fU",0,0,1],
mF:{"^":"h:11;a,b,c",
$1:function(a){var z=0,y=P.b1(),x,w=this,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
var $async$$1=P.bf(function(b,c){if(b===1)return P.bb(c,y)
while(true)switch(z){case 0:v=w.a
z=3
return P.a7(v.R(0),$async$$1)
case 3:switch(J.c5(w.c)){case"redblue-1m":u=G.dw(5e5,5e5,0.002)
break
case"redblue-100k":u=G.dw(5e4,5e4,0.006)
break
case"redblue-10k":u=G.dw(5000,5000,0.01)
break
case"enzyme":t=G.V
s=H.A([],[t])
r=[P.u,P.l]
q=new H.G(0,null,null,null,null,null,0,r)
p=new G.es(s,q,[t])
t=T.cU().gW()
q.j(0,"N-a",s.length)
s.push(new G.V(t,0.02,0.02))
t=T.cT().gW()
q.j(0,"N-b",s.length)
s.push(new G.V(t,0.03,0.01))
t=T.dT().gW()
q.j(0,"enzyme",s.length)
s.push(new G.V(t,0.01,0.05))
t=T.dU().gW()
q.j(0,"enzyme-N",s.length)
s.push(new G.V(t,0.01,0.05))
t=T.dS().gW()
q.j(0,"enzyme-NN",s.length)
s.push(new G.V(t,0.01,0.05))
t=H.A([],[G.bp])
s=new H.G(0,null,null,null,null,null,0,r)
o=H.A([],[G.cq])
n=q.h(0,"N-a")
m=q.h(0,"enzyme")
l=q.h(0,"enzyme-N")
k=new Float32Array(H.a2([0.1])).buffer
k=(k&&C.c).F(k,0,1)
s.j(0,"step 1",t.length)
t.push(new G.bp(new G.N(n,0),new G.N(m,0),new G.N(l,0),new D.aG(k)))
k=q.h(0,"N-a")
l=q.h(0,"enzyme-N")
m=q.h(0,"enzyme-NN")
n=new Float32Array(H.a2([1])).buffer
n=(n&&C.c).F(n,0,1)
s.j(0,"step 2",t.length)
t.push(new G.bp(new G.N(k,0),new G.N(l,0),new G.N(m,0),new D.aG(n)))
n=q.h(0,"enzyme-NN")
m=q.h(0,"N-b")
l=q.h(0,"enzyme")
k=new Float32Array(H.a2([0.1])).buffer
k=(k&&C.c).F(k,0,1)
new H.G(0,null,null,null,null,null,0,r).j(0,"step 3",o.length)
o.push(new G.cq(new G.N(n,0),[new G.N(m,0),new G.N(l,0)],new D.aG(k)))
k=new T.p(new Float32Array(H.k(3)))
k.a5(0,0,0)
l=new T.p(new Float32Array(H.k(3)))
l.a5(2,1,1)
k=new Z.cX(k,null,null,null,C.l)
k.scU(l)
l=p.ba(P.a0(["N-a",0,"N-b",0,"enzyme",0,"enzyme-N",0,"enzyme-NN",0]))
m=p.ba(P.a0(["N-a",0,"N-b",1,"enzyme",0,"enzyme-N",0,"enzyme-NN",0]))
n=p.ba(P.a0(["N-a",0,"N-b",0,"enzyme",0,"enzyme-N",0,"enzyme-NN",0]))
r=p.ba(P.a0(["N-a",0,"N-b",0,"enzyme",0,"enzyme-N",0,"enzyme-NN",0]))
s=p.a.length
j=new Float32Array(H.k(3))
i=new Uint32Array(H.k(s))
s=new Uint32Array(H.k(s))
u=G.df(p.a,t,o)
u.aI(q.h(0,"N-a"),k,2e4)
u.aI(q.h(0,"enzyme"),k,500)
u.dI(new G.eF(k,null,l,m,n,r,i,s,new T.p(j)))
break
case"transport":t=G.V
s=H.A([],[t])
r=[P.u,P.l]
q=new H.G(0,null,null,null,null,null,0,r)
p=new G.es(s,q,[t])
t=T.cU().gW()
q.j(0,"ATP",s.length)
s.push(new G.V(t,0.04,0.01))
t=T.cT().gW()
q.j(0,"ADP",s.length)
s.push(new G.V(t,0.04,0.01))
t=new T.J(new Float32Array(H.k(4)))
t.a6(0.5019607843137255,0.5019607843137255,0.5019607843137255,1)
t=t.gW()
q.j(0,"P",s.length)
s.push(new G.V(t,0.05,0.005))
t=T.dT().gW()
q.j(0,"nutrient",s.length)
s.push(new G.V(t,0.05,0.03))
t=T.dU().gW()
q.j(0,"channel",s.length)
s.push(new G.V(t,0.02,0.06))
t=new T.J(new Float32Array(H.k(4)))
t.a6(0.5647058823529412,0.9333333333333333,0.5647058823529412,1)
t=t.gW()
q.j(0,"bounded-channel",s.length)
s.push(new G.V(t,0.02,0.06))
t=T.dS().gW()
q.j(0,"active-bounded-channel",s.length)
s.push(new G.V(t,0.02,0.06))
t=H.A([],[G.bp])
s=new H.G(0,null,null,null,null,null,0,r)
o=H.A([],[G.cq])
n=q.h(0,"channel")
m=q.h(0,"nutrient")
l=q.h(0,"bounded-channel")
k=new Float32Array(H.a2([1])).buffer
k=(k&&C.c).F(k,0,1)
s.j(0,"step 1",t.length)
t.push(new G.bp(new G.N(n,1),new G.N(m,2),new G.N(l,1),new D.aG(k)))
k=q.h(0,"bounded-channel")
l=q.h(0,"ATP")
m=q.h(0,"active-bounded-channel")
n=new Float32Array(H.a2([1])).buffer
n=(n&&C.c).F(n,0,1)
s.j(0,"step 2",t.length)
t.push(new G.bp(new G.N(k,1),new G.N(l,0),new G.N(m,1),new D.aG(n)))
n=q.h(0,"active-bounded-channel")
m=q.h(0,"channel")
l=q.h(0,"ADP")
k=q.h(0,"P")
s=q.h(0,"nutrient")
j=new Float32Array(H.a2([0.5])).buffer
j=(j&&C.c).F(j,0,1)
new H.G(0,null,null,null,null,null,0,r).j(0,"active-bounded-channel",o.length)
o.push(new G.cq(new G.N(n,1),[new G.N(m,1),new G.N(l,0),new G.N(k,0),new G.N(s,0)],new D.aG(j)))
j=new T.p(new Float32Array(H.k(3)))
j.a5(0,0,0)
j=new Z.cn(j,1,C.k)
s=P.L
k=new Float32Array(H.a2(P.ay(7,0,!1,s)))
l=new Float32Array(H.a2(P.ay(7,0,!1,s)))
s=new Float32Array(H.a2(P.ay(7,0,!1,s)))
m=p.ba(P.a0(["ATP",0,"ADP",0,"P",0,"nutrient",0,"channel",1,"bounded-channel",0,"active-bounded-channel",0]))
n=p.a.length
r=new Float32Array(H.k(3))
i=new Uint32Array(H.k(n))
n=new Uint32Array(H.k(n))
u=G.df(p.a,t,o)
u.aI(q.h(0,"ATP"),j,8000)
u.aI(q.h(0,"channel"),j,1000)
q=q.h(0,"nutrient")
o=new T.p(new Float32Array(H.k(3)))
o.a5(0,0,0)
u.dK(q,new Z.cn(o,1.5,C.k),5000,[j])
u.dI(new G.eF(j,null,k,l,s,m,i,n,new T.p(r)))
break
default:u=null}z=u!=null?4:5
break
case 4:h=u.i2()
z=6
return P.a7(v.Y(u),$async$$1)
case 6:v=w.b
t=h.a
s=new T.p(new Float32Array(H.k(3)))
s.t(t)
r=h.b
s.q(0,r)
s.ah(0,0.5)
v.x=s
s=v.r
q=H.k(3)
o=new Float32Array(q)
n=new T.p(o)
n.t(t)
n.q(0,r)
n.ah(0,0.5)
t=t.a
n=t.length
if(0>=n){x=H.a(t,0)
z=1
break}r=t[0]
if(0>=q){x=H.a(o,0)
z=1
break}g=r-o[0]
if(1>=n){x=H.a(t,1)
z=1
break}r=t[1]
if(1>=q){x=H.a(o,1)
z=1
break}f=r-o[1]
if(2>=n){x=H.a(t,2)
z=1
break}t=t[2]
if(2>=q){x=H.a(o,2)
z=1
break}e=t-o[2]
o=Math.sqrt(g*g+f*f+e*e)
s.a.a=-3*o
v.y=!1
v.dw()
case 5:case 1:return P.bc(x,y)}})
return P.bd($async$$1,y)},
$isi:1},
mG:{"^":"h:2;a",
$1:function(a){this.a.af(0)},
$isi:1},
mH:{"^":"h:2;a",
$1:function(a){this.a.R(0)},
$isi:1},
mI:{"^":"h:11;a",
$1:function(a){var z=0,y=P.b1(),x=this,w
var $async$$1=P.bf(function(b,c){if(b===1)return P.bb(c,y)
while(true)switch(z){case 0:w=x.a
z=w.f?2:4
break
case 2:z=5
return P.a7(w.aC(),$async$$1)
case 5:z=3
break
case 4:z=6
return P.a7(w.aU(),$async$$1)
case 6:case 3:return P.bc(null,y)}})
return P.bd($async$$1,y)},
$isi:1},
mJ:{"^":"h:2;a",
$1:function(a){this.a.i5()},
$isi:1}},1],["","",,G,{"^":"",
dw:function(a,b,c){var z,y,x,w,v
z=H.A([],[G.V])
y=new H.G(0,null,null,null,null,null,0,[P.u,P.l])
x=T.cU().gW()
y.j(0,"red",z.length)
z.push(new G.V(x,0.01,c))
x=T.cT().gW()
y.j(0,"blue",z.length)
z.push(new G.V(x,0.01,c))
w=G.df(z,[],[])
z=y.h(0,"red")
x=new T.p(new Float32Array(H.k(3)))
x.a5(0,0,0)
v=new T.p(new Float32Array(H.k(3)))
v.a5(1,1,1)
w.aI(z,new Z.c6(T.bn(x,v),C.j),a)
y=y.h(0,"blue")
v=new T.p(new Float32Array(H.k(3)))
v.a5(-1,0,0)
x=new T.p(new Float32Array(H.k(3)))
x.a5(0,1,1)
w.aI(y,new Z.c6(T.bn(v,x),C.j),b)
return w}}]]
setupProgram(dart,0)
J.v=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.eA.prototype
return J.ez.prototype}if(typeof a=="string")return J.bO.prototype
if(a==null)return J.jn.prototype
if(typeof a=="boolean")return J.jm.prototype
if(a.constructor==Array)return J.bM.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bP.prototype
return a}if(a instanceof P.f)return a
return J.cy(a)}
J.O=function(a){if(typeof a=="string")return J.bO.prototype
if(a==null)return a
if(a.constructor==Array)return J.bM.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bP.prototype
return a}if(a instanceof P.f)return a
return J.cy(a)}
J.aY=function(a){if(a==null)return a
if(a.constructor==Array)return J.bM.prototype
if(typeof a!="object"){if(typeof a=="function")return J.bP.prototype
return a}if(a instanceof P.f)return a
return J.cy(a)}
J.bj=function(a){if(typeof a=="number")return J.bN.prototype
if(a==null)return a
if(!(a instanceof P.f))return J.bS.prototype
return a}
J.dx=function(a){if(typeof a=="number")return J.bN.prototype
if(typeof a=="string")return J.bO.prototype
if(a==null)return a
if(!(a instanceof P.f))return J.bS.prototype
return a}
J.cx=function(a){if(typeof a=="string")return J.bO.prototype
if(a==null)return a
if(!(a instanceof P.f))return J.bS.prototype
return a}
J.o=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.bP.prototype
return a}if(a instanceof P.f)return a
return J.cy(a)}
J.as=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.dx(a).G(a,b)}
J.dD=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.bj(a).aA(a,b)}
J.H=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.v(a).A(a,b)}
J.ab=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.bj(a).ap(a,b)}
J.bZ=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.bj(a).ag(a,b)}
J.aZ=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.dx(a).Z(a,b)}
J.af=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.bj(a).B(a,b)}
J.bI=function(a,b){return J.bj(a).bU(a,b)}
J.c_=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.fW(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.O(a).h(a,b)}
J.h6=function(a,b,c){if(typeof b==="number")if((a.constructor==Array||H.fW(a,a[init.dispatchPropertyName]))&&!a.immutable$list&&b>>>0===b&&b<a.length)return a[b]=c
return J.aY(a).j(a,b,c)}
J.h7=function(a,b,c,d){return J.o(a).fu(a,b,c,d)}
J.h8=function(a,b,c,d){return J.o(a).fX(a,b,c,d)}
J.dE=function(a,b){return J.aY(a).q(a,b)}
J.h9=function(a,b){return J.cx(a).h8(a,b)}
J.dF=function(a,b,c){return J.o(a).F(a,b,c)}
J.cG=function(a,b,c){return J.o(a).b0(a,b,c)}
J.ha=function(a,b,c){return J.o(a).dL(a,b,c)}
J.hb=function(a,b){return J.aY(a).dQ(a,b)}
J.hc=function(a,b,c,d,e){return J.o(a).dR(a,b,c,d,e)}
J.dG=function(a){return J.o(a).he(a)}
J.hd=function(a,b){return J.dx(a).av(a,b)}
J.he=function(a,b){return J.o(a).a8(a,b)}
J.c0=function(a,b,c){return J.O(a).hj(a,b,c)}
J.cH=function(a){return J.o(a).b2(a)}
J.cI=function(a,b){return J.o(a).dV(a,b)}
J.hf=function(a,b){return J.o(a).dY(a,b)}
J.dH=function(a,b,c,d,e){return J.o(a).e_(a,b,c,d,e)}
J.hg=function(a,b,c,d,e,f){return J.o(a).hv(a,b,c,d,e,f)}
J.dI=function(a,b){return J.aY(a).w(a,b)}
J.cJ=function(a,b){return J.o(a).e3(a,b)}
J.hh=function(a,b){return J.cx(a).hw(a,b)}
J.hi=function(a){return J.bj(a).bC(a)}
J.hj=function(a){return J.o(a).gfz(a)}
J.dJ=function(a){return J.o(a).gat(a)}
J.cK=function(a){return J.o(a).gau(a)}
J.hk=function(a){return J.o(a).gdX(a)}
J.bm=function(a){return J.o(a).gV(a)}
J.Y=function(a){return J.v(a).gC(a)}
J.hl=function(a){return J.o(a).gaM(a)}
J.c1=function(a){return J.aY(a).gO(a)}
J.at=function(a){return J.O(a).gi(a)}
J.hm=function(a){return J.o(a).gay(a)}
J.hn=function(a){return J.o(a).gu(a)}
J.dK=function(a){return J.o(a).gaz(a)}
J.ho=function(a){return J.o(a).gei(a)}
J.c2=function(a){return J.o(a).gej(a)}
J.bJ=function(a){return J.o(a).gae(a)}
J.dL=function(a){return J.o(a).gbk(a)}
J.cL=function(a){return J.o(a).ga_(a)}
J.c3=function(a){return J.o(a).geG(a)}
J.c4=function(a){return J.o(a).gl(a)}
J.c5=function(a){return J.o(a).gE(a)}
J.hp=function(a,b){return J.o(a).eW(a,b)}
J.dM=function(a,b){return J.o(a).cP(a,b)}
J.hq=function(a,b,c){return J.o(a).cT(a,b,c)}
J.hr=function(a,b){return J.aY(a).aO(a,b)}
J.an=function(a,b){return J.o(a).N(a,b)}
J.hs=function(a,b){return J.o(a).say(a,b)}
J.ht=function(a,b){return J.o(a).saz(a,b)}
J.hu=function(a,b){return J.cx(a).cY(a,b)}
J.hv=function(a,b){return J.cx(a).aT(a,b)}
J.au=function(a){return J.v(a).k(a)}
J.hw=function(a,b,c){return J.o(a).eI(a,b,c)}
J.hx=function(a,b,c){return J.o(a).eJ(a,b,c)}
J.dN=function(a,b,c){return J.o(a).eK(a,b,c)}
J.hy=function(a,b,c,d){return J.o(a).eL(a,b,c,d)}
J.cM=function(a,b){return J.o(a).eQ(a,b)}
J.hz=function(a,b,c){return J.o(a).ij(a,b,c)}
J.hA=function(a,b,c,d,e){return J.o(a).eT(a,b,c,d,e)}
I.cC=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.z=J.e.prototype
C.a=J.bM.prototype
C.A=J.ez.prototype
C.d=J.eA.prototype
C.b=J.bN.prototype
C.h=J.bO.prototype
C.H=J.bP.prototype
C.c=H.ch.prototype
C.i=H.jE.prototype
C.v=H.jG.prototype
C.w=J.jI.prototype
C.n=W.kp.prototype
C.o=J.bS.prototype
C.x=W.kH.prototype
C.y=new P.jH()
C.m=new P.kV()
C.f=new P.lj()
C.e=new P.lx()
C.j=new Z.cW(0,"DomainType.aabb")
C.k=new Z.cW(1,"DomainType.sphere")
C.l=new Z.cW(2,"DomainType.ellipsoid")
C.p=new P.b2(0)
C.B=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.C=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Firefox") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "GeoGeolocation": "Geolocation",
    "Location": "!Location",
    "WorkerMessageEvent": "MessageEvent",
    "XMLDocument": "!Document"};
  function getTagFirefox(o) {
    var tag = getTag(o);
    return quickMap[tag] || tag;
  }
  hooks.getTag = getTagFirefox;
}
C.q=function(hooks) { return hooks; }

C.D=function(getTagFallback) {
  return function(hooks) {
    if (typeof navigator != "object") return hooks;
    var ua = navigator.userAgent;
    if (ua.indexOf("DumpRenderTree") >= 0) return hooks;
    if (ua.indexOf("Chrome") >= 0) {
      function confirm(p) {
        return typeof window == "object" && window[p] && window[p].name == p;
      }
      if (confirm("Window") && confirm("HTMLElement")) return hooks;
    }
    hooks.getTag = getTagFallback;
  };
}
C.E=function() {
  var toStringFunction = Object.prototype.toString;
  function getTag(o) {
    var s = toStringFunction.call(o);
    return s.substring(8, s.length - 1);
  }
  function getUnknownTag(object, tag) {
    if (/^HTML[A-Z].*Element$/.test(tag)) {
      var name = toStringFunction.call(object);
      if (name == "[object Object]") return null;
      return "HTMLElement";
    }
  }
  function getUnknownTagGenericBrowser(object, tag) {
    if (self.HTMLElement && object instanceof HTMLElement) return "HTMLElement";
    return getUnknownTag(object, tag);
  }
  function prototypeForTag(tag) {
    if (typeof window == "undefined") return null;
    if (typeof window[tag] == "undefined") return null;
    var constructor = window[tag];
    if (typeof constructor != "function") return null;
    return constructor.prototype;
  }
  function discriminator(tag) { return null; }
  var isBrowser = typeof navigator == "object";
  return {
    getTag: getTag,
    getUnknownTag: isBrowser ? getUnknownTagGenericBrowser : getUnknownTag,
    prototypeForTag: prototypeForTag,
    discriminator: discriminator };
}
C.F=function(hooks) {
  var userAgent = typeof navigator == "object" ? navigator.userAgent : "";
  if (userAgent.indexOf("Trident/") == -1) return hooks;
  var getTag = hooks.getTag;
  var quickMap = {
    "BeforeUnloadEvent": "Event",
    "DataTransfer": "Clipboard",
    "HTMLDDElement": "HTMLElement",
    "HTMLDTElement": "HTMLElement",
    "HTMLPhraseElement": "HTMLElement",
    "Position": "Geoposition"
  };
  function getTagIE(o) {
    var tag = getTag(o);
    var newTag = quickMap[tag];
    if (newTag) return newTag;
    if (tag == "Object") {
      if (window.DataView && (o instanceof window.DataView)) return "DataView";
    }
    return tag;
  }
  function prototypeForTagIE(tag) {
    var constructor = window[tag];
    if (constructor == null) return null;
    return constructor.prototype;
  }
  hooks.getTag = getTagIE;
  hooks.prototypeForTag = prototypeForTagIE;
}
C.G=function(hooks) {
  var getTag = hooks.getTag;
  var prototypeForTag = hooks.prototypeForTag;
  function getTagFixed(o) {
    var tag = getTag(o);
    if (tag == "Document") {
      if (!!o.xmlVersion) return "!Document";
      return "!HTMLDocument";
    }
    return tag;
  }
  function prototypeForTagFixed(tag) {
    if (tag == "Document") return null;
    return prototypeForTag(tag);
  }
  hooks.getTag = getTagFixed;
  hooks.prototypeForTag = prototypeForTagFixed;
}
C.r=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.I=new N.bs("ALL",0)
C.t=new N.bs("INFO",800)
C.J=new N.bs("OFF",2000)
C.K=new N.bs("SEVERE",1000)
C.L=new N.bs("WARNING",900)
C.u=I.cC([C.j,C.k,C.l])
C.M=I.cC([])
$.ew=null
$.bx=1
$.eO="$cachedFunction"
$.eP="$cachedInvocation"
$.bQ=null
$.aN=null
$.ao=0
$.bq=null
$.dP=null
$.dy=null
$.fN=null
$.h0=null
$.cw=null
$.cB=null
$.dA=null
$.be=null
$.bC=null
$.bD=null
$.dt=!1
$.q=C.e
$.ef=0
$.aC=null
$.e0=null
$.e_=null
$.dZ=null
$.e1=null
$.dY=null
$.dg=!0
$.cA=!1
$.mT=C.J
$.fH=C.t
$.eC=0
$=null
init.isHunkLoaded=function(a){return!!$dart_deferred_initializers$[a]}
init.deferredInitialized=new Object(null)
init.isHunkInitialized=function(a){return init.deferredInitialized[a]}
init.initializeLoadedHunk=function(a){$dart_deferred_initializers$[a]($globals$,$)
init.deferredInitialized[a]=true}
init.deferredLibraryUris={}
init.deferredLibraryHashes={};(function(a){for(var z=0;z<a.length;){var y=a[z++]
var x=a[z++]
var w=a[z++]
I.$lazy(y,x,w)}})(["dX","$get$dX",function(){return H.fS("_$dart_dartClosure")},"d3","$get$d3",function(){return H.fS("_$dart_js")},"d1","$get$d1",function(){return H.j9()},"d2","$get$d2",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.ef
$.ef=z+1
z="expando$key$"+z}return new P.i1(null,z)},"f4","$get$f4",function(){return H.aq(H.cp({
toString:function(){return"$receiver$"}}))},"f5","$get$f5",function(){return H.aq(H.cp({$method$:null,
toString:function(){return"$receiver$"}}))},"f6","$get$f6",function(){return H.aq(H.cp(null))},"f7","$get$f7",function(){return H.aq(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"fb","$get$fb",function(){return H.aq(H.cp(void 0))},"fc","$get$fc",function(){return H.aq(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"f9","$get$f9",function(){return H.aq(H.fa(null))},"f8","$get$f8",function(){return H.aq(function(){try{null.$method$}catch(z){return z.message}}())},"fe","$get$fe",function(){return H.aq(H.fa(void 0))},"fd","$get$fd",function(){return H.aq(function(){try{(void 0).$method$}catch(z){return z.message}}())},"dn","$get$dn",function(){return P.kL()},"aH","$get$aH",function(){return P.l4(null,P.ck)},"bG","$get$bG",function(){return[]},"dW","$get$dW",function(){return{}},"al","$get$al",function(){return N.aK("bromium.logging.GroupLogger")},"bE","$get$bE",function(){return P.jR(null)},"cZ","$get$cZ",function(){var z,y,x,w,v,u,t,s,r
z=T.aU(0,0,0)
y=T.aU(0,1,0)
x=T.aU(1,1,0)
w=T.aU(1,0,0)
v=T.aU(0,0,1)
u=T.aU(0,1,1)
t=T.aU(1,1,1)
s=T.aU(1,0,1)
r=new B.fg(3,0,3,8,H.jF(24))
r.aV([z,y,x,w,v,u,t,s],3,0,0)
return r},"ek","$get$ek",function(){return H.eK([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7])},"ej","$get$ej",function(){return H.eK([0,2,1,0,3,2,4,5,6,4,6,7,0,1,5,0,5,4,1,2,6,1,6,5,2,3,7,2,7,6,3,0,4,3,4,7])},"cf","$get$cf",function(){return N.aK("")},"eD","$get$eD",function(){return P.jv(P.u,N.d8)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[]
init.types=[{func:1},{func:1,v:true},{func:1,args:[,]},{func:1,args:[,,]},{func:1,args:[P.u]},{func:1,args:[W.ad]},{func:1,v:true,args:[P.f],opt:[P.b5]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,args:[,P.b5]},{func:1,ret:P.u,args:[P.l]},{func:1,args:[W.a1]},{func:1,ret:P.a4,args:[,]},{func:1,args:[,P.u]},{func:1,args:[{func:1,v:true}]},{func:1,args:[P.l,,]},{func:1,args:[,],opt:[,]},{func:1,v:true,args:[,P.b5]},{func:1,ret:P.f,opt:[P.f]},{func:1,v:true,opt:[P.f]},{func:1,ret:P.d_,args:[P.u]},{func:1,v:true,args:[P.u]},{func:1,args:[P.l]},{func:1,args:[[S.ae,P.l,P.L],[S.ae,P.l,P.L]]},{func:1,args:[G.b0,G.b0]},{func:1,args:[P.am]},{func:1,args:[P.u,P.l]},{func:1,args:[W.bT]},{func:1,ret:P.l,args:[P.l,P.l]},{func:1,args:[N.ce]},{func:1,ret:P.am},{func:1,ret:P.u,args:[W.w]},{func:1,v:true,args:[N.d0]}]
function convertToFastObject(a){function MyClass(){}MyClass.prototype=a
new MyClass()
return a}function convertToSlowObject(a){a.__MAGIC_SLOW_PROPERTY=1
delete a.__MAGIC_SLOW_PROPERTY
return a}A=convertToFastObject(A)
B=convertToFastObject(B)
C=convertToFastObject(C)
D=convertToFastObject(D)
E=convertToFastObject(E)
F=convertToFastObject(F)
G=convertToFastObject(G)
H=convertToFastObject(H)
J=convertToFastObject(J)
K=convertToFastObject(K)
L=convertToFastObject(L)
M=convertToFastObject(M)
N=convertToFastObject(N)
O=convertToFastObject(O)
P=convertToFastObject(P)
Q=convertToFastObject(Q)
R=convertToFastObject(R)
S=convertToFastObject(S)
T=convertToFastObject(T)
U=convertToFastObject(U)
V=convertToFastObject(V)
W=convertToFastObject(W)
X=convertToFastObject(X)
Y=convertToFastObject(Y)
Z=convertToFastObject(Z)
function init(){I.p=Object.create(null)
init.allClasses=map()
init.getTypeFromName=function(a){return init.allClasses[a]}
init.interceptorsByTag=map()
init.leafTags=map()
init.finishedClasses=map()
I.$lazy=function(a,b,c,d,e){if(!init.lazies)init.lazies=Object.create(null)
init.lazies[a]=b
e=e||I.p
var z={}
var y={}
e[a]=z
e[b]=function(){var x=this[a]
if(x==y)H.mZ(d||a)
try{if(x===z){this[a]=y
try{x=this[a]=c()}finally{if(x===z)this[a]=null}}return x}finally{this[b]=function(){return this[a]}}}}
I.$finishIsolateConstructor=function(a){var z=a.p
function Isolate(){var y=Object.keys(z)
for(var x=0;x<y.length;x++){var w=y[x]
this[w]=z[w]}var v=init.lazies
var u=v?Object.keys(v):[]
for(var x=0;x<u.length;x++)this[v[u[x]]]=null
function ForceEfficientMap(){}ForceEfficientMap.prototype=this
new ForceEfficientMap()
for(var x=0;x<u.length;x++){var t=v[u[x]]
this[t]=z[t]}}Isolate.prototype=a.prototype
Isolate.prototype.constructor=Isolate
Isolate.p=z
Isolate.cC=a.cC
Isolate.X=a.X
return Isolate}}!function(){var z=function(a){var t={}
t[a]=1
return Object.keys(convertToFastObject(t))[0]}
init.getIsolateTag=function(a){return z("___dart_"+a+init.isolateTag)}
var y="___dart_isolate_tags_"
var x=Object[y]||(Object[y]=Object.create(null))
var w="_ZxYxX"
for(var v=0;;v++){var u=z(w+"_"+v+"_")
if(!(u in x)){x[u]=1
init.isolateTag=u
break}}init.dispatchPropertyName=init.getIsolateTag("dispatch_record")}();(function(a){if(typeof document==="undefined"){a(null)
return}if(typeof document.currentScript!='undefined'){a(document.currentScript)
return}var z=document.scripts
function onLoad(b){for(var x=0;x<z.length;++x)z[x].removeEventListener("load",onLoad,false)
a(b.target)}for(var y=0;y<z.length;++y)z[y].addEventListener("load",onLoad,false)})(function(a){init.currentScript=a
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.h3(E.fU(),b)},[])
else (function(b){H.h3(E.fU(),b)})([])})})()