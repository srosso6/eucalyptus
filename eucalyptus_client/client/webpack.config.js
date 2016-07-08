
var config = {
    // TODO: Add common Configuration
    resolve: {
      extensions: ['', '.js', '.jsx']
    },
    module:{
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel', // 'babel-loader' is also a legal name to reference
          query: {
            presets: ['react', 'es2015']
          }
        }
      ]
    },
    devtool: 'source-map'
};

var home = Object.assign({}, config, {
    name: "home",
    entry: "./src_home/app.jsx",
    output: {
       path: "./build/home/",
       filename: "bundle.js"
    },
});


var admin = Object.assign({}, config, {
    name: "admin",
    entry: "./src_admin/app.jsx",
    output: {
       path: "./build/admin/",
       filename: "bundle.js"
    },
});


var user = Object.assign({}, config, {
    name: "user",
    entry: "./src_user/app.jsx",
    output: {
       path: "./build/user/",
       filename: "bundle.js"
    },
});

module.exports = [home, user, admin];
