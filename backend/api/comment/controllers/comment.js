"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.comment.create(data, { files });
    } else {
      entity = await strapi.services.comment.create(ctx.request.body);
    }
    strapi.StrapIO.emit(this, "create", entity);

    // or send custom event
    //strapi.StrapIO.emitRaw(this, "create", entity);

    return sanitizeEntity(entity, { model: strapi.models.comment });
  },

  async delete(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services.comment.delete({ id });
    strapi.StrapIO.emit(this, "delete", entity);
    return sanitizeEntity(entity, { model: strapi.models.comment });
  },
  
  async update(ctx) {
    const { id } = ctx.params;

    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.comment.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.comment.update({ id }, ctx.request.body);
    }

    strapi.StrapIO.emit(this, "update", entity);

    return sanitizeEntity(entity, { model: strapi.models.comment });
  },
};
