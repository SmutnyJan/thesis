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
 * Seznam míst v mapě
 * název - selektor
 */

var placesjs = [
	{phrase: ['kantýna', 'bufet'], selector: '.buffet'},
	{phrase: ['automat', 'automaty'], selector: '.machine'},
	{phrase: ['občerstvení', 'jídlo', 'pití', 'bageta', 'kafe'], selector: '.buffet, .machine'},
	{phrase: ['toalety', 'WC', 'záchody'], selector: '.toilet'},
	{phrase: ['J5', 'Modrá menza', 'Technická menza'], selector: '#J5'},
	{phrase: ['MK'], selector: '#MK'},
	{phrase: ['T2'], selector: '#T2'},
	{phrase: ['T2:A3'], selector: '#T2-A3'},
	{phrase: ['T2:A4'], selector: '#T2-A4'},
	{phrase: ['T2:B3'], selector: '#T2-B3'},
	{phrase: ['T2:C3'], selector: '#T2-C3'},
	{phrase: ['T2:C4'], selector: '#T2-C4'},
	{phrase: ['T2:D2'], selector: '#T2-D2'},
	{phrase: ['T2:D3'], selector: '#T2-D3'},
	{phrase: ['T2:E1'], selector: '#T2-E1'},
	{phrase: ['T4'], selector: '#T4'},
	{phrase: ['T4:A1'], selector: '#T4-A1'},
	{phrase: ['T4:A2'], selector: '#T4-A2'},
	{phrase: ['T4:B1'], selector: '#T4-B1'},
	{phrase: ['T4:B2'], selector: '#T4-B2'},
	{phrase: ['T4:C1'], selector: '#T4-C1'},
	{phrase: ['T4:C2'], selector: '#T4-C2'},
	{phrase: ['T4:D1'], selector: '#T4-D1'},
	{phrase: ['T9', 'Nová budova', 'NB'], selector: '#T9'},
	{phrase: ['T9 1NP', 'T9 1. patro'], selector: '#T9-floor1'},
	{phrase: ['T9 3NP', 'T9 3. patro'], selector: '#T9-floor3'},
	{phrase: ['T9:105', 'Kotěra'], selector: '#T9-105'},
	{phrase: ['T9:107', 'Janák'], selector: '#T9-107'},
	{phrase: ['T9:111', 'Krejcar'], selector: '#T9-111'},
	{phrase: ['T9:155', 'Gočár'], selector: '#T9-155'},
	{phrase: ['T9:301'], selector: '#T9-301'},
	{phrase: ['T9:302'], selector: '#T9-302'},
	{phrase: ['T9:303'], selector: '#T9-303'},
	{phrase: ['T9:304'], selector: '#T9-304'},
	{phrase: ['T9:305'], selector: '#T9-305'},
	{phrase: ['T9:306'], selector: '#T9-306'},
	{phrase: ['T9:307'], selector: '#T9-307'},
	{phrase: ['T9:308'], selector: '#T9-308'},
	{phrase: ['T9:309'], selector: '#T9-309'},
	{phrase: ['T9:310'], selector: '#T9-310'},
	{phrase: ['T9:311'], selector: '#T9-311'},
	{phrase: ['T9:312'], selector: '#T9-312'},
	{phrase: ['T9:312a'], selector: '#T9-312a'},
	{phrase: ['T9:312b'], selector: '#T9-312b'},
	{phrase: ['T9:312c'], selector: '#T9-312c'},
	{phrase: ['T9:312d'], selector: '#T9-312d'},
	{phrase: ['T9:313'], selector: '#T9-313'},
	{phrase: ['T9:314'], selector: '#T9-314'},
	{phrase: ['T9:322'], selector: '#T9-322'},
	{phrase: ['T9:330'], selector: '#T9-330'},
	{phrase: ['T9:331'], selector: '#T9-331'},
	{phrase: ['T9:332'], selector: '#T9-332'},
	{phrase: ['T9:333'], selector: '#T9-333'},
	{phrase: ['T9:334'], selector: '#T9-334'},
	{phrase: ['T9:335'], selector: '#T9-335'},
	{phrase: ['T9:341'], selector: '#T9-341'},
	{phrase: ['T9:341a'], selector: '#T9-341a'},
	{phrase: ['T9:341b'], selector: '#T9-341b'},
	{phrase: ['T9:342'], selector: '#T9-342'},
	{phrase: ['T9:342a'], selector: '#T9-342a'},
	{phrase: ['T9:342b'], selector: '#T9-342b'},
	{phrase: ['T9:343'], selector: '#T9-343'},
	{phrase: ['T9:344'], selector: '#T9-344'},
	{phrase: ['T9:345'], selector: '#T9-345'},
	{phrase: ['T9:346'], selector: '#T9-346'},
	{phrase: ['T9:347'], selector: '#T9-347'},
	{phrase: ['T9:348'], selector: '#T9-348'},
	{phrase: ['T9:349'], selector: '#T9-349'},
	{phrase: ['T9:350'], selector: '#T9-350'},
	{phrase: ['T9:351'], selector: '#T9-351'},
	{phrase: ['T9:364'], selector: '#T9-364'},
	{phrase: ['T9:365'], selector: '#T9-365'},
	{phrase: ['T9:366'], selector: '#T9-366'},
	{phrase: ['T9:367'], selector: '#T9-367'},
	{phrase: ['T9:368'], selector: '#T9-368'},
	{phrase: ['TH'], selector: '#TH'},
	{phrase: ['TH:A', 'T7'], selector: '#TH-A'},
	{phrase: ['TH:B'], selector: '#TH-B'},
	{phrase: ['TH:C'], selector: '#TH-C'},
	{phrase: ['TH:D'], selector: '#TH-D'},
	{phrase: ['TK', 'NTK', 'Národní technická knihovna'], selector: '#TK'},
	{phrase: ['Z2:B1'], selector: '#Z2-B1'},
	{phrase: ['Masarykova kolej', 'MAS'], selector: '#MAS'},
	{phrase: ['Dejvická kolej', 'DEJ'], selector: '#DEJ'},
	{phrase: ['Sinkuleho kolej', 'SIN'], selector: '#SIN'}];
