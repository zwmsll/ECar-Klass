var isArray = Array.isArray || function(val) {
    return toString.call(val) === '[object Array]';
}

var isFunction = function(val) {
  return toString.call(val) === '[object Function]';
}

var slice = Array.prototype.slice;

var isWindow = function(obj){ 
	return obj != null && obj == obj.window ;
};

var isObject = function(obj){ 
	return type(obj) == "object" ;
};

var isPlainObject = function(obj){
	return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype;
}



function Class(){
}

Class.create = function(Parent,props){
	
	var child,F,i;
	
	if (!isFunction(Parent)) {
		props = Parent;
		Parent = undefined;
	}
	
	props || (props = {});
	Parent || (Parent = props.Extends || Class);
	
	console.log(this);
	
	child = function(){
		
		if (this.constructor === child && this.initialize) {
		  this.initialize.apply(this, arguments)
		}
		
	}
	
	F = function(){};
	F.prototype = Parent.prototype;
	child.prototype = new F();
	child.superclass = Parent.prototype;
	child.prototype.constructor = child;
	
	for(i in props){
		
		if(props.hasOwnProperty(i)){
			child.prototype[i] = props[i];
		}
		
	}
	
	child.extend = Class.extend
	
	return child;
		
}

Class.extend = function(props){
	props || (props = {});
	props.Extends = this;
  	return Class.create(props)
}

function _extend(target, source, deep) {
    for (key in source)
      if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
        if (isPlainObject(source[key]) && !isPlainObject(target[key]))
          target[key] = {}
        if (isArray(source[key]) && !isArray(target[key]))
          target[key] = []
        _extend(target[key], source[key], deep)
      }
      else if (source[key] !== undefined) target[key] = source[key]
}

var extend = function(target){
	var deep, args = slice.call(arguments, 1)
	if (typeof target == 'boolean') {
      deep = target
      target = args.shift()
    }
    args.forEach(function(arg){ _extend(target, arg, deep) })
    return target
}

