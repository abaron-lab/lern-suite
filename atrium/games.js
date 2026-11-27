'use strict';

const adventures=[
  {id:'water',name:'Wasser für Rom',goal:5,days:7,text:'Drehe die Leitungen und bringe Quellwasser zur Zisterne.'},
  {id:'market',name:'Markttag am Forum',goal:10,days:20,text:'Bezahle deinen Einkauf mit möglichst wenigen römischen Münzen.'},
  {id:'mirror',name:'Das verlorene Muster',goal:15,days:35,text:'Ergänze die fehlenden Steine im Spiegelmosaik.'},
  {id:'ship',name:'Im Hafen von Ostia',goal:20,days:55,text:'Steuere dein Handelsschiff durch die Untiefen bis zum Hafen.'},
  {id:'stage',name:'Hinter dem Vorhang',goal:25,days:80,text:'Finde die Requisitenpaare für eine römische Aufführung.'},
  {id:'festival',name:'Dein Fest in Rom',goal:30,text:'Lass deinen Festzug durchs Forum ziehen und öffne deine Kursurkunde.'}
];
const sealCount=()=>Object.keys(state.seals||{}).length;
function canPlay(a){return sealCount()>=a.goal||(a.days&&earnedDays(8).length>=a.days)}
function openAdventures(){return adventures.filter(canPlay).map(a=>a.id)}
function adventureArt(a){return '<span class="game-cover cover-'+a.id+'" aria-hidden="true"></span>'}
function arcadeSection(){
  const days=earnedDays(8).length, seals=sealCount();
  const cards=adventures.map(a=>{
    const open=canPlay(a);
    const requirement=open?(state.gameWins?.[a.id]?'Schon gemeistert':'Spiel freigeschaltet'):(a.days?a.goal+' Siegel oder '+a.days+' Tagesziele':'Alle 30 Lektionssiegel');
    return '<article class="game-card">'+adventureArt(a)+'<div><small>'+requirement+'</small><h3>'+a.name+'</h3><p>'+a.text+'</p>'+(open?rewardButton(a.id==='festival'?'Fest beginnen':'Spielen','game:'+a.id,'soft'):'')+'</div></article>';
  }).join('');
  return '<div class="section-heading"><h2>Große Belohnungen</h2></div><p class="gallery-lead">Nach dem Wagenrennen warten diese Abenteuer. Du hast '+count(seals,'Lektionssiegel','Lektionssiegel')+' und '+count(days,'Tagesziel','Tagesziele')+' mit acht Aufgaben erreicht.</p><div class="game-shelf">'+cards+'</div>';
}
let game=null;
const roll=max=>Math.floor(Math.random()*max);
const againGame=()=>rewardButton('Noch einmal spielen','game:'+game.id);
const control=(label,op,extra='soft')=>rewardButton(label,'move:'+op,extra);
function startBonus(id){
  const info=adventures.find(a=>a.id===id);
  if(!info||!canPlay(info))return;
  game={id,note:'',finished:false};
  if(id==='water'){
    // Indices run in reading order. The water enters from the west and exits to the east.
    const routes=[[0,1,4,3,6,7,8],[0,3,4,1,2,5,8],[0,3,6,7,4,5,8]];
    const path=routes[roll(routes.length)];
    game.pipes=Array.from({length:9},()=>[0,2]);game.wet=[];
    path.forEach((n,i)=>{
      const before=i?path[i-1]-n:-1, after=i+1<path.length?path[i+1]-n:1;
      const dir=d=>({'-3':0,'1':1,'3':2,'-1':3})[d];
      game.pipes[n]=[dir(before),dir(after)];
    });
    game.pipes=game.pipes.map(pair=>{const shift=roll(4);return pair.map(n=>(n+shift)%4)});
    if(waterFlow().reached)game.pipes[0]=game.pipes[0].map(n=>(n+1)%4);
  }else if(id==='market'){
    game.targets=mixed([7,10,14,18,21,23,26,29]).slice(0,3);game.turn=0;game.coins=[];
  }else if(id==='mirror'){
    game.designs=Array.from({length:6},()=>roll(6));game.guesses=[];game.sockets=mixed([0,1,2,3,4,5]).slice(0,3);
  }else if(id==='ship'){
    const charts=[
      {rocks:[1,6,8,13,16,18,21],start:0,cargo:12,port:24},
      {rocks:[2,7,10,14,17,22],start:4,cargo:20,port:24},
      {rocks:[0,5,7,11,13,16,17],start:20,cargo:4,port:24}
    ];
    Object.assign(game,charts[roll(charts.length)]);game.pos=game.start;game.loaded=false;game.moves=0;
  }else if(id==='stage'){
    game.deck=mixed([0,0,1,1,2,2,3,3,4,4,5,5]);game.turned=[];game.matched=[];game.tries=0;
  }else if(id==='festival'){game.emblem=Number(state.festivalEmblem)||0}
  drawBonus();
}
function waterFlow(){
  const wet=[],seen=new Set();let cell=0,entry=3;
  while(cell>=0&&cell<9&&!seen.has(cell)){
    seen.add(cell);
    const pipe=game.pipes[cell];if(!pipe.includes(entry))break;
    wet.push(cell);const exit=pipe.find(d=>d!==entry);
    if(cell===8&&exit===1)return {wet,reached:true};
    if((exit===1&&cell%3===2)||(exit===3&&cell%3===0))break;
    cell+=[-3,1,3,-1][exit];entry=(exit+2)%4;
  }
  return {wet,reached:false};
}
function waterBoard(){
  const dirs=['oben','rechts','unten','links'];
  return '<p>Das Wasser kommt oben links von Westen. Unten rechts soll es nach Osten herausfließen. Tippe auf einen Stein, um ihn um 90° zu drehen.</p><div class="pipe-frame"><small>Quelle · Zufluss von links</small><div class="pipe-board">'+game.pipes.map((p,i)=>'<button class="pipe '+(game.wet.includes(i)?'wet':'')+'" aria-label="Stein '+(i+1)+', offen nach '+p.map(d=>dirs[d]).join(' und ')+'; drehen" data-prize="move:pipe:'+i+'"><i></i>'+p.map(d=>'<b class="arm arm-'+d+'"></b>').join('')+'</button>').join('')+'</div><small>Zisterne · Auslauf rechts</small></div>'+control('Wasser marsch!','flow','btn');
}
function marketBoard(){
  const total=game.coins.reduce((a,b)=>a+b,0),target=game.targets[game.turn];
  const least=Math.floor(target/16)+Math.floor(target%16/4)+target%4;
  return '<div class="eyebrow">Einkauf '+(game.turn+1)+' von 3</div><h3>'+['Ein Korb Oliven','Eine neue Öllampe','Stoff vom Markt'][game.turn]+'</h3><p>Der Spielpreis beträgt '+target+' Asse. Bezahle genau mit höchstens '+least+' Münzen.</p><div class="coin-options">'+[[1,'As'],[4,'Sesterz'],[16,'Denar']].map(([n,t])=>'<button data-prize="move:coin:'+n+'" class="coin-btn"><b>'+n+'</b>'+t+'</button>').join('')+'</div><p class="ledger">'+total+' / '+target+' Asse · '+count(game.coins.length,'Münze','Münzen')+' gelegt</p><div class="actions">'+control('Bezahlen','pay','btn')+(game.coins.length?control('Letzte zurück','undo'):'')+'</div>';
}
function mirrorBoard(){
  let grid='';
  for(let r=0;r<3;r++)for(let c=0;c<4;c++){
    const source=r*2+(c<2?c:3-c),socket=c>=2?game.sockets.indexOf(source):-1;
    const missing=socket>=game.guesses.length;
    grid+='<div class="mirror-cell '+(c===2?'axis ':'')+(socket===game.guesses.length?'target':'')+'">'+(missing?(socket===game.guesses.length?'?':'·'):tileArt(game.designs[source]))+'</div>';
  }
  return '<p>Links ist das Muster erhalten. Welcher Stein gehört rechts an die goldene Markierung? Spiegle die Position an der Mittellinie.</p><div class="mirror-board">'+grid+'</div><div class="tile-options">'+mosaicDesigns.map((name,i)=>'<button class="tile-choice" data-prize="move:guess:'+i+'">'+tileArt(i)+name+'</button>').join('')+'</div>';
}
function shipBoard(){
  const cells=Array.from({length:25},(_,i)=>{
    const type=i===game.pos?'Schiff':game.rocks.includes(i)?'Fels':i===game.port?'Hafen':i===game.cargo&&!game.loaded?'Ladung':'Wasser';
    const icon={Schiff:'⛵',Fels:'◆',Hafen:'⚓',Ladung:'▣',Wasser:'·'}[type];
    return '<span class="sea-cell sea-'+type+'" aria-label="'+type+', Zeile '+(Math.floor(i/5)+1)+', Spalte '+(i%5+1)+'">'+icon+'</span>';
  }).join('');
  return '<p>Nimm die Ladung ▣ an Bord und bring sie zum Hafen ⚓. Die dunklen Felsen ◆ sind unpassierbar.</p><div class="sea-board" role="group" aria-label="Hafenkarte">'+cells+'</div><div class="sailing"><p>'+(game.loaded?'Ladung an Bord':'Laderaum leer')+' · '+count(game.moves,'Fahrtzug','Fahrtzüge')+'</p><div class="compass">'+['Norden','Westen','Süden','Osten'].map((d,i)=>control(d,'sail:'+i)).join('')+'</div></div>';
}
const props=[['☀','Sonne'],['♬','Leier'],['✿','Blume'],['♛','Krone'],['☾','Mond'],['✦','Stern']];
function stageBoard(){
  const cards=game.deck.map((n,i)=>{
    const seen=game.matched.includes(i)||game.turned.includes(i);
    return '<button class="prop-card '+(seen?'open':'')+'" '+(seen||game.turned.length===2?'disabled':'')+' aria-label="'+(seen?props[n][1]:'Karte '+(i+1)+' aufdecken')+'" data-prize="move:flip:'+i+'">'+(seen?'<span>'+props[n][0]+'</span><small>'+props[n][1]+'</small>':'?')+'</button>';
  }).join('');
  return '<p>Der Vorhang öffnet sich, sobald alle sechs Requisitenpaare beisammen sind. Decke jeweils zwei Karten auf.</p><div class="prop-grid">'+cards+'</div><p>'+game.matched.length/2+' / 6 Paare · '+count(game.tries,'Versuch','Versuche')+'</p>'+(game.turned.length===2?control('Karten umdrehen','hide','btn'):'');
}
const festivalMarks=['☀','✦','✿'];
function festivalBoard(){
  return '<div class="festival-banner">'+adventureArt(adventures[5])+'</div><h3>Alle 30 Siegel gehören dir.</h3><p>Wähle das Zeichen für deinen Festzug durch das Forum.</p><div class="actions">'+['Sonne','Stern','Blüte'].map((n,i)=>'<button class="soft emblem" aria-pressed="'+(game.emblem===i)+'" data-prize="move:emblem:'+i+'">'+festivalMarks[i]+' '+n+'</button>').join('')+'</div><div class="spaced">'+control('Den Festzug eröffnen','celebrate','btn')+'</div>';
}
function finishGame(message){
  game.finished=true;game.note=message;state.gameWins??={};state.gameWins[game.id]=(state.gameWins[game.id]||0)+1;
  save();playNotes([392,494,587,784]);if(getRoute()==='schatzkammer')render(false);
}
function drawBonus(){
  const a=adventures.find(v=>v.id===game?.id);if(!a)return;
  let body;
  if(game.finished){
    if(a.id==='festival'){
      body='<div class="course-diploma"><div class="parade-mark">'+festivalMarks[game.emblem]+'</div><div class="eyebrow">Atrium · ROMA A</div><h3>Urkunde</h3><p>Alle 30 Lektionschecks bestanden</p><strong>Optime fecisti!</strong><small>'+shortDay(state.courseFinished||today())+'</small></div><div class="actions">'+control('Urkunde drucken','print','btn')+rewardButton('Zum Lernweg','passport')+'</div>';
    }else body=adventureArt(a)+'<h3>Geschafft!</h3><p>'+game.note+'</p><div class="actions">'+rewardButton('Schließen','dismiss','btn')+againGame()+'</div>';
  }else{
    const boards={water:waterBoard,market:marketBoard,mirror:mirrorBoard,ship:shipBoard,stage:stageBoard,festival:festivalBoard};
    body=boards[a.id]()+'<p class="game-note" role="status">'+esc(game.note)+'</p>';
  }
  showDialog(dialogTitle(a.name)+'<div class="bonus-game">'+body+'</div>');
}
function bonusMove(op,arg){
  if(!game)return;
  if(game.finished){if(game.id==='festival'&&op==='print')window.print();return}
  const n=Number(arg);game.note='';
  if(game.id==='water'){
    if(op==='pipe'&&game.pipes[n]){game.pipes[n]=game.pipes[n].map(d=>(d+1)%4);game.wet=[]}
    if(op==='flow'){const flow=waterFlow();game.wet=flow.wet;if(flow.reached)finishGame('Das Wasser fließt von der Quelle bis in die Zisterne. Rom hat wieder frisches Wasser!');else game.note=flow.wet.length?'Bis zum letzten blauen Stein ist die Leitung dicht. Prüfe dort den Anschluss.':'Die Quelle trifft noch keine Öffnung. Prüfe den oberen linken Stein.'}
  }else if(game.id==='market'){
    if(op==='coin'&&[1,4,16].includes(n)&&game.coins.length<30)game.coins.push(n);
    if(op==='undo')game.coins.pop();
    if(op==='pay'){
      const target=game.targets[game.turn],sum=game.coins.reduce((a,b)=>a+b,0),least=Math.floor(target/16)+Math.floor(target%16/4)+target%4;
      if(sum!==target)game.note=sum<target?'Es fehlen noch '+(target-sum)+' Asse.':'Du hast '+(sum-target)+' Asse zu viel gelegt.';
      else if(game.coins.length>least)game.note='Der Betrag stimmt. Tausche kleine Münzen gegen größere, um mit weniger Münzen zu zahlen.';
      else if(++game.turn===3)finishGame('Alle drei Einkäufe sind bezahlt. Du kennst dich mit As, Sesterz und Denar aus!');else{game.coins=[];game.note='Genau bezahlt! Dein nächster Einkauf wartet.'}
    }
  }else if(game.id==='mirror'&&op==='guess'&&mosaicDesigns[n]){
    if(n===game.designs[game.sockets[game.guesses.length]]){game.guesses.push(n);if(game.guesses.length===3)finishGame('Alle drei Lücken sind gefüllt. Das Spiegelmuster des Fußbodens ist wieder vollständig.')}
    else game.note='Schau in derselben Reihe links der Mittellinie. Zähle von der Mitte aus.';
  }else if(game.id==='ship'&&op==='sail'&&n>=0&&n<4){
    const from=game.pos,to=from+[-5,-1,5,1][n],outside=to<0||to>24||(n===1&&from%5===0)||(n===3&&from%5===4);
    if(outside||game.rocks.includes(to))game.note=outside?'Hier endet die Karte.':'Hier liegt ein Felsen. Nimm einen anderen Kurs.';
    else{game.pos=to;game.moves++;if(to===game.cargo){game.loaded=true;game.note='Die Fracht ist an Bord!'}if(to===game.port){if(game.loaded)finishGame('Dein Schiff hat die Ladung in '+game.moves+' Fahrtzügen sicher in den Hafen gebracht.');else game.note='Der Hafenmeister wartet auf die Ladung ▣.'}}
  }else if(game.id==='stage'){
    if(op==='hide'&&game.turned.length===2)game.turned=[];
    if(op==='flip'&&Number.isInteger(n)&&n>=0&&n<12&&!game.matched.includes(n)&&!game.turned.includes(n)&&game.turned.length<2){
      game.turned.push(n);if(game.turned.length===2){game.tries++;const [a,b]=game.turned;if(game.deck[a]===game.deck[b]){game.matched.push(a,b);game.turned=[];if(game.matched.length===12)finishGame('Der Vorhang geht auf! Du hast die sechs Requisitenpaare in '+game.tries+' Versuchen gefunden.');else game.note='Ein passendes Paar!'}else game.note='Präge dir die Plätze ein und drehe die Karten wieder um.'}
    }
  }else if(game.id==='festival'){
    if(op==='emblem'&&festivalMarks[n])game.emblem=n;
    if(op==='celebrate'){state.festivalEmblem=game.emblem;finishGame('Alle Lektionen abgeschlossen.')}
  }
  drawBonus();
}
