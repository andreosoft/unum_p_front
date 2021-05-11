export default {
  methods: {
    getImage(el) {
      let img;
      if (el.image) {
        img =
          this.$root.api.image_download +
          "/" +
          el.image +
          "?width=50&height=50";
      } else {
        img = "/img/man.png";
      }
      return img;
    }
  }
};
