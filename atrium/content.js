'use strict';
const lessons = [
 'Nominativ und Präsens', 'Akkusativ und Personalendungen', 'Imperativ, Vokativ und Dativ',
 'Ablativ, velle und nolle', 'Genitiv und Neutra', 'Adjektive und Kongruenz',
 'Der AcI und posse', 'Imperfekt und Perfekt', 'Perfekt und Zeitverhältnisse',
 'Plusquamperfekt und is', 'Relativsätze und Futur', 'Reflexivpronomen und ire'
];
const bookIntroduction = {"amica": 4, "puella": 3, "audire": 2, "vocare": 3, "laudare": 6, "dare": 2, "monere": 9, "filia": 10, "habere": 6, "villa": 27, "gladius": 3, "templum": 6, "forum": 7, "pulcher": 7, "ager": 10, "civitas": 10, "dicere": 5, "putare": 8, "rex": 10, "urbs": 9, "manere": 9, "narrare": 3, "subito": 2, "ego": 2, "tu": 2, "venire": 1, "mittere": 10, "dies": 13, "hora": 25, "iam": 1, "tum": 1, "antea": 26, "postea": 5, "semper": 2, "saepe": 7, "vincere": 9, "petere": 5};
const vocabulary = [
 'equus|das Pferd;servus|der Sklave;amica|die Freundin;dominus|der Herr;puella|das Mädchen;videre|sehen;audire|hören;esse|sein;clamare|rufen;stare|stehen;et|und;non|nicht',
 'amicus|der Freund;vocare|rufen, nennen;laudare|loben;ad|zu … hin;per|durch;via|der Weg',
 'dare|geben;monere|mahnen;parere|gehorchen;ancilla|die Sklavin;filia|die Tochter;habere|haben',
 'cum|mit;ex|aus … heraus;velle|wollen;nolle|nicht wollen;villa|das Landhaus;gladius|das Schwert',
 'templum|der Tempel;forum|der Marktplatz;donum|das Geschenk;legere|lesen;scribere|schreiben;verbum|das Wort',
 'bonus|gut;magnus|groß;pulcher|schön;ager|der Acker;capere|fangen, nehmen;puer|der Junge',
 'posse|können;clamor|das Geschrei;labor|die Arbeit;civitas|die Bürgerschaft;dicere|sagen;putare|glauben, meinen',
 'rex|der König;urbs|die Stadt;manere|bleiben;narrare|erzählen;quia|weil;subito|plötzlich',
 'ego|ich;tu|du;nos|wir;vos|ihr;venire|kommen;mittere|schicken',
 'dies|der Tag;hora|die Stunde;iam|schon;tum|damals, dann;antea|vorher;postea|nachher',
 'cras|morgen;semper|immer;saepe|oft;vincere|siegen, besiegen;servare|retten;petere|erstreben, aufsuchen',
 'ire|gehen;fortis|tapfer;celer|schnell;felix|glücklich;omnis|jeder, ganz;se|sich'
].flatMap((line,i)=>line.split(';').map((entry,j)=>{let [latin,de]=entry.split('|');return {id:'v'+(i+1)+'-'+j,kind:'v',lesson:bookIntroduction[latin]||i+1,latin,de}}));
const grammar = [];
function question(l,topic,prompt,correct,wrong,why){
 grammar.push({id:'g'+grammar.length,kind:'g',lesson:l,topic,prompt,correct,wrong,why});
}
question(1,'Subjekt','Wer handelt in „Equus stat“ (Das Pferd steht)?','equus',['stat','beide Wörter'],'Frage „Wer oder was steht?“. Equus ist das Subjekt und steht im Nominativ.');
question(1,'Prädikat','Welches Wort ist in „Amica clamat“ das Prädikat?','clamat',['amica','beide Wörter'],'Das Prädikat sagt, was geschieht. Clamat bedeutet „sie ruft“.');
question(1,'Numerus','Wie übersetzt du „Equi stant“?','Die Pferde stehen.',['Das Pferd steht.','Die Pferde rufen.'],'Equi und stant stehen beide im Plural. Stare bedeutet „stehen“.');
question(1,'Präsens','Welche Form ergänzt „Puellae …“ (Die Mädchen rufen)?','clamant',['clamat','clamare'],'Das Subjekt steht im Plural. Die 3. Person Plural erkennst du an -nt.');
question(1,'Infinitiv','Welches Wort ist ein Infinitiv?','audire',['audit','audiunt'],'Audire ist die Grundform „hören“. Audit und audiunt sind Personalformen.');
question(1,'esse','Wie übersetzt du „Sunt“ als ganzen Satz?','Sie sind.',['Er ist.','Sie hören.'],'Sunt ist die 3. Person Plural von esse. Das Subjekt kann in der Verbform stecken.');
question(2,'Akkusativ','Wen sieht die Freundin in „Amica equum videt“?','das Pferd',['die Freundin','den Herrn'],'Equum ist der Akkusativ Singular von equus. Er antwortet auf „Wen oder was?“.');
question(2,'Personalendungen','Wie heißt „du hörst“?','audis',['audio','audit'],'Die Endung -s zeigt die 2. Person Singular an.');
question(2,'Präpositionen','Ergänze „per …“ für „durch die Villa“.','villam',['villa','villae'],'Per steht mit dem Akkusativ. Villa bildet den Akkusativ Singular auf -am.');
question(3,'Imperativ','Wie rufst du mehreren Kindern „Hört!“ zu?','Audite!',['Audi!','Audiunt!'],'Der Imperativ Plural von audire lautet audite. Audi richtet sich an eine Person.');
question(3,'Vokativ','Wie sprichst du Marcus direkt an?','Marce!',['Marcum!','Marci!'],'Bei Namen auf -us wie Marcus endet der Vokativ Singular auf -e.');
question(3,'Dativ','Wem gibt die Freundin ein Geschenk? „Amica puellae donum dat.“','dem Mädchen',['der Freundin','dem Pferd'],'Puellae ist hier Dativ Singular und gibt die Empfängerin an.');
question(3,'Dativ des Besitzers','Was bedeutet „Marco equus est“?','Marcus hat ein Pferd.',['Marcus ist ein Pferd.','Das Pferd sieht Marcus.'],'Wörtlich heißt es „Dem Marcus ist ein Pferd“. Der Dativ nennt den Besitzer.');
question(4,'Ablativ','Welche Form passt zu „mit dem Freund“?','cum amico',['cum amicum','cum amicus'],'Cum verlangt den Ablativ. Bei amicus lautet er im Singular amico.');
question(4,'Ablativ des Mittels','Was gibt „gladio“ in „Miles gladio pugnat“ an?','womit der Soldat kämpft',['gegen wen er kämpft','wo er kämpft'],'Der Ablativ des Mittels antwortet auf „Womit?“. Gladio heißt „mit dem Schwert“.');
question(4,'velle und nolle','Wie übersetzt du „Nolumus“?','Wir wollen nicht.',['Sie wollen nicht.','Wir wollen.'],'Nolumus ist die 1. Person Plural von nolle.');
question(5,'Genitiv','Was bedeutet „equus amici“?','das Pferd des Freundes',['der Freund des Pferdes','die Pferde der Freunde'],'Amici bestimmt hier equus näher. Der Genitiv antwortet auf „Wessen?“.');
question(5,'Neutra','Wie lautet der Nominativ Plural von templum?','templa',['templi','templos'],'Bei Neutra der o-Deklination enden Nominativ und Akkusativ Plural auf -a.');
question(5,'Konsonantische Konjugation','Welche Form bedeutet „sie lesen“ (Plural)?','legunt',['legit','legimus'],'Legere gehört zur konsonantischen Konjugation. Die 3. Person Plural lautet legunt.');
question(6,'KNG-Kongruenz','Ergänze „puellam …“ (das tapfere Mädchen) mit einer Form von strenuus.','strenuam',['strenuus','strenuo'],'Adjektiv und Bezugswort stimmen in Kasus, Numerus und Genus überein. Hier stehen beide im Akkusativ Singular Femininum.');
question(6,'Adjektive','Welche Übersetzung passt zu „Templum magnum est“?','Der Tempel ist groß.',['Der große Tempel steht.','Die Tempel sind groß.'],'Magnum ist ein Prädikatsnomen und bezieht sich auf das Neutrum templum.');
question(6,'i-Erweiterung','Wie heißt „ich fange“ von capere?','capio',['capo','capit'],'Capere hat eine i-Erweiterung. Die 1. Person Singular lautet capio.');
question(6,'Satzfragen','Was signalisiert -ne in „Venitne Marcus“?','eine Entscheidungsfrage',['eine Verneinung','einen Befehl'],'-ne kennzeichnet eine Frage, auf die man mit Ja oder Nein antworten kann.');
question(7,'AcI','Wie übersetzt du „Video equum currere“?','Ich sehe, dass das Pferd läuft.',['Das Pferd sieht, dass ich laufe.','Ich laufe zum Pferd.'],'Equum ist der Subjektsakkusativ und currere der Infinitiv. Im deutschen dass-Satz wird das Pferd zum Subjekt.');
question(7,'posse','Was bedeutet „Possumus“?','Wir können.',['Ihr könnt.','Sie können.'],'Possumus ist die 1. Person Plural von posse.');
question(7,'3. Deklination','Wie lautet der Akkusativ Singular von clamor, clamoris?','clamorem',['clamorum','clamores'],'Am Genitiv erkennst du den Stamm clamor-. Der Akkusativ Singular endet hier auf -em.');
question(8,'Imperfekt','Welche Form steht im Imperfekt?','clamabat',['clamat','clamavit'],'Am Tempuszeichen -ba- erkennst du das Imperfekt.');
question(8,'Perfekt','Welche Form bedeutet „er hat gerufen“?','clamavit',['clamabat','clamat'],'Clamavit gehört zum Perfektstamm clamav-.');
question(8,'Nebensätze','Welche Beziehung drückt quia („weil“) aus?','einen Grund',['eine Zeitangabe','eine Bedingung'],'Ein mit quia eingeleiteter Nebensatz begründet die Aussage des Hauptsatzes.');
question(9,'AcI und Zeit','„Dicit amicum venisse.“ Wann kommt der Freund im Verhältnis zum Sagen?','vor dem Sagen',['gleichzeitig','erst danach'],'Der Infinitiv Perfekt venisse bezeichnet im AcI Vorzeitigkeit.');
question(9,'Perfektstämme','Welcher Infinitiv gehört zur Perfektform misi?','mittere',['manere','monere'],'Mitto, mittere, misi. Der Perfektstamm unterscheidet sich vom Präsensstamm.');
question(9,'Personalpronomen','Was bedeutet „Vos video“?','Ich sehe euch.',['Ihr seht mich.','Wir sehen euch.'],'Video ist die 1. Person Singular. Vos steht hier als Objekt im Akkusativ.');
question(10,'Plusquamperfekt','Wie übersetzt du „Amica venerat“?','Die Freundin war gekommen.',['Die Freundin kommt.','Die Freundin wird kommen.'],'Venerat besteht aus dem Perfektstamm ven- und -erat. Die Handlung lag vor einem anderen vergangenen Ereignis.');
question(10,'Pronomen is','Ersetze „den Freund“ in „Amicum video“ durch „ihn“.','Eum video.',['Is video.','Eos video.'],'Eum ist der Akkusativ Singular Maskulinum von is.');
question(10,'Ablativ der Zeit','Welche Frage beantwortet „tertia hora“ (zur dritten Stunde)?','Wann?',['Wie lange?','Wohin?'],'Der Ablativ der Zeit gibt den Zeitpunkt an.');
question(11,'Relativsätze','Ergänze „Puella, … cantat, laeta est“ (Das Mädchen, das singt, ist fröhlich).','quae',['quem','quod'],'Quae passt zu puella in Genus und Numerus. Im Relativsatz ist es das Subjekt und steht im Nominativ.');
question(11,'Futur','Welche Form bedeutet „wir werden loben“?','laudabimus',['laudabamus','laudavimus'],'Laudabimus ist Futur, laudabamus Imperfekt und laudavimus Perfekt.');
question(11,'Relativpronomen','Wodurch wird der Kasus eines Relativpronomens bestimmt?','durch seine Aufgabe im Relativsatz',['immer durch den Kasus des Bezugsworts','immer durch das Hauptverb'],'Das Bezugswort gibt Genus und Numerus vor. Die Satzgliedfunktion im Relativsatz bestimmt den Kasus.');
question(12,'Reflexivpronomen','Auf wen bezieht sich se in „Marcus dicit se currere“?','auf Marcus selbst',['auf den Zuhörer','auf einen anderen Läufer'],'Se verweist hier auf das Subjekt des übergeordneten Satzes. Marcus sagt, dass er selbst läuft.');
question(12,'ire','Was bedeutet „Eunt“?','Sie gehen.',['Er geht.','Wir gehen.'],'Eunt ist die 3. Person Plural Präsens von ire.');
question(12,'Adjektive der 3. Deklination','Welche Form ergänzt „puer …“ (der glückliche Junge) mit felix im Nominativ Singular?','felix',['felicem','felices'],'Felix ist ein einendiges Adjektiv. Im Nominativ Singular gilt dieselbe Form für alle drei Genera.');
