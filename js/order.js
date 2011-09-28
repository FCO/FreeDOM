function OrderTree() {
   if(OrderTree.id == null) OrderTree.id = 0;
   this.id = OrderTree.id++;
   this.root = null;
}

OrderTree.prototype = {
   _root: null,
   set root(node) {
      if(node == null)
         return;
      node.index = 0;
      this._root = node;
   },
   get root() {
      return this._root;
   },
   get nodes() {
      return this.root.kids + 1;
   },
   put: function(val) {
      if(this._root != null && this.root.value == val)
         return;
      if(val == null)
         return;
         //throw "put must receive a value";
      var new_obj;
      if(typeof(val) == typeof(new OrderNode()) && val.put != null) {
         new_obj = val;
         val = new_obj.value;
      } else {
         new_obj = new OrderNode();
         new_obj.value = val;
      }
      new_obj.bigger = null;
      new_obj.biggest = null;

      if(this.root != null) {
         if(this.root.value > val) {
            new_obj.put(this.root.shift_biggest());
            this.root.smaller = new_obj;
            new_obj.put(this.root);
            this.root = new_obj;
         } else {
            this.root.put(new_obj);
         }
      } else {
         this.root = new_obj;
      }
   },
   print: function(){
      if(this.root != null)
         this.root.print();
   },
   dump: function() {
      if(this.root != null)
         this.root.dump();
   }
};



/*******************************************************/



function OrderNode() {
   if(OrderNode.id == null) OrderNode.id = 0;
   this.id = OrderNode.id++;
   this.bigger  =  null;
   this.biggest =  null;
   this.value   =  null;
   this.smaller =  null;
}

OrderNode.prototype = {
   bigger:  null,
   biggest: null,
   value:   null,
   smaller: null,
   //get bigger() {
   //   return this._bigger;
   //},
   //set bigger(obj) {
   //   if(obj != null) {
   //      this._bigger = obj;
   //      this.bigger.index = this.index + 1;
   //   }
   //},
   //get biggest() {
   //   return this._biggest;
   //},
   //set biggest(obj) {
   //   if(obj != null) {
   //      this._biggest = obj;
   //      this.biggest.index = this.index + obj.kids;
   //   }
   //},
   get kids() {
      var kids = 0;
      if(this.bigger != null) {
         kids++;
         kids += this.bigger.kids;
      }
      if(this.biggest != null) {
         kids++;
         kids += this.biggest.kids;
      }
      return kids;
   },
   get index() {
      if(this._index == null) {
         //if(this.smaller != null) {
         //   this._index = -1;
         //   this.smaller.index = this.smaller.index;
         //}
      }
      return this._index;
   },
   set index(index) {
      window.console.log(this.bigger);
      window.console.log("Setting: " + this.value + " <--- " + index);
      if(this.bigger == null) {
         window.console.log(this.value + " Your bigger is null!");
         return;
      } else {
         window.console.log(this.value + " Your bigger is not null: ", this.bigger);
         this._index = index;
         if(this.bigger != null) {
            this.bigger.index = this.index + 1;
         }
         window.console.log(this.value + " Going to test biggest...");
         if(this.biggest != null){
            window.console.log(this.value + " is going to set index on the biggest");
            window.console.log(this.bigger);
            this.biggest.index = this.index + this.bigger.kids + 2;
         }
      }
   },
   shift_biggest: function() {
      window.console.log(this.value + ": shift_biggest: " + (this.biggest != null ? this.biggest.value : 0));
      if(this.biggest == null && this.bigger == null)
         return null;
      var tmp = this.biggest;
      if(tmp == null) {
         window.console.log("shift: nao tem biggest, pegando o bigger");
         tmp = this.bigger;
         this.bigger = null;
      }
      this.biggest = null;
      var biggest;
      if(this.bigger != null) {
         biggest = this.bigger.shift_biggest();
         if(biggest != null)
            this.put(biggest);
      }
      return tmp;
   },
   put: function(val) {
      var new_obj;
      if(val == null)
         return;
         //throw "put must receive a defined value...";
      if(typeof(val) == typeof(new OrderNode()) && val.put != null) {
         new_obj = val;
         val = new_obj.value;
      } else {
         new_obj = new OrderNode();
         new_obj.value = val;
      }
      if((this.bigger != null && val == this.bigger.value) || (this.biggest && val == this.biggest.value))
         return;
      if(this.bigger != null && this.biggest != null) {
         window.console.log("com ambos");
         if(val > this.biggest.value) {
            window.console.log("val eh maior que biggest");
            this.biggest.put(new_obj);
         } else if(val > this.bigger.value) {
            window.console.log("val eh maior que bigger");
            this.bigger.put(new_obj);
         } else {
            window.console.log("val eh menor que ambos");
            new_obj.bigger  = this.bigger;
            new_obj.biggest = this.bigger.shift_biggest();
            if(new_obj.biggest != null) {
               window.console.log("peguei o biggest do meu bigger");
               new_obj.biggest.smaller = new_obj;
            }
            new_obj.smaller = this;
            this.bigger.smaller = new_obj;
            this.bigger = new_obj;
         }
      } else if(this.bigger != null) {
         window.console.log("com bigger");
         if(val > this.bigger.value) {
            window.console.log("val eh maior que bigger");
            new_obj.smaller = this;
            this.biggest = new_obj;
         } else {
            window.console.log("val eh menor que bigger");
            this.biggest = this.bigger;
            new_obj.smaller = this;
            this.bigger = new_obj;
         }
      } else if(this.biggest != null){
         window.console.log("com biggest");
         throw "This should never ocour";
      } else {
         window.console.log("sem ambos");
         new_obj.smaller = this;
         this.bigger = new_obj;
      }
   },
 
   dump: function(ident, type) {
      if(ident == null) ident = "";
      if(type == null) type = "";
      window.console.log(ident + (this.smaller != null ? this.smaller.value : "") + "- " + type + ": " + this.value);
      if(this.bigger != null)  this.bigger.dump(ident + "  ", "bigger");
      if(this.biggest != null) this.biggest.dump(ident + "  ", "biggest");
   },

   print: function() {
      window.console.log(this.value);
      if(this.bigger != null)  this.bigger.print();
      if(this.biggest != null) this.biggest.print();
   }
};
