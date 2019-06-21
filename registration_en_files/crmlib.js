var socket,
    listeners = {},
    hostname = window.location.hostname.split('.'),
    excess_sub_domains = ['www', 'trade', 'crm', 'my', 'crm2', 'l'],
    main_domain = '';

    if (excess_sub_domains.indexOf(hostname[0]) !== -1) {
        hostname.shift();
    }

    main_domain = hostname.join('.');

var server = 'https://trade-crm.' + main_domain + '/',
    serverBiz = 'https://trade-crm.' + main_domain + '/';

var connect = function(){
    socket = io.connect(server, {
        'transports' : ['websocket'],
        'forceNew': true,
        'reconnect': true,
        'reconnection delay': 5000,
        'max reconnection attempts': 10000,
    });

    socket.on('connect', function(){
        
        updateLoop();
    });

    socket.on('disconnect', function(){
        for(var k in listeners) {
            socket.removeListener(listeners[k]['method']);
            listeners[k]['listening'] = 0;
        }
        
    });
};

var updateLoop = function(){
    if(typeof socket != 'undefined'){
        for(var k in listeners) {
            if(socket.connected && listeners[k]['listening'] == 0){
                socket.emit('subscribe',
                    {
                        method : listeners[k]['method'],
                        data: listeners[k]['data']
                    });

                socket.on(listeners[k]['method'], listeners[k]['callback']);
                listeners[k]['listening'] = 1;
            }
        }
    }
};

var subscribe = function(method, data, cb){
    listeners[method] = {
        'method' : method,
        'data'   : data,
        'callback' : cb,
        'listening' : 0
    };
    updateLoop();
};

var unsubscribe = function(method){
    delete listeners[method];
    if(typeof socket != 'undefined'){
        socket.emit('unsubscribe', { method : method });
    }
};

var emit = function(method, data, cb){
    subscribe(method, data, cb);
};

(function(){
    var current_href = window.location.href;

    if (current_href.indexOf('.biz') !== -1) {
        server = serverBiz;
    }

    var script_src = server + 'socket.io/socket.io.js',
        script = document.querySelector('script[src="'+script_src+'"]');

    if ( ! script) {
        var head = document.getElementsByTagName("head")[0];

        script = document.createElement("SCRIPT");
        script.src = script_src;
        head.appendChild(script);
    }

    callIfExists(function(){return typeof io === 'function'}, connect);
})();


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