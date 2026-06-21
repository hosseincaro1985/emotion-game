/* ===== STORAGE KEYS ===== */
var SESSION_KEY = 'je_engine_state';
var ALL_SESSIONS_KEY = 'je_sessions_list';
var RECORDINGS_KEY = 'je_recordings';
var ADMIN_PASS_KEY = 'je_admin_pass';

/* ===== STATE ===== */
var answersStore = {};
var childInfo = {name:"", age:"", grade:""};
var sessionInfo = {startTime:null, endTime:null};

/* ===== PERSIAN NUMBERS ===== */
function toPersianNum(n){
  var d=['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
  return String(n).replace(/\d/g,function(c){return d[c];});
}

/* ===== TIME FORMAT ===== */
function formatT(s){
  var m=Math.floor(s/60);
  var sec=Math.floor(s%60);
  return m+':'+(sec<10?'0':'')+sec;
}

/* ===== TIMESTAMP ===== */
function getTimestamp(){
  return new Date().toISOString();
}

function formatTimestamp(isoStr){
  if(!isoStr) return '---';
  try{
    var d=new Date(isoStr);
    var hours=toPersianNum(d.getHours()<10?'0'+d.getHours():d.getHours());
    var mins=toPersianNum(d.getMinutes()<10?'0'+d.getMinutes():d.getMinutes());
    var year=toPersianNum(d.getFullYear());
    var month=toPersianNum(d.getMonth()+1<10?'0'+(d.getMonth()+1):d.getMonth()+1);
    var day=toPersianNum(d.getDate()<10?'0'+d.getDate():d.getDate());
    return year+'/'+month+'/'+day+'  '+hours+':'+mins;
  }catch(e){return isoStr;}
}

/* ===== SESSION HELPERS ===== */
function setSessionStart(){
  if(!sessionInfo.startTime) sessionInfo.startTime=getTimestamp();
  sessionInfo.endTime=null;
}

function setSessionEnd(){
  if(!sessionInfo.endTime) sessionInfo.endTime=getTimestamp();
}

function getSessionDuration(){
  if(!sessionInfo.startTime) return null;
  var start=new Date(sessionInfo.startTime).getTime();
  var end=sessionInfo.endTime?new Date(sessionInfo.endTime).getTime():new Date().getTime();
  var diff=Math.floor((end-start)/1000);
  var mins=Math.floor(diff/60);
  var secs=diff%60;
  return toPersianNum(mins)+' دقیقه و '+toPersianNum(secs)+' ثانیه';
}

/* ===== MULTI-SESSION STORAGE ===== */
function getAllSessions(){
  try{
    var raw=localStorage.getItem(ALL_SESSIONS_KEY);
    return raw?JSON.parse(raw):[];
  }catch(e){return[];}
}

function saveSessionToList(sessionData){
  var sessions=getAllSessions();
  var found=false;
  for(var i=0;i<sessions.length;i++){
    if(sessions[i].session&&sessions[i].session.startTime===sessionData.session.startTime){
      sessions[i]=sessionData;
      found=true;
      break;
    }
  }
  if(!found) sessions.push(sessionData);
  try{localStorage.setItem(ALL_SESSIONS_KEY,JSON.stringify(sessions));}catch(e){}
}

function deleteSessionFromList(startTime){
  var sessions=getAllSessions();
  sessions=sessions.filter(function(s){
    return!(s.session&&s.session.startTime===startTime);
  });
  try{localStorage.setItem(ALL_SESSIONS_KEY,JSON.stringify(sessions));}catch(e){}
}

/* ===== RECORDINGS STORAGE ===== */
function saveRecordingToStore(recId,base64Data){
  var recs=getAllRecordings();
  recs[recId]=base64Data;
  try{localStorage.setItem(RECORDINGS_KEY,JSON.stringify(recs));}catch(e){}
}

function getAllRecordings(){
  try{return JSON.parse(localStorage.getItem(RECORDINGS_KEY)||'{}');}catch(e){return{};}
}

function getRecordingForStory(storyId,sessionId){
  var recs=getAllRecordings();
  var key1='story_'+storyId+'_'+(sessionId||'');
  var key2='story_'+storyId;
  return recs[key1]||recs[key2]||null;
}

/* ===== ADMIN AUTH ===== */
function getAdminPass(){
  var p=localStorage.getItem(ADMIN_PASS_KEY);
  return p||'admin123';
}

function setAdminPass(newPass){
  localStorage.setItem(ADMIN_PASS_KEY,newPass);
}

/* ===== GET STATION FOR STORY ===== */
function getStationForStory(storyId){
  var story=getStory(storyId);
  if(story&&story.station) return story.station;
  for(var i=0;i<CONTENT.slides.length;i++){
    var sl=CONTENT.slides[i];
    if(sl.type==='story'&&sl.storyId===storyId&&sl.station) return sl.station;
  }
  return null;
}

/* ===== GET STORY TYPE LABEL ===== */
function getStoryTypeLabel(storyId){
  var story=getStory(storyId);
  if(!story||!story.question) return '';
  if(story.question.type==='descriptive') return 'تشریحی';
  if(story.question.type==='single-choice') return 'تک‌انتخابی';
  if(story.question.type==='multi-choice') return 'چندانتخابی';
  return story.question.type;
}

/* ===== ENRICH ANSWER ===== */
function enrichAnswer(storyId,data){
  var station=getStationForStory(storyId);
  var storyType=getStoryTypeLabel(storyId);
  data.station=station;
  data.type=storyType;
  data.timestamp=getTimestamp();
  return data;
}

/* ===== TOAST ===== */
function showToastMsg(msg,type){
  var el=document.getElementById(type==='success'?'valSuccess':'valError');
  if(!el) return;
  el.textContent=msg;
  el.classList.add('show');
  setTimeout(function(){el.classList.remove('show');},3000);
}

/* ===== DATA LOOKUPS ===== */
function getStory(id){
  for(var i=0;i<CONTENT.stories.length;i++){
    if(CONTENT.stories[i].id===id) return CONTENT.stories[i];
  }
  return null;
}

function getDialogue(ref){
  return CONTENT.dialogues[ref]||null;
}

function getStation(num){
  for(var i=0;i<CONTENT.stations.length;i++){
    if(CONTENT.stations[i].number===num) return CONTENT.stations[i];
  }
  return null;
}

function getEmotionById(id){
  if(!id) return null;
  for(var i=0;i<CONTENT.emotions.length;i++){
    if(CONTENT.emotions[i].id===id||CONTENT.emotions[i].name===id) return CONTENT.emotions[i];
  }
  return null;
}

/* ===== FORM HELPERS ===== */
function clearFieldErr(name){
  var el=document.getElementById('field_'+name);
  var err=document.getElementById('err_'+name);
  if(el) el.classList.remove('error');
  if(err) err.classList.remove('visible');
}

/* ===== WORD COUNT ===== */
function countWords(text){
  if(!text||!text.trim()) return 0;
  return text.trim().split(/\s+/).filter(function(w){return w.length>0;}).length;
}

function updateWordCount(storyId){
  var ta=document.getElementById('textarea_'+storyId);
  var wc=document.getElementById('wc_'+storyId);
  if(!ta||!wc) return;

  var story=getStory(storyId);
  var maxWords=(story&&story.question&&story.question.maxWords)?story.question.maxWords:null;
  var count=countWords(ta.value);

  var wcContainer=wc.closest('.word-count');
  var warningEl=document.getElementById('wcWarning_'+storyId);
  var okEl=document.getElementById('wcOk_'+storyId);
  var limitBadge=document.querySelector('#qb_'+storyId);

  if(maxWords){
    wc.textContent=toPersianNum(count)+' از '+toPersianNum(maxWords);
    if(wcContainer){wcContainer.classList.remove('at-limit','over-limit');}
    if(warningEl){warningEl.classList.remove('visible');warningEl.textContent='';}
    if(okEl){okEl.classList.remove('visible');okEl.textContent='';}
    if(limitBadge){limitBadge.classList.remove('limit-reached');}

    if(count>maxWords){
      if(wcContainer) wcContainer.classList.add('over-limit');
      if(warningEl){warningEl.textContent='⚠️ بیشتر از '+toPersianNum(maxWords)+' کلمه نوشتی!';warningEl.classList.add('visible');}
      if(limitBadge) limitBadge.classList.add('limit-reached');
    }else if(count===maxWords&&count>0){
      if(wcContainer) wcContainer.classList.add('at-limit');
      if(okEl){okEl.textContent='✅ عالیه! به حد مجاز رسیدی';okEl.classList.add('visible');}
      if(limitBadge) limitBadge.classList.add('limit-reached');
    }else if(count>0){
      if(okEl){okEl.textContent='✏️ '+toPersianNum(maxWords-count)+' کلمه دیگه می‌تونی بنویسی';okEl.classList.add('visible');}
    }
  }else{
    wc.textContent=toPersianNum(count);
  }
  ta.classList.remove('error');
}

function isWordCountValid(storyId){
  var ta=document.getElementById('textarea_'+storyId);
  if(!ta) return true;
  var text=ta.value.trim();
  if(!text) return false;
  var story=getStory(storyId);
  var maxWords=(story&&story.question&&story.question.maxWords)?story.question.maxWords:null;
  if(!maxWords) return true;
  return countWords(text)<=maxWords;
}