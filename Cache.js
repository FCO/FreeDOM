/**

=pod

=head1 NAME

Cache.js

=head1 SAMPLE

  <html>
    <head>
      <script src="./Cache.js"></script>
      <script>
        function get_table() {
          return document.getElementById("sortable");
        }
        function my_load(){
          var sortabletable = new SortTable();
          var my_table      = get_table();
          sortabletable.transform2sortable(my_table);
          my_table.draw_loop();
          my_table.set_lines_per_page(10);
          my_table.onChangePage = function(page_num){
            document.getElementById("page_num").innerHTML = page_num;
          };
        }
        function populate() {
          var my_table = get_table();
          for(var i = 0; i < 100; i++) {
            for(var j = 0; j < 100; j++) {
               var tmp_line = {};
               tmp_line.col0 = i + " - " + j;
               tmp_line.col1 = Math.floor(Math.random() * 100);
               tmp_line.col2 = Math.floor(Math.random() * 100);
               tmp_line.col3 = Math.floor(Math.random() * 100);
               tmp_line.col4 = Math.floor(Math.random() * 100);
               tmp_line.col5 = Math.floor(Math.random() * 100);
               tmp_line.col6 = Math.floor(Math.random() * 100);
               tmp_line.col7 = Math.floor(Math.random() * 100);
               tmp_line.col8 = Math.floor(Math.random() * 100);
               tmp_line.col9 = Math.floor(Math.random() * 100);
               my_table.push(tmp_line);
            }
          }
        }
        function filter(filter) {
          var my_table = get_table();
          my_table.set_filter(filter);
        }
      </script>
    </head>
    <body onload="my_load(); populate();">
      <table id="sortable" border=1></table>
      <a onclick="get_table().prev_page()">Prev Page</a>
      | [
      <span id="page_num"></span>
      ] |
      <a onclick="get_table().next_page()">Next Page</a>
      <br />
      <br />
      <br />
      <input type="text" name="filter" id="input_filter">
      <br />
      Escreva seu filtro (por exemplo: {"col0": ["0 - 0", "0 - 1", "9 - 0", "9 - 1"]})
      <br />
      <button onclick="filter(JSON.parse( document.getElementById('input_filter').value))">
      OK
      </button>
    </body>
  </html>

=head1 API Externa

Aqui serão descritas as classes contidas nesse arquivo

=head2 SortTable

Classe que faz a transformação de uma tabela comum da C<DOM> numa tabela ordenavel-filtravel

=head3 Descrição

Representa uma tabela ordenável-filtrável e converte tabelas comuns (C<DOM>) para uso como tal.

=head3 transform2sortable(C<DOMTableObject> | C<jQueryTableObject>)

=head4 Recebe

C<DOMTableObject> : Um objeto DOM tabela pré-existente.

C<jQueryTableObject> : Um objeto jQuery contendo unicamente uma tabela.

=head4 Retorna

C<void>

=head4 Descrição

Embute métodos referentes à tabela ordenável-filtrável diretamente na DOM da tabela.

Os métodos são os listados no tópico DOMTable

=head2 DOMTable

Metodos e eventos adicionados ao objeto C<DOM> da tabela atravéz do metodo C<transform2sortable>

=head3 push(C<data>)

=head4 Recebe

C<data> : Um C<hash> ou C<array> de C<hashes>

=head4 Retorna

C<void>

=head4 Descrição

Recebe um C<hash> ou C<array> de C<hashes> contendo em cada chave o nome de uma coluna e o valor do dado naquela coluna.
Se um C<array> de C<hashes> for passado para C<push()>, todas as entradas serão incluídas na tabela.

  table.push([{col1: "valor1", col2: "valor2} , {col1: "valor3", col2: "valor4"} ] );

=head3 draw()

=head4 Recebe

C<void>

=head4 Retorna

C<void>

=head4 Descrição

Desenha a tabela no momento em que é chamado.

=head3 draw_loop()

=head4 Recebe

C<void>

=head4 Retorna

C<void>

=head4 Descrição

Inicia um loop assíncrono que, a cada laço, redesenha a tabela em tela.

=head3 getPage()

=head4 Recebe

C<void>

=head4 Retorna

Um valor inteiro representando a página atual exibida pela tabela.

=head4 Descrição

Função utilizada para obter a página exibida na representação atual.

A primeira página é representada pelo valor C<1>.

=head3 prev_page()

=head4 Recebe

C<void>

=head4 Retorna

C<void>

=head4 Descrição

Retrocede uma página na exibição, fazendo a tabela exibir a página anterior à atual.

=head3 next_page()

=head4 Recebe

C<void>

=head4 Retorna

C<void>

=head4 Descrição

Avança uma página na exibição, fazendo a tabela exibir a página posterior à atual.

=head3 goto_page(C<page>)

=head4 Recebe

C<page> : Um argumento do tipo inteiro.

=head4 Retorna

C<void>

=head4 Descrição

Avança ou retrocede páginas, fazendo a tabela exibir a página correspondente à C<page>.

=head3 set_lines_per_page(C<lines_per_page>)

=head4 Recebe

C<lines_per_page> : Um argumento do tipo inteiro

=head4 Retorna

C<void>

=head4 Descrição

Altera a quantidade de linhas exibidas a cada página para C<lines_per_page>

=head3 set_filter(C<filter>)

=head4 Recebe

C<filter> : Um hash no formato especificado abaixo

=head4 Retorna

C<void>

=head4 Descrição

Filtra a tabela a partir dos dados passados no C<hash> C<filter>. O C<hash> deve ser estrutrado da seguinte forma:

Cada chave é o nome de uma coluna e cada valor é um C<array> com os valores daquela coluna selecionados pelo filtro.

  {col1: ["valor1", "valor2"], col2: ["valor3", "valor4"]}
  
  // filtrando a tabela pelas colunas "col1" e "col2",
  // sendo que só mostrará linhas onde
  // o valor da coluna "col1" seja "valor1" ou "valor2"
  // e o valor da coluna "col2" seja "valor3" ou "valor4"

=head3 when_filter_options(C<col>, C<callback>)

=head4 Recebe

C<col> : Uma C<string> contendo o nome de uma coluna

C<callback> : Uma função a ser executada. 

=head4 Retorna

C<void>

=head4 Descrição

Seleciona C<callback(options)> para ser invocada quando filtros forem aplicados ou dados forem inseridos, de modo que altere
os valores atualmente contidos e não filtrados na coluna de name C<col>

C<callback(options)> será chamada recebendo um C<array> com todos os valores contidos na coluna após a inserção/filtragem.

=head3 set_columns(C<columns>)

=head4 Recebe

C<columns> : Um C<array> de C<string>s

=head4 Retorna

C<void>

=head4 Descrição

Altera a tabela para que exiba as colunas selecionadas em C<columns>, na ordem em que foi passado. 

Essa alteração só surtirá efeito após uma chamada explícita ao método C<draw()> ou, um ciclo da função C<draw_loop()>

=head3 sort_by_column(C<col>)

B<Não Implementada>

=head3 Evento onStartPushing

=head4 Descrição

Uma função deve ser atribuída a C<onStartPushing>. Essa função será chamada toda vez que algum valor for C<push()>ed

  table.onStartPushing = function(){ window.console.log("pushing something"); }

=head3 Evento onStopPushing

=head4 Descrição

Uma função deve ser atribuída a C<onStopPushing>. Essa função será chamada toda vez que o processamento de C<push()> terminar

  table.onStopPushing = function(){ window.console.log("something has been pushed"); }

=head1 Classes Internas

=cut

*/

