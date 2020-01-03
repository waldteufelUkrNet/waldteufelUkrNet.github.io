Date.prototype.getUTCTime = function() { 
	  return new Date(
	    this.getUTCFullYear(),
	    this.getUTCMonth(),
	    this.getUTCDate(),
	    this.getUTCHours(),
	    this.getUTCMinutes(), 
	    this.getUTCSeconds()
	  ).getTime(); 
}
function module(parent, child) {
	$.each(parent, function(key, property){
		if(!(key in child)) {
			child[key] = property;
		}  else if (typeof child[key] == "function") (function(name, fn) {  
            child[name] = function() { // inherit
                this.callParent = parent[name];
                var res = fn.apply(this, arguments);
                delete this.callParent;
                return res;
            };
        }(key, child[key]));
	}); /*
	$(function(){
		if(child.init) {
			child.init(); 
		}
	});
	*/ 
	return child; 
}

var simulator = module({}, function() {
	//private methods
	
	//pubic methods
	return {
		/*
		symbols: {
			'EUR/USD': {
				//group: ''
				rand: [1.11600, 1.11800],
				min: 1.11400,
				max: 1.11900, 
				step: 0.0002,
				imgClassName: 'flag EUR-USD'
			},
			'GBP/USD': {
				imgClassName: 'flag GBP-USD'
			},
			'USD/JPY': {
				imgClassName: 'flag USD-JPY'
			}
		},
		*/
		
		YMin: null,
		
		YMax: null,
		
		wrapperClassName: '',
		
		getSimulatorWrapperObj: function() {
			return $('#demo-wrapper' + this.wrapperClassName); 
		},  
		
		getEl: function(el) {
			return this.getSimulatorWrapperObj().find(el); 
		}, 
		
		reloadPlot: function() {
			this.plot.setData([this.getRandomData()]);
			this.plot.getOptions().grid.markings = [{yaxis: {from:this.markingValue, to:this.markingValue}}];	
			this.plot.setupGrid(); 
			this.plot.draw();
		}, 
		
		reloadFields: function() {
			this.getEl('.assets select').val(this.$asset);
			this.getEl('.amount input').val(this.$amount); 
			this.getEl('.expiry select').val($('.expiry select option:first').val());
		}, 
		
		initButtonBarEventHandlers: function() {
			var self = this;
			$('body').on('click', function () {
	            if(self.getEl('#profit-popup').is(':visible')) {
	            	self.getEl('#profit-popup').removeClass('bounceIn animated').hide(); 
	            	self.init(true);  
	            }
			});		
			return this.getSimulatorWrapperObj()
				.on('submit', 'form', function(){
					self.showTip('direction');
					self.calculatePotencial(self.getEl('.amount input').val()); 				
					return false; 
				})
				.on('change', '.assets select', function(e) {
					self.showTip('expiry');
					if($(this).val()!=self.$asset) {
						self.$asset = $(this).val();  
						//self.reloadPlotBySymbol(); 
						self.updateSymbol($(this).find(':selected').data('icon'), self.$asset); 
					}
				})
				.on('change', '.expiry select', function(e) {
					if($(this).val() =='')
						return false;
					self.showTip('amount'); 
					self.getEl('.amount input').focus(); 
				})
				.on('change keyup', '.amount input', function(e) {
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
		/*
		getSymbolData: function(symbol, key) { 
			if(symbol in this.symbols) {
				return key ? this.symbols[symbol][key] : this.symbols[symbol]; 
			}
			return {};  
		},
		*/
		fillExpiryField: function() {
			var select = this.getEl('.expiry select');
			var lastChartPoint = this.plotDataFull[this.plotDataFull.length-1],
				pointTime = lastChartPoint[0];
			
			var i=3, date;
			while(i--) {
				date = new Date(pointTime);
				select.append('<option>'+
						('0'+date.getHours()).slice(-2)+':'+
						('0' + date.getMinutes()).slice(-2)+
					'</option>');
				pointTime+=900000; //+15min step
			}
		}, 
		/*
		fillSymbolField: function() {
			var select = $('.assets select'); 
			$.each(this.symbols, function(symbol, data) {
				select.append('<option value="'+symbol+'">'+symbol+'</option>');
			});
		}, 
		
		reloadPlotBySymbol: function() {
			this.plot.setData([this.getRandomData()]);
			this.plot.draw(); 		
		}, 
		*/
		plotInit: function() {
			this.plot = $.plot(this.getEl("#chart"), [ this.getRandomData() ], {
				series: {
					shadowSize: 0,	// Drawing is faster without shadows
					color: "#FFFFFF",
					
					lines: {
						show: true,
					    lineWidth: 1,
				        color: 'rgba(255,255,255)',
					    opacity: 0.2,
						fill: true,
						zero: false,
				        fillColor: { 
				        	colors: ["rgba(255,255,255,0.01)", "rgba(255,255,255,0.5)"]
				        }		    
					},
					highlightColor: 'rgb(255,255,255)',
					state: true,
					points: {
						radius: 0.1,
						symbol: 'circle',
						lineWidth: 7
					}				
				},
	
				yaxis: {
					min: this.YMin || 0,
					max: this.YMax || 100,
					position: "right",
					tickColor: '#454545',
					color:'#FFF', 
					//autoscaleMargin: 0.4
				},
				xaxis: {
					mode: "time", 
					tickColor: '#454545', 
					color:'#FFF',
					timezone: "browser",
					minTickSize: [10, "minute"],
				}, 
				grid: {
					margin:10,
					markingsStyle: 'dashed',
					hoverable: true,
					markingsLineWidth: 1.3,
					backgroundColor: { 
						colors: ["transparent", "transparent"] 
					},
					markings: [
					     {yaxis: {from:this.markingValue, to:this.markingValue}}
					],				
					color: 'red',				
	
					borderWidth: {top: 2, right: 2, bottom: 2, left: 2},
					borderColor: {top: "#000", left: "#000"}
				},
			});
			
			this.afterPlotInit(); 
		},
		
		afterPlotInit: function(){},
		
		plotData: [],
		plotDataFull: [],
		plotTotalPoints: 60,
		markingValue: null,
		getRandomData: function() {
			var priceValue=null;
			// Do a random walk
			this.plotData = []; 
			while (this.plotData.length <= this.plotTotalPoints) {
	
				var prev = this.plotData.length > 0 ? this.plotData[this.plotData.length - 1] : 50,
					y = prev + Math.random() * 10 - 5;
				
				if (y < 30) {
					y = 30;
				} else if (y > 70) {
					y = 70;
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
		
		showTip: function(act) {
			this.getEl('.act.'+act).addClass('open').siblings('.act').removeClass('open');
			this.getEl('.tips').find('.tip.'+act).animate({opacity:1}, 500).siblings('.tip').animate({opacity:0}, 500);
		},
		
		hideTip: function(callback) {
			this.getEl('.act').removeClass('open'); 
			this.getEl('.tips .tip').animate({opacity:0}, 300).filter(':animated').promise().done(function() {
			    callback.call();
			});
		}, 
		
		setPriceValue: function(val) {
			this.getSimulatorWrapperObj().find('.price-value').html(this.toFixedValue(val).replace(/([\d]{3})$/, '<span>$1</span>'));
		}, 
		 
		calculatePotencial: function(amount) {
			this.$potencial = Math.round(this.$payout * amount);
			this.$profit = Math.round(this.$payout * amount - amount);
			this.getEl('#potencial').text('$ ' + this.$potencial);
			//this.getEl('#protected').text('$ ' + (this.$profit - amount)); 
		},
		
		updateSymbol: function(iconClassName, symbolText) {
			this.getEl('#symbol').text(symbolText); 
			this.getEl('.symbol-value i').attr('class', 'flag ' + iconClassName); 
		},
		
		toFixedValue: function(value) { 
			var n = 5, i = 10;
			i = Math.pow(i, n); 
			
			value = value.toString();
			value = value.substring(0, value.indexOf('.') + n + 1);  
			
			return parseFloat(value).toFixed(n)		
		},	
		
		showProfitPopup: function(profit) {
			this.getEl('#profit-popup').find('#profit').text('$'+profit);
			this.getEl('#profit-popup').addClass('bounceIn animated').show(); 
		}, 
		
		runChart: function() {
			var self = this;
			var finded = false;
			$.each(this.plotDataFull, function(i, data) { 
				if(data[1] === null) {  
					var prev = self.plotDataFull[i - 1][1], y = prev + Math.random() * 10 - 5;
					if (y < 10) { 
						y = 10;
					} else if (y > 90) {
						y = 90;
					}				
					if(i > 40) {
						//last 20 points
						switch(self.$direction) {
							case 'above': {
								if(y<=self.markingValue) {
									y = self.markingValue * 1.1; 
								}
								if(i==60) {
									y = self.markingValue * 1.4; 
								}
							}break;
							case 'below': {
								if(y>=self.markingValue) {
									y = self.markingValue * 0.9; 
								}	
								if(i==60) {
									y = self.markingValue * 0.6; 
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
					self.showProfitPopup(self.$profit);
				}, 200); 
			}
			 
		} 
	}	
}());


