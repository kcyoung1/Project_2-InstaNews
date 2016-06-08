$(function() {
    $('#my-select').selectBoxIt();

    $('select').on('change', function() {
        event.preventDefault();

        // Change header
        $('header').switchClass("head-large", "head-small", 1000, "easeOutQuad");
        $('img').switchClass("logo-large", "logo-small", 1000, "easeOutQuad");

        // Loader
        $('.news-articles').empty();
        $('.loading').show();

        let selection = $('.select-opt').val();

        $.ajax({
                method: 'GET',
                url: `http://api.nytimes.com/svc/topstories/v1/${selection}.json?api-key=79cdc4c15ba80dc0b637d0b5c9ca165f:2:75124069`,
            })
            .done(function(data) {
                if (data.results.length === 0) {
                    $('.news-articles').append(`<p>Sorry, nothing found. Please try another section.</p>`);
                } else {
                    let nytData = data.results.filter(function(item) {
                        return item.multimedia.length;
                    }).splice(0, 12)
                    .forEach(function(item, index) {
                        $('.news-articles').append(`
                          <a href="${item.url}">
                            <div class="all-articles article-${index}">
                              <div class="text-${index}">
                                <a href="${item.url}" class="text"> ${item.abstract} </a>
                              </div>
                            </div>
                          </a>`);

                        let img = item.multimedia[4];
                        $('.article-' + index).css('background-image', `url("${img.url}")`);

                        $('.text-'+index).hide();
                        $('.article-'+index).hover(function() {
                            $('.text-'+index).slideToggle('slow', function() {});
                    });
                  });
                }
            }).always(function() {
                $('.loading').hide();
            });

    });
});
