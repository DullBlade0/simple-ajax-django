// When file is loaded this applies to the page
// JQuery shortcut that tells browser to wait until all HTML is rendered
$(function (){

    // This method is used to display the model, THAT'S IT!
    // When button js-create-book is clicked ...
    // Hooking into click event of element .js-create-book
    $('.js-create-book').click(function(){
        // Executes an ajax call requesting...
        var btn = $(this); // This is done so we can extract the data from the btn object.
        $.ajax({
            url: btn.attr("data-url"), // Book Creation
            type: 'get', // request GET, use HTTP GET Method
            dateType: 'json', //JSONData, I want to receive my data in JSON format.
            beforeSend: function(){ // Execute this before performing the request.
                $("#modal-book").modal("show"); // Executes Bootstrap ONLY method, modal("show") .... to show the modal.
            },
            success: function(data){
                $("#modal-book .modal-content").html(data.html_form); // if AJAX request is successful, injects data into modal-content
            }
        })
    });


    /**
     * This method is used to actually submit the form data to Django
     */
    $('#modal-book').on("submit", ".js-book-create-form", function(){ // Since the form doesn't exist when the page load, we target the closest thing
    /**
     * var form = $(this);
     * If I'm not mistaken form equals the element executing this  
     * Refers to the element with the .js-book-create-form class that fired the submit event
     */
        var form = $(this);
        $.ajax({
            url: form.attr("action"),  // URL comes from the form action attribute
            data: form.serialize(), // The data sent is the form data serialized
            type: form.attr("method"), // request method equal to the form method
            dataType: 'json', // Sending the data as JSON
            success: function (data){ // If the request is successful...Means that it got a status 200.
                if (data.form_is_valid) { // Check if the data sent was valid
                    // alert("Book Created!"); // Testing placeholder, if valid we did it Reddit!
                    console.log("We did it Reddit!");
                    $("#book-table tbody").html(data.html_book_list); // Injects the new book list into the template.
                    $("#modal-book").modal("hide"); //Bootstrap ONLY method, closes the modal.
                }
                else {
                    $("#modal-book .modal-content").html(data.html_form);  
                        /**
                         * If not...we re render the form in the modal? =(
                         * If not we render the form with the error messages in it.
                         */
                }
            }
        });
        return false; // false is returned avoid doing a full HTTP Post method to the server. This one WORKS
    });
});