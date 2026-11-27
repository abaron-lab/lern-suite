'use strict';

const raceDuration = 60;
const replayCost = 8;
const raceSpeed = 20;
let activeRace;

function cabinetFindCount(days, cabinet){
  return days.slice(cabinet*9, cabinet*9+9).filter(day=>state.openedFinds?.[day]).length;
}

function raceUnlockProgress(days=earnedDays(4)){
  return Math.max(...exhibits.map((_, cabinet)=>cabinetFindCount(days,cabinet)));
}

function raceCoins(){
  return state.raceCoins ?? 0;
}

function raceOffer(){
  const coins=raceCoins();
  const cost=state.raceStarted ? replayCost : 0;
  if(coins<cost){
    return '<p>Für die nächste Fahrt fehlen dir '+count(cost-coins,'Münze','Münzen')+'.</p>'+
      '<a class="soft" href="#uebersicht">Weiterlernen</a>';
  }
  return rewardButton(cost?'Wagenrennen fahren · 8 Münzen':'Erste Fahrt gratis','race','btn');
}

function raceCard(days){
  const found=raceUnlockProgress(days);
  return '<section class="sheet arena-card"><div class="eyebrow">'+ic('flame')+' Circus Maximus</div>'+
    '<div class="help-label"><h2>Wagenrennen</h2>'+helpLink('spiele')+'</div><p>Weiche auf drei Spuren den Hindernissen aus und fahr 60 Sekunden gegen zwei Gespanne.</p>'+
    (found<9
      ? '<p>Decke alle neun Fundstücke einer Themenvitrine auf.</p><span class="smalltag">'+found+' / 9 Fundstücke in deiner vollsten Vitrine</span>'
      : '<p><strong>'+count(raceCoins(),'Münze','Münzen')+'</strong> · Jede richtige Lernantwort bringt eine Münze.</p>'+
        (state.raceRecord ? '<p>Streckenrekord: '+state.raceRecord+' m</p>' : '')+raceOffer())+
    '</section>';
}

function startRace(){
  if(activeRace || raceUnlockProgress()<9)return;
  const cost=state.raceStarted ? replayCost : 0;
  if(raceCoins()<cost)return;

  state.raceCoins=raceCoins()-cost;
  state.raceStarted=true;
  save();
  render(false);
  showDialog(dialogTitle('Wagenrennen')+
    '<div class="race-hud"><strong data-race-time>1:00</strong><span data-race-place>Platz 1 / 3</span><span data-race-distance>0 m</span></div>'+
    '<canvas class="race-track" width="420" height="400" aria-label="Wagenrennen in Folgeansicht. Mit Links und Rechts die Spur wechseln."></canvas>'+
    '<div class="race-controls">'+rewardButton('← Links','race-left')+rewardButton('Rechts →','race-right')+'</div>'+
    '<p class="race-hint">Pfeiltasten oder Tasten unter der Strecke</p>');
  const canvas=dlg.querySelector('.race-track');
  activeRace={
    owner:state, canvas, ctx:canvas.getContext('2d'), elapsed:0, distance:0,
    lane:0, position:0, nextObstacle:36, slow:0, hits:0, obstacles:[],
    rivals:[{speed:19.65,lane:-1,color:'#6299bb'},{speed:19.15,lane:1,color:'#73a878'}],
    timeLabel:dlg.querySelector('[data-race-time]'), placeLabel:dlg.querySelector('[data-race-place]'),
    distanceLabel:dlg.querySelector('[data-race-distance]')
  };
  dlg.querySelector('[data-prize="race-left"]').focus({preventScroll:true});
  drawRaceTrack(activeRace);
  activeRace.frame=requestAnimationFrame(raceTick);
}

function steerRace(direction){
  if(activeRace && modal.open)activeRace.lane=Math.max(-1,Math.min(1,activeRace.lane+direction));
}

function stopRace(){
  if(!activeRace)return;
  cancelAnimationFrame(activeRace.frame);
  activeRace=undefined;
}

function racePlace(race){
  return 1+race.rivals.filter(rival=>rival.speed*race.elapsed>race.distance).length;
}

