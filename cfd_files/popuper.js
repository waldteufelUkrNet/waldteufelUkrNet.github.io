var GLOBAL = GLOBAL || {};

GLOBAL.popuperHost = 'popuper.bormancorp.com';
GLOBAL.countryByIP = 'UA';
GLOBAL.popupsLang = 'en';

/**
 * popuper object implement methods for creation and working with modal window
 */
var popuper = {

    currentPopupType: 0,

    loadedPerPage: 0,

    logByType: [],

    overlay: {
        color: '',
        opacity: 0,
        click:  null
    },

    templateClasses: [],

    defaultTemplateClasses: ['popuper-modal', 'overlay'],

    loadSettings: function (settings) {

        var addClass = settings.class || '';

        this.templateClasses = this.defaultTemplateClasses.slice(0);
        if (addClass.length > 0) {
            this.templateClasses.push(addClass);
        }

        var overlay = settings.overlay || {};
        if (Object.keys(overlay).length > 0) {

            var clickEvent = overlay.clickJS || '';

            if (clickEvent.length > 0) {
                this.overlay.click = clickEvent;
            } else {
                this.overlay.click = null;
            }

            var opacity = overlay.opacity || 0;

            this.overlay.color = overlay.color || '';
            this.overlay.opacity = (opacity > 0)
                ? ((opacity > 1) ? opacity/100 : opacity)
                : 0;
        } else {
            this.overlay.click = null;
            this.overlay.color = '';
            this.overlay.opacity = 0;
        }


    },

    overlayClick: function (){
        if (this.overlay.click) {
            return new Function(
                "event",
                "if(event.target != this) return;" + this.overlay.click
            );
        } else {
            return function (){};
        }
    },

    askPopup: function (url) {

        url = GLOBAL.mainSecureProtocol + '://' + GLOBAL.popuperHost + url;

        var additionalValues = {
            'log': this.logByType
        };
        if (GLOBAL.hasOwnProperty('pageInfo')) {
            additionalValues['page'] = GLOBAL.pageInfo;
        }

        if (this.request && this.request.readyState != 4) {
            this.request.abort();
        }

        var that = this;
        this.request = jQuery.ajax({
            type: 'POST',
            url: url,
            dataType: 'json',
            data: additionalValues,
            crossDomain: true,
            xhrFields: {
                withCredentials: true
            },
            beforeSend: function(xhr) {
                xhr.withCredentials = true;
            },
            success: function (response) {

                if (response.hasOwnProperty('scripts') && response.scripts) {
                    that.loadScripts(response.scripts);
                }

                var settings = response.settings || {};

                that.removeModal();
                that.loadSettings(settings);

                if (response.hasOwnProperty('typeId')) {
                    that.currentPopupType = response.typeId;
                }

                if (response.hasOwnProperty('styles') && response.styles) {
                    that.loadStyles(response.styles);
                }

                if (typeof popuperCaptcha !== "undefined") {
                    popuperCaptcha.removeTransparentLayer();
                }

                if (typeof popuperTerms !== "undefined") {
                    popuperTerms.removeTransparentLayer();
                }

                if (response.hasOwnProperty('content') && response.content) {
                    var added = that.setContent(response.content);
                    if (
                        added
                        && (
                            !response.hasOwnProperty('hiddenAsDefault')
                            || !response.hiddenAsDefault
                            || that.loadedPerPage
                        )
                    ) {
                        that.show();
                    }
                }

                if (response.hasOwnProperty('contentJs') && response.contentJs) {
                    that.setExecutableJS(response.contentJs);
                }
                that.loadedPerPage++;
            }
        });
    },

    getModal: function () {
        return document.getElementById('popuper-main')
    },

    check: function (clearingLog) {
        clearingLog = clearingLog || false;
        if (clearingLog) {
            popuper.logByType = [];
        }
        this.askPopup('/ajax/getNext/');
        if  (this.contentExist()) {
            this.show();
        }
    },

    getContent: function () {
        var modal = this.getModal();
        if (!modal) {
            return '';
        }
        var content = modal.getElementsByClassName('popuper-content');
        if (content.length == 0) {
            return '';
        }
        return content[0];
    },

    setContent: function (newContent, force) {
        force = force || false;

        if (!newContent && !force) {
            return false;
        }
        var template = this.createModal();

        template.setAttribute('class', this.templateClasses.join(' '));
        template.addEventListener("click", this.overlayClick());
        template.style.background = this.getOverlayBackgroundRule();

        if (this.overlay.color && this.overlay.opacity) {
            template.style.background = this.getOverlayBackgroundRule();
            template.style.width = '100%';
            template.style.height = '100%';
        } else {
            template.style.background = 'none';
            template.style.width = 'auto';
            template.style.height = 'auto';
        }

        template.innerHTML = newContent;
        return true;
    },

    getOverlayBackgroundRule: function () {
        var red = parseInt(this.overlay.color.substring(0,2), 16);
        var green = parseInt(this.overlay.color.substring(2,4), 16);
        var blue = parseInt(this.overlay.color.substring(4,6), 16);
        return 'rgba(' + red + ', ' + green + ', ' + blue + ', ' + this.overlay.opacity + ')';
    },

    createModal: function() {

        var modal = this.getModal();
        if (modal) {
            return modal;
        }

        var popUpDiv = document.createElement('div');
        popUpDiv.setAttribute('id','popuper-main');
        var popupParent = document.createElement('div');
        popupParent.appendChild(popUpDiv);

        document.body.appendChild(popupParent);
        modal = this.getModal();

        return modal;
    },

    removeModal: function() {

        var modal = this.getModal();
        if (!modal) {
            return false;
        }
        modal.remove();

        return true;
    },

    contentExist: function () {
        return this.getContent() && this.getContent().hasChildNodes();
    },

    clear: function () {
        this.hide();
        if (!this.contentExist()) {
            return false;
        }
        this.setContent('', true);
        return true;
    },

    setExecutableJS: function (jsTemplate) {

        var allScriptsArray = document.getElementsByTagName('script');

        for (var scriptKey in allScriptsArray) {

            var script = allScriptsArray[scriptKey];

            if (
                typeof script == 'object'
                && script.getAttributeNode('data-name') == 'executablePopuperJS'
            ) {
                script.remove();
            }
        }

        if (!jsTemplate) {
            return;
        }

        var att = document.createAttribute("data-name");
        att.value = "executablePopuperJS";

        var scriptTag = document.createElement('script');
        scriptTag.setAttributeNode(att);
        scriptTag.innerHTML = jsTemplate;

        document.body.appendChild(scriptTag);
    },

    loadScripts: function (scriptsLinks) {
        if (scriptsLinks) {

            if (typeof scriptsLinks === 'string') {
                links = JSON.parse(scriptsLinks);
            } else {
                links = scriptsLinks;
            }

            links.forEach(function (url, i, arr) {
                requireLib.load(url);
            });
        }
    },

    loadStyles: function (stylesLinks) {

        var that = this;
        if (stylesLinks) {

            if (typeof stylesLinks === 'string') {
                links = JSON.parse(stylesLinks);
            } else {
                links = stylesLinks;
            }

            links.forEach(function (url, i, arr) {

                if (url && !that.styleExists(url)) {
                    var link = document.createElement('link');
                    link.type = 'text/css';
                    link.href = url;
                    link.rel = 'stylesheet';
                    link.media = 'all';
                    document.getElementsByTagName('head')[0].appendChild(link);
                }
            });
        }

    },

    styleExists: function (link) {
        var exists = false;
        jQuery.each(document.styleSheets, function (key, value) {
            if (value.href == (document.location.protocol + link)) {
                exists = true;
                return false;
            }
        });
        return exists;
    },

    hide: function () {
        hide(this.getModal());
    },

    hideByUser: function () {
        this.clear();
        this.check();
        return true;
    },

    show: function () {
        show(this.getModal());

        if (this.currentPopupType) {
            this.logByType.push(this.currentPopupType);
        }
    },

    init: function (settings, htmlContent, jsContent, scriptsList, stylesList, popupType) {

        htmlContent = htmlContent || '';

        jsContent = jsContent || '';

        scriptsList = scriptsList || {};

        stylesList = stylesList || {};

        popupType = popupType || 0;


        settings = settings || {};

        this.loadSettings(settings);

        this.createModal();

        if (popupType) {
            this.currentPopupType = popupType;
        }

        this.loadStyles(stylesList);

        this.setContent(htmlContent);

        this.loadScripts(scriptsList);

        this.setExecutableJS(jsContent);

        if (this.contentExist()) {
            this.show();
        }
        else {
            this.hide();
        }
    }
};

jQuery(function() {
    popuper.init(
        [],
        '',
        '',
        [],
        [],
        0    );
});