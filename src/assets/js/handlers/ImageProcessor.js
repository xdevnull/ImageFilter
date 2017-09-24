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


/**
 * FiltersMap
 *
 * @type {{}}
 */
var FiltersMap = {

    //Greyscale filter
    greyscale: GreyFilter,

    //Invert filter
    invert: InvertFilter,

};

/**
 * Image Filter Request
 *
 * @type {{}}
 */
var ImageFilterRequest = {

    /**
     * Filter Applied
     *
     * @param imageData
     */
    filterApplied: function(imageData) {
        self.postMessage({request: "filter_applied", imageData: imageData});
    },

    /**
     * Handle Image Filter Request
     *
     * @param data
     */
    handle: function(data) {
        if(FiltersMap[data.filter]) {
            ImageFilterRequest.filterApplied(FiltersMap[data.filter].apply(data.imageData));
        }
        else {
            ImageFilterRequest.filterApplied(data.imageData);
        }
    }

};

/**
 *  Listen for incoming message
 */
self.onmessage = function(event) {

    if(event.data) {

        /**
         * IMAGE Filter Request
         */
        if(event.data.request && event.data.request === "image_filter") {
            ImageFilterRequest.handle(event.data);
        }
    }

}