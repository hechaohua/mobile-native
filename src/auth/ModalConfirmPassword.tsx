//@ts-nocheck
import React, { Component } from 'react';
import {
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';

import Modal from 'react-native-modal';

import i18n from '../common/services/i18n.service';
import authService from '../auth/AuthService';
import { ComponentsStyle } from '../styles/Components';
import ThemedStyles from '../styles/ThemedStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import MText from '../common/components/MText';

type PropsType = {
  onSuccess: Function;
  close: Function;
  isVisible: boolean;
};

export default class ModalConfirmPassword extends Component<PropsType> {
  state = {
    password: '',
    error: false,
  };

  async submit() {
    this.setState({
      error: false,
    });
    try {
      await authService.validatePassword(this.state.password);
      this.props.onSuccess(this.state.password);
      this.setState({
        password: '',
      });
    } catch (err) {
      this.setState({
        error: true,
      });
    }
  }

  render() {
    const CS = ThemedStyles.style;
    const msg = this.state.error ? (
      <MText style={styles.error}>{i18n.t('auth.invalidPassword')}</MText>
    ) : null;
    return (
      <Modal
        isVisible={this.props.isVisible}
        backdropColor={ThemedStyles.getColor('PrimaryBackground')}
        backdropOpacity={1}
      >
        <SafeAreaView style={[CS.flexContainer]}>
          <KeyboardAvoidingView
            style={CS.flexContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
          >
            {msg}
            <View style={styles.textCotainer}>
              <MText>{i18n.t('auth.confirmpassword')}</MText>
              <MText
                style={[CS.colorSecondaryText, CS.textRight]}
                onPress={this.props.close}
              >
                {i18n.t('close')}
              </MText>
            </View>
            <TextInput
              style={[ComponentsStyle.loginInput, CS.marginTop2x]}
              placeholder={i18n.t('auth.password')}
              secureTextEntry={true}
              autoCapitalize={'none'}
              returnKeyType={'done'}
              placeholderTextColor="#444"
              underlineColorAndroid="transparent"
              onChangeText={value => this.setState({ password: value })}
              value={this.state.password}
              key={2}
            />
            <Button
              onPress={() => this.submit()}
              title={i18n.t('auth.confirmpassword')}
              borderRadius={3}
              backgroundColor="transparent"
              containerViewStyle={ComponentsStyle.loginButton}
              textStyle={ComponentsStyle.loginButtonText}
              key={1}
            />
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  error: {
    marginTop: 8,
    marginBottom: 8,
    color: '#c00',
    textAlign: 'center',
  },
  textCotainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
