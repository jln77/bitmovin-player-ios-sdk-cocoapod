function trySetReady(){isJsLoaded&&uiManager&&isCssLoaded&&app.postEvent("uiReady")}function getUiManagerEvents(){return uiManager&&uiManager.hasOwnProperty("currentUi")&&uiManager.currentUi.hasOwnProperty("events")?uiManager.currentUi.events:null}function onUIControlsHide(){app.postEvent("controlsHide")}function onUIControlsShow(){app.postEvent("controlsShow")}function releaseUi(){if(eventCallbacks={},uiManager){var e=getUiManagerEvents();e&&e.hasOwnProperty("onControlsShow")&&e.hasOwnProperty("onControlsHide")&&(e.onControlsShow.unsubscribe(onUIControlsShow),e.onControlsHide.unsubscribe(onUIControlsHide)),uiManager.release()}}function reinitializeUiManager(){releaseUi(),uiManager=bitmovin.playerui.UIManager.Factory.buildDefaultSmallScreenUI(player);var e=getUiManagerEvents();e&&e.hasOwnProperty("onControlsShow")&&e.hasOwnProperty("onControlsHide")&&(e.onControlsShow.subscribe(onUIControlsShow),e.onControlsHide.subscribe(onUIControlsHide)),addCustomEventHandler()}function showFullScreenButtons(e){var t=document.getElementsByClassName("bmpui-ui-fullscreentogglebutton"),n="none";for(e&&(n="block"),i=0;i<t.length;i++)t.item(i).style.display=n}function addCustomEventHandler(){player.addEventHandler("onFullscreenEnabled",onFullscreenEnabled),player.addEventHandler("onFullscreenDisabled",onFullscreenDisabled)}function onFullscreenEnabled(){showFullScreenButtons(!0)}function onFullscreenDisabled(){showFullScreenButtons(!1)}function finishedLoadingJs(){isJsLoaded=!0,reinitializeUiManager(),trySetReady()}function finishedLoadingCss(){isCssLoaded=!0,document.getElementsByTagName("body").item(0).style.visibility="visible",trySetReady()}function setUiJs(e){var t=document.getElementById("uijs");t&&e===t.src||(isJsLoaded=!1,releaseUi(),t&&t.parentElement.removeChild(t),(t=document.createElement("script")).setAttribute("id","uijs"),t.type="text/javascript",document.getElementsByTagName("head").item(0).appendChild(t),t.addEventListener("load",finishedLoadingJs),t.src=e)}function setUiCss(e,t){var n=0,i=0;isCssLoaded=!1,e&&(n++,setCssFile(e,"uicss",function(){i++})),n++,setCssFile(t,"supplementaluicss",function(){i++});var a=setInterval(function(){n===i&&(clearInterval(a),finishedLoadingCss())},10)}function setCssFile(e,t,n){var i=document.getElementById(t);if(i){var a=i.getAttribute("href");if(e!==a)if(document.getElementsByTagName("body").item(0).style.visibility="hidden",i.setAttribute("href",e),e)var o=setInterval(function(){for(var t=!1,i=0;i<document.styleSheets.length;i++)if(document.styleSheets[i].href===e){t=!0;break}t&&(clearInterval(o),n())},10);else n();else n()}else n()}function getParameterByName(e,t){t||(t=window.location.href),e=e.replace(/[\[\]]/g,"\\$&");var n=new RegExp("[?&]"+e+"(=([^&#]*)|&|#|$)").exec(t);return n?n[2]?decodeURIComponent(n[2].replace(/\+/g," ")):"":null}var isCssLoaded=!1,isJsLoaded=!1,uiCss=getParameterByName("uicss"),supplementalUICSS=getParameterByName("supplementaluicss");setUiCss(uiCss,supplementalUICSS);var uiJs=getParameterByName("uijs");setUiJs(uiJs);var resizeTimer;window.addEventListener("resize",function(){clearTimeout(resizeTimer),resizeTimer=setTimeout(function(){var e={width:window.innerWidth+"px",height:window.innerHeight+"px"};eventCallbacks.hasOwnProperty("onPlayerResize")&&eventCallbacks.onPlayerResize.forEach(function(t){t(e)})},100)});var eventCallbacks={},fireEvent=function(e,t){if(eventCallbacks.hasOwnProperty(e)){t=decodeURIComponent(t);var n=JSON.parse(t);eventCallbacks[e].forEach(function(e){e(n)})}},app={duration:0,currentTime:0,maxTimeShift:0,timeShift:0,isPlaying:!1,isPaused:!1,isLive:!1,isCastAvailable:!1,isCasting:!1,isReady:!1,isMuted:!1,config:{key:"",source:{},playback:{},style:{},cast:{},logs:{},events:{}},availableSubtitlesById:{},availableAudio:[],audio:null,subtitle:null,playbackSpeed:1,isFullscreen:!1,volume:100,postEvent:function(e,t){void 0===t&&(t={});var n=Object.assign({event:e},t);window.webkit.messageHandlers.ios.postMessage(n)},resetStateWhenSourceUnloaded:function(){app.duration=0,app.currentTime=0,app.maxTimeShift=0,app.timeShift=0,app.isPlaying=!1,app.isPaused=!1,app.isReady=!1,app.availableSubtitlesById={},app.availableAudio=[],app.audio=null,app.subtitle=null}},getAvailableSubtitlesArray=function(){var e=Object.keys(app.availableSubtitlesById).map(function(e){return app.availableSubtitlesById[e]});return e.length>0&&e.unshift({id:"off",url:null,lang:null,label:"off"}),e},uiManager,player={EVENT:bitmovin.player.EVENT,addEventHandler:function(e,t){eventCallbacks.hasOwnProperty(e)||(eventCallbacks[e]=[]),eventCallbacks[e].push(t)},addMetadata:function(e,t){},addSubtitle:function(e){},castStop:function(){app.postEvent("castStop")},castVideo:function(){app.postEvent("castVideo")},clearQueryParameters:function(){},destroy:function(){},enterFullscreen:function(){app.postEvent("enterFullscreen")},exitFullscreen:function(){app.postEvent("exitFullscreen")},getAudio:function(){return app.audio},getAudioBufferLength:function(){},getAvailableAudio:function(){return app.availableAudio},getAvailableAudioQualities:function(){return[]},getAvailableImpressionServers:function(){},getAvailableLicenseServers:function(){},getAvailableSubtitles:function(){return getAvailableSubtitlesArray()},getAvailableVideoQualities:function(){return[]},getConfig:function(e){return app.config},getCurrentTime:function(){return app.currentTime},getDownloadedAudioData:function(){return{isAuto:!0}},getDownloadedVideoData:function(){return{isAuto:!0}},getDroppedFrames:function(){},getDuration:function(){return app.duration},getFigure:function(){return document.getElementById("ui-container")},getManifest:function(){},getMaxTimeShift:function(){return app.maxTimeShift},getPlaybackAudioData:function(){},getPlaybackSpeed:function(){return app.playbackSpeed},getPlaybackVideoData:function(){},getPlayerType:function(){},getSnapshot:function(e,t){},getStreamType:function(){},getSubtitle:function(){return app.subtitle},getSupportedDRM:function(){},getSupportedTech:function(){},getThumb:function(e){},getTimeShift:function(){return app.timeShift},getTotalStalledTime:function(){},getVersion:function(){},getVideoBufferLength:function(){},getVolume:function(){return app.volume},getVRStatus:function(){},hasEnded:function(){},isAd:function(){},isCastAvailable:function(){return app.isCastAvailable},isCasting:function(){return app.isCasting},isDRMSupported:function(e){},isFullscreen:function(){return app.isFullscreen},isLive:function(){return app.isLive},isMuted:function(){return app.isMuted},isPaused:function(){return app.isPaused},isPlaying:function(){return app.isPlaying},isReady:function(){return app.isReady},isSetup:function(){return!0},isStalled:function(){},load:function(e,t,n){},mute:function(){app.postEvent("mute")},pause:function(e){app.postEvent("pause")},play:function(e){app.postEvent("play")},removeEventHandler:function(e,t){eventCallbacks.hasOwnProperty(e)&&(eventCallbacks[e]=eventCallbacks[e].filter(function(e){return e!=t}))},removeSubtitle:function(e){},scheduleAd:function(e,t,n){},seek:function(e){app.currentTime=e,app.postEvent("seek",{time:e})},setAudio:function(e){app.audio&&e===app.audio.id||app.postEvent("setAudio",{trackID:e})},setAudioQuality:function(e){},setAuthentication:function(e){},setLastSegment:function(e){},setPlaybackSpeed:function(e){isFinite(e)&&((e=Number(e))<=0||(app.playbackSpeed=e,app.postEvent("setPlaybackSpeed",{speed:e})))},setPosterImage:function(e,t){},setQueryParameters:function(e){},setSkin:function(e){},setSubtitle:function(e){app.subtitle&&e===app.subtitle.id||app.postEvent("setSubtitle",{trackID:e})},setup:function(e,t){},setVideoElement:function(e){},setVideoQuality:function(e){},setVolume:function(e){},setVRStereo:function(e){},skipAd:function(){},timeShift:function(e){app.timeShift=e,app.postEvent("timeShift",{offset:e})},unload:function(){},unmute:function(){app.postEvent("unmute")}};