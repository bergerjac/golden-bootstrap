this is a near clone of the 'original' [Golden Bootstrap](https://github.com/phildionne/golden-bootstrap/#golden-bootstrap).  there were a few [issues](/#original-Golden-Bootstrap-Issues).

## QuickStart

1. [Get the files - *choose one*]
 - `$ bower install https://github.com/bergerjac/golden-bootstrap.git#~v2.3.2`
 - `$ git clone https://github.com/bergerjac/golden-bootstrap.git`
 - Download one of the [releases](https://github.com/bergerjac/golden-bootstrap/releases); extract;
2. reference desired `dist/` files in HTML (see [Bootstrap Getting Started](http://getbootstrap.com/2.3.2/getting-started.html#html-template))
3. use Golden Bootstrap CSS rules in HTML (see [Golden Bootstrap docs](http://phildionne.github.com/golden-bootstrap#fixed))

note: Bootstrap CSS is already compiled into `dist/golden-*strap` CSS files  
note: there are two pre-compiled sets of Bootstrap: Bootstrap and [Flatstrap](http://www.flatstrap.org/)

## Customize

*requires git, npm, bower, (grunt)*

1. `$ git clone https://github.com/bergerjac/golden-bootstrap.git`
2. `$ npm install`
3. `$ bower install`
4. see example files in `ext/` folder, and use own theme (see `Gruntfile.js`)

## Contribute

1. Create Issue
2. Fork
3. Commit
4. Pull Request

### License

[Apache 2 - Copyright 2012 Philippe Dionne](license.golden-bootstrap.txt)  

---
##### original Golden Bootstrap Issues

 - required to modify `bootstrap.less`
 - lack of package management (i.e. `package.json`, `bower.json`, `Gruntfile.js`)
 - lack of pre-compiled distribution files
