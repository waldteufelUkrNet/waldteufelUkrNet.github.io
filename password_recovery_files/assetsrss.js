function WLConnections(m, dt, c){
    
    var hostname = window.location.hostname.split('.'),
        excess_sub_domains = ['www', 'trade', 'crm', 'my', 'crm2', 'l'],
        main_domain = '';

    if (excess_sub_domains.indexOf(hostname[0]) !== -1) {
        hostname.shift();
    }

    main_domain = hostname.join('.');

    var dtSnd = dt,
        mt = m,
        clb = c,
        sckt = {},
        max_attempts = 3,
        attemps = 0,
        interval_atempts = 0,
        srv = 'https://trade-crm.'+main_domain+'/',
        srv_biz = 'https://trade-crm.'+main_domain+'/';
        
    var set_js = function(){  
        var current_href = window.location.href;

        if (current_href.indexOf('.biz') !== -1) {
            srv = srv_biz;
        }

        var script_src = srv + 'socket.io/socket.io.js',
            script = document.querySelector('script[src="'+script_src+'"]');

        if ( ! script) {
            var head = document.getElementsByTagName( "head" )[ 0 ];

            script = document.createElement("SCRIPT");
            script.src = script_src;
            head.appendChild( script );

        }

        callIfExists(function(){return typeof io === 'function'}, connect_node);
    };

    init = function(m){
        try{
            set_js();
            this[m]();
        }catch(e){
        }
    }
    
    var connect_node = function(){
        
        try {
            sckt = io.connect(srv, {
                'transports' : ['websocket'],
                'force new connection': true,
                'reconnect': true,
                'reconnection delay': 5000,
                'max reconnection attempts': 10000
            });
        } catch (e) {
            console.log(e);
        }
    }
    
    var emit = function(mt){
        sckt.emit('unsubscribe', {method : mt});
        sckt.emit('subscribe', {method : mt, data:dtSnd});
    }
    
    var listen = function(mt){
        sckt.on(mt, clb);
    }
    
    assetsRss = function(){
        clearInterval(interval_atempts);
        if(max_attempts <= attemps){
            return;
        }
        try {
            // connect_node();
            emit(mt);
            listen(mt);
        } catch (e) {
            attemps++;
            interval_atempts = setInterval(assetsRss, 500);
        }
    }
    assetsRates = function(){
        clearInterval(interval_atempts);
        if(max_attempts <= attemps){
            return;
        }
        try {
            // connect_node();
            emit(mt);
            listen(mt);
        } catch (e) {
            attemps++;
            interval_atempts = setInterval(assetsRss, 500);
        }
    }
    
    if(typeof m !== 'undefined'){
        init(m);
    }

    function callIfExists(conditional, callback) {
        var callbackTimer = setInterval(function() {
            var call = false;
            try {
                call = conditional.call();
            } catch (e) {}

            if (call) {
                clearInterval(callbackTimer);
                callback.call();
            }
        }, 300);
    }
}
