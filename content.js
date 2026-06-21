var CONTENT={
  meta:{version:"3.0",language:"fa",totalSlides:24,totalStories:18,totalStations:4},

  dialogues:{
    "slide-01":{text:"سلام! خوش اومدی به <span class='hl'>سفینه احساسات</span>! 🚀<br>بیا با هم یه سفر هیجان‌انگیز بریم!",alienPose:"wave"},
    "slide-02":{text:"بذار اول <span class='hl'>صدات</span> رو بشنوم! 🎙️<br>دکمه ضبط رو بزن و اسمت رو بگو!",alienPose:"listen"},
    "slide-03":{text:"عالیه! حالا وارد <span class='hl'>ایستگاه دوم</span> می‌شیم! 🌟<br>اینجا داستان‌های جالبی می‌شنوی و بعد به سوالات جواب می‌دی!",alienPose:"point"},
    "slide-09":{text:"آفرین! تو خیلی <span class='hl'>خوب</span> بودی! 🌟<br>حالا وارد <span class='hl'>ایستگاه سوم</span> می‌شیم!<br>هر داستان رو بخون و <span class='hl'>احساس درست</span> رو انتخاب کن! 🎯",alienPose:"curious"},
    "slide-16":{text:"عالی بودی! حالا می‌رسیم به <span class='hl'>ایستگاه آخر</span>! 🏆<br>اینجا باید <span class='hl'>دو تا احساس</span> رو همزمان پیدا کنی!",alienPose:"happy"},
    "slide-24":{text:"آفرین دوست من! 🎉🌟<br>تو <span class='hl'>کل سفر</span> رو با موفقیت طی کردی!<br>خیلی <span class='hl'>باهوش</span> و <span class='hl'>مهربون</span> هستی!<br>به امید دیدار در سفرهای بعدی! 👋💜🚀",alienPose:"heart"},

    "intro-1":{text:"سلام دوست باهوش من! 🌟 من شنیدم وقتی آدم‌ها یک هدیه قشنگ می‌گیرن، یه احساس خاصی توی دلشون ایجاد می‌شه! من نمی‌دونم اسم این احساس چیه. 😊 می‌تونی کمکم کنی؟ داستان سارا رو بخون و بعد بهم بگو سارا چه احساسی داشت!",alienPose:"curious"},
    "intro-2":{text:"دوست زمینی من! 💔 من شنیدم بعضی وقتا آدم‌ها یه نفر رو خیلی دوست دارن ولی اون نفر می‌ره و دیگه برنمی‌گرشه. توی سیاره ما این اتفاق نمی‌افته و من نمی‌فهمم چه حسی داره. 😢 لطفاً داستان علی رو بخون و بهم بگو علی چه احساسی داشت.",alienPose:"think"},
    "intro-3":{text:"سلام رفیق فضاییم! 🌙 من تا حالا از چیزی نترسیدم! ولی می‌گن آدم‌ها بعضی وقتا از صداهای بلند و چیزای عجیب می‌ترسن. من نمی‌دونم ترس چه شکلیه! 😨 لطفاً داستان نیما رو بخون و بهم بگو نیما چه احساسی داشت.",alienPose:"listen"},
    "intro-4":{text:"دوست من، من یه سوال دارم! 🤔 بعضی وقتا وقتی چیز مورد علاقه آدم‌ها می‌شکنه، یه احساس عجیبی پیدا می‌کنن! صداشون بلند می‌شه و قرمز می‌شن! 😤 من نمی‌فهمم این چه احساسیه. لطفاً داستان مریم رو بخون و کمکم کن!",alienPose:"curious"},
    "intro-5":{text:"سلام دوست فضایی باهوش! 🎁 من شنیدم بعضی وقتا یه اتفاقی می‌افته که آدم‌ها اصلاً انتظارش رو ندارن! چشم‌هاشون گرد می‌شه و دهنشون باز می‌مونه! 😲 من کنجکاوم بدونم این چه احساسیه. داستان رضا رو بخون و کمکم کن!",alienPose:"curious"},
    "intro-6":{text:"دوست زمینی من! 🏃 من شنیدم وقتی یه کار مهم در پیش داریم، بعضی وقتا دلمون شور می‌زنه و نمی‌تونیم بخوابیم! توی سیاره ما خبری از این احساس نیست. 😟 لطفاً داستان زهرا رو بخون و بگو زهرا چه احساسی داره!",alienPose:"think"},
    "intro-7":{text:"سلام رفیق کوچولوی من! 😳 من شنیدم وقتی آدم‌ها جلوی بقیه یه کار اشتباه می‌کنن، یه احساسی پیدا می‌کنن که دلشون می‌خواد قایم بشن! من نمی‌فهمم این احساس چیه. لطفاً داستان امیر رو بخون و کمکم کن بفهمم!",alienPose:"think"},
    "intro-8":{text:"دوست باهوش من! 🏅 من شنیدم وقتی آدم‌ها خیلی تلاش می‌کنن و موفق می‌شن، یه احساس قشنگی توی سینه‌شون ایجاد می‌شه! سینه‌شون رو می‌دن جلو و لبخند می‌زنن! 😊 لطفاً داستان سمیرا رو بخون و بگو این احساس چیه!",alienPose:"point"},
    "intro-9":{text:"سلام دوست فضاییم! 🎢 من شنیدم بعضی جاها به اسم شهربازی هست که آدم‌ها وقتی می‌رن، قلبشون تندتر می‌زنه و نمی‌تونن صبر کنن! 🤩 من نمی‌دونم اسم این حس چیه. لطفاً داستان محمد رو بخون و بگو محمد چه حسی داره!",alienPose:"wave"},
    "intro-10":{text:"دوست زمینی من! 🤔 من شنیدم بعضی وقتا آدم‌ها وقتی چیزی رو می‌بینن که مال یکی دیگه‌ست، یه احساس عجیبی پیدا می‌کنن! دلشون می‌خواد اون چیز مال خودشون باشه. 😒 لطفاً داستان نگین رو بخون و کمکم کن بفهمم این حس چیه!",alienPose:"think"},
    "intro-11":{text:"سلام رفیق فضایی باهوش! 🥺 من شنیدم وقتی یه نفر که خیلی دوستش داریم می‌ره یه جای دور، یه احساس سنگینی توی دلمون ایجاد می‌شه. بعضی‌ها بهش می‌گن دلتنگی! من می‌خوام بدونم این حس چه شکلیه. لطفاً داستان پارسا رو بخون!",alienPose:"listen"},
    "intro-12":{text:"دوست مهربون من! 🐱 من شنیدم وقتی آدم‌ها یه موجود کوچولو و بی‌پناه رو می‌بینن، دلشون می‌سوزه و می‌خوان کمکش کنن. ولی بعضی وقتا هم ناراحت می‌شن! من نمی‌تونم بفهمم چرا دو تا احساس با هم میان. 😿 لطفاً داستان النا رو بخون و کمکم کن!",alienPose:"listen"},
    "intro-13":{text:"سلام دوست فضاییم! ⚽ من شنیدم وقتی تیم آدم‌ها می‌بره، همه جیغ می‌زنن و خوشحال می‌شن! ولی بعضی‌ها هم سینه‌شون رو می‌دن جلو! من نمی‌تونم بفهمم این دو تا احساس با هم چه فرقی دارن. 🤔 لطفاً داستان امیر رو بخون!",alienPose:"happy"},
    "intro-14":{text:"دوست زمینی من! 📚 من شنیدم بعضی وقتا آدم‌ها باید جلوی خیلی‌ها حرف بزنن و از این کار می‌ترسن! دلشون شور می‌زنه و نمی‌خوان برن! 😰 من نمی‌دونم ترس و نگرانی چه فرقی دارن. لطفاً داستان مینا رو بخون و کمکم کن!",alienPose:"think"},
    "intro-15":{text:"سلام رفیق فضایی باهوش! 💔 من شنیدم بعضی وقتا دوستای صمیمی با هم قهر می‌کنن. بعد هر دو نفرشون ناراحتن ولی خجالت هم می‌شن! 😢 من نمی‌تونم بفهمم آدم‌ها چرا همزمان غمگین و شرمنده می‌شن. لطفاً داستان مهدی رو بخون!",alienPose:"listen"},
    "intro-16":{text:"دوست مهربون من! 🎂 من شنیدم بعضی وقتا آدم‌ها یه چیزی می‌بینن که اصلاً انتظارش رو ندارن و خیلی هم خوشحال می‌شن! هم ذوق می‌کنن هم تعجب! 🎉 من نمی‌تونم بفهمم این دو تا احساس چطوری با هم میان. لطفاً داستان نیکا رو بخون!",alienPose:"wave"},
    "intro-17":{text:"سلام دوست فضاییم! 🚲 من شنیدم بعضی وقتا چیزی که آدم‌ها خیلی دوستش دارن گم می‌شه! اول عصبانی می‌شن و بعد نگران! 😠 من نمی‌فهمم چطور ممکنه آدم هم عصبانی باشه هم نگران. لطفاً داستان سامان رو بخون و کمکم کن!",alienPose:"curious"},
    "intro-18":{text:"دوست باهوش من! 👋 من شنیدم وقتی یه دوست عزیز می‌خواد بره، آدم‌ها هم غمگین می‌شن و هم دلشون برای طرفشون می‌سوزه! 🥺 من نمی‌تونم بفهمم دلتنگی و دلسوزی چه فرقی دارن. لطفاً داستان یاسمن رو بخون و کمکم کن!",alienPose:"heart"}
  },

  stations:[
    {number:1,name:"ایستگاه اول — معرفی",description:"بیا با هم آشنا بشیم! اسمت رو بگو و صدات رو ضبط کن.",slides:[1,2]},
    {number:2,name:"ایستگاه دوم — شناخت احساسات",description:"داستان‌ها رو بخون و احساساتت رو با حداکثر ۲ کلمه توصیف کن!",questionType:"descriptive",slides:[3,4,5,6,7,8]},
    {number:3,name:"ایستگاه سوم — انتخاب احساس",description:"هر داستان رو بخون و احساس درست رو انتخاب کن!",questionType:"single-choice",slides:[9,10,11,12,13,14,15]},
    {number:4,name:"ایستگاه چهارم — احساسات ترکیبی",description:"هر داستان رو بخون و دو تا احساس رو همزمان پیدا کن!",questionType:"multi-choice",slides:[16,17,18,19,20,21,22,23,24]}
  ],

  slides:[
    /* === STATION 1 === */
    {slideNumber:1,type:"child-info",station:null,title:"اطلاعات دانش‌آموز",dialogueRef:"slide-01",fields:[
      {name:"name",label:"اسمت چیه؟",placeholder:"مثلاً سارا",required:true},
      {name:"age",label:"چند سالته؟",options:[8,9,10,11,12],required:true},
      {name:"grade",label:"کلاس چندمی؟",options:[2,3,4,5,6],required:true}
    ]},
    {slideNumber:2,type:"station-intro",station:1,title:"ایستگاه اول — معرفی",dialogueRef:"slide-02",hasRecording:true,recordingPrompt:"دکمه رو بزن و اسمت رو بگو"},

    /* === STATION 2 === */
    {slideNumber:3,type:"station-intro",station:2,title:"ایستگاه دوم — شناخت احساسات",dialogueRef:"slide-03"},
    {slideNumber:4,type:"story-activity",station:2,storyId:1,dialogueRef:"intro-1"},
    {slideNumber:5,type:"story-activity",station:2,storyId:2,dialogueRef:"intro-2"},
    {slideNumber:6,type:"story-activity",station:2,storyId:3,dialogueRef:"intro-3"},
    {slideNumber:7,type:"story-activity",station:2,storyId:4,dialogueRef:"intro-4"},
    {slideNumber:8,type:"story-activity",station:2,storyId:5,dialogueRef:"intro-5"},

    /* === STATION 3 === */
    {slideNumber:9,type:"station-intro",station:3,title:"ایستگاه سوم — انتخاب احساس",dialogueRef:"slide-09"},
    {slideNumber:10,type:"story-activity",station:3,storyId:6,dialogueRef:"intro-6"},
    {slideNumber:11,type:"story-activity",station:3,storyId:7,dialogueRef:"intro-7"},
    {slideNumber:12,type:"story-activity",station:3,storyId:8,dialogueRef:"intro-8"},
    {slideNumber:13,type:"story-activity",station:3,storyId:9,dialogueRef:"intro-9"},
    {slideNumber:14,type:"story-activity",station:3,storyId:10,dialogueRef:"intro-10"},
    {slideNumber:15,type:"story-activity",station:3,storyId:11,dialogueRef:"intro-11"},

    /* === STATION 4 === */
    {slideNumber:16,type:"station-intro",station:4,title:"ایستگاه چهارم — احساسات ترکیبی",dialogueRef:"slide-16"},
    {slideNumber:17,type:"story-activity",station:4,storyId:12,dialogueRef:"intro-12"},
    {slideNumber:18,type:"story-activity",station:4,storyId:13,dialogueRef:"intro-13"},
    {slideNumber:19,type:"story-activity",station:4,storyId:14,dialogueRef:"intro-14"},
    {slideNumber:20,type:"story-activity",station:4,storyId:15,dialogueRef:"intro-15"},
    {slideNumber:21,type:"story-activity",station:4,storyId:16,dialogueRef:"intro-16"},
    {slideNumber:22,type:"story-activity",station:4,storyId:17,dialogueRef:"intro-17"},
    {slideNumber:23,type:"story-activity",station:4,storyId:18,dialogueRef:"intro-18"},

    /* === FAREWELL === */
    {slideNumber:24,type:"farewell",station:4,title:"پایان سفر! 🌟",dialogueRef:"slide-24",
     finalMessage:"تو تونستی تمام ۴ ایستگاه رو با موفقیت طی کنی! 🎉<br>احساسات خودت و دیگران رو خیلی خوب می‌شناسی! 💜<br>به امید دیدار در سفر بعدی! 🚀"}
  ],

  stories:[
    /* STATION 2 */
    {id:1,station:2,topic:"هدیه تولد",targetEmotion:"شادی",text:"مادر سارا یک جعبه بزرگ رنگی آورد. سارا با ذوق جعبه رو باز کرد و دید یک عروسک قشنگ داخلشه! سارا خیلی خوشحال شد و شروع کرد به خندیدن و بازی کردن با عروسکش.",audioFile:"story-01.mp3",question:{text:"سارا توی این داستان چه احساسی داشت؟",type:"descriptive",hasRecording:true,maxWords:2}},
    {id:2,station:2,topic:"رفتن مادربزرگ",targetEmotion:"غم",text:"مادربزرگ علی مدتی بیمار بود. یک روز وقتی علی از مدرسه برگشت، دید مادرش گریه می‌کنه. مادربزرگ علی به سفر خیلی خیلی دوری رفته بود و دیگه برنمی‌گشت. علی خیلی ناراحت شد.",audioFile:"story-02.mp3",question:{text:"علی چه احساسی داشت؟",type:"descriptive",hasRecording:true,maxWords:2}},
    {id:3,station:2,topic:"صدای وحشتناک",targetEmotion:"ترس",text:"شب بود و نیما توی تختش خواب بود. ناگهان یک صدای خیلی بلند از حیاط اومد. نیما ترسید و زیر پتو قایم شد. قلبش تند تند می‌زد.",audioFile:"story-03.mp3",question:{text:"نیما چه احساسی داشت؟",type:"descriptive",hasRecording:true,maxWords:2}},
    {id:4,station:2,topic:"اسباب‌بازی شکسته",targetEmotion:"خشم",text:"مریم اسباب‌بازی مورد علاقه‌اش رو روی میز گذاشته بود. داداش کوچیکش اومد و اسباب‌بازی رو انداخت زمین و شکست. مریم خیلی عصبانی شد و شروع کرد به گریه کردن.",audioFile:"story-04.mp3",question:{text:"مریم چه احساسی داشت؟",type:"descriptive",hasRecording:true,maxWords:2}},
    {id:5,station:2,topic:"هدیه غافلگیرکننده",targetEmotion:"تعجب",text:"رضا داشت از مدرسه برمی‌گشت. وقتی در رو باز کرد، دید همه فامیل توی خونه جمع شدن! همه با هم گفتن: «سورپرایز!» رضا خیلی متعجب شد!",audioFile:"story-05.mp3",question:{text:"رضا چه احساسی داشت؟",type:"descriptive",hasRecording:true,maxWords:2}},

    /* STATION 3 */
    {id:6,station:3,topic:"مسابقه دو",targetEmotion:"نگرانی",text:"زهرا فردا مسابقه دو داره. شب قبل از مسابقه، نمی‌تونه بخوابه. مدام فکر می‌کنه که نکنه آخر بشه؟ نکنه زمین بخوره؟ توی دلش یه حس سنگینی هست که ولش نمی‌کنه.",audioFile:"story-06.mp3",question:{text:"زهرا الان چه احساسی داره؟",type:"single-choice",hasRecording:false,options:[{id:1,text:"😊 شادی و خوشحالی",isCorrect:false},{id:2,text:"😟 نگرانی و مضطرب",isCorrect:true},{id:3,text:"😠 عصبانی و ناراحت",isCorrect:false}]}},
    {id:7,station:3,topic:"زمین‌خوردن",targetEmotion:"شرمندگی",text:"امیر توی حیاط مدرسه دوید و جلوی همه بچه‌ها زمین خورد. همه بچه‌ها بهش نگاه کردن و خندیدن. امیر سرخ شد و سرش رو انداخت پایین و آروم آروم بلند شد.",audioFile:"story-07.mp3",question:{text:"امیر الان چه حسی داره؟",type:"single-choice",hasRecording:false,options:[{id:1,text:"😤 افتخار می‌کنه",isCorrect:false},{id:2,text:"😨 ترسیده",isCorrect:false},{id:3,text:"😳 شرمنده و خجالت‌زده",isCorrect:true}]}},
    {id:8,station:3,topic:"مدال طلا",targetEmotion:"افتخار",text:"سمیرا مدت‌ها تمرین نقاشی کرده بود. بالاخره توی مسابقه مدرسه مدال طلا گرفت! وقتی اسمش رو از بلندگو خوندن، سینه‌اش رو داد جلو و لبخند بزرگی زد.",audioFile:"story-08.mp3",question:{text:"سمیرا الان چه احساسی داره؟",type:"single-choice",hasRecording:false,options:[{id:1,text:"😢 غمگین",isCorrect:false},{id:2,text:"😤 افتخار و غرور",isCorrect:true},{id:3,text:"😒 حسادت",isCorrect:false}]}},
    {id:9,station:3,topic:"شهربازی",targetEmotion:"هیجان",text:"محمد و خانواده‌اش برای اولین بار به شهربازی رفتن. محمد با دیدن چرخ‌و‌فلک و ترن هوایی چشم‌هایش برق زد. نمی‌تونست صبر کنه و می‌دوید از این وسیله به اون وسیله!",audioFile:"story-09.mp3",question:{text:"محمد الان چه حسی داره؟",type:"single-choice",hasRecording:false,options:[{id:1,text:"🤩 هیجان‌زده و پرانرژی",isCorrect:true},{id:2,text:"😴 خسته و بی‌حوصله",isCorrect:false},{id:3,text:"😨 ترسیده",isCorrect:false}]}},
    {id:10,station:3,topic:"اسباب‌بازی دوست",targetEmotion:"حسادت",text:"نگین رفت خونه دوستش بازی. دوستش یه اسباب‌بازی خیلی قشنگ و بزرگ داشت که نگین خیلی دلش می‌خواست. نگین با خودش فکر کرد: چرا من اینو ندارم؟ چرا فقط اون داره؟",audioFile:"story-10.mp3",question:{text:"نگین الان چه حسی داره؟",type:"single-choice",hasRecording:false,options:[{id:1,text:"😊 خوشحال",isCorrect:false},{id:2,text:"😢 ناراحت",isCorrect:false},{id:3,text:"😒 حسودی می‌کنه",isCorrect:true}]}},
    {id:11,station:3,topic:"پدر مسافرت‌رفته",targetEmotion:"دلتنگی",text:"پدر پارسا برای کار رفته شهر دیگه و چند هفته‌ای هست که نیومده. پارسا هر شب عکس باباش رو نگاه می‌کنه و آهسته می‌گه: کی برمی‌گردی بابا؟ دلش خیلی تنگ شده.",audioFile:"story-11.mp3",question:{text:"پارسا الان چه احساسی داره؟",type:"single-choice",hasRecording:false,options:[{id:1,text:"🥺 دلتنگ باباش",isCorrect:true},{id:2,text:"😠 عصبانی",isCorrect:false},{id:3,text:"😲 متعجب",isCorrect:false}]}},

    /* STATION 4 */
    {id:12,station:4,topic:"بچه‌گربه بی‌پناه",targetEmotions:["دلسوزی","غم"],text:"النا یه بچه‌گربه کوچولو توی کوچه پیدا کرد که تنها بود و می‌لرزید. النا خیلی ناراحت شد که بچه‌گربه توی سرما مونده. گربه رو آروم بغل کرد تا گرم بشه و بردش خونه.",audioFile:"story-12.mp3",question:{text:"النا توی این داستان چه احساساتی داشت؟ <span class='q-hint'>دو تا احساس رو انتخاب کن</span>",type:"multi-choice",correctCount:2,hasRecording:false,options:[{id:1,text:"😊 شادی و خوشحالی",isCorrect:false},{id:2,text:"💗 دلسوزی و مهربانی",isCorrect:true},{id:3,text:"😢 غم و ناراحتی",isCorrect:true},{id:4,text:"😠 خشم و عصبانیت",isCorrect:false}]}},
    {id:13,station:4,topic:"برد فوتبال",targetEmotions:["افتخار","هیجان"],text:"تیم فوتبال امیر توی آخرین دقیقه گل زد و برد! امیر با بچه‌های تیم دویدن و جشن گرفتن. اشک شوق توی چشماش بود و نمی‌تونست ذوقش رو کنترل کنه!",audioFile:"story-13.mp3",question:{text:"امیر توی این لحظه چه احساساتی داشت؟ <span class='q-hint'>دو تا احساس رو انتخاب کن</span>",type:"multi-choice",correctCount:2,hasRecording:false,options:[{id:1,text:"😨 ترس و نگرانی",isCorrect:false},{id:2,text:"😤 افتخار و غرور",isCorrect:true},{id:3,text:"🤩 هیجان و شادی",isCorrect:true},{id:4,text:"😢 غم و دلتنگی",isCorrect:false}]}},
    {id:14,station:4,topic:"ارائه جلوی کلاس",targetEmotions:["نگرانی","ترس"],text:"مینا باید فردا جلوی همه کلاس ارائه بده. شب قبل اصلاً خوابش نمی‌بره. مدام فکر می‌کنه: نکنه بقیه بخندن؟ نکنه حرفم رو فراموش کنم؟ دلش می‌خواد فردا نره مدرسه.",audioFile:"story-14.mp3",question:{text:"مینا چه احساساتی داره؟ <span class='q-hint'>دو تا رو انتخاب کن</span>",type:"multi-choice",correctCount:2,hasRecording:false,options:[{id:1,text:"😟 نگرانی و استرس",isCorrect:true},{id:2,text:"😨 ترس از قضاوت",isCorrect:true},{id:3,text:"😤 افتخار",isCorrect:false},{id:4,text:"😊 شادی",isCorrect:false}]}},
    {id:15,station:4,topic:"قهر دوست",targetEmotions:["غم","شرمندگی"],text:"مهدی با بهترین دوستش دعواش شد و قهر کردن. مهدی حس می‌کنه نباید اون حرف تند رو می‌زد. دلش برای بازی کردن با دوستش تنگ شده ولی خجالت می‌کشه زنگ بزنه.",audioFile:"story-15.mp3",question:{text:"مهدی الان چه احساساتی داره؟ <span class='q-hint'>دو تا رو انتخاب کن</span>",type:"multi-choice",correctCount:2,hasRecording:false,options:[{id:1,text:"😠 خشم و عصبانیت",isCorrect:false},{id:2,text:"😢 غم و دلتنگی",isCorrect:true},{id:3,text:"😳 شرمندگی و پشیمانی",isCorrect:true},{id:4,text:"🤩 هیجان",isCorrect:false}]}},
    {id:16,station:4,topic:"جشن تولد سورپرایزی",targetEmotions:["شادی","تعجب"],text:"نیکا در اتاقش رو باز کرد و دید همه دوستاش توی هال جمع شدن! کیک تولد با شمع‌های روشن، بادکنک‌های رنگی و هدیه‌های بزرگ! نیکا ذوق‌مرگ شد و اشک شوق ریخت!",audioFile:"story-16.mp3",question:{text:"نیکا چه احساساتی داشت؟ <span class='q-hint'>دو تا رو انتخاب کن</span>",type:"multi-choice",correctCount:2,hasRecording:false,options:[{id:1,text:"😊 شادی و خوشحالی",isCorrect:true},{id:2,text:"😲 تعجب و سورپرایز",isCorrect:true},{id:3,text:"😢 غم",isCorrect:false},{id:4,text:"😨 ترس",isCorrect:false}]}},
    {id:17,station:4,topic:"دوچرخه دزدیده‌شده",targetEmotions:["خشم","نگرانی"],text:"سامان از مدرسه برگشت و دید دوچرخه‌اش جلوی خونه نیست! از مامانش پرسید و مامانش گفت کسی برده. سامان عصبانی شد و ترسید که دیگه هیچ‌وقت دوچرخه‌اش رو نبینه.",audioFile:"story-17.mp3",question:{text:"سامان چه احساساتی داشت؟ <span class='q-hint'>دو تا رو انتخاب کن</span>",type:"multi-choice",correctCount:2,hasRecording:false,options:[{id:1,text:"😠 خشم و عصبانیت",isCorrect:true},{id:2,text:"😟 نگرانی و ترس",isCorrect:true},{id:3,text:"😊 شادی",isCorrect:false},{id:4,text:"😲 تعجب مثبت",isCorrect:false}]}},
    {id:18,station:4,topic:"خداحافظی دوست",targetEmotions:["دلتنگی","دلسوزی"],text:"دوست صمیمی یاسمن داره با خانواده‌ش مهاجرت می‌کنه و می‌ره شهر دور. یاسمن براش یه نامه بلند نوشته و گریه می‌کنه. هی برمی‌گرده عکس‌های دونفره‌شون رو نگاه می‌کنه.",audioFile:"story-18.mp3",question:{text:"یاسمن چه احساساتی داره؟ <span class='q-hint'>دو تا رو انتخاب کن</span>",type:"multi-choice",correctCount:2,hasRecording:false,options:[{id:1,text:"🥺 دلتنگی و بیقراری",isCorrect:true},{id:2,text:"💗 دلسوزی و مهربانی",isCorrect:true},{id:3,text:"😠 خشم",isCorrect:false},{id:4,text:"🤩 هیجان",isCorrect:false}]}}
  ],

  emotions:[
    {id:"happiness",name:"شادی",color:"#FFD700",icon:"😊"},
    {id:"sadness",name:"غم",color:"#6B7FE0",icon:"😢"},
    {id:"fear",name:"ترس",color:"#9B59B6",icon:"😨"},
    {id:"anger",name:"خشم",color:"#E74C3C",icon:"😠"},
    {id:"surprise",name:"تعجب",color:"#F39C12",icon:"😲"},
    {id:"worry",name:"نگرانی",color:"#E67E22",icon:"😟"},
    {id:"embarrassment",name:"شرمندگی",color:"#E91E8A",icon:"😳"},
    {id:"pride",name:"افتخار",color:"#27AE60",icon:"😤"},
    {id:"excitement",name:"هیجان",color:"#F1C40F",icon:"🤩"},
    {id:"jealousy",name:"حسادت",color:"#2ECC71",icon:"😒"},
    {id:"missing",name:"دلتنگی",color:"#3498DB",icon:"🥺"},
    {id:"compassion",name:"دلسوزی",color:"#FF69B4",icon:"💗"}
  ]
};