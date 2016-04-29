var nytData = data.results, articleLink, articleCaption, articleImageUrl;

if (nytData.length !== 0) {

  nytData = nytData.filter(function(){
    return.item.multimedia.length;
  }).splice(0,12);

  nytItems += '<ul>';

  $.each(nytData, function(key, value){
    articleImageUrl = value.multimedia[4].url;
    articleCaption = value.abstract

  })
}
