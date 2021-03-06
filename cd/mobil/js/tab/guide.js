/**
 * This file is part of Průvodce FIT ČVUT.
 * Copyright (C) 2011-2012 Jan Molnár
 *
 * Průvodce FIT ČVUT is free software: you  can redistribute it and/or
 * modify it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * Průvodce FIT ČVUT is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty
 * of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with Průvodce FIT ČVUT. If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * Panel průvodce
 */

tab.guide = {}; //globální rozhraní tohoto souboru

tab.guide.getName = function () {
	return 'Průvodce';
};

tab.guide.getContent = function () {
	
	var groups = $('<div/>'); //kategorie informací
	
	/**
	 * Vytvoření kategorie informací.
	 * @param name Jméno kategorie informací.
	 * @return Element kategorie informací.
	 */
	var createLoaderGroup = function (name) {
		var group = $('<div class="group"><h3>' + name + '</h3><ul/></div>');
		groups.append(group);
		return group;
	}
	
	/**
	 * Vytvoření položky kategorie informací.
	 * @param name Jméno položky kategorie informací.
	 * @param group Element kategorie informací.
	 * @return Element položky kategorie informací.
	 */
	var createLoaderItem = function (name, group) {
		var item = $('<li>' + name + '</li>');
		group.find('ul').append(item);
		return item;
	}
	
	/**
	 * Obstarání zdroje od akcí tlačítka přes získání zdroje až po jeho vizualizaci.
	 * @param item Element obstarávaného zdroje.
	 * @param resource URL zdroje (musí být povolené na proxy!).
	 * @param presenter Callback prezentace zdroje.
	 */
	var createLoaderButton = function (item, resource, presenter) {
		var a = $('<a href="#" class="button">Zobrazit</a>');
		var div = $('<div class="innergroup" style="display:none;"/>');
		item.append(' ', a, div);
		
		a.click(function () {
			if ($(this).html() === 'Zobrazit') { //zobrazení
				a.html('Skrýt');
				if (typeof navigator.onLine === 'undefined' || navigator.onLine) { //připojení k Internetu
					div.html('<p><img src="img/load.gif" alt="Načítám..."/> Načítám...</p>').show();
				} else {
					div.html('<p class="error">Pravděpodobně nejste připojeni k Internetu, ten je k vykonání požadované akce nezbytný.</p>').show();
				} //i přes případné nepřipojení se pokračuje (některé prohlížeče nahlašují špatně)
				//získání zdroje ve formátu JSON před JSONP proxy ({"sitecontent": "<stránka>"})
				$.getJSON(config.ajax.proxy, {url: resource}, function (data) {
					if (data && data.error) { //navrácena chyba
						div.html('<p class="error">' + data.error + '</p>');
					} else if (data && data.sitecontent) { //navrácena stránka
						var ret = presenter(data.sitecontent);
						if (ret.length !== 0) {
							div.html(ret);
						} else {
							div.html('<p class="error">Nastala chyba při zpracování zdroje. Požadovaná informace se možná nachází na <a href="' + resource + '" target="_blank">' + resource + '</a>.</p>');
						}
					} else { //navráceno něco neočekávaného
						div.html('<p class="error">Nastala chyba serveru.</p>');
					}
				}).error(function () {
					div.html('<p class="error">Nepodařilo se navázat spojení se serverem.</p>');
				});
			} else { //skrytí
				div.hide().html('');
				a.html('Zobrazit');
			}
			return false;
		});
	};
	
	
	var canteens = createLoaderGroup('Menzy');
	var canteensData = { //názvy menz a jejich indexy
		'menza Studentský dům': 2,
		'Technická menza': 3,
		'Masarykova kolej': 5,
		'menza Strahov': 1,
		'menza Podolí': 4,
		'Pizzerie la fontanella': 10
	};
	for (var name in canteensData) {
		(function () { //uzávěr kvůli proměnným
			var canteenmenu = createLoaderItem('Jídelníček ' + name, canteens);
			
			createLoaderButton(canteenmenu, 'http://agata.suz.cvut.cz/jidelnicky/index.php?clPodsystem=' + canteensData[name], function (data) {
				var ret = $(data).find('#ap-jidelnicek table');
				//odstranění stylů a přebytečných sloupců
				ret.find('tr td:nth-child(6), tr th:nth-child(6)').remove();
				ret.find('th[colspan="6"]').attr('colspan', 5);
				ret.find('td, th').css('width', '');
				return ret.length ? ret : '<p>Aktuálně pro toto zařízení neexistuje žádný jídelníček.</p>';
			});
		})();
	}
	
	
	var studies = createLoaderGroup('Studium');
	var studiesnews = createLoaderItem('Novinky', studies);
	var studiesschedule = createLoaderItem('Harmonogram akademického roku', studies);
	var studiesforms = createLoaderItem('Formuláře', studies);
	var studieslinks = createLoaderItem('Odkazy', studies);
	
	createLoaderButton(studiesnews, 'http://fit.cvut.cz/', function (data) {
		var ret = $(data).find('.view-id-novinky .views-row');
		//pročištění
		ret.find('.views-field-title').each(function () {this.parentNode.removeChild(this.nextSibling);});
		ret.find('.views-field-created .field-content').contents().unwrap().unwrap().wrap('<p/>');
		ret.find('.views-field-title a').contents().unwrap().unwrap().unwrap().wrap('<h3/>');
		ret.find('p').each(function () {
			$.trim($(this).text()) === '' && $(this).remove();
		});
		ret.find('a').attr('target', '_blank');
		return ret;
	});
	createLoaderButton(studiesschedule, 'http://fit.cvut.cz/student/studijni/harmonogram', function (data) {
		return $(data).find('h2:nth-child(2)').nextUntil('h2');
	});
	createLoaderButton(studiesforms, 'http://fit.cvut.cz/student/studijni/formulare', function (data) {
		var ret = $(data).find('.content-text ul');
		ret.find('a').attr('target', '_blank');
		return ret;
	});
	createLoaderButton(studieslinks, 'http://fit.cvut.cz/student/odkazy', function (data) {
		var mess = $(data).find('#ap-node-319');
		//pročištění
		mess.find('p').remove();
		mess.find('li').contents().unwrap().unwrap();
		var html = mess.html();
		html = '<ul><li>' + html.replace(/<br>/g, '</li><li>') + '</li></ul>';
		var tidy = $(html);
		tidy.find('li:first, li:last').remove();
		tidy.find('a').attr('target', '_blank');
		return tidy;
	});
	
	
	var openings = createLoaderGroup('Otevírací doby');
	var openingsfitsto = createLoaderItem('Studijní odddělení', openings);
	var openingscanteens = createLoaderItem('Menzy, bufety...', openings);
	var openingsidissuer = createLoaderItem('Vydavatelství průkazů', openings);
	var openingsntk = createLoaderItem('Národní technická knihovna', openings);
	
	createLoaderButton(openingsfitsto, 'http://fit.cvut.cz/student/studijni/kontakt', function (data) {
		var ret = $(data).find('table').last();
		//přeformátování
		ret.find('*').andSelf().removeAttr('style');
		ret.find('tr td:first-child, tr:first-child td').css({'text-transform': 'capitalize', 'font-weight': 'bold'})
		return ret;
	});
	createLoaderButton(openingscanteens, 'http://agata.suz.cvut.cz/jidelnicky/oteviraci-doby.php', function (data) {
		var ret = $(data).find('#ap-otdoby');
		//odstranění stylů a výplní
		ret.find('*').andSelf().removeAttr('style');
		ret.find('br').remove();
		ret.find('.offset6').remove();
		return ret;
	});
// 	createLoaderButton(openingsidissuer, 'http://www.cvut.cz/informace-pro-studenty/prukazy', function (data) {
// 		var ret = $(data).find('#ap-region-content ul li p').first().contents().first().wrap('<p/>').parent();
// 		return ret;
// 	});
	createLoaderButton(openingsidissuer, 'http://ke.customer.decent.cz/a021/mon/wc-mon.php?co=2', function (data) {
		var ret = $(data).find('table table').eq(-2).find('td').last().contents();
		return ret;
	});
	createLoaderButton(openingsntk, 'http://www.techlib.cz/cs/61-oteviraci-doby/', function (data) {
		var ret = $(data).find('#ap-contentWrapper table').first();
		//odstranění stylů a výplní
		ret.find('*').andSelf().removeAttr('style');
		ret.find('p').contents().unwrap();
		ret.find('td').each(function () {
			$(this).text($.trim($(this).text()));
		});
		ret.find('td[colspan=5]').css('text-align', 'center');
		return ret;
	});
	
	
	var contacts = createLoaderGroup('Kontakty');
	var contactsfitsto = createLoaderItem('Studijní odddělení', contacts);
	var contactsfitdeansoff = createLoaderItem('Děkanát', contacts);
	var contactskti = createLoaderItem('Katedra teoretické informatiky', contacts);
	var contactsksi = createLoaderItem('Katedra softwarového inženýrství', contacts);
	var contactskcn = createLoaderItem('Katedra číslicového návrhu', contacts);
	var contactskps = createLoaderItem('Katedra počítačových systémů', contacts);
	var contactskam = createLoaderItem('Katedra aplikované matematiky', contacts);
	var contactsidissuer = createLoaderItem('Vydavatelství průkazů', contacts);
	var contactscanteens = createLoaderItem('Menzy, bufety...', contacts);
	var contactssuz = createLoaderItem('Správa účelových zařízení', contacts);
	
	createLoaderButton(contactsfitsto, 'http://fit.cvut.cz/student/studijni/kontakt', function (data) {
		var ret = $(data).find('table').first();
		//přeformátování
		ret.find('*').andSelf().removeAttr('style');
		ret.find('tr td:first-child, tr:first-child td').css({'text-transform': 'capitalize', 'font-weight': 'bold'});
		ret.find('p').css('margin', '0');
		ret.find('a').attr('target', '_blank');
		return ret;
	});
	createLoaderButton(contactsfitdeansoff, 'http://fit.cvut.cz/fakulta/struktura/dekanat', function (data) {
		var ret = $(data).find('.content-text .node');
		//přeformátování
		ret.find('*').andSelf().removeAttr('style');
		ret.find('strong, b').each(function () {this.parentNode.removeChild(this.nextSibling);});
		ret.find('strong, b').contents().unwrap().unwrap().wrap('<h3/>');
		ret.find('a').attr('target', '_blank');
		return ret;
	});
	var departments = { //identifikátory kateder
		'kti': contactskti,
		'ksi': contactsksi,
		'kcn': contactskcn,
		'kps': contactskps,
		'kam': contactskam
	};
	for (var department in departments) {
		createLoaderButton(departments[department], 'http://fit.cvut.cz/fakulta/struktura/katedry/' + department, function (data) {
			var ret = $(data).find('table.telefony');
			//přeformátování
			ret.find('*').andSelf().removeAttr('style');
			ret.find('tr td:nth-child(3)').each(function () {
				$(this).html('<a href="mailto:' + ($(this).text()) + '">' + ($(this).text()) + '</a>');
			});
			ret.find('a').attr('target', '_blank');
			return ret;
		});
	}
// 	createLoaderButton(contactsidissuer, 'http://www.cvut.cz/informace-pro-studenty/prukazy', function (data) {
// 		var ret = $(data).find('#ap-region-content ul li p').eq(1);
// 		//přeformátování a pročištění
// 		ret.find('b, br').remove();
// 		ret.contents().wrap('<li/>').parent().wrap('<ul/>');
// 		ret.find('li').eq(-2).remove();
// 		ret.find('a').attr('target', '_blank');
// 		return ret;
// 	});
	createLoaderButton(contactsidissuer, 'http://ke.customer.decent.cz/a021/mon/wc-mon.php?co=2', function (data) {
		var ret = $(data).find('table table').eq(-2);
		//přeformátování a pročištění
		ret.find('tr').eq(-1).remove();
		ret.find('*').removeAttr('bgcolor').removeAttr('width');
		ret.find('a').attr('target', '_blank');
		return ret;
	});
	createLoaderButton(contactscanteens, 'http://agata.suz.cvut.cz/jidelnicky/kontakty.php', function (data) {
		var ret = $(data).find('#ap-otdoby');
		//odstranění stylů
		ret.find('*').andSelf().removeAttr('style');
		ret.find('a').attr('target', '_blank');
		return ret;
	});
	createLoaderButton(contactssuz, 'http://www.suz.cvut.cz/kontakt/telefonni-a-e-mailovy-seznam', function (data) {
		var ret = $(data).find('#ap-rpart table');
		ret.find('a').attr('target', '_blank');
// 		ret.find('.superth').contents().wrap('<h3/>');
		return ret;
	});
	
	
	var events = createLoaderGroup('Akce');
	var eventsctu = createLoaderItem('Kalendář akcí ČVUT', events);
	var eventsfit = createLoaderItem('Pravidelné akce FIT', events);
	
	createLoaderButton(eventsctu, 'http://akce.cvut.cz/', function (data) {
		var ret = $(data.replace(/%E2%8C%A9/g, '&lang')).find('#ap-calendar_events'); //nahrazení špatně zakódovaných entit
		ret.find('a').attr('target', '_blank');
		return ret;
	});
	createLoaderButton(eventsfit, 'http://fit.cvut.cz/fakulta/pravidelne-akce', function (data) {
		var ret = $(data).find('#ap-node-931 .milestone');
		ret.find('.time').contents().unwrap().wrap('<h3/>');
		ret.find('a').attr('target', '_blank');
		return ret;
	});
	
	
	var timetable = createLoaderGroup('Rozvrh');
	var timetablestudents = createLoaderItem('Studenti', timetable);
	var timetableteachers = createLoaderItem('Učitelé', timetable);
	var timetableclassrooms = createLoaderItem('Místnosti', timetable);
	var timetablesubjects = createLoaderItem('Předměty', timetable);
	var timetableoneshot = createLoaderItem('Jednorázové akce', timetable);
	
	createLoaderButton(timetablestudents, 'https://timetable.fit.cvut.cz/public/cz/studenti/index.html', function (data) {
		var ret = $(data).find('#ap-content');
		ret.find('a').attr('target', '_blank');
		return ret;
	});
	createLoaderButton(timetableteachers, 'https://timetable.fit.cvut.cz/public/cz/ucitele/index.html', function (data) {
		var ret = $(data).find('#ap-content div.block');
		ret.find('.top-href').remove();
		ret.find('.department').contents().unwrap().unwrap().wrap('<h3/>');
		ret.find('a').attr('target', '_blank');
		return ret;
	});
	createLoaderButton(timetableclassrooms, 'https://timetable.fit.cvut.cz/public/cz/mistnosti/index.html', function (data) {
		var ret = $(data).find('#ap-content table.classrooms a');
		ret.attr('target', '_blank');
		return ret.wrap('<li/>').parent().wrapAll('<ul/>').parent();
	});
	createLoaderButton(timetablesubjects, 'https://timetable.fit.cvut.cz/public/cz/predmety/indexa.html', function (data) {
		var ret = $(data).find('#ap-content .subject a');
		ret.attr('target', '_blank');
		return ret.wrap('<li/>').parent().wrapAll('<ul/>').parent();
	});
	createLoaderButton(timetableoneshot, 'https://timetable.fit.cvut.cz/public/cz/akce/index.html', function (data) {
		var ret = $(data).find('#ap-content div.block');
		ret.find('.top-href').remove();
		ret.find('.department').contents().unwrap().unwrap().wrap('<h3/>');
		ret.find('a').attr('target', '_blank');
		return ret;
	});
	
	
	var utilities = createLoaderGroup('Užitečné');
	var utilstemp = createLoaderItem('Teploměr (kolej Orlík)', utilities);
	
	createLoaderButton(utilstemp, 'http://teplomer.ok.cvut.cz/', function (data) {
		return $(data).find('table tr:lt(4)').wrap('<tbody/>').wrap('<table/>');
	});
	
	
	return groups;
};
