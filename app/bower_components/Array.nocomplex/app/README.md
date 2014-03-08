## Array.prototype augmentations - javascript

All helpers are atomised in AMD modules. You can use it for instance with require.js or almond.js.  

You can require juste one, such as map ( `define('myModule', ['Array.freedom/map']);` ) or group exists, such as `Array/basics`, `Array/math` or `Array.freedom/all`

### Basics

Array/basics provide the following :
* map
* collect 
* first
* has
* last
* onEls
* remove
* removeOneValue
* except
* exceptFn
* uniq
* equals

#### map
```javascript
	[10,20].map(function(n) { return n * 2 }); // [20, 40]
```

#### collect 
Such as map, but provide a useful tricks :
```javascript
	[{ name : 'cyril'}, { name : 'piercus'}].collect('name') // ['cyril', 'piercus']
```

#### send
Useful, allow you to call a method on each element of the array
```javascript
[{ callMe : function(arg) { console.log(arg)}}, { callMe : function() { console.log('world')}}].send('callMe', 'hello'); // log 'hello' and then 'world'
```
 
#### where
Return a new array with all found occurences

#### find
Return the first found occurence wich evaluate to true

#### first 
Return array[0]

#### has
Return true if instance has value 
```javascript
['cyril', 'piercus'].has('cyril'); // true
```

#### onEls
Replaces every element of this with f(element)

#### remove
If found, the argument is removed from the array

#### last
Return the last element of the array

#### except
Return a new array without the element that are the same at the argument

#### isIn

#### equals

#### each

### Math

Useful helpers when dealing with geometry.

`Array/math` provide the following : 

* equals
* multiply
* divide
* minus
* add 
* round
* norm

### Authors 
* [Sam Ton That](https://github.com/KspR)
* [Pierre Cole](https://github.com/piercus)
* [Cyril Agosta](https://github.com/cagosta)