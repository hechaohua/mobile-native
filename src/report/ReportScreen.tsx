//@ts-nocheck
import React, { Component } from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Alert,
  Button,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Linking,
} from 'react-native';

import reportService from './ReportService';

import i18n from '../common/services/i18n.service';

import mindsService from '../common/services/minds-config.service';
import CenteredLoading from '../common/components/CenteredLoading';
import ThemedStyles from '../styles/ThemedStyles';
import TextInput from '../common/components/TextInput';
import MText from '../common/components/MText';

export default class ReportScreen extends Component {
  state = {
    note: '',
    reason: null,
    subreason: null,
    reasons: null,
  };

  /**
   * Component did mount
   */
  componentDidMount() {
    const navigation = this.props.navigation;

    navigation.setOptions({
      title: i18n.t('report'),
      headerLeft: () => {
        return (
          <Icon
            name="chevron-left"
            size={38}
            style={ThemedStyles.style.colorLink}
            onPress={() => {
              if (this.props.route.params && this.props.route.params.goBack)
                return this.props.route.params.goBack();
              navigation.goBack();
            }}
          />
        );
      },
      headerRight: () => (
        <View>
          {this.props.route.params.requireNote && (
            <Button
              title={i18n.t('settings.submit')}
              onPress={
                this.props.route.params.confirmAndSubmit
                  ? this.props.route.params.confirmAndSubmit
                  : () => null
              }
            />
          )}
        </View>
      ),
      transitionConfig: {
        isModal: true,
      },
    });

    this.setState({
      entity: this.props.route.params.entity,
    });
    this.loadReasons();
    this.props.navigation.setParams({
      confirmAndSubmit: this.confirmAndSubmit.bind(this),
    });
  }

  /**
   * Load reasons from minds settings
   */
  loadReasons() {
    const settings = mindsService.getSettings();

    // reasons in current language with fallback in english translation, in case that both fails the origial label is shown
    settings.report_reasons.forEach(r => {
      r.label = i18n.t(`reports.reasons.${r.value}.label`, {
        defaultValue: r.label,
      });
      if (r.reasons && r.reasons.length) {
        r.reasons.forEach(r2 => {
          r2.label = i18n.t(
            `reports.reasons.${r.value}.reasons.${r2.value}.label`,
            { defaultValue: r2.label },
          );
        });
      }
    });

    this.setState({ reasons: settings.report_reasons });
  }

  /**
   * Submit the report
   */
  async submit() {
    try {
      const subreason = this.state.subreason
        ? this.state.subreason.value
        : null;
      await reportService.report(
        this.state.entity.guid,
        this.state.reason.value,
        subreason,
        this.state.note,
      );
      this.props.navigation.goBack();

      Alert.alert(
        i18n.t('thanks'),
        i18n.t('reports.weHaveGotYourReport'),
        [{ text: i18n.t('ok'), onPress: () => null }],
        { cancelable: false },
      );
    } catch (e) {
      Alert.alert(
        i18n.t('error'),
        i18n.t('reports.errorSubmitting'),
        [
          { text: i18n.t('tryAgain'), onPress: () => this.submit() },
          { text: 'Cancel' },
        ],
        { cancelable: true },
      );
    }
  }

  /**
   * Clear reason
   */
  clearReason = () => {
    this.setState({ reason: null, requireNote: false, subreason: null });
    this.props.navigation.setParams({ goBack: null, requireNote: false });
  };

  /**
   * Select subreason
   * @param {object} subreason
   */
  async selectSubreason(subreason) {
    await this.setState({ subreason });

    this.confirmAndSubmit();
  }

  /**
   * Select reason
   * @param {object} reason
   */
  async selectReason(reason) {
    if (!reason) {
      reason = this.state.reason;
    }

    if (reason.value == 11 && !this.state.note) {
      this.setState({
        requireNote: true,
        reason: reason,
      });
      this.props.navigation.setParams({
        requireNote: true,
        goBack: this.clearReason,
      });
      return;
    }

    if (reason.hasMore) {
      this.props.navigation.setParams({ goBack: this.clearReason });
      return this.setState({ reason });
    }

    await this.setState({
      reason,
    });

    this.confirmAndSubmit();
  }

  /**
   * Confirm and submit
   */
  confirmAndSubmit() {
    Alert.alert(
      i18n.t('confirm'),
      `${i18n.t('reports.reportAs')}\n${this.state.reason.label}\n` +
        (this.state.subreason ? this.state.subreason.label : ''),
      [
        { text: i18n.t('no') },
        { text: i18n.t('yes'), onPress: () => this.submit() },
      ],
      { cancelable: false },
    );
  }

  /**
   * Open default mailer
   */
  mailToCopyright = () => {
    Linking.openURL('mailto:copyright@minds.com');
  };

  /**
   * Render reasons list
   */
  renderReasons() {
    const theme = ThemedStyles.style;

    if (this.state.reason && this.state.reason.value == 10) {
      return (
        <MText
          style={[theme.fontL, theme.padding2x, theme.textCenter]}
          onPress={this.mailToCopyright}>
          {i18n.t('reports.DMCA')}
        </MText>
      );
    }

    const reasons =
      this.state.reason && this.state.reason.hasMore
        ? this.state.reason.reasons
        : this.state.reasons;

    const reasonItems = reasons.map((reason, i) => {
      return (
        <TouchableOpacity
          style={[styles.reasonItem, ThemedStyles.bgTertiaryBackground]}
          key={i}
          onPress={() =>
            this.state.reason
              ? this.selectSubreason(reason)
              : this.selectReason(reason)
          }>
          <View style={styles.reasonItemLabelContainer}>
            <View style={theme.rowStretch}>
              <MText style={styles.reasonItemLabel}>{reason.label}</MText>
            </View>
          </View>
          <View style={styles.chevronContainer}>
            <Icon
              name="chevron-right"
              size={36}
              style={
                reason.hasMore ? theme.colorLink : theme.colorSecondaryText
              }
            />
          </View>
        </TouchableOpacity>
      );
    });

    return reasonItems;
  }

  /**
   * Update not value
   */
  updateNote = value => this.setState({ note: value });

  /**
   * Render
   */
  render() {
    if (!this.state.reasons) return <CenteredLoading />;

    const theme = ThemedStyles.style;

    const noteInput = (
      <TextInput
        multiline={true}
        numberOfLines={4}
        style={[
          theme.padding2x,
          theme.margin,
          theme.borderBottom,
          theme.colorPrimaryText,
        ]}
        placeholder={i18n.t('reports.explain')}
        returnKeyType="done"
        autoFocus={true}
        placeholderTextColor="gray"
        underlineColorAndroid="transparent"
        onChangeText={this.updateNote}
        autoCapitalize={'none'}
      />
    );

    return (
      <ScrollView
        style={[theme.flexContainer, ThemedStyles.style.bgSecondaryBackground]}>
        {this.state.reason && (
          <MText
            style={[
              theme.fontM,
              theme.bgPrimaryBackground,
              theme.colorWhite,
              theme.padding,
            ]}>
            {this.state.reason.label}
          </MText>
        )}
        <View style={theme.flexContainer}>
          {!this.state.requireNote && this.renderReasons()}

          {this.state.requireNote && noteInput}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'stretch',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  reasonItemLabelContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  reasonItemLabel: {
    flex: 1,
    fontWeight: '600',
    textAlign: 'left',
  },
  chevronContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
  },
  chevron: {
    color: '#ececec',
  },
});
