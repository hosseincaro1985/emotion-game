/* ===== HELPERS ===== */
function speechBtnHTML(){
  return '<button onclick="repeatSpeech()" style="display:inline-flex;align-items:center;gap:5px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);border-radius:10px;padding:6px 14px;color:#C9B8E0;font-size:13px;font-weight:500;cursor:pointer;font-family:Vazirmatn,sans-serif;transition:all 0.2s;margin-top:10px;outline:none;" onmouseover="this.style.background=\'rgba(168,85,247,0.15)\'" onmouseout="this.style.background=\'rgba(255,255,255,0.08)\'">🔊 <span>تکرار صدا</span></button>';
}

function buildQuestionHTML(story){
  if(!story||!story.question) return '';
  var q=story.question;
  var html='';

  html+='<div class="question-divider"></div>';
  html+='<div class="question-section">';
  html+='<div class="question-header">';
  html+='<span class="question-icon">❓</span>';
  html+='<span class="question-label">سوال</span>';
  html+='</div>';
  html+='<div class="question-text">'+q.text+'</div>';

  if(q.type==='descriptive'){
    html+='<div class="textarea-wrap">';
    html+='<textarea class="textarea-input" id="textarea_'+story.id+'" placeholder="جوابت رو اینجا بنویس..." oninput="updateWordCount('+story.id+')"></textarea>';
    html+='<div class="word-count">';
    html+='<span class="wc-container">تعداد کلمات: <span class="wc-number" id="wc_'+story.id+'">۰</span>';
    if(q.maxWords) html+=' از '+toPersianNum(q.maxWords);
    html+='</span>';
    html+='<span class="wc-warning" id="wcWarning_'+story.id+'"></span>';
    html+='<span class="wc-ok" id="wcOk_'+story.id+'"></span>';
    html+='</div></div>';
    if(q.hasRecording){
      html+='<div class="q-rec-section">';
      html+='<button class="rec-btn small" id="qRecBtn_'+story.id+'" onclick="toggleQRec('+story.id+')">';
      html+='<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="currentColor"/><path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
      html+='<span class="stop-icon" style="display:none">■</span>';
      html+='</button>';
      html+='<span class="q-rec-status" id="qStatus_'+story.id+'">ضبط پاسخ صوتی (اختیاری)</span>';
      html+='<span class="q-rec-timer" id="qTimer_'+story.id+'">0:00</span>';
      html+='<span class="q-rec-done" id="qDone_'+story.id+'">✅</span>';
      html+='<button class="rec-reset small" onclick="resetQRec('+story.id+')">🔄</button>';
      html+='<div class="waveform-mini" id="qWave_'+story.id+'"></div>';
      html+='</div>';
    }
  }

  else if(q.type==='single-choice'){
    html+='<div class="options-list" id="opts_'+story.id+'">';
    q.options.forEach(function(opt){
      var parts=opt.text.split(' ');
      var emoji=parts[0];
      var label=parts.slice(1).join(' ');
      html+='<div class="option-card" data-opt="'+opt.id+'" onclick="selectSingle('+story.id+','+opt.id+')">';
      html+='<span class="option-emoji">'+emoji+'</span>';
      html+='<span class="option-text">'+label+'</span>';
      html+='<span class="option-indicator"></span>';
      html+='</div>';
    });
    html+='</div>';
  }

  else if(q.type==='multi-choice'){
    html+='<div class="options-list multi" id="opts_'+story.id+'">';
    q.options.forEach(function(opt){
      var parts=opt.text.split(' ');
      var emoji=parts[0];
      var label=parts.slice(1).join(' ');
      html+='<div class="option-card" data-opt="'+opt.id+'" onclick="selectMulti('+story.id+','+opt.id+','+q.correctCount+')">';
      html+='<span class="option-emoji">'+emoji+'</span>';
      html+='<span class="option-text">'+label+'</span>';
      html+='<span class="option-indicator"></span>';
      html+='</div>';
    });
    html+='</div>';
    html+='<div class="multi-counter" id="multiCounter_'+story.id+'">انتخاب شده: ۰ از '+toPersianNum(q.correctCount)+'</div>';
    html+='<button class="multi-submit" id="multiSubmit_'+story.id+'" onclick="submitMulti('+story.id+','+q.correctCount+')">تأیید پاسخ ✅</button>';
  }

  html+='</div>';
  return html;
}

