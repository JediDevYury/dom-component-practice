import { useState } from 'react';
import Editor from '@/components/dom-components/text-editor';
import { Text, StyleSheet } from 'react-native';

const IS_DOM = typeof Editor !== 'undefined';

export default function HomeScreen() {
  const [editorState, setEditorState] = useState<string | null>(null);
  const [plainText, setPlainText] = useState<string>('');

  const wordCount = plainText.split(/\s+/).filter(word => word.length > 0).length;

  return (
    <>
      <Text style={styles.heading}>Text: {plainText}</Text>
      <Text style={styles.heading}>Word Count: {wordCount}</Text>
      <Editor
        dom={{
          matchContents: false,
        }}
        setPlainText={setPlainText}
        setEditorState={setEditorState}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nativeSection: {
    padding: 16,
  },
  heading: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 16,
    marginVertical: 10,
  },
  wordCount: {
    fontSize: 16,
  },
  domSection: {
    flex: 1,
  },
});
