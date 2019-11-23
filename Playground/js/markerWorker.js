// monaco is using 'define' for module dependencies and service lookup.
// hopefully typescript is self-contained
var ts = null;
var define = function (id, dependencies, callback) {
    console.log(id);
    ts = callback();
    console.log(ts);
};

importScripts("../node_modules/monaco-editor/dev/vs/language/typescript/lib/typescriptServices.js");

function processScript(code, version) {
    try {
        const markers = [{
        startLineNumber: 1,
        endLineNumber: 1,
        startColumn: 1,
        endColumn: 10,
        message: 'message!',
        severity: 2,
        source: 'babylonjs',
    }];

    self.postMessage({ markers, version });
    } catch (e) {
      console.error('marker.worker: ' + e);
      /* Ignore error */
    }
}


function visitNode(node) {
    if (node.jsDoc) {
        /*const comments = node.jsDoc.map(e => e.comment).join();
        if (comments.indexOf("deprecated") >= 0)
            debugger;*/

            const tags = ts.getJSDocTags(node);
            debugger;
    }


   

    ts.forEachChild(node, visitNode);
}

function processDefinition(code, version) {
    console.log('processDefinition');
  

    const options = {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ESNext,
        strict: true,
        suppressOutputPathCheck: false
    };
    
    const file = {fileName: 'test.ts', content: code};
    var sourceFile = ts.createSourceFile(file.fileName, file.content, ts.ScriptTarget.ESNext, false);

    ts.forEachChild(sourceFile, visitNode);


    /*const compilerHost = {
    	getSourceFile: (fileName) => {
    		file.sourceFile = file.sourceFile || ts.createSourceFile(fileName, file.content, ts.ScriptTarget.ESNext, true);
    		return file.sourceFile;
    	},
    	writeFile: (fileName, data) => {
    		console.log('writeFile =====> fileName: ', fileName, ', data: ', data);
    	},
    	getCurrentDirectory: () => {
    		return '';
    	},
    	useCaseSensitiveFileNames: () => {
    		return false;
    	},
    	getCanonicalFileName: (fileName) => {
    		return fileName;
    	},
    	fileExists: (fileName) => {
    		return true;
    	},
    	getDefaultLibFileName: (options) => {
    		return 'lib.d.ts';
    	},
    	getNewLine: () => {
    		return '\n';
    	}
    };   */ 

    /*const program = ts.createProgram([file.fileName], options, compilerHost);*/
    //var tags = ts.getJSDocTags(res1);

    //let emitResult = program.emit();    


}


self.addEventListener('message', event => {
    const { type, code, version } = event.data;

    switch(type) {
        case 'script':
            processScript(code, version);
            break;
        case 'definition':
            processDefinition(code, version);
            break;
        default:
            console.error('Unknown type: ' + type);
    }
});

//});