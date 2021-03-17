import React, { useEffect } from 'react';
import { observer, useLocalStore } from 'mobx-react';
import { ChannelStoreType } from '../createChannelStore';
import { Text, View } from 'react-native';
import moment from 'moment-timezone';
import ThemedStyles from '../../../styles/ThemedStyles';
import LabeledComponent from '../../../common/components/LabeledComponent';
import i18n from '../../../common/services/i18n.service';
import ChannelBadges from '../../badges/ChannelBadges';
import CenteredLoading from '../../../common/components/CenteredLoading';
import abbrev from '../../../common/helpers/abbrev';
import SocialLinks from '../../../common/components/SocialLinks';
import Tags from '../../../common/components/Tags';
import { useIsFocused } from '@react-navigation/core';

type PropsType = {
  store: ChannelStoreType;
  navigation: any;
};

const AboutTab = observer(({ store, navigation }: PropsType) => {
  const theme = ThemedStyles.style;
  const localStore = useLocalStore(() => ({
    groupCount: 0,
    loaded: false,
    init(groupCount: number) {
      this.groupCount = groupCount;
      this.loaded = true;
    },
  }));

  const { channel } = store;

  if (!channel) {
    return <View></View>;
  }

  // re-render on focus (in case the user was edited)
  useIsFocused();

  useEffect(() => {
    if (!localStore.loaded) {
      const loadGroupCount = async () => {
        const count = await store.getGroupCount();
        localStore.init(count);
      };
      loadGroupCount();
    }
  }, [localStore, store]);

  if (!localStore.loaded) {
    return <CenteredLoading />;
  }

  const tags = channel?.tags.join(' #');
  const margin = theme.marginVertical3x;
  const hasBadges =
    channel.pro || channel.plus || channel.verified || channel.founder;

  return (
    <View style={[theme.paddingLeft4x, theme.paddingTop2x]}>
      {channel?.briefdescription !== '' && (
        <LabeledComponent label={i18n.t('channel.edit.bio')}>
          <Tags navigation={navigation}>{channel?.briefdescription}</Tags>
        </LabeledComponent>
      )}

      {channel?.tags.length && (
        <LabeledComponent
          label={i18n.t('channel.edit.hashtags')}
          wrapperStyle={margin}>
          <Text>{`#${tags}`}</Text>
        </LabeledComponent>
      )}

      <LabeledComponent label={i18n.t('joined')} wrapperStyle={margin}>
        <Text>
          {channel?.time_created
            ? moment(parseInt(channel.time_created, 10) * 1000).format('MMM Y')
            : ''}
        </Text>
      </LabeledComponent>

      {channel?.dob && (
        <LabeledComponent
          label={i18n.t('channel.edit.dob')}
          wrapperStyle={margin}>
          <Text>{channel?.dob}</Text>
        </LabeledComponent>
      )}

      {hasBadges && (
        <LabeledComponent label={i18n.t('channel.badges')}>
          <View style={theme.rowJustifyStart}>
            <ChannelBadges
              channel={channel}
              size={16}
              iconStyle={theme.colorPrimaryText}
            />
          </View>
        </LabeledComponent>
      )}

      <LabeledComponent
        label={i18n.t('discovery.groups')}
        wrapperStyle={margin}>
        <Text>{localStore.groupCount}</Text>
      </LabeledComponent>

      <LabeledComponent label={i18n.t('subscribers')}>
        <Text>{channel.subscribers_count}</Text>
      </LabeledComponent>

      <LabeledComponent label={i18n.t('views')} wrapperStyle={margin}>
        <Text>{abbrev(channel.impressions, 1)}</Text>
      </LabeledComponent>

      <LabeledComponent
        label={i18n.t('subscriptions')}
        wrapperStyle={theme.marginBottom2x}>
        <Text>{channel.subscriptions_count}</Text>
      </LabeledComponent>

      {channel.social_profiles!.length > 0 && (
        <LabeledComponent
          label={i18n.t('channel.edit.links')}
          wrapperStyle={theme.marginBottom2x}>
          <SocialLinks socialLinks={channel.social_profiles} />
        </LabeledComponent>
      )}
    </View>
  );
});

export default AboutTab;
