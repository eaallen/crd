import { UnControlled as CodeMirror } from 'react-codemirror2'

export default function CodeEdit(props) {
    return <CodeMirror
        value='<h1>I ♥ react-codemirror2</h1>'
        options={{
            mode: 'xml',
            theme: 'material',
            lineNumbers: true
        }}
        onChange={(editor, data, value) => {
        }}
    />
}