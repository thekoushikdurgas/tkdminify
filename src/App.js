/* eslint-disable no-useless-escape */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import Alert from './Alert';
import cssbeautify from "cssbeautify";
import './App.css';
import SunMoon from './SunMoon';
import Fullscreen from "./Fullscreen";

export default function MusicPlayer() {
  const [alertactive, setalertactive] = useState([false, '', '']);
  const [input, setinput] = useState('input');
  const [output, setoutput] = useState('output');
  const [inputfilesize, setinputfilesize] = useState('-----');
  const [outputfilesize, setoutputfilesize] = useState('-----');
  const [outputtime, setoutputtime] = useState('-----');
  const [outputratio, setoutputratio] = useState('-----');
  const clipboardcode = (a) => { if (!a) { return; } const textarea = document.createElement("textarea"); textarea.value = a; document.body.appendChild(textarea); textarea.select(); document.execCommand("copy"); textarea.remove(); window.prompt('copied!', a); setalertactive([true, 'Success', 'Code is copied']) }
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
    setalertactive([true, 'Success', 'Operation is completed']);
  }
  const toSize = (e) => {
    return e / 1024 < 1 ? e + " bytes" : (e / 1024 + "").replace(/^(\d+\.\d).*/, "$1") + "kB"
  }
  return (
    <>
      <SunMoon />
      <Alert alertactive={alertactive} />
      <div className="w-[100vw] h-[100vh] flex flex-col font-['Acme']">
        <div className="flex flex-row justify-center gap-3 text-[13px] p-[5px_0] w-full bg-[#ffffff1a] shadow-[0_20px_50px_#00000026] border border-[#ffffff80] backdrop-blur-[5px] font-['Acme'] inputdeatails" id="inputdeatails">
          <span className='flex flex-col sm:flex-row sm:gap-1 items-center'><span>Input size:</span><span id="inputfilesize">{inputfilesize}</span></span>
          <span className='flex flex-col sm:flex-row sm:gap-1 items-center'><span>Output Size:</span><span id="outputfilesize">{outputfilesize}</span></span>
          <span className='flex flex-col sm:flex-row sm:gap-1 items-center'><span>Time:</span><span id="outputtime">{outputtime}</span></span>
          <span className='flex flex-col sm:flex-row sm:gap-1 items-center'><span>Ratio:</span><span id="outputratio">{outputratio}</span></span>
          <button className=' flex items-center justify-evenly text-[15px] h-[35px] p-[7px_10px] active:scale-[0.9] hover::scale-[1.1] border border-textcolor mx-0 outline-none focus:shadow-outline gap-2  bg-backgroundcolor' onClick={() => { clipboardcode(output) }}><i className="fi fi-rr-copy-alt"></i><span className='hidden sm:block'>Copy Code</span></button>
          <button className=' flex items-center justify-evenly text-[15px] h-[35px] p-[7px_10px] active:scale-[0.9] hover::scale-[1.1] border border-textcolor mx-0 outline-none focus:shadow-outline gap-2  bg-backgroundcolor' onClick={() => { setinput(''); setoutput(''); setinputfilesize('-----'); setoutputfilesize('-----'); setoutputtime('-----'); setoutputratio('-----'); }}><i className="tkd6-broom"></i><span className='hidden sm:block'>Clear Code</span></button>
        </div>
        <div className='flex h-full'>
          <textarea placeholder="Enter your code......" className="p-[10px] h-full relative overflow-y-auto resize-none w-1/2 bg-[#ffffff1a] shadow-[0_20px_50px_#00000026] border border-[#ffffff80] backdrop-blur-[5px]" id="input" value={input} onChange={(event) => { setinput(event.target.value) }}></textarea>
          <textarea placeholder="Waiting for compile the code" className="p-[10px] h-full relative overflow-y-auto resize-none w-1/2 bg-[#ffffff1a] shadow-[0_20px_50px_#00000026] border border-[#ffffff80] backdrop-blur-[5px]" id="output" onClick={(event) => { event.target.focus(); event.target.select() }} value={output} readOnly></textarea>
        </div>
        <div className="flex justify-center flex-wrap bg-[#ffffff1a] shadow-[0_20px_50px_#00000026] border border-[#ffffff80] backdrop-blur-[5px]">
          <button className=' flex items-center justify-evenly text-[15px] h-[35px] p-[7px_10px] active:scale-[0.9] hover::scale-[1.1] border border-textcolor mx-0 outline-none focus:shadow-outline gap-2  bg-backgroundcolor' onClick={() => { minifycss(4) }}><i className="hidden md:block icon-icon-76-document-file-html"></i><span>Minify HTML</span></button>
          <button className=' flex items-center justify-evenly text-[15px] h-[35px] p-[7px_10px] active:scale-[0.9] hover::scale-[1.1] border border-textcolor mx-0 outline-none focus:shadow-outline gap-2  bg-backgroundcolor' onClick={() => { minifycss(5) }}><i className="hidden md:block icon-icon-76-document-file-html"></i><span>Expand HTML</span></button>
          <button className=' flex items-center justify-evenly text-[15px] h-[35px] p-[7px_10px] active:scale-[0.9] hover::scale-[1.1] border border-textcolor mx-0 outline-none focus:shadow-outline gap-2  bg-backgroundcolor' onClick={() => { minifycss(1) }}><i className="hidden md:block tkd8-css-file"></i><span>Minify CSS</span></button>
          <button className=' flex items-center justify-evenly text-[15px] h-[35px] p-[7px_10px] active:scale-[0.9] hover::scale-[1.1] border border-textcolor mx-0 outline-none focus:shadow-outline gap-2  bg-backgroundcolor' onClick={() => { minifycss(1, 1) }}><i className="hidden md:block tkd8-css-file"></i><span>Minify CSS</span></button>
          <button className=' flex items-center justify-evenly text-[15px] h-[35px] p-[7px_10px] active:scale-[0.9] hover::scale-[1.1] border border-textcolor mx-0 outline-none focus:shadow-outline gap-2  bg-backgroundcolor' onClick={() => { minifycss(2) }}><i className="hidden md:block tkd8-css-file"></i><span>Beautify CSS</span></button>
          <button className=' flex items-center justify-evenly text-[15px] h-[35px] p-[7px_10px] active:scale-[0.9] hover::scale-[1.1] border border-textcolor mx-0 outline-none focus:shadow-outline gap-2  bg-backgroundcolor' onClick={() => { minifycss(3) }}><i className="hidden md:block tkd8-css-file"></i><span>Expand CSS</span></button>
          <button className=' flex items-center justify-evenly text-[15px] h-[35px] p-[7px_10px] active:scale-[0.9] hover::scale-[1.1] border border-textcolor mx-0 outline-none focus:shadow-outline gap-2  bg-backgroundcolor' onClick={() => { minifycss(6) }}><i className="hidden md:block tkd9-js-file"></i><span>Minify JS</span></button>
          <button className=' flex items-center justify-evenly text-[15px] h-[35px] p-[7px_10px] active:scale-[0.9] hover::scale-[1.1] border border-textcolor mx-0 outline-none focus:shadow-outline gap-2  bg-backgroundcolor' onClick={() => { minifycss(7) }}><i className="hidden md:block tkd9-js-file"></i><span>Expand JS</span></button>
        </div>
      </div>
      <div className="absolute top-0 right-0 z-[1] hidden md:block"><Fullscreen /></div>
    </>
  )
}
