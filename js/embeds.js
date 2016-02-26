/*global $:true*/

$.embedly.defaults.key = '1d5c48f7edc34c54bdae4c37b681ea2b';

var urls = [
  'https://www.youtube.com/watch?v=rVlhMGQgDkY',
  'https://vine.co/v/irMdgU253HU',
  'https://streamable.com/25ws',
  'https://www.instagram.com/p/BA4-invoXXH/',
  'http://vimeo.com/18150336'
 ];

$.embedly.oembed(urls)
  .then(function(results) {
    // Reduce the response to only video, rich or photo types and remove
    // link or error responses.
    return results.reduce(function(array, oembed) {
      var html;
      if (oembed.type === 'rich' || oembed.type === 'video') {
        // Use the amp-frame if it's a

        // We need to pull the src out of the iframe.
        var match = (/src=\"([^\"]+)\"/).exec(oembed.html);

        if (match.length === 2) {
          // Grab the src.
          var src = 'https://'+match[1];

          // We should always have a placeholder, otherwise we need to worry about the
          // position of the iframe in relationship to the top of the page. If there
          // is no thumbnail_url then we should use a default placeholder. Please
          // add your own placeholder.
          var placeholder = oembed.thumbnail_url;
          if (!placeholder) {
            placeholder = 'https://cdn.embed.ly/logos/embedly-powered-large-light.png';
          }

          // Build the amp-frame.
          html = [
            '<amp-iframe width=' + oembed.width,
            'height=' + oembed.height,
            'layout="responsive"',
            'frameborder="0"',
            'sandbox="allow-scripts allow-same-origin allow-popups"',
            'src="' + src + '">',
            '<amp-img layout="fill" src="' + placeholder + '" placeholder></amp-img>',
            '</amp-iframe>'
          ].join(' ');
        }
      } else if (oembed.type === 'photo') {
        // Use the amp-img here.

        html = [
          '<amp-img src="' + oembed.url + '"',
          'width=' + oembed.width,
          'height=' + oembed.height,
          'layout="responsive" ></amp-img>'
        ].join(' ');
      }

      if (html) {
        array.push(html);
      }
      return array;
    }, []);
  })
  .then(function(results){
    // add the emebds.
  	var $embeds = $('.embeds');
    results.forEach(function(html){
    	$embeds.append([
      	'<div class="embed">',
        	html,
        '</div>'
      ].join(''));
    });
  });