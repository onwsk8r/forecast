(function () {
    'use strict';

    angular
        .module('wx.forecast')
        .factory('wxParser', wxParser);

    function wxParser() {
        var type = {
            'A': 'Hail',
            'RW': 'Rain Showers',
            'ZR': 'Freezing Rain',
            'S': 'Snow',
            'IP': 'Sleet', //ice pellets
            'H': 'Haze',
            'K': 'Smoke',
            'FR': 'Frost',
            'IF': 'Ice Fog',
            'ZF': 'Freezing Fog',
            'VA': 'Volcanic Ash',
            'T': 'Thunder',
            'R': 'Rain',
            'L': 'Drizzle',
            'ZL': 'Freezing Drizzle',
            'SW': 'Snow Showers',
            'F': 'Fog',
            'BS': 'Blowing Snow',
            'BD': 'Blowing Dust',
            'BN': 'Blowing Sand',
            'IC': 'Ice Crystals',
            'ZY': 'Freezing Spray',
            'WP': 'Water Spouts'
        }

        var coverage = {
            'Sct': 'Scattered',
            'Wide': 'Widespread',
            'SChc': 'Slight Change',
            'Lkly': 'Likely',
            'Patchy': 'Patchy',
            'Brf': 'Brief',
            'Frq': 'Frequent',
            'Iso': 'Isolated',
            'Num': 'Numerous',
            'Ocnl': 'Occasional',
            'Chc': 'Change',
            'Def': 'Definite',
            'Areas': 'Areas of',
            'Pds': 'Periods of',
            'Inter': 'Intermittent'
        }
        
        var intensity = {
            '-': 'Light',
            '+': 'Heavy',
            '--': 'Very Light',
            'm': 'Moderate'
        }
        
        var attribute = {
            'FL': 'Frequent Lightning',
            'GW': 'Gusty Winds',
            'HvyRn': 'Heavy Rain',
            'DmgW': 'Damaging Winds',
            'SmA': 'Small Hail',
            'LgA': 'Large Hail',
            'OLA': 'on Outlying Areas',
            'OBO': 'on Bridges and Overpasses',
            'OGA': 'on Grassy Areas',
            'OR': 'Or',
            'Dry': 'Dry',
            'Primary': 'Highest Ranking',
            'Mention': 'Include Unconditionally',
            'TOR': 'Tornado',
            'Mx': 'Mixture'
        }

        return {
            parse: parse
        }

        function parse(wxstring) {

        }
    }
})();
