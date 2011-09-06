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
      this.children.push(node);
   },
   put_on_path: function(node, path) {
   },
   has_child: function(child_name) {
      for(var i = 0; i < this.children.length; i++) {
         if(this.children[i].name == child_name)
            return true;
      }
      return false;
   },
   kid_path: function(name) {
      var ret = [];
      if(this.has_child(name))
         return [ this.get_child(name).name ];
      for(var i = 0; i < this.children.length; i++) {
         if(this.children[i].has_kid(name)) {
            ret.push(this.children[i].name);
            var tmp = [];
            var tmp_val = this.children[i].kid_path(name);
            if(typeof(tmp_val) == typeof([]))
               tmp = tmp_val;
            else
               tmp.push(tmp_val);
            while(tmp.length > 0) {
               var val = tmp.shift();
               if(val != null)
                  ret.push(val);
            }
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
      for(var i = 0; i < this.children.length; i++) {
         if(this.children[i].has_kid(name, level - 1))
            return true;
      }
      return false;
   },
   get_child: function(child_name) {
      for(var i = 0; i < this.children.length; i++) {
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
         window.console.log("troca? " + (to_subtract(path, possible_array).length + to_add(path, possible_array).length) + " < " + (to_subtract(path, array).length + to_add(path, array).length));
         if((to_subtract(path, possible_array).length + to_add(path, possible_array).length) < (to_subtract(path, array).length + to_add(path, array).length))
            array = possible_array;
      }
      return array;
   },
   //get_partial_paths: function(path) {
   //   var paths = [];
   //   for(var i = 0; i < path.length; i++) {
   //      var every_kid = this.get_every_kid(path[i]);
   //      
   //   }
   //},
   get_closer_path: function(path) {
      var paths = this.get_partial_paths(path);
      var possibilities = [];
      for(var i = 0; i < paths.length; i++){
         var changes = {};
         changes.path = paths[i];
         changes.qtt  = to_subtract(path, paths[i]).length + to_add(path, paths[i]).length;
         possibilities.push(changes)
      }
      return possibilities.sort(function(vi, v2){v1.qtt > v2.qtt})[0];
   },
   get_every_kid: function(name) {
      var paths = [];
      var begin = [];
      if(this.name != null)
         begin.push(this.name);
      for(var i = 0; i < this.children.length; i++) {
         var new_path = clone(begin);
         if(this.children[i].name == name) {
            if(this.name != null)
               paths.push([this.name, name]);
            else
               paths.push([name]);
         } else if(this.children[i].has_kid(name)) {
            var returned_paths = this.children[i].get_every_kid(name);
            for(var j = 0; j < returned_paths.length; j++){
               for(var k = 0; k < returned_paths[j].length; k++){
                  new_path.push(returned_paths[j][k]);
               }
               paths.push(new_path);
            }
         }
      }
      return paths;
   },
   force_partial_path: function(path){
//window.console.log(path);
      var array = [];
      var path_cp = path;
      while(path.length > 0) {
         var first = path.shift();
         var jump_value = path.length;
         if(jump_value < 0)
            jump_value = 0;
         if(this.has_kid(first, jump_value)) {
            var sub_path = this.kid_path(first);
//window.console.log(sub_path);
            var tmp_sub = [];
            if(typeof(sub_path) == typeof([]))
               tmp_sub = sub_path;
            else
               tmp_sub.push(sub_path);
            //array.push(tmp_sub);
            var kid_act_path = [];
            while(tmp_sub.length > 0) {
               var s_tmp = tmp_sub.shift()
               if(s_tmp != undefined)
                  kid_act_path.push(s_tmp);
                  array.push(s_tmp);
            }
            var tmp_str = this.get_path(kid_act_path).partial_path(path);
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
            return array;
         }
      }
   },
   value: null
};
