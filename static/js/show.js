'use strict';
var pdf = null;
var loaded = 1;
var loadPage = function(n) {
  pdf.getPage(n).then(function(page) {
    var scale = 1.5;
    var viewport = page.getViewport(scale);

    var canvas = document.getElementById('pdfcanvas');
    var context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    var renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    page.render(renderContext);
  });
};
PDFJS.getDocument('/files/test.pdf').then(function(_pdf) {
  pdf = _pdf;
  loadPage(1);
});
$('#pdfview').on('scroll', function() {
  if(($('#pdfcanvas').height() - $('#pdfview').height() - $('#pdfview').scrollTop()) <= 0) {
    loadPage(loaded++);
    $('#pdfview').animate({scrollTop: 0});
  };
});
