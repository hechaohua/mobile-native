import React, { useMemo, useState } from 'react';
import { Platform, Pressable, StyleSheet } from 'react-native';
import ThemedStyles from '../../styles/ThemedStyles';

/**
 * A Pressable-extended component to have more control over
 * touchable elements across the app and in different platforms.
 */
const MPressable = ({ ...props }) => {
  const [pressed, setPressed] = useState(false);

  const platformSpecificProps = useMemo(
    () =>
      Platform.select({
        android: {
          android_ripple: {
            color: ThemedStyles.getColor('TertiaryBackground'),
          },
        },
        default: {
          onPressIn: () => setPressed(true),
          onPressOut: () => setPressed(false),
          style: [
            props.style,
            {
              backgroundColor: pressed
                ? ThemedStyles.getColor('SecondaryBackground')
                : props.style
                ? StyleSheet.flatten(props.style).backgroundColor
                : undefined,
            },
          ],
        },
      }),
    [pressed, props.style],
  );

  return <Pressable {...props} {...platformSpecificProps} />;
};

export default MPressable;
