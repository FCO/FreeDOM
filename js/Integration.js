/**

epod

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
         
         this.push_thread_id = setInterval(function(){
            if(_this.buffer.length > 0) {
               _this.push_thread();
            } else {
               clearInterval(_this.push_thread_id);
               _this.push_thread_id = null;
              if(_this.onStopPushing != null && typeof(_this.onStopPushing) == typeof(function(){})) {
                 _this.onStopPushing();
              }
            }
         }, 1);
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
      //window.console.log("push_thread()");
      var start = (new Date()).getTime();
      while(this.buffer.length > 0){
         for(var i = 0; i < 50 && this.buffer.length > 0; i++) {
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
            }
         }
         if((new Date()).getTime() >= start + 50) {
            //window.console.log("Saindo: " + (now - start));
            return;
         }
      }
      //window.console.log("Matando thread");
      //this.push_thread_id = null;
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
         if(this.on_new_line_with_col != null && typeof(this.on_new_line_with_col) == typeof(function(){})) {
            var _this = this;
            setTimeout(function(){_this.on_new_line_with_col(col, line)}, 0);
         }
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

=head3 redo()

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

Método assíncrono que muda a posição do ponteiro do cache de acordo com a linha selecionada.

=cut

**/  
   
   
   when_line: function(callback) {
      this.wait_for_line(this.current_line++, callback);
   },

/**

=pod

=head3 wait_for_line(C<line_num, callback>)

=head4 Recebe

C<line_num, callback> : Recebe o número da linha com o line_num

=head4 Retorna

C<void>

=head4 Descrição

Método que aguarda alguma linha vinda do buffer.

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

=head3 reset()

=head4 Recebe

C<void>

=head4 Retorna

C<void>

=head4 Descrição

move a posição do ponteiro do cache para 0.

=cut

**/  
   
   reset: function(){
      this.current_line = 0;
   },

/**

=pod

=head3 log_buffer()

=head4 Recebe

C<>

=head4 Retorna

C<void>

=head4 Descrição

Gera um log do buffer via console

=cut

**/   
   
   log_buffer: function(){
      //window.console.log(this.buffer);
   },
   
/**

=pod

=head3 alert_buffer()

=head4 Recebe

C<void>

=head4 Retorna

C<void>

=head4 Descrição

Gera um log do buffer via caixa de texto(alert)

=cut

**/   
   
   alert_buffer: function() {
      alert(this.buffer.join("\n"));
   }
};

/**

=pod

=head2 SortLine

A classe C<SortLine> representa uma linha.

=head3 SortLine()

=head4 Recebe

C<void>

=head4 Retorna

C<void> : 

=head4 Descrição

O método SortLine() é o construtor.

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

/**

=pod

=head3 set_data(data)

=head4 Recebe

C<data> : dados de uma linha

=head4 Retorna

C<void>

=head4 Descrição

método que popula uma linha com dados.

=cut

**/

   set_data: function(data) {
      this.data = data;
   },
   
/**

=pod

=head3 get_column(column)

=head4 Recebe

C<column> : recebe o nome de uma coluna

=head4 Retorna

C<column> : 

=head4 Descrição

método que recebe o nome de uma coluna na linha.

=cut

**/

   get_column: function(column) {
      //window.console.log("get_column(" + column + ") == " + this.data[column]);
      return this.data[column];
   },
   
/**

=pod

=head3 get_values(columns)

=head4 Recebe

C<column> : recebe colunas 

=head4 Retorna

C<tmp>

=head4 Descrição

método que retorna o conteúdo da linha.

=cut

**/

   get_values: function(columns) {
      var tmp = [];
      for(var i = 0; i < columns.length; i++) {
         var val = this.get_column(columns[i]);
         if(val == null) val = "";
         tmp.push(val);
      }
      return tmp;
   },
   
/**

=pod

=head3 all_columns()

=head4 Recebe

C<void>

=head4 Retorna

C<array> : Nome das colunas

=head4 Descrição

Método que retorna o nome de todas as colunas existentes naquela linha

=cut

**/  
  
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

Classe que representa um conjunto de caches.

=head3 CacheOfCaches()

=head4 Recebe

C<void>

=head4 Retorna

C<CacheOfCaches obj> : objeto de CacheOfCaches

=head4 Descrição

