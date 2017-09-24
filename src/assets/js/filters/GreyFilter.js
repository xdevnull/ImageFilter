/**
 * Grey Filter
 *
 * @type {{}}
 */
var GreyFilter = {

    /**
     * Apply GreyFilter
     */
    apply: function(imageData) {
        var data = imageData.data;
        var length = data.length;
        for(var i = 0; i < length; i += 4) {
            var color = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = data[i + 1] = data[i + 2] = color;
        }
        return imageData;
    }
}