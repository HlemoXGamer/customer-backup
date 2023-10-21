# mut_front

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## Cordova ios
install cordova
```bash
sudo npm install -g cordova
```
at the root folder of the project run:
```bash
cordova create cordova com.example.suble SubleApp
```
the above command should create `cordova` folder.

go to the created folder
```bash
cd cordova
```
and run:
```bash
cordova platform add ios
```

## Installing the Requirements (IOS)
Download `Xcoder`. [App Store](https://itunes.apple.com/us/app/xcode/id497799835?mt=12) Or [Apple Developer Downloads](https://developer.apple.com/downloads/index.action)  
Once Xcode is installed, several command-line tools need to be enabled for Cordova to run. From the command line, run:
```bash
xcode-select --install
```

The CocoaPods tools are needed to build iOS apps. A minimum version of 1.8.0 is required but the latest release is always recommended.
```bash
sudo gem install cocoapods
```

The ios-deploy tools allow you to launch iOS apps on an iOS Device from the command-line.

Install ios-deploy via Homebrew by running:
```bash
brew install ios-deploy
```

**To check if you satisfy requirements for building the platform**
```bash
cordova requirements
```

finally:
```bash
npm i
```
```bash
npm run cordova
```



For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