function get_dom(obj) {
   if(obj.get != null) {
      return obj.get(0);
   }
   return obj;
}

function SortTable(){
   if(SortTable.id == null)
      SortTable.id = 1;
   this.id = SortTable.id++;
}

SortTable.prototype = {
   columns:        [""],
   all_columns:    [],
};

SortTable.prototype.transform2sortable = function(table) {
   
   table = get_dom(table);
   table.draw_loop = function(){
      var _this = this;
      setInterval(function(){_this.draw()}, 100);
   };
   table.cache_of_caches = new CacheOfCaches();
   table.cache_of_caches.table = table;
   table.all             = table.cache_of_caches.get_filter({});
   table.filter          = {};
   table.jsid = this.id;
   var lines = table.getElementsByTagName("tr");
   table.lines_per_page = lines.length >= 0 ? 30 : lines.length;
   var ths = table.getElementsByTagName("th");
   if(table.columns == null) table.columns = [];
   if((table.columns.length > 0 || (table.columns.length == 1 && table.columns[0] == "")) && ths.length > 0) {
      for(var i = 0; i < ths.length; i++){
         table.columns.push(ths[i].innerHTML);
      }
   } else if(table.columns.length > 0 || (table.columns.length == 1 && table.columns[0] == "")) {
      table.columns = this.columns;
      var tr = document.createElement("tr");
      for(var i = 0; i < this.columns.length; i++){
         var th = document.createElement("th");
         th.innerHTML = this.columns[i];
         tr.appendChild(th);
      }
   }
   if(table.columns.length == 0) table.columns = [""];
   table.when_filter_options = function(col, callback) {
      var _this = this;
      //setInterval(function(){
         var options = _this.get_cache().get_filter_options(col);
         callback(options);
      //}, 500);
   };
   table.set_lines_per_page = function(lines) {
      this.lines_per_page = lines;
      //this.draw();
   },
   table.set_filter = function(filter) {
      this.goto_page(0);
      this.last_filter = this.filter;
      this.filter = filter;
      //this.draw();
   };
   table.make_skell = function() {
      this.innerHTML = "";
//window.console.log("make_skell");
      for(var i = 0; i < this.lines_per_page; i++) {
//window.console.log("new line");
         var tr = document.createElement("tr");
         tr.table = this;
         tr.make_skell = function(data) {
            this.innerHTML = "";
            for(var j = 0; j < this.table.columns.length; j++){
               var td = document.createElement("td");
               this.appendChild(td);
            }
         };
         tr.set_data = function(data) {
            var cols = this.getElementsByTagName("td");
            for(var i = 0; i < cols.length; i++){
               if(data != null && data.length >= 0) cols[i].innerHTML = data.shift();
               else cols[i].innerHTML = "";
            }
         };
         tr.make_skell();
         this.appendChild(tr);
      }
   };
   table.get_cache = function(){
      //return this.sort.cache_of_caches.get_filter(this.filter);
      //return this.sortCache;
      return this.cache_of_caches.get_filter(this.filter);
      //return this.cache_of_caches.get_filter({});
   };

   table.getPage = function(){
      return this.page + 1;
   };

   table.draw = function() {
      if(this.page == null) this.page = 0;
      this.make_skell();
      this.goto_page(this.page);
      if(this.onDraw != null && typeof(this.onDraw) == typeof(function(){})) {
         this.onDraw();
      }
      if(this.page != this._last_page) {
         if(this.onChangePage != null && typeof(this.onChangePage) == typeof(function(){})) {
            this.onChangePage(this.getPage());
         }
         this._last_page = this.page;
      }
   };
   table.prev_page = function() {
      if(this.page - 1 >= 0) this.goto_page(this.page - 1);
   };
   table.next_page = function() {
      if(this.get_cache().lines.length / this.lines_per_page > this.page + 1) this.goto_page(this.page + 1);
   };
   table.gotoPage = function(page) {
      return this.goto_page(page - 1);
   };
   table.goto_page = function(page) {
      this.page = page;
      var page_data = this.get_cache();
      if(page_data != null)
         page_data.current_line = this.page * this.lines_per_page;
      var lines = this.getElementsByTagName("tr");
      for(var h = 0; h < lines.length; h++){
         var _this = this;
         var actual_line = lines[h];
         if(page_data != null)
            page_data.when_line(function(line){
               if(line != null)
                  actual_line.set_data(line.get_values(_this.columns));
               else {
                  var empty = [];
                  for(var j = 0; j < _this.columns.length; j++) empty.push("");
                  actual_line.set_data(empty);
               }
            });
      }
   };
   table.push = function(data) {
      //window.console.log(data);
      this.cache_of_caches.push(data);
      //this.sortCache.push(data);
      if(this.columns.length <= 0 || (this.columns.length == 1 && this.columns[0] == "")) {
         var columns_proto = [];
         var obj = data;
         if(data.length != null)
            obj = data[0];
         for(var key in obj) {
            columns_proto.push(key);
         }
         this.set_columns(columns_proto);
      }
   };
   table.sort_by_column = function(col) {
      this.sort_by = col;
      //this.draw();
   },
   table.set_columns = function(columns) {
      this.columns = columns;
      this.sort_by_column(columns[0]);
      this.make_skell();
   };
   table.set_lines_per_page(10);
   //table.make_skell();
   //table.draw();
}

