'use strict';

$(function () {
    $('#my-select').selectBoxIt();

    $('select').on('change', function () {
        event.preventDefault();

        // Change header
        $('header').switchClass("head-large", "head-small", 1000, "easeOutQuad");
        $('img').switchClass("logo-large", "logo-small", 1000, "easeOutQuad");

        // Loader
        $('.news-articles').empty();
        $('.loading').show();

        var selection = $('.select-opt').val();

        $.ajax({
            method: 'GET',
            url: 'http://api.nytimes.com/svc/topstories/v1/' + selection + '.json?api-key=79cdc4c15ba80dc0b637d0b5c9ca165f:2:75124069'
        }).done(function (data) {
            if (data.results.length === 0) {
                $('.news-articles').append('<p>Sorry, nothing found. Please try another section.</p>');
            } else {
                var nytData = data.results.filter(function (item) {
                    return item.multimedia.length;
                }).splice(0, 12).forEach(function (item, index) {
                    $('.news-articles').append('\n                          <a href="' + item.url + '">\n                            <div class="all-articles article-' + index + '">\n                              <div class="text-' + index + '">\n                                <a href="' + item.url + '" class="text"> ' + item.abstract + ' </a>\n                              </div>\n                            </div>\n                          </a>');

                    var img = item.multimedia[4];
                    $('.article-' + index).css('background-image', 'url("' + img.url + '")');

                    $('.text-' + index).hide();
                    $('.article-' + index).hover(function () {
                        $('.text-' + index).slideToggle('slow', function () {});
                    });
                });
            }
        }).always(function () {
            $('.loading').hide();
        });
    });
});