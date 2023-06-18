Semestrální práce: Hra Slither.io

Hra: Smyslem projektu bylo vytvořit funkční hru podobnou hře slither.io pro jednoho hráče.za použití phaserAPI pohyb hada do všech stran v 2D prostoru. 
Hráč má za úkol jíst jíst body, které se automaticky objevují na mapě, nebo se objeví po úmrtíněkterého z hadů. Po snězení bodu se had rozšíří a prodlouží, úkolem hráče je pak přežít co nejdéle.
Hráč přežije tak, že nenabourá do cizího hada (sám sebou může bez úmrtí projet), nebo neukončí sám hru tlačítkem "Suicide".

Popis funkcionalit: Hra se ovládá hoverem myší nebo šipkami, speciální zrychlení se pak využije stisknutím, resp. držením mezerníku. V hlavní herní stránce pak uživatel narazí
na následující tlačítka "New game" -> Po stisknutí vyresetuje hru a začne novou pro stejného hráče, "Change name" -> Po stisknutí je uživatel přenesen do menu pro změnu jména.
"Suicide" -> Po stisknutí je hráčův had usmrcen a hra je pozastavena, jeho skóre je uloženo do LocalStorage pod jeho zadaným jménem.
Dále se na herní stránce nachází dynamický ukazatel současného skóre, po smrti se zobrazí nový ukazatel dosáhnutého skóre.
V neposlední řadě se zde nachází také Leaderboard, kde se zobrazuje TOP5 nejlepších výkonů zaznamenaných na LocalStorage, pomocí geolocationAPI místo okdud uživatel hraje, status připojení uživatelského prohlížeče a vodoznak.

Dokumentace je v kódu popřípadě zde v Read.me

Evaluace kritérií.


HTML
HTML Validita -> HTML Je validní bez errorů, na moderních prohlížečích funguje sémantické značky jsem použil
<main>,<footer> atd.
Grafika -> SVG/Canvas -> SVG je použito ve vodoznaku ve footeru na herní stránce, celá hra je pak canvas element.
Media Video/Audio -> použito při klikáni tlačítek a při úmrtí hráče ve hře.
Formulářové prvky -> Používám jeden pro zadání jména, validace probíha v JS, autofocus je implementován
Offline: Aplikace funguje bez problému i online


CSS
Pokročilé selektory -> využity pseudo třídy jako n-nth child, kombinátory také
Vendor prefix -> jsou definované pro animace
CSS3 transformace 2D/3D -> Jsou použity při skládání animací, avšak také prvky p jsou natočené, stejně tak gameover text.
CSS3 transitions/animations -> Jsou použity jsou definovány animace pulse,bounce a slideDown
Media queries -> Používám pro nastavení vlastností prvků UI, connection statusu apod. @media screen and(max-width:768px)


Javascript
OOP přístup: Téměř vše je v OOP.
JS Framework či knihovny -> jQuery pro načítání stránek, phaser
Použití pokročilých JS API -> LocalStorage pro ukládání výsledků hráčů, geolocation pro určení pozice hráče, connection pro zjištění jeho stavu online/offline.
Funkční historie: Nedávala v mé implementaci moc smysl.
Offline aplikace: Ano, vpravo dole může uživatel sledovat stav svého připojení.
JS práce s SVG -> v changeName.js je generovaný stejný svg copyright jako v herní stránce, ale tentokrát pomocí JS

 
  
