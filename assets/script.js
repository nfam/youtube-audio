  // requires jQuery ... for now

function ToastBuilder(options) {
  // options are optional
  var opts = options || {};
  
  // setup some defaults
  opts.defaultText = opts.defaultText || 'default text';
  opts.displayTime = opts.displayTime || 3000;
  opts.target = opts.target || 'body';

  return function (text) {
    $('<div/>')
      .addClass('toast')
      .prependTo($(opts.target))
      .text(text || opts.defaultText)
      .queue(function(next) {
        $(this).css({
          'opacity': 1
        });
        var topOffset = 15;
        $('.toast').each(function() {
          var $this = $(this);
          var height = $this.outerHeight();
          var offset = 15;
          $this.css('top', topOffset + 'px');

          topOffset += height + offset;
        });
        next();
      })
      .delay(opts.displayTime)
      .queue(function(next) {
        var $this = $(this);
        var width = $this.outerWidth() + 20;
        $this.css({
          'right': '-' + width + 'px',
          'opacity': 0
        });
        next();
      })
      .delay(600)
      .queue(function(next) {
        $(this).remove();
        next();
      });
  };
}

// customize it with your own options
var myOptions = {
  defaultText: 'Toast, yo!',
  displayTime: 3000,
  target: 'body'
};
  //position: 'top right',   /* TODO: make this */
  //bgColor: 'rgba(0,0,0,0.5)', /* TODO: make this */

// to get it started, instantiate a copy of
// ToastBuilder passing our custom options
var showtoast = new ToastBuilder(myOptions);

// Attach a submit handler to the form
function submit(url, quality) {
  // Send the data using post
  var posting = $.post( 'q', { url: url, quality: quality });
 
  // Put the results in a div
  posting.done(function( data ) {
    if (data.success == true) {
      showtoast("Link successfully retrieved");
    }
    else {
      showtoast("Error: "+data.error);
    }
    $('#url-box').val('');
  });

  posting.error(function () {
    showtoast("Error: POST to service failed");
  });

};

// wire it up
$('#btn-mp3-vbr').click(function() {
  submit($('#url-box').val(), '0');
});
$('#btn-mp3-128k').click(function() {
  submit($('#url-box').val(), '128K');
});
$('#btn-mp3-256k').click(function() {
  submit($('#url-box').val(), '256K');
});
$('#btn-mp3-320k').click(function() {
  submit($('#url-box').val(), '320K');
});