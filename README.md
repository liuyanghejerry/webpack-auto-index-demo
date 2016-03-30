This demo project demostrated how to use a plugin to generate index html files, which automatically track all dependencies.

The sample plugin is at `auto-index-plugin`. Note it's still a POC.

In the `src` directory, there're three folders, `int` for one kind of products, `ss` for one kind of products and `common` for some common dependencies across the products that not from 3rd-parties.

Each file in `int` and `ss` is an entry point file.

You can require any modules in any files, and the plugin will gather all dependencies you need and generate your html files.

The `vendor` file is a manual common bundle, which controlled by you. And what probably makes you happy is that you don't need to append `vendor` to every index. It is already taken care of by the plugin.

* `npm i` to install all local dependencies.
* `npm i -g webpack` to install a global webpack.
* `webpack` to generate all build result at `dist`.