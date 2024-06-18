import { Text } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedTextProps } from '@/types/ThemedTextTypes';
import { styles } from '@/styles/themedTextStyles';

const fontFamily = 'Blinker-Regular';

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <Text
      style={[
        { color, fontFamily },
        type === 'default' ? styles.default : undefined,
        type === 'title' ? styles.title : undefined,
        type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        type === 'subtitle' ? styles.subtitle : undefined,
        type === 'link' ? styles.link : undefined,
        type === 'superTitle' ? styles.superTitle : undefined,
        style,
      ]}
      {...rest}
    />
  );
}