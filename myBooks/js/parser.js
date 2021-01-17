"use strict";
// parser.js
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ VARIABLES DECLARATION ↓↓↓ */
  let testString = '    h4 1. Kapitel\n(глава 1)\n\nMeine Eltern sind immer auf der Seite von den Lehrerinnen(мои родители всегда на стороне учителей), und darum (и поэтому) bin ich gleich nach der Schule (сразу после школы я) zum Herrn Kleinerz von nebenan gegangen (пошла к соседу господину Кляйнерцу) und habe ihm alles erzählt (и все ему рассказала).\n\nMeine Eltern sind immer auf der Seite von den Lehrerinnen, und darum bin ich gleich nach der Schule zum Herrn Kleinerz von nebenan gegangen und habe ihm alles erzählt.\n\nDer Herr Kleinerz ist schon alt (этот господин Кляйнерц уже в возрасте: «стар») mindestens vierzig Jahre(по меньшей мере, сорока лет), und darum (и поэтому) kann er selbst keine Kinder mehr kriegen (у него больше не будет своих детей: «не может получить»).\nSie sagen (говорят), mein Vater hätte mich in die Welt gesetzt(/что/ мой отец произвел меня на свет; hatte — имел; hätte — имел бы/здесь— форма для передачи косвенной речи: /сказала, что/ …/) . Ich weiß nicht(я не знаю) , wie er das gemacht hat (как он это сделал), aber ich glaube (но думаю), dass furchtbar viel dazu gehört (что нужно очень много знать: «что к этому относится ужасно много»), so was einfach zu können (/чтобы/ нечто такое просто уметь), und mein Vater ist zu bewundern (и /что/ мой отец достоин восхищения). Wo mag ich denn nur vorher gewesen sein(где же я могла только быть до этого)?\n\nDer Herr Kleinerz ist schon alt, mindestens vierzig Jahre, und darum kann er selbst keine Kinder mehr kriegen.\nSie sagen, mein Vater hätte mich in die Welt gesetzt. Ich weiß nicht, wie er das gemacht hat, aber ich glaube, dass furchtbar viel dazu gehört, so was einfach zu können, und mein Vater ist zu bewundern. Wo mag ich denn nur vorher gewesen sein?\n\nEine Frau hat der Herr Kleinerz auch nicht mehr (жены у господина Кляйнерца также уже не было). Meine Mutter hat gesagt (моя мама сказала), das hätte er um die Frau wirklich nicht verdient (что он этого /со своей женой/ действительно не заслужил), und sie hätte auch noch ganz zuletzt (и она еще совсем напоследок) Schulden auf seinen Namen gemacht (наделала долгов на его имя; r Name).\n\nEine Frau hat der Herr Kleinerz auch nicht mehr. Meine Mutter hat gesagt, das hätte er um die Frau wirklich nicht verdient, und sie hätte auch noch ganz zuletzt Schulden auf seinen Namen gemacht.\n\nIch darf immer zu ihm in den Garten (мне всегда было можно заходить к нему сад), da fallen manchmal kleine Vögel aus dem Nest (там иногда из гнезда выпадают птенцы; s Nest). Die ziehen wir dann auf (их мы потом растим; aufziehen) und pflegen sie (и ухаживаем за ними), aber sie sterben fast immer (но они почти всегда умирают), weil sie eine innerliche Verletzung haben (так как у них внутренняя травма; verletzen — повреждать) und zu ihren Eltern wollen (они хотят к родителям) und piepsen (и пищат), bis sie tot sind (пока не умрут).\n\nIch darf immer zu ihm in den Garten, da fallen manchmal kleine Vögel aus dem Nest. Die ziehen wir dann auf und pflegen sie, aber sie sterben fast immer, weil sie eine innerliche Verletzung haben und zu ihren Eltern wollen und piepsen, bis sie tot sind.\n\nEs ist furchtbar traurig mit den kleinen Vögeln (то, что происходит с птенчиками, ужасно печально), aber wir haben jetzt eine Drossel durchgebracht (но сейчас мы выходили одного дрозда).\n\nEs ist furchtbar traurig mit den kleinen Vögeln, aber wir haben jetzt eine Drossel durchgebracht.';
  document.querySelector('#plainText').value = testString;