/**

=pod

=head2 Cache

O cache é um conjunto de linhas da tabela.

=head3 Cache()

=head4 Recebe

C<void>

=head4 Retorna

C<Cache Object> : Um novo objeto da classe Cache

=head4 Descrição

O método Cache() é o construtor.

=cut

**/

function Cache() {
   if(Cache.id == null)
      Cache.id = 1;
   this.id                = Cache.id++;
   this.processing        = false;
   this.buffer            = [];
   this.lines             = [];
   this.push_thread_id    = null;
   this.current_line      = 0;
   this.column_lines      = {};
   this.export_filters_to = null;
   this.filter_name       = null;
   this.options           = {};
   this.null_lines        = 0;
}

Cache.prototype = {

/**

=pod

=head3 get_filter_options(C<column>)

=head4 Recebe

C<column> : C<string> representando o nome de uma coluna.

=head4 Retorna

C<array> : Um C<array> com todas as opções de valor daquela coluna

=head4 Descrição

O método C<get_filter_options> quando chamado ele retornará todos os valores a serem mostrados
na coluna cujo o nome foi passado como parâmetro.

=cut

**/

   get_filter_options: function(column) {
      var tmp = [];
      for(var key in this.options[column])
         tmp.push(key);
      return tmp;
   },

/**

=pod

=head3 get_exported_filters(C<bridge>)

=head4 Recebe

C<bridge> : C<obj> a ser chamado no evento de exportação de cache.

=head4 Retorna

C<obj> : Retorna o próprio objeto recebido

=head4 Descrição

O método C<get_exported_filters> seta um objeto a ser chamado no caso de filtros serem exportados.

=cut

**/
   
   get_exported_filters: function(bridge) {
      if(bridge == null) bridge = {};
      this.export_filters_to = bridge;
      return bridge;
   },

/**

=pod

=head3 length()

=head4 Recebe

C<void> 

=head4 Retorna

C<inteiro> : Inteiro maior ou igual a zero.

=head4 Descrição

O método C<length> retorna a quantidade de linhas do cache.

=cut

**/
   
   length: function() {
      return this.lines.length;
   },
   
/**

=pod

=head3 push(C<data>)

=head4 Recebe

C<data> : um C<hash> ou um C<array> de C<hash>es

=head4 Retorna

C<void>

=head4 Descrição

O método C<push> insere uma ou mais linhas no cache. Recebe essas linhas como um C<hash>
onde cada chave contém o nome da coluna e cada valor o valor dessa coluna, ou um C<array> desses C<hash>es

=cut

**/

   push: function(data){
      var _this = this;
      setTimeout(function(){
         if(_this.onStartPushing != null && typeof(_this.onStartPushing) == typeof(function(){})) {
            _this.onStartPushing();
         }
      }, 0);
      if(typeof(data) == typeof({}) && data.length == null) {
         this.buffer.push(data);
      } else {
         for(var i = 0; i < data.length; i++)
            this.buffer.push(data[i]);
      }
      if(this.push_thread_id == null) {
         var _this = this;
         
         setTimeout(function(){
            _this.push_thread();
         }, 0);

         this.push_thread_id = setInterval(function(){
            if(_this.buffer.length > 0) {
         //      _this.push_thread();
            } else {
               clearInterval(_this.push_thread_id);
               _this.push_thread_id = null;
              if(_this.onStopPushing != null && typeof(_this.onStopPushing) == typeof(function(){})) {
                 _this.onStopPushing();
              }
            }
         }, 0);
      }
   },

/**

=pod

=head3  push_thread()

=head4 Recebe

C<void>

=head4 Retorna

C<do_it_again> : variável que contém um booleano C<false> utilizado quando não há mais nada no buffer.

=head4 Descrição

O método C<push_thread> fica executando enquanto há informação no buffer e retira-a do buffer e a joga nas linhas 
das tabelas.

=cut

**/
   
   push_thread: function() {
      if(this.buffer.length > 0) {
         var _this = this;
         setTimeout(function(){
            _this.push_thread();
         });
      }

      while(this.buffer.length > 0) {
         var line = this.buffer.shift();
         if(line != null) {
            var line_obj
            if(line.get_data != null)
               line_obj = line;
            else {
               line_obj = new SortLine();
               line_obj.set_data(line);
            }
            this.insert(line_obj);
            do_it_again = true;
         } else {
            return false;
         }
      }

      //if(this.number_of_threads == null) this.number_of_threads = 0;
      //this.number_of_threads++;
      //window.console.log("pushpush_thread()");
      //var do_it_again = false;
      //if(this.buffer.length > 500) {
      //   var _this = this;
      //   setTimeout(function(){
      //      _this.push_thread();
      //   }, 0);
      //}
      //for(var i = 0; i < 200; i++) {
      //   var line = this.buffer.shift();
      //   if(line != null) {
      //      var line_obj
      //      if(line.get_data != null)
      //         line_obj = line;
      //      else {
      //         line_obj = new SortLine();
      //         line_obj.set_data(line);
      //      }
      //      this.insert(line_obj);
      //      do_it_again = true;
      //   } else {
      //      this.number_of_threads--;
      //      return false;
      //   }
      //}
      //this.number_of_threads--
      //return do_it_again;
   },
   
/**

=pod

=head3  insert(C<line>)

=head4 Recebe

C<line> : recebe uma linha do cache

=head4 Retorna

C<void>

=head4 Descrição

Insere a linha recebida no cashe.

=cut

**/

   insert: function(line){
      var _this = this;
      setTimeout(function(){_this.filter_process(line)}, 0);
      this.lines.push(line);
   },
   
/**

=pod

=head3  filter_process(C<line>)

=head4 Recebe

C<line> : recebe as linhas do cache

=head4 Retorna

C<void>

=head4 Descrição

conta a quantidade de valores em cada coluna.

=cut

**/
   
   filter_process: function(line) {
      if(this.export_filters_to)
         this.export_filter(line)
      for(var i = 0; i < line.all_columns().length; i++) {
         var col = line.all_columns()[i];
         if(this.options[col] == null)
            this.options[col] = {};
         if(this.options[col][line.get_column(col)] == null)
            this.options[col][line.get_column(col)] = 0;
         this.options[col][line.get_column(col)]++;
      }
   },

   //put_on_index: function(line, index){
   //   //window.console.log(this.id + ":  adding: " + line.id);
   //   this.insert(line);
   //   //this.filter_process(line);
   //   //if(line == null) {
   //   //   this.null_lines++;
   //   //   return;
   //   //}
   //   //this.lines[index - this.null_lines] = line;
   //},

/**

=pod

=head3  export_filter(C<line>)

=head4 Recebe

C<line> : recebe as linhas do cache

=head4 Retorna

C<void>

=head4 Descrição

exporta os filtros para o bridge.

=cut

**/
   
   export_filter: function(line) {
      //window.console.log("export_filter()");
      for(var i = 0; i < line.all_columns().length; i++) {
         var key = line.all_columns()[i];
         var val = line.get_column(key);
         var filter = {};
         filter[key] = [];
         filter[key].push(val);
         var filter_name = JSON.stringify(filter);
         //window.console.log(filter_name);
         if(this.export_filters_to[filter_name] == null)
            this.export_filters_to[filter_name] = new Cache();
         this.export_filters_to[filter_name].push(line);
      }
   },

 /**

=pod

=head3  redo()

=head4 Recebe

C<void>

=head4 Retorna

C<void>

=head4 Descrição

Método utilizado para reconstruir uma linha quando solicitado.

=cut

**/  
   
   redo: function() {
      this.current_line--;
   },

/**

=pod

=head3  when_line(C<callback>)

=head4 Recebe

C<callback>

=head4 Retorna

C<void>

=head4 Descrição

Sincroniza a posição de linhas do cache, utilizando uma comparação de posições com os dados do filtro que é um uma 
C<string> via Json, envia para o C<hash> e disponibiliza com o C<callback> com o método C<wait_for_line>.

=cut

**/  
   
   
   when_line: function(callback) {
      this.wait_for_line(this.current_line++, callback);
   },

/**

=pod

=head3  wait_for_line(C<line_num, callback>)

=head4 Recebe

C<line_num, callback> : Recebe o número da linha com o line_num e linha com o callback

=head4 Retorna

C<void>

=head4 Descrição

ele atua sincronizando a linha pelo seu número. É utilizado pelo método C<when_line>

=cut

**/  
   
   wait_for_line: function(line_num, callback) {
      var line = this.lines[line_num];
      if(line != null) {
         callback(line);
      } else if(this.push_thread_id == null && ! this.processing){
      //} else if(this.push_thread_id == null){
         //window.console.log("No more pushed itens");
         callback(null);
      } else {
         var _this = this;
         setTimeout(function(){_this.wait_for_line(line_num, callback)}, 0);
      }
   },

 /**

=pod

=head3  wait_for_line(C<line_num, callback>)

=head4 Recebe

C<callback>

=head4 Retorna

C<void>

=head4 Descrição

Volta uma linha

=cut

**/  
   
   reset: function(){
      this.current_line = 0;
   },

/**

=pod

=head3  log_buffer()

=head4 Recebe

C<>

=head4 Retorna

C<void>

=head4 Descrição



=cut

**/   
   
   log_buffer: function(){
      //window.console.log(this.buffer);
   },
   alert_buffer: function() {
      alert(this.buffer.join("\n"));
   }
};

