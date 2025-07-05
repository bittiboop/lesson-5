let user = {
    name: "Jimin",
    sizes: {
        height: 174,
        weight: 60
    },
}
alert(user.sizes.geight);

let clone = Object.assign({}, user);
alert(user.sizes === clone.sizes);
user.sizes.weight= 62;
alert(clone.sizes.weight); 
