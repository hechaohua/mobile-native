import React, { useRef } from 'react';
import { observer } from 'mobx-react';
import i18n from '../../common/services/i18n.service';
import Selector from '../../common/components/SelectorV2';
import ThemedStyles from '../../styles/ThemedStyles';
import type { BoostStoreType } from './createBoostStore';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { WalletCurrency } from '../../wallet/v2/WalletTypes';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import MText from '../../common/components/MText';

type PropsType = {
  localStore: BoostStoreType;
};

const TokenSelector = observer(({ localStore }: PropsType) => {
  const theme = ThemedStyles.style;
  const selectorRef = useRef<any>(null);

  const getMethodLabel = (method: WalletCurrency) => (
    <MText style={[theme.fontL, theme.centered]}>
      {method.label === 'Off-chain' ? 'Off-chain' : 'On-Chain'}{' '}
      <MText style={theme.colorSecondaryText}>({method.balance} tokens)</MText>
    </MText>
  );

  return (
    <View>
      <MText
        style={[
          theme.colorSecondaryText,
          theme.marginBottom3x,
          theme.paddingLeft4x,
        ]}>
        {i18n.t('boosts.paymentMethod')}
      </MText>
      <TouchableOpacity
        style={[
          styles.touchable,
          theme.paddingHorizontal4x,
          theme.bgPrimaryBackgroundHighlight,
          theme.bcolorPrimaryBorder,
          theme.borderTop,
          theme.borderBottom,
        ]}
        onPress={() =>
          selectorRef.current?.show(localStore.selectedPaymentMethod.label)
        }>
        {getMethodLabel(localStore.selectedPaymentMethod)}
        <Icon
          name="menu-down"
          size={24}
          color={ThemedStyles.getColor('Icon')}
          style={theme.centered}
        />
      </TouchableOpacity>
      <Selector
        ref={selectorRef}
        onItemSelect={localStore.setPaymentMethod}
        title={''}
        data={localStore.paymentMethods}
        valueExtractor={getMethodLabel}
        keyExtractor={localStore.getMethodKey}
        textStyle={theme.fontXXL}
        backdropOpacity={0.95}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  touchable: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 50,
  },
});

export default TokenSelector;