/**

=pod

=head2 SortLine

=cut

**/

function SortLine() {
   if(SortLine.id == null)
      SortLine.id = 1;
   this.id = SortLine.id++;
}

SortLine.prototype = {
   get_data: function() {
      return this.data;
   },
   set_data: function(data) {
      this.data = data;
   },
   get_column: function(column) {
      //window.console.log("get_column(" + column + ") == " + this.data[column]);
      return this.data[column];
   },
   get_values: function(columns) {
      var tmp = [];
      for(var i = 0; i < columns.length; i++) {
         var val = this.get_column(columns[i]);
         if(val == null) val = "";
         tmp.push(val);
      }
      return tmp;
   },
   all_columns: function() {
      var tmp = [];
      for(var key in this.data) {
         tmp.push(key);
      }
      return tmp;
   }
};

/**

=pod

=head2 CacheOfCaches

=cut

**/

function CacheOfCaches() {
   this.filters = {};
   this.filters["{}"] = new Cache();
   this.filters["{}"].get_exported_filters(this.filters);
   var _this = this;
   this.filters["{}"].onStartPushing = function() {
      if(_this.table.onStartPushing != null && typeof(_this.table.onStartPushing) == typeof(function(){})) {
         _this.table.onStartPushing();
      }
   };
   this.filters["{}"].onStopPushing = function() {
      if(_this.table.onStopPushing != null && typeof(_this.table.onStopPushing) == typeof(function(){})) {
         _this.table.onStopPushing();
      }
   };
}

