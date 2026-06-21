/* ===== CHOICE HANDLERS ===== */
function selectSingle(storyId,optId){
  var story=getStory(storyId);if(!story) return;
  var selectedOpt=null,correctOpt=null;
  story.question.options.forEach(function(opt){
    if(opt.id===optId) selectedOpt=opt;
    if(opt.isCorrect) correctOpt=opt;
  });
  var isCorrect=selectedOpt?selectedOpt.isCorrect:false;
  answersStore[storyId]=enrichAnswer(storyId,{selectedId:optId,isCorrect:isCorrect,answered:true});
  var list=document.getElementById('opts_'+storyId);if(list) list.classList.add('answered');
  var cards=document.querySelectorAll('#opts_'+storyId+' .option-card');
  cards.forEach(function(c){
    c.classList.remove('selected');c.removeAttribute('onclick');c.style.pointerEvents='none';
    var oid=parseInt(c.getAttribute('data-opt'));
    if(oid===optId) c.classList.add(isCorrect?'correct':'wrong');
    if(!isCorrect&&correctOpt&&oid===correctOpt.id) c.classList.add('reveal-correct');
  });
  var fbExisting=list?list.nextElementSibling:null;
  if(fbExisting&&fbExisting.classList.contains('feedback-banner')) fbExisting.remove();
  var banner=document.createElement('div');
  banner.className='feedback-banner visible '+(isCorrect?'is-correct':'is-wrong');
  banner.innerHTML='<span class="fb-icon">'+(isCorrect?'🌟':'💡')+'</span><span class="fb-text">'+(isCorrect?'آفرین! پاسخ درست بود!':'جواب درست رو با رنگ سبز می‌بینی.')+'</span>';
  if(list) list.parentNode.insertBefore(banner,list.nextSibling);
  engine.saveProgress();
  if(isCorrect) showToastMsg('✅ آفرین! پاسخ درست بود! 🌟','success');
  else showToastMsg('❌ پاسخ اشتباه بود.','error');
}

function selectMulti(storyId,optId,maxCount){
  var saved=answersStore[storyId];
  if(!saved) saved=answersStore[storyId]={selectedIds:[]};
  if(saved.answered) return;
  if(!saved.selectedIds) saved.selectedIds=[];
  var ids=saved.selectedIds;var idx=ids.indexOf(optId);
  if(idx>-1){ids.splice(idx,1);}else{
    if(ids.length>=maxCount){showToastMsg('فقط '+toPersianNum(maxCount)+' احساس می‌تونی انتخاب کنی! 🎯','error');return;}
    ids.push(optId);
  }
  var cards=document.querySelectorAll('#opts_'+storyId+' .option-card');
  cards.forEach(function(c){
    c.classList.remove('selected');
    var oid=parseInt(c.getAttribute('data-opt'));
    if(ids.indexOf(oid)>-1) c.classList.add('selected');
  });
  var counter=document.getElementById('multiCounter_'+storyId);
  if(counter){
    counter.className='multi-counter'+(ids.length===maxCount?' ready':'');
    counter.innerHTML='انتخاب شده: '+toPersianNum(ids.length)+' از '+toPersianNum(maxCount);
  }
  var submitBtn=document.getElementById('multiSubmit_'+storyId);
  if(submitBtn){
    if(ids.length===maxCount) submitBtn.classList.add('visible');
    else submitBtn.classList.remove('visible');
  }
}

