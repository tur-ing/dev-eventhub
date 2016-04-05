import React from 'react';
import {History} from 'react-router';
import HomeFeature from './home-feature';
import FullWidthSection from '../full-width-section';

import RaisedButton from 'material-ui/lib/raised-button';
import {StylePropable, StyleResizable} from 'material-ui/lib/mixins';
import {Colors, Spacing, Typography, lightBaseTheme} from 'material-ui/lib/styles';

const HomePage = React.createClass({

    mixins: [
        StylePropable,
        StyleResizable,
        History,
    ],

    _getHomePageHero() {

        let imgUrl = 'images/berlin.jpg'

        let styles = {
            root: {
                backgroundImage: 'url(' + imgUrl + ')',
                backgroundSize: 'cover',
                overflow: 'hidden',
            },
            svgLogo: {
                marginLeft: window.innerWidth * 0.5 - 130,
                width: 420,
                height: 157,
            },
            tagline: {
                paddingTop: '70px',
                margin: '16px auto 0 auto',
                textAlign: 'center',
                height: 350,
                maxWidth: 575,
            },
            label: {
                color: lightBaseTheme.palette.primary1Color,
            },
            githubStyle: {
                margin: '16px 32px 0px 8px',
            },
            demoStyle: {
                margin: '16px 32px 0px 32px',
            },
            h1: {
                color: Colors.darkWhite,
                fontWeight: Typography.fontWeightLight,
            },
            h2: {
                fontSize: 20,
                lineHeight: '28px',
                paddingTop: 19,
                marginBottom: 13,
                letterSpacing: 0,
            },
            nowrap: {
                whiteSpace: 'nowrap',
            },
            taglineWhenLarge: {
                marginTop: 32,
            },
            h1WhenLarge: {
                fontSize: 56,
            },
            h2WhenLarge: {
                fontSize: 24,
                lineHeight: '32px',
                paddingTop: 16,
                marginBottom: 12,
            },
        };

        styles.h2 = this.mergeStyles(styles.h1, styles.h2);

        if (this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
            styles.tagline = this.mergeStyles(styles.tagline, styles.taglineWhenLarge);
            styles.h1 = this.mergeStyles(styles.h1, styles.h1WhenLarge);
            styles.h2 = this.mergeStyles(styles.h2, styles.h2WhenLarge);
        }

        return (
            <FullWidthSection style={styles.root}>
                <div style={styles.tagline}>
                    <h1 style={styles.h1}>eventHub</h1>
                    <h2 style={styles.h2}>
                        Buche schnell und einfach Events <span style={styles.nowrap}>
            in deiner </span> <span style={styles.nowrap}>
            Stadt</span>
                    </h2>
                    <RaisedButton
                        className="demo-button"
                        label="Jetzt Event buchen"
                        onTouchTap={this._onDemoClick}
                        linkButton={true}
                        style={styles.demoStyle}
                        labelStyle={styles.label}
                    />
                </div>
            </FullWidthSection>
        );
    },

    _getHomePurpose() {
        const styles = {
            root: {
                backgroundColor: Colors.grey200,
            },
            content: {
                maxWidth: 700,
                padding: 0,
                margin: '0 auto',
                fontWeight: Typography.fontWeightLight,
                fontSize: 20,
                lineHeight: '28px',
                paddingTop: 19,
                marginBottom: 13,
                letterSpacing: 0,
                color: Typography.textDarkBlack,
            },
        };

        return (
            <FullWidthSection
                style={styles.root}
                useContent={true}
                contentStyle={styles.content}
                contentType="p"
                className="home-purpose"
            >
                eventHub unterstützt dich dabei, den passenden Veranstalter für dein nächstes&nbsp;
                <a href="/events">Event</a> zu finden.
            </FullWidthSection>
        );
    },

    _getHomeFeatures() {
        const styles = {maxWidth: 906};

        return (
            <FullWidthSection useContent={true} contentStyle={styles}>
                <HomeFeature
                    heading="1. Event anfragen"
                    route="/events"
                    img="images/get-started.svg"
                    firstChild={true}
                />
                <HomeFeature
                    heading="2. Angebot erhalten"
                    route="/events"
                    img="images/css-framework.svg"
                />
                <HomeFeature
                    heading="3. Event buchen"
                    route="/events"
                    img="images/components.svg"
                    lastChild={true}
                />
            </FullWidthSection>
        );
    },

    _getHomeContribute() {
        const styles = {
            root: {
                backgroundColor: Colors.grey200,
                textAlign: 'center',
            },
            h3: {
                margin: 0,
                padding: 0,
                fontWeight: Typography.fontWeightLight,
                fontSize: 22,
            },
            button: {
                marginTop: 32,
            },
        };

        return (
            <FullWidthSection useContent={true} style={styles.root}>
                <h3 style={styles.h3}>
                    Sie möchten <span style={styles.nowrap}>Events anbieten? </span>
                    <span style={styles.nowrap}>Jetzt kostenlos registrieren.</span>
                </h3>
                <RaisedButton
                    label="Kostenlos Events anbieten"
                    linkButton={true}
                    labelColor={Colors.blue50}
                    backgroundColor={Colors.blue800}
                    href=""
                    style={styles.button}
                />
            </FullWidthSection>
        );
    },

    _onDemoClick() {
        this.history.pushState(null, '/events');
    },

    render() {
        const style = {
            paddingTop: Spacing.desktopKeylineIncrement,
        };

        return (
            <div style={style}>
                {this._getHomePageHero()}
                {this._getHomePurpose()}
                {this._getHomeFeatures()}
                {this._getHomeContribute()}
            </div>
        );
    },

});

export default HomePage;
