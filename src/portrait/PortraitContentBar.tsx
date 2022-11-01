import React, { useCallback } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { observer } from 'mobx-react';
import { View } from 'react-native';
import ThemedStyles from '../styles/ThemedStyles';
import { AVATAR_SIZE } from '~/styles/Tokens';
import PortraitContentBarItem from './PortraitContentBarItem';
import { PortraitBarItem } from './createPortraitStore';
import { useNavigation } from '@react-navigation/native';
import { useStores } from '../common/hooks/use-stores';
import PressableScale from '~/common/components/PressableScale';
import { B3, Icon, Row } from '~/common/ui';
import i18nService from '~/common/services/i18n.service';
import Placeholder from '~/common/components/Placeholder';

/**
 * Header component
 */
const Header = () => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.addContainer}>
      <PressableScale
        onPress={() => navigation.push('Capture', { portrait: true })}>
        <View style={styles.addCircle}>
          <Icon size={'huge'} name="plus" color="White" />
        </View>
      </PressableScale>
      <B3 top="XS">{i18nService.t('newMoment')}</B3>
    </View>
  );
};

/**
 * Portrait bar Ref
 */
export const portraitBarRef = React.createRef<FlatList<PortraitBarItem>>();

const BarPlaceholder = () => {
  return (
    <Row space="M">
      <Placeholder
        horizontal="XS"
        radius="round"
        width={AVATAR_SIZE.medium}
        height={AVATAR_SIZE.medium}
      />
      <Placeholder
        horizontal="XS"
        radius="round"
        width={AVATAR_SIZE.medium}
        height={AVATAR_SIZE.medium}
      />
      <Placeholder
        horizontal="XS"
        radius="round"
        width={AVATAR_SIZE.medium}
        height={AVATAR_SIZE.medium}
      />
    </Row>
  );
};

const renderItem = ({
  item,
  index,
}: {
  item: PortraitBarItem;
  index: number;
}) => {
  return (
    <PortraitContentBarItem
      avatarUrl={item.user.getAvatarSource()}
      title={item.user.username}
      unseen={item.unseen}
      index={index}
    />
  );
};

/**
 * Portrait content bar
 */
const PortraitContentBar = observer(() => {
  const store = useStores().portrait;

  const Empty = useCallback(() => {
    if (store.loading) {
      return <BarPlaceholder />;
    }
    return null;
  }, [store]);

  return (
    <View style={styles.containerStyle}>
      <FlatList
        // @ts-ignore
        ref={portraitBarRef}
        contentContainerStyle={styles.listContainerStyle}
        style={styles.bar}
        horizontal={true}
        ListHeaderComponent={Header}
        ListEmptyComponent={Empty}
        renderItem={renderItem}
        data={store.items.slice()}
        keyExtractor={keyExtractor}
      />
    </View>
  );
});

const keyExtractor = (item, _) => item.user.guid;

const styles = ThemedStyles.create({
  bar: {
    minHeight: 90,
  },
  loading: {
    height: 80,
    alignSelf: 'center',
  },
  addContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  addCircle: [
    {
      marginHorizontal: 12,
      marginBottom: 2,
      height: AVATAR_SIZE.medium,
      width: AVATAR_SIZE.medium,
      borderRadius: AVATAR_SIZE.medium / 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    'bgAvatarActive',
  ],
  listContainerStyle: [
    'paddingLeft2x',
    'rowJustifyStart',
    'bgPrimaryBackground',
  ],
  containerStyle: ['borderBottom6x', 'bcolorBaseBackground', 'fullWidth'],
});

export default PortraitContentBar;
