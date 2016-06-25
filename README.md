# aztec.js
![Travis CI Build Status](https://travis-ci.org/MrOnlineCoder/aztec.js.svg)

A lightweight Javascript library for localizing pages.

## Getting Aztec.js

You can always get Aztec.js using next links:

[Normal](https://raw.githubusercontent.com/MrOnlineCoder/aztec.js/master/dist/normal/aztec.js)

[Minified](https://raw.githubusercontent.com/MrOnlineCoder/aztec.js/master/dist/minified/aztec.js)

## Getting started

Aztec.js is easy-to-use library, and you will see it!

First, connect Aztec.js to your page:

```html

<script src="path to your aztec.js"></script>

```

Now we are ready to use Aztec.js!

All library functions are located in Aztec object.

Aztec.js works like template engine, you specify the object with keys and values, and then engine renders it.

Make a script for setting up Aztec.js:

```javascript

Aztec.addLanguage("english", {country: "England", locale: "English"});

Aztec.setCurrentLanguage("english");

```

Here, we added a new language with **english** key, and object with keys.

Then, we set **english** as current language.

Now, let's move to HTML:

```html

<p class="translatable">Hello, I am from {%country%}. The current locale is {%locale%}</p>

```

So, what we did in this part of code?

1.We added a **translatable** class for our **p** element, so Aztec.js now know that this element should be rendered.

2.Added the **template tags**: country and locale. The values for that tags are taken from object passed to **addLanguage** method.

And the final step:

call **.render()** function to render elements.

```javascript

Aztec.render();

```

The result will be:

```html

Hello, I am from England. The current locale is English!

```

You can also get translation from Javascript:

```javascript

Aztec.translate("country"); // => "England"

```

## Documentation:

**Aztec.debug** (Boolean) - should Aztec.js actions be logged in console?

**Aztec.translateClass** (String) - a class for elements which should be rendered. Default: *translatable*

**Aztec.addLanguage(name, keys)** (Function) - adds the language. *name* is the name for locale, and *keys* is object with translations.

**Aztec.setCurrentLanguage(name)** (Function) - sets the current language. Please, add the language before setting it as current.

**Aztec.render(element)** (Function) - renders the page/element. If element is not specified, then whole page will be rendered.

### License: MIT

### Author: MrOnlineCoder (Nikita Kogut)