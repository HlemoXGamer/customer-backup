export default (context, inject) => {
  const go = (path) => {
    if (path !== "") {
      console.log(context);
      console.log(context.route.path);
    }
  };

  inject("go", go);
  context.$go = go;
};
