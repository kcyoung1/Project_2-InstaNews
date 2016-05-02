$(function() {
    $('select').on('change', function() {


        event.preventDefault();
        $('header').switchClass("head-large", "head-small", 1000, "easeOutQuad");
        $('img').switchClass("logo-large", "logo-small", 1000, "easeOutQuad");

        $('.news-articles').empty();
        $('.loading').show();

        var selection = $('.selectopt').val();

        $.ajax({
                method: 'GET',
                url: 'http://api.nytimes.com/svc/topstories/v1/' + selection + '.json?api-key=79cdc4c15ba80dc0b637d0b5c9ca165f:2:75124069',
            })
            .done(function(data) {

                var nytData = data.results;
                nytData = nytData.filter(function(item) {
                    return item.multimedia.length;
                }).splice(0, 12);
                if (data.resultCount !== 0) {
                    nytData.forEach(function(item, index) {

                        $('.news-articles').append('<div class="all-articles article-' + index + '"><div class="text"><a href="' + item.url + '"> ' + item.abstract + '</a></div></div>');

                        img = item.multimedia[4];
                        $('.article-' + index).css('background-image', 'url("' + img.url + '")');

                    });
                } else {
                    $('.news-articles').append('<p>Sorry, you can\'t spell properly.</p>');
                }
            }).always(function() {
                $('.loading').hide();
            });

    });
});
