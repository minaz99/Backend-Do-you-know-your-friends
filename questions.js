const express = require("express");
const app = express();
require("dotenv").config();
app.use(express.json());
let axios = require("axios");
const questions = [
  {
    language: "English",
    question: "Which do you prefer: Book || Movie",
  },
  {
    language: "English",
    question: "Which do you prefer: Phone call || Texting",
  },
  {
    language: "English",
    question: "Which do you prefer: Comedy || Horror",
  },
  {
    language: "English",
    question: "Which do you prefer to watch: Sunsets || Sunrises",
  },
  {
    language: "English",
    question: "Which days do you prefer: Rainy days || Snowy days",
  },
  {
    language: "English",
    question:
      "You discover a magical object do you: Keep its power a secret || Share it with the world",
  },
  {
    language: "English",
    question:
      "You're lost on an empty island do you: Build a shelter first || Search for food immediately",
  },
  {
    language: "English",
    question:
      "You're in a haunted house do you: Explore it and see what’s inside  || Try to leave as soon as possible",
  },
  {
    language: "English",
    question:
      "You stumble upon a time machine do you: Travel to the past || Travel to the future",
  },

  {
    language: "English",
    question:
      "You're in a race do you: Take the shorter, riskier route || Take the longer, safer path",
  },
  {
    language: "English",
    question:
      "You receive a map with hidden treasure locations do you: Search alone || Make a team",
  },
  {
    language: "English",
    question:
      "You encounter a time loop of a memory that you love do you: Choose to live in it || Try to break free",
  },
  {
    language: "English",
    question:
      "You're in possession of a truth serum do you: Use it on other people to know about their secrets || Respect others privacy",
  },

  {
    language: "English",
    question:
      "You're offered a chance to meet your future self would you be: Excited to meet your future self || Afraid to meet your future self",
  },
  {
    language: "English",
    question:
      "You're granted one wish do you: Use it for personal gain || Use it to change the world",
  },
  {
    language: "English",
    question:
      "You discover a hidden world within a painting do you: Explore it and see where it leads || Ignore it and act as if you didn’t see it",
  },
  {
    language: "English",
    question:
      "You receive a vision of the future: Try to prevent it || Let events occur naturally",
  },
  {
    language: "English",
    question:
      "Your partner is stressed do you: Plan a relaxing evening together || Give them space to unwind alone",
  },
  {
    language: "English",
    question:
      "A friend is facing a tough decision do you: Offer your opinion || Help them with the options they suggest",
  },
  {
    language: "English",
    question:
      "Someone is dealing with grief do you: Offer words of comfort || Silently show your support through actions",
  },
  {
    language: "English",
    question:
      "You see a stranger is crying and emotional do you:  Approach them and offer help || Give them privacy to handle their emotions",
  },
  {
    language: "English",
    question:
      "Your friend is going through a breakup do you: Spend time with them to distract them || Give them space to express their emotions",
  },

  {
    language: "English",
    question:
      "You've fallen for your best friend do you: Confess your feelings || Keep them hidden to maintain the friendship and not risk losing them",
  },
  {
    language: "English",
    question:
      "Your partner forgets an important anniversary do you: Show your disappointment || Understand it was unintentional",
  },
  {
    language: "English",
    question:
      "You meet someone from a different culture do you: Try their cultural practices to understand them better || Stick to your own beliefs",
  },
  {
    language: "English",
    question:
      "Your crush is going through a tough time do you: Offer support immediately || Wait for them to reach out",
  },
  {
    language: "English",
    question:
      "You discover your partner has a secret past do you: Do you ask them about it || Respect their privacy until they're ready to share",
  },
  {
    language: "English",
    question:
      "Your friend likes you but you don't feel the same way do you: Talk with them about it || Pretend you don't know to avoid risking the friendship",
  },
  {
    language: "English",
    question:
      "If your partner's job requires moving to another country do you: Choose to go with them || Prioritise your own career and location and live seperately",
  },
  {
    language: "English",
    question:
      "You're interested in someone you've just met do you: Show your interest right away || Get to know them better before making a move",
  },
  {
    language: "English",
    question:
      "If your partner is unsure about commitment do you: Give them space till they are ready || Start a conversation about the future",
  },
  {
    language: "English",
    question:
      "If you and your partner have different life goals do you: Give your relationship a chance || Think about going seperate ways",
  },
  {
    language: "English",
    question:
      "You meet someone who shares all your interests do you: Make a move and tell them that you like them || Take time to make sure you're compatible in other aspects",
  },
  {
    language: "English",
    question:
      "Your partner's family disapproves of your relationship do you: Try to win their approval || Prioritise your partner's feelings over theirs",
  },
  {
    language: "English",
    question:
      "Your ex wants to get back together do you: Give them a chance again || Respectfully decline",
  },
  {
    language: "English",
    question:
      "If your partner's busy career leaves little time for your relationship do you: Support their career || Express your need for more time together",
  },
  {
    language: "English",
    question:
      "Do you prefer your partner to be: Younger or older than you || Same age as you",
  },
  {
    language: "English",
    question:
      "Your partner has a close relationship with an opposite-gender friend do you: Ask them to maintain distance between eachother || Trust your partner completely",
  },
  {
    language: "English",
    question:
      "You're considering a relationship with a work colleague do you: Hide your relationship from other work colleagues || Avoid workplace relationships altogether",
  },
  {
    language: "English",
    question:
      "Your partner faces a life-changing decision that could affect your relationship do you: Encourage them to follow their dreams, even if it means being in different places || Tell them not to take the opportunity to avoid affecting the relationship",
  },
  {
    language: "English",
    question:
      "Your friend asks for advice but says it’s a secret do you give your advice and: Keep it just between you two || Ask someone you trust for advice",
  },
  {
    language: "English",
    question:
      "If you catch your partner in a small lie do you: Face them and tell them about it || Act normally while keeping an eye on their behaviour",
  },
  {
    language: "English",
    question:
      "Your colleague asks for your opinion on a sensitive matter do you: Provide your honest feedback || Hold back some details so not to hurt them",
  },
  {
    language: "English",
    question:
      "If a stranger asks for help but seems suspicious do you: Help them || Politely decline and walk away",
  },
  {
    language: "English",
    question:
      "If your best friend shares a rumour about someone you know well do you: Believe your best friend || Ask someone yourself to make verify the rumour",
  },
  {
    language: "English",
    question:
      "Your crush always expects you to initiate contact do you: Keep being the one to initiate contact || Wait for them to contact you",
  },
  {
    language: "English",
    question:
      "If you're offered two different career paths do you: Choose stability in a job you don’t like || Follow your passion in a less stable and demanding job",
  },
  {
    language: "English",
    question:
      "You're faced with the decision to start a family or focus on your career do you: Prioritise family || Career advancement",
  },
  {
    language: "English",
    question:
      "If you have the chance to live forever would you choose to: Live an immortal life || Prefer a natural lifespan",
  },
  {
    language: "English",
    question:
      "You're offered a glimpse into your future love life do you: Curiously take a look || Let love unfold naturally",
  },
  {
    language: "English",
    question:
      "You have the choice between instant success now or gradual success in the future:  Instant success || Gradual success",
  },
  {
    language: "English",
    question:
      "You are at a party with karaoke would you: Participate and sing || Prefer to be in the audience",
  },
  {
    language: "English",
    question:
      "If you're asked to be the DJ at a friend's house party do you would you: Accept the role || feel pressured and decline",
  },
  {
    language: "English",
    question:
      "If your crush flirts but you are unsure do you: Flirt back || Ignore it to avoid confusion",
  },
  {
    language: "English",
    question:
      "If you are sharing a bed with a friend on a trip do you:  Sleep comfortably together || Find it awkward and uncomfortable",
  },
  {
    language: "English",
    question:
      "If you are in a conflict, do you: Share your feelings even if it might hurt the other person || Hold back to avoid hurting them",
  },
  {
    language: "English",
    question:
      "How do you feel about failure, is it a: Learning opportunity || A setback to be avoided",
  },
  {
    language: "English",
    question:
      "How do you measure success: By achievements || By personal fulfilment",
  },
  {
    language: "English",
    question:
      "If you forget someone's name do you: Ask for it again || Try to navigate the conversation without using their name",
  },
  {
    language: "English",
    question:
      "If you accidentally wave back to someone who wasn't actually waving to you do you: Laugh it off casually || Feel embarrassed about it",
  },
  {
    language: "English",
    question:
      "If you get caught staring at your crush do you: Smile and wave || Quickly look away embarrassed",
  },
  {
    language: "English",
    question:
      "If you accidentally like an old post of your crush do you: Unlike it immediately || Hope they don't notice",
  },
  {
    language: "English",
    question:
      "If you accidentally step on the bride's dress during the wedding do you: Apologise and offer to help fix it || Try to ignore the incident",
  },
  {
    language: "English",
    question: "Do you prefer being: Overdressed || Underdressed",
  },
  {
    language: "English",
    question:
      "If you encounter your favourite song on an empty dance floor do you: Dance freely without a care || Hesitate due to being alone",
  },
  {
    language: "English",
    question: "Do you prefer your wedding venue to be: Indoors || Outdoors",
  },
  {
    language: "English",
    question:
      "On your first dance together do you choose a dance routine: Involving lifts or spins || A simple dance with no risk",
  },
  {
    language: "English",
    question:
      "For the first dance do you: Pick a popular romantic song || Pick a song that holds special meaning for both of you",
  },
  {
    language: "English",
    question:
      "If you are at a sleepover do you choose: A horror movie for thrills || A comedy movie for laughs",
  },
  {
    language: "English",
    question:
      "If you want to be remembered for one thing, would you prefer to be remembered for: Your kindness || Your intelligence",
  },
  {
    language: "English",
    question:
      "Which outfit would you pick for a first date: A casually comfortable outfit || A formal and stylish outfit",
  },
  {
    language: "English",
    question:
      "Would you prefer ending a first date with: A friendly hug or a handshake  ||  Leave it open for the other person to decide",
  },
  {
    language: "English",
    question:
      "After your first date would you: Start a post-date conversation || Wait for your date to start conversation",
  },
  {
    language: "English",
    question:
      "For your first date would you prefer: A short and sweet first date || A longer date that allows for more in-depth conversation and connection",
  },
  {
    language: "English",
    question:
      "On your first date would you prefer: A crowded and lively venue for a first date || A quiet and intimate atmosphere",
  },
  {
    language: "English",
    question:
      "On a first date would you rather: Share a meal by trying each other's dishes || Stick to ordering separate items",
  },
  {
    language: "English",
    question:
      "In your dates do you prefer: Splitting the bill evenly || Take turns in each date",
  },
  {
    language: "English",
    question:
      "Do you prefer: Walking together to the first date location || Arriving separately and meeting there",
  },
  {
    language: "English",
    question:
      "On your first date would you rather dress up for: An elegant classy dinner || Casual dining experience",
  },
  { language: "English", question: "Which do you prefer: Summer || Winter" },
  {
    language: "English",
    question: "Which ice cream do you prefer: Chocolate || Vanilla",
  },
  {
    language: "English",
    question:
      "Which do you prefer to watch: Sunrise on the beach || Watching the night sky at night",
  },
  {
    language: "English",
    question:
      "If you were a superhero would you rather have the ability to: Fly at a snail's pace || run as fast as a turtle",
  },
  {
    language: "English",
    question:
      "Would you like to receive: A handwritten love letter || A surprise gift",
  },
  {
    language: "English",
    question:
      "Would you rather have: A spontaneous adventure date || A planned romantic evening",
  },
  {
    language: "English",
    question:
      "If you call someone you're not close with by mistake but hang up right away and they call you back immediately, do you: Explain that you called by mistake || Continue the conversation without mentioning it",
  },
  { language: "English", question: "Are you a: Coffee person || Tea person" },
  {
    language: "English",
    question: "Which would you feel more safe touching : A lion || A snake",
  },
  {
    language: "English",
    question:
      "Would you: Spend a whole day with your friends at haunted house || Spend a whole day in an empty room alone",
  },
  {
    language: "Egyptian",
    question: "بتحب إيه أكتر: تقرا الكتاب || تتفرج علي الفيلم",
  },
  {
    language: "Egyptian",
    question: "بتحب إيه أكتر: المكالمات || الرسايل",
  },
  {
    language: "Egyptian",
    question: "بتحب افلام إيه أكتر : كوميديا || رعب",
  },
  {
    language: "Egyptian",
    question: "بتحب تتفرج على إيه أكتر: الغروب || الشروق",
  },
  {
    language: "Egyptian",
    question: "بتحب ايام أيه أكتر: أيام المطر || أيام الثلج",
  },
  {
    language: "Egyptian",
    question:
      "لو لقيت حاجة ساحرة، هتعمل إيه: هتخبيها عن الناس || هتشاركها مع الناس",
  },
  {
    language: "Egyptian",
    question:
      "لو ضعت على جزيرة فاضية، هتعمل إيه أول حاجة: تبني مأوى || تدور على اكل",
  },
  {
    language: "Egyptian",
    question:
      "لو أنت في بيت مسكون: هتستكشف وتشوف إيه جوا || هتحاول تطلع في أسرع وقت",
  },
  {
    language: "Egyptian",
    question: "لو لقيت اله زمن: هتروح للماضي || هتروح للمستقبل",
  },
  {
    language: "Egyptian",
    question:
      "لو أنت في سباق هتاخد انهي طريق: الطريق القصير الخطر || الطريق الطويل الأمن",
  },
  {
    language: "Egyptian",
    question: "لو جالك خريطة فيها اماكن كنوز مخفية: هتدور لوحدك || هتعمل فريق",
  },
  {
    language: "Egyptian",
    question:
      "لو واجهت دائرة زمنية لذكرى بتحبها: هتعيش فيها || هتحاول تطلع منها",
  },
  {
    language: "Egyptian",
    question:
      "لو لقيت مصل الحقيقه هتعمل ايه: هتستخدمه على الناس عشان تعرف أسرارهم || هتحترم خصوصيتهم",
  },
  {
    language: "Egyptian",
    question:
      "لو اتعرض عليك فرصة تقابل نفسك في المستقبل هتكون: متحمس إنك تقابل نفسك في المستقبل || خايف تقابل نفسك في المستقبل",
  },
  {
    language: "Egyptian",
    question: "لو ليك امنيه واحده هتستخدمها: لنفسك || عشان تغير بيها العالم",
  },
  {
    language: "Egyptian",
    question:
      "لو لاقيت عالم مخفي في لوحة: هتستكشف وتشوف إيه اللي فيها || هتتجاهلها وتعمل انك مش شايف حاجة",
  },
  {
    language: "Egyptian",
    question:
      "لو جالك رؤية عن المستقبل: هتحاول تمنعها || هتخلي الأحداث تجري بشكل طبيعي",
  },
  {
    language: "Egyptian",
    question:
      "لو شريك حياتك مضغوط: هتخطط لأمسية هادئة سوا || هتديهم مساحه يرتاح لوحده",
  },
  {
    language: "Egyptian",
    question:
      "لو صاحبك واقف أمام قرار صعب: هتديله اقتراحات من عندك || هتساعده بالاختيارات اللي هو مقترحها",
  },
  {
    language: "Egyptian",
    question:
      "لو حد في حياتك متألم من حدث: هتديه كلام يطمنه || هتظهر اهتمامك بالأفعال بدون كلام",
  },
  {
    language: "Egyptian",
    question:
      "لو شفت حد غريب بيبكي وعايز مساعدة: هتتقدمله وتقدمله مساعدة || هتديه خصوصية و مساحه عشان يتعامل مع مشاعره براحته",
  },
  {
    language: "Egyptian",
    question:
      "لو صاحبك تعرض لانفصال: هتقضي وقت معاه عشان تشغله || هتديه فرصة يعبر عن مشاعره براحته",
  },
  {
    language: "Egyptian",
    question:
      "لو وقعت في حب أقرب صديقه ليك: هتقوللهم عن مشاعرك || هتخبيها عشان تحافظ على الصداقة ومتخاطرش انك تخصرها",
  },
  {
    language: "Egyptian",
    question:
      "لو شريك حياتك نسي ذكرى مهمة: هتعاتبه || هتتفهم إنه كان من غير قصد و مش هتقوله حاجه",
  },
  {
    language: "Egyptian",
    question:
      "لو قابلت حد من ثقافة مختلفة: هتجرب عاداتهم عشان تفهمهم أكتر || هتلتزم بعداتك و معتقداتك",
  },
  {
    language: "Egyptian",
    question:
      "لو عرفت ان الشخص اللي انت معجب بيها واقعه في مشكلة: هتروح تكلمها انت الاول و تحاول تساعدها || هتستنى لحد ما هي تكلمك و تحكيلك",
  },
  {
    language: "Egyptian",
    question:
      "لو اكتشفت إن شريك حياتك عنده ماضي سري: هتسأله عنه || هتحترم خصوصيته لحد ما يكون جاهز يحكي عنه معاك",
  },
  {
    language: "Egyptian",
    question:
      "لو صديقتك القريبه معجبه بيك وأنت مش حاسس بحاجه نحيتها: هتتكلم معاها في الموضوع || هتعمل نفسك مش عارف عشان تحافظ على صداقتكم",
  },
  {
    language: "Egyptian",
    question:
      "لو شغل شريك حياتك طلب انه ينقل لبلد تانية: هتسافر معاهم || هتفضل مكانك و شغلك و تعيشوا في بلاد مختلفه",
  },
  {
    language: "Egyptian",
    question:
      "لو انت اعجبت بحد لسه متعرف عليه: تبين اهتمامك و انك معجب بيهم || هتستني لحد ما تعرفهم أكتر قبل ما تبين حاجه",
  },
  {
    language: "Egyptian",
    question:
      "لو الشخص اللي انت مرتبط بيه حاسس انه مش جاهز ياخد خطوه جاده: هتديهم مساحة لحد ما يكونوا جاهزين || هتبدأ تتكلم معاهم في الموضوع و عن المستقبل",
  },
  {
    language: "Egyptian",
    question:
      "لو أنت و الشخص اللي معاك في علاقه عندكم أهداف حياتية مختلفة: هتدوا فرصة لعلاقتكم برضه || هتفكروا في انكم تنفصلوا و متكملوش",
  },
  {
    language: "Egyptian",
    question:
      "لو قابلت حد بيشاركك في كل الحاجات اللي بتحب تعملها: هتحاول تعبر عن إعجابك بيه || هتاخد وقت علشان تتأكد إنكم متوافقين في الجوانب التانية برضه",
  },
  {
    language: "Egyptian",
    question:
      "لو اهل الشخص اللي مرتبط بيه مش موافقين على علاقتكم: هتحاول تكسب رضاهم || هتدي اولويه لمشاعركم قبل مشاعر الاهل",
  },
  {
    language: "Egyptian",
    question:
      "لو الشخص اللي انفصلت عنه بيحاول يرجع تاني: هتديله فرصة تانية || هترفض بإحترام",
  },
  {
    language: "Egyptian",
    question:
      "لو شغل شريك حياتك مخليه مشغو علطول و متسبب في انكم بتقضوا وقت قليل مع بعض: هتفضل برضه تشجعه علي شغله || هتعبر انك محتاج تقضوا وقت اكتر سوا",
  },
  {
    language: "Egyptian",
    question: "تفضل شريك حياتك يكون: أصغر او أكبر منك || نفس سنك",
  },
  {
    language: "Egyptian",
    question:
      "لو شريك حياتك عنده علاقة قريبة مع صديق من جنس مختلف: هتطلب منه انه يقلل العلاقه دي مبينهم || هتثق في شريكك و هتحاول تقرب من صديقهم",
  },
  {
    language: "Egyptian",
    question:
      "لو إنت في علاقة مع زميل في شغل: هتخبي العلاقة من زملاءكم في الشغل ||  هتتجنب العلاقات في الشغل كلها",
  },
  {
    language: "Egyptian",
    question:
      "لو شريك حياتك محتار في قرار هيغير حياتهم وممكن يأثر على علاقتكم: هتشجعه ياخد القرار حتى لو كانت النتيجة إنكم هتكونوا في أماكن مختلفة || هتقول لهم مياخدوش الفرصة دي علشان متأثرش على علاقتكم",
  },
  {
    language: "Egyptian",
    question:
      "لو صديقك طلب منك نصيحة وقالك إنها سر: هتدي نصيحتك حتي لو مش متاكد و هتحتفظ بيها مبينكم و بس || هتسأل حد انت بتثق فيه عن النصيحة",
  },
  {
    language: "Egyptian",
    question:
      "لو لقيت شريك حياتك كذب عليك في كذبة صغيرة: هتروح تقوله انك عارف و تحاول تفهم || هتتصرف عادي وفي نفس الوقت تتابع سلوكهم",
  },
  {
    language: "Egyptian",
    question:
      "لو زميلك في الشغل طلب رأيك في موضوع حساس: هتقله رأيك بكل صراحة || هتتجنب شوية تفاصيل علشان متجرحهوش مع انها تفاصيل مهمه",
  },
  {
    language: "Egyptian",
    question:
      "لو حد غريب طلب منك مساعدة بس انت شاكك فيه: هتساعده || هترفض بأدب وتمشي",
  },
  {
    language: "Egyptian",
    question:
      "لو أقرب صاحب ليك بيحكي لك عن اشعه عن حد انت عارفه كويس: هتصدق صاحبك || تتاكد بنفسك من الشخص الي طالع عليه الاشعه",
  },
  {
    language: "Egyptian",
    question:
      "لو الشخص اللي انت معجب بيه بيستناك انت دايما اللي تبدا الكلام: هتفضل انت برضه اللي بتبدا الكلام || هتستني لحد ما هو اللي يبعت",
  },
  {
    language: "Egyptian",
    question:
      "لو عرضوا عليلك مسارين مختلفين في حياتك المهنية: هتختار الاستقرار في شغل مش بتحبه || هتختار الشغل اللي بتحبه الأقل استقرار و في ضغط اكثر",
  },
  {
    language: "Egyptian",
    question:
      "لو واجهك قرار تبدأ أسرة أو تركز على شغلك: هتبقي هي دي الاولويه بتاعتك || هتهتم بحياتك  المهنية و هتديها الاولويه",
  },
  {
    language: "Egyptian",
    question:
      "لو عندك فرصة تعيش للأبد: هتختار تعيش حياة خالدة || تفضل فترة حياة طبيعية",
  },
  {
    language: "Egyptian",
    question:
      "لو اتعرض عليك انك تشوف لمحه عن حياتك العاطفية المستقبلية: هتقبل و تتفرج بفضول || هترفض و هتخلي القصه تمشي بشكل طبيعي",
  },
  {
    language: "Egyptian",
    question:
      "لو قدامك اختيار ما بين النجاح الفوري دلوقتي ولا النجاح التدريجي في المستقبل: النجاح الفوري || النجاح التدريجي",
  },
  {
    language: "Egyptian",
    question: "لو انت في حفلة فيها كاريوكي: هتشارك وتغني || هتتفرج و مش هتشارك",
  },
  {
    language: "Egyptian",
    question:
      "لو طلبوا منك تكون دي جي في حفلة في بيت صاحبك: هتوافق على الدور || هتحس بضغط وترفض",
  },
  {
    language: "Egyptian",
    question:
      "لو الشخص اللي عجبك عمال يعاكس فيك بس انت مش متأكد: هترد و تعاكس انت كمان || هتتجاهل لحسان تكون فهمت غلط و يحصل سوء تفاهم",
  },
  {
    language: "Egyptian",
    question:
      "لو انت وصاحبك في رحله و مطرين تناموا في نفس السرير: هتناموا مرتاحين جمب بعض || هتحس بالإحراج والإزعاج",
  },
  {
    language: "Egyptian",
    question:
      "في نقاش، هتعبر عن مشاعرك حتى لو كانت تؤذي الشخص التاني ولا هتحتفظ علشان متجرحهوش",
  },
  {
    language: "Egyptian",
    question:
      "لو انت بتتخانق: هتقول اللي في بالك حتي لو هتجرح الشخص التاني || هتسكت علشان متجرحوش",
  },
  {
    language: "Egyptian",
    question:
      "ايه شعورك تجاه الفشل هل هو: فرصة تتعلم منها || حاجه بتحاول تتجنبها",
  },
  {
    language: "Egyptian",
    question: "إزاي بتقيس نجاحك: بالإنجازات || بالإحساس بالرضا الشخصي",
  },
  {
    language: "Egyptian",
    question:
      "لو نسيت اسم حد و هو بيكلمك: هتسأله عليه تاني || هتحاول تكمل الحوار من غير ما تستخدم اسمه",
  },
  {
    language: "Egyptian",
    question:
      "لو انت شاورت لحد بيشاورلك و طلع مش بيشاورلك انت اساسن: هتضحك وتمشي عادي || هتحس بالاحراج",
  },
  {
    language: "Egyptian",
    question:
      "لو الشخص اللي انت معجب بيه بصلك و انت عمال تبصلهم: هتضحك و تسلم عليهم ||هتودي وشك الناحيه التانيه بسرعه و تبقي محرج",
  },
  {
    language: "Egyptian",
    question:
      "لو عملت لايك بالغلط لصوره قديمه للشخص اللي انت معجب بيه: هتشيل اللايك بسرعه || هتسبها و تقول يارب مايخدش باله",
  },
  {
    language: "Egyptian",
    question:
      "لو دست على فستان العروسه في الفرح بالغلط: هتعتذر و تحاول تساعد في تصليحه || هتعمل نفسك ماتش بالك و تكمل عادي",
  },
  {
    language: "Egyptian",
    question: "Underdressed || Overdressed :تفضل تبقي:",
  },
  {
    language: "Egyptian",
    question:
      "لو انت في حفله و لقيت أغنيتك المفضلة اشتغلت بس محدش بيرقص خالص: هتقوم ترقص برحتك و لا هيفرق معاك حاجه || هتتكسف تقوم علشان هتبقي لوحدك",
  },
  {
    language: "Egyptian",
    question: "تحب مكان فرحك يكون: في حته مقفوله || في الهواء في حته مفتوحه",
  },
  {
    language: "Egyptian",
    question:
      "في رقصتكم الأولى مع بعض و انتم في الفرح هتختار رقصتكم تكون: فيها حركات و دورانات || رقصة بسيطة من غير حركات",
  },
  {
    language: "Egyptian",
    question:
      "في رقصتكم الأولى في الفرح هتختار: أغنية رومانسية مشهوره || أغنية خاصه بيكم انتم الاتنين",
  },
  {
    language: "Egyptian",
    question:
      "لو انت مبيت مع صحابك هتختار: فيلم رعب عشان رعب بليل و كده || فيلم كوميدي عشان تضحكوا",
  },
  {
    language: "Egyptian",
    question: "لو عايز الناس تفتكرك بحاجة واحدة تحب تكون: طيبتك || ذكائك",
  },
  {
    language: "Egyptian",
    question: "“Formal لبس  || Casual لبس مريح و  :Date تختار تلبس ايه في اول",
  },
  {
    language: "Egyptian",
    question: "بتحب إيه أكتر: الصيف || الشتاء",
  },
  {
    language: "Egyptian",
    question: "بتحب تاكل أي نوع ايسكريم: شوكولاتة || فانيليا",
  },
  {
    language: "Egyptian",
    question:
      "تحب تشوف إيه أكتر: شروق الشمس على البحر || النجوم و السماء في الليل",
  },
  {
    language: "Egyptian",
    question:
      "لو كنت بطل خارق تحب تكون عندك القدرة إنك: تطير بسرعة الحلزون || تجري بسرعه السلحفاه",
  },
  {
    language: "Egyptian",
    question: "تحب يجيلك ايه : رسالة حب مكتوبة باليد || هدية مفاجأة",
  },
  {
    language: "Egyptian",
    question: "تحب إيه اكتر: تروحوا date فجئة || date رومانسي متخطط",
  },
  {
    language: "Egyptian",
    question: "تحب إيه اكتر تروحوا: date فجئة || date رومانسي متخططله",
  },
  {
    language: "Egyptian",
    question:
      "لو كلمت حد مش قريب ليك بالغلط و أقفلت علي طول وبعدين رجع اتصل بيك في سعتها هتعمل ايه: هتقول له إنك اتصلت بالغلط ||  هتكمل كلام عادي من غير ما تجيب سيره الموضوع",
  },
  {
    language: "Egyptian",
    question: "أنت شخص بيحيب إيه أكتر: القهوة || الشاي",
  },
  {
    language: "Egyptian",
    question: "هتحس بالأمان أكتر و انت بتلمس: أسد || ثعبان",
  },
  {
    language: "Egyptian",
    question:
      "تختار تقضي يوم كامل: مع أصحابك في بيت مسكون || في غرفة فاضية لوحدك",
  },
  {
    language: "Egyptian",
    question:
      "في اول date تحب ايه اكتر: عشاء في مطعم راقي || عشاء في مكان لطيف و بسيط",
  },
  {
    language: "Egyptian",
    question:
      "أنت تفضل إيه في اول date: نتقابل و نمشي سوا للمكان  || كل واحد يتحرك من مكانه و نتقابل هناك",
  },
  {
    language: "Egyptian",
    question:
      "بتفضل ايه في الdates: نقسم الفاتورة مابينا || كل مره واحد فينا يدفع",
  },
  {
    language: "Egyptian",
    question:
      "في أول date تفضل إيه: نشارك وجبة ونجرب أكل من بعض || كل واحد ياكل من الاكل الي طلبه",
  },
  {
    language: "Egyptian",
    question: "في أول date تحب إيه: مكان زحمه وحيوي || مكان هادي ومريح",
  },
  {
    language: "Egyptian",
    question:
      "في أول date تحب إيه: date قصير ولطيف || date طويل عشان تعرفوا بعض اكثر",
  },
  {
    language: "Egyptian",
    question:
      "بعد أول date تحب انك: تبعت رساله الاول للشخص اللي كان معاك في ال date || تستنى الشخص الاخر هو اللي يبعت الاول",
  },
  {
    language: "Egyptian",
    question:
      "تحب تسلم علي ال date بتاعك ازاي في اخر اول date: هتسلم عليهم او تديهم حضن || هتسيب القرار للشخص التاني",
  },
];

for (let i = 0; i < questions.length; i++) {
  axios
    .post("http://localhost:3003/question", {
      question: questions[i].question,
      language: questions[i].language,
    })
    .then((resp) => console.log(resp))
    .catch((error) => console.log(error));
}

app.listen(3004);
