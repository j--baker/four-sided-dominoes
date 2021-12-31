# Build notes

I don't know what I am doing.  If I do figure it out, I will forget.  :)


### Update NVM, Node, and NPM.

```
# Node Version Manager
$ nvm --version
0.38.0

# Node
$ node --version
v8.11.2

# Node Package Manager
$ npm --version
6.14.15

# Upgrade node
$ nvm install node
...
Now using node v17.3.0 (npm v8.3.0)

$ nvm list
        v8.11.2
->      v17.3.0
         system
default -> 8.11.2 (-> v8.11.2)
iojs -> N/A (default)
unstable -> N/A (default)
node -> stable (-> v17.3.0) (default)
stable -> 17.3 (-> v17.3.0) (default)
lts/* -> lts/gallium (-> N/A)
lts/argon -> v4.9.1 (-> N/A)
lts/boron -> v6.17.1 (-> N/A)
lts/carbon -> v8.17.0 (-> N/A)
lts/dubnium -> v10.24.1 (-> N/A)
lts/erbium -> v12.22.8 (-> N/A)
lts/fermium -> v14.18.2 (-> N/A)
lts/gallium -> v16.13.1 (-> N/A)

$ node --version
v17.3.0

# Update npm
$ npm install --global npm
... security warnings ...

$ npm --version
8.3.0

$ npm audit
npm ERR! code ENOLOCK
npm ERR! audit This command requires an existing lockfile.
npm ERR! audit Try creating one first with: npm i --package-lock-only
npm ERR! audit Original error: loadVirtual requires existing shrinkwrap file
...

# Set the version of Node to use.
$ nvm use 17.3.0
Now using node v17.3.0 (npm v8.3.0)

# Set the default version of Node.
$ nvm alias default 17.3.0
default -> 17.3.0 (-> v17.3.0)

# Use the default version of Node.
$ nvm use default
Now using node v17.3.0 (npm v8.3.0)

$ nvm list
        v8.11.2
->      v17.3.0
         system
default -> 17.3.0 (-> v17.3.0)
iojs -> N/A (default)
unstable -> N/A (default)
node -> stable (-> v17.3.0) (default)
stable -> 17.3 (-> v17.3.0) (default)
lts/* -> lts/gallium (-> N/A)
lts/argon -> v4.9.1 (-> N/A)
lts/boron -> v6.17.1 (-> N/A)
lts/carbon -> v8.17.0 (-> N/A)
lts/dubnium -> v10.24.1 (-> N/A)
lts/erbium -> v12.22.8 (-> N/A)
lts/fermium -> v14.18.2 (-> N/A)
lts/gallium -> v16.13.1 (-> N/A)

$ nvm --version
0.38.0
$ node --version
v17.3.0
$ npm --version
8.3.0
$ npx --version
8.3.0
```

### Setup Node and NPM project.

```
# Create package-lock.json file.
$ npm install --package-lock-only
... error about package.json ...
... more errors ...

$ npm config get package-lock
true

$ npm config get shrinkwrap
true

# Create the package.json file.
$ npm init
... pick the defaults ...

$ npm install --package-lock-only
up to date, audited 1 package in 273ms
found 0 vulnerabilities

$ npm audit
found 0 vulnerabilities
```

### Install gulp.

```
# Install gulp globally.
$ npm install --global gulp
...
5 high severity vulnerabilities
...

# Install gulp as a development dependency for this project.
$ npm install --save-dev gulp
...
6 high severity vulnerabilities
...

# Try to fix the security issues, but give up for now.
$ npm audit fix
...
# npm audit report
glob-parent  <5.1.2
Severity: high
Regular expression denial of service - https://github.com/advisories/GHSA-ww39-953v-wcq6
...

$ gulp --version
CLI version: 2.3.0
Local version: 4.0.2
```

### Setup Gulp.

```
# Create the gulpfile.js
$ vim gulpfile.js
...

# Make sure using the correct Node if switch to another terminal.
$ nvm use default

# Test empty gulpfile.js.
$ gulp
[13:44:27] Using gulpfile .../gulpfile.js
[13:44:27] Starting 'default'...
[13:44:27] The following tasks did not complete: default
[13:44:27] Did you forget to signal async completion?

# Add dummy "return Promise.resolve();" to the "default" function.
$ vim gulpfile.js
...

$ gulp
[13:47:37] Using gulpfile .../gulpfile.js
[13:47:37] Starting 'default'...
[13:47:37] Finished 'default' after 1.72 ms
```

### Transpile ES6 (ES2015) to ES5 using Gulp and Babel.

```
$ npm install --save-dev babel-preset-es2015

# { "presets": [ "es2015" ] }
$ vim .babelrc

$ npm install --save-dev gulp-babel

# Add Babel to the Gulp config.
$ vim .gulpfile.js

# Set up src/node/test.js, but it fails.
$ gulp
[14:24:13] Using gulpfile .../gulpfile.js
[14:24:13] Starting 'default'...
[14:24:14] 'default' errored after 187 ms
[14:24:14] Error in plugin "gulp-babel"
Message:
    Plugin/Preset files are not allowed to export objects, only functions. In .../node_modules/babel-preset-es2015/lib/index.js

# Change .babelrc
# from this: { "presets": [ "es2015" ] }
# to this  : { "presets": [ "@babel/preset-env" ] }
# per this : https://stackoverflow.com/a/58676558
$ vim .babelrc

# That's even worse.
$ gulp
...
Message: Cannot find module '@babel/preset-env'
...
```



## Files

- Git
	- .git
	- .gitignore
- NPM
	- package.json
	- package-lock.json
	- node_modules

- Node
	- src/node
	- target/node

- Browser source code
	- src/public
	- target/public