function finishRace(race){
  stopRace();
  const distance=Math.round(race.distance);
  state.raceRecord=Math.max(state.raceRecord ?? 0,distance);
  save();
  render(false);
  playNotes([392,494,587,784]);
  showDialog(dialogTitle('Ziel erreicht!')+
    '<p><strong>Platz '+racePlace(race)+' von 3</strong> · '+distance+' m · '+count(race.hits,'Zusammenstoß','Zusammenstöße')+'</p>'+
    '<p>Streckenrekord: '+state.raceRecord+' m · Guthaben: '+count(raceCoins(),'Münze','Münzen')+'</p>'+
    '<div class="actions">'+rewardButton('Rennen beenden','dismiss')+raceOffer()+'</div>');
  dlg.querySelector('[data-prize="dismiss"]').focus({preventScroll:true});
}

function raceTick(now){
  const race=activeRace;
  if(!race)return;
  if(!modal.open || !race.canvas.isConnected || state!==race.owner){stopRace();return}
  const delta=race.lastFrame===undefined ? 0 : Math.max(0,(now-race.lastFrame)/1000);
  race.lastFrame=now;
  const step=Math.min(delta,raceDuration-race.elapsed);
  if(step>0){
    // Small simulation steps prevent driving through an obstacle after a slow frame.
    const steps=Math.ceil(step*60);
    for(let i=0;i<steps;i++)advanceRace(race,step/steps);
  }
  if(race.elapsed>=raceDuration-0.000001){finishRace(race);return}
  const seconds=Math.ceil(raceDuration-race.elapsed);
  race.timeLabel.textContent=Math.floor(seconds/60)+':'+String(seconds%60).padStart(2,'0');
  race.placeLabel.textContent='Platz '+racePlace(race)+' / 3';
  race.distanceLabel.textContent=Math.floor(race.distance)+' m';
  drawRaceTrack(race);
  race.frame=requestAnimationFrame(raceTick);
}

function advanceRace(race,step){
  const previous=race.distance;
  race.elapsed+=step;
  race.position+=(race.lane-race.position)*Math.min(1,step*13);
  race.distance+=step*raceSpeed*(race.slow>0 ? .52 : 1);
  race.slow=Math.max(0,race.slow-step);
  while(race.nextObstacle<race.distance+100){
    const clearLane=Math.floor(Math.random()*3)-1;
    const lanes=[-1,0,1].filter(lane=>lane!==clearLane);
    if(race.elapsed<25)lanes.splice(Math.floor(Math.random()*2),1);
    for(const lane of lanes)race.obstacles.push({lane,distance:race.nextObstacle});
    race.nextObstacle+=28+Math.random()*13;
  }
  for(const obstacle of race.obstacles){
    if(obstacle.distance>previous && obstacle.distance<=race.distance && Math.abs(obstacle.lane-race.position)<.53){
      race.hits++;
      race.slow=1.3;
    }
  }
  race.obstacles=race.obstacles.filter(obstacle=>obstacle.distance>race.distance-8);
}