CacheOfCaches.get_instance = function() {
   if(CacheOfCaches.id == null)
      CacheOfCaches.id = 1;
   this.id = CacheOfCaches.id++;
   this.push_num = 0;
};

CacheOfCaches.prototype = {
   push: function(line) {
      this.get_filter({}).push(line);
   },
   _get_filter: function(filter) {
      return this.filters[JSON.stringify(filter)];
   },
   get_filter: function(filter) {
      var _this = this;
      return this.optimize_filters(filter);
   },
   optimize_filters: function(filters){
      var cache = [];
      var tmp = this._get_filter(filters);
      if(tmp != null) return tmp;
      //window.console.log(filters);
      var values = [];
      for(var key in filters){
         var list = [];
         if (filters[key].length <= 0) return new Cache();
         for(var i = 0; i < filters[key].length; i++){
            var filter = {};
            filter[key] = [];
            filter[key].push(filters[key][i]);
            list.push(this._get_filter(filter))
         }
         //window.console.log(list);
         //window.console.log(filters[key].length);
         //window.console.log(this._get_filter({}).get_filter_options(key).length / 2);
         //window.console.log(this._get_filter({}).get_filter_options(key).length / 2);
         if(filters[key].length > this._get_filter({}).get_filter_options(key).length / 2) {
         //if(filters[key].length > this._get_filter({}).get_filter_options(key).length / 2) {
            //window.console.log("subtracao");
            var not = this.array_subtract(this._get_filter({}).get_filter_options(key), filters[key]);
            var fil = [];
            for(var k = 0; k < not.length; k++) {
               var tmp = {};
               tmp[key] = [not[k]];
               fil.push(this._get_filter(tmp));
            }
            values.push(this.subtract(this._get_filter({}), this.union(fil)));
         } else {
            values.push(this.union(list));
         }
      }
      var ret = this.intersection(values);
      //window.console.log(JSON.stringify(filters));
      this.filters[JSON.stringify(filters)] = ret;
      var _this = this;
      if(ret != null) {
          ret.onStartPushing = function() {
             if(_this.table.onStartPushing != null && typeof(_this.table.onStartPushing) == typeof(function(){})) {
                _this.table.onStartPushing();
                _this.push_num++;
             }
          };
          ret.onStopPushing = function() {
             if(_this.table.onStopPushing != null && typeof(_this.table.onStopPushing) == typeof(function(){})) {
                _this.push_num--;
                if(_this.push_num == 0) {
                   _this.table.onStopPushing();
                }
             }
          };
          ret.filter_name = filters;
      }
      return ret;
   },

   array_subtract: function(arr1, arr2){
      var sub = [];
      for(var i = 0; i < arr1.length; i++) {
         var copy = true;
         for(var j = 0; j < arr2.length; j++) {
            if(arr1[i] == arr2[j]) copy = false;
         }
         if(copy) sub.push(arr1[i]);
         copy = true;
      }
      return sub;
   },

   union: function(arr_cache){
      //window.console.log("unindo: " + arr_cache);
      if(arr_cache.length < 1) return;
      var tmp1 = arr_cache.shift();
      var tmp2;
      if(arr_cache.length < 1)
         return tmp1;
      else if(arr_cache.length > 1) {
         tmp2 = this.union(arr_cache);
      } else {
         tmp2 = arr_cache.shift();
      }
      return this.return_union(tmp1, tmp2);
   },

   return_union: function(cache1, cache2) {
      cache1.reset();
      cache2.reset();
      var tmp = new Cache();
      tmp.processing = true;
      var _this = this;
      setTimeout(function(){_this._union(tmp, cache1, cache2), 0});
      return tmp;
   },

   _union: function (obj, cache1, cache2){
      var _this = this;
      cache1.when_line(function(line1){
         //window.console.log("Chegou linha do cache1: " + line1.id);
         cache2.when_line(function(line2){
            //window.console.log("Chegou linha do cache2: " + line2.id);
            //window.console.log("union  => " + (line1 != null ? line1.id : "null") + " --- " + (line2 != null ? line2.id : "null"));
            if(line1 == line2 && line1 == null) {
               obj.processing = false;
               return;
            } else if(line1 == null) {
               //obj.put_on_index(line2, index);
               obj.push(line2)
            } else if(line2 == null) {
               //obj.put_on_index(line2, index);
               obj.push(line1)
            } else if(line1.id == line2.id) {
               //obj.put_on_index(line2, index);
               obj.push(line1);
            } else if(line1.id < line2.id) {
               cache2.redo();
               //obj.put_on_index(line1, index);
               obj.push(line1);
            } else if(line1.id > line2.id) {
               cache1.redo();
               //obj.put_on_index(line2, index);
               obj.push(line2)
            }
            setTimeout(function(){_this._union(obj, cache1, cache2)}, 0);
         });
      });
   },

   intersection: function(arr_cache){
      //window.console.log("intercedendo: " + arr_cache);
      if(arr_cache.length < 1) return;
      var tmp1 = arr_cache.shift();
      var tmp2;
      if(arr_cache.length < 1)
         return tmp1;
      else if(arr_cache.length > 1) {
         tmp2 = this.intersection(arr_cache);
      } else {
         tmp2 = arr_cache.shift();
      }
      return this.return_intersection(tmp1, tmp2);
   },

   return_intersection: function(cache1, cache2) {
      cache1.reset();
      cache2.reset();
      var tmp = new Cache();
      tmp.processing = true;
      var _this = this;
      setTimeout(function(){_this._intersection(tmp, cache1, cache2), 0});
      return tmp;
   },

   _intersection: function(obj, cache1, cache2) {
      var _this = this;
      cache1.when_line(function(line1){
         cache2.when_line(function(line2){
            //window.console.log("intersection  => " + (line1 != null ? line1.id : "null") + " --- " + (line2 != null ? line2.id : "null"));
            if(line2 == null || line1 == null) {
               obj.processing = false;
               return;
            } else if(line1.id == line2.id)
               //obj.put_on_index(line1, index);
               obj.push(line1);
            else if(line1.id < line2.id) {
               cache2.redo();
            } else if(line1.id > line2.id) {
               cache1.redo();
            }
            setTimeout(function(){_this._intersection(obj, cache1, cache2)}, 0);
         });
      });
   },

   subtract: function(tmp1, tmp2){
      //window.console.log("subtraindo: " + arr_cache);
      //if(arr_cache.length < 1) return;
      //var tmp1 = arr_cache.shift();
      //var tmp2;
      //if(arr_cache.length < 1)
      //   return tmp1;
      //else if(arr_cache.length > 1) {
      //   tmp2 = this.subtract(arr_cache);
      //} else {
      //   tmp2 = arr_cache.shift();
      //}
      return this.return_subtract(tmp1, tmp2);
   },

   return_subtract: function(cache1, cache2) {
      cache1.reset();
      cache2.reset();
      var tmp = new Cache();
      tmp.processing = true;
      var _this = this;
      setTimeout(function(){_this._subtract(tmp, cache1, cache2), 0});
      return tmp;
   },

   _subtract: function(obj, cache1, cache2) {
      var _this = this;
      cache1.when_line(function(line1){
         cache2.when_line(function(line2){
            //window.console.log("subtract  => " + (line1 != null ? line1.id : "null") + " --- " + (line2 != null ? line2.id : "null"));
            if(line1 == null) {
               obj.processing = false;
               return;
            } else if(line2 == null){
               //obj.put_on_index(line1, index);
               obj.push(line1);
            } else if(line1.id == line2.id){
            } else if(line1.id < line2.id) {
               //obj.put_on_index(line1, index);
               obj.push(line1);
               cache2.redo();
            } else if(line1.id > line2.id) {
               cache1.redo();
            }
            setTimeout(function(){_this._subtract(obj, cache1, cache2)}, 0);
         });
      });
   }
};
//
