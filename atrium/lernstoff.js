'use strict';

// The entries follow the schoolbook's lesson order. Each example is a new practice sentence.
const lessonNotes = [
  {
    rule: 'Die Endung eines Verbs verrät, wer handelt. Bei einer Person oder Sache steht in der 3. Person meist -t, bei mehreren steht -nt.',
    example: 'Equus stat. Equi stant.',
    translation: 'Das Pferd steht. Die Pferde stehen.',
    tip: 'Lies zuerst das Verb. Frage dann „Wer steht?“ und suche das passende Wort im Nominativ.'
  },
  {
    rule: 'Der Nominativ nennt, wer handelt. Der Akkusativ nennt oft, wen oder was die Handlung trifft.',
    example: 'Servum amicus videt.',
    translation: 'Der Freund sieht den Sklaven.',
    tip: 'Servum steht ganz vorn. Die Endung -um zeigt trotzdem, wen der Freund sieht.'
  },
  {
    rule: 'Der Vokativ spricht jemanden direkt an. Der Dativ antwortet auf „Wem?“. Beide können im selben Befehl vorkommen.',
    example: 'Marce, amico responde!',
    translation: 'Marcus, antworte dem Freund!',
    tip: 'Responde ist der Befehl an eine Person. Rufst du mehrere auf, heißt es respondete!'
  },
  {
    rule: 'Cum mit Ablativ sagt, mit wem jemand etwas tut. Zu velle und nolle passt ein Infinitiv, der sagt, was jemand tun will.',
    example: 'Cum amica venire volo.',
    translation: 'Ich will mit der Freundin kommen.',
    tip: 'Volo nennt den Wunsch, venire die gewünschte Handlung. Cum amica gibt die Begleitung an.'
  },
  {
    rule: 'Mit dem Genitiv kannst du ausdrücken, zu wem etwas gehört. Er steht oft direkt bei dem Wort, das er näher erklärt.',
    example: 'Dona amicorum video.',
    translation: 'Ich sehe die Geschenke der Freunde.',
    tip: 'Frage zuerst „Was sehe ich?“ und dann „Wessen Geschenke?“. Dona ist ein Neutrum im Plural.'
  },
  {
    rule: 'Ein Adjektiv passt sich seinem Bezugswort in Kasus, Numerus und Genus an. Dafür steht die Abkürzung KNG.',
    example: 'Puer donum magnum habet.',
    translation: 'Der Junge hat ein großes Geschenk.',
    tip: 'Donum ist Akkusativ Singular Neutrum. Genau diese drei Eigenschaften muss auch die Form von magnus haben.'
  },
  {
    rule: 'Nach einem Verb des Wahrnehmens kann ein Akkusativ mit Infinitiv stehen, kurz AcI. Im deutschen dass-Satz wird der Akkusativ zum Subjekt.',
    example: 'Audio mercatorem clamare.',
    translation: 'Ich höre, dass der Händler ruft.',
    tip: 'Was höre ich? Einen ganzen Vorgang. Wer ruft? Der Händler. Das verrät der Akkusativ mercatorem.'
  },
  {
    rule: 'In einer Erzählung beschreibt das Imperfekt oft, was im Hintergrund andauerte. Das Perfekt kann dann das nächste Ereignis erzählen.',
    example: 'Populus clamabat. Subito leo apparuit.',
    translation: 'Die Menge rief. Plötzlich erschien ein Löwe.',
    tip: 'Am -ba- in clamabat erkennst du das Imperfekt. Die beiden deutschen Präteritumformen klingen ähnlich, erfüllen hier aber verschiedene Aufgaben.'
  },
  {
    rule: 'Der Infinitiv im AcI verrät die Reihenfolge. Ein Infinitiv Präsens zeigt Gleichzeitigkeit, ein Infinitiv Perfekt zeigt Vorzeitigkeit.',
    example: 'Mater videt tectum cecidisse.',
    translation: 'Die Mutter sieht, dass das Dach eingestürzt ist.',
    tip: 'Stell dir zwei Bilder vor. Erst fällt das Dach, dann sieht die Mutter es. Cecidisse gehört zu cadere und endet auf -isse.'
  },
  {
    rule: 'Das Plusquamperfekt erzählt, was vor einem anderen Ereignis in der Vergangenheit geschehen war. Du findest es am Perfektstamm mit -era- und Personalendung.',
    example: 'Rex discesserat. Tum nuntius venit.',
    translation: 'Der König war weggegangen. Dann kam der Bote.',
    tip: 'Setze die Ereignisse auf einen Zeitstrahl. Discesserat gehört auf den früheren Punkt.'
  },
  {
    rule: 'Das Relativpronomen übernimmt Genus und Numerus von seinem Bezugswort. Seinen Kasus bestimmt die Aufgabe, die es im Relativsatz hat.',
    example: 'Puella, quam frater vocat, venit.',
    translation: 'Das Mädchen, das der Bruder ruft, kommt.',
    tip: 'Frage innerhalb des Relativsatzes „Wen ruft der Bruder?“. Darum steht dort quam im Akkusativ.'
  },
  {
    rule: 'Se weist auf das Subjekt zurück. In einer Aussage mit AcI kann es sich auf die Person beziehen, die etwas sagt.',
    example: 'Marcus dicit se ad forum ire.',
    translation: 'Marcus sagt, dass er selbst zum Forum geht.',
    tip: 'Ire ist der Infinitiv. Setze statt se beim Übersetzen zunächst den Namen Marcus ein.'
  },
  {
    rule: 'Beim Passiv erfährt das Subjekt eine Handlung. Mit a oder ab und Ablativ kannst du die handelnde Person dazusetzen.',
    example: 'Amicus a pueris vocatur.',
    translation: 'Der Freund wird von den Jungen gerufen.',
    tip: 'Vocatur endet auf -tur. Im Imperfekt Passiv hieße es vocabatur, also „er wurde gerufen“.'
  },
  {
    rule: 'Für das Perfekt Passiv brauchst du das Partizip Perfekt Passiv (PPP) und eine Präsensform von esse. Mit erat oder erant entsteht das Plusquamperfekt Passiv.',
    example: 'Naves servatae erant.',
    translation: 'Die Schiffe waren gerettet worden.',
    tip: 'Servatae passt im Femininum Plural zu naves. Erant legt fest, wie weit du zeitlich zurückblickst.'
  },
  {
    rule: 'Ein Partizip kann ein Nomen näher beschreiben. Beim Participium coniunctum (PC) hat das Partizip denselben Kasus, Numerus und dasselbe Genus wie sein Bezugswort.',
    example: 'Nauta e mari servatus gaudet.',
    translation: 'Der Seemann freut sich, nachdem er aus dem Meer gerettet worden ist.',
    tip: 'Servatus gehört zu nauta. Das PPP verrät, dass die Rettung vor der Freude liegt.'
  },
  {
    rule: 'Ein PC lässt sich oft als Nebensatz wiedergeben. Überlege, ob der Zusammenhang eine Zeitangabe, einen Grund oder einen Gegensatz nahelegt.',
    example: 'Puer dono delectatus ridet.',
    translation: 'Der Junge lacht, weil er sich über das Geschenk freut.',
    tip: 'Wörtlich bedeutet dono delectatus „durch das Geschenk erfreut“. Mit „weil“ wird der Grund für das Lachen deutlich.'
  },
  {
    rule: 'Das Partizip Präsens Aktiv (PPA) beschreibt eine gleichzeitige Handlung. In seinen Formen findest du -ns oder -nt-.',
    example: 'Sororem ridentem video.',
    translation: 'Ich sehe meine Schwester, wie sie lacht.',
    tip: 'Ridentem und sororem stehen beide im Akkusativ Singular. Das Lachen geschieht zur selben Zeit wie das Sehen.'
  },
  {
    rule: 'Ein unerfüllter Wunschzustand lässt sich als Wenn-Satz ausdrücken. Im Irrealis der Gegenwart steht Konjunktiv Imperfekt, im Irrealis der Vergangenheit Konjunktiv Plusquamperfekt.',
    example: 'Si portam aperuisses, intravissem.',
    translation: 'Wenn du das Tor geöffnet hättest, wäre ich hineingegangen.',
    tip: 'Suche -isse- in beiden Verbformen. Der Sprecher schaut auf eine Möglichkeit zurück, die er verpasst hat.'
  },
  {
    rule: 'Beim Ablativus absolutus bilden ein Nomen und ein Partizip im Ablativ eine eigene kleine Aussage. Im Deutschen passt oft ein Nebensatz.',
    example: 'Epistula lecta Iulia ridet.',
    translation: 'Nachdem der Brief gelesen worden ist, lacht Julia.',
    tip: 'Klammere epistula lecta ein. Außerhalb der Klammer bleiben Subjekt und Prädikat des Hauptsatzes übrig.'
  },
  {
    rule: 'Ein Nebensatz mit ut und Konjunktiv kann ein Ziel nennen. Ne leitet ein verneintes Ziel ein. Nach tam („so“) kündigt ut häufig eine Folge an.',
    example: 'Portam aperit, ut equus exeat.',
    translation: 'Er öffnet das Tor, damit das Pferd hinausgeht.',
    tip: 'Frage „Wozu öffnet er das Tor?“. Die Antwort ist sein Ziel.'
  },
  {
    rule: 'Eine indirekte Frage hängt von einem anderen Satz ab. Ihr Verb steht im Konjunktiv. Nach einem Hauptverb im Präsens zeigt Konjunktiv Perfekt eine frühere Handlung.',
    example: 'Quaero, quid amica viderit.',
    translation: 'Ich frage, was die Freundin gesehen hat.',
    tip: 'Sie hat etwas gesehen, bevor ich frage. Auf Deutsch reicht hier der Indikativ.'
  },
  {
    rule: 'Ne mit Konjunktiv Perfekt kann eine Person auffordern, etwas zu unterlassen. Diese Form des Verbots heißt Prohibitiv.',
    example: 'Ne portam clauseris!',
    translation: 'Schließ das Tor nicht!',
    tip: 'Die Form clauseris sieht nach Vergangenheit aus. Die Äußerung ist eine Aufforderung für jetzt.'
  },
  {
    rule: 'Das Gerundium macht aus einem Verb ein Nomen. Mit causa kannst du damit einen Zweck ausdrücken. Dabei steht das Gerundium im Genitiv vor causa.',
    example: 'Discendi causa venit.',
    translation: 'Er kommt, um zu lernen.',
    tip: 'Discendi gehört zu discere. Für das deutsche „um zu“ schaust du auf die ganze Verbindung discendi causa.'
  },
  {
    rule: 'Beim Vergleichen steht der Vergleichsmaßstab oft im Ablativ. Dann ergänze beim Übersetzen „als“.',
    example: 'Hic equus illo equo celerior est.',
    translation: 'Dieses Pferd ist schneller als jenes Pferd.',
    tip: 'Celerior verrät den Vergleich. Frage „Schneller als wer?“ und suche die Form im Ablativ.'
  },
  {
    rule: 'Ein Gerundivum mit esse drückt aus, was getan werden muss. Ein Dativ kann nennen, wer dafür zuständig ist.',
    example: 'Haec epistula mihi scribenda est.',
    translation: 'Diesen Brief muss ich schreiben.',
    tip: 'Epistula ist das lateinische Subjekt. Im deutschen Satz kannst du die Person mihi („mir“) zum Subjekt „ich“ machen.'
  },
  {
    rule: 'Das Partizip Futur Aktiv (PFA) beschreibt etwas, das jemand vorhat oder demnächst tun wird. Du erkennst es an -ur- vor der Adjektivendung.',
    example: 'Amici discessuri sunt.',
    translation: 'Die Freunde haben vor aufzubrechen.',
    tip: 'Discessuri gehört zu discedere und steht wie amici im Nominativ Plural Maskulinum.'
  },
  {
    rule: 'Der Infinitiv Futur Aktiv besteht aus dem PFA und esse. Im AcI zeigt er, dass die Handlung später als das Sagen, Denken oder Hoffen geschieht.',
    example: 'Dixit amicos venturos esse.',
    translation: 'Er sagte, dass die Freunde kommen würden.',
    tip: 'Vergleiche venire („gleichzeitig“), venisse („vorher“) und venturos esse („später“).'
  },
  {
    rule: 'Beim Nominativ mit Infinitiv (NcI) steht die Person im Nominativ. Zu Wendungen wie dicitur passt auf Deutsch oft „man sagt, dass …“.',
    example: 'Amici adesse dicuntur.',
    translation: 'Man sagt, dass die Freunde da sind.',
    tip: 'Achte auf den Plural. Amici und dicuntur gehören zusammen. Adesse sagt, was man über die Freunde berichtet.'
  },
  {
    rule: 'Suche beim Zerlegen eines langen Satzes zuerst die Verben mit Personalendung. Markiere danach Einleitewörter für Nebensätze und suche den Hauptsatz.',
    example: 'Cum custos clamaret, fur, qui vinum portabat, fugit.',
    translation: 'Als der Wächter rief, floh der Dieb, der Wein trug.',
    tip: 'Decke zuerst cum custos clamaret und dann qui vinum portabat ab. Als Hauptsatz bleibt fur fugit.'
  },
  {
    rule: 'Verfolge beim Lesen Personen, Orte und Zeitangaben. Kleine Wörter wie ibi, sed und tandem zeigen, wie zwei Sätze zusammenhängen.',
    example: 'Iulia ad flumen venit. Ibi navem vidit. Tandem ascendit.',
    translation: 'Julia kam zum Fluss. Dort sah sie ein Schiff. Schließlich stieg sie ein.',
    tip: 'Ibi weist auf den Fluss zurück. In allen drei Sätzen handelt Julia, obwohl ihr Name nur einmal erscheint.'
  }
];

