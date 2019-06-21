/**
 * Created by alexandr.tomenko on 5/18/2017.
 */

(function ($) {

    $.fn.activeForm = function(initData) {
        return methods.init.apply(this, arguments);
    };

    var attributeDefaults = {
        id: undefined, // input id selector
        container: undefined, // field container selector
        error: '.error', // field error selector
        validateOnChange: true, // validation when a change is detected
        validateOnBlur: true, // validation when the input loses focus
        validate: undefined, //client validating function
        status: 0,
        cancelled: false,
        value: undefined,
        events: []
    };

    var settings = {
        validateOnSubmit: true,
        errorCssClass: 'has-error',
        successCssClass: 'has-success',
        ajaxEnable: false,
        ajaxCallbackDefault: 'ajaxCallbackActiveForm',
        /**
         * Form submission status
         * true - sending form data(with this status, data will not be re-sent to the server)
         * There already exists a similar attribute "submitting",
         * but it does not blocks double send of form. Looks like it is related with validation only
         */
        submitInProgress: false,
        tooltip:{
            toggleClass: 'tooltip-toggle',
            targetClass: 'tooltip-target'
        }
    };

    var methods = {
        init : function(attributes, formSettings) {
            var $form = $(this);
            $.each(attributes, function (i) {
                if (attributes[i].validate !== undefined && typeof attributes[i].validate === 'function') {
                    attributes[i] = $.extend({value: getValue($form, this)}, attributeDefaults, this);
                    watchAttribute($form, attributes[i]);
                }

            });

            $form.data('activeForm', {
                    attributes: attributes,
                    settings: $.extend({},settings,formSettings),
                    validated: false,
                    submitting: false
            });

            if (settings.validateOnSubmit) {
                $form.on('submit', methods.submitForm);
            }
            tooltip.init($form);
            initEvents($form);
        },

        validate: function (forceValidate) {
            if (forceValidate) {
                $(this).data('activeForm').submitting = true;
            }

            var $form = $(this),
                data = $form.data('activeForm'),

                messages = {},
                submitting = data.submitting && !forceValidate;

            $.each(data.attributes, function () {
                this.$form = $form;
                if (!$(this.if).is(":disabled")) {
                    this.cancelled = false;
                    if (data.submitting  || this.status === 2 || this.status === 3) {
                        var msg = messages[this.id];
                        if (msg === undefined) {
                            msg = [];
                            messages[this.id] = msg;
                        }
                        if (typeof this.validate === 'function') {
                            this.validate(this, getValue($form, this), msg);
                        }
                    }
                }
            });

            for (var i in messages) {
                if (0 === messages[i].length) {
                    delete messages[i];
                }
            }

            updateInputs($form, messages, submitting);
        },

        submitForm: function () {
            var $form = $(this),
                data = $form.data('activeForm'),
                result = false;

            if (settings.submitInProgress) {
                /** another request is sending now */
                return false;
            }

            if (data.validated) {
                data.submitting = false;
                result = true;
            } else {
                data.submitting = true;
                methods.validate.call($form);
                return false;
            }
            formButtonLock($form);
            preLoader.showLoader($form);

            if (data.settings.ajaxEnable) {
                ajaxCall($form);
                return false;
            }

            if (result) {
                /** submission is busy now due to form sending */
                settings.submitInProgress = true;
            }

            return result;
        },

        data: function () {
            return this.data('activeForm');
        }
    };

    var ajaxCall = function ($form) {
        var data = $form.data('activeForm'),
            callBackFunc = data.settings.ajaxCallback,
            callBackDefaultFunc = data.settings.ajaxCallbackDefault,
            formData = {};

        if (
            data.validated && data.settings.ajaxEnable
            && typeof data.settings.ajaxUrl !== 'undefined'
            && (typeof window[callBackFunc] === 'function' || callBackFunc === callBackDefaultFunc)
        ){
            /** submission is busy now due to form sending */
            settings.submitInProgress = true;

            $form.find("input[name]").each(function (index, node) {
                formData[node.name] = node.value;
            });
            $form.find("select[name]").each(function (index, node) {
                formData[node.name] = node.value;
            });
            $form.find("textarea[name]").each(function (index, node) {
                formData[node.name] = node.value;
            });

            $.post(
                data.settings.ajaxUrl,
                formData,
                function(result) {
                    window[callBackFunc](result, $form);
                    formButtonUnlock($form);
                    preLoader.hideLoader($form);
                },
                'json'
            ).always(
                function() {
                    /** form can be sent again */
                    settings.submitInProgress = false;
                }
            );
        }
    };

    window.ajaxCallbackActiveForm = function (result, $form) {
        var $systemMessageBlock = $('.system-message-block');
        var data = $form.data('activeForm');
        var messages = {};

        if (result.systemMessages.length) {
            $systemMessageBlock.text('');
            $.each(result.systemMessages, function () {
                $systemMessageBlock.append('<p class="system-message">'+this.text+'</p>')
            });
        }

        if (Object.keys(result.validationErrors).length) {
            $.each(data.attributes, function () {
                this.$form = $form;
                if (typeof result.validationErrors[this.name] !== 'undefined') {
                    messages[this.id] = [];
                    for (var i in result.validationErrors[this.name]) {
                        this.status = 2;
                        messages[this.id].push(result.validationErrors[this.name][i]);
                    }
                }
            });

            updateInputs($form, messages, false);
        }

        var ajaxTrigger = data.settings.ajaxTrigger;

        if (ajaxTrigger !== 'undefined'&& typeof window[ajaxTrigger] === 'function') {
            window[ajaxTrigger](result, $form);
        }
    };

    var preLoader = {
        showLoader: function ($form) {
            if (this.isEnable($form)) {
                this.getLoader($form).show();
            }
        },

        hideLoader: function ($form) {
            if (this.isEnable($form)) {
                this.getLoader($form).hide();
            }
        },

        getLoader: function ($form) {
            var data = $form.data('activeForm');
            return $form.find('.'+data.settings.preLoaderClass);
        },

        isEnable: function ($form) {
            var data = $form.data('activeForm');
            return data.settings.preLoaderEnable && data.settings.preLoaderClass;
        }
    };

    var tooltip = {
        init: function($form) {
            var data = $form.data('activeForm');
            $form.find('.' + data.settings.tooltip.toggleClass + ' input').on('focus', function () {
                $(this).siblings('.' + data.settings.tooltip.targetClass).fadeIn(300);
            }).on('blur', function () {
                $(this).siblings('.' + data.settings.tooltip.targetClass).fadeOut(300);
            });
        }
    };

    var formButtonLock = function($form) {
        $form.find(":submit").each(function () {
            $(this).attr("disabled", true);
        });
    };

    var formButtonUnlock = function($form) {
        $form.find(":submit").each(function () {
            $(this).attr("disabled", false);
        });
    };

    var watchAttribute = function ($form, attribute) {
        var $input = findInput($form, attribute);
        if (attribute.validateOnChange) {
            $input.on('change', function () {
                validateAttribute($form, attribute, false);
            });
        }
        if (attribute.validateOnBlur) {
            $input.on('blur', function () {
                if (attribute.status == 0 || attribute.status == 1) {
                    validateAttribute($form, attribute, true);
                }
            });
        }
    };

    var validateAttribute = function ($form, attribute, forceValidate) {
        var data = $form.data('activeForm');
        if (forceValidate) {
            attribute.status = 2;
        }
        $.each(data.attributes, function () {
            if (this.value !== getValue($form, this)) {
                this.status = 2;
                forceValidate = true;
            }
        });
        if (!forceValidate) {
            return;
        }
        if (data.submitting || $form.is(':hidden')) {
            return;
        }
        $.each(data.attributes, function () {
            if (this.status === 2) {
                this.status = 3;
            }
        });
        methods.validate.call($form);
    };

    var updateInputs = function ($form, messages, submitting) {
        var data = $form.data('activeForm');

        if (data === undefined) {
            return false;
        }

        if (submitting) {
            var errorAttributes = [];
            $.each(data.attributes, function () {
                if (!$(this.id).is(":disabled") && !this.cancelled && updateInput($form, this, messages)) {
                    errorAttributes.push(this);
                }
            });

            if (errorAttributes.length) {
                data.submitting = false;
            } else {
                data.validated = true;
                $form.submit();
            }
        } else {
            $.each(data.attributes, function () {
                if (!this.cancelled && (this.status === 2 || this.status === 3)) {
                    updateInput($form, this, messages);
                }
            });
        }
    };

    var updateInput = function ($form, attribute, messages) {
        var data = $form.data('activeForm'),
            $input = findInput($form, attribute),
            hasError = false;

        if (!$.isArray(messages[attribute.id])) {
            messages[attribute.id] = [];
        }

        attribute.status = 1;
        if ($input.length) {
            hasError = messages[attribute.id].length > 0;
            var $container = $form.find(attribute.container);
            var $error = $container.find(attribute.error);
            if (hasError) {
                $error.html(messages[attribute.id][0]);
                $container.removeClass( data.settings.successCssClass).addClass(data.settings.errorCssClass);
                data.validated = false;
            } else {
                $error.html('');
                $container.removeClass(data.settings.errorCssClass).addClass(data.settings.successCssClass);
            }
            attribute.value = getValue($form, attribute);
        }
        return hasError;
    };

    var getValue = function ($form, attribute) {
        var $input = findInput($form, attribute);
        var type = $input.attr('type');
        if (type === 'checkbox' || type === 'radio') {
            var $realInput = $input.filter(':checked');
            if (!$realInput.length) {
                $realInput = $form.find('input[type=hidden][name="' + $input.attr('name') + '"]');
            }
            return $realInput.val();
        } else {
            return $input.val();
        }
    };

    var findInput = function ($form, attribute) {
        var $input = $form.find(attribute.id);
        if ($input.length && $input[0].tagName.toLowerCase() === 'div') {
            return $input.find('input');
        } else {
            return $input;
        }
    };

    var getAttributeByName = function ($form, attributeName) {
        var data = $form.data('activeForm');
        var result = null;
        $.each(data.attributes, function () {
            if (this.name === attributeName) {
                result = this;
                return false;
            }
        });

        return result;
    };

    var initEvents = function ($form) {
        var data = $form.data('activeForm');
        $.each(data.attributes, function (i) {
            if (data.attributes[i].events.length) {
                $.each(data.attributes[i].events, function() {
                    if (this.target !== null) {
                        var targetAttribute = getAttributeByName($form, this.target.name);
                        this.target = new FormAttribute(findInput($form, targetAttribute), targetAttribute.additionalData);
                    }
                });
            }
            var $input = findInput($form, data.attributes[i]);
            new FormAttribute($input, data.attributes[i].additionalData, data.attributes[i].events);
        });
    };

    FormAttribute = function($input, additionalData, events) {
        this.$input = $input;
        this.additionalData = additionalData;
        this._init();
        this._initEvents(events);
    };
    FormAttribute.prototype = {
        _init: function () {
            this.type = this.$input.attr('type');
            this.ivents = [];
        },
        _initEvents: function (events) {
            var that = this;
            if (typeof events === 'undefined' || !events.length) {
                return;
            }

            events.sort(function (a, b) {
                return b.weight - a.weight;
            });
            events.forEach(function(item) {
                that.ivents.push(new ActiveFormEvent(that, item))
            });
        },
        setValue: function (value) {
            this.$input.val(value);
        },
        getValue: function () {
            if (this.type === 'checkbox' || this.type === 'radio') {
                var $realInput = this.$input.filter(':checked');
                if (!$realInput.length) {
                    $realInput = this.$input.parent().find('input[type=hidden][name="' + this.$input.attr('name') + '"]');
                }
                return $realInput.val();
            } else {
                return this.$input.val();
            }
        },
        getData: function () {
            return this.additionalData;
        },
        setDisabledInput: function() {
            this.$input.attr("disabled", true);
        },
        unSelect: function() {
            $('option:selected', this.$input).each(function(){
                this.selected=false;
            });
        },
        clear: function () {
            if (this.type === 'checkbox' || this.type === 'radio') {
                this.$input.prop('checked', false );
            } else {
                this.$input.val('');
            }
        }
    };

    ActiveFormEvent = function(attributeModel, setting) {
        this.OPTION_TYPE_TEXT = 1;
        this.OPTION_TYPE_DATA_KEY = 2;

        this.attributeModel = attributeModel;
        this.setting = {
            action: {
                name: '',
                options: {}
            },
            event: undefined,
            condition: undefined,
            target: undefined,
            weight: 0
        };
        $.extend(this.setting, setting);
        this._init();
    };
    ActiveFormEvent.prototype = {
        /**
         * Event action
         * @param options
         */
        actionSet: function (options) {
            if (this.setting.target === null) {
                throw new FormEventException('Invalid setting data, target must be set');
            }

            var value = this._getEventData(options, 'DataFieldName');
            if (value !== 'undefined') {
                this.setting.target.setValue(value);
            }
        },

        /**
         * Event action
         * @param options
         */
        actionSetByValue: function (options) {
            if (this.setting.target === null) {
                throw new FormEventException('Invalid setting data, target must be set');
            }

            var data = this._getEventData(options, 'DataFieldName');
            var currentValue = this._getAttributeValue();

            if (typeof data[currentValue] !== 'undefined') {
                this.setting.target.setValue(data[currentValue]);
            }
        },

        /**
         * Event action
         * @param options
         */
        actionTriggerEvent: function (options) {
            var value = this._getEventData(options, 'TriggerName');

            if (value !== 'undefined') {
                $(document).trigger(value);
            }
        },

        /**
         * Event action
         * @param options
         */
        actionDisable: function (options) {
            this.attributeModel.setDisabledInput();
        },

        /**
         * Event action
         * @param options
         */
        actionUnSelect: function (options) {
            this.attributeModel.unSelect();
        },

        actionClear: function(options) {
            if (this.setting.target === null) {
                this.attributeModel.clear();
            } else {
                this.setting.target.clear();
            }
        },

        _init: function () {
            this.attributeModel.$input.on(this._getEventName(), this._action.bind(this));
        },

        _action: function () {
            try {
                if (this._checkCondition()) {
                    var actionName = 'action' + this._ucFirst(this.setting.action.name);
                    this[actionName](this.setting.action.options);
                }
            } catch (e) {
                if (e instanceof FormEventException) {
                    errorLog(e.stack);
                } else {
                    throw e;
                }
            }
        },

        _checkCondition: function () {
            if (null === this.setting.condition) {
                return true;
            }
            if (!Array.isArray(this.setting.condition)) {
                return false;
            }
            var condition = this.setting.condition;
            for (var i = 0; i < condition.length; i++) {
                try {
                    var field = this._getConditionValue(condition[i][0]);
                    var operand = condition[i][1];
                    var value = this._getConditionValue(condition[i][2]);
                } catch (e) {
                    if (e instanceof FormEventException) {
                        errorLog(e.stack)
                    } else {
                        throw e;
                    }
                    return false;
                }

                if (!this._checkRule(field, operand, value)) {
                    return false
                }
            }
            return true;
        },

        _checkRule: function (checkingVal, operand, ruleVal) {
            var result = false;
            switch (operand.toUpperCase()) {
                case '=':
                    result = (checkingVal == ruleVal);
                    break;

                case '!=':
                    result = (checkingVal != ruleVal);
                    break;

                case '<':
                    result = (checkingVal < ruleVal);
                    break;

                case '<=':
                    result = (checkingVal <= ruleVal);
                    break;

                case '>':
                    result = (checkingVal > ruleVal);
                    break;

                case '>=':
                    result = (checkingVal >= ruleVal);
                    break;

                case 'IN':
                    result = (Array.isArray(ruleVal) && (ruleVal.indexOf(checkingVal) !== -1));
                    break;

                case 'NOT IN':
                    result = (Array.isArray(ruleVal) && (ruleVal.indexOf(checkingVal) === -1));
                    break;

                default:
                    throw new FormEventException('Unknown operand.');

            }

            return result;
        },

        _getConditionValue: function(field) {
            if (field === 'value') {
                return this._getAttributeValue()
            }

            var prefix = /data-/;
            if (field.search(prefix) === 0) {
                var key = field.replace(prefix, '');
                return this._getAttributeAdditionalData(key);
            }

            return field;
        },

        _getEventData: function (options, optionName) {
            if (typeof options[optionName] === 'undefined') {
                throw new FormEventException('Undefined option: ' + optionName)
            }

            var typeId = parseInt(options[optionName].typeId);
            var key = options[optionName].value;

            if (key === '') {
                return this._getAttributeValue();
            }

            var result;
            switch (typeId) {
                case this.OPTION_TYPE_TEXT:
                    result = key;
                    break;
                case this.OPTION_TYPE_DATA_KEY:
                    result = this._getAttributeAdditionalData(key);
                    break;
                default:
                    throw new FormEventException('Invalid option type');
            }
            return result;
        },

        _getAttributeAdditionalData: function (key) {
            attributeData = this.attributeModel.getData();
            if (typeof attributeData[key] === 'undefined') {
                throw new FormEventException('Invalid attributeData or key');
            }

            return attributeData[key];
        },

        _getAttributeValue: function () {
            return this.attributeModel.getValue();
        },

        _getEventName: function () {
            return this.setting.event;
        },

        _ucFirst: function (str) {
            if (!str) {
                return str;
            }
            return str[0].toUpperCase() + str.slice(1);
        }
    };

    var FormEventException = function (message) {
        this.message = message;
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, FormEventException);
        } else {
            this.stack = (new Error()).stack;
        }
    };
    FormEventException.prototype = Object.create(Error.prototype);
    FormEventException.prototype.constructor = FormEventException;

    var errorLog = function (msg) {
        console.error(msg);
    }

})(jQuery);