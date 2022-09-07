import { RouteProp } from '@react-navigation/core';
import _ from 'lodash';
import React, { useCallback, useState } from 'react';
import { showNotification } from '../../AppMessages';
import FitScrollView from '../common/components/FitScrollView';
import InputBase from '../common/components/InputBase';
import InputContainer from '../common/components/InputContainer';
import InputSelectorV2 from '../common/components/InputSelectorV2';
import MenuItem from '../common/components/menus/MenuItem';
import TopbarTabbar from '../common/components/topbar-tabbar/TopbarTabbar';
import i18nService from '../common/services/i18n.service';
import { Button, Icon, ModalFullScreen } from '../common/ui';
import NavigationService from '../navigation/NavigationService';
import { RootStackParamList } from '../navigation/NavigationTypes';
import ThemedStyles from '../styles/ThemedStyles';
import StripeCardSelector from '../wire/methods/v2/StripeCardSelector';

const showError = (error: string) =>
  showNotification(error, 'danger', undefined);

type PasswordConfirmation = RouteProp<RootStackParamList, 'SupermindCompose'>;

enum ReplyType {
  text = 0,
  image = 1,
  video = 2,
}

enum PaymentType {
  cash = 0,
  token = 1,
}

export interface SupermindRequest {
  receiver_username: string;
  receiver_guid: string;
  payment_options: {
    payment_type: PaymentType;
    payment_method_id: string;
    amount: number;
  };
  reply_type: ReplyType;
  twitter_required: boolean;
  terms_agreed: boolean;
}

interface SupermindComposeScreen {
  route?: PasswordConfirmation;
}

/**
 * Compose Screen
 * @param {Object} props
 */