function coursePractice(lesson, key, topic, prompt, correct, wrong, why) {
  question(lesson, topic, prompt, correct, wrong, why);
  // Keep review records stable when questions are added to earlier lessons.
  grammar[grammar.length - 1].id = 'praxis-' + lesson + '-' + key;
}

coursePractice(1,'paar','Subjekt und Prädikat','Ergänze „Equi …“, sodass „Die Pferde kommen“ entsteht.','veniunt',['venit','venire'],'Equi steht im Plural. Die Form veniunt passt dazu in der 3. Person Plural.');
coursePractice(1,'person','Subjekt im Prädikat','Lucia zeigt auf mehrere Pferde und sagt nur „Stant“. Welches Wort ergänzt du im Deutschen?','sie',['du','wir'],'Die Endung -nt nennt mehrere Handelnde in der 3. Person. Das ganze Verb heißt „sie stehen“.');
coursePractice(2,'tausch','Kasus und Wortstellung','In „Amicum servus vocat“ soll jetzt der Freund den Sklaven rufen. Welcher Satz passt?','Servum amicus vocat.',['Amicum servus vocat.','Servi amicum vocant.'],'Amicus ist der Nominativ und servum der Akkusativ. So haben die Personen ihre Rollen getauscht.');
coursePractice(2,'nos','1. Person Plural','Ergänze „Wir sitzen“ mit der richtigen Form von sedere.','sedemus',['sedetis','sedent'],'Wir erkennst du an der Endung -mus. -tis gehört zu ihr, -nt zu sie.');
coursePractice(3,'befehle','Imperativ Singular','Zwei Freunde sollen kommen: „Venite!“. Wie rufst du nur einen?','Veni!',['Venit!','Venire!'],'Der Imperativ Singular von venire ist veni. Venit ist eine Aussage über die 3. Person.');
coursePractice(3,'empfaenger','Dativ Plural','„Puella servis aquam dat.“ Wem gibt das Mädchen Wasser?','den Sklaven',['dem Mädchen','dem Sklaven'],'Servis ist hier der Dativ Plural von servus. Er nennt die Empfänger.');
coursePractice(4,'herkunft','Präposition mit Ablativ','Welcher Ausdruck heißt „aus dem Wald“?','e silva',['ad silvam','per silvam'],'E oder ex steht mit dem Ablativ und gibt die Herkunft an. Ad nennt das Ziel, per den Weg hindurch.');
coursePractice(4,'wunsch','velle','Die Freunde sagen „Wir wollen bleiben“. Wie ergänzen sie „Manere …“?','volumus',['vultis','nolumus'],'Volumus ist die 1. Person Plural von velle. Das Gewünschte steht im Infinitiv manere.');
coursePractice(5,'neutrum','Neutra im Plural','„Dona puellis damus.“ Welche Rolle hat dona?','Akkusativobjekt',['Subjekt','Dativobjekt'],'Damus heißt „wir geben“. Was geben wir? Die Geschenke. Bei Neutra können Nominativ und Akkusativ gleich aussehen.');
coursePractice(5,'besitz','Genitiv Plural','Ergänze „verba …“ für „die Worte der Freunde“.','amicorum',['amicos','amicis'],'Amicorum ist der Genitiv Plural von amicus. Er beantwortet die Frage „Wessen Worte?“.');
coursePractice(6,'stamm','Nomen auf -er','Wie lautet der Akkusativ Singular zu puer?','puerum',['puerorum','pueri'],'Der Stamm puer- behält sein e. Für den Akkusativ Singular der o-Deklination kommt -um hinzu.');
coursePractice(6,'wortfrage','Wortfragen','„Ubi puer est?“ Welche Antwort passt zur Frage?','In templo.',['Magnus est.','Puer est.'],'Ubi fragt „Wo?“. In templo bedeutet „im Tempel“.');
coursePractice(7,'stamm','Stamm der 3. Deklination','Du kennst civitas, civitatis. Wie bildet man den Akkusativ Singular?','civitatem',['civitasem','civitatum'],'Nimm vom Genitiv civitatis die Endung -is weg. An civitat- hängst du für diesen Akkusativ -em.');
coursePractice(7,'koennen','posse und Infinitiv','Welche Übersetzung passt zu „Volare non potes“?','Du kannst nicht fliegen.',['Du willst nicht fliegen.','Ihr könnt nicht fliegen.'],'Potes ist die 2. Person Singular von posse. Volare nennt die Handlung.');
coursePractice(8,'hilfsverb','Perfekt von esse','„Gladiator in arena fuit.“ Wie gibst du fuit wieder?','er war',['er ist','sie waren'],'Fuit ist die 3. Person Singular Perfekt von esse. Der Perfektstamm lautet fu-.');
coursePractice(8,'folge','Erzählen mit zwei Zeiten','„Pueri spectabant. Subito leo venit.“ Welches Wort deutet auf ein neues, plötzliches Ereignis hin?','subito',['pueri','spectabant'],'Subito heißt „plötzlich“. Spectabant beschreibt mit dem Imperfekt, was die Jungen vorher schon taten.');
coursePractice(9,'perfekt','Perfekt ohne Stammwechsel','„Mater tectum reliquit. Filius in via constitit.“ Welche Form ist ein Perfekt zu relinquere?','reliquit',['tectum','mater'],'Reliquit ist die 3. Person Singular Perfekt zu relinquere. Vergleiche das Präsens relinquit mit -nqu-.');
coursePractice(9,'zahl','3. Deklination im Kontext','„Patres filios vocant.“ Wer ruft hier?','die Väter',['den Vater','die Söhne'],'Filios ist Akkusativ Plural. Patres ist hier Nominativ Plural und passt zum Prädikat vocant.');
coursePractice(10,'pronomen','is, ea, id','„Filia venit. Pater eam videt.“ Auf wen weist eam zurück?','auf die Tochter',['auf den Vater','auf beide zusammen'],'Eam ist Akkusativ Singular Femininum. Vorher ist von filia die Rede.');
coursePractice(10,'frueher','Vorvergangenheit','„Rex iam discesserat, cum filius venit.“ Wer ist früher weggegangen?','der König',['der Sohn','beide zugleich'],'Discesserat ist Plusquamperfekt. Der König war bereits weg, als der Sohn kam.');
coursePractice(11,'futur','Futur der konsonantischen Konjugation','Wie ergänzt du „Der Freund wird einen Brief schreiben“ mit scribere?','scribet',['scribit','scripsit'],'Bei scribere endet die 3. Person Singular im Futur auf -et. Scribit ist Präsens.');
coursePractice(11,'relativ','Bezugswort im Plural','„Video puellas, quae cantant.“ Warum steht quae im Nominativ?','Die Mädchen singen im Relativsatz.',['Puellae wäre immer Nominativ.','Video verlangt im Hauptsatz Nominativ.'],'Im Relativsatz ist quae das Subjekt von cantant. Im Hauptsatz steht das Bezugswort puellas als Objekt.');
coursePractice(12,'adjektiv','Zweiendige Adjektive','Ergänze zu „ein tapferes Heer“ das Adjektiv in „agmen …“. Agmen ist Neutrum.','forte',['fortis','fortem'],'Das zweiendige Adjektiv fortis, forte hat im Nominativ Singular Neutrum die Form forte.');
coursePractice(12,'rueckbezug','Reflexiv und nicht reflexiv','„Rex dicit se redire.“ Wer kehrt nach Aussage des Königs zurück?','der König selbst',['ein anderer Mann','der Sprecher des deutschen Satzes'],'Se verweist hier auf rex. Als vollständiger Satz heißt es „Der König sagt, dass er selbst zurückkehrt“.');
coursePractice(13,'passiv','Perfekt Passiv erkennen','Welche Form bedeutet „Sie ist gerettet worden“?','Servata est.',['Servat.','Servabatur.'],'Perfekt Passiv besteht aus PPP und einer Präsensform von esse. Servata weist hier auf ein weibliches Subjekt.');
coursePractice(13,'edekl','e-Deklination','„Magnam spem habemus.“ Welche Form steht im Akkusativ Singular?','spem',['spes','spei'],'Bei spes endet der Akkusativ Singular auf -em. Magnam steht ebenfalls im Akkusativ Singular.');
coursePractice(14,'neutrum','Neutra der 3. Deklination','Das Nomen tempus hat den Genitiv temporis. Welche Form heißt „die Zeiten“ im Nominativ?','tempora',['tempores','temporis'],'Der Stamm ist tempor-. Beim Neutrum tempus endet der Nominativ Plural auf -a.');
coursePractice(14,'ppp','PPP anpassen','„Portae … erant“ soll „Die Tore waren geschlossen worden“ heißen. Welche Form passt?','clausae',['clausam','clausus'],'Portae ist hier Nominativ Plural Femininum. Das PPP clausae stimmt damit überein.');
coursePractice(15,'adv','Adverbien bilden','Aus clarus („laut, klar“) soll ein Adverb werden: „Er ruft laut.“ Wie ergänzt du „… clamat“?','clare',['clarum','clarus'],'Bei vielen Adjektiven der a-/o-Deklination entsteht das Adverb auf -e.');
coursePractice(15,'abl','i-Stamm im Ablativ','„In mari“ bedeutet „im Meer“. Welcher Kasus liegt bei mari vor?','Ablativ Singular',['Genitiv Plural','Nominativ Plural'],'In mit der Frage „Wo?“ steht hier mit Ablativ. Mare bildet den Ablativ Singular auf -i.');
coursePractice(16,'udu','u-Deklination im Kontext','„Metum superat.“ Um welche Form von metus („Furcht“) handelt es sich?','Akkusativ Singular',['Dativ Singular','Genitiv Plural'],'Metum ist das Objekt zu superat. Der Satz bedeutet „Er überwindet die Furcht“.');
coursePractice(16,'transfer','PC mit kausalem Sinn','„Nautae tempestate territi portum petunt.“ Welche Übersetzung erklärt den Grund für die Fahrt in den Hafen?','Weil der Sturm sie erschreckt hat, steuern die Seeleute den Hafen an.',['Bevor der Sturm kommt, verlassen die Seeleute den Hafen.','Die Seeleute fahren los, um den Sturm zu erschrecken.'],'Territi bezieht sich auf nautae. Der Sturm hat sie erschreckt und damit ihre Entscheidung ausgelöst.');
coursePractice(17,'ille','hic und ille','Zwei Tore sind zu sehen, eines hier und eines dort. Welche Form bedeutet „jenes Tor dort“?','illa porta',['haec porta','illud templum'],'Porta ist feminin. Im Nominativ Singular lautet die feminine Form von ille hier illa.');
coursePractice(17,'ppa','PPA im Akkusativ','„Custos venientem puerum videt.“ Wer kommt?','der Junge',['der Wächter','beide gleichzeitig'],'Venientem passt zu puerum. Übersetze „Der Wächter sieht den Jungen kommen“.');
coursePractice(18,'genitiv','Genitivus subiectivus','„Amor matris“ meint hier die Liebe, die eine Mutter empfindet. Was tut die Mutter in der Umschreibung?','Sie liebt.',['Man liebt sie.','Man gibt ihr ein Geschenk.'],'Der Genitivus subiectivus nennt die Person, die in der Umschreibung selbst handelt oder empfindet.');
coursePractice(18,'irreal','Irrealis bilden','In welchem Satz ist ein Wunschzustand der Gegenwart gemeint?','Si adesses, gauderem.',['Si adfuisses, gavisus essem.','Si ades, gaudeo.'],'Adesses und gauderem gehören zum Konjunktiv Imperfekt: „Wenn du da wärst, würde ich mich freuen“.');
coursePractice(19,'genitiv','Genitiv der Beschaffenheit','„Vir magni ingenii“ ist ein Mann …','von großer Begabung.',['mit einer großen Flotte.','mit einem großen Brief.'],'Magni ingenii ist ein Genitiv der Beschaffenheit. Ingenium bezeichnet hier die Begabung.');
coursePractice(19,'grund','cum mit begründendem Sinn','„Cum via longa sit, quiescimus.“ Welcher Nebensatz gibt den Grund für die Pause an?','Weil der Weg lang ist, …',['Damit der Weg lang werde, …','Falls der Weg früher lang gewesen wäre, …'],'Cum mit Konjunktiv kann begründen. Die Länge des Weges erklärt die Pause.');
coursePractice(20,'zugehoerig','Genitiv der Zugehörigkeit','„Boni amici est auxilium ferre.“ Was sagt boni amici hier aus?','Es ist die Aufgabe eines guten Freundes, Hilfe zu bringen.',['Ein guter Freund hat gestern Hilfe gebracht.','Gute Freunde werden um Hilfe bitten.'],'Der Genitiv bei est kennzeichnet hier, wessen Aufgabe oder Eigenart etwas ist.');
coursePractice(20,'umformen','Ablativus absolutus umformen','„Portis apertis populus intrat.“ Wie kannst du portis apertis mit einer Wortgruppe übersetzen?','nach dem Öffnen der Tore',['vor dem Schließen der Tore','wegen der engen Tore'],'Die Tore sind offen, bevor das Volk eintritt. Das PPP apertis beschreibt die vorherige Öffnung.');
coursePractice(21,'praedikativ','Prädikativum','„Puer primus advenit.“ Welche Übersetzung passt zu primus?','Der Junge kommt als Erster an.',['Zum ersten Jungen kommt jemand.','Der Junge verlässt den ersten Ort.'],'Primus passt in Kasus, Numerus und Genus zu puer und bezieht sich zugleich auf das Ankommen.');
coursePractice(21,'frage','Indirekte Entscheidungsfrage','„Quaerit num veniamus.“ Was möchte die Person wissen?','ob wir kommen',['wann wir kamen','warum wir fort sind'],'Num leitet hier eine indirekte Entscheidungsfrage ein. Im Deutschen übersetzt du mit „ob“.');
coursePractice(22,'adjekt','Adjektivisches Fragepronomen','Ergänze „… viam eligis?“ für „Welchen Weg wählst du?“.','Quam',['Quem','Quo'],'Viam ist Akkusativ Singular Femininum. Das adjektivische Fragepronomen muss dieselben Merkmale haben.');
coursePractice(22,'futur','Futur Passiv bilden','„Die Pferde werden gelobt werden.“ Welche Form von laudare passt?','laudabuntur',['laudabantur','laudabunt'],'-bu- ist hier das Futurzeichen, -ntur die Passivendung im Plural.');
coursePractice(23,'gerundium','Gerundium im Ablativ','„Legendo discimus.“ Wie lernen wir?','durch Lesen',['vor dem Lesen','trotz der Leser'],'Legendo ist der Ablativ des Gerundiums. Hier nennt er das Mittel, mit dem wir lernen.');
coursePractice(23,'deponens','Perfekt eines Deponens','„Amici eum secuti sunt.“ Was tun die Freunde in diesem Satz?','Sie sind ihm gefolgt.',['Sie wurden von ihm verfolgt.','Sie werden ihm folgen.'],'Secus ist hier keine Verbform. Das Perfekt von sequi wird mit dem Partizip secuti und sunt gebildet und aktiv übersetzt.');
coursePractice(24,'super','Superlativ','Welche Form bedeutet „der schnellste“ zu celer?','celerrimus',['celerius','celerior'],'Bei celer hat der Superlativ ein doppeltes r. Celerior ist der Komparativ.');
coursePractice(24,'nd','Gerundivum anpassen','Ergänze „ad epistulam …“ für „zum Schreiben des Briefes“.','scribendam',['scribendi','scribendos'],'Das Gerundivum ist ein Adjektiv. Scribendam passt zum Akkusativ Singular Femininum epistulam.');
coursePractice(25,'jussiv','Jussiv','„Puer intret!“ Welche Aufforderung ist gemeint?','Der Junge soll eintreten!',['Der Junge ist eingetreten!','Lass uns eintreten!'],'Intret ist die 3. Person Singular Konjunktiv Präsens. Als Jussiv fordert die Form eine Handlung.');
coursePractice(25,'superadv','Adverb im Superlativ','„Omnes celeriter currunt. Iulia celerrime currit.“ Wie läuft Julia?','am schnellsten',['etwas langsamer','genauso schnell'],'Celerrime ist der Superlativ des Adverbs celeriter und beschreibt das Laufen.');
coursePractice(26,'fieri','fieri im Plural','„Pueri viri fiunt.“ Wie übersetzt du fiunt?','sie werden',['sie machen','sie gingen'],'Fieri verbindet hier pueri und viri. Die Jungen werden zu Männern.');
coursePractice(26,'zeit','PFA im Satz','„Nautae profecturi naves parant.“ Was wollen die Seeleute nach dem Vorbereiten der Schiffe tun?','aufbrechen',['schon zurückgekehrt sein','ein Schiff versenkt haben'],'Profecturi ist das PFA zum Verb proficisci. Es bezeichnet das bevorstehende Aufbrechen.');
coursePractice(27,'fore','Infinitiv Futur von esse','„Sperat pacem fore.“ Was hofft die Person?','dass es Frieden geben wird',['dass es schon lange Frieden gab','dass der Frieden gerade endet'],'Fore ist die Kurzform für futurum esse. Im AcI ist pacem der Subjektsakkusativ.');
coursePractice(27,'konstruktion','Satzwertige Konstruktionen','Welcher Ausdruck ist ein Ablativus absolutus?','pace facta',['pacem factam esse','pacem facere'],'Pace und facta stehen im Ablativ. Zusammen bedeuten sie hier „nachdem Frieden geschlossen worden ist“.');
coursePractice(28,'uti','Deponens mit Ablativ','„Rex consilio utitur.“ Was bedeutet das?','Der König nutzt den Rat.',['Der König wird beraten.','Der König schlägt den Rat aus.'],'Uti bedeutet „benutzen“ und verlangt den Ablativ. Utitur ist die 3. Person Singular Präsens.');
coursePractice(28,'nci','NcI im Plural','„Nautae redisse dicuntur.“ Wann findet die Rückkehr im Verhältnis zum Berichten statt?','früher',['genau gleichzeitig','später'],'Redisse ist der Infinitiv Perfekt von redire. Man sagt, dass die Seeleute zurückgekehrt sind.');
coursePractice(29,'kette','Gliedsätze zuordnen','„Nescio cur fur, cum custos adsit, maneat.“ Welches Verb gehört zur indirekten Frage mit cur?','maneat',['adsit','nescio'],'Klammere den eingeschobenen cum-Satz aus. Übrig bleibt „Ich weiß nicht, warum der Dieb bleibt“.');
coursePractice(29,'kern','Satzkern mit Passiv','„A multis civibus post longum iter legatus laudatus est.“ Welche Wörter ergeben das vollständige Prädikat?','laudatus est',['legatus laudatus','civibus est'],'PPP und est bilden hier gemeinsam das Perfekt Passiv. Der Gesandte ist gelobt worden.');
coursePractice(30,'motiv','Handlungsmotiv erkennen','„Via clausa est. Itaque Iulia aliam viam quaerit.“ Warum sucht Julia einen anderen Weg?','Ihr Weg ist versperrt.',['Sie will eine Freundin suchen.','Ihr Weg ist kürzer geworden.'],'Itaque bedeutet „deshalb“. Es verbindet das Hindernis im ersten Satz mit Julias Entscheidung.');
coursePractice(30,'beleg','Eine Deutung belegen','„Nemo loquitur. Omnes tacent. Tandem puer verba facit.“ Welches Wort zeigt, dass sich die Situation nach einer Weile ändert?','tandem',['nemo','omnes'],'Tandem bedeutet „schließlich“. Nach dem Schweigen ergreift ein Junge das Wort.');