Esse é o construtor da classe

=cut

**/

function CacheOfCaches() {
   this.filters = {};
   this.filters["{}"] = new Cache();
   this._filterTrees = {};
   //this.filters["{}"].get_exported_filters(this.filters);
   this.filters["{}"].on_new_line_with_col = function(col, line){
      if(this._filterTrees[col] == null) {
         this._filterTrees[col] = new FilterNode();
      }
      if(! this._filterTrees[col].has_child(line.get_column(col))){
         this._filterTrees[col].put_child(new Cache());
      }
      this._filterTrees[col].get_child(line.get_column(col)).value.push(line);
   };
   var _this = this;
   this.filters["{}"].onStartPushing = function() {
      if(_this.table.onStartPushing != null && typeof(_this.table.onStartPushing) == typeof(function(){})) {
         _this.table.onStartPushing();
      }
   };
   this.filters["{}"].onStopPushing = function() {
      if(_this.table.onStopPushing != null && typeof(_this.table.onStopPushing) == typeof(function(){})) {
         _this.table.onStopPushing()new Cache());
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
   //optimize_filters: function(filters){
   //   var cache = [];
   //   var tmp = this._get_filter(filters);
   //   if(tmp != null) return tmp;
   //   //window.console.log(filters);
   //   var values = [];
   //   for(var key in filters){
   //      var list = [];
   //      if (filters[key].length <= 0) return new Cache();
   //      for(var i = 0; i < filters[key].length; i++){
   //         var filter = {};
   //         filter[key] = [];
   //         filter[key].push(filters[key][i]);
   //         list.push(this._get_filter(filter))
   //      }
   //      if(filters[key].length > this._get_filter({}).get_filter_options(key).length / 2) {
   //         var not = this.array_subtract(this._get_filter({}).get_filter_options(key), filters[key]);
   //         var fil = [];
   //         for(var k = 0; k < not.length; k++) {
   //            var tmp = {};
   //            tmp[key] = [not[k]];
   //            fil.push(this._get_filter(tmp));
   //         }
   //         values.push(this.subtract(this._get_filter({}), this.union(fil)));
   //      } else {
   //         values.push(this.union(list));
   //      }
   //   }
   //   var ret = this.intersection(values);
   //   this.filters[JSON.stringify(filters)] = ret;
   //   var _this = this;
   //   if(ret != null) {
   //       ret.onStartPushing = function() {
   //          if(_this.table.onStartPushing != null && typeof(_this.table.onStartPushing) == typeof(function(){})) {
   //             _this.table.onStartPushing();
   //             _this.push_num++;
   //          }
   //       };
   //       ret.onStopPushing = function() {
   //          if(_this.table.onStopPushing != null && typeof(_this.table.onStopPushing) == typeof(function(){})) {
   //             _this.push_num--;
   //             if(_this.push_num == 0) {
   //                _this.table.onStopPushing();
   //             }
   //          }
   //       };
   //       ret.filter_name = filters;
   //   }
   //   return ret;
   //},

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
         cache2.when_line(function(line2){
            if(line1 == line2 && line1 == null) {
               obj.processing = false;
               return;
            } else if(line1 == null) {
               obj.push(line2)
            } else if(line2 == null) {
               obj.push(line1)
            } else if(line1.id == line2.id) {
               obj.push(line1);
            } else if(line1.id < line2.id) {
               cache2.redo();
               obj.push(line1);
            } else if(line1.id > line2.id) {
               cache1.redo();
               obj.push(line2)
            }
            setTimeout(function(){_this._union(obj, cache1, cache2)}, 0);
         });
      });
   },

   intersection: function(arr_cache){
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
            if(line2 == null || line1 == null) {
               obj.processing = false;
               return;
            } else if(line1.id == line2.id)
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
            if(line1 == null) {
               obj.processing = false;
               return;
            } else if(line2 == null){
               obj.push(line1);
            } else if(line1.id == line2.id){
            } else if(line1.id < line2.id) {
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
   put_on_path: function(value, path) {
      var first = path.shift();
      if(!this.has_child(first)) {
      }
      if(path.length <= 0) {
         this.get_child(first).value = value;
      } else {
         this.get_child(first).put_on_path(value, path);
      }
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
         if(this.get_path(path).value != null && (min == null || min > changes)){
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
