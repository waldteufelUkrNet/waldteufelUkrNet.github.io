var simulatorLongTerm = module(simulator, function(){
	return {
		wrapperClassName: '.simulator.long-term',
		
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
		},
		
		fillExpiryField: function() {
			var select = this.getEl('.expiry select');
			var lastChartPoint = this.plotDataFull[this.plotDataFull.length-1],
				pointTime = lastChartPoint[0];
			
			var i=3, date;
			while(i--) {
				date = new Date(pointTime); console.log(date.getUTCDate()); 
				select.append('<option>'+ date.getUTCDate() + '.' + ('0'+date.getMonth()).slice(-2) + '.' + date.getUTCFullYear().toString().slice(-2) + '.' + ' '+
						('0'+date.getHours()).slice(-2)+':'+
						('0' + date.getMinutes()).slice(-2)+
					'</option>');
				pointTime+=87300000; //24h +15min step
			}
		},		
	}
}());