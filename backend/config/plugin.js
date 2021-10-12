module.exports = ({ env }) => ({
  upload: {
    provider: "imagekit",
    providerOptions: {
      publicKey: env("IMAGEKIT_PUBLIC_KEY"),
      privateKey: env("IMAGEKIT_PRIVATE_KEY"),
      urlEndpoint: env("IMAGEKIT_URL_ENDPOINT"),
      // Optional
      params: {
        // Defaults to "/" if value is not supplied
        folder: "/network/images",
      },
    },
  },
});
