var simulatorOneTouch = module(simulator, function(){
	return {
		wrapperClassName: '.simulator.one-touch',
		
		init: function(reload) {
			var self = this; 
			//default values
			self.$plot = null; //chart plugin object
			self.$asset = 'Google'; //current symbol value 
			self.$expiry = null; //expiry time
			self.$amount = 50; 
			self.$payout = 4;  
			self.$direction = null;
			self.$profit = Math.round(self.$payout * self.$amount);
			
			if(!reload) {
				self.plotInit(); 
				self.calculatePotencial(self.$amount); 
				self.refreshExpiry();
				self.fillExpiryField();
				//self.fillSymbolField();
				self.updateSymbol('GOOGLE', self.$asset);
				
				self.initButtonBarEventHandlers(); 
			} else {
				self.reloadFields(); 
				self.updateSymbol('GOOGLE', self.$asset); 
				self.calculatePotencial(self.$amount);
				self.refreshExpiry();
				self.reloadPlot();
	        	self.showTip('assets');  
			}
		},
		
		reloadFields: function() {
			this.getEl('.assets select').val(this.$asset);
			this.getEl('.amount select').val($('.amount select option:first').val()); 
			this.getEl('.expiry select').val($('.expiry select option:first').val());
		}, 		
		
		updateSymbol: function(iconClassName, symbolText) {
			this.getEl('#asset-text').text(symbolText);
			this.getEl('#symbol').text(symbolText); 
			this.getEl('.symbol-value i').attr('class', 'flag ' + iconClassName); 
		},	
		
		initButtonBarEventHandlers: function(){
			var self = this; 
			this.callParent().unbind().on('submit', 'form', function(){
				self.showTip('direction');
				self.calculatePotencial(self.getEl('.amount input').val()); 				
				return false; 
			})
			.on('change', '.assets select', function(e) {
				self.showTip('amount');
				if($(this).val()!=self.$asset) {
					self.$asset = $(this).val();  
					//self.reloadPlotBySymbol(); 
					self.updateSymbol($(this).find(':selected').data('icon'), self.$asset); 
				}
			})
			.on('change', '.amount select', function(e) {
				self.showTip('direction');
				self.calculatePotencial($(this).val()); 
			})
			.on('click', '.direct a', function(e) {
				e.preventDefault(); 
				self.$direction = $(this).attr('href').substring(1, 999); 
				self.hideTip(function() {
					self.runChart(); 
				});
			}) 			
		},
		
		refreshExpiry: function() {
			var startDate = new Date(new Date().getUTCTime());
			var expiryDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000); //7 dayes
			
			$('#sale-ends').text('Sale Ends In ' + this.getTimeByObject(startDate));
			$('#expiry-time').text(this.getTimeByObject(expiryDate));			
		}, 
		
		getTimeByObject: function(date) {
			return ('0'+date.getDate()).slice(-2)
			+ '.' + ('0'+(date.getMonth() + 1)).slice(-2) 
			+ '.' + date.getFullYear().toString().slice(-2)
			+ ' ' + ('0'+date.getUTCHours()).slice(-2)
			+ ':' + ('0'+date.getUTCMinutes()).slice(-2)
			+ ':00'; 
			//+ ':' + ('0'+date.getUTCSeconds()).slice(-2)
		}, 
		
		setPriceValue: function(val) { 
			this.getEl('#price-value').html(Math.round(val));
		}, 
		
		calculatePotencial: function(amount) {
			this.$profit = Math.round(this.$payout * amount);
			//var res = parseInt(this.$profit + amount);
			//res = res.toFixed(2);
			this.getEl('#potencial').html('$ ' + parseInt(this.$profit + parseInt(amount)).toFixed(2) + '<small>('+(amount/50)+' Units)</small>');
			//this.getEl('#protected').text('$ ' + (this.$profit - amount)); 
		}		
	}
	
}());