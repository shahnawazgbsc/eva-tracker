const numNames = [
    "",
    " one",
    " two",
    " three",
    " four",
    " five",
    " six",
    " seven",
    " eight",
    " nine",
    " ten",
    " eleven",
    " twelve",
    " thirteen",
    " fourteen",
    " fifteen",
    " sixteen",
    " seventeen",
    " eighteen",
    " nineteen"
];
const tensNames = [
    "",
    " ten",
    " twenty",
    " thirty",
    " forty",
    " fifty",
    " sixty",
    " seventy",
    " eighty",
    " ninety"
]
export default class NumberToWords {
    constructor(props) {

    }
    convertLessThanOneThousand(number) {
        var soFar = "";

        if (number % 100 < 20){
            soFar = numNames[number % 100];
            number = Math.floor(number / 100);
        }
        else {
            soFar = numNames[number % 10];
            number = Math.floor(number/10);

            soFar = tensNames[number % 10] + soFar;
            number = Math.floor(number / 10);
        }
        if (number == 0) return soFar;

        return numNames[number] + " hundred" + soFar;
    }
    convert(number) {
        if(number === void 0 || number === null || isNaN(number)) return "Volume in words"
        // 0 to 999 999 999 999
        if (number == 0) { return "zero"; }

        snumber = number.toString();
        var difference = 12 - snumber.length;
        
        var zeroString = ""
        for(var i = 0; i < difference; i++) {
            zeroString+="0";
        }
        snumber = zeroString.concat(snumber);
        // pad with "0"

        // XXXnnnnnnnnn
        var billions = parseInt(snumber.substring(0,3));
        // nnnXXXnnnnnn
        var millions  = parseInt(snumber.substring(3,6));
        // nnnnnnXXXnnn
        var hundredThousands = parseInt(snumber.substring(6,9));
        // nnnnnnnnnXXX
        var thousands = parseInt(snumber.substring(9,12));
        // 000001000000
        // 000001000000
        var tradBillions = "";
        switch (billions) {
            case 0:
                tradBillions = "";
                break;
            case 1 :
                tradBillions = this.convertLessThanOneThousand(billions)
                        + " billion ";
                break;
            default :
                tradBillions = this.convertLessThanOneThousand(billions)
                        + " billion ";
        }
        var result =  tradBillions;

        var tradMillions = "";
        switch (millions) {
            case 0:
                tradMillions = "";
                break;
            case 1 :
                tradMillions = this.convertLessThanOneThousand(millions)
                        + " million ";
                break;
            default :
                tradMillions = this.convertLessThanOneThousand(millions)
                        + " million ";
        }
        result =  result + tradMillions;

        var tradHundredThousands = "";
        switch (hundredThousands) {
            case 0:
                tradHundredThousands = "";
                break;
            case 1 :
                tradHundredThousands = "one thousand ";
                break;
            default :
                tradHundredThousands = this.convertLessThanOneThousand(hundredThousands)
                        + " thousand ";
        }
        result =  result + tradHundredThousands;

        var tradThousand = "";
        tradThousand = this.convertLessThanOneThousand(thousands);
        result =  result + tradThousand;

        // remove extra spaces!
        return result.replace("^\\s+", "").replace("\\b\\s{2,}\\b", " ");
    }
}
