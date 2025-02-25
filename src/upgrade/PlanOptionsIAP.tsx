import React from 'react';
import { observer } from 'mobx-react';
import { View } from 'react-native';

import ThemedStyles from '../styles/ThemedStyles';
import { UpgradeStoreType } from './createUpgradeStore';
import MText from '../common/components/MText';
import MenuItemOption from '../common/components/menus/MenuItemOption';
import type { SubscriptionAndroid } from 'react-native-iap';
import { PlanList } from './PlanOptions';
import i18n from '~/common/services/i18n.service';

type PropsType = {
  store: UpgradeStoreType;
  subscriptions: SubscriptionAndroid[];
};

/**
 * Plan options component
 */
const PlanOptionsIAP = observer(({ store, subscriptions }: PropsType) => {
  const theme = ThemedStyles.style;
  const isTokens = store.method === 'tokens';
  const plans = isTokens ? store.plansTokens : store.plansUSD;

  if (!plans || plans.length === 0) {
    return null;
  }
  return (
    <View style={theme.marginTop3x}>
      <MText
        style={[
          theme.colorSecondaryText,
          theme.paddingLeft4x,
          theme.marginBottom3x,
          theme.fontL,
        ]}>
        SELECT PLAN
      </MText>
      {isTokens ? (
        <PlanList plans={plans} store={store} />
      ) : (
        <PlanListIAP subscriptions={subscriptions} store={store} />
      )}
    </View>
  );
});

export const PlanListIAP = observer(
  ({
    subscriptions,
    store,
  }: {
    subscriptions: SubscriptionAndroid[];
    store: UpgradeStoreType;
  }) => {
    const theme = ThemedStyles.style;

    return (
      <>
        {subscriptions.map(subscription =>
          subscription.subscriptionOfferDetails.map(offer => {
            const pricingPhases = offer.pricingPhases.pricingPhaseList[0];
            const isMonthly = pricingPhases.billingPeriod === 'P1M';
            const cost =
              parseInt(pricingPhases.priceAmountMicros, 10) / 1000000;
            const detail = ' / month';
            const price = isMonthly
              ? pricingPhases.formattedPrice
              : (cost / 12).toLocaleString(i18n.getDeviceLocale(), {
                  style: 'currency',
                  currency: pricingPhases.priceCurrencyCode,
                });

            return (
              <MenuItemOption
                key={`${subscription.productId}_${offer.offerId}`}
                onPress={() => {
                  const plan = store.plansUSD.find(
                    plan => plan.iapSku === subscription.productId,
                  );
                  if (plan) {
                    store.setSelectedOption(plan);
                  }
                }}
                title={
                  <MText style={theme.colorPrimaryText}>
                    {lable[pricingPhases.billingPeriod] + ' · ' + price}
                    <MText style={theme.colorSecondaryText}>{detail}</MText>
                  </MText>
                }
                subtitle={
                  isMonthly
                    ? undefined
                    : `Billed annually at ${pricingPhases.formattedPrice}`
                }
                selected={
                  subscription.productId === store.selectedOption.iapSku
                }
              />
            );
          }),
        )}
      </>
    );
  },
);

const lable = {
  P1M: 'Monthly',
  P1Y: 'Annualy',
};

export default PlanOptionsIAP;
