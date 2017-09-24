define(function() {

    /**
     * Image Processor
     */
    var ImageProcessor = new Worker("assets/js/handlers/ImageProcessor.js");

    /**
     * Result Element
     *
     * @type {Element}
     */
    var resultElement = document.getElementById("result");

    /**
     * Filters List
     *
     * @type {Element}
     */
    var filtersList = document.getElementById("filterList");

    /**
     * Uploaded Image Handler
     *
     * @type {{}}
     */
    var UploadedImageHandler = {

        /**
         * Handle a Filtered Image By Worker
         *
         * @param data
         */
        handleFilteredImage: function(data) {
            UploadedImageHandler.drawOnCanvas(data.imageData);
        },

        /**
         * Create DATAURI from Uploaded Image
         *
         * @param imageFile
         */
        createDataURI: function(imageFile, callback) {
            var reader = new FileReader();
            reader.onload = function() {
                callback(reader.result);
            }
            reader.readAsDataURL(imageFile);
        },

        /**
         * Draw ImageData
         *
         * @param imageData
         */
        drawOnCanvas: function(imageData) {
            resultElement.innerHTML = "";
            var canvas = document.createElement("canvas");
            canvas.width = imageData.width;
            canvas.height = imageData.height;
            var context = canvas.getContext("2d");
            context.putImageData(imageData, 0, 0);
            resultElement.appendChild(canvas);
        },

        /**
         * Get Image Data and pass them to a callback
         *
         * @param dataURI
         */
        getImageData: function(dataURI, callback) {
            var image = new Image();
            var canvas = document.createElement("canvas");
            image.onload = function() {
                canvas.width = image.width;
                canvas.height = image.height;
                var context = canvas.getContext("2d");
                context.drawImage(image, 0, 0, image.width, image.height);
                callback(context.getImageData(0, 0, image.width, image.height));
            }
            image.src = dataURI;
        },

        /**
         * Handle Uploaded Image
         *
         * @param imageFile
         */
        handleUpload: function(imageFile) {
            UploadedImageHandler.createDataURI(imageFile, function(dataURI) {
                UploadedImageHandler.getImageData(dataURI, function(imageData) {
                    ImageProcessor.postMessage({
                        request: "image_filter",
                        filter: filtersList[filtersList.selectedIndex].value,
                        imageData: imageData
                    });
                });
            });
        }
    };

    /**
     * Image Processor
     *
     * @param e
     */
    ImageProcessor.onmessage = function(e) {
        if(e.data && e.data.request && e.data.request === "filter_applied") {
            UploadedImageHandler.handleFilteredImage(e.data);
        }
    }

    return UploadedImageHandler;
});