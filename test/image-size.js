var test = require('tape');

var md = require('markdown-it')();
var lazy_loading = require('../index.js');

test('image size test', function (t) {
  md.use(lazy_loading, {
    image_size: true,
    base_path: __dirname
  });

  t.plan(1);

  t.equal(
    md.render(`![](dummy-200x200.png "image title")`),
    '<p><img src="dummy-200x200.png" alt="" title="image title" loading="lazy" width="200" height="200" class="lz-img"></p>\n'
  );

});

test('image size test custom image path function', function (t) {
  md.use(lazy_loading, {
    image_size: true,
    img_path_fn: (imgSrc) => {
      return __dirname + imgSrc.replace('https://example.com', '')
    }
  });

  t.plan(1);

  t.equal(
    md.render(`![](https://example.com/dummy-200x200.png "image title")`),
    '<p><img src="https://example.com/dummy-200x200.png" alt="" title="image title" loading="lazy" width="200" height="200" class="lz-img"></p>\n'
  );

});

