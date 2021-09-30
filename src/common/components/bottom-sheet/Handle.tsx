import { View } from 'react-native';
import ThemedStyles, { useMemoStyle } from '../../../styles/ThemedStyles';
import React, { FC } from 'react';

interface HandleProps {
  showHandleBar?: boolean;
  style?: any;
}

const Handle: FC<HandleProps> = ({ children, showHandleBar = true, style }) => (
  <View
    style={useMemoStyle(
      [children ? styles.containerWithChildren : styles.container, style],
      [style],
    )}
  >
    {showHandleBar && (
      <View style={ThemedStyles.style.alignCenter}>
        <View style={styles.handleBar} />
      </View>
    )}

    {children}
  </View>
);

export default Handle;

const styles = ThemedStyles.create({
  container: [
    {
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingTop: 10,
      paddingBottom: 5,
    },
    'bgPrimaryBackgroundHighlight',
  ],
  get containerWithChildren() {
    return [
      ...this.container,
      'borderBottomHair',
      'bcolorPrimaryBorder',
      'bgPrimaryBackground',
    ];
  },
  handleBar: [
    {
      width: 30,
      height: 5,
      borderRadius: 10,
    },
    'bgTertiaryBackground',
  ],
});
