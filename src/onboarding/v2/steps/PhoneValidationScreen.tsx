import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { observer } from 'mobx-react';
import React from 'react';
import { BackHandler, View } from 'react-native';
import DismissKeyboard from '../../../common/components/DismissKeyboard';
import i18n from '../../../common/services/i18n.service';
import ThemedStyles from '../../../styles/ThemedStyles';
import ModalContainer from './ModalContainer';
import { useLegacyStores } from '../../../common/hooks/use-stores';
import PhoneValidationComponent from '../../../common/components/phoneValidation/v2/PhoneValidationComponent';
import { PhoneValidationProvider } from '../../../common/components/phoneValidation/v2/PhoneValidationProvider';
import { RootStackParamList } from '../../../navigation/NavigationTypes';
import MText from '../../../common/components/MText';

type PhoneValidationScreenRouteProp = RouteProp<
  RootStackParamList,
  'PhoneValidation'
>;

export default observer(function PhoneValidationScreen() {
  const theme = ThemedStyles.style;
  const navigation = useNavigation();
  const route = useRoute<PhoneValidationScreenRouteProp>();
  // if onComplete means that it come from buy tokens or somthing like that
  const { onConfirm, onCancel, description } = route.params;
  const user = useLegacyStores().user;

  const confirmAction = React.useCallback(() => {
    user.setRewards(true);
    onConfirm();
    navigation.goBack();
  }, [navigation, onConfirm, user]);

  const cancelAction = React.useCallback(() => {
    onCancel();
    navigation.goBack();
  }, [navigation, onCancel]);

  // Disable back button on Android
  React.useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', () => true);
  }, []);

  const params = {
    onConfirm: confirmAction,
    onCancel: cancelAction,
  };

  return (
    <ModalContainer
      title={i18n.t('wallet.phoneVerification')}
      onPressBack={navigation.goBack}>
      <PhoneValidationProvider {...params}>
        <DismissKeyboard>
          <View style={theme.flexContainer}>
            {Boolean(description) && (
              <MText style={styles.description}>{description}</MText>
            )}
            <PhoneValidationComponent />
          </View>
        </DismissKeyboard>
      </PhoneValidationProvider>
    </ModalContainer>
  );
});

const styles = ThemedStyles.create({
  description: ['colorSecondaryText', 'fontLM', 'centered', 'marginBottom5x'],
});