function submitMulti(storyId,maxCount){
  var saved=answersStore[storyId];
  if(!saved||!saved.selectedIds||saved.selectedIds.length<maxCount){
    showToastMsg('باید '+toPersianNum(maxCount)+' احساس رو انتخاب کنی! 🎯','error');return;
  }
  var story=getStory(storyId);if(!story) return;
  var correctCount=0;var selectedIds=saved.selectedIds;
  story.question.options.forEach(function(opt){
    if(selectedIds.indexOf(opt.id)!==-1&&opt.isCorrect) correctCount++;
  });
  var allCorrect=correctCount===maxCount;
  answersStore[storyId]=enrichAnswer(storyId,{selectedIds:selectedIds.slice(),answered:true,correctCount:correctCount,allCorrect:allCorrect});
  var list=document.getElementById('opts_'+storyId);if(list) list.classList.add('answered');
  var cards=document.querySelectorAll('#opts_'+storyId+' .option-card');
  cards.forEach(function(c){
    c.removeAttribute('onclick');c.style.pointerEvents='none';
    var oid=parseInt(c.getAttribute('data-opt'));
    var wasSelected=selectedIds.indexOf(oid)!==-1;
    var isCorrectOpt=false;
    story.question.options.forEach(function(opt){if(opt.id===oid&&opt.isCorrect) isCorrectOpt=true;});
    c.classList.remove('selected');
    if(wasSelected&&isCorrectOpt) c.classList.add('correct');
    else if(wasSelected&&!isCorrectOpt) c.classList.add('wrong');
    else if(!wasSelected&&isCorrectOpt) c.classList.add('reveal-correct');
  });
  var counter=document.getElementById('multiCounter_'+storyId);if(counter) counter.remove();
  var submitBtn=document.getElementById('multiSubmit_'+storyId);if(submitBtn) submitBtn.remove();
  var fbExisting=list?list.nextElementSibling:null;
  if(fbExisting&&fbExisting.classList.contains('feedback-banner')) fbExisting.remove();
  var fbCls='feedback-banner visible '+(allCorrect?'is-correct':correctCount>0?'is-partial':'is-wrong');
  var fbIcon=allCorrect?'🌟':correctCount>0?'👍':'💡';
  var fbText=allCorrect?'آفرین! هر دو پاسخ درست بود!':'پاسخ‌های درست رو با رنگ سبز می‌بینی.';
  var banner=document.createElement('div');banner.className=fbCls;
  banner.innerHTML='<span class="fb-icon">'+fbIcon+'</span><span class="fb-text">'+fbText+'</span>';
  if(list) list.parentNode.insertBefore(banner,list.nextSibling);
  engine.saveProgress();
  if(allCorrect) showToastMsg('✅ هر دو پاسخ درست بود! 🌟','success');
  else if(correctCount>0) showToastMsg('👍 یکی از پاسخ‌ها درست بود!','success');
  else showToastMsg('❌ پاسخ‌ها اشتباه بودن.','error');
}

