import React, { useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { IconButton } from '~ui/icons';
import ThemedStyles from '../../../styles/ThemedStyles';
import Button from '../Button';
import MText from '../MText';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const TIMED = {
  duration: 175,
  easing: Easing.quad,
};

type TabTiltePropsType = {
  isCurrent: boolean;
  title: string;
};

function TabTitle({ isCurrent, title }: TabTiltePropsType) {
  if (!title) {
    return null;
  }

  return (
    <MText style={isCurrent ? touchableTextStyleSelected : touchableTextStyle}>
      {title}
    </MText>
  );
}

const TopBarButtonTabBarItem = ({ tab, buttonCmp, onChange, current }) => {
  const theme = ThemedStyles.style;
  const transform = useSharedValue(0);
  const isCurrent = tab.id === current;
  const isButton = !buttonCmp || buttonCmp === 'Button';
  const animatedViewStyles = isCurrent ? bottomLineSelected : bottomLine;

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: transform.value }],
    };
  });

  useEffect(() => {
    if (isButton) {
      return;
    }
    if (isCurrent) {
      transform.value = withTiming(-3 + StyleSheet.hairlineWidth, TIMED);
      return;
    }
    transform.value = withTiming(0, TIMED);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCurrent]);

  const renderChild = () => {
    if (isButton) {
      return (
        <Button
          borderless
          onPress={() => onChange(tab.id)}
          text={tab.title}
          containerStyle={[
            styles.buttonContainer,
            isCurrent ? theme.bgLink : theme.bgTransparent,
          ]}
          textStyle={[styles.text, !isCurrent ? theme.colorSecondaryText : {}]}
        />
      );
    }

    if (tab.title) {
      return (
        <TouchableOpacity
          onPress={() => onChange(tab.id)}
          style={touchableContainer}>
          <TabTitle isCurrent={isCurrent} title={tab.title} />
        </TouchableOpacity>
      );
    }

    if (tab.icon) {
      return (
        <IconButton
          scale
          onPress={() => onChange(tab.id)}
          name={tab.icon.name}
          active={isCurrent}
          style={touchableContainer}
        />
      );
    }

    return null;
  };

  return (
    <View style={containerStyles}>
      {renderChild()}
      {!isButton && (
        <Animated.View style={[animatedViewStyles, animatedStyles]} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
  },
  buttonContainer: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 24,
    marginVertical: 4,
  },
  bottomLine: {
    position: 'absolute',
    bottom: -3 + StyleSheet.hairlineWidth,
    height: 3,
    width: '100%',
    left: 0,
    zIndex: 100,
  },
  touchableContainer: {
    flex: 1,
    height: 52,
    paddingBottom: 3,
    alignItems: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
    fontFamily: 'Roboto-Medium',
  },
  touchableText: {
    fontWeight: '700',
    fontSize: 16,
  },
});

const touchableTextStyleSelected = ThemedStyles.combine(
  styles.touchableText,
  'colorPrimaryText',
);
const touchableTextStyle = ThemedStyles.combine(
  styles.touchableText,
  'colorSecondaryText',
);
const containerStyles = ThemedStyles.combine(styles.container);
const bottomLine = ThemedStyles.combine('bgPrimaryBorder', styles.bottomLine);
const bottomLineSelected = ThemedStyles.combine(
  'bgIconActive',
  styles.bottomLine,
);
const touchableContainer = ThemedStyles.combine(styles.touchableContainer);

export default TopBarButtonTabBarItem;
