import { observer } from 'mobx-react';
import React from 'react';
import { Platform, View } from 'react-native';
import InputContainer from '../../common/components/InputContainer';
import MText from '../../common/components/MText';
import i18n from '../../common/services/i18n.service';
import ThemedStyles from '../../styles/ThemedStyles';
import type { BoostStoreType } from './createBoostStore';

type PropsType = {
  localStore: BoostStoreType;
};

const BoostInput = observer(({ localStore }: PropsType) => {
  const theme = ThemedStyles.style;
  const vPadding =
    Platform.OS === 'android' ? theme.paddingVertical0x : theme.paddingVertical;
  const marginB =
    Platform.OS === 'android' ? theme.marginBottom0x : theme.marginBottom;
  const commonProps = {
    keyboardType: 'decimal-pad',
    selectTextOnFocus: true,
    style: vPadding,
    containerStyle: theme.bgPrimaryBackgroundHighlight,
    labelStyle: [marginB, theme.fontM],
  };
  return (
    <View>
      <InputContainer
        placeholder={i18n.t('views')}
        onChangeText={localStore.setAmountViews}
        value={localStore.amountViews.toString()}
        noBottomBorder
        {...commonProps}
      />
      <InputContainer
        placeholder={
          localStore.payment === 'cash' ? i18n.t('usd') : i18n.t('tokens')
        }
        onChangeText={localStore.setAmountTokens}
        value={localStore.amountTokens.toString()}
        {...commonProps}
      />
      <MText
        style={[
          theme.textRight,
          theme.paddingRight4x,
          theme.marginTop2x,
          theme.marginBottom6x,
          theme.colorSecondaryText,
          theme.fontLM,
        ]}>
        {localStore.payment === 'cash'
          ? i18n.t('boosts.boostCashViews', {
              amount: '1.25',
              views: '1000',
            })
          : i18n.t('boosts.boostTokenViews', {
              amount: '1',
              views: '1000',
            })}
      </MText>
    </View>
  );
});

export default BoostInput;
