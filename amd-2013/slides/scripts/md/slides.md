title: AMD
subtitle: <strong>A</strong>synchronous <strong>M</strong>odule <strong>D</strong>efinition
class: specification

- Specification for defining modules in JavaScript that can support loading of dependencies asynchronously
- Targeting browser environment where synchronous loading of a dependency can be 'blocking'
- Alternative to libraries that allow to define dependencies and load by script-injection order ([LabJS](http://labjs.com/), [HeadJS](http://headjs.com/))

<footer class="source">
<a href="https://github.com/amdjs/amdjs-api/wiki/AMD">https://github.com/amdjs/amdjs-api/wiki/AMD</a>
</footer>

---

title: CommonJS
class: specification

- CommonJS is a volunteer working group attempting to standardize APIs for JavaScript
- Specifications and proposals for many common conventions and implementations in JavaScipt
- Originally called ServerJS with the goal of specifying APIs targeting non-browser environments
- [nodejs](http://nodejs.org/) implements some of these specifications

<footer class="source">
<a href=""http://wiki.commonjs.org">http://wiki.commonjs.org</a>
</footer>

---

title: CommonJS Modules/1.0
class: nobackground

- Synchronous loading of JavaScript modules

<em>loader</em>
<pre>
require(dependency)?.property
</pre>

<em>loadee</em>
<pre>
exports = ?&lt;function|object&gt;
</pre>

---

title: CommonJS Modules/1.0
class: nobackground

- Synchronous loading of JavaScript modules

<em>math.js</em>
<pre>exports.add = function() {<br/>  var values = Array.prototype.slice.call(arguments, 0),<br/>      result = 0;<br/>  while(values.length > 0) {<br/>      result += Number(values.shift());<br/>  }<br/>  return result;<br/>};</pre>

---

title: CommonJS Modules/1.0
class: nobackground

- Synchronous loading of JavaScript modules

<em>incrementer.js</em>
<pre>var add = require('math').add,<br/>exports.increment = function(value){<br/> return add(value, 1);<br/>};</pre>

<em>app.js</em>
<pre>var inc = require('incrementer').increment;<br/>inc(1);<br/>// 2</pre>

---

title: AMD
subtitle: neé CommonJS Modules/AsynchronousDefinition

- Async nature of scripts for browser did not translate well for Modules/1.0 where file I/O is cheap
- multiple require()'s lines adds complexity to dependency resolutions
- coupled with synchonous loading, contributes to 'blocking' and affects performance

<em>signature:</em>
<pre>define(id?, dependencies?, factory);</pre>

<em>factory is a function that defines or returns the module export</em>

---

title: AMD
subtitle: neé CommonJS Modules/AsynchronousDefinition

<em>math.js</em>
<pre>define('math', function(){<br/>    return {<br/>        add: function() {<br/>            var values = Array.prototype.slice.call(arguments, 0),<br/>                result = 0;<br/>            while(values.length > 0) {<br/>                result += Number(values.shift());<br/>            }<br/>            return result;<br/>        }<br/>    };
});
</pre>

---

title: AMD
subtitle: neé CommonJS Modules/AsynchronousDefinition

<em>incrementer.js</em>
<pre>define('incrementer', ['math'], function(math) {<br/>    return function(value) {<br/>        math.add(value, 1);<br/>    };<br/>});</pre>

<em>app.js</em>
<pre>require(['incrementer'], function(incrementer){<br/>    incrementer(1);<br/>    // 2<br/>});</pre>

---

title: Why AMD?
class: nobackground
build_lists: false

- No module syntax in JS (ie. import, include, etc.)
- Get rid of dependency management through &lt;script&gt; tag order
- Stop littering window with namespaced objects
- Proper representation of objects with added benefit of module closure
- Lazy evaluation and cacheing of references

---

title: AMD Libraries
class: nobackground

- [curl](https://github.com/cujojs/curl)
- [backdraft](http://bdframework.org/bdLoad/demos.html)
- [Yabble](https://github.com/jbrantly/yabble)
- [RequireJS](http://requirejs.org/)
- more…

How they differ:


Mostly their interpretation of the original CommonJS spec - whether they 'return' on module or export, and then any artistic license with how they can make it 'better' and introduce their own keywords

---

title: RequireJS
subtitle: History

- Created by [James Burke](https://twitter.com/jrburke)
- Worked on [Dojo](http://dojotoolkit.org/)'s module loader
- Looking for better dependency management and asynchonous loading for Dojo, began RunJS
- Started to define the [CommonJS Module/Transport/C](http://wiki.commonjs.org/wiki/Modules/Transport/C) spec for browser modules
- Grew into an [AMD](https://github.com/amdjs/amdjs-api/wiki/AMD) specification which, due to politics, broke from CommonJS
- The [RequireJS](http://requirejs.org/) library matured around all of these events

---

title: RequireJS
subtitle: Example
class: nobackground

[http://localhost:3000/01_requirejs_example.html](http://localhost:3000/01_requirejs_example.html)

---

title: RequireJS
subtitle: Plugins
class: nobackground

Loader plugins which allow you to define how to load and treat dependencies.

- [text](https://github.com/requirejs/text), for loading a file as text (templates, lazy eval)
- [i18n](https://github.com/requirejs/i18n), localization, you know, for, like, words and junk

The plugin API and architecture is simple enough that a monkey could make one (shameless plug):

[expose!](https://github.com/bustardcelly/require-expose-plugin) to expose dependencies of loaded module for mocking in tests.


---

title: RequireJS
subtitle: Build
class: nobackground

- uses [r.js](http://requirejs.org/docs/download.html#rjs) tool, can run under NodeJS or within Rhino
- cut down on HTTP requests
- bigger upfront hit, because loading all modules, but smoother experience
- big file load, but lazy instantiation
- still alows for modularity of less-used scripts by end-users

[http://localhost:3000/dist/01_requirejs_example.html](http://localhost:3000/dist/01_requirejs_example.html)

---

title: Cons
subtitle: AMD/RequireJS
class: nobackground

AMD:

- Unneccessary function wrapping in build adds to character count and file size
- Requires the library to interpet the module declarations
- Haters gonna hate async. callbacks are yucky.
- library + build systems such as [browserify](https://github.com/substack/node-browserify) as alternative

RequireJS:

- Because of above
- Since it matured alongside the AMD spec, the history and implementations may be more than what is needed in production (but is why [almond](https://github.com/jrburke/almond) exists)

---

title: ES-Harmony modules
class: nobackground

- currently a proposal for [modules](http://wiki.ecmascript.org/doku.php?id=harmony:modules) in harmony (TC39 approved proposed additions to the specification for ECMAScript)
- not necessarily means it will drop in ES-6, it just gets to wear a medal in purgatory

math.js
<pre>module "math" {<br/> export function add() {<br/>  var values = Array.prototype.slice.call(arguments, 0),<br/>      result = 0;<br/>  while(values.length > 0) {<br/>      result += Number(values.shift());<br/>  }<br/>  return result;<br/> };<br/>};</pre>

---

title: ES-Harmony modules
class: nobackground

incrementer.js
<pre>module "incrementer" {<br/> import {add} from 'math';<br/><br/> export function increment(value) {<br/>  return add(value,1);<br/>};</pre>

---

title: Harmony Module Support
subtitle: today
class: nobackground

- [require-hm](https://github.com/jrburke/require-hm): RequireJS plugin for API described on harmony wiki
- [shephard](http://xcambar.github.com/shepherd-js/): Sugar-based syntax to support ES-Harmony module API
- [es6-module-loader](https://github.com/addyosmani/es6-module-loader/): Library provided API similar to ES-Harmony module proposal. Abandoned for support of require-hm

Without putting words in his mouth, James Burke has stated that the goal of AMD is to provide support until a proper ES.next proposal is adopted and supported in the specification. Once available, AMD should fade away with support to transpile current AMDs to be compliant with ES.next module.
