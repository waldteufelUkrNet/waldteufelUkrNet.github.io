"use strict";function drawTrend(v,S){$.ajax({url:"http://185.229.227.61:10002/api/Stock?timer=5&symbol="+v,success:function(n){for(var a=n[0].Value,e=n[n.length-1].Value,r=n[0].Value,i=n[0].Value,s=0;s<n.length-1;s++)n[s].Value>r&&(r=n[s].Value),n[s].Value<i&&(i=n[s].Value);var t,g=100*a/(r-i),p=100*e/(r-i);t=g<p?50+(p-g)/2:p<g?50-(g-p)/2:50;var d=(t=Math.round(10*t)/10)+"%",o=(1e3-10*t)/10+"%";$(".section4__item-body-loader-wrapper:eq(0)").css("display","none");var l=$(S).find(".trends__pair-name:eq(0)"),_=$(S).find(".trends__pair-price:eq(0)"),u=$(S).find(".trends__item-indicator-put-persent:eq(0)"),c=$(S).find(".trends__item-indicator-call-persent:eq(0)"),m=$(S).find(".trends__item-indicator-call-scale:eq(0)");$(l).text(v),$(_).text(e),$(u).text(o),$(c).text(d),$(m).css("width",d)}})}$(document).ready(function(){drawTrend("USDETH",$(".trends__item:eq(0)")),drawTrend("USDDSH",$(".trends__item:eq(1)")),drawTrend("BTCLTC",$(".trends__item:eq(2)")),drawTrend("BTCDSH",$(".trends__item:eq(3)")),drawTrend("ETHBCH",$(".trends__item:eq(4)")),setInterval(function(){drawTrend("USDETH",$(".trends__item:eq(0)")),drawTrend("USDDSH",$(".trends__item:eq(1)")),drawTrend("BTCLTC",$(".trends__item:eq(2)")),drawTrend("BTCDSH",$(".trends__item:eq(3)")),drawTrend("ETHBCH",$(".trends__item:eq(4)"))},3e3)});var assets=["AUDCAD","AUDCHF","AUDJPY","AUDNZD","AUDUSD","EURAUD","EURCAD","EURCHF","EURGBP","EURJPY","EURRUB","EURUSD","GBPAUD","GBPCAD","GBPCHF","GBPJPY","GBPNZD","GBPUSD","NZDCAD","NZDCHF","NZDJPY","NZDUSD","USDAUD","USDCAD","USDCHF","USDCNY","USDEUR","USDGBP","USDNOK","USDPLN","USDRUB","USDSEK","USDJPY","GOOGLE","FACEBOOK","APPLE","MICROSOFT","INTEL","AMAZON","CISCO","COCA-COLA","MCDONALDS","GE","GM","TESLA","AT&T","TWITTER","ALIBABA","_BARCLAYS","_SIEMENS","BMW","ACA","EEM","GS","BOA","BOEING","MASTERCARD","PFIZER","NETFLIX","WAL_MART","CHEVRON","GROUPON","VISA","SNAPCHAT","EXXONMOBIL","DISNEY","PG","JNJ","CAT","_BAYER","_TOTAL","UG","_UNICREDITO","CORN","COPPER","WHEAT","GOLD","SILVER","CrudeOIL","GASOLINE","BRENT_OIL","NATURAL_GAS","HEATING_OIL","PLATINUM","SOYBEAN","COTTON2","SUGAR11","COFFEE_C","COCOA","SOYF","BTCUSD","BTGUSD","BTCEUR","XLMUSD","EOSUSD","BCHUSD","ETHUSD","LTCUSD","XRPUSD","FTSE100","NASDAQ100","S&P500","CHINA_A50","DJ30","NIKKEI225","CAC40","DAX30","SPI200","OMX30","DOLLAR_INDX","RUSSELL2000","MSCI_TAIWAN","NIFTY50","HSI","FTSEMIB40","AEX","EWZ","SMI","AUS200","ESP35","FRA40","GER30","HKG33","JPN225","NAS100","SPX500","UK100","US30","CHN50","EUSTX50","US2000"],ussrCountries=["latvia.png","lithuania.png","estonia.png","georgia.png","armenia.png","azerbaijan.png","moldova.png","uzbekistan.png","kazakhstan.png","kyrgyzstan.png","tajikistan.png","turkmenistan.png"],europeCountries=["albania.png","andorra.png","austria.png","belgium.png","bosnia_and_herzegovina.png","bulgaria.png","croatia.png","czech_republic.png","denmark.png","finland.png","france.png","germany.png","greece.png","hungary.png","ireland.png","italy.png","kosovo.png","liechtenstein.png","luxembourg.png","macedonia.png","monaco.png","montenegro.png","netherlands.png","norway.png","poland.png","portugal.png","romania.png","serbia.png","slovakia.png","slovenia.png","spain.png","sweden.png","switzerland.png","united_kingdom.png"],asiaArabsCountries=["china.png","egypt.png","hong_kong.png","india.png","indonesia.png","malaysia.png","oman.png","qatar.png","saudi_arabia.png","korea_south.png","republic_of_china.png","turkey.png","united_arab_emirates.png"],otherCountries=["aland_islands.png','algeria.png','american_samoa.png","angola.png","anguilla.png","antigua_and_barbuda.png","argentina.png","aruba.png","bahamas.png","bahrain.png","bangladesh.png","barbados.png","belize.png","benin.png","bermuda.png","bhutan.png","bolivia.png","bonaire.png","botswana.png","bouvet_island.png","brazil.png","british_indian_ocean_territory.png","virgin_islands_british.png","brunei.png","burkina_faso.png","burundi.png","cambodia.png","cameroon.png","cape_verde.png","cayman_islands.png","central_african_republic.png","chad.png","chile.png","christmas_island.png","cocos_islands.png","colombia.png","comoros.png","republic_of_the_congo.png","democratic_republic_of_the_congo.png","cook_islands.png","costa_rica.png","cuba.png","curacao.png","cyprus.png","djibouti.png","dominica.png","dominican_republic.png","east_timor.png","ecuador.png","el_salvador.png","equatorial_guinea.png","eritrea.png","ethiopia.png","falkland_islands.png","faroe_islands.png","fiji.png","french_guiana.png","french_polynesia.png","french_southern_territories.png","gabon.png","gambia.png","ghana.png","gibraltar.png","greenland.png","grenada.png","guadeloupe.png","guam.png","guatemala.png","guinea.png","guinea_bissau.png","guyana.png","haiti.png","heard_island_and_mcdonald_islands.png","honduras.png","iceland.png","cote_d_Ivoire.png","jamaica.png","jordan.png","kenya.png","kiribati.png","kuwait.png","laos.png","lebanon.png","lesotho.png","liberia.png","libya.png","macao.png","madagascar.png","malawi.png","maldives.png","mali.png","malta.png","marshall_islands.png","martinique.png","mauritania.png","mauritius.png","mayotte.png","mexico.png","micronesia.png","mongolia.png","montserrat.png","morocco.png","mozambique.png","myanmar.png","namibia.png","nauru.png","nepal.png","netherlands_antilles.png","new_caledonia.png","new_zealand.png","nicaragua.png","niger.png","nigeria.png","niue.png","norfolk_island.png","northern_mariana_islands.png","pakistan.png","palau.png","palestinian_territory.png","panama.png","papua_new_guinea.png","paraguay.png","peru.png","philippines.png","pitcairn_islands.png","puerto_rico.png","reunion.png","rwanda.png","south_georgia_and_the_south_sandwich_islands.png","saint_barthelemy.png","saint_kitts_and_nevis.png","saint_lucia.png","saint_vincent_and_the_grenadines.png","samoa.png","san_marino.png","sao_tome_and_principe.png","senegal.png","seychelles.png","sierra_leone.png","singapore.png","solomon_islands.png","south_africa.png","sri_lanka.png","saint_helena.png","saint_pierre_and_miquelon.png","suriname.png","svalbard_and_jan_mayen.png","swaziland.png","tanzania.png","thailand.png","togo.png","tokelau.png","tonga.png","trinidad_and_tobago.png","tunisia.png","turks_and_caicos_islands.png","tuvalu.png","uganda.png","uruguay.png","virgin_islands_us.png","vanuatu.png","vatican_city.png","venezuela.png","vietnam.png","wallis_and_futuna.png","western_sahara.png","yemen.png","zambia.png","zimbabwe.png"],users={},lastWinnersArr=[],top5WinnersArr=[],top5WinnersSet=new Set;localStorage.users&&(users=JSON.parse(localStorage.users)),localStorage.top5WinnersStr&&(top5WinnersArr=JSON.parse(localStorage.top5WinnersStr),top5WinnersSet.add(top5WinnersArr[0]),top5WinnersSet.add(top5WinnersArr[1]),top5WinnersSet.add(top5WinnersArr[2]),top5WinnersSet.add(top5WinnersArr[3]),top5WinnersSet.add(top5WinnersArr[4]));var randomizer=setTimeout(function n(){if(!localStorage.top5WinnersStr){var a=0;do{var e=generateTrader();handleTrader(e),lastWinnersArr.push(users[e]),top5WinnersSet.add(users[e]),a++}while(a<1e3)}var r=generateTrader();handleTrader(r),lastWinnersArr.push(users[r]),5<lastWinnersArr.length&&(lastWinnersArr.shift(),buildTradersHTML("lastWinners",lastWinnersArr),$(".section4__item-body-loader-wrapper:eq(1)").css("display","none")),top5WinnersSet.add(users[r]);var i=Array.from(top5WinnersSet);i.sort(function(n,a){return a.total-n.total}),5<i.length&&(i.length=5,localStorage.top5WinnersStr=JSON.stringify(i),buildTradersHTML("top5Traders",i),$(".section4__item-body-loader-wrapper:eq(2)").css("display","none"));var s=1e3*randomInteger(1,60);randomizer=setTimeout(n,s)},1e3);function generateTrader(){var n=randomInteger(1,9999);return n<=9?n="00000"+n:n<=99?n="0000"+n:n<=999?n="000"+n:n<=9999?n="00"+n:n<=99999?n="0"+n:99999<n&&(n=""+n),n}function handleTrader(n){if(!users[n]){users[n]={id:n,flag:"",profit:0,total:0,asset:""};var a=randomInteger(1,100);users[n].flag=1<=a&&a<=35?"russia.png":36<=a&&a<=70?ussrCountries[randomInteger(0,ussrCountries.length-1)]:71<=a&&a<=90?europeCountries[randomInteger(0,europeCountries.length-1)]:91<=a&&a<=98?asiaArabsCountries[randomInteger(0,asiaArabsCountries.length-1)]:otherCountries[randomInteger(0,otherCountries.length-1)]}users[n].asset=assets[randomInteger(0,assets.length-1)];var e=randomInteger(1,500);1<=e&&e<=25?users[n].profit=randomInteger(100,1e3):26<=e&&e<=100?users[n].profit=randomInteger(1100,5e3):101<=e&&e<=350?users[n].profit=randomInteger(5100,3e4):351<=e&&e<=425?users[n].profit=randomInteger(30100,6e4):426<=e&&e<=475?users[n].profit=randomInteger(60100,1e5):476<=e&&e<=493?users[n].profit=randomInteger(100100,3e5):494<=e&&e<=497?users[n].profit=randomInteger(300100,1e6):498<=e&&e<=499?users[n].profit=randomInteger(1000100,15e5):500<=e&&e<=500&&(users[n].profit=randomInteger(1500100,2e6)),users[n].total=users[n].total+users[n].profit,localStorage.users=JSON.stringify(users)}function buildTradersHTML(n,a){var e="ASSET",r="PROFIT",i="profit";"top5Traders"==n&&(e="LAST ASSET",r="TOTAL PROFIT",i="total"),document.getElementById(n).innerHTML='    <div class="traders__header">      <div class="traders__header-id">Client id</div>      <div class="traders__header-country">Country</div>      <div class="traders__header-asset">'+e+'</div>      <div class="traders__header-profit">'+r+'</div>    </div>    <div class="traders__item">      <div class="traders__item-id">#'+a[0].id+'</div>      <div class="traders__item-country">        <div class="traders__item-country-img-wrapper">          <img class="traders__item-country-img" src="assets/img/countries/'+a[0].flag+'" alt="country flag">        </div>      </div>      <div class="traders__item-asset">'+a[0].asset+'</div>      <div class="traders__item-profit">'+prettyNumbersFormatter(a[0][i])+'</div>    </div>    <div class="traders__item">      <div class="traders__item-id">#'+a[1].id+'</div>      <div class="traders__item-country">        <div class="traders__item-country-img-wrapper">          <img class="traders__item-country-img" src="assets/img/countries/'+a[1].flag+'" alt="country flag">        </div>      </div>      <div class="traders__item-asset">'+a[1].asset+'</div>      <div class="traders__item-profit">'+prettyNumbersFormatter(a[1][i])+'</div>    </div>    <div class="traders__item">      <div class="traders__item-id">#'+a[2].id+'</div>      <div class="traders__item-country">        <div class="traders__item-country-img-wrapper">          <img class="traders__item-country-img" src="assets/img/countries/'+a[2].flag+'" alt="country flag">        </div>      </div>      <div class="traders__item-asset">'+a[2].asset+'</div>      <div class="traders__item-profit">'+prettyNumbersFormatter(a[2][i])+'</div>    </div>    <div class="traders__item">      <div class="traders__item-id">#'+a[3].id+'</div>      <div class="traders__item-country">        <div class="traders__item-country-img-wrapper">          <img class="traders__item-country-img" src="assets/img/countries/'+a[3].flag+'" alt="country flag">        </div>      </div>      <div class="traders__item-asset">'+a[3].asset+'</div>      <div class="traders__item-profit">'+prettyNumbersFormatter(a[3][i])+'</div>    </div>    <div class="traders__item">      <div class="traders__item-id">#'+a[4].id+'</div>      <div class="traders__item-country">        <div class="traders__item-country-img-wrapper">          <img class="traders__item-country-img" src="assets/img/countries/'+a[4].flag+'" alt="country flag">        </div>      </div>      <div class="traders__item-asset">'+a[4].asset+'</div>      <div class="traders__item-profit">'+prettyNumbersFormatter(a[4][i])+"</div>    </div>  "}function prettyNumbersFormatter(n){var a=n.toString();return 6<(a=a.slice(0,-2)+"."+a.slice(-2)).length&&(a=a.slice(0,-6)+" "+a.slice(-6)),a}function randomInteger(n,a){var e=n+Math.random()*(a+1-n);return Math.floor(e)}