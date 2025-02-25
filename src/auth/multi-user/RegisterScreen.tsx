import React from 'react';
import i18n from '../../common/services/i18n.service';
import RegisterForm from '../register/RegisterForm';
import { ModalFullScreen } from '~ui';
import { withErrorBoundaryScreen } from '~/common/components/ErrorBoundaryScreen';

const RegisterScreen = () => {
  return (
    <ModalFullScreen back title={i18n.t('auth.createChannel')}>
      <RegisterForm />
    </ModalFullScreen>
  );
};

export default withErrorBoundaryScreen(RegisterScreen, 'RegisterScreen');
