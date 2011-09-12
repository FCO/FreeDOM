function SubtractionCache() {
   this.cache = {};
}
SubtractionCache.get_instance = function() {
   if(SubtractionCache.instance == null)
      SubtractionCache.instance = new SubtractionCache();
   return SubtractionCache.instance;
}
SubtractionCache.prototype = {
   stringify: function(arr1, arr2) {
      return arr1.join("::") + "-" + arr2.join("::");
   },
   exists: function(arr1, arr2) {
      if(this.cache[this.stringify(arr1, arr2)] != null)
         return true;
   },
   get_cache: function(arr1, arr2) {
      return this.cache[this.stringify(arr1, arr2)];
   },
   set_cache: function(arr1, arr2, resp) {
      this.cache[this.stringify(arr1, arr2)] = resp;
   }
};

function FilterPath() {
   this.array = [];
}

FilterPath.prototype = {
   constructor: "FilterPath",
   set array(arr){
      this.test_order(arr);
      this._array = arr;
   },
   get array() {
      return this._array;
   },
   what_to_add_to_transform_in: function(sub_path){
      if(sub_path.constructor == "FilterPath")
         path = clone(sub_path.array);
      else if(sub_path.constructor() == "String")
         path.push(sub_path);
      else if(sub_path.length != null)
         path = clone(sub_path);
      var ret_path = new FilterPath();
      ret_path.array = clone(to_add(path, this.array));
      return ret_path;
   },
   what_to_subtract_to_transform_in: function(sub_path){
      if(sub_path.constructor == "FilterPath")
         path = clone(sub_path.array);
      else if(sub_path.constructor() == "String")
         path.push(sub_path);
      else if(sub_path.length != null)
         path = clone(sub_path);
      var ret_path = new FilterPath();
      ret_path.array = clone(to_subtract(path, this.array));
      return ret_path;
   },
   number_of_changes_to_transform_in: function(sub_path){
      if(sub_path.constructor == "FilterPath")
         path = clone(sub_path.array);
      else if(sub_path.constructor() == "String")
         path.push(sub_path);
      else if(sub_path.length != null)
         path = clone(sub_path);
      return to_add(path, clone(this.array)).length + to_subtract(path, clone(this.array)).length;
   },
   toString: function() {
      return this.string;
   },
   set string(str) {
      this.array = str.split("::");
   },
   get string() {
      return this.array.join("::");
   },
   push: function(sub_path){
      var path = [];
      if(sub_path.constructor == "FilterPath")
         path = clone(sub_path.array);
      else if(sub_path.constructor() == "String")
         path.push(sub_path);
      else if(sub_path.length != null)
         path = clone(sub_path);
      while(path.length > 0)
         this.array.push(path.shift());
      this.test_order(this.array);
   },
   shift: function() {
      return this.array.shift();
   },
   clone: function() {
      var clone = new FilterPath();
      clone.string = this.string;
      return clone;
   },
   set_base: function(path) {
      var my_path;
      if(path.constructor == "FilterPath"){
         my_path = clone(path.array);
      } else {
         my_path = clone(path);
         var tmp = new FilterPath();
         tmp.array = path;
         path = tmp;
      }
      while(my_path.length > 0) {
         var val = my_path.pop();
         if(val > this.array[0])
            throw "Base (" + path.string + ") should be smaller than the path (" + this.string + ")";
         this.array.unshift(val);
      }
   },
   test_order: function(array) {
      var last;
      for(var i = 0; i < array.length; i++) {
         if(last != null && last >= array[i])
            this.die_by_order(array);
         last = array[i];
      }
      return true;
   },
   die_by_order: function(array) {
      throw "The array (" + array.join(", ") + ") should be a ordered array";
   },
   get length() {
      return this.array.length;
   }
};

function clone(arr){
   var tmp = [];
   for(var i = 0; i < arr.length; i++)
      tmp.push(arr[i]);
   return tmp;
}

function to_subtract(desired, existed) {
   return subtract_array(existed, desired);
}

function to_add(desired, existed) {
   return subtract_array(desired, existed);
}

