importScripts("../filters/GreyFilter.js");
importScripts("../filters/InvertFilter.js");


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