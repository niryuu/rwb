'use strict';
var pdf = null;
var loaded = 1;
var last = 0;
var loadPage = function(page) {
  var scale = 1.0;
  var viewport = page.getViewport($('#pdfview').width()/page.getViewport(1.0).width * window.devicePixelRatio);

  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  canvas.height = viewport.height;
  canvas.width = viewport.width;
  canvas.style.cssText = 'width: ' + (viewport.width / window.devicePixelRatio) + 'px;'

  var renderContext = {
    canvasContext: context,
    viewport: viewport
  };
  page.render(renderContext);
  document.getElementById('pdfview').appendChild(canvas);
  if(loaded < last) {
    pdf.getPage(++loaded).then(loadPage);
  }
};
var loadPDF = function(filename) {
  PDFJS.getDocument(filename).then(function(_pdf) {
    pdf = _pdf;
    last = pdf.numPages;
    pdf.getPage(loaded).then(loadPage);
  });
};