export default function SupermindComposeScreen(props: SupermindComposeScreen) {
  const theme = ThemedStyles.style;
  const data: SupermindRequest | undefined = props.route?.params?.data;
  const [username, setUsername] = useState(data?.receiver_username || '');
  const [channelGuid, setChannelGuid] = useState<string | undefined>(
    data?.receiver_guid,
  );
  const [replyType, setReplyType] = useState<ReplyType>(
    data?.reply_type ?? ReplyType.text,
  );
  // const [requireTwitter, setRequireTwitter] = useState<boolean>(
  //   data?.twitter_required ?? false,
  // );
  const [termsAgreed, setTermsAgreed] = useState<boolean>(
    data?.terms_agreed || false,
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentType>(
    data?.payment_options.payment_type || PaymentType.cash,
  );
  const [cardId, setCardId] = useState<string | undefined>(
    data?.payment_options?.payment_method_id,
  );
  const [offer, setOffer] = useState(
    data?.payment_options?.amount ? String(data?.payment_options?.amount) : '',
  );
  const [errors, setErrors] = useState<any>({});

  const validate = useCallback(() => {
    const err: any = {};
    if (!channelGuid) {
      err.username = 'Please select a target channel';
    }
    if (paymentMethod === PaymentType.cash && !cardId) {
      err.card = 'Card is required';
    }
    if (!offer || !Number(offer) || Number.isNaN(Number(offer))) {
      err.offer = 'Offer is not valid';
    }
    if (!termsAgreed) {
      err.termsAgreed = 'You have to agree to the Terms';
    }
    const hasErrors = Object.keys(err).length > 0;

    if (hasErrors) {
      showError(err[Object.keys(err)[0]]);
      setErrors(err);
    }
    return !hasErrors;
  }, [cardId, channelGuid, offer, paymentMethod, termsAgreed]);

  const onBack = useCallback(() => {
    props.route?.params?.onClear();
    NavigationService.goBack();
  }, [props.route]);

  const onSave = useCallback(() => {
    if (!validate()) {
      return;
    }

    const supermindRequest = {
      receiver_username: username,
      receiver_guid: channelGuid!,
      payment_options: {
        amount: Number(offer),
        payment_method_id: cardId!,
        payment_type: paymentMethod,
      },
      reply_type: replyType,
      twitter_required: false,
      terms_agreed: termsAgreed,
    };

    // if object wasn't dirty, just go back without saving
    if (_.isEqual(supermindRequest, props.route?.params?.data)) {
      NavigationService.goBack();
      return;
    }

    NavigationService.goBack();
    props.route?.params?.onSave(supermindRequest);
  }, [
    validate,
    username,
    channelGuid,
    offer,
    cardId,
    paymentMethod,
    replyType,
    termsAgreed,
    props.route,
  ]);

  return (
    <ModalFullScreen
      title={'Supermind'}
      leftComponent={
        <Button mode="flat" size="small" onPress={onBack}>
          {i18nService.t('searchBar.clear')}
        </Button>
      }
      extra={
        <Button mode="flat" size="small" type="action" onPress={onSave}>
          {i18nService.t('done')}
        </Button>
      }>
      <FitScrollView keyboardShouldPersistTaps="handled">
        <TopbarTabbar
          current={paymentMethod}
          onChange={setPaymentMethod}
          containerStyle={theme.paddingTop}
          tabs={[
            { id: PaymentType.cash, title: i18nService.t('wallet.cash') },
            {
              id: PaymentType.token,
              title: i18nService.t('analytics.tokens.title'),
            },
          ]}
        />
        <InputBase
          label={'Target Channel'}
          onPress={() => {
            NavigationService.push('ChannelSelectScreen', {
              onSelect: channel => {
                setUsername(channel.username);
                setChannelGuid(channel.guid);
              },
            });
            setErrors(err => ({
              ...err,
              username: '',
            }));
          }}
          value={`@${username}`}
          error={errors.username}
          // noBottomBorder
        />
        <InputContainer
          placeholder={`Offer (${
            paymentMethod === PaymentType.cash ? 'USD' : 'Token'
          })`}
          onChangeText={value => {
            setOffer(value);
            setErrors(err => ({
              ...err,
              offer: '',
            }));
          }}
          value={offer}
          error={errors.offer}
          inputType="number"
          autoCorrect={false}
          returnKeyType="next"
          onFocus={() =>
            setErrors(err => ({
              ...err,
              offer: '',
            }))
          }
          keyboardType="numeric"
        />
        {paymentMethod === PaymentType.cash && (
          <StripeCardSelector
            info="some info about this"
            selectedCardId={cardId}
            onCardSelected={card => {
              setCardId(card.id);
              setErrors(err => ({
                ...err,
                card: '',
              }));
            }}
            error={errors.card}
          />
        )}
        <InputSelectorV2
          onSelected={setReplyType}
          selected={replyType}
          label="Response Type"
          info="Some info regarding this input"
          data={[
            {
              value: ReplyType.text,
              label: 'Text',
            },
            {
              value: ReplyType.image,
              label: 'Image',
            },
            {
              value: ReplyType.video,
              label: 'Video',
            },
          ]}
          valueExtractor={v => v.label}
          keyExtractor={v => v.value}
        />
        {/* <MenuItem
          containerItemStyle={[
            theme.bgPrimaryBackground,
            { borderBottomWidth: 0 },
          ]}
          item={{
            onPress: () => setRequireTwitter(val => !val),
            title: 'Require the reply to be posted to @ottman on Twitter',
            icon: (
              <Icon
                size={30}
                name={requireTwitter ? 'checkbox-marked' : 'checkbox-blank'}
                color={requireTwitter ? 'Link' : 'Icon'}
              />
            ),
          }}
        /> */}
        <MenuItem
          containerItemStyle={styles.termsContainer}
          item={{
            onPress: () => setTermsAgreed(val => !val),
            title: 'I agree to the Terms',
            icon: (
              <Icon
                size={30}
                name={termsAgreed ? 'checkbox-marked' : 'checkbox-blank'}
                color={
                  termsAgreed ? 'Link' : errors.termsAgreed ? 'Alert' : 'Icon'
                }
              />
            ),
          }}
        />
      </FitScrollView>
    </ModalFullScreen>
  );
}

const styles = ThemedStyles.create({
  termsContainer: [
    'bgPrimaryBackground',
    { borderTopWidth: 0, borderBottomWidth: 0 },
  ],
});