/* ↑↑↑ /VARIABLES DECLARATION ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ FUNCTIONS DECLARATION ↓↓↓ */
  function cleanAllTextArea() {
    let tAreas = document.querySelectorAll('main .textarea-wrapper textarea');
    for (let tArea of tAreas) {
      tArea.value = '';
      tArea.contentEditable = "false";
    }
  }

  function convert(str) {

    let resultStr = '';
    let aT  = 'span.btext';    // activeTag
    let oBA = 0;               // openedBracketsAmount
    let startItalicIndex = -1;

    // початок абзацу
    resultStr = '    p\n      span.btext ';

    for (let i = 0; i < str.length; i++) {
      // наступний абзац
      if ( str[i].match(/\n/) ) {
        resultStr += '\n    p\n      span.btext ';
        aT  = 'span.btext';
      }

      // відкриття дужок
      if ( str[i].match(/\(/) ) {
        oBA += 1;
        if (oBA > 1) {
          // відкриття внутрішньої дужки
          resultStr += '(';
        } else {
          // відкриття зовнішньої дужки

          // пошук вмісту дужок (із урахуванням вкладених)
          let subStr = '',
              startPosition,
              endPosition1,
              endPosition2;

          // try тут по суті є милицею. Тут наступна логіка: пошук відкриваючої
          // дужки після закриваючої. В кінці тексту логічно буде помилка, бо
          // інтерпретарор після останньої закриваючої дужки нічого не знайде.
          // Можна було б переписати з урахуванням цього і перевірки, чи закри-
          // ваюча дужка остання, щоб потім не шукати відсутню відкриваючу
          // дужку. Але try теж канає.
          try {
            startPosition = i;
            let regexp1 = /\)/g,
                regexp2 = /\(/g;

            regexp1.lastIndex = startPosition + 1;
            regexp2.lastIndex = startPosition + 2;

            endPosition1 = regexp1.exec(str).index;
            endPosition2 = regexp2.exec(str).index;

            if (endPosition1>endPosition2) {
              regexp1.lastIndex = endPosition1 + 1;
              endPosition1 = regexp1.exec(str).index;
            }
          } catch {} finally {
            subStr = str.slice(startPosition+1,endPosition1);
          }


          // що в дужках?
          if ( subStr.match(/[абвгґдеєжзіїйклмнопрстуфхцчшщьюяёэы]/iu) ) {
            // тут є переклад, значить дужка в адаптованому тексті
            resultStr += '\n      |\n      |(';
            aT = 'p';

            // у дужках крім перекладу є і слова
            if ( subStr.match(/[abcdefghijklmnopqrstuvwxyzäüöß]/iu) ) {
              if ( subStr[0].match(/[abcdefghijklmnopqrstuvwxyzäüöß]/iu) ) {
                // підрядок зі словами та їх перекладами
                aT = 'span.f-coni';
                resultStr += '\n      span.f-coni ';
              } else {
                let startItalic = subStr.match(/[abcdefghijklmnopqrstuvwxyzäüöß]/iu).index;
                startItalicIndex = str.indexOf(subStr) + startItalic;
              }
            }
          } else {
            // тут тільки латиниця, отже це оригінальна дужка в тексті
            resultStr += '(';
          }
        }
      }

      // початок похилого тексту
      if ( i == startItalicIndex ) {
        startItalicIndex = -1;
        aT = 'span.f-coni';
        resultStr += '\n      |\n      span.f-coni ';
      }

      // закриття дужок
      if ( str[i].match(/\)/) ) {
        oBA -= 1;
        if (oBA > 0) {
          // закриття внутрішньої дужки
          resultStr += ')';
        } else {
          // закриття зовнішньої дужки
          if (aT == 'span.btext') {
            resultStr += ')';
          } else if (aT == 'p') {
            aT == 'span.btext';
            if (str[i+1]) {
              if ( str[i+1].match(/[\.,:;?!»'"]/iu) ) {
                resultStr += ')\n      span.btext ';
              } else {
                resultStr += ')\n      |\n      span.btext ';
              }
            }
          } else if (aT == 'span.f-coni') {
            aT == 'span.btext';
            resultStr += '\n      |)\n      ';

            if ( str[i+1].match(/[\.,:;?!»'"]/iu) ) {
              resultStr += 'span.btext ';
            } else {
              resultStr += '|\n      span.btext ';
            }
          }
        }
      }

      // додати символ, якщо це не перевід рядка та не дужки
      if ( !str[i].match(/[\n\)\(]/) ) {
        resultStr += str[i];
      }
    }
    return resultStr;
  }

  function copy(resultStr) {
    let resultContainer = document.querySelector('#pugText');
    // resultContainer.value = resultStr; - чомусь періодично не спрацьовує
    resultContainer.value = resultStr;
    resultContainer.select();
    document.execCommand('copy');
    resultContainer.blur();
    setTimeout( () => {resultContainer.scrollTop = 0}, 100 );
  }

  function convertAndCopy () {
    let str = document.querySelector('#plainText').value;
    if (str == '') return;

    // нормалізація тексту
     str = str.replace(/\)\n/g, '\)\.\n');
     str = str.replace(/ \n/g, '\n');

    let subStrArray = str.split('\n\n');

    let resultStr = '';
    for (let subStr of subStrArray) {

      // пропускаємо заголовки
      if ( !subStr.match(/^\s{4}h[1-6] /) ) {

        if ( !subStr.match(/[абвгґдеєжзіїйклмнопрстуфхцчшщьюяёэы]/iu) ) {
          // шматок оригінального тексту - усі абзаци починаються з p.btext
          let subResult    = '    p.btext ',
              subStr2Level = subStr.split('\n');
          for (let subStr2LevelStr of subStr2Level) {
            subResult = subResult + subStr2LevelStr + '\n    p.btext '
          }
          subStr = subResult.slice(0, -13);
        } else {
          // шматок адаптованого тексту
          subStr = convert(subStr);
        }
      }
      resultStr = resultStr + subStr + '\n\n    br\n\n';
    }
    resultStr = resultStr.slice(0, -10);
    copy(resultStr);
  }
/* ↑↑↑ /FUNCTIONS DECLARATION ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////