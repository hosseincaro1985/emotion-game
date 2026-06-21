/* ===== TTS CORE ===== */
var _currentSpeechText='';
var _currentSpeechSequence=[];
var _speechCancelled=false;

function speakSequence(texts,callback){
  if(!texts||!texts.length){if(callback)callback();return;}
  _currentSpeechSequence=texts.slice();
  _speechCancelled=false;
  _speakChain(texts.slice(),callback);
}

function _speakChain(texts,callback){
  if(_speechCancelled){if(callback)callback();return;}
  if(!texts||!texts.length){if(callback)callback();return;}

  var clean=texts[0].replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
  var rest=texts.slice(1);

  if(!clean){_speakChain(rest,callback);return;}

  _currentSpeechText=clean;
  _speakLongText(clean,function(){_speakChain(rest,callback);});
}

function _speakLongText(text,callback){
  var sentences=text.split(/(?<=[.!؟])\s+/).filter(function(s){return s.trim().length>0;});
  if(sentences.length===0){if(callback)callback();return;}
  _speakSentenceChain(sentences,0,callback);
}

function _speakSentenceChain(sentences,index,callback){
  if(_speechCancelled){if(callback)callback();return;}
  if(index>=sentences.length){if(callback)callback();return;}

  var clean=sentences[index].trim();
  if(!clean){_speakSentenceChain(sentences,index+1,callback);return;}

  try{
    var u=new SpeechSynthesisUtterance(clean);
    u.lang='fa-IR';
    u.rate=0.9;
    u.pitch=1.1;
    u.volume=1;
    u.onend=function(){
      setTimeout(function(){_speakSentenceChain(sentences,index+1,callback);},180);
    };
    u.onerror=function(){
      setTimeout(function(){_speakSentenceChain(sentences,index+1,callback);},180);
    };
    window.speechSynthesis.speak(u);
  }catch(e){
    if(callback)callback();
  }
}

function speakText(text){
  if(!text)return;
  stopSpeech();
  _currentSpeechText=text.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
  _currentSpeechSequence=[text];
  _speechCancelled=false;
  _speakLongText(_currentSpeechText);
}
function stopSpeech(){
  if(window.speechSynthesis){
    window.speechSynthesis.cancel();
  }
}
function repeatSpeech(){
  if(_currentSpeechSequence.length){
    stopSpeech();
    setTimeout(function(){speakSequence(_currentSpeechSequence);},200);
  }
}

function stopSpeech(){
  _speechCancelled=true;
  try{window.speechSynthesis.cancel();}catch(e){}
}

/* ===== STATION INTRO RECORDING ===== */
var _recs={};

function toggleRec(slideNumber){
  if(_recs[slideNumber]&&_recs[slideNumber].recorder&&_recs[slideNumber].recorder.state==='recording'){
    _recs[slideNumber].recorder.stop();return;
  }
  if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){
    showToastMsg('مرورگر از ضبط صدا پشتیبانی نمی‌کند','error');return;
  }
  navigator.mediaDevices.getUserMedia({audio:true}).then(function(stream){
    var recorder=new MediaRecorder(stream);var chunks=[];
    recorder.ondataavailable=function(e){if(e.data&&e.data.size>0)chunks.push(e.data);};
    recorder.onstop=function(){
      stream.getTracks().forEach(function(t){t.stop();});
      if(chunks.length>0){
        var blob=new Blob(chunks,{type:'audio/webm'});
        var reader=new FileReader();
        reader.onload=function(){saveRecordingToStore('intro_'+slideNumber,reader.result);};
        reader.readAsDataURL(blob);
      }
      _setRecUI(slideNumber,'done');
      if(_recs[slideNumber]&&_recs[slideNumber].interval)clearInterval(_recs[slideNumber].interval);
    };
    recorder.start(100);
    _recs[slideNumber]={recorder:recorder,chunks:chunks,startTime:Date.now(),interval:null};
    _setRecUI(slideNumber,'recording');
    var timerEl=document.getElementById('recTimer_'+slideNumber);var startTime=Date.now();
    _recs[slideNumber].interval=setInterval(function(){
      if(timerEl)timerEl.textContent=formatT(Math.floor((Date.now()-startTime)/1000));
    },500);
  }).catch(function(){showToastMsg('دسترسی به میکروفون رد شد 🎙️','error');});
}

function resetRec(slideNumber){
  if(_recs[slideNumber]){
    if(_recs[slideNumber].recorder&&_recs[slideNumber].recorder.state==='recording')_recs[slideNumber].recorder.stop();
    if(_recs[slideNumber].interval)clearInterval(_recs[slideNumber].interval);
    delete _recs[slideNumber];
  }
  _setRecUI(slideNumber,'idle');
}

