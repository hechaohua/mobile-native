import React from 'react';
import { observer, useLocalStore } from 'mobx-react';
import { View } from 'react-native';
import TopBarButtonTabBar, {
  ButtonTabType,
} from '../../../common/components/topbar-tabbar/TopBarButtonTabBar';
import { UsdOptions } from '../../v2/WalletTypes';
import ThemedStyles from '../../../styles/ThemedStyles';
import type { WalletStoreType } from '../../v2/createWalletStore';
import { ScrollView } from 'react-native-gesture-handler';
import type { BottomOptionsStoreType } from '../../../common/components/BottomOptionPopup';
import {
  WalletScreenRouteProp,
  WalletScreenNavigationProp,
} from '../WalletScreen';
import UsdSettings from '../../v2/address/UsdSettings';
import i18n from '../../../common/services/i18n.service';
import TransactionsListCash from '../../v2/TransactionList/TransactionsListCash';
import UsdEarnings from '../../v2/earnings/UsdEarnings';

type PropsType = {
  walletStore: WalletStoreType;
  bottomStore: BottomOptionsStoreType;
  navigation: WalletScreenNavigationProp;
  route: WalletScreenRouteProp;
};

const createStore = () => ({
  option: 'settings' as UsdOptions,
  setOption(option: UsdOptions) {
    this.option = option;
  },
});

/**
 * Usd tab
 */
const UsdTab = observer(
  ({ walletStore, navigation, route, bottomStore }: PropsType) => {
    const store = useLocalStore(createStore);
    const theme = ThemedStyles.style;

    const options: Array<ButtonTabType<UsdOptions>> = [
      { id: 'earnings', title: i18n.t('wallet.usd.earnings') },
      { id: 'transactions', title: i18n.t('wallet.transactions.transactions') },
      { id: 'settings', title: i18n.t('moreScreen.settings') },
    ];

    let body;
    switch (store.option) {
      case 'earnings':
        body = (
          <UsdEarnings
            navigation={navigation}
            walletStore={walletStore}
            route={route}
          />
        );
        break;
      case 'transactions':
        //TODO: filter are not implemented in the backend change the first string to the corresponding values after
        const filters: Array<[string, string]> = [
          ['all', i18n.t('wallet.transactions.allFilter')],
          ['wire', i18n.t('wallet.transactions.wiresFilter')],
          ['pro', i18n.t('wallet.transactions.proEarningsFilter')],
          ['payout', i18n.t('wallet.transactions.payoutsFilter')],
        ];
        body = (
          <TransactionsListCash
            filters={filters}
            navigation={navigation}
            currency="usd"
            wallet={walletStore}
            bottomStore={bottomStore}
          />
        );
        break;
      case 'settings':
        body = (
          <UsdSettings
            navigation={navigation}
            walletStore={walletStore}
            route={route}
          />
        );
        break;
    }

    const mainBody = (
      <View style={theme.paddingTop4x}>
        <TopBarButtonTabBar
          tabs={options}
          current={store.option}
          onChange={store.setOption}
        />
        {body}
      </View>
    );

    if (store.option !== 'transactions') {
      return <ScrollView>{mainBody}</ScrollView>;
    } else {
      return <View style={theme.flexContainer}>{mainBody}</View>;
    }
  },
);

export default UsdTab;
