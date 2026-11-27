'use strict';

const lessonTitles = [
 'Aufregung um Incitatus','Verbrecher unter sich','Mutige Sklaven','Diana fordert Gerechtigkeit',
 'Der Menschenfreund Prometheus','Merkur – ein kleiner Gott hat große Pläne','Der gesprächige Rabe',
 'Immer Ärger mit den Fans','Flucht aus Pompeji','Das soll ein Gott sein?','Ein Mädchen als Vorbild',
 'Ausweichen oder angreifen?','Optimismus wird belohnt','Gesichter des Krieges','Die Abenteuer des Odysseus',
 'Neptun – ein Rabenvater?','Schadenfreude?!','Wie beherrschen die Römer andere Völker?',
 'Dürfen Christen den Kaiser als Gott verehren?','Bukephalos wird gebändigt',
 'Was braucht man, um glücklich zu sein?','Cäsar überschreitet den Rubikon','Worte oder Waffen?',
 'Ein fabelhafter Wettstreit','SMS oder Blumen?','Was Christen glauben','Ein Statthalter muss sich entscheiden',
 'Wilde Barbaren oder friedliche Nachbarn?','Ein Kaiser kümmert sich','Nicht zum Kaiser geboren?'
];
lessons.push('e-Deklination und Passiv','PPP und Vergangenheit im Passiv','Adverbien und Participium coniunctum',
 'ferre, u-Deklination und PC','hic, ille und das PPA','Irrealis und Konjunktiv der Vergangenheit',
 'Ablativus absolutus und cum','ut, ne und der Ablativus absolutus','Konjunktiv und indirekte Fragen',
 'Prohibitiv, Futur Passiv und nominaler Ablativus absolutus','Gerundium und Deponentien',
 'Steigerung und Gerundivum','Wunsch, Aufforderung und Gerundivum','Partizip Futur Aktiv und fieri',
 'Infinitiv Futur und Konjunktiv im Hauptsatz','Deponentien, Relativsätze und NcI','Sätze erschließen','Texte erschließen');
