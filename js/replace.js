/*jshint multistr:true */
/*global $:true*/

var post = '<p> \
    Bacon ipsum dolor amet turducken tri-tip ham shank alcatra tenderloin \
    ground round. Bresaola jowl pancetta alcatra cow doner brisket turducken. \
    Strip steak pork hamburger pork loin tail. Jowl salami brisket pancetta \
    fatback biltong. Swine pork hamburger, pork belly shankle sirloin short \
    ribs andouille prosciutto ham cupim. Tenderloin turkey strip steak \
    capicola jerky boudin cupim. Chuck meatball doner venison landjaeger shank \
    t-bone sirloin biltong tri-tip kielbasa hamburger capicola porchetta. \
  </p>\
  <p> \
  <iframe class="embedly-embed" src="//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FrVlhMGQgDkY%3Ffeature%3Doembed&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DrVlhMGQgDkY&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FrVlhMGQgDkY%2Fhqdefault.jpg&key=internal&type=text%2Fhtml&schema=youtube" width="500" height="281" scrolling="no" frameborder="0" allowfullscreen></iframe>\
  </p>\
  <p> \
    Bacon ipsum dolor amet turducken tri-tip ham shank alcatra tenderloin \
    ground round. Bresaola jowl pancetta alcatra cow doner brisket turducken. \
    Strip steak pork hamburger pork loin tail. Jowl salami brisket pancetta \
    fatback biltong. Swine pork hamburger, pork belly shankle sirloin short \
    ribs andouille prosciutto ham cupim. Tenderloin turkey strip steak \
    capicola jerky boudin cupim. Chuck meatball doner venison landjaeger shank \
    t-bone sirloin biltong tri-tip kielbasa hamburger capicola porchetta. \
  </p>\
  <p> \
  <iframe class="embedly-embed" src="//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fplayer.vimeo.com%2Fvideo%2F18150336&url=https%3A%2F%2Fvimeo.com%2F18150336&image=http%3A%2F%2Fi.vimeocdn.com%2Fvideo%2F117311910_1280.jpg&key=internal&type=text%2Fhtml&schema=vimeo" width="500" height="281" scrolling="no" frameborder="0" allowfullscreen></iframe>\
  </p>\
';


var findAll = function(re, str){

  var array= [], a;
  while ((a = re.exec(str)) !== null) {

    array.push({
      html: a[0],
      index: re.lastIndex
    });
  }

  return array;
};


var ampify = function(iframe){
  var src = (/src=\"([^\"]+)\"/).exec(iframe)[1],
    width = (/width=\"([^\"]+)\"/).exec(iframe)[1],
    height = (/height=\"([^\"]+)\"/).exec(iframe)[1],
    path = src.split('?')[1];

  // Embedly stores the URL of a thumbnail of embed in the SRC of the iframe.
  // This decomposes that query sting to a hash.
  var query = path.split('&').reduce(function(query, arg){
    var parts = arg.split('=').map(decodeURIComponent);
    query[parts[0]] = parts[1];
    return query;
  }, {});

  // We should always use a placeholder.
  var placeholder = query.image;
  if (!placeholder){
    placeholder = 'https://cdn.embed.ly/logos/embedly-powered-large-light.png';
  }

  return [
    '<amp-iframe width=' + width,
    'height=' + height,
    'layout="responsive"',
    'frameborder="0"',
    'sandbox="allow-scripts allow-same-origin allow-popups"',
    'src="https:' + src + '">',
    '<amp-img layout="fill" src="' + placeholder + '" placeholder></amp-img>',
    '</amp-iframe>'
  ].join(' ');
};



var deal = function(html){
  var ire = (/<iframe(?:.*?)><\/iframe>/gi);

  var data = findAll(ire, html);

  var ampified = data.map(function(data){
    return ampify(data.html);
  });

  return html.split(ire).reduce(function(array, part, i){
    array.push(part);
    if (i < ampified.length) {
      array.push(ampified[i]);
    }
    return array;
  }, []).join(' ');
};


$(document).on('ready', function(){
  $('article').html(deal(post));

});



