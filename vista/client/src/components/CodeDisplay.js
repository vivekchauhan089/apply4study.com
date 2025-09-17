import React,{useState} from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';

const CodeDisplay = () =>{ 
const example = `#include <stdio.h>
int main() {
    printf("C programming");
};
`;
const[code,setCode]=useState(example);
 
    return (
    <div>    
     <h2>Exercise 1</h2>   
      <Editor
        value={code}
        onValueChange={e => setCode((e))}
        highlight={code => highlight(code, languages.js)}
        padding={10}
        style={{ 
          fontSize: 20,
          backgroundColor: '#000',
          color: '#fff'
        }}
        
      />
      </div>
    );
  }

export default CodeDisplay;