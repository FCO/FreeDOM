
function TableSpace() {
   if(TableSpace.id == null)
     TableSpace.id = 0;
   this.id = TableSpace.id++;
   this.tables = {};
}

TableSpace.prototype = {
   create_table: function(name, cols){
      if(this.has_table(name))
         throw "Table '" + name + "' already exists.";
      return this.tables[name] = new CacheOfCaches(cols);
   },
   get_table: function(name){
      return this.tables[name];
   },
   create_temp_table_space: function() {
      return new TableSpace();
   },
   has_table: function(name) {
      if(this.tables[name] != null)
         return true;
      return false;
   },
   insert_table: function(name, table) {
      if(this.has_table(name))
         throw "Table '" + name + "' already exists.";
      return this.tables[name] = table;
   },
   error_if_table_doesnt_exist: function(table) {
      if(! this.has_table(table))
         throw "Table '" + table + "' does not exist.";
   },
   insert: function(table, data) {
      this.error_if_table_doesnt_exist(table);
      this.get_table(table).push(data);
   },
   select: function(line_format, base_tables, filters){
      var tmp_ts  = this.create_temp_table_space();
      var caches = [];
      for(var name in base_tables) {
         this.error_if_table_doesnt_exist(name);
         var alias = base_tables[name];
         if(alias == "" || alias == null)
            alias = name;
         tmp_ts.insert_table(alias, this.get_table(name));
         var tmp_cache = tmp_ts.get_table(alias).get_filter({});
         tmp_cache.select_cols = line_format[alias];
         caches.push(tmp_cache);
      }
      //var caches = [];
      //for(var table in filters) {
      //   caches.push();
      //}
      //tmp_ts.cartezian()
   // [{table1:alias1}, {table2:alias2}, {table1:alias1}]
      return tmp_ts.cartezian(caches);
   },
   transform_filter: function(tree) {
      if(tree.table != null && tree.col != null) {
         var ret = {};
         ret[tree.table] = {};
         ret[tree.table][tree.col] = this.get_table(tree.table).get_filter_options(tree.col);
         return ret;
      }
      var arrays = [];
      for(var key in tree) {
         var arr_values = [];
         for(var i = 0; i < tree[key][col].length; i++) {
            arr_values.push(tree[key][col][i])
         }
         arrays.push(arr_values);
      }
      var arr_rets = Functions.get_instance().operation(key, arr_values);
      var ret = {};
      for(var key in tree) {
         ret[key] = {};
         for(var col in tree[key]) {
            ret[key][col] = arr_rets.shift();
         }
      }
      return ret;
   },
   cartezian: function(arr_caches){
      var first = arr_caches.shift();
      var last;
      if(first == null)
         return;
      if(arr_caches.length < 1)
         return first;
      if(arr_caches.length > 1)
         last = this.cartezian(arr_caches);
      else
         last = arr_caches.shift();
      return this.return_cartezian(first, last);
   },
   return_cartezian: function(tmp1, tmp2) {
      var res = new Cache();
      tmp1.reset();
      this._cartezian(res, tmp1, tmp2);
      return res;
   },
   _cartezian: function(obj, cache1, cache2) {
      var _this = this;
      var time2wait = 0;
      cache1.operational_when_line(function(line1){
         if(line1 != null) {
            var data = {};
            var columns1 = cache1.select_cols;
            for(var i in columns1){
               var alias = columns1[i];
               if(alias == "" || alias == null)
                  alias = i;
               data[alias] = line1.get_column(i);
            }
            setTimeout(function(){_this._cartezian2part(obj, data, cache2)}, 0);
         } else {
            cache1.redo();
            time2wait = 1000;
         }
         setTimeout(function(){_this._cartezian(obj, cache1, cache2)}, time2wait);
      });
   },
   _cartezian2part: function(obj, line1, cache2, line){
      var _this = this;
      if(line == null)
         line = 0;
      var time2wait = 0;
      cache2.wait_for_line(line++, function(line2){
         if(line2 != null) {
            var new_line = new SortLine();
            var data = {};
            for(var i in line1)
               data[i] = line1[i];
            var columns2 = cache2.select_cols;
            for(var key in columns2) {
               var alias = columns2[key];
               if(alias == "" || alias == null)
                  alias = key;
               data[alias] = line2.get_column(key);
            }
            new_line.set_data(data);
            obj.push(new_line);
         } else {
            line--;
            time2wait = 1000;
         }
         setTimeout(function(){_this._cartezian2part(obj, line1, cache2, line)}, time2wait);
      }, true);
   },
};

function Functions() {
}

Functions.get_instance = function(){
   if(Functions._instance == null)
      Functions._instance = new Functions();
   return Functions._instance;
};

Functions.prototype = {
   operation: function(operation, array) {
      var first = array.shift();
      var last;
      if(array.length < 1)
         throw "Array's length should gretter or equal of 2";
      if(array.length > 1)
         last = this.operation(operation, array);
      else
         last = array.shift();
      return this[operation](first, last);
   },
   loop_test: function(array1, array2, test){
      var resp1 = [];
      var resp2 = [];
      var c1 = {};
      var c2 = {};
      for(var i = 0; i < array1.length; i++)
         for(var j = 0; j < array2.length; j++)
            if(test(array1[i], array2[j])) {
               if(c1[array1[i]] == null) {
                  c1[array1[i]] = true;
                  resp1.push(array1);
               }
               if(c2[array2[j]] == null) {
                  c2[array2[j]] = true;
                  resp2.push(array2);
               }
            }
      return [c1, c2];
   },
   eq: function(array1, array2) {
      return loop_test(function(val1, val2){
         return val1 == val2;
      });
   },
   ne: function(array1, array2) {
      return loop_test(function(val1, val2){
         return val1 != val2;
      });
   },
};

function Type(type, size, nullable){

   this.type     = type;
   this.size     = size;
   this.nullable = nullable;

   var type = {
      number:  function(val) {
         return (val + "").match(/^\d*(\.\d+)?$/);
      },
      integer: function(val) {
         return (val + "").match(/^\d*$/);
      },
      real:    function(val) {
         return (val + "").match(/^\d*(\.\d+)?$/);
      },
      varchar: function(val){
         return true;
      },
   };

   var size = {
      number:  function(val) {
         return true;
      },
      integer: function(val) {
         return true;
      },
      real:    function(val) {
         return true;
      },
      varchar: function(val){
         return val.length <= this.size;
      },
   };

   if(type[this.type] == null) {
      throw "Type '" + this.type + "' does not exist.";
   }

   this.type_test = type[this.type];
   this.size_test = size[this.type];

   if(! nullable) {
      this.nullable_test = function(val){if(val === null) return false; return true};
   } else {
      this.nullable_test = function(val){return true};
   }

   
}

Type.prototype = {
   test: function(name, val) {
      if(!this.type_test(val)){
         throw "'" + name + "': type error. Type: [" + this.type + "] Value: [" + val + "]";
      }
      if(!this.size_test(val)){
         throw "'" + name + "': size error. Size: [" + this.size + "] Value: [" + val + "]";
      }
      if(!this.nullable_test(val)){
         throw "'" + name + "' cannot be null.";
      }
   }
};
