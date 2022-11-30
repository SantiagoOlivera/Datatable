jQuery.fn.extend({
    Datatable: function(config){

        $('head').append('<link rel="stylesheet" type="text/css" href="MymtecDatatable.css">');

        //init dt
        let dt = $(this);

        let staticColumns = {
            ROW_NUMBER: 'rowNumber'
        }

        let keys = {
            ARROW_UP: 38,
            ARROW_DOWN: 40,
            ARROW_LEFT: 37,
            ARROW_RIGHT: 39,
            SUPR: 46
        }
        
        let dtType = {
            READ_ONLY_TABLE: 'read_only',
            EDITABLE_TABLE: 'editable_table',
            FORM_TABLE: 'form_table',
            MIX: 'mix',
        };

        let inputType = {
            TEXT: 'text',
            TEXTAREA: 'textarea',
            NUMBER: 'number',
            LIST: 'list',
            SELECT: 'select'
        }

        let typeSelect = {
            SINGLE: 'single',
            MULTI: 'multi'
        }

        let buttons = {
            NORMAL: 0, //-not modified
            ADD: 1,
            EDIT:2,
            DELETE:3
        }

        let status = {
            NORMAL: 'normal',
            NEW:'new',
            UPDATED:'updated',
            DELETE: 'delete',
        }

        let columnOpertations = {
            FILTER: 'filter',
            SORT: 'sort',
            MASIVE_UPDATE: 'masive_update'
        }

        config.columns.unshift({
            title: '#',
            data: staticColumns.ROW_NUMBER,
            class: 'text-center'
        });

        for(var i=0; i<config.data.length; i++){
            config.data[i][staticColumns.ROW_NUMBER] = i+1
        }

        let _config = config;
        /* let _data = config.data;
        let _columns = config.columns;
        let _fixedColumns = config.fixedColumns; */
        
        console.log(dt, config);

       
        
        function _draw(){
            dt.attr('border', '1');
            var headerHtml = _getHeaderHtml(_config);
            var bodyHtml = _getBodyHtml(_config);
            var footerHtml = _getFooterHtml(_config);
            dt.html(headerHtml + bodyHtml + footerHtml);
        }
        
        function _getHeaderHtml(config){
            var html = '<thead><tr>';
            
            for( c of config.columns){
                html += `<th class="${c.class}">${c.title}</th>`;
            }

            html += '</tr></thead>';

            return html;
        }

        function _getBodyHtml(config){

            switch(config.dtType){
                case dtType.EDITABLE_TABLE:
                        return _getBodyHtmlEditableTable(config)
                    break;
                default:
                        return _getBofyHtmlReadonlyTable(config);
                    break;
            }


            function _getBodyHtmlEditableTable(config){
                var data = config.data;
                var columns = config.columns;
            
                var html = '<tbody>';
                var rows = '';

                for(var i=0; i<data.length; i++){
                
                    var row = `<tr  row="${i}">`;

                    for(var x=0; x<columns.length; x++){
                        
                        var value = data[i][columns[x].data];
                        var column = columns[x].data;

                        if(column === staticColumns.ROW_NUMBER){
                            row += `<td row="${i}" column="${x}" class=""><button type="button"  tabindex="-1">${value ? value : ''}</button></td>`;
                        }else{
                            row += `<td row="${i}" column="${x}"><input type="text" value="${value ? value : '' }" /></td>`;
                        }
                    }

                    row += '</tr>';

                    rows += row;
                }

                html +=  rows + '</tbody>';

                return html;
            }

            function _getBofyHtmlReadonlyTable(config){
                
                var data = config.data;
                var columns = config.columns;
            
                var html = '<tbody>';
                var rows = '';

                for(var d of data){
                
                    var row = '<tr>';

                    for(var c of columns){
                    row += `<td>${d[c.data]}</td>`;
                    }

                    row += '</tr>';

                    rows += row;
                }

                html +=  rows + '</tbody>';

                return html;
            }
            
        }

        function _getFooterHtml(){
            var html = '<tfoot>';
            html += '</tfoot>';
            return html;
        }

        function _changeValue(ele, value){
            ele.val(value);
        }

        function _arrowUpDown(event) {

            var ele = null;
            var target = $(event.target).parent();
            var row = parseInt(target.attr('row'));
            var column = parseInt(target.attr('column'));
            var key = event.originalEvent.keyCode;
            console.log(event);
            if(_config.dtType === dtType.EDITABLE_TABLE){
                
                switch(key){
                    case keys.ARROW_LEFT:
                        ele = dt.find(`td[row="${row}"][column="${column-1}"]`).find('input,select');
                        if(ele.length > 0){
                            ele.focus();
                            ele.select();
                        }
                        break;
                    case keys.ARROW_RIGHT:
                        ele = dt.find(`td[row="${row}"][column="${column+1}"]`).find('input,select');
                        if(ele.length > 0){
                            ele.focus();
                        }
                        break;
                    case keys.ARROW_UP:
                        ele = dt.find(`td[row="${row-1}"][column="${column}"]`).find('input,select');
                        if(ele.length > 0){
                            ele.focus();
                        }
                        console.log("ARROW UP");
                        break;
                    case keys.ARROW_DOWN:
                        ele = dt.find(`td[row="${row+1}"][column="${column}"]`).find('input,select');
                        if(ele.length > 0){
                            ele.focus();
                        }
                        console.log("ARROW DOWN");
                        break;
                    case keys.SUPR:
                            ele = dt.find(`td[row="${row}"][column="${column}"]`).find('input,select');
                            if(ele.length > 0){
                                _changeValue(ele, '');
                            }
                        break;
                }
            }
        }

        _draw();
        

        dt.find('input,select').on('change', function(){});
        dt.on('change', )
        dt.on('keydown', _arrowUpDown);
        

        dt.init.prototype.DataTable = function(){
            return {
                config: config,
                type: function(){

                },
                columns: function(){

                },
                buttons: function(){

                },
                select: function(){

                },
                add: function(){
                    console.log(dt);
                },
                remove: function(){

                },
                draw: function(){

                },
                update: function(idx, column, value){

                },
                selection: function(){
                    
                }
            };
        };

    },
});
