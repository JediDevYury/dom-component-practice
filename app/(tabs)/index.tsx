import { useState } from 'react';
import Editor from '@/components/dom-components/TextEditor';
import {Text, StyleSheet, Pressable, View} from 'react-native';

import "@/global.css"

export default function HomeScreen() {
  const [, setEditorState] = useState<string | null>(null);
  const [plainText, setPlainText] = useState<string>('');

  const wordCount = plainText.split(/\s+/).filter(word => word.length > 0).length;

  return (
    <View className="flex-[1] px-[4] pb-safe pt-safe">
      <Text style={styles.heading}>Text: {plainText}</Text>
      <Text style={styles.heading}>Word Count: {wordCount}</Text>
      <Editor
        dom={{
          matchContents: false,
        }}
        setPlainText={setPlainText}
        setEditorState={setEditorState}
      />
      <Pressable onPress={() => {}} className={"flex items-center m-[8]"}>
        <Text className="w-1/3 border border-red-600 rounded text-center px-2 py-4 bg-red-600 m-0 text-white">
          Show Html
        </Text>
      </Pressable>
    </View>
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