function drawRaceTrack(race){
  const {ctx}=race;
  const project=(lane,depth)=>{
    const t=1-depth/104;
    return {x:210+lane*(26+82*t),y:65+310*t*t,scale:.19+.81*t};
  };
  const polygon=(points,color)=>{
    ctx.fillStyle=color;
    ctx.beginPath();
    points.forEach(([x,y],i)=>i ? ctx.lineTo(x,y) : ctx.moveTo(x,y));
    ctx.closePath();
    ctx.fill();
  };

  ctx.fillStyle='#342b31';
  ctx.fillRect(0,0,420,400);
  const sky=ctx.createLinearGradient(0,0,0,72);
  sky.addColorStop(0,'#d48e68');
  sky.addColorStop(1,'#f2ba80');
  ctx.fillStyle=sky;
  ctx.fillRect(0,0,420,72);
  ctx.fillStyle='#fbd8a5';
  ctx.beginPath();
  ctx.arc(318,35,19,0,Math.PI*2);
  ctx.fill();
  polygon([[0,68],[210,52],[420,68],[420,400],[0,400]],'#604133');
  polygon([[164,65],[256,65],[400,400],[20,400]],'#aa7448');
  for(const side of [-1,1]){
    const edge=side<0 ? 0 : 420;
    polygon([[edge,56],[210+side*32,65],[edge,300]],'#83594b');
    for(let tier=0;tier<5;tier++){
      const y=69+tier*29;
      polygon([[edge,y-5],[210+side*(34+tier*13),67+tier*10],
        [210+side*(40+tier*13),70+tier*10],[edge,y+4]],tier%2===0?'#b88967':'#99715a');
    }
    for(let distance=12-race.distance%12;distance<103;distance+=12){
      const near=project(side*1.55,distance);
      const far=project(side*1.55,distance+3);
      polygon([[near.x,near.y],[near.x+side*20*near.scale,near.y],
        [far.x+side*20*far.scale,far.y],[far.x,far.y]],'#e6b67d');
    }
    for(let distance=8-race.distance%8;distance<101;distance+=8){
      const near=project(side*.5,distance);
      const far=project(side*.5,distance+2.5);
      polygon([[near.x-2*near.scale,near.y],[near.x+2*near.scale,near.y],
        [far.x+2*far.scale,far.y],[far.x-2*far.scale,far.y]],'#d5a877');
    }
  }

  const drawWagon=(x,y,scale,color)=>{
    ctx.save();
    ctx.translate(x,y);
    ctx.scale(scale,scale);
    ctx.fillStyle='#614332';
    ctx.beginPath();
    ctx.ellipse(0,1,28,11,0,0,Math.PI*2);
    ctx.fill();
    ctx.fillStyle='#4b3327';
    ctx.fillRect(-25,-13,7,23);
    ctx.fillRect(18,-13,7,23);
    ctx.fillRect(-2,-38,4,32);
    for(const horse of [-1,1]){
      const x=horse*11;
      const gait=Math.sin(race.distance*.9+horse)*3;
      ctx.fillStyle='#57382e';
      ctx.fillRect(x-9,-30+gait,5,14);
      ctx.fillRect(x+4,-30-gait,5,14);
      polygon([[x-7,-19],[x-8,-40],[x-4,-47],[x+4,-47],[x+8,-40],[x+7,-19]],'#8d503a');
      ctx.fillStyle='#ead5b8';
      ctx.fillRect(x-5,-46,10,5);
      ctx.fillStyle='#57382e';
      ctx.fillRect(x-2,-40,4,16);
    }
    polygon([[-19,9],[-17,-14],[17,-14],[19,9]],color);
    ctx.fillStyle='#f0d29c';
    ctx.fillRect(-18,3,36,4);
    ctx.fillStyle='#29242a';
    ctx.fillRect(-5,-16,10,14);
    ctx.restore();
  };
  const objects=race.obstacles.map(obstacle=>({...obstacle,depth:obstacle.distance-race.distance}));
  for(const rival of race.rivals)objects.push({...rival,depth:rival.speed*race.elapsed-race.distance});
  objects.push({lane:race.position,depth:0,color:race.slow>0?'#e8946f':'#ffcd79'});
  for(const object of objects.sort((a,b)=>b.depth-a.depth)){
    if(object.depth>100 || object.depth< -8)continue;
    const {x,y,scale}=project(object.lane,object.depth);
    if(object.color){drawWagon(x,y,scale,object.color);continue}
    ctx.fillStyle='#58392a';
    ctx.fillRect(x-21*scale,y-24*scale,42*scale,24*scale);
    ctx.fillStyle='#edc18b';
    ctx.fillRect(x-18*scale,y-21*scale,36*scale,5*scale);
    ctx.fillStyle='#c8884d';
    ctx.fillRect(x-18*scale,y-11*scale,36*scale,5*scale);
  }
}

function connectRaceControls(){
  modal.addEventListener('close',()=>{if(!modal.open)stopRace()});
  document.addEventListener('visibilitychange',()=>{
    if(!activeRace)return;
    if(document.hidden)cancelAnimationFrame(activeRace.frame);
    else{
      activeRace.lastFrame=undefined;
      activeRace.frame=requestAnimationFrame(raceTick);
    }
  });
  modal.addEventListener('keydown',event=>{
    if(!activeRace || !['ArrowLeft','ArrowRight'].includes(event.key))return;
    event.preventDefault();
    if(!event.repeat)steerRace(event.key==='ArrowLeft' ? -1 : 1);
  });
}
