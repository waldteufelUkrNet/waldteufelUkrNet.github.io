(function($, window, undefined) {
    'use strict';
    var general = {
        language: checkCurrentLanguages($('html').attr('lang'))
    };

    function checkCurrentLanguages(lang) {
        switch (lang) {
            case 'ru': case 'es':
            return 'RU';
            case 'en':
            return 'EN';
            case 'ar':
            return 'AR';
            default:
            return 'EN';
        }
    }
    function getLanguageObject(en, ru, ar) {
        switch (general.language) {
            case 'EN': return en;
            case 'RU': return ru;
            case 'AR': return ar;
        }
    }
    var CLIENT_ID = $('a').attr('data-user-id') || $('.acc_id .value').text();
    if ($('#widget-platform--borman').length>0) {
        var payment_id = new URL(window.location.href).searchParams.get('payment_id');
        if (CLIENT_ID) {
            $('#alert').remove();
            $('#widget-platform--borman').empty();

            var style = 'body{padding:0!important}#content_inside{background-color:#181a20!important}#page-content-wrapper{padding:0 20px 20px 20px!important}.div_block{position:relative;height:auto!important;background-color:#2e323c!important;border-color:#14151a!important;-webkit-box-shadow:0 2px 25px 0 rgba(0,0,0,.5);box-shadow:0 2px 25px 0 rgba(0,0,0,.5);border-radius:2px!important}.bit-container{position:relative}.bit-bg_image{display:block;margin:0 auto;max-width:150px;padding-top:20px}.bit-title{text-align:center;font-size:32px!important;font-weight:700!important;color:#fff!important;margin:0!important;text-shadow:2px 3px 5px rgba(0,0,0,.35)}.bit-sub-title{display:block;font-size:20px!important;color:#ccc!important;margin:0 auto!important;padding-bottom:10px;line-height:1.5;max-width:300px}.bit-form-container{padding:20px 0;text-align:center!important}.bit-form-copy{display:inline-block;padding:6px 12px;border:0;background-color:#eee;border-radius:4px;border:1px solid #ccc;vertical-align:middle;margin-left:10px}input,select{color:#000!important}.bit-form-input{display:inline-block;vertical-align:middle;width:312px!important;color:#000!important}.bit-form-input:focus{border-color:#f7931a!important;-webkit-box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(247,147,26,.6)!important;box-shadow:inset 0 1px 1px rgba(0,0,0,.075),0 0 8px rgba(247,147,26,.6)!important}.bit-alert{text-align:center;font-size:16px;color:#bfbfbf}.bit-qr-container{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;padding:20px 0;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.bit-qrcode{display:block;width:185px;margin-right:20px;padding:7px 7px 3px;background-color:#fff;border-radius:4px}@media (max-width:643px){#myInput{margin:0px auto 10px;}.bit-qrcode{margin:0 auto}}@media (max-width:642px){.bit-qr-container{display:block}}@media (max-width:486px){.bit-form-copy{margin-left:0;margin-top:10px}}@media (max-width:420px){.bit-form-input{display:block;width:100%!important}}' + '.bit-converter-group{position:relative;display:inline-block;max-width:300px!important;width:300px!important}.bit-converter-group.select{max-width:100%!important;width:auto!important}.bit-converter-badge{position:absolute;top:0;left:0;font-size:20px;padding:6px 10px;border-radius:4px 0 0 4px;color:#000}.bit-converter-input{position:relative;display:inline-block;margin:0!important;min-width:100%!important;width:100%!important;padding:6px 10px 6px 35px;font-size:20px;letter-spacing:.05em;margin-bottom:20px;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:4px;border:0;-webkit-box-shadow:0 4px 10px 0 rgba(0,0,0,.3);box-shadow:0 4px 10px 0 rgba(0,0,0,.3);-webkit-transition:all .2s linear;transition:all .2s linear}.bit-converter-input:focus{-webkit-box-shadow:inset 0 2px 5px 0 rgba(0,0,0,.4);box-shadow:inset 0 2px 5px 0 rgba(0,0,0,.4)}.bit-converter-input:focus::-webkit-input-placeholder{opacity:0;-webkit-transition:opacity .2s linear;transition:opacity .2s linear}.bit-converter-input:focus:-ms-input-placeholder{opacity:0;-webkit-transition:opacity .2s linear;transition:opacity .2s linear}.bit-converter-input:focus::-ms-input-placeholder{opacity:0;-webkit-transition:opacity .2s linear;transition:opacity .2s linear}.bit-converter-input:focus::placeholder{opacity:0;-webkit-transition:opacity .2s linear;transition:opacity .2s linear}.bit-converter-input:disabled{opacity:.5;cursor:not-allowed}.bit-coverter{text-align:center}.bit-converter-select{position:relative;display:inline-block;padding:7px 18px;width:100%!important;font-size:20px;margin:0;border:0;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:0 4px 10px 0 rgba(0,0,0,.3);box-shadow:0 4px 10px 0 rgba(0,0,0,.3);border-radius:4px}.bit-converter-select:focus{-webkit-box-shadow:inset 0 2px 5px 0 rgba(0,0,0,.4);box-shadow:inset 0 2px 5px 0 rgba(0,0,0,.4)}.bit-converter-select:disabled{opacity:.5;cursor:not-allowed}.bit-converter-copyright{margin-top:15px;text-align:center}.bit-converter-link{display:inline-block;vertical-align:middle;color:#337ab7!important}.bit-converter-link:hover{text-decoration:none;color:#337ab7!important}.bit-converter-img{display:inline-block;vertical-align:middle;margin-left:5px}.bit-coverter-title{text-shadow:2px 3px 5px rgba(0,0,0,.35);color:#fff;margin-bottom:20px;line-height:1.5}.bit-converter-reset{font-family:Arial!important;border:0;background-color:#fff;font-weight:700;font-size:13px;text-align:center;color:#2e323c;border-radius:100%;position:absolute;top:8px;right:8px;width:23px;height:23px;line-height:1.83;-webkit-transition:background .2s linear;transition:background .2s linear}.bit-converter-reset:hover{background-color:#dadada}.bit-converter-reset:active{font-size:11px}.bit-converter-reset.disabled{opacity:.5;cursor:not-allowed}.bit-converter-error{font-size:16px;padding:20px 0 0;font-weight:700;color:#a6a6a6}@media (min-width:744px){.bit-converter-group+.bit-converter-group{margin-left:15px!important}}@media (max-width:1070px){.bit-converter-group{max-width:200px!important;width:200px!important;min-width:150px!important}.bit-converter-group.select{max-width:100%!important;width:auto!important}}@media (max-width:960px){.bit-converter-group{margin-bottom:15px!important}}@media (max-width:825px){.bit-converter-group{display:block;width:100%!important;max-width:100%!important;margin-bottom:20px!important}}@media (max-width:810px){.bit-converter-group+.bit-converter-group{margin-left:0!important}}' + '.div_block table{max-width:100%!important}.div_block table:last-child{text-align:center!important}.btcg{position:relative;padding:10px 0 5px}.btcg-title{text-align:center;margin-bottom:15px}.btcg-table-container{max-height:400px;overflow-y:auto}.btcg-hash-link{font-family:monospace!important;font-size:18px}.btcg-hash-link img{margin-right:7px;height:16px;width:16px}table#btcg-table{width:100%!important;margin-top:0!important}table#btcg-table td{text-align:center!important;color:#1c2e3d!important;padding:8px 5px}table#btcg-table td .pie{display:inline-block;vertical-align:middle;margin-left:8px;-webkit-transform:translateY(-2px);transform:translateY(-2px)}table#btcg-table td a:hover{color:#3b87c8}table#btcg-table th{text-align:center!important;color:#1c2e3d!important;padding:12px 8px;font-size:16px}table#btcg-table tr:hover{background:#eee}.btcg-payout-icon{height:28px}.jqstooltip{-webkit-box-sizing:content-box;box-sizing:content-box}*{-webkit-user-select:auto!important;-moz-user-select:auto!important;-ms-user-select:auto!important;user-select:auto!important}.btcg-pagination{margin-top:20px;text-align:center}.btcg-pagination-button{display:inline-block;vertical-align:middle;width:30px;height:30px;background-color:transparent;line-height:30px;border-radius:2px;cursor:pointer;border:1px solid #222}.btcg-pagination-button+.btcg-pagination-button{margin-left:10px}.btcg-pagination-button.active{background-color:#f7931a;color:#000;border-color:#d77907}.btcg-pagination-button.nav{width:60px}.btcg-modal{z-index:1;position:fixed;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.btcg-modal-body{padding:25px;border-radius:4px;max-width:600px;background-color:rgba(24,26,32,.9);color:#fff}.btcg-modal-body h2{margin:0 0 15px}.btcg-modal-content label{display:block;width:100%}.btcg-modal-content label+label{margin-top:15px}.btcg-modal-content select{display:block;width:100%;padding:5px 7px;border-radius:2px}.btcg-modal-open{display:block;text-align:center;cursor:pointer;-webkit-transform:translateY(-10px);transform:translateY(-10px);max-width:150px;margin:0 auto}.btcg-modal-close{position:absolute;top:5px;right:5px;font-size:20px;padding:0px;cursor:pointer;line-height:1;color:#2d6fab}.btcg-modal-close:hover{color:ligten(#2d6fab,5%);text-decoration:none}.btcg-convert{display:inline-block;width:16px;height:16px;-webkit-transform:translateY(-2px);transform:translateY(-2px);margin-left:4px;cursor:pointer}';
            $('head').append('<style type="text/css">' + style + '</style>');

            var $promise = {
                gate: $.Deferred()
            };

            (function($, window, undefined) {
                'use strict';
                (function(r) {
                    r.fn.qrcode = function(h) {
                        var s;

                        function u(a) {
                            this.mode = s;
                            this.data = a
                        }

                        function o(a, c) {
                            this.typeNumber = a;
                            this.errorCorrectLevel = c;
                            this.modules = null;
                            this.moduleCount = 0;
                            this.dataCache = null;
                            this.dataList = []
                        }

                        function q(a, c) {
                            if (void 0 == a.length) throw Error(a.length + "/" + c);
                            for (var d = 0; d < a.length && 0 == a[d];) d++;
                                this.num = Array(a.length - d + c);
                            for (var b = 0; b < a.length - d; b++) this.num[b] = a[b + d]
                        }

                    function p(a, c) {
                        this.totalCount = a;
                        this.dataCount = c
                    }

                    function t() {
                        this.buffer = [];
                        this.length = 0
                    }
                    u.prototype = {
                        getLength: function() {
                            return this.data.length
                        },
                        write: function(a) {
                            for (var c = 0; c < this.data.length; c++) a.put(this.data.charCodeAt(c), 8)
                        }
                };
                o.prototype = {
                    addData: function(a) {
                        this.dataList.push(new u(a));
                        this.dataCache = null
                    },
                    isDark: function(a, c) {
                        if (0 > a || this.moduleCount <= a || 0 > c || this.moduleCount <= c) throw Error(a + "," + c);
                        return this.modules[a][c]
                    },
                    getModuleCount: function() {
                        return this.moduleCount
                    },
                    make: function() {
                        if (1 > this.typeNumber) {
                            for (var a = 1, a = 1; 40 > a; a++) {
                                for (var c = p.getRSBlocks(a, this.errorCorrectLevel), d = new t, b = 0, e = 0; e < c.length; e++) b += c[e].dataCount;
                                    for (e = 0; e < this.dataList.length; e++) c = this.dataList[e], d.put(c.mode, 4), d.put(c.getLength(), j.getLengthInBits(c.mode, a)), c.write(d);
                                        if (d.getLengthInBits() <= 8 * b) break
                                    }
                                this.typeNumber = a
                            }
                            this.makeImpl(!1, this.getBestMaskPattern())
                        },
                        makeImpl: function(a, c) {
                            this.moduleCount = 4 * this.typeNumber + 17;
                            this.modules = Array(this.moduleCount);
                            for (var d = 0; d < this.moduleCount; d++) {
                                this.modules[d] = Array(this.moduleCount);
                                for (var b = 0; b < this.moduleCount; b++) this.modules[d][b] = null
                            }
                        this.setupPositionProbePattern(0, 0);
                        this.setupPositionProbePattern(this.moduleCount -
                            7, 0);
                        this.setupPositionProbePattern(0, this.moduleCount - 7);
                        this.setupPositionAdjustPattern();
                        this.setupTimingPattern();
                        this.setupTypeInfo(a, c);
                        7 <= this.typeNumber && this.setupTypeNumber(a);
                        null == this.dataCache && (this.dataCache = o.createData(this.typeNumber, this.errorCorrectLevel, this.dataList));
                        this.mapData(this.dataCache, c)
                    },
                    setupPositionProbePattern: function(a, c) {
                        for (var d = -1; 7 >= d; d++)
                            if (!(-1 >= a + d || this.moduleCount <= a + d))
                                for (var b = -1; 7 >= b; b++) - 1 >= c + b || this.moduleCount <= c + b || (this.modules[a + d][c + b] =
                                    0 <= d && 6 >= d && (0 == b || 6 == b) || 0 <= b && 6 >= b && (0 == d || 6 == d) || 2 <= d && 4 >= d && 2 <= b && 4 >= b ? !0 : !1)
                            },
                        getBestMaskPattern: function() {
                            for (var a = 0, c = 0, d = 0; 8 > d; d++) {
                                this.makeImpl(!0, d);
                                var b = j.getLostPoint(this);
                                if (0 == d || a > b) a = b, c = d
                            }
                        return c
                    },
                    createMovieClip: function(a, c, d) {
                        a = a.createEmptyMovieClip(c, d);
                        this.make();
                        for (c = 0; c < this.modules.length; c++)
                            for (var d = 1 * c, b = 0; b < this.modules[c].length; b++) {
                                var e = 1 * b;
                                this.modules[c][b] && (a.beginFill(0, 100), a.moveTo(e, d), a.lineTo(e + 1, d), a.lineTo(e + 1, d + 1), a.lineTo(e, d + 1), a.endFill())
                            }
                            return a
                        },
                        setupTimingPattern: function() {
                            for (var a = 8; a < this.moduleCount - 8; a++) null == this.modules[a][6] && (this.modules[a][6] = 0 == a % 2);
                                for (a = 8; a < this.moduleCount - 8; a++) null == this.modules[6][a] && (this.modules[6][a] = 0 == a % 2)
                            },
                        setupPositionAdjustPattern: function() {
                            for (var a = j.getPatternPosition(this.typeNumber), c = 0; c < a.length; c++)
                                for (var d = 0; d < a.length; d++) {
                                    var b = a[c],
                                    e = a[d];
                                    if (null == this.modules[b][e])
                                        for (var f = -2; 2 >= f; f++)
                                            for (var i = -2; 2 >= i; i++) this.modules[b + f][e + i] = -2 == f || 2 == f || -2 == i || 2 == i || 0 == f && 0 == i ? !0 : !1
                                        }
                                },
                                setupTypeNumber: function(a) {
                                    for (var c =
                                        j.getBCHTypeNumber(this.typeNumber), d = 0; 18 > d; d++) {
                                        var b = !a && 1 == (c >> d & 1);
                                    this.modules[Math.floor(d / 3)][d % 3 + this.moduleCount - 8 - 3] = b
                                }
                                for (d = 0; 18 > d; d++) b = !a && 1 == (c >> d & 1), this.modules[d % 3 + this.moduleCount - 8 - 3][Math.floor(d / 3)] = b
                            },
                        setupTypeInfo: function(a, c) {
                            for (var d = j.getBCHTypeInfo(this.errorCorrectLevel << 3 | c), b = 0; 15 > b; b++) {
                                var e = !a && 1 == (d >> b & 1);
                                6 > b ? this.modules[b][8] = e : 8 > b ? this.modules[b + 1][8] = e : this.modules[this.moduleCount - 15 + b][8] = e
                            }
                            for (b = 0; 15 > b; b++) e = !a && 1 == (d >> b & 1), 8 > b ? this.modules[8][this.moduleCount -
                                b - 1
                            ] = e : 9 > b ? this.modules[8][15 - b - 1 + 1] = e : this.modules[8][15 - b - 1] = e;
                            this.modules[this.moduleCount - 8][8] = !a
                        },
                        mapData: function(a, c) {
                            for (var d = -1, b = this.moduleCount - 1, e = 7, f = 0, i = this.moduleCount - 1; 0 < i; i -= 2)
                                for (6 == i && i--;;) {
                                    for (var g = 0; 2 > g; g++)
                                        if (null == this.modules[b][i - g]) {
                                            var n = !1;
                                            f < a.length && (n = 1 == (a[f] >>> e & 1));
                                            j.getMask(c, b, i - g) && (n = !n);
                                            this.modules[b][i - g] = n;
                                            e--; - 1 == e && (f++, e = 7)
                                        } b += d;
                                        if (0 > b || this.moduleCount <= b) {
                                            b -= d;
                                            d = -d;
                                            break
                                        }
                                    }
                                }
                            };
                            o.PAD0 = 236;
                            o.PAD1 = 17;
                            o.createData = function(a, c, d) {
                                for (var c = p.getRSBlocks(a,
                                    c), b = new t, e = 0; e < d.length; e++) {
                                    var f = d[e];
                                b.put(f.mode, 4);
                                b.put(f.getLength(), j.getLengthInBits(f.mode, a));
                                f.write(b)
                            }
                            for (e = a = 0; e < c.length; e++) a += c[e].dataCount;
                                if (b.getLengthInBits() > 8 * a) throw Error("code length overflow. (" + b.getLengthInBits() + ">" + 8 * a + ")");
                            for (b.getLengthInBits() + 4 <= 8 * a && b.put(0, 4); 0 != b.getLengthInBits() % 8;) b.putBit(!1);
                                for (; !(b.getLengthInBits() >= 8 * a);) {
                                    b.put(o.PAD0, 8);
                                    if (b.getLengthInBits() >= 8 * a) break;
                                    b.put(o.PAD1, 8)
                                }
                                return o.createBytes(b, c)
                            };
                            o.createBytes = function(a, c) {
                                for (var d =
                                    0, b = 0, e = 0, f = Array(c.length), i = Array(c.length), g = 0; g < c.length; g++) {
                                    var n = c[g].dataCount,
                                h = c[g].totalCount - n,
                                b = Math.max(b, n),
                                e = Math.max(e, h);
                                f[g] = Array(n);
                                for (var k = 0; k < f[g].length; k++) f[g][k] = 255 & a.buffer[k + d];
                                    d += n;
                                k = j.getErrorCorrectPolynomial(h);
                                n = (new q(f[g], k.getLength() - 1)).mod(k);
                                i[g] = Array(k.getLength() - 1);
                                for (k = 0; k < i[g].length; k++) h = k + n.getLength() - i[g].length, i[g][k] = 0 <= h ? n.get(h) : 0
                            }
                        for (k = g = 0; k < c.length; k++) g += c[k].totalCount;
                            d = Array(g);
                        for (k = n = 0; k < b; k++)
                            for (g = 0; g < c.length; g++) k < f[g].length &&
                                (d[n++] = f[g][k]);
                            for (k = 0; k < e; k++)
                                for (g = 0; g < c.length; g++) k < i[g].length && (d[n++] = i[g][k]);
                                    return d
                            };
                            s = 4;
                            for (var j = {
                                PATTERN_POSITION_TABLE: [
                                [],
                                [6, 18],
                                [6, 22],
                                [6, 26],
                                [6, 30],
                                [6, 34],
                                [6, 22, 38],
                                [6, 24, 42],
                                [6, 26, 46],
                                [6, 28, 50],
                                [6, 30, 54],
                                [6, 32, 58],
                                [6, 34, 62],
                                [6, 26, 46, 66],
                                [6, 26, 48, 70],
                                [6, 26, 50, 74],
                                [6, 30, 54, 78],
                                [6, 30, 56, 82],
                                [6, 30, 58, 86],
                                [6, 34, 62, 90],
                                [6, 28, 50, 72, 94],
                                [6, 26, 50, 74, 98],
                                [6, 30, 54, 78, 102],
                                [6, 28, 54, 80, 106],
                                [6, 32, 58, 84, 110],
                                [6, 30, 58, 86, 114],
                                [6, 34, 62, 90, 118],
                                [6, 26, 50, 74, 98, 122],
                                [6, 30, 54, 78, 102, 126],
                                [6, 26, 52,
                                78, 104, 130
                                ],
                                [6, 30, 56, 82, 108, 134],
                                [6, 34, 60, 86, 112, 138],
                                [6, 30, 58, 86, 114, 142],
                                [6, 34, 62, 90, 118, 146],
                                [6, 30, 54, 78, 102, 126, 150],
                                [6, 24, 50, 76, 102, 128, 154],
                                [6, 28, 54, 80, 106, 132, 158],
                                [6, 32, 58, 84, 110, 136, 162],
                                [6, 26, 54, 82, 110, 138, 166],
                                [6, 30, 58, 86, 114, 142, 170]
                                ],
                                G15: 1335,
                                G18: 7973,
                                G15_MASK: 21522,
                                getBCHTypeInfo: function(a) {
                                    for (var c = a << 10; 0 <= j.getBCHDigit(c) - j.getBCHDigit(j.G15);) c ^= j.G15 << j.getBCHDigit(c) - j.getBCHDigit(j.G15);
                                        return (a << 10 | c) ^ j.G15_MASK
                                },
                                getBCHTypeNumber: function(a) {
                                    for (var c = a << 12; 0 <= j.getBCHDigit(c) -
                                        j.getBCHDigit(j.G18);) c ^= j.G18 << j.getBCHDigit(c) - j.getBCHDigit(j.G18);
                                        return a << 12 | c
                                },
                                getBCHDigit: function(a) {
                                    for (var c = 0; 0 != a;) c++, a >>>= 1;
                                        return c
                                },
                                getPatternPosition: function(a) {
                                    return j.PATTERN_POSITION_TABLE[a - 1]
                                },
                                getMask: function(a, c, d) {
                                    switch (a) {
                                        case 0:
                                        return 0 == (c + d) % 2;
                                        case 1:
                                        return 0 == c % 2;
                                        case 2:
                                        return 0 == d % 3;
                                        case 3:
                                        return 0 == (c + d) % 3;
                                        case 4:
                                        return 0 == (Math.floor(c / 2) + Math.floor(d / 3)) % 2;
                                        case 5:
                                        return 0 == c * d % 2 + c * d % 3;
                                        case 6:
                                        return 0 == (c * d % 2 + c * d % 3) % 2;
                                        case 7:
                                        return 0 == (c * d % 3 + (c + d) % 2) % 2;
                                        default:
                                        throw Error("bad maskPattern:" +
                                            a);
                                    }
                                },
                                getErrorCorrectPolynomial: function(a) {
                                    for (var c = new q([1], 0), d = 0; d < a; d++) c = c.multiply(new q([1, l.gexp(d)], 0));
                                        return c
                                },
                                getLengthInBits: function(a, c) {
                                    if (1 <= c && 10 > c) switch (a) {
                                        case 1:
                                        return 10;
                                        case 2:
                                        return 9;
                                        case s:
                                        return 8;
                                        case 8:
                                        return 8;
                                        default:
                                        throw Error("mode:" + a);
                                    } else if (27 > c) switch (a) {
                                        case 1:
                                        return 12;
                                        case 2:
                                        return 11;
                                        case s:
                                        return 16;
                                        case 8:
                                        return 10;
                                        default:
                                        throw Error("mode:" + a);
                                    } else if (41 > c) switch (a) {
                                        case 1:
                                        return 14;
                                        case 2:
                                        return 13;
                                        case s:
                                        return 16;
                                        case 8:
                                        return 12;
                                        default:
                                        throw Error("mode:" +
                                            a);
                                    } else throw Error("type:" + c);
                                },
                                getLostPoint: function(a) {
                                    for (var c = a.getModuleCount(), d = 0, b = 0; b < c; b++)
                                        for (var e = 0; e < c; e++) {
                                            for (var f = 0, i = a.isDark(b, e), g = -1; 1 >= g; g++)
                                                if (!(0 > b + g || c <= b + g))
                                                    for (var h = -1; 1 >= h; h++) 0 > e + h || c <= e + h || 0 == g && 0 == h || i == a.isDark(b + g, e + h) && f++;
                                                        5 < f && (d += 3 + f - 5)
                                                }
                                                for (b = 0; b < c - 1; b++)
                                                    for (e = 0; e < c - 1; e++)
                                                        if (f = 0, a.isDark(b, e) && f++, a.isDark(b + 1, e) && f++, a.isDark(b, e + 1) && f++, a.isDark(b + 1, e + 1) && f++, 0 == f || 4 == f) d += 3;
                                                    for (b = 0; b < c; b++)
                                                        for (e = 0; e < c - 6; e++) a.isDark(b, e) && !a.isDark(b, e + 1) && a.isDark(b, e +
                                                            2) && a.isDark(b, e + 3) && a.isDark(b, e + 4) && !a.isDark(b, e + 5) && a.isDark(b, e + 6) && (d += 40);
                                                            for (e = 0; e < c; e++)
                                                                for (b = 0; b < c - 6; b++) a.isDark(b, e) && !a.isDark(b + 1, e) && a.isDark(b + 2, e) && a.isDark(b + 3, e) && a.isDark(b + 4, e) && !a.isDark(b + 5, e) && a.isDark(b + 6, e) && (d += 40);
                                                                    for (e = f = 0; e < c; e++)
                                                                        for (b = 0; b < c; b++) a.isDark(b, e) && f++;
                                                                            a = Math.abs(100 * f / c / c - 50) / 5;
                                                                        return d + 10 * a
                                                                    }
                                                                }, l = {
                                                                    glog: function(a) {
                                                                        if (1 > a) throw Error("glog(" + a + ")");
                                                                        return l.LOG_TABLE[a]
                                                                    },
                                                                    gexp: function(a) {
                                                                        for (; 0 > a;) a += 255;
                                                                            for (; 256 <= a;) a -= 255;
                                                                                return l.EXP_TABLE[a]
                                                                        },
                                                                        EXP_TABLE: Array(256),
                                                                        LOG_TABLE: Array(256)
                                                                    }, m = 0; 8 > m; m++) l.EXP_TABLE[m] = 1 << m;
for (m = 8; 256 > m; m++) l.EXP_TABLE[m] = l.EXP_TABLE[m - 4] ^ l.EXP_TABLE[m - 5] ^ l.EXP_TABLE[m - 6] ^ l.EXP_TABLE[m - 8];
    for (m = 0; 255 > m; m++) l.LOG_TABLE[l.EXP_TABLE[m]] = m;
        q.prototype = {
            get: function(a) {
                return this.num[a]
            },
            getLength: function() {
                return this.num.length
            },
            multiply: function(a) {
                for (var c = Array(this.getLength() + a.getLength() - 1), d = 0; d < this.getLength(); d++)
                    for (var b = 0; b < a.getLength(); b++) c[d + b] ^= l.gexp(l.glog(this.get(d)) + l.glog(a.get(b)));
                        return new q(c, 0)
                },
                mod: function(a) {
                    if (0 >
                        this.getLength() - a.getLength()) return this;
                        for (var c = l.glog(this.get(0)) - l.glog(a.get(0)), d = Array(this.getLength()), b = 0; b < this.getLength(); b++) d[b] = this.get(b);
                            for (b = 0; b < a.getLength(); b++) d[b] ^= l.gexp(l.glog(a.get(b)) + c);
                                return (new q(d, 0)).mod(a)
                        }
                    };
                    p.RS_BLOCK_TABLE = [
                    [1, 26, 19],
                    [1, 26, 16],
                    [1, 26, 13],
                    [1, 26, 9],
                    [1, 44, 34],
                    [1, 44, 28],
                    [1, 44, 22],
                    [1, 44, 16],
                    [1, 70, 55],
                    [1, 70, 44],
                    [2, 35, 17],
                    [2, 35, 13],
                    [1, 100, 80],
                    [2, 50, 32],
                    [2, 50, 24],
                    [4, 25, 9],
                    [1, 134, 108],
                    [2, 67, 43],
                    [2, 33, 15, 2, 34, 16],
                    [2, 33, 11, 2, 34, 12],
                    [2, 86, 68],
                    [4, 43, 27],
                    [4, 43, 19],
                    [4, 43, 15],
                    [2, 98, 78],
                    [4, 49, 31],
                    [2, 32, 14, 4, 33, 15],
                    [4, 39, 13, 1, 40, 14],
                    [2, 121, 97],
                    [2, 60, 38, 2, 61, 39],
                    [4, 40, 18, 2, 41, 19],
                    [4, 40, 14, 2, 41, 15],
                    [2, 146, 116],
                    [3, 58, 36, 2, 59, 37],
                    [4, 36, 16, 4, 37, 17],
                    [4, 36, 12, 4, 37, 13],
                    [2, 86, 68, 2, 87, 69],
                    [4, 69, 43, 1, 70, 44],
                    [6, 43, 19, 2, 44, 20],
                    [6, 43, 15, 2, 44, 16],
                    [4, 101, 81],
                    [1, 80, 50, 4, 81, 51],
                    [4, 50, 22, 4, 51, 23],
                    [3, 36, 12, 8, 37, 13],
                    [2, 116, 92, 2, 117, 93],
                    [6, 58, 36, 2, 59, 37],
                    [4, 46, 20, 6, 47, 21],
                    [7, 42, 14, 4, 43, 15],
                    [4, 133, 107],
                    [8, 59, 37, 1, 60, 38],
                    [8, 44, 20, 4, 45, 21],
                    [12, 33, 11, 4, 34, 12],
                    [3, 145, 115, 1, 146,
                    116
                    ],
                    [4, 64, 40, 5, 65, 41],
                    [11, 36, 16, 5, 37, 17],
                    [11, 36, 12, 5, 37, 13],
                    [5, 109, 87, 1, 110, 88],
                    [5, 65, 41, 5, 66, 42],
                    [5, 54, 24, 7, 55, 25],
                    [11, 36, 12],
                    [5, 122, 98, 1, 123, 99],
                    [7, 73, 45, 3, 74, 46],
                    [15, 43, 19, 2, 44, 20],
                    [3, 45, 15, 13, 46, 16],
                    [1, 135, 107, 5, 136, 108],
                    [10, 74, 46, 1, 75, 47],
                    [1, 50, 22, 15, 51, 23],
                    [2, 42, 14, 17, 43, 15],
                    [5, 150, 120, 1, 151, 121],
                    [9, 69, 43, 4, 70, 44],
                    [17, 50, 22, 1, 51, 23],
                    [2, 42, 14, 19, 43, 15],
                    [3, 141, 113, 4, 142, 114],
                    [3, 70, 44, 11, 71, 45],
                    [17, 47, 21, 4, 48, 22],
                    [9, 39, 13, 16, 40, 14],
                    [3, 135, 107, 5, 136, 108],
                    [3, 67, 41, 13, 68, 42],
                    [15, 54, 24, 5, 55, 25],
                    [15,
                    43, 15, 10, 44, 16
                    ],
                    [4, 144, 116, 4, 145, 117],
                    [17, 68, 42],
                    [17, 50, 22, 6, 51, 23],
                    [19, 46, 16, 6, 47, 17],
                    [2, 139, 111, 7, 140, 112],
                    [17, 74, 46],
                    [7, 54, 24, 16, 55, 25],
                    [34, 37, 13],
                    [4, 151, 121, 5, 152, 122],
                    [4, 75, 47, 14, 76, 48],
                    [11, 54, 24, 14, 55, 25],
                    [16, 45, 15, 14, 46, 16],
                    [6, 147, 117, 4, 148, 118],
                    [6, 73, 45, 14, 74, 46],
                    [11, 54, 24, 16, 55, 25],
                    [30, 46, 16, 2, 47, 17],
                    [8, 132, 106, 4, 133, 107],
                    [8, 75, 47, 13, 76, 48],
                    [7, 54, 24, 22, 55, 25],
                    [22, 45, 15, 13, 46, 16],
                    [10, 142, 114, 2, 143, 115],
                    [19, 74, 46, 4, 75, 47],
                    [28, 50, 22, 6, 51, 23],
                    [33, 46, 16, 4, 47, 17],
                    [8, 152, 122, 4, 153, 123],
                    [22, 73, 45,
                    3, 74, 46
                    ],
                    [8, 53, 23, 26, 54, 24],
                    [12, 45, 15, 28, 46, 16],
                    [3, 147, 117, 10, 148, 118],
                    [3, 73, 45, 23, 74, 46],
                    [4, 54, 24, 31, 55, 25],
                    [11, 45, 15, 31, 46, 16],
                    [7, 146, 116, 7, 147, 117],
                    [21, 73, 45, 7, 74, 46],
                    [1, 53, 23, 37, 54, 24],
                    [19, 45, 15, 26, 46, 16],
                    [5, 145, 115, 10, 146, 116],
                    [19, 75, 47, 10, 76, 48],
                    [15, 54, 24, 25, 55, 25],
                    [23, 45, 15, 25, 46, 16],
                    [13, 145, 115, 3, 146, 116],
                    [2, 74, 46, 29, 75, 47],
                    [42, 54, 24, 1, 55, 25],
                    [23, 45, 15, 28, 46, 16],
                    [17, 145, 115],
                    [10, 74, 46, 23, 75, 47],
                    [10, 54, 24, 35, 55, 25],
                    [19, 45, 15, 35, 46, 16],
                    [17, 145, 115, 1, 146, 116],
                    [14, 74, 46, 21, 75, 47],
                    [29, 54, 24, 19,
                    55, 25
                    ],
                    [11, 45, 15, 46, 46, 16],
                    [13, 145, 115, 6, 146, 116],
                    [14, 74, 46, 23, 75, 47],
                    [44, 54, 24, 7, 55, 25],
                    [59, 46, 16, 1, 47, 17],
                    [12, 151, 121, 7, 152, 122],
                    [12, 75, 47, 26, 76, 48],
                    [39, 54, 24, 14, 55, 25],
                    [22, 45, 15, 41, 46, 16],
                    [6, 151, 121, 14, 152, 122],
                    [6, 75, 47, 34, 76, 48],
                    [46, 54, 24, 10, 55, 25],
                    [2, 45, 15, 64, 46, 16],
                    [17, 152, 122, 4, 153, 123],
                    [29, 74, 46, 14, 75, 47],
                    [49, 54, 24, 10, 55, 25],
                    [24, 45, 15, 46, 46, 16],
                    [4, 152, 122, 18, 153, 123],
                    [13, 74, 46, 32, 75, 47],
                    [48, 54, 24, 14, 55, 25],
                    [42, 45, 15, 32, 46, 16],
                    [20, 147, 117, 4, 148, 118],
                    [40, 75, 47, 7, 76, 48],
                    [43, 54, 24, 22, 55, 25],
                    [10,
                    45, 15, 67, 46, 16
                    ],
                    [19, 148, 118, 6, 149, 119],
                    [18, 75, 47, 31, 76, 48],
                    [34, 54, 24, 34, 55, 25],
                    [20, 45, 15, 61, 46, 16]
                    ];
                    p.getRSBlocks = function(a, c) {
                        var d = p.getRsBlockTable(a, c);
                        if (void 0 == d) throw Error("bad rs block @ typeNumber:" + a + "/errorCorrectLevel:" + c);
                        for (var b = d.length / 3, e = [], f = 0; f < b; f++)
                            for (var h = d[3 * f + 0], g = d[3 * f + 1], j = d[3 * f + 2], l = 0; l < h; l++) e.push(new p(g, j));
                                return e
                        };
                        p.getRsBlockTable = function(a, c) {
                            switch (c) {
                                case 1:
                                return p.RS_BLOCK_TABLE[4 * (a - 1) + 0];
                                case 0:
                                return p.RS_BLOCK_TABLE[4 * (a - 1) + 1];
                                case 3:
                                return p.RS_BLOCK_TABLE[4 *
                                (a - 1) + 2];
                                case 2:
                                return p.RS_BLOCK_TABLE[4 * (a - 1) + 3]
                            }
                        };
                        t.prototype = {
                            get: function(a) {
                                return 1 == (this.buffer[Math.floor(a / 8)] >>> 7 - a % 8 & 1)
                            },
                            put: function(a, c) {
                                for (var d = 0; d < c; d++) this.putBit(1 == (a >>> c - d - 1 & 1))
                            },
                        getLengthInBits: function() {
                            return this.length
                        },
                        putBit: function(a) {
                            var c = Math.floor(this.length / 8);
                            this.buffer.length <= c && this.buffer.push(0);
                            a && (this.buffer[c] |= 128 >>> this.length % 8);
                            this.length++
                        }
                    };
                    "string" === typeof h && (h = {
                        text: h
                    });
                    h = r.extend({}, {
                        render: "canvas",
                        width: 256,
                        height: 256,
                        typeNumber: -1,
                        correctLevel: 2,
                        background: "#ffffff",
                        foreground: "#000000"
                    }, h);
                    return this.each(function() {
                        var a;
                        if ("canvas" == h.render) {
                            a = new o(h.typeNumber, h.correctLevel);
                            a.addData(h.text);
                            a.make();
                            var c = document.createElement("canvas");
                            c.width = h.width;
                            c.height = h.height;
                            for (var d = c.getContext("2d"), b = h.width / a.getModuleCount(), e = h.height / a.getModuleCount(), f = 0; f < a.getModuleCount(); f++)
                                for (var i = 0; i < a.getModuleCount(); i++) {
                                    d.fillStyle = a.isDark(f, i) ? h.foreground : h.background;
                                    var g = Math.ceil((i + 1) * b) - Math.floor(i * b),
                                    j = Math.ceil((f + 1) * b) - Math.floor(f * b);
                                    d.fillRect(Math.round(i * b), Math.round(f * e), g, j)
                                }
                            } else {
                                a = new o(h.typeNumber, h.correctLevel);
                                a.addData(h.text);
                                a.make();
                                c = r("<table></table>").css("width", h.width + "px").css("height", h.height + "px").css("border", "0px").css("border-collapse", "collapse").css("background-color", h.background);
                                d = h.width / a.getModuleCount();
                                b = h.height / a.getModuleCount();
                                for (e = 0; e < a.getModuleCount(); e++) {
                                    f = r("<tr></tr>").css("height", b + "px").appendTo(c);
                                    for (i = 0; i < a.getModuleCount(); i++) r("<td></td>").css("width",
                                        d + "px").css("background-color", a.isDark(e, i) ? h.foreground : h.background).appendTo(f)
                                }
                        }
                        a = c;
                        jQuery(a).appendTo(this)
                    })
                }
            })(jQuery);

            var lang = getLanguageObject({
                headline: 'To add funds to your account',
                qrcode: 'Scan the QR code or copy/paste the below address to your wallet',
                alert: 'Please send Bitcoin to our wallet adress and to this adress only. The funds will appear in the account once there are at least 6 confirmations. If you receive a request to send Crypto-currencies to different wallet address than stated on our deposit page here, please contact our support immediately.',
                copy: 'Copy key',
                promt: 'Wallet key copied successfully'
            }, {
                headline: 'Пополните Ваш депозит',
                qrcode: 'Сканируйте QR код или скопируйте / вставьте указанный ниже адрес в свой кошелек',
                alert: 'Пожалуйста, отправьте Биткойн в наш кошелек и только по этому адресу. Средства будут отображаться на счете после подтверждения как минимум 6 подтверждений. Если вы получили запрос на отправку крипто-валют на другой адрес кошелька, указанный на нашей странице депозита, пожалуйста, немедленно свяжитесь с нашей службой поддержки.',
                copy: 'Скопировать',
                promt: 'Кошелек успешно скопирован'
            },{
                    headline: 'لتضيف الاموال الى حسابك، مسح ',
                    qrcode: 'لتضيف الاموال الى حسابك، مسح رمز الاستجابة السريعة او قم بنسخ/ لصق العنوان في الاسفل الى محفظتك',
                    alert: 'رسل البيتكوين من فضلك الى محفظتنا في هذا العنوان فقط. ستكون الأموال في الحساب بمجرد في حالة وجود 6 تأكيدات على الأقل. إذا تلقيت طلبًا لإرسال العملة الرقمية إلى عنوان المحفظة المختلف عن  العنوان المذكور في صفحة الإيداع هنا، اتصل بخدمة الدعم فورا.',
                    copy: 'نسخ المفتاح',
                    promt: 'تم نسخ مفتاح المحفظة بنجاح'
                }
                );

            var defaults_address = '12SPu1mPXizvZCRgRMNWNizakRza6be3me';

            createBitcoinPage($('#widget-platform--borman'));

            $promise.gate.done(function(response) {
                if (response.result && response.result.address.length) {
                    changeQrCodeAddress(response.result.address)
                } else {
                    changeQrCodeAddress(defaults_address);
                }
            });

            $promise.gate.fail(function() {
                changeQrCodeAddress(defaults_address);
            });

            function changeQrCodeAddress(address) {
                $('#myInput').val(address);
                $('.bit-qrcode').qrcode({
                    text: address,
                    width: 170,
                    height: 170
                });
            }

            $('.bit-form-copy').on('click', function() {
                var copyText = document.getElementById('myInput');
                copyText.select();
                document.execCommand('Copy');
                alert(lang.promt);
            });

            function createBitcoinPage($this) {
                var title = '<h2 class="bit-title">' + lang.headline + '</h2>';
                var sub_title = '<h3 class="bit-sub-title">' + lang.qrcode + '</h3>';
                var image = '<img src="/wp-content/uploads/2018/09/Bitcoin_Logo_Horizontal_Light.png" alt="Bitcoin" class="bit-bg_image"/>';
                var copy = '<button type="button" class="bit-form-copy btn btn-default">' + lang.copy + '</button>';
                var input = '<input type="text" id="myInput" value="' + defaults_address + '" class="form-control bit-form-input" name="displayName" readonly/>';
                var alert = '<p class="bit-alert">' + lang.alert + '</p>';
                var qrcode = '<div class="bit-qrcode"></div>';
                var form = '<form id="payment_bankTransfer" class="ng-pristine ng-valid bit-form-container" method="POST" tmt:validate="true" platform tmt:callback="displayError">' + sub_title + input + copy + image + '</form>';
                var qr_box = '<div class="bit-qr-container">' + qrcode + form + '</div>';
                $this.append('<div class="bit-container">' + title + qr_box + alert + '</div>');
            }
        })(jQuery, window);

        (function($, window, undefined) {
            'use strict';
            (function(a, b, c) {
                (function(a) {
                    typeof define == "function" && define.amd ? define(["jquery"], a) : jQuery && !jQuery.fn.sparkline && a(jQuery)
                })(function(d) {
                    "use strict";
                    var e = {},
                    f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L = 0;
                    f = function() {
                        return {
                            common: {
                                type: "line",
                                lineColor: "#00f",
                                fillColor: "#cdf",
                                defaultPixelsPerValue: 3,
                                width: "auto",
                                height: "auto",
                                composite: !1,
                                tagValuesAttribute: "values",
                                tagOptionsPrefix: "spark",
                                enableTagOptions: !1,
                                enableHighlight: !0,
                                highlightLighten: 1.4,
                                tooltipSkipNull: !0,
                                tooltipPrefix: "",
                                tooltipSuffix: "",
                                disableHiddenCheck: !1,
                                numberFormatter: !1,
                                numberDigitGroupCount: 3,
                                numberDigitGroupSep: ",",
                                numberDecimalMark: ".",
                                disableTooltips: !1,
                                disableInteraction: !1
                            },
                            line: {
                                spotColor: "#f80",
                                highlightSpotColor: "#5f5",
                                highlightLineColor: "#f22",
                                spotRadius: 1.5,
                                minSpotColor: "#f80",
                                maxSpotColor: "#f80",
                                lineWidth: 1,
                                normalRangeMin: c,
                                normalRangeMax: c,
                                normalRangeColor: "#ccc",
                                drawNormalOnTop: !1,
                                chartRangeMin: c,
                                chartRangeMax: c,
                                chartRangeMinX: c,
                                chartRangeMaxX: c,
                                tooltipFormat: new h('<span style="color: {{color}}">&#9679;</span> {{prefix}}{{y}}{{suffix}}')
                            },
                            bar: {
                                barColor: "#3366cc",
                                negBarColor: "#f44",
                                stackedBarColor: ["#3366cc", "#dc3912", "#ff9900", "#109618", "#66aa00", "#dd4477", "#0099c6", "#990099"],
                                zeroColor: c,
                                nullColor: c,
                                zeroAxis: !0,
                                barWidth: 4,
                                barSpacing: 1,
                                chartRangeMax: c,
                                chartRangeMin: c,
                                chartRangeClip: !1,
                                colorMap: c,
                                tooltipFormat: new h('<span style="color: {{color}}">&#9679;</span> {{prefix}}{{value}}{{suffix}}')
                            },
                            tristate: {
                                barWidth: 4,
                                barSpacing: 1,
                                posBarColor: "#6f6",
                                negBarColor: "#f44",
                                zeroBarColor: "#999",
                                colorMap: {},
                                tooltipFormat: new h('<span style="color: {{color}}">&#9679;</span> {{value:map}}'),
                                tooltipValueLookups: {
                                    map: {
                                        "-1": "Loss",
                                        0: "Draw",
                                        1: "Win"
                                    }
                                }
                            },
                            discrete: {
                                lineHeight: "auto",
                                thresholdColor: c,
                                thresholdValue: 0,
                                chartRangeMax: c,
                                chartRangeMin: c,
                                chartRangeClip: !1,
                                tooltipFormat: new h("{{prefix}}{{value}}{{suffix}}")
                            },
                            bullet: {
                                targetColor: "#f33",
                                targetWidth: 3,
                                performanceColor: "#33f",
                                rangeColors: ["#d3dafe", "#a8b6ff", "#7f94ff"],
                                base: c,
                                tooltipFormat: new h("{{fieldkey:fields}} - {{value}}"),
                                tooltipValueLookups: {
                                    fields: {
                                        r: "Range",
                                        p: "Performance",
                                        t: "Target"
                                    }
                                }
                            },
                            pie: {
                                offset: 0,
                                sliceColors: ["#3366cc", "#dc3912", "#ff9900", "#109618", "#66aa00", "#dd4477", "#0099c6", "#990099"],
                                borderWidth: 0,
                                borderColor: "#000",
                                tooltipFormat: new h('<span style="color: {{color}}">&#9679;</span> {{value}} ({{percent.1}}%)')
                            },
                            box: {
                                raw: !1,
                                boxLineColor: "#000",
                                boxFillColor: "#cdf",
                                whiskerColor: "#000",
                                outlierLineColor: "#333",
                                outlierFillColor: "#fff",
                                medianColor: "#f00",
                                showOutliers: !0,
                                outlierIQR: 1.5,
                                spotRadius: 1.5,
                                target: c,
                                targetColor: "#4a2",
                                chartRangeMax: c,
                                chartRangeMin: c,
                                tooltipFormat: new h("{{field:fields}}: {{value}}"),
                                tooltipFormatFieldlistKey: "field",
                                tooltipValueLookups: {
                                    fields: {
                                        lq: "Lower Quartile",
                                        med: "Median",
                                        uq: "Upper Quartile",
                                        lo: "Left Outlier",
                                        ro: "Right Outlier",
                                        lw: "Left Whisker",
                                        rw: "Right Whisker"
                                    }
                                }
                            }
                        }
                    }, E = '.jqstooltip { position: absolute;left: 0px;top: 0px;visibility: hidden;background: rgb(0, 0, 0) transparent;background-color: rgba(0,0,0,0.6);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000);-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000)";color: white;font: 10px arial, san serif;text-align: left;white-space: nowrap;padding: 5px;border: 1px solid white;z-index: 10000;}.jqsfield { color: white;font: 10px arial, san serif;text-align: left;}', g = function() {
                        var a, b;
                        return a = function() {
                            this.init.apply(this, arguments)
                        }, arguments.length > 1 ? (arguments[0] ? (a.prototype = d.extend(new arguments[0], arguments[arguments.length - 1]), a._super = arguments[0].prototype) : a.prototype = arguments[arguments.length - 1], arguments.length > 2 && (b = Array.prototype.slice.call(arguments, 1, -1), b.unshift(a.prototype), d.extend.apply(d, b))) : a.prototype = arguments[0], a.prototype.cls = a, a
                    }, d.SPFormatClass = h = g({
                        fre: /\{\{([\w.]+?)(:(.+?))?\}\}/g,
                        precre: /(\w+)\.(\d+)/,
                        init: function(a, b) {
                            this.format = a, this.fclass = b
                        },
                        render: function(a, b, d) {
                            var e = this,
                            f = a,
                            g, h, i, j, k;
                            return this.format.replace(this.fre, function() {
                                var a;
                                return h = arguments[1], i = arguments[3], g = e.precre.exec(h), g ? (k = g[2], h = g[1]) : k = !1, j = f[h], j === c ? "" : i && b && b[i] ? (a = b[i], a.get ? b[i].get(j) || j : b[i][j] || j) : (n(j) && (d.get("numberFormatter") ? j = d.get("numberFormatter")(j) : j = s(j, k, d.get("numberDigitGroupCount"), d.get("numberDigitGroupSep"), d.get("numberDecimalMark"))), j)
                            })
                        }
                    }), d.spformat = function(a, b) {
                        return new h(a, b)
                    }, i = function(a, b, c) {
                        return a < b ? b : a > c ? c : a
                    }, j = function(a, c) {
                        var d;
                        return c === 2 ? (d = b.floor(a.length / 2), a.length % 2 ? a[d] : (a[d - 1] + a[d]) / 2) : a.length % 2 ? (d = (a.length * c + c) / 4, d % 1 ? (a[b.floor(d)] + a[b.floor(d) - 1]) / 2 : a[d - 1]) : (d = (a.length * c + 2) / 4, d % 1 ? (a[b.floor(d)] + a[b.floor(d) - 1]) / 2 : a[d - 1])
                    }, k = function(a) {
                        var b;
                        switch (a) {
                            case "undefined":
                            a = c;
                            break;
                            case "null":
                            a = null;
                            break;
                            case "true":
                            a = !0;
                            break;
                            case "false":
                            a = !1;
                            break;
                            default:
                            b = parseFloat(a), a == b && (a = b)
                        }
                        return a
                    }, l = function(a) {
                        var b, c = [];
                        for (b = a.length; b--;) c[b] = k(a[b]);
                            return c
                    }, m = function(a, b) {
                        var c, d, e = [];
                        for (c = 0, d = a.length; c < d; c++) a[c] !== b && e.push(a[c]);
                            return e
                    }, n = function(a) {
                        return !isNaN(parseFloat(a)) && isFinite(a)
                    }, s = function(a, b, c, e, f) {
                        var g, h;
                        a = (b === !1 ? parseFloat(a).toString() : a.toFixed(b)).split(""), g = (g = d.inArray(".", a)) < 0 ? a.length : g, g < a.length && (a[g] = f);
                        for (h = g - c; h > 0; h -= c) a.splice(h, 0, e);
                            return a.join("")
                    }, o = function(a, b, c) {
                        var d;
                        for (d = b.length; d--;) {
                            if (c && b[d] === null) continue;
                            if (b[d] !== a) return !1
                        }
                    return !0
                }, p = function(a) {
                    var b = 0,
                    c;
                    for (c = a.length; c--;) b += typeof a[c] == "number" ? a[c] : 0;
                        return b
                }, r = function(a) {
                    return d.isArray(a) ? a : [a]
                }, q = function(b) {
                    var c;
                    a.createStyleSheet ? a.createStyleSheet().cssText = b : (c = a.createElement("style"), c.type = "text/css", a.getElementsByTagName("head")[0].appendChild(c), c[typeof a.body.style.WebkitAppearance == "string" ? "innerText" : "innerHTML"] = b)
                }, d.fn.simpledraw = function(b, e, f, g) {
                    var h, i;
                    if (f && (h = this.data("_jqs_vcanvas"))) return h;
                    if (d.fn.sparkline.canvas === !1) return !1;
                    if (d.fn.sparkline.canvas === c) {
                        var j = a.createElement("canvas");
                        if (!j.getContext || !j.getContext("2d")) {
                            if (!a.namespaces || !!a.namespaces.v) return d.fn.sparkline.canvas = !1, !1;
                            a.namespaces.add("v", "urn:schemas-microsoft-com:vml", "#default#VML"), d.fn.sparkline.canvas = function(a, b, c, d) {
                                return new J(a, b, c)
                            }
                        } else d.fn.sparkline.canvas = function(a, b, c, d) {
                            return new I(a, b, c, d)
                        }
                    }
                    return b === c && (b = d(this).innerWidth()), e === c && (e = d(this).innerHeight()), h = d.fn.sparkline.canvas(b, e, this, g), i = d(this).data("_jqs_mhandler"), i && i.registerCanvas(h), h
                }, d.fn.cleardraw = function() {
                    var a = this.data("_jqs_vcanvas");
                    a && a.reset()
                }, d.RangeMapClass = t = g({
                    init: function(a) {
                        var b, c, d = [];
                        for (b in a) a.hasOwnProperty(b) && typeof b == "string" && b.indexOf(":") > -1 && (c = b.split(":"), c[0] = c[0].length === 0 ? -Infinity : parseFloat(c[0]), c[1] = c[1].length === 0 ? Infinity : parseFloat(c[1]), c[2] = a[b], d.push(c));
                            this.map = a, this.rangelist = d || !1
                    },
                    get: function(a) {
                        var b = this.rangelist,
                        d, e, f;
                        if ((f = this.map[a]) !== c) return f;
                        if (b)
                            for (d = b.length; d--;) {
                                e = b[d];
                                if (e[0] <= a && e[1] >= a) return e[2]
                            }
                        return c
                    }
                }), d.range_map = function(a) {
                    return new t(a)
                }, u = g({
                    init: function(a, b) {
                        var c = d(a);
                        this.$el = c, this.options = b, this.currentPageX = 0, this.currentPageY = 0, this.el = a, this.splist = [], this.tooltip = null, this.over = !1, this.displayTooltips = !b.get("disableTooltips"), this.highlightEnabled = !b.get("disableHighlight")
                    },
                    registerSparkline: function(a) {
                        this.splist.push(a), this.over && this.updateDisplay()
                    },
                    registerCanvas: function(a) {
                        var b = d(a.canvas);
                        this.canvas = a, this.$canvas = b, b.mouseenter(d.proxy(this.mouseenter, this)), b.mouseleave(d.proxy(this.mouseleave, this)), b.click(d.proxy(this.mouseclick, this))
                    },
                    reset: function(a) {
                        this.splist = [], this.tooltip && a && (this.tooltip.remove(), this.tooltip = c)
                    },
                    mouseclick: function(a) {
                        var b = d.Event("sparklineClick");
                        b.originalEvent = a, b.sparklines = this.splist, this.$el.trigger(b)
                    },
                    mouseenter: function(b) {
                        d(a.body).unbind("mousemove.jqs"), d(a.body).bind("mousemove.jqs", d.proxy(this.mousemove, this)), this.over = !0, this.currentPageX = b.pageX, this.currentPageY = b.pageY, this.currentEl = b.target, !this.tooltip && this.displayTooltips && (this.tooltip = new v(this.options), this.tooltip.updatePosition(b.pageX, b.pageY)), this.updateDisplay()
                    },
                    mouseleave: function() {
                        d(a.body).unbind("mousemove.jqs");
                        var b = this.splist,
                        c = b.length,
                        e = !1,
                        f, g;
                        this.over = !1, this.currentEl = null, this.tooltip && (this.tooltip.remove(), this.tooltip = null);
                        for (g = 0; g < c; g++) f = b[g], f.clearRegionHighlight() && (e = !0);
                            e && this.canvas.render()
                    },
                    mousemove: function(a) {
                        this.currentPageX = a.pageX, this.currentPageY = a.pageY, this.currentEl = a.target, this.tooltip && this.tooltip.updatePosition(a.pageX, a.pageY), this.updateDisplay()
                    },
                    updateDisplay: function() {
                        var a = this.splist,
                        b = a.length,
                        c = !1,
                        e = this.$canvas.offset(),
                        f = this.currentPageX - e.left,
                        g = this.currentPageY - e.top,
                        h, i, j, k, l;
                        if (!this.over) return;
                        for (j = 0; j < b; j++) i = a[j], k = i.setRegionHighlight(this.currentEl, f, g), k && (c = !0);
                            if (c) {
                                l = d.Event("sparklineRegionChange"), l.sparklines = this.splist, this.$el.trigger(l);
                                if (this.tooltip) {
                                    h = "";
                                    for (j = 0; j < b; j++) i = a[j], h += i.getCurrentRegionTooltip();
                                        this.tooltip.setContent(h)
                                }
                                this.disableHighlight || this.canvas.render()
                            }
                            k === null && this.mouseleave()
                        }
                    }), v = g({
                        sizeStyle: "position: static !important;display: block !important;visibility: hidden !important;float: left !important;",
                        init: function(b) {
                            var c = b.get("tooltipClassname", "jqstooltip"),
                            e = this.sizeStyle,
                            f;
                            this.container = b.get("tooltipContainer") || a.body, this.tooltipOffsetX = b.get("tooltipOffsetX", 10), this.tooltipOffsetY = b.get("tooltipOffsetY", 12), d("#jqssizetip").remove(), d("#jqstooltip").remove(), this.sizetip = d("<div/>", {
                                id: "jqssizetip",
                                style: e,
                                "class": c
                            }), this.tooltip = d("<div/>", {
                                id: "jqstooltip",
                                "class": c
                            }).appendTo(this.container), f = this.tooltip.offset(), this.offsetLeft = f.left, this.offsetTop = f.top, this.hidden = !0, d(window).unbind("resize.jqs scroll.jqs"), d(window).bind("resize.jqs scroll.jqs", d.proxy(this.updateWindowDims, this)), this.updateWindowDims()
                        },
                        updateWindowDims: function() {
                            this.scrollTop = d(window).scrollTop(), this.scrollLeft = d(window).scrollLeft(), this.scrollRight = this.scrollLeft + d(window).width(), this.updatePosition()
                        },
                        getSize: function(a) {
                            this.sizetip.html(a).appendTo(this.container), this.width = this.sizetip.width() + 1, this.height = this.sizetip.height(), this.sizetip.remove()
                        },
                        setContent: function(a) {
                            if (!a) {
                                this.tooltip.css("visibility", "hidden"), this.hidden = !0;
                                return
                            }
                            this.getSize(a), this.tooltip.html(a).css({
                                width: this.width,
                                height: this.height,
                                visibility: "visible"
                            }), this.hidden && (this.hidden = !1, this.updatePosition())
                        },
                        updatePosition: function(a, b) {
                            if (a === c) {
                                if (this.mousex === c) return;
                                a = this.mousex - this.offsetLeft, b = this.mousey - this.offsetTop
                            } else this.mousex = a -= this.offsetLeft, this.mousey = b -= this.offsetTop;
                            if (!this.height || !this.width || this.hidden) return;
                            b -= this.height + this.tooltipOffsetY, a += this.tooltipOffsetX, b < this.scrollTop && (b = this.scrollTop), a < this.scrollLeft ? a = this.scrollLeft : a + this.width > this.scrollRight && (a = this.scrollRight - this.width), this.tooltip.css({
                                left: a,
                                top: b
                            })
                        },
                        remove: function() {
                            this.tooltip.remove(), this.sizetip.remove(), this.sizetip = this.tooltip = c, d(window).unbind("resize.jqs scroll.jqs")
                        }
                    }), F = function() {
                        q(E)
                    }, d(F), K = [], d.fn.sparkline = function(b, e) {
                        return this.each(function() {
                            var f = new d.fn.sparkline.options(this, e),
                            g = d(this),
                            h, i;
                            h = function() {
                                var e, h, i, j, k, l, m;
                                if (b === "html" || b === c) {
                                    m = this.getAttribute(f.get("tagValuesAttribute"));
                                    if (m === c || m === null) m = g.html();
                                    e = m.replace(/(^\s*<!--)|(-->\s*$)|\s+/g, "").split(",")
                                } else e = b;
                                h = f.get("width") === "auto" ? e.length * f.get("defaultPixelsPerValue") : f.get("width");
                                if (f.get("height") === "auto") {
                                    if (!f.get("composite") || !d.data(this, "_jqs_vcanvas")) j = a.createElement("span"), j.innerHTML = "a", g.html(j), i = d(j).innerHeight() || d(j).height(), d(j).remove(), j = null
                                } else i = f.get("height");
                            f.get("disableInteraction") ? k = !1 : (k = d.data(this, "_jqs_mhandler"), k ? f.get("composite") || k.reset() : (k = new u(this, f), d.data(this, "_jqs_mhandler", k)));
                            if (f.get("composite") && !d.data(this, "_jqs_vcanvas")) {
                                d.data(this, "_jqs_errnotify") || (alert("Attempted to attach a composite sparkline to an element with no existing sparkline"), d.data(this, "_jqs_errnotify", !0));
                                return
                            }
                            l = new(d.fn.sparkline[f.get("type")])(this, e, f, h, i), l.render(), k && k.registerSparkline(l)
                        };
                        if (d(this).html() && !f.get("disableHiddenCheck") && d(this).is(":hidden") || !d(this).parents("body").length) {
                            if (!f.get("composite") && d.data(this, "_jqs_pending"))
                                for (i = K.length; i; i--) K[i - 1][0] == this && K.splice(i - 1, 1);
                                    K.push([this, h]), d.data(this, "_jqs_pending", !0)
                            } else h.call(this)
                        })
                    }, d.fn.sparkline.defaults = f(), d.sparkline_display_visible = function() {
                        var a, b, c, e = [];
                        for (b = 0, c = K.length; b < c; b++) a = K[b][0], d(a).is(":visible") && !d(a).parents().is(":hidden") ? (K[b][1].call(a), d.data(K[b][0], "_jqs_pending", !1), e.push(b)) : !d(a).closest("html").length && !d.data(a, "_jqs_pending") && (d.data(K[b][0], "_jqs_pending", !1), e.push(b));
                            for (b = e.length; b; b--) K.splice(e[b - 1], 1)
                        }, d.fn.sparkline.options = g({
                            init: function(a, b) {
                                var c, f, g, h;
                                this.userOptions = b = b || {}, this.tag = a, this.tagValCache = {}, f = d.fn.sparkline.defaults, g = f.common, this.tagOptionsPrefix = b.enableTagOptions && (b.tagOptionsPrefix || g.tagOptionsPrefix), h = this.getTagSetting("type"), h === e ? c = f[b.type || g.type] : c = f[h], this.mergedOptions = d.extend({}, g, c, b)
                            },
                            getTagSetting: function(a) {
                                var b = this.tagOptionsPrefix,
                                d, f, g, h;
                                if (b === !1 || b === c) return e;
                                if (this.tagValCache.hasOwnProperty(a)) d = this.tagValCache.key;
                                else {
                                    d = this.tag.getAttribute(b + a);
                                    if (d === c || d === null) d = e;
                                    else if (d.substr(0, 1) === "[") {
                                        d = d.substr(1, d.length - 2).split(",");
                                        for (f = d.length; f--;) d[f] = k(d[f].replace(/(^\s*)|(\s*$)/g, ""))
                                    } else if (d.substr(0, 1) === "{") {
                                        g = d.substr(1, d.length - 2).split(","), d = {};
                                        for (f = g.length; f--;) h = g[f].split(":", 2), d[h[0].replace(/(^\s*)|(\s*$)/g, "")] = k(h[1].replace(/(^\s*)|(\s*$)/g, ""))
                                    } else d = k(d);
                                this.tagValCache.key = d
                            }
                            return d
                        },
                        get: function(a, b) {
                            var d = this.getTagSetting(a),
                            f;
                            return d !== e ? d : (f = this.mergedOptions[a]) === c ? b : f
                        }
                    }), d.fn.sparkline._base = g({
                        disabled: !1,
                        init: function(a, b, e, f, g) {
                            this.el = a, this.$el = d(a), this.values = b, this.options = e, this.width = f, this.height = g, this.currentRegion = c
                        },
                        initTarget: function() {
                            var a = !this.options.get("disableInteraction");
                            (this.target = this.$el.simpledraw(this.width, this.height, this.options.get("composite"), a)) ? (this.canvasWidth = this.target.pixelWidth, this.canvasHeight = this.target.pixelHeight) : this.disabled = !0
                        },
                        render: function() {
                            return this.disabled ? (this.el.innerHTML = "", !1) : !0
                        },
                        getRegion: function(a, b) {},
                        setRegionHighlight: function(a, b, d) {
                            var e = this.currentRegion,
                            f = !this.options.get("disableHighlight"),
                            g;
                            return b > this.canvasWidth || d > this.canvasHeight || b < 0 || d < 0 ? null : (g = this.getRegion(a, b, d), e !== g ? (e !== c && f && this.removeHighlight(), this.currentRegion = g, g !== c && f && this.renderHighlight(), !0) : !1)
                        },
                        clearRegionHighlight: function() {
                            return this.currentRegion !== c ? (this.removeHighlight(), this.currentRegion = c, !0) : !1
                        },
                        renderHighlight: function() {
                            this.changeHighlight(!0)
                        },
                        removeHighlight: function() {
                            this.changeHighlight(!1)
                        },
                        changeHighlight: function(a) {},
                        getCurrentRegionTooltip: function() {
                            var a = this.options,
                            b = "",
                            e = [],
                            f, g, i, j, k, l, m, n, o, p, q, r, s, t;
                            if (this.currentRegion === c) return "";
                            f = this.getCurrentRegionFields(), q = a.get("tooltipFormatter");
                            if (q) return q(this, a, f);
                            a.get("tooltipChartTitle") && (b += '<div class="jqs jqstitle">' + a.get("tooltipChartTitle") + "</div>\n"), g = this.options.get("tooltipFormat");
                            if (!g) return "";
                            d.isArray(g) || (g = [g]), d.isArray(f) || (f = [f]), m = this.options.get("tooltipFormatFieldlist"), n = this.options.get("tooltipFormatFieldlistKey");
                            if (m && n) {
                                o = [];
                                for (l = f.length; l--;) p = f[l][n], (t = d.inArray(p, m)) != -1 && (o[t] = f[l]);
                                    f = o
                            }
                            i = g.length, s = f.length;
                            for (l = 0; l < i; l++) {
                                r = g[l], typeof r == "string" && (r = new h(r)), j = r.fclass || "jqsfield";
                                for (t = 0; t < s; t++)
                                    if (!f[t].isNull || !a.get("tooltipSkipNull")) d.extend(f[t], {
                                        prefix: a.get("tooltipPrefix"),
                                        suffix: a.get("tooltipSuffix")
                                    }), k = r.render(f[t], a.get("tooltipValueLookups"), a), e.push('<div class="' + j + '">' + k + "</div>")
                                }
                                return e.length ? b + e.join("\n") : ""
                            },
                            getCurrentRegionFields: function() {},
                            calcHighlightColor: function(a, c) {
                                var d = c.get("highlightColor"),
                                e = c.get("highlightLighten"),
                                f, g, h, j;
                                if (d) return d;
                                if (e) {
                                    f = /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(a) || /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(a);
                                    if (f) {
                                        h = [], g = a.length === 4 ? 16 : 1;
                                        for (j = 0; j < 3; j++) h[j] = i(b.round(parseInt(f[j + 1], 16) * g * e), 0, 255);
                                            return "rgb(" + h.join(",") + ")"
                                    }
                                }
                                return a
                            }
                        }), w = {
    changeHighlight: function(a) {
        var b = this.currentRegion,
        c = this.target,
        e = this.regionShapes[b],
        f;
        e && (f = this.renderRegion(b, a), d.isArray(f) || d.isArray(e) ? (c.replaceWithShapes(e, f), this.regionShapes[b] = d.map(f, function(a) {
            return a.id
        })) : (c.replaceWithShape(e, f), this.regionShapes[b] = f.id))
    },
    render: function() {
        var a = this.values,
        b = this.target,
        c = this.regionShapes,
        e, f, g, h;
        if (!this.cls._super.render.call(this)) return;
        for (g = a.length; g--;) {
            e = this.renderRegion(g);
            if (e)
                if (d.isArray(e)) {
                    f = [];
                    for (h = e.length; h--;) e[h].append(), f.push(e[h].id);
                        c[g] = f
                } else e.append(), c[g] = e.id;
                else c[g] = null
            }
        b.render()
    }
}, d.fn.sparkline.line = x = g(d.fn.sparkline._base, {
    type: "line",
    init: function(a, b, c, d, e) {
        x._super.init.call(this, a, b, c, d, e), this.vertices = [], this.regionMap = [], this.xvalues = [], this.yvalues = [], this.yminmax = [], this.hightlightSpotId = null, this.lastShapeId = null, this.initTarget()
    },
    getRegion: function(a, b, d) {
        var e, f = this.regionMap;
        for (e = f.length; e--;)
            if (f[e] !== null && b >= f[e][0] && b <= f[e][1]) return f[e][2];
        return c
    },
    getCurrentRegionFields: function() {
        var a = this.currentRegion;
        return {
            isNull: this.yvalues[a] === null,
            x: this.xvalues[a],
            y: this.yvalues[a],
            color: this.options.get("lineColor"),
            fillColor: this.options.get("fillColor"),
            offset: a
        }
    },
    renderHighlight: function() {
        var a = this.currentRegion,
        b = this.target,
        d = this.vertices[a],
        e = this.options,
        f = e.get("spotRadius"),
        g = e.get("highlightSpotColor"),
        h = e.get("highlightLineColor"),
        i, j;
        if (!d) return;
        f && g && (i = b.drawCircle(d[0], d[1], f, c, g), this.highlightSpotId = i.id, b.insertAfterShape(this.lastShapeId, i)), h && (j = b.drawLine(d[0], this.canvasTop, d[0], this.canvasTop + this.canvasHeight, h), this.highlightLineId = j.id, b.insertAfterShape(this.lastShapeId, j))
    },
    removeHighlight: function() {
        var a = this.target;
        this.highlightSpotId && (a.removeShapeId(this.highlightSpotId), this.highlightSpotId = null), this.highlightLineId && (a.removeShapeId(this.highlightLineId), this.highlightLineId = null)
    },
    scanValues: function() {
        var a = this.values,
        c = a.length,
        d = this.xvalues,
        e = this.yvalues,
        f = this.yminmax,
        g, h, i, j, k;
        for (g = 0; g < c; g++) h = a[g], i = typeof a[g] == "string", j = typeof a[g] == "object" && a[g] instanceof Array, k = i && a[g].split(":"), i && k.length === 2 ? (d.push(Number(k[0])), e.push(Number(k[1])), f.push(Number(k[1]))) : j ? (d.push(h[0]), e.push(h[1]), f.push(h[1])) : (d.push(g), a[g] === null || a[g] === "null" ? e.push(null) : (e.push(Number(h)), f.push(Number(h))));
            this.options.get("xvalues") && (d = this.options.get("xvalues")), this.maxy = this.maxyorg = b.max.apply(b, f), this.miny = this.minyorg = b.min.apply(b, f), this.maxx = b.max.apply(b, d), this.minx = b.min.apply(b, d), this.xvalues = d, this.yvalues = e, this.yminmax = f
    },
    processRangeOptions: function() {
        var a = this.options,
        b = a.get("normalRangeMin"),
        d = a.get("normalRangeMax");
        b !== c && (b < this.miny && (this.miny = b), d > this.maxy && (this.maxy = d)), a.get("chartRangeMin") !== c && (a.get("chartRangeClip") || a.get("chartRangeMin") < this.miny) && (this.miny = a.get("chartRangeMin")), a.get("chartRangeMax") !== c && (a.get("chartRangeClip") || a.get("chartRangeMax") > this.maxy) && (this.maxy = a.get("chartRangeMax")), a.get("chartRangeMinX") !== c && (a.get("chartRangeClipX") || a.get("chartRangeMinX") < this.minx) && (this.minx = a.get("chartRangeMinX")), a.get("chartRangeMaxX") !== c && (a.get("chartRangeClipX") || a.get("chartRangeMaxX") > this.maxx) && (this.maxx = a.get("chartRangeMaxX"))
    },
    drawNormalRange: function(a, d, e, f, g) {
        var h = this.options.get("normalRangeMin"),
        i = this.options.get("normalRangeMax"),
        j = d + b.round(e - e * ((i - this.miny) / g)),
        k = b.round(e * (i - h) / g);
        this.target.drawRect(a, j, f, k, c, this.options.get("normalRangeColor")).append()
    },
    render: function() {
        var a = this.options,
        e = this.target,
        f = this.canvasWidth,
        g = this.canvasHeight,
        h = this.vertices,
        i = a.get("spotRadius"),
        j = this.regionMap,
        k, l, m, n, o, p, q, r, s, u, v, w, y, z, A, B, C, D, E, F, G, H, I, J, K;
        if (!x._super.render.call(this)) return;
        this.scanValues(), this.processRangeOptions(), I = this.xvalues, J = this.yvalues;
        if (!this.yminmax.length || this.yvalues.length < 2) return;
        n = o = 0, k = this.maxx - this.minx === 0 ? 1 : this.maxx - this.minx, l = this.maxy - this.miny === 0 ? 1 : this.maxy - this.miny, m = this.yvalues.length - 1, i && (f < i * 4 || g < i * 4) && (i = 0);
        if (i) {
            G = a.get("highlightSpotColor") && !a.get("disableInteraction");
            if (G || a.get("minSpotColor") || a.get("spotColor") && J[m] === this.miny) g -= b.ceil(i);
            if (G || a.get("maxSpotColor") || a.get("spotColor") && J[m] === this.maxy) g -= b.ceil(i), n += b.ceil(i);
            if (G || (a.get("minSpotColor") || a.get("maxSpotColor")) && (J[0] === this.miny || J[0] === this.maxy)) o += b.ceil(i), f -= b.ceil(i);
            if (G || a.get("spotColor") || a.get("minSpotColor") || a.get("maxSpotColor") && (J[m] === this.miny || J[m] === this.maxy)) f -= b.ceil(i)
        }
    g--, a.get("normalRangeMin") !== c && !a.get("drawNormalOnTop") && this.drawNormalRange(o, n, g, f, l), q = [], r = [q], z = A = null, B = J.length;
    for (K = 0; K < B; K++) s = I[K], v = I[K + 1], u = J[K], w = o + b.round((s - this.minx) * (f / k)), y = K < B - 1 ? o + b.round((v - this.minx) * (f / k)) : f, A = w + (y - w) / 2, j[K] = [z || 0, A, K], z = A, u === null ? K && (J[K - 1] !== null && (q = [], r.push(q)), h.push(null)) : (u < this.miny && (u = this.miny), u > this.maxy && (u = this.maxy), q.length || q.push([w, n + g]), p = [w, n + b.round(g - g * ((u - this.miny) / l))], q.push(p), h.push(p));
        C = [], D = [], E = r.length;
    for (K = 0; K < E; K++) q = r[K], q.length && (a.get("fillColor") && (q.push([q[q.length - 1][0], n + g]), D.push(q.slice(0)), q.pop()), q.length > 2 && (q[0] = [q[0][0], q[1][1]]), C.push(q));
        E = D.length;
    for (K = 0; K < E; K++) e.drawShape(D[K], a.get("fillColor"), a.get("fillColor")).append();
        a.get("normalRangeMin") !== c && a.get("drawNormalOnTop") && this.drawNormalRange(o, n, g, f, l), E = C.length;
    for (K = 0; K < E; K++) e.drawShape(C[K], a.get("lineColor"), c, a.get("lineWidth")).append();
        if (i && a.get("valueSpots")) {
            F = a.get("valueSpots"), F.get === c && (F = new t(F));
            for (K = 0; K < B; K++) H = F.get(J[K]), H && e.drawCircle(o + b.round((I[K] - this.minx) * (f / k)), n + b.round(g - g * ((J[K] - this.miny) / l)), i, c, H).append()
        }
    i && a.get("spotColor") && J[m] !== null && e.drawCircle(o + b.round((I[I.length - 1] - this.minx) * (f / k)), n + b.round(g - g * ((J[m] - this.miny) / l)), i, c, a.get("spotColor")).append(), this.maxy !== this.minyorg && (i && a.get("minSpotColor") && (s = I[d.inArray(this.minyorg, J)], e.drawCircle(o + b.round((s - this.minx) * (f / k)), n + b.round(g - g * ((this.minyorg - this.miny) / l)), i, c, a.get("minSpotColor")).append()), i && a.get("maxSpotColor") && (s = I[d.inArray(this.maxyorg, J)], e.drawCircle(o + b.round((s - this.minx) * (f / k)), n + b.round(g - g * ((this.maxyorg - this.miny) / l)), i, c, a.get("maxSpotColor")).append())), this.lastShapeId = e.getLastShapeId(), this.canvasTop = n, e.render()
}
}), d.fn.sparkline.bar = y = g(d.fn.sparkline._base, w, {
    type: "bar",
    init: function(a, e, f, g, h) {
        var j = parseInt(f.get("barWidth"), 10),
        n = parseInt(f.get("barSpacing"), 10),
        o = f.get("chartRangeMin"),
        p = f.get("chartRangeMax"),
        q = f.get("chartRangeClip"),
        r = Infinity,
        s = -Infinity,
        u, v, w, x, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R;
        y._super.init.call(this, a, e, f, g, h);
        for (A = 0, B = e.length; A < B; A++) {
            O = e[A], u = typeof O == "string" && O.indexOf(":") > -1;
            if (u || d.isArray(O)) J = !0, u && (O = e[A] = l(O.split(":"))), O = m(O, null), v = b.min.apply(b, O), w = b.max.apply(b, O), v < r && (r = v), w > s && (s = w)
        }
    this.stacked = J, this.regionShapes = {}, this.barWidth = j, this.barSpacing = n, this.totalBarWidth = j + n, this.width = g = e.length * j + (e.length - 1) * n, this.initTarget(), q && (H = o === c ? -Infinity : o, I = p === c ? Infinity : p), z = [], x = J ? [] : z;
    var S = [],
    T = [];
    for (A = 0, B = e.length; A < B; A++)
        if (J) {
            K = e[A], e[A] = N = [], S[A] = 0, x[A] = T[A] = 0;
            for (L = 0, M = K.length; L < M; L++) O = N[L] = q ? i(K[L], H, I) : K[L], O !== null && (O > 0 && (S[A] += O), r < 0 && s > 0 ? O < 0 ? T[A] += b.abs(O) : x[A] += O : x[A] += b.abs(O - (O < 0 ? s : r)), z.push(O))
        } else O = q ? i(e[A], H, I) : e[A], O = e[A] = k(O), O !== null && z.push(O);
    this.max = G = b.max.apply(b, z), this.min = F = b.min.apply(b, z), this.stackMax = s = J ? b.max.apply(b, S) : G, this.stackMin = r = J ? b.min.apply(b, z) : F, f.get("chartRangeMin") !== c && (f.get("chartRangeClip") || f.get("chartRangeMin") < F) && (F = f.get("chartRangeMin")), f.get("chartRangeMax") !== c && (f.get("chartRangeClip") || f.get("chartRangeMax") > G) && (G = f.get("chartRangeMax")), this.zeroAxis = D = f.get("zeroAxis", !0), F <= 0 && G >= 0 && D ? E = 0 : D == 0 ? E = F : F > 0 ? E = F : E = G, this.xaxisOffset = E, C = J ? b.max.apply(b, x) + b.max.apply(b, T) : G - F, this.canvasHeightEf = D && F < 0 ? this.canvasHeight - 2 : this.canvasHeight - 1, F < E ? (Q = J && G >= 0 ? s : G, P = (Q - E) / C * this.canvasHeight, P !== b.ceil(P) && (this.canvasHeightEf -= 2, P = b.ceil(P))) : P = this.canvasHeight, this.yoffset = P, d.isArray(f.get("colorMap")) ? (this.colorMapByIndex = f.get("colorMap"), this.colorMapByValue = null) : (this.colorMapByIndex = null, this.colorMapByValue = f.get("colorMap"), this.colorMapByValue && this.colorMapByValue.get === c && (this.colorMapByValue = new t(this.colorMapByValue))), this.range = C
},
getRegion: function(a, d, e) {
    var f = b.floor(d / this.totalBarWidth);
    return f < 0 || f >= this.values.length ? c : f
},
getCurrentRegionFields: function() {
    var a = this.currentRegion,
    b = r(this.values[a]),
    c = [],
    d, e;
    for (e = b.length; e--;) d = b[e], c.push({
        isNull: d === null,
        value: d,
        color: this.calcColor(e, d, a),
        offset: a
    });
        return c
    },
    calcColor: function(a, b, e) {
        var f = this.colorMapByIndex,
        g = this.colorMapByValue,
        h = this.options,
        i, j;
        return this.stacked ? i = h.get("stackedBarColor") : i = b < 0 ? h.get("negBarColor") : h.get("barColor"), b === 0 && h.get("zeroColor") !== c && (i = h.get("zeroColor")), g && (j = g.get(b)) ? i = j : f && f.length > e && (i = f[e]), d.isArray(i) ? i[a % i.length] : i
    },
    renderRegion: function(a, e) {
        var f = this.values[a],
        g = this.options,
        h = this.xaxisOffset,
        i = [],
        j = this.range,
        k = this.stacked,
        l = this.target,
        m = a * this.totalBarWidth,
        n = this.canvasHeightEf,
        p = this.yoffset,
        q, r, s, t, u, v, w, x, y, z;
        f = d.isArray(f) ? f : [f], w = f.length, x = f[0], t = o(null, f), z = o(h, f, !0);
        if (t) return g.get("nullColor") ? (s = e ? g.get("nullColor") : this.calcHighlightColor(g.get("nullColor"), g), q = p > 0 ? p - 1 : p, l.drawRect(m, q, this.barWidth - 1, 0, s, s)) : c;
        u = p;
        for (v = 0; v < w; v++) {
            x = f[v];
            if (k && x === h) {
                if (!z || y) continue;
                y = !0
            }
            j > 0 ? r = b.floor(n * (b.abs(x - h) / j)) + 1 : r = 1, x < h || x === h && p === 0 ? (q = u, u += r) : (q = p - r, p -= r), s = this.calcColor(v, x, a), e && (s = this.calcHighlightColor(s, g)), i.push(l.drawRect(m, q, this.barWidth - 1, r - 1, s, s))
        }
        return i.length === 1 ? i[0] : i
    }
}), d.fn.sparkline.tristate = z = g(d.fn.sparkline._base, w, {
    type: "tristate",
    init: function(a, b, e, f, g) {
        var h = parseInt(e.get("barWidth"), 10),
        i = parseInt(e.get("barSpacing"), 10);
        z._super.init.call(this, a, b, e, f, g), this.regionShapes = {}, this.barWidth = h, this.barSpacing = i, this.totalBarWidth = h + i, this.values = d.map(b, Number), this.width = f = b.length * h + (b.length - 1) * i, d.isArray(e.get("colorMap")) ? (this.colorMapByIndex = e.get("colorMap"), this.colorMapByValue = null) : (this.colorMapByIndex = null, this.colorMapByValue = e.get("colorMap"), this.colorMapByValue && this.colorMapByValue.get === c && (this.colorMapByValue = new t(this.colorMapByValue))), this.initTarget()
    },
    getRegion: function(a, c, d) {
        return b.floor(c / this.totalBarWidth)
    },
    getCurrentRegionFields: function() {
        var a = this.currentRegion;
        return {
            isNull: this.values[a] === c,
            value: this.values[a],
            color: this.calcColor(this.values[a], a),
            offset: a
        }
    },
    calcColor: function(a, b) {
        var c = this.values,
        d = this.options,
        e = this.colorMapByIndex,
        f = this.colorMapByValue,
        g, h;
        return f && (h = f.get(a)) ? g = h : e && e.length > b ? g = e[b] : c[b] < 0 ? g = d.get("negBarColor") : c[b] > 0 ? g = d.get("posBarColor") : g = d.get("zeroBarColor"), g
    },
    renderRegion: function(a, c) {
        var d = this.values,
        e = this.options,
        f = this.target,
        g, h, i, j, k, l;
        g = f.pixelHeight, i = b.round(g / 2), j = a * this.totalBarWidth, d[a] < 0 ? (k = i, h = i - 1) : d[a] > 0 ? (k = 0, h = i - 1) : (k = i - 1, h = 2), l = this.calcColor(d[a], a);
        if (l === null) return;
        return c && (l = this.calcHighlightColor(l, e)), f.drawRect(j, k, this.barWidth - 1, h - 1, l, l)
    }
}), d.fn.sparkline.discrete = A = g(d.fn.sparkline._base, w, {
    type: "discrete",
    init: function(a, e, f, g, h) {
        A._super.init.call(this, a, e, f, g, h), this.regionShapes = {}, this.values = e = d.map(e, Number), this.min = b.min.apply(b, e), this.max = b.max.apply(b, e), this.range = this.max - this.min, this.width = g = f.get("width") === "auto" ? e.length * 2 : this.width, this.interval = b.floor(g / e.length), this.itemWidth = g / e.length, f.get("chartRangeMin") !== c && (f.get("chartRangeClip") || f.get("chartRangeMin") < this.min) && (this.min = f.get("chartRangeMin")), f.get("chartRangeMax") !== c && (f.get("chartRangeClip") || f.get("chartRangeMax") > this.max) && (this.max = f.get("chartRangeMax")), this.initTarget(), this.target && (this.lineHeight = f.get("lineHeight") === "auto" ? b.round(this.canvasHeight * .3) : f.get("lineHeight"))
    },
    getRegion: function(a, c, d) {
        return b.floor(c / this.itemWidth)
    },
    getCurrentRegionFields: function() {
        var a = this.currentRegion;
        return {
            isNull: this.values[a] === c,
            value: this.values[a],
            offset: a
        }
    },
    renderRegion: function(a, c) {
        var d = this.values,
        e = this.options,
        f = this.min,
        g = this.max,
        h = this.range,
        j = this.interval,
        k = this.target,
        l = this.canvasHeight,
        m = this.lineHeight,
        n = l - m,
        o, p, q, r;
        return p = i(d[a], f, g), r = a * j, o = b.round(n - n * ((p - f) / h)), q = e.get("thresholdColor") && p < e.get("thresholdValue") ? e.get("thresholdColor") : e.get("lineColor"), c && (q = this.calcHighlightColor(q, e)), k.drawLine(r, o, r, o + m, q)
    }
}), d.fn.sparkline.bullet = B = g(d.fn.sparkline._base, {
    type: "bullet",
    init: function(a, d, e, f, g) {
        var h, i, j;
        B._super.init.call(this, a, d, e, f, g), this.values = d = l(d), j = d.slice(), j[0] = j[0] === null ? j[2] : j[0], j[1] = d[1] === null ? j[2] : j[1], h = b.min.apply(b, d), i = b.max.apply(b, d), e.get("base") === c ? h = h < 0 ? h : 0 : h = e.get("base"), this.min = h, this.max = i, this.range = i - h, this.shapes = {}, this.valueShapes = {}, this.regiondata = {}, this.width = f = e.get("width") === "auto" ? "4.0em" : f, this.target = this.$el.simpledraw(f, g, e.get("composite")), d.length || (this.disabled = !0), this.initTarget()
    },
    getRegion: function(a, b, d) {
        var e = this.target.getShapeAt(a, b, d);
        return e !== c && this.shapes[e] !== c ? this.shapes[e] : c
    },
    getCurrentRegionFields: function() {
        var a = this.currentRegion;
        return {
            fieldkey: a.substr(0, 1),
            value: this.values[a.substr(1)],
            region: a
        }
    },
    changeHighlight: function(a) {
        var b = this.currentRegion,
        c = this.valueShapes[b],
        d;
        delete this.shapes[c];
        switch (b.substr(0, 1)) {
            case "r":
            d = this.renderRange(b.substr(1), a);
            break;
            case "p":
            d = this.renderPerformance(a);
            break;
            case "t":
            d = this.renderTarget(a)
        }
        this.valueShapes[b] = d.id, this.shapes[d.id] = b, this.target.replaceWithShape(c, d)
    },
    renderRange: function(a, c) {
        var d = this.values[a],
        e = b.round(this.canvasWidth * ((d - this.min) / this.range)),
        f = this.options.get("rangeColors")[a - 2];
        return c && (f = this.calcHighlightColor(f, this.options)), this.target.drawRect(0, 0, e - 1, this.canvasHeight - 1, f, f)
    },
    renderPerformance: function(a) {
        var c = this.values[1],
        d = b.round(this.canvasWidth * ((c - this.min) / this.range)),
        e = this.options.get("performanceColor");
        return a && (e = this.calcHighlightColor(e, this.options)), this.target.drawRect(0, b.round(this.canvasHeight * .3), d - 1, b.round(this.canvasHeight * .4) - 1, e, e)
    },
    renderTarget: function(a) {
        var c = this.values[0],
        d = b.round(this.canvasWidth * ((c - this.min) / this.range) - this.options.get("targetWidth") / 2),
        e = b.round(this.canvasHeight * .1),
        f = this.canvasHeight - e * 2,
        g = this.options.get("targetColor");
        return a && (g = this.calcHighlightColor(g, this.options)), this.target.drawRect(d, e, this.options.get("targetWidth") - 1, f - 1, g, g)
    },
    render: function() {
        var a = this.values.length,
        b = this.target,
        c, d;
        if (!B._super.render.call(this)) return;
        for (c = 2; c < a; c++) d = this.renderRange(c).append(), this.shapes[d.id] = "r" + c, this.valueShapes["r" + c] = d.id;
            this.values[1] !== null && (d = this.renderPerformance().append(), this.shapes[d.id] = "p1", this.valueShapes.p1 = d.id), this.values[0] !== null && (d = this.renderTarget().append(), this.shapes[d.id] = "t0", this.valueShapes.t0 = d.id), b.render()
    }
}), d.fn.sparkline.pie = C = g(d.fn.sparkline._base, {
    type: "pie",
    init: function(a, c, e, f, g) {
        var h = 0,
        i;
        C._super.init.call(this, a, c, e, f, g), this.shapes = {}, this.valueShapes = {}, this.values = c = d.map(c, Number), e.get("width") === "auto" && (this.width = this.height);
        if (c.length > 0)
            for (i = c.length; i--;) h += c[i];
                this.total = h, this.initTarget(), this.radius = b.floor(b.min(this.canvasWidth, this.canvasHeight) / 2)
        },
        getRegion: function(a, b, d) {
            var e = this.target.getShapeAt(a, b, d);
            return e !== c && this.shapes[e] !== c ? this.shapes[e] : c
        },
        getCurrentRegionFields: function() {
            var a = this.currentRegion;
            return {
                isNull: this.values[a] === c,
                value: this.values[a],
                percent: this.values[a] / this.total * 100,
                color: this.options.get("sliceColors")[a % this.options.get("sliceColors").length],
                offset: a
            }
        },
        changeHighlight: function(a) {
            var b = this.currentRegion,
            c = this.renderSlice(b, a),
            d = this.valueShapes[b];
            delete this.shapes[d], this.target.replaceWithShape(d, c), this.valueShapes[b] = c.id, this.shapes[c.id] = b
        },
        renderSlice: function(a, d) {
            var e = this.target,
            f = this.options,
            g = this.radius,
            h = f.get("borderWidth"),
            i = f.get("offset"),
            j = 2 * b.PI,
            k = this.values,
            l = this.total,
            m = i ? 2 * b.PI * (i / 360) : 0,
            n, o, p, q, r;
            q = k.length;
            for (p = 0; p < q; p++) {
                n = m, o = m, l > 0 && (o = m + j * (k[p] / l));
                if (a === p) return r = f.get("sliceColors")[p % f.get("sliceColors").length], d && (r = this.calcHighlightColor(r, f)), e.drawPieSlice(g, g, g - h, n, o, c, r);
                m = o
            }
        },
        render: function() {
            var a = this.target,
            d = this.values,
            e = this.options,
            f = this.radius,
            g = e.get("borderWidth"),
            h, i;
            if (!C._super.render.call(this)) return;
            g && a.drawCircle(f, f, b.floor(f - g / 2), e.get("borderColor"), c, g).append();
            for (i = d.length; i--;) d[i] && (h = this.renderSlice(i).append(), this.valueShapes[i] = h.id, this.shapes[h.id] = i);
                a.render()
        }
    }), d.fn.sparkline.box = D = g(d.fn.sparkline._base, {
        type: "box",
        init: function(a, b, c, e, f) {
            D._super.init.call(this, a, b, c, e, f), this.values = d.map(b, Number), this.width = c.get("width") === "auto" ? "4.0em" : e, this.initTarget(), this.values.length || (this.disabled = 1)
        },
        getRegion: function() {
            return 1
        },
        getCurrentRegionFields: function() {
            var a = [{
                field: "lq",
                value: this.quartiles[0]
            }, {
                field: "med",
                value: this.quartiles[1]
            }, {
                field: "uq",
                value: this.quartiles[2]
            }];
            return this.loutlier !== c && a.push({
                field: "lo",
                value: this.loutlier
            }), this.routlier !== c && a.push({
                field: "ro",
                value: this.routlier
            }), this.lwhisker !== c && a.push({
                field: "lw",
                value: this.lwhisker
            }), this.rwhisker !== c && a.push({
                field: "rw",
                value: this.rwhisker
            }), a
        },
        render: function() {
            var a = this.target,
            d = this.values,
            e = d.length,
            f = this.options,
            g = this.canvasWidth,
            h = this.canvasHeight,
            i = f.get("chartRangeMin") === c ? b.min.apply(b, d) : f.get("chartRangeMin"),
            k = f.get("chartRangeMax") === c ? b.max.apply(b, d) : f.get("chartRangeMax"),
            l = 0,
            m, n, o, p, q, r, s, t, u, v, w;
            if (!D._super.render.call(this)) return;
            if (f.get("raw")) f.get("showOutliers") && d.length > 5 ? (n = d[0], m = d[1], p = d[2], q = d[3], r = d[4], s = d[5], t = d[6]) : (m = d[0], p = d[1], q = d[2], r = d[3], s = d[4]);
            else {
                d.sort(function(a, b) {
                    return a - b
                }), p = j(d, 1), q = j(d, 2), r = j(d, 3), o = r - p;
                if (f.get("showOutliers")) {
                    m = s = c;
                    for (u = 0; u < e; u++) m === c && d[u] > p - o * f.get("outlierIQR") && (m = d[u]), d[u] < r + o * f.get("outlierIQR") && (s = d[u]);
                        n = d[0], t = d[e - 1]
                } else m = d[0], s = d[e - 1]
            }
            this.quartiles = [p, q, r], this.lwhisker = m, this.rwhisker = s, this.loutlier = n, this.routlier = t, w = g / (k - i + 1), f.get("showOutliers") && (l = b.ceil(f.get("spotRadius")), g -= 2 * b.ceil(f.get("spotRadius")), w = g / (k - i + 1), n < m && a.drawCircle((n - i) * w + l, h / 2, f.get("spotRadius"), f.get("outlierLineColor"), f.get("outlierFillColor")).append(), t > s && a.drawCircle((t - i) * w + l, h / 2, f.get("spotRadius"), f.get("outlierLineColor"), f.get("outlierFillColor")).append()), a.drawRect(b.round((p - i) * w + l), b.round(h * .1), b.round((r - p) * w), b.round(h * .8), f.get("boxLineColor"), f.get("boxFillColor")).append(), a.drawLine(b.round((m - i) * w + l), b.round(h / 2), b.round((p - i) * w + l), b.round(h / 2), f.get("lineColor")).append(), a.drawLine(b.round((m - i) * w + l), b.round(h / 4), b.round((m - i) * w + l), b.round(h - h / 4), f.get("whiskerColor")).append(), a.drawLine(b.round((s - i) * w + l), b.round(h / 2), b.round((r - i) * w + l), b.round(h / 2), f.get("lineColor")).append(), a.drawLine(b.round((s - i) * w + l), b.round(h / 4), b.round((s - i) * w + l), b.round(h - h / 4), f.get("whiskerColor")).append(), a.drawLine(b.round((q - i) * w + l), b.round(h * .1), b.round((q - i) * w + l), b.round(h * .9), f.get("medianColor")).append(), f.get("target") && (v = b.ceil(f.get("spotRadius")), a.drawLine(b.round((f.get("target") - i) * w + l), b.round(h / 2 - v), b.round((f.get("target") - i) * w + l), b.round(h / 2 + v), f.get("targetColor")).append(), a.drawLine(b.round((f.get("target") - i) * w + l - v), b.round(h / 2), b.round((f.get("target") - i) * w + l + v), b.round(h / 2), f.get("targetColor")).append()), a.render()
        }
    }), G = g({
        init: function(a, b, c, d) {
            this.target = a, this.id = b, this.type = c, this.args = d
        },
        append: function() {
            return this.target.appendShape(this), this
        }
    }), H = g({
        _pxregex: /(\d+)(px)?\s*$/i,
        init: function(a, b, c) {
            if (!a) return;
            this.width = a, this.height = b, this.target = c, this.lastShapeId = null, c[0] && (c = c[0]), d.data(c, "_jqs_vcanvas", this)
        },
        drawLine: function(a, b, c, d, e, f) {
            return this.drawShape([
                [a, b],
                [c, d]
                ], e, f)
        },
        drawShape: function(a, b, c, d) {
            return this._genShape("Shape", [a, b, c, d])
        },
        drawCircle: function(a, b, c, d, e, f) {
            return this._genShape("Circle", [a, b, c, d, e, f])
        },
        drawPieSlice: function(a, b, c, d, e, f, g) {
            return this._genShape("PieSlice", [a, b, c, d, e, f, g])
        },
        drawRect: function(a, b, c, d, e, f) {
            return this._genShape("Rect", [a, b, c, d, e, f])
        },
        getElement: function() {
            return this.canvas
        },
        getLastShapeId: function() {
            return this.lastShapeId
        },
        reset: function() {
            alert("reset not implemented")
        },
        _insert: function(a, b) {
            d(b).html(a)
        },
        _calculatePixelDims: function(a, b, c) {
            var e;
            e = this._pxregex.exec(b), e ? this.pixelHeight = e[1] : this.pixelHeight = d(c).height(), e = this._pxregex.exec(a), e ? this.pixelWidth = e[1] : this.pixelWidth = d(c).width()
        },
        _genShape: function(a, b) {
            var c = L++;
            return b.unshift(c), new G(this, c, a, b)
        },
        appendShape: function(a) {
            alert("appendShape not implemented")
        },
        replaceWithShape: function(a, b) {
            alert("replaceWithShape not implemented")
        },
        insertAfterShape: function(a, b) {
            alert("insertAfterShape not implemented")
        },
        removeShapeId: function(a) {
            alert("removeShapeId not implemented")
        },
        getShapeAt: function(a, b, c) {
            alert("getShapeAt not implemented")
        },
        render: function() {
            alert("render not implemented")
        }
    }), I = g(H, {
        init: function(b, e, f, g) {
            I._super.init.call(this, b, e, f), this.canvas = a.createElement("canvas"), f[0] && (f = f[0]), d.data(f, "_jqs_vcanvas", this), d(this.canvas).css({
                display: "inline-block",
                width: b,
                height: e,
                verticalAlign: "top"
            }), this._insert(this.canvas, f), this._calculatePixelDims(b, e, this.canvas), this.canvas.width = this.pixelWidth, this.canvas.height = this.pixelHeight, this.interact = g, this.shapes = {}, this.shapeseq = [], this.currentTargetShapeId = c, d(this.canvas).css({
                width: this.pixelWidth,
                height: this.pixelHeight
            })
        },
        _getContext: function(a, b, d) {
            var e = this.canvas.getContext("2d");
            return a !== c && (e.strokeStyle = a), e.lineWidth = d === c ? 1 : d, b !== c && (e.fillStyle = b), e
        },
        reset: function() {
            var a = this._getContext();
            a.clearRect(0, 0, this.pixelWidth, this.pixelHeight), this.shapes = {}, this.shapeseq = [], this.currentTargetShapeId = c
        },
        _drawShape: function(a, b, d, e, f) {
            var g = this._getContext(d, e, f),
            h, i;
            g.beginPath(), g.moveTo(b[0][0] + .5, b[0][1] + .5);
            for (h = 1, i = b.length; h < i; h++) g.lineTo(b[h][0] + .5, b[h][1] + .5);
                d !== c && g.stroke(), e !== c && g.fill(), this.targetX !== c && this.targetY !== c && g.isPointInPath(this.targetX, this.targetY) && (this.currentTargetShapeId = a)
        },
        _drawCircle: function(a, d, e, f, g, h, i) {
            var j = this._getContext(g, h, i);
            j.beginPath(), j.arc(d, e, f, 0, 2 * b.PI, !1), this.targetX !== c && this.targetY !== c && j.isPointInPath(this.targetX, this.targetY) && (this.currentTargetShapeId = a), g !== c && j.stroke(), h !== c && j.fill()
        },
        _drawPieSlice: function(a, b, d, e, f, g, h, i) {
            var j = this._getContext(h, i);
            j.beginPath(), j.moveTo(b, d), j.arc(b, d, e, f, g, !1), j.lineTo(b, d), j.closePath(), h !== c && j.stroke(), i && j.fill(), this.targetX !== c && this.targetY !== c && j.isPointInPath(this.targetX, this.targetY) && (this.currentTargetShapeId = a)
        },
        _drawRect: function(a, b, c, d, e, f, g) {
            return this._drawShape(a, [
                [b, c],
                [b + d, c],
                [b + d, c + e],
                [b, c + e],
                [b, c]
                ], f, g)
        },
        appendShape: function(a) {
            return this.shapes[a.id] = a, this.shapeseq.push(a.id), this.lastShapeId = a.id, a.id
        },
        replaceWithShape: function(a, b) {
            var c = this.shapeseq,
            d;
            this.shapes[b.id] = b;
            for (d = c.length; d--;) c[d] == a && (c[d] = b.id);
                delete this.shapes[a]
        },
        replaceWithShapes: function(a, b) {
            var c = this.shapeseq,
            d = {},
            e, f, g;
            for (f = a.length; f--;) d[a[f]] = !0;
                for (f = c.length; f--;) e = c[f], d[e] && (c.splice(f, 1), delete this.shapes[e], g = f);
                    for (f = b.length; f--;) c.splice(g, 0, b[f].id), this.shapes[b[f].id] = b[f]
                },
            insertAfterShape: function(a, b) {
                var c = this.shapeseq,
                d;
                for (d = c.length; d--;)
                    if (c[d] === a) {
                        c.splice(d + 1, 0, b.id), this.shapes[b.id] = b;
                        return
                    }
                },
                removeShapeId: function(a) {
                    var b = this.shapeseq,
                    c;
                    for (c = b.length; c--;)
                        if (b[c] === a) {
                            b.splice(c, 1);
                            break
                        } delete this.shapes[a]
                    },
                    getShapeAt: function(a, b, c) {
                        return this.targetX = b, this.targetY = c, this.render(), this.currentTargetShapeId
                    },
                    render: function() {
                        var a = this.shapeseq,
                        b = this.shapes,
                        c = a.length,
                        d = this._getContext(),
                        e, f, g;
                        d.clearRect(0, 0, this.pixelWidth, this.pixelHeight);
                        for (g = 0; g < c; g++) e = a[g], f = b[e], this["_draw" + f.type].apply(this, f.args);
                            this.interact || (this.shapes = {}, this.shapeseq = [])
                    }
                }), J = g(H, {
                    init: function(b, c, e) {
                        var f;
                        J._super.init.call(this, b, c, e), e[0] && (e = e[0]), d.data(e, "_jqs_vcanvas", this), this.canvas = a.createElement("span"), d(this.canvas).css({
                            display: "inline-block",
                            position: "relative",
                            overflow: "hidden",
                            width: b,
                            height: c,
                            margin: "0px",
                            padding: "0px",
                            verticalAlign: "top"
                        }), this._insert(this.canvas, e), this._calculatePixelDims(b, c, this.canvas), this.canvas.width = this.pixelWidth, this.canvas.height = this.pixelHeight, f = '<v:group coordorigin="0 0" coordsize="' + this.pixelWidth + " " + this.pixelHeight + '"' + ' style="position:absolute;top:0;left:0;width:' + this.pixelWidth + "px;height=" + this.pixelHeight + 'px;"></v:group>', this.canvas.insertAdjacentHTML("beforeEnd", f), this.group = d(this.canvas).children()[0], this.rendered = !1, this.prerender = ""
                    },
                    _drawShape: function(a, b, d, e, f) {
                        var g = [],
                        h, i, j, k, l, m, n;
                        for (n = 0, m = b.length; n < m; n++) g[n] = "" + b[n][0] + "," + b[n][1];
                            return h = g.splice(0, 1), f = f === c ? 1 : f, i = d === c ? ' stroked="false" ' : ' strokeWeight="' + f + 'px" strokeColor="' + d + '" ', j = e === c ? ' filled="false"' : ' fillColor="' + e + '" filled="true" ', k = g[0] === g[g.length - 1] ? "x " : "", l = '<v:shape coordorigin="0 0" coordsize="' + this.pixelWidth + " " + this.pixelHeight + '" ' + ' id="jqsshape' + a + '" ' + i + j + ' style="position:absolute;left:0px;top:0px;height:' + this.pixelHeight + "px;width:" + this.pixelWidth + 'px;padding:0px;margin:0px;" ' + ' path="m ' + h + " l " + g.join(", ") + " " + k + 'e">' + " </v:shape>", l
                    },
                    _drawCircle: function(a, b, d, e, f, g, h) {
                        var i, j, k;
                        return b -= e, d -= e, i = f === c ? ' stroked="false" ' : ' strokeWeight="' + h + 'px" strokeColor="' + f + '" ', j = g === c ? ' filled="false"' : ' fillColor="' + g + '" filled="true" ', k = '<v:oval  id="jqsshape' + a + '" ' + i + j + ' style="position:absolute;top:' + d + "px; left:" + b + "px; width:" + e * 2 + "px; height:" + e * 2 + 'px"></v:oval>', k
                    },
                    _drawPieSlice: function(a, d, e, f, g, h, i, j) {
                        var k, l, m, n, o, p, q, r;
                        if (g === h) return "";
                        h - g === 2 * b.PI && (g = 0, h = 2 * b.PI), l = d + b.round(b.cos(g) * f), m = e + b.round(b.sin(g) * f), n = d + b.round(b.cos(h) * f), o = e + b.round(b.sin(h) * f);
                        if (l === n && m === o) {
                            if (h - g < b.PI) return "";
                            l = n = d + f, m = o = e
                        }
                        return l === n && m === o && h - g < b.PI ? "" : (k = [d - f, e - f, d + f, e + f, l, m, n, o], p = i === c ? ' stroked="false" ' : ' strokeWeight="1px" strokeColor="' + i + '" ', q = j === c ? ' filled="false"' : ' fillColor="' + j + '" filled="true" ', r = '<v:shape coordorigin="0 0" coordsize="' + this.pixelWidth + " " + this.pixelHeight + '" ' + ' id="jqsshape' + a + '" ' + p + q + ' style="position:absolute;left:0px;top:0px;height:' + this.pixelHeight + "px;width:" + this.pixelWidth + 'px;padding:0px;margin:0px;" ' + ' path="m ' + d + "," + e + " wa " + k.join(", ") + ' x e">' + " </v:shape>", r)
                    },
                    _drawRect: function(a, b, c, d, e, f, g) {
                        return this._drawShape(a, [
                            [b, c],
                            [b, c + e],
                            [b + d, c + e],
                            [b + d, c],
                            [b, c]
                            ], f, g)
                    },
                    reset: function() {
                        this.group.innerHTML = ""
                    },
                    appendShape: function(a) {
                        var b = this["_draw" + a.type].apply(this, a.args);
                        return this.rendered ? this.group.insertAdjacentHTML("beforeEnd", b) : this.prerender += b, this.lastShapeId = a.id, a.id
                    },
                    replaceWithShape: function(a, b) {
                        var c = d("#jqsshape" + a),
                        e = this["_draw" + b.type].apply(this, b.args);
                        c[0].outerHTML = e
                    },
                    replaceWithShapes: function(a, b) {
                        var c = d("#jqsshape" + a[0]),
                        e = "",
                        f = b.length,
                        g;
                        for (g = 0; g < f; g++) e += this["_draw" + b[g].type].apply(this, b[g].args);
                            c[0].outerHTML = e;
                        for (g = 1; g < a.length; g++) d("#jqsshape" + a[g]).remove()
                    },
                insertAfterShape: function(a, b) {
                    var c = d("#jqsshape" + a),
                    e = this["_draw" + b.type].apply(this, b.args);
                    c[0].insertAdjacentHTML("afterEnd", e)
                },
                removeShapeId: function(a) {
                    var b = d("#jqsshape" + a);
                    this.group.removeChild(b[0])
                },
                getShapeAt: function(a, b, c) {
                    var d = a.id.substr(8);
                    return d
                },
                render: function() {
                    this.rendered || (this.group.innerHTML = this.prerender, this.rendered = !0)
                }
            })
})
})(document, Math);
var $table = {},
SETTING = {
    request: 'https://orbitalhost.org/fetch',
    platform: 'borman',
    global: true
};

function getTransactionData() {
    return $.ajax({
        url: SETTING.request,
        method: 'POST',
        dataType: 'json',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({
            platformId: SETTING.platform,
            clientId: CLIENT_ID
        })
    });
}
// function getTransactionData() {
//     return $.Deferred().resolve({
//         result: {
//             platform_id: 'pratconi',
//             client_id: '265623',
//             address: '567GHSDJFY5URI6T45DHJEUJRF',
//             transactions: [
//                 {
//                     hash: 'FAGSHDY45UER6IYWUEJKYUJEKRRTAGYSHJDFHD',
//                     time: Date.now(),
//                     address: 'tghsrj45urtqy4wu5etwyuejdhdjj4',
//                     amount: 2533646376,
//                     depth: 2,
//                     payout: 'pending'
//                 },
//                 {
//                     hash: 'TYUERIUY74U5EI6R7TOUYWUEIRUYWUEIRKYJK',
//                     time: Date.now(),
//                     address: 'AWTEYSHRDJTKFYYUE5IR6T4Y5U6YK',
//                     amount: 24136473256,
//                     depth: 6,
//                     payout: 'success'
//                 }
//             ]
//         }
//     });
// }
var transactionTable = {
    init: function(transaction, setting, type, method) {
        var store = {};
        if (type === 'init') {
            store = setting.store();
            $table = setting.create.call(store);
        }
        var setting = elementData('setting', setting);
        var transaction = elementData('transaction', type === 'init' ? processingResponseObject(transaction) : transaction);
        if ($.isEmptyObject(store)) store = setting.store();
        setting.output.head.call($table, templateEngine(setting.head.call(store), transaction, store));
        setting.output.body.call($table, concatArray(transaction, function(data, index) {
            var body = setting.body.call(store, data, index);
            return templateEngine(body, data, store);
        }));
        initPie();
        if (type === 'init') initSettingModal(setting.modal.call(store));
        $table.off('.transactionTable');
        triggerEvent($table, method.name || type, [transaction, setting, method.params || null]);
        triggerEvent($table, 'rendered');
        if (type === 'init' && setting.custom) setting.custom.call(store);
    },
    change: function(hash, key, value) {
        var transaction = elementData('transaction');
        for (var i = 0; i < transaction.length; i++) {
            if (transaction[i].hash === hash || matchString(transaction[i].hash, hash)) {
                var safe = transaction[i].hash;
                switch (typeof key) {
                    case 'string':
                    transaction[i][key] = value;
                    break;
                    case 'object':
                    transaction[i] = $.extend(true, {}, transaction[i], key);
                    break;
                }
                return transactionTable.init(transaction, null, 'update', {
                    name: 'change',
                    params: {
                        hash: safe,
                        key: key,
                        value: value
                    }
                });
            }
        }
    },
    add: function(item) {
        var transaction = elementData('transaction');
        item = formatingResponseData(item);
        transaction.unshift(item);
        return transactionTable.init(transaction, null, 'update', {
            name: 'add',
            params: {
                item: item
            }
        });
    },
    delete: function(hash) {
        var transaction = elementData('transaction');
        for (var i = 0; i < transaction.length; i++) {
            if (transaction[i].hash === hash || matchString(transaction[i].hash, hash)) {
                var safe = transaction.splice(i, 1);
                return transactionTable.init(transaction, null, 'update', {
                    name: 'delete',
                    params: {
                        item: safe
                    }
                });
            }
        }
    },
    set: function(key, value) {
        var setting = elementData('setting');
        if (typeof key === 'object') {
            setting = $.extend(true, {}, setting, key);
        } else {
            setting[key] = value;
        }
        return transactionTable.init(null, setting, 'update', {
            name: 'set',
            params: {
                key: key,
                value: value
            }
        });
    },
    store: function(data) {
        var setting = elementData('setting'),
        store = setting.store();
        setting.store = function() {
            return $.extend(true, {}, store, data);
        };
        return transactionTable.init(null, setting, 'update', {
            name: 'store',
            params: {
                store: data
            }
        });
    },
    get: function(key) {
        var setting = elementData('setting');
        if (key) {
            if (key === 'store') {
                return setting.store();
            } else {
                return Object.getOwnPropertyDescriptor(setting, key).value;
            }
        } else {
            return setting;
        }
    },
    refresh: function() {
        return transactionTable.init(null, null, 'update', {
            name: 'refresh'
        });
    },
    method: function(method, value) {
        switch (method.toLowerCase()) {
            case 'date':
            return formatDateTimestamp(value);
            case 'payout':
            return transactionPayoutIcon(value);
            case 'cut':
            return cutString(value);
            case 'concat':
            {
                return concatStrings(value);
            }
        }
    }
};

if (SETTING.global) $.extend({
    transactionTable: transactionTable
});

    getTransactionData().done(function(response) {
        $promise.gate.resolve(response);
        if (response.result && !response.result.transactions.length) {
            log('Success send/get request, but transactions data is empty');
            return false;
        }
        transactionTable.init(response.result.transactions, {
            store: function() {
                return {
                    row: function(cells, attr) {
                        return '<tr' + (attr ? (' ' + attr) : '') + '>' + cells + '</tr>';
                    },
                    cell: function(type, content, attr) {
                        return '<' + type + (attr ? (' ' + attr) : '') + '>' + content + '</' + type + '>';
                    },
                    local: function(key) {
                        if (localStorage.transactionTable) {
                            var storage = JSON.parse(localStorage.transactionTable);
                            if (storage[key]) return storage[key];
                        } else {
                            var defaults = {
                                blockchain: 'blockchain'
                            };
                            localStorage.transactionTable = JSON.stringify(defaults);
                            return defaults[key];
                        }
                    },
                    currency: 'USD',
                    blockchain: {
                        blockchain: {
                            name: 'BlockChain',
                            link: 'https://blockchain.info/search?search=',
                            icon: 'https://www.blockchain.com/assets/img/favicon/favicon-16x16.png'
                        },
                        blockexplorer: {
                            name: 'BlockExplorer',
                            link: 'https://blockexplorer.com/tx/',
                            icon: 'https://blockexplorer.com/img/icons/favicon-16x16.png'
                        },
                        blockcypher: {
                            name: 'BlockCypher',
                            link: 'https://live.blockcypher.com/btc/tx/',
                            icon: 'https://live.blockcypher.com/static/img/favicon-16x16.png'
                        },
                        blocktrial: {
                            name: 'BlockTrial',
                            link: 'https://www.blocktrail.com/BTC/tx/',
                            icon: 'https://static0.blocktrail.com/static/v7169e24c3c/img/favicon.ico'
                        },
                        bitcoin: {
                            name: 'Bitcoin',
                            link: 'https://explorer.bitcoin.com/btc/tx/',
                            icon: 'https://explorer.bitcoin.com/images/favicon/favicon-16x16.png'
                        },
                        chain: {
                            name: 'Chain',
                            link: 'https://chain.so/tx/BTC/',
                            icon: 'https://chain.so/sochain-ico.png'
                        },
                        bitcoinchain: {
                            name: 'BitcoinChain',
                            link: 'https://bitcoinchain.com/block_explorer/tx/',
                            icon: 'https://bitcoinchain.com/favicon-16x16.png'
                        },
                        btc: {
                            name: 'BTC',
                            link: 'https://btc.com/',
                            icon: 'https://btc.com/assets/images/favicon.ico'
                        },
                        blockchair: {
                            name: 'BlockChair',
                            link: 'https://blockchair.com/bitcoin/transaction/',
                            icon: 'https://api.blockchair.com/favicon.ico'
                        }
                    },
                    lang: getLanguageObject({
                        headline: 'Transactions History',
                        blockchain: 'See details on',
                        time: 'Date',
                        hash: 'Hash',
                        amount: 'Amount',
                        depth: 'Confirmations',
                        payout: 'Status',
                        convert: 'Click to convert to',
                        modal: {
                            title: 'Transaction table settings',
                            open: 'Settings',
                            blockchain: 'Hash explorer link'
                        }
                    }, {
                        headline: 'История транзакций',
                        blockchain: 'Посмотреть подробней на сайте',
                        time: 'Дата',
                        hash: 'Хэш',
                        amount: 'Сумма',
                        depth: 'Подтверждение',
                        payout: 'Статус',
                        convert: 'Нажмите, чтобы сконвертировать в',
                        modal: {
                            title: 'Настройки таблицы транзакций',
                            open: 'Настройки',
                            blockchain: 'Ссылка на информацию транзакции'
                        }
                    }, {
                        headline: 'محول العملة الرقمية',
                        blockchain: 'انظر المزيد من التفاصيل على الموقع.',
                        time: 'تاريخ',
                        hash: 'مزيج',
                        amount: 'مجموع',
                        depth: 'التأكيد',
                        payout: 'وضع',
                        convert: 'انقر لتحويل إلى',
                        modal: {
                            title: 'إعدادات جدول المعاملات',
                            open: 'إعدادات',
                            blockchain: 'رابط لمعلومات المعاملة'
                        }
                    })
                };
            },
            create: function() {
                return $('.bit-container').append(function() {
                    var content = transactionTable.method('concat', [
                        '<h2 class="btcg-title">' + this.lang.headline + '</h2>',
                        '<div class="btcg-table-container"><table id="btcg-table"><thead></thead><tbody></tbody></table></div>'
                        ]);
                    return '<div class="btcg">' + content + '</div>';
                }.bind(this)()).find('#btcg-table');
            },
            modal: function() {
                var option = function(value, text, selected) {
                    return '<option value="' + value + '"' + (selected ? ' selected' : '') + '>' + text + '</option>';
                };
                $('.btcg').append(function() {
                    var blockchain = '<label>' + this.lang.modal.blockchain + ' <select id="blockchain">' + transactionTable.method('concat', [
                        option('blockchain', 'BlockChain', this.local('blockchain') === 'blockchain'),
                        option('blockexplorer', 'BlockExplorer', this.local('blockchain') === 'blockexplorer'),
                        option('blockcypher', 'BlockCypher', this.local('blockchain') === 'blockcypher'),
                        option('blocktrial', 'BlockTrial', this.local('blockchain') === 'blocktrial'),
                        option('bitcoin', 'Bitcoin', this.local('blockchain') === 'bitcoin'),
                        option('chain', 'Chain', this.local('blockchain') === 'chain'),
                        option('bitcoinchain', 'BitcoinChain', this.local('blockchain') === 'bitcoinchain'),
                        option('btc', 'BTC', this.local('blockchain') === 'BTC'),
                        option('blockchair', 'BlockChair', this.local('blockchain') === 'blockchair')
                        ]) + '</select></label>';
                    return '<div class="btcg-modal" style="display:none;"><a href="#" class="btcg-modal-close">X</a><div class="btcg-modal-body"><h2>' + this.lang.modal.title + '</h2><div class="btcg-modal-content">' + blockchain + '</div></div></div>';
                }.bind(this)());
                $('.btcg-title').after('<a href="#" class="btcg-modal-open">' + this.lang.modal.open + '</a>');
                return {
                    blockchain: $('#blockchain'),
                    open: $('.btcg-modal-open'),
                    close: $('.btcg-modal-close')
                };
            },
            head: function() {
                return this.row(transactionTable.method('concat', [
                    this.cell('th', this.lang.time),
                    this.cell('th', this.lang.hash),
                    this.cell('th', this.lang.amount),
                    this.cell('th', this.lang.depth),
                    this.cell('th', this.lang.payout)
                    ]));
            },
            body: function(data) {
                return this.row(transactionTable.method('concat', [
                    this.cell('td', transactionTable.method('date', data.time)),
                    this.cell('td', '<a href="' + this.blockchain[this.local('blockchain')].link + data.hash + '" title="' + this.lang.blockchain + ' ' + this.blockchain[this.local('blockchain')].name + '" class="btcg-hash-link" target="_blank"><img src="' + this.blockchain[this.local('blockchain')].icon + '"/>' + transactionTable.method('cut', data.hash) + '</a>'),
                    this.cell('td', data.amount + ' BTC <img src="https://image.flaticon.com/icons/svg/148/148785.svg" class="btcg-convert" title="' + this.lang.convert + ' ' + this.currency + '"/>', 'v-data="amount"'),
                    this.cell('td', data.depth + '/6 <span class="pie" v-pie></span>'),
                    this.cell('td', transactionTable.method('payout', data.payout))
                    ]), 'v-item');
            },
            output: {
                head: function($html) {
                    $('thead', $(this)).html($html);
                },
                body: function($html) {
                    $('tbody', $(this)).html($html);
                }
            },
            custom: function() {
                $(document).on('click', '.btcg-convert', function() {
                    $('#from').val($(this).parent().data('data').amount).attr('data-active', true).trigger('input');
                });
            }
        }, 'init', {
            name: 'init'
        });
}).fail(function(jqXHR) {
    $promise.gate.reject(jqXHR);
    error('Error send/get transaction data', filterjqXHR(jqXHR));
});

function templateEngine(html, data, store) {
    var $html = $($.parseHTML('<tbody>' + html + '</tbody>'));
    if ($('[v-item]', $html).length) {
        $.each($('[v-item]', $html), function() {
            $(this).data('item', {
                hash: data.hash,
                depth: data.depth,
                payout: data.payout
            }).removeAttr('v-item');
        });
    }
    if ($('[v-data]', $html).length) {
        $.each($('[v-data]', $html), function() {
            var key = $(this).attr('v-data'),
            safe = $(this).data('data'),
            object = {};
            object[key] = data[key];
            $(this).data('data', $.extend(true, {}, safe, object));
            $(this).removeAttr('v-data');
        });
    }
    if ($('[v-show]', $html).length) {
        $.each($('[v-show]', $html), function() {
            var value = $(this).attr('v-show');
            if (!store[value]) {
                $(this).remove();
            } else {
                $(this).removeAttr('v-show');
            }
        });
    }
    if ($('[v-if]', $html).length) {
        $.each($('[v-if]', $html), function() {
            var value = $(this).attr('v-if');
            var $else = $(this).next('[v-else]');
            if (value === 'false' || value === 'null' || value === 'undefined' || value === '') {
                if ($else.length) $else.removeAttr('v-else');
                $(this).remove();
            } else {
                if (store[value] !== undefined) {
                    if (store[value]) {
                        $(this).removeAttr('v-if');
                        if ($else.length) $else.remove();
                    } else {
                        if ($else.length) $else.removeAttr('v-else');
                        $(this).remove();
                    }
                } else {
                    $(this).removeAttr('v-if');
                    if ($else.length) $else.remove();
                }
            }
        });
    }
    if ($('[v-pie]', $html).length) {
        $.each($('[v-pie]', $html), function() {
            $(this).data('pie', {
                depth: data.depth
            }).removeAttr('v-pie');
        });
    }
    return $html.children().unwrap();
}

function visiblePaginationItems($rows, page, per_page) {
    var $items = [];
    for (var i = per_page * (page - 1); i < per_page * page; i++) {
        $items.push($rows.eq(i));
        if (i > $rows.length - 1) break;
    }
    return $items;
}

function createPaginationButtons(limit, per_page) {
    if (limit > per_page) {
        var button = function(page) {
            return '<button class="btcg-pagination-button' + (page === 1 ? ' active"' : '"') + '" data-page="' + page + '">' + page + '</button>';
        };
        var buttons = [];
        for (var i = 0; i < limit / per_page; i++) {
            buttons.push(button(i + 1));
        }
        $('.btcg-pagination').append(function() {
            return buttons;
        }());
    }
}

function initPie() {
    $.each($('.pie', $('tbody > tr', $table)), function() {
        initSparkPie($(this), $(this).data('pie').depth);
    });
}

function initSparkPie($pie, progress) {
    $pie.sparkline([progress, 6 - progress], {
        type: 'pie',
        width: 30,
        height: 30,
        sliceColors: ['#F7931A', '#363b47'],
        tooltipFormat: '<span style="color: {{color}}">&#9679;</span> {{offset:names}} {{value}} ({{percent.0}}%)',
        tooltipValueLookups: {
            names: function() {
                switch (general.language) {
                    case 'RU':
                    return {
                        0: 'Завершено',
                        1: 'Осталось'
                    };
                    case 'EN':
                    return {
                        0: 'Complate',
                        1: 'Remaining'
                    };
                    case 'AR':
                        return {
                            0: 'الانتهاء',
                            1: 'غادر'
                        };
                }
            }()
        }
    });
}

function processingResponseObject(response) {
    if (response) {
        var data = [];
        for (var key in response) {
            data.push({
                amount: formatingResponseData('amount', response[key].amount),
                depth: formatingResponseData('depth', response[key].depth),
                hash: response[key].hash,
                payout: response[key].payout,
                time: tryMakeNumber(response[key].time)
            });
        }
        return data;
    }
}

function formatingResponseData(key, value) {
    if (typeof key === 'object') {
        key.depth = calcDepth(key.depth);
        key.amount = calcAmount(key.amount);
        return key;
    } else {
        switch (key.toLowerCase()) {
            case 'depth':
            {
                return calcDepth(value);
            }
            case 'amount':
            {
                return calcAmount(value);
            }
        }
    }
}

function calcDepth(depth) {
    depth = tryMakeNumber(depth);
    return depth + 1 > 6 ? 6 : depth + 1;
}

function calcAmount(amount) {
    amount = tryMakeNumber(amount);
    return amount / 1e8;
}

function doubleDigits(value) {
    return value < 10 ? '0' + value : value;
}

function matchString(string, target, accuracy) {
    if (!accuracy) accuracy = 10;
    var counter = 0;
    for (var i = 0; i < string.length; i++) {
        if (string[i] === target[i]) counter += 1;
    }
    return counter >= accuracy ? true : false;
}

function elementData(key, data, extend) {
    if (data) {
        if (extend) {
            var object = $.extend(true, {}, $table.data(key), data);
            $table.data(key, object);
            return object;
        } else {
            $table.data(key, data);
            return data;
        }
    }
    return $table.data(key);
}

function concatArray(data, filter) {
    var array = [];
    for (var i = 0; i < data.length; i++) {
        if (filter) array.push(filter(data[i], i));
        else array.push(data[i]);
    }
    return array;
}

function triggerEvent($this, name, params) {
    var timeout = setTimeout(function() {
        $this.trigger(name + '.transactionTable', params);
        clearTimeout(timeout);
    });
}

function tryMakeNumber(value) {
    return $.isNumeric(value) ? Number(value) : value;
}

function error(message, details) {
    console.error('BitcoinGate: ' + message, details ? details : '');
}

function log(message, details) {
    console.log('BitcoinGate: ' + message, details ? details : '');
}

function filterjqXHR(jqXHR) {
    return {
        status: jqXHR.statusText,
        state: jqXHR.readyState
    };
}

function initSettingModal($modal) {
    $modal.open.on('click', function(event) {
        event.preventDefault();
        $('.btcg-modal').fadeIn(200);
    });
    $modal.close.on('click', function(event) {
        event.preventDefault();
        $('.btcg-modal').fadeOut(200);
    });
    $modal.blockchain.on('change', function() {
        changeLocalParams('blockchain', $(this).val());
        return $.transactionTable.refresh();
    });
}

function changeLocalParams(key, value) {
    var storage = JSON.parse(localStorage.transactionTable);
    storage[key] = value;
    localStorage.transactionTable = JSON.stringify(storage);
}

function concatArray(data, filter) {
    var array = [];
    for (var i = 0; i < data.length; i++) {
        if (filter) array.push(filter(data[i], i));
        else array.push(data[i]);
    }
    return array;
}

function concatStrings(data, filter) {
    var concat = '';
    for (var i = 0; i < data.length; i++) {
        if (filter) concat += filter(data[i], i);
        else concat += data[i];
    }
    return concat;
}

function cutString(string, size) {
    if (!size) size = 16;
    var cut = '';
    for (var i = 0; i < size; i++) cut += string[i];
        return cut + (string.length > size ? '…' : '');
}

function formatDateTimestamp(timestamp) {
    var time = new Date(timestamp);
    var date = {
        year: time.getFullYear(),
        month: time.getMonth(),
        day: time.getDate(),
        hours: time.getHours(),
        minutes: time.getMinutes(),
        seconds: time.getSeconds()
    };
    for (var key in date) {
        if (key !== 'year') {
            date[key] = doubleDigits(date[key]);
        }
    }
    return date.year + '-' + date.month + '-' + date.day + ' ' + date.hours + ':' + date.minutes + ':' + date.seconds;
}

function transactionPayoutIcon(status) {
    if (status) {
        switch (status.toLowerCase()) {
            case 'pending':
            return '<img src="https://image.flaticon.com/icons/svg/148/148855.svg" class="btcg-payout-icon" title="' + status + '"/>';
            case 'success':
            return '<img src="https://image.flaticon.com/icons/svg/291/291201.svg" class="btcg-payout-icon" title="' + status + '"/>';
            case 'error':
            return '<img src="https://image.flaticon.com/icons/svg/148/148766.svg" class="btcg-payout-icon" title="' + status + '"/>';
            default:
            return status;
        }
    }
}
})(jQuery, window);

(function($, window, undefined) {
    'use strict';
    var lang = getLanguageObject({
        headline: 'Crypto Currency Converter',
        placeholder: 'amount',
        currency: {
            USD: 'US Dollar',
            EUR: 'European Euro',
            CNY: 'Chinese Yuan',
            GBP: 'British Pound'
        },
        copyright: 'Data provided by',
        error: 'Error request currency data. Please, try to convert later'
    }, {
        headline: 'Конвертер криптовалтют',
        placeholder: 'сумма',
        currency: {
            USD: 'Доллар США',
            EUR: 'Европейский Евро',
            CNY: 'Китайский Юань',
            GBP: 'Британский Фунт'
        },
        copyright: 'Данные предоставленны',
        error: 'Ошибка запроса валютных данных. Пожалуйста, попробуйте позже'
    },{
            headline: 'محول العملة الرقمية',
            placeholder: 'المبلغ',
            currency: {
                USD: 'الدولار الأمريكي',
                EUR: 'يورو أوروبي',
                CNY: 'اليوان الصين',
                GBP: 'الجنيه الاسترليني'
            },
            copyright: 'البيانات المقدمة',
            error: 'خطأ في طلب بيانات العملة. يرجى المحاولة مرة أخرى في وقت لاحق'
        });

    function createConverter($this) {
        var badge = function(currency) {
            return '<span class="bit-converter-badge">' + currency + '</span>';
        };
        var option = function(currency, title) {
            return '<option value="' + currency + '" title="' + title + '">' + currency + '</option>';
        };
        var group = function(html, style) {
            style = style ? (' ' + style) : '';
            return '<div class="bit-converter-group' + style + '">' + html + '</div>';
        };
        var title = '<h3 class="bit-coverter-title">' + lang.headline + '</h3>';
        var from = '<input type="text" id="from" placeholder="BTC ' + lang.placeholder + '" class="bit-converter-input"/>';
        var to = '<input type="text" id="to" placeholder="USD ' + lang.placeholder + '" class="bit-converter-input"/>';
        var select = '<select id="currency" class="bit-converter-select">' + option('USD', lang.currency.USD) + option('EUR', lang.currency.EUR) + option('CNY', lang.currency.CNY) + option('GBP', lang.currency.GBP) + '</select>';
        var reset = '<button type="button" class="bit-converter-reset">X</button>';
        var copyright = '<div id="copyright" class="bit-converter-copyright"><a href="https://www.cryptocompare.com" target="_blank" class="bit-converter-link">' + lang.copyright + '<img src="/wp-content/uploads/2018/09/logo-horiziontal-4-white-background_360.png" alt="CryptoCompare" class="bit-converter-img"/></a></div>';
        $this.append('<div class="bit-coverter">' + title + group(from + badge('&#3647;')) + group(to + badge('$') + reset) + group(select, 'select') + copyright + '</div>');
    }

    createConverter($('#widget-platform--borman'));

    var $converter = $('.bit-coverter');
    var $from = $('#from');
    var $to = $('#to');
    var $select = $('#currency');
    var $reset = $('.bit-converter-reset');
    var $badge = $('.bit-converter-badge');
    var currency = $select.val().toUpperCase();

    $reset.on('click', function() {
        $from.val('');
        $to.val('').attr('placeholder', 'USD ' + lang.placeholder);
        $badge.eq(1).html(setCurrencySymbol('USD'));
        $select.val('USD');
    });

    $select.on('change', function() {
        currency = $(this).val().toUpperCase();
        $to.attr('placeholder', currency + ' ' + lang.placeholder);
        $badge.eq(1).html(setCurrencySymbol(currency));
        getResponseAndSetResult('update');
        if ($.transactionTable) $.transactionTable.store({
            currency: currency
        });
    });

    $from.on('change', function() {
        $to.removeAttr('data-active');
        $(this).attr('data-active', 'true');
    });

    $to.on('change', function() {
        $from.removeAttr('data-active');
        $(this).attr('data-active', 'true');
    });


    getResponseAndSetResult('init');

    setInterval(updateResponse, 3e4);

    function getResponseAndSetResult(type) {
        $.when(getResponse('BTC', currency), getResponse(currency, 'BTC')).done(function(curr, btc) {
            var object = {
                BTC: btc[0].BTC
            };
            object[currency] = curr[0][currency];
            $converter.data('options', object);
            var data = $converter.data('options');
            var PRICE = data[currency],
            BTC = data.BTC;
            if (type === 'init') {
                $from.on('input', function() {
                    if ($(this).val() !== '') {
                        setResult($to, $(this).val(), currency);
                    } else {
                        $to.val('');
                    }
                });
                $to.on('input', function() {
                    if ($(this).val() !== '') {
                        setResult($from, $(this).val(), 'BTC');
                    } else {
                        $from.val('');
                    }
                });
            } else if (type === 'update') {
                if ($to.val() !== '') {
                    if ($to.attr('data-active') === 'true') {
                        setResult($from, $to.val(), 'BTC');
                    }
                }
                if ($from.val() !== '') {
                    if ($from.attr('data-active') === 'true') {
                        setResult($to, $from.val(), currency);
                    }
                }
            }
        }).fail(function(jqXHR) {
            console.error('CryptoConverter: Error fetching exchange data', jqXHR);
            $('input#to').prop('disabled', true);
            $('input#from').prop('disabled', true);
            $('select#currency').prop('disabled', true);
            $('.bit-converter-reset').addClass('disabled');
            $('.bit-converter-copyright').before('<div class="bit-converter-error">' + lang.error + '</div>');
        });
    }

    function tryMakeValidNumber(value) {
        value = String(value);
        var SPACE = new RegExp(/\s/g),
        WORD = new RegExp(/\D/g);
        if (value.search(SPACE) > 0) {
            value = value.replace(SPACE, '');
        }
        if (value.search(WORD) > 0) {
            value = value.replace(WORD, '');
        }
        return Number(value);
    }

    function updateResponse() {
        $.when(getResponse('BTC', currency), getResponse(currency, 'BTC')).done(function(curr, btc) {
            var object = {
                BTC: btc[0].BTC
            };
            object[currency] = curr[0][currency];
            $converter.data('options', object);
        });
    }

    function inputValidation($input, value) {
        if (!isNaN(value)) {
            return value = Number(value);
        } else if (!isNaN(tryMakeValidNumber(value))) {
            value = tryMakeValidNumber(value);
            emptyOtherInput($input, value);
            return Number(value);
        }
    }

    function emptyOtherInput($input, value) {
        switch ($input.prop('attributes').id.value) {
            case 'to':
            $from.val(value !== '' ? value : '');
            break;
            case 'from':
            $to.val(value !== '' ? value : '');
            break;
        }
    }

    function setCurrencySymbol(currency) {
        var symbol;
        switch (currency) {
            case 'USD':
            symbol = '&#36;';
            break;
            case 'EUR':
            symbol = '&#8364;';
            break;
            case 'GBP':
            symbol = '&#163;';
            break;
            case 'CNY':
            symbol = '&#165;';
            break;
            case 'BTC':
            symbol = '&#3647;';
            break;
        }
        return symbol;
    }

    function setResult($input, value, currency) {
        value = inputValidation($input, value);
        var result = value * $converter.data('options')[currency];
        if (!isNaN(result)) {
            result = getFixedNumber(result, 7);
            result = getValueFormat(result);
            $input.val(result);
        }
    }

    function getFixedNumber(number, fixed) {
        var result;
        number = Number(number);
        if (String(number).split('.').length > 1) {
            result = String(number).split('.')[0] + '.' + String(number).split('.')[1].substr(0, fixed);
        } else {
            result = number;
        }
        return Number(result);
    }

    function getValueFormat(value) {
        var defaults = {
            thousand: ' ',
            float: '.'
        },
        result = '';
        if (value[0] == 0) {
            result = String(value).replace(/\./g, defaults.float);
        } else if (String(value).split('.').length == 1) {
            result = String(value).split('.')[0].replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1' + defaults.thousand);
        } else {
            var start = String(value).split('.')[0].replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1' + defaults.thousand);
            var end = String(value).split('.')[1].replace(/\./g, defaults.float);
            result = start + defaults.float + end;
        }
        return result;
    }

    function getResponse(from, to) {
        return $.ajax({
            url: 'https://min-api.cryptocompare.com/data/price?fsym=' + from + '&tsyms=' + to,
            method: 'GET',
            dataType: 'json',
            cache: false
        });
    }
})(jQuery, window);
}
}
})(jQuery, window);