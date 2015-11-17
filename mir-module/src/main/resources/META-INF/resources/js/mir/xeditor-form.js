$(document).ready(function() {

    $("body").on("click", ".personExtended_box .glyphicon-menu-hamburger", function () {
        $(this).closest("legend").toggleClass("hiddenDetail").next().toggleClass("hiddenDetail");
    });

    $("body").on("change", ".date-select", function () {
        var type = $(this).val();
        var parent = $(this).closest(".form-group");
        var start = getDate(parent, "start");
        var end = getDate(parent, "end");
        setDate(parent, "start", "");
        setDate(parent, "end", "");
        $(parent).find(".date-changeable").addClass("hidden");
        $(parent).find(".date-changeable").filter(function () {
            return $(this).attr("data-type") == type;
        }).removeClass("hidden");
        setDate(parent, "start", start);
        setDate(parent, "end", end);
    });

    function getDate(parent, point) {
        return $(parent).find(".date-changeable:not('.hidden') input").filter(function () {
            return $(this).attr("data-point") == point;
        }).val();
    }

    function setDate(parent, point, date) {
        $(parent).find(".date-changeable:not('.hidden') input").filter(function () {
            return $(this).attr("data-point") == point;
        }).val(date);
    }

    if ($(".personExtended-container input:text[value='']").length > 0) {
        $(".personExtended-container input:not(:text[value=''])").closest(".personExtended-container").removeClass("hiddenDetail").prev().removeClass("hiddenDetail");
    }

    if ($(".date-select").length > 0) {
        $(".date-select").each(function() {
            var type = $(this).val();
            var parent = $(this).closest(".form-group");
            $(parent).find(".date-changeable").addClass("hidden");
            $(parent).find(".date-changeable").filter(function () {
                return $(this).attr("data-type") == type;
            }).removeClass("hidden");
        });
    }
});