import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _map from 'lodash/map';
import _isObject from 'lodash/isObject';
import _isArray from 'lodash/isArray';
import _isString from 'lodash/isString';
import _filter from 'lodash/filter';
import Icon from 'react-icons-kit';
import { sortDown, caretRight } from 'react-icons-kit/fa';

import BEM from './bem';
 
import './style.scss';

const propTypes = {
    data: PropTypes.oneOfType([PropTypes.arrayOf, PropTypes.object]),
    keyColor: PropTypes.string,
    valueColor: PropTypes.string,
    borderLeftColor: PropTypes.string,
    minMaxIconColor: PropTypes.string,
    bulletColor: PropTypes.string,
    boxBracketsColor: PropTypes.string,
    curlyBracketsColor: PropTypes.string,
}
 
const defaultProps = {
    data: { 0: 'No data' },
    keyColor: '#000',
    valueColor: '#000',
    borderLeftColor: '#A09696',
    minMaxIconColor: '#000',
    bulletColor: '#000',
    boxBracketsColor: '#000',
    curlyBracketsColor: '#000',
}
 
class JsonViewer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: true,
        };
        
        this.handleToggleJson = this.handleToggleJson.bind(this);
    }
    
    componentDidMount() {
        let appThis = this;
        const { minMaxIconColor } = this.props;
        const arrow = document.getElementsByName('arrow');
        Array.prototype.forEach.call(arrow, elem => {
            if (elem.className === 'json-viewer__arrow-down') {
                elem.style.borderTopColor = minMaxIconColor;
                appThis.forceUpdate();
            } else if (elem.className === 'json-viewer__arrow-right') {
                elem.style.borderLeftColor = minMaxIconColor;
                appThis.forceUpdate();
            }
        })
    }

    renderKeyValuePair(value, key) {
        const { 
            keyColor, 
            valueColor,
            borderLeftColor,
            bulletColor,
            boxBracketsColor,
            curlyBracketsColor 
        } = this.props;
        const b = BEM('json-viewer');

        return (
            <span style={{ borderLeftColor: borderLeftColor }} className={b('key-value-wrap').toString()} key={key}>
                {
                    _isObject(value) ?
                        <span
                            name="arrow"
                            onClick={e => this.handleKeyValueToggle(e)} 
                            className={b('arrow-down').toString()} />
                        :
                        <span style={{ color: bulletColor }} className={b('empty-span').toString()}>&bull;</span>
                }
                <span style={{ color: keyColor }} className={b('key').toString()}>
                    "{key}":
                    <span data-toggle-dummy="closed" className={b('wrap-closed').toString()}>
                        {
                            _isArray(value) ?
                                <span style={{ color: boxBracketsColor }} className={b('open-bracket').toString()}>&nbsp;{'['}</span>
                                :
                                <span style={{ color: curlyBracketsColor }} className={b('open-bracket').toString()}>&nbsp;{'{'}</span>
                        }
                        <p className={b('dots').toString()}>&nbsp;...</p>
                        {
                            _isArray(value) ?
                                <span style={{ color: boxBracketsColor }} className={b('open-bracket').toString()}>&nbsp;{'],'}</span>
                                :
                                <span style={{ color: curlyBracketsColor }} className={b('open-bracket').toString()}>&nbsp;{'},'}</span>
                        }
                    </span>
                    <span data-toggle="open" className={b('wrap').toString()}>
                        {
                            _isArray(value) ?
                                <Fragment>
                                    <span style={{ color: boxBracketsColor }} className={b('open-bracket').toString()}>&nbsp;{'['}</span>
                                    {
                                        _map(value, (child, key) => {
                                            return this.renderKeyValuePair(child, key);
                                        })
                                    }
                                    <span style={{ color: boxBracketsColor }} className={b('close-bracket').toString()}>{'],'}</span>
                                </Fragment>
                                :
                                _isObject(value) ?
                                    <Fragment>
                                        <span style={{ color: curlyBracketsColor }} className={b('open-bracket').toString()}>&nbsp;{'{'}</span>
                                        {
                                            _map(value, (child, key) => {
                                                return this.renderKeyValuePair(child, key);
                                            })
                                        }
                                        <span style={{ color: curlyBracketsColor }} className={b('close-bracket').toString()}>{'},'}</span>
                                    </Fragment>
                                :
                                <div style={{ color: valueColor }} className={b('value').toString()}><br></br>"{value}"<br></br></div>
                        }
                    </span>
                </span>
            </span>
        )
    }

    handleToggleJson() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    handleKeyValueToggle(e) {
        const { minMaxIconColor } = this.props;
        let jsonParentArray = e.target.parentElement.childNodes;

        const jsonParent = _filter(jsonParentArray, child => {
            return child.className === 'json-viewer__key';
        });

        _map(jsonParent[0].childNodes, child => {
            if (child.className === 'json-viewer__wrap-closed') {
                if (child.dataset.toggleDummy === 'closed') {
                    e.target.classList.remove('json-viewer__arrow-down');
                    e.target.classList.add('json-viewer__arrow-right');
                    child.dataset.toggleDummy = 'open';
                    e.target.style.borderLeftColor = minMaxIconColor;
                    e.target.style.borderTopColor = 'transparent';
                } else {
                    e.target.classList.remove('json-viewer__arrow-right');
                    e.target.classList.add('json-viewer__arrow-down');
                    child.dataset.toggleDummy = 'closed';
                    e.target.style.borderTopColor = minMaxIconColor;
                    e.target.style.borderLeftColor = 'transparent';
                }
            }
            if (child.className === 'json-viewer__wrap') {
                if (child.dataset.toggle === 'closed') {
                    child.dataset.toggle = 'open';
                } else {
                    child.dataset.toggle = 'closed';
                }
            }
        });
    }

    render() {
        const { isOpen } = this.state;
        const { data, minMaxIconColor, curlyBracketsColor } = this.props;
        const b = BEM('json-viewer');

        return (
            <div className={b('container')({ isOpen: !isOpen }).toString()}>
                <Icon style={{ color: minMaxIconColor }} className={b('sort-icon')({ isOpen: !isOpen }).toString()} icon={isOpen ? sortDown : caretRight} onClick={this.handleToggleJson} />
                    <span style={{ color: curlyBracketsColor }} className={b('open-bracket').toString()}>&nbsp;{'{'}</span>
                    {
                        isOpen ?
                            _map(data, (value, key) => this.renderKeyValuePair(value, key))
                            :
                            <p className={b('dots').toString()}>...</p>
                    }
                    <span style={{ color: curlyBracketsColor }} className={b('close-bracket')({ isOpen: !isOpen }).toString()}>{'}'}</span>
            </div>
        );
    }
}
 
JsonViewer.propTypes = propTypes;
JsonViewer.defaultProps = defaultProps;
 
export default JsonViewer;