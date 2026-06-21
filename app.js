/* ===== app.js — سفینه احساسات ===== */
(function(){
  function initApp(){
    /* ریست از طریق URL: index.html?reset=true */
    if(window.location.search.indexOf('reset=true')!==-1){
      try{localStorage.clear();}catch(e){}
      var url=window.location.pathname;
      window.history.replaceState({},'',url);
    }

    /* تنها نقطه ورود: engine.init() همه‌چیز را مدیریت می‌کند */
    engine.init();

    /* دکمه‌های ناوبری */
    var btnNext=document.getElementById('btnNext');
    var btnPrev=document.getElementById('btnPrev');
    if(btnNext) btnNext.addEventListener('click',function(){engine.next();});
    if(btnPrev) btnPrev.addEventListener('click',function(){engine.prev();});

    /* کیبورد */
    document.addEventListener('keydown',function(e){
      if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA'||e.target.tagName==='SELECT') return;
      if(e.key==='ArrowLeft'||e.key==='ArrowDown'){e.preventDefault();engine.next();}
      if(e.key==='ArrowRight'||e.key==='ArrowUp'){e.preventDefault();engine.prev();}
    });
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',initApp);
  }else{
    initApp();
  }
})();