const chapterWords=[
 'gaudere|sich freuen;ridere|lachen;spectare|anschauen;victoria|der Sieg;populus|das Volk;medicus|der Arzt',
 'turba|die Menschenmenge;porta|das Tor;fenestra|das Fenster;pecunia|das Geld;properare|sich beeilen;exspectare|erwarten',
 'culpa|die Schuld;poena|die Strafe;socius|der Gefährte;parare|vorbereiten;respondere|antworten;statim|sofort',
 'fuga|die Flucht;ira|der Zorn;silva|der Wald;dea|die Göttin;ardere|brennen;timere|sich fürchten',
 'flamma|die Flamme;terra|die Erde;caelum|der Himmel;vita|das Leben;donare|schenken;invenire|finden',
 'gloria|der Ruhm;fortuna|das Glück;docere|lehren;cupere|wünschen;incipere|beginnen;parvus|klein',
 'arbor|der Baum;periculum|die Gefahr;mercator|der Händler;auxilium|die Hilfe;volare|fliegen;vendere|verkaufen',
 'arena|der Sandplatz;gladiator|der Gladiator;pugna|der Kampf;leo|der Löwe;pax|der Frieden;vox|die Stimme',
 'mons|der Berg;tenebrae|die Dunkelheit;tectum|das Dach;timor|die Angst;cadere|fallen;relinquere|zurücklassen;discedere|weggehen;familia|die Familie;mater|die Mutter;pater|der Vater;homo|der Mensch;currere|laufen',
 'nox|die Nacht;annus|das Jahr;frater|der Bruder;locus|der Ort;moenia|die Stadtmauern;credere|glauben',
 'aqua|das Wasser;patria|die Heimat;miles|der Soldat;lex|das Gesetz;lux|das Licht;defendere|verteidigen',
 'bellum|der Krieg;legio|die Legion;proelium|das Gefecht;salus|die Rettung;redire|zurückkehren;ingens|gewaltig',
 'spes|die Hoffnung;res|die Sache;fides|die Treue;sol|die Sonne;ignis|das Feuer;honor|die Ehre;regere|lenken;certus|sicher',
 'nomen|der Name;opus|das Werk;navis|das Schiff;ventus|der Wind;litus|die Küste;iter|die Reise;fatum|das Schicksal;condere|gründen',
 'mare|das Meer;corpus|der Körper;flumen|der Fluss;vestis|das Kleidungsstück;laus|das Lob;comparare|vergleichen;conspicere|erblicken;vivus|lebendig',
 'ferre|tragen;metus|die Furcht;exercitus|das Heer;senatus|der Senat;consul|der Konsul;nuntius|der Bote;auferre|wegtragen;neglegere|vernachlässigen',
 'custos|der Wächter;domus|das Haus;soror|die Schwester;pes|der Fuß;audacia|die Kühnheit;repente|plötzlich;dulcis|süß;cernere|wahrnehmen',
 'murus|die Mauer;arx|die Burg;incendium|der Brand;condicio|die Bedingung;cedere|weichen;durus|hart;vetus|alt; circum|rings um',
 'epistula|der Brief;provincia|die Provinz;ius|das Recht;voluntas|der Wille;mora|die Verzögerung;nuntiare|melden;iustus|gerecht;immortalis|unsterblich',
 'caput|der Kopf;currus|der Wagen;manus|die Hand;carmen|das Lied;consuetudo|die Gewohnheit;optare|wünschen;vertere|wenden;brevis|kurz',
 'somnus|der Schlaf;vulnus|die Wunde;hiems|der Winter;eques|der Reiter;odium|der Hass;oratio|die Rede;iurare|schwören;inopia|der Mangel',
 'ferrum|das Eisen;sanguis|das Blut;umbra|der Schatten;tempestas|das Unwetter;adventus|die Ankunft;impetus|der Ansturm;crudelis|grausam;invitus|widerwillig',
 'loqui|sprechen;sequi|folgen;uti|benutzen;ara|der Altar;membrum|das Körperglied;tergum|der Rücken;salvus|unversehrt;paratus|bereit',
 'initium|der Anfang;cursus|der Lauf;carus|teuer;aequus|eben, gerecht;permittere|erlauben;persuadere|überreden;sinere|zulassen;maior|größer',
 'convivium|das Gastmahl;iudex|der Richter;iudicium|das Urteil;sermo|das Gespräch;bibere|trinken;dividere|teilen;malle|lieber wollen;melior|besser',
 'argentum|das Silber;auris|das Ohr;comes|der Begleiter;solacium|der Trost;theatrum|das Theater;crescere|wachsen;exire|hinausgehen;hodie|heute',
 'aurum|das Gold;discere|lernen;addere|hinzufügen;reprehendere|kritisieren;asper|rau;pariter|gleichermaßen;parum|zu wenig;fore|sein werden',
 'amicitia|die Freundschaft;frumentum|das Getreide;libellus|das Büchlein;captivus|der Gefangene;conari|versuchen;vereri|fürchten;polliceri|versprechen;ferus|wild',
 'fur|der Dieb;furtum|der Diebstahl;monumentum|das Denkmal;pretium|der Preis;vinum|der Wein;avaritia|die Habgier;gratus|dankbar;odi|ich hasse',
 'aedificium|das Gebäude;iustitia|die Gerechtigkeit;lumen|das Licht;fluctus|die Welle;coniuratio|die Verschwörung;frangere|zerbrechen;fateri|gestehen;oriri|entstehen'
];
chapterWords.forEach((line,i)=>line.split(';').forEach(pair=>{
  const [latin,de]=pair.trim().split('|');
  if(!vocabulary.some(w=>w.lesson===i+1&&w.latin===latin)){
    vocabulary.push({id:'buch-'+(i+1)+'-'+latin,kind:'v',lesson:i+1,latin,de});
  }
}));

