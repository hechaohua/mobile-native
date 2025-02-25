import { observer } from 'mobx-react';
import React from 'react';
import Button from '../../common/components/Button';
import ThemedStyles from '../../styles/ThemedStyles';
import type { BoostStoreType } from './createBoostStore';

type PropsType = {
  localStore: BoostStoreType;
};

const BoostButton = observer(({ localStore }: PropsType) => {
  const theme = ThemedStyles.style;

  return (
    <Button
      onPress={localStore.boost}
      text={localStore.buttonText}
      containerStyle={[
        theme.bgPrimaryBackground,
        theme.paddingVertical2x,
        theme.paddingHorizontal4x,
        theme.marginTop,
        theme.marginBottom7x,
        theme.marginRight5x,
        theme.bcolorLink,
        theme.border,
        theme.alignSelfEnd,
      ]}
      textStyle={[
        theme.buttonText,
        theme.colorPrimaryText,
        theme.bold,
        theme.fontLM,
      ]}
      loading={localStore.loading}
    />
  );
});

export default BoostButton;
