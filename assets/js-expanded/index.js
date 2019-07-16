$(document).ready(function(){
  drawTrend('USDETH', $('.trend-element:eq(0)') );
  drawTrend('USDDSH', $('.trend-element:eq(1)') );
  drawTrend('BTCLTC', $('.trend-element:eq(2)') );
  drawTrend('BTCDSH', $('.trend-element:eq(3)') );
  drawTrend('ETHBCH', $('.trend-element:eq(4)') );
  drawTrend('ETHLTC', $('.trend-element:eq(5)') );

  setInterval(function(){
    drawTrend('USDETH', $('.trend-element:eq(0)') );
    drawTrend('USDDSH', $('.trend-element:eq(1)') );
    drawTrend('BTCLTC', $('.trend-element:eq(2)') );
    drawTrend('BTCDSH', $('.trend-element:eq(3)') );
    drawTrend('ETHBCH', $('.trend-element:eq(4)') );
    drawTrend('ETHLTC', $('.trend-element:eq(5)') );
  },5000);
});

function drawTrend(tradePair, DOMElement) {

  $.ajax({
    url     : 'https://central.investingcase.com/api/Stock?timer=5&symbol=' + tradePair,
    success : function (data) {

      // формат отримуваних даних:
      // data = [{"Date":"date","Value": value,"IsBrake":false}, {...}, ... ];

      // значення крайньої лівої, правої, верхньої, нижньої точок
      let leftPointValue   = data[0].Value,
          rigthPointValue  = data[data.length-1].Value,
          topPointValue    = data[0].Value,
          bottomPointValue = data[0].Value;

      for( let i=0; i<data.length-1; i++) {
        if(data[i].Value > topPointValue) {
          topPointValue = data[i].Value;
        }
        if(data[i].Value < bottomPointValue) {
          bottomPointValue = data[i].Value;
        }
      }

// // тимчасові дані, поки не працює постачальник котирувань
// leftPointValue   = 1,
// rigthPointValue  = 2,
// topPointValue    = 3,
// bottomPointValue = 4;
// // тимчасові дані, поки не працює постачальник котирувань

      let leftPointValueInPercent   = (leftPointValue * 100) / (topPointValue - bottomPointValue);
      let rigthPointValueInPercent  = (rigthPointValue * 100) / (topPointValue - bottomPointValue);

      // вираховуємо процентне співвідношення
      let topPersent;
      if (leftPointValueInPercent < rigthPointValueInPercent) {
        topPersent = 50 + (rigthPointValueInPercent - leftPointValueInPercent) / 2;
      } else if (leftPointValueInPercent > rigthPointValueInPercent) {
        topPersent = 50 - ((leftPointValueInPercent - rigthPointValueInPercent) / 2);
      } else {
        topPersent = 50;
      }
      topPersent = Math.round(topPersent*10)/10;

      // вносимо процентне співвідношення у html
      let bottomPersent = (1000 - topPersent*10)/10;

      let topPersentString    = topPersent + '%',
          bottomPersentString = bottomPersent + '%';

      // console.log(`
      // ===========================
      // значення контрольних точок:
      // ---------------------------
      // leftPointValue      : ${leftPointValue},
      // rigthPointValue     : ${rigthPointValue},
      // topPointValue       : ${topPointValue},
      // bottomPointValue    : ${bottomPointValue}.

      // розрахунки процентажів:
      // -----------------------
      // topPersent          : ${topPersent},
      // bottomPersent       : ${bottomPersent},
      // topPersentString    : ${topPersentString},
      // bottomPersentString : ${bottomPersentString}.
      // ===========================
      // `);

      // знаходимо потрібні елементи DOM та вставляємо потрібні значення
      let pairName     = $(DOMElement).find('.trend-element__currency-pair:eq(0)'),
          pairPrice    = $(DOMElement).find('.trend-element__price-value:eq(0)'),
          putValue     = $(DOMElement).find('.trend-element__percent:eq(0)'),
          callValue    = $(DOMElement).find('.trend-element__percent:eq(1)'),
          putIndicator = $(DOMElement).find('.trend-element__red-line:eq(0)');

      $(pairName).text(tradePair);
      $(pairPrice).text(rigthPointValue);
      $(putValue).text(topPersentString);
      $(callValue).text(bottomPersentString);
      $(putIndicator).css('width', topPersentString);

    }
  });
}