/* ===== ENGINE ===== */
var engine={
  currentSlide:0,
  totalSlides:CONTENT.slides.length,

  init:function(){
    this.currentSlide=0;
    this.totalSlides=CONTENT.slides.length;
    this.loadProgress();
    if(typeof this.currentSlide!=='number'||isNaN(this.currentSlide)||this.currentSlide<0||this.currentSlide>=this.totalSlides){
      this.currentSlide=0;
    }
    setSessionStart();
    this.render();
    this.updateProgress();
  },

  render:function(){
    if(typeof this.currentSlide!=='number'||isNaN(this.currentSlide)||this.currentSlide<0||this.currentSlide>=CONTENT.slides.length){
      this.currentSlide=0;
    }
    var slide=CONTENT.slides[this.currentSlide];
    if(!slide){this.currentSlide=0;slide=CONTENT.slides[0];}

    if(typeof stopSpeech === 'function'){
    stopSpeech();
}

    var wrapper=document.getElementById('slideWrapper');
    var html='';
    var dlg=getDialogue(slide.dialogueRef);
    var pose=dlg?dlg.alienPose:'think';
    html+='<div class="alien-float"><div class="alien-glow-ring"></div>'+buildAlienSVG(pose)+'</div>';

    if(slide.type==='child-info') html+=renderChildInfo(slide);
    else if(slide.type==='station-intro') html+=renderStationIntro(slide);
    else if(slide.type==='story-activity') html+=renderStoryActivity(slide);
    else if(slide.type==='farewell') html+=renderFarewell(slide);

    wrapper.innerHTML=html;
    wrapper.style.animation='none';wrapper.offsetHeight;wrapper.style.animation='slideIn .45s ease-out';

    var badge='';
    if(slide.station){var st=getStation(slide.station);if(st) badge=st.name;}
    if(slide.type==='farewell') badge='پایان سفر 🌟';
    if(!slide.station&&slide.type==='child-info') badge='اطلاعات دانش‌آموز';
    document.getElementById('stationBadge').textContent=badge||'اسلاید '+toPersianNum(slide.slideNumber);

    document.getElementById('btnPrev').disabled=this.currentSlide===0;
    document.getElementById('navCurrent').textContent=toPersianNum(slide.slideNumber);
    document.getElementById('navTotal').textContent=toPersianNum(this.totalSlides);

    var nextBtn=document.getElementById('btnNext');
    if(slide.type==='farewell') nextBtn.innerHTML='<span>تمام! 🌟</span>';
    else nextBtn.innerHTML='<span>بعدی</span><span class="arrow">←</span>';

    this.buildWaveformBars();

    if(slide.type==='story-activity'){
      var story=getStory(slide.storyId);
      if(story&&story.question&&story.question.type==='descriptive'){
        setTimeout(function(){updateWordCount(story.id);},50);
      }
    }

    if(slide.type==='farewell'){setSessionEnd();this.saveProgress();}

    /* ★ TTS زنجیره‌ای */
    var self=this;
    setTimeout(function(){self._autoSpeak(slide);},400);
  },

  _autoSpeak:function(slide){
    var texts=[];
    if(slide.type==='story-activity'){
      var dlg=getDialogue(slide.dialogueRef);
      if(dlg&&dlg.text) texts.push(dlg.text);
      var story=getStory(slide.storyId);
      if(story&&story.text) texts.push(story.text);
      if(story&&story.question&&story.question.text){
        texts.push(story.question.text.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim());
      }
    }else{
      var dlg2=getDialogue(slide.dialogueRef);
      if(dlg2&&dlg2.text) texts.push(dlg2.text);
    }
    if(texts.length) speakSequence(texts);
  },

  validateCurrent:function(){
    var slide=CONTENT.slides[this.currentSlide];if(!slide) return true;

    if(slide.type==='child-info'){
      var valid=true;
      slide.fields.forEach(function(f){
        var el=document.getElementById('field_'+f.name);var errEl=document.getElementById('err_'+f.name);
        if(f.required){
          if(f.options){if(!el.value){el.classList.add('error');errEl.classList.add('visible');valid=false;}else{el.classList.remove('error');errEl.classList.remove('visible');childInfo[f.name]=el.value;}}
          else{if(!el.value.trim()){el.classList.add('error');errEl.classList.add('visible');valid=false;}else{el.classList.remove('error');errEl.classList.remove('visible');childInfo[f.name]=el.value.trim();}}
        }
      });
      if(!valid) showToastMsg('لطفاً همه فیلدها رو پر کن! 😊','error');
      return valid;
    }

    if(slide.type==='story-activity'){
      var story=getStory(slide.storyId);if(!story) return true;

      if(story.question.type==='descriptive'){
        var ta=document.getElementById('textarea_'+story.id);var maxWords=story.question.maxWords||null;
        if(!ta) return true;var text=ta.value.trim();
        if(maxWords&&!text){showToastMsg('لطفاً پاسخت رو بنویس! ✏️','error');ta.classList.add('error');return false;}
        if(text&&maxWords){var wc=countWords(text);if(wc>maxWords){showToastMsg('پاسخ باید حداکثر '+toPersianNum(maxWords)+' کلمه باشد! ✏️','error');return false;}}
        if(text) answersStore[story.id]=enrichAnswer(story.id,{text:text});
        ta.classList.remove('error');return true;
      }

      if(story.question.type==='single-choice'){
        if(!answersStore[story.id]||!answersStore[story.id].answered){showToastMsg('یک احساس رو انتخاب کن! 🎯','error');return false;}return true;
      }

      if(story.question.type==='multi-choice'){
        var saved=answersStore[story.id];
        if(!saved||!saved.answered){showToastMsg('باید '+toPersianNum(story.question.correctCount)+' احساس رو انتخاب و تأیید کنی! 🎯','error');return false;}return true;
      }
    }

    return true;
  },

  next:function(){
    stopSpeech();
    if(!this.validateCurrent()) return;
    if(this.currentSlide>=this.totalSlides-1){showToastMsg('🎉 سفر تموم شد! آفرین!','success');return;}
    this.currentSlide++;this.render();this.updateProgress();this.saveProgress();
  },

  prev:function(){
    stopSpeech();
    if(this.currentSlide<=0) return;
    this.currentSlide--;this.render();this.updateProgress();
  },

  updateProgress:function(){
    var pct=Math.round(((this.currentSlide+1)/this.totalSlides)*100);
    document.getElementById('progressFill').style.width=pct+'%';
    document.getElementById('progressPct').textContent=toPersianNum(pct)+'٪';
  },

  saveProgress:function(){
    var data={
      version:3,
      session:{startTime:sessionInfo.startTime,endTime:sessionInfo.endTime,duration:getSessionDuration()},
      student:{name:childInfo.name||'',age:childInfo.age||'',grade:childInfo.grade||''},
      answers:answersStore,
      currentSlide:this.currentSlide,
      totalSlides:this.totalSlides,
      savedAt:getTimestamp()
    };
    try{localStorage.setItem(SESSION_KEY,JSON.stringify(data));}catch(e){}
    if(childInfo.name){
      var sessionData={
        id:sessionInfo.startTime||getTimestamp(),
        student:{name:childInfo.name,age:childInfo.age,grade:childInfo.grade},
        session:{startTime:sessionInfo.startTime,endTime:sessionInfo.endTime},
        answers:answersStore,
        currentSlide:this.currentSlide,
        completed:this.currentSlide>=this.totalSlides-1,
        savedAt:getTimestamp()
      };
      saveSessionToList(sessionData);
    }
  },

  loadProgress:function(){
    var raw;try{raw=localStorage.getItem(SESSION_KEY);}catch(e){return;}
    if(!raw) return;
    var data;try{data=JSON.parse(raw);}catch(e){return;}
    if(!data||typeof data!=='object') return;
    var savedSlide=0;
    if(typeof data.version==='number'&&data.version>=2){
      if(data.session){sessionInfo.startTime=data.session.startTime||null;sessionInfo.endTime=data.session.endTime||null;}
      if(data.student){childInfo.name=data.student.name||'';childInfo.age=data.student.age||'';childInfo.grade=data.student.grade||'';}
      if(data.answers) answersStore=data.answers;
      if(typeof data.currentSlide==='number') savedSlide=data.currentSlide;
    }else if(typeof data.version==='number'&&data.version===1){
      if(data.childInfo) childInfo=data.childInfo;
      if(data.answers) answersStore=data.answers;
      if(typeof data.currentSlide==='number') savedSlide=data.currentSlide;
      sessionInfo.startTime=data.savedAt||getTimestamp();
    }else{return;}
    if(typeof savedSlide==='number'&&!isNaN(savedSlide)&&savedSlide>=0&&savedSlide<this.totalSlides){
      this.currentSlide=savedSlide;
    }
  },

  clearProgress:function(){
    try{localStorage.removeItem(SESSION_KEY);}catch(e){}
    answersStore={};childInfo={name:'',age:'',grade:''};sessionInfo={startTime:null,endTime:null};
    this.currentSlide=0;
  },

  getFullReport:function(){
    var report={student:childInfo,session:{startTime:sessionInfo.startTime,endTime:sessionInfo.endTime,duration:getSessionDuration()},answers:{},summary:{totalAnswered:0,station2Count:0,station3Correct:0,station3Total:0,station4Perfect:0,station4Partial:0,station4Total:0}};
    for(var storyId in answersStore){var ans=answersStore[storyId];if(!ans) continue;report.answers[storyId]=ans;report.summary.totalAnswered++;if(ans.station===2) report.summary.station2Count++;if(ans.station===3&&ans.answered){report.summary.station3Total++;if(ans.isCorrect) report.summary.station3Correct++;}if(ans.station===4&&ans.answered){report.summary.station4Total++;if(ans.allCorrect) report.summary.station4Perfect++;else if(ans.correctCount>0) report.summary.station4Partial++;}}
    return report;
  },

  buildWaveformBars:function(){
    var containers=document.querySelectorAll('.waveform-mini');
    containers.forEach(function(c){if(c.children.length>0) return;for(var i=0;i<16;i++){var bar=document.createElement('div');bar.className='wbar';var h=6+Math.random()*20;bar.style.setProperty('--h',h+'px');bar.style.setProperty('--d',(0.3+Math.random()*0.4)+'s');bar.style.animationDelay=(Math.random()*0.5)+'s';c.appendChild(bar);}});
  }
};