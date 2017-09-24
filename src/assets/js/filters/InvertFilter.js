/**
 * Invert Filter
 *
 * @type {{}}
 */
var InvertFilter = {

    /**
     * Apply Invert filter
     *
     * @param imageData
     */
    apply: function(imageData) {
        var data = imageData.data;
        var length = data.length;
        for(var i = 0; i < length; i += 4) {
            data[i] = 255 - data[i];
            data[i + 1] = 255 - data[i + 1];
            data[i + 2] = 255 - data[i + 2];
        }
        return imageData;
    }
}