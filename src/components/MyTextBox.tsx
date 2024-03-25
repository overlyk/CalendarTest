import * as React from 'react';
import { TextInput } from 'react-native-paper';

export default function MyTextBox({ label } : { label: string }) {
  const [text, setText] = React.useState("");

  return (
    <TextInput
      label={label}
      value={text}
      onChangeText={text => setText(text)}
    />
  );
};