define(["./Configuration"], function(config) {

    /**
     * Validation Element
     *
     * @type {Element}
     */
    var validationElement = document.querySelector(".validation");

    /**
     * Message Handler
     */
    return {

        /**
         * Show Error message
         *
         * @param message
         * @param timeout
         */
        showError: function(message, timeout) {
            timeout = timeout || (config.validation && config.validation.timeout ? config.validation.timeout : 1000);
            validationElement.innerHTML = "<p>" + message + "</p>";
            validationElement.classList.remove("hidden");
            setTimeout(function() {
                validationElement.innerHTML = "";
                validationElement.classList.add("hidden");
            }, timeout);
        }
    }
});