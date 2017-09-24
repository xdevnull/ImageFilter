define(["./Configuration", "./MessageHandler", "./UploadedImageHandler"], function(config, messageHandler, uploadedImageHandler) {

    /**
     * Form Selector
     *
     * @type {string}
     */
    var formElement = document.getElementById("imageUploadForm");

    /**
     * File Upload Input
     *
     * @type {Element}
     */
    var fileUploadInput = document.getElementById("uploadedFile");

    /**
     * Upload Controller
     *
     * @type {{}}
     */
    var UploadController = {

        /**
         * Validate Extension
         *
         * @param file
         */
        validateExtension: function(file) {
            var uploadedExtension = file.name.split(".").pop().toLowerCase();
            for(var i = 0; i < config.allowedExtensions.length; i++) {
                if(uploadedExtension === config.allowedExtensions[i]) {
                    return true;
                }
            }
            return false;
        },

        /**
         * OnSubmit
         *
         * @param e
         */
        onSubmit: function(e) {
            e.preventDefault();
            if(fileUploadInput && fileUploadInput.files && fileUploadInput.files.length > 0) {
                var file = fileUploadInput.files[0];
                if(UploadController.validateExtension(file)) {
                    uploadedImageHandler.handleUpload(file);
                }
                else {
                    messageHandler.showError("Invalid Extension");
                }
            }
            else {
                messageHandler.showError("No file was uploaded");
            }
        },

        /**
         * Init
         */
        init: function() {
            formElement.addEventListener("submit", UploadController.onSubmit);
        }
    };

    return UploadController;
});