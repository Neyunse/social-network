const axios = require("axios");

module.exports = {
  /**
   * Retrieve a user avatar.
   *
   * @return {String}
   */

  async find(ctx) {
    // if (ctx.params.id.length < 4 || !ctx.params.id.includes("@") || !ctx.params.id.includes(".")) {
    //   return ctx.badRequest("Invalid email address");
    // }

    const { data } = await axios.get(`https://unavatar.io/${ctx.params.id}?json`);
    if (data.url.includes("fallback")) {
      return ctx.send({ url: null });
    }

    return ctx.send(data);
  },
};
