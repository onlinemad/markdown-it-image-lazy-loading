'use strict';

module.exports = function lazy_loading_plugin(md, mdOptions) {
  var defaultImageRenderer = md.renderer.rules.image;

  md.renderer.rules.image = function (tokens, idx, options, env, self) {
    var token = tokens[idx];
    token.attrSet('loading', 'lazy');

    try {
      if (mdOptions && mdOptions.image_size === true){
        const sizeOf = require('image-size');
        const path = require('path');

        const imgSrc = token.attrGet('src');

        let imgPath = null
        if (mdOptions.base_path) {
          imgPath = path.join(mdOptions.base_path, imgSrc);
        }

        if (mdOptions.img_path_fn && typeof mdOptions.img_path_fn === 'function') {
          imgPath = mdOptions.img_path_fn(imgSrc)
        }

        const dimensions = sizeOf(imgPath);

        token.attrSet('width', dimensions.width);
        token.attrSet('height', dimensions.height);

        token.attrJoin('class', 'lz-img')
      }
    } catch (err) {
      console.error(err.toString())
    }

    return defaultImageRenderer(tokens, idx, options, env, self);
  };
};
