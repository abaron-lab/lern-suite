'use strict';

const treasures = [
  ['nummus', 'Die Münze', 'Dreh den Fund in Gedanken um. Auf römischen Münzen konnte vorn ein Kaiserporträt und hinten eine Gottheit zu sehen sein.'],
  ['lucerna', 'Die Öllampe', 'Wo käme hier die Flamme heraus? Aus der kleinen Schnauze ragte ein Docht. Das Öl im Bauch der Lampe speiste die Flamme.'],
  ['amphora', 'Die Amphore', 'Schon an den Henkeln erkennst du das Transportgefäß. Amphoren brachten unter anderem Wein und Olivenöl über das Mittelmeer.'],
  ['fibula', 'Die Gewandspange', 'Eine antike Sicherheitsnadel! Mit der Nadel auf der Rückseite ließ sich ein Umhang über der Schulter feststecken.'],
  ['tabula cerata', 'Die Wachstafel', 'Ein römisches Schulheft zum Wiederverwenden. Mit der Spitze eines Griffels ritzte man Wörter ins Wachs. Mit dem flachen Ende strich man sie wieder glatt.'],
  ['lyra', 'Die Leier', 'Die Saiten laufen über den Klangkörper. Wer sie anzupft, versetzt ihn in Schwingung und macht den Ton hörbar.'],
  ['corona laurea', 'Der Lorbeerkranz', 'Die Blätter gehören zum Lorbeer. Im alten Rom war ein Kranz daraus ein Zeichen der Ehre, etwa beim Triumphzug eines Feldherrn.'],
  ['opus tessellatum', 'Das Mosaik', 'Schau dir eine Farbe aus der Nähe an. Viele kleine Steinchen bilden zusammen ein Muster, ähnlich wie Bildpunkte auf deinem Bildschirm.'],
  ['vitrum', 'Das Glasfläschchen', 'Römische Glasmacher konnten mit einer langen Pfeife Luft in heißes Glas blasen. So wurde aus einem glühenden Klumpen ein hohles Gefäß.']
];
const signs = [
  {name:'Sonne',icon:'sun'}, {name:'Tempel',icon:'temple'}, {name:'Flamme',icon:'flame'}
];
let race = null;
let instrument;
function soundControl(){
  return '<button class="sound-control" data-prize="sound" aria-pressed="'+Boolean(state.rewardSound)+'">♫ Klang '+(state.rewardSound?'an':'aus')+'</button>';
}
function playNotes(notes){
  if(!state.rewardSound)return;
  const AudioEngine=window.AudioContext||window.webkitAudioContext;
  if(!AudioEngine)return;
  try{
    instrument??=new AudioEngine();
    instrument.resume().then(()=>{
      const start=instrument.currentTime;
      notes.forEach((pitch,i)=>{
        const tone=instrument.createOscillator(), volume=instrument.createGain();
        const when=start+i*.14;
        tone.type='triangle';tone.frequency.value=pitch;
        volume.gain.setValueAtTime(.0001,when);
        volume.gain.exponentialRampToValueAtTime(.065,when+.018);
        volume.gain.exponentialRampToValueAtTime(.0001,when+.28);
        tone.connect(volume);volume.connect(instrument.destination);
        tone.start(when);tone.stop(when+.30);
        tone.onended=()=>{tone.disconnect();volume.disconnect()};
      });
    }).catch(()=>{});
  }catch{}
}

