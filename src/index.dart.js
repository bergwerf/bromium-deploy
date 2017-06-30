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
b5.$ise=b4
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
init.leafTags[b8[b2]]=false}}b5.$deferredAction()}if(b5.$isf)b5.$deferredAction()}var a3=Object.keys(a4.pending)
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
var d=supportsDirectProtoAccess&&b1!="e"
for(var c=0;c<f.length;c++){var a0=f[c]
var a1=a0.charCodeAt(0)
if(a0==="t"){processStatics(init.statics[b1]=b2.t,b3)
delete b2.t}else if(a1===43){w[g]=a0.substring(1)
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
function tearOffGetter(c,d,e,f){return f?new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"(x) {"+"if (c === null) c = "+"H.eE"+"("+"this, funcs, reflectionInfo, false, [x], name);"+"return new c(this, funcs[0], x, name);"+"}")(c,d,e,H,null):new Function("funcs","reflectionInfo","name","H","c","return function tearOff_"+e+y+++"() {"+"if (c === null) c = "+"H.eE"+"("+"this, funcs, reflectionInfo, false, [], name);"+"return new c(this, funcs[0], null, name);"+"}")(c,d,e,H,null)}function tearOff(c,d,e,f,a0){var g
return e?function(){if(g===void 0)g=H.eE(this,c,d,true,[],f).prototype
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
x.push([p,o,i,h,n,j,k,m])}finishClasses(s)}I.ae=function(){}
var dart=[["","",,H,{"^":"",tK:{"^":"e;a"}}],["","",,J,{"^":"",
t:function(a){return void 0},
dv:function(a,b,c,d){return{i:a,p:b,e:c,x:d}},
dq:function(a){var z,y,x,w,v
z=a[init.dispatchPropertyName]
if(z==null)if($.eG==null){H.qO()
z=a[init.dispatchPropertyName]}if(z!=null){y=z.p
if(!1===y)return z.i
if(!0===y)return a
x=Object.getPrototypeOf(a)
if(y===x)return z.i
if(z.e===x)throw H.b(new P.c5("Return interceptor for "+H.j(y(a,z))))}w=a.constructor
v=w==null?null:w[$.$get$e1()]
if(v!=null)return v
v=H.qX(a)
if(v!=null)return v
if(typeof a=="function")return C.W
y=Object.getPrototypeOf(a)
if(y==null)return C.I
if(y===Object.prototype)return C.I
if(typeof w=="function"){Object.defineProperty(w,$.$get$e1(),{value:C.w,enumerable:false,writable:true,configurable:true})
return C.w}return C.w},
f:{"^":"e;",
I:function(a,b){return a===b},
gK:function(a){return H.aU(a)},
k:["hG",function(a){return H.d9(a)}],
"%":"AnimationEffectReadOnly|AnimationEffectTiming|AnimationTimeline|AppBannerPromptResult|AudioListener|BarProp|Bluetooth|BluetoothAdvertisingData|BluetoothCharacteristicProperties|BluetoothRemoteGATTServer|BluetoothRemoteGATTService|BluetoothUUID|Body|CHROMIUMSubscribeUniform|CHROMIUMValuebuffer|CSS|Cache|CacheStorage|CanvasGradient|CanvasPattern|CircularGeofencingRegion|Client|CompositorProxy|ConsoleBase|Crypto|DOMFileSystemSync|DOMImplementation|DOMParser|DOMStringMap|DataTransfer|Database|DeprecatedStorageInfo|DeprecatedStorageQuota|DeviceRotationRate|DirectoryEntrySync|DirectoryReader|DirectoryReaderSync|EXTBlendMinMax|EXTColorBufferFloat|EXTDisjointTimerQuery|EXTFragDepth|EXTShaderTextureLOD|EXTTextureFilterAnisotropic|EXT_blend_minmax|EXT_frag_depth|EXT_sRGB|EXT_shader_texture_lod|EXT_texture_filter_anisotropic|EXTsRGB|EffectModel|EntrySync|FileEntrySync|FileReaderSync|FileWriterSync|Geofencing|GeofencingRegion|Geolocation|Geoposition|HMDVRDevice|HTMLAllCollection|Headers|IDBFactory|IDBKeyRange|IdleDeadline|ImageBitmap|ImageBitmapRenderingContext|InjectedScriptHost|InputDeviceCapabilities|IntersectionObserver|IntersectionObserverEntry|KeyframeEffect|MIDIInputMap|MIDIOutputMap|MediaDeviceInfo|MediaDevices|MediaError|MediaKeyStatusMap|MediaKeySystemAccess|MediaKeys|MediaMetadata|MemoryInfo|MessageChannel|Metadata|MutationObserver|NFC|NavigatorStorageUtils|NodeFilter|NonDocumentTypeChildNode|NonElementParentNode|OESElementIndexUint|OESStandardDerivatives|OESTextureFloat|OESTextureFloatLinear|OESTextureHalfFloat|OESTextureHalfFloatLinear|OESVertexArrayObject|OES_element_index_uint|OES_standard_derivatives|OES_texture_float|OES_texture_float_linear|OES_texture_half_float|OES_texture_half_float_linear|OES_vertex_array_object|OffscreenCanvas|PagePopupController|PerformanceObserver|PerformanceObserverEntryList|PerformanceTiming|PeriodicWave|Permissions|PositionSensorVRDevice|Presentation|PushManager|PushMessageData|PushSubscription|RTCCertificate|RTCIceCandidate|RTCStatsResponse|Range|ReadableByteStream|ReadableByteStreamReader|ReadableStreamReader|Request|Response|SQLResultSet|SQLTransaction|SVGAnimatedAngle|SVGAnimatedBoolean|SVGAnimatedEnumeration|SVGAnimatedInteger|SVGAnimatedLength|SVGAnimatedLengthList|SVGAnimatedNumber|SVGAnimatedNumberList|SVGAnimatedPreserveAspectRatio|SVGAnimatedRect|SVGAnimatedString|SVGAnimatedTransformList|SVGPreserveAspectRatio|SVGUnitTypes|Screen|SharedArrayBuffer|SourceInfo|SpeechRecognitionAlternative|StorageInfo|StorageManager|StorageQuota|SubtleCrypto|SyncManager|TextMetrics|USBAlternateInterface|USBConfiguration|USBDevice|USBEndpoint|USBInTransferResult|USBInterface|USBIsochronousInTransferPacket|USBIsochronousInTransferResult|USBIsochronousOutTransferPacket|USBIsochronousOutTransferResult|USBOutTransferResult|UnderlyingSourceBase|VRDevice|VREyeParameters|VRFieldOfView|VTTRegion|ValidityState|VideoPlaybackQuality|VideoTrack|WEBGL_compressed_texture_atc|WEBGL_compressed_texture_etc1|WEBGL_compressed_texture_pvrtc|WEBGL_compressed_texture_s3tc|WEBGL_debug_renderer_info|WEBGL_debug_shaders|WEBGL_depth_texture|WEBGL_draw_buffers|WEBGL_lose_context|WebGLBuffer|WebGLCompressedTextureASTC|WebGLCompressedTextureATC|WebGLCompressedTextureETC1|WebGLCompressedTexturePVRTC|WebGLCompressedTextureS3TC|WebGLDebugRendererInfo|WebGLDebugShaders|WebGLDepthTexture|WebGLDrawBuffers|WebGLExtensionLoseContext|WebGLFramebuffer|WebGLLoseContext|WebGLProgram|WebGLQuery|WebGLRenderbuffer|WebGLSampler|WebGLShader|WebGLShaderPrecisionFormat|WebGLSync|WebGLTexture|WebGLTimerQueryEXT|WebGLTransformFeedback|WebGLVertexArrayObject|WebGLVertexArrayObjectOES|WebKitCSSMatrix|WebKitMutationObserver|WindowClient|WorkerConsole|Worklet|WorkletGlobalScope|XMLSerializer|XPathEvaluator|XPathExpression|XPathNSResolver|XPathResult|XSLTProcessor|mozRTCIceCandidate"},
m4:{"^":"f;",
k:function(a){return String(a)},
gK:function(a){return a?519018:218159},
$isaD:1},
h1:{"^":"f;",
I:function(a,b){return null==b},
k:function(a){return"null"},
gK:function(a){return 0}},
e2:{"^":"f;",
gK:function(a){return 0},
k:["hI",function(a){return String(a)}],
$ism5:1},
mR:{"^":"e2;"},
cv:{"^":"e2;"},
cr:{"^":"e2;",
k:function(a){var z=a[$.$get$fm()]
return z==null?this.hI(a):J.a5(z)},
$S:function(){return{func:1,opt:[,,,,,,,,,,,,,,,,]}},
$isi:1},
co:{"^":"f;$ti",
eZ:function(a,b){if(!!a.immutable$list)throw H.b(new P.o(b))},
bv:function(a,b){if(!!a.fixed$length)throw H.b(new P.o(b))},
l:function(a,b){this.bv(a,"add")
a.push(b)},
fO:function(a,b){this.bv(a,"removeAt")
if(b<0||b>=a.length)throw H.b(P.c0(b,null,null))
return a.splice(b,1)[0]},
W:function(a,b){var z
this.bv(a,"remove")
for(z=0;z<a.length;++z)if(J.E(a[z],b)){a.splice(z,1)
return!0}return!1},
a3:function(a,b){var z
this.bv(a,"addAll")
for(z=J.av(b);z.u();)a.push(z.gD())},
F:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){b.$1(a[y])
if(a.length!==z)throw H.b(new P.T(a))}},
aL:function(a,b){return new H.d1(a,b,[H.B(a,0),null])},
af:function(a,b){var z,y,x
z=a.length
if(z===0)throw H.b(H.a6())
if(0>=z)return H.a(a,0)
y=a[0]
for(x=1;x<z;++x){y=b.$2(y,a[x])
if(z!==a.length)throw H.b(new P.T(a))}return y},
al:function(a,b,c){var z,y,x
z=a.length
for(y=b,x=0;x<z;++x){y=c.$2(y,a[x])
if(a.length!==z)throw H.b(new P.T(a))}return y},
w:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
gv:function(a){if(a.length>0)return a[0]
throw H.b(H.a6())},
gaK:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.b(H.a6())},
V:function(a,b,c,d,e){var z,y,x
this.eZ(a,"setRange")
P.ee(b,c,a.length,null,null,null)
z=c-b
if(z===0)return
if(e<0)H.C(P.a7(e,0,null,"skipCount",null))
if(e+z>d.length)throw H.b(H.fZ())
if(e<b)for(y=z-1;y>=0;--y){x=e+y
if(x<0||x>=d.length)return H.a(d,x)
a[b+y]=d[x]}else for(y=0;y<z;++y){x=e+y
if(x<0||x>=d.length)return H.a(d,x)
a[b+y]=d[x]}},
eT:function(a,b){var z,y
z=a.length
for(y=0;y<z;++y){if(b.$1(a[y])===!0)return!0
if(a.length!==z)throw H.b(new P.T(a))}return!1},
hA:function(a,b){this.eZ(a,"sort")
H.cu(a,0,a.length-1,b)},
jP:function(a,b,c){var z
if(c>=a.length)return-1
for(z=c;z<a.length;++z)if(J.E(a[z],b))return z
return-1},
jO:function(a,b){return this.jP(a,b,0)},
B:function(a,b){var z
for(z=0;z<a.length;++z)if(J.E(a[z],b))return!0
return!1},
gE:function(a){return a.length===0},
gY:function(a){return a.length!==0},
k:function(a){return P.cV(a,"[","]")},
gJ:function(a){return new J.ck(a,a.length,0,null)},
gK:function(a){return H.aU(a)},
gi:function(a){return a.length},
si:function(a,b){this.bv(a,"set length")
if(b<0)throw H.b(P.a7(b,0,null,"newLength",null))
a.length=b},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.b(H.Z(a,b))
if(b>=a.length||b<0)throw H.b(H.Z(a,b))
return a[b]},
j:function(a,b,c){if(!!a.immutable$list)H.C(new P.o("indexed set"))
if(typeof b!=="number"||Math.floor(b)!==b)throw H.b(H.Z(a,b))
if(b>=a.length||b<0)throw H.b(H.Z(a,b))
a[b]=c},
$isu:1,
$asu:I.ae,
$isd:1,
$asd:null,
$isc:1,
$asc:null,
t:{
m3:function(a,b){var z
if(typeof a!=="number"||Math.floor(a)!==a)throw H.b(P.cN(a,"length","is not an integer"))
if(a<0||a>4294967295)throw H.b(P.a7(a,0,4294967295,"length",null))
z=H.v(new Array(a),[b])
z.fixed$length=Array
return z}}},
tJ:{"^":"co;$ti"},
ck:{"^":"e;a,b,c,d",
gD:function(){return this.d},
u:function(){var z,y,x
z=this.a
y=z.length
if(this.b!==y)throw H.b(H.D(z))
x=this.c
if(x>=y){this.d=null
return!1}this.d=z[x]
this.c=x+1
return!0}},
cp:{"^":"f;",
aS:function(a,b){var z
if(typeof b!=="number")throw H.b(H.a1(b))
if(a<b)return-1
else if(a>b)return 1
else if(a===b){if(a===0){z=this.gdj(b)
if(this.gdj(a)===z)return 0
if(this.gdj(a))return-1
return 1}return 0}else if(isNaN(a)){if(isNaN(b))return 0
return 1}else return-1},
gdj:function(a){return a===0?1/a<0:a<0},
eN:function(a){return Math.abs(a)},
dG:function(a){var z
if(a>=-2147483648&&a<=2147483647)return a|0
if(isFinite(a)){z=a<0?Math.ceil(a):Math.floor(a)
return z+0}throw H.b(new P.o(""+a+".toInt()"))},
eY:function(a){var z,y
if(a>=0){if(a<=2147483647){z=a|0
return a===z?z:z+1}}else if(a>=-2147483648)return a|0
y=Math.ceil(a)
if(isFinite(y))return y
throw H.b(new P.o(""+a+".ceil()"))},
aA:function(a){var z,y
if(a>=0){if(a<=2147483647)return a|0}else if(a>=-2147483648){z=a|0
return a===z?z:z-1}y=Math.floor(a)
if(isFinite(y))return y
throw H.b(new P.o(""+a+".floor()"))},
Z:function(a){if(a>0){if(a!==1/0)return Math.round(a)}else if(a>-1/0)return 0-Math.round(0-a)
throw H.b(new P.o(""+a+".round()"))},
kx:function(a){if(a<0)return-Math.round(-a)
else return Math.round(a)},
kB:function(a){return a},
dH:function(a,b){var z,y,x,w
if(b<2||b>36)throw H.b(P.a7(b,2,36,"radix",null))
z=a.toString(b)
if(C.d.be(z,z.length-1)!==41)return z
y=/^([\da-z]+)(?:\.([\da-z]+))?\(e\+(\d+)\)$/.exec(z)
if(y==null)H.C(new P.o("Unexpected toString result: "+z))
x=J.G(y)
z=x.h(y,1)
w=+x.h(y,3)
if(x.h(y,2)!=null){z+=x.h(y,2)
w-=x.h(y,2).length}return z+C.d.H("0",w)},
k:function(a){if(a===0&&1/a<0)return"-0.0"
else return""+a},
gK:function(a){return a&0x1FFFFFFF},
aN:function(a){return-a},
N:function(a,b){if(typeof b!=="number")throw H.b(H.a1(b))
return a+b},
a2:function(a,b){if(typeof b!=="number")throw H.b(H.a1(b))
return a-b},
aY:function(a,b){if(typeof b!=="number")throw H.b(H.a1(b))
return a/b},
H:function(a,b){if(typeof b!=="number")throw H.b(H.a1(b))
return a*b},
cI:function(a,b){if(typeof b!=="number")throw H.b(H.a1(b))
if((a|0)===a)if(b>=1||!1)return a/b|0
return this.eH(a,b)},
aG:function(a,b){return(a|0)===a?a/b|0:this.eH(a,b)},
eH:function(a,b){var z=a/b
if(z>=-2147483648&&z<=2147483647)return z|0
if(z>0){if(z!==1/0)return Math.floor(z)}else if(z>-1/0)return Math.ceil(z)
throw H.b(new P.o("Result of truncating division is "+H.j(z)+": "+H.j(a)+" ~/ "+b))},
c3:function(a,b){var z
if(a>0)z=b>31?0:a>>>b
else{z=b>31?31:b
z=a>>z>>>0}return z},
aw:function(a,b){if(typeof b!=="number")throw H.b(H.a1(b))
return a<b},
aM:function(a,b){if(typeof b!=="number")throw H.b(H.a1(b))
return a>b},
cB:function(a,b){if(typeof b!=="number")throw H.b(H.a1(b))
return a<=b},
$isaq:1},
h0:{"^":"cp;",$isK:1,$ism:1,$isaq:1},
h_:{"^":"cp;",$isK:1,$isaq:1},
cq:{"^":"f;",
be:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.b(H.Z(a,b))
if(b<0)throw H.b(H.Z(a,b))
if(b>=a.length)H.C(H.Z(a,b))
return a.charCodeAt(b)},
bp:function(a,b){if(b>=a.length)throw H.b(H.Z(a,b))
return a.charCodeAt(b)},
j_:function(a,b,c){if(c>b.length)throw H.b(P.a7(c,0,b.length,null,null))
return new H.pB(b,a,c)},
iZ:function(a,b){return this.j_(a,b,0)},
N:function(a,b){if(typeof b!=="string")throw H.b(P.cN(b,null,null))
return a+b},
jB:function(a,b){var z,y
z=b.length
y=a.length
if(z>y)return!1
return b===this.bm(a,y-z)},
kt:function(a,b,c){return H.rg(a,b,c)},
hB:function(a,b){var z=a.split(b)
return z},
hC:function(a,b,c){var z
if(c>a.length)throw H.b(P.a7(c,0,a.length,null,null))
z=c+b.length
if(z>a.length)return!1
return b===a.substring(c,z)},
cF:function(a,b){return this.hC(a,b,0)},
b0:function(a,b,c){if(typeof b!=="number"||Math.floor(b)!==b)H.C(H.a1(b))
if(c==null)c=a.length
if(typeof c!=="number"||Math.floor(c)!==c)H.C(H.a1(c))
if(b<0)throw H.b(P.c0(b,null,null))
if(typeof c!=="number")return H.l(c)
if(b>c)throw H.b(P.c0(b,null,null))
if(c>a.length)throw H.b(P.c0(c,null,null))
return a.substring(b,c)},
bm:function(a,b){return this.b0(a,b,null)},
kC:function(a){return a.toLowerCase()},
fV:function(a){var z,y,x,w,v
z=a.trim()
y=z.length
if(y===0)return z
if(this.bp(z,0)===133){x=J.m6(z,1)
if(x===y)return""}else x=0
w=y-1
v=this.be(z,w)===133?J.m7(z,w):y
if(x===0&&v===y)return z
return z.substring(x,v)},
H:function(a,b){var z,y
if(typeof b!=="number")return H.l(b)
if(0>=b)return""
if(b===1||a.length===0)return a
if(b!==b>>>0)throw H.b(C.K)
for(z=a,y="";!0;){if((b&1)===1)y=z+y
b=b>>>1
if(b===0)break
z+=z}return y},
cl:function(a,b,c){var z=b-a.length
if(z<=0)return a
return this.H(c,z)+a},
gj9:function(a){return new H.kd(a)},
k0:function(a,b,c){var z
c=a.length
z=b.length
if(c+z>c)c-=z
return a.lastIndexOf(b,c)},
k_:function(a,b){return this.k0(a,b,null)},
f3:function(a,b,c){if(c>a.length)throw H.b(P.a7(c,0,a.length,null,null))
return H.rf(a,b,c)},
B:function(a,b){return this.f3(a,b,0)},
gE:function(a){return a.length===0},
gY:function(a){return a.length!==0},
aS:function(a,b){var z
if(typeof b!=="string")throw H.b(H.a1(b))
if(a===b)z=0
else z=a<b?-1:1
return z},
k:function(a){return a},
gK:function(a){var z,y,x
for(z=a.length,y=0,x=0;x<z;++x){y=536870911&y+a.charCodeAt(x)
y=536870911&y+((524287&y)<<10)
y^=y>>6}y=536870911&y+((67108863&y)<<3)
y^=y>>11
return 536870911&y+((16383&y)<<15)},
gi:function(a){return a.length},
h:function(a,b){if(typeof b!=="number"||Math.floor(b)!==b)throw H.b(H.Z(a,b))
if(b>=a.length||b<0)throw H.b(H.Z(a,b))
return a[b]},
$isu:1,
$asu:I.ae,
$isp:1,
t:{
h2:function(a){if(a<256)switch(a){case 9:case 10:case 11:case 12:case 13:case 32:case 133:case 160:return!0
default:return!1}switch(a){case 5760:case 8192:case 8193:case 8194:case 8195:case 8196:case 8197:case 8198:case 8199:case 8200:case 8201:case 8202:case 8232:case 8233:case 8239:case 8287:case 12288:case 65279:return!0
default:return!1}},
m6:function(a,b){var z,y
for(z=a.length;b<z;){y=C.d.bp(a,b)
if(y!==32&&y!==13&&!J.h2(y))break;++b}return b},
m7:function(a,b){var z,y
for(;b>0;b=z){z=b-1
y=C.d.be(a,z)
if(y!==32&&y!==13&&!J.h2(y))break}return b}}}}],["","",,H,{"^":"",
ip:function(a){if(a<0)H.C(P.a7(a,0,null,"count",null))
return a},
a6:function(){return new P.x("No element")},
m2:function(){return new P.x("Too many elements")},
fZ:function(){return new P.x("Too few elements")},
cu:function(a,b,c,d){if(c-b<=32)H.ek(a,b,c,d)
else H.ej(a,b,c,d)},
ek:function(a,b,c,d){var z,y,x,w,v
for(z=b+1,y=J.G(a);z<=c;++z){x=y.h(a,z)
w=z
while(!0){if(!(w>b&&J.ar(d.$2(y.h(a,w-1),x),0)))break
v=w-1
y.j(a,w,y.h(a,v))
w=v}y.j(a,w,x)}},
ej:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
z=C.c.aG(c-b+1,6)
y=b+z
x=c-z
w=C.c.aG(b+c,2)
v=w-z
u=w+z
t=J.G(a)
s=t.h(a,y)
r=t.h(a,v)
q=t.h(a,w)
p=t.h(a,u)
o=t.h(a,x)
if(J.ar(d.$2(s,r),0)){n=r
r=s
s=n}if(J.ar(d.$2(p,o),0)){n=o
o=p
p=n}if(J.ar(d.$2(s,q),0)){n=q
q=s
s=n}if(J.ar(d.$2(r,q),0)){n=q
q=r
r=n}if(J.ar(d.$2(s,p),0)){n=p
p=s
s=n}if(J.ar(d.$2(q,p),0)){n=p
p=q
q=n}if(J.ar(d.$2(r,o),0)){n=o
o=r
r=n}if(J.ar(d.$2(r,q),0)){n=q
q=r
r=n}if(J.ar(d.$2(p,o),0)){n=o
o=p
p=n}t.j(a,y,s)
t.j(a,w,q)
t.j(a,x,o)
t.j(a,v,t.h(a,b))
t.j(a,u,t.h(a,c))
m=b+1
l=c-1
if(J.E(d.$2(r,p),0)){for(k=m;k<=l;++k){j=t.h(a,k)
i=d.$2(j,r)
h=J.t(i)
if(h.I(i,0))continue
if(h.aw(i,0)){if(k!==m){t.j(a,k,t.h(a,m))
t.j(a,m,j)}++m}else for(;!0;){i=d.$2(t.h(a,l),r)
h=J.aE(i)
if(h.aM(i,0)){--l
continue}else{g=l-1
if(h.aw(i,0)){t.j(a,k,t.h(a,m))
f=m+1
t.j(a,m,t.h(a,l))
t.j(a,l,j)
l=g
m=f
break}else{t.j(a,k,t.h(a,l))
t.j(a,l,j)
l=g
break}}}}e=!0}else{for(k=m;k<=l;++k){j=t.h(a,k)
if(J.bo(d.$2(j,r),0)){if(k!==m){t.j(a,k,t.h(a,m))
t.j(a,m,j)}++m}else if(J.ar(d.$2(j,p),0))for(;!0;)if(J.ar(d.$2(t.h(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.bo(d.$2(t.h(a,l),r),0)){t.j(a,k,t.h(a,m))
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
H.cu(a,b,m-2,d)
H.cu(a,l+2,c,d)
if(e)return
if(m<y&&l>x){for(;J.E(d.$2(t.h(a,m),r),0);)++m
for(;J.E(d.$2(t.h(a,l),p),0);)--l
for(k=m;k<=l;++k){j=t.h(a,k)
if(J.E(d.$2(j,r),0)){if(k!==m){t.j(a,k,t.h(a,m))
t.j(a,m,j)}++m}else if(J.E(d.$2(j,p),0))for(;!0;)if(J.E(d.$2(t.h(a,l),p),0)){--l
if(l<k)break
continue}else{g=l-1
if(J.bo(d.$2(t.h(a,l),r),0)){t.j(a,k,t.h(a,m))
f=m+1
t.j(a,m,t.h(a,l))
t.j(a,l,j)
m=f}else{t.j(a,k,t.h(a,l))
t.j(a,l,j)}l=g
break}}H.cu(a,m,l,d)}else H.cu(a,m,l,d)},
kd:{"^":"hX;a",
gi:function(a){return this.a.length},
h:function(a,b){return C.d.be(this.a,b)},
$asd:function(){return[P.m]},
$ashX:function(){return[P.m]},
$asb4:function(){return[P.m]},
$asc:function(){return[P.m]}},
d:{"^":"a_;$ti",$asd:null},
b5:{"^":"d;$ti",
gJ:function(a){return new H.e5(this,this.gi(this),0,null)},
F:function(a,b){var z,y
z=this.gi(this)
for(y=0;y<z;++y){b.$1(this.w(0,y))
if(z!==this.gi(this))throw H.b(new P.T(this))}},
gE:function(a){return this.gi(this)===0},
gv:function(a){if(this.gi(this)===0)throw H.b(H.a6())
return this.w(0,0)},
B:function(a,b){var z,y
z=this.gi(this)
for(y=0;y<z;++y){if(J.E(this.w(0,y),b))return!0
if(z!==this.gi(this))throw H.b(new P.T(this))}return!1},
dI:function(a,b){return this.hH(0,b)},
aL:function(a,b){return new H.d1(this,b,[H.S(this,"b5",0),null])},
af:function(a,b){var z,y,x
z=this.gi(this)
if(z===0)throw H.b(H.a6())
y=this.w(0,0)
for(x=1;x<z;++x){y=b.$2(y,this.w(0,x))
if(z!==this.gi(this))throw H.b(new P.T(this))}return y},
al:function(a,b,c){var z,y,x
z=this.gi(this)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.w(0,x))
if(z!==this.gi(this))throw H.b(new P.T(this))}return y},
aX:function(a,b){var z,y,x
z=H.v([],[H.S(this,"b5",0)])
C.a.si(z,this.gi(this))
for(y=0;y<this.gi(this);++y){x=this.w(0,y)
if(y>=z.length)return H.a(z,y)
z[y]=x}return z},
bJ:function(a){return this.aX(a,!0)}},
nM:{"^":"b5;a,b,c,$ti",
gii:function(){var z=J.a4(this.a)
return z},
giL:function(){var z,y
z=J.a4(this.a)
y=this.b
if(y>z)return z
return y},
gi:function(a){var z,y
z=J.a4(this.a)
y=this.b
if(y>=z)return 0
return z-y},
w:function(a,b){var z,y
z=this.giL()
if(typeof b!=="number")return H.l(b)
y=z+b
if(!(b<0)){z=this.gii()
if(typeof z!=="number")return H.l(z)
z=y>=z}else z=!0
if(z)throw H.b(P.L(b,this,"index",null,null))
return J.cf(this.a,y)},
aX:function(a,b){var z,y,x,w,v,u,t,s
z=this.b
y=this.a
x=J.G(y)
w=x.gi(y)
v=w-z
if(v<0)v=0
u=H.v(new Array(v),this.$ti)
for(t=0;t<v;++t){s=x.w(y,z+t)
if(t>=u.length)return H.a(u,t)
u[t]=s
if(x.gi(y)<w)throw H.b(new P.T(this))}return u},
hX:function(a,b,c,d){var z=this.b
if(z<0)H.C(P.a7(z,0,null,"start",null))},
t:{
nN:function(a,b,c,d){var z=new H.nM(a,b,c,[d])
z.hX(a,b,c,d)
return z}}},
e5:{"^":"e;a,b,c,d",
gD:function(){return this.d},
u:function(){var z,y,x,w
z=this.a
y=J.G(z)
x=y.gi(z)
if(this.b!==x)throw H.b(new P.T(z))
w=this.c
if(w>=x){this.d=null
return!1}this.d=y.w(z,w);++this.c
return!0}},
d_:{"^":"a_;a,b,$ti",
gJ:function(a){return new H.mq(null,J.av(this.a),this.b,this.$ti)},
gi:function(a){return J.a4(this.a)},
gE:function(a){return J.eV(this.a)},
gv:function(a){return this.b.$1(J.eU(this.a))},
w:function(a,b){return this.b.$1(J.cf(this.a,b))},
$asa_:function(a,b){return[b]},
t:{
d0:function(a,b,c,d){if(!!J.t(a).$isd)return new H.dR(a,b,[c,d])
return new H.d_(a,b,[c,d])}}},
dR:{"^":"d_;a,b,$ti",$isd:1,
$asd:function(a,b){return[b]}},
mq:{"^":"cW;a,b,c,$ti",
u:function(){var z=this.b
if(z.u()){this.a=this.c.$1(z.gD())
return!0}this.a=null
return!1},
gD:function(){return this.a}},
d1:{"^":"b5;a,b,$ti",
gi:function(a){return J.a4(this.a)},
w:function(a,b){return this.b.$1(J.cf(this.a,b))},
$asd:function(a,b){return[b]},
$asb5:function(a,b){return[b]},
$asa_:function(a,b){return[b]}},
ep:{"^":"a_;a,b,$ti",
gJ:function(a){return new H.ok(J.av(this.a),this.b,this.$ti)},
aL:function(a,b){return new H.d_(this,b,[H.B(this,0),null])}},
ok:{"^":"cW;a,b,$ti",
u:function(){var z,y
for(z=this.a,y=this.b;z.u();)if(y.$1(z.gD())===!0)return!0
return!1},
gD:function(){return this.a.gD()}},
hG:{"^":"a_;a,b,$ti",
gJ:function(a){return new H.nV(J.av(this.a),this.b,this.$ti)},
t:{
nU:function(a,b,c){if(b<0)throw H.b(P.ag(b))
if(!!J.t(a).$isd)return new H.kB(a,b,[c])
return new H.hG(a,b,[c])}}},
kB:{"^":"hG;a,b,$ti",
gi:function(a){var z,y
z=J.a4(this.a)
y=this.b
if(z>y)return y
return z},
$isd:1,
$asd:null},
nV:{"^":"cW;a,b,$ti",
u:function(){if(--this.b>=0)return this.a.u()
this.b=-1
return!1},
gD:function(){if(this.b<0)return
return this.a.gD()}},
hA:{"^":"a_;a,b,$ti",
gJ:function(a){return new H.nj(J.av(this.a),this.b,this.$ti)},
t:{
ni:function(a,b,c){if(!!J.t(a).$isd)return new H.kA(a,H.ip(b),[c])
return new H.hA(a,H.ip(b),[c])}}},
kA:{"^":"hA;a,b,$ti",
gi:function(a){var z=J.a4(this.a)-this.b
if(z>=0)return z
return 0},
$isd:1,
$asd:null},
nj:{"^":"cW;a,b,$ti",
u:function(){var z,y
for(z=this.a,y=0;y<this.b;++y)z.u()
this.b=0
return z.u()},
gD:function(){return this.a.gD()}},
fI:{"^":"e;$ti",
si:function(a,b){throw H.b(new P.o("Cannot change the length of a fixed-length list"))},
l:function(a,b){throw H.b(new P.o("Cannot add to a fixed-length list"))}},
oi:{"^":"e;$ti",
j:function(a,b,c){throw H.b(new P.o("Cannot modify an unmodifiable list"))},
si:function(a,b){throw H.b(new P.o("Cannot change the length of an unmodifiable list"))},
l:function(a,b){throw H.b(new P.o("Cannot add to an unmodifiable list"))},
V:function(a,b,c,d,e){throw H.b(new P.o("Cannot modify an unmodifiable list"))},
aC:function(a,b,c,d){return this.V(a,b,c,d,0)},
$isd:1,
$asd:null,
$isc:1,
$asc:null},
hX:{"^":"b4+oi;$ti",$isd:1,$asd:null,$isc:1,$asc:null}}],["","",,H,{"^":"",
cx:function(a,b){var z=a.bA(b)
if(!init.globalState.d.cy)init.globalState.f.bI()
return z},
iS:function(a,b){var z,y,x,w,v,u
z={}
z.a=b
if(b==null){b=[]
z.a=b
y=b}else y=b
if(!J.t(y).$isc)throw H.b(P.ag("Arguments to main must be a List: "+H.j(y)))
init.globalState=new H.pg(0,0,1,null,null,null,null,null,null,null,null,null,a)
y=init.globalState
x=self.window==null
w=self.Worker
v=x&&!!self.postMessage
y.x=v
v=!v
if(v)w=w!=null&&$.$get$e_()!=null
else w=!0
y.y=w
y.r=x&&v
y.f=new H.oH(P.e6(null,H.c7),0)
x=P.m
y.z=new H.Q(0,null,null,null,null,null,0,[x,H.di])
y.ch=new H.Q(0,null,null,null,null,null,0,[x,null])
if(y.x===!0){w=new H.pf()
y.Q=w
self.onmessage=function(c,d){return function(e){c(d,e)}}(H.fV,w)
self.dartPrint=self.dartPrint||function(c){return function(d){if(self.console&&self.console.log)self.console.log(d)
else self.postMessage(c(d))}}(H.ph)}if(init.globalState.x===!0)return
y=init.globalState.a++
w=P.ai(null,null,null,x)
v=new H.aV(0,null,!1)
u=new H.di(y,new H.Q(0,null,null,null,null,null,0,[x,H.aV]),w,init.createNewIsolate(),v,new H.aO(H.cd()),new H.aO(H.cd()),!1,!1,[],P.ai(null,null,null,null),null,null,!1,!0,P.ai(null,null,null,null))
w.l(0,0)
u.b2(0,v)
init.globalState.e=u
init.globalState.d=u
if(H.bl(a,{func:1,args:[,]}))u.bA(new H.rd(z,a))
else if(H.bl(a,{func:1,args:[,,]}))u.bA(new H.re(z,a))
else u.bA(a)
init.globalState.f.bI()},
lR:function(){var z=init.currentScript
if(z!=null)return String(z.src)
if(init.globalState.x===!0)return H.lS()
return},
lS:function(){var z,y
z=new Error().stack
if(z==null){z=function(){try{throw new Error()}catch(x){return x.stack}}()
if(z==null)throw H.b(new P.o("No stack trace"))}y=z.match(new RegExp("^ *at [^(]*\\((.*):[0-9]*:[0-9]*\\)$","m"))
if(y!=null)return y[1]
y=z.match(new RegExp("^[^@]*@(.*):[0-9]*$","m"))
if(y!=null)return y[1]
throw H.b(new P.o('Cannot extract URI from "'+z+'"'))},
fV:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=new H.dg(!0,[]).aT(b.data)
y=J.G(z)
switch(y.h(z,"command")){case"start":init.globalState.b=y.h(z,"id")
x=y.h(z,"functionName")
w=x==null?init.globalState.cx:init.globalFunctions[x]()
v=y.h(z,"args")
u=new H.dg(!0,[]).aT(y.h(z,"msg"))
t=y.h(z,"isSpawnUri")
s=y.h(z,"startPaused")
r=new H.dg(!0,[]).aT(y.h(z,"replyTo"))
y=init.globalState.a++
q=P.m
p=P.ai(null,null,null,q)
o=new H.aV(0,null,!1)
n=new H.di(y,new H.Q(0,null,null,null,null,null,0,[q,H.aV]),p,init.createNewIsolate(),o,new H.aO(H.cd()),new H.aO(H.cd()),!1,!1,[],P.ai(null,null,null,null),null,null,!1,!0,P.ai(null,null,null,null))
p.l(0,0)
n.b2(0,o)
init.globalState.f.a.aq(0,new H.c7(n,new H.lN(w,v,u,t,s,r),"worker-start"))
init.globalState.d=n
init.globalState.f.bI()
break
case"spawn-worker":if($.fX!=null)H.lT(z)
break
case"message":if(y.h(z,"port")!=null)J.aF(y.h(z,"port"),y.h(z,"msg"))
init.globalState.f.bI()
break
case"close":init.globalState.ch.W(0,$.$get$e0().h(0,a))
a.terminate()
init.globalState.f.bI()
break
case"log":H.lM(y.h(z,"msg"))
break
case"print":if(init.globalState.x===!0){y=init.globalState.Q
q=P.al(["command","print","msg",z])
q=new H.aC(!0,P.aJ(null,P.m)).a7(q)
y.toString
self.postMessage(q)}else P.bK(y.h(z,"msg"))
break
case"error":throw H.b(y.h(z,"msg"))}},
lT:function(a){var z,y
z=J.G(a)
y=z.h(a,"replyPort")
H.fY(z.h(a,"functionName"),z.h(a,"uri"),z.h(a,"args"),z.h(a,"msg"),!1,z.h(a,"isSpawnUri"),z.h(a,"startPaused")).cp(new H.lU(y),new H.lV(y))},
lM:function(a){var z,y,x,w
if(init.globalState.x===!0){y=init.globalState.Q
x=P.al(["command","log","msg",a])
x=new H.aC(!0,P.aJ(null,P.m)).a7(x)
y.toString
self.postMessage(x)}else try{self.console.log(a)}catch(w){H.H(w)
z=H.W(w)
y=P.bs(z)
throw H.b(y)}},
fY:function(a,b,c,d,e,f,g){var z,y,x,w,v,u,t
if(b!=null&&J.jb(b,".dart"))b=J.R(b,".js")
z=$.c1
$.c1=z+1
y=new H.aV(z,null,!1)
x=init.globalState.d
x.b2(z,y)
x.aQ()
w=new H.ef(y,null)
w.cJ(y)
x=new P.J(0,$.r,null,[null])
v=new P.bw(x,[null])
w.gv(w).dF(new H.lW(v))
u=new H.bA(y,init.globalState.d.a)
if(init.globalState.y===!0&&!0){if(c!=null)c=P.Y(c,!0,P.p)
if(init.globalState.x===!0){z=init.globalState.Q
y=P.al(["command","spawn-worker","functionName",a,"args",c,"msg",d,"uri",b,"isSpawnUri",f,"startPaused",g,"replyPort",u])
y=new H.aC(!0,P.aJ(null,P.m)).a7(y)
z.toString
self.postMessage(y)}else{if(b==null)b=$.$get$e_()
t=new Worker(b)
t.onerror=function(h,i,j){return function(k){return h(k,i,j)}}(H.lY,b,new H.lX(v))
t.onmessage=function(h,i){return function(j){j.onerror=null
return h(i,j)}}(H.fV,t)
z=init.globalState.c++
$.$get$e0().j(0,t,z)
init.globalState.ch.j(0,z,t)
y=P.m
z=P.al(["command","start","id",z,"replyTo",new H.aC(!0,P.aJ(null,y)).a7(u),"args",c,"msg",new H.aC(!0,P.aJ(null,y)).a7(d),"isSpawnUri",f,"startPaused",g,"functionName",a])
t.postMessage(new H.aC(!0,P.aJ(null,y)).a7(z))}}else H.lP(a,b,c,d,f,g,u)
return x},
lP:function(a,b,c,d,e,f,g){var z,y,x,w,v,u
z={}
z.a=c
z.b=d
if(b!=null)throw H.b(new P.o("Currently spawnUri is not supported without web workers."))
z.b=H.iq(d)
if(c!=null)z.a=P.Y(c,!0,P.p)
y=init.globalState.f
x=init.globalState.a++
w=P.m
v=P.ai(null,null,null,w)
u=new H.aV(0,null,!1)
w=new H.di(x,new H.Q(0,null,null,null,null,null,0,[w,H.aV]),v,init.createNewIsolate(),u,new H.aO(H.cd()),new H.aO(H.cd()),!1,!1,[],P.ai(null,null,null,null),null,null,!1,!0,P.ai(null,null,null,null))
v.l(0,0)
w.b2(0,u)
y.a.aq(0,new H.c7(w,new H.lQ(z,a,e,f,g),"nonworker start"))},
fW:function(a,b,c,d,e,f){var z,y,x
z=init.globalState.d
y=z.a
$.ho=$.ho+("_"+y)
$.hp=$.hp+("_"+y)
y=z.e.ghj()
x=z.f
J.aF(f,["spawned",y,x,z.r])
y=new H.lO(a,b,c,d,z)
if(e===!0){z.eR(x,x)
init.globalState.f.a.aq(0,new H.c7(z,y,"start isolate"))}else y.$0()},
lY:function(a,b,c){var z
a.preventDefault()
z=a.message
c.$1(z==null?"Error spawning worker for "+H.j(b):"Error spawning worker for "+H.j(b)+" ("+z+")")
return!0},
iq:function(a){return new H.dg(!0,[]).aT(new H.aC(!1,P.aJ(null,P.m)).a7(a))},
rd:{"^":"h:1;a,b",
$0:function(){this.b.$1(this.a.a)},
$isi:1},
re:{"^":"h:1;a,b",
$0:function(){this.b.$2(this.a.a,null)},
$isi:1},
pg:{"^":"e;a,b,c,d,e,f,r,x,y,z,Q,ch,cx",t:{
ph:function(a){var z=P.al(["command","print","msg",a])
return new H.aC(!0,P.aJ(null,P.m)).a7(z)}}},
di:{"^":"e;a,b,c,jX:d<,df:e<,fM:f<,r,jR:x?,jW:y<,z,Q,ch,cx,cy,db,dx",
eR:function(a,b){if(!this.f.I(0,a))return
if(this.Q.l(0,b)&&!this.y)this.y=!0
this.aQ()},
kq:function(a){var z,y,x,w,v,u
if(!this.y)return
z=this.Q
z.W(0,a)
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
if(w===y.c)y.el();++y.d}this.y=!1}this.aQ()},
iS:function(a,b){var z,y,x
if(this.ch==null)this.ch=[]
for(z=J.t(a),y=0;x=this.ch,y<x.length;y+=2)if(z.I(a,x[y])){z=this.ch
x=y+1
if(x>=z.length)return H.a(z,x)
z[x]=b
return}x.push(a)
this.ch.push(b)},
ko:function(a){var z,y,x
if(this.ch==null)return
for(z=J.t(a),y=0;x=this.ch,y<x.length;y+=2)if(z.I(a,x[y])){z=this.ch
x=y+2
z.toString
if(typeof z!=="object"||z===null||!!z.fixed$length)H.C(new P.o("removeRange"))
P.ee(y,x,z.length,null,null,null)
z.splice(y,x-y)
return}},
hs:function(a,b){if(!this.r.I(0,a))return
this.db=b},
jI:function(a,b,c){var z=J.t(b)
if(!z.I(b,0))z=z.I(b,1)&&!this.cy
else z=!0
if(z){J.aF(a,c)
return}z=this.cx
if(z==null){z=P.e6(null,null)
this.cx=z}z.aq(0,new H.p2(a,c))},
jH:function(a,b){var z
if(!this.r.I(0,a))return
z=J.t(b)
if(!z.I(b,0))z=z.I(b,1)&&!this.cy
else z=!0
if(z){this.aJ()
return}z=this.cx
if(z==null){z=P.e6(null,null)
this.cx=z}z.aq(0,this.gjY())},
jJ:function(a,b){var z,y,x
z=this.dx
if(z.a===0){if(this.db===!0&&this===init.globalState.e)return
if(self.console&&self.console.error)self.console.error(a,b)
else{P.bK(a)
if(b!=null)P.bK(b)}return}y=new Array(2)
y.fixed$length=Array
y[0]=J.a5(a)
y[1]=b==null?null:J.a5(b)
for(x=new P.aY(z,z.r,null,null),x.c=z.e;x.u();)J.aF(x.d,y)},
bA:function(a){var z,y,x,w,v,u,t
z=init.globalState.d
init.globalState.d=this
$=this.d
y=null
x=this.cy
this.cy=!0
try{y=a.$0()}catch(u){w=H.H(u)
v=H.W(u)
this.jJ(w,v)
if(this.db===!0){this.aJ()
if(this===init.globalState.e)throw u}}finally{this.cy=x
init.globalState.d=z
if(z!=null)$=z.gjX()
if(this.cx!=null)for(;t=this.cx,!t.gE(t);)this.cx.fP().$0()}return y},
jF:function(a){var z=J.G(a)
switch(z.h(a,0)){case"pause":this.eR(z.h(a,1),z.h(a,2))
break
case"resume":this.kq(z.h(a,1))
break
case"add-ondone":this.iS(z.h(a,1),z.h(a,2))
break
case"remove-ondone":this.ko(z.h(a,1))
break
case"set-errors-fatal":this.hs(z.h(a,1),z.h(a,2))
break
case"ping":this.jI(z.h(a,1),z.h(a,2),z.h(a,3))
break
case"kill":this.jH(z.h(a,1),z.h(a,2))
break
case"getErrors":this.dx.l(0,z.h(a,1))
break
case"stopErrors":this.dx.W(0,z.h(a,1))
break}},
dr:function(a){return this.b.h(0,a)},
b2:function(a,b){var z=this.b
if(z.O(0,a))throw H.b(P.bs("Registry: ports must be registered only once."))
z.j(0,a,b)},
aQ:function(){var z=this.b
if(z.gi(z)-this.c.a>0||this.y||!this.x)init.globalState.z.j(0,this.a,this)
else this.aJ()},
aJ:[function(){var z,y,x,w,v
z=this.cx
if(z!=null)z.bc(0)
for(z=this.b,y=z.gh8(z),y=y.gJ(y);y.u();)y.gD().ib()
z.bc(0)
this.c.bc(0)
init.globalState.z.W(0,this.a)
this.dx.bc(0)
if(this.ch!=null){for(x=0;z=this.ch,y=z.length,x<y;x+=2){w=z[x]
v=x+1
if(v>=y)return H.a(z,v)
J.aF(w,z[v])}this.ch=null}},"$0","gjY",0,0,2]},
p2:{"^":"h:2;a,b",
$0:function(){J.aF(this.a,this.b)},
$isi:1},
oH:{"^":"e;a,b",
jo:function(){var z=this.a
if(z.b===z.c)return
return z.fP()},
fT:function(){var z,y,x
z=this.jo()
if(z==null){if(init.globalState.e!=null)if(init.globalState.z.O(0,init.globalState.e.a))if(init.globalState.r===!0){y=init.globalState.e.b
y=y.gE(y)}else y=!1
else y=!1
else y=!1
if(y)H.C(P.bs("Program exited with open ReceivePorts."))
y=init.globalState
if(y.x===!0){x=y.z
x=x.gE(x)&&y.f.b===0}else x=!1
if(x){y=y.Q
x=P.al(["command","close"])
x=new H.aC(!0,new P.ig(0,null,null,null,null,null,0,[null,P.m])).a7(x)
y.toString
self.postMessage(x)}return!1}z.kl()
return!0},
eB:function(){if(self.window!=null)new H.oI(this).$0()
else for(;this.fT(););},
bI:function(){var z,y,x,w,v
if(init.globalState.x!==!0)this.eB()
else try{this.eB()}catch(x){z=H.H(x)
y=H.W(x)
w=init.globalState.Q
v=P.al(["command","error","msg",H.j(z)+"\n"+H.j(y)])
v=new H.aC(!0,P.aJ(null,P.m)).a7(v)
w.toString
self.postMessage(v)}}},
oI:{"^":"h:2;a",
$0:function(){if(!this.a.fT())return
P.o_(C.z,this)},
$isi:1},
c7:{"^":"e;a,b,P:c>",
kl:function(){var z=this.a
if(z.gjW()){z.z.push(this)
return}z.bA(this.b)}},
pf:{"^":"e;"},
lN:{"^":"h:1;a,b,c,d,e,f",
$0:function(){H.fW(this.a,this.b,this.c,this.d,this.e,this.f)},
$isi:1},
lU:{"^":"h:0;a",
$1:function(a){J.aF(this.a,a)},
$isi:1},
lV:{"^":"h:5;a",
$1:function(a){J.aF(this.a,["spawn failed",a])},
$isi:1},
lW:{"^":"h:0;a",
$1:function(a){var z,y
z=J.G(a)
y=this.a
if(J.E(z.h(a,0),"spawned"))y.ad(0,a)
else y.cb(z.h(a,1))},
$isi:1},
lX:{"^":"h:5;a",
$1:function(a){return this.a.cb(a)},
$isi:1},
lQ:{"^":"h:1;a,b,c,d,e",
$0:function(){var z=this.a
H.fW(init.globalFunctions[this.b](),z.a,z.b,this.c,this.d,this.e)},
$isi:1},
lO:{"^":"h:2;a,b,c,d,e",
$0:function(){var z,y
z=this.e
z.sjR(!0)
if(this.d!==!0)this.a.$1(this.c)
else{y=this.a
if(H.bl(y,{func:1,args:[,,]}))y.$2(this.b,this.c)
else if(H.bl(y,{func:1,args:[,]}))y.$1(this.b)
else y.$0()}z.aQ()},
$isi:1},
i1:{"^":"e;",$iseh:1},
bA:{"^":"i1;b,a",
ac:function(a,b){var z,y,x
z=init.globalState.z.h(0,this.a)
if(z==null)return
y=this.b
if(y.gen())return
x=H.iq(b)
if(J.E(z.gdf(),y)){z.jF(x)
return}init.globalState.f.a.aq(0,new H.c7(z,new H.pl(this,x),"receive"))},
I:function(a,b){if(b==null)return!1
return b instanceof H.bA&&J.E(this.b,b.b)},
gK:function(a){return this.b.gcY()},
$iseh:1},
pl:{"^":"h:1;a,b",
$0:function(){var z=this.a.b
if(!z.gen())z.i6(0,this.b)},
$isi:1},
ev:{"^":"i1;b,c,a",
ac:function(a,b){var z,y,x
z=P.al(["command","message","port",this,"msg",b])
y=new H.aC(!0,P.aJ(null,P.m)).a7(z)
if(init.globalState.x===!0){init.globalState.Q.toString
self.postMessage(y)}else{x=init.globalState.ch.h(0,this.b)
if(x!=null)x.postMessage(y)}},
I:function(a,b){if(b==null)return!1
return b instanceof H.ev&&J.E(this.b,b.b)&&J.E(this.a,b.a)&&J.E(this.c,b.c)},
gK:function(a){var z,y,x
z=this.b
if(typeof z!=="number")return z.hx()
y=this.a
if(typeof y!=="number")return y.hx()
x=this.c
if(typeof x!=="number")return H.l(x)
return(z<<16^y<<8^x)>>>0},
$iseh:1},
aV:{"^":"e;cY:a<,b,en:c<",
ib:function(){this.c=!0
this.b=null},
ca:function(a){var z,y
if(this.c)return
this.c=!0
this.b=null
z=init.globalState.d
y=this.a
z.b.W(0,y)
z.c.W(0,y)
z.aQ()},
i6:function(a,b){if(this.c)return
this.b.$1(b)},
ghj:function(){return new H.bA(this,init.globalState.d.a)},
$isn1:1},
ef:{"^":"ad;a,b",
U:function(a,b,c,d){var z=this.b
z.toString
return new P.bx(z,[H.B(z,0)]).U(a,b,c,d)},
ci:function(a,b,c){return this.U(a,null,b,c)},
ca:[function(a){this.a.ca(0)
this.b.ca(0)},"$0","gj8",0,0,2],
cJ:function(a){var z=new P.pI(null,0,null,null,null,null,this.gj8(this),[null])
this.b=z
this.a.b=z.giR(z)},
$asad:I.ae},
nW:{"^":"e;a,b,c",
i_:function(a,b){var z,y
if(a===0)z=self.setTimeout==null||init.globalState.x===!0
else z=!1
if(z){this.c=1
z=init.globalState.f
y=init.globalState.d
z.a.aq(0,new H.c7(y,new H.nY(this,b),"timer"))
this.b=!0}else if(self.setTimeout!=null){++init.globalState.f.b
this.c=self.setTimeout(H.as(new H.nZ(this,b),0),a)}else throw H.b(new P.o("Timer greater than 0."))},
t:{
nX:function(a,b){var z=new H.nW(!0,!1,null)
z.i_(a,b)
return z}}},
nY:{"^":"h:2;a,b",
$0:function(){this.a.c=null
this.b.$0()},
$isi:1},
nZ:{"^":"h:2;a,b",
$0:function(){this.a.c=null;--init.globalState.f.b
this.b.$0()},
$isi:1},
aO:{"^":"e;cY:a<",
gK:function(a){var z=this.a
if(typeof z!=="number")return z.kN()
z=C.b.c3(z,0)^C.b.aG(z,4294967296)
z=(~z>>>0)+(z<<15>>>0)&4294967295
z=((z^z>>>12)>>>0)*5&4294967295
z=((z^z>>>4)>>>0)*2057&4294967295
return(z^z>>>16)>>>0},
I:function(a,b){var z,y
if(b==null)return!1
if(b===this)return!0
if(b instanceof H.aO){z=this.a
y=b.a
return z==null?y==null:z===y}return!1}},
aC:{"^":"e;a,b",
a7:[function(a){var z,y,x,w,v
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
z=this.b
y=z.h(0,a)
if(y!=null)return["ref",y]
z.j(0,a,z.gi(z))
z=J.t(a)
if(!!z.$isd4)return["buffer",a]
if(!!z.$isd6)return["typed",a]
if(!!z.$isu)return this.hn(a)
if(!!z.$islL){x=this.ghk()
w=z.gT(a)
w=H.d0(w,x,H.S(w,"a_",0),null)
w=P.Y(w,!0,H.S(w,"a_",0))
z=z.gh8(a)
z=H.d0(z,x,H.S(z,"a_",0),null)
return["map",w,P.Y(z,!0,H.S(z,"a_",0))]}if(!!z.$ism5)return this.ho(a)
if(!!z.$isf)this.h0(a)
if(!!z.$isn1)this.bL(a,"RawReceivePorts can't be transmitted:")
if(!!z.$isbA)return this.hp(a)
if(!!z.$isev)return this.hq(a)
if(!!z.$ish){v=a.$static_name
if(v==null)this.bL(a,"Closures can't be transmitted:")
return["function",v]}if(!!z.$isaO)return["capability",a.a]
if(!(a instanceof P.e))this.h0(a)
return["dart",init.classIdExtractor(a),this.hm(init.classFieldsExtractor(a))]},"$1","ghk",2,0,0],
bL:function(a,b){throw H.b(new P.o((b==null?"Can't transmit:":b)+" "+H.j(a)))},
h0:function(a){return this.bL(a,null)},
hn:function(a){var z=this.hl(a)
if(!!a.fixed$length)return["fixed",z]
if(!a.fixed$length)return["extendable",z]
if(!a.immutable$list)return["mutable",z]
if(a.constructor===Array)return["const",z]
this.bL(a,"Can't serialize indexable: ")},
hl:function(a){var z,y,x
z=[]
C.a.si(z,a.length)
for(y=0;y<a.length;++y){x=this.a7(a[y])
if(y>=z.length)return H.a(z,y)
z[y]=x}return z},
hm:function(a){var z
for(z=0;z<a.length;++z)C.a.j(a,z,this.a7(a[z]))
return a},
ho:function(a){var z,y,x,w
if(!!a.constructor&&a.constructor!==Object)this.bL(a,"Only plain JS Objects are supported:")
z=Object.keys(a)
y=[]
C.a.si(y,z.length)
for(x=0;x<z.length;++x){w=this.a7(a[z[x]])
if(x>=y.length)return H.a(y,x)
y[x]=w}return["js-object",z,y]},
hq:function(a){if(this.a)return["sendport",a.b,a.a,a.c]
return["raw sendport",a]},
hp:function(a){if(this.a)return["sendport",init.globalState.b,a.a,a.b.gcY()]
return["raw sendport",a]}},
dg:{"^":"e;a,b",
aT:[function(a){var z,y,x,w,v,u
if(a==null||typeof a==="string"||typeof a==="number"||typeof a==="boolean")return a
if(typeof a!=="object"||a===null||a.constructor!==Array)throw H.b(P.ag("Bad serialized message: "+H.j(a)))
switch(C.a.gv(a)){case"ref":if(1>=a.length)return H.a(a,1)
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
y=H.v(this.bz(x),[null])
y.fixed$length=Array
return y
case"extendable":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return H.v(this.bz(x),[null])
case"mutable":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return this.bz(x)
case"const":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
y=H.v(this.bz(x),[null])
y.fixed$length=Array
return y
case"map":return this.jr(a)
case"sendport":return this.js(a)
case"raw sendport":if(1>=a.length)return H.a(a,1)
x=a[1]
this.b.push(x)
return x
case"js-object":return this.jq(a)
case"function":if(1>=a.length)return H.a(a,1)
x=init.globalFunctions[a[1]]()
this.b.push(x)
return x
case"capability":if(1>=a.length)return H.a(a,1)
return new H.aO(a[1])
case"dart":y=a.length
if(1>=y)return H.a(a,1)
w=a[1]
if(2>=y)return H.a(a,2)
v=a[2]
u=init.instanceFromClassId(w)
this.b.push(u)
this.bz(v)
return init.initializeEmptyInstance(w,u,v)
default:throw H.b("couldn't deserialize: "+H.j(a))}},"$1","gjp",2,0,0],
bz:function(a){var z,y,x
z=J.G(a)
y=0
while(!0){x=z.gi(a)
if(typeof x!=="number")return H.l(x)
if(!(y<x))break
z.j(a,y,this.aT(z.h(a,y)));++y}return a},
jr:function(a){var z,y,x,w,v,u
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
w=P.cX()
this.b.push(w)
y=J.jr(y,this.gjp()).bJ(0)
for(z=J.G(y),v=J.G(x),u=0;u<z.gi(y);++u){if(u>=y.length)return H.a(y,u)
w.j(0,y[u],this.aT(v.h(x,u)))}return w},
js:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
if(3>=z)return H.a(a,3)
w=a[3]
if(J.E(y,init.globalState.b)){v=init.globalState.z.h(0,x)
if(v==null)return
u=v.dr(w)
if(u==null)return
t=new H.bA(u,x)}else t=new H.ev(y,w,x)
this.b.push(t)
return t},
jq:function(a){var z,y,x,w,v,u,t
z=a.length
if(1>=z)return H.a(a,1)
y=a[1]
if(2>=z)return H.a(a,2)
x=a[2]
w={}
this.b.push(w)
z=J.G(y)
v=J.G(x)
u=0
while(!0){t=z.gi(y)
if(typeof t!=="number")return H.l(t)
if(!(u<t))break
w[z.h(y,u)]=this.aT(v.h(x,u));++u}return w}}}],["","",,H,{"^":"",
kl:function(){throw H.b(new P.o("Cannot modify unmodifiable Map"))},
qF:function(a){return init.types[a]},
iJ:function(a,b){var z
if(b!=null){z=b.x
if(z!=null)return z}return!!J.t(a).$isw},
j:function(a){var z
if(typeof a==="string")return a
if(typeof a==="number"){if(a!==0)return""+a}else if(!0===a)return"true"
else if(!1===a)return"false"
else if(a==null)return"null"
z=J.a5(a)
if(typeof z!=="string")throw H.b(H.a1(a))
return z},
aU:function(a){var z=a.$identityHash
if(z==null){z=Math.random()*0x3fffffff|0
a.$identityHash=z}return z},
ea:function(a,b){throw H.b(new P.cn(a,null,null))},
am:function(a,b,c){var z,y,x,w,v,u
H.eD(a)
z=/^\s*[+-]?((0x[a-f0-9]+)|(\d+)|([a-z0-9]+))\s*$/i.exec(a)
if(z==null)return H.ea(a,c)
if(3>=z.length)return H.a(z,3)
y=z[3]
if(b==null){if(y!=null)return parseInt(a,10)
if(z[2]!=null)return parseInt(a,16)
return H.ea(a,c)}if(b<2||b>36)throw H.b(P.a7(b,2,36,"radix",null))
if(b===10&&y!=null)return parseInt(a,10)
if(b<10||y==null){x=b<=10?47+b:86+b
w=z[1]
for(v=w.length,u=0;u<v;++u)if((C.d.bp(w,u)|32)>x)return H.ea(a,c)}return parseInt(a,b)},
hm:function(a,b){throw H.b(new P.cn("Invalid double",a,null))},
ed:function(a,b){var z,y
H.eD(a)
if(!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(a))return H.hm(a,b)
z=parseFloat(a)
if(isNaN(z)){y=J.dI(a)
if(y==="NaN"||y==="+NaN"||y==="-NaN")return z
return H.hm(a,b)}return z},
ec:function(a){var z,y,x,w,v,u,t,s
z=J.t(a)
y=z.constructor
if(typeof y=="function"){x=y.name
w=typeof x==="string"?x:null}else w=null
if(w==null||z===C.P||!!J.t(a).$iscv){v=C.D(a)
if(v==="Object"){u=a.constructor
if(typeof u=="function"){t=String(u).match(/^\s*function\s*([\w$]*)\s*\(/)
s=t==null?null:t[1]
if(typeof s==="string"&&/^\w+$/.test(s))w=s}if(w==null)w=v}else w=v}w=w
if(w.length>1&&C.d.bp(w,0)===36)w=C.d.bm(w,1)
return function(b,c){return b.replace(/[^<,> ]+/g,function(d){return c[d]||d})}(w+H.iK(H.dr(a),0,null),init.mangledGlobalNames)},
d9:function(a){return"Instance of '"+H.ec(a)+"'"},
uI:[function(){return Date.now()},"$0","q1",0,0,35],
hn:function(){var z,y
if($.ct!=null)return
$.ct=1000
$.b9=H.q1()
if(typeof window=="undefined")return
z=window
if(z==null)return
y=z.performance
if(y==null)return
if(typeof y.now!="function")return
$.ct=1e6
$.b9=new H.mZ(y)},
n_:function(a){var z
if(a<=65535)return String.fromCharCode(a)
if(a<=1114111){z=a-65536
return String.fromCharCode((55296|C.c.c3(z,10))>>>0,56320|z&1023)}throw H.b(P.a7(a,0,1114111,null,null))},
ap:function(a){if(a.date===void 0)a.date=new Date(a.a)
return a.date},
mY:function(a){return a.b?H.ap(a).getUTCFullYear()+0:H.ap(a).getFullYear()+0},
mW:function(a){return a.b?H.ap(a).getUTCMonth()+1:H.ap(a).getMonth()+1},
mS:function(a){return a.b?H.ap(a).getUTCDate()+0:H.ap(a).getDate()+0},
mT:function(a){return a.b?H.ap(a).getUTCHours()+0:H.ap(a).getHours()+0},
mV:function(a){return a.b?H.ap(a).getUTCMinutes()+0:H.ap(a).getMinutes()+0},
mX:function(a){return a.b?H.ap(a).getUTCSeconds()+0:H.ap(a).getSeconds()+0},
mU:function(a){return a.b?H.ap(a).getUTCMilliseconds()+0:H.ap(a).getMilliseconds()+0},
eb:function(a,b){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.b(H.a1(a))
return a[b]},
hq:function(a,b,c){if(a==null||typeof a==="boolean"||typeof a==="number"||typeof a==="string")throw H.b(H.a1(a))
a[b]=c},
l:function(a){throw H.b(H.a1(a))},
a:function(a,b){if(a==null)J.a4(a)
throw H.b(H.Z(a,b))},
Z:function(a,b){var z,y
if(typeof b!=="number"||Math.floor(b)!==b)return new P.aN(!0,b,"index",null)
z=J.a4(a)
if(!(b<0)){if(typeof z!=="number")return H.l(z)
y=b>=z}else y=!0
if(y)return P.L(b,a,"index",null,z)
return P.c0(b,"index",null)},
a1:function(a){return new P.aN(!0,a,null,null)},
aA:function(a){if(typeof a!=="number")throw H.b(H.a1(a))
return a},
eD:function(a){if(typeof a!=="string")throw H.b(H.a1(a))
return a},
b:function(a){var z
if(a==null)a=new P.d8()
z=new Error()
z.dartException=a
if("defineProperty" in Object){Object.defineProperty(z,"message",{get:H.iT})
z.name=""}else z.toString=H.iT
return z},
iT:function(){return J.a5(this.dartException)},
C:function(a){throw H.b(a)},
D:function(a){throw H.b(new P.T(a))},
H:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=new H.rk(a)
if(a==null)return
if(a instanceof H.dT)return z.$1(a.a)
if(typeof a!=="object")return a
if("dartException" in a)return z.$1(a.dartException)
else if(!("message" in a))return a
y=a.message
if("number" in a&&typeof a.number=="number"){x=a.number
w=x&65535
if((C.c.c3(x,16)&8191)===10)switch(w){case 438:return z.$1(H.e3(H.j(y)+" (Error "+w+")",null))
case 445:case 5007:v=H.j(y)+" (Error "+w+")"
return z.$1(new H.hi(v,null))}}if(a instanceof TypeError){u=$.$get$hK()
t=$.$get$hL()
s=$.$get$hM()
r=$.$get$hN()
q=$.$get$hR()
p=$.$get$hS()
o=$.$get$hP()
$.$get$hO()
n=$.$get$hU()
m=$.$get$hT()
l=u.ar(y)
if(l!=null)return z.$1(H.e3(y,l))
else{l=t.ar(y)
if(l!=null){l.method="call"
return z.$1(H.e3(y,l))}else{l=s.ar(y)
if(l==null){l=r.ar(y)
if(l==null){l=q.ar(y)
if(l==null){l=p.ar(y)
if(l==null){l=o.ar(y)
if(l==null){l=r.ar(y)
if(l==null){l=n.ar(y)
if(l==null){l=m.ar(y)
v=l!=null}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0}else v=!0
if(v)return z.$1(new H.hi(y,l==null?null:l.method))}}return z.$1(new H.oh(typeof y==="string"?y:""))}if(a instanceof RangeError){if(typeof y==="string"&&y.indexOf("call stack")!==-1)return new P.hB()
y=function(b){try{return String(b)}catch(k){}return null}(a)
return z.$1(new P.aN(!1,null,null,typeof y==="string"?y.replace(/^RangeError:\s*/,""):y))}if(typeof InternalError=="function"&&a instanceof InternalError)if(typeof y==="string"&&y==="too much recursion")return new P.hB()
return a},
W:function(a){var z
if(a instanceof H.dT)return a.b
if(a==null)return new H.ih(a,null)
z=a.$cachedTrace
if(z!=null)return z
return a.$cachedTrace=new H.ih(a,null)},
qZ:function(a){if(a==null||typeof a!='object')return J.a8(a)
else return H.aU(a)},
qC:function(a,b){var z,y,x,w
z=a.length
for(y=0;y<z;y=w){x=y+1
w=x+1
b.j(0,a[y],a[x])}return b},
qR:function(a,b,c,d,e,f,g){switch(c){case 0:return H.cx(b,new H.qS(a))
case 1:return H.cx(b,new H.qT(a,d))
case 2:return H.cx(b,new H.qU(a,d,e))
case 3:return H.cx(b,new H.qV(a,d,e,f))
case 4:return H.cx(b,new H.qW(a,d,e,f,g))}throw H.b(P.bs("Unsupported number of arguments for wrapped closure"))},
as:function(a,b){var z
if(a==null)return
z=a.$identity
if(!!z)return z
z=function(c,d,e,f){return function(g,h,i,j){return f(c,e,d,g,h,i,j)}}(a,b,init.globalState.d,H.qR)
a.$identity=z
return z},
kc:function(a,b,c,d,e,f){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=b[0]
y=z.$callName
if(!!J.t(c).$isc){z.$reflectionInfo=c
x=H.n5(z).r}else x=c
w=d?Object.create(new H.nl().constructor.prototype):Object.create(new H.dN(null,null,null,null).constructor.prototype)
w.$initialize=w.constructor
if(d)v=function(){this.$initialize()}
else{u=$.aG
$.aG=J.R(u,1)
v=new Function("a,b,c,d"+u,"this.$initialize(a,b,c,d"+u+")")}w.constructor=v
v.prototype=w
if(!d){t=e.length==1&&!0
s=H.fe(a,z,t)
s.$reflectionInfo=c}else{w.$static_name=f
s=z
t=!1}if(typeof x=="number")r=function(g,h){return function(){return g(h)}}(H.qF,x)
else if(typeof x=="function")if(d)r=x
else{q=t?H.fc:H.dO
r=function(g,h){return function(){return g.apply({$receiver:h(this)},arguments)}}(x,q)}else throw H.b("Error in reflectionInfo.")
w.$S=r
w[y]=s
for(u=b.length,p=1;p<u;++p){o=b[p]
n=o.$callName
if(n!=null){m=d?o:H.fe(a,o,t)
w[n]=m}}w["call*"]=s
w.$R=z.$R
w.$D=z.$D
return v},
k9:function(a,b,c,d){var z=H.dO
switch(b?-1:a){case 0:return function(e,f){return function(){return f(this)[e]()}}(c,z)
case 1:return function(e,f){return function(g){return f(this)[e](g)}}(c,z)
case 2:return function(e,f){return function(g,h){return f(this)[e](g,h)}}(c,z)
case 3:return function(e,f){return function(g,h,i){return f(this)[e](g,h,i)}}(c,z)
case 4:return function(e,f){return function(g,h,i,j){return f(this)[e](g,h,i,j)}}(c,z)
case 5:return function(e,f){return function(g,h,i,j,k){return f(this)[e](g,h,i,j,k)}}(c,z)
default:return function(e,f){return function(){return e.apply(f(this),arguments)}}(d,z)}},
fe:function(a,b,c){var z,y,x,w,v,u,t
if(c)return H.kb(a,b)
z=b.$stubName
y=b.length
x=a[z]
w=b==null?x==null:b===x
v=!w||y>=27
if(v)return H.k9(y,!w,z,b)
if(y===0){w=$.aG
$.aG=J.R(w,1)
u="self"+H.j(w)
w="return function(){var "+u+" = this."
v=$.bQ
if(v==null){v=H.cP("self")
$.bQ=v}return new Function(w+H.j(v)+";return "+u+"."+H.j(z)+"();}")()}t="abcdefghijklmnopqrstuvwxyz".split("").splice(0,y).join(",")
w=$.aG
$.aG=J.R(w,1)
t+=H.j(w)
w="return function("+t+"){return this."
v=$.bQ
if(v==null){v=H.cP("self")
$.bQ=v}return new Function(w+H.j(v)+"."+H.j(z)+"("+t+");}")()},
ka:function(a,b,c,d){var z,y
z=H.dO
y=H.fc
switch(b?-1:a){case 0:throw H.b(new H.n8("Intercepted function with no arguments."))
case 1:return function(e,f,g){return function(){return f(this)[e](g(this))}}(c,z,y)
case 2:return function(e,f,g){return function(h){return f(this)[e](g(this),h)}}(c,z,y)
case 3:return function(e,f,g){return function(h,i){return f(this)[e](g(this),h,i)}}(c,z,y)
case 4:return function(e,f,g){return function(h,i,j){return f(this)[e](g(this),h,i,j)}}(c,z,y)
case 5:return function(e,f,g){return function(h,i,j,k){return f(this)[e](g(this),h,i,j,k)}}(c,z,y)
case 6:return function(e,f,g){return function(h,i,j,k,l){return f(this)[e](g(this),h,i,j,k,l)}}(c,z,y)
default:return function(e,f,g,h){return function(){h=[g(this)]
Array.prototype.push.apply(h,arguments)
return e.apply(f(this),h)}}(d,z,y)}},
kb:function(a,b){var z,y,x,w,v,u,t,s
z=H.jR()
y=$.fb
if(y==null){y=H.cP("receiver")
$.fb=y}x=b.$stubName
w=b.length
v=a[x]
u=b==null?v==null:b===v
t=!u||w>=28
if(t)return H.ka(w,!u,x,b)
if(w===1){y="return function(){return this."+H.j(z)+"."+H.j(x)+"(this."+H.j(y)+");"
u=$.aG
$.aG=J.R(u,1)
return new Function(y+H.j(u)+"}")()}s="abcdefghijklmnopqrstuvwxyz".split("").splice(0,w-1).join(",")
y="return function("+s+"){return this."+H.j(z)+"."+H.j(x)+"(this."+H.j(y)+", "+s+");"
u=$.aG
$.aG=J.R(u,1)
return new Function(y+H.j(u)+"}")()},
eE:function(a,b,c,d,e,f){var z
b.fixed$length=Array
if(!!J.t(c).$isc){c.fixed$length=Array
z=c}else z=c
return H.kc(a,b,z,!!d,e,f)},
r5:function(a,b){var z=J.G(b)
throw H.b(H.k7(H.ec(a),z.b0(b,3,z.gi(b))))},
qQ:function(a,b){var z
if(a!=null)z=(typeof a==="object"||typeof a==="function")&&J.t(a)[b]
else z=!0
if(z)return a
H.r5(a,b)},
qA:function(a){var z=J.t(a)
return"$S" in z?z.$S():null},
bl:function(a,b){var z
if(a==null)return!1
z=H.qA(a)
return z==null?!1:H.iI(z,b)},
rh:function(a){throw H.b(new P.kq(a))},
cd:function(){return(Math.random()*0x100000000>>>0)+(Math.random()*0x100000000>>>0)*4294967296},
iF:function(a){return init.getIsolateTag(a)},
v:function(a,b){a.$ti=b
return a},
dr:function(a){if(a==null)return
return a.$ti},
iG:function(a,b){return H.eI(a["$as"+H.j(b)],H.dr(a))},
S:function(a,b,c){var z=H.iG(a,b)
return z==null?null:z[c]},
B:function(a,b){var z=H.dr(a)
return z==null?null:z[b]},
bL:function(a,b){var z
if(a==null)return"dynamic"
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a[0].builtin$cls+H.iK(a,1,b)
if(typeof a=="function")return a.builtin$cls
if(typeof a==="number"&&Math.floor(a)===a)return H.j(a)
if(typeof a.func!="undefined"){z=a.typedef
if(z!=null)return H.bL(z,b)
return H.q_(a,b)}return"unknown-reified-type"},
q_:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=!!a.v?"void":H.bL(a.ret,b)
if("args" in a){y=a.args
for(x=y.length,w="",v="",u=0;u<x;++u,v=", "){t=y[u]
w=w+v+H.bL(t,b)}}else{w=""
v=""}if("opt" in a){s=a.opt
w+=v+"["
for(x=s.length,v="",u=0;u<x;++u,v=", "){t=s[u]
w=w+v+H.bL(t,b)}w+="]"}if("named" in a){r=a.named
w+=v+"{"
for(x=H.qB(r),q=x.length,v="",u=0;u<q;++u,v=", "){p=x[u]
w=w+v+H.bL(r[p],b)+(" "+H.j(p))}w+="}"}return"("+w+") => "+z},
iK:function(a,b,c){var z,y,x,w,v,u
if(a==null)return""
z=new P.bv("")
for(y=b,x=!0,w=!0,v="";y<a.length;++y){if(x)x=!1
else z.L=v+", "
u=a[y]
if(u!=null)w=!1
v=z.L+=H.bL(u,c)}return w?"":"<"+z.k(0)+">"},
eI:function(a,b){if(a==null)return b
a=a.apply(null,b)
if(a==null)return
if(typeof a==="object"&&a!==null&&a.constructor===Array)return a
if(typeof a=="function")return a.apply(null,b)
return b},
cz:function(a,b,c,d){var z,y
if(a==null)return!1
z=H.dr(a)
y=J.t(a)
if(y[b]==null)return!1
return H.iC(H.eI(y[d],z),c)},
iC:function(a,b){var z,y
if(a==null||b==null)return!0
z=a.length
for(y=0;y<z;++y)if(!H.au(a[y],b[y]))return!1
return!0},
aK:function(a,b,c){return a.apply(b,H.iG(b,c))},
au:function(a,b){var z,y,x,w,v,u
if(a===b)return!0
if(a==null||b==null)return!0
if(a.builtin$cls==="d7")return!0
if('func' in b)return H.iI(a,b)
if('func' in a)return b.builtin$cls==="i"||b.builtin$cls==="e"
z=typeof a==="object"&&a!==null&&a.constructor===Array
y=z?a[0]:a
x=typeof b==="object"&&b!==null&&b.constructor===Array
w=x?b[0]:b
if(w!==y){v=H.bL(w,null)
if(!('$is'+v in y.prototype))return!1
u=y.prototype["$as"+v]}else u=null
if(!z&&u==null||!x)return!0
z=z?a.slice(1):null
x=b.slice(1)
return H.iC(H.eI(u,z),x)},
iB:function(a,b,c){var z,y,x,w,v
z=b==null
if(z&&a==null)return!0
if(z)return c
if(a==null)return!1
y=a.length
x=b.length
if(c){if(y<x)return!1}else if(y!==x)return!1
for(w=0;w<x;++w){z=a[w]
v=b[w]
if(!(H.au(z,v)||H.au(v,z)))return!1}return!0},
q9:function(a,b){var z,y,x,w,v,u
if(b==null)return!0
if(a==null)return!1
z=Object.getOwnPropertyNames(b)
z.fixed$length=Array
y=z
for(z=y.length,x=0;x<z;++x){w=y[x]
if(!Object.hasOwnProperty.call(a,w))return!1
v=b[w]
u=a[w]
if(!(H.au(v,u)||H.au(u,v)))return!1}return!0},
iI:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
if(!('func' in a))return!1
if("v" in a){if(!("v" in b)&&"ret" in b)return!1}else if(!("v" in b)){z=a.ret
y=b.ret
if(!(H.au(z,y)||H.au(y,z)))return!1}x=a.args
w=b.args
v=a.opt
u=b.opt
t=x!=null?x.length:0
s=w!=null?w.length:0
r=v!=null?v.length:0
q=u!=null?u.length:0
if(t>s)return!1
if(t+r<s+q)return!1
if(t===s){if(!H.iB(x,w,!1))return!1
if(!H.iB(v,u,!0))return!1}else{for(p=0;p<t;++p){o=x[p]
n=w[p]
if(!(H.au(o,n)||H.au(n,o)))return!1}for(m=p,l=0;m<s;++l,++m){o=v[l]
n=w[m]
if(!(H.au(o,n)||H.au(n,o)))return!1}for(m=0;m<q;++l,++m){o=v[l]
n=u[m]
if(!(H.au(o,n)||H.au(n,o)))return!1}}return H.q9(a.named,b.named)},
wk:function(a){var z=$.eF
return"Instance of "+(z==null?"<Unknown>":z.$1(a))},
wh:function(a){return H.aU(a)},
wg:function(a,b,c){Object.defineProperty(a,b,{value:c,enumerable:false,writable:true,configurable:true})},
qX:function(a){var z,y,x,w,v,u
z=$.eF.$1(a)
y=$.dn[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.du[z]
if(x!=null)return x
w=init.interceptorsByTag[z]
if(w==null){z=$.iA.$2(a,z)
if(z!=null){y=$.dn[z]
if(y!=null){Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}x=$.du[z]
if(x!=null)return x
w=init.interceptorsByTag[z]}}if(w==null)return
x=w.prototype
v=z[0]
if(v==="!"){y=H.eH(x)
$.dn[z]=y
Object.defineProperty(a,init.dispatchPropertyName,{value:y,enumerable:false,writable:true,configurable:true})
return y.i}if(v==="~"){$.du[z]=x
return x}if(v==="-"){u=H.eH(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}if(v==="+")return H.iM(a,x)
if(v==="*")throw H.b(new P.c5(z))
if(init.leafTags[z]===true){u=H.eH(x)
Object.defineProperty(Object.getPrototypeOf(a),init.dispatchPropertyName,{value:u,enumerable:false,writable:true,configurable:true})
return u.i}else return H.iM(a,x)},
iM:function(a,b){var z=Object.getPrototypeOf(a)
Object.defineProperty(z,init.dispatchPropertyName,{value:J.dv(b,z,null,null),enumerable:false,writable:true,configurable:true})
return b},
eH:function(a){return J.dv(a,!1,null,!!a.$isw)},
qY:function(a,b,c){var z=b.prototype
if(init.leafTags[a]===true)return J.dv(z,!1,null,!!z.$isw)
else return J.dv(z,c,null,null)},
qO:function(){if(!0===$.eG)return
$.eG=!0
H.qP()},
qP:function(){var z,y,x,w,v,u,t,s
$.dn=Object.create(null)
$.du=Object.create(null)
H.qK()
z=init.interceptorsByTag
y=Object.getOwnPropertyNames(z)
if(typeof window!="undefined"){window
x=function(){}
for(w=0;w<y.length;++w){v=y[w]
u=$.iO.$1(v)
if(u!=null){t=H.qY(v,z[v],u)
if(t!=null){Object.defineProperty(u,init.dispatchPropertyName,{value:t,enumerable:false,writable:true,configurable:true})
x.prototype=u}}}}for(w=0;w<y.length;++w){v=y[w]
if(/^[A-Za-z_]/.test(v)){s=z[v]
z["!"+v]=s
z["~"+v]=s
z["-"+v]=s
z["+"+v]=s
z["*"+v]=s}}},
qK:function(){var z,y,x,w,v,u,t
z=C.T()
z=H.bI(C.Q,H.bI(C.V,H.bI(C.C,H.bI(C.C,H.bI(C.U,H.bI(C.R,H.bI(C.S(C.D),z)))))))
if(typeof dartNativeDispatchHooksTransformer!="undefined"){y=dartNativeDispatchHooksTransformer
if(typeof y=="function")y=[y]
if(y.constructor==Array)for(x=0;x<y.length;++x){w=y[x]
if(typeof w=="function")z=w(z)||z}}v=z.getTag
u=z.getUnknownTag
t=z.prototypeForTag
$.eF=new H.qL(v)
$.iA=new H.qM(u)
$.iO=new H.qN(t)},
bI:function(a,b){return a(b)||b},
rf:function(a,b,c){var z
if(typeof b==="string")return a.indexOf(b,c)>=0
else{z=J.j0(b,C.d.bm(a,c))
z=z.gE(z)
return!z}},
rg:function(a,b,c){var z,y,x
if(typeof b==="string")if(b==="")if(a==="")return c
else{z=a.length
for(y=c,x=0;x<z;++x)y=y+a[x]+c
return y.charCodeAt(0)==0?y:y}else return a.replace(new RegExp(b.replace(/[[\]{}()*+?.\\^$|]/g,"\\$&"),'g'),c.replace(/\$/g,"$$$$"))
else{if(b==null)H.C(H.a1(b))
throw H.b("String.replaceAll(Pattern) UNIMPLEMENTED")}},
kk:{"^":"e;",
gE:function(a){return this.gi(this)===0},
gY:function(a){return this.gi(this)!==0},
k:function(a){return P.e8(this)},
j:function(a,b,c){return H.kl()},
$isM:1,
$asM:null},
fh:{"^":"kk;a,b,c,$ti",
gi:function(a){return this.a},
O:function(a,b){if(typeof b!=="string")return!1
if("__proto__"===b)return!1
return this.b.hasOwnProperty(b)},
h:function(a,b){if(!this.O(0,b))return
return this.ei(b)},
ei:function(a){return this.b[a]},
F:function(a,b){var z,y,x,w
z=this.c
for(y=z.length,x=0;x<y;++x){w=z[x]
b.$2(w,this.ei(w))}},
gT:function(a){return new H.oB(this,[H.B(this,0)])}},
oB:{"^":"a_;a,$ti",
gJ:function(a){var z=this.a.c
return new J.ck(z,z.length,0,null)},
gi:function(a){return this.a.c.length}},
n4:{"^":"e;a,M:b>,c,d,e,f,r,x",t:{
n5:function(a){var z,y,x
z=a.$reflectionInfo
if(z==null)return
z.fixed$length=Array
z=z
y=z[0]
x=z[1]
return new H.n4(a,z,(y&1)===1,y>>1,x>>1,(x&1)===1,z[2],null)}}},
mZ:{"^":"h:1;a",
$0:function(){return C.b.aA(1000*this.a.now())},
$isi:1},
od:{"^":"e;a,b,c,d,e,f",
ar:function(a){var z,y,x
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
t:{
aI:function(a){var z,y,x,w,v,u
a=a.replace(String({}),'$receiver$').replace(/[[\]{}()*+?.\\^$|]/g,"\\$&")
z=a.match(/\\\$[a-zA-Z]+\\\$/g)
if(z==null)z=[]
y=z.indexOf("\\$arguments\\$")
x=z.indexOf("\\$argumentsExpr\\$")
w=z.indexOf("\\$expr\\$")
v=z.indexOf("\\$method\\$")
u=z.indexOf("\\$receiver\\$")
return new H.od(a.replace(new RegExp('\\\\\\$arguments\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$argumentsExpr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$expr\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$method\\\\\\$','g'),'((?:x|[^x])*)').replace(new RegExp('\\\\\\$receiver\\\\\\$','g'),'((?:x|[^x])*)'),y,x,w,v,u)},
db:function(a){return function($expr$){var $argumentsExpr$='$arguments$'
try{$expr$.$method$($argumentsExpr$)}catch(z){return z.message}}(a)},
hQ:function(a){return function($expr$){try{$expr$.$method$}catch(z){return z.message}}(a)}}},
hi:{"^":"aa;a,b",
k:function(a){var z=this.b
if(z==null)return"NullError: "+H.j(this.a)
return"NullError: method not found: '"+H.j(z)+"' on null"}},
ma:{"^":"aa;a,b,c",
k:function(a){var z,y
z=this.b
if(z==null)return"NoSuchMethodError: "+H.j(this.a)
y=this.c
if(y==null)return"NoSuchMethodError: method not found: '"+z+"' ("+H.j(this.a)+")"
return"NoSuchMethodError: method not found: '"+z+"' on '"+y+"' ("+H.j(this.a)+")"},
t:{
e3:function(a,b){var z,y
z=b==null
y=z?null:b.method
return new H.ma(a,y,z?null:b.receiver)}}},
oh:{"^":"aa;a",
k:function(a){var z=this.a
return z.length===0?"Error":"Error: "+z}},
dT:{"^":"e;a,an:b<"},
rk:{"^":"h:0;a",
$1:function(a){if(!!J.t(a).$isaa)if(a.$thrownJsError==null)a.$thrownJsError=this.a
return a},
$isi:1},
ih:{"^":"e;a,b",
k:function(a){var z,y
z=this.b
if(z!=null)return z
z=this.a
y=z!==null&&typeof z==="object"?z.stack:null
z=y==null?"":y
this.b=z
return z}},
qS:{"^":"h:1;a",
$0:function(){return this.a.$0()},
$isi:1},
qT:{"^":"h:1;a,b",
$0:function(){return this.a.$1(this.b)},
$isi:1},
qU:{"^":"h:1;a,b,c",
$0:function(){return this.a.$2(this.b,this.c)},
$isi:1},
qV:{"^":"h:1;a,b,c,d",
$0:function(){return this.a.$3(this.b,this.c,this.d)},
$isi:1},
qW:{"^":"h:1;a,b,c,d,e",
$0:function(){return this.a.$4(this.b,this.c,this.d,this.e)},
$isi:1},
h:{"^":"e;",
k:function(a){return"Closure '"+H.ec(this).trim()+"'"},
ghd:function(){return this},
$isi:1,
ghd:function(){return this}},
hH:{"^":"h;"},
nl:{"^":"hH;",
k:function(a){var z=this.$static_name
if(z==null)return"Closure of unknown static method"
return"Closure '"+z+"'"}},
dN:{"^":"hH;a,b,c,d",
I:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof H.dN))return!1
return this.a===b.a&&this.b===b.b&&this.c===b.c},
gK:function(a){var z,y
z=this.c
if(z==null)y=H.aU(this.a)
else y=typeof z!=="object"?J.a8(z):H.aU(z)
z=H.aU(this.b)
if(typeof y!=="number")return y.kP()
return(y^z)>>>0},
k:function(a){var z=this.c
if(z==null)z=this.a
return"Closure '"+H.j(this.d)+"' of "+H.d9(z)},
t:{
dO:function(a){return a.a},
fc:function(a){return a.c},
jR:function(){var z=$.bQ
if(z==null){z=H.cP("self")
$.bQ=z}return z},
cP:function(a){var z,y,x,w,v
z=new H.dN("self","target","receiver","name")
y=Object.getOwnPropertyNames(z)
y.fixed$length=Array
x=y
for(y=x.length,w=0;w<y;++w){v=x[w]
if(z[v]===a)return v}}}},
k6:{"^":"aa;P:a>",
k:function(a){return this.a},
t:{
k7:function(a,b){return new H.k6("CastError: Casting value of type '"+a+"' to incompatible type '"+b+"'")}}},
n8:{"^":"aa;P:a>",
k:function(a){return"RuntimeError: "+H.j(this.a)}},
Q:{"^":"e;a,b,c,d,e,f,r,$ti",
gi:function(a){return this.a},
gE:function(a){return this.a===0},
gY:function(a){return!this.gE(this)},
gT:function(a){return new H.mh(this,[H.B(this,0)])},
gh8:function(a){return H.d0(this.gT(this),new H.m9(this),H.B(this,0),H.B(this,1))},
O:function(a,b){var z,y
if(typeof b==="string"){z=this.b
if(z==null)return!1
return this.eb(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return this.eb(y,b)}else return this.jS(b)},
jS:function(a){var z=this.d
if(z==null)return!1
return this.bD(this.bV(z,this.bC(a)),a)>=0},
h:function(a,b){var z,y,x
if(typeof b==="string"){z=this.b
if(z==null)return
y=this.bq(z,b)
return y==null?null:y.gaU()}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null)return
y=this.bq(x,b)
return y==null?null:y.gaU()}else return this.jT(b)},
jT:function(a){var z,y,x
z=this.d
if(z==null)return
y=this.bV(z,this.bC(a))
x=this.bD(y,a)
if(x<0)return
return y[x].gaU()},
j:function(a,b,c){var z,y
if(typeof b==="string"){z=this.b
if(z==null){z=this.d_()
this.b=z}this.e4(z,b,c)}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null){y=this.d_()
this.c=y}this.e4(y,b,c)}else this.jV(b,c)},
jV:function(a,b){var z,y,x,w
z=this.d
if(z==null){z=this.d_()
this.d=z}y=this.bC(a)
x=this.bV(z,y)
if(x==null)this.d5(z,y,[this.d0(a,b)])
else{w=this.bD(x,a)
if(w>=0)x[w].saU(b)
else x.push(this.d0(a,b))}},
dA:function(a,b,c){var z
if(this.O(0,b))return this.h(0,b)
z=c.$0()
this.j(0,b,z)
return z},
W:function(a,b){if(typeof b==="string")return this.ex(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.ex(this.c,b)
else return this.jU(b)},
jU:function(a){var z,y,x,w
z=this.d
if(z==null)return
y=this.bV(z,this.bC(a))
x=this.bD(y,a)
if(x<0)return
w=y.splice(x,1)[0]
this.eJ(w)
return w.gaU()},
bc:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
F:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$2(z.a,z.b)
if(y!==this.r)throw H.b(new P.T(this))
z=z.c}},
e4:function(a,b,c){var z=this.bq(a,b)
if(z==null)this.d5(a,b,this.d0(b,c))
else z.saU(c)},
ex:function(a,b){var z
if(a==null)return
z=this.bq(a,b)
if(z==null)return
this.eJ(z)
this.ec(a,b)
return z.gaU()},
d0:function(a,b){var z,y
z=new H.mg(a,b,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.d=y
y.c=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
eJ:function(a){var z,y
z=a.giB()
y=a.c
if(z==null)this.e=y
else z.c=y
if(y==null)this.f=z
else y.d=z;--this.a
this.r=this.r+1&67108863},
bC:function(a){return J.a8(a)&0x3ffffff},
bD:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.E(a[y].gfm(),b))return y
return-1},
k:function(a){return P.e8(this)},
bq:function(a,b){return a[b]},
bV:function(a,b){return a[b]},
d5:function(a,b,c){a[b]=c},
ec:function(a,b){delete a[b]},
eb:function(a,b){return this.bq(a,b)!=null},
d_:function(){var z=Object.create(null)
this.d5(z,"<non-identifier-key>",z)
this.ec(z,"<non-identifier-key>")
return z},
$islL:1,
$isM:1,
$asM:null},
m9:{"^":"h:0;a",
$1:function(a){return this.a.h(0,a)},
$isi:1},
mg:{"^":"e;fm:a<,aU:b@,c,iB:d<"},
mh:{"^":"d;a,$ti",
gi:function(a){return this.a.a},
gE:function(a){return this.a.a===0},
gJ:function(a){var z,y
z=this.a
y=new H.mi(z,z.r,null,null)
y.c=z.e
return y},
B:function(a,b){return this.a.O(0,b)},
F:function(a,b){var z,y,x
z=this.a
y=z.e
x=z.r
for(;y!=null;){b.$1(y.a)
if(x!==z.r)throw H.b(new P.T(z))
y=y.c}}},
mi:{"^":"e;a,b,c,d",
gD:function(){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.b(new P.T(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.c
return!0}}}},
qL:{"^":"h:0;a",
$1:function(a){return this.a(a)},
$isi:1},
qM:{"^":"h:17;a",
$2:function(a,b){return this.a(a,b)},
$isi:1},
qN:{"^":"h:5;a",
$1:function(a){return this.a(a)},
$isi:1},
m8:{"^":"e;a,b,c,d",
k:function(a){return"RegExp/"+this.a+"/"},
giy:function(){var z=this.d
if(z!=null)return z
z=this.b
z=H.h3(this.a+"|()",z.multiline,!z.ignoreCase,!0)
this.d=z
return z},
ij:function(a,b){var z,y
z=this.giy()
z.lastIndex=b
y=z.exec(a)
if(y==null)return
if(0>=y.length)return H.a(y,-1)
if(y.pop()!=null)return
return new H.pj(this,y)},
k9:function(a,b,c){var z=J.a4(b)
if(c>z)throw H.b(P.a7(c,0,b.length,null,null))
return this.ij(b,c)},
fs:function(a,b){return this.k9(a,b,0)},
$isn6:1,
t:{
h3:function(a,b,c,d){var z,y,x,w
z=b?"m":""
y=c?"":"i"
x=d?"g":""
w=function(e,f){try{return new RegExp(e,f)}catch(v){return v}}(a,z+y+x)
if(w instanceof RegExp)return w
throw H.b(new P.cn("Illegal RegExp pattern ("+String(w)+")",a,null))}}},
pj:{"^":"e;a,b",
h:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.a(z,b)
return z[b]}},
hE:{"^":"e;a,b,c",
h:function(a,b){if(b!==0)H.C(P.c0(b,null,null))
return this.c}},
pB:{"^":"a_;a,b,c",
gJ:function(a){return new H.pC(this.a,this.b,this.c,null)},
gv:function(a){var z,y,x
z=this.a
y=this.b
x=z.indexOf(y,this.c)
if(x>=0)return new H.hE(x,z,y)
throw H.b(H.a6())},
$asa_:function(){return[P.mt]}},
pC:{"^":"e;a,b,c,d",
u:function(){var z,y,x,w,v,u,t
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
this.d=new H.hE(u,w,y)
this.c=t===this.c?t+1:t
return!0},
gD:function(){return this.d}}}],["","",,H,{"^":"",
qB:function(a){var z=H.v(a?Object.keys(a):[],[null])
z.fixed$length=Array
return z}}],["","",,H,{"^":"",
r4:function(a){if(typeof dartPrint=="function"){dartPrint(a)
return}if(typeof console=="object"&&typeof console.log!="undefined"){console.log(a)
return}if(typeof window=="object")return
if(typeof print=="function"){print(a)
return}throw"Unable to print message: "+String(a)}}],["","",,H,{"^":"",
n:function(a){if(typeof a!=="number"||Math.floor(a)!==a)throw H.b(P.ag("Invalid length "+H.j(a)))
return a},
ex:function(a,b,c){if(typeof b!=="number"||Math.floor(b)!==b)throw H.b(P.ag("Invalid view offsetInBytes "+H.j(b)))},
bj:function(a){return a},
mC:function(a){return new Float32Array(H.n(a))},
hf:function(a){return new Uint16Array(H.bj(a))},
d4:{"^":"f;",
bu:function(a,b,c){var z
H.ex(a,b,c)
z=new Uint32Array(a,b,c)
return z},
S:function(a,b,c){var z
H.ex(a,b,c)
z=new Float32Array(a,b,c)
return z},
$isd4:1,
$isfd:1,
"%":"ArrayBuffer"},
d6:{"^":"f;k5:byteLength=",
iu:function(a,b,c,d){var z=P.a7(b,0,c,d,null)
throw H.b(z)},
e6:function(a,b,c,d){if(b>>>0!==b||b>c)this.iu(a,b,c,d)},
$isd6:1,
"%":"DataView;ArrayBufferView;e9|hb|hd|d5|hc|he|aT"},
e9:{"^":"d6;",
gi:function(a){return a.length},
eF:function(a,b,c,d,e){var z,y,x
z=a.length
this.e6(a,b,z,"start")
this.e6(a,c,z,"end")
if(b>c)throw H.b(P.a7(b,0,c,null,null))
y=c-b
x=d.length
if(x-e<y)throw H.b(new P.x("Not enough elements"))
if(e!==0||x!==y)d=d.subarray(e,e+y)
a.set(d,b)},
$isu:1,
$asu:I.ae,
$isw:1,
$asw:I.ae},
d5:{"^":"hd;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.C(H.Z(a,b))
return a[b]},
j:function(a,b,c){if(b>>>0!==b||b>=a.length)H.C(H.Z(a,b))
a[b]=c},
V:function(a,b,c,d,e){if(!!J.t(d).$isd5){this.eF(a,b,c,d,e)
return}this.e2(a,b,c,d,e)},
aC:function(a,b,c,d){return this.V(a,b,c,d,0)}},
hb:{"^":"e9+I;",$asu:I.ae,$isd:1,
$asd:function(){return[P.K]},
$asw:I.ae,
$isc:1,
$asc:function(){return[P.K]}},
hd:{"^":"hb+fI;",$asu:I.ae,
$asd:function(){return[P.K]},
$asw:I.ae,
$asc:function(){return[P.K]}},
aT:{"^":"he;",
j:function(a,b,c){if(b>>>0!==b||b>=a.length)H.C(H.Z(a,b))
a[b]=c},
V:function(a,b,c,d,e){if(!!J.t(d).$isaT){this.eF(a,b,c,d,e)
return}this.e2(a,b,c,d,e)},
aC:function(a,b,c,d){return this.V(a,b,c,d,0)},
$isd:1,
$asd:function(){return[P.m]},
$isc:1,
$asc:function(){return[P.m]}},
hc:{"^":"e9+I;",$asu:I.ae,$isd:1,
$asd:function(){return[P.m]},
$asw:I.ae,
$isc:1,
$asc:function(){return[P.m]}},
he:{"^":"hc+fI;",$asu:I.ae,
$asd:function(){return[P.m]},
$asw:I.ae,
$asc:function(){return[P.m]}},
mB:{"^":"d5;",$isd:1,
$asd:function(){return[P.K]},
$isc:1,
$asc:function(){return[P.K]},
"%":"Float32Array"},
u9:{"^":"d5;",$isd:1,
$asd:function(){return[P.K]},
$isc:1,
$asc:function(){return[P.K]},
"%":"Float64Array"},
ua:{"^":"aT;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.C(H.Z(a,b))
return a[b]},
$isd:1,
$asd:function(){return[P.m]},
$isc:1,
$asc:function(){return[P.m]},
"%":"Int16Array"},
ub:{"^":"aT;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.C(H.Z(a,b))
return a[b]},
$isd:1,
$asd:function(){return[P.m]},
$isc:1,
$asc:function(){return[P.m]},
"%":"Int32Array"},
uc:{"^":"aT;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.C(H.Z(a,b))
return a[b]},
$isd:1,
$asd:function(){return[P.m]},
$isc:1,
$asc:function(){return[P.m]},
"%":"Int8Array"},
ud:{"^":"aT;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.C(H.Z(a,b))
return a[b]},
$isd:1,
$asd:function(){return[P.m]},
$isc:1,
$asc:function(){return[P.m]},
"%":"Uint16Array"},
mD:{"^":"aT;",
h:function(a,b){if(b>>>0!==b||b>=a.length)H.C(H.Z(a,b))
return a[b]},
$isd:1,
$asd:function(){return[P.m]},
$isc:1,
$asc:function(){return[P.m]},
"%":"Uint32Array"},
ue:{"^":"aT;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.C(H.Z(a,b))
return a[b]},
$isd:1,
$asd:function(){return[P.m]},
$isc:1,
$asc:function(){return[P.m]},
"%":"CanvasPixelArray|Uint8ClampedArray"},
uf:{"^":"aT;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)H.C(H.Z(a,b))
return a[b]},
$isd:1,
$asd:function(){return[P.m]},
$isc:1,
$asc:function(){return[P.m]},
"%":";Uint8Array"}}],["","",,P,{"^":"",
op:function(){var z,y,x
z={}
if(self.scheduleImmediate!=null)return P.qa()
if(self.MutationObserver!=null&&self.document!=null){y=self.document.createElement("div")
x=self.document.createElement("span")
z.a=null
new self.MutationObserver(H.as(new P.or(z),1)).observe(y,{childList:true})
return new P.oq(z,y,x)}else if(self.setImmediate!=null)return P.qb()
return P.qc()},
vQ:[function(a){++init.globalState.f.b
self.scheduleImmediate(H.as(new P.os(a),0))},"$1","qa",2,0,7],
vR:[function(a){++init.globalState.f.b
self.setImmediate(H.as(new P.ot(a),0))},"$1","qb",2,0,7],
vS:[function(a){P.en(C.z,a)},"$1","qc",2,0,7],
bD:function(a,b){P.io(null,a)
return b.gjE()},
aZ:function(a,b){P.io(a,b)},
bC:function(a,b){J.j7(b,a)},
bB:function(a,b){b.f2(H.H(a),H.W(a))},
io:function(a,b){var z,y,x,w
z=new P.pQ(b)
y=new P.pR(b)
x=J.t(a)
if(!!x.$isJ)a.d6(z,y)
else if(!!x.$isah)a.cp(z,y)
else{w=new P.J(0,$.r,null,[null])
w.a=4
w.c=a
w.d6(z,null)}},
bH:function(a){var z=function(b,c){return function(d,e){while(true)try{b(d,e)
break}catch(y){e=y
d=c}}}(a,1)
$.r.toString
return new P.q8(z)},
iu:function(a,b){if(H.bl(a,{func:1,args:[P.d7,P.d7]})){b.toString
return a}else{b.toString
return a}},
dV:function(a,b,c){var z
if(a==null)a=new P.d8()
z=$.r
if(z!==C.f)z.toString
z=new P.J(0,z,null,[c])
z.cO(a,b)
return z},
br:function(a){return new P.ik(new P.J(0,$.r,null,[a]),[a])},
it:function(a,b,c){$.r.toString
a.ak(b,c)},
q3:function(){var z,y
for(;z=$.bF,z!=null;){$.ca=null
y=J.eX(z)
$.bF=y
if(y==null)$.c9=null
z.gj6().$0()}},
wf:[function(){$.eA=!0
try{P.q3()}finally{$.ca=null
$.eA=!1
if($.bF!=null)$.$get$eq().$1(P.iE())}},"$0","iE",0,0,2],
iz:function(a){var z=new P.i_(a,null)
if($.bF==null){$.c9=z
$.bF=z
if(!$.eA)$.$get$eq().$1(P.iE())}else{$.c9.b=z
$.c9=z}},
q7:function(a){var z,y,x
z=$.bF
if(z==null){P.iz(a)
$.ca=$.c9
return}y=new P.i_(a,null)
x=$.ca
if(x==null){y.b=z
$.ca=y
$.bF=y}else{y.b=x.b
x.b=y
$.ca=y
if(y.b==null)$.c9=y}},
iR:function(a){var z=$.r
if(C.f===z){P.bk(null,null,C.f,a)
return}z.toString
P.bk(null,null,z,z.dc(a,!0))},
vh:function(a,b){return new P.pA(null,a,!1,[b])},
cy:function(a){var z,y,x,w
if(a==null)return
try{a.$0()}catch(x){z=H.H(x)
y=H.W(x)
w=$.r
w.toString
P.bG(null,null,w,z,y)}},
wd:[function(a){},"$1","qd",2,0,37],
q4:[function(a,b){var z=$.r
z.toString
P.bG(null,null,z,a,b)},function(a){return P.q4(a,null)},"$2","$1","qe",2,2,8],
we:[function(){},"$0","iD",0,0,2],
dm:function(a,b,c){var z,y,x,w,v,u,t
try{b.$1(a.$0())}catch(u){z=H.H(u)
y=H.W(u)
$.r.toString
x=null
if(x==null)c.$2(z,y)
else{t=J.bN(x)
w=t
v=x.gan()
c.$2(w,v)}}},
pS:function(a,b,c,d){var z=a.bb(0)
if(!!J.t(z).$isah&&z!==$.$get$b2())z.bk(new P.pU(b,c,d))
else b.ak(c,d)},
dk:function(a,b){return new P.pT(a,b)},
ew:function(a,b,c){var z=a.bb(0)
if(!!J.t(z).$isah&&z!==$.$get$b2())z.bk(new P.pV(b,c))
else b.aj(c)},
pP:function(a,b,c){$.r.toString
a.cL(b,c)},
o_:function(a,b){var z=$.r
if(z===C.f){z.toString
return P.en(a,b)}return P.en(a,z.dc(b,!0))},
en:function(a,b){var z=C.c.aG(a.a,1000)
return H.nX(z<0?0:z,b)},
bG:function(a,b,c,d,e){var z={}
z.a=d
P.q7(new P.q6(z,e))},
iw:function(a,b,c,d){var z,y
y=$.r
if(y===c)return d.$0()
$.r=c
z=y
try{y=d.$0()
return y}finally{$.r=z}},
iy:function(a,b,c,d,e){var z,y
y=$.r
if(y===c)return d.$1(e)
$.r=c
z=y
try{y=d.$1(e)
return y}finally{$.r=z}},
ix:function(a,b,c,d,e,f){var z,y
y=$.r
if(y===c)return d.$2(e,f)
$.r=c
z=y
try{y=d.$2(e,f)
return y}finally{$.r=z}},
bk:function(a,b,c,d){var z=C.f!==c
if(z)d=c.dc(d,!(!z||!1))
P.iz(d)},
or:{"^":"h:0;a",
$1:function(a){var z,y;--init.globalState.f.b
z=this.a
y=z.a
z.a=null
y.$0()},
$isi:1},
oq:{"^":"h:19;a,b,c",
$1:function(a){var z,y;++init.globalState.f.b
this.a.a=a
z=this.b
y=this.c
z.firstChild?z.removeChild(y):z.appendChild(y)},
$isi:1},
os:{"^":"h:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()},
$isi:1},
ot:{"^":"h:1;a",
$0:function(){--init.globalState.f.b
this.a.$0()},
$isi:1},
pQ:{"^":"h:0;a",
$1:function(a){return this.a.$2(0,a)},
$isi:1},
pR:{"^":"h:10;a",
$2:function(a,b){this.a.$2(1,new H.dT(a,b))},
$isi:1},
q8:{"^":"h:18;a",
$2:function(a,b){this.a(a,b)},
$isi:1},
ow:{"^":"bx;a,$ti"},
ox:{"^":"i4;y,iz:z<,Q,x,a,b,c,d,e,f,r,$ti",
bZ:[function(){},"$0","gbY",0,0,2],
c0:[function(){},"$0","gc_",0,0,2]},
i2:{"^":"e;aP:c<,$ti",
gbX:function(){return this.c<4},
ey:function(a){var z,y
z=a.Q
y=a.z
if(z==null)this.d=y
else z.z=y
if(y==null)this.e=z
else y.Q=z
a.Q=a
a.z=a},
eG:function(a,b,c,d){var z,y,x,w
if((this.c&4)!==0){if(c==null)c=P.iD()
z=new P.oE($.r,0,c,this.$ti)
z.eC()
return z}z=$.r
y=d?1:0
x=new P.ox(0,null,null,this,null,null,null,z,y,null,null,this.$ti)
x.cK(a,b,c,d,H.B(this,0))
x.Q=x
x.z=x
x.y=this.c&1
w=this.e
this.e=x
x.z=null
x.Q=w
if(w==null)this.d=x
else w.z=x
if(this.d===x)P.cy(this.a)
return x},
eu:function(a){var z
if(a.giz()===a)return
z=a.y
if((z&2)!==0)a.y=z|4
else{this.ey(a)
if((this.c&2)===0&&this.d==null)this.cP()}return},
ev:function(a){},
ew:function(a){},
cM:["hJ",function(){if((this.c&4)!==0)return new P.x("Cannot add new events after calling close")
return new P.x("Cannot add new events while doing an addStream")}],
l:function(a,b){if(!this.gbX())throw H.b(this.cM())
this.ag(b)},
ik:function(a){var z,y,x,w
z=this.c
if((z&2)!==0)throw H.b(new P.x("Cannot fire new event. Controller is already firing an event"))
y=this.d
if(y==null)return
x=z&1
this.c=z^3
for(;y!=null;){z=y.y
if((z&1)===x){y.y=z|2
a.$1(y)
z=y.y^=1
w=y.z
if((z&4)!==0)this.ey(y)
y.y&=4294967293
y=w}else y=y.z}this.c&=4294967293
if(this.d==null)this.cP()},
cP:function(){if((this.c&4)!==0&&this.r.a===0)this.r.b4(null)
P.cy(this.b)}},
ij:{"^":"i2;a,b,c,d,e,f,r,$ti",
gbX:function(){return P.i2.prototype.gbX.call(this)===!0&&(this.c&2)===0},
cM:function(){if((this.c&2)!==0)return new P.x("Cannot fire new event. Controller is already firing an event")
return this.hJ()},
ag:function(a){var z=this.d
if(z==null)return
if(z===this.e){this.c|=2
z.b3(0,a)
this.c&=4294967293
if(this.d==null)this.cP()
return}this.ik(new P.pH(this,a))}},
pH:{"^":"h;a,b",
$1:function(a){a.b3(0,this.b)},
$S:function(){return H.aK(function(a){return{func:1,args:[[P.c6,a]]}},this.a,"ij")},
$isi:1},
ah:{"^":"e;$ti"},
i3:{"^":"e;jE:a<,$ti",
f2:[function(a,b){if(a==null)a=new P.d8()
if(this.a.a!==0)throw H.b(new P.x("Future already completed"))
$.r.toString
this.ak(a,b)},function(a){return this.f2(a,null)},"cb","$2","$1","gjb",2,2,8]},
bw:{"^":"i3;a,$ti",
ad:function(a,b){var z=this.a
if(z.a!==0)throw H.b(new P.x("Future already completed"))
z.b4(b)},
ja:function(a){return this.ad(a,null)},
ak:function(a,b){this.a.cO(a,b)}},
ik:{"^":"i3;a,$ti",
ad:function(a,b){var z=this.a
if(z.a!==0)throw H.b(new P.x("Future already completed"))
z.aj(b)},
ak:function(a,b){this.a.ak(a,b)}},
i8:{"^":"e;d1:a<,b,c,d,e",
giO:function(){return this.b.b},
gfk:function(){return(this.c&1)!==0},
gjM:function(){return(this.c&2)!==0},
gfj:function(){return this.c===8},
jK:function(a){return this.b.b.dD(this.d,a)},
ka:function(a){if(this.c!==6)return!0
return this.b.b.dD(this.d,J.bN(a))},
jG:function(a){var z,y,x
z=this.e
y=J.k(a)
x=this.b.b
if(H.bl(z,{func:1,args:[,,]}))return x.ky(z,y.ga9(a),a.gan())
else return x.dD(z,y.ga9(a))},
jL:function(){return this.b.b.fS(this.d)}},
J:{"^":"e;aP:a<,b,iG:c<,$ti",
giv:function(){return this.a===2},
gcZ:function(){return this.a>=4},
cp:function(a,b){var z=$.r
if(z!==C.f){z.toString
if(b!=null)b=P.iu(b,z)}return this.d6(a,b)},
dF:function(a){return this.cp(a,null)},
d6:function(a,b){var z=new P.J(0,$.r,null,[null])
this.cN(new P.i8(null,z,b==null?1:3,a,b))
return z},
bk:function(a){var z,y
z=$.r
y=new P.J(0,z,null,this.$ti)
if(z!==C.f)z.toString
this.cN(new P.i8(null,y,8,a,null))
return y},
cN:function(a){var z,y
z=this.a
if(z<=1){a.a=this.c
this.c=a}else{if(z===2){y=this.c
if(!y.gcZ()){y.cN(a)
return}this.a=y.a
this.c=y.c}z=this.b
z.toString
P.bk(null,null,z,new P.oP(this,a))}},
er:function(a){var z,y,x,w,v
z={}
z.a=a
if(a==null)return
y=this.a
if(y<=1){x=this.c
this.c=a
if(x!=null){for(w=a;w.gd1()!=null;)w=w.a
w.a=x}}else{if(y===2){v=this.c
if(!v.gcZ()){v.er(a)
return}this.a=v.a
this.c=v.c}z.a=this.c2(a)
y=this.b
y.toString
P.bk(null,null,y,new P.oW(z,this))}},
c1:function(){var z=this.c
this.c=null
return this.c2(z)},
c2:function(a){var z,y,x
for(z=a,y=null;z!=null;y=z,z=x){x=z.gd1()
z.a=y}return y},
aj:function(a){var z,y
z=this.$ti
if(H.cz(a,"$isah",z,"$asah"))if(H.cz(a,"$isJ",z,null))P.dh(a,this)
else P.i9(a,this)
else{y=this.c1()
this.a=4
this.c=a
P.bz(this,y)}},
ak:[function(a,b){var z=this.c1()
this.a=8
this.c=new P.cO(a,b)
P.bz(this,z)},function(a){return this.ak(a,null)},"kQ","$2","$1","gaE",2,2,8],
b4:function(a){var z
if(H.cz(a,"$isah",this.$ti,"$asah")){this.i9(a)
return}this.a=1
z=this.b
z.toString
P.bk(null,null,z,new P.oR(this,a))},
i9:function(a){var z
if(H.cz(a,"$isJ",this.$ti,null)){if(a.a===8){this.a=1
z=this.b
z.toString
P.bk(null,null,z,new P.oV(this,a))}else P.dh(a,this)
return}P.i9(a,this)},
cO:function(a,b){var z
this.a=1
z=this.b
z.toString
P.bk(null,null,z,new P.oQ(this,a,b))},
$isah:1,
t:{
oO:function(a,b){var z=new P.J(0,$.r,null,[b])
z.a=4
z.c=a
return z},
i9:function(a,b){var z,y,x
b.a=1
try{a.cp(new P.oS(b),new P.oT(b))}catch(x){z=H.H(x)
y=H.W(x)
P.iR(new P.oU(b,z,y))}},
dh:function(a,b){var z,y,x
for(;a.giv();)a=a.c
z=a.gcZ()
y=b.c
if(z){b.c=null
x=b.c2(y)
b.a=a.a
b.c=a.c
P.bz(b,x)}else{b.a=2
b.c=a
a.er(y)}},
bz:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z={}
z.a=a
y={}
for(x=a;!0;w={},w.a=y.a,w.b=y.b,y=w){v=x.a===8
if(b==null){if(v){u=x.c
x=x.b
t=J.bN(u)
s=u.gan()
x.toString
P.bG(null,null,x,t,s)}return}for(;b.gd1()!=null;b=r){r=b.a
b.a=null
P.bz(z.a,b)}q=z.a.c
y.a=v
y.b=q
x=!v
if(!x||b.gfk()||b.gfj()){p=b.giO()
if(v){t=z.a.b
t.toString
t=t==null?p==null:t===p
if(!t)p.toString
else t=!0
t=!t}else t=!1
if(t){x=z.a
u=x.c
x=x.b
t=J.bN(u)
s=u.gan()
x.toString
P.bG(null,null,x,t,s)
return}o=$.r
if(o==null?p!=null:o!==p)$.r=p
else o=null
if(b.gfj())new P.oZ(z,y,v,b).$0()
else if(x){if(b.gfk())new P.oY(y,b,q).$0()}else if(b.gjM())new P.oX(z,y,b).$0()
if(o!=null)$.r=o
x=y.b
if(!!J.t(x).$isah){n=b.b
if(x.a>=4){m=n.c
n.c=null
b=n.c2(m)
n.a=x.a
n.c=x.c
z.a=x
continue}else P.dh(x,n)
return}}n=b.b
b=n.c1()
x=y.a
t=y.b
if(!x){n.a=4
n.c=t}else{n.a=8
n.c=t}z.a=n
x=n}}}},
oP:{"^":"h:1;a,b",
$0:function(){P.bz(this.a,this.b)},
$isi:1},
oW:{"^":"h:1;a,b",
$0:function(){P.bz(this.b,this.a.a)},
$isi:1},
oS:{"^":"h:0;a",
$1:function(a){var z=this.a
z.a=0
z.aj(a)},
$isi:1},
oT:{"^":"h:30;a",
$2:function(a,b){this.a.ak(a,b)},
$1:function(a){return this.$2(a,null)},
$isi:1},
oU:{"^":"h:1;a,b,c",
$0:function(){this.a.ak(this.b,this.c)},
$isi:1},
oR:{"^":"h:1;a,b",
$0:function(){var z,y
z=this.a
y=z.c1()
z.a=4
z.c=this.b
P.bz(z,y)},
$isi:1},
oV:{"^":"h:1;a,b",
$0:function(){P.dh(this.b,this.a)},
$isi:1},
oQ:{"^":"h:1;a,b,c",
$0:function(){this.a.ak(this.b,this.c)},
$isi:1},
oZ:{"^":"h:2;a,b,c,d",
$0:function(){var z,y,x,w,v,u,t
z=null
try{z=this.d.jL()}catch(w){y=H.H(w)
x=H.W(w)
if(this.c){v=J.bN(this.a.a.c)
u=y
u=v==null?u==null:v===u
v=u}else v=!1
u=this.b
if(v)u.b=this.a.a.c
else u.b=new P.cO(y,x)
u.a=!0
return}if(!!J.t(z).$isah){if(z instanceof P.J&&z.gaP()>=4){if(z.gaP()===8){v=this.b
v.b=z.giG()
v.a=!0}return}t=this.a.a
v=this.b
v.b=z.dF(new P.p_(t))
v.a=!1}},
$isi:1},
p_:{"^":"h:0;a",
$1:function(a){return this.a},
$isi:1},
oY:{"^":"h:2;a,b,c",
$0:function(){var z,y,x,w
try{this.a.b=this.b.jK(this.c)}catch(x){z=H.H(x)
y=H.W(x)
w=this.a
w.b=new P.cO(z,y)
w.a=!0}},
$isi:1},
oX:{"^":"h:2;a,b,c",
$0:function(){var z,y,x,w,v,u,t,s
try{z=this.a.a.c
w=this.c
if(w.ka(z)===!0&&w.e!=null){v=this.b
v.b=w.jG(z)
v.a=!1}}catch(u){y=H.H(u)
x=H.W(u)
w=this.a
v=J.bN(w.a.c)
t=y
s=this.b
if(v==null?t==null:v===t)s.b=w.a.c
else s.b=new P.cO(y,x)
s.a=!0}},
$isi:1},
i_:{"^":"e;j6:a<,aW:b*"},
ad:{"^":"e;$ti",
aL:function(a,b){return new P.pi(b,this,[H.S(this,"ad",0),null])},
af:function(a,b){var z,y
z={}
y=new P.J(0,$.r,null,[H.S(this,"ad",0)])
z.a=!1
z.b=null
z.c=null
z.c=this.U(new P.nI(z,this,b,y),!0,new P.nJ(z,y),y.gaE())
return y},
al:function(a,b,c){var z,y
z={}
y=new P.J(0,$.r,null,[null])
z.a=b
z.b=null
z.b=this.U(new P.nw(z,this,c,y),!0,new P.nx(z,y),y.gaE())
return y},
B:function(a,b){var z,y
z={}
y=new P.J(0,$.r,null,[P.aD])
z.a=null
z.a=this.U(new P.nq(z,this,b,y),!0,new P.nr(y),y.gaE())
return y},
F:function(a,b){var z,y
z={}
y=new P.J(0,$.r,null,[null])
z.a=null
z.a=this.U(new P.nA(z,this,b,y),!0,new P.nB(y),y.gaE())
return y},
gi:function(a){var z,y
z={}
y=new P.J(0,$.r,null,[P.m])
z.a=0
this.U(new P.nE(z),!0,new P.nF(z,y),y.gaE())
return y},
gE:function(a){var z,y
z={}
y=new P.J(0,$.r,null,[P.aD])
z.a=null
z.a=this.U(new P.nC(z,y),!0,new P.nD(y),y.gaE())
return y},
bJ:function(a){var z,y,x
z=H.S(this,"ad",0)
y=H.v([],[z])
x=new P.J(0,$.r,null,[[P.c,z]])
this.U(new P.nK(this,y),!0,new P.nL(y,x),x.gaE())
return x},
gv:function(a){var z,y
z={}
y=new P.J(0,$.r,null,[H.S(this,"ad",0)])
z.a=null
z.a=this.U(new P.ns(z,this,y),!0,new P.nt(y),y.gaE())
return y}},
nI:{"^":"h;a,b,c,d",
$1:function(a){var z=this.a
if(z.a)P.dm(new P.nG(z,this.c,a),new P.nH(z,this.b),P.dk(z.c,this.d))
else{z.b=a
z.a=!0}},
$S:function(){return H.aK(function(a){return{func:1,args:[a]}},this.b,"ad")},
$isi:1},
nG:{"^":"h:1;a,b,c",
$0:function(){return this.b.$2(this.a.b,this.c)},
$isi:1},
nH:{"^":"h;a,b",
$1:function(a){this.a.b=a},
$S:function(){return H.aK(function(a){return{func:1,args:[a]}},this.b,"ad")},
$isi:1},
nJ:{"^":"h:1;a,b",
$0:function(){var z,y,x,w
x=this.a
if(!x.a)try{x=H.a6()
throw H.b(x)}catch(w){z=H.H(w)
y=H.W(w)
P.it(this.b,z,y)}else this.b.aj(x.b)},
$isi:1},
nw:{"^":"h;a,b,c,d",
$1:function(a){var z=this.a
P.dm(new P.nu(z,this.c,a),new P.nv(z),P.dk(z.b,this.d))},
$S:function(){return H.aK(function(a){return{func:1,args:[a]}},this.b,"ad")},
$isi:1},
nu:{"^":"h:1;a,b,c",
$0:function(){return this.b.$2(this.a.a,this.c)},
$isi:1},
nv:{"^":"h;a",
$1:function(a){this.a.a=a},
$S:function(){return{func:1,args:[,]}},
$isi:1},
nx:{"^":"h:1;a,b",
$0:function(){this.b.aj(this.a.a)},
$isi:1},
nq:{"^":"h;a,b,c,d",
$1:function(a){var z,y
z=this.a
y=this.d
P.dm(new P.no(this.c,a),new P.np(z,y),P.dk(z.a,y))},
$S:function(){return H.aK(function(a){return{func:1,args:[a]}},this.b,"ad")},
$isi:1},
no:{"^":"h:1;a,b",
$0:function(){return J.E(this.b,this.a)},
$isi:1},
np:{"^":"h:36;a,b",
$1:function(a){if(a===!0)P.ew(this.a.a,this.b,!0)},
$isi:1},
nr:{"^":"h:1;a",
$0:function(){this.a.aj(!1)},
$isi:1},
nA:{"^":"h;a,b,c,d",
$1:function(a){P.dm(new P.ny(this.c,a),new P.nz(),P.dk(this.a.a,this.d))},
$S:function(){return H.aK(function(a){return{func:1,args:[a]}},this.b,"ad")},
$isi:1},
ny:{"^":"h:1;a,b",
$0:function(){return this.a.$1(this.b)},
$isi:1},
nz:{"^":"h:0;",
$1:function(a){},
$isi:1},
nB:{"^":"h:1;a",
$0:function(){this.a.aj(null)},
$isi:1},
nE:{"^":"h:0;a",
$1:function(a){++this.a.a},
$isi:1},
nF:{"^":"h:1;a,b",
$0:function(){this.b.aj(this.a.a)},
$isi:1},
nC:{"^":"h:0;a,b",
$1:function(a){P.ew(this.a.a,this.b,!1)},
$isi:1},
nD:{"^":"h:1;a",
$0:function(){this.a.aj(!0)},
$isi:1},
nK:{"^":"h;a,b",
$1:function(a){this.b.push(a)},
$S:function(){return H.aK(function(a){return{func:1,args:[a]}},this.a,"ad")},
$isi:1},
nL:{"^":"h:1;a,b",
$0:function(){this.b.aj(this.a)},
$isi:1},
ns:{"^":"h;a,b,c",
$1:function(a){P.ew(this.a.a,this.c,a)},
$S:function(){return H.aK(function(a){return{func:1,args:[a]}},this.b,"ad")},
$isi:1},
nt:{"^":"h:1;a",
$0:function(){var z,y,x,w
try{x=H.a6()
throw H.b(x)}catch(w){z=H.H(w)
y=H.W(w)
P.it(this.a,z,y)}},
$isi:1},
nn:{"^":"e;$ti"},
eu:{"^":"e;aP:b<,$ti",
giA:function(){if((this.b&8)===0)return this.a
return this.a.gcr()},
b8:function(){var z,y
if((this.b&8)===0){z=this.a
if(z==null){z=new P.ii(null,null,0,this.$ti)
this.a=z}return z}y=this.a
y.gcr()
return y.gcr()},
gc4:function(){if((this.b&8)!==0)return this.a.gcr()
return this.a},
b5:function(){if((this.b&4)!==0)return new P.x("Cannot add event after closing")
return new P.x("Cannot add event while adding a stream")},
eg:function(){var z=this.c
if(z==null){z=(this.b&2)!==0?$.$get$b2():new P.J(0,$.r,null,[null])
this.c=z}return z},
l:[function(a,b){var z=this.b
if(z>=4)throw H.b(this.b5())
if((z&1)!==0)this.ag(b)
else if((z&3)===0)this.b8().l(0,new P.by(b,null,this.$ti))},"$1","giR",2,0,function(){return H.aK(function(a){return{func:1,v:true,args:[a]}},this.$receiver,"eu")}],
ca:function(a){var z=this.b
if((z&4)!==0)return this.eg()
if(z>=4)throw H.b(this.b5())
z|=4
this.b=z
if((z&1)!==0)this.b9()
else if((z&3)===0)this.b8().l(0,C.q)
return this.eg()},
eG:function(a,b,c,d){var z,y,x,w,v
if((this.b&3)!==0)throw H.b(new P.x("Stream has already been listened to."))
z=$.r
y=d?1:0
x=new P.i4(this,null,null,null,z,y,null,null,this.$ti)
x.cK(a,b,c,d,H.B(this,0))
w=this.giA()
y=this.b|=1
if((y&8)!==0){v=this.a
v.scr(x)
v.at(0)}else this.a=x
x.iK(w)
x.cW(new P.py(this))
return x},
eu:function(a){var z,y,x,w,v,u
z=null
if((this.b&8)!==0)z=this.a.bb(0)
this.a=null
this.b=this.b&4294967286|2
w=this.r
if(w!=null)if(z==null)try{z=w.$0()}catch(v){y=H.H(v)
x=H.W(v)
u=new P.J(0,$.r,null,[null])
u.cO(y,x)
z=u}else z=z.bk(w)
w=new P.px(this)
if(z!=null)z=z.bk(w)
else w.$0()
return z},
ev:function(a){if((this.b&8)!==0)this.a.ae(0)
P.cy(this.e)},
ew:function(a){if((this.b&8)!==0)this.a.at(0)
P.cy(this.f)}},
py:{"^":"h:1;a",
$0:function(){P.cy(this.a.d)},
$isi:1},
px:{"^":"h:2;a",
$0:function(){var z=this.a.c
if(z!=null&&z.a===0)z.b4(null)},
$isi:1},
pJ:{"^":"e;",
ag:function(a){this.gc4().b3(0,a)},
b9:function(){this.gc4().e5()}},
ou:{"^":"e;$ti",
ag:function(a){this.gc4().bo(new P.by(a,null,[H.B(this,0)]))},
b9:function(){this.gc4().bo(C.q)}},
i0:{"^":"eu+ou;a,b,c,d,e,f,r,$ti"},
pI:{"^":"eu+pJ;a,b,c,d,e,f,r,$ti"},
bx:{"^":"pz;a,$ti",
gK:function(a){return(H.aU(this.a)^892482866)>>>0},
I:function(a,b){if(b==null)return!1
if(this===b)return!0
if(!(b instanceof P.bx))return!1
return b.a===this.a}},
i4:{"^":"c6;x,a,b,c,d,e,f,r,$ti",
d2:function(){return this.x.eu(this)},
bZ:[function(){this.x.ev(this)},"$0","gbY",0,0,2],
c0:[function(){this.x.ew(this)},"$0","gc_",0,0,2]},
c6:{"^":"e;aP:e<,$ti",
iK:function(a){if(a==null)return
this.r=a
if(!a.gE(a)){this.e=(this.e|64)>>>0
this.r.bO(this)}},
bH:function(a,b){var z=this.e
if((z&8)!==0)return
this.e=(z+128|4)>>>0
if(z<128&&this.r!=null)this.r.eX()
if((z&4)===0&&(this.e&32)===0)this.cW(this.gbY())},
ae:function(a){return this.bH(a,null)},
at:function(a){var z=this.e
if((z&8)!==0)return
if(z>=128){z-=128
this.e=z
if(z<128){if((z&64)!==0){z=this.r
z=!z.gE(z)}else z=!1
if(z)this.r.bO(this)
else{z=(this.e&4294967291)>>>0
this.e=z
if((z&32)===0)this.cW(this.gc_())}}}},
bb:function(a){var z=(this.e&4294967279)>>>0
this.e=z
if((z&8)===0)this.cQ()
z=this.f
return z==null?$.$get$b2():z},
cQ:function(){var z=(this.e|8)>>>0
this.e=z
if((z&64)!==0)this.r.eX()
if((this.e&32)===0)this.r=null
this.f=this.d2()},
b3:["hK",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.ag(b)
else this.bo(new P.by(b,null,[H.S(this,"c6",0)]))}],
cL:["hL",function(a,b){var z=this.e
if((z&8)!==0)return
if(z<32)this.eE(a,b)
else this.bo(new P.oD(a,b,null))}],
e5:function(){var z=this.e
if((z&8)!==0)return
z=(z|2)>>>0
this.e=z
if(z<32)this.b9()
else this.bo(C.q)},
bZ:[function(){},"$0","gbY",0,0,2],
c0:[function(){},"$0","gc_",0,0,2],
d2:function(){return},
bo:function(a){var z,y
z=this.r
if(z==null){z=new P.ii(null,null,0,[H.S(this,"c6",0)])
this.r=z}z.l(0,a)
y=this.e
if((y&64)===0){y=(y|64)>>>0
this.e=y
if(y<128)this.r.bO(this)}},
ag:function(a){var z=this.e
this.e=(z|32)>>>0
this.d.dE(this.a,a)
this.e=(this.e&4294967263)>>>0
this.cS((z&4)!==0)},
eE:function(a,b){var z,y
z=this.e
y=new P.oz(this,a,b)
if((z&1)!==0){this.e=(z|16)>>>0
this.cQ()
z=this.f
if(!!J.t(z).$isah&&z!==$.$get$b2())z.bk(y)
else y.$0()}else{y.$0()
this.cS((z&4)!==0)}},
b9:function(){var z,y
z=new P.oy(this)
this.cQ()
this.e=(this.e|16)>>>0
y=this.f
if(!!J.t(y).$isah&&y!==$.$get$b2())y.bk(z)
else z.$0()},
cW:function(a){var z=this.e
this.e=(z|32)>>>0
a.$0()
this.e=(this.e&4294967263)>>>0
this.cS((z&4)!==0)},
cS:function(a){var z,y
if((this.e&64)!==0){z=this.r
z=z.gE(z)}else z=!1
if(z){z=(this.e&4294967231)>>>0
this.e=z
if((z&4)!==0)if(z<128){z=this.r
z=z==null||z.gE(z)}else z=!1
else z=!1
if(z)this.e=(this.e&4294967291)>>>0}for(;!0;a=y){z=this.e
if((z&8)!==0){this.r=null
return}y=(z&4)!==0
if(a===y)break
this.e=(z^32)>>>0
if(y)this.bZ()
else this.c0()
this.e=(this.e&4294967263)>>>0}z=this.e
if((z&64)!==0&&z<128)this.r.bO(this)},
cK:function(a,b,c,d,e){var z,y
z=a==null?P.qd():a
y=this.d
y.toString
this.a=z
this.b=P.iu(b==null?P.qe():b,y)
this.c=c==null?P.iD():c}},
oz:{"^":"h:2;a,b,c",
$0:function(){var z,y,x,w,v,u
z=this.a
y=z.e
if((y&8)!==0&&(y&16)===0)return
z.e=(y|32)>>>0
y=z.b
x=H.bl(y,{func:1,args:[P.e,P.bu]})
w=z.d
v=this.b
u=z.b
if(x)w.kz(u,v,this.c)
else w.dE(u,v)
z.e=(z.e&4294967263)>>>0},
$isi:1},
oy:{"^":"h:2;a",
$0:function(){var z,y
z=this.a
y=z.e
if((y&16)===0)return
z.e=(y|42)>>>0
z.d.dC(z.c)
z.e=(z.e&4294967263)>>>0},
$isi:1},
pz:{"^":"ad;$ti",
U:function(a,b,c,d){return this.a.eG(a,d,c,!0===b)},
ci:function(a,b,c){return this.U(a,null,b,c)},
dm:function(a){return this.U(a,null,null,null)}},
i5:{"^":"e;aW:a*"},
by:{"^":"i5;A:b>,a,$ti",
dw:function(a){a.ag(this.b)}},
oD:{"^":"i5;a9:b>,an:c<,a",
dw:function(a){a.eE(this.b,this.c)}},
oC:{"^":"e;",
dw:function(a){a.b9()},
gaW:function(a){return},
saW:function(a,b){throw H.b(new P.x("No events after a done."))}},
pm:{"^":"e;aP:a<",
bO:function(a){var z=this.a
if(z===1)return
if(z>=1){this.a=1
return}P.iR(new P.pn(this,a))
this.a=1},
eX:function(){if(this.a===1)this.a=3}},
pn:{"^":"h:1;a,b",
$0:function(){var z,y,x,w
z=this.a
y=z.a
z.a=0
if(y===3)return
x=z.b
w=J.eX(x)
z.b=w
if(w==null)z.c=null
x.dw(this.b)},
$isi:1},
ii:{"^":"pm;b,c,a,$ti",
gE:function(a){return this.c==null},
l:function(a,b){var z=this.c
if(z==null){this.c=b
this.b=b}else{J.jz(z,b)
this.c=b}}},
oE:{"^":"e;a,aP:b<,c,$ti",
eC:function(){if((this.b&2)!==0)return
var z=this.a
z.toString
P.bk(null,null,z,this.giJ())
this.b=(this.b|2)>>>0},
bH:function(a,b){this.b+=4},
ae:function(a){return this.bH(a,null)},
at:function(a){var z=this.b
if(z>=4){z-=4
this.b=z
if(z<4&&(z&1)===0)this.eC()}},
bb:function(a){return $.$get$b2()},
b9:[function(){var z=(this.b&4294967293)>>>0
this.b=z
if(z>=4)return
this.b=(z|1)>>>0
z=this.c
if(z!=null)this.a.dC(z)},"$0","giJ",0,0,2]},
pA:{"^":"e;a,b,c,$ti"},
pU:{"^":"h:1;a,b,c",
$0:function(){return this.a.ak(this.b,this.c)},
$isi:1},
pT:{"^":"h:10;a,b",
$2:function(a,b){P.pS(this.a,this.b,a,b)},
$isi:1},
pV:{"^":"h:1;a,b",
$0:function(){return this.a.aj(this.b)},
$isi:1},
er:{"^":"ad;$ti",
U:function(a,b,c,d){return this.ig(a,d,c,!0===b)},
ci:function(a,b,c){return this.U(a,null,b,c)},
ig:function(a,b,c,d){return P.oN(this,a,b,c,d,H.S(this,"er",0),H.S(this,"er",1))},
em:function(a,b){b.b3(0,a)},
iq:function(a,b,c){c.cL(a,b)},
$asad:function(a,b){return[b]}},
i7:{"^":"c6;x,y,a,b,c,d,e,f,r,$ti",
b3:function(a,b){if((this.e&2)!==0)return
this.hK(0,b)},
cL:function(a,b){if((this.e&2)!==0)return
this.hL(a,b)},
bZ:[function(){var z=this.y
if(z==null)return
z.ae(0)},"$0","gbY",0,0,2],
c0:[function(){var z=this.y
if(z==null)return
z.at(0)},"$0","gc_",0,0,2],
d2:function(){var z=this.y
if(z!=null){this.y=null
return z.bb(0)}return},
kR:[function(a){this.x.em(a,this)},"$1","gim",2,0,function(){return H.aK(function(a,b){return{func:1,v:true,args:[a]}},this.$receiver,"i7")}],
kT:[function(a,b){this.x.iq(a,b,this)},"$2","gip",4,0,16],
kS:[function(){this.e5()},"$0","gio",0,0,2],
i3:function(a,b,c,d,e,f,g){this.y=this.x.a.ci(this.gim(),this.gio(),this.gip())},
$asc6:function(a,b){return[b]},
t:{
oN:function(a,b,c,d,e,f,g){var z,y
z=$.r
y=e?1:0
y=new P.i7(a,null,null,null,null,z,y,null,null,[f,g])
y.cK(b,c,d,e,g)
y.i3(a,b,c,d,e,f,g)
return y}}},
pi:{"^":"er;b,a,$ti",
em:function(a,b){var z,y,x,w
z=null
try{z=this.b.$1(a)}catch(w){y=H.H(w)
x=H.W(w)
P.pP(b,y,x)
return}b.b3(0,z)}},
cO:{"^":"e;a9:a>,an:b<",
k:function(a){return H.j(this.a)},
$isaa:1},
pO:{"^":"e;"},
q6:{"^":"h:1;a,b",
$0:function(){var z,y,x
z=this.a
y=z.a
if(y==null){x=new P.d8()
z.a=x
z=x}else z=y
y=this.b
if(y==null)throw H.b(z)
x=H.b(z)
x.stack=J.a5(y)
throw x},
$isi:1},
pp:{"^":"pO;",
dC:function(a){var z,y,x,w
try{if(C.f===$.r){x=a.$0()
return x}x=P.iw(null,null,this,a)
return x}catch(w){z=H.H(w)
y=H.W(w)
x=P.bG(null,null,this,z,y)
return x}},
dE:function(a,b){var z,y,x,w
try{if(C.f===$.r){x=a.$1(b)
return x}x=P.iy(null,null,this,a,b)
return x}catch(w){z=H.H(w)
y=H.W(w)
x=P.bG(null,null,this,z,y)
return x}},
kz:function(a,b,c){var z,y,x,w
try{if(C.f===$.r){x=a.$2(b,c)
return x}x=P.ix(null,null,this,a,b,c)
return x}catch(w){z=H.H(w)
y=H.W(w)
x=P.bG(null,null,this,z,y)
return x}},
dc:function(a,b){if(b)return new P.pq(this,a)
else return new P.pr(this,a)},
j5:function(a,b){return new P.ps(this,a)},
h:function(a,b){return},
fS:function(a){if($.r===C.f)return a.$0()
return P.iw(null,null,this,a)},
dD:function(a,b){if($.r===C.f)return a.$1(b)
return P.iy(null,null,this,a,b)},
ky:function(a,b,c){if($.r===C.f)return a.$2(b,c)
return P.ix(null,null,this,a,b,c)}},
pq:{"^":"h:1;a,b",
$0:function(){return this.a.dC(this.b)},
$isi:1},
pr:{"^":"h:1;a,b",
$0:function(){return this.a.fS(this.b)},
$isi:1},
ps:{"^":"h:0;a,b",
$1:function(a){return this.a.dE(this.b,a)},
$isi:1}}],["","",,P,{"^":"",
h5:function(a,b){return new H.Q(0,null,null,null,null,null,0,[a,b])},
cX:function(){return new H.Q(0,null,null,null,null,null,0,[null,null])},
al:function(a){return H.qC(a,new H.Q(0,null,null,null,null,null,0,[null,null]))},
m1:function(a,b,c){var z,y
if(P.eB(a)){if(b==="("&&c===")")return"(...)"
return b+"..."+c}z=[]
y=$.$get$cc()
y.push(a)
try{P.q0(a,z)}finally{if(0>=y.length)return H.a(y,-1)
y.pop()}y=P.hD(b,z,", ")+c
return y.charCodeAt(0)==0?y:y},
cV:function(a,b,c){var z,y,x
if(P.eB(a))return b+"..."+c
z=new P.bv(b)
y=$.$get$cc()
y.push(a)
try{x=z
x.L=P.hD(x.gL(),a,", ")}finally{if(0>=y.length)return H.a(y,-1)
y.pop()}y=z
y.L=y.gL()+c
y=z.gL()
return y.charCodeAt(0)==0?y:y},
eB:function(a){var z,y
for(z=0;y=$.$get$cc(),z<y.length;++z)if(a===y[z])return!0
return!1},
q0:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=a.gJ(a)
y=0
x=0
while(!0){if(!(y<80||x<3))break
if(!z.u())return
w=H.j(z.gD())
b.push(w)
y+=w.length+2;++x}if(!z.u()){if(x<=5)return
if(0>=b.length)return H.a(b,-1)
v=b.pop()
if(0>=b.length)return H.a(b,-1)
u=b.pop()}else{t=z.gD();++x
if(!z.u()){if(x<=4){b.push(H.j(t))
return}v=H.j(t)
if(0>=b.length)return H.a(b,-1)
u=b.pop()
y+=v.length+2}else{s=z.gD();++x
for(;z.u();t=s,s=r){r=z.gD();++x
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
h4:function(a,b,c,d,e){return new H.Q(0,null,null,null,null,null,0,[d,e])},
mj:function(a,b,c){var z=P.h4(null,null,null,b,c)
J.eP(a,new P.qn(z))
return z},
h6:function(a,b,c,d,e){var z=P.h4(null,null,null,d,e)
P.mr(z,a,b,c)
return z},
ai:function(a,b,c,d){return new P.pb(0,null,null,null,null,null,0,[d])},
h7:function(a,b){var z,y,x
z=P.ai(null,null,null,b)
for(y=a.length,x=0;x<a.length;a.length===y||(0,H.D)(a),++x)z.l(0,a[x])
return z},
e8:function(a){var z,y,x
z={}
if(P.eB(a))return"{...}"
y=new P.bv("")
try{$.$get$cc().push(a)
x=y
x.L=x.gL()+"{"
z.a=!0
a.F(0,new P.ms(z,y))
z=y
z.L=z.gL()+"}"}finally{z=$.$get$cc()
if(0>=z.length)return H.a(z,-1)
z.pop()}z=y.gL()
return z.charCodeAt(0)==0?z:z},
tR:[function(a){return a},"$1","qo",2,0,0],
mr:function(a,b,c,d){var z,y
for(z=J.av(b);z.u();){y=z.gD()
a.j(0,P.qo().$1(y),d.$1(y))}},
ig:{"^":"Q;a,b,c,d,e,f,r,$ti",
bC:function(a){return H.qZ(a)&0x3ffffff},
bD:function(a,b){var z,y,x
if(a==null)return-1
z=a.length
for(y=0;y<z;++y){x=a[y].gfm()
if(x==null?b==null:x===b)return y}return-1},
t:{
aJ:function(a,b){return new P.ig(0,null,null,null,null,null,0,[a,b])}}},
pb:{"^":"p1;a,b,c,d,e,f,r,$ti",
gJ:function(a){var z=new P.aY(this,this.r,null,null)
z.c=this.e
return z},
gi:function(a){return this.a},
gE:function(a){return this.a===0},
gY:function(a){return this.a!==0},
B:function(a,b){var z,y
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null)return!1
return z[b]!=null}else if(typeof b==="number"&&(b&0x3ffffff)===b){y=this.c
if(y==null)return!1
return y[b]!=null}else return this.ie(b)},
ie:function(a){var z=this.d
if(z==null)return!1
return this.bU(z[this.bT(a)],a)>=0},
dr:function(a){var z
if(!(typeof a==="string"&&a!=="__proto__"))z=typeof a==="number"&&(a&0x3ffffff)===a
else z=!0
if(z)return this.B(0,a)?a:null
else return this.iw(a)},
iw:function(a){var z,y,x
z=this.d
if(z==null)return
y=z[this.bT(a)]
x=this.bU(y,a)
if(x<0)return
return J.af(y,x).gef()},
F:function(a,b){var z,y
z=this.e
y=this.r
for(;z!=null;){b.$1(z.a)
if(y!==this.r)throw H.b(new P.T(this))
z=z.b}},
gv:function(a){var z=this.e
if(z==null)throw H.b(new P.x("No elements"))
return z.a},
l:function(a,b){var z,y,x
if(typeof b==="string"&&b!=="__proto__"){z=this.b
if(z==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.b=y
z=y}return this.e7(z,b)}else if(typeof b==="number"&&(b&0x3ffffff)===b){x=this.c
if(x==null){y=Object.create(null)
y["<non-identifier-key>"]=y
delete y["<non-identifier-key>"]
this.c=y
x=y}return this.e7(x,b)}else return this.aq(0,b)},
aq:function(a,b){var z,y,x
z=this.d
if(z==null){z=P.pd()
this.d=z}y=this.bT(b)
x=z[y]
if(x==null)z[y]=[this.cT(b)]
else{if(this.bU(x,b)>=0)return!1
x.push(this.cT(b))}return!0},
W:function(a,b){if(typeof b==="string"&&b!=="__proto__")return this.e8(this.b,b)
else if(typeof b==="number"&&(b&0x3ffffff)===b)return this.e8(this.c,b)
else return this.iD(0,b)},
iD:function(a,b){var z,y,x
z=this.d
if(z==null)return!1
y=z[this.bT(b)]
x=this.bU(y,b)
if(x<0)return!1
this.e9(y.splice(x,1)[0])
return!0},
bc:function(a){if(this.a>0){this.f=null
this.e=null
this.d=null
this.c=null
this.b=null
this.a=0
this.r=this.r+1&67108863}},
e7:function(a,b){if(a[b]!=null)return!1
a[b]=this.cT(b)
return!0},
e8:function(a,b){var z
if(a==null)return!1
z=a[b]
if(z==null)return!1
this.e9(z)
delete a[b]
return!0},
cT:function(a){var z,y
z=new P.pc(a,null,null)
if(this.e==null){this.f=z
this.e=z}else{y=this.f
z.c=y
y.b=z
this.f=z}++this.a
this.r=this.r+1&67108863
return z},
e9:function(a){var z,y
z=a.gic()
y=a.b
if(z==null)this.e=y
else z.b=y
if(y==null)this.f=z
else y.c=z;--this.a
this.r=this.r+1&67108863},
bT:function(a){return J.a8(a)&0x3ffffff},
bU:function(a,b){var z,y
if(a==null)return-1
z=a.length
for(y=0;y<z;++y)if(J.E(a[y].gef(),b))return y
return-1},
$isd:1,
$asd:null,
t:{
pd:function(){var z=Object.create(null)
z["<non-identifier-key>"]=z
delete z["<non-identifier-key>"]
return z}}},
pc:{"^":"e;ef:a<,b,ic:c<"},
aY:{"^":"e;a,b,c,d",
gD:function(){return this.d},
u:function(){var z=this.a
if(this.b!==z.r)throw H.b(new P.T(z))
else{z=this.c
if(z==null){this.d=null
return!1}else{this.d=z.a
this.c=z.b
return!0}}}},
p1:{"^":"n9;$ti"},
qn:{"^":"h:4;a",
$2:function(a,b){this.a.j(0,a,b)},
$isi:1},
b4:{"^":"mG;$ti"},
mG:{"^":"e+I;",$isd:1,$asd:null,$isc:1,$asc:null},
I:{"^":"e;$ti",
gJ:function(a){return new H.e5(a,this.gi(a),0,null)},
w:function(a,b){return this.h(a,b)},
F:function(a,b){var z,y
z=this.gi(a)
for(y=0;y<z;++y){b.$1(this.h(a,y))
if(z!==this.gi(a))throw H.b(new P.T(a))}},
gE:function(a){return this.gi(a)===0},
gY:function(a){return!this.gE(a)},
gv:function(a){if(this.gi(a)===0)throw H.b(H.a6())
return this.h(a,0)},
B:function(a,b){var z,y
z=this.gi(a)
for(y=0;y<this.gi(a);++y){if(J.E(this.h(a,y),b))return!0
if(z!==this.gi(a))throw H.b(new P.T(a))}return!1},
aL:function(a,b){return new H.d1(a,b,[H.S(a,"I",0),null])},
af:function(a,b){var z,y,x
z=this.gi(a)
if(z===0)throw H.b(H.a6())
y=this.h(a,0)
for(x=1;x<z;++x){y=b.$2(y,this.h(a,x))
if(z!==this.gi(a))throw H.b(new P.T(a))}return y},
al:function(a,b,c){var z,y,x
z=this.gi(a)
for(y=b,x=0;x<z;++x){y=c.$2(y,this.h(a,x))
if(z!==this.gi(a))throw H.b(new P.T(a))}return y},
hz:function(a,b){return H.nN(a,b,null,H.S(a,"I",0))},
aX:function(a,b){var z,y,x
z=H.v([],[H.S(a,"I",0)])
C.a.si(z,this.gi(a))
for(y=0;y<this.gi(a);++y){x=this.h(a,y)
if(y>=z.length)return H.a(z,y)
z[y]=x}return z},
bJ:function(a){return this.aX(a,!0)},
l:function(a,b){var z=this.gi(a)
this.si(a,z+1)
this.j(a,z,b)},
V:["e2",function(a,b,c,d,e){var z,y,x,w,v
P.ee(b,c,this.gi(a),null,null,null)
z=c-b
if(z===0)return
if(H.cz(d,"$isc",[H.S(a,"I",0)],"$asc")){y=e
x=d}else{x=J.jC(d,e).aX(0,!1)
y=0}w=J.G(x)
if(y+z>w.gi(x))throw H.b(H.fZ())
if(y<b)for(v=z-1;v>=0;--v)this.j(a,b+v,w.h(x,y+v))
else for(v=0;v<z;++v)this.j(a,b+v,w.h(x,y+v))},function(a,b,c,d){return this.V(a,b,c,d,0)},"aC",null,null,"gkM",6,2,null],
cD:function(a,b,c){var z,y,x
if(!!J.t(c).$isc)this.aC(a,b,b+c.length,c)
else for(z=c.length,y=0;y<z;++y,b=x){x=b+1
this.j(a,b,c[y])}},
k:function(a){return P.cV(a,"[","]")},
$isd:1,
$asd:null,
$isc:1,
$asc:null},
pM:{"^":"e;",
j:function(a,b,c){throw H.b(new P.o("Cannot modify unmodifiable map"))},
$isM:1,
$asM:null},
mp:{"^":"e;",
h:function(a,b){return this.a.h(0,b)},
j:function(a,b,c){this.a.j(0,b,c)},
O:function(a,b){return this.a.O(0,b)},
F:function(a,b){this.a.F(0,b)},
gE:function(a){var z=this.a
return z.gE(z)},
gY:function(a){var z=this.a
return z.gY(z)},
gi:function(a){var z=this.a
return z.gi(z)},
gT:function(a){var z=this.a
return z.gT(z)},
k:function(a){return this.a.k(0)},
$isM:1,
$asM:null},
oj:{"^":"mp+pM;a,$ti",$isM:1,$asM:null},
ms:{"^":"h:4;a,b",
$2:function(a,b){var z,y
z=this.a
if(!z.a)this.b.L+=", "
z.a=!1
z=this.b
y=z.L+=H.j(a)
z.L=y+": "
z.L+=H.j(b)},
$isi:1},
mk:{"^":"b5;a,b,c,d,$ti",
gJ:function(a){return new P.pe(this,this.c,this.d,this.b,null)},
F:function(a,b){var z,y,x
z=this.d
for(y=this.b;y!==this.c;y=(y+1&this.a.length-1)>>>0){x=this.a
if(y<0||y>=x.length)return H.a(x,y)
b.$1(x[y])
if(z!==this.d)H.C(new P.T(this))}},
gE:function(a){return this.b===this.c},
gi:function(a){return(this.c-this.b&this.a.length-1)>>>0},
gv:function(a){var z,y
z=this.b
if(z===this.c)throw H.b(H.a6())
y=this.a
if(z>=y.length)return H.a(y,z)
return y[z]},
w:function(a,b){var z,y,x,w
z=(this.c-this.b&this.a.length-1)>>>0
if(typeof b!=="number")return H.l(b)
if(0>b||b>=z)H.C(P.L(b,this,"index",null,z))
y=this.a
x=y.length
w=(this.b+b&x-1)>>>0
if(w<0||w>=x)return H.a(y,w)
return y[w]},
l:function(a,b){this.aq(0,b)},
bc:function(a){var z,y,x,w,v
z=this.b
y=this.c
if(z!==y){for(x=this.a,w=x.length,v=w-1;z!==y;z=(z+1&v)>>>0){if(z<0||z>=w)return H.a(x,z)
x[z]=null}this.c=0
this.b=0;++this.d}},
k:function(a){return P.cV(this,"{","}")},
fP:function(){var z,y,x,w
z=this.b
if(z===this.c)throw H.b(H.a6());++this.d
y=this.a
x=y.length
if(z>=x)return H.a(y,z)
w=y[z]
y[z]=null
this.b=(z+1&x-1)>>>0
return w},
aq:function(a,b){var z,y,x
z=this.a
y=this.c
x=z.length
if(y<0||y>=x)return H.a(z,y)
z[y]=b
x=(y+1&x-1)>>>0
this.c=x
if(this.b===x)this.el();++this.d},
el:function(){var z,y,x,w
z=new Array(this.a.length*2)
z.fixed$length=Array
y=H.v(z,this.$ti)
z=this.a
x=this.b
w=z.length-x
C.a.V(y,0,w,z,x)
C.a.V(y,w,w+this.b,this.a,0)
this.b=0
this.c=this.a.length
this.a=y},
hT:function(a,b){var z=new Array(8)
z.fixed$length=Array
this.a=H.v(z,[b])},
$asd:null,
t:{
e6:function(a,b){var z=new P.mk(null,0,0,0,[b])
z.hT(a,b)
return z}}},
pe:{"^":"e;a,b,c,d,e",
gD:function(){return this.e},
u:function(){var z,y,x
z=this.a
if(this.c!==z.d)H.C(new P.T(z))
y=this.d
if(y===this.b){this.e=null
return!1}z=z.a
x=z.length
if(y>=x)return H.a(z,y)
this.e=z[y]
this.d=(y+1&x-1)>>>0
return!0}},
na:{"^":"e;$ti",
gE:function(a){return this.a===0},
gY:function(a){return this.a!==0},
a3:function(a,b){var z
for(z=J.av(b);z.u();)this.l(0,z.gD())},
aL:function(a,b){return new H.dR(this,b,[H.B(this,0),null])},
k:function(a){return P.cV(this,"{","}")},
F:function(a,b){var z
for(z=new P.aY(this,this.r,null,null),z.c=this.e;z.u();)b.$1(z.d)},
af:function(a,b){var z,y
z=new P.aY(this,this.r,null,null)
z.c=this.e
if(!z.u())throw H.b(H.a6())
y=z.d
for(;z.u();)y=b.$2(y,z.d)
return y},
al:function(a,b,c){var z,y
for(z=new P.aY(this,this.r,null,null),z.c=this.e,y=b;z.u();)y=c.$2(y,z.d)
return y},
dl:function(a,b){var z,y
z=new P.aY(this,this.r,null,null)
z.c=this.e
if(!z.u())return""
if(b===""){y=""
do y+=H.j(z.d)
while(z.u())}else{y=H.j(z.d)
for(;z.u();)y=y+b+H.j(z.d)}return y.charCodeAt(0)==0?y:y},
gv:function(a){var z=new P.aY(this,this.r,null,null)
z.c=this.e
if(!z.u())throw H.b(H.a6())
return z.d},
w:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.b(P.f6("index"))
if(b<0)H.C(P.a7(b,0,null,"index",null))
for(z=new P.aY(this,this.r,null,null),z.c=this.e,y=0;z.u();){x=z.d
if(b===y)return x;++y}throw H.b(P.L(b,this,"index",null,y))},
$isd:1,
$asd:null},
n9:{"^":"na;$ti"}}],["","",,P,{"^":"",
dl:function(a){var z
if(a==null)return
if(typeof a!="object")return a
if(Object.getPrototypeOf(a)!==Array.prototype)return new P.p4(a,Object.create(null),null)
for(z=0;z<a.length;++z)a[z]=P.dl(a[z])
return a},
q5:function(a,b){var z,y,x,w
if(typeof a!=="string")throw H.b(H.a1(a))
z=null
try{z=JSON.parse(a)}catch(x){y=H.H(x)
w=String(y)
throw H.b(new P.cn(w,null,null))}w=P.dl(z)
return w},
wc:[function(a){return a.l_()},"$1","qy",2,0,0],
p4:{"^":"e;a,b,c",
h:function(a,b){var z,y
z=this.b
if(z==null)return this.c.h(0,b)
else if(typeof b!=="string")return
else{y=z[b]
return typeof y=="undefined"?this.iC(b):y}},
gi:function(a){var z
if(this.b==null){z=this.c
z=z.gi(z)}else z=this.aF().length
return z},
gE:function(a){var z
if(this.b==null){z=this.c
z=z.gi(z)}else z=this.aF().length
return z===0},
gY:function(a){var z
if(this.b==null){z=this.c
z=z.gi(z)}else z=this.aF().length
return z>0},
gT:function(a){var z
if(this.b==null){z=this.c
return z.gT(z)}return new P.p5(this)},
j:function(a,b,c){var z,y
if(this.b==null)this.c.j(0,b,c)
else if(this.O(0,b)){z=this.b
z[b]=c
y=this.a
if(y==null?z!=null:y!==z)y[b]=null}else this.iM().j(0,b,c)},
O:function(a,b){if(this.b==null)return this.c.O(0,b)
if(typeof b!=="string")return!1
return Object.prototype.hasOwnProperty.call(this.a,b)},
F:function(a,b){var z,y,x,w
if(this.b==null)return this.c.F(0,b)
z=this.aF()
for(y=0;y<z.length;++y){x=z[y]
w=this.b[x]
if(typeof w=="undefined"){w=P.dl(this.a[x])
this.b[x]=w}b.$2(x,w)
if(z!==this.c)throw H.b(new P.T(this))}},
k:function(a){return P.e8(this)},
aF:function(){var z=this.c
if(z==null){z=Object.keys(this.a)
this.c=z}return z},
iM:function(){var z,y,x,w,v
if(this.b==null)return this.c
z=P.h5(P.p,null)
y=this.aF()
for(x=0;w=y.length,x<w;++x){v=y[x]
z.j(0,v,this.h(0,v))}if(w===0)y.push(null)
else C.a.si(y,0)
this.b=null
this.a=null
this.c=z
return z},
iC:function(a){var z
if(!Object.prototype.hasOwnProperty.call(this.a,a))return
z=P.dl(this.a[a])
return this.b[a]=z},
$isM:1,
$asM:function(){return[P.p,null]}},
p5:{"^":"b5;a",
gi:function(a){var z=this.a
if(z.b==null){z=z.c
z=z.gi(z)}else z=z.aF().length
return z},
w:function(a,b){var z=this.a
if(z.b==null)z=z.gT(z).w(0,b)
else{z=z.aF()
if(b>>>0!==b||b>=z.length)return H.a(z,b)
z=z[b]}return z},
gJ:function(a){var z=this.a
if(z.b==null){z=z.gT(z)
z=z.gJ(z)}else{z=z.aF()
z=new J.ck(z,z.length,0,null)}return z},
B:function(a,b){return this.a.O(0,b)},
$asd:function(){return[P.p]},
$asb5:function(){return[P.p]},
$asa_:function(){return[P.p]}},
ke:{"^":"e;"},
bR:{"^":"e;$ti"},
e4:{"^":"aa;a,b",
k:function(a){if(this.b!=null)return"Converting object to an encodable object failed."
else return"Converting object did not return an encodable object."}},
mc:{"^":"e4;a,b",
k:function(a){return"Cyclic error in JSON stringify"}},
mb:{"^":"ke;a,b",
jm:function(a,b){var z=P.q5(a,this.gjn().a)
return z},
jl:function(a){return this.jm(a,null)},
jz:function(a,b){var z=this.gjA()
z=P.p8(a,z.b,z.a)
return z},
jy:function(a){return this.jz(a,null)},
gjA:function(){return C.Y},
gjn:function(){return C.X}},
me:{"^":"bR;a,b",
$asbR:function(){return[P.e,P.p]}},
md:{"^":"bR;a",
$asbR:function(){return[P.p,P.e]}},
p9:{"^":"e;",
hc:function(a){var z,y,x,w,v,u
z=J.G(a)
y=z.gi(a)
if(typeof y!=="number")return H.l(y)
x=0
w=0
for(;w<y;++w){v=z.be(a,w)
if(v>92)continue
if(v<32){if(w>x)this.dK(a,x,w)
x=w+1
this.a6(92)
switch(v){case 8:this.a6(98)
break
case 9:this.a6(116)
break
case 10:this.a6(110)
break
case 12:this.a6(102)
break
case 13:this.a6(114)
break
default:this.a6(117)
this.a6(48)
this.a6(48)
u=v>>>4&15
this.a6(u<10?48+u:87+u)
u=v&15
this.a6(u<10?48+u:87+u)
break}}else if(v===34||v===92){if(w>x)this.dK(a,x,w)
x=w+1
this.a6(92)
this.a6(v)}}if(x===0)this.aa(a)
else if(x<y)this.dK(a,x,y)},
cR:function(a){var z,y,x,w
for(z=this.a,y=z.length,x=0;x<y;++x){w=z[x]
if(a==null?w==null:a===w)throw H.b(new P.mc(a,null))}z.push(a)},
ct:function(a){var z,y,x,w
if(this.hb(a))return
this.cR(a)
try{z=this.b.$1(a)
if(!this.hb(z))throw H.b(new P.e4(a,null))
x=this.a
if(0>=x.length)return H.a(x,-1)
x.pop()}catch(w){y=H.H(w)
throw H.b(new P.e4(a,y))}},
hb:function(a){var z,y
if(typeof a==="number"){if(!isFinite(a))return!1
this.kJ(a)
return!0}else if(a===!0){this.aa("true")
return!0}else if(a===!1){this.aa("false")
return!0}else if(a==null){this.aa("null")
return!0}else if(typeof a==="string"){this.aa('"')
this.hc(a)
this.aa('"')
return!0}else{z=J.t(a)
if(!!z.$isc){this.cR(a)
this.kH(a)
z=this.a
if(0>=z.length)return H.a(z,-1)
z.pop()
return!0}else if(!!z.$isM){this.cR(a)
y=this.kI(a)
z=this.a
if(0>=z.length)return H.a(z,-1)
z.pop()
return y}else return!1}},
kH:function(a){var z,y
this.aa("[")
z=J.G(a)
if(z.gi(a)>0){this.ct(z.h(a,0))
for(y=1;y<z.gi(a);++y){this.aa(",")
this.ct(z.h(a,y))}}this.aa("]")},
kI:function(a){var z,y,x,w,v,u
z={}
y=J.G(a)
if(y.gE(a)){this.aa("{}")
return!0}x=y.gi(a)
if(typeof x!=="number")return x.H()
x*=2
w=new Array(x)
z.a=0
z.b=!0
y.F(a,new P.pa(z,w))
if(!z.b)return!1
this.aa("{")
for(v='"',u=0;u<x;u+=2,v=',"'){this.aa(v)
this.hc(w[u])
this.aa('":')
y=u+1
if(y>=x)return H.a(w,y)
this.ct(w[y])}this.aa("}")
return!0}},
pa:{"^":"h:4;a,b",
$2:function(a,b){var z,y,x,w,v
if(typeof a!=="string")this.a.b=!1
z=this.b
y=this.a
x=y.a
w=x+1
y.a=w
v=z.length
if(x>=v)return H.a(z,x)
z[x]=a
y.a=w+1
if(w>=v)return H.a(z,w)
z[w]=b},
$isi:1},
p6:{"^":"p9;c,a,b",
kJ:function(a){this.c.av(0,C.b.k(a))},
aa:function(a){this.c.av(0,a)},
dK:function(a,b,c){this.c.av(0,J.jF(a,b,c))},
a6:function(a){this.c.a6(a)},
t:{
p8:function(a,b,c){var z,y
z=new P.bv("")
P.p7(a,z,b,c)
y=z.L
return y.charCodeAt(0)==0?y:y},
p7:function(a,b,c,d){var z=new P.p6(b,[],P.qy())
z.ct(a)}}}}],["","",,P,{"^":"",
fz:function(a){if(typeof a==="number"||typeof a==="boolean"||null==a)return J.a5(a)
if(typeof a==="string")return JSON.stringify(a)
return P.kF(a)},
kF:function(a){var z=J.t(a)
if(!!z.$ish)return z.k(a)
return H.d9(a)},
bs:function(a){return new P.oM(a)},
bY:function(a,b,c,d){var z,y,x
if(c){if(a<0)H.C(P.ag("Length must be a non-negative integer: "+a))
z=H.v(new Array(a),[d])}else z=J.m3(a,d)
if(a!==0&&!0)for(y=z.length,x=0;x<y;++x)z[x]=b
return z},
Y:function(a,b,c){var z,y
z=H.v([],[c])
for(y=J.av(a);y.u();)z.push(y.gD())
if(b)return z
z.fixed$length=Array
return z},
aS:function(a,b,c,d){var z,y,x
z=H.v([],[d])
C.a.si(z,a)
for(y=0;y<a;++y){x=b.$1(y)
if(y>=z.length)return H.a(z,y)
z[y]=x}return z},
bK:function(a){H.r4(H.j(a))},
eg:function(a,b,c){return new H.m8(a,H.h3(a,!1,b,!1),null,null)},
aD:{"^":"e;"},
"+bool":0,
cl:{"^":"e;iN:a<,b",
I:function(a,b){if(b==null)return!1
if(!(b instanceof P.cl))return!1
return this.a===b.a&&this.b===b.b},
aS:function(a,b){return C.c.aS(this.a,b.giN())},
gK:function(a){var z=this.a
return(z^C.c.c3(z,30))&1073741823},
k:function(a){var z,y,x,w,v,u,t
z=P.ks(H.mY(this))
y=P.cm(H.mW(this))
x=P.cm(H.mS(this))
w=P.cm(H.mT(this))
v=P.cm(H.mV(this))
u=P.cm(H.mX(this))
t=P.kt(H.mU(this))
if(this.b)return z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t+"Z"
else return z+"-"+y+"-"+x+" "+w+":"+v+":"+u+"."+t},
l:function(a,b){return P.kr(this.a+b.gjN(),this.b)},
gkb:function(){return this.a},
e3:function(a,b){var z
if(!(Math.abs(this.a)>864e13))z=!1
else z=!0
if(z)throw H.b(P.ag(this.gkb()))},
t:{
kr:function(a,b){var z=new P.cl(a,b)
z.e3(a,b)
return z},
ks:function(a){var z,y
z=Math.abs(a)
y=a<0?"-":""
if(z>=1000)return""+a
if(z>=100)return y+"0"+H.j(z)
if(z>=10)return y+"00"+H.j(z)
return y+"000"+H.j(z)},
kt:function(a){if(a>=100)return""+a
if(a>=10)return"0"+a
return"00"+a},
cm:function(a){if(a>=10)return""+a
return"0"+a}}},
K:{"^":"aq;"},
"+double":0,
aP:{"^":"e;b7:a<",
N:function(a,b){return new P.aP(this.a+b.gb7())},
a2:function(a,b){return new P.aP(this.a-b.gb7())},
H:function(a,b){if(typeof b!=="number")return H.l(b)
return new P.aP(C.b.Z(this.a*b))},
cI:function(a,b){if(b===0)throw H.b(new P.l5())
if(typeof b!=="number")return H.l(b)
return new P.aP(C.c.cI(this.a,b))},
aw:function(a,b){return C.c.aw(this.a,b.gb7())},
aM:function(a,b){return C.c.aM(this.a,b.gb7())},
cB:function(a,b){return C.c.cB(this.a,b.gb7())},
gjN:function(){return C.c.aG(this.a,1000)},
I:function(a,b){if(b==null)return!1
if(!(b instanceof P.aP))return!1
return this.a===b.a},
gK:function(a){return this.a&0x1FFFFFFF},
aS:function(a,b){return C.c.aS(this.a,b.gb7())},
k:function(a){var z,y,x,w,v
z=new P.kz()
y=this.a
if(y<0)return"-"+new P.aP(0-y).k(0)
x=z.$1(C.c.aG(y,6e7)%60)
w=z.$1(C.c.aG(y,1e6)%60)
v=new P.ky().$1(y%1e6)
return""+C.c.aG(y,36e8)+":"+H.j(x)+":"+H.j(w)+"."+H.j(v)},
eN:function(a){return new P.aP(Math.abs(this.a))},
aN:function(a){return new P.aP(0-this.a)}},
ky:{"^":"h:11;",
$1:function(a){if(a>=1e5)return""+a
if(a>=1e4)return"0"+a
if(a>=1000)return"00"+a
if(a>=100)return"000"+a
if(a>=10)return"0000"+a
return"00000"+a},
$isi:1},
kz:{"^":"h:11;",
$1:function(a){if(a>=10)return""+a
return"0"+a},
$isi:1},
aa:{"^":"e;",
gan:function(){return H.W(this.$thrownJsError)}},
d8:{"^":"aa;",
k:function(a){return"Throw of null."}},
aN:{"^":"aa;a,b,C:c>,P:d>",
gcV:function(){return"Invalid argument"+(!this.a?"(s)":"")},
gcU:function(){return""},
k:function(a){var z,y,x,w,v,u
z=this.c
y=z!=null?" ("+z+")":""
z=this.d
x=z==null?"":": "+H.j(z)
w=this.gcV()+y+x
if(!this.a)return w
v=this.gcU()
u=P.fz(this.b)
return w+v+": "+H.j(u)},
t:{
ag:function(a){return new P.aN(!1,null,null,a)},
cN:function(a,b,c){return new P.aN(!0,a,b,c)},
f6:function(a){return new P.aN(!1,null,a,"Must not be null")}}},
hr:{"^":"aN;e,f,a,b,c,d",
gcV:function(){return"RangeError"},
gcU:function(){var z,y,x
z=this.e
if(z==null){z=this.f
y=z!=null?": Not less than or equal to "+H.j(z):""}else{x=this.f
if(x==null)y=": Not greater than or equal to "+H.j(z)
else if(x>z)y=": Not in range "+H.j(z)+".."+H.j(x)+", inclusive"
else y=x<z?": Valid value range is empty":": Only valid value is "+H.j(z)}return y},
t:{
c0:function(a,b,c){return new P.hr(null,null,!0,a,b,"Value not in range")},
a7:function(a,b,c,d,e){return new P.hr(b,c,!0,a,d,"Invalid value")},
ee:function(a,b,c,d,e,f){if(0>a||a>c)throw H.b(P.a7(a,0,c,"start",f))
if(b!=null){if(a>b||b>c)throw H.b(P.a7(b,a,c,"end",f))
return b}return c}}},
l1:{"^":"aN;e,i:f>,a,b,c,d",
gcV:function(){return"RangeError"},
gcU:function(){if(J.bo(this.b,0))return": index must not be negative"
var z=this.f
if(z===0)return": no indices are valid"
return": index should be less than "+H.j(z)},
t:{
L:function(a,b,c,d,e){var z=e!=null?e:J.a4(b)
return new P.l1(b,z,!0,a,c,"Index out of range")}}},
o:{"^":"aa;P:a>",
k:function(a){return"Unsupported operation: "+this.a}},
c5:{"^":"aa;P:a>",
k:function(a){var z=this.a
return z!=null?"UnimplementedError: "+H.j(z):"UnimplementedError"}},
x:{"^":"aa;P:a>",
k:function(a){return"Bad state: "+this.a}},
T:{"^":"aa;a",
k:function(a){var z=this.a
if(z==null)return"Concurrent modification during iteration."
return"Concurrent modification during iteration: "+H.j(P.fz(z))+"."}},
mI:{"^":"e;",
k:function(a){return"Out of Memory"},
gan:function(){return},
$isaa:1},
hB:{"^":"e;",
k:function(a){return"Stack Overflow"},
gan:function(){return},
$isaa:1},
kq:{"^":"aa;a",
k:function(a){var z=this.a
return z==null?"Reading static variable during its initialization":"Reading static variable '"+H.j(z)+"' during its initialization"}},
oM:{"^":"e;P:a>",
k:function(a){var z=this.a
if(z==null)return"Exception"
return"Exception: "+H.j(z)},
$isbU:1},
cn:{"^":"e;P:a>,b,c",
k:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=this.a
y=z!=null&&""!==z?"FormatException: "+H.j(z):"FormatException"
x=this.c
w=this.b
if(typeof w!=="string")return x!=null?y+(" (at offset "+H.j(x)+")"):y
if(x!=null)z=x<0||x>w.length
else z=!1
if(z)x=null
if(x==null){if(w.length>78)w=C.d.b0(w,0,75)+"..."
return y+"\n"+w}for(v=1,u=0,t=!1,s=0;s<x;++s){r=C.d.bp(w,s)
if(r===10){if(u!==s||!t)++v
u=s+1
t=!1}else if(r===13){++v
u=s+1
t=!0}}y=v>1?y+(" (at line "+v+", character "+(x-u+1)+")\n"):y+(" (at character "+(x+1)+")\n")
q=w.length
for(s=x;s<w.length;++s){r=C.d.be(w,s)
if(r===10||r===13){q=s
break}}if(q-u>78)if(x-u<75){p=u+75
o=u
n=""
m="..."}else{if(q-x<75){o=q-75
p=q
m=""}else{o=x-36
p=x+36
m="..."}n="..."}else{p=q
o=u
n=""
m=""}l=C.d.b0(w,o,p)
return y+n+l+m+"\n"+C.d.H(" ",x-o+n.length)+"^\n"},
$isbU:1},
l5:{"^":"e;",
k:function(a){return"IntegerDivisionByZeroException"},
$isbU:1},
kG:{"^":"e;C:a>,eo",
k:function(a){return"Expando:"+H.j(this.a)},
h:function(a,b){var z,y
z=this.eo
if(typeof z!=="string"){if(b==null||typeof b==="boolean"||typeof b==="number"||typeof b==="string")H.C(P.cN(b,"Expandos are not allowed on strings, numbers, booleans or null",null))
return z.get(b)}y=H.eb(b,"expando$values")
return y==null?null:H.eb(y,z)},
j:function(a,b,c){var z,y
z=this.eo
if(typeof z!=="string")z.set(b,c)
else{y=H.eb(b,"expando$values")
if(y==null){y=new P.e()
H.hq(b,"expando$values",y)}H.hq(y,z,c)}}},
m:{"^":"aq;"},
"+int":0,
a_:{"^":"e;$ti",
aL:function(a,b){return H.d0(this,b,H.S(this,"a_",0),null)},
dI:["hH",function(a,b){return new H.ep(this,b,[H.S(this,"a_",0)])}],
B:function(a,b){var z
for(z=this.gJ(this);z.u();)if(J.E(z.gD(),b))return!0
return!1},
F:function(a,b){var z
for(z=this.gJ(this);z.u();)b.$1(z.gD())},
af:function(a,b){var z,y
z=this.gJ(this)
if(!z.u())throw H.b(H.a6())
y=z.gD()
for(;z.u();)y=b.$2(y,z.gD())
return y},
al:function(a,b,c){var z,y
for(z=this.gJ(this),y=b;z.u();)y=c.$2(y,z.gD())
return y},
aX:function(a,b){return P.Y(this,!0,H.S(this,"a_",0))},
bJ:function(a){return this.aX(a,!0)},
gi:function(a){var z,y
z=this.gJ(this)
for(y=0;z.u();)++y
return y},
gE:function(a){return!this.gJ(this).u()},
gY:function(a){return!this.gE(this)},
gv:function(a){var z=this.gJ(this)
if(!z.u())throw H.b(H.a6())
return z.gD()},
gaZ:function(a){var z,y
z=this.gJ(this)
if(!z.u())throw H.b(H.a6())
y=z.gD()
if(z.u())throw H.b(H.m2())
return y},
w:function(a,b){var z,y,x
if(typeof b!=="number"||Math.floor(b)!==b)throw H.b(P.f6("index"))
if(b<0)H.C(P.a7(b,0,null,"index",null))
for(z=this.gJ(this),y=0;z.u();){x=z.gD()
if(b===y)return x;++y}throw H.b(P.L(b,this,"index",null,y))},
k:function(a){return P.m1(this,"(",")")}},
cW:{"^":"e;"},
c:{"^":"e;$ti",$isd:1,$asd:null,$asc:null},
"+List":0,
M:{"^":"e;$ti",$asM:null},
d7:{"^":"e;",
gK:function(a){return P.e.prototype.gK.call(this,this)},
k:function(a){return"null"}},
"+Null":0,
aq:{"^":"e;"},
"+num":0,
e:{"^":";",
I:function(a,b){return this===b},
gK:function(a){return H.aU(this)},
k:function(a){return H.d9(this)},
toString:function(){return this.k(this)}},
mt:{"^":"e;"},
bu:{"^":"e;"},
hC:{"^":"e;a,b",
e0:function(a){var z,y
if(this.b!=null){z=this.a
y=J.an($.b9.$0(),this.b)
if(typeof y!=="number")return H.l(y)
this.a=z+y
this.b=null}}},
p:{"^":"e;"},
"+String":0,
bv:{"^":"e;L<",
gi:function(a){return this.L.length},
gE:function(a){return this.L.length===0},
gY:function(a){return this.L.length!==0},
av:function(a,b){this.L+=H.j(b)},
a6:function(a){this.L+=H.n_(a)},
k:function(a){var z=this.L
return z.charCodeAt(0)==0?z:z},
t:{
hD:function(a,b,c){var z=J.av(b)
if(!z.u())return a
if(c.length===0){do a+=H.j(z.gD())
while(z.u())}else{a+=H.j(z.gD())
for(;z.u();)a=a+c+H.j(z.gD())}return a}}}}],["","",,W,{"^":"",
f5:function(a){var z=document.createElement("a")
return z},
fa:function(a,b,c){var z={}
z.type=b
return new self.Blob(a,z)},
fk:function(a){return a.replace(/^-ms-/,"ms-").replace(/-([\da-z])/ig,function(b,c){return c.toUpperCase()})},
kC:function(a,b,c){var z,y
z=document.body
y=(z&&C.x).az(z,a,b,c)
y.toString
z=new H.ep(new W.az(y),new W.qm(),[W.y])
return z.gaZ(z)},
t4:[function(a){return"wheel"},"$1","qH",2,0,38],
bT:function(a){var z,y,x
z="element tag unavailable"
try{y=J.jo(a)
if(typeof y==="string")z=a.tagName}catch(x){H.H(x)}return z},
V:function(a){var z,y,x
y=document.createElement("input")
z=y
if(a!=null)try{J.jB(z,a)}catch(x){H.H(x)}return z},
mH:function(a,b,c,d){var z=new Option(a,b,c,!1)
return z},
bi:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
id:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
eC:function(a){var z=$.r
if(z===C.f)return a
return z.j5(a,!0)},
A:{"^":"a9;","%":"HTMLBRElement|HTMLContentElement|HTMLDListElement|HTMLDataListElement|HTMLDetailsElement|HTMLDialogElement|HTMLDirectoryElement|HTMLFontElement|HTMLFrameElement|HTMLHeadElement|HTMLHeadingElement|HTMLHtmlElement|HTMLLabelElement|HTMLLegendElement|HTMLMarqueeElement|HTMLModElement|HTMLOptGroupElement|HTMLParagraphElement|HTMLPictureElement|HTMLPreElement|HTMLQuoteElement|HTMLShadowElement|HTMLSpanElement|HTMLTableCaptionElement|HTMLTableCellElement|HTMLTableColElement|HTMLTableDataCellElement|HTMLTableHeaderCellElement|HTMLTitleElement|HTMLTrackElement|HTMLUListElement|HTMLUnknownElement;HTMLElement"},
rn:{"^":"A;p:type%,cf:href}",
k:function(a){return String(a)},
$isf:1,
"%":"HTMLAnchorElement"},
rr:{"^":"ab;P:message=","%":"ApplicationCacheErrorEvent"},
rs:{"^":"A;cf:href}",
k:function(a){return String(a)},
$isf:1,
"%":"HTMLAreaElement"},
b_:{"^":"f;",$ise:1,"%":"AudioTrack"},
rv:{"^":"fD;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.L(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(new P.o("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.o("Cannot resize immutable List."))},
gv:function(a){if(a.length>0)return a[0]
throw H.b(new P.x("No elements"))},
w:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isu:1,
$asu:function(){return[W.b_]},
$isd:1,
$asd:function(){return[W.b_]},
$isw:1,
$asw:function(){return[W.b_]},
$isc:1,
$asc:function(){return[W.b_]},
"%":"AudioTrackList"},
fA:{"^":"z+I;",$isd:1,
$asd:function(){return[W.b_]},
$isc:1,
$asc:function(){return[W.b_]}},
fD:{"^":"fA+U;",$isd:1,
$asd:function(){return[W.b_]},
$isc:1,
$asc:function(){return[W.b_]}},
rw:{"^":"A;cf:href}","%":"HTMLBaseElement"},
rx:{"^":"z;aV:level=","%":"BatteryManager"},
dL:{"^":"f;p:type=",$isdL:1,"%":";Blob"},
rz:{"^":"ab;M:data=","%":"BlobEvent"},
dM:{"^":"A;",$isf:1,$isdM:1,"%":"HTMLBodyElement"},
k4:{"^":"A;C:name=,p:type%,A:value%","%":"HTMLButtonElement"},
k5:{"^":"A;a_:height},a1:width}",
hg:function(a,b,c){return a.getContext(b)},
dO:function(a,b){return this.hg(a,b,null)},
"%":"HTMLCanvasElement"},
rA:{"^":"f;k7:lineWidth}",
j4:function(a){return a.beginPath()},
j7:function(a,b,c,d,e){return a.clearRect(b,c,d,e)},
kv:function(a){return a.restore()},
hi:function(a){return a.save()},
kO:function(a,b){return a.stroke(b)},
hF:function(a){return a.stroke()},
k6:function(a,b,c){return a.lineTo(b,c)},
ke:function(a,b,c){return a.moveTo(b,c)},
hv:function(a,b,c,d,e){a.strokeStyle="rgba("+b+", "+c+", "+d+", "+e+")"},
hu:function(a,b,c,d){return this.hv(a,b,c,d,1)},
"%":"CanvasRenderingContext2D"},
rB:{"^":"y;M:data=,i:length=",$isf:1,"%":"CDATASection|CharacterData|Comment|ProcessingInstruction|Text"},
rD:{"^":"f;",
aB:function(a,b){return a.get(b)},
"%":"Clients"},
rE:{"^":"dc;M:data=","%":"CompositionEvent"},
rF:{"^":"z;",$isf:1,"%":"CompositorWorker"},
rG:{"^":"f;bR:speed=","%":"Coordinates"},
rH:{"^":"f;C:name=,p:type=","%":"Credential|FederatedCredential|PasswordCredential"},
rI:{"^":"f;",
aB:function(a,b){var z=a.get(P.qs(b,null))
return z},
"%":"CredentialsContainer"},
rJ:{"^":"f;p:type=","%":"CryptoKey"},
rK:{"^":"ao;aD:style=","%":"CSSFontFaceRule"},
rL:{"^":"ao;aD:style=","%":"CSSKeyframeRule|MozCSSKeyframeRule|WebKitCSSKeyframeRule"},
rM:{"^":"ao;C:name=","%":"CSSKeyframesRule|MozCSSKeyframesRule|WebKitCSSKeyframesRule"},
rN:{"^":"ao;aD:style=","%":"CSSPageRule"},
ao:{"^":"f;p:type=",$ise:1,"%":"CSSCharsetRule|CSSGroupingRule|CSSImportRule|CSSMediaRule|CSSNamespaceRule|CSSSupportsRule;CSSRule"},
kn:{"^":"l6;i:length=",
hh:function(a,b){var z=this.il(a,b)
return z!=null?z:""},
il:function(a,b){if(W.fk(b) in a)return a.getPropertyValue(b)
else return a.getPropertyValue(P.ft()+b)},
bP:function(a,b,c,d){var z=this.i8(a,b)
a.setProperty(z,c,d)
return},
i8:function(a,b){var z,y
z=$.$get$fl()
y=z[b]
if(typeof y==="string")return y
y=W.fk(b) in a?b:P.ft()+b
z[b]=y
return y},
sbx:function(a,b){a.color=b},
gas:function(a){return a.position},
"%":"CSS2Properties|CSSStyleDeclaration|MSStyleCSSProperties"},
l6:{"^":"f+ko;"},
ko:{"^":"e;",
sbx:function(a,b){this.bP(a,"color",b,"")},
gas:function(a){return this.hh(a,"position")}},
rO:{"^":"ao;aD:style=","%":"CSSStyleRule"},
rP:{"^":"ao;aD:style=","%":"CSSViewportRule"},
rR:{"^":"f;p:type=","%":"DataTransferItem"},
rS:{"^":"f;i:length=",
eP:function(a,b,c){return a.add(b,c)},
l:function(a,b){return a.add(b)},
h:function(a,b){return a[b]},
"%":"DataTransferItemList"},
rU:{"^":"f;m:x=,n:y=,R:z=","%":"DeviceAcceleration"},
rV:{"^":"ab;A:value=","%":"DeviceLightEvent"},
ku:{"^":"A;","%":"HTMLDivElement"},
rW:{"^":"y;fb:domain=","%":"Document|HTMLDocument|XMLDocument"},
rX:{"^":"y;",$isf:1,"%":"DocumentFragment|ShadowRoot"},
rY:{"^":"f;P:message=,C:name=","%":"DOMError|FileError"},
rZ:{"^":"f;P:message=",
gC:function(a){var z=a.name
if(P.fu()===!0&&z==="SECURITY_ERR")return"SecurityError"
if(P.fu()===!0&&z==="SYNTAX_ERR")return"SyntaxError"
return z},
k:function(a){return String(a)},
"%":"DOMException"},
t_:{"^":"f;",
fw:[function(a,b){return a.next(b)},function(a){return a.next()},"kf","$1","$0","gaW",0,2,24],
"%":"Iterator"},
t0:{"^":"kv;",
gay:function(a){return a.b},
"%":"DOMMatrix"},
kv:{"^":"f;",
gay:function(a){return a.b},
"%":";DOMMatrixReadOnly"},
t1:{"^":"kw;",
gm:function(a){return a.x},
gn:function(a){return a.y},
gR:function(a){return a.z},
"%":"DOMPoint"},
kw:{"^":"f;",
gm:function(a){return a.x},
gn:function(a){return a.y},
gR:function(a){return a.z},
"%":";DOMPointReadOnly"},
kx:{"^":"f;",
k:function(a){return"Rectangle ("+H.j(a.left)+", "+H.j(a.top)+") "+H.j(this.ga1(a))+" x "+H.j(this.ga_(a))},
I:function(a,b){var z
if(b==null)return!1
z=J.t(b)
if(!z.$isac)return!1
return a.left===z.gbG(b)&&a.top===z.gbK(b)&&this.ga1(a)===z.ga1(b)&&this.ga_(a)===z.ga_(b)},
gK:function(a){var z,y,x,w
z=a.left
y=a.top
x=this.ga1(a)
w=this.ga_(a)
return W.id(W.bi(W.bi(W.bi(W.bi(0,z&0x1FFFFFFF),y&0x1FFFFFFF),x&0x1FFFFFFF),w&0x1FFFFFFF))},
gdd:function(a){return a.bottom},
ga_:function(a){return a.height},
gbG:function(a){return a.left},
gdB:function(a){return a.right},
gbK:function(a){return a.top},
ga1:function(a){return a.width},
gm:function(a){return a.x},
gn:function(a){return a.y},
$isac:1,
$asac:I.ae,
"%":";DOMRectReadOnly"},
t2:{"^":"lr;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.L(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(new P.o("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.o("Cannot resize immutable List."))},
gv:function(a){if(a.length>0)return a[0]
throw H.b(new P.x("No elements"))},
w:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isu:1,
$asu:function(){return[P.p]},
$isd:1,
$asd:function(){return[P.p]},
$isw:1,
$asw:function(){return[P.p]},
$isc:1,
$asc:function(){return[P.p]},
"%":"DOMStringList"},
l7:{"^":"f+I;",$isd:1,
$asd:function(){return[P.p]},
$isc:1,
$asc:function(){return[P.p]}},
lr:{"^":"l7+U;",$isd:1,
$asd:function(){return[P.p]},
$isc:1,
$asc:function(){return[P.p]}},
t3:{"^":"f;i:length=,A:value=",
l:function(a,b){return a.add(b)},
B:function(a,b){return a.contains(b)},
"%":"DOMTokenList"},
oA:{"^":"b4;cX:a<,b",
B:function(a,b){return J.eM(this.b,b)},
gE:function(a){return this.a.firstElementChild==null},
gi:function(a){return this.b.length},
h:function(a,b){var z=this.b
if(b>>>0!==b||b>=z.length)return H.a(z,b)
return z[b]},
j:function(a,b,c){var z=this.b
if(b>>>0!==b||b>=z.length)return H.a(z,b)
this.a.replaceChild(c,z[b])},
si:function(a,b){throw H.b(new P.o("Cannot resize element lists"))},
l:function(a,b){this.a.appendChild(b)
return b},
gJ:function(a){var z=this.bJ(this)
return new J.ck(z,z.length,0,null)},
V:function(a,b,c,d,e){throw H.b(new P.c5(null))},
aC:function(a,b,c,d){return this.V(a,b,c,d,0)},
gv:function(a){var z=this.a.firstElementChild
if(z==null)throw H.b(new P.x("No elements"))
return z},
$asd:function(){return[W.a9]},
$asb4:function(){return[W.a9]},
$asc:function(){return[W.a9]}},
a9:{"^":"y;aD:style=,eq:namespaceURI=,kA:tagName=",
gj3:function(a){return new W.oF(a)},
gc8:function(a){return new W.oA(a,a.children)},
gbw:function(a){return new W.oG(a)},
gbd:function(a){return P.n3(a.clientLeft,a.clientTop,a.clientWidth,a.clientHeight,null)},
k:function(a){return a.localName},
az:["cH",function(a,b,c,d){var z,y,x,w,v
if(c==null){z=$.fy
if(z==null){z=H.v([],[W.hg])
y=new W.hh(z)
z.push(W.ib(null))
z.push(W.il())
$.fy=y
d=y}else d=z
z=$.fx
if(z==null){z=new W.im(d)
$.fx=z
c=z}else{z.a=d
c=z}}if($.aQ==null){z=document
y=z.implementation.createHTMLDocument("")
$.aQ=y
$.dS=y.createRange()
y=$.aQ
y.toString
x=y.createElement("base")
J.jv(x,z.baseURI)
$.aQ.head.appendChild(x)}z=$.aQ
if(z.body==null){z.toString
y=z.createElement("body")
z.body=y}z=$.aQ
if(!!this.$isdM)w=z.body
else{y=a.tagName
z.toString
w=z.createElement(y)
$.aQ.body.appendChild(w)}if("createContextualFragment" in window.Range.prototype&&!C.a.B(C.a5,a.tagName)){$.dS.selectNodeContents(w)
v=$.dS.createContextualFragment(b)}else{w.innerHTML=b
v=$.aQ.createDocumentFragment()
for(;z=w.firstChild,z!=null;)v.appendChild(z)}z=$.aQ.body
if(w==null?z!=null:w!==z)J.f1(w)
c.dU(v)
document.adoptNode(v)
return v},function(a,b,c){return this.az(a,b,c,null)},"jj",null,null,"gkV",2,5,null],
ht:function(a,b,c,d){a.textContent=null
a.appendChild(this.az(a,b,c,d))},
dX:function(a,b){return this.ht(a,b,null,null)},
gdv:function(a){return new W.X(a,"change",!1,[W.ab])},
gfz:function(a){return new W.X(a,"click",!1,[W.a2])},
gfA:function(a){return new W.X(a,"mousedown",!1,[W.a2])},
gfB:function(a){return new W.X(a,"mousemove",!1,[W.a2])},
gfC:function(a){return new W.X(a,"mouseout",!1,[W.a2])},
gfD:function(a){return new W.X(a,"mouseup",!1,[W.a2])},
gfE:function(a){return new W.X(a,W.qH().$1(a),!1,[W.cw])},
gfI:function(a){return new W.X(a,"touchcancel",!1,[W.ay])},
gfJ:function(a){return new W.X(a,"touchend",!1,[W.ay])},
gfK:function(a){return new W.X(a,"touchmove",!1,[W.ay])},
gfL:function(a){return new W.X(a,"touchstart",!1,[W.ay])},
$isf:1,
$ise:1,
$isa9:1,
$isz:1,
$isy:1,
"%":";Element"},
qm:{"^":"h:0;",
$1:function(a){return!!J.t(a).$isa9},
$isi:1},
t5:{"^":"A;a_:height},C:name=,p:type%,a1:width}","%":"HTMLEmbedElement"},
t6:{"^":"f;C:name=",
ir:function(a,b,c){return a.remove(H.as(b,0),H.as(c,1))},
co:function(a){var z,y
z=new P.J(0,$.r,null,[null])
y=new P.bw(z,[null])
this.ir(a,new W.kD(y),new W.kE(y))
return z},
"%":"DirectoryEntry|Entry|FileEntry"},
kD:{"^":"h:1;a",
$0:function(){this.a.ja(0)},
$isi:1},
kE:{"^":"h:0;a",
$1:function(a){this.a.cb(a)},
$isi:1},
t7:{"^":"ab;a9:error=,P:message=","%":"ErrorEvent"},
ab:{"^":"f;p:type=",
kj:function(a){return a.preventDefault()},
"%":"AnimationEvent|AnimationPlayerEvent|AudioProcessingEvent|AutocompleteErrorEvent|BeforeInstallPromptEvent|BeforeUnloadEvent|ClipboardEvent|CloseEvent|CustomEvent|DeviceMotionEvent|DeviceOrientationEvent|FontFaceSetLoadEvent|GamepadEvent|GeofencingEvent|HashChangeEvent|IDBVersionChangeEvent|MIDIConnectionEvent|MediaEncryptedEvent|MediaQueryListEvent|MediaStreamEvent|MediaStreamTrackEvent|OfflineAudioCompletionEvent|PageTransitionEvent|PopStateEvent|PresentationConnectionAvailableEvent|ProgressEvent|PromiseRejectionEvent|RTCDTMFToneChangeEvent|RTCDataChannelEvent|RTCIceCandidateEvent|RTCPeerConnectionIceEvent|RelatedEvent|ResourceProgressEvent|SecurityPolicyViolationEvent|SpeechRecognitionEvent|StorageEvent|TrackEvent|TransitionEvent|USBConnectionEvent|WebGLContextEvent|WebKitTransitionEvent;Event|InputEvent"},
z:{"^":"f;",
iT:function(a,b,c,d){if(c!=null)this.i7(a,b,c,!1)},
kp:function(a,b,c,d){if(c!=null)this.iE(a,b,c,!1)},
i7:function(a,b,c,d){return a.addEventListener(b,H.as(c,1),!1)},
iE:function(a,b,c,d){return a.removeEventListener(b,H.as(c,1),!1)},
$ise:1,
$isz:1,
"%":"Animation|ApplicationCache|AudioContext|BluetoothDevice|BluetoothRemoteGATTCharacteristic|CanvasCaptureMediaStreamTrack|CrossOriginServiceWorkerClient|DOMApplicationCache|EventSource|MIDIAccess|MediaQueryList|MediaRecorder|MediaSource|MediaStream|MediaStreamTrack|MessagePort|OfflineAudioContext|OfflineResourceList|Performance|PermissionStatus|PresentationReceiver|PresentationRequest|RTCDTMFSender|RTCPeerConnection|ServicePortCollection|ServiceWorkerContainer|ServiceWorkerRegistration|SpeechRecognition|SpeechSynthesis|SpeechSynthesisUtterance|USB|WorkerPerformance|mozRTCPeerConnection|webkitAudioContext|webkitRTCPeerConnection;EventTarget;fA|fD|fB|fE|fC|fF"},
fH:{"^":"ab;","%":"FetchEvent|InstallEvent|NotificationEvent|ServicePortConnectEvent|SyncEvent;ExtendableEvent"},
t8:{"^":"fH;M:data=","%":"ExtendableMessageEvent"},
tr:{"^":"A;C:name=,p:type=","%":"HTMLFieldSetElement"},
aH:{"^":"dL;C:name=",$ise:1,$isaH:1,"%":"File"},
dU:{"^":"ls;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.L(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(new P.o("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.o("Cannot resize immutable List."))},
gv:function(a){if(a.length>0)return a[0]
throw H.b(new P.x("No elements"))},
w:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isu:1,
$asu:function(){return[W.aH]},
$isd:1,
$asd:function(){return[W.aH]},
$isw:1,
$asw:function(){return[W.aH]},
$isc:1,
$asc:function(){return[W.aH]},
$isdU:1,
"%":"FileList"},
l8:{"^":"f+I;",$isd:1,
$asd:function(){return[W.aH]},
$isc:1,
$asc:function(){return[W.aH]}},
ls:{"^":"l8+U;",$isd:1,
$asd:function(){return[W.aH]},
$isc:1,
$asc:function(){return[W.aH]}},
kH:{"^":"z;a9:error=",
gkw:function(a){var z,y
z=a.result
if(!!J.t(z).$isfd){H.ex(z,0,null)
y=new Uint8Array(z,0)
return y}return z},
"%":"FileReader"},
ts:{"^":"f;p:type=","%":"Stream"},
tt:{"^":"f;C:name=","%":"DOMFileSystem"},
tu:{"^":"z;a9:error=,i:length=,as:position=",
av:function(a,b){return a.write(b)},
"%":"FileWriter"},
tw:{"^":"f;aD:style=","%":"FontFace"},
tx:{"^":"z;",
l:function(a,b){return a.add(b)},
kW:function(a,b,c){return a.forEach(H.as(b,3),c)},
F:function(a,b){b=H.as(b,3)
return a.forEach(b)},
"%":"FontFaceSet"},
tz:{"^":"f;",
aB:function(a,b){return a.get(b)},
"%":"FormData"},
tA:{"^":"A;i:length=,C:name=","%":"HTMLFormElement"},
b3:{"^":"f;bf:index=",$ise:1,"%":"Gamepad"},
tB:{"^":"f;A:value=","%":"GamepadButton"},
tC:{"^":"A;bx:color}","%":"HTMLHRElement"},
tD:{"^":"f;i:length=","%":"History"},
tE:{"^":"lt;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.L(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(new P.o("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.o("Cannot resize immutable List."))},
gv:function(a){if(a.length>0)return a[0]
throw H.b(new P.x("No elements"))},
w:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isu:1,
$asu:function(){return[W.y]},
$isd:1,
$asd:function(){return[W.y]},
$isw:1,
$asw:function(){return[W.y]},
$isc:1,
$asc:function(){return[W.y]},
"%":"HTMLCollection|HTMLFormControlsCollection|HTMLOptionsCollection"},
l9:{"^":"f+I;",$isd:1,
$asd:function(){return[W.y]},
$isc:1,
$asc:function(){return[W.y]}},
lt:{"^":"l9+U;",$isd:1,
$asd:function(){return[W.y]},
$isc:1,
$asc:function(){return[W.y]}},
tF:{"^":"l0;",
ac:function(a,b){return a.send(b)},
"%":"XMLHttpRequest"},
l0:{"^":"z;","%":"XMLHttpRequestUpload;XMLHttpRequestEventTarget"},
tG:{"^":"A;a_:height},C:name=,a1:width}","%":"HTMLIFrameElement"},
fT:{"^":"f;M:data=",$isfT:1,"%":"ImageData"},
tH:{"^":"A;a_:height},a1:width}",
ad:function(a,b){return a.complete.$1(b)},
"%":"HTMLImageElement"},
l3:{"^":"A;iQ:accept},jC:files=,a_:height},ds:max},ft:min},C:name=,hD:step},p:type%,A:value%,a1:width}",$isf:1,$isa9:1,"%":"HTMLInputElement"},
tL:{"^":"A;C:name=,p:type=","%":"HTMLKeygenElement"},
tM:{"^":"A;A:value%","%":"HTMLLIElement"},
mf:{"^":"em;",
l:function(a,b){return a.add(b)},
"%":"CalcLength;LengthValue"},
tO:{"^":"A;cf:href},p:type%","%":"HTMLLinkElement"},
tP:{"^":"f;",
k:function(a){return String(a)},
"%":"Location"},
tQ:{"^":"A;C:name=","%":"HTMLMapElement"},
tU:{"^":"da;ay:b=","%":"Matrix"},
mu:{"^":"A;a9:error=","%":"HTMLAudioElement;HTMLMediaElement"},
tW:{"^":"ab;P:message=","%":"MediaKeyMessageEvent"},
tX:{"^":"z;",
co:function(a){return a.remove()},
"%":"MediaKeySession"},
tY:{"^":"f;i:length=","%":"MediaList"},
tZ:{"^":"f;",
eO:function(a){return a.activate()},
f8:function(a){return a.deactivate()},
"%":"MediaSession"},
u0:{"^":"A;p:type%","%":"HTMLMenuElement"},
u1:{"^":"A;p:type%","%":"HTMLMenuItemElement"},
u2:{"^":"ab;",
gM:function(a){var z,y
z=a.data
y=new P.df([],[],!1)
y.c=!0
return y.au(z)},
"%":"MessageEvent"},
u3:{"^":"A;C:name=","%":"HTMLMetaElement"},
u4:{"^":"A;ds:max},ft:min},A:value%","%":"HTMLMeterElement"},
u5:{"^":"ab;M:data=","%":"MIDIMessageEvent"},
u6:{"^":"mx;",
kL:function(a,b,c){return a.send(b,c)},
ac:function(a,b){return a.send(b)},
"%":"MIDIOutput"},
mx:{"^":"z;C:name=,p:type=","%":"MIDIInput;MIDIPort"},
b7:{"^":"f;p:type=",$ise:1,"%":"MimeType"},
u7:{"^":"lD;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.L(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(new P.o("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.o("Cannot resize immutable List."))},
gv:function(a){if(a.length>0)return a[0]
throw H.b(new P.x("No elements"))},
w:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isu:1,
$asu:function(){return[W.b7]},
$isd:1,
$asd:function(){return[W.b7]},
$isw:1,
$asw:function(){return[W.b7]},
$isc:1,
$asc:function(){return[W.b7]},
"%":"MimeTypeArray"},
lj:{"^":"f+I;",$isd:1,
$asd:function(){return[W.b7]},
$isc:1,
$asc:function(){return[W.b7]}},
lD:{"^":"lj+U;",$isd:1,
$asd:function(){return[W.b7]},
$isc:1,
$asc:function(){return[W.b7]}},
a2:{"^":"dc;",
gbd:function(a){return new P.c_(a.clientX,a.clientY,[null])},
$ise:1,
$isa2:1,
"%":"PointerEvent;DragEvent|MouseEvent"},
u8:{"^":"f;p:type=","%":"MutationRecord"},
ug:{"^":"f;X:storage=",$isf:1,"%":"Navigator"},
uh:{"^":"f;P:message=,C:name=","%":"NavigatorUserMediaError"},
ui:{"^":"z;p:type=","%":"NetworkInformation"},
az:{"^":"b4;a",
gv:function(a){var z=this.a.firstChild
if(z==null)throw H.b(new P.x("No elements"))
return z},
gaZ:function(a){var z,y
z=this.a
y=z.childNodes.length
if(y===0)throw H.b(new P.x("No elements"))
if(y>1)throw H.b(new P.x("More than one element"))
return z.firstChild},
l:function(a,b){this.a.appendChild(b)},
a3:function(a,b){var z,y,x,w
z=b.a
y=this.a
if(z!==y)for(x=z.childNodes.length,w=0;w<x;++w)y.appendChild(z.firstChild)
return},
j:function(a,b,c){var z,y
z=this.a
y=z.childNodes
if(b>>>0!==b||b>=y.length)return H.a(y,b)
z.replaceChild(c,y[b])},
gJ:function(a){var z=this.a.childNodes
return new W.fJ(z,z.length,-1,null)},
V:function(a,b,c,d,e){throw H.b(new P.o("Cannot setRange on Node list"))},
aC:function(a,b,c,d){return this.V(a,b,c,d,0)},
gi:function(a){return this.a.childNodes.length},
si:function(a,b){throw H.b(new P.o("Cannot set length on immutable List."))},
h:function(a,b){var z=this.a.childNodes
if(b>>>0!==b||b>=z.length)return H.a(z,b)
return z[b]},
$asd:function(){return[W.y]},
$asb4:function(){return[W.y]},
$asc:function(){return[W.y]}},
y:{"^":"z;cm:parentNode=,dz:previousSibling=",
gkg:function(a){return new W.az(a)},
co:function(a){var z=a.parentNode
if(z!=null)z.removeChild(a)},
ku:function(a,b){var z,y
try{z=a.parentNode
J.iY(z,b,a)}catch(y){H.H(y)}return a},
b6:function(a){var z
for(;z=a.firstChild,z!=null;)a.removeChild(z)},
k:function(a){var z=a.nodeValue
return z==null?this.hG(a):z},
B:function(a,b){return a.contains(b)},
iF:function(a,b,c){return a.replaceChild(b,c)},
$ise:1,
$isz:1,
$isy:1,
"%":";Node"},
uj:{"^":"f;",
kk:[function(a){return a.previousNode()},"$0","gdz",0,0,9],
"%":"NodeIterator"},
uk:{"^":"lE;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.L(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(new P.o("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.o("Cannot resize immutable List."))},
gv:function(a){if(a.length>0)return a[0]
throw H.b(new P.x("No elements"))},
w:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isu:1,
$asu:function(){return[W.y]},
$isd:1,
$asd:function(){return[W.y]},
$isw:1,
$asw:function(){return[W.y]},
$isc:1,
$asc:function(){return[W.y]},
"%":"NodeList|RadioNodeList"},
lk:{"^":"f+I;",$isd:1,
$asd:function(){return[W.y]},
$isc:1,
$asc:function(){return[W.y]}},
lE:{"^":"lk+U;",$isd:1,
$asd:function(){return[W.y]},
$isc:1,
$asc:function(){return[W.y]}},
ul:{"^":"z;M:data=","%":"Notification"},
un:{"^":"em;A:value=","%":"NumberValue"},
uo:{"^":"A;p:type%","%":"HTMLOListElement"},
up:{"^":"A;M:data=,a_:height},C:name=,p:type%,a1:width}","%":"HTMLObjectElement"},
ur:{"^":"A;bf:index=,A:value%","%":"HTMLOptionElement"},
ut:{"^":"A;C:name=,p:type=,A:value%","%":"HTMLOutputElement"},
uu:{"^":"A;C:name=,A:value%","%":"HTMLParamElement"},
uv:{"^":"f;",$isf:1,"%":"Path2D"},
ux:{"^":"f;C:name=","%":"PerformanceCompositeTiming|PerformanceEntry|PerformanceMark|PerformanceMeasure|PerformanceRenderTiming|PerformanceResourceTiming"},
uy:{"^":"f;p:type=","%":"PerformanceNavigation"},
uz:{"^":"da;i:length=","%":"Perspective"},
b8:{"^":"f;i:length=,C:name=",$ise:1,"%":"Plugin"},
uA:{"^":"lF;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.L(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(new P.o("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.o("Cannot resize immutable List."))},
gv:function(a){if(a.length>0)return a[0]
throw H.b(new P.x("No elements"))},
w:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isu:1,
$asu:function(){return[W.b8]},
$isd:1,
$asd:function(){return[W.b8]},
$isw:1,
$asw:function(){return[W.b8]},
$isc:1,
$asc:function(){return[W.b8]},
"%":"PluginArray"},
ll:{"^":"f+I;",$isd:1,
$asd:function(){return[W.b8]},
$isc:1,
$asc:function(){return[W.b8]}},
lF:{"^":"ll+U;",$isd:1,
$asd:function(){return[W.b8]},
$isc:1,
$asc:function(){return[W.b8]}},
uD:{"^":"f;P:message=","%":"PositionError"},
uE:{"^":"em;m:x=,n:y=","%":"PositionValue"},
uF:{"^":"z;A:value=","%":"PresentationAvailability"},
uG:{"^":"z;",
ac:function(a,b){return a.send(b)},
"%":"PresentationConnection"},
uH:{"^":"ab;P:message=","%":"PresentationConnectionCloseEvent"},
uJ:{"^":"A;ds:max},as:position=,A:value%","%":"HTMLProgressElement"},
uL:{"^":"fH;M:data=","%":"PushEvent"},
uS:{"^":"da;m:x=,n:y=,R:z=","%":"Rotation"},
uT:{"^":"z;",
ac:function(a,b){return a.send(b)},
"%":"DataChannel|RTCDataChannel"},
uU:{"^":"f;p:type%","%":"RTCSessionDescription|mozRTCSessionDescription"},
uV:{"^":"f;p:type=","%":"RTCStatsReport"},
uW:{"^":"z;p:type=","%":"ScreenOrientation"},
uX:{"^":"A;p:type%","%":"HTMLScriptElement"},
uY:{"^":"f;f9:deltaY=","%":"ScrollState"},
uZ:{"^":"A;i:length=,C:name=,p:type=,A:value%","%":"HTMLSelectElement"},
v_:{"^":"f;p:type=","%":"Selection"},
v0:{"^":"f;M:data=,C:name=","%":"ServicePort"},
v1:{"^":"ab;",
gM:function(a){var z,y
z=a.data
y=new P.df([],[],!1)
y.c=!0
return y.au(z)},
"%":"ServiceWorkerMessageEvent"},
v2:{"^":"z;",$isf:1,"%":"SharedWorker"},
v3:{"^":"om;C:name=","%":"SharedWorkerGlobalScope"},
v4:{"^":"mf;p:type=,A:value=","%":"SimpleLength"},
v7:{"^":"A;C:name=","%":"HTMLSlotElement"},
ba:{"^":"z;",$ise:1,$isz:1,"%":"SourceBuffer"},
v8:{"^":"fE;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.L(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(new P.o("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.o("Cannot resize immutable List."))},
gv:function(a){if(a.length>0)return a[0]
throw H.b(new P.x("No elements"))},
w:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isu:1,
$asu:function(){return[W.ba]},
$isd:1,
$asd:function(){return[W.ba]},
$isw:1,
$asw:function(){return[W.ba]},
$isc:1,
$asc:function(){return[W.ba]},
"%":"SourceBufferList"},
fB:{"^":"z+I;",$isd:1,
$asd:function(){return[W.ba]},
$isc:1,
$asc:function(){return[W.ba]}},
fE:{"^":"fB+U;",$isd:1,
$asd:function(){return[W.ba]},
$isc:1,
$asc:function(){return[W.ba]}},
v9:{"^":"A;p:type%","%":"HTMLSourceElement"},
bb:{"^":"f;",$ise:1,"%":"SpeechGrammar"},
va:{"^":"lG;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.L(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(new P.o("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.o("Cannot resize immutable List."))},
gv:function(a){if(a.length>0)return a[0]
throw H.b(new P.x("No elements"))},
w:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isu:1,
$asu:function(){return[W.bb]},
$isd:1,
$asd:function(){return[W.bb]},
$isw:1,
$asw:function(){return[W.bb]},
$isc:1,
$asc:function(){return[W.bb]},
"%":"SpeechGrammarList"},
lm:{"^":"f+I;",$isd:1,
$asd:function(){return[W.bb]},
$isc:1,
$asc:function(){return[W.bb]}},
lG:{"^":"lm+U;",$isd:1,
$asd:function(){return[W.bb]},
$isc:1,
$asc:function(){return[W.bb]}},
vb:{"^":"ab;a9:error=,P:message=","%":"SpeechRecognitionError"},
bc:{"^":"f;i:length=",$ise:1,"%":"SpeechRecognitionResult"},
vc:{"^":"ab;C:name=","%":"SpeechSynthesisEvent"},
vd:{"^":"f;C:name=","%":"SpeechSynthesisVoice"},
vg:{"^":"f;",
O:function(a,b){return a.getItem(b)!=null},
h:function(a,b){return a.getItem(b)},
j:function(a,b,c){a.setItem(b,c)},
F:function(a,b){var z,y
for(z=0;!0;++z){y=a.key(z)
if(y==null)return
b.$2(y,a.getItem(y))}},
gT:function(a){var z=H.v([],[P.p])
this.F(a,new W.nm(z))
return z},
gi:function(a){return a.length},
gE:function(a){return a.key(0)==null},
gY:function(a){return a.key(0)!=null},
$isM:1,
$asM:function(){return[P.p,P.p]},
"%":"Storage"},
nm:{"^":"h:4;a",
$2:function(a,b){return this.a.push(a)},
$isi:1},
vj:{"^":"A;p:type%","%":"HTMLStyleElement"},
vl:{"^":"f;p:type=","%":"StyleMedia"},
vm:{"^":"f;",
aB:function(a,b){return a.get(b)},
"%":"StylePropertyMap"},
bd:{"^":"f;p:type=",$ise:1,"%":"CSSStyleSheet|StyleSheet"},
em:{"^":"f;","%":"KeywordValue|TransformValue;StyleValue"},
nP:{"^":"A;",
az:function(a,b,c,d){var z,y
if("createContextualFragment" in window.Range.prototype)return this.cH(a,b,c,d)
z=W.kC("<table>"+b+"</table>",c,d)
y=document.createDocumentFragment()
y.toString
new W.az(y).a3(0,J.jk(z))
return y},
"%":"HTMLTableElement"},
vp:{"^":"A;",
az:function(a,b,c,d){var z,y,x,w
if("createContextualFragment" in window.Range.prototype)return this.cH(a,b,c,d)
z=document
y=z.createDocumentFragment()
z=C.J.az(z.createElement("table"),b,c,d)
z.toString
z=new W.az(z)
x=z.gaZ(z)
x.toString
z=new W.az(x)
w=z.gaZ(z)
y.toString
w.toString
new W.az(y).a3(0,new W.az(w))
return y},
"%":"HTMLTableRowElement"},
vq:{"^":"A;",
az:function(a,b,c,d){var z,y,x
if("createContextualFragment" in window.Range.prototype)return this.cH(a,b,c,d)
z=document
y=z.createDocumentFragment()
z=C.J.az(z.createElement("table"),b,c,d)
z.toString
z=new W.az(z)
x=z.gaZ(z)
y.toString
x.toString
new W.az(y).a3(0,new W.az(x))
return y},
"%":"HTMLTableSectionElement"},
hI:{"^":"A;",$ishI:1,"%":"HTMLTemplateElement"},
vr:{"^":"A;C:name=,p:type=,A:value%","%":"HTMLTextAreaElement"},
vs:{"^":"dc;M:data=","%":"TextEvent"},
be:{"^":"z;",$ise:1,$isz:1,"%":"TextTrack"},
aX:{"^":"z;",$ise:1,$isz:1,"%":";TextTrackCue"},
vv:{"^":"lH;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.L(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(new P.o("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.o("Cannot resize immutable List."))},
gv:function(a){if(a.length>0)return a[0]
throw H.b(new P.x("No elements"))},
w:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isu:1,
$asu:function(){return[W.aX]},
$isd:1,
$asd:function(){return[W.aX]},
$isw:1,
$asw:function(){return[W.aX]},
$isc:1,
$asc:function(){return[W.aX]},
"%":"TextTrackCueList"},
ln:{"^":"f+I;",$isd:1,
$asd:function(){return[W.aX]},
$isc:1,
$asc:function(){return[W.aX]}},
lH:{"^":"ln+U;",$isd:1,
$asd:function(){return[W.aX]},
$isc:1,
$asc:function(){return[W.aX]}},
vw:{"^":"fF;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.L(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(new P.o("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.o("Cannot resize immutable List."))},
gv:function(a){if(a.length>0)return a[0]
throw H.b(new P.x("No elements"))},
w:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isu:1,
$asu:function(){return[W.be]},
$isd:1,
$asd:function(){return[W.be]},
$isw:1,
$asw:function(){return[W.be]},
$isc:1,
$asc:function(){return[W.be]},
"%":"TextTrackList"},
fC:{"^":"z+I;",$isd:1,
$asd:function(){return[W.be]},
$isc:1,
$asc:function(){return[W.be]}},
fF:{"^":"fC+U;",$isd:1,
$asd:function(){return[W.be]},
$isc:1,
$asc:function(){return[W.be]}},
vx:{"^":"f;i:length=","%":"TimeRanges"},
bf:{"^":"f;",
gbd:function(a){return new P.c_(C.b.Z(a.clientX),C.b.Z(a.clientY),[null])},
$ise:1,
"%":"Touch"},
ay:{"^":"dc;fU:targetTouches=",$ise:1,$isay:1,"%":"TouchEvent"},
o0:{"^":"lI;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.L(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(new P.o("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.o("Cannot resize immutable List."))},
gv:function(a){if(a.length>0)return a[0]
throw H.b(new P.x("No elements"))},
gaK:function(a){var z=a.length
if(z>0)return a[z-1]
throw H.b(new P.x("No elements"))},
w:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isu:1,
$asu:function(){return[W.bf]},
$isd:1,
$asd:function(){return[W.bf]},
$isw:1,
$asw:function(){return[W.bf]},
$isc:1,
$asc:function(){return[W.bf]},
"%":"TouchList"},
lo:{"^":"f+I;",$isd:1,
$asd:function(){return[W.bf]},
$isc:1,
$asc:function(){return[W.bf]}},
lI:{"^":"lo+U;",$isd:1,
$asd:function(){return[W.bf]},
$isc:1,
$asc:function(){return[W.bf]}},
vy:{"^":"f;p:type=","%":"TrackDefault"},
vz:{"^":"f;i:length=","%":"TrackDefaultList"},
da:{"^":"f;","%":"Skew;TransformComponent"},
vC:{"^":"da;m:x=,n:y=,R:z=","%":"Translation"},
vD:{"^":"f;",
kZ:[function(a){return a.parentNode()},"$0","gcm",0,0,9],
kk:[function(a){return a.previousNode()},"$0","gdz",0,0,9],
"%":"TreeWalker"},
dc:{"^":"ab;","%":"FocusEvent|KeyboardEvent|SVGZoomEvent;UIEvent"},
vE:{"^":"f;",
k:function(a){return String(a)},
$isf:1,
"%":"URL"},
vF:{"^":"f;",
aB:function(a,b){return a.get(b)},
"%":"URLSearchParams"},
vH:{"^":"f;as:position=","%":"VRPositionState"},
vI:{"^":"mu;a_:height},a1:width}","%":"HTMLVideoElement"},
vJ:{"^":"z;i:length=","%":"VideoTrackList"},
vM:{"^":"aX;as:position=","%":"VTTCue"},
vN:{"^":"f;i:length=","%":"VTTRegionList"},
vO:{"^":"z;",
ac:function(a,b){return a.send(b)},
"%":"WebSocket"},
cw:{"^":"a2;",
gf9:function(a){if(a.deltaY!==undefined)return a.deltaY
throw H.b(new P.o("deltaY is not supported"))},
$ise:1,
$isa2:1,
$iscw:1,
"%":"WheelEvent"},
ol:{"^":"z;C:name=",
ez:function(a,b){return a.requestAnimationFrame(H.as(b,1))},
eh:function(a){if(!!(a.requestAnimationFrame&&a.cancelAnimationFrame))return;(function(b){var z=['ms','moz','webkit','o']
for(var y=0;y<z.length&&!b.requestAnimationFrame;++y){b.requestAnimationFrame=b[z[y]+'RequestAnimationFrame']
b.cancelAnimationFrame=b[z[y]+'CancelAnimationFrame']||b[z[y]+'CancelRequestAnimationFrame']}if(b.requestAnimationFrame&&b.cancelAnimationFrame)return
b.requestAnimationFrame=function(c){return window.setTimeout(function(){c(Date.now())},16)}
b.cancelAnimationFrame=function(c){clearTimeout(c)}})(a)},
$isf:1,
"%":"DOMWindow|Window"},
vP:{"^":"z;",$isf:1,"%":"Worker"},
om:{"^":"z;",$isf:1,"%":"CompositorWorkerGlobalScope|DedicatedWorkerGlobalScope|ServiceWorkerGlobalScope;WorkerGlobalScope"},
vT:{"^":"y;C:name=,eq:namespaceURI=,A:value=","%":"Attr"},
vU:{"^":"f;dd:bottom=,a_:height=,bG:left=,dB:right=,bK:top=,a1:width=",
k:function(a){return"Rectangle ("+H.j(a.left)+", "+H.j(a.top)+") "+H.j(a.width)+" x "+H.j(a.height)},
I:function(a,b){var z,y,x
if(b==null)return!1
z=J.t(b)
if(!z.$isac)return!1
y=a.left
x=z.gbG(b)
if(y==null?x==null:y===x){y=a.top
x=z.gbK(b)
if(y==null?x==null:y===x){y=a.width
x=z.ga1(b)
if(y==null?x==null:y===x){y=a.height
z=z.ga_(b)
z=y==null?z==null:y===z}else z=!1}else z=!1}else z=!1
return z},
gK:function(a){var z,y,x,w
z=J.a8(a.left)
y=J.a8(a.top)
x=J.a8(a.width)
w=J.a8(a.height)
return W.id(W.bi(W.bi(W.bi(W.bi(0,z),y),x),w))},
$isac:1,
$asac:I.ae,
"%":"ClientRect"},
vV:{"^":"lJ;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.L(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(new P.o("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.o("Cannot resize immutable List."))},
gv:function(a){if(a.length>0)return a[0]
throw H.b(new P.x("No elements"))},
w:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isu:1,
$asu:function(){return[P.ac]},
$isd:1,
$asd:function(){return[P.ac]},
$isw:1,
$asw:function(){return[P.ac]},
$isc:1,
$asc:function(){return[P.ac]},
"%":"ClientRectList|DOMRectList"},
lp:{"^":"f+I;",$isd:1,
$asd:function(){return[P.ac]},
$isc:1,
$asc:function(){return[P.ac]}},
lJ:{"^":"lp+U;",$isd:1,
$asd:function(){return[P.ac]},
$isc:1,
$asc:function(){return[P.ac]}},
vW:{"^":"lK;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.L(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(new P.o("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.o("Cannot resize immutable List."))},
gv:function(a){if(a.length>0)return a[0]
throw H.b(new P.x("No elements"))},
w:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isu:1,
$asu:function(){return[W.ao]},
$isd:1,
$asd:function(){return[W.ao]},
$isw:1,
$asw:function(){return[W.ao]},
$isc:1,
$asc:function(){return[W.ao]},
"%":"CSSRuleList"},
lq:{"^":"f+I;",$isd:1,
$asd:function(){return[W.ao]},
$isc:1,
$asc:function(){return[W.ao]}},
lK:{"^":"lq+U;",$isd:1,
$asd:function(){return[W.ao]},
$isc:1,
$asc:function(){return[W.ao]}},
vX:{"^":"y;",$isf:1,"%":"DocumentType"},
vY:{"^":"kx;",
ga_:function(a){return a.height},
ga1:function(a){return a.width},
gm:function(a){return a.x},
gn:function(a){return a.y},
"%":"DOMRect"},
vZ:{"^":"lu;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.L(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(new P.o("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.o("Cannot resize immutable List."))},
gv:function(a){if(a.length>0)return a[0]
throw H.b(new P.x("No elements"))},
w:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isu:1,
$asu:function(){return[W.b3]},
$isd:1,
$asd:function(){return[W.b3]},
$isw:1,
$asw:function(){return[W.b3]},
$isc:1,
$asc:function(){return[W.b3]},
"%":"GamepadList"},
la:{"^":"f+I;",$isd:1,
$asd:function(){return[W.b3]},
$isc:1,
$asc:function(){return[W.b3]}},
lu:{"^":"la+U;",$isd:1,
$asd:function(){return[W.b3]},
$isc:1,
$asc:function(){return[W.b3]}},
w_:{"^":"A;",$isf:1,"%":"HTMLFrameSetElement"},
w2:{"^":"lv;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.L(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(new P.o("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.o("Cannot resize immutable List."))},
gv:function(a){if(a.length>0)return a[0]
throw H.b(new P.x("No elements"))},
w:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isu:1,
$asu:function(){return[W.y]},
$isd:1,
$asd:function(){return[W.y]},
$isw:1,
$asw:function(){return[W.y]},
$isc:1,
$asc:function(){return[W.y]},
"%":"MozNamedAttrMap|NamedNodeMap"},
lb:{"^":"f+I;",$isd:1,
$asd:function(){return[W.y]},
$isc:1,
$asc:function(){return[W.y]}},
lv:{"^":"lb+U;",$isd:1,
$asd:function(){return[W.y]},
$isc:1,
$asc:function(){return[W.y]}},
w6:{"^":"z;",$isf:1,"%":"ServiceWorker"},
w7:{"^":"lw;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.L(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(new P.o("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.o("Cannot resize immutable List."))},
gv:function(a){if(a.length>0)return a[0]
throw H.b(new P.x("No elements"))},
w:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isu:1,
$asu:function(){return[W.bc]},
$isd:1,
$asd:function(){return[W.bc]},
$isw:1,
$asw:function(){return[W.bc]},
$isc:1,
$asc:function(){return[W.bc]},
"%":"SpeechRecognitionResultList"},
lc:{"^":"f+I;",$isd:1,
$asd:function(){return[W.bc]},
$isc:1,
$asc:function(){return[W.bc]}},
lw:{"^":"lc+U;",$isd:1,
$asd:function(){return[W.bc]},
$isc:1,
$asc:function(){return[W.bc]}},
w8:{"^":"lx;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.L(b,a,null,null,null))
return a[b]},
j:function(a,b,c){throw H.b(new P.o("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.o("Cannot resize immutable List."))},
gv:function(a){if(a.length>0)return a[0]
throw H.b(new P.x("No elements"))},
w:function(a,b){if(b>>>0!==b||b>=a.length)return H.a(a,b)
return a[b]},
$isu:1,
$asu:function(){return[W.bd]},
$isd:1,
$asd:function(){return[W.bd]},
$isw:1,
$asw:function(){return[W.bd]},
$isc:1,
$asc:function(){return[W.bd]},
"%":"StyleSheetList"},
ld:{"^":"f+I;",$isd:1,
$asd:function(){return[W.bd]},
$isc:1,
$asc:function(){return[W.bd]}},
lx:{"^":"ld+U;",$isd:1,
$asd:function(){return[W.bd]},
$isc:1,
$asc:function(){return[W.bd]}},
wa:{"^":"f;",$isf:1,"%":"WorkerLocation"},
wb:{"^":"f;",$isf:1,"%":"WorkerNavigator"},
ov:{"^":"e;cX:a<",
F:function(a,b){var z,y,x,w,v
for(z=this.gT(this),y=z.length,x=this.a,w=0;w<z.length;z.length===y||(0,H.D)(z),++w){v=z[w]
b.$2(v,x.getAttribute(v))}},
gT:function(a){var z,y,x,w,v,u
z=this.a.attributes
y=H.v([],[P.p])
for(x=z.length,w=0;w<x;++w){if(w>=z.length)return H.a(z,w)
v=z[w]
u=J.k(v)
if(u.geq(v)==null)y.push(u.gC(v))}return y},
gE:function(a){return this.gT(this).length===0},
gY:function(a){return this.gT(this).length!==0},
$isM:1,
$asM:function(){return[P.p,P.p]}},
oF:{"^":"ov;a",
O:function(a,b){return this.a.hasAttribute(b)},
h:function(a,b){return this.a.getAttribute(b)},
j:function(a,b,c){this.a.setAttribute(b,c)},
gi:function(a){return this.gT(this).length}},
oG:{"^":"fi;cX:a<",
a4:function(){var z,y,x,w,v
z=P.ai(null,null,null,P.p)
for(y=this.a.className.split(" "),x=y.length,w=0;w<y.length;y.length===x||(0,H.D)(y),++w){v=J.dI(y[w])
if(v.length!==0)z.l(0,v)}return z},
dJ:function(a){this.a.className=a.dl(0," ")},
gi:function(a){return this.a.classList.length},
gE:function(a){return this.a.classList.length===0},
gY:function(a){return this.a.classList.length!==0},
B:function(a,b){return typeof b==="string"&&this.a.classList.contains(b)},
l:function(a,b){var z,y
z=this.a.classList
y=z.contains(b)
z.add(b)
return!y},
W:function(a,b){var z,y
z=this.a.classList
y=z.contains(b)
z.remove(b)
return y},
t:{
i6:function(a,b){var z,y
z=a.classList
for(y=0;y<2;++y)z.add(b[y])}}},
oJ:{"^":"ad;a,b,c,$ti",
U:function(a,b,c,d){return W.O(this.a,this.b,a,!1,H.B(this,0))},
ci:function(a,b,c){return this.U(a,null,b,c)}},
X:{"^":"oJ;a,b,c,$ti"},
oK:{"^":"nn;a,b,c,d,e,$ti",
bb:function(a){if(this.b==null)return
this.eK()
this.b=null
this.d=null
return},
bH:function(a,b){if(this.b==null)return;++this.a
this.eK()},
ae:function(a){return this.bH(a,null)},
at:function(a){if(this.b==null||this.a<=0)return;--this.a
this.eI()},
eI:function(){var z=this.d
if(z!=null&&this.a<=0)J.j_(this.b,this.c,z,!1)},
eK:function(){var z=this.d
if(z!=null)J.js(this.b,this.c,z,!1)},
i2:function(a,b,c,d,e){this.eI()},
t:{
O:function(a,b,c,d,e){var z=c==null?null:W.eC(new W.oL(c))
z=new W.oK(0,a,b,z,!1,[e])
z.i2(a,b,c,!1,e)
return z}}},
oL:{"^":"h:0;a",
$1:function(a){return this.a.$1(a)},
$isi:1},
es:{"^":"e;h6:a<",
ba:function(a){return $.$get$ic().B(0,W.bT(a))},
aR:function(a,b,c){var z,y,x
z=W.bT(a)
y=$.$get$et()
x=y.h(0,H.j(z)+"::"+b)
if(x==null)x=y.h(0,"*::"+b)
if(x==null)return!1
return x.$4(a,b,c,this)},
i4:function(a){var z,y
z=$.$get$et()
if(z.gE(z)){for(y=0;y<262;++y)z.j(0,C.a3[y],W.qI())
for(y=0;y<12;++y)z.j(0,C.u[y],W.qJ())}},
t:{
ib:function(a){var z,y
z=W.f5(null)
y=window.location
z=new W.es(new W.pt(z,y))
z.i4(a)
return z},
w0:[function(a,b,c,d){return!0},"$4","qI",8,0,15],
w1:[function(a,b,c,d){var z,y,x,w,v
z=d.gh6()
y=z.a
y.href=c
x=y.hostname
z=z.b
w=z.hostname
if(x==null?w==null:x===w){w=y.port
v=z.port
if(w==null?v==null:w===v){w=y.protocol
z=z.protocol
z=w==null?z==null:w===z}else z=!1}else z=!1
if(!z)if(x==="")if(y.port===""){z=y.protocol
z=z===":"||z===""}else z=!1
else z=!1
else z=!0
return z},"$4","qJ",8,0,15]}},
U:{"^":"e;$ti",
gJ:function(a){return new W.fJ(a,this.gi(a),-1,null)},
l:function(a,b){throw H.b(new P.o("Cannot add to immutable List."))},
V:function(a,b,c,d,e){throw H.b(new P.o("Cannot setRange on immutable List."))},
aC:function(a,b,c,d){return this.V(a,b,c,d,0)},
$isd:1,
$asd:null,
$isc:1,
$asc:null},
hh:{"^":"e;a",
l:function(a,b){this.a.push(b)},
ba:function(a){return C.a.eT(this.a,new W.mF(a))},
aR:function(a,b,c){return C.a.eT(this.a,new W.mE(a,b,c))}},
mF:{"^":"h:0;a",
$1:function(a){return a.ba(this.a)},
$isi:1},
mE:{"^":"h:0;a,b,c",
$1:function(a){return a.aR(this.a,this.b,this.c)},
$isi:1},
pu:{"^":"e;h6:d<",
ba:function(a){return this.a.B(0,W.bT(a))},
aR:["hM",function(a,b,c){var z,y
z=W.bT(a)
y=this.c
if(y.B(0,H.j(z)+"::"+b))return this.d.j0(c)
else if(y.B(0,"*::"+b))return this.d.j0(c)
else{y=this.b
if(y.B(0,H.j(z)+"::"+b))return!0
else if(y.B(0,"*::"+b))return!0
else if(y.B(0,H.j(z)+"::*"))return!0
else if(y.B(0,"*::*"))return!0}return!1}],
i5:function(a,b,c,d){var z,y,x
this.a.a3(0,c)
z=b.dI(0,new W.pv())
y=b.dI(0,new W.pw())
this.b.a3(0,z)
x=this.c
x.a3(0,C.l)
x.a3(0,y)}},
pv:{"^":"h:0;",
$1:function(a){return!C.a.B(C.u,a)},
$isi:1},
pw:{"^":"h:0;",
$1:function(a){return C.a.B(C.u,a)},
$isi:1},
pK:{"^":"pu;e,a,b,c,d",
aR:function(a,b,c){if(this.hM(a,b,c))return!0
if(b==="template"&&c==="")return!0
if(J.eQ(a).a.getAttribute("template")==="")return this.e.B(0,b)
return!1},
t:{
il:function(){var z=P.p
z=new W.pK(P.h7(C.t,z),P.ai(null,null,null,z),P.ai(null,null,null,z),P.ai(null,null,null,z),null)
z.i5(null,new H.d1(C.t,new W.pL(),[H.B(C.t,0),null]),["TEMPLATE"],null)
return z}}},
pL:{"^":"h:0;",
$1:function(a){return"TEMPLATE::"+H.j(a)},
$isi:1},
pG:{"^":"e;",
ba:function(a){var z=J.t(a)
if(!!z.$ishu)return!1
z=!!z.$isF
if(z&&W.bT(a)==="foreignObject")return!1
if(z)return!0
return!1},
aR:function(a,b,c){if(b==="is"||C.d.cF(b,"on"))return!1
return this.ba(a)}},
fJ:{"^":"e;a,b,c,d",
u:function(){var z,y
z=this.c+1
y=this.b
if(z<y){this.d=J.af(this.a,z)
this.c=z
return!0}this.d=null
this.c=y
return!1},
gD:function(){return this.d}},
hg:{"^":"e;"},
pt:{"^":"e;a,b"},
im:{"^":"e;a",
dU:function(a){new W.pN(this).$2(a,null)},
br:function(a,b){var z
if(b==null){z=a.parentNode
if(z!=null)z.removeChild(a)}else b.removeChild(a)},
iI:function(a,b){var z,y,x,w,v,u,t,s
z=!0
y=null
x=null
try{y=J.eQ(a)
x=y.gcX().getAttribute("is")
w=function(c){if(!(c.attributes instanceof NamedNodeMap))return true
var r=c.childNodes
if(c.lastChild&&c.lastChild!==r[r.length-1])return true
if(c.children)if(!(c.children instanceof HTMLCollection||c.children instanceof NodeList))return true
var q=0
if(c.children)q=c.children.length
for(var p=0;p<q;p++){var o=c.children[p]
if(o.id=='attributes'||o.name=='attributes'||o.id=='lastChild'||o.name=='lastChild'||o.id=='children'||o.name=='children')return true}return false}(a)
z=w===!0?!0:!(a.attributes instanceof NamedNodeMap)}catch(t){H.H(t)}v="element unprintable"
try{v=J.a5(a)}catch(t){H.H(t)}try{u=W.bT(a)
this.iH(a,b,z,v,u,y,x)}catch(t){if(H.H(t) instanceof P.aN)throw t
else{this.br(a,b)
window
s="Removing corrupted element "+H.j(v)
if(typeof console!="undefined")console.warn(s)}}},
iH:function(a,b,c,d,e,f,g){var z,y,x,w,v
if(c){this.br(a,b)
window
z="Removing element due to corrupted attributes on <"+d+">"
if(typeof console!="undefined")console.warn(z)
return}if(!this.a.ba(a)){this.br(a,b)
window
z="Removing disallowed element <"+H.j(e)+"> from "+J.a5(b)
if(typeof console!="undefined")console.warn(z)
return}if(g!=null)if(!this.a.aR(a,"is",g)){this.br(a,b)
window
z="Removing disallowed type extension <"+H.j(e)+' is="'+g+'">'
if(typeof console!="undefined")console.warn(z)
return}z=f.gT(f)
y=H.v(z.slice(0),[H.B(z,0)])
for(x=f.gT(f).length-1,z=f.a;x>=0;--x){if(x>=y.length)return H.a(y,x)
w=y[x]
if(!this.a.aR(a,J.jG(w),z.getAttribute(w))){window
v="Removing disallowed attribute <"+H.j(e)+" "+w+'="'+H.j(z.getAttribute(w))+'">'
if(typeof console!="undefined")console.warn(v)
z.getAttribute(w)
z.removeAttribute(w)}}if(!!J.t(a).$ishI)this.dU(a.content)}},
pN:{"^":"h:20;a",
$2:function(a,b){var z,y,x,w,v,u
x=this.a
switch(a.nodeType){case 1:x.iI(a,b)
break
case 8:case 11:case 3:case 4:break
default:x.br(a,b)}z=a.lastChild
for(x=a==null;null!=z;){y=null
try{y=J.jm(z)}catch(w){H.H(w)
v=z
if(x){u=J.k(v)
if(u.gcm(v)!=null){u.gcm(v)
u.gcm(v).removeChild(v)}}else a.removeChild(v)
z=null
y=a.lastChild}if(z!=null)this.$2(z,a)
z=y}},
$isi:1}}],["","",,P,{"^":"",
qx:function(a){var z,y,x,w,v
if(a==null)return
z=P.cX()
y=Object.getOwnPropertyNames(a)
for(x=y.length,w=0;w<y.length;y.length===x||(0,H.D)(y),++w){v=y[w]
z.j(0,v,a[v])}return z},
qs:function(a,b){var z={}
C.d.F(a,new P.qt(z))
return z},
qu:function(a){var z,y
z=new P.J(0,$.r,null,[null])
y=new P.bw(z,[null])
a.then(H.as(new P.qv(y),1))["catch"](H.as(new P.qw(y),1))
return z},
dP:function(){var z=$.fr
if(z==null){z=J.cC(window.navigator.userAgent,"Opera",0)
$.fr=z}return z},
fu:function(){var z=$.fs
if(z==null){z=P.dP()!==!0&&J.cC(window.navigator.userAgent,"WebKit",0)
$.fs=z}return z},
ft:function(){var z,y
z=$.fo
if(z!=null)return z
y=$.fp
if(y==null){y=J.cC(window.navigator.userAgent,"Firefox",0)
$.fp=y}if(y)z="-moz-"
else{y=$.fq
if(y==null){y=P.dP()!==!0&&J.cC(window.navigator.userAgent,"Trident/",0)
$.fq=y}if(y)z="-ms-"
else z=P.dP()===!0?"-o-":"-webkit-"}$.fo=z
return z},
pD:{"^":"e;",
bB:function(a){var z,y,x
z=this.a
y=z.length
for(x=0;x<y;++x)if(z[x]===a)return x
z.push(a)
this.b.push(null)
return y},
au:function(a){var z,y,x,w,v,u
z={}
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
y=J.t(a)
if(!!y.$iscl)return new Date(a.a)
if(!!y.$isn6)throw H.b(new P.c5("structured clone of RegExp"))
if(!!y.$isaH)return a
if(!!y.$isdL)return a
if(!!y.$isdU)return a
if(!!y.$isfT)return a
if(!!y.$isd4||!!y.$isd6)return a
if(!!y.$isM){x=this.bB(a)
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
y.F(a,new P.pF(z,this))
return z.a}if(!!y.$isc){x=this.bB(a)
z=this.b
if(x>=z.length)return H.a(z,x)
u=z[x]
if(u!=null)return u
return this.jh(a,x)}throw H.b(new P.c5("structured clone of other type"))},
jh:function(a,b){var z,y,x,w,v
z=J.G(a)
y=z.gi(a)
x=new Array(y)
w=this.b
if(b>=w.length)return H.a(w,b)
w[b]=x
for(v=0;v<y;++v){w=this.au(z.h(a,v))
if(v>=x.length)return H.a(x,v)
x[v]=w}return x}},
pF:{"^":"h:4;a,b",
$2:function(a,b){this.a.a[a]=this.b.au(b)},
$isi:1},
on:{"^":"e;",
bB:function(a){var z,y,x,w
z=this.a
y=z.length
for(x=0;x<y;++x){w=z[x]
if(w==null?a==null:w===a)return x}z.push(a)
this.b.push(null)
return y},
au:function(a){var z,y,x,w,v,u,t,s,r
z={}
if(a==null)return a
if(typeof a==="boolean")return a
if(typeof a==="number")return a
if(typeof a==="string")return a
if(a instanceof Date){y=a.getTime()
x=new P.cl(y,!0)
x.e3(y,!0)
return x}if(a instanceof RegExp)throw H.b(new P.c5("structured clone of RegExp"))
if(typeof Promise!="undefined"&&a instanceof Promise)return P.qu(a)
w=Object.getPrototypeOf(a)
if(w===Object.prototype||w===null){v=this.bB(a)
x=this.b
u=x.length
if(v>=u)return H.a(x,v)
t=x[v]
z.a=t
if(t!=null)return t
t=P.cX()
z.a=t
if(v>=u)return H.a(x,v)
x[v]=t
this.jD(a,new P.oo(z,this))
return z.a}if(a instanceof Array){v=this.bB(a)
x=this.b
if(v>=x.length)return H.a(x,v)
t=x[v]
if(t!=null)return t
u=J.G(a)
s=u.gi(a)
t=this.c?new Array(s):a
if(v>=x.length)return H.a(x,v)
x[v]=t
if(typeof s!=="number")return H.l(s)
x=J.at(t)
r=0
for(;r<s;++r)x.j(t,r,this.au(u.h(a,r)))
return t}return a}},
oo:{"^":"h:4;a,b",
$2:function(a,b){var z,y
z=this.a.a
y=this.b.au(b)
J.iX(z,a,y)
return y},
$isi:1},
qt:{"^":"h:21;a",
$2:function(a,b){this.a[a]=b},
$isi:1},
pE:{"^":"pD;a,b"},
df:{"^":"on;a,b,c",
jD:function(a,b){var z,y,x,w
for(z=Object.keys(a),y=z.length,x=0;x<z.length;z.length===y||(0,H.D)(z),++x){w=z[x]
b.$2(w,a[w])}}},
qv:{"^":"h:0;a",
$1:function(a){return this.a.ad(0,a)},
$isi:1},
qw:{"^":"h:0;a",
$1:function(a){return this.a.cb(a)},
$isi:1},
fi:{"^":"e;",
d8:function(a){if($.$get$fj().b.test(H.eD(a)))return a
throw H.b(P.cN(a,"value","Not a valid class token"))},
k:function(a){return this.a4().dl(0," ")},
gJ:function(a){var z,y
z=this.a4()
y=new P.aY(z,z.r,null,null)
y.c=z.e
return y},
F:function(a,b){this.a4().F(0,b)},
aL:function(a,b){var z=this.a4()
return new H.dR(z,b,[H.B(z,0),null])},
gE:function(a){return this.a4().a===0},
gY:function(a){return this.a4().a!==0},
gi:function(a){return this.a4().a},
af:function(a,b){return this.a4().af(0,b)},
al:function(a,b,c){return this.a4().al(0,b,c)},
B:function(a,b){if(typeof b!=="string")return!1
this.d8(b)
return this.a4().B(0,b)},
dr:function(a){return this.B(0,a)?a:null},
l:function(a,b){this.d8(b)
return this.kd(0,new P.km(b))},
W:function(a,b){var z,y
this.d8(b)
z=this.a4()
y=z.W(0,b)
this.dJ(z)
return y},
gv:function(a){var z=this.a4()
return z.gv(z)},
w:function(a,b){return this.a4().w(0,b)},
kd:function(a,b){var z,y
z=this.a4()
y=b.$1(z)
this.dJ(z)
return y},
$isd:1,
$asd:function(){return[P.p]}},
km:{"^":"h:0;a",
$1:function(a){return a.l(0,this.a)},
$isi:1},
kI:{"^":"b4;a,b",
gaO:function(){var z,y
z=this.b
y=H.S(z,"I",0)
return new H.d_(new H.ep(z,new P.kJ(),[y]),new P.kK(),[y,null])},
F:function(a,b){C.a.F(P.Y(this.gaO(),!1,W.a9),b)},
j:function(a,b,c){var z=this.gaO()
J.ju(z.b.$1(J.cf(z.a,b)),c)},
si:function(a,b){var z=J.a4(this.gaO().a)
if(b>=z)return
else if(b<0)throw H.b(P.ag("Invalid list length"))
this.kr(0,b,z)},
l:function(a,b){this.b.a.appendChild(b)},
B:function(a,b){return!1},
V:function(a,b,c,d,e){throw H.b(new P.o("Cannot setRange on filtered list"))},
aC:function(a,b,c,d){return this.V(a,b,c,d,0)},
kr:function(a,b,c){var z=this.gaO()
z=H.ni(z,b,H.S(z,"a_",0))
C.a.F(P.Y(H.nU(z,c-b,H.S(z,"a_",0)),!0,null),new P.kL())},
gi:function(a){return J.a4(this.gaO().a)},
h:function(a,b){var z=this.gaO()
return z.b.$1(J.cf(z.a,b))},
gJ:function(a){var z=P.Y(this.gaO(),!1,W.a9)
return new J.ck(z,z.length,0,null)},
$asd:function(){return[W.a9]},
$asb4:function(){return[W.a9]},
$asc:function(){return[W.a9]}},
kJ:{"^":"h:0;",
$1:function(a){return!!J.t(a).$isa9},
$isi:1},
kK:{"^":"h:0;",
$1:function(a){return H.qQ(a,"$isa9")},
$isi:1},
kL:{"^":"h:0;",
$1:function(a){return J.f1(a)},
$isi:1}}],["","",,P,{"^":"",
is:function(a){var z,y,x
z=new P.J(0,$.r,null,[null])
y=new P.ik(z,[null])
a.toString
x=W.ab
W.O(a,"success",new P.pW(a,y),!1,x)
W.O(a,"error",y.gjb(),!1,x)
return z},
kp:{"^":"f;",
fw:[function(a,b){a.continue(b)},function(a){return this.fw(a,null)},"kf","$1","$0","gaW",0,2,22],
"%":";IDBCursor"},
rQ:{"^":"kp;",
gA:function(a){return new P.df([],[],!1).au(a.value)},
"%":"IDBCursorWithValue"},
rT:{"^":"z;C:name=","%":"IDBDatabase"},
pW:{"^":"h:0;a,b",
$1:function(a){this.b.ad(0,new P.df([],[],!1).au(this.a.result))},
$isi:1},
dY:{"^":"f;C:name=",
aB:function(a,b){var z,y,x,w,v
try{z=a.get(b)
w=P.is(z)
return w}catch(v){y=H.H(v)
x=H.W(v)
w=P.dV(y,x,null)
return w}},
$ise:1,
$isdY:1,
"%":"IDBIndex"},
uq:{"^":"f;C:name=",
eP:function(a,b,c){var z,y,x,w,v
try{z=null
z=this.is(a,b)
w=P.is(z)
return w}catch(v){y=H.H(v)
x=H.W(v)
w=P.dV(y,x,null)
return w}},
l:function(a,b){return this.eP(a,b,null)},
it:function(a,b,c){return a.add(new P.pE([],[]).au(b))},
is:function(a,b){return this.it(a,b,null)},
kX:[function(a,b){return a.index(b)},"$1","gbf",2,0,23],
"%":"IDBObjectStore"},
uR:{"^":"z;a9:error=","%":"IDBOpenDBRequest|IDBRequest|IDBVersionChangeRequest"},
vA:{"^":"z;a9:error=","%":"IDBTransaction"}}],["","",,P,{"^":"",m_:{"^":"h:0;a,b,c,d,e",
$1:function(a){var z,y,x
y=J.G(a)
z=new P.fU(y.h(a,1),y.h(a,2),y.h(a,3))
if(this.e)if(!this.a){y=z.gfM()
x=new Array(2)
x.fixed$length=Array
x[0]="resume"
x[1]=y
J.aF(z.gdf(),x)}return z},
$isi:1},fU:{"^":"e;df:a<,fM:b<,c",
jZ:function(a){J.aF(this.a,["kill",this.c,a])},
aJ:function(){return this.jZ(1)},
t:{
lZ:function(a,b,c,d,e,f){var z,y,x,w,v,u
z=!1
try{if(!H.bl(a,{func:1,args:[,]})){w=P.ag(a)
throw H.b(w)}$.fX=!0
v=a instanceof H.h?a.$static_name:null
if(v==null)H.C(new P.o("only top-level functions can be spawned."))
w=H.fY(v,null,null,b,!1,!1,z===!0).dF(new P.m_(!1,c,e,d,z))
return w}catch(u){y=H.H(u)
x=H.W(u)
w=P.dV(y,x,P.fU)
return w}}}}}],["","",,P,{"^":"",
c8:function(a,b){a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6},
ie:function(a){a=536870911&a+((67108863&a)<<3)
a^=a>>>11
return 536870911&a+((16383&a)<<15)},
wj:[function(a,b){return Math.min(H.aA(a),H.aA(b))},"$2","dw",4,0,function(){return{func:1,args:[,,]}}],
wi:[function(a,b){return Math.max(H.aA(a),H.aA(b))},"$2","bJ",4,0,function(){return{func:1,args:[,,]}}],
n0:function(a){return C.h},
p3:{"^":"e;",
ah:function(){return Math.random()}},
c_:{"^":"e;m:a>,n:b>,$ti",
k:function(a){return"Point("+H.j(this.a)+", "+H.j(this.b)+")"},
I:function(a,b){var z,y
if(b==null)return!1
if(!(b instanceof P.c_))return!1
z=this.a
y=b.a
if(z==null?y==null:z===y){z=this.b
y=b.b
y=z==null?y==null:z===y
z=y}else z=!1
return z},
gK:function(a){var z,y
z=J.a8(this.a)
y=J.a8(this.b)
return P.ie(P.c8(P.c8(0,z),y))},
N:function(a,b){var z,y,x,w
z=this.a
y=J.k(b)
x=y.gm(b)
if(typeof z!=="number")return z.N()
if(typeof x!=="number")return H.l(x)
w=this.b
y=y.gn(b)
if(typeof w!=="number")return w.N()
if(typeof y!=="number")return H.l(y)
return new P.c_(z+x,w+y,this.$ti)},
a2:function(a,b){var z,y,x,w
z=this.a
y=J.k(b)
x=y.gm(b)
if(typeof z!=="number")return z.a2()
if(typeof x!=="number")return H.l(x)
w=this.b
y=y.gn(b)
if(typeof w!=="number")return w.a2()
if(typeof y!=="number")return H.l(y)
return new P.c_(z-x,w-y,this.$ti)},
H:function(a,b){var z,y
z=this.a
if(typeof z!=="number")return z.H()
if(typeof b!=="number")return H.l(b)
y=this.b
if(typeof y!=="number")return y.H()
return new P.c_(z*b,y*b,this.$ti)}},
po:{"^":"e;$ti",
gdB:function(a){var z=this.a
if(typeof z!=="number")return z.N()
return z+this.c},
gdd:function(a){var z=this.b
if(typeof z!=="number")return z.N()
return z+this.d},
k:function(a){return"Rectangle ("+H.j(this.a)+", "+H.j(this.b)+") "+this.c+" x "+this.d},
I:function(a,b){var z,y,x,w
if(b==null)return!1
z=J.t(b)
if(!z.$isac)return!1
y=this.a
x=z.gbG(b)
if(y==null?x==null:y===x){x=this.b
w=z.gbK(b)
if(x==null?w==null:x===w){if(typeof y!=="number")return y.N()
if(y+this.c===z.gdB(b)){if(typeof x!=="number")return x.N()
z=x+this.d===z.gdd(b)}else z=!1}else z=!1}else z=!1
return z},
gK:function(a){var z,y,x,w
z=this.a
y=J.a8(z)
x=this.b
w=J.a8(x)
if(typeof z!=="number")return z.N()
if(typeof x!=="number")return x.N()
return P.ie(P.c8(P.c8(P.c8(P.c8(0,y),w),z+this.c&0x1FFFFFFF),x+this.d&0x1FFFFFFF))}},
ac:{"^":"po;bG:a>,bK:b>,a1:c>,a_:d>,$ti",$asac:null,t:{
n3:function(a,b,c,d,e){var z,y
if(typeof c!=="number")return c.aw()
if(c<0)z=-c*0
else z=c
if(typeof d!=="number")return d.aw()
if(d<0)y=-d*0
else y=d
return new P.ac(a,b,z,y,[e])}}}}],["","",,P,{"^":"",rl:{"^":"bt;",$isf:1,"%":"SVGAElement"},ro:{"^":"f;A:value=","%":"SVGAngle"},rq:{"^":"F;",$isf:1,"%":"SVGAnimateElement|SVGAnimateMotionElement|SVGAnimateTransformElement|SVGAnimationElement|SVGSetElement"},rC:{"^":"fK;bi:r=","%":"SVGCircleElement"},t9:{"^":"F;m:x=,n:y=",$isf:1,"%":"SVGFEBlendElement"},ta:{"^":"F;p:type=,m:x=,n:y=",$isf:1,"%":"SVGFEColorMatrixElement"},tb:{"^":"F;m:x=,n:y=",$isf:1,"%":"SVGFEComponentTransferElement"},tc:{"^":"F;m:x=,n:y=",$isf:1,"%":"SVGFECompositeElement"},td:{"^":"F;m:x=,n:y=",$isf:1,"%":"SVGFEConvolveMatrixElement"},te:{"^":"F;m:x=,n:y=",$isf:1,"%":"SVGFEDiffuseLightingElement"},tf:{"^":"F;m:x=,n:y=",$isf:1,"%":"SVGFEDisplacementMapElement"},tg:{"^":"F;m:x=,n:y=",$isf:1,"%":"SVGFEFloodElement"},th:{"^":"F;m:x=,n:y=",$isf:1,"%":"SVGFEGaussianBlurElement"},ti:{"^":"F;m:x=,n:y=",$isf:1,"%":"SVGFEImageElement"},tj:{"^":"F;m:x=,n:y=",$isf:1,"%":"SVGFEMergeElement"},tk:{"^":"F;m:x=,n:y=",$isf:1,"%":"SVGFEMorphologyElement"},tl:{"^":"F;m:x=,n:y=",$isf:1,"%":"SVGFEOffsetElement"},tm:{"^":"F;m:x=,n:y=,R:z=","%":"SVGFEPointLightElement"},tn:{"^":"F;m:x=,n:y=",$isf:1,"%":"SVGFESpecularLightingElement"},to:{"^":"F;m:x=,n:y=,R:z=","%":"SVGFESpotLightElement"},tp:{"^":"F;m:x=,n:y=",$isf:1,"%":"SVGFETileElement"},tq:{"^":"F;p:type=,m:x=,n:y=",$isf:1,"%":"SVGFETurbulenceElement"},tv:{"^":"F;m:x=,n:y=",$isf:1,"%":"SVGFilterElement"},ty:{"^":"bt;m:x=,n:y=","%":"SVGForeignObjectElement"},fK:{"^":"bt;","%":"SVGEllipseElement|SVGLineElement|SVGPathElement|SVGPolygonElement|SVGPolylineElement;SVGGeometryElement"},bt:{"^":"F;",$isf:1,"%":"SVGClipPathElement|SVGDefsElement|SVGGElement|SVGSwitchElement;SVGGraphicsElement"},tI:{"^":"bt;m:x=,n:y=",$isf:1,"%":"SVGImageElement"},bW:{"^":"f;A:value=",$ise:1,"%":"SVGLength"},tN:{"^":"ly;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.L(b,a,null,null,null))
return a.getItem(b)},
j:function(a,b,c){throw H.b(new P.o("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.o("Cannot resize immutable List."))},
gv:function(a){if(a.length>0)return a[0]
throw H.b(new P.x("No elements"))},
w:function(a,b){return this.h(a,b)},
$isd:1,
$asd:function(){return[P.bW]},
$isc:1,
$asc:function(){return[P.bW]},
"%":"SVGLengthList"},le:{"^":"f+I;",$isd:1,
$asd:function(){return[P.bW]},
$isc:1,
$asc:function(){return[P.bW]}},ly:{"^":"le+U;",$isd:1,
$asd:function(){return[P.bW]},
$isc:1,
$asc:function(){return[P.bW]}},tS:{"^":"F;",$isf:1,"%":"SVGMarkerElement"},tT:{"^":"F;m:x=,n:y=",$isf:1,"%":"SVGMaskElement"},tV:{"^":"f;ay:b=","%":"SVGMatrix"},bZ:{"^":"f;A:value=",$ise:1,"%":"SVGNumber"},um:{"^":"lz;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.L(b,a,null,null,null))
return a.getItem(b)},
j:function(a,b,c){throw H.b(new P.o("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.o("Cannot resize immutable List."))},
gv:function(a){if(a.length>0)return a[0]
throw H.b(new P.x("No elements"))},
w:function(a,b){return this.h(a,b)},
$isd:1,
$asd:function(){return[P.bZ]},
$isc:1,
$asc:function(){return[P.bZ]},
"%":"SVGNumberList"},lf:{"^":"f+I;",$isd:1,
$asd:function(){return[P.bZ]},
$isc:1,
$asc:function(){return[P.bZ]}},lz:{"^":"lf+U;",$isd:1,
$asd:function(){return[P.bZ]},
$isc:1,
$asc:function(){return[P.bZ]}},uw:{"^":"F;m:x=,n:y=",$isf:1,"%":"SVGPatternElement"},uB:{"^":"f;m:x=,n:y=","%":"SVGPoint"},uC:{"^":"f;i:length=","%":"SVGPointList"},uM:{"^":"p0;bi:r=","%":"SVGRadialGradientElement"},uN:{"^":"f;m:x=,n:y=","%":"SVGRect"},uO:{"^":"fK;m:x=,n:y=","%":"SVGRectElement"},hu:{"^":"F;p:type%",$isf:1,$ishu:1,"%":"SVGScriptElement"},vi:{"^":"lA;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.L(b,a,null,null,null))
return a.getItem(b)},
j:function(a,b,c){throw H.b(new P.o("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.o("Cannot resize immutable List."))},
gv:function(a){if(a.length>0)return a[0]
throw H.b(new P.x("No elements"))},
w:function(a,b){return this.h(a,b)},
$isd:1,
$asd:function(){return[P.p]},
$isc:1,
$asc:function(){return[P.p]},
"%":"SVGStringList"},lg:{"^":"f+I;",$isd:1,
$asd:function(){return[P.p]},
$isc:1,
$asc:function(){return[P.p]}},lA:{"^":"lg+U;",$isd:1,
$asd:function(){return[P.p]},
$isc:1,
$asc:function(){return[P.p]}},vk:{"^":"F;p:type%","%":"SVGStyleElement"},jO:{"^":"fi;a",
a4:function(){var z,y,x,w,v,u
z=this.a.getAttribute("class")
y=P.ai(null,null,null,P.p)
if(z==null)return y
for(x=z.split(" "),w=x.length,v=0;v<x.length;x.length===w||(0,H.D)(x),++v){u=J.dI(x[v])
if(u.length!==0)y.l(0,u)}return y},
dJ:function(a){this.a.setAttribute("class",a.dl(0," "))}},F:{"^":"a9;",
gbw:function(a){return new P.jO(a)},
gc8:function(a){return new P.kI(a,new W.az(a))},
az:function(a,b,c,d){var z,y,x,w,v,u
z=H.v([],[W.hg])
z.push(W.ib(null))
z.push(W.il())
z.push(new W.pG())
c=new W.im(new W.hh(z))
y='<svg version="1.1">'+b+"</svg>"
z=document
x=z.body
w=(x&&C.x).jj(x,y,c)
v=z.createDocumentFragment()
w.toString
z=new W.az(w)
u=z.gaZ(z)
for(;z=u.firstChild,z!=null;)v.appendChild(z)
return v},
gdv:function(a){return new W.X(a,"change",!1,[W.ab])},
gfz:function(a){return new W.X(a,"click",!1,[W.a2])},
gfA:function(a){return new W.X(a,"mousedown",!1,[W.a2])},
gfB:function(a){return new W.X(a,"mousemove",!1,[W.a2])},
gfC:function(a){return new W.X(a,"mouseout",!1,[W.a2])},
gfD:function(a){return new W.X(a,"mouseup",!1,[W.a2])},
gfE:function(a){return new W.X(a,"mousewheel",!1,[W.cw])},
gfI:function(a){return new W.X(a,"touchcancel",!1,[W.ay])},
gfJ:function(a){return new W.X(a,"touchend",!1,[W.ay])},
gfK:function(a){return new W.X(a,"touchmove",!1,[W.ay])},
gfL:function(a){return new W.X(a,"touchstart",!1,[W.ay])},
$isf:1,
$isF:1,
"%":"SVGComponentTransferFunctionElement|SVGDescElement|SVGDiscardElement|SVGFEDistantLightElement|SVGFEFuncAElement|SVGFEFuncBElement|SVGFEFuncGElement|SVGFEFuncRElement|SVGFEMergeNodeElement|SVGMetadataElement|SVGStopElement|SVGTitleElement;SVGElement"},vn:{"^":"bt;m:x=,n:y=",$isf:1,"%":"SVGSVGElement"},vo:{"^":"F;",$isf:1,"%":"SVGSymbolElement"},hJ:{"^":"bt;","%":";SVGTextContentElement"},vt:{"^":"hJ;",$isf:1,"%":"SVGTextPathElement"},vu:{"^":"hJ;m:x=,n:y=","%":"SVGTSpanElement|SVGTextElement|SVGTextPositioningElement"},c4:{"^":"f;p:type=",$ise:1,"%":"SVGTransform"},vB:{"^":"lB;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.L(b,a,null,null,null))
return a.getItem(b)},
j:function(a,b,c){throw H.b(new P.o("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.o("Cannot resize immutable List."))},
gv:function(a){if(a.length>0)return a[0]
throw H.b(new P.x("No elements"))},
w:function(a,b){return this.h(a,b)},
$isd:1,
$asd:function(){return[P.c4]},
$isc:1,
$asc:function(){return[P.c4]},
"%":"SVGTransformList"},lh:{"^":"f+I;",$isd:1,
$asd:function(){return[P.c4]},
$isc:1,
$asc:function(){return[P.c4]}},lB:{"^":"lh+U;",$isd:1,
$asd:function(){return[P.c4]},
$isc:1,
$asc:function(){return[P.c4]}},vG:{"^":"bt;m:x=,n:y=",$isf:1,"%":"SVGUseElement"},vK:{"^":"F;",$isf:1,"%":"SVGViewElement"},vL:{"^":"f;",$isf:1,"%":"SVGViewSpec"},p0:{"^":"F;",$isf:1,"%":"SVGLinearGradientElement;SVGGradientElement"},w3:{"^":"F;",$isf:1,"%":"SVGCursorElement"},w4:{"^":"F;",$isf:1,"%":"SVGFEDropShadowElement"},w5:{"^":"F;",$isf:1,"%":"SVGMPathElement"}}],["","",,P,{"^":"",oe:{"^":"e;",$isd:1,
$asd:function(){return[P.m]},
$isc:1,
$asc:function(){return[P.m]}},kM:{"^":"e;",$isd:1,
$asd:function(){return[P.K]},
$isc:1,
$asc:function(){return[P.K]}}}],["","",,P,{"^":"",rt:{"^":"f;i:length=","%":"AudioBuffer"},f7:{"^":"z;","%":"AnalyserNode|AudioChannelMerger|AudioChannelSplitter|AudioDestinationNode|AudioGainNode|AudioPannerNode|ChannelMergerNode|ChannelSplitterNode|ConvolverNode|DelayNode|DynamicsCompressorNode|GainNode|IIRFilterNode|JavaScriptAudioNode|MediaStreamAudioDestinationNode|PannerNode|RealtimeAnalyserNode|ScriptProcessorNode|StereoPannerNode|WaveShaperNode|webkitAudioPannerNode;AudioNode"},ru:{"^":"f;A:value=","%":"AudioParam"},jP:{"^":"f7;","%":"AudioBufferSourceNode|MediaElementAudioSourceNode|MediaStreamAudioSourceNode;AudioSourceNode"},ry:{"^":"f7;p:type%","%":"BiquadFilterNode"},us:{"^":"jP;p:type%","%":"Oscillator|OscillatorNode"}}],["","",,P,{"^":"",rm:{"^":"f;C:name=,p:type=","%":"WebGLActiveInfo"},rp:{"^":"f;",
jx:function(a,b,c,d,e,f){return a.drawElementsInstancedANGLE(b,c,d,e,f)},
kF:function(a,b,c){return a.vertexAttribDivisorANGLE(b,c)},
"%":"ANGLEInstancedArrays|ANGLE_instanced_arrays"},uP:{"^":"f;",
da:function(a,b,c){return a.attachShader(b,c)},
c6:function(a,b,c){return a.bindBuffer(b,c)},
eU:function(a,b,c){return a.blendFunc(b,c)},
eV:function(a,b,c,d){return a.bufferData(b,c,d)},
eW:function(a,b,c,d){return a.bufferSubData(b,c,d)},
f_:function(a,b){return a.clear(b)},
f0:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
de:function(a,b){return a.compileShader(b)},
by:function(a){return a.createBuffer()},
f5:function(a){return a.createProgram()},
dh:function(a,b){return a.createShader(b)},
f6:function(a,b){return a.cullFace(b)},
fa:function(a,b){return a.depthFunc(b)},
fc:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
fg:function(a,b){return a.enable(b)},
fh:function(a,b){return a.enableVertexAttribArray(b)},
dN:function(a,b,c){return a.getAttribLocation(b,c)},
dP:function(a,b){return a.getExtension(b)},
dR:function(a,b){return a.getProgramInfoLog(b)},
dS:function(a,b,c){return a.getProgramParameter(b,c)},
cw:function(a,b){return a.getShaderInfoLog(b)},
cz:function(a,b,c){return a.getShaderParameter(b,c)},
dT:function(a,b,c){return a.getUniformLocation(b,c)},
fn:function(a,b){return a.linkProgram(b)},
cE:function(a,b,c){return a.shaderSource(b,c)},
fW:function(a,b,c){return a.uniform1f(b,c)},
fX:function(a,b,c){return a.uniform3fv(b,c)},
fY:function(a,b,c){return a.uniform4fv(b,c)},
fZ:function(a,b,c,d){return a.uniformMatrix4fv(b,!1,d)},
h7:function(a,b){return a.useProgram(b)},
h9:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,!1,f,g)},
ha:function(a,b,c,d,e){return a.viewport(b,c,d,e)},
"%":"WebGLRenderingContext"},uQ:{"^":"f;",
da:function(a,b,c){return a.attachShader(b,c)},
c6:function(a,b,c){return a.bindBuffer(b,c)},
eU:function(a,b,c){return a.blendFunc(b,c)},
eV:function(a,b,c,d){return a.bufferData(b,c,d)},
eW:function(a,b,c,d){return a.bufferSubData(b,c,d)},
f_:function(a,b){return a.clear(b)},
f0:function(a,b,c,d,e){return a.clearColor(b,c,d,e)},
de:function(a,b){return a.compileShader(b)},
by:function(a){return a.createBuffer()},
f5:function(a){return a.createProgram()},
dh:function(a,b){return a.createShader(b)},
f6:function(a,b){return a.cullFace(b)},
fa:function(a,b){return a.depthFunc(b)},
fc:function(a,b,c,d,e){return a.drawElements(b,c,d,e)},
fg:function(a,b){return a.enable(b)},
fh:function(a,b){return a.enableVertexAttribArray(b)},
dN:function(a,b,c){return a.getAttribLocation(b,c)},
dP:function(a,b){return a.getExtension(b)},
dR:function(a,b){return a.getProgramInfoLog(b)},
dS:function(a,b,c){return a.getProgramParameter(b,c)},
cw:function(a,b){return a.getShaderInfoLog(b)},
cz:function(a,b,c){return a.getShaderParameter(b,c)},
dT:function(a,b,c){return a.getUniformLocation(b,c)},
fn:function(a,b){return a.linkProgram(b)},
cE:function(a,b,c){return a.shaderSource(b,c)},
fW:function(a,b,c){return a.uniform1f(b,c)},
fX:function(a,b,c){return a.uniform3fv(b,c)},
fY:function(a,b,c){return a.uniform4fv(b,c)},
fZ:function(a,b,c,d){return a.uniformMatrix4fv(b,!1,d)},
h7:function(a,b){return a.useProgram(b)},
h9:function(a,b,c,d,e,f,g){return a.vertexAttribPointer(b,c,d,!1,f,g)},
ha:function(a,b,c,d,e){return a.viewport(b,c,d,e)},
$isf:1,
"%":"WebGL2RenderingContext"},og:{"^":"f;",$ise:1,"%":"WebGLUniformLocation"},w9:{"^":"f;",$isf:1,"%":"WebGL2RenderingContextBase"}}],["","",,P,{"^":"",ve:{"^":"f;P:message=","%":"SQLError"},vf:{"^":"lC;",
gi:function(a){return a.length},
h:function(a,b){if(b>>>0!==b||b>=a.length)throw H.b(P.L(b,a,null,null,null))
return P.qx(a.item(b))},
j:function(a,b,c){throw H.b(new P.o("Cannot assign element of immutable List."))},
si:function(a,b){throw H.b(new P.o("Cannot resize immutable List."))},
gv:function(a){if(a.length>0)return a[0]
throw H.b(new P.x("No elements"))},
w:function(a,b){return this.h(a,b)},
$isd:1,
$asd:function(){return[P.M]},
$isc:1,
$asc:function(){return[P.M]},
"%":"SQLResultSetRowList"},li:{"^":"f+I;",$isd:1,
$asd:function(){return[P.M]},
$isc:1,
$asc:function(){return[P.M]}},lC:{"^":"li+U;",$isd:1,
$asd:function(){return[P.M]},
$isc:1,
$asc:function(){return[P.M]}}}],["","",,N,{"^":"",dK:{"^":"e;a,b,c",
ce:function(a,b){var z,y,x
z=this.c
z.dA(0,b,new N.jQ())
z=z.h(0,b)
y=this.a
x=y.b
if(x==null)x=$.b9.$0()
J.bM(z,J.an(J.ce(J.N(J.an(x,y.a),1e6),$.aW),this.b.h(0,b)))}},jQ:{"^":"h:1;",
$0:function(){return H.v([],[P.m])},
$isi:1},jS:{"^":"e;a,b,c,d,e,f,r,x,y",
am:function(a){var z=0,y=P.br(),x,w=this,v,u
var $async$am=P.bH(function(b,c){if(b===1)return P.bB(c,y)
while(true)switch(z){case 0:v=w.a
v.G("group: loadSimulation")
v.G("Loading new simulation...")
z=3
return P.aZ(w.ae(0),$async$am)
case 3:z=w.f?4:6
break
case 4:z=7
return P.aZ(w.d.am(a),$async$am)
case 7:u=c
z=5
break
case 6:w.e.a=a
u=!0
case 5:v.G("Loaded simulation.")
w.at(0)
$.$get$bE().G("groupEnd")
x=u
z=1
break
case 1:return P.bC(x,y)}})
return P.bD($async$am,y)},
ae:function(a){var z=0,y=P.br(),x=this,w,v
var $async$ae=P.bH(function(b,c){if(b===1)return P.bB(c,y)
while(true)switch(z){case 0:z=x.r?2:3
break
case 2:w=x.a
w.G("Pausing engine...")
if(x.f){v=x.d
v=v.d!=null&&!v.y}else v=!1
z=v?4:6
break
case 4:z=7
return P.aZ(x.d.ae(0),$async$ae)
case 7:x.r=!1
z=5
break
case 6:x.r=!1
case 5:w.G("Paused engine.")
case 3:return P.bC(null,y)}})
return P.bD($async$ae,y)},
at:function(a){var z
if(!this.r){z=this.a
z.G("Resuming engine...")
this.r=!0
if(this.f){if(this.d.at(0))z.G("Resumed engine.")}else z.G("Resumed engine.")}},
hN:function(a){var z=this.y
this.x=new P.bx(z,[H.B(z,0)])
this.d.a.dm(new N.jU(this))},
t:{
jT:function(a){var z,y,x,w,v
z=N.b6("bromium.engine.BromiumEngine")
y=[null]
x=new P.i0(null,0,null,null,null,null,null,y)
w=new N.nd(null,x,N.b6("bromium.engine.SimulationIsolate"),null,null,null,0,!1,!0,!1,null,null,null,null)
w.a=new P.bx(x,[null])
x=new P.hC(0,0)
if($.aW==null){H.hn()
$.aW=$.ct}v=P.p
x.e0(0)
z=new N.jS(z,new G.n7(null,null,null),-1,w,new N.hx(null,new N.dK(x,new H.Q(0,null,null,null,null,null,0,[v,P.m]),new H.Q(0,null,null,null,null,null,0,[v,[P.c,P.aq]]))),!0,!1,null,new P.i0(null,0,null,null,null,null,null,y))
z.hN(!0)
return z}}},jU:{"^":"h:0;a",
$1:function(a){var z,y,x
z=this.a
y=z.b
y.h1(0,a);++z.c
z=z.y
y=y.dQ()
if(z.b>=4)H.C(z.b5())
x=z.b
if((x&1)!==0)z.ag(y)
else if((x&3)===0)z.b8().l(0,new P.by(y,null,[H.B(z,0)]))},
$isi:1},dZ:{"^":"e;a,hy:b<"},nd:{"^":"e;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy",
aJ:function(){var z,y,x
z=this.c
z.G("Killing isolate...")
y=this.d
if(y!=null){z=P.aD
x=[z]
if(this.x){this.ch=new P.bw(new P.J(0,$.r,null,x),[z])
this.x=!1
this.z=!0
y.aJ()
return this.ch.a}else{y.aJ()
this.d=null
z=new P.J(0,$.r,null,x)
z.b4(!0)
return z}}else{z.cs("No isolate is active!")
z=new P.J(0,$.r,null,[P.aD])
z.b4(!1)
return z}},
ae:function(a){var z,y,x
z=this.c
z.G("Pausing isolate...")
y=P.aD
x=[y]
if(this.x){z=new P.J(0,$.r,null,x)
this.Q=new P.bw(z,[y])
this.x=!1
return z}else{z.cs("No isolate is running!")
z=new P.J(0,$.r,null,x)
z.b4(!1)
return z}},
at:function(a){var z,y
z=this.c
z.G("Resuming isolate...")
if(this.d!=null){y=this.f
if(y!=null)if(!this.x){this.r=0
this.z=!1
this.x=!0
this.y=!1
y.ac(0,1)
return!0}else{z.cs("Isolate is already running!")
return!1}else{z.hw("Isolate is active but we have no send port!")
return!1}}else{z.cs("No isolate is active!")
return!1}},
am:function(a){var z=0,y=P.br(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i
var $async$am=P.bH(function(b,c){if(b===1){v=c
z=w}while(true)switch(z){case 0:q=t.c
q.G("group: loadSimulation")
q.G("Loading new simulation...")
p=P.aD
o=new P.J(0,$.r,null,[p])
a.h2()
n=t.b
m=a.b
if(n.b>=4)H.C(n.b5())
l=n.b
if((l&1)!==0)n.ag(m)
else if((l&3)===0)n.b8().l(0,new P.by(m,null,[H.B(n,0)]))
z=t.d!=null?3:4
break
case 3:z=5
return P.aZ(t.aJ(),$async$am)
case 5:case 4:n=$.c1
$.c1=n+1
m=new H.aV(n,null,!1)
l=init.globalState.d
l.b2(n,m)
l.aQ()
l=new H.ef(m,null)
l.cJ(m)
t.e=l
l=l.b
l.toString
new P.bx(l,[H.B(l,0)]).U(new N.nf(t,new P.bw(o,[p])),null,null,null)
t.x=!1
t.y=!0
w=7
q.G("Spawning isolate...")
i=t
z=10
return P.aZ(P.lZ(N.qz(),new N.dZ(new H.bA(t.e.a,init.globalState.d.a),G.hz(a)),null,null,null,!1),$async$am)
case 10:i.d=c
w=2
z=9
break
case 7:w=6
j=v
p=H.H(j)
if(!!J.t(p).$isbU){s=p
r=H.W(j)
q.dY("Failed to spawn isolate!",s,r)
$.$get$bE().G("groupEnd")
x=!1
z=1
break}else throw j
z=9
break
case 6:z=2
break
case 9:q.G("Succesfully spawned isolate.")
$.$get$bE().G("groupEnd")
x=o
z=1
break
case 1:return P.bC(x,y)
case 2:return P.bB(v,y)}})
return P.bD($async$am,y)},
t:{
v6:[function(a){var z,y,x,w,v,u,t
if($.ei)P.bK("[ISOLATE] Started isolate.")
if($.ei)P.bK("[ISOLATE] Unpacking simulation...")
z=a.ghy().h_()
if($.ei)P.bK("[ISOLATE] Finished unpacking the simulation.")
y=a.a
x=new P.hC(0,0)
if($.aW==null){H.hn()
$.aW=$.ct}w=P.p
x.e0(0)
v=new N.hx(null,new N.dK(x,new H.Q(0,null,null,null,null,null,0,[w,P.m]),new H.Q(0,null,null,null,null,null,0,[w,[P.c,P.aq]])))
v.a=z
x=$.c1
$.c1=x+1
w=new H.aV(x,null,!1)
u=init.globalState.d
u.b2(x,w)
u.aQ()
t=new H.ef(w,null)
t.cJ(w)
u=t.b
u.toString
new P.bx(u,[H.B(u,0)]).U(new N.ne(z,y,v),null,null,null)
y.ac(0,new H.bA(w,init.globalState.d.a))},"$1","qz",2,0,39]}},nf:{"^":"h:0;a,b",
$1:function(a){var z,y,x
z=J.t(a)
if(!!z.$isfd){z=this.a
y=z.b
if(y.b>=4)H.C(y.b5())
x=y.b
if((x&1)!==0)y.ag(a)
else if((x&3)===0)y.b8().l(0,new P.by(a,null,[H.B(y,0)]))
if(++z.r%128===0&&z.f!=null)if(z.x)z.f.ac(0,1)
else{y=z.c
if(z.z){y.G("Killed isolate.")
z.d=null
z.z=!1
z.y=!0
z.ch.ad(0,!0)}else{y.G("Paused isolate.")
z.y=!0
z.Q.ad(0,!0)}}}else if(!!z.$isdK){z=this.a
z.c.G("Retrieved benchmarks.")
C.B.ad(z.cx,a)}else if(!!z.$ishy){z=this.a
z.c.G("Retrieved compressed simulation.")
C.B.ad(z.cy,a.h_())}else if(!!z.$iseh){z=this.a
z.c.G("Retrieved isolate send port.")
z.f=a
this.b.ad(0,!0)}},
$isi:1},ne:{"^":"h:3;a,b,c",
$1:function(a){var z,y,x,w,v,u,t
if(typeof a!=="number")return a.kK()
if((a&1)!==0)for(z=this.c,y=this.b,x=128;x>0;--x){z.f7()
w=z.a
v=w.c
u=w.x.length
v=v.a
t=v.length
if(3>=t)return H.a(v,3)
v[3]=u
u=w.y.length
if(5>=t)return H.a(v,5)
v[5]=u
y.ac(0,w.b)}if((a&2)!==0)this.b.ac(0,this.c.b)
if((a&4)!==0)this.b.ac(0,G.hz(this.a))},
$isi:1},hx:{"^":"e;M:a>,b",
f7:function(){var z,y,x,w
z=this.b
y=z.b
x=z.a
if(this.a.y.length===0){w=x.b
if(w==null)w=$.b9.$0()
y.j(0,"particlesRandomMotionFast",J.ce(J.N(J.an(w,x.a),1e6),$.aW))
D.r2(this.a)
z.ce(0,"particlesRandomMotionFast")}else{w=x.b
if(w==null)w=$.b9.$0()
y.j(0,"particlesRandomMotionNormal",J.ce(J.N(J.an(w,x.a),1e6),$.aW))
D.r3(this.a)
z.ce(0,"particlesRandomMotionNormal")}if(this.a.f.length!==0){w=x.b
if(w==null)w=$.b9.$0()
y.j(0,"reactionsFastVoxel",J.ce(J.N(J.an(w,x.a),1e6),$.aW))
D.r6(this.a)
z.ce(0,"reactionsFastVoxel")}if(this.a.r.length!==0){w=x.b
if(w==null)w=$.b9.$0()
y.j(0,"reactionsUnbindRandom",J.ce(J.N(J.an(w,x.a),1e6),$.aW))
D.r8(this.a)
z.ce(0,"reactionsUnbindRandom")}}}}],["","",,D,{"^":"",
r2:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=a.b
y=a.d
x=a.x
w=(z&&C.e).S(z,y,x.length*7)
y=H.n(3)
z=new Float32Array(y)
v=new T.q(z)
for(u=w.length,t=0,s=0;s<u;++t,s=s+1+4){Z.iP(C.h,v)
if(t>=x.length)return H.a(x,t)
r=J.eY(x[t])
q=s+1
p=w[s]
if(0>=y)return H.a(z,0)
o=z[0]
if(typeof r!=="number")return H.l(r)
w[s]=p+o*r
s=q+1
if(q>=u)return H.a(w,q)
o=w[q]
if(1>=y)return H.a(z,1)
w[q]=o+z[1]*r
if(s>=u)return H.a(w,s)
o=w[s]
if(2>=y)return H.a(z,2)
w[s]=o+z[2]*r}},
r3:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=new T.q(new Float32Array(H.n(3)))
$OUTER$0:for(y=a.x,x=y.length,w=0;w<y.length;y.length===x||(0,H.D)(y),++w){v=y[w]
if(!v.gbE()){Z.iP(C.h,z)
z.ab(0,v.d)
z.l(0,v.b)
u=v.a
for(t=a.y,s=v.x,r=v.r,q=0;q<t.length;++q){if(q>=s.length)return H.a(s,q)
if(J.E(s[q],0)){if(q>=t.length)return H.a(t,q)
p=t[q]
o=p.a
n=J.eO(J.ak(o.dt(z),v.d))
if(q>=s.length)return H.a(s,q)
s[q]=n
m=C.a.B(r,q)
l=o.B(0,z)
k=!m&&l
j=m&&!l
if(p.hE(u,k,j)){C.a.W(r,p.b)
t=v.a
s=p.r
if(t>>>0!==t||t>=s.length)return H.a(s,t)
s[t]=s[t]-1
v.e1(p.b,o,!0)
o=p.x
t=v.a
if(t>>>0!==t||t>=o.length)return H.a(o,t)
o[t]=o[t]+1
continue $OUTER$0}if(k){o=p.c
if(u>>>0!==u||u>=o.length)return H.a(o,u)
if(o[u]===0)o=!1
else{o=$.$get$cb().ah()
n=p.c
if(u>=n.length)return H.a(n,u)
n=o<n[u]
o=n}o=!o}else o=!1
if(!o)if(j){o=p.d
if(u>>>0!==u||u>=o.length)return H.a(o,u)
if(o[u]===0)o=!1
else{o=$.$get$cb().ah()
n=p.d
if(u>=n.length)return H.a(n,u)
n=o<n[u]
o=n}o=!o}else o=!1
else o=!0
if(o)continue $OUTER$0
else if(k){r.push(p.b)
o=p.r
n=v.a
if(n>>>0!==n||n>=o.length)return H.a(o,n)
o[n]=o[n]+1}else if(j){C.a.W(r,p.b)
o=v.a
n=p.r
if(o>>>0!==o||o>=n.length)return H.a(n,o)
n[o]=n[o]-1}}else{if(q>=s.length)return H.a(s,q)
o=J.an(s[q],1)
if(q>=s.length)return H.a(s,q)
s[q]=o}}v.b.q(z)}}},
r6:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=H.v(new Array(a.e.length),[[P.c,D.eo]])
for(y=a.x,x=z.length,w=[D.eo],v=0;v<y.length;++v){u=y[v]
t=J.k(u)
s=t.gp(u)
if(s>>>0!==s||s>=x)return H.a(z,s)
if(z[s]==null){s=t.gp(u)
r=H.v([],w)
if(s>>>0!==s||s>=x)return H.a(z,s)
z[s]=r}s=t.gp(u)
if(s>>>0!==s||s>=x)return H.a(z,s)
s=z[s]
t=t.gas(u)
r=J.k(t)
s.push(new D.eo(v,17179869184*(C.b.dG(r.gm(t)*50)+65536)+131072*(C.b.dG(r.gn(t)*50)+65536)+(C.b.dG(r.gR(t)*50)+65536)))}for(v=0;v<x;++v){w=z[v]
if(w!=null){t=new D.r7()
s=w.length-1
if(s-0<=32)H.ek(w,0,s,t)
else H.ej(w,0,s,t)}}q=H.v([],[G.bq])
for(w=a.f,p=0;p<w.length;++p){o=w[p]
t=o.b.a
if(t>>>0!==t||t>=x)return H.a(z,t)
s=z[t]
if(s!=null){r=o.c.a
if(r>>>0!==r||r>=x)return H.a(z,r)
r=z[r]==null}else r=!0
if(r)continue
s=s.length
r=o.c.a
if(r>>>0!==r||r>=x)return H.a(z,r)
n=s<z[r].length
if(n)m=t
else m=r
if(n)l=r
else l=t
$REACTION$1:for(k=0,j=0;t=z[m],s=t.length,k<s;++k){if(k<0)return H.a(t,k)
t=t[k]
i=t.b
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
t=o.kD(t,n?f:g)}else t=!1
if(t){t=z[m]
if(k>=t.length)return H.a(t,k)
t=t[k]
s=z[l]
if(j>=s.length)return H.a(s,j)
q.push(new G.bq(t.a,s[j].a,p))
s=z[m];(s&&C.a).fO(s,k)
s=z[l];(s&&C.a).fO(s,j);--k
if(j===z[l].length)break $REACTION$1}}}a.j1(q)},
r8:function(a){var z,y,x,w,v,u,t,s,r,q
z=P.m
y=new H.Q(0,null,null,null,null,null,0,[z,[P.c,[S.a3,P.m,P.K]]])
for(x=a.r,z=[z,P.K],w=0;w<x.length;++w){v=x[w]
u=v.b
y.dA(0,u.a,new D.r9())
u=y.h(0,u.a)
t=v.a.a
if(0>=t.length)return H.a(t,0)
J.bM(u,new S.a3(w,t[0],z))}for(z=a.x,w=0;u=z.length,w<u;++w){if(w<0)return H.a(z,w)
s=J.bp(z[w])
if(y.O(0,s))for(u=J.av(y.h(0,s));u.u();){v=u.gD()
t=C.h.ah()
r=v.gbg()
if(typeof r!=="number")return H.l(r)
if(t<r){u=v.a
if(u>>>0!==u||u>=x.length)return H.a(x,u)
a.kE(w,x[u].c)
q=w-1
w=q
break}}}},
eo:{"^":"e;a,fu:b<"},
r7:{"^":"h:4;",
$2:function(a,b){return a.gfu()-b.gfu()},
$isi:1},
r9:{"^":"h:1;",
$0:function(){return H.v([],[[S.a3,P.m,P.K]])},
$isi:1}}],["","",,D,{}],["","",,Z,{"^":"",
qp:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k
z=H.v([],[P.K])
y=b.a.a
x=y.length
if(0>=x)return H.a(y,0)
w=y[0]
v=b.b.a
u=v.length
if(0>=u)return H.a(v,0)
t=v[0]
if(1>=x)return H.a(y,1)
s=y[1]
if(1>=u)return H.a(v,1)
r=v[1]
if(2>=x)return H.a(y,2)
y=y[2]
if(2>=u)return H.a(v,2)
q=[w,t,s,r,y,v[2]]
v=a.a.a
y=v.length
if(0>=y)return H.a(v,0)
r=v[0]
s=a.b.a
t=s.length
if(0>=t)return H.a(s,0)
w=s[0]
if(1>=y)return H.a(v,1)
u=v[1]
if(1>=t)return H.a(s,1)
x=s[1]
if(2>=y)return H.a(v,2)
v=v[2]
if(2>=t)return H.a(s,2)
p=[r,w,u,x,v,s[2]]
for(o=0;o<3;++o){y=o*2
x=y+1
if(x>=6)return H.a(p,x)
if(p[x]===0)continue
for(w=(o+1)%3*2,v=w+1,u=(o+2)%3*2,t=u+1,n=0;n<2;++n){s=y+n
if(s>=6)return H.a(q,s)
s=q[s]
if(y>=6)return H.a(p,y)
m=(s-p[y])/p[x]
if(w>=6)return H.a(p,w)
s=p[w]
if(v>=6)return H.a(p,v)
l=s+m*p[v]
if(u>=6)return H.a(p,u)
s=p[u]
if(t>=6)return H.a(p,t)
k=s+m*p[t]
if(l>q[w]&&l<q[v]&&k>q[u]&&k<q[t]){z.push(m)
if(z.length===2)return z}}}return z},
fw:function(a,b){var z,y,x
z=J.dy(a,b,1)
if(0>=z.length)return H.a(z,0)
z=z[0]
if(z>=3)return H.a(C.G,z)
b+=4
switch(C.G[z]){case C.j:return new Z.cM(new T.cj(new T.q(C.e.S(a,b,3)),new T.q(C.e.S(a,b+12,3))),C.j)
case C.n:z=C.e.S(a,b,3)
y=C.e.S(a,b+12,1)
x=y.length
if(x===0)H.C(H.a6())
if(0>=x)return H.a(y,0)
return new Z.el(new T.q(z),y[0],C.n)
case C.k:z=C.e.S(a,b,3)
y=new T.q(C.e.S(a,b+12,3))
z=new Z.cR(new T.q(z),null,null,null,C.k)
z.c=y
z.d=C.o.af(y.gX(y),P.dw())
z.e=C.o.af(y.gX(y),P.bJ())
return z
default:return}},
qq:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f
z=J.N(J.cG(b.c),J.cG(b.c))
y=J.N(J.cH(b.c),J.cH(b.c))
x=J.cI(b.c)
w=J.cI(b.c)
if(typeof x!=="number")return x.H()
if(typeof w!=="number")return H.l(w)
v=x*w
w=J.bm(z)
u=w.H(z,y)
t=w.H(z,v)
s=J.N(y,v)
x=b.b
r=H.n(3)
q=new Float32Array(r)
p=new T.q(q)
p.q(a.a)
p.ao(x)
if(0>=r)return H.a(q,0)
o=q[0]
if(1>=r)return H.a(q,1)
n=q[1]
if(2>=r)return H.a(q,2)
m=q[2]
q=a.b.a
r=q.length
if(0>=r)return H.a(q,0)
l=q[0]
if(1>=r)return H.a(q,1)
k=q[1]
if(2>=r)return H.a(q,2)
j=q[2]
q=J.bm(s)
r=J.bm(t)
x=J.bm(u)
i=J.R(J.R(J.N(q.H(s,l),l),J.N(r.H(t,k),k)),J.N(x.H(u,j),j))
h=J.R(J.R(J.N(J.N(q.H(s,2),o),l),J.N(J.N(r.H(t,2),n),k)),J.N(J.N(x.H(u,2),m),j))
x=J.R(J.R(J.N(q.H(s,o),o),J.N(r.H(t,n),n)),J.N(x.H(u,m),m))
w=J.N(w.H(z,y),v)
if(typeof x!=="number")return x.a2()
if(typeof w!=="number")return H.l(w)
r=J.N(h,h)
if(typeof i!=="number")return H.l(i)
if(typeof r!=="number")return r.a2()
g=r-4*i*(x-w)
if(g<0)return
else{f=Math.sqrt(g)
if(typeof h!=="number")return h.aN()
x=-h
w=2*i
return[(x+f)/w,(x-f)/w]}},
qr:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
z=H.n(3)
y=new Float32Array(z)
x=new T.q(y)
x.q(a.a)
x.ao(b.a)
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
y=J.N(y,y)
if(typeof y!=="number")return H.l(y)
o=p*p-4*q*(w*w+v*v+u*u-y)
if(o<0)return
else{n=Math.sqrt(o)
z=-p
y=2*q
return[(z+n)/y,(z-n)/y]}},
iP:function(a,b){var z,y,x,w,v
do{z=a.ah()-0.5
y=a.ah()-0.5
x=a.ah()-0.5}while(Math.sqrt(z*z+y*y+x*x)>=0.25)
w=b.a
v=w.length
if(0>=v)return H.a(w,0)
w[0]=2*z
if(1>=v)return H.a(w,1)
w[1]=2*y
if(2>=v)return H.a(w,2)
w[2]=2*x},
cM:{"^":"bS;M:b>,a",
k:function(a){return"AABB domain {min: "+this.b.a.k(0)+", max: "+this.b.b.k(0)+"}"},
gbs:function(){var z,y
z=this.b
y=z.a.a.byteLength
z=z.b.a.byteLength
if(typeof y!=="number")return y.N()
if(typeof z!=="number")return H.l(z)
return y+z},
bt:function(a,b,c){var z,y,x,w
z=T.jN(a,b)
y=this.b
x=z.a
x.q(y.a)
w=z.b
w.q(y.b)
this.b=z
z=x.a.byteLength
if(typeof z!=="number")return H.l(z)
w=w.a.byteLength
if(typeof w!=="number")return H.l(w)
return b+z+w},
d7:function(a,b){return this.bt(a,b,!0)},
cc:function(){return this.b},
B:function(a,b){var z,y,x,w
z=this.b
y=z.a.a
x=y.length
if(0>=x)return H.a(y,0)
w=J.k(b)
if(y[0]<w.gm(b)){if(1>=x)return H.a(y,1)
if(y[1]<w.gn(b)){if(2>=x)return H.a(y,2)
if(y[2]<w.gR(b)){z=z.b.a
y=z.length
if(0>=y)return H.a(z,0)
if(z[0]>w.gm(b)){if(1>=y)return H.a(z,1)
if(z[1]>w.gn(b)){if(2>=y)return H.a(z,2)
z=z[2]>w.gR(b)}else z=!1}else z=!1}else z=!1}else z=!1}else z=!1
return z},
dt:function(a){var z,y,x,w,v,u,t,s,r,q
z=this.b
y=z.a.a
x=y.length
if(0>=x)return H.a(y,0)
w=y[0]
v=a.a
u=v.length
if(0>=u)return H.a(v,0)
t=v[0]
if(1>=x)return H.a(y,1)
s=y[1]
if(1>=u)return H.a(v,1)
r=v[1]
if(2>=x)return H.a(y,2)
y=y[2]
if(2>=u)return H.a(v,2)
v=v[2]
z=z.b.a
u=z.length
if(0>=u)return H.a(z,0)
x=z[0]
if(1>=u)return H.a(z,1)
q=z[1]
if(2>=u)return H.a(z,2)
return C.a.af([Math.abs(w-t),Math.abs(s-r),Math.abs(y-v),Math.abs(x-t),Math.abs(q-r),Math.abs(z[2]-v)],P.dw())},
cd:function(a){return Z.qp(a,this.b)}},
dQ:{"^":"e;bf:a>,b",
k:function(a){return this.b}},
bS:{"^":"e;p:a*",
gc7:function(){var z,y
z=this.cc()
y=new T.q(new Float32Array(H.n(3)))
y.q(z.a)
y.l(0,z.b)
y.ab(0,0.5)
return y},
jd:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o
new Float32Array(H.n(3))
z=this.cc()
y=z.a
x=H.n(3)
w=new Float32Array(x)
v=new T.q(w)
v.q(z.b)
v.ao(y)
do{u=C.h.ah()
t=C.h.ah()
s=C.h.ah()
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
q=new T.q(new Float32Array(3))
q.q(y)
q.l(0,new T.q(r))
p=this.B(0,q)
if(p&&a.length!==0)for(u=a.length,o=0;o<a.length;a.length===u||(0,H.D)(a),++o)if(J.eM(a[o],q)===!0){p=!1
break}}while(!p)
return q},
jc:function(a){return this.jd(a,null)},
a5:function(a,b,c){var z,y
z=(a&&C.e).bu(a,b,1)
y=J.jg(this.a)
if(0>=z.length)return H.a(z,0)
z[0]=y
if(typeof b!=="number")return b.N()
return this.d7(a,b+4)},
a0:function(a,b){return this.a5(a,b,!0)}},
cR:{"^":"bS;c7:b<,c,d,e,a",
sdW:function(a){this.c=a
this.d=J.bO(J.aw(a),P.dw())
this.e=J.bO(J.aw(this.c),P.bJ())},
k:function(a){return"ellipsoid domain {center: "+H.j(J.a5(this.b))+", semiAxes: "+H.j(J.a5(this.c))+"}"},
gbs:function(){var z,y
z=J.cE(J.aw(this.b))
y=J.cE(J.aw(this.c))
if(typeof z!=="number")return z.N()
if(typeof y!=="number")return H.l(y)
return z+y},
bt:function(a,b,c){var z,y
z=D.cB(a,b,this.b,!0)
this.b=z
z=z.gX(z).byteLength
if(typeof z!=="number")return H.l(z)
y=b+z
this.sdW(D.cB(a,y,this.c,!0))
z=J.cE(J.aw(this.c))
if(typeof z!=="number")return H.l(z)
return y+z},
d7:function(a,b){return this.bt(a,b,!0)},
cc:function(){return T.cL(J.an(this.b,this.c),J.R(this.b,this.c))},
B:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=J.an(b,this.b)
y=J.k(z)
x=y.gm(z)
w=y.gm(z)
v=J.N(J.cG(this.c),J.cG(this.c))
if(typeof v!=="number")return H.l(v)
u=y.gn(z)
t=y.gn(z)
s=J.N(J.cH(this.c),J.cH(this.c))
if(typeof s!=="number")return H.l(s)
r=y.gR(z)
y=y.gR(z)
q=J.cI(this.c)
p=J.cI(this.c)
if(typeof q!=="number")return q.H()
if(typeof p!=="number")return H.l(p)
return x*w/v+u*t/s+r*y/(q*p)<1},
dt:function(a){var z,y,x,w,v
z=this.b
y=H.n(3)
x=new Float32Array(y)
w=new T.q(x)
w.q(a)
w.ao(z)
if(0>=y)return H.a(x,0)
z=x[0]
if(1>=y)return H.a(x,1)
w=x[1]
if(2>=y)return H.a(x,2)
x=x[2]
v=Math.sqrt(z*z+w*w+x*x)
z=this.e
if(typeof z!=="number")return H.l(z)
if(v>z)z=v-z
else{z=this.d
if(typeof z!=="number")return H.l(z)
z=v<z?z-v:0}return z},
cd:function(a){return Z.qq(a,this)}},
el:{"^":"bS;c7:b<,c,a",
k:function(a){return"spherical domain {center: "+H.j(J.a5(this.b))+", radius: "+H.j(this.c)+"}"},
gbs:function(){var z=J.cE(J.aw(this.b))
if(typeof z!=="number")return z.N()
return z+4},
bt:function(a,b,c){var z,y,x
z=D.cB(a,b,this.b,!0)
this.b=z
z=z.gX(z).byteLength
if(typeof z!=="number")return H.l(z)
y=b+z
z=(a&&C.e).S(a,y,1)
x=this.c
if(0>=z.length)return H.a(z,0)
z[0]=x
return y+4},
d7:function(a,b){return this.bt(a,b,!0)},
cc:function(){var z,y,x
z=J.iW(this.c)
y=new T.q(new Float32Array(H.n(3)))
y.bS(z)
y.l(0,this.b)
z=this.c
x=new T.q(new Float32Array(H.n(3)))
x.bS(z)
x.l(0,this.b)
return T.cL(y,x)},
B:function(a,b){var z,y
z=J.a4(J.an(b,this.b))
y=this.c
if(typeof y!=="number")return H.l(y)
return z<y},
dt:function(a){var z,y,x,w
z=this.b
y=H.n(3)
x=new Float32Array(y)
w=new T.q(x)
w.q(a)
w.ao(z)
if(0>=y)return H.a(x,0)
z=x[0]
if(1>=y)return H.a(x,1)
w=x[1]
if(2>=y)return H.a(x,2)
x=x[2]
x=Math.sqrt(z*z+w*w+x*x)
w=this.c
if(typeof w!=="number")return H.l(w)
return Math.abs(x-w)},
cd:function(a){var z,y,x
z=this.b
y=this.c
x=new T.q(new Float32Array(H.n(3)))
x.q(z)
return Z.qr(a,new T.nk(x,y))}}}],["","",,N,{"^":"",k3:{"^":"kN;z,Q,ch,cx,cy,db,dx,dy,fr,a,b,c,d,e,f,r,x,y",
ju:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=this.z
if(z.r&&!z.f){y=z.e
y.f7()
x=z.b
y.a.h2()
x.h1(0,y.a.b);++z.c
y=z.y
x=x.dQ()
if(y.b>=4)H.C(y.b5())
w=y.b
if((w&1)!==0)y.ag(x)
else if((w&3)===0)y.b8().l(0,new P.by(x,null,[H.B(y,0)]))}y=z.c
if(y>this.fr){this.fr=y
y=this.ch
x=z.b
w=x.a
v=x.c
x=x.b.a
if(3>=x.length)return H.a(x,3)
y.bj(J.j1(w,v,x[3]*7))}this.Q.b=b
y=this.cy
J.dJ(y.a,y.d)
y=this.e
x=this.cy.Q.h(0,"uViewportRatio")
w=this.b
v=this.c
if(typeof w!=="number")return w.aY()
if(typeof v!=="number")return H.l(v)
J.jH(y,x,w/v)
J.jI(this.e,this.cy.Q.h(0,"uLightPosition"),new Float32Array(H.bj([3,3,10])))
v=this.Q
z=z.b
w=z.b.a
if(3>=w.length)return H.a(w,3)
v.jv(0,4,w[3],P.al(["aParticlePosition",1,"aParticleColor",1,"aParticleRadius",1]))
u=z.hf()
for(z=u.length,t=0;t<z;++t){s=u[t]
y=J.t(s)
if(!!y.$iscM){y=this.dx
x=s.b
r=new T.ax(new Float32Array(16))
r.bl()
w=x.a
v=new Float32Array(3)
q=new T.q(v)
q.q(x.b)
q.ao(w)
w=w.a
x=w.length
if(0>=x)return H.a(w,0)
p=w[0]
if(1>=x)return H.a(w,1)
o=w[1]
if(2>=x)return H.a(w,2)
r.cq(0,p,o,w[2])
if(0>=3)return H.a(v,0)
w=v[0]
if(1>=3)return H.a(v,1)
o=v[1]
if(2>=3)return H.a(v,2)
r.cC(0,w,o,v[2])
v=b.H(0,r)
y.a.b=v
y.b.b=v
n=this.dx}else if(!!y.$isel){y=this.dy
x=s.b
w=s.c
v=new Float32Array(3)
if(2>=3)return H.a(v,2)
v[2]=w
v[1]=w
v[0]=w
v=b.H(0,S.fR(x,new T.q(v)))
y.a.b=v
y.b.b=v
n=this.dy}else if(!!y.$iscR){y=this.dy
x=b.H(0,S.fR(s.b,s.c))
y.a.b=x
y.b.b=x
n=this.dy}else n=null
if(n!=null){y=this.db
J.dJ(y.a,y.d)
J.dA(this.e,1029)
y=this.e
x=this.db.Q.h(0,"uLineColor")
w=new Float32Array(4)
w[3]=0.3
w[2]=1
w[1]=1
w[0]=1
J.f4(y,x,w)
y=n.b
y.d3()
y.d.cg(y.c)
m=y.d.b
J.eN(y.a,4,m,5123,0)
J.dA(this.e,1028)
x=this.e
w=this.db.Q.h(0,"uLineColor")
v=new Float32Array(4)
v[3]=1
v[2]=1
v[1]=1
v[0]=1
J.f4(x,w,v)
y.d3()
y.d.cg(y.c)
m=y.d.b
J.eN(y.a,4,m,5123,0)}}}}}],["","",,G,{"^":"",dX:{"^":"e;M:a>,bW:b<,$ti",
j:function(a,b,c){this.b.j(0,b,this.a.length)
this.a.push(c)},
h:function(a,b){return this.b.h(0,b)},
B:function(a,b){return this.b.O(0,b)},
gi:function(a){return this.a.length},
cj:function(a){var z=new Float32Array(H.n(this.a.length))
a.F(0,new G.l2(this,z))
return z}},l2:{"^":"h:4;a,b",
$2:function(a,b){var z,y
z=this.b
y=this.a.b.h(0,a)
if(y>>>0!==y||y>=z.length)return H.a(z,y)
z[y]=b},
$isi:1},d2:{"^":"e;fb:a>,bf:b>,c,d,e,f,r,x,bR:y>",
hE:function(a,b,c){var z,y
if(b){z=this.e
if(a>>>0!==a||a>=z.length)return H.a(z,a)
if(z[a]===0)z=!1
else{z=$.$get$cb().ah()
y=this.e
if(a>=y.length)return H.a(y,a)
y=z<y[a]
z=y}return z}else if(c){z=this.f
if(a>>>0!==a||a>=z.length)return H.a(z,a)
if(z[a]===0)z=!1
else{z=$.$get$cb().ah()
y=this.f
if(a>=y.length)return H.a(y,a)
y=z<y[a]
z=y}return z}else return!1},
ge_:function(){var z,y,x,w,v,u,t
z=this.a.gbs()
y=this.c.byteLength
if(typeof y!=="number")return H.l(y)
x=this.d.byteLength
if(typeof x!=="number")return H.l(x)
w=this.e.byteLength
if(typeof w!=="number")return H.l(w)
v=this.f.byteLength
if(typeof v!=="number")return H.l(v)
u=this.r.byteLength
if(typeof u!=="number")return H.l(u)
t=this.x.byteLength
if(typeof t!=="number")return H.l(t)
return 4+z+y+x+w+v+u+t},
a5:function(a,b,c){var z,y
z=this.a.a5(a,b,!0)
y=D.dx(a,z,!0,this.c)
this.c=y
y=y.byteLength
if(typeof y!=="number")return H.l(y)
z+=y
y=D.dx(a,z,!0,this.d)
this.d=y
y=y.byteLength
if(typeof y!=="number")return H.l(y)
z+=y
y=D.dx(a,z,!0,this.e)
this.e=y
y=y.byteLength
if(typeof y!=="number")return H.l(y)
z+=y
y=D.dx(a,z,!0,this.f)
this.f=y
y=y.byteLength
if(typeof y!=="number")return H.l(y)
z+=y
y=D.iU(a,z,!0,this.r)
this.r=y
y=y.byteLength
if(typeof y!=="number")return H.l(y)
z+=y
y=D.iU(a,z,!0,this.x)
this.x=y
y=y.byteLength
if(typeof y!=="number")return H.l(y)
return z+y},
a0:function(a,b){return this.a5(a,b,!0)},
t:{"^":"u_<"}},hk:{"^":"e;p:a*,b,c,bR:d>,e,cG:f<,aH:r<,kc:x<",
gas:function(a){return this.b},
sbx:function(a,b){return this.c.dg(b.a)},
skm:function(a,b){var z=this.e.a
if(0>=z.length)return H.a(z,0)
z[0]=b
return},
fl:function(a){return C.a.B(this.r,a)},
e1:function(a,b,c){var z,y,x,w,v,u
this.f=a
if(c){z=b.gc7()
y=this.b
x=b.gc7()
w=new T.q(new Float32Array(H.n(3)))
w.q(y)
w.ao(x)
v=T.n2(z,w)
u=b.cd(v)
w=this.b
z=(u&&C.a).af(u,P.bJ())
x=new T.q(new Float32Array(H.n(3)))
x.q(v.b)
x.ab(0,z)
x.l(0,v.a)
w.q(x)}},
gbE:function(){return this.f!==-1},
cv:function(){var z=this.f
if(!(z!==-1)){z=this.r
z=z.length!==0?C.a.gaK(z):-1}return z},
a5:function(a,b,c){var z,y
z=D.cB(a,b,this.b,!0)
this.b=z
z=z.a.byteLength
if(typeof b!=="number")return b.N()
if(typeof z!=="number")return H.l(z)
y=b+z
z=D.cB(a,y,this.c,!0)
this.c=z
z=z.a.byteLength
if(typeof z!=="number")return H.l(z)
return this.e.a5(a,y+z,!0)},
a0:function(a,b){return this.a5(a,b,!0)}},hl:{"^":"e;di:a<,bR:b>,c"},ht:{"^":"e;",
a5:function(a,b,c){return this.a.a5(a,b,!0)},
a0:function(a,b){return this.a5(a,b,!0)}},c2:{"^":"e;p:a*,fN:b<",
gcG:function(){return this.b===1}},f8:{"^":"ht;b,c,d,a",
kD:function(a,b){var z,y,x,w
z=this.b
if(!J.E(J.bp(a),z.a)||!J.E(J.bp(b),this.c.a))throw H.b(P.ag("[a] should correspond to [particleA] and [b] to [particleB]"))
y=this.a
x=y.a
if(0>=x.length)return H.a(x,0)
if(x[0]!==1){x=$.$get$cb().ah()
y=y.a
if(0>=y.length)return H.a(y,0)
y=x<y[0]}else y=!0
if(y){switch(z.b){case 0:if(a.gaH().length===0)return!1
w=C.a.gaK(a.gaH())
break
case 1:if(!a.gbE())return!1
w=a.f
break
default:w=-1}switch(this.c.b){case 0:return b.gaH().length===0?!1:J.E(C.a.gaK(b.gaH()),w)
case 1:if(!b.gbE())z=!1
else{z=b.f
z=z==null?w==null:z===w}return z
case 2:return!b.fl(w)}}return!1}},bq:{"^":"e;a,ay:b>,bi:c>"},hV:{"^":"ht;b,c,a"},n7:{"^":"e;a,b,c",
h1:function(a,b){var z,y,x
this.a=b
z=new G.hw(null)
z.a5(b,0,!1)
this.b=z
z=z.a
y=z.length
if(1>=y)return H.a(z,1)
x=z[1]
if(2>=y)return H.a(z,2)
this.c=24+4*(x+z[2])},
dQ:function(){var z,y,x,w,v,u,t,s,r,q
z=this.b.a
if(5>=z.length)return H.a(z,5)
z=new Array(z[5])
z.fixed$length=Array
y=H.v(z,[[S.a3,[P.c,P.m],[P.c,P.m]]])
z=this.b.a
if(4>=z.length)return H.a(z,4)
x=z[4]
z=P.m
w=[P.c,P.m]
w=[w,w]
v=y.length
u=0
while(!0){t=this.b.a
if(5>=t.length)return H.a(t,5)
if(!(u<t[5]))break
t=Z.fw(this.a,x).gbs()
s=this.b.a
if(0>=s.length)return H.a(s,0)
s=s[0]
x=x+(4+t)+16*s
r=J.dy(this.a,x,s)
s=r.byteLength
if(typeof s!=="number")return H.l(s)
x+=s
s=this.a
t=this.b.a
if(0>=t.length)return H.a(t,0)
q=J.dy(s,x,t[0])
t=q.byteLength
if(typeof t!=="number")return H.l(t)
x+=t
t=P.Y(r,!0,z)
s=P.Y(q,!0,z)
if(u>=v)return H.a(y,u)
y[u]=new S.a3(t,s,w);++u}return y},
hf:function(){var z,y,x,w,v,u,t
z=this.b.a
if(5>=z.length)return H.a(z,5)
y=H.v(new Array(z[5]),[Z.bS])
z=this.b
x=z.a
if(4>=x.length)return H.a(x,4)
w=x[4]
x=y.length
v=0
while(!0){z=z.a
if(5>=z.length)return H.a(z,5)
if(!(v<z[5]))break
z=Z.fw(this.a,w)
if(v>=x)return H.a(y,v)
y[v]=z
z=z.gbs()
u=this.b
t=u.a
if(0>=t.length)return H.a(t,0)
w=w+(4+z)+24*t[0];++v
z=u}return y}},nc:{"^":"e;a,b,c,d,e,f,r,x,y",
ee:function(a,b,c){var z,y,x,w,v,u,t,s,r,q,p
z=this.e
if(a>>>0!==a||a>=z.length)return H.a(z,a)
y=z[a]
z=y.gdi()
x=y.b
w=y.c
v=this.y
u=v.length
w=new Float32Array(H.bj([w])).buffer
w=(w&&C.e).S(w,0,1)
t=P.m
s=H.v([],[t])
r=new G.hk(a,b,z,x,new D.cS(w),-1,s,P.bY(u,0,!0,t))
t=this.x
r.a0(this.b,this.d+28*t.length)
t.push(r)
if(c!=null)for(z=c.length,q=0;q<c.length;c.length===z||(0,H.D)(c),++q){p=c[q]
if(p>>>0!==p||p>=v.length)return H.a(v,p)
x=v[p]
s.push(x.b)
x=x.r
w=r.a
if(w>>>0!==w||w>=x.length)return H.a(x,w)
x[w]=x[w]+1}else this.h4(r)
return r},
ih:function(a,b){return this.ee(a,b,null)},
iW:function(a,b,c,d){var z
this.a.G("group: addRandomParticles")
this.a.G("Add "+H.j(c)+" particles:\n  type: "+H.j(a)+"\n  domain: "+H.j(J.a5(b)))
this.d4(c,0)
if(typeof c!=="number")return H.l(c)
z=0
for(;z<c;++z)this.ih(a,b.jc(d))
$.$get$bE().G("groupEnd")},
kU:[function(a){var z,y,x,w,v
this.a.G("group: addMembrane")
this.a.G("Add membrane:\n  domain: "+J.a5(J.eT(a)))
this.d4(0,a.ge_())
z=this.y
a.b=z.length
y=this.b
x=this.c.a
if(4>=x.length)return H.a(x,4)
a.a0(y,x[4]+this.gd9())
z.push(a)
for(z=this.x,y=z.length,w=0;w<z.length;z.length===y||(0,H.D)(z),++w){v=z[w]
this.h4(v)
C.a.l(v.gkc(),0)}$.$get$bE().G("groupEnd")},"$1","giV",2,0,25],
fQ:function(a){var z,y,x,w,v,u,t,s,r,q
z=this.x
if(a>>>0!==a||a>=z.length)return H.a(z,a)
y=z[a]
for(x=y.gaH(),w=x.length,v=this.y,u=0;u<x.length;x.length===w||(0,H.D)(x),++u){t=x[u]
if(t>>>0!==t||t>=v.length)return H.a(v,t)
s=v[t]
r=y.gp(y)
s=s.r
if(r>>>0!==r||r>=s.length)return H.a(s,r)
s[r]=s[r]-1}if(y.gbE()){x=y.f
if(x>>>0!==x||x>=v.length)return H.a(v,x)
x=v[x]
v=y.a
x=x.x
if(v>>>0!==v||v>=x.length)return H.a(x,v)
x[v]=x[v]-1}if(0>=z.length)return H.a(z,-1)
q=z.pop()
if(a<z.length){q.a0(this.b,this.d+a*28)
if(a>=z.length)return H.a(z,a)
z[a]=q}},
ff:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=J.k(a)
y=z.gp(a)
x=this.e
if(b>>>0!==b||b>=x.length)return H.a(x,b)
w=x[b]
z.sp(a,b)
z.sbx(a,w.gdi())
z.skm(a,w.c)
a.d=w.b
for(z=a.r,x=z.length,v=this.y,u=0;t=z.length,u<t;t===x||(0,H.D)(z),++u){s=z[u]
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
fe:function(a,b,c,d){var z,y,x
switch(c){case 1:if(b===-1)throw H.b(P.ag("ctxMembrane cannot be -1 if location is sticked"))
z=a.f
if(z==null?b!=null:z!==b){z=a.r
if(C.a.B(z,b)){y=this.y
if(b>>>0!==b||b>=y.length)return H.a(y,b)
y=y[b]
C.a.W(z,y.b)
z=a.a
y=y.r
if(z>>>0!==z||z>=y.length)return H.a(y,z)
y[z]=y[z]-1}z=this.y
if(b>>>0!==b||b>=z.length)return H.a(z,b)
z=z[b]
a.e1(z.b,z.a,d)
z=z.x
y=a.a
if(y>>>0!==y||y>=z.length)return H.a(z,y)
z[y]=z[y]+1}break
case 0:z=a.r
if(!C.a.B(z,b)){y=a.f
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
if(C.a.B(z,b)){y=this.y
if(b>>>0!==b||b>=y.length)return H.a(y,b)
y=y[b]
C.a.W(z,y.b)
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
fd:function(a,b,c){return this.fe(a,b,c,!0)},
h4:function(a){var z,y,x,w,v,u,t,s,r,q,p,o
z=this.y
if(z.length===0)return
y=J.k(a)
x=y.gas(a)
w=new Float32Array(3)
if(0>=3)return H.a(w,0)
w[0]=1
if(1>=3)return H.a(w,1)
w[1]=0
if(2>=3)return H.a(w,2)
w[2]=0
v=new T.q(new Float32Array(3))
v.q(x)
x=new T.q(new Float32Array(3))
x.q(new T.q(w))
u=new T.hs(v,x)
t=H.v([],[[S.a3,P.m,P.K]])
for(x=[P.m,P.K],s=0;s<z.length;++s){r=z[s].a
if(r.B(0,y.gas(a))){q=r.cd(u)
t.push(new S.a3(s,(q&&C.a).af(q,P.bJ()),x))}}y=new G.nh()
x=t.length-1
if(x-0<=32)H.ek(t,0,x,y)
else H.ej(t,0,x,y)
for(y=t.length,p=0;p<t.length;t.length===y||(0,H.D)(t),++p){o=t[p].a
if(!a.fl(o)){if(o>>>0!==o||o>=z.length)return H.a(z,o)
x=z[o]
w=x.b
a.r.push(w)
x=x.r
w=a.a
if(w>>>0!==w||w>=x.length)return H.a(x,w)
x[w]=x[w]+1}}},
j1:function(a){var z,y,x,w,v,u,t,s,r,q,p,o,n
for(z=a.length,y=0;y<z;++y){x=a[y]
w=x.a
v=x.b
if(w>v)a[y]=new G.bq(v,w,x.c)}C.a.hA(a,new G.ng())
for(z=a.length,x=this.x,w=this.f,u=0;u<a.length;a.length===z||(0,H.D)(a),++u){t=a[u]
v=t.a
s=t.b
r=t.c
q=x.length
if(v>=q)return H.a(x,v)
p=x[v]
if(s>=q)return H.a(x,s)
o=x[s]
if(r>=w.length)return H.a(w,r)
n=w[r].d
this.ff(p,n.a)
v=n.b
if(v===1){if(r>=w.length)return H.a(w,r)
r=w[r]
q=r.c.b===1
r=r.b.b===1?!q:q}else r=!1
if(r)if(!p.gbE()){r=J.ch(o)
p.b.dg(J.aw(r))}r=p.cv()
q=o.cv()
this.fe(p,Math.max(H.aA(r),H.aA(q)),v,!1)
this.fQ(s)}},
kE:function(a,b){var z,y,x,w,v,u
if(b.length!==0){z=this.x
if(a<0||a>=z.length)return H.a(z,a)
y=z[a]
x=P.Y(y.gaH(),!0,P.m)
w=y.cv()
this.ff(y,J.bp(C.a.gv(b)))
this.fd(y,w,C.a.gv(b).gfN())
this.d4(b.length-1,0)
for(v=1;v<b.length;++v){u=b[v]
this.fd(this.ee(J.bp(u),y.b,x),w,u.gfN())}}else this.fQ(a)},
ki:function(){var z,y,x,w,v,u,t,s,r,q
z=this.x
y=z.length
if(y!==0){if(0>=y)return H.a(z,0)
x=J.eL(J.ch(z[0]))
if(0>=z.length)return H.a(z,0)
w=J.eL(J.ch(z[0]))
for(y=x.a,v=y.length,u=w.a,t=u.length,s=1;s<z.length;++s){r=J.ch(z[s])
if(0>=v)return H.a(y,0)
q=J.k(r)
y[0]=Math.min(y[0],q.gm(r))
if(1>=v)return H.a(y,1)
y[1]=Math.min(y[1],q.gn(r))
if(2>=v)return H.a(y,2)
y[2]=Math.min(y[2],q.gR(r))
if(s>=z.length)return H.a(z,s)
r=J.ch(z[s])
if(0>=t)return H.a(u,0)
q=J.k(r)
u[0]=Math.max(u[0],q.gm(r))
if(1>=t)return H.a(u,1)
u[1]=Math.max(u[1],q.gn(r))
if(2>=t)return H.a(u,2)
u[2]=Math.max(u[2],q.gR(r))}return T.cL(x,w)}else{z=new Float32Array(H.n(3))
y=new T.q(new Float32Array(H.n(3)))
y.bS(1)
return T.cL(new T.q(z),y)}},
a0:function(a,b){var z,y,x,w,v,u,t,s,r,q,p
z=this.x
this.a.G("Transfer to a larger buffer:\n  particle count: "+z.length+"\n  extra particles: "+H.j(a)+"\n  extra membrane bytes: "+H.j(b))
y=this.f
x=y.length
w=this.r
v=w.length
u=z.length
if(typeof a!=="number")return H.l(a)
t=24+4*(x+v)+28*(u+a+1e4)
u=this.gd9()
if(typeof b!=="number")return H.l(b)
s=t+u+b+120
this.a.G("New buffer size: "+H.j(s)+" bytes")
r=new DataView(new ArrayBuffer(H.n(s))).buffer
u=this.c
q=u.a0(r,0)
u=u.a
if(4>=u.length)return H.a(u,4)
u[4]=t
for(x=y.length,p=0;p<y.length;y.length===x||(0,H.D)(y),++p)q=y[p].a0(r,q)
for(y=w.length,p=0;p<w.length;w.length===y||(0,H.D)(w),++p)q=w[p].a0(r,q)
for(y=z.length,p=0;p<z.length;z.length===y||(0,H.D)(z),++p)q=z[p].a0(r,q)
for(z=this.y,y=z.length,q=t,p=0;p<z.length;z.length===y||(0,H.D)(z),++p)q=z[p].a0(r,q)
this.b=r
this.a.G("Buffer transfer has finished.")},
gd9:function(){var z,y,x,w
for(z=this.y,y=z.length,x=0,w=0;w<z.length;z.length===y||(0,H.D)(z),++w)x+=z[w].ge_()
return x},
d4:function(a,b){var z,y,x,w,v
if(J.ar(a,0)){z=this.d
y=this.x.length
if(typeof a!=="number")return H.l(a)
x=this.c.a
if(4>=x.length)return H.a(x,4)
if(z+28*(y+a)<x[4])w=0
else w=a}else w=a
if(b>0){z=this.c.a
if(4>=z.length)return H.a(z,4)
z=z[4]
y=this.gd9()
x=this.b.byteLength
if(typeof x!=="number")return H.l(x)
v=z+y+b<=x?0:b}else v=b
if(!J.E(w,0)||v!==0)this.a0(w,v)},
h2:function(){var z,y,x
z=this.x.length
y=this.c.a
x=y.length
if(3>=x)return H.a(y,3)
y[3]=z
z=this.y.length
if(5>=x)return H.a(y,5)
y[5]=z}},nh:{"^":"h:26;",
$2:function(a,b){return J.j6(b.gbg(),a.gbg())},
$isi:1},ng:{"^":"h:27;",
$2:function(a,b){var z,y
z=J.eR(b)
y=J.eR(a)
if(typeof z!=="number")return z.a2()
if(typeof y!=="number")return H.l(y)
return z-y},
$isi:1},hw:{"^":"e;M:a>",
a5:function(a,b,c){var z=J.k(a)
if(c){z=z.bu(a,b,6)
C.H.cD(z,0,this.a)}else z=z.bu(a,b,6)
this.a=z
if(typeof b!=="number")return b.N()
return b+24},
a0:function(a,b){return this.a5(a,b,!0)},
t:{"^":"v5<"}},hy:{"^":"e;a,b",
h_:function(){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i
z=this.b
y=z.x
if(y.length!==0)return z
else{z.a=N.b6("bromium.structs.Simulation")
x=z.b
w=z.d
v=z.y.length
for(u=x&&C.e,t=z.e,s=P.m,r=[s],q=0;p=this.a,o=p.length,q<o;q=n){n=q+1
if(q<0)return H.a(p,q)
m=p[q]
q=n+1
if(n<0||n>=o)return H.a(p,n)
l=p[n]
k=H.v([],r)
while(!0){p=this.a
n=q+1
if(q<0||q>=p.length)return H.a(p,q)
j=p[q]
if(!(j!==-1))break
k.push(j)
q=n}p=u.S(x,w,3)
o=p.byteLength
if(typeof o!=="number")return H.l(o)
w+=o
o=C.e.S(x,w,3)
i=o.byteLength
if(typeof i!=="number")return H.l(i)
w+=i
i=C.e.S(x,w,1)
w+=4
if(m<0||m>=t.length)return H.a(t,m)
y.push(new G.hk(m,new T.q(p),new T.q(o),J.eY(t[m]),new D.cS(i),l,k,P.bY(v,0,!0,s)))}return z}},
hW:function(a){var z,y,x,w,v
z=this.b
z.a=null
y=H.v([],[P.m])
for(z=z.x,x=z.length,w=0;w<z.length;z.length===x||(0,H.D)(z),++w){v=z[w]
y.push(J.bp(v))
y.push(v.gcG())
C.a.a3(y,v.gaH())
y.push(-1)}C.a.si(z,0)
this.a=new Int16Array(H.bj(y))},
t:{
hz:function(a){var z=new G.hy(null,a)
z.hW(a)
return z}}}}],["","",,D,{"^":"",
dx:function(a,b,c,d){var z=(a&&C.e).S(a,b,d.length)
C.o.cD(z,0,d)
return z},
iU:function(a,b,c,d){var z=(a&&C.e).bu(a,b,d.length)
C.H.cD(z,0,d)
return z},
cB:function(a,b,c,d){var z=new T.q((a&&C.e).S(a,b,3))
z.dg(J.aw(c))
return z},
cS:{"^":"e;a",
a5:function(a,b,c){var z,y
z=this.a
if(0>=z.length)return H.a(z,0)
y=z[0]
z=(a&&C.e).S(a,b,1)
this.a=z
if(0>=z.length)return H.a(z,0)
z[0]=y
z=z.byteLength
if(typeof b!=="number")return b.N()
if(typeof z!=="number")return H.l(z)
return b+z},
a0:function(a,b){return this.a5(a,b,!0)}}}],["","",,K,{"^":"",ml:{"^":"bR;a,b,c,d,e",
jf:function(a,b,c,d,e,f){var z,y
z={}
z.a=c
z.a=this.d
y=new P.bv("")
z.b=""
C.a.F(a,new K.mo(z,this,d,e,f,b,y))
z=y.L
return z.charCodeAt(0)==0?z:z},
je:function(a){return this.jf(a,null,null,null,null,null)},
jg:function(a,b,c,d,e,f,g){var z={}
z.a=e
z.b=f
z.c=g
z.d=d
z.e=c
if(b==null||J.eV(b)===!0)return""
e=this.a
z.a=e
z.c=f
f=this.b
z.b=f
z.c=this.c
if(d==null)z.d=this.d
z.e=!1
if(e===f)throw H.b(P.ag("Field Delimiter ("+e+") and Text Delimiter ("+f+") must not be equal."))
z.f=""
J.jc(b,a,new K.mn(z,this))
z=a.L
return z.charCodeAt(0)==0?z:z},
ea:function(a,b){var z,y,x
z=P.ai(null,null,null,P.m)
C.a.F(b,new K.mm(z))
y=J.eS(a)
x=new H.e5(y,y.gi(y),0,null)
for(;x.u();)if(z.B(0,x.d))return!0
return!1},
$asbR:function(){return[[P.c,P.c],P.p]}},mo:{"^":"h:0;a,b,c,d,e,f,r",
$1:function(a){var z,y,x
z=this.r
y=this.a
z.L+=H.j(y.b)
x=y.a
y.b=x
this.b.jg(z,a,this.f,x,this.c,this.d,this.e)},
$isi:1},mn:{"^":"h:28;a,b",
$2:function(a,b){var z,y,x,w
z=J.a5(b)
y=this.a
if(y.e===!0||this.b.ea(z,[y.a,y.b,y.c,y.d])){if(this.b.ea(z,[y.c])){x=H.j(y.c)+H.j(y.c)
z=J.jt(z,y.c,x)}w=J.k(a)
w.av(a,y.f)
w.av(a,y.b)
w.av(a,z)
w.av(a,y.c)}else{w=J.k(a)
w.av(a,y.f)
w.av(a,z)}y.f=y.a
return a},
$isi:1},mm:{"^":"h:0;a",
$1:function(a){return this.a.a3(0,J.eS(a))},
$isi:1}}],["","",,S,{"^":"",bP:{"^":"e;a,p:b>,c,d,e"},ia:{"^":"e;",
bj:function(a){var z,y,x,w,v
z=a.length
y=this.a
x=this.d
w=this.f
v=J.k(y)
if(z===this.b){v.c6(y,x,w)
v.eW(y,x,0,a)}else{this.b=z
v.c6(y,x,w)
v.eV(y,x,a,this.c)}},
cg:function(a){var z,y,x,w,v,u
z=this.a
y=J.k(z)
y.c6(z,this.d,this.f)
for(x=this.e,w=x.length,v=0;v<x.length;x.length===w||(0,H.D)(x),++v){u=x[v]
y.h9(z,a.f.h(0,u.a),u.c,u.b,!1,u.d,u.e)}}},cT:{"^":"ia;a,b,c,d,e,f,$ti"},fO:{"^":"cT;a,b,c,d,e,f",
$ascT:function(){return[P.oe]}},fS:{"^":"ia;"},kZ:{"^":"fS;r,a,b,c,d,e,f"},l_:{"^":"fS;r,a,b,c,d,e,f"},kN:{"^":"e;",
h5:function(){var z,y,x,w
z=this.a
y=z.clientWidth
this.b=y
z=z.clientHeight
this.c=z
J.jL(this.e,0,0,y,z)
z=this.b
y=this.c
if(typeof z!=="number")return z.aY()
if(typeof y!=="number")return H.l(y)
x=new Float32Array(H.n(16))
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
this.f=new T.ax(x)},
ek:function(){var z=window
C.p.eh(z)
C.p.ez(z,W.eC(new S.kO(this)))},
hR:function(a,b){var z=this.a
this.e=J.jp(z,"webgl")
z=S.o2(z,1.1)
this.r=z
z.a.a=-10
J.j4(this.e,0,0,0,1)
J.dB(this.e,2884)
J.dA(this.e,1028)
J.dB(this.e,2929)
J.j9(this.e,513)
J.dB(this.e,3042)
J.j2(this.e,770,771)
this.h5()}},kO:{"^":"h:12;a",
$1:function(a){var z,y,x,w,v,u
z=this.a
J.j3(z.e,16640)
y=z.f
y.toString
x=new T.ax(new Float32Array(H.n(16)))
x.q(y)
x.cq(0,0,0,z.r.a.a)
x.du(0,z.r.a.f)
y=z.x.a
w=y.length
if(0>=w)return H.a(y,0)
v=y[0]
if(1>=w)return H.a(y,1)
u=y[1]
if(2>=w)return H.a(y,2)
x.cq(0,-v,-u,-y[2])
z.ju(a,x)
if(!z.y)z.ek()},
$isi:1},kP:{"^":"fN;a,b",t:{
kQ:function(a,b,c,d,e,f){var z,y,x,w
z=$.$get$dW()
y=z.d
x=T.a0
w=P.bY(y,e,!1,x)
y=new B.de(4,0,4,y,new Float32Array(H.n(y*4)))
y.bn(w,4,0,0)
y=S.cU(a,b,z,y,$.$get$fM())
z=$.$get$dW()
w=z.d
x=P.bY(w,c,!1,x)
w=new B.de(4,0,4,w,new Float32Array(H.n(w*4)))
w.bn(x,4,0,0)
return new S.kP(y,S.cU(a,b,z,w,$.$get$fL()))}}},fN:{"^":"e;"},fP:{"^":"e;a,b,c,d,e",
d3:function(){var z,y,x
z=this.c
J.dJ(z.a,z.d)
z=this.c
z=z.Q.h(0,z.y)
y=this.b
J.jJ(this.a,z,!1,y.gX(y))
for(z=this.e,y=z.length,x=0;x<z.length;z.length===y||(0,H.D)(z),++x)z[x].cg(this.c)},
jw:function(a,b,c,d,e,f){var z,y
this.d3()
this.d.cg(this.c)
z=e===-1?this.d.b:e
y=J.eZ(this.a,"ANGLE_instanced_arrays")
d.F(0,new S.kR(this,y))
J.ja(y,b,z,5123,f,c)},
jv:function(a,b,c,d){return this.jw(a,b,c,d,-1,0)},
hS:function(a,b,c,d,e){var z,y,x,w,v
z=this.a
y=J.k(z)
x=new S.fO(z,0,35044,34963,[],y.by(z))
x.bj(e)
this.d=x
x=this.e
w=[]
v=new S.kZ(3,z,0,35044,34962,w,y.by(z))
v.bj(c.e)
w.push(new S.bP(this.c.r,5126,3,0,0))
x.push(v)
if(this.c.x!=null){w=[]
z=new S.l_(4,z,0,35044,34962,w,y.by(z))
z.bj(d.e)
w.push(new S.bP(this.c.x,5126,4,0,0))
x.push(z)}},
t:{
cU:function(a,b,c,d,e){var z=new S.fP(a,null,b,null,[])
z.hS(a,b,c,d,e)
return z}}},kR:{"^":"h:40;a,b",
$2:function(a,b){J.jK(this.b,this.a.c.f.h(0,a),b)},
$isi:1},fQ:{"^":"e;a,b,c,d,e,f,r,x,y,z,Q",
f1:function(){var z,y,x,w,v
z=this.a
y=J.k(z)
x=y.dh(z,35633)
y.cE(z,x,this.b)
y.de(z,x)
w=y.dh(z,35632)
y.cE(z,w,this.c)
y.de(z,w)
v=y.f5(z)
this.d=v
y.da(z,v,x)
y.da(z,this.d,w)
y.fn(z,this.d)
if(y.cz(z,x,35713)!==!0)throw H.b(P.bs(y.cw(z,x)))
if(y.cz(z,w,35713)!==!0)throw H.b(P.bs(y.cw(z,w)))
if(y.dS(z,this.d,35714)!==!0)throw H.b(P.bs(y.dR(z,this.d)))
z=P.p
this.f=new H.Q(0,null,null,null,null,null,0,[z,P.m])
C.a.F(this.e,new S.kS(this))
this.Q=new H.Q(0,null,null,null,null,null,0,[z,P.og])
C.a.F(this.z,new S.kT(this))}},kS:{"^":"h:5;a",
$1:function(a){var z,y,x
z=this.a
y=z.a
x=J.k(y)
z.f.j(0,a,x.dN(y,z.d,a))
x.fh(y,z.f.h(0,a))},
$isi:1},kT:{"^":"h:5;a",
$1:function(a){var z=this.a
z.Q.j(0,a,J.jq(z.a,z.d,a))},
$isi:1},kU:{"^":"fN;a,b",t:{
kV:function(a,b,c,d,e,f,g,h){var z,y,x,w,v,u
z=S.kW(b,c)
y=z.d
x=T.a0
w=P.bY(y,g,!1,x)
v=y*4
u=new B.de(4,0,4,y,new Float32Array(H.n(v)))
u.bn(w,4,0,0)
u=S.cU(a,d,z,u,S.kY(b,c))
x=P.bY(y,e,!1,x)
y=new B.de(4,0,4,y,new Float32Array(H.n(v)))
y.bn(x,4,0,0)
return new S.kU(u,S.cU(a,d,z,y,S.kX(b,c)))},
fR:function(a,b){var z,y
z=new T.ax(new Float32Array(16))
z.bl()
y=J.k(a)
z.cq(0,y.gm(a),y.gn(a),y.gR(a))
y=J.k(b)
z.cC(0,y.gm(b),y.gn(b),y.gR(b))
return z},
kW:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l
z=(a-1)*b+2
y=new B.hY(3,0,3,z,new Float32Array(H.n(3*z)))
y.i1(z,3,0,0)
z=new T.q(new Float32Array(H.n(3)))
z.bQ(0,0,1)
y.b_(0,0,z)
z=new T.q(new Float32Array(H.n(3)))
z.bQ(0,0,-1)
y.b_(0,1,z)
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
y.b_(0,w,new T.q(l))}}return y},
kY:function(a,b){var z,y,x,w,v,u,t,s,r,q
z=H.n((a-1)*b*4+b*2)
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
kX:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m
z=a-1
y=H.n(z*b*6)
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
x[m]=p}return x}}},pk:{"^":"e;R:a>,b,c,d,e,f"},o1:{"^":"e;a,b",
gR:function(a){return this.a.a},
fG:function(a,b){var z=this.a
z.b=!0
z.c=a
z.d=b},
fH:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n
if(!this.a.b)return
z=new Float32Array(H.n(16))
y=new T.ax(z)
y.bl()
x=this.a.c
if(typeof a!=="number")return a.a2()
if(typeof x!=="number")return H.l(x)
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
if(typeof b!=="number")return b.a2()
if(typeof n!=="number")return H.l(n)
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
y.du(0,this.a.f)
x=this.a
x.f=y
x.c=a
x.d=b},
ck:function(a){var z=this.a
z.b=!1
if(a<2)z.e=0},
fF:function(){return this.ck(0)},
i0:function(a,b){var z,y
z=new T.ax(new Float32Array(H.n(16)))
z.bl()
this.a=new S.pk(0,!1,0,0,0,z)
z=J.k(a)
y=z.gfA(a)
W.O(y.a,y.b,new S.o3(this),!1,H.B(y,0))
y=z.gfB(a)
W.O(y.a,y.b,new S.o4(this),!1,H.B(y,0))
y=z.gfL(a)
W.O(y.a,y.b,new S.o5(this),!1,H.B(y,0))
y=z.gfK(a)
W.O(y.a,y.b,new S.o6(this),!1,H.B(y,0))
y=z.gfD(a)
W.O(y.a,y.b,new S.o7(this),!1,H.B(y,0))
y=z.gfC(a)
W.O(y.a,y.b,new S.o8(this),!1,H.B(y,0))
W.O(a,"touchleave",new S.o9(this),!1,W.ay)
y=z.gfJ(a)
W.O(y.a,y.b,new S.oa(this),!1,H.B(y,0))
y=z.gfI(a)
W.O(y.a,y.b,new S.ob(this),!1,H.B(y,0))
z=z.gfE(a)
W.O(z.a,z.b,new S.oc(this),!1,H.B(z,0))},
t:{
o2:function(a,b){var z=new S.o1(null,b)
z.i0(a,b)
return z}}},o3:{"^":"h:13;a",
$1:function(a){var z,y
z=J.k(a)
y=z.gbd(a)
y=y.gm(y)
z=z.gbd(a)
this.a.fG(y,z.gn(z))},
$isi:1},o4:{"^":"h:13;a",
$1:function(a){var z,y
z=J.k(a)
y=z.gbd(a)
y=y.gm(y)
z=z.gbd(a)
this.a.fH(y,z.gn(z))},
$isi:1},o5:{"^":"h:6;a",
$1:function(a){var z=J.k(a)
z.kj(a)
z=z.gfU(a)
z=(z&&C.v).gv(z)
this.a.fG(C.b.Z(z.pageX),C.b.Z(z.pageY))},
$isi:1},o6:{"^":"h:6;a",
$1:function(a){var z,y,x,w,v,u
z=J.cF(a).length
y=a.targetTouches
x=y&&C.v
if(z>1){z=x.gv(y)
y=C.b.Z(z.pageX)
z=C.b.Z(z.pageY)
x=a.targetTouches
x=(x&&C.v).gaK(x)
w=y-C.b.Z(x.pageX)
v=z-C.b.Z(x.pageY)
u=Math.sqrt(w*w+v*v)
z=this.a.a
y=z.e
if(y>0)z.a*=y/u
z.e=u}else{z=x.gv(y)
this.a.fH(C.b.Z(z.pageX),C.b.Z(z.pageY))}},
$isi:1},o7:{"^":"h:0;a",
$1:function(a){return this.a.fF()},
$isi:1},o8:{"^":"h:0;a",
$1:function(a){return this.a.fF()},
$isi:1},o9:{"^":"h:6;a",
$1:function(a){return this.a.ck(J.cF(a).length)},
$isi:1},oa:{"^":"h:6;a",
$1:function(a){return this.a.ck(J.cF(a).length)},
$isi:1},ob:{"^":"h:6;a",
$1:function(a){return this.a.ck(J.cF(a).length)},
$isi:1},oc:{"^":"h:31;a",
$1:function(a){var z,y,x
z=this.a
y=J.je(a)
if(typeof y!=="number")return y.aM()
x=z.b
y=y>0?x:1/x
z.a.a*=y},
$isi:1}}],["","",,N,{"^":"",e7:{"^":"e;C:a>,b,c,ia:d>,e,f",
gfi:function(){var z,y,x
z=this.b
y=z==null||J.E(J.jj(z),"")
x=this.a
return y?x:z.gfi()+"."+x},
gaV:function(a){var z
if($.dt){z=this.c
if(z!=null)return z
z=this.b
if(z!=null)return J.ji(z)}return $.iv},
saV:function(a,b){if($.dt&&this.b!=null)this.c=b
else{if(this.b!=null)throw H.b(new P.o('Please set "hierarchicalLoggingEnabled" to true if you want to change the level on a non-root logger.'))
$.iv=b}},
gkh:function(){return this.ej()},
k8:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o
x=a.b
if(x>=J.aB(this.gaV(this))){if(!!J.t(b).$isi)b=b.$0()
w=b
if(typeof w!=="string"){v=b
b=J.a5(b)}else v=null
if(d==null&&x>=$.ra.b)try{x="autogenerated stack trace for "+a.k(0)+" "+H.j(b)
throw H.b(x)}catch(u){z=H.H(u)
y=H.W(u)
d=y
if(c==null)c=z}e=$.r
x=b
w=this.gfi()
t=c
s=d
r=Date.now()
q=$.h8
$.h8=q+1
p=new N.cY(a,x,v,w,new P.cl(r,!1),q,t,s,e)
if($.dt)for(o=this;o!=null;){o.es(p)
o=o.b}else $.$get$cZ().es(p)}},
dn:function(a,b,c,d){return this.k8(a,b,c,d,null)},
jQ:function(a,b,c){return this.dn(C.F,a,b,c)},
G:function(a){return this.jQ(a,null,null)},
kG:function(a,b,c){return this.dn(C.a1,a,b,c)},
cs:function(a){return this.kG(a,null,null)},
dY:function(a,b,c){return this.dn(C.a0,a,b,c)},
hw:function(a){return this.dY(a,null,null)},
ej:function(){if($.dt||this.b==null){var z=this.f
if(z==null){z=new P.ij(null,null,0,null,null,null,null,[N.cY])
this.f=z}return new P.ow(z,[H.B(z,0)])}else return $.$get$cZ().ej()},
es:function(a){var z=this.f
if(z!=null){if(!z.gbX())H.C(z.cM())
z.ag(a)}},
t:{
b6:function(a){return $.$get$h9().dA(0,a,new N.qf(a))}}},qf:{"^":"h:1;a",
$0:function(){var z,y,x,w
z=this.a
if(C.d.cF(z,"."))H.C(P.ag("name shouldn't start with a '.'"))
y=C.d.k_(z,".")
if(y===-1)x=z!==""?N.b6(""):null
else{x=N.b6(C.d.b0(z,0,y))
z=C.d.bm(z,y+1)}w=new H.Q(0,null,null,null,null,null,0,[P.p,N.e7])
w=new N.e7(z,x,null,w,new P.oj(w,[null,null]),null)
if(x!=null)J.jd(x).j(0,z,w)
return w},
$isi:1},bX:{"^":"e;C:a>,A:b>",
I:function(a,b){if(b==null)return!1
return b instanceof N.bX&&this.b===b.b},
aw:function(a,b){return C.c.aw(this.b,C.c.gA(b))},
aM:function(a,b){return C.c.aM(this.b,C.c.gA(b))},
aS:function(a,b){var z=J.aB(b)
if(typeof z!=="number")return H.l(z)
return this.b-z},
gK:function(a){return this.b},
k:function(a){return this.a}},cY:{"^":"e;aV:a>,P:b>,c,dq:d<,e,f,a9:r>,an:x<,y",
k:function(a){return"["+this.a.a+"] "+this.d+": "+H.j(this.b)}}}],["","",,L,{"^":"",
ir:function(a,b){if(typeof b!=="number")return H.l(b)
a=536870911&a+b
a=536870911&a+((524287&a)<<10)
return a^a>>>6}}],["","",,S,{"^":"",a3:{"^":"e;dk:a<,bg:b<,$ti",
k:function(a){return"["+H.j(this.a)+", "+H.j(this.b)+"]"},
I:function(a,b){if(b==null)return!1
return b instanceof S.a3&&J.E(b.a,this.a)&&J.E(b.b,this.b)},
gK:function(a){var z,y,x
z=J.a8(this.a)
y=J.a8(this.b)
y=L.ir(L.ir(0,J.a8(z)),J.a8(y))
x=536870911&y+((67108863&y)<<3)
x^=x>>>11
return 536870911&x+((16383&x)<<15)}}}],["","",,A,{"^":"",
ds:function(a){var z,y
z=C.o.al(a,0,new A.qG())
if(typeof z!=="number")return H.l(z)
y=536870911&z+((67108863&z)<<3)
y^=y>>>11
return 536870911&y+((16383&y)<<15)},
qG:{"^":"h:4;",
$2:function(a,b){var z,y
z=J.R(a,J.a8(b))
if(typeof z!=="number")return H.l(z)
y=536870911&z
y=536870911&y+((524287&y)<<10)
return y^y>>>6},
$isi:1}}],["","",,T,{"^":"",
ki:function(a,b){var z,y,x,w,v,u,t,s
z=$.$get$ff().fs(0,a)
if(z!=null){y=z.b
if(4>=y.length)return H.a(y,4)
if(y[4]==null){x=H.am(y[1],16,null)
if(2>=y.length)return H.a(y,2)
w=H.am(y[2],16,null)
if(3>=y.length)return H.a(y,3)
v=H.am(y[3],16,null)
b.ax(J.ak(x,255),J.ak(w,255),J.ak(v,255),1)
return}else{u=H.am(y[1],16,null)
if(2>=y.length)return H.a(y,2)
x=H.am(y[2],16,null)
if(3>=y.length)return H.a(y,3)
w=H.am(y[3],16,null)
if(4>=y.length)return H.a(y,4)
v=H.am(y[4],16,null)
b.ax(J.ak(x,255),J.ak(w,255),J.ak(v,255),J.ak(u,255))
return}}t=$.$get$fg().fs(0,a)
if(t!=null){y=t.b
if(4>=y.length)return H.a(y,4)
if(y[4]==null){s=y[1]
x=H.am(J.R(s,s),16,null)
if(2>=y.length)return H.a(y,2)
s=y[2]
w=H.am(J.R(s,s),16,null)
if(3>=y.length)return H.a(y,3)
y=y[3]
v=H.am(J.R(y,y),16,null)
b.ax(J.ak(x,255),J.ak(w,255),J.ak(v,255),1)
return}else{s=y[1]
u=H.am(J.R(s,s),16,null)
if(2>=y.length)return H.a(y,2)
s=y[2]
x=H.am(J.R(s,s),16,null)
if(3>=y.length)return H.a(y,3)
s=y[3]
w=H.am(J.R(s,s),16,null)
if(4>=y.length)return H.a(y,4)
y=y[4]
v=H.am(J.R(y,y),16,null)
b.ax(J.ak(x,255),J.ak(w,255),J.ak(v,255),J.ak(u,255))
return}}throw H.b(new P.cn("Could not parse hex color "+H.j(a),null,null))},
kj:function(a,b,c){var z,y,x,w,v
z=J.k(a)
y=z.gbi(a)
if(typeof y!=="number")return y.H()
y=C.b.aA(y*255)
x=C.b.aA(a.gcu()*255)
w=C.b.aA(z.gay(a)*255)
C.b.aA(z.giP(a)*255)
v=C.d.cl(C.c.dH(y&255,16),2,"0")+C.d.cl(C.c.dH(x&255,16),2,"0")+C.d.cl(C.c.dH(w&255,16),2,"0")
return v},
cj:{"^":"e;ix:a<,b",
hr:function(a,b){var z=this.a
z.q(a)
z.ao(b)
z=this.b
z.q(a)
z.l(0,b)},
t:{
jM:function(){return new T.cj(new T.q(new Float32Array(H.n(3))),new T.q(new Float32Array(H.n(3))))},
cL:function(a,b){var z,y
z=new T.q(new Float32Array(H.n(3)))
z.q(a)
y=new T.q(new Float32Array(H.n(3)))
y.q(b)
return new T.cj(z,y)},
jN:function(a,b){return new T.cj(new T.q(J.k(a).S(a,b,3)),new T.q(C.e.S(a,b+12,3)))}}},
ax:{"^":"e;ep:a<",
gX:function(a){return this.a},
kY:[function(a,b,c){return J.R(J.N(c,4),b)},"$2","gbf",4,0,32],
q:function(a){var z,y
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
k:function(a){return"[0] "+this.bN(0).k(0)+"\n[1] "+this.bN(1).k(0)+"\n[2] "+this.bN(2).k(0)+"\n[3] "+this.bN(3).k(0)+"\n"},
gjt:function(){return 4},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=16)return H.a(z,b)
return z[b]},
j:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=16)return H.a(z,b)
z[b]=c},
I:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.ax){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]&&z[4]===x[4]&&z[5]===x[5]&&z[6]===x[6]&&z[7]===x[7]&&z[8]===x[8]&&z[9]===x[9]&&z[10]===x[10]&&z[11]===x[11]&&z[12]===x[12]&&z[13]===x[13]&&z[14]===x[14]&&z[15]===x[15]}else z=!1
return z},
gK:function(a){return A.ds(this.a)},
bN:function(a){var z,y,x
z=new Float32Array(H.n(4))
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
return new T.a0(z)},
aN:function(a){var z,y
z=new Float32Array(H.n(16))
y=new T.ax(z)
y.q(this)
z[0]=-z[0]
z[1]=-z[1]
z[2]=-z[2]
z[3]=-z[3]
z[4]=-z[4]
z[5]=-z[5]
z[6]=-z[6]
z[7]=-z[7]
z[8]=-z[8]
z[9]=-z[9]
z[10]=-z[10]
z[11]=-z[11]
z[12]=-z[12]
z[13]=-z[13]
z[14]=-z[14]
z[15]=-z[15]
return y},
H:function(a,b){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e
if(typeof b==="number"){z=new T.ax(new Float32Array(H.n(16)))
z.q(this)
z.cC(0,b,null,null)
return z}z=J.t(b)
if(!!z.$isa0){z=new Float32Array(H.n(4))
y=new T.a0(z)
y.q(b)
x=this.a
w=x[0]
v=z[0]
u=x[4]
t=z[1]
s=x[8]
r=z[2]
q=x[12]
p=z[3]
o=x[1]
n=x[5]
m=x[9]
l=x[13]
k=x[2]
j=x[6]
i=x[10]
h=x[14]
g=x[3]
f=x[7]
e=x[11]
x=x[15]
z[0]=w*v+u*t+s*r+q*p
z[1]=o*v+n*t+m*r+l*p
z[2]=k*v+j*t+i*r+h*p
z[3]=g*v+f*t+e*r+x*p
return y}if(!!z.$isq){z=H.n(3)
x=new Float32Array(z)
y=new T.q(x)
y.q(b)
w=this.a
v=w[0]
if(0>=z)return H.a(x,0)
u=x[0]
t=w[4]
if(1>=z)return H.a(x,1)
s=x[1]
r=w[8]
if(2>=z)return H.a(x,2)
z=x[2]
q=w[12]
p=w[1]
o=w[5]
n=w[9]
m=w[13]
l=w[2]
k=w[6]
j=w[10]
w=w[14]
x[0]=v*u+t*s+r*z+q
x[1]=p*u+o*s+n*z+m
x[2]=l*u+k*s+j*z+w
return y}if(b.gjt()===4){z=new T.ax(new Float32Array(H.n(16)))
z.q(this)
z.du(0,b)
return z}throw H.b(P.ag(b))},
N:function(a,b){var z=new T.ax(new Float32Array(H.n(16)))
z.q(this)
z.l(0,b)
return z},
a2:function(a,b){var z,y,x
z=new Float32Array(H.n(16))
y=new T.ax(z)
y.q(this)
x=b.gep()
z[0]=z[0]-x[0]
z[1]=z[1]-x[1]
z[2]=z[2]-x[2]
z[3]=z[3]-x[3]
z[4]=z[4]-x[4]
z[5]=z[5]-x[5]
z[6]=z[6]-x[6]
z[7]=z[7]-x[7]
z[8]=z[8]-x[8]
z[9]=z[9]-x[9]
z[10]=z[10]-x[10]
z[11]=z[11]-x[11]
z[12]=z[12]-x[12]
z[13]=z[13]-x[13]
z[14]=z[14]-x[14]
z[15]=z[15]-x[15]
return y},
cq:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j
z=this.a
y=z[0]
if(typeof b!=="number")return H.l(b)
x=z[4]
if(typeof c!=="number")return H.l(c)
w=z[8]
if(typeof d!=="number")return H.l(d)
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
z[12]=y*b+x*c+w*d+v
z[13]=u*b+t*c+s*d+r
z[14]=q*b+p*c+o*d+n
z[15]=m*b+l*c+k*d+j},
cC:function(a,b,c,d){var z,y,x,w
z=c==null?b:J.dH(c)
y=d==null?b:J.dH(d)
x=this.a
w=x[0]
if(typeof b!=="number")return H.l(b)
x[0]=w*b
x[1]=x[1]*b
x[2]=x[2]*b
x[3]=x[3]*b
w=x[4]
if(typeof z!=="number")return H.l(z)
x[4]=w*z
x[5]=x[5]*z
x[6]=x[6]*z
x[7]=x[7]*z
w=x[8]
if(typeof y!=="number")return H.l(y)
x[8]=w*y
x[9]=x[9]*y
x[10]=x[10]*y
x[11]=x[11]*y
x[12]=x[12]
x[13]=x[13]
x[14]=x[14]
x[15]=x[15]},
bl:function(){var z=this.a
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
l:function(a,b){var z,y
z=b.gep()
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
du:function(a8,a9){var z,y,x,w,v,u,t,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7
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
hs:{"^":"e;a,b",t:{
n2:function(a,b){var z,y
z=new T.q(new Float32Array(H.n(3)))
z.q(a)
y=new T.q(new Float32Array(H.n(3)))
y.q(b)
return new T.hs(z,y)}}},
nk:{"^":"e;a,b"},
bg:{"^":"e;eL:a<",
gX:function(a){return this.a},
q:function(a){var z,y
z=a.a
y=this.a
y[1]=z[1]
y[0]=z[0]},
k:function(a){var z=this.a
return"["+H.j(z[0])+","+H.j(z[1])+"]"},
I:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.bg){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]}else z=!1
return z},
gK:function(a){return A.ds(this.a)},
aN:function(a){var z,y
z=new Float32Array(H.n(2))
y=new T.bg(z)
y.q(this)
z[1]=-z[1]
z[0]=-z[0]
return y},
a2:function(a,b){var z,y,x
z=new Float32Array(H.n(2))
y=new T.bg(z)
y.q(this)
x=b.geL()
z[0]=z[0]-x[0]
z[1]=z[1]-x[1]
return y},
N:function(a,b){var z=new T.bg(new Float32Array(H.n(2)))
z.q(this)
z.l(0,b)
return z},
aY:function(a,b){var z=new T.bg(new Float32Array(H.n(2)))
z.q(this)
if(typeof b!=="number")return H.l(b)
z.ab(0,1/b)
return z},
H:function(a,b){var z=new T.bg(new Float32Array(H.n(2)))
z.q(this)
z.ab(0,b)
return z},
h:function(a,b){var z=this.a
if(b>>>0!==b||b>=2)return H.a(z,b)
return z[b]},
j:function(a,b,c){var z=this.a
if(b>>>0!==b||b>=2)return H.a(z,b)
z[b]=c},
gi:function(a){var z,y
z=this.a
y=z[0]
z=z[1]
return Math.sqrt(y*y+z*z)},
l:function(a,b){var z,y
z=b.geL()
y=this.a
y[0]=y[0]+z[0]
y[1]=y[1]+z[1]},
ab:function(a,b){var z,y
z=this.a
y=z[1]
if(typeof b!=="number")return H.l(b)
z[1]=y*b
z[0]=z[0]*b},
aA:function(a){var z=this.a
z[0]=Math.floor(z[0])
z[1]=Math.floor(z[1])},
gbi:function(a){return this.a[0]},
gcu:function(){return this.a[1]},
gm:function(a){return this.a[0]},
gn:function(a){return this.a[1]}},
q:{"^":"e;c5:a<",
gX:function(a){return this.a},
bQ:function(a,b,c){var z,y
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
z[0]=a
if(1>=y)return H.a(z,1)
z[1]=b
if(2>=y)return H.a(z,2)
z[2]=c},
q:function(a){var z,y,x,w,v
z=a.gc5()
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
bS:function(a){var z=this.a
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
I:function(a,b){var z,y,x,w,v
if(b==null)return!1
if(b instanceof T.q){z=this.a
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
gK:function(a){return A.ds(this.a)},
aN:function(a){var z,y,x
z=H.n(3)
y=new Float32Array(z)
x=new T.q(y)
x.q(this)
if(2>=z)return H.a(y,2)
y[2]=-y[2]
y[1]=-y[1]
y[0]=-y[0]
return x},
a2:function(a,b){var z=new T.q(new Float32Array(H.n(3)))
z.q(this)
z.ao(b)
return z},
N:function(a,b){var z=new T.q(new Float32Array(H.n(3)))
z.q(this)
z.l(0,b)
return z},
aY:function(a,b){var z
if(typeof b!=="number")return H.l(b)
z=new T.q(new Float32Array(H.n(3)))
z.q(this)
z.ab(0,1/b)
return z},
H:function(a,b){var z=new T.q(new Float32Array(H.n(3)))
z.q(this)
z.ab(0,b)
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
l:function(a,b){var z,y,x,w,v
z=b.gc5()
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
ao:function(a){var z,y,x,w,v
z=a.gc5()
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
ab:function(a,b){var z,y
z=this.a
if(2>=z.length)return H.a(z,2)
y=z[2]
if(typeof b!=="number")return H.l(b)
z[2]=y*b
z[1]=z[1]*b
z[0]=z[0]*b},
aA:function(a){var z,y
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
z[0]=Math.floor(z[0])
if(1>=y)return H.a(z,1)
z[1]=Math.floor(z[1])
if(2>=y)return H.a(z,2)
z[2]=Math.floor(z[2])},
c9:function(a){var z=new T.q(new Float32Array(H.n(3)))
z.q(this)
return z},
f4:function(a,b){var z,y,x
z=this.a
y=J.af(a,b+2)
if(2>=z.length)return H.a(z,2)
z[2]=y
y=b+1
x=a.length
if(y>=x)return H.a(a,y)
z[1]=a[y]
if(b>=x)return H.a(a,b)
z[0]=a[b]},
dg:function(a){return this.f4(a,0)},
gdL:function(){var z,y,x,w
z=this.a
y=z.length
if(0>=y)return H.a(z,0)
x=z[0]
if(1>=y)return H.a(z,1)
w=z[1]
if(2>=y)return H.a(z,2)
z=z[2]
y=new T.q(new Float32Array(H.n(3)))
y.bQ(x,w,z)
return y},
gbi:function(a){var z=this.a
if(0>=z.length)return H.a(z,0)
return z[0]},
gcu:function(){var z=this.a
if(1>=z.length)return H.a(z,1)
return z[1]},
gay:function(a){var z=this.a
if(2>=z.length)return H.a(z,2)
return z[2]},
gm:function(a){var z=this.a
if(0>=z.length)return H.a(z,0)
return z[0]},
gn:function(a){var z=this.a
if(1>=z.length)return H.a(z,1)
return z[1]},
gR:function(a){var z=this.a
if(2>=z.length)return H.a(z,2)
return z[2]},
t:{
bh:function(a,b,c){var z=new Float32Array(3)
if(0>=3)return H.a(z,0)
z[0]=a
if(1>=3)return H.a(z,1)
z[1]=b
if(2>=3)return H.a(z,2)
z[2]=c
return new T.q(z)}}},
a0:{"^":"e;eM:a<",
gX:function(a){return this.a},
ax:function(a,b,c,d){var z=this.a
z[3]=d
z[2]=c
z[1]=b
z[0]=a},
q:function(a){var z,y
z=a.a
y=this.a
y[3]=z[3]
y[2]=z[2]
y[1]=z[1]
y[0]=z[0]},
k:function(a){var z=this.a
return H.j(z[0])+","+H.j(z[1])+","+H.j(z[2])+","+H.j(z[3])},
I:function(a,b){var z,y,x
if(b==null)return!1
if(b instanceof T.a0){z=this.a
y=z[0]
x=b.a
z=y===x[0]&&z[1]===x[1]&&z[2]===x[2]&&z[3]===x[3]}else z=!1
return z},
gK:function(a){return A.ds(this.a)},
aN:function(a){var z,y
z=new Float32Array(H.n(4))
y=new T.a0(z)
y.q(this)
z[0]=-z[0]
z[1]=-z[1]
z[2]=-z[2]
z[3]=-z[3]
return y},
a2:function(a,b){var z,y,x
z=new Float32Array(H.n(4))
y=new T.a0(z)
y.q(this)
x=b.geM()
z[0]=z[0]-x[0]
z[1]=z[1]-x[1]
z[2]=z[2]-x[2]
z[3]=z[3]-x[3]
return y},
N:function(a,b){var z=new T.a0(new Float32Array(H.n(4)))
z.q(this)
z.l(0,b)
return z},
aY:function(a,b){var z=new T.a0(new Float32Array(H.n(4)))
z.q(this)
if(typeof b!=="number")return H.l(b)
z.ab(0,1/b)
return z},
H:function(a,b){var z=new T.a0(new Float32Array(H.n(4)))
z.q(this)
z.ab(0,b)
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
l:function(a,b){var z,y
z=b.geM()
y=this.a
y[0]=y[0]+z[0]
y[1]=y[1]+z[1]
y[2]=y[2]+z[2]
y[3]=y[3]+z[3]},
ab:function(a,b){var z,y
z=this.a
y=z[0]
if(typeof b!=="number")return H.l(b)
z[0]=y*b
z[1]=z[1]*b
z[2]=z[2]*b
z[3]=z[3]*b},
aA:function(a){var z=this.a
z[0]=Math.floor(z[0])
z[1]=Math.floor(z[1])
z[2]=Math.floor(z[2])
z[3]=Math.floor(z[3])},
gdL:function(){var z,y,x,w
z=this.a
y=z[0]
x=z[1]
z=z[2]
w=new T.q(new Float32Array(H.n(3)))
w.bQ(y,x,z)
return w},
gbi:function(a){return this.a[0]},
gcu:function(){return this.a[1]},
gay:function(a){return this.a[2]},
giP:function(a){return this.a[3]},
gm:function(a){return this.a[0]},
gn:function(a){return this.a[1]},
gR:function(a){return this.a[2]}}}],["","",,B,{"^":"",hY:{"^":"hZ;a,b,c,d,e",
fv:function(){return new T.q(new Float32Array(H.n(3)))},
fo:function(a,b,c){var z,y,x,w,v
if(typeof b!=="number")return H.l(b)
z=this.b+this.c*b
y=c.gX(c)
x=this.e
w=x.length
if(z<0||z>=w)return H.a(x,z)
v=x[z]
if(0>=y.length)return H.a(y,0)
y[0]=v
v=c.gX(c)
y=z+1
if(y<0||y>=w)return H.a(x,y)
y=x[y]
if(1>=v.length)return H.a(v,1)
v[1]=y
y=c.gX(c)
v=z+2
if(v<0||v>=w)return H.a(x,v)
v=x[v]
if(2>=y.length)return H.a(y,2)
y[2]=v},
b_:function(a,b,c){var z,y,x,w,v,u,t
if(typeof b!=="number")return H.l(b)
z=this.b+this.c*b
y=J.aw(c)
x=this.e
w=z+0
v=J.af(y,0)
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
x[t]=w}},de:{"^":"hZ;a,b,c,d,e",
fv:function(){return new T.a0(new Float32Array(H.n(4)))},
fo:function(a,b,c){var z,y,x,w,v
if(typeof b!=="number")return H.l(b)
z=this.b+this.c*b
y=c.gX(c)
x=this.e
w=x.length
if(z<0||z>=w)return H.a(x,z)
v=x[z]
if(0>=y.length)return H.a(y,0)
y[0]=v
v=c.gX(c)
y=z+1
if(y<0||y>=w)return H.a(x,y)
y=x[y]
if(1>=v.length)return H.a(v,1)
v[1]=y
y=c.gX(c)
v=z+2
if(v<0||v>=w)return H.a(x,v)
v=x[v]
if(2>=y.length)return H.a(y,2)
y[2]=v
v=c.gX(c)
y=z+3
if(y<0||y>=w)return H.a(x,y)
y=x[y]
if(3>=v.length)return H.a(v,3)
v[3]=y},
b_:function(a,b,c){var z,y,x,w,v,u,t
if(typeof b!=="number")return H.l(b)
z=this.b+this.c*b
y=J.aw(c)
x=this.e
w=z+0
v=J.af(y,0)
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
x[v]=w}},hZ:{"^":"e;",
gi:function(a){return this.d},
h:function(a,b){var z=this.fv()
this.fo(0,b,z)
return z},
j:function(a,b,c){this.b_(0,b,c)},
bn:function(a,b,c,d){var z,y
if(this.c<this.a)throw H.b(P.ag("Stride cannot be smaller than the vector size."))
for(z=this.d,y=0;y<z;++y){if(y>=a.length)return H.a(a,y)
this.b_(0,y,a[y])}},
i1:function(a,b,c,d){if(this.c<this.a)throw H.b(P.ag("Stride cannot be smaller than the vector size."))}}}],["","",,T,{"^":"",
iN:function(a,b){var z,y
if(b!=null){z="%c"+a
y="color: "+b+";"
console.log(z,y)}else console.log(a)},
rb:function(){var z,y
z=P.al([300,"black",400,"black",500,"black",700,"gray",800,"green",900,"orange",1000,"orangered",1200,"red"])
y=$.$get$cZ()
J.jw(y,C.Z)
y.gkh().dm(new T.rc(z,[]))},
rc:{"^":"h:33;a,b",
$1:function(a){var z,y,x
z=J.k(a)
if(J.jD(z.gP(a),"group: ")){z=a.gdq()+"."+J.jE(a.b,7)
console.group(z)
this.b.push(a.d)}else if(J.E(z.gP(a),"groupEnd")){console.groupEnd()
z=this.b
if(0>=z.length)return H.a(z,-1)
z.pop()}else{y=this.b
y=y.length!==0&&a.gdq()===C.a.gaK(y)
x=this.a
if(y)T.iN(H.j(z.gP(a)),x.h(0,J.aB(z.gaV(a))))
else T.iN("["+a.gdq()+"] "+H.j(a.b),x.h(0,a.a.b))
if(z.ga9(a)!=null){z=z.ga9(a)
console.error(z)}}},
$isi:1}}],["","",,E,{"^":"",
iL:[function(){var z=0,y=P.br()
var $async$iL=P.bH(function(a,b){if(a===1)return P.bB(b,y)
while(true)switch(z){case 0:L.jW()
T.rb()
return P.bC(null,y)}})
return P.bD($async$iL,y)},"$0","iH",0,0,29]},1],["","",,L,{"^":"",
dp:function(a){var z=Math.pow(10,8-C.c.k(J.eO(a)).length)
return C.b.kx(a*z)/z},
ey:function(a){return P.aS(a.length,new L.pY(a),!0,P.K)},
ez:function(a){return P.aS(a.length,new L.pZ(a),!0,P.K)},
bn:function(a){var z=J.t(a)
if(!!z.$isM)return P.h6(z.gT(a),null,new L.ri(a),null,null)
else if(!!z.$isc)return P.aS(z.gi(a),new L.rj(a),!0,null)
else return L.pX(a)},
pX:function(a){var z=J.t(a)
if(!!z.$isa3)return P.al(["__dartClass","Tuple2","item1",a.a,"item2",a.b])
else if(!!z.$isbg)return P.al(["__dartClass","Vector2","storage",L.ey(a.a)])
else if(!!z.$isq)return P.al(["__dartClass","Vector3","storage",L.ey(a.a)])
else if(!!z.$isa0)return P.al(["__dartClass","Vector4","storage",L.ey(a.a)])
else return a},
q2:function(a){var z,y,x
z=J.G(a)
switch(z.h(a,"__dartClass")){case"Tuple2":return new S.a3(L.cA(z.h(a,"item1")),L.cA(z.h(a,"item2")),[null,null])
case"Vector2":z=L.ez(P.Y(z.h(a,"storage"),!0,P.aq))
y=new Float32Array(H.n(2))
if(1>=z.length)return H.a(z,1)
y[1]=z[1]
y[0]=z[0]
return new T.bg(y)
case"Vector3":z=L.ez(P.Y(z.h(a,"storage"),!0,P.aq))
y=new T.q(new Float32Array(H.n(3)))
y.f4(z,0)
return y
case"Vector4":z=L.ez(P.Y(z.h(a,"storage"),!0,P.aq))
y=new Float32Array(H.n(4))
x=z.length
if(0>=x)return H.a(z,0)
y[0]=z[0]
if(1>=x)return H.a(z,1)
y[1]=z[1]
if(2>=x)return H.a(z,2)
y[2]=z[2]
if(3>=x)return H.a(z,3)
y[3]=z[3]
return new T.a0(y)
default:return}},
cA:function(a){var z=J.t(a)
if(!!z.$isM){if(z.O(a,"__dartClass")===!0)return L.q2(a)
return P.h6(z.gT(a),null,new L.qD(a),null,null)}else if(!!z.$isc)return P.aS(z.gi(a),new L.qE(a),!0,null)
else return a},
iQ:function(a,b){var z,y
z=(self.URL||self.webkitURL).createObjectURL(a)
y=W.f5(null)
y.href=z
y.download=b
y.click();(self.URL||self.webkitURL).revokeObjectURL(z)},
r_:function(a){var z,y,x,w
z=P.p
y=new P.J(0,$.r,null,[z])
x=W.V("file")
J.k(x).siQ(x,a)
w=C.O.gdv(x)
W.O(w.a,w.b,new L.r1(new P.bw(y,[z]),x),!1,H.B(w,0))
x.click()
return y},
pY:{"^":"h:3;a",
$1:function(a){var z=this.a
if(a>=z.length)return H.a(z,a)
return L.dp(z[a])},
$isi:1},
pZ:{"^":"h:3;a",
$1:function(a){var z=this.a
if(a>=z.length)return H.a(z,a)
return J.dH(z[a])},
$isi:1},
ri:{"^":"h:0;a",
$1:function(a){return L.bn(J.af(this.a,a))},
$isi:1},
rj:{"^":"h:3;a",
$1:function(a){return L.bn(J.af(this.a,a))},
$isi:1},
qD:{"^":"h:0;a",
$1:function(a){return L.cA(J.af(this.a,a))},
$isi:1},
qE:{"^":"h:3;a",
$1:function(a){return L.cA(J.af(this.a,a))},
$isi:1},
cQ:{"^":"e;"},
b1:{"^":"cQ;"},
k8:{"^":"b1;ai:a<,b",
c9:function(a){return L.b0(this.b)},
gA:function(a){return this.a.value},
sA:function(a,b){var z,y
z=this.a
y=C.a.jO(this.b,b)
z.selectedIndex=y
return y},
hP:function(a){var z,y,x,w,v,u
this.a=document.createElement("select")
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.D)(z),++x){w=z[x]
v=W.mH("",w,null,!1)
v.textContent=w
u=this.a
if(w===u.value)v.selected=!0
u.appendChild(v)}},
t:{
b0:function(a){var z=new L.k8(null,a)
z.hP(a)
return z}}},
aj:{"^":"b1;ai:a<",
gA:function(a){return J.aB(this.a)},
sA:function(a,b){J.ci(this.a,b)
return b}},
dj:{"^":"b1;ai:a<,$ti",
ap:function(a,b,c,d,e){var z=W.V("number")
this.a=z
J.jA(z,C.b.k(this.b))
J.jy(this.a,C.c.k(this.c))
z=this.d
if(z!=null)J.jx(this.a,C.c.k(z))}},
l4:{"^":"dj;a,b,c,d",
gA:function(a){return H.am(J.aB(this.a),null,null)},
sA:function(a,b){var z,y
z=this.a
y=J.a5(b)
J.ci(z,y)
return y},
$asdj:function(){return[P.m]}},
aR:{"^":"dj;a,b,c,d",
c9:function(a){var z,y,x,w
z=this.b
y=this.c
x=this.d
w=new L.aR(null,z,y,x)
w.ap(x,y,z,0,P.K)
return w},
gA:function(a){return H.ed(J.aB(this.a),null)},
sA:function(a,b){var z,y
z=this.a
y=J.a5(b)
J.ci(z,y)
return y},
$asdj:function(){return[P.K]}},
dd:{"^":"b1;ai:a<",
gA:function(a){var z,y,x,w,v,u,t,s
z=new T.q(new Float32Array(H.n(3)))
y=J.f3(J.aB(this.a),",")
if(J.a4(y)===1){u=H.ed(J.eU(y),null)
t=new T.q(new Float32Array(H.n(3)))
t.bS(u)
return t}else{x=0
w=0
while(!0){if(!(J.bo(x,3)&&J.bo(x,J.a4(y))))break
c$0:if(J.eW(J.af(y,x)))try{v=H.ed(J.af(y,x),null)
u=z.gc5()
t=w
if(t>>>0!==t||t>=u.length)return H.a(u,t)
u[t]=v
w=J.R(w,1)}catch(s){if(!!J.t(H.H(s)).$isbU)break c$0
else throw s}x=J.R(x,1)}return z}},
sA:function(a,b){var z,y
z=this.a
y=J.k(b)
y=H.j(L.dp(y.gm(b)))+", "+H.j(L.dp(y.gn(b)))+", "+H.j(L.dp(y.gR(b)))
J.ci(z,y)
return y}},
kf:{"^":"b1;ai:a<",
h3:function(){var z,y,x
z=this.a
y=z.style
z=J.aB(z)
y.toString
y.background=z==null?"":z
z=new Float32Array(H.n(4))
y=this.gA(this).a
x=0.21*y[0]+0.71*y[1]+0.07*y[2]
z[0]=x
z[1]=x
z[2]=x
z[3]=y[3]
y=this.a.style
z=z[0]<0.5?"#eee":"#111"
y.color=z},
gA:function(a){var z,y,x
z=new T.a0(new Float32Array(H.n(4)))
try{T.ki(J.aB(this.a),z)}catch(y){if(!!J.t(H.H(y)).$isbU){x=new T.a0(new Float32Array(H.n(4)))
x.ax(0,0,0,1)
return x}else throw y}return z},
sA:function(a,b){var z=C.d.cl(T.kj(b,!1,!1),6,"0")
J.ci(this.a,"#"+z)
this.h3()},
hQ:function(){var z=W.V("text")
this.a=z
z.spellcheck=!1
z=J.jl(z)
W.O(z.a,z.b,new L.kh(this),!1,H.B(z,0))},
t:{
kg:function(){var z=new L.kf(null)
z.hQ()
return z}}},
kh:{"^":"h:0;a",
$1:function(a){return this.a.h3()},
$isi:1},
fn:{"^":"cQ;"},
nb:{"^":"fn;ai:a<,b,bF:c>",
fp:function(a){var z,y
z=this.c
y=J.k(a)
if(y.O(a,z)===!0&&y.h(a,z)!=null)this.b.sA(0,y.h(a,z))},
gM:function(a){var z=this.b
return z.gA(z)},
t:{
P:function(a,b){var z,y,x,w
z=document
y=z.createElement("tr")
x=z.createElement("td")
w=z.createElement("span")
w.classList.add("label")
w.textContent=a+":"
x.appendChild(w)
y.appendChild(x)
z=z.createElement("td")
z.classList.add("input-cell")
z.appendChild(b.gai())
y.appendChild(z)
return new L.nb(y,b,a)}}},
my:{"^":"fn;ai:a<,bF:b>,c,ay:d>,e,f",
fp:function(a){var z,y,x
z=this.b
y=J.G(a)
if(y.h(a,z)!=null)for(z=J.av(y.h(a,z));z.u();){x=z.gD()
this.eS(0,x.gdk(),x.b)}},
eS:function(a,b,c){var z,y,x,w,v,u,t
z=this.c.c9(0)
y=new L.aj(null)
y.a=W.V(J.bp(this.d.a))
x=L.b1
this.f.push(new S.a3(z,y,[x,x]))
if(b!=null)z.sA(0,b)
if(c!=null)y.sA(0,c)
x=document
w=x.createElement("tr")
v=x.createElement("td")
v.classList.add("input-cell")
u=v.style
t=""+this.e+"px"
u.width=t
v.appendChild(z.gai())
w.appendChild(v)
z=x.createElement("td")
z.classList.add("input-cell")
z.appendChild(y.a)
w.appendChild(z)
z=this.a
y=z.nextSibling
if(y!=null)z.parentElement.insertBefore(w,y)
else z.parentElement.appendChild(w)},
iX:function(a){return this.eS(a,null,null)},
gM:function(a){return P.aS(this.f.length,new L.mA(this),!0,S.a3)},
hV:function(a,b,c,d,e){var z,y,x,w,v,u
z=document
y=z.createElement("tr")
x=z.createElement("td")
w=z.createElement("span")
v=w.style
u=""+this.e+"px"
v.width=u
w.classList.add("label")
w.textContent=this.b+":"
x.appendChild(w)
y.appendChild(x)
x=z.createElement("td")
z=z.createElement("button")
w=z.style;(w&&C.r).bP(w,"float","right","")
z.textContent="+"
W.O(z,"click",new L.mz(this),!1,W.a2)
x.appendChild(z)
y.appendChild(x)
this.a=y},
t:{
cs:function(a,b,c,d,e){var z=new L.my(null,a,c,d,b,H.v([],[[S.a3,L.b1,L.b1]]))
z.hV(a,b,c,d,e)
return z}}},
mz:{"^":"h:0;a",
$1:function(a){return this.a.iX(0)},
$isi:1},
mA:{"^":"h:3;a",
$1:function(a){var z,y
z=this.a.f
if(a>=z.length)return H.a(z,a)
y=J.aB(z[a].a)
if(a>=z.length)return H.a(z,a)
return new S.a3(y,J.aB(z[a].b),[null,null])},
$isi:1},
bV:{"^":"cQ;ai:a<,ks:c<",
a8:function(){var z,y,x,w,v
z=new H.Q(0,null,null,null,null,null,0,[P.p,null])
for(y=this.b,x=y.length,w=0;w<y.length;y.length===x||(0,H.D)(y),++w){v=y[w]
z.j(0,v.gbF(v),v.gM(v))}return z},
aB:function(a,b){var z,y,x,w
for(z=this.b,y=z.length,x=0;x<z.length;z.length===y||(0,H.D)(z),++x){w=z[x]
if(w.gbF(w)===b)return w.gM(w)}return},
iY:function(){},
b1:function(a,b,c){var z,y,x,w,v,u,t
z=document
y=z.createElement("div")
y.classList.add("tab-item")
this.a=y
x=z.createElement("span")
x.classList.add("item-title")
x.textContent=a
y.appendChild(x)
x=this.a
y=z.createElement("button")
C.y.dX(y,"&times;")
w=y.style;(w&&C.r).bP(w,"float","right","")
W.O(y,"click",new L.m0(this),!1,W.a2)
x.appendChild(y)
v=z.createElement("table")
for(z=this.b,y=z.length,u=0;u<z.length;z.length===y||(0,H.D)(z),++u){t=z[u]
v.appendChild(t.gai())
t.fp(b)}this.a.appendChild(v)}},
m0:{"^":"h:0;a",
$1:function(a){var z=this.a
C.i.co(z.a)
z.c=!0},
$isi:1},
hj:{"^":"bV;a,b,c",
gM:function(a){var z,y,x,w
z=this.a8()
y=z.h(0,"Color").gdL()
x=z.h(0,"Speed")
w=z.h(0,"Radius")
return new G.hl(y.gdL(),x,w)}},
ha:{"^":"bV;cA:d<,dZ:e@,a,b,c",
hU:function(a){var z,y,x,w
z=this.a
y=document
x=y.createElement("div")
x.classList.add("particle-graph-titlebar")
w=y.createElement("span")
w.textContent="Graph"
w.classList.add("particle-graph-title")
x.appendChild(w)
y=y.createElement("button")
w=y.style;(w&&C.r).bP(w,"float","right","")
C.y.dX(y,'<i class="fa fa-download" aria-hidden="true"></i>')
W.O(y,"click",new L.mw(this),!1,W.a2)
x.appendChild(y)
z.appendChild(x)
this.a.appendChild(this.d.a)},
t:{
mv:function(a){var z,y,x,w,v,u,t,s,r,q,p
z=H.v([],[P.p])
y=document.createElement("canvas")
z=new L.mJ(y,null,z,[],[],[])
y.classList.add("particle-graph")
y.width=330
y.height=250
z.b=C.L.dO(y,"2d")
z.eD()
x=new L.aj(null)
x.a=W.V("text")
x=L.P("Label",x)
w=L.P("Type",L.b0(["AABB","Ellipsoid"]))
v=new L.dd(null)
v.a=W.V("text")
v=L.P("Center",v)
u=new L.dd(null)
u.a=W.V("text")
u=L.P("Semi-axes",u)
t=P.K
s=new L.aR(null,0.01,0,1)
s.ap(1,0,0.01,0,t)
r=new L.aj(null)
r.a=W.V("text")
r=L.cs("Enter",100,s,r,a)
s=new L.aR(null,0.01,0,1)
s.ap(1,0,0.01,0,t)
q=new L.aj(null)
q.a=W.V("text")
q=L.cs("Leave",100,s,q,a)
s=new L.aR(null,0.01,0,1)
s.ap(1,0,0.01,0,t)
p=new L.aj(null)
p.a=W.V("text")
p=L.cs("Stick on enter",100,s,p,a)
s=new L.aR(null,0.01,0,1)
s.ap(1,0,0.01,0,t)
t=new L.aj(null)
t.a=W.V("text")
t=[x,w,v,u,r,q,p,L.cs("Stick on leave",100,s,t,a)]
z=new L.ha(z,-1,null,t,!1)
z.b1("Membrane",a,t)
z.hU(a)
return z},
d3:function(a){var z,y,x
z=new H.Q(0,null,null,null,null,null,0,[P.p,P.K])
for(y=J.av(a);y.u();){x=y.gD()
if(J.eW(x.gbg()))z.j(0,x.b,x.a)}return z}}},
mw:{"^":"h:0;a",
$1:function(a){var z=this.a
L.iQ(W.fa(z.d.he().split("\n"),"text/csv",null),H.j(z.aB(0,"Label"))+".csv")},
$isi:1},
f9:{"^":"bV;a,b,c",
ji:function(a){var z,y,x,w,v,u,t,s
z=this.a8()
y=a.b
x=y.h(0,z.h(0,"Particle A"))
w=C.m.h(0,z.h(0,"A location"))
v=y.h(0,z.h(0,"Particle B"))
u=C.m.h(0,z.h(0,"B location"))
y=y.h(0,z.h(0,"Particle C"))
t=C.m.h(0,z.h(0,"C location"))
s=new Float32Array(H.bj([z.h(0,"Probability")])).buffer
return new G.f8(new G.c2(x,w),new G.c2(v,u),new G.c2(y,t),new D.cS((s&&C.e).S(s,0,1)))}},
hW:{"^":"bV;a,b,c",
jk:function(a){var z,y,x,w,v,u
z=this.a8()
y=P.Y(z.h(0,"Products"),!0,[S.a3,P.p,P.p])
x=P.aS(y.length,new L.of(a,y),!0,G.c2)
w=a.b.h(0,z.h(0,"Particle"))
v=C.m.h(0,z.h(0,"Location"))
u=new Float32Array(H.bj([z.h(0,"Probability")])).buffer
return new G.hV(new G.c2(w,v),x,new D.cS((u&&C.e).S(u,0,1)))}},
of:{"^":"h:3;a,b",
$1:function(a){var z,y
z=this.b
if(a>=z.length)return H.a(z,a)
y=this.a.b.h(0,z[a].gbg())
if(a>=z.length)return H.a(z,a)
return new G.c2(y,C.m.h(0,z[a].gdk()))},
$isi:1},
fv:{"^":"bV;a,b,c",
gM:function(a){var z,y,x,w
z=this.a8()
switch(z.h(0,"Type")){case"AABB":y=z.h(0,"Center")
x=z.h(0,"Semi-axes")
w=T.jM()
w.hr(y,x)
return new Z.cM(w,C.j)
case"Ellipsoid":y=new Z.cR(z.h(0,"Center"),null,null,null,C.k)
y.sdW(z.h(0,"Semi-axes"))
return y
default:return}}},
hv:{"^":"bV;a,b,c",
eA:function(a,b,c){var z,y
z=b.b
if(z.O(0,a)){y=b.a
z=z.h(0,a)
if(z>>>0!==z||z>=y.length)return H.a(y,z)
return J.eT(y[z])}else{z=c.b
if(z.O(0,a)){y=c.a
z=z.h(0,a)
if(z>>>0!==z||z>=y.length)return H.a(y,z)
return y[z]}else return}},
j2:function(a,b,c,d){var z,y,x,w,v,u,t,s,r,q
z=this.a8()
y=b.b.h(0,z.h(0,"Particle"))
x=this.eA(z.h(0,"Domain"),c,d)
w=J.f3(z.h(0,"Cavities"),",")
v=H.v([],[Z.bS])
for(u=w.length,t=0;t<w.length;w.length===u||(0,H.D)(w),++t){s=w[t]
r=J.G(s)
if(r.gY(s)){q=this.eA(r.fV(s),c,d)
if(q!=null)v.push(q)}}a.iW(y,x,z.h(0,"Number"),v)}},
r1:{"^":"h:0;a,b",
$1:function(a){var z,y
z=new FileReader()
W.O(z,"loadend",new L.r0(this.a,z),!1,W.uK)
y=J.jf(this.b)
z.readAsText((y&&C.M).gv(y))},
$isi:1},
r0:{"^":"h:0;a,b",
$1:function(a){this.a.ad(0,C.N.gkw(this.b))},
$isi:1},
mJ:{"^":"cQ;ai:a<,b,c,d,aH:e<,cG:f<",
he:function(){var z,y,x,w,v
z=H.v([],[P.c])
y=["Step"]
x=P.p
C.a.a3(y,P.aS(this.c.length,new L.mL(this),!0,x))
C.a.a3(y,P.aS(this.c.length,new L.mM(this),!0,x))
z.push(y)
for(y=this.e,x=this.f,w=0;w<y.length;++w){v=[w]
C.a.a3(v,y[w])
if(w>=x.length)return H.a(x,w)
C.a.a3(v,x[w])
z.push(v)}return C.a2.je(z)},
kn:function(){var z,y,x,w,v,u,t,s,r,q
if(!(this.a.clientWidth===0||this.e.length===0)){J.j5(this.b,0,0,330,250)
z=this.e
y=C.a.al(z,0,new L.mN())
x=this.f
w=C.a.al(x,0,new L.mO())
v=Math.max(H.aA(y),H.aA(w))
w=z.length
u=330/w
t=248/v
s=C.A.eY(w/330)
r=Math.pow(2,C.A.eY(Math.log(30/(330/z.length))/Math.log(2)))*(330/z.length)
J.dF(this.b)
J.dG(this.b,1)
J.cJ(this.b,85,85,85)
for(q=0;q<330;q+=r){J.eK(this.b)
J.f0(this.b,q,0)
J.f_(this.b,q,250)
J.cK(this.b)}J.dE(this.b)
J.dF(this.b)
J.dG(this.b,2)
this.ed(u,t,s,z,new L.mP(this))
this.ed(u,t,s,x,new L.mQ(this))
J.dE(this.b)}this.eD()},
ed:function(a,b,c,d,e){var z,y,x,w,v,u,t,s,r,q,p,o
for(z=0;z<this.d.length;z=y){J.eK(this.b)
for(y=z+1,x=!0,w=0;v=d.length,w<v;w+=c){if(w<0)return H.a(d,w)
u=J.af(d[w],z)
if(x&&J.E(u,0))continue
t=1+w*a
v=J.bm(u)
s=v.H(u,b)
if(typeof s!=="number")return H.l(s)
r=249-s
if(d.length>100&&w>100)for(s=w-100,q=y;q<this.d.length;++q){if(w>=d.length)return H.a(d,w)
p=J.af(d[w],q)
if(s<0||s>=d.length)return H.a(d,s)
p=J.an(p,J.af(d[s],q))
if(s>=d.length)return H.a(d,s)
o=J.an(p,v.a2(u,J.af(d[s],z)))
if(w>=d.length)return H.a(d,w)
if(J.bo(J.N(J.eJ(J.an(J.af(d[w],q),u)),b),2)&&J.iV(J.eJ(o),5))r-=2}v=this.b
if(x){J.f0(v,t,r)
x=!1}else J.f_(v,t,r)}J.dF(this.b)
e.$1(z)
J.dE(this.b)}},
eD:function(){var z=window
C.p.eh(z)
C.p.ez(z,W.eC(new L.mK(this)))}},
mL:{"^":"h:3;a",
$1:function(a){var z=this.a.c
if(a>=z.length)return H.a(z,a)
return H.j(z[a])+" (entered)"},
$isi:1},
mM:{"^":"h:3;a",
$1:function(a){var z=this.a.c
if(a>=z.length)return H.a(z,a)
return H.j(z[a])+" (sticked)"},
$isi:1},
mN:{"^":"h:14;",
$2:function(a,b){var z=J.bO(b,P.bJ())
return Math.max(H.aA(a),H.aA(z))},
$isi:1},
mO:{"^":"h:14;",
$2:function(a,b){var z=J.bO(b,P.bJ())
return Math.max(H.aA(a),H.aA(z))},
$isi:1},
mP:{"^":"h:3;a",
$1:function(a){var z,y,x,w,v,u
z=this.a
y=z.b
x=z.d
if(a>=x.length)return H.a(x,a)
x=x[a].a
w=x.length
if(0>=w)return H.a(x,0)
v=C.b.Z(x[0]*255)
if(1>=w)return H.a(x,1)
u=C.b.Z(x[1]*255)
if(2>=w)return H.a(x,2)
J.cJ(y,v,u,C.b.Z(x[2]*255))
J.cK(z.b)},
$isi:1},
mQ:{"^":"h:3;a",
$1:function(a){var z,y,x,w,v,u
z=this.a
y=z.b
x=z.d
if(a>=x.length)return H.a(x,a)
x=x[a].a
w=x.length
if(0>=w)return H.a(x,0)
v=C.b.Z(x[0]*255)
if(1>=w)return H.a(x,1)
u=C.b.Z(x[1]*255)
if(2>=w)return H.a(x,2)
J.cJ(y,v,u,C.b.Z(x[2]*255))
J.cK(z.b)
J.dG(z.b,1)
J.cJ(z.b,0,0,0)
J.cK(z.b)},
$isi:1},
mK:{"^":"h:12;a",
$1:function(a){this.a.kn()},
$isi:1},
hF:{"^":"e;bF:a>,b,c,d,e,$ti",
eO:function(a){this.b.classList.remove("inactive")
this.c.classList.remove("hidden")},
f8:function(a){this.b.classList.add("inactive")
this.c.classList.add("hidden")},
eQ:function(a){var z,y
z=this.d
if(a==null)y=new H.Q(0,null,null,null,null,null,0,[P.p,null])
else y=a
z.push(this.e.$1(y))
this.c.appendChild(C.a.gaK(z).gai())
C.a.gaK(z).iY()},
iU:function(){return this.eQ(null)},
bh:function(a){var z,y,x
for(z=a.length,y=P.p,x=0;x<a.length;a.length===z||(0,H.D)(a),++x)this.eQ(P.mj(a[x],y,null))},
gaI:function(a){var z,y,x,w,v
z=H.v([],this.$ti)
for(y=this.d,x=y.length,w=0;w<y.length;y.length===x||(0,H.D)(y),++w){v=y[w]
if(!v.gks())z.push(v)}return z},
a8:function(){var z=this.gaI(this)
return P.aS(z.length,new L.nO(z),!0,[P.M,P.p,,])},
hY:function(a,b,c){var z=this.b
z.textContent=this.a
W.i6(z,["tab-header","inactive"])
W.i6(this.c,["tab-panel","hidden"])},
t:{
c3:function(a,b,c){var z=document
z=new L.hF(a,z.createElement("span"),z.createElement("div"),[],b,[c])
z.hY(a,b,c)
return z}}},
nO:{"^":"h:0;a",
$1:function(a){var z=this.a
if(a>=z.length)return H.a(z,a)
return z[a].a8()},
$isi:1},
nQ:{"^":"e;a,b,c,d",
l:function(a,b){var z
this.c.j(0,J.jh(b),b)
z=b.b
this.a.appendChild(z)
this.b.appendChild(b.c)
W.O(z,"click",new L.nS(this,b),!1,W.a2)},
dV:function(a,b){var z=this.c
if(z.O(0,this.d))J.j8(z.h(0,this.d))
J.iZ(z.h(0,b))
this.d=b},
gD:function(){var z=this.c
if(z.O(0,this.d))return z.h(0,this.d)
else return},
hZ:function(a,b,c){var z=J.cg(c)
W.O(z.a,z.b,new L.nT(this),!1,H.B(z,0))},
t:{
nR:function(a,b,c){var z=new L.nQ(a,b,new H.Q(0,null,null,null,null,null,0,[P.p,L.hF]),"")
z.hZ(a,b,c)
return z}}},
nT:{"^":"h:0;a",
$1:function(a){return this.a.gD().iU()},
$isi:1},
nS:{"^":"h:0;a,b",
$1:function(a){return this.a.dV(0,this.b.a)},
$isi:1},
jV:{"^":"e;a,b,c,d,e,f,r,x,y,z,Q,ch,cx,cy,db,dx",
dM:function(){return C.E.jy(P.al(["Particles",L.bn(this.Q.a8()),"Membranes",L.bn(this.ch.a8()),"BindReactions",L.bn(this.cx.a8()),"UnbindReactions",L.bn(this.cy.a8()),"Domains",L.bn(this.db.a8()),"Setup",L.bn(this.dx.a8())]))},
fq:function(a){var z,y,x,w,v,u,t,s
z=this.Q
C.a.si(z.d,0)
C.i.b6(z.c)
y=this.ch
C.a.si(y.d,0)
C.i.b6(y.c)
x=this.cx
C.a.si(x.d,0)
C.i.b6(x.c)
w=this.cy
C.a.si(w.d,0)
C.i.b6(w.c)
v=this.db
C.a.si(v.d,0)
C.i.b6(v.c)
u=this.dx
C.a.si(u.d,0)
C.i.b6(u.c)
t=L.cA(C.E.jl(a))
s=J.G(t)
z.bh(P.Y(s.h(t,"Particles"),!0,null))
y.bh(P.Y(s.h(t,"Membranes"),!0,null))
x.bh(P.Y(s.h(t,"BindReactions"),!0,null))
w.bh(P.Y(s.h(t,"UnbindReactions"),!0,null))
v.bh(P.Y(s.h(t,"Domains"),!0,null))
u.bh(P.Y(s.h(t,"Setup"),!0,null))},
bM:function(){var z=0,y=P.br(),x,w=2,v,u=[],t=this,s,r,q,p,o,n,m,l,k,j,i,h,g,f,e,d,c,b,a,a0,a1,a2,a3,a4,a5,a6,a7,a8,a9,b0,b1,b2,b3,b4,b5,b6,b7,b8,b9,c0,c1,c2,c3,c4
var $async$bM=P.bH(function(c5,c6){if(c5===1){v=c6
z=w}while(true)switch(z){case 0:a0=t.d
a1=J.k(a0)
a1.gbw(a0).l(0,"disabled")
a2=a1.gc8(a0)
a2=a2.gv(a2)
a3=J.k(a2)
a3.gbw(a2).l(0,"fa-spin")
J.f2(a3.gaD(a2),"inherit")
a2=t.y
z=3
return P.aZ(a2.ae(0),$async$bM)
case 3:w=5
a3=P.p
s=H.v([],[a3])
r=H.v([],[T.q])
a4=G.hl
a5=H.v([],[a4])
a3=[a3,P.m]
q=new G.dX(a5,new H.Q(0,null,null,null,null,null,0,a3),[a4])
for(a4=t.Q,a4=a4.gaI(a4),a5=a4.length,a6=0;a6<a4.length;a4.length===a5||(0,H.D)(a4),++a6){p=a4[a6]
o=J.cD(p)
n=J.dD(p,"Label")
J.bM(s,n)
J.bM(r,o.gdi())
a7=q
a7.gbW().j(0,n,a7.a.length)
a7.a.push(o)}a4=G.d2
a5=H.v([],[a4])
m=new G.dX(a5,new H.Q(0,null,null,null,null,null,0,a3),[a4])
for(a4=t.ch,a4=a4.gaI(a4),a5=a4.length,a6=0;a6<a4.length;a4.length===a5||(0,H.D)(a4),++a6){l=a4[a6]
l.gcA().c=s
l.gcA().d=r
k=J.dD(l,"Label")
a7=m
a8=q
a9=l.a8()
b0=J.G(a9)
switch(b0.h(a9,"Type")){case"AABB":b1=b0.h(a9,"Center")
b2=b0.h(a9,"Semi-axes")
b3=new T.q(new Float32Array(3))
b4=new T.q(new Float32Array(3))
b3.q(b1)
b3.ao(b2)
b4.q(b1)
b4.l(0,b2)
b5=new Z.cM(new T.cj(b3,b4),C.j)
break
case"Ellipsoid":b6=b0.h(a9,"Semi-axes")
b1=J.k(b6)
if(J.E(b1.gm(b6),b1.gn(b6))&&J.E(b1.gn(b6),b1.gR(b6)))b5=new Z.el(b0.h(a9,"Center"),b1.gm(b6),C.n)
else{b5=new Z.cR(b0.h(a9,"Center"),null,null,null,C.k)
b5.c=b6
b5.d=J.bO(J.aw(b6),P.dw())
b5.e=J.bO(J.aw(b6),P.bJ())}break
default:b5=null}b1=a8.cj(L.d3(b0.h(a9,"Enter")))
b2=a8.cj(L.d3(b0.h(a9,"Leave")))
b3=a8.cj(L.d3(b0.h(a9,"Stick on enter")))
b0=a8.cj(L.d3(b0.h(a9,"Stick on leave")))
b4=a8.a.length
b7=new Float32Array(3)
b8=new Uint32Array(b4)
b4=new Uint32Array(b4)
a7.gbW().j(0,k,a7.a.length)
a7.a.push(new G.d2(b5,null,b1,b2,b3,b0,b8,b4,new T.q(b7)))
l.sdZ(m.gbW().h(0,k))}j=H.v([],[G.f8])
for(a4=t.cx,a4=a4.gaI(a4),a5=a4.length,a6=0;a6<a4.length;a4.length===a5||(0,H.D)(a4),++a6){i=a4[a6]
J.bM(j,i.ji(q))}h=H.v([],[G.hV])
for(a4=t.cy,a4=a4.gaI(a4),a5=a4.length,a6=0;a6<a4.length;a4.length===a5||(0,H.D)(a4),++a6){g=a4[a6]
J.bM(h,g.jk(q))}a4=Z.bS
a5=H.v([],[a4])
f=new G.dX(a5,new H.Q(0,null,null,null,null,null,0,a3),[a4])
for(a3=t.db,a3=a3.gaI(a3),a4=a3.length,a6=0;a6<a3.length;a3.length===a4||(0,H.D)(a3),++a6){e=a3[a6]
a5=f
a7=J.dD(e,"Label")
b0=J.cD(e)
a5.gbW().j(0,a7,a5.a.length)
a5.a.push(b0)}a3=J.cD(q)
a4=j
a5=h
a7=N.b6("bromium.structs.Simulation")
b0=a3.length
b1=J.a4(a4)
b2=J.a4(a5)
b3=new G.hw(null)
b4=H.n(6)
b7=new Uint32Array(b4)
b3.a=b7
if(0>=b4){x=H.a(b7,0)
z=1
break}b7[0]=b0
if(1>=b4){x=H.a(b7,1)
z=1
break}b7[1]=b1
if(2>=b4){x=H.a(b7,2)
z=1
break}b7[2]=b2
b9=new G.nc(a7,null,b3,0,a3,a4,a5,[],[])
a7.G("group: Simulation")
b3=b3.a
a7=b3.length
if(1>=a7){x=H.a(b3,1)
z=1
break}a5=b3[1]
if(2>=a7){x=H.a(b3,2)
z=1
break}b9.d=24+4*(a5+b3[2])
b9.a0(0,0)
$.$get$bE().G("groupEnd")
d=b9
for(a3=t.dx,a3=a3.gaI(a3),a4=a3.length,a6=0;a6<a3.length;a3.length===a4||(0,H.D)(a3),++a6){c=a3[a6]
c.j2(d,q,m,f)}J.eP(J.cD(m),d.giV())
b=d.ki()
z=8
return P.aZ(a2.am(d),$async$bM)
case 8:t.z.r.a.f.bl()
a2=t.z
a3=b
a4=a3.gix()
a5=new T.q(new Float32Array(H.n(3)))
a5.q(a4)
a4=a3.b
a5.l(0,a4)
a5.ab(0,0.5)
a2.x=a5
a2=a2.r
a3=a3.a
a5=H.n(3)
a7=new Float32Array(a5)
b0=new T.q(a7)
b0.q(a3)
b0.l(0,a4)
b0.ab(0,0.5)
a3=a3.a
b0=a3.length
if(0>=b0){x=H.a(a3,0)
z=1
break}a4=a3[0]
if(0>=a5){x=H.a(a7,0)
z=1
break}c0=a4-a7[0]
if(1>=b0){x=H.a(a3,1)
z=1
break}a4=a3[1]
if(1>=a5){x=H.a(a7,1)
z=1
break}c1=a4-a7[1]
if(2>=b0){x=H.a(a3,2)
z=1
break}a3=a3[2]
if(2>=a5){x=H.a(a7,2)
z=1
break}c2=a3-a7[2]
a7=Math.sqrt(c0*c0+c1*c1+c2*c2)
a2.a.a=-3*a7
a7=t.z
a7.y=!1
a7.ek()
w=2
z=7
break
case 5:w=4
c4=v
a2=H.H(c4)
if(!!J.t(a2).$isbU){a=a2
a2=a1.gc8(a0)
J.f2(J.jn(a2.gv(a2)),"#a00")
P.bK(a)}else throw c4
z=7
break
case 4:z=2
break
case 7:t.f.textContent="Pause"
a1.gbw(a0).W(0,"disabled")
a0=a1.gc8(a0)
J.dC(a0.gv(a0)).W(0,"fa-spin")
case 1:return P.bC(x,y)
case 2:return P.bB(v,y)}})
return P.bD($async$bM,y)},
cn:function(){var z=0,y=P.br(),x=this,w,v
var $async$cn=P.bH(function(a,b){if(a===1)return P.bB(b,y)
while(true)switch(z){case 0:w=x.y
z=w.r?2:4
break
case 2:if(w.f){v=x.f
v.textContent="Pausing..."
J.dC(v).l(0,"disabled")}z=5
return P.aZ(w.ae(0),$async$cn)
case 5:w=x.f
w.textContent="Run"
J.dC(w).W(0,"disabled")
z=3
break
case 4:w.at(0)
x.f.textContent="Pause"
case 3:return P.bC(null,y)}})
return P.bD($async$cn,y)},
fR:function(){var z,y,x
z=this.x
y=this.r
x=J.k(z)
x.sa1(z,y.clientWidth)
x.sa_(z,y.clientHeight)
this.z.h5()},
hO:function(){var z,y,x,w,v
z=this.y
y=this.x
x=new N.k3(z,null,null,null,null,null,null,null,-1,y,null,null,30,null,null,null,null,!0)
x.hR(y,30)
J.eZ(x.e,"OES_standard_derivatives")
y=new S.fQ(x.e,"attribute vec2 aImposterPosition;\nattribute vec3 aParticlePosition;\nattribute vec3 aParticleColor;\nattribute float aParticleRadius;\n\nuniform mat4 uViewMatrix;\nuniform float uViewportRatio;\n\nvarying vec3 sphereColor;\nvarying vec3 spherePosition;\nvarying vec2 impostorPosition;\n\nvoid main(void) {\n  vec2 imp = vec2(aImposterPosition.x / uViewportRatio, aImposterPosition.y);\n  vec4 position = uViewMatrix * vec4(aParticlePosition, 1.0);\n\n  sphereColor = aParticleColor;\n  impostorPosition = aImposterPosition;\n  spherePosition = position.xyz;\n\n  gl_Position = position + aParticleRadius * vec4(imp, 0.0, 0.0);\n}\n","#extension GL_OES_standard_derivatives : enable\n\nprecision mediump float;\n\n//uniform highp mat4 uViewMatrix;\nuniform vec3 uLightPosition;\n\nvarying vec3 sphereColor;\nvarying vec3 spherePosition;\nvarying vec2 impostorPosition;\n\nvoid main()\n{\n    float dist = length(impostorPosition);\n\n    if (dist > 1.0) {\n      discard;\n    }\n\n    // Lighting\n    // 1. Project light on sphere\n    // 2. Compute radial gradient\n\n    // With view matrix (light spot moves when rotating).\n    //vec4 light = uViewMatrix * vec4(uLightPosition, 1.0);\n    //light = light - vec4(spherePosition, 0.0);\n    //light = light / length(light.xyz);\n\n    // Without view matrix (light spots are fixed).\n    vec3 light = uLightPosition - spherePosition;\n    light = light / length(light);\n\n    // Compute distance from radial center to fragment coordinate.\n    float rdist = length(impostorPosition - light.xy);\n\n    // Apply radial gradients.\n    vec3 color = sphereColor;\n    color = mix(vec3(1.0, 1.0, 1.0), color, 0.5 + 0.5 * smoothstep(0.0, 1.0, rdist));\n    color = mix(color, vec3(0.0, 0.0, 0.0), smoothstep(0.6, 2.0, rdist));\n    color = mix(color, vec3(0.0, 0.0, 0.0), smoothstep(1.0, 1.5, rdist));\n\n    gl_FragColor = vec4(color, 1.0);\n\n    // Anti-aliased circles.\n    //float delta = fwidth(dist);\n    //float alpha = smoothstep(1.0, 1.0 - delta, dist);\n    //gl_FragColor = mix(vec4(0.0, 0.0, 0.0, 0.0), vec4(sphereColor, 1.0), alpha);\n}\n",null,["aImposterPosition","aParticlePosition","aParticleColor","aParticleRadius"],null,null,null,null,["uViewMatrix","uViewportRatio","uLightPosition"],null)
x.cy=y
y.r="aParticlePosition"
y.x="aParticleColor"
y.y="uViewMatrix"
y.f1()
y=new S.fQ(x.e,"attribute vec3 aVertexPosition;\n\nuniform mat4 uViewMatrix;\n\nvarying vec3 vertex;\n\nvoid main(void) {\n  gl_PointSize = 1.5;\n  gl_Position = uViewMatrix * vec4(aVertexPosition, 1.0);\n\n  vertex = aVertexPosition;\n}\n","// License: CC0 (http://creativecommons.org/publicdomain/zero/1.0/)\n#extension GL_OES_standard_derivatives : enable\n\nprecision mediump float;\n\nuniform vec4 uLineColor;\n\nvarying vec3 vertex;\n\nvoid main() {\n  // Pick a coordinate to visualize in a grid\n  vec2 coord = vertex.xz * 10.0;\n\n  // Compute anti-aliased world-space grid lines\n  vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);\n  float line = min(grid.x, grid.y);\n\n  // Just visualize the grid lines directly\n  gl_FragColor = uLineColor * vec4(1.0 - min(line, 1.0));\n}\n",null,["aVertexPosition"],null,null,null,null,["uViewMatrix","uLineColor"],null)
x.db=y
y.r="aVertexPosition"
y.y="uViewMatrix"
y.f1()
y=x.e
w=new T.a0(new Float32Array(H.n(4)))
w.ax(0,0,0,1)
v=new T.a0(new Float32Array(H.n(4)))
v.ax(1,1,1,0.1)
x.dx=S.kQ(y,x.db,v,null,w,null)
w=x.e
v=new T.a0(new Float32Array(H.n(4)))
v.ax(0,0,0,1)
y=new T.a0(new Float32Array(H.n(4)))
y.ax(1,1,1,0.3)
x.dy=S.kV(w,40,80,x.db,y,null,v,null)
v=x.e
y=new S.fP(v,null,null,null,[])
x.Q=y
y.c=x.cy
y=[]
w=[P.kM]
x.ch=new S.cT(v,0,35044,34962,y,J.dz(v),w)
y.push(new S.bP("aParticlePosition",5126,3,28,0))
x.ch.e.push(new S.bP("aParticleColor",5126,3,28,12))
x.ch.e.push(new S.bP("aParticleRadius",5126,1,28,24))
x.Q.e.push(x.ch)
y=x.e
v=[]
x.cx=new S.cT(y,0,35044,34962,v,J.dz(y),w)
v.push(new S.bP("aImposterPosition",5126,2,0,0))
x.cx.bj(new Float32Array(H.bj([1,1,1,-1,-1,-1,-1,1])))
x.Q.e.push(x.cx)
v=x.Q
w=x.e
v.d=new S.fO(w,0,35044,34963,[],J.dz(w))
x.Q.d.bj(new Uint16Array(H.bj([0,1,2,0,2,3])))
this.z=x
x=W.ab
W.O(window,"resize",new L.jX(this),!1,x)
this.fR()
w=this.a
w.l(0,this.Q)
w.l(0,this.ch)
w.l(0,this.cx)
w.l(0,this.cy)
w.l(0,this.db)
w.l(0,this.dx)
w.dV(0,"Particles")
z.x.dm(new L.jY(this))
z=J.cg(this.b)
W.O(z.a,z.b,new L.jZ(this),!1,H.B(z,0))
z=J.cg(this.c)
W.O(z.a,z.b,new L.k_(this),!1,H.B(z,0))
z=J.cg(this.d)
W.O(z.a,z.b,new L.k0(this),!1,H.B(z,0))
z=J.cg(this.f)
W.O(z.a,z.b,new L.k1(this),!1,H.B(z,0))
W.O(window,"unload",new L.k2(this),!1,x)
if(window.localStorage.getItem("BromiumData")!=null)this.fq(window.localStorage.getItem("BromiumData"))},
t:{
jW:function(){var z,y,x,w,v,u,t
z=L.c3("Particles",new L.qg(),L.hj)
y=L.c3("Membranes",new L.qh(),L.ha)
x=L.c3("Bind reactions",new L.qi(),L.f9)
w=L.c3("Unbind reactions",new L.qj(),L.hW)
v=L.c3("Domains",new L.qk(),L.fv)
u=L.c3("Setup",new L.ql(),L.hv)
t=document
u=new L.jV(L.nR(t.querySelector("#tabs-bar"),t.querySelector("#tabs-panel"),t.querySelector("#btn-add")),t.querySelector("#btn-save"),t.querySelector("#btn-load"),t.querySelector("#btn-update"),t.querySelector("#btn-add"),t.querySelector("#btn-pause-run"),t.querySelector("#view-panel"),t.querySelector("#bromium-canvas"),N.jT(!0),null,z,y,x,w,v,u)
u.hO()
return u}}},
qg:{"^":"h:0;",
$1:function(a){var z,y,x,w
z=new L.aj(null)
z.a=W.V("text")
z=L.P("Label",z)
y=P.K
x=new L.aR(null,0.001,0,null)
x.ap(null,0,0.001,0,y)
x=L.P("Speed",x)
w=new L.aR(null,0.001,0,null)
w.ap(null,0,0.001,0,y)
w=[z,x,L.P("Radius",w),L.P("Color",L.kg())]
x=new L.hj(null,w,!1)
x.b1("Particle type",a,w)
return x},
$isi:1},
qh:{"^":"h:0;",
$1:function(a){return L.mv(a)},
$isi:1},
qi:{"^":"h:0;",
$1:function(a){var z,y,x,w,v,u,t
z=new L.aj(null)
z.a=W.V("text")
z=L.P("Particle A",z)
y=L.P("A location",L.b0(["inside","sticked","outside"]))
x=new L.aj(null)
x.a=W.V("text")
x=L.P("Particle B",x)
w=L.P("B location",L.b0(["inside","sticked","outside"]))
v=new L.aj(null)
v.a=W.V("text")
v=L.P("Particle C",v)
u=L.P("C location",L.b0(["inside","sticked","outside"]))
t=new L.aR(null,0.01,0,1)
t.ap(1,0,0.01,0,P.K)
t=[z,y,x,w,v,u,L.P("Probability",t)]
u=new L.f9(null,t,!1)
u.b1("Bind reaction",a,t)
return u},
$isi:1},
qj:{"^":"h:0;",
$1:function(a){var z,y,x,w
z=new L.aj(null)
z.a=W.V("text")
z=L.P("Particle",z)
y=L.P("Location",L.b0(["inside","sticked","outside"]))
x=L.b0(["inside","sticked","outside"])
w=new L.aj(null)
w.a=W.V("text")
w=L.cs("Products",100,x,w,a)
x=new L.aR(null,0.01,0,1)
x.ap(1,0,0.01,0,P.K)
x=[z,y,w,L.P("Probability",x)]
w=new L.hW(null,x,!1)
w.b1("Unbind reaction",a,x)
return w},
$isi:1},
qk:{"^":"h:0;",
$1:function(a){var z,y,x,w
z=new L.aj(null)
z.a=W.V("text")
z=L.P("Label",z)
y=L.P("Type",L.b0(["AABB","Ellipsoid"]))
x=new L.dd(null)
x.a=W.V("text")
x=L.P("Center",x)
w=new L.dd(null)
w.a=W.V("text")
w=[z,y,x,L.P("Semi-axes",w)]
x=new L.fv(null,w,!1)
x.b1("Domain",a,w)
return x},
$isi:1},
ql:{"^":"h:0;",
$1:function(a){var z,y,x,w
z=new L.aj(null)
z.a=W.V("text")
z=L.P("Particle",z)
y=new L.l4(null,1,1,null)
y.ap(null,1,1,0,P.m)
y=L.P("Number",y)
x=new L.aj(null)
x.a=W.V("text")
x=L.P("Domain",x)
w=new L.aj(null)
w.a=W.V("text")
w=[z,y,x,L.P("Cavities",w)]
x=new L.hv(null,w,!1)
x.b1("Fill particles",a,w)
return x},
$isi:1},
jX:{"^":"h:0;a",
$1:function(a){return this.a.fR()},
$isi:1},
jY:{"^":"h:0;a",
$1:function(a){var z,y,x,w,v,u,t
z=this.a.ch
y=z.gaI(z)
for(z=J.G(a),x=0,w=0;w<y.length;++w)if(J.E(y[w].gdZ(),x)){if(w>=y.length)return H.a(y,w)
v=y[w].gcA()
u=z.h(a,x).gdk()
t=z.h(a,x).gbg()
v.e.push(u)
v.f.push(t);++x
if(x===z.gi(a))break}},
$isi:1},
jZ:{"^":"h:0;a",
$1:function(a){L.iQ(W.fa([this.a.dM()],"application/json",null),"bromium.json")},
$isi:1},
k_:{"^":"h:34;a",
$1:function(a){var z=0,y=P.br(),x=this,w
var $async$$1=P.bH(function(b,c){if(b===1)return P.bB(c,y)
while(true)switch(z){case 0:w=x.a
z=2
return P.aZ(L.r_("application/json"),$async$$1)
case 2:w.fq(c)
return P.bC(null,y)}})
return P.bD($async$$1,y)},
$isi:1},
k0:{"^":"h:0;a",
$1:function(a){return this.a.bM()},
$isi:1},
k1:{"^":"h:0;a",
$1:function(a){return this.a.cn()},
$isi:1},
k2:{"^":"h:0;a",
$1:function(a){window.localStorage.setItem("BromiumData",this.a.dM())},
$isi:1}}]]
setupProgram(dart,0)
J.t=function(a){if(typeof a=="number"){if(Math.floor(a)==a)return J.h0.prototype
return J.h_.prototype}if(typeof a=="string")return J.cq.prototype
if(a==null)return J.h1.prototype
if(typeof a=="boolean")return J.m4.prototype
if(a.constructor==Array)return J.co.prototype
if(typeof a!="object"){if(typeof a=="function")return J.cr.prototype
return a}if(a instanceof P.e)return a
return J.dq(a)}
J.G=function(a){if(typeof a=="string")return J.cq.prototype
if(a==null)return a
if(a.constructor==Array)return J.co.prototype
if(typeof a!="object"){if(typeof a=="function")return J.cr.prototype
return a}if(a instanceof P.e)return a
return J.dq(a)}
J.at=function(a){if(a==null)return a
if(a.constructor==Array)return J.co.prototype
if(typeof a!="object"){if(typeof a=="function")return J.cr.prototype
return a}if(a instanceof P.e)return a
return J.dq(a)}
J.aE=function(a){if(typeof a=="number")return J.cp.prototype
if(a==null)return a
if(!(a instanceof P.e))return J.cv.prototype
return a}
J.bm=function(a){if(typeof a=="number")return J.cp.prototype
if(typeof a=="string")return J.cq.prototype
if(a==null)return a
if(!(a instanceof P.e))return J.cv.prototype
return a}
J.aL=function(a){if(typeof a=="string")return J.cq.prototype
if(a==null)return a
if(!(a instanceof P.e))return J.cv.prototype
return a}
J.k=function(a){if(a==null)return a
if(typeof a!="object"){if(typeof a=="function")return J.cr.prototype
return a}if(a instanceof P.e)return a
return J.dq(a)}
J.R=function(a,b){if(typeof a=="number"&&typeof b=="number")return a+b
return J.bm(a).N(a,b)}
J.ak=function(a,b){if(typeof a=="number"&&typeof b=="number")return a/b
return J.aE(a).aY(a,b)}
J.E=function(a,b){if(a==null)return b==null
if(typeof a!="object")return b!=null&&a===b
return J.t(a).I(a,b)}
J.ar=function(a,b){if(typeof a=="number"&&typeof b=="number")return a>b
return J.aE(a).aM(a,b)}
J.iV=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<=b
return J.aE(a).cB(a,b)}
J.bo=function(a,b){if(typeof a=="number"&&typeof b=="number")return a<b
return J.aE(a).aw(a,b)}
J.N=function(a,b){if(typeof a=="number"&&typeof b=="number")return a*b
return J.bm(a).H(a,b)}
J.iW=function(a){if(typeof a=="number")return-a
return J.aE(a).aN(a)}
J.an=function(a,b){if(typeof a=="number"&&typeof b=="number")return a-b
return J.aE(a).a2(a,b)}
J.ce=function(a,b){return J.aE(a).cI(a,b)}
J.af=function(a,b){if(typeof b==="number")if(a.constructor==Array||typeof a=="string"||H.iJ(a,a[init.dispatchPropertyName]))if(b>>>0===b&&b<a.length)return a[b]
return J.G(a).h(a,b)}
J.iX=function(a,b,c){if(typeof b==="number")if((a.constructor==Array||H.iJ(a,a[init.dispatchPropertyName]))&&!a.immutable$list&&b>>>0===b&&b<a.length)return a[b]=c
return J.at(a).j(a,b,c)}
J.iY=function(a,b,c){return J.k(a).iF(a,b,c)}
J.eJ=function(a){return J.aE(a).eN(a)}
J.iZ=function(a){return J.k(a).eO(a)}
J.bM=function(a,b){return J.at(a).l(a,b)}
J.j_=function(a,b,c,d){return J.k(a).iT(a,b,c,d)}
J.j0=function(a,b){return J.aL(a).iZ(a,b)}
J.j1=function(a,b,c){return J.k(a).S(a,b,c)}
J.dy=function(a,b,c){return J.k(a).bu(a,b,c)}
J.eK=function(a){return J.k(a).j4(a)}
J.j2=function(a,b,c){return J.k(a).eU(a,b,c)}
J.j3=function(a,b){return J.at(a).f_(a,b)}
J.j4=function(a,b,c,d,e){return J.k(a).f0(a,b,c,d,e)}
J.j5=function(a,b,c,d,e){return J.k(a).j7(a,b,c,d,e)}
J.eL=function(a){return J.k(a).c9(a)}
J.j6=function(a,b){return J.bm(a).aS(a,b)}
J.j7=function(a,b){return J.k(a).ad(a,b)}
J.eM=function(a,b){return J.G(a).B(a,b)}
J.cC=function(a,b,c){return J.G(a).f3(a,b,c)}
J.dz=function(a){return J.k(a).by(a)}
J.dA=function(a,b){return J.k(a).f6(a,b)}
J.j8=function(a){return J.k(a).f8(a)}
J.j9=function(a,b){return J.k(a).fa(a,b)}
J.eN=function(a,b,c,d,e){return J.k(a).fc(a,b,c,d,e)}
J.ja=function(a,b,c,d,e,f){return J.k(a).jx(a,b,c,d,e,f)}
J.cf=function(a,b){return J.at(a).w(a,b)}
J.dB=function(a,b){return J.k(a).fg(a,b)}
J.jb=function(a,b){return J.aL(a).jB(a,b)}
J.eO=function(a){return J.aE(a).aA(a)}
J.jc=function(a,b,c){return J.at(a).al(a,b,c)}
J.eP=function(a,b){return J.at(a).F(a,b)}
J.jd=function(a){return J.k(a).gia(a)}
J.eQ=function(a){return J.k(a).gj3(a)}
J.eR=function(a){return J.k(a).gay(a)}
J.dC=function(a){return J.k(a).gbw(a)}
J.eS=function(a){return J.aL(a).gj9(a)}
J.cD=function(a){return J.k(a).gM(a)}
J.je=function(a){return J.k(a).gf9(a)}
J.eT=function(a){return J.k(a).gfb(a)}
J.bN=function(a){return J.k(a).ga9(a)}
J.jf=function(a){return J.k(a).gjC(a)}
J.eU=function(a){return J.at(a).gv(a)}
J.a8=function(a){return J.t(a).gK(a)}
J.jg=function(a){return J.k(a).gbf(a)}
J.eV=function(a){return J.G(a).gE(a)}
J.eW=function(a){return J.G(a).gY(a)}
J.av=function(a){return J.at(a).gJ(a)}
J.jh=function(a){return J.k(a).gbF(a)}
J.a4=function(a){return J.G(a).gi(a)}
J.cE=function(a){return J.k(a).gk5(a)}
J.ji=function(a){return J.k(a).gaV(a)}
J.jj=function(a){return J.k(a).gC(a)}
J.eX=function(a){return J.k(a).gaW(a)}
J.jk=function(a){return J.k(a).gkg(a)}
J.jl=function(a){return J.k(a).gdv(a)}
J.cg=function(a){return J.k(a).gfz(a)}
J.ch=function(a){return J.k(a).gas(a)}
J.jm=function(a){return J.k(a).gdz(a)}
J.eY=function(a){return J.k(a).gbR(a)}
J.aw=function(a){return J.k(a).gX(a)}
J.jn=function(a){return J.k(a).gaD(a)}
J.jo=function(a){return J.k(a).gkA(a)}
J.cF=function(a){return J.k(a).gfU(a)}
J.bp=function(a){return J.k(a).gp(a)}
J.aB=function(a){return J.k(a).gA(a)}
J.cG=function(a){return J.k(a).gm(a)}
J.cH=function(a){return J.k(a).gn(a)}
J.cI=function(a){return J.k(a).gR(a)}
J.dD=function(a,b){return J.k(a).aB(a,b)}
J.jp=function(a,b){return J.k(a).dO(a,b)}
J.eZ=function(a,b){return J.k(a).dP(a,b)}
J.jq=function(a,b,c){return J.k(a).dT(a,b,c)}
J.f_=function(a,b,c){return J.k(a).k6(a,b,c)}
J.jr=function(a,b){return J.at(a).aL(a,b)}
J.f0=function(a,b,c){return J.k(a).ke(a,b,c)}
J.bO=function(a,b){return J.at(a).af(a,b)}
J.f1=function(a){return J.at(a).co(a)}
J.js=function(a,b,c,d){return J.k(a).kp(a,b,c,d)}
J.jt=function(a,b,c){return J.aL(a).kt(a,b,c)}
J.ju=function(a,b){return J.k(a).ku(a,b)}
J.dE=function(a){return J.k(a).kv(a)}
J.dF=function(a){return J.k(a).hi(a)}
J.aF=function(a,b){return J.k(a).ac(a,b)}
J.f2=function(a,b){return J.k(a).sbx(a,b)}
J.jv=function(a,b){return J.k(a).scf(a,b)}
J.jw=function(a,b){return J.k(a).saV(a,b)}
J.dG=function(a,b){return J.k(a).sk7(a,b)}
J.jx=function(a,b){return J.k(a).sds(a,b)}
J.jy=function(a,b){return J.k(a).sft(a,b)}
J.jz=function(a,b){return J.k(a).saW(a,b)}
J.jA=function(a,b){return J.k(a).shD(a,b)}
J.jB=function(a,b){return J.k(a).sp(a,b)}
J.ci=function(a,b){return J.k(a).sA(a,b)}
J.cJ=function(a,b,c,d){return J.k(a).hu(a,b,c,d)}
J.jC=function(a,b){return J.at(a).hz(a,b)}
J.f3=function(a,b){return J.aL(a).hB(a,b)}
J.jD=function(a,b){return J.aL(a).cF(a,b)}
J.cK=function(a){return J.k(a).hF(a)}
J.jE=function(a,b){return J.aL(a).bm(a,b)}
J.jF=function(a,b,c){return J.aL(a).b0(a,b,c)}
J.dH=function(a){return J.aE(a).kB(a)}
J.jG=function(a){return J.aL(a).kC(a)}
J.a5=function(a){return J.t(a).k(a)}
J.dI=function(a){return J.aL(a).fV(a)}
J.jH=function(a,b,c){return J.k(a).fW(a,b,c)}
J.jI=function(a,b,c){return J.k(a).fX(a,b,c)}
J.f4=function(a,b,c){return J.k(a).fY(a,b,c)}
J.jJ=function(a,b,c,d){return J.k(a).fZ(a,b,c,d)}
J.dJ=function(a,b){return J.k(a).h7(a,b)}
J.jK=function(a,b,c){return J.k(a).kF(a,b,c)}
J.jL=function(a,b,c,d,e){return J.k(a).ha(a,b,c,d,e)}
I.aM=function(a){a.immutable$list=Array
a.fixed$length=Array
return a}
var $=I.p
C.x=W.dM.prototype
C.y=W.k4.prototype
C.L=W.k5.prototype
C.r=W.kn.prototype
C.i=W.ku.prototype
C.M=W.dU.prototype
C.N=W.kH.prototype
C.O=W.l3.prototype
C.P=J.f.prototype
C.a=J.co.prototype
C.A=J.h_.prototype
C.c=J.h0.prototype
C.B=J.h1.prototype
C.b=J.cp.prototype
C.d=J.cq.prototype
C.W=J.cr.prototype
C.e=H.d4.prototype
C.o=H.mB.prototype
C.H=H.mD.prototype
C.I=J.mR.prototype
C.J=W.nP.prototype
C.v=W.o0.prototype
C.w=J.cv.prototype
C.p=W.ol.prototype
C.K=new P.mI()
C.q=new P.oC()
C.h=new P.p3()
C.f=new P.pp()
C.j=new Z.dQ(0,"DomainType.aabb")
C.n=new Z.dQ(1,"DomainType.sphere")
C.k=new Z.dQ(2,"DomainType.ellipsoid")
C.z=new P.aP(0)
C.Q=function(hooks) {
  if (typeof dartExperimentalFixupGetTag != "function") return hooks;
  hooks.getTag = dartExperimentalFixupGetTag(hooks.getTag);
}
C.R=function(hooks) {
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
C.C=function(hooks) { return hooks; }

C.S=function(getTagFallback) {
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
C.T=function() {
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
C.U=function(hooks) {
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
C.V=function(hooks) {
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
C.D=function getTagFallback(o) {
  var s = Object.prototype.toString.call(o);
  return s.substring(8, s.length - 1);
}
C.E=new P.mb(null,null)
C.X=new P.md(null)
C.Y=new P.me(null,null)
C.Z=new N.bX("ALL",0)
C.F=new N.bX("INFO",800)
C.a_=new N.bX("OFF",2000)
C.a0=new N.bX("SEVERE",1000)
C.a1=new N.bX("WARNING",900)
C.a2=new K.ml(",",'"','"',"\r\n",!1)
C.a3=H.v(I.aM(["*::class","*::dir","*::draggable","*::hidden","*::id","*::inert","*::itemprop","*::itemref","*::itemscope","*::lang","*::spellcheck","*::title","*::translate","A::accesskey","A::coords","A::hreflang","A::name","A::shape","A::tabindex","A::target","A::type","AREA::accesskey","AREA::alt","AREA::coords","AREA::nohref","AREA::shape","AREA::tabindex","AREA::target","AUDIO::controls","AUDIO::loop","AUDIO::mediagroup","AUDIO::muted","AUDIO::preload","BDO::dir","BODY::alink","BODY::bgcolor","BODY::link","BODY::text","BODY::vlink","BR::clear","BUTTON::accesskey","BUTTON::disabled","BUTTON::name","BUTTON::tabindex","BUTTON::type","BUTTON::value","CANVAS::height","CANVAS::width","CAPTION::align","COL::align","COL::char","COL::charoff","COL::span","COL::valign","COL::width","COLGROUP::align","COLGROUP::char","COLGROUP::charoff","COLGROUP::span","COLGROUP::valign","COLGROUP::width","COMMAND::checked","COMMAND::command","COMMAND::disabled","COMMAND::label","COMMAND::radiogroup","COMMAND::type","DATA::value","DEL::datetime","DETAILS::open","DIR::compact","DIV::align","DL::compact","FIELDSET::disabled","FONT::color","FONT::face","FONT::size","FORM::accept","FORM::autocomplete","FORM::enctype","FORM::method","FORM::name","FORM::novalidate","FORM::target","FRAME::name","H1::align","H2::align","H3::align","H4::align","H5::align","H6::align","HR::align","HR::noshade","HR::size","HR::width","HTML::version","IFRAME::align","IFRAME::frameborder","IFRAME::height","IFRAME::marginheight","IFRAME::marginwidth","IFRAME::width","IMG::align","IMG::alt","IMG::border","IMG::height","IMG::hspace","IMG::ismap","IMG::name","IMG::usemap","IMG::vspace","IMG::width","INPUT::accept","INPUT::accesskey","INPUT::align","INPUT::alt","INPUT::autocomplete","INPUT::autofocus","INPUT::checked","INPUT::disabled","INPUT::inputmode","INPUT::ismap","INPUT::list","INPUT::max","INPUT::maxlength","INPUT::min","INPUT::multiple","INPUT::name","INPUT::placeholder","INPUT::readonly","INPUT::required","INPUT::size","INPUT::step","INPUT::tabindex","INPUT::type","INPUT::usemap","INPUT::value","INS::datetime","KEYGEN::disabled","KEYGEN::keytype","KEYGEN::name","LABEL::accesskey","LABEL::for","LEGEND::accesskey","LEGEND::align","LI::type","LI::value","LINK::sizes","MAP::name","MENU::compact","MENU::label","MENU::type","METER::high","METER::low","METER::max","METER::min","METER::value","OBJECT::typemustmatch","OL::compact","OL::reversed","OL::start","OL::type","OPTGROUP::disabled","OPTGROUP::label","OPTION::disabled","OPTION::label","OPTION::selected","OPTION::value","OUTPUT::for","OUTPUT::name","P::align","PRE::width","PROGRESS::max","PROGRESS::min","PROGRESS::value","SELECT::autocomplete","SELECT::disabled","SELECT::multiple","SELECT::name","SELECT::required","SELECT::size","SELECT::tabindex","SOURCE::type","TABLE::align","TABLE::bgcolor","TABLE::border","TABLE::cellpadding","TABLE::cellspacing","TABLE::frame","TABLE::rules","TABLE::summary","TABLE::width","TBODY::align","TBODY::char","TBODY::charoff","TBODY::valign","TD::abbr","TD::align","TD::axis","TD::bgcolor","TD::char","TD::charoff","TD::colspan","TD::headers","TD::height","TD::nowrap","TD::rowspan","TD::scope","TD::valign","TD::width","TEXTAREA::accesskey","TEXTAREA::autocomplete","TEXTAREA::cols","TEXTAREA::disabled","TEXTAREA::inputmode","TEXTAREA::name","TEXTAREA::placeholder","TEXTAREA::readonly","TEXTAREA::required","TEXTAREA::rows","TEXTAREA::tabindex","TEXTAREA::wrap","TFOOT::align","TFOOT::char","TFOOT::charoff","TFOOT::valign","TH::abbr","TH::align","TH::axis","TH::bgcolor","TH::char","TH::charoff","TH::colspan","TH::headers","TH::height","TH::nowrap","TH::rowspan","TH::scope","TH::valign","TH::width","THEAD::align","THEAD::char","THEAD::charoff","THEAD::valign","TR::align","TR::bgcolor","TR::char","TR::charoff","TR::valign","TRACK::default","TRACK::kind","TRACK::label","TRACK::srclang","UL::compact","UL::type","VIDEO::controls","VIDEO::height","VIDEO::loop","VIDEO::mediagroup","VIDEO::muted","VIDEO::preload","VIDEO::width"]),[P.p])
C.G=I.aM([C.j,C.n,C.k])
C.a5=I.aM(["HEAD","AREA","BASE","BASEFONT","BR","COL","COLGROUP","EMBED","FRAME","FRAMESET","HR","IMAGE","IMG","INPUT","ISINDEX","LINK","META","PARAM","SOURCE","STYLE","TITLE","WBR"])
C.l=I.aM([])
C.t=H.v(I.aM(["bind","if","ref","repeat","syntax"]),[P.p])
C.u=H.v(I.aM(["A::href","AREA::href","BLOCKQUOTE::cite","BODY::background","COMMAND::icon","DEL::cite","FORM::action","IMG::src","INPUT::src","INS::cite","Q::cite","VIDEO::poster"]),[P.p])
C.a4=I.aM(["Label","Type","Center","Semi-axes","Enter","Leave","Stick on enter","Stick on leave"])
C.a7=new H.fh(8,{Label:"",Type:"Ellipsoid",Center:null,"Semi-axes":null,Enter:C.l,Leave:C.l,"Stick on enter":C.l,"Stick on leave":C.l},C.a4,[null,null])
C.a6=I.aM(["inside","sticked","outside"])
C.m=new H.fh(3,{inside:0,sticked:1,outside:2},C.a6,[null,null])
$.fX=null
$.c1=1
$.ho="$cachedFunction"
$.hp="$cachedInvocation"
$.ct=null
$.b9=null
$.aG=0
$.bQ=null
$.fb=null
$.eF=null
$.iA=null
$.iO=null
$.dn=null
$.du=null
$.eG=null
$.bF=null
$.c9=null
$.ca=null
$.eA=!1
$.r=C.f
$.fG=0
$.aW=null
$.aQ=null
$.dS=null
$.fy=null
$.fx=null
$.fr=null
$.fq=null
$.fp=null
$.fs=null
$.fo=null
$.ei=!0
$.dt=!1
$.ra=C.a_
$.iv=C.F
$.h8=0
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
I.$lazy(y,x,w)}})(["fm","$get$fm",function(){return H.iF("_$dart_dartClosure")},"e1","$get$e1",function(){return H.iF("_$dart_js")},"e_","$get$e_",function(){return H.lR()},"e0","$get$e0",function(){if(typeof WeakMap=="function")var z=new WeakMap()
else{z=$.fG
$.fG=z+1
z="expando$key$"+z}return new P.kG(null,z)},"hK","$get$hK",function(){return H.aI(H.db({
toString:function(){return"$receiver$"}}))},"hL","$get$hL",function(){return H.aI(H.db({$method$:null,
toString:function(){return"$receiver$"}}))},"hM","$get$hM",function(){return H.aI(H.db(null))},"hN","$get$hN",function(){return H.aI(function(){var $argumentsExpr$='$arguments$'
try{null.$method$($argumentsExpr$)}catch(z){return z.message}}())},"hR","$get$hR",function(){return H.aI(H.db(void 0))},"hS","$get$hS",function(){return H.aI(function(){var $argumentsExpr$='$arguments$'
try{(void 0).$method$($argumentsExpr$)}catch(z){return z.message}}())},"hP","$get$hP",function(){return H.aI(H.hQ(null))},"hO","$get$hO",function(){return H.aI(function(){try{null.$method$}catch(z){return z.message}}())},"hU","$get$hU",function(){return H.aI(H.hQ(void 0))},"hT","$get$hT",function(){return H.aI(function(){try{(void 0).$method$}catch(z){return z.message}}())},"eq","$get$eq",function(){return P.op()},"b2","$get$b2",function(){return P.oO(null,P.d7)},"cc","$get$cc",function(){return[]},"fl","$get$fl",function(){return{}},"ic","$get$ic",function(){return P.h7(["A","ABBR","ACRONYM","ADDRESS","AREA","ARTICLE","ASIDE","AUDIO","B","BDI","BDO","BIG","BLOCKQUOTE","BR","BUTTON","CANVAS","CAPTION","CENTER","CITE","CODE","COL","COLGROUP","COMMAND","DATA","DATALIST","DD","DEL","DETAILS","DFN","DIR","DIV","DL","DT","EM","FIELDSET","FIGCAPTION","FIGURE","FONT","FOOTER","FORM","H1","H2","H3","H4","H5","H6","HEADER","HGROUP","HR","I","IFRAME","IMG","INPUT","INS","KBD","LABEL","LEGEND","LI","MAP","MARK","MENU","METER","NAV","NOBR","OL","OPTGROUP","OPTION","OUTPUT","P","PRE","PROGRESS","Q","S","SAMP","SECTION","SELECT","SMALL","SOURCE","SPAN","STRIKE","STRONG","SUB","SUMMARY","SUP","TABLE","TBODY","TD","TEXTAREA","TFOOT","TH","THEAD","TIME","TR","TRACK","TT","U","UL","VAR","VIDEO","WBR"],null)},"et","$get$et",function(){return P.cX()},"fj","$get$fj",function(){return P.eg("^\\S+$",!0,!1)},"bE","$get$bE",function(){return N.b6("bromium.logging.GroupLogger")},"cb","$get$cb",function(){return P.n0(null)},"dW","$get$dW",function(){var z,y,x,w,v,u,t,s,r
z=T.bh(0,0,0)
y=T.bh(0,1,0)
x=T.bh(1,1,0)
w=T.bh(1,0,0)
v=T.bh(0,0,1)
u=T.bh(0,1,1)
t=T.bh(1,1,1)
s=T.bh(1,0,1)
r=new B.hY(3,0,3,8,H.mC(24))
r.bn([z,y,x,w,v,u,t,s],3,0,0)
return r},"fM","$get$fM",function(){return H.hf([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7])},"fL","$get$fL",function(){return H.hf([0,2,1,0,3,2,4,5,6,4,6,7,0,1,5,0,5,4,1,2,6,1,6,5,2,3,7,2,7,6,3,0,4,3,4,7])},"cZ","$get$cZ",function(){return N.b6("")},"h9","$get$h9",function(){return P.h5(P.p,N.e7)},"ff","$get$ff",function(){return P.eg("\\#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})(?:([0-9a-f]{2}))?",!1,!1)},"fg","$get$fg",function(){return P.eg("\\#?([0-9a-f])([0-9a-f])([0-9a-f])(?:([0-9a-f]))?",!1,!1)}])
I=I.$finishIsolateConstructor(I)
$=new I()
init.metadata=[]
init.types=[{func:1,args:[,]},{func:1},{func:1,v:true},{func:1,args:[P.m]},{func:1,args:[,,]},{func:1,args:[P.p]},{func:1,args:[W.ay]},{func:1,v:true,args:[{func:1,v:true}]},{func:1,v:true,args:[P.e],opt:[P.bu]},{func:1,ret:W.y},{func:1,args:[,P.bu]},{func:1,ret:P.p,args:[P.m]},{func:1,args:[P.aq]},{func:1,args:[W.a2]},{func:1,args:[P.m,[P.c,P.m]]},{func:1,ret:P.aD,args:[W.a9,P.p,P.p,W.es]},{func:1,v:true,args:[,P.bu]},{func:1,args:[,P.p]},{func:1,args:[P.m,,]},{func:1,args:[{func:1,v:true}]},{func:1,v:true,args:[W.y,W.y]},{func:1,args:[P.p,,]},{func:1,v:true,opt:[P.e]},{func:1,ret:P.dY,args:[P.p]},{func:1,ret:P.e,opt:[P.e]},{func:1,v:true,args:[G.d2]},{func:1,args:[[S.a3,P.m,P.K],[S.a3,P.m,P.K]]},{func:1,args:[G.bq,G.bq]},{func:1,args:[P.bv,,]},{func:1,ret:P.ah},{func:1,args:[,],opt:[,]},{func:1,args:[W.cw]},{func:1,ret:P.m,args:[P.m,P.m]},{func:1,args:[N.cY]},{func:1,ret:P.ah,args:[,]},{func:1,ret:P.aq},{func:1,args:[P.aD]},{func:1,v:true,args:[P.e]},{func:1,ret:P.p,args:[W.z]},{func:1,v:true,args:[N.dZ]},{func:1,args:[P.p,P.m]}]
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
if(x==y)H.rh(d||a)
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
Isolate.aM=a.aM
Isolate.ae=a.ae
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
if(typeof dartMainRunner==="function")dartMainRunner(function(b){H.iS(E.iH(),b)},[])
else (function(b){H.iS(E.iH(),b)})([])})})()