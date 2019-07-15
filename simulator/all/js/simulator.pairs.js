var simulatorPairs = module(simulator, function(){
	return {
		wrapperClassName: '.simulator.pairs',
		
		init: function(reload) {
			var self = this; 
			//default values
			self.$plot = null; //chart plugin object
			self.$asset = 'Gold vs Silver'; //current symbol value 
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
				self.updateSymbol('GOLD|SILVER', self.$asset);
				
				self.initButtonBarEventHandlers(); 
			} else {
				self.reloadFields(); 
				self.updateSymbol('GOLD|SILVER', self.$asset); 
				self.calculatePotencial(self.$amount);
				self.reloadPlot();
	        	self.showTip('assets');  
			}
		},
		
		updateSymbol: function(iconClassNames, symbolText) {
			iconClassNames = iconClassNames.split('|'); console.log(iconClassNames); 
			$('.symbol-value i#left-flag').attr('class', 'flag left ' + iconClassNames[0]); 
			$('.symbol-value i#right-flag').attr('class', 'flag right ' + iconClassNames[1]); 
			
			$('.symbol-value #left-flag-text').text(iconClassNames[0]); 
			$('.symbol-value #right-flag-text').text(iconClassNames[1]); 
		},	
		
		showTip: function(act) { 
			this.getEl('.act.'+act).addClass('open').siblings('.act').removeClass('open');
			if(act == 'direction') 
				$('.act.amount ').removeClass('open'); 
			
			this.getEl('.tips').find('.tip.'+act).animate({opacity:1}, 500).siblings('.tip').animate({opacity:0}, 500);
		},		
		
	}
}());