class InputValidator {

    isNumerical(str) {
        str = str.toLowerCase();
        const nonNumericalVals = "abcdefghijklmnopqrstuvwxyz|!#¤%&/()?*^¨~,.:_";
        for(let i = 0; i < str.length; i++) {
            if (nonNumericalVals.indexOf(str.charAt(i)) >= 0) {
            return false;
            }
        }
        return true;
    }
}
module.exports = InputValidator;