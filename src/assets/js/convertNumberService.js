import Vue from 'vue'

new Vue({})

export class ConvertNumService {
    rule_E2M = [{
        from: '\u0030',
        to: '\u1040'
    }, {
        from: '\u0031',
        to: '\u1041'
    }, {
        from: '\u0032',
        to: '\u1042'
    }, {
        from: '\u0033',
        to: '\u1043'
    }, {
        from: '\u0034',
        to: '\u1044'
    }, {
        from: '\u0035',
        to: '\u1045'
    }, {
        from: '\u0036',
        to: '\u1046'
    }, {
        from: '\u0037',
        to: '\u1047'
    }, {
        from: '\u0038',
        to: '\u1048'
    }, {
        from: '\u0039',
        to: '\u1049'
    }];
    
    rule_m2E = [{
        from: '\u1040',
        to: '\u0030'
    }, {
        from: '\u1041',
        to: '\u0031'
    }, {
        from: '\u1042',
        to: '\u0032'
    }, {
        from: '\u1043',
        to: '\u0033'
    }, {
        from: '\u1044',
        to: '\u0034'
    }, {
        from: '\u1045',
        to: '\u0035'
    }, {
        from: '\u1046',
        to: '\u0036'
    }, {
        from: '\u1047',
        to: '\u0037'
    }, {
        from: '\u1048',
        to: '\u0038'
    }, {
        from: '\u1049',
        to: '\u0039'
    }]

    constructor() {}

    convertEng2Mm(number) {
        for (let i = 0; i < this.rule_E2M.length; i++) {
            const data = this.rule_E2M[i];
            const from = data.from;
            const to = data.to;
            const from_regex = new RegExp(from, 'g');
            number = number.toString().replace(from_regex, to);
        }
        return number;
    }

    convertMm2Eng(number) {
        for (let i = 0; i < this.rule_m2E.length; i++) {
            const data = this.rule_m2E[i];
            const from = data.from;
            const to = data.to;
            const from_regex = new RegExp(from, 'g');
            number = number.replace(from_regex, to);
        }
        return number;
    }
}