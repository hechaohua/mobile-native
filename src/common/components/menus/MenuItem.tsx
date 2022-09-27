import React, { ReactNode, useMemo } from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import { AvatarSource } from '../../../channel/UserModel';
import ThemedStyles, { useMemoStyle } from '../../../styles/ThemedStyles';
import { B2, Column, Icon, IIconColor, IIconSize, Row } from '../../ui';
import { IconMapNameType } from '../../ui/icons/map';
import MPressable from '../MPressable';
import MText from '../MText';

export type MenuItemProps = {
  containerItemStyle?: StyleProp<ViewStyle>;
  avatar?: AvatarSource;
  title: string | ReactNode;
  titleStyle?: StyleProp<TextStyle>;
  subtitle?: string;
  icon?: IconMapNameType | ReactNode;
  iconSize?: IIconSize;
  iconColor?: IIconColor;
  borderless?: boolean;
  label?: string;
  noBorderTop?: boolean;
  noIcon?: boolean;
} & TouchableOpacityProps;

export default function ({
  containerItemStyle,
  title,
  subtitle,
  onPress,
  icon,
  iconSize,
  iconColor,
  avatar,
  borderless,
  label,
  noBorderTop,
  noIcon,
  titleStyle,
  ...props
}: MenuItemProps) {
  const containerStyle = useMemoStyle(() => {
    const stylesList: any = [
      'rowJustifyStart',
      'alignCenter',
      'paddingVertical4x',
      'paddingHorizontal4x',
    ];
    if (!borderless) {
      stylesList.push(
        'borderTopHair',
        'borderBottomHair',
        'bcolorPrimaryBorder',
      );
    }
    if (noBorderTop) {
      stylesList.push('borderTop0x');
    }
    if (containerItemStyle) {
      stylesList.push(containerItemStyle);
    }
    return stylesList;
  }, [containerItemStyle, borderless]);

  const theTitleStyle = useMemoStyle(() => {
    const stylesList: any[] = ['fontL', 'fontMedium'];

    if (titleStyle) {
      stylesList.push(titleStyle);
    }

    return stylesList;
  }, [titleStyle]);

  const rightIcon = useMemo(() => {
    if (!icon && onPress) {
      return <Icon name={'chevron-right'} size={iconSize} color={iconColor} />;
    }

    if (typeof icon === 'string') {
      return (
        <Icon
          name={icon as IconMapNameType}
          size={iconSize}
          color={iconColor}
        />
      );
    }

    return icon;
  }, [icon, iconColor, iconSize, onPress]);

  return (
    <MPressable {...props} onPress={onPress} style={containerStyle}>
      {avatar && <FastImage source={avatar} style={styles.avatar} />}
      <Column flex right={rightIcon ? 'XXL' : undefined}>
        <Row align="centerBetween">
          <MText style={theTitleStyle} numberOfLines={1}>
            {title}
          </MText>
          {Boolean(label) && (
            <B2
              color="secondary"
              numberOfLines={1}
              right={rightIcon ? 'M' : undefined}>
              {label}
            </B2>
          )}
        </Row>
        {Boolean(subtitle) && (
          <B2 top="XS" color="secondary" testID={`subtitle-${subtitle}`}>
            {subtitle}
          </B2>
        )}
      </Column>
      {Boolean(rightIcon) && !noIcon && (
        <View style={styles.rightIcon}>{rightIcon}</View>
      )}
    </MPressable>
  );
}

const styles = ThemedStyles.create({
  avatar: [
    {
      height: 40,
      width: 40,
      borderRadius: 20,
    },
    'bgTertiaryBackground',
    'marginRight4x',
  ],
  rightIcon: {
    position: 'absolute',
    right: 15,
  },
});
