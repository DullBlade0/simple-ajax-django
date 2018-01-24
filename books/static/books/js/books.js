// When file is loaded this applies to the page
// JQuery shortcut that tells browser to wait until all HTML is rendered
$(function (){
    /**
     * Functions:
     * We define the functions in this part.
     */

    // Explanatory name, this function loads the form to be rendered.
    var loadForm = function(){
        var btn = $(this);
        $.ajax({
            url: btn.attr("data-url"),
            type: 'get',
            dataType: 'json',
            beforeSend: function(){
                console.log("We're at it Reddit!");
                $("#modal-book").modal("show");
            },
            success: function(data){
                $("#modal-book .modal-content").html(data.html_form);
            }
        });
    };

    var saveForm = function(){
        var form = $(this);

        $.ajax({
            url: form.attr("action"),
            data: form.serialize(),
            type: form.attr("method"),
            dataType: 'json',
            success: function(data){
                console.log("Testing #1");
                if(data.form_is_valid){
                    $("#book-table tbody").html(data.html_book_list);
                    $("modal-book").modal("hide");
                    console.log("Testing #2");
                }
                else{
                    $("#modal-book .modal-content").html(data.html_form);
                }
            },
            error: function(){
                console.log("ERROR! X.x");
            },
        });


        return false; // Is this being ignored?
    };


    /**
     * Bindings:
     * Here we bind together the front-end with the functions described here...still front-end but....you get me right?
     */

     // Create book
     $(".js-create-book").click(loadForm);
     $("#modal-book").on("submit", ".js-create-book-form", saveForm);

     // Update book
     $("#book-table").on("click", ".js-update-book", loadForm);
     $("#modal-book").on("submit", ".js-book-update-form", saveForm);

     // Delete book
     $("#book-table").on("click", ".js-delete-book", loadForm);
     $("modal-book").on("submit", ".js-book-delete-form", saveForm);
});