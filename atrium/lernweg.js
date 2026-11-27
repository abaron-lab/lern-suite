'use strict';

let passBand=null;
function chapterNote(n){
  const note=lessonNotes[n-1];
  return '<article class="lesson-note"><div class="eyebrow">'+ic('book')+' Merkkarte · L'+n+'</div><h3>'+esc(lessons[n-1])+'</h3><p>'+esc(note.rule)+'</p><blockquote><strong lang="la">'+esc(note.example)+'</strong><span>'+esc(note.translation)+'</span></blockquote><p>'+esc(note.tip)+'</p></article>';
}
function inspectChapter(n){
  if(!Number.isInteger(n)||n<1||n>30)return;
  const passed=state.seals?.[n];
  showDialog(dialogTitle('L'+n+' · '+lessonTitles[n-1])+chapterNote(n)+
    '<p>Beim Lektionscheck übst du vier Wörter und vier Grammatikaufgaben aus dieser Lektion. Ab sechs richtigen Antworten bekommst du dein Siegel.</p>'+
    (passed?'<p class="seal-info">'+ic('check')+' Siegel erhalten am '+shortDay(passed)+'</p>':'')+
    '<div class="actions">'+rewardButton('Lektionscheck starten','check:'+n,'btn')+rewardButton('Als Unterrichtslektion wählen','select:'+n)+'</div>');
}
function passport(){
  const band=passBand??(state.lesson>15?2:1),start=(band-1)*15;
  const cards=lessonTitles.slice(start,start+15).map((title,i)=>{
    const n=start+i+1,passed=state.seals?.[n];
    return '<button class="entry course-entry" data-prize="chapter:'+n+'"><span class="chapter-seal '+(passed?'earned':'')+'">'+(passed?ic('check'):n)+'</span><span><small>Lektion '+n+(n===state.lesson?' · Im Unterricht':'')+'</small><strong>'+esc(title)+'</strong><small>'+esc(lessons[n-1])+'</small></span></button>';
  }).join('');
  return intro('Dein Lektionspass','Wähle eine Geschichte, lies die Merkkarte und sammle dein Lektionssiegel.')+
    '<section class="sheet course-status"><div><div class="eyebrow">Dein Kursstand</div><h2>'+sealCount()+' von 30 Siegeln</h2><p>Sechs richtige Antworten in einem Lektionscheck bringen dir ein Siegel. Du kannst überall einsteigen.</p></div>'+rewardButton('Zu L'+state.lesson+' · '+lessonTitles[state.lesson-1],'chapter:'+state.lesson,'btn')+'</section>'+
    '<div class="section-heading"><h2>Die Lektionen</h2></div><div class="actions pass-tabs">'+[1,2].map(b=>'<button class="soft" aria-pressed="'+(b===band)+'" data-prize="band:'+b+'">'+(b===1?'Lektionen 1–15':'Lektionen 16–30')+'</button>').join('')+'</div><div class="library">'+cards+'</div>';
}
function recordRound(s){
  const score=s.questions.reduce((total,q,i)=>total+(s.answers[i]===q.answer?1:0),0);
  const round={title:s.title,n:s.questions.length,score,date:today()};
  if(s.checkLesson){
    round.checkLesson=s.checkLesson;round.passed=score>=6;
    if(round.passed){
      state.seals??={};
      if(!state.seals[s.checkLesson]){
        const before=openAdventures();
        state.seals[s.checkLesson]=today();round.newSeal=true;
        round.unlocked=openAdventures().filter(id=>!before.includes(id));
        if(sealCount()===30)state.courseFinished=today();
      }
    }
  }
  state.rounds.push(round);
}
function checkResult(r){
  if(!r.checkLesson)return '';
  const n=r.checkLesson;
  const games=(r.unlocked||[]).map(id=>{const a=adventures.find(g=>g.id===id);return rewardButton('Neu · '+a.name,'game:'+id,'btn')}).join('');
  return '<div class="check-result"><strong>'+(r.passed?(r.newSeal?'Neues Siegel für Lektion '+n+'!':'Lektionscheck erneut bestanden.'):'Für dein Siegel brauchst du sechs richtige Antworten.')+'</strong><div class="actions">'+games+rewardButton(r.passed?'Zum Lektionspass':'Merkkarte ansehen',r.passed?'passport':'chapter:'+n)+'</div></div>';
}
