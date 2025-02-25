import React from 'react';
import { Trans } from 'react-i18next';
import { Keyboard, View } from 'react-native';
import { pushBottomSheet } from '../common/components/bottom-sheet';
import MenuItem from '../common/components/menus/MenuItem';
import SupermindLabel from '../common/components/supermind/SupermindLabel';
import { B2, Screen, ScreenHeader, Spacer } from '../common/ui';
import ThemedStyles from '../styles/ThemedStyles';
import ComposeIcon from './ComposeIcon';
import type { ComposeCreateMode } from './createComposeStore';
import { IS_IOS } from '../config/Config';
import i18nService from '../common/services/i18n.service';

interface ComposeCreateScreenProps {
  selected?: ComposeCreateMode;
  onItemPress: (key: ComposeCreateMode) => Promise<boolean | void>;
}

export default function ComposeCreateScreen(props: ComposeCreateScreenProps) {
  const { selected, onItemPress } = props;

  const navigateToCompose = (key: ComposeCreateMode) => {
    return onItemPress(key);
  };

  return (
    <Screen>
      <ScreenHeader title="Create" titleType="H2" centerTitle bottom="L" />
      <MenuItem
        title={texts.post.title}
        subtitle={texts.post.subtitle}
        leftIcon="radio-button-on"
        iconColor={selected === 'post' ? 'Link' : undefined}
        borderless
        onPress={() => navigateToCompose('post')}
        containerItemStyle={ThemedStyles.style.marginTop4x}
      />
      {!IS_IOS && (
        <MenuItem
          title={texts.monetizedPost.title}
          subtitle={texts.monetizedPost.subtitle}
          leftIcon="money"
          iconColor={selected === 'monetizedPost' ? 'Link' : undefined}
          borderless
          onPress={() => navigateToCompose('monetizedPost')}
        />
      )}
      <MenuItem
        title={texts.boost.title}
        subtitle={texts.boost.subtitle}
        iconColor={selected === 'boost' ? 'Link' : undefined}
        leftIcon="boost"
        borderless
        onPress={() => navigateToCompose('boost')}
      />
      <MenuItem
        title={texts.supermind.title}
        subtitle={texts.supermind.subtitle}
        iconColor={selected === 'supermind' ? 'Link' : undefined}
        leftIcon="supermind"
        borderless
        onPress={() => navigateToCompose('supermind')}
      />
      {!selected && (
        <B2 color="secondary" align="center" top="L">
          <Trans
            i18nKey="compose"
            defaults={texts.description}
            components={{
              compose: <Compose />,
            }}
          />
        </B2>
      )}

      <Spacer top="XXXL2" />
    </Screen>
  );
}

export const pushComposeCreateScreen = (props?: ComposeCreateScreenProps) => {
  Keyboard.dismiss();
  pushBottomSheet({
    component: (ref, handleContentLayout) => (
      <View onLayout={handleContentLayout}>
        <ComposeCreateScreen
          {...props}
          onItemPress={async key => {
            if (await props?.onItemPress(key)) {
              ref.close();
              return true;
            }
            return false;
          }}
        />
      </View>
    ),
  });
};

const Compose = () => (
  <View>
    <ComposeIcon style={styles.composeIcon} />
  </View>
);

const styles = {
  composeIcon: {
    width: 20,
    height: 20,
    top: 4,
  },
};

const texts = {
  post: {
    title: i18nService.t('composer.create.screen.post.title'),
    subtitle: i18nService.t('composer.create.screen.post.subtitle'),
  },
  monetizedPost: {
    title: i18nService.t('composer.create.screen.monetizedPost.title'),
    subtitle: i18nService.t('composer.create.screen.monetizedPost.subtitle'),
  },
  boost: {
    title: i18nService.t('composer.create.screen.boost.title'),
    subtitle: i18nService.t('composer.create.screen.boost.subtitle'),
  },
  supermind: {
    title: <SupermindLabel font="B1" />,
    subtitle: i18nService.t('composer.create.screen.supermind.subtitle'),
  },
  description: i18nService.t('composer.create.screen.description'),
};