function _setRecUI(n,state){
  var btn=document.getElementById('recBtn_'+n);
  var timer=document.getElementById('recTimer_'+n);
  var status=document.getElementById('recStatus_'+n);
  var done=document.getElementById('recDone_'+n);
  var wave=document.getElementById('waveMini_'+n);
  var stopIcon=btn?btn.querySelector('.stop-icon'):null;
  var micSvg=btn?btn.querySelector('svg'):null;
  if(state==='recording'){
    if(btn)btn.classList.add('recording');if(timer){timer.classList.add('visible');timer.textContent='0:00';}
    if(status){status.classList.add('active');status.textContent='در حال ضبط...';}
    if(wave)wave.classList.add('visible');if(stopIcon)stopIcon.style.display='';if(micSvg)micSvg.style.display='none';
    if(done)done.classList.remove('visible');
  }else if(state==='done'){
    if(btn)btn.classList.remove('recording');if(timer)timer.classList.remove('visible');
    if(status){status.classList.remove('active');status.textContent='ضبط شد!';}
    if(wave)wave.classList.remove('visible');if(stopIcon)stopIcon.style.display='none';if(micSvg)micSvg.style.display='';
    if(done)done.classList.add('visible');
  }else{
  if(btn)btn.classList.remove('recording');

  if(timer){
    timer.classList.remove('visible');
    timer.textContent='0:00';
  }

  if(status){
    status.classList.remove('active');
    status.textContent='ضبط پاسخ صوتی (اختیاری)';
  }

  if(wave) wave.classList.remove('visible');
if(stopIcon) stopIcon.style.display='none';
if(micSvg) micSvg.style.display='';
  if(done)done.classList.remove('visible');
}
}

/* ===== QUESTION RECORDING ===== */
var _qRecs={};

function toggleQRec(storyId){
  if(_qRecs[storyId]&&_qRecs[storyId].recorder&&_qRecs[storyId].recorder.state==='recording'){
    _qRecs[storyId].recorder.stop();return;
  }
  if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){
    showToastMsg('مرورگر از ضبط صدا پشتیبانی نمی‌کند','error');return;
  }
  navigator.mediaDevices.getUserMedia({audio:true}).then(function(stream){
    var recorder=new MediaRecorder(stream);var chunks=[];
    recorder.ondataavailable=function(e){if(e.data&&e.data.size>0)chunks.push(e.data);};
    recorder.onstop=function(){
      stream.getTracks().forEach(function(t){t.stop();});
      if(chunks.length>0){
        var blob=new Blob(chunks,{type:'audio/webm'});
        var reader=new FileReader();
        reader.onload=function(){saveRecordingToStore('story_'+storyId,reader.result);};
        reader.readAsDataURL(blob);
      }
      _setQRecUI(storyId,'done');
      if(_qRecs[storyId]&&_qRecs[storyId].interval)clearInterval(_qRecs[storyId].interval);
    };
    recorder.start(100);
    _qRecs[storyId]={recorder:recorder,chunks:chunks,startTime:Date.now(),interval:null};
    _setQRecUI(storyId,'recording');
    var timerEl=document.getElementById('qTimer_'+storyId);var startTime=Date.now();
    _qRecs[storyId].interval=setInterval(function(){
      if(timerEl)timerEl.textContent=formatT(Math.floor((Date.now()-startTime)/1000));
    },500);
  }).catch(function(){showToastMsg('دسترسی به میکروفون رد شد 🎙️','error');});
}

function resetQRec(storyId){
  if(_qRecs[storyId]){
    if(_qRecs[storyId].recorder&&_qRecs[storyId].recorder.state==='recording')_qRecs[storyId].recorder.stop();
    if(_qRecs[storyId].interval)clearInterval(_qRecs[storyId].interval);
    delete _qRecs[storyId];
  }
  _setQRecUI(storyId,'idle');
}

function _setQRecUI(sid,state){
  var btn=document.getElementById('qRecBtn_'+sid);
  var timer=document.getElementById('qTimer_'+sid);
  var status=document.getElementById('qStatus_'+sid);
  var done=document.getElementById('qDone_'+sid);
  var wave=document.getElementById('qWave_'+sid);
  var stopIcon=btn?btn.querySelector('.stop-icon'):null;
  var micSvg=btn?btn.querySelector('svg'):null;

  if(state==='recording'){
    if(btn)btn.classList.add('recording');
    if(timer){
      timer.classList.add('visible');
      timer.textContent='0:00';
    }
    if(status){
      status.classList.add('active');
      status.textContent='در حال ضبط...';
    }
    if(wave)wave.classList.add('visible');
    if(stopIcon)stopIcon.style.display='';
    if(micSvg)micSvg.style.display='none';
    if(done)done.classList.remove('visible');

  }else if(state==='done'){

    if(btn)btn.classList.remove('recording');
    if(timer)timer.classList.remove('visible');

    if(status){
      status.classList.remove('active');
      status.textContent='ضبط شد!';
    }

    if(wave)wave.classList.remove('visible');
    if(stopIcon)stopIcon.style.display='none';
    if(micSvg)micSvg.style.display='';

    if(done)done.classList.add('visible');

  }else{

    if(btn)btn.classList.remove('recording');

    if(timer){
      timer.classList.remove('visible');
      timer.textContent='0:00';
    }

    if(status){
      status.classList.remove('active');
      status.textContent='ضبط پاسخ صوتی (اختیاری)';
    }

    if(wave)wave.classList.remove('visible');
    if(stopIcon)stopIcon.style.display='none';
    if(micSvg)micSvg.style.display='';

    if(done)done.classList.remove('visible');
  }
}