function subtract_array(arr1, arr2) {
   var cache = SubtractionCache.get_instance();
   if(cache.exists(arr1, arr2)) {
    return cache.get_cache(arr1, arr2);
   }
   var ret = [];
   for(var i = 0; i < arr1.length; i++){
      var put = true;
      for(var j = 0; j < arr2.length; j++){
         if(arr1[i] == arr2[j])
            put = false;
      }
      if(put)
         ret.push(arr1[i]);
   }
   cache.set_cache(arr1, arr2, ret);
   return ret
}



function FilterNode() {
   if(FilterNode.id == null)
      FilterNode.id = 1;
   this.id = FilterNode.id++;
   this.children = [];
   this.name = null;
   this.value = null;
}

FilterNode.prototype = {
   children: [],
   name: null,
   put_child: function(node) {
      node.parent = this;
      for(var i = 0; i < this.children.length; i++){
         if(this.children[i].name > node.name){
            this.children.splice(i, 0, node);
            return;
         }
      }
      this.children.push(node);
   },
   put_on_path: function(node, path) {
   },
   has_child: function(child_name) {
      for(var i = 0; i < this.children.length && this.children[i].name <= child_name; i++) {
         if(this.children[i].name == child_name)
            return true;
      }
      return false;
   },
   kid_path: function(name) {
      var ret = new FilterPath();
      if(this.has_child(name)) {
         var path = new FilterPath();
         path.push([ this.get_child(name).name ]);
         return path;
      }
      for(var i = 0; i < this.children.length; i++) {
      //for(var i = 0; i < this.children.length && this.children[i].name <= name; i++) {
         if(this.children[i].has_kid(name)) {
            ret.push(this.children[i].name);
            var tmp = [];
            var tmp_val = this.children[i].kid_path(name);
            if(typeof(tmp_val) == typeof([]))
               tmp = tmp_val;
            else
               tmp.push(tmp_val);
            ret.push(val);
            return ret;
         }
      }
      return false;
   },
   has_kid: function(name, level) {
      if(this.has_child(name))
         return true;
      if(level == null)
         level = -1;
      if(level == 0)
         return false;
      for(var i = 0; i < this.children.length && this.children[i].name <= name; i++) {
         if(this.children[i].has_kid(name, level - 1))
            return true;
      }
      return false;
   },
   get_child: function(child_name) {
      for(var i = 0; i < this.children.length && this.children[i].name <= child_name; i++) {
         if(this.children[i].name == child_name)
            return this.children[i];
      }
   },
   get number_of_child() {
      return this.children.length;
   },
   get kids() {
      var soma = 0;
      for(var i = 0; i < this.children.length; i++) {
         soma += this.children[i].number_of_child + 1;
      }
      return soma;
   },
   has_path: function(path) {
      var first = path.shift();
      if(first == null)
         return true;
      if(! this.has_child(first))
         return false;
      return this.get_child(first).has_path(path);
   },
   get_path: function(path) {
      var first = path.shift();
      if(first == null)
         return this;
      if(! this.has_child(first))
         return null;
      return this.get_child(first).get_path(path);
   },
   partial_path: function(path) {
      var array = [];
      var path_cp = [];
      for(var i = 0; i < path.length; i++)
         path_cp.push(path[i]);
      while(path.length > 0) {
         var first = path.shift();
         if(this.has_child(first)) {
            var child = this.get_child(first);
            array.push(child.name);
            var tmp_str = child.partial_path(path);
            var tmp = [];
            if(typeof(tmp_str) == typeof([]))
               tmp = tmp_str;
            else
               tmp.push(tmp_str);
            while(tmp.length > 0) {
               var f_tmp = tmp.shift()
               if(f_tmp != undefined)
                  array.push(f_tmp);
            }
         }
      }
      if(array.length == 0) {
         var tmp = this.force_partial_path(path_cp);
         var stmp = [];
         if(typeof(tmp) == typeof([])) {
            stmp = tmp;
         } else {
            stmp.push(tmp);
         }
         for(var i = 0; i < stmp.length; i++)
            array.push(stmp[i]);
      }
      if(to_add(path_cp, array).length < path_cp.length) {
         var path = [];
         for(var i = 0; i < path_cp.length; i++)
            path.push(path_cp[i]);
         var tmp = this.force_partial_path(path_cp);
         var stmp = [];
         var possible_array = [];
         if(typeof(tmp) == typeof([])) {
            stmp = tmp;
         } else {
            stmp.push(tmp);
         }
         for(var i = 0; i < stmp.length; i++)
            possible_array.push(stmp[i]);
         //window.console.log("troca? " + (to_subtract(path, possible_array).length + to_add(path, possible_array).length) + " < " + (to_subtract(path, array).length + to_add(path, array).length));
         if((to_subtract(path, possible_array).length + to_add(path, possible_array).length) < (to_subtract(path, array).length + to_add(path, array).length))
            array = possible_array;
      }
      return array;
   },
   get_partial_paths: function(path) {
      var paths = [];
      var obj_path;
      if(path.constructor == "FilterPath") {
         obj_path = path.clone();
      } else {
         obj_path = new FilterPath();
         obj_path.array = clone(path);
      }
      var first = obj_path.shift();

      var kids = this.get_every_kid(first);
      if(obj_path.length <= 0) {
         return kids;
      }
      var kids2path = clone(kids);
      while(kids2path.length > 0)
         paths.push(kids2path.shift());
      for(var i = 0; i < kids.length; i++) {
         var internal_kids = this.get_path(kids[i].clone()).get_partial_paths(obj_path);
         for(var j = 0; j < internal_kids.length; j++) {
            var kid = kids[i].clone();
            internal_kids[j].set_base(kid);
            paths.push(internal_kids[j]);
         }
      }
      return paths;
   },
   get_closer_path: function(path) {
      var paths = this.get_partial_paths(path);
      var min = null;
      var closer;
      for(var i = 0; i < paths.length; i++){
         var changes = paths[i].number_of_changes_to_transform_in(path);
         if(min == null || min > changes){
            min = changes;
            closer = paths[i];
         }
      }
      return closer;
   },
   way_to_get_path: function(path) {
      var closer = this.get_closer_path(path);
      var str = "";
      var close = "";
      var to_add = closer.what_to_add_to_transform_in(path);
      var to_sub = closer.what_to_subtract_to_transform_in(path);
      if(to_add.length > 0 && to_sub > 0) {
         str   += "( ";
         close += " )";
      }
      str += closer;
      if(to_add.length > 0) {
         str += " + " + this.way_to_get_path(to_add);
      }
      str += close;
      if(to_sub.length > 0) {
         str += " - " + this.way_to_get_path(to_sub);
      }
      return str;
   },
   get_every_kid: function(name) {
      var paths = [];
      if(this.has_child(name)){
         var tmp = new FilterPath();
         tmp.push([name]);
         paths.push(tmp);
      }
      for(var i = 0; i < this.children.length && this.children[i].name <= name; i++){
         if(this.children[i].has_kid(name)) {
            var kids = this.children[i].get_every_kid(name);
            for(var j = 0; j < kids.length; j++) {
               var base_path = new FilterPath();
               base_path.push([ this.children[i].name ]);
               base_path.push(kids[j]);
               paths.push(base_path);
            }
         }
      }
      return paths
   },
   'parent': null,
   set func_to_add(func){
      this._func_to_add = func;
   },
   get func_to_add(){
      if(this._func_to_add != null)
         return this._func_to_add;
      if(this.parent != null)
         this._func_to_add = this.parent.func_to_add;
      return this._func_to_add;
   },
   set func_to_subtract(func){
      this._func_to_subtract = func;
   },
   get func_to_subtract(){
      if(this._func_to_subtract != null)
         return this._func_to_subtract;
      if(this.parent != null)
         this._func_to_subtract = this.parent.func_to_subtract;
      return this._func_to_subtract;
   },
   get_value_from_path: function(path){
      var ret;
      var closer = this.get_closer_path(path);
      var to_add = closer.what_to_add_to_transform_in(path);
      var to_sub = closer.what_to_subtract_to_transform_in(path);
      ret = closer;
      window.console.log("closer: " + closer + "; to_add: " + to_add + "; to_sub: " + to_sub);
      if(to_add.length > 0 && this.func_to_add != null) {
         ret = this.func_to_add(ret.clone(), this.get_value_from_path(to_add.clone()));
      }
      if(to_sub.length > 0 && this.func_to_subtract != null) {
         ret = this.func_to_subtract(ret.clone(), this.get_value_from_path(to_sub.clone()));
      }
      return ret;
   },
   value: null
};
