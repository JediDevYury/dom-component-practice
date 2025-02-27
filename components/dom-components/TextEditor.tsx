"use dom";
import "@/global.css"
import "./styles/text-editor.css"
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import React from "react";

import ExampleTheme from "./theme";
import ToolbarPlugin from "./plugins/ToolBarPlugin";
import TreeViewPlugin from "./plugins/TreeViewPlugin";
import { $getRoot, EditorState } from "lexical";

const EDITOR_PLACEHOLDER = "Enter some rich text...";

const EDITOR_CONFIG = {
  namespace: "React.js Demo",
  nodes: [],
  onError(error: Error) {
    throw error;
  },
  theme: ExampleTheme,
};

type DOMProps = import('expo/dom').DOMProps;

interface EditorProps {
  setPlainText: React.Dispatch<React.SetStateAction<string>>;
  setEditorState: React.Dispatch<React.SetStateAction<string | null>>;
  dom?: DOMProps;
}

export default function Editor({ setPlainText, setEditorState }: EditorProps) {
  const handleEditorChange = React.useCallback(
    (editorState: EditorState) => {
      editorState.read(() => {
        const root = $getRoot();
        const textContent = root.getTextContent();
        setPlainText(textContent);
      });
      setEditorState(JSON.stringify(editorState.toJSON()));
    },
    [setPlainText, setEditorState]
  );

  return (
    <LexicalComposer initialConfig={EDITOR_CONFIG}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                className="editor-input"
                aria-placeholder={EDITOR_PLACEHOLDER}
                placeholder={
                  <div className="editor-placeholder text-red-500">{EDITOR_PLACEHOLDER}</div>
                }
              />
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <OnChangePlugin
            onChange={handleEditorChange}
            ignoreHistoryMergeTagChange
            ignoreSelectionChange
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <TreeViewPlugin />
        </div>
      </div>
    </LexicalComposer>
  );
}