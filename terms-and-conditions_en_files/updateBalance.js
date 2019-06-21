jQuery(document).ready(function () {
    var traderId = GLOBAL.crmHashId;
    var currencyPrecision = GLOBAL.currencyPrecision;

    if (traderId) {
        initSocketConnect();
    }

    function initSocketConnect() {
        try {
            subscribe('userInfo', {'accountID':traderId}, function(response){
                if (typeof response.balance != undefined && !isNaN(parseFloat(response.balance))) {
                    jQuery('#header-user-balance').text(balanceFormat(response.balance));
                }
            });
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Comma for thousand and dot for cents
     * @autor Alexandr Sarapuka <alexandr.sarapuka@tstechpro.com>
     * @param string b
     * @returns string
     */
    function balanceFormat(b) {
        return parseFloat(b).toFixed(currencyPrecision).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    }
});
