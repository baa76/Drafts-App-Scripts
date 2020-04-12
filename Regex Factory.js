// RegEx Factory
// 2020-03-06 at 15:44 EST

// Multiple RegEx with preview and replace (or cancel).
// RegEx group expressions are automatically saved
// to a text file in iCloud Drive on 'Preview/Run...'
// Each RegEx group can have one or more replace patterns.
// Each pattern is one line in the format: /regex find/, "replace"
// RegEx swithes 'gm' are on by default (but can be changed)
// (see 'groupSample' text below: )
// Generate RegEx JS script action as new draft in Inbox :)

var path = '/Drafts/RegExGroups.txt';

var runGroup = true;
var groupTitle = '';
var regExGroup = '';
var regExGroupList = [];
var regExGroupIndex = -1;
var startLastUsed = false;

var groupSample = `StartIndex = 2
# Sample: multilines to double
/\\n\\n+/, "\\n\\n"
# Silly test: strip multilines & swap words
/\\n+/, "\\n"
/(.*?) (.+?) /, "$2 $1 "
# Smart quotes & m to n-dashes
/"(.+?)"/, "“$1”"
/(\\W)'(\\w.+?)'(\\W)/, "$1‘$2’$3"
/(\\w)'/, "$1’"
/ ?-- ?/, " – ’"
/ ?— ?/, " – ’"`;
// RegEx switches 'gm' are added in code by default.
// If adding any other switches, please include 'gm' as well!


let load = readGroupFile();
if (loadGroup(load)) {
  while(runGroup) {
    regExFactory();
  }
}

