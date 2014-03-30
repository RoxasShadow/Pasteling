var textarea = document.getElementById('editor');

if(textarea != null) {
  $editor = CodeMirror.fromTextArea(textarea, {
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
  $editor.setSize('100%', 700);

  var langSelector = document.getElementById('langSelector');
  if(langSelector) {
    langSelector.addEventListener('change', function(a) {
      var selectedLang = this.options[this.selectedIndex].value;
      var setLang      = function() { $editor.setOption('mode', selectedLang) };

      var js = document.createElement('script');
          js.type   = 'text/javascript';
          js.src    = '/javascripts/lib/codemirror/mode/' + selectedLang + '/' + selectedLang + '.js';
          js.onload = setLang;
          js.onreadystatechange = setLang;

      document.getElementsByTagName('head')[0].appendChild(js);
    });
  }

  if($lang != 'undefined') {
    var setLang = function() { $editor.setOption('mode', $lang) };

    var js = document.createElement('script');
        js.type   = 'text/javascript';
        js.src    = '/javascripts/lib/codemirror/mode/' + $lang + '/' + $lang + '.js';
        js.onload = setLang;
        js.onreadystatechange = setLang;

    document.getElementsByTagName('head')[0].appendChild(js);
  }
  
  var tabSelector = document.getElementById('tabSizeSelector')
  if(tabSelector) {
    tabSelector.addEventListener('change', function(a) {
      var selectedTabSize = this.options[this.selectedIndex].value;
      $editor.setOption('tabSize', parseInt(selectedTabSize));
    });
  }
}