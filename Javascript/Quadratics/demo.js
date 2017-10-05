/*

See BBC Basic and Go versions on Rosetta code

Quadratic Formula

Normal Version (formula 1)

r1  = ( -b + sqrt( b2 - 4ac) ) / 2a

r2  = ( -b - sqrt( b2 - 4ac) ) / 2a

Avoid Catastrophic Cancellation (formula 2)

r1 = 2c / ( -b - sqrt( b2 - 4ac) )

r2 = 2c / ( -b + sqrt( b2 - 4ac) )


If b2 >> ac and b > 0 then use formula 2 for computing r1  and formula 1 for r2

If b < 0 then use formula 1 for computing r1 and formula 2 for r2

Correct answers for tests should be:

1.5, -7
7.741657386773941, 0.2583426132260586
1.6666666666666667, 0
2.5, -2.5
0.4188611699158103, 3.58113883008419
-2.472135954999579, 6.47213595499958
-1.298819641431822, -1.438885276600965
5e-7+0.999999999999875i, 5e-7-0.999999999999875i
5e-10+1i, 5e-10-1i
99999.99999, 0.000010000000001000001

*/

var quadratic = (function () {

    'use strict';

    var realRootFormula = {
        standard: {
            r1: function (a, inverse_b, e) {
                return (inverse_b + e) / (2 * a);
            },
            r2: function (a, inverse_b, e) {
                return (inverse_b - e) / (2 * a);
            }
        },
        avoidCancellation: {
            r1: function (inverse_b, c, e) {
                return (2 * c) / (inverse_b - e);
            },
            r2: function (inverse_b, c, e) {
                return (2 * c) / (inverse_b + e);
            }
        }
    },

        calculateRealRoots = function (a, b, inverse_b, c, d) {
            var fn = realRootFormula,
                e = Math.sqrt(d);
            return (b > 0) ?
                [fn.avoidCancellation.r1(inverse_b, c, e), fn.standard.r2(a, inverse_b, e)] :
                [fn.standard.r1(a, inverse_b, e), fn.avoidCancellation.r2(inverse_b, c, e)];
        },

        calculateComplexRoots = function (a, inverse_b, d) {
            var e = Math.sqrt(-d),
                f = (inverse_b / (2 * a)).toString(),
                g = (e / (2 * a)).toString();

            return [f + "+" + g + "i", f + "-" + g + "i", ]
        };

    return function (a, b, c) {
        var roots = [],
            inverse_b = -1 * b,
            d = b * b - 4 * a * c;
        switch (Math.sign(d)) {
            case 1:  // Two real roots
                roots = calculateRealRoots(a, b, inverse_b, c, d);
                break;
            case 0:  // Single root
                roots = [b / (2 * a)];
                break;
            case -1:  // Two complex roots
                roots = calculateComplexRoots(a, inverse_b, d)
                break;
            default:
                throw "Discriminant is not a number"
        }
        return roots;
    };
})();

var printRoots = function (roots) {
    return roots[0].toString() + ', ' + roots[1].toString();
}

$('#Test1').text(printRoots(quadratic(2, 11, -21)));
$('#Test2').text(printRoots(quadratic(1, -8, 2)));
$('#Test3').text(printRoots(quadratic(3, -5, 0)));
$('#Test4').text(printRoots(quadratic(4, 0, -25)));
$('#Test5').text(printRoots(quadratic(-2, 8, -3)));
$('#Test6').text(printRoots(quadratic(-2, 8, 32)));
$('#Test7').text(printRoots(quadratic(1.22, 3.34, 2.28)));
$('#Test8').text(printRoots(quadratic(1, -0.000001, 1)));
$('#Test9').text(printRoots(quadratic(1, -0.000000001, 1)));
$('#Test10').text(printRoots(quadratic(1, -100000, 1)));