function readGroupFile() {
  let fmCloud = FileManager.createCloud();
  let groupText = fmCloud.readString(path);
  
  if (!groupText) { 
    // No file found, use sample text instead:
    // see 'groupSample' above.
    groupText = groupSample;
  }
  
  groups = groupText.split('\n# ');
  let index = parseInt(groups[0].slice(12));
  if (index > -1) startLastUsed = true;
  
  for (const group of groups.slice(1)) {
    let group2 = group.replace('\n', '\r');
    let item = group2.split('\r');
    let title = item[0].replace(/^# /, '');
    let gRegEx = item[1];
    regExGroupList.push([title, gRegEx]);
  }
  
  if (index == -1) {
    regExGroupIndex = 0;
    return true;
  } else {      
    getGroup(index);
    return false;      
  }
  
  // No file found:
  regExGroupIndex = -1
  return false;
}

function loadGroup(load) {
  if (!load) return true;
  let index = regExGroupIndex;
  
  if (regExGroupIndex == -1) {
    index = 0;
  }
  
  p = Prompt.create();
  p.title = "Load RegEx Factory";
  p.addPicker('group', 'Group:', [listGroupTitles()], [index]);
  p.addSwitch('start', 'Start With Last Used', startLastUsed);
  p.addButton('Load Group...');
  p.addButton('New Group...');
  
  if (p.show()) {
    startLastUsed = p.fieldValues['start'];
    switch (p.buttonPressed) {
      case 'Load Group...':
        getGroup(parseInt(p.fieldValues['group']));
        break;

      case 'New Group...':
        groupTitle = '';
        regExGroup = '';
        regExGroupIndex = -1;
        break;

      default:
        app.displayErrorMessage("switch/case not implemented!");
        break;
    }
    return true;
  }
  
  context.cancel();
  return false;
}

function getGroup(index) {
  if (index == -1) return;
  groupTitle = regExGroupList[index][0];
  regExGroup = regExGroupList[index][1];
  regExGroupIndex = index;
  // alert(`${index}: ${groupTitle}: ${regExGroup}`)
}

function listGroupTitles() {
  titleList = [];
  
  for (const group of regExGroupList) {
    titleList.push(group[0]);
  }
  
  return titleList;
}

function regExFactory() {
  p = Prompt.create();
  p.title = "RegEx Factory";
  p.addTextField("groupTitle", "Title:", groupTitle, {"wantsFocus": true });
  p.addTextView('text', 'RegExGroup:', regExGroup)
  p.addButton('Save as New Group');
  p.addButton('Load Another Group...');
  p.addButton('Preview and Run RegEx Group...');
  p.addButton('JS Code to Inbox');
  p.addButton('RegEx Help...');
  
  if (p.show()) {
    groupTitle = p.fieldValues['groupTitle'];
    regExGroup = p.fieldValues['text'];
    grFind = p.fieldValues['find'];
    grRepl = p.fieldValues['repl'];
    
    switch (p.buttonPressed) {
      case 'Load Another Group...':
        loadGroup(true);
        break;

      case 'Save as New Group':
        if (regExGroup.trim() == '') {
          app.displayErrorMessage('RegEx arguments missing!');
          break;
        }
        saveGroupFile(-1);
        break;

      case 'Preview and Run RegEx Group...':
        if (regExGroup.trim() == '') {
          app.displayErrorMessage('RegEx arguments missing!');
          break;
        }
        
        const [text, group] = replaceByRegexGroup(regExGroup);
        if (text) {
          saveGroupFile(regExGroupIndex);
          if (preview(text, group)) {
            if (groupTitle == '') {
              app.displayErrorMessage("Group title is empty! \n" + 
                  "Give a clear name!") ;
              return false;
            }
            
            editor.setText(text);
            runSearch = false;
            runGroup = false;
          }
        }
 
        break;

      case 'JS Code to Inbox':
        generateJsCode(regExGroup);
        break;

      case 'RegEx Help...':
        app.openURL('https://regex101.com')
        break;      

      default:
        app.displayErrorMessage("switch/case not implemented!") ;
        break;
    }
  } else {
    context.cancel();
    runGroup = false;
  }
}

function  saveGroupFile(ind) {
  let title = groupTitle;
  if (groupTitle == '') {
    title = 'Untitled';
  } 
  
  if (ind == -1) {
    regExGroupList.push([title, regExGroup]);
    regExGroupIndex = regExGroupList.length - 1
  } else {
    regExGroupList[regExGroupIndex] = [title, regExGroup];
  }
  
  if (startLastUsed) {
    gList = ['StartIndex = ' + regExGroupIndex]
  } else {
    gList = ['StartIndex = -1']
  }
  
  for (const group of regExGroupList) {
    gList.push('# ' + group[0]); // groupTitle
    gList.push(group[1]);      // regExGroup
  }
  
  let fmCloud = FileManager.createCloud();
  let success = fmCloud.write(path, gList.join('\n'));
}

function replaceByRegexGroup(reGroup) {
  let text = editor.getText();
  
  for (const row of reGroup.split('\n')) {
    // Skip commented and blank lines:
    if (row.startsWith('// ') || row.trim() == '') continue;

    let m = row.match(/^\/(.+?)\/([gmiyus]{0,6}), ?\"(.*)\"/)
    if (!m) {
      app.displayErrorMessage("Error in line syntax: " + row) ;
      return ['', reGroup];
    }
    
    let fnd = m[1];
    let sw = m[2];
    let rep = m[3];
    
    if (sw == '') {
      // If adding any switches, please include 'gm' as well!
      sw = 'gm'; // Default RegEx switch
    }
    
    let reFind = new RegExp(fnd, sw);
    rep = rep.replace(/\\n/g, '\n');
    rep = rep.replace(/\\t/g, '\t');
    rep = rep.replace(/\\r/g, '\r');
    text = text.replace(reFind, rep);
  }
  
  if (text.trim() == '') {
    app.displayErrorMessage("Empty text result!") ;
    return ['', reGroup];
  }
  
  return [text, reGroup];
}

function preview(text, group) {
  // Test < > "' &
  text = text.replace(/</g, '&lt;');
  // text = text.replace(/>/g, '&gt;');
  text = text.replace(/&/g, '&amp;');
  text = text.replace(/'/g, "&apos;");
  text = text.replace(/"/g, '&quot;');

  if (app.themeMode == 'dark') {
    var css = "body { background: #222; color: #ddd; }";
  } else {
    var css = "body { background: #fff; color: #444; }";
  }
  
  groupWithSwitches = group.replace(/^(\/.+?\/)(?!\w+)(, ?".*")/gm, '$1gm$2');
  
  let html = `<html><style>${css}</style><body>
  <h3>Result-text preview below line<h3>
  <h4>Press "Continue\" to replace current draft <br>
  or "Cancel\" to exit with no changes.</h4>
  <h4>RegEx group used: "${groupTitle}\"</h4>
  <pre>${groupWithSwitches}</pre>
  <p>(If no switches specified, 'gm\' = "Global, Multiline\" are added by default)</p>
  <hr>
  <pre>${text}</pre>
  </body></html>`
  let preview = HTMLPreview.create();
  return preview.show(html);
}

function generateJsCode(reGroup) {
  // Generates JS replace function snippet as draft in Inbox
  const now = new Date()
  const date = now.toString("yyyy-MM-dd")
  const time = now.toString("HH:mm")

  let codeLines = [];
  codeLines.push(`// Code generated by "RegEx Factory": ${date} at ${time}`);
  codeLines.push('');
  makeDraftActionCode(codeLines); // Make Drafts Action Script (add comment to skip)
  codeLines.push('function regExReplace(text) {');
  codeLines.push(`  // Group Title: ${groupTitle}`)
  
  for (const row of reGroup.split('\n')) {
    if (row.startsWith('// ') || row.trim() == '') {
      // Blank and commented lines and set indent:
      codeLines.push(row.replace(/^\/\/ /, '  \/\/ '));
      continue;
    }
    let m = row.match(/^\/(.+?)\/([gmi]{0,3}), ?\"(.*)\"/)
    if (!m) {
      app.displayErrorMessage("Error in line syntax: " + row) ;
      return ['', reGroup];
    }
    
    let fnd = m[1];
    let rep = m[3];
    let sw = m[2];
    if (sw == '') { 
      sw = 'gm'; // Default RegEx switch
    }
    
    let line = `  text = text.replace(/${fnd}/${sw}, '${rep}');`
    codeLines.push(line)
  }
  codeLines.push('  return text;');  
  codeLines.push('}\n\n');
  code = codeLines.join('\n');
  // app.setClipboard(code);
  
  let d = Draft.create();
  d.content = code;
  d.languageGrammar = "JavaScript";
  d.update();
  d.addTag("script");
  d.update();
  
  app.displayInfoMessage('function myRegExReplace() saved to Inbox :)') ;
}

function makeDraftActionCode(codeLines) {
  // Makes fully functioning draft Action Script:
  codeLines.push("var p = Prompt.create();");
  codeLines.push("p.title = 'Run RegEx Replace on Current Draft';");
  codeLines.push("p.addButton('Save as New Draft');");
  codeLines.push("p.addButton('Replace Current Draft');");
  codeLines.push("");
  codeLines.push("if (p.show()) {");
  codeLines.push("  let text = regExReplace(editor.getText());");
  codeLines.push("  ");
  codeLines.push("  switch (p.buttonPressed) {");
  codeLines.push("    case 'Save as New Draft':");
  codeLines.push("      let d = Draft.create();");
  codeLines.push("      d.content = text;");
  codeLines.push("      // d.languageGrammar = 'MultiMarkdown';");
  codeLines.push("      // d.languageGrammar = 'JavaScript';");
  codeLines.push("      d.update();");
  codeLines.push("      d.addTag('regexed');");
  codeLines.push("      d.update();");
  codeLines.push("      break;");
  codeLines.push("    case 'Replace Current Draft':");
  codeLines.push("      editor.setText(text);");
  codeLines.push("      break;");
  codeLines.push("  }");
  codeLines.push("} else {");
  codeLines.push("  context.cancel('Canceled by user!');");
  codeLines.push("}");
  codeLines.push("");
}

