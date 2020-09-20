import React from 'react';
import { Context } from '@/utils/global';
import MonacoEditor from '@monaco-editor/react/lib/';

export function Editor(props) {
  const { onChange, getRef, ...restProps } = props;
  return (
    <MonacoEditor
      //   onChange={handleEditorChange}
      {...restProps}
      editorDidMount={(_, editor) => {
        getRef(editor);
        if (onChange) editor.onDidChangeModelContent(onChange);
      }}
    />
  );
}

export default function RenderEditor(props: {
  raw: string;
  fontSize: number;
  getRef: (ref: any) => void;
  onChange: () => void;
  onSave: () => void;
  onScoll: (e: any) => void;
}) {
  const { raw, fontSize, getRef, onSave, onScoll, onChange } = props;
  const context = React.useContext(Context);
  const opts = {
    fontSize,
    wordWrap: 'on',
    quickSuggestions: false,
    acceptSuggestionOnCommitCharacter: false,
    acceptSuggestionOnEnter: 'off',
    snippetSuggestions: 'none',
  };
  return (
    <Editor
      language="markdown"
      theme={context.theme == 'default' ? 'light' : 'dark'}
      getRef={(ref) => {
        getRef(ref);
        ref.onDidScrollChange(onScoll);

        // Save post when Ctrl + S clicked
        ref.addCommand(2097, onSave);
        if (raw !== '') ref.setValue(raw);
      }}
      options={opts}
      onChange={onChange}
    />
  );
}
