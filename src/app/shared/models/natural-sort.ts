/*
  Provides natural sort of numbers/dates
*/

export class NaturalSort {

  sort(sortKey: any) {
    var depth: any, fixDates: any, fixNumbers: any, monthFirst: any, natValue: any, pad: any, toString: any;
    pad = function(value:any) {
      return '00000000000000000000'.slice(value.length);
    };
    fixNumbers = function(value: any) {
      return value.replace(/(\d+)((\.\d+)+)?/g, function($0: any, integer: any, decimal: any, $3: any) {
        if (decimal !== $3) {
          return $0.replace(/(\d+)/g, function($d: any) {
            return pad($d) + $d;
          });
        } else {
          decimal = decimal || '.0';
          return "" + (pad(integer)) + integer + decimal + (pad(decimal));
        }
      });
    };
    toString = function(value: any) {
      if (value == null) {
        return '';
      }
      return "" + value;
    };
    monthFirst = "M/d/yy".charAt(0) === 'M';
    fixDates = function(value: any) {
      return toString(value).replace(/(\d\d?)[-\/\.](\d\d?)[-\/\.](\d{4})/, function($0:any, $m:any, $d:any, $y:any) {
        var t;
        t = $d;
        if (!monthFirst) {
          if (Number($d) < 13) {
            $d = $m;
            $m = t;
          }
        } else if (Number($m) > 12) {
          $d = $m;
          $m = t;
        }
        return $y + "-" + $m + "-" + $d;
      });
    };
    natValue = function(value: any) {
      if (value !== null && typeof value === 'object') {
        return value;
      }
      if (value === 'true') {
        return true;
      }
      if (value === 'false') {
        return false;
      }
      return fixNumbers(fixDates(value)).toLowerCase();
    };
    sortKey = (sortKey != null ? sortKey.split('.') : void 0) || [sortKey];
    depth = sortKey.length;
    return (function(_this) {
      return function(a: any, b: any) {
        var i;
        i = 0;
        while (i < depth) {
          a = natValue(a[sortKey[i]]);
          b = natValue(b[sortKey[i]]);
          i++;
        }
        if (a < b) {
          return -1;
        }
        if (a > b) {
          return 1;
        }
        return 0;
      };
    })(this);
  };
}
