/**
 * Created by alexandr.tomenko on 5/18/2017.
 */
window.validation = (function ($) {
    var pub = {

        isEmpty: function (value) {
            return value === null || value === undefined || ($.isArray(value) && value.length === 0) || value === '';
        },

        addMessage: function (messages, message, value) {
            messages.push(message.replace(/\{value\}/g, value));
        },

        required: function (value, messages, options) {
            var valid = false;
            if (options.result != undefined) {
                valid = options.result
            } else {
                var isString = typeof value == 'string' || value instanceof String;
                if (!pub.isEmpty(isString ? $.trim(value) : value)) {
                    valid = true;
                }
            }

            if (!valid) {
                pub.addMessage(messages, options.message, value);
            }
        },

        number: function (value, messages, options) {
            var valid = true;
            if (options.result != undefined) {
                valid = options.result;
            }
            if (options.skipOnEmpty && pub.isEmpty(value)) {
                return;
            }

            if (!$.isNumeric(value)) {
                valid = false;
            }

            if (!valid) {
                pub.addMessage(messages, options.message, value);
            }
        },

        match: function (value, messages, options) {
            if (options.skipOnEmpty && pub.isEmpty(value) && value != 0) {
                return;
            }

            if (!options.pattern.test(value)) {
                pub.addMessage(messages, options.message, value);
            }
        },

        email: function (value, messages, options) {
            var valid = true;
            if (options.skipOnEmpty && pub.isEmpty(value)) {
                return;
            }
            if (options.pattern === undefined) {
                return;
            }

            if (typeof value != 'string') {
                valid = false;
            } else if (value.length > 254) {
                valid = false;
            } else {
                valid = options.pattern.test(value);
            }

            if (!valid) {
                pub.addMessage(messages, options.message, value);
            }
        },

        maxLength: function (value, messages, options) {
            var valid = true;
            if (options.max === undefined) {
                return;
            }

            if (typeof value != 'string') {
                valid = false;
            } else if (value.length > options.max) {
                valid = false;
            }
            if (!valid) {
                pub.addMessage(messages, options.message, value);
            }
        },

        minLength: function (value, messages, options) {
            var valid = true;
            if (options.skipOnEmpty && pub.isEmpty(value)) {
                return;
            }
            if (options.min === undefined) {
                return;
            }

            if (typeof value != 'string') {
                valid = false;
            } else if (value.length < options.min) {
                valid = false;
            }
            if (!valid) {
                pub.addMessage(messages, options.message, value);
            }
        },

        trim: function (attribute,value, messages, options) {
            if ( !pub.isEmpty(value)) {
                value = $.trim(value);
                $(attribute.id).val(value);
            }
            return value;
        },

        stripTags: function (attribute,value, messages, options) {
            if ( !pub.isEmpty(value)) {
                value = value.replace(/<\/?[^>]+(>|$)/g, "");
                value = value.replace(/[<>]/g, "");
                value = $.trim(value);
                $(attribute.id).val(value);
            }
            return value;
        },
        
        compare: function (value, messages, options) {
            if (options.skipOnEmpty && pub.isEmpty(value)) {
                return;
            }

            var cValue, valid = true;
            if (options.compareAttribute === null) {
                cValue = options.compareValue;
            } else {
                var compareInput = $('input[name="' + options.formName + '[' + options.compareAttribute + ']'+'"]');
                if (!compareInput.length) {
                    compareInput = $('input[name="' + options.compareAttribute+'"]');
                }
                cValue = compareInput.val();
                if (options.atribute !== undefined) {
                    compareInput.on('change', function () {
                        var triggerInput = $('input[name="' + options.formName + '[' + options.atribute + ']' + '"]');
                        if (!triggerInput.length) {
                            triggerInput = $('input[name="' + options.atribute + '"]');
                        }
                        triggerInput.trigger('blur');
                    });
                }
            }

            if (options.type === 'number') {
                value = parseFloat(value);
                cValue = parseFloat(compareValue);
            }

            switch (options.operator) {
                case '==':
                    valid = value == cValue;
                    break;
                case '!=':
                    valid = value != cValue;
                    break;
                case '>':
                    valid = value > cValue;
                    break;
                case '>=':
                    valid = value >= cValue;
                    break;
                case '<':
                    valid = value < cValue;
                    break;
                case '<=':
                    valid = value <= cValue;
                    break;
                default:
                    valid = false;
                    break;
            }

            if (!valid) {
                pub.addMessage(messages, options.message, value);
            }
        },

        boolean: function (value, messages, options) {
            if (options.value === undefined || options.strict) {
                return;
            }

            var valid = (!options.strict && value == options.value)
                || (options.strict && value === options.value);

            if (!valid) {
                pub.addMessage(messages, options.message, value);
            }
        },

        file: function (value, messages, options) {
            var files = getUploadedFiles(messages, options);
            $.each(files, function (i, file) {
                validateFile(file, messages, options);
            });
        },

        inArray: function (value, messages, options) {
            if (options.list === undefined) {
                return;
            }
            var list = objToArray(JSON.parse(options.list));
            if (list.indexOf(value) == -1) {
                pub.addMessage(messages, options.message, value);
            }
        },

        password: function (value, messages, options) {
            var otherSymbols = value.replace(/[a-zA-Z0-9-!"#$%&'()*+,.\/:;<=>?@\[\]^\\_`{|}~]/gi, '');

            if (otherSymbols.length !== 0) {
                pub.addMessage(messages, options.message, value);
            }
        },

        ip: function (value, messages, options) {
            var pattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
            if (options.skipOnEmpty && pub.isEmpty(value)) {
                return;
            }
            if (!pattern.test(value)) {
                pub.addMessage(messages, options.message, value);
            }
        }

    };

    function getUploadedFiles(messages, options) {
        if (typeof File === "undefined") {
            return [];
        }

        var files = $('input[name="' + options.attribute + '"]').get(0).files;
        if (!files) {
            messages.push(options.messages.message);
            return [];
        }

        if (files.length === 0) {
            if (!options.param.skipOnEmpty) {
                messages.push(options.messages.required);
            }
            return [];
        }

        return files;
    }

    function validateFile(file, messages, options) {
        if (options.param.extensions && options.param.extensions.length > 0) {
            var index = file.name.lastIndexOf('.');
            var ext = index === -1 ? '' : file.name.substr(index + 1, file.name.length).toLowerCase();
            var extensions = options.param.extensions;
            if (extensions.indexOf(ext) === -1) {
                messages.push(prepareMsg(options.messages.extensions, {'\\{file\\}' : file.name, '\{extensions\}': extensions.join(', ')}));
            }
        }


        if (options.param.maxSize && options.param.maxSize < file.size) {
            messages.push(prepareMsg(options.messages.tooBig, {'\\{file\\}' : file.name, '\{formatLimit\}': options.param.maxSize}));
        }

        if (options.param.minSize && options.param.minSize > file.size) {
            messages.push(prepareMsg(options.messages.tooSmall, {'\\{file\\}' : file.name, '\{formatLimit\}': options.param.minSize}));
        }
    }

    function prepareMsg(message, param) {
        if(message && typeof param === 'object') {
            for (var i in param) {
                message = message.replace(new RegExp(i, 'g'), param[i]);
            }
        }
        return message;
    }

    function objToArray(obj) {
        if (typeof obj === 'object') {
            return Object.keys(obj).map(function (key) { return obj[key]; });
        }
        return obj;
    }

    return pub;
})(jQuery);