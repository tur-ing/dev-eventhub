import React from 'react';
import FontIcon from 'material-ui/lib/font-icon';
import TextField from 'material-ui/lib/text-field';
import LeftNav from 'material-ui/lib/left-nav';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import Divider from 'material-ui/lib/divider';
import Slider from 'material-ui/lib/slider';
import {Calendar} from 'react-date-range';
import {SelectableContainerEnhance} from 'material-ui/lib/hoc/selectable-enhance';
import {
    Colors,
    Spacing,
    Typography,
} from 'material-ui/lib/styles';
import {StylePropable} from 'material-ui/lib/mixins';

const SelectableList = SelectableContainerEnhance(List);

const iconStyles = {
    marginRight: 24,
};

const AppLeftNav = React.createClass({

    propTypes: {
        docked: React.PropTypes.bool.isRequired,
        history: React.PropTypes.object.isRequired,
        location: React.PropTypes.object.isRequired,
        onRequestChangeLeftNav: React.PropTypes.func.isRequired,
        onRequestChangeList: React.PropTypes.func.isRequired,
        open: React.PropTypes.bool.isRequired,
        style: React.PropTypes.object,
    },

    contextTypes: {
        muiTheme: React.PropTypes.object,
        router: React.PropTypes.func,
    },

    mixins: [
        StylePropable,
    ],

    handleRequestChangeLink(event, value) {
        window.location = value;
    },

    handleTouchTapHeader() {
        this.props.history.push('/');
        this.setState({
            leftNavOpen: false,
        });
    },

    handleSelect(date) {
        console.log(date);
        // An object with two keys,
        // 'startDate' and 'endDate' which are Momentjs objects.
    },

    getStyles() {
        return {
            logo: {
                cursor: 'pointer',
                fontSize: 24,
                color: Typography.textFullWhite,
                lineHeight: Spacing.desktopKeylineIncrement + 'px',
                fontWeight: Typography.fontWeightLight,
                backgroundColor: Colors.lightBlue900,
                paddingLeft: Spacing.desktopGutter,
                marginBottom: 8,
            },
            textSearch: {
                marginLeft: 15,
            },
            slideRange: {
                color: Colors.lightBlue900,
                marginLeft: 8,
                marginRight: 8,
            },
        };
    },

    render() {
        const {
            location,
            docked,
            onRequestChangeLeftNav,
            onRequestChangeList,
            open,
            style,
        } = this.props;

        const styles = this.getStyles();

        return (
            <LeftNav
                style={style}
                docked={docked}
                open={open}
                onRequestChange={onRequestChangeLeftNav}
                width={300}
            >
                <div style={this.prepareStyles(styles.logo)} onTouchTap={this.handleTouchTapHeader}>
                    eventhub
                </div>
                <SelectableList
                    valueLink={{value: location.pathname, requestChange: onRequestChangeList}}
                >
                <div>
                    <TextField
                        hintText="Suchen ..."
                        style={styles.textSearch}
                    />
                    <br/>
                    <Calendar
                        onInit={this.handleSelect}
                        onChange={this.handleSelect}
                    />
                    <br/>
                    <Slider defaultValue={0.5} style={styles.slideRange}/>
                    <br/>

                </div>
                    <br/>
                </SelectableList>
                <Divider />
                <SelectableList
                    subheader="Mehr"
                    valueLink={{value: '', requestChange: this.handleRequestChangeLink}}
                >
                    <ListItem primaryText="Für Organisatoren" value="#" />
                    <ListItem primaryText="Über uns" value="#" />
                </SelectableList>
            </LeftNav>
        );
    },
});

export default AppLeftNav;
