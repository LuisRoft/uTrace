import { View } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedViewProps } from '@/types/ThemedViewTypes';

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <View style={[{ backgroundColor, paddingHorizontal: 35,  paddingVertical: 10, minHeight:"100%"}, style,]} {...otherProps} />;
}
