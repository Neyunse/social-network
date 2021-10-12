"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.post.create(data, { files });
    } else {
      entity = await strapi.services.post.create(ctx.request.body);
    }
    strapi.StrapIO.emit(this, "create", entity);

    // or send custom event
    //strapi.StrapIO.emitRaw(this, "create", entity);

    return sanitizeEntity(entity, { model: strapi.models.post });
  },
  async delete(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services.post.delete({ id });
    strapi.StrapIO.emit(this, "delete", entity);
    return sanitizeEntity(entity, { model: strapi.models.post });
  },
  async update(ctx) {
    const { id } = ctx.params;

    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.post.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.post.update(
        { id },
        ctx.request.body
      );
    }

    strapi.StrapIO.emit(this, "update", entity);

    return sanitizeEntity(entity, { model: strapi.models.post });
  },
};
