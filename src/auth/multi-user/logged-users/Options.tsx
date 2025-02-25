import React from 'react';
import { TouchableOpacity } from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {
  BottomSheetModal,
  BottomSheetButton,
  BottomSheetMenuItem,
  BottomSheetMenuItemProps,
} from '../../../common/components/bottom-sheet';
import MText from '../../../common/components/MText';
import i18n from '../../../common/services/i18n.service';
import ThemedStyles from '../../../styles/ThemedStyles';
import AuthService from '../../AuthService';

type PropsType = {
  index: number;
  isActive: boolean;
  username: string;
  onSwitchPress: Function;
};

const hitSlop = { top: 10, bottom: 10, left: 10, right: 10 };

const Options = ({ index, isActive, username, onSwitchPress }: PropsType) => {
  const theme = ThemedStyles.style;
  const ref = React.useRef<any>();
  const close = React.useCallback(() => {
    ref.current?.dismiss();
  }, []);
  const show = React.useCallback(() => {
    ref.current?.present();
  }, []);
  const userOptions: Array<BottomSheetMenuItemProps> = React.useMemo(() => {
    const actions: Array<BottomSheetMenuItemProps> = [
      {
        title: i18n.t('settings.logout'),
        iconName: 'logout',
        iconType: 'material',
        onPress: () => {
          close();
          AuthService.logoutFrom(index);
        },
      },
    ];

    if (!isActive) {
      actions.unshift({
        title: i18n.t('multiUser.switchChannel'),
        iconName: 'account-box-multiple',
        iconType: 'material-community',
        onPress: () => {
          close();
          onSwitchPress();
        },
      });
    }

    return actions;
  }, [close, index, isActive, onSwitchPress]);
  return (
    <TouchableOpacity
      onPress={show}
      hitSlop={hitSlop}
      testID="userDropdownMenu">
      <MIcon name="more-vert" size={24} style={theme.colorSecondaryText} />
      <BottomSheetModal ref={ref}>
        <MText style={styles.username}>@{username}</MText>
        {userOptions.map((a, i) => (
          <BottomSheetMenuItem {...a} key={i} />
        ))}
        <BottomSheetButton text={i18n.t('cancel')} onPress={close} />
      </BottomSheetModal>
    </TouchableOpacity>
  );
};

const styles = ThemedStyles.create({
  username: ['centered', 'bold', 'marginVertical5x', { fontSize: 20 }],
});

export default Options;
