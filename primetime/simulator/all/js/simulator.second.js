var simulatorSecond = module(simulator, function(){
	return {
		wrapperClassName: '.simulator.second',
		
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
		
		initButtonBarEventHandlers: function(){
			var self = this; 
			this.callParent()
				.on('click', '.expiry li', function(e) {
					$(this).addClass('active').siblings().removeClass('active'); 
					self.showTip('amount'); 
					self.getEl('.amount input').focus();
				})
			
		},		
	}
}());