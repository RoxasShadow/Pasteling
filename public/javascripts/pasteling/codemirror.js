Pasteling.codemirror = (function() {
  var setup = function() {
    var that     = this;
    var textarea = document.getElementById('editor');

    this.editor = CodeMirror.fromTextArea(textarea, {
      lineNumbers  : true,
      lineWrapping : true,
      matchBrackets: true,
      readOnly     : $readonly,
      mode         : $mode,
      theme        : 'monokai',
      extraKeys    : {
        'F11': function(cm) {
          cm.setOption('fullScreen', !cm.getOption('fullScreen'));
        },

        'Esc': function(cm) {
          if(cm.getOption('fullScreen'))
            cm.setOption('fullScreen', false);
        }
      }
    });
    this.editor.setSize('100%', 700);

    $('#langSelector').on('change', function() {
      var selectedLang = this.options[this.selectedIndex].value;
      var setLang      = function() { that.editor.setOption('mode', selectedLang) };

      var js = document.createElement('script');
          js.type   = 'text/javascript';
          js.src    = '/javascripts/lib/codemirror/mode/' + selectedLang + '/' + selectedLang + '.js';
          js.onload = setLang;
          js.onreadystatechange = setLang;

      $('head')[0].appendChild(js);
    });

    if($lang != 'undefined' && $lang != 'null') {
      var setLang = function() { that.editor.setOption('mode', $lang) };

      var js = document.createElement('script');
          js.type   = 'text/javascript';
          js.src    = '/javascripts/lib/codemirror/mode/' + $lang + '/' + $lang + '.js';
          js.onload = setLang;
          js.onreadystatechange = setLang;

      $('head')[0].appendChild(js);
    }
    
    $('#tabSizeSelector').on('change', function() {
      var selectedTabSize = this.options[this.selectedIndex].value;
      that.editor.setOption('tabSize', parseInt(selectedTabSize));
    });
  };

  return {
    setup : setup,
    editor: this.editor
  };
})();