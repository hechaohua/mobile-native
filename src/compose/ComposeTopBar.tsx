import { observer } from 'mobx-react';
import React, { ReactNode, useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { Circle } from 'react-native-animated-spinkit';
import { Icon, IconButton, IconButtonNext } from '~ui/icons';
import { confirm } from '../common/components/Confirm';
import MText from '../common/components/MText';
import SupermindLabel from '../common/components/supermind/SupermindLabel';
import i18n from '../common/services/i18n.service';
import { Button, H3, Row } from '../common/ui';
import ThemedStyles from '../styles/ThemedStyles';
import { pushComposeCreateScreen } from './ComposeCreateScreen';
import { ComposeCreateMode } from './createComposeStore';
import type { ComposeStoreType } from './useComposeStore';
import BaseModel from '../common/BaseModel';

interface ComposeTopBarProps {
  onPressBack: () => void;
  store: ComposeStoreType;
}

/**
 * Compose Top bar
 */
export default observer(function ComposeTopBar(props: ComposeTopBarProps) {
  const { store } = props;
  const theme = ThemedStyles.style;
  const isScheduled = useMemo(
    () => store.time_created && BaseModel.isScheduled(store.time_created),
    [store.time_created],
  );

  const onPressPost = useCallback(async () => {
    if (store.attachments.uploading) {
      return;
    }
    const { channel: targetChannel, payment_options } =
      store.supermindRequest ?? {};

    if (
      targetChannel?.name &&
      payment_options?.amount &&
      !(await confirm({
        title: i18n.t('supermind.confirmNoRefund.title'),
        description: i18n.t('supermind.confirmNoRefund.offerDescription'),
      }))
    ) {
      return;
    }

    const isEdit = store.isEdit;
    const entity = await store.submit();

    if (entity) {
      store.onPost(entity, isEdit);
    }
  }, [store]);

  const rightButton = props.store.posting ? (
    <View style={styles.dotIndicatorContainerStyle}>
      <Circle size={28} color={ThemedStyles.getColor('Link')} />
    </View>
  ) : (
    <>
      {isScheduled && <Icon name="alarm" size="small" right="XL" />}
      {store.isEdit ? (
        <MText
          style={styles.postButton}
          onPress={onPressPost}
          testID="topBarDone">
          {i18n.t('save')}
        </MText>
      ) : (
        <IconButtonNext
          name="send"
          size="medium"
          scale
          onPress={onPressPost}
          disabled={!store.isValid}
          color={store.isValid ? 'Link' : 'Icon'}
          style={store.attachments.uploading ? theme.opacity25 : null}
        />
      )}
    </>
  );

  const handleModePress = () =>
    pushComposeCreateScreen({
      selected: store.createMode,
      onItemPress: async mode => store.setCreateMode(mode),
    });

  return (
    <Row vertical="S" left="XS" right="L" align="centerStart">
      <IconButton
        size={30}
        name="close"
        style={styles.back}
        onPress={props.onPressBack}
        testID="topbarBack"
      />
      <Button
        mode="flat"
        fit
        onPress={handleModePress}
        shouldAnimateChanges={false}
        icon={!store.isEdit && <Icon name="chevron-down" color="PrimaryText" />}
        reversedIcon
        disabled={store.isEdit}>
        {store.isEdit ? (
          <H3 font="regular">Edit Post</H3>
        ) : (
          <H3 font="regular">{createModeMapping[store.createMode]}</H3>
        )}
      </Button>
      <View style={theme.flexContainer} />
      {rightButton}
    </Row>
  );
});

const createModeMapping: Record<ComposeCreateMode, string | ReactNode> = {
  boost: i18n.t('composer.create.boost'),
  monetizedPost: i18n.t('composer.create.newPost'),
  post: i18n.t('composer.create.newPost'),
  supermind: <SupermindLabel font="H3" height={27} />,
};

const styles = ThemedStyles.create({
  dotIndicatorContainerStyle: [
    'rowJustifyEnd',
    {
      width: 24,
      height: 24,
    },
  ],
  topBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingLeft: 5,
  },
  leftText: [
    'textCenter',
    {
      position: 'absolute',
      textAlign: 'center',
      fontSize: 20,
    },
  ],
  postButton: {
    textAlign: 'right',
    fontSize: 16,
  },
  back: ['colorIcon', 'paddingLeft2x', 'paddingRight2x'],
});
