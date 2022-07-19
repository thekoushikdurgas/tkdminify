/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import Alert from './component/Alert/Alert';
import cssbeautify from "cssbeautify";
import './App.css';

export default function MusicPlayer() {
  const [alertactive, setalertactive] = useState([false, '', '']);
  const [input, setinput] = useState('input');
  const [output, setoutput] = useState('output');
  const [inputfilesize, setinputfilesize] = useState('-----');
  const [outputfilesize, setoutputfilesize] = useState('-----');
  const [outputtime, setoutputtime] = useState('-----');
  const [outputratio, setoutputratio] = useState('-----');
  const clipboardcode = (a) => { if (!a) { return; } const textarea = document.createElement("textarea"); textarea.value = a; document.body.appendChild(textarea); textarea.select(); document.execCommand("copy"); textarea.remove(); window.prompt('copied!', a);setalertactive([true,'Success','Code is copied']) }
  function minifycss(n, m) {
    var start = new Date();
    setinputfilesize(toSize(input.length));
    var result = '';
    if (input !== "") {
      if (n === 1) {
        result = input.replace(/\/\*.*\*\/|\/\*[\s\S]*?\*\/|\n|\t|\v|\s{2,}/g, "").replace(/\s*\{\s*/g, "{").replace(/\s*\}\s*/g, "}").replace(/\s*\:\s*/g, ":").replace(/\s*\;\s*/g, ";").replace(/\s*\,\s*/g, ",").replace(/\s*\~\s*/g, "~").replace(/\s*\>\s*/g, ">").replace(/\s*\+\s*/g, "+").replace(/\s*\!\s*/g, " !").replace(/\s*\;\}\s*/g, "}");
        if (m === 1) { result = result.replace(/\}/g, "}\n").replace(/\}\n}\n/g, "}}\n"); }
      }
      else if (n === 2) { result = cssbeautify(input, { indent: "    ", openbrace: "end-of-line", autosemicolon: !0 }); }
      else if (n === 3) { result = input.replace(/\#/g, "\n#").replace(/\./g, "\n.").replace(/\{/g, "{\n").replace(/\}/g, "}\n").replace(/\;/g, ";\n"); }
      else if (n === 4) { result = input.replace(/\<\!--\s*?[^\s?\[][\s\S]*?--\>/g, "").replace(/\>\s*\</g, "><"); }
      else if (n === 5) { result = input.replace(/\>\</g, '>\n<'); }
      else if (n === 6) { result = input.replace(/\/\*[\s\S]*?\*\/|\/\/.*\n|\s{2,}|\n|\t|\v|\s(?=function\(.*?\))|\s(?=\=)|\s(?=\{)/g, "").replace(/\s?function\s?\(/g, "function(").replace(/\s?\{\s?/g, "{").replace(/\s?\}\s?/g, "}").replace(/\,\s?/g, ",").replace(/if\s?/g, "if"); }
      else if (n === 7) { result = input.replace(/\{/g, " {\n\t").replace(/\}/g, "\n}\n").replace(/\;/g, ";\n\t"); }
    }
    var end = new Date();
    setoutput(result);
    setoutputfilesize(toSize(result.length));
    setoutputtime((end - start) / 1000 + ' sec');
    setoutputratio((input.length / result.length + '').replace(/^(\d+\.\d{1,2}).*/, '$1') + '~' + Math.round(100 - (result.length * 100 / input.length)) + '%');
    document.getElementById('output').select();
    setalertactive([true,'Success','Operation is completed']);
  }
  const toSize = (e) => {
    return e / 1024 < 1 ? e + " bytes" : (e / 1024 + "").replace(/^(\d+\.\d).*/, "$1") + "kB"
  }
  return (
    <>
      <Alert alertactive={alertactive} />
      <div className='minify'>
        <div className="minifydeatails">
          <div className="buttonminifydiv inputdeatails" id="inputdeatails"><span>Input size: <span id="inputfilesize">{inputfilesize}</span></span></div>
          <div className="buttonminifydiv outputdeatails" id="outputdeatails"><span>Output Size: <span id="outputfilesize">{outputfilesize}</span></span><span>Time: <span id="outputtime">{outputtime}</span></span><span>Ratio: <span id="outputratio">{outputratio}</span></span></div>
        </div>
        <div className='minifydiv'>
          <textarea placeholder="Enter your code......" className="input tkdtextarea" id="input" value={input} onChange={(event) => { setinput(event.target.value) }}></textarea>
          <textarea placeholder="Waiting for compile the code" className="output tkdtextarea" id="output" onClick={(event) => { event.target.focus(); event.target.select() }} value={output} readOnly></textarea>
        </div>
        <div className="buttonminifys">
          <button onClick={() => { minifycss(4) }}><i className="icon-icon-76-document-file-html"></i><span>Minify HTML</span></button>
          <button onClick={() => { minifycss(5) }}><i className="icon-icon-76-document-file-html"></i><span>Expand HTML</span></button>
          <button onClick={() => { minifycss(1) }}><i className="tkd8-css-file"></i><span>Minify CSS</span></button>
          <button onClick={() => { minifycss(1, 1) }}><i className="tkd8-css-file"></i><span>Minify CSS</span></button>
          <button onClick={() => { minifycss(2) }}><i className="tkd8-css-file"></i><span>Beautify CSS</span></button>
          <button onClick={() => { minifycss(3) }}><i className="tkd8-css-file"></i><span>Expand CSS</span></button>
          <button onClick={() => { minifycss(6) }}><i className="tkd9-js-file"></i><span>Minify JS</span></button>
          <button onClick={() => { minifycss(7) }}><i className="tkd9-js-file"></i><span>Expand JS</span></button>
          <button onClick={() => { clipboardcode(output) }}><i className="fi fi-rr-copy-alt"></i><span>Copy Code</span></button>
          <button onClick={() => { setinput(''); setoutput(''); setinputfilesize('-----'); setoutputfilesize('-----'); setoutputtime('-----'); setoutputratio('-----'); }}><i className="tkd6-broom"></i><span>Clear Code</span></button>
        </div>
      </div>
    </>
  )
}