function earnedDays(goal){
  return Object.keys(state.days).filter(day=>state.days[day]>=goal).sort();
}
function foundIndex(day){
  const position=earnedDays(4).indexOf(day);
  return position;
}
function rewardButton(text,action,cls='soft'){
  return '<button class="'+cls+'" data-prize="'+esc(action)+'">'+esc(text)+'</button>';
}
function treasureArt(index){
  return '<span class="treasure-art atlas-'+Math.floor(index/9)+'" aria-hidden="true" style="--col:'+(index%3)*50+'%;--row:'+Math.floor(index%9/3)*50+'%"></span>';
}
function rewardOverview(){
  const done=state.days[today()]||0;
  const afterMuseum=earnedDays(4).filter(d=>d!==today()).length>=treasures.length;
  const next=done<4?'Noch '+count(4-done,'Aufgabe','Aufgaben')+(afterMuseum?' bis zum Mosaikfeld.':' bis zum Fundstück.'):done<8?'Noch '+count(8-done,'Aufgabe','Aufgaben')+' bis zum Wagenrennen.':'Beide Tagesbelohnungen sind frei.';
  return '<section class="reward-banner"><div class="reward-symbol">'+treasureArt(0)+'</div><div><div class="eyebrow">Deine Belohnungen</div><h2>Römische Schatzkammer</h2><p>'+next+'</p></div><a class="soft" href="#schatzkammer">Schatzkammer öffnen</a></section>';
}
function rewardMilestone(){
  const n=state.days[today()]||0;
  if(n!==4&&n!==8)return '';
  const mosaic=foundIndex(today())>=treasures.length;
  const bonus=n===8?adventures.find(a=>a.days===earnedDays(8).length&&sealCount()<a.goal):null;
  if(bonus)return '<aside class="milestone"><span>'+ic('sun')+' <strong>Neu freigeschaltet · '+bonus.name+'</strong></span>'+rewardButton('Spiel öffnen','game:'+bonus.id,'textbtn')+'</aside>';
  const title=n===4?(mosaic?'Ein Mosaikfeld für dich!':'Ein Fundstück für dich!'):'Dein Wagenrennen ist frei!';
  return '<aside class="milestone"><span>'+ic(n===4?'sun':'flame')+' <strong>'+title+'</strong></span>'+rewardButton(n===4?(mosaic?'Muster wählen':'Fund aufdecken'):'Zum Rennen',(n===4?'find:':'race:')+today(),'textbtn')+'</aside>';
}
function collection(){
  const finds=earnedDays(4), races=earnedDays(8), opened=state.openedFinds||{}, wins=state.raceBest||{};
  const pending=finds.find((d,i)=>i<treasures.length?!opened[d]:state.mosaicFloor?.[d]===undefined);
  const mosaic=pending?foundIndex(pending)>=treasures.length:finds.length>=treasures.length;
  return intro('Deine Schatzkammer','Entdecke römische Fundstücke und schalte neue Spiele auf deinem Lernweg frei.')+
    '<div class="reward-hub"><section class="sheet"><div class="eyebrow">'+ic('sun')+' Nach 4 Aufgaben</div><h2>'+(mosaic?'Die Mosaikvilla':'Die Ausgrabung')+'</h2><p>'+(pending?(mosaic?'Ein neues Mosaikfeld wartet auf dein Muster.':'Ein römisches Fundstück wartet aufs Aufdecken.'):(mosaic?'Dein nächster Fundtag bringt ein neues Feld.':'Sammle 45 Fundstücke aus fünf Themenwelten.'))+'</p>'+
    (pending?rewardButton(mosaic?'Muster wählen':'Fund aufdecken','find:'+pending,'btn'):'<a class="soft" href="#uebersicht">Zum Lernraum</a>')+'</section>'+
    '<section class="sheet arena-card"><div class="eyebrow">'+ic('flame')+' Nach 8 Aufgaben</div><h2>Im Circus Maximus</h2><p>Merke dir die Zeichen und lenke deinen Wagen durch drei Kurven.</p>'+
    (races.length?rewardButton('Wagenrennen starten','race:'+races.at(-1),'btn'):'<span class="smalltag">Noch '+Math.max(0,8-(state.days[today()]||0))+' Aufgaben</span>')+'</section></div>'+
    arcadeSection()+cabinetGallery(finds)+floorGallery(finds)+
    (races.length?'<div class="section-heading"><h2>Deine Rennstrecken</h2></div><div class="library">'+races.slice().reverse().map(d=>'<button class="entry" data-prize="race:'+d+'"><strong>'+shortDay(d)+'</strong><span>'+(wins[d]===undefined?'Strecke entdecken':wins[d]+' / 3 Kurven auf Anhieb')+'</span></button>').join('')+'</div>':'');
}
function shortDay(d){return new Date(d+'T12:00:00').toLocaleDateString('de-DE',{day:'numeric',month:'long',year:'numeric'})}
function reveal(day){
  const index=foundIndex(day);
  if(index<0)return;
  if(index>=treasures.length){mosaicDialog(day);return}
  cabinetView=Math.floor(index/9);
  const [latin,title,fact]=treasures[index];
  const fresh=!state.openedFinds?.[day];
  state.openedFinds??={};state.openedFinds[day]=true;save();
  if(getRoute()==='schatzkammer')render(false);
  showDialog(dialogTitle(fresh?'Fund aufgedeckt!':'Dein Fundstück')+
    '<div class="artifact-reveal '+(fresh?'sparkle':'')+'">'+treasureArt(index)+'</div>'+
    '<div class="eyebrow">Ausgrabung vom '+shortDay(day)+'</div><h3 class="artifact-title">'+title+'</h3><i lang="la">'+latin+'</i><p>'+fact+'</p>'+
    '<div class="actions">'+rewardButton(getRoute()==='training'?'Weiterlernen':'Schließen','dismiss','btn')+
    (getRoute()==='schatzkammer'?'':rewardButton('Zur Sammlung','collection'))+'</div>'+soundControl());
  if(fresh)playNotes([392,494,587,784]);
}
function trackForDay(day){
  let seed=Number(day.replaceAll('-',''));
  function pick(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return Math.floor(seed/4294967296*signs.length)}
  return [2,3,4].map(length=>Array.from({length},pick));
}
function startRace(day){
  if(!earnedDays(8).includes(day))return;
  race={day,curves:trackForDay(day),turn:0,step:0,clean:0,mistake:false,phase:'preview'};
  drawRace();
}
function signPill(index){const s=signs[index];return '<span class="gate">'+ic(s.icon)+s.name+'</span>'}
function drawRace(){
  const {turn,phase,step,curves,day}=race,finished=phase==='finish';
  const progress=finished?100:Math.round((turn+(phase==='passed'?1:step/curves[turn].length))/3*100);
  const art='<div class="arena-view"><div class="arena-label">Circus Maximus</div></div><div class="race-meter" aria-label="'+progress+' Prozent der Strecke"><i style="width:'+progress+'%"></i></div>';
  let content='';
  if(finished){
    content='<h3>Ziel erreicht!</h3><p>Du hast '+count(race.clean,'Kurve','Kurven')+' von drei auf Anhieb geschafft. Dein Rekord auf dieser Strecke liegt bei '+state.raceBest[day]+' von drei.</p>'+
    '<div class="actions">'+rewardButton(getRoute()==='training'?'Zurück zur Aufgabe':'Rennen beenden','dismiss','btn')+rewardButton('Noch eine Fahrt','race:'+day)+'</div>';
  }else if(phase==='preview'||phase==='retry'){
    const retry=phase==='retry';
    content='<div class="eyebrow">Kurve '+(turn+1)+' / 3</div><h3>'+(retry?'Noch einmal in die Kurve':'Präge dir die Tore ein')+'</h3><p>'+(retry?'Schau dir die Reihenfolge noch einmal an.':'Diese Zeichen stehen an der Strecke. Merke sie dir von links nach rechts.')+'</p><div class="gates">'+curves[turn].map(signPill).join('')+'</div>'+rewardButton('Ich bin bereit','drive','btn');
  }else if(phase==='drive'){
    content='<div class="eyebrow">Kurve '+(turn+1)+' / 3</div><h3>Durch welches Tor fährst du?</h3><p>Wähle Zeichen '+(step+1)+' von '+curves[turn].length+' aus dem Gedächtnis.</p><div class="gates">'+signs.map((s,i)=>'<button class="soft gate-control" data-prize="gate:'+i+'">'+ic(s.icon)+s.name+'</button>').join('')+'</div>';
  }else{
    content='<div class="eyebrow">Kurve '+(turn+1)+' / 3</div><h3>Kurve geschafft!</h3><p>Dein Gespann hat alle Tore in der richtigen Reihenfolge passiert.</p>'+rewardButton(turn===2?'Über die Ziellinie':'Zur nächsten Kurve','turn','btn');
  }
  showDialog(dialogTitle('Das Wagenrennen')+art+'<div class="race-content" aria-live="polite">'+content+'</div>'+soundControl());
  const target=dlg.querySelector('.race-content button');
  target?.focus({preventScroll:true});
}
function chooseGate(i){
  if(!race||race.phase!=='drive')return;
  playNotes([[392],[494],[587]][i]||[]);
  if(i!==race.curves[race.turn][race.step]){
    race.phase='retry';race.mistake=true;race.step=0;
  }else if(++race.step===race.curves[race.turn].length){
    race.phase='passed';
    if(!race.mistake)race.clean++;
  }
  drawRace();
}
function advanceTurn(){
  if(!race||race.phase!=='passed')return;
  race.turn++;race.step=0;race.mistake=false;
  if(race.turn===race.curves.length){
    race.phase='finish';playNotes([392,494,587,784]);state.raceBest??={};
    state.raceBest[race.day]=Math.max(state.raceBest[race.day]||0,race.clean);save();
    if(getRoute()==='schatzkammer')render(false);
  }else race.phase='preview';
  drawRace();
}
function handleReward(action){
  const [key,arg,detail]=action.split(':');
  if(key==='sound'){
    state.rewardSound=!state.rewardSound;save();
    const button=dlg.querySelector('.sound-control');
    if(button){button.textContent='♫ Klang '+(state.rewardSound?'an':'aus');button.setAttribute('aria-pressed',String(state.rewardSound))}
    if(state.rewardSound)playNotes([392,494]);
  }
  else if(key==='cabinet'&&exhibits[Number(arg)]){cabinetView=Number(arg);render(false);main.querySelector('[data-prize="cabinet:'+arg+'"]')?.focus({preventScroll:true})}
  else if(key==='room'){floorView=Number(arg);render(false)}
  else if(key==='tile')layTile(arg,Number(detail));
  else if(key==='game')startBonus(arg);
  else if(key==='move')bonusMove(arg,detail);
  else if(key==='chapter')inspectChapter(Number(arg));
  else if(key==='band'&&['1','2'].includes(arg)){passBand=Number(arg);render(false)}
  else if(key==='check'){modal.close();begin('check-'+arg)}
  else if(key==='select'){if(state.lesson!==Number(arg))discardSession();state.lesson=Number(arg);save();modal.close();go('uebersicht')}
  else if(key==='passport'){if(modal.open)modal.close();go('lernweg')}
  else if(key==='find')reveal(arg);
  else if(key==='race')startRace(arg);
  else if(key==='gate')chooseGate(Number(arg));
  else if(key==='turn')advanceTurn();
  else if(key==='drive'&&race&&['preview','retry'].includes(race.phase)){race.phase='drive';drawRace()}
  else if(key==='dismiss')modal.close();
  else if(key==='collection'){modal.close();go('schatzkammer')}
}