function addGrammar(lesson,rows){
  for(const [topic,prompt,correct,a,b,why] of rows)question(lesson,topic,prompt,correct,[a,b],why);
}
addGrammar(2,[['Personalendungen','Wie übersetzt du „Amicum video“?','Ich sehe den Freund.','Der Freund sieht.','Wir sehen Freunde.','Video endet auf -o und bedeutet „ich sehe“. Amicum ist das Akkusativobjekt.']]);
addGrammar(4,[['nolle','Welche Form ergänzt „Ego …“ für „Ich will nicht“?','nolo','non vult','nolunt','Die 1. Person Singular des unregelmäßigen Verbs nolle lautet nolo.']]);
addGrammar(5,[['Genitiv','Welche Wortgruppe bedeutet „die Tore der Stadt“ (oppidum)?','portae oppidi','portas oppida','porta oppido','Portae steht im Nominativ Plural. Oppidi ist der Genitiv Singular von oppidum.']]);
addGrammar(7,[['AcI','„Putat amicum venire.“ Welche Form übernimmt im AcI die Rolle des Subjekts?','amicum','putat','venire','Der Freund kommt. Im AcI steht dieses logische Subjekt im Akkusativ.']]);
addGrammar(8,[['Imperfekt','Welcher Satz beschreibt, was im Hintergrund andauerte?','Populus clamabat.','Populus clamavit.','Populus clamat.','Das Imperfekt clamabat passt zu einem andauernden Rufen in der Vergangenheit.']]);
addGrammar(9,[
 ['Perfektstämme','In Pompeji fällt ein Dachziegel. Was bedeutet „cecidit“ von cadere?','Er ist gefallen.','Er fällt gerade.','Er wird fallen.','Cecidit ist die 3. Person Singular Perfekt. Der Stamm von cadere wiederholt im Perfekt die Anfangssilbe.'],
 ['AcI und Zeit','„Mater dixit familiam discedere.“ Wann bricht die Familie im Verhältnis zum Sagen auf?','zur selben Zeit','schon vorher','erst am nächsten Tag','Der Infinitiv Präsens discedere zeigt Gleichzeitigkeit, auch wenn dixit in der Vergangenheit steht.'],
 ['Personalpronomen','„Venite nobiscum!“ Was ruft die Familie?','Kommt mit uns!','Kommt mit mir!','Wartet auf uns!','Nobiscum setzt sich aus nobis und cum zusammen. Venite ist der Imperativ Plural.'],
 ['3. Deklination','„Montem videmus.“ Was sehen wir bei Pompeji?','den Berg','die Berge','vom Berg herab','Montem ist der Akkusativ Singular von mons, montis. Der Akkusativ ist hier das Objekt von videmus.'],
 ['Perfekt','Was ist in „Pater tectum reliquit“ bereits passiert?','Der Vater hat das Hausdach verlassen.','Der Vater wird das Hausdach verlassen.','Der Vater bleibt auf dem Hausdach.','Reliquit ist das Perfekt von relinquere. Tectum bedeutet hier „das Dach“.']
]);
addGrammar(10,[['Ablativ der Zeit','„Nocte venerunt.“ Welche Übersetzung passt?','Sie kamen in der Nacht.','Sie kamen zur Nacht hin.','Sie brachten die Nacht.','Nocte ist Ablativ Singular von nox. Der Ablativ nennt hier den Zeitpunkt.']]);
addGrammar(11,[['Futur','Wie lautet das Futur zu „venit“ (er kommt)?','veniet','veniebat','venerat','Die i-Konjugation bildet die 3. Person Singular Futur auf -iet.']]);
addGrammar(12,[['ire','Wie übersetzt du „Ad forum imus“?','Wir gehen zum Forum.','Ihr geht zum Forum.','Sie gehen zum Forum.','Imus ist die 1. Person Plural Präsens von ire.']]);
addGrammar(13,[
 ['e-Deklination','Welche Form bedeutet „die Hoffnungen“ im Nominativ?','spes','spera','spei','Bei spes ist der Nominativ Plural genauso geschrieben wie der Nominativ Singular.'],
 ['Passiv','Wie übersetzt du „Puella laudatur“?','Das Mädchen wird gelobt.','Das Mädchen lobt.','Die Mädchen loben.','An der Endung -tur erkennst du die 3. Person Singular Passiv.'],
 ['Imperfekt Passiv','Welche Form heißt „sie wurden gerufen“?','vocabantur','vocabant','vocantur','-ba- zeigt das Imperfekt, -ntur die 3. Person Plural Passiv.'],
 ['Passiv verstehen','„Servus a domino vocatur.“ Wer ruft?','der Herr','der Sklave','beide zusammen','A domino nennt die handelnde Person. Der Sklave wird gerufen.']
]);
addGrammar(14,[
 ['PPP','Welche Form ist das Partizip Perfekt Passiv von mittere?','missus','mittens','mittit','Das PPP missus bedeutet „geschickt“. Es wird wie ein Adjektiv angepasst.'],
 ['Perfekt Passiv','Wie übersetzt du „Naves missae sunt“?','Die Schiffe sind geschickt worden.','Die Schiffe schicken gerade etwas.','Die Schiffe werden etwas schicken.','Missae passt zu naves. Das PPP mit sunt ergibt Perfekt Passiv.'],
 ['Plusquamperfekt Passiv','„Urbs capta erat.“ Welche Zeit liegt vor?','Plusquamperfekt Passiv','Perfekt Aktiv','Imperfekt Aktiv','PPP und erat bedeuten zusammen „Die Stadt war erobert worden“.'],
 ['Neutra','Wie lautet der Akkusativ Plural von nomen, nominis?','nomina','nomines','nominem','Nomen ist ein Neutrum der 3. Deklination. Der Plural endet hier auf -a.']
]);
addGrammar(15,[
 ['Adverb','Ergänze „fortis“ als Adverb zu „pugnat“: Er kämpft tapfer.','fortiter','fortem','fortia','Das Adverb fortiter beschreibt die Art des Kämpfens.'],
 ['i-Stämme','Wie lautet der Nominativ Plural von mare?','maria','mares','maribus','Neutra auf -e wie mare bilden den Nominativ und Akkusativ Plural auf -ia.'],
 ['Participium coniunctum','In „Nautae vento territi fugiunt“ bezieht sich territi auf …','nautae','vento','fugiunt','Territi ist Nominativ Plural Maskulinum und beschreibt die Seeleute.'],
 ['Vorzeitigkeit','„Nautae servati gaudent.“ Was geschieht zuerst?','Die Seeleute werden gerettet.','Die Seeleute freuen sich.','Beides liegt zwingend in der Zukunft.','Das PPP servati beschreibt die bereits erfolgte Rettung.']
]);
addGrammar(16,[
 ['ferre','Wie heißt „er trägt“?','fert','ferit','ferunt','Ferre bildet die 3. Person Singular ohne Bindevokal: fert.'],
 ['u-Deklination','Wie lautet der Dativ Singular von exercitus?','exercitui','exercitum','exercituum','Der Dativ Singular der u-Deklination endet hier auf -ui.'],
 ['Participium coniunctum','„Filius a patre vocatus venit.“ Welcher Nebensatz gibt vocatus zeitlich wieder?','Nachdem er vom Vater gerufen worden ist, …','Bevor er den Vater ruft, …','Damit er den Vater ruft, …','Vocatus beschreibt den Sohn. Das PPP ist passiv und vorzeitig.'],
 ['ferre','Welche Form bedeutet „wir tragen“?','ferimus','ferunt','fertis','Die 1. Person Plural von ferre lautet ferimus.']
]);
addGrammar(17,[
 ['Demonstrativpronomen','Was bedeutet „hic puer“?','dieser Junge hier','jener Junge dort','welcher Junge?','Hic weist auf jemanden oder etwas in der Nähe.'],
 ['PPA','Welche Form ist das PPA von ridere?','ridens','risit','ridet','Ridens bedeutet „lachend“. Am Stamm rident- erkennst du das PPA in den weiteren Kasus.'],
 ['Gleichzeitigkeit','„Puella ridens venit.“ Wann lacht das Mädchen?','während es kommt','bevor es kommt','erst nach seiner Ankunft','Das PPA ridens ist gleichzeitig zur Handlung des Prädikats.'],
 ['Dativ des Zwecks','„Dono librum dat.“ Wozu gibt er das Buch?','als Geschenk','aus dem Geschenk heraus','an einen Mann namens Donus','Dono ist Dativ des Zwecks. Er gibt an, wozu etwas dient.']
]);
addGrammar(18,[
 ['Irrealis der Gegenwart','Wie übersetzt du „Si adesset, gauderem“?','Wenn er da wäre, würde ich mich freuen.','Weil er da ist, freue ich mich.','Er wird da sein und sich freuen.','Der Konjunktiv Imperfekt drückt hier eine unwirkliche Bedingung der Gegenwart aus.'],
 ['Irrealis der Vergangenheit','„Si venisset, eum vidissem.“ Wann hätte das Treffen stattgefunden?','in der Vergangenheit','in der Gegenwart','in der Zukunft','Venisset und vidissem sind Konjunktiv Plusquamperfekt.'],
 ['Konjunktiv Imperfekt','Welche Form bedeutet „wir würden loben“?','laudaremus','laudavimus','laudamus','Du erkennst den Infinitiv laudare vor der Endung -mus.'],
 ['Genitivus obiectivus','„Timor hostium“ meint hier die Angst, die man vor den Feinden hat. Welche Rolle haben die Feinde?','Sie sind das Ziel der Angst.','Sie empfinden selbst Angst.','Sie machen eine Zeitangabe.','Beim Genitivus obiectivus richtet sich das Gefühl auf die im Genitiv genannten Personen.']
]);
addGrammar(19,[
 ['Ablativus absolutus','„Urbe capta milites abeunt.“ Was gehört zusammen?','urbe und capta','capta und milites','urbe und abeunt','Urbe und capta stehen beide im Ablativ Singular. Gemeinsam bilden sie den Ablativus absolutus.'],
 ['Ablativus absolutus','Was bedeutet „sole oriente“ zeitlich?','während die Sonne aufgeht','bevor man die Sonne sieht','nachdem die Sonne untergegangen ist','Oriente ist ein PPA im Ablativ. Das Aufgehen geschieht gleichzeitig.'],
 ['cum mit Konjunktiv','„Cum id audivisset, tacuit.“ Welche zeitliche Übersetzung passt?','Nachdem er das gehört hatte, schwieg er.','Er schweigt, damit er es hören wird.','Während er schweigt, wird er es hören.','Der Konjunktiv Plusquamperfekt macht das Hören vorzeitig zum Schweigen.'],
 ['Beschaffenheit','„Vir magna virtute“ beschreibt einen Mann …','von großer Tapferkeit.','mit einem großen Haus.','vor einem großen Sieg.','Magna virtute ist ein Ablativ der Beschaffenheit.']
]);
addGrammar(20,[
 ['Finalsatz','„Venit, ut equum videat.“ Warum kommt er?','um das Pferd zu sehen','weil das Pferd ihn gesehen hat','obwohl er das Pferd sieht','Ut mit Konjunktiv kann eine Absicht ausdrücken. Hier passt „um … zu“.'],
 ['ne','„Tacete, ne equus timeat.“ Warum soll es still sein?','damit das Pferd sich nicht fürchtet','weil das Pferd schon schläft','obwohl das Pferd wiehert','Ne leitet hier einen verneinten Finalsatz ein.'],
 ['Konsekutivsatz','„Tam celer est, ut vincat.“ Wie übersetzt du ut hier?','sodass','nachdem','bevor','Tam („so“) weist auf eine Folge hin: Er ist so schnell, dass er siegt.'],
 ['Ablativus absolutus','Welche Wiedergabe passt zu „equo domito“?','nachdem das Pferd gezähmt worden war','damit das Pferd siegen kann','während das Pferd jemanden zähmt','Domito ist ein PPP zu equo. Der Ausdruck beschreibt einen vorangegangenen Vorgang.']
]);
addGrammar(21,[
 ['Konjunktiv Präsens','Welche Form ist Konjunktiv Präsens von laudare?','laudet','laudat','laudabat','Die a-Konjugation hat im Konjunktiv Präsens den Vokal -e-.'],
 ['Indirekte Frage','„Rogat, ubi amicus sit.“ Was fragt er?','wo der Freund ist','warum der Freund ging','ob der Freund kommen soll','Ubi bedeutet „wo“. Sit steht als Verb der indirekten Frage im Konjunktiv.'],
 ['Konjunktiv Perfekt','„Nescio, quid fecerit.“ Was liegt vor dem Nichtwissen?','die Handlung des Machens','beide Ereignisse liegen immer in der Zukunft','keine Handlung','Fecerit ist hier Konjunktiv Perfekt: Ich weiß nicht, was er getan hat.'],
 ['Doppelter Akkusativ','„Eum amicum vocant.“ Wie nennen sie ihn?','einen Freund','die Freunde','den Namen des Freundes','Eum ist das Objekt. Amicum sagt, als was man ihn bezeichnet.']
]);
addGrammar(22,[
 ['Prohibitiv','Wie übersetzt du „Ne timueris!“?','Fürchte dich nicht!','Du hast dich gefürchtet.','Warum fürchtest du dich?','Ne und Konjunktiv Perfekt drücken hier ein Verbot aus.'],
 ['Futur Passiv','„Porta claudetur.“ Was wird geschehen?','Das Tor wird geschlossen werden.','Das Tor war geschlossen.','Das Tor schließt etwas.','Claudetur ist die 3. Person Singular Futur Passiv von claudere.'],
 ['Nominaler Ablativus absolutus','Wie übersetzt du „Caesare duce“?','unter Caesars Führung','Caesar führt den Feldherrn','zu Caesar und dem Heer','Hier bilden zwei Nomen im Ablativ eine selbstständige Angabe.'],
 ['Interrogativpronomen','Welche Frage stellt „Quis venit?“','Wer kommt?','Wohin kommt er?','Wie viele kommen?','Quis fragt hier nach einer Person als Subjekt.']
]);
addGrammar(23,[
 ['Gerundium','Was bedeutet „ars dicendi“?','die Kunst des Redens','der Redner spricht','die Kunst wird gelobt','Dicendi ist der Genitiv des Gerundiums.'],
 ['Deponentien','„Legatus loquitur.“ Was tut der Gesandte?','Er spricht.','Er wird angesprochen.','Er ist gesprochen worden.','Loqui ist ein Deponens. Es verwendet passive Formen mit aktiver Bedeutung.'],
 ['Partizip der Deponentien','„Haec locutus abiit.“ Was geschah zuerst?','Er sagte diese Dinge.','Er ging weg.','Jemand sprach ihn an.','Locutus ist das Perfektpartizip von loqui und hat hier aktive Bedeutung.'],
 ['Relativer Satzanschluss','„Senator adest. Qui subito surgit.“ Worauf verweist qui?','auf den Senator im vorherigen Satz','auf einen unbekannten Ort','auf die Zeitangabe subito','Der relative Satzanschluss verbindet Sätze. Hier passt im Deutschen „Dieser steht plötzlich auf“.']
]);
addGrammar(24,[
 ['Komparativ','Wie heißt „tapferer“ zu fortis (maskulin)?','fortior','fortissimus','fortiter','Der Komparativ lautet fortior, im Neutrum fortius.'],
 ['Unregelmäßige Steigerung','Welche Reihe gehört zusammen?','bonus – melior – optimus','bonus – maior – maximus','bonus – peior – pessimus','Melior heißt „besser“, optimus „der beste“.'],
 ['Ablativ des Vergleichs','„Marcia fratre celerior est.“ Wer ist schneller?','Marcia','der Bruder','beide gleich schnell','Fratre ist der Vergleichsmaßstab im Ablativ: schneller als ihr Bruder.'],
 ['Gerundivum','„Ad libros legendos“ bedeutet …','zum Lesen der Bücher.','nachdem die Bücher gelesen wurden.','die Bücher lesen gerade.','Legendos passt als Gerundivum zu libros in Kasus, Numerus und Genus.']
]);
addGrammar(25,[
 ['Hortativ','„Eamus!“ richtet sich an eine Gruppe einschließlich des Sprechers. Was heißt das?','Lasst uns gehen!','Geh allein!','Sie sind gegangen.','Der Hortativ steht hier in der 1. Person Plural Konjunktiv Präsens.'],
 ['Optativ','„Utinam veniat!“ Was drückt der Sprecher aus?','einen Wunsch','einen Bericht','eine Frage','Utinam kennzeichnet den Wunsch „Hoffentlich kommt er!“.'],
 ['Gerundivum mit esse','„Liber legendus est.“ Was sagt der Satz?','Das Buch muss gelesen werden.','Das Buch hat gelesen.','Das Buch wurde schon gelesen.','Das prädikative Gerundivum mit esse drückt eine Notwendigkeit aus.'],
 ['Steigerung des Adverbs','Welche Form bedeutet „schneller“ als Adverb zu celeriter?','celerius','celerrimus','celerem','Der Komparativ des Adverbs lautet wie der Komparativ des Adjektivs im Neutrum Singular.']
]);
addGrammar(26,[
 ['Partizip Futur Aktiv','Was bezeichnet „venturus“?','jemanden, der kommen wird','jemanden, der kommt, während etwas geschieht','jemanden, der geschickt wurde','Das PFA bezeichnet eine spätere oder beabsichtigte Handlung.'],
 ['fieri','Wie übersetzt du „Quid fit?“?','Was geschieht?','Wer hat es gemacht?','Wohin gehst du?','Fieri kann „werden“ oder „geschehen“ bedeuten.'],
 ['PFA als Absicht','„Nuntius auxilium petiturus venit.“ Mit welcher Absicht kommt der Bote?','um Hilfe zu erbitten','weil er schon Hilfe erhalten hat','damit man ihn zum Boten macht','Petiturus bezeichnet die Absicht des Boten.'],
 ['Kongruenz des PFA','Wie ergänzt du „Puella … est“ für „Das Mädchen hat vor zu gehen“?','itura','iturum','ituri','Das PFA itura stimmt mit puella in Genus, Numerus und Kasus überein.']
]);
addGrammar(27,[
 ['Infinitiv Futur','„Spero amicam venturam esse.“ Wann kommt die Freundin im Verhältnis zum Hoffen?','später','vorher','gleichzeitig','Venturam esse ist der Infinitiv Futur Aktiv. Er drückt Nachzeitigkeit aus.'],
 ['Deliberativ','„Quid faciam?“ ist hier eine ratlose Frage. Wie übersetzt du sie?','Was soll ich tun?','Was habe ich getan?','Wer tut das?','Der überlegende Konjunktiv heißt Deliberativ.'],
 ['Potentialis','„Hoc quis credat?“ Welche Möglichkeit stellt der Sprecher infrage?','Wer könnte das glauben?','Wer glaubte das gestern?','Wer muss das glauben?','Der Potentialis stellt hier eine Handlung als denkbar hin.'],
 ['AcI bestimmen','„Scit socios profectos esse.“ Was bildet den Infinitiv?','profectos esse','socios','scit','Profectos esse ist der Infinitiv Perfekt des Deponens proficisci. Socios ist der Subjektsakkusativ.']
]);
addGrammar(28,[
 ['Deponentien','Wie übersetzt du „Conamur“?','Wir versuchen es.','Wir werden versucht.','Sie versuchen es.','Conari ist ein Deponens. -mur ist hier die 1. Person Plural mit aktiver Bedeutung.'],
 ['NcI','„Marcus venire dicitur.“ Welche Übersetzung passt?','Man sagt, dass Marcus kommt.','Marcus sagt, dass er gekommen ist.','Marcus befiehlt ihm zu kommen.','Marcus steht im Nominativ bei dicitur und ist die handelnde Person zu venire.'],
 ['Relativsatz im Konjunktiv','„Legatos mittit, qui pacem petant.“ Welchen Zweck hat die Gesandtschaft?','Sie soll um Frieden bitten.','Sie hat schon Frieden geschlossen.','Sie lehnt Frieden ab.','Der Relativsatz mit Konjunktiv kann hier final übersetzt werden.'],
 ['Partizip eines Deponens','„Librum pollicitus est.“ Was tat er?','Er hat ein Buch versprochen.','Ein Buch wurde ihm versprochen.','Er wird ein Buch lesen.','Polliceri bedeutet „versprechen“. Das Perfekt pollicitus est wird aktiv übersetzt.']
]);
addGrammar(29,[
 ['Hauptsatz','„Cum fur fugeret, custos clamavit.“ Welches Prädikat gehört zum Hauptsatz?','clamavit','fugeret','custos','Cum leitet den Nebensatz ein. Der Hauptsatz lautet custos clamavit.'],
 ['Bezüge','„Princeps, quem cives laudant, venit.“ Auf wen bezieht sich quem?','auf princeps','auf cives','auf niemanden','Der Fürst wird gelobt. Quem ist Akkusativobjekt im Relativsatz.'],
 ['Satzgrenzen','„Servus dicit furem, qui vinum portat, fugere.“ Welches Verb gehört mit furem zum AcI?','fugere','portat','dicit','Qui vinum portat ist ein eingeschobener Relativsatz. Der Kern des AcI lautet furem fugere.'],
 ['Satzgerüst','„Post longum iter legatus ad urbem venit.“ Was bleibt als Subjekt und Prädikat?','legatus venit','longum iter','ad urbem','Wer kommt? Der Gesandte. Die übrigen Wörter geben nähere Umstände an.']
]);
addGrammar(30,[
 ['Personenbezüge','„Iulia ad portam venit. Ibi sororem videt.“ Wer sieht die Schwester?','Iulia','das Tor','die Schwester selbst','Das Subjekt wechselt nicht ausdrücklich. Die Verbform und der Zusammenhang führen Iulia weiter.'],
 ['Zeitliche Gliederung','„Primo tacuit. Deinde respondit.“ Welches Wort markiert den zweiten Schritt?','deinde','primo','tacuit','Deinde bedeutet „danach“ und ordnet den zweiten Vorgang ein.'],
 ['Textsignale','„Multi tacent. Sed unus clamat.“ Welche Beziehung zeigt sed?','einen Gegensatz','eine Begründung','ein Ziel','Sed bedeutet „aber“. Es stellt den Einzelnen der stillen Gruppe gegenüber.'],
 ['Inhalt zusammenfassen','„Flumen crescit. Incolae timent. Tandem in montem fugiunt.“ Welche Überschrift passt?','Flucht vor dem steigenden Fluss','Ein Fest am Fluss','Rückkehr vom Berg','Der Fluss steigt, die Bewohner bekommen Angst und fliehen schließlich auf einen Berg.']
]);
