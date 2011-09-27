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
   table.howToGetData       = null;
   table.howToGetDataLength = null;
   table = get_dom(table);
   table.setHowToGetData = function(callback) {
window.console.log("table: setHowToGetData()");
      this.howToGetData = callback;
      this.cache_of_caches.howToGetData = callback;
   };
   table.setHowToGetDataLength = function(callback) {
window.console.log("table: setHowToGetDataLength()");
      this.howToGetDataLength = callback;
      this.cache_of_caches.howToGetDataLength = callback;
   };
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
      var thead = document.createElement("thead");
      var ttr   = document.createElement("tr");
      for(var j = 0; j < this.columns.length; j++) {
         var th = document.createElement("th");
         th.innerHTML = this.columns[j];
         ttr.appendChild(th);
      }
      thead.appendChild(ttr);
      this.appendChild(thead);
      var tbody = document.createElement("tbody");
      this.appendChild(tbody);
      for(var i = 0; i < this.lines_per_page; i++) {
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
         tbody.appendChild(tr);
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
      if(this.last_draw == null)
         this.last_draw = {};
      if(
         this.last_draw != null
         && this.last_draw.page == this.page
         && this.last_draw.filter === JSON.stringify(this.get_cache().filter_name)
         && this.last_draw.length == this.get_cache().length()
        )
         return;
      this.last_draw.page   = this.page;
      this.last_draw.filter = JSON.stringify(this.get_cache().filter_name);
      this.last_draw.length = this.get_cache().length();

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
      if(this.get_cache().total_length == -1) {
         if(this.get_cache().lines.length / this.lines_per_page - 1 > this.page)
            this.goto_page(this.page + 1);
      } else {
         if(this.get_cache().total_length / this.lines_per_page - 1 > this.page)
            this.goto_page(this.page + 1);
      }
   };
   table.gotoPage = function(page) {
      return this.goto_page(page - 1);
   };
   table.goto_page = function(page) {
      this.page = page;
      var page_data = this.get_cache();
      if(page_data != null)
         page_data.current_line = this.page * this.lines_per_page;
      var lines = this.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
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

Cache é a classe responsável pelas linhas (C<SortLine>) que poderão ser inseridas na tabela. Suas principais atribuições são:

Criar linhas
  
  var cache = new Cache();
  cache.push({col1:"valor1", col2:"valor2"});
  
  // Ou
  
  var cache = new Cache();
  cache.push([{col1:"valor3", col2:"valor4"}, {col1:"valor5", col2:"valor6"}]);
  
Sendo que o hash C<{col1:"valor1"}> se tornará uma instância da classe C<SortLine>.

Recuperar o valor inserido nas linhas
	
  cache.when_line(function(line){ alert(line) });
  
  //ou
  
  cache.wait_for_line(num_linha, function(line){ alert(line) })
  

=head3 Cache()

=head4 Recebe

C<void>

=head4 Retorna

C<Cache Object> : Um novo objeto da classe C<Cache>

=head4 Descrição

O método C<Cache()> é o construtor da classe C<Cache>, retornando um C<Cache Object> pronto para ser inicializado.

=cut

**/


/**

the function passed to howToGetDataLength should return the size of total data (qtt of lines on database)

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
   this.operational_current_line      = 0;
   this.column_lines      = {};
   this.export_filters_to = null;
   this.filter_name       = null;
   this.options           = {};
   this.null_lines        = 0;
   this.last_asked_line   = -1;
   this.total_length      = -1;
   this.unique_ids        = {};
}

Cache.prototype = {

   set filter_name(name) {
      if(name != null) {;
         this._filter_name = name;
      }
      if(this.coc != null)
         this.howToGetDataLength = this.coc.howToGetDataLength;
   },
   get filter_name() {
      return this._filter_name;
   },

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

O método C<get_exported_filters> retorna um objeto que poderá ser usado como auxiliar na operação de filtragens.

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

O método C<length> retorna a quantidade de linhas contidas no cache.

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
//data = dados que vieram do howToGetData??? Se sim, data = vazio e data=nulo se não, faz um loop com o tamanho da quantidade de informa-
//ções de data, colocando os dados de data nas linhas correspondentes.

   push: function(data){
      var _this = this;
      setTimeout(function(){
         if(_this.onStartPushing != null && typeof(_this.onStartPushing) == typeof(function(){})) {
            _this.onStartPushing();
         }
      }, 0);
      if(typeof(data) == typeof({}) && data.length == null) {
         var id = data["$FreeDOM::__UNIQUE_LINE_ID__"];
         if(id != null) {
            if(this.unique_ids[id] == null) {
               this.unique_ids[id] = 0;
            }
            if(this.unique_ids[id] <= 0) {
               this.unique_ids[id]++;
               this.buffer.push(data);
            }
         } else {
            this.buffer.push(data);
         }
      } else {
         for(var i = 0; i < data.length; i++) {
            var line = data[i];
            var id = line["$FreeDOM::__UNIQUE_LINE_ID__"];
            delete line["$FreeDOM::__UNIQUE_LINE_ID__"];
            if(id != null) {
               if(this.unique_ids[id] == null) {
                  this.unique_ids[id] = 0;
               }
               if(this.unique_ids[id] <= 0) {
                  this.unique_ids[id]++;
                  this.buffer.push(line);
               }
            } else {
               this.buffer.push(line);
            }
         }
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
               var _this = this;
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

Insere no cache cada linha para qual for chamado.

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

C<line> : recebe uma linha

=head4 Retorna

C<void>

=head4 Descrição

Invoca/conjura o método C<export_filter(line)> que irá popular os caches necessários além de contar a quantidade de ocorrência
de valores em cada coluna do cache.


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
         if(this.export_filters_to[filter_name] == null) {
            this.export_filters_to[filter_name] = new Cache();
            this.export_filters_to[filter_name].coc = this.coc;
            //this.coc.put(filter_name, this.export_filters_to[filter_name]);
         }
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
      this.operational_current_line--;
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

   operational_when_line: function(callback) {
      this.wait_for_line(this.operational_current_line++, callback, true);
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
   
   wait_for_line: function(line_num, callback, do_not_get) {
//window.console.log("wait_for_line()");
      if((!do_not_get || do_not_get == null) && this.howToGetData != null) {
//window.console.log("wait_for_line(primeiro if)");
         if(line_num > this.last_asked_line && (line_num < this.total_length || line_num > 0)) {
//window.console.log("wait_for_line(segundo if)");
            var my_line = line_num;
            var _this = this;
            var first = (_this.last_asked_line * 1) + 1;
            if(first > _this.total_length)
               return;
            var last  = my_line + 30 - 1;
            if(last > _this.total_length)
               last = _this.total_length;
            this.last_asked_line = last;
            setTimeout(function(){
               var resp = _this.howToGetData(first, last, _this.filter_name);
               _this.coc.get_filter({}).push(resp);
               if(_this.coc.table.columns.length == 1 && _this.coc.table.columns[0] == "") {
                  var values = [];
                  for(var key in resp[0])
                     values.push(key);
                  _this.coc.table.set_columns(values);
               }
               //_this.push(resp);
            }, 0);
         }
      }
      var line = this.lines[line_num];
      if(line != null) {
         callback(line);
      } else if(this.push_thread_id == null && ! this.processing){
         callback(null);
         var _this = this;
      } else {
         var _this = this;
         setTimeout(function(){_this.wait_for_line(line_num, callback, true)}, 100);
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
      this.operational_current_line = 0;
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

function CacheOfCaches(cols) {
   if(CacheOfCaches.id == null)
      CacheOfCaches.id = 1;
   this.id = CacheOfCaches.id++;
   this.push_num = 0;
   //this.filters = {};
   //this.filters["{}"] = new Cache();
   this.put({}, new Cache());
   this.filters["{}"].coc = this;
   this.filters["{}"].filter_name = {};
   this.filters["{}"].get_exported_filters(this.filters);
   var _this = this;
   this.filters["{}"].onStartPushing = function() {
      if(_this.table != null && _this.table.onStartPushing != null && typeof(_this.table.onStartPushing) == typeof(function(){})) {
         _this.table.onStartPushing();
      }
   };
   this.filters["{}"].onStopPushing = function() {
      if(_this.table != null && _this.table.onStopPushing != null && typeof(_this.table.onStopPushing) == typeof(function(){})) {
         _this.table.onStopPushing();
      }
   };
   if(cols != null) {
      this.cols = {};
      for(var i = 0; i < cols.length; i++) {
         //window.console.log("criando coluna: " + cols[i].name);
         if(this.cols[cols[i].name] == null)
            this.cols[cols[i].name] = {};
         this.cols[cols[i].name].type   = new Type(cols[i].type, cols[i].size, cols[i].nullable);
         this.cols[cols[i].name].unique = cols[i].uniquenes;
      }
   }
}

CacheOfCaches.get_instance = function() {
};

CacheOfCaches.prototype = {
   when_line: function(callback){this.get_filter({}).when_line(callback)},
   operational_when_line: function(callback){this.get_filter({}).operational_when_line(callback)},
   get_filter_options: function(col) {
      return this.get_filter({}).get_filter_options(col);
   },
   set table(table) {
      this._table = table;
      if(this.table) {
         this.get_filter({}).howToGetData       = this._table.howToGetData;
         this.get_filter({}).howToGetDataLength = this._table.howToGetDataLength;
      }
   },
   set howToGetData(callback) {
//window.console.log("CoC: howToGetData()");
      this._how_to_get_data = callback;
      for(var i in this.filters) {
         this.filters[i].howToGetData = callback;
      }
   },
   get howToGetData() {
//window.console.log("CoC: howToGetData()");
      return this._how_to_get_data;
   },
   set howToGetDataLength(callback) {
//window.console.log("CoC: set howToGetDataLength()");
      this._how_to_get_data_length = callback;
      for(var i in this.filters) {
//window.console.log("setting: " + i);
         this.filters[i].howToGetDataLength = callback;
         this.filters[i].total_length = this.filters[i].howToGetDataLength(JSON.parse(i));
      }
   },
   get howToGetDataLength() {
//window.console.log("CoC: get howToGetDataLength()");
      return this._how_to_get_data_length;
   },
   get table() {
      return this._table;
   },
   push: function(line) {
      if(this.cols != null){
         for(var col in line) {
            if(this.cols[col] == null)
               throw "Column '" + col + "' does not exist.";
         }
         for(var col in this.cols) {
            if(this.cols[col].unique){
               var filter = {};
               filter[col] = [];
               filter[col].push(line[col]);
               if(this.filter_exists(filter))
                  throw "Error inserting value '" + line[col] + "' on the unique field '" + col + "'";
            }
            this.cols[col].type.test(col, line[col]);
         }
      }
      this.get_filter({}).push(line);
   },
   filter_exists: function(filter_name){
      if(this.filters[JSON.stringify(filter_name)] != null)
         return true;
      else
         return false;
   },
   _get_filter: function(filter) {
      var count = 0;
      for(var i in filter) {
         count = count + filter[i].length;
      }
      var cache = this.filters[JSON.stringify(filter)];
      if(count == 1) {
         if(this.howToGetData != null)
            cache.howToGetData = this.howToGetData;
         if(this.howToGetDataLength && cache.total_length < 0)
            cache.total_length = this.howToGetDataLength(filter);
         cache.filter_name = filter;
      }
      return cache;
   },
   get_filter: function(filter) {
      var _this = this;
      return this.optimize_filters(filter);
   },
   put: function(name, new_cache) {
      //window.console.log("put: ", JSON.stringify(name), new_cache);
      if(this.filters == null)
         this.filters = {};
      this.filters[JSON.stringify(name)] = new_cache;
      new_cache.howToGetData = this.howToGetData;
      if(this.howToGetDataLength && typeof(this.howToGetDataLength) == typeof(function(){}))
         new_cache.total_length = this.howToGetDataLength(name);
      new_cache.filter_name = name;
   },
   optimize_filters: function(filters){
      var cache = [];
      var tmp = this._get_filter(filters);
      if(tmp != null) return tmp;
      //window.console.log(filters);
      var values = [];
      for(var key in filters){
         var list = [];
         if (filters[key].length <= 0) {
            var tmp = new Cache();
            tmp.coc = this;
            tmp.howToGetData       = this.howToGetData;
            tmp.howToGetDataLength = this.howToGetDataLength;
            return tmp;
         }
         for(var i = 0; i < filters[key].length; i++){
            var filter = {};
            filter[key] = [];
            filter[key].push(filters[key][i]);
            list.push(this._get_filter(filter))
         }
         //if(filters[key].length > this._get_filter({}).get_filter_options(key).length / 2) {
         //   var not = this.array_subtract(this._get_filter({}).get_filter_options(key), filters[key]);
         //   var fil = [];
         //   for(var k = 0; k < not.length; k++) {
         //      var tmp = {};
         //      tmp[key] = [not[k]];
         //      fil.push(this._get_filter(tmp));
         //   }
         //   var subt = this.subtract(this._get_filter({}), this.union(fil));
         //   this.put(filter, subt);
         //   values.push(subt);
         //} else {
            var union = this.union(list);
            //this.put(filter, union);
            values.push(union);
         //}
      }
      var ret = this.intersection(values);
      window.console.log(JSON.stringify(filters));
      //this.filters[JSON.stringify(filters)] = ret;
      this.put(filters, ret);
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
      window.console.log("return_union()");
      cache1.reset();
      cache2.reset();
      var tmp = new Cache();
      tmp.coc = this;
      //tmp.howToGetData       = this.howToGetData;
      //tmp.howToGetDataLength = this.howToGetDataLength;
      tmp.processing = true;
      var _this = this;
      setTimeout(function(){_this._union(tmp, cache1, cache2), 0});
      return tmp;
   },

   _union: function (obj, cache1, cache2){
      var _this = this;
      cache1.operational_when_line(function(line1){
         cache2.operational_when_line(function(line2){
            window.console.log(line1, " - ", line2);
            try{
               if(line1 == line2 && line1 == null) {
                  obj.processing = false;
                  cache1.redo();
                  cache2.redo();
                  setTimeout(function(){_this._union(obj, cache1, cache2)}, 1000);
                  return;
               } else if(line1 == null) {
                  obj.push(line2)
                  cache1.redo()
               } else if(line2 == null) {
                  obj.push(line1)
                  cache2.redo()
               } else if(line1.id == line2.id) {
                  obj.push(line1);
               } else if(line1.id < line2.id) {
                  cache2.redo();
                  obj.push(line1);
               } else if(line1.id > line2.id) {
                  cache1.redo();
                  obj.push(line2)
               }
            } catch(err){throw "Morri!!!"}
            obj.processing = true;
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
      tmp.coc = this;
      //tmp.howToGetData       = this.howToGetData;
      //tmp.howToGetDataLength = this.howToGetDataLength;
      tmp.processing = true;
      var _this = this;
      setTimeout(function(){_this._intersection(tmp, cache1, cache2), 0});
      return tmp;
   },

   _intersection: function(obj, cache1, cache2) {
      var _this = this;
      cache1.operational_when_line(function(line1){
         cache2.operational_when_line(function(line2){
            if(line2 == null || line1 == null) {
               obj.processing = false;
               cache1.redo();
               cache2.redo();
               setTimeout(function(){_this._intersection(obj, cache1, cache2)}, 1000);
               return;
            } else if(line1.id == line2.id)
               obj.push(line1);
            else if(line1.id < line2.id) {
               cache2.redo();
            } else if(line1.id > line2.id) {
               cache1.redo();
            }
            obj.processing = true;
            setTimeout(function(){_this._intersection(obj, cache1, cache2)}, 0);
         });
      });
   },

   subtract: function(tmp1, tmp2){
      if(tmp2 == null)
         return tmp1;
      return this.return_subtract(tmp1, tmp2);
   },

   return_subtract: function(cache1, cache2) {
      cache1.reset();
      cache2.reset();
      var tmp = new Cache();
      tmp.coc = this;
      tmp.howToGetData       = this.howToGetData;
      tmp.howToGetDataLength = this.howToGetDataLength;
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
