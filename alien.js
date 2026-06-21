function buildAlienSVG(pose){
  var p=pose||'think';

  var cfg={
    leRx:9,leRy:11,reRx:9,reRy:11,
    lpCx:48,lpCy:50,rpCx:72,rpCy:50,
    showPupils:true,
    mouth:'M50,68 Q60,78 70,68',
    la:'M36,90 Q22,98 26,110',
    ra:'M84,90 Q98,98 94,110',
    laP:'M48,24 Q42,10 36,4',raP:'M72,24 Q78,10 84,4',
    laX:36,laY:4,raX:84,raY:4,
    laR:4,raR:4,
    antC:'#19E6FF'
  };

  switch(p){
    case'wave':
      cfg.ra='M84,90 Q108,65 102,45';
      cfg.rpCx=74;cfg.mouth='M46,66 Q60,82 74,66';
      break;
    case'listen':
      cfg.leRy=13;cfg.reRy=13;
      cfg.laP='M48,24 Q38,6 32,2';
      cfg.laX=32;cfg.laY=2;cfg.laR=6;
      cfg.mouth='M52,68 Q60,72 68,68';
      break;
    case'point':
      cfg.ra='M84,90 Q112,86 116,82';
      cfg.rpCx=76;cfg.mouth='M52,68 Q60,76 68,68';
      break;
    case'think':
      cfg.la='M36,90 Q32,76 44,68';
      cfg.lpCy=46;cfg.rpCy=46;
      cfg.mouth='M52,70 Q60,68 68,70';
      break;
    case'curious':
      cfg.leRx=11;cfg.reRx=11;
      cfg.lpCx=50;cfg.rpCx=74;
      cfg.mouth='M54,70 Q60,74 66,70';
      cfg.raR=5;
      break;
    case'happy':
      cfg.leRy=6;cfg.reRy=6;
      cfg.showPupils=false;
      cfg.mouth='M44,64 Q60,84 76,64';
      cfg.la='M36,90 Q18,68 22,52';
      cfg.ra='M84,90 Q102,68 98,52';
      break;
    case'heart':
      cfg.leRy=6;cfg.reRy=6;
      cfg.showPupils=false;
      cfg.mouth='M46,66 Q60,80 74,66';
      cfg.la='M36,90 Q48,78 58,82';
      cfg.ra='M84,90 Q72,78 62,82';
      cfg.antC='#FF69B4';
      break;
  }

  var s='';
  s+='<svg viewBox="0 0 120 140">';
  s+='<defs>';
  s+='<linearGradient id="aG1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#7A2CF5"/><stop offset="100%" stop-color="#A855F7"/></linearGradient>';
  s+='<linearGradient id="aG2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#6D28D9"/><stop offset="100%" stop-color="#8B5CF6"/></linearGradient>';
  s+='<filter id="aG"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
  s+='</defs>';

  /* Antennae */
  s+='<path d="'+cfg.laP+'" stroke="'+cfg.antC+'" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
  s+='<circle cx="'+cfg.laX+'" cy="'+cfg.laY+'" r="'+cfg.laR+'" fill="'+cfg.antC+'" filter="url(#aG)" opacity=".9"/>';
  s+='<path d="'+cfg.raP+'" stroke="'+cfg.antC+'" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
  s+='<circle cx="'+cfg.raX+'" cy="'+cfg.raY+'" r="'+cfg.raR+'" fill="'+cfg.antC+'" filter="url(#aG)" opacity=".9"/>';

  /* Body */
  s+='<ellipse cx="60" cy="100" rx="22" ry="18" fill="url(#aG2)"/>';

  /* Arms */
  s+='<path d="'+cfg.la+'" stroke="#7A2CF5" stroke-width="4" fill="none" stroke-linecap="round"/>';
  s+='<path d="'+cfg.ra+'" stroke="#7A2CF5" stroke-width="4" fill="none" stroke-linecap="round"/>';

  /* Hand dots */
  var laParts=cfg.la.split(' ');
  var laEnd=laParts[laParts.length-1].split(',');
  s+='<circle cx="'+laEnd[0]+'" cy="'+laEnd[1]+'" r="5" fill="#8B5CF6"/>';
  var raParts=cfg.ra.split(' ');
  var raEnd=raParts[raParts.length-1].split(',');
  s+='<circle cx="'+raEnd[0]+'" cy="'+raEnd[1]+'" r="5" fill="#8B5CF6"/>';

  /* Head */
  s+='<ellipse cx="60" cy="52" rx="30" ry="28" fill="url(#aG1)"/>';

  /* Cheeks */
  s+='<ellipse cx="38" cy="62" rx="6" ry="4" fill="rgba(248,113,113,.25)"/>';
  s+='<ellipse cx="82" cy="62" rx="6" ry="4" fill="rgba(248,113,113,.25)"/>';

  /* Eyes */
  s+='<ellipse cx="48" cy="48" rx="'+cfg.leRx+'" ry="'+cfg.leRy+'" fill="white"/>';
  s+='<ellipse cx="72" cy="48" rx="'+cfg.reRx+'" ry="'+cfg.reRy+'" fill="white"/>';

  if(cfg.showPupils){
    s+='<circle cx="'+cfg.lpCx+'" cy="'+cfg.lpCy+'" r="4" fill="#0B0620"/>';
    s+='<circle cx="'+cfg.rpCx+'" cy="'+cfg.rpCy+'" r="4" fill="#0B0620"/>';
    s+='<circle cx="'+(cfg.lpCx-2)+'" cy="'+(cfg.lpCy-2)+'" r="1.5" fill="white"/>';
    s+='<circle cx="'+(cfg.rpCx-2)+'" cy="'+(cfg.rpCy-2)+'" r="1.5" fill="white"/>';
  }else{
    s+='<path d="M40,48 Q48,44 56,48" stroke="#0B0620" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
    s+='<path d="M64,48 Q72,44 80,48" stroke="#0B0620" stroke-width="2.5" fill="none" stroke-linecap="round"/>';
  }

  /* Mouth */
  s+='<path d="'+cfg.mouth+'" stroke="#F8F0FF" stroke-width="2" fill="none" stroke-linecap="round"/>';

  s+='</svg>';
  return s;
}