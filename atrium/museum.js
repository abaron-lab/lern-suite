'use strict';

const exhibits = ['Alltag in Rom','An der Tafel','In den Thermen','In der Werkstatt','Auf Reisen'];
treasures.push(
 ['panis','Der Brotlaib','Warum hat das Brot Kerben? Ein eingeteilter Laib lässt sich leichter in Stücke brechen. In Pompeji haben sich sogar verkohlte Brote erhalten.'],
 ['oliva','Die Olive','Die Früchte des Olivenbaums konnten eingelegt auf den Tisch kommen. Aus gepressten Oliven gewann man außerdem Öl.'],
 ['uva','Die Weintraube','Trauben schmeckten frisch oder getrocknet. Getrocknete Trauben kennst du als Rosinen.'],
 ['mortarium','Der Mörser','Mit dem Stößel drückst und drehst du die Zutaten an der rauen Innenwand. So werden Kräuter zu einer Paste.'],
 ['olla','Der Kochtopf','Stell dir den Topf über einer Glutstelle vor. Darin konnte ein Getreidebrei für die ganze Familie köcheln.'],
 ['cochlear','Der Löffel','Bei manchen römischen Löffeln war das Ende des Stiels spitz. Damit ließen sich kleine Häppchen aufspießen.'],
 ['patina','Der Teller','Feines römisches Tafelgeschirr hatte oft einen glänzenden roten Überzug. Bei manchen Stücken kennen wir sogar den Stempel des Töpfers.'],
 ['mel','Der Honig','Womit würdest du einen antiken Nachtisch süßen? Bienenhonig war in der römischen Küche besonders beliebt.'],
 ['poculum','Der Trinkbecher','Die beiden Henkel erleichtern das Halten. Wer sich kostbare Metallbecher leisten konnte, zeigte sie gern beim Gastmahl.'],
 ['strigilis','Das Schabeisen','Nach dem Sport ölten sich Badende ein. Mit der gebogenen Klinge strichen sie Öl, Staub und Schweiß von der Haut.'],
 ['ampulla','Das Ölfläschchen','Ein kleiner Behälter reichte für den Besuch im Bad. Seine enge Öffnung half, das Öl sparsam zu dosieren.'],
 ['pecten','Der Kamm','Die zwei Zahnreihen sind unterschiedlich fein. Mit welcher Seite würdest du einen großen Knoten zuerst entwirren?'],
 ['spongia','Der Schwamm','Ein Naturschwamm nimmt Wasser in seinen vielen kleinen Hohlräumen auf. Drückst du ihn zusammen, gibt er es wieder ab.'],
 ['linteum','Das Leinentuch','Aus den Fasern des Flachses entsteht Leinen. Ein Tuch war praktisch, wenn man vom warmen ins kalte Bad wechselte.'],
 ['solea','Die Badesandale','Über der Fußbodenheizung konnten die Böden heiß werden. Eine dicke Sohle hielt Abstand zwischen Fuß und Stein.'],
 ['speculum','Der Handspiegel','Ein Spiegel brauchte damals kein Glas. Fein poliertes Metall konnte Licht so zurückwerfen, dass man sein Gesicht erkannte.'],
 ['tubulus','Der Hohlziegel','Der Ziegel ist innen hohl. Hinter der Wandverkleidung konnten heiße Gase aufsteigen und einen Baderaum erwärmen.'],
 ['delphinus','Der Delfin','Ein Delfin aus Stein passt gut zu einem Brunnen. Tierfiguren schmückten in römischen Städten viele Orte am Wasser.'],
 ['malleus','Der Hammer','Der schwere Kopf bündelt den Schwung. So konnte ein Handwerker mit wenigen Schlägen einen Nagel eintreiben.'],
 ['serra','Die Säge','Viele kleine Zähne tragen nacheinander Holz ab. Schau auf die Schneide und stelle dir vor, wie eine gerade Schnittfuge entsteht.'],
 ['forceps','Die Zange','Mit den langen Griffen ließ sich ein heißes Werkstück halten. Die Hände blieben auf Abstand zur Glut.'],
 ['incus','Der Amboss','Diese schwere Unterlage bewegt sich beim Hämmern kaum. Auf ihr konnte ein Schmied heißes Metall in Form bringen.'],
 ['funis','Das Seil','Viele dünne Fasern ergeben zusammen ein tragfähiges Seil. Schau dir an, in welche Richtung die Stränge gedreht sind.'],
 ['pondus','Das Webgewicht','An einem stehenden Webstuhl zog ein solches Gewicht die Fäden nach unten. So blieben sie beim Weben gespannt.'],
 ['lana','Die Wolle','Bevor aus Wolle Stoff wurde, musste jemand Fasern zu einem Faden spinnen. Gefärbtes Garn brachte Farbe ins Gewebe.'],
 ['forfex','Die Schere','Der gebogene Metallbügel wirkt wie eine Feder. Nach dem Schnitt drückt er die beiden Klingen wieder auseinander.'],
 ['fusus','Die Spindel','Die drehende Spindel verdrillt lose Fasern zu einem Faden. Den fertigen Faden kann man auf dem Stab aufwickeln.'],
 ['navis','Das Handelsschiff','Das viereckige Segel fängt den Wind ein. Im Bauch eines Handelsschiffs reisten Lebensmittel und andere Waren über das Meer.'],
 ['ancora','Der Anker','Wie bleibt ein Schiff vor der Küste an seinem Platz? Die Arme des Ankers können sich im Grund festsetzen.'],
 ['pera','Die Reisetasche','Eine Ledertasche schützt kleine Dinge unterwegs. Was würdest du für einen Tagesmarsch hineinlegen?'],
 ['epistula','Der Reisebrief','Eine Nachricht musste jemand persönlich überbringen. Bis ein Brief aus einer anderen Provinz eintraf, konnte viel Zeit vergehen.'],
 ['sigillum','Das Siegel','Ein Ring konnte ein Bild ins weiche Wachs drücken. War das Siegel am Brief beschädigt, fiel das dem Empfänger auf.'],
 ['tintinnabulum','Das Glöckchen','Das lateinische Wort klingt fast selbst wie eine Glocke. Versuch, tintinnabulum langsam laut zu sagen.'],
 ['rota','Das Wagenrad','Die Speichen verbinden Nabe und Felge. So ist das Rad leichter als eine volle Holzscheibe.'],
 ['miliarium','Der Meilenstein','Am Straßenrand verrieten solche Steine Entfernungen. Eine römische Meile entspricht ungefähr 1,5 Kilometern.'],
 ['calceus','Der Reiseschuh','Lederriemen hielten den Schuh am Fuß. Dicke oder genagelte Sohlen konnten unterwegs länger durchhalten.']
);
let cabinetView=null, floorView=null;
const mosaicDesigns=['Sonnenrad','Rauten in Ocker','Wellen in Blau','Lorbeergrün','Stern in Rot','Schachbrett'];
function upgradeMuseum(){
  if(state.museumEdition)return;
  const days=earnedDays(4), old=state.openedFinds||{},opened={};
  days.forEach((day,i)=>{if(old[day])opened[days[i%9]]=true});
  state.openedFinds=opened;state.museumEdition=2;save();
}
function cabinetGallery(days){
  const opened=state.openedFinds||{};
  const total=days.slice(0,treasures.length).filter(d=>opened[d]).length;
  const pending=days.findIndex((d,i)=>i<treasures.length&&!opened[d]);
  const focus=pending<0?Math.min(days.length,44):pending;
  const view=cabinetView??Math.floor(focus/9), first=view*9;
  const tabs=exhibits.map((name,i)=>{
    const done=days.slice(i*9,i*9+9).filter(d=>opened[d]).length;
    return '<button class="cabinet-tab" aria-pressed="'+(view===i)+'" data-prize="cabinet:'+i+'">'+treasureArt(i*9)+'<span>'+name+'<small>'+done+' von 9</small></span></button>';
  }).join('');
  const cards=treasures.slice(first,first+9).map(([latin,name],j)=>{
    const index=first+j, day=days[index];
    if(day&&opened[day])return '<button class="museum-card" data-prize="find:'+day+'">'+treasureArt(index)+'<strong>'+name+'</strong><small lang="la">'+latin+'</small></button>';
    if(day)return '<button class="museum-card waiting" data-prize="find:'+day+'">'+ic('sun')+'<strong>Fund aufdecken</strong><small>'+shortDay(day)+'</small></button>';
    return '<div class="museum-card unknown"><span class="mystery" aria-hidden="true">?</span><span>Unentdeckter Fund</span></div>';
  }).join('');
  return '<div class="section-heading"><h2>Deine Sammlung</h2><span>'+total+' / '+treasures.length+' Funde</span></div><div class="cabinet-tabs" aria-label="Themenvitrinen">'+tabs+'</div><section aria-label="'+exhibits[view]+'"><h3 class="cabinet-title">'+exhibits[view]+'</h3><div class="museum">'+cards+'</div></section>';
}
function tileArt(choice){
  return '<span class="tile-pattern pattern-'+choice+'" aria-hidden="true"></span>';
}
function mosaicOrdinal(day){return earnedDays(4).indexOf(day)-treasures.length}
function floorGallery(days){
  const extra=days.slice(treasures.length), active=extra.length;
  if(!active)return '<section class="after-museum"><div class="tile-sample">'+tileArt(0)+'</div><div><h3>Nach dem letzten Fund</h3><p>Nach 45 Fundtagen gestaltest du deine eigene römische Villa. Jeder weitere Fundtag bringt dir ein Mosaikfeld, neun Felder ergeben einen Raum.</p></div></section>';
  const rooms=Math.ceil(active/9), room=Math.max(0,Math.min(floorView??(rooms-1),rooms-1));
  const floor=state.mosaicFloor||{};
  const cells=Array.from({length:9},(_,i)=>{
    const day=extra[room*9+i],value=floor[day];
    if(!day)return '<span class="empty-square" aria-label="Feld '+(i+1)+' noch frei"></span>';
    return '<button class="floor-cell" data-prize="find:'+day+'" aria-label="Feld '+(i+1)+', '+(value===undefined?'Muster wählen':mosaicDesigns[value]+' ändern')+'">'+(value===undefined?ic('plus'):tileArt(value))+'</button>';
  }).join('');
  return '<div class="section-heading"><h2>Deine Mosaikvilla</h2></div><section class="villa"><div class="mosaic-floor">'+cells+'</div><div><div class="eyebrow">Mosaikwerkstatt</div><h3>Raum '+(room+1)+'</h3><p>Wähle ein freies Feld und lege dein Muster. Entdeckte Felder kannst du später umgestalten.</p><div class="actions">'+(room>0?rewardButton('Voriger Raum','room:'+(room-1)):'')+(room+1<rooms?rewardButton('Nächster Raum','room:'+(room+1)):'')+'</div></div></section>';
}
function mosaicDialog(day){
  const pos=mosaicOrdinal(day);if(pos<0)return;
  const options=mosaicDesigns.map((label,i)=>'<button class="tile-choice" data-prize="tile:'+day+':'+i+'">'+tileArt(i)+label+'</button>').join('');
  showDialog(dialogTitle('Gestalte dein Mosaik')+'<p>Raum '+(Math.floor(pos/9)+1)+' · Feld '+(pos%9+1)+'. Welches Muster soll hier liegen?</p><div class="tile-options">'+options+'</div>');
}
function layTile(day,choice){
  const pos=mosaicOrdinal(day);
  if(pos<0||!Number.isInteger(choice)||!mosaicDesigns[choice])return;
  state.mosaicFloor??={};state.mosaicFloor[day]=choice;floorView=Math.floor(pos/9);save();
  if(getRoute()==='schatzkammer')render(false);
  const roomDays=earnedDays(4).slice(treasures.length+floorView*9,treasures.length+(floorView+1)*9);
  const finished=roomDays.length===9&&roomDays.every(d=>state.mosaicFloor[d]!==undefined);
  showDialog(dialogTitle(finished?'Dein Raum ist fertig!':'Mosaikfeld gelegt!')+'<div class="chosen-tile">'+tileArt(choice)+'</div><p>'+mosaicDesigns[choice]+' liegt jetzt in Raum '+(floorView+1)+'. '+(finished?'Am nächsten Fundtag kannst du einen weiteren Raum beginnen.':'Dein Muster ist gespeichert.')+'</p><div class="actions">'+rewardButton(getRoute()==='training'?'Weiterlernen':'Schließen','dismiss','btn')+rewardButton('Zur Villa','collection')+'</div>');playNotes([392,523,659]);
}
