import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import FontIcon from 'material-ui/lib/font-icon';
import {Spacing} from 'material-ui/lib/styles';
import {
    StylePropable,
    StyleResizable,
} from 'material-ui/lib/mixins';

import {
    Colors,
    getMuiTheme,
} from 'material-ui/lib/styles';

import AppLeftNav from './app-nav';
import FullWidthSection from './full-width-section';

const iconStyles = {
    marginTop: 8,
    marginRight: 24,
    fontSize: 30,
};

const githubButton = (
    <FontIcon className="material-icons" style={iconStyles} color={Colors.lightBlue50} linkButton={true}>account_circle</FontIcon>
);

const Master = React.createClass({

    propTypes: {
        children: React.PropTypes.node,
        history: React.PropTypes.object,
        location: React.PropTypes.object,
    },

    childContextTypes: {
        muiTheme: React.PropTypes.object,
    },

    mixins: [
        StylePropable,
        StyleResizable,
    ],

    getInitialState() {
        return {
            muiTheme: getMuiTheme(),
            leftNavOpen: false,
        };
    },

    getChildContext() {
        return {
            muiTheme: this.state.muiTheme,
        };
    },

    componentWillMount() {
        this.setState({
            muiTheme: this.state.muiTheme,
        });
    },

    componentWillReceiveProps(nextProps, nextContext) {
        const newMuiTheme = nextContext.muiTheme ? nextContext.muiTheme : this.state.muiTheme;
        this.setState({
            muiTheme: newMuiTheme,
        });
    },

    getStyles() {
        const darkWhite = Colors.darkWhite;

        const styles = {
            appBar: {
                position: 'fixed',
                // Needed to overlap the examples
                backgroundColor: Colors.lightBlue900,
                zIndex: this.state.muiTheme.zIndex.appBar + 1,
                top: 0,
            },
            root: {
                paddingTop: Spacing.desktopKeylineIncrement,
                minHeight: 400,
            },
            content: {
                margin: Spacing.desktopGutter,
            },
            contentWhenMedium: {
                margin: `${Spacing.desktopGutter * 2}px ${Spacing.desktopGutter * 3}px`,
            },
            footer: {
                backgroundColor: Colors.grey900,
                textAlign: 'center',
            },
            a: {
                color: darkWhite,
            },
            p: {
                margin: '0 auto',
                padding: 0,
                color: Colors.lightWhite,
                maxWidth: 335,
            },
            iconButton: {
                color: darkWhite,
            },
        };

        if (this.isDeviceSize(StyleResizable.statics.Sizes.MEDIUM) ||
            this.isDeviceSize(StyleResizable.statics.Sizes.LARGE)) {
            styles.content = this.mergeStyles(styles.content, styles.contentWhenMedium);
        }

        return styles;
    },

    handleTouchTapLeftIconButton() {
        this.setState({
            leftNavOpen: !this.state.leftNavOpen,
        });
    },

    handleChangeRequestLeftNav(open) {
        this.setState({
            leftNavOpen: open,
        });
    },

    handleRequestChangeList(event, value) {
        this.props.history.push(value);
        this.setState({
            leftNavOpen: false,
        });
    },

    handleChangeMuiTheme(muiTheme) {
        this.setState({
            muiTheme: muiTheme,
        });
    },

    render() {
        const {
            history,
            location,
            children,
        } = this.props;

        let {
            leftNavOpen,
        } = this.state;

        const styles = this.getStyles();
        const title =
            history.isActive('/get-started') ? 'Get Started' :
                history.isActive('/events') ? 'eventHub' :
                    history.isActive('/components') ? 'Components' :
                        history.isActive('/discover-more') ? 'Discover More' : '';

        let docked = false;
        let showMenuIconButton = true;

        if (this.isDeviceSize(StyleResizable.statics.Sizes.LARGE) && title !== '') {
            docked = true;
            leftNavOpen = true;
            showMenuIconButton = false;

            styles.leftNav = {
                zIndex: styles.appBar.zIndex - 1,
            };
            styles.root.paddingLeft = 256;
            styles.footer.paddingLeft = 256;
        }

        return (
            <div>
                <AppBar
                    onLeftIconButtonTouchTap={this.handleTouchTapLeftIconButton}
                    title={title}
                    zDepth={0}
                    iconElementRight={githubButton}
                    style={styles.appBar}
                    showMenuIconButton={showMenuIconButton}
                />
                {title !== '' ?
                    <div style={this.prepareStyles(styles.root)}>
                        <div style={this.prepareStyles(styles.content)}>
                            {React.cloneElement(children, {
                                onChangeMuiTheme: this.handleChangeMuiTheme,
                            })}
                        </div>
                    </div>
                    :
                    children
                }
                <AppLeftNav
                    style={styles.leftNav}
                    history={history}
                    location={location}
                    docked={docked}
                    onRequestChangeLeftNav={this.handleChangeRequestLeftNav}
                    onRequestChangeList={this.handleRequestChangeList}
                    open={leftNavOpen}
                />
                <FullWidthSection style={styles.footer}>
                    <p style={this.prepareStyles(styles.p)}>
                        {'Prototype developed by '}
                        <a style={styles.a} href="https://ma.rcel.tech">
                            Marcel Florian
                        </a>
                        .
                    </p>
                </FullWidthSection>
            </div>
        );
    },
});

export default Master;
