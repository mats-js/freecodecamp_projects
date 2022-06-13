/* Convert the given number into a roman numeral.
Roman numerals and Arabic numerals:
M 	1000
CM 	900
D 	500
CD 	400
C 	100
XC 	90
L 	50
XL 	40
X 	10
IX 	9
V 	5
IV 	4
I 	1
All roman numerals answers should be provided in upper-case. */

function convertToRoman(num) {
    let arr = [{roman: "M", arabic: 1000}, {roman: "CM", arabic: 900}, {roman: "D", arabic: 500}, {roman: "CD", arabic: 400},
        {roman: "C", arabic: 100}, {roman: "XC", arabic: 90}, {roman: "L", arabic: 50}, {roman: "XL", arabic: 40}, {roman: "X",arabic: 10},
        {roman: "IX", arabic: 9}, {roman: "V", arabic: 5}, {roman: "IV", arabic: 4},{roman: "I", arabic: 1}];
    let result = "";
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].arabic <= num) {
            num = num - arr[i].arabic;
            result = result.concat(arr[i].roman);
            i--;
        }
    }
    return result;
}

convertToRoman(3999);