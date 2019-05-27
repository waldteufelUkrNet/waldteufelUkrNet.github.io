var simulatorLadder = module(simulator, function(){
	return {
		
		YMin: 20,
		
		YMax: 100,		
		
		wrapperClassName: '.simulator.ladder',
		
		init: function(reload) {
			var self = this; 
			//default values
			self.$plot = null; //chart plugin object
			self.$asset = 'EUR/USD'; //current symbol value 
			self.$expiry = null; //expiry time
			self.$amount = 25; 
			self.$payout = 1.82;  
			self.$direction = null;
			self.$profit = Math.round(self.$payout * self.$amount);
			
			self.$profitPayout = null;
			self.$uPriceValue=null;
			
			if(!reload) {
				self.plotInit(); 
				self.calculatePotencial(self.$amount); 
				self.fillExpiryField();
				//self.fillSymbolField();
				self.updateSymbol('EUR-USD', self.$asset);
				self.initButtonBarEventHandlers(); 
			} else {
				self.reloadFields(); 
				self.updateSymbol('EUR-USD', self.$asset); 
				self.calculatePotencial(self.$amount);
				self.reloadPlot();
	        	self.showTip('assets');  
			}
			
			self.calculateTable();
		},
		
		reloadFields: function() {
			this.getEl('.act.assets li[data-asset="'+this.$asset+'"]').addClass('active').siblings().removeClass('active');
			this.getEl('.amount input').val(this.$amount); 
			this.getEl('.expiry select').val($('.expiry select option:first').val());
		},		
		
		initButtonBarEventHandlers: function(){
			var self = this; 
			return this.callParent().unbind()
				.on('submit', 'form', function(){
					return false; 
				})			
				.on('click', '.assets li', function(e){
					self.showTip('expiry');
					$(this).addClass('active').siblings().removeClass('active'); 
					self.updateSymbol($(this).data('icon'), $(this).data('asset')); 					
				})
				.on('change', '.expiry select', function(e) {
					if($(this).val() =='')
						return false;
					self.showTip('amount'); 
					self.getEl('.amount input').focus(); 
				})
				.on('click', '.amount button', function(e){
					self.getEl('.amount input[type="text"]').val($(this).data('amount')); 
					self.$amount = $(this).data('amount');
					self.calculateTable(); 
					self.showTip('direction');
				})
				.on('click', '.cell.directions a', function(e) {
					e.preventDefault(); 
					self.$direction = $(this).attr('href').substring(1, 999); 
					
					var row = $(this).parents('.row');
					self.$profitPayout = parseInt(row.data('payout_' + self.$direction));
					self.$uPriceValue = parseInt(row.data('value'));
										
					self.hideTip(function() {
						self.runChart(); 
					});
				})
		},	
		
		
		getTableEl: function() {
			return this.getEl('.table.direction'); 
		},
		
		calculateTable: function() {
			var self = this; 
			var rows = this.getTableEl().find('.row').get(), profitAbove, profitBelow, payoutAbove, payoutBelow;
			$.each(rows, function(index,el){
				profitAbove = parseFloat($(el).find('#above-profit').text());
				profitBelow = parseFloat($(el).find('#below-profit').text());
				
				payoutAbove = Math.round(self.$amount + (self.$amount * (profitAbove/100)));
				payoutBelow = Math.round(self.$amount + (self.$amount * (profitBelow/100))); 
				
				$(el).find('#above-payout').text(payoutAbove);
				$(el).find('#below-payout').text(payoutBelow);
				
				$(el).data('payout_above', payoutAbove);
				$(el).data('payout_below', payoutBelow);
			});
		}, 
		
		showTip: function(act) { 
			this.getEl('.act').removeClass('open');
			this.getEl('.act.'+act).addClass('open');
			
			this.getEl('.tips').find('.tip.'+act).addClass('open').animate({opacity:1}, 500)
				.siblings().not('.tip.' + act).removeClass('open').animate({opacity:0}, 500); 
		},	 
		
		updateSymbol: function(iconClassName, symbolText) {
			this.getEl('#asset-text').text(symbolText); 
			this.getEl('#symbol').text(symbolText); 
			this.getEl('.symbol-value i').attr('class', 'flag ' + iconClassName); 
		},		
		
		getRandomData: function() {
			var priceValue=null;
			// Do a random walk
			this.plotData = []; 
			while (this.plotData.length <= this.plotTotalPoints) {
	
				var prev = this.plotData.length > 0 ? this.plotData[this.plotData.length - 1] : 50,
					y = prev + Math.random() * 10 - 5;
				
				if (y < 55) {
					y = 55;
				} else if (y > 65) {
					y = 65;
				}
				if(this.plotData.length>30) {
					y=null; 
				} else { 
					this.markingValue = y; 
					priceValue = y;
				}
	
				this.plotData.push(y);
			}
	 
			// Zip the generated y values with the x values
			var date = new Date(); 
			var startTime = date.getUTCTime(); 
			
			var min = date.getMinutes(), 
				d = (15-(min%15)) * 60000,
				startTime = ~~((startTime + d)/60000) * 60000;
						
			var res = [];
			for (var i = 0; i < this.plotData.length; ++i) {
				res.push([startTime, this.plotData[i]])
				startTime+=60000;  
			}
			this.setPriceValue(priceValue); 
			return (this.plotDataFull = res);		
		},	
		
		runChart: function() {
			var self = this;
			var finded = false;
			var diff, step; 
			$.each(this.plotDataFull, function(i, data) { 
				if(data[1] === null) {
					var prev = self.plotDataFull[i - 1][1], y = prev + Math.random() * 10 - 5;
					if (y < 40) { 
						y = 40;
					} else if (y > 60) {
						y = 60;
					}				
					if(i > 47) {
						//last 20 points
						switch(self.$direction) {
							case 'above': {
							//uPriceValue
								if(prev < self.$uPriceValue) {
									diff = self.$uPriceValue - prev;
									step = diff/(60-i) * (0.5+Math.random()); 
									
									y = prev + step;  
								} 
								if(i == 60 && (y <= self.$uPriceValue || y > self.plot.getOptions().yaxes[0].max)) { 
									y = self.$uPriceValue * 1.05; 
								}
							}break;
							case 'below': {
								if(prev > self.$uPriceValue) {
									diff = prev - self.$uPriceValue;
									step = diff/(60-i) * (0.5+Math.random()); 
									
									y = prev - step;  
								}
								if(i == 60 && (y >= self.$uPriceValue || y < self.plot.getOptions().yaxes[0].min)) {
									y = self.$uPriceValue * 0.95; 
								}														
							}
						}
						//console.log(self.$direction, self.markingValue, y); 
					}
					
					self.plotDataFull[i][1] = y;
					self.setPriceValue(y); 
					finded = true;
					return false;
				}  
			}); 
			this.plot.setData([this.plotDataFull]);
			this.plot.draw(); 
			if(finded) { 
				setTimeout(function(){
					self.runChart() 
				}, 200); 
			} else {
				setTimeout(function(){
					self.showProfitPopup(self.$profitPayout);
				}, 200); 
			}
			 
		}, 		
		
		afterPlotInit: function() {
			this.plot.getOptions().grid.markings =[
			     //{yaxis: {from: this.markingValue, to:this.markingValue}},
			     {yaxis: {from:28, to:28}, color: "#e3b5e6"},
			     {yaxis: {from:41, to:41}, color: "#b4b0f7"},
			     {yaxis: {from:72, to:72}, color: "#88d1ff"},
			     {yaxis: {from:83, to:83}, color: "#88e4cb"},
			     {yaxis: {from:92, to:92}, color: "#c9e488"}
			]; 
			this.plot.setupGrid(); 
			this.plot.draw(); 
		},
		
		reloadPlot: function() {
			var d = this.getRandomData();
			this.plot.setData([d]);
			this.afterPlotInit(); 	
		},		
	}
}());