/* ===== RENDER CHILD INFO ===== */
function renderChildInfo(slide){
  var html='';
  var dlg=getDialogue(slide.dialogueRef);
  if(dlg){
    html+='<div class="dialogue-box"><div class="dialogue-text">'+dlg.text+'</div>';
    html+='<div style="text-align:center;">'+speechBtnHTML()+'</div></div>';
  }
  slide.fields.forEach(function(f){
    html+='<div class="field-group">';
    html+='<label class="field-label">'+f.label+(f.required?' <span style="color:var(--error)">*</span>':'')+'</label>';
    if(f.options){
      html+='<select class="field-select" id="field_'+f.name+'" onchange="clearFieldErr(\''+f.name+'\')">';
      html+='<option value="">انتخاب کن...</option>';
      f.options.forEach(function(opt){html+='<option value="'+opt+'">'+toPersianNum(opt)+'</option>';});
      html+='</select>';
    }else{
      html+='<input type="text" class="field-input" id="field_'+f.name+'" placeholder="'+(f.placeholder||'')+'" oninput="clearFieldErr(\''+f.name+'\')">';
    }
    html+='<span class="field-error" id="err_'+f.name+'">لطفاً این فیلد رو پر کن</span>';
    html+='</div>';
  });
  return html;
}

/* ===== RENDER STATION INTRO ===== */
function renderStationIntro(slide){
  var html='';
  var dlg=getDialogue(slide.dialogueRef);
  if(dlg){
    html+='<div class="dialogue-box"><div class="dialogue-text">'+dlg.text+'</div>';
    html+='<div style="text-align:center;">'+speechBtnHTML()+'</div></div>';
  }
  var station=getStation(slide.station);
  if(station){
    html+='<div class="station-intro">';
    html+='<div class="station-number">'+toPersianNum(station.number)+'</div>';
    html+='<div class="station-name">'+station.name+'</div>';
    html+='<div class="station-desc">'+station.description+'</div>';
    html+='</div>';
  }
  if(slide.hasRecording){
    html+='<div class="rec-section">';
    html+='<p class="rec-prompt">'+(slide.recordingPrompt||'دکمه رو بزن و صحبت کن')+'</p>';
    html+='<button class="rec-btn" id="recBtn_'+slide.slideNumber+'" onclick="toggleRec('+slide.slideNumber+')">';
    html+='<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" fill="currentColor"/><path d="M19 10v2a7 7 0 0 1-14 0v-2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><line x1="12" y1="19" x2="12" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    html+='<span class="stop-icon" style="display:none">■</span>';
    html+='</button>';
    html+='<div class="rec-timer" id="recTimer_'+slide.slideNumber+'">0:00</div>';
    html+='<div class="rec-status" id="recStatus_'+slide.slideNumber+'">دکمه رو بزن و اسمت رو بگو</div>';
    html+='<div class="rec-done" id="recDone_'+slide.slideNumber+'">✅ ضبط شد!</div>';
    html+='<button class="rec-reset" onclick="resetRec('+slide.slideNumber+')">🔄 ضبط مجدد</button>';
    html+='<div class="waveform-mini" id="waveMini_'+slide.slideNumber+'"></div>';
    html+='</div>';
  }
  return html;
}

/* ===== RENDER STORY ACTIVITY (ترکیبی: معرفی + داستان + سوال) ===== */
function renderStoryActivity(slide){
  var html='';
  var story=getStory(slide.storyId);
  if(!story) return '<p>داستان یافت نشد!</p>';

  /* بخش ۱: دیالوگ معرفی آدم فضایی */
  var dlg=getDialogue(slide.dialogueRef);
  if(dlg){
    html+='<div class="dialogue-box"><div class="dialogue-text">'+dlg.text+'</div>';
    html+='<div style="text-align:center;">'+speechBtnHTML()+'</div></div>';
  }

  /* بخش ۲: کارت داستان */
  var icon=story.station===2?'📖':story.station===3?'🎯':'🏆';
  var target=story.targetEmotion||(story.targetEmotions?story.targetEmotions.join(' و '):'');
  html+='<div class="story-card">';
  html+='<div class="story-header">';
  html+='<div class="story-icon">'+icon+'</div>';
  html+='<div class="story-meta">';
  html+='<span class="story-label">موضوع</span>';
  html+='<span class="story-emotion">'+story.topic+(target?' — '+target:'')+'</span>';
  html+='</div></div>';
  html+='<h3 class="story-title">'+story.topic+'</h3>';
  html+='<p class="story-text">'+story.text+'</p>';
  html+='</div>';

  /* بخش ۳: سوال */
  if(story.question){
    html+='<div class="story-card" style="margin-top:14px;">';
    html+=buildQuestionHTML(story);
    html+='</div>';
  }

  return html;
}

/* ===== RENDER FAREWELL ===== */
function renderFarewell(slide){
  var html='';
  var dlg=getDialogue(slide.dialogueRef);
  if(dlg){
    html+='<div class="dialogue-box"><div class="dialogue-text">'+dlg.text+'</div>';
    html+='<div style="text-align:center;">'+speechBtnHTML()+'</div></div>';
  }
  html+='<div class="farewell-card">';
  html+='<div class="farewell-emoji">🌟🚀💜</div>';
  html+='<h2 class="farewell-title">'+(slide.title||'پایان سفر!')+'</h2>';
  html+='<div class="farewell-text">'+(slide.finalMessage||'آفرین! سفر تموم شد!')+'</div>';
  html+='</div>';
  return html;
}