module.exports = function(params) {
  let parsing = require("../API/parsing");
  try {
    //here is getting array in params
    //put loop on params
    //take object from params and  call to object
    console.log("Its Array Handler");
    let items = params.items;

    items.forEach(element => {
      console.log(element);
    });
  } catch (error) {
    console.log(error);
  }
};
