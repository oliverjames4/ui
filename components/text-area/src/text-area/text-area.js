import { sharedPropTypes } from '@dhis2/ui-constants'
import { StatusIcon } from '@dhis2-ui/status-icon'
import cx from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { styles } from './text-area.styles.js'

export class TextArea extends Component {
    textareaRef = React.createRef()
    state = {
        height: 'auto',
    }
    textareaDimensions = { width: 0, height: 0 }
    userHasResized = false

    componentDidMount() {
        this.attachResizeListener()

        if (this.props.initialFocus) {
            this.textareaRef.current.focus()
        }

        if (this.shouldDoAutoGrow()) {
            this.setHeight()
        }
    }

    componentDidUpdate(prevProps) {
        if (this.shouldDoAutoGrow() && this.props.value !== prevProps.value) {
            this.setHeight()
        }
    }

    attachResizeListener() {
        const textarea = this.textareaRef.current
        textarea.addEventListener('mousedown', this.setTextareaDimensions)
        textarea.addEventListener('mouseup', this.hasUserResized)
    }

    removeResizeListener() {
        const textarea = this.textareaRef.current
        textarea.removeEventListener('mousedown', this.setTextareaDimensions)
        textarea.removeEventListener('mouseup', this.hasUserResized)
    }

    setHeight() {
        const textarea = this.textareaRef.current
        const offset = textarea.offsetHeight - textarea.clientHeight
        const height = textarea.scrollHeight + offset + 'px'
        this.setState({ height })
    }

    setTextareaDimensions = () => {
        const textarea = this.textareaRef.current
        this.textareaDimensions = {
            width: textarea.clientWidth,
            height: textarea.clientHeight,
        }
    }

    shouldDoAutoGrow() {
        return this.props.autoGrow && !this.userHasResized
    }

    hasUserResized = () => {
        const { width: oldWidth, height: oldHeight } = this.textareaDimensions

        this.setTextareaDimensions()

        const { width: newWidth, height: newHeight } = this.textareaDimensions
        const userHasResized = newWidth !== oldWidth || newHeight !== oldHeight

        if (userHasResized) {
            this.userHasResized = true
            this.removeResizeListener()
        }
    }

    handleChange = (e) => {
        if (this.props.onChange) {
            this.props.onChange(this.createHandlerPayload(e), e)
        }
    }

    handleBlur = (e) => {
        if (this.props.onBlur) {
            this.props.onBlur(this.createHandlerPayload(e), e)
        }
    }

    handleFocus = (e) => {
        if (this.props.onFocus) {
            this.props.onFocus(this.createHandlerPayload(e), e)
        }
    }

    handleKeyDown = (e) => {
        if (this.props.onKeyDown) {
            this.props.onKeyDown(this.createHandlerPayload(e), e)
        }
    }

    createHandlerPayload(e) {
        return {
            value: e.target.value,
            name: this.props.name,
        }
    }
    static defaultProps = {
        rows: 4,
        width: '100%',
        resize: 'vertical',
        dataTest: 'dhis2-uicore-textarea',
    }

    render() {
        const {
            className,
            dense,
            disabled,
            readOnly,
            placeholder,
            name,
            valid,
            error,
            warning,
            loading,
            value,
            tabIndex,
            resize = 'vertical',
            rows = 4,
            width = '100%',
            dataTest = 'dhis2-uicore-textarea',
        } = this.props
        const { height } = this.state

        return (
            <div className={cx('textarea', className)} data-test={dataTest}>
                <textarea
                    id={name}
                    name={name}
                    placeholder={placeholder}
                    ref={this.textareaRef}
                    value={value}
                    disabled={disabled}
                    readOnly={readOnly}
                    tabIndex={tabIndex}
                    onFocus={this.handleFocus}
                    onKeyDown={this.handleKeyDown}
                    onBlur={this.handleBlur}
                    onChange={this.handleChange}
                    rows={rows}
                    className={cx({
                        dense,
                        disabled,
                        error,
                        valid,
                        warning,
                        'read-only': readOnly,
                    })}
                />
                <StatusIcon
                    error={error}
                    valid={valid}
                    loading={loading}
                    warning={warning}
                />

                <style jsx>{styles}</style>
                <style jsx>{`
                    textarea {
                        width: ${width};
                        height: ${height};
                        resize: ${resize};
                    }
                `}</style>
            </div>
        )
    }
}

TextArea.propTypes = {
    /** Grow the text area in response to overflow instead of adding a scroll bar */
    autoGrow: PropTypes.bool,
    className: PropTypes.string,
    dataTest: PropTypes.string,
    /** Compact mode */
    dense: PropTypes.bool,
    /** Disables the textarea and makes in non-interactive */
    disabled: PropTypes.bool,
    /** Applies 'error' styles for validation feedback. Mutually exclusive with `valid` and `warning` props */
    error: sharedPropTypes.statusPropType,
    /** Grabs initial focus on the page */
    initialFocus: PropTypes.bool,
    /** Adds a loading spinner */
    loading: PropTypes.bool,
    /** Name associated with the text area. Passed in object argument to event handlers. */
    name: PropTypes.string,
    /** Placeholder text for an empty textarea */
    placeholder: PropTypes.string,
    /** Makes the textarea read-only */
    readOnly: PropTypes.bool,
    /** [Resize property](https://developer.mozilla.org/en-US/docs/Web/CSS/resize) for the textarea element */
    resize: PropTypes.oneOf(['none', 'both', 'horizontal', 'vertical']),
    /** Initial height of the textarea, in lines of text */
    rows: PropTypes.number,
    tabIndex: PropTypes.string,
    /** Applies 'valid' styles for validation feedback. Mutually exclusive with `warning` and `error` props */
    valid: sharedPropTypes.statusPropType,
    /** Value in the textarea. Can be used to control component (recommended). Passed in object argument to event handlers. */
    value: PropTypes.string,
    /** Applies 'warning' styles for validation feedback. Mutually exclusive with `valid` and `error` props */
    warning: sharedPropTypes.statusPropType,
    /** Width of the text area. Can be any valid CSS measurement */
    width: PropTypes.string,
    /** Called with signature `({ name: string, value: string }, event)` */
    onBlur: PropTypes.func,
    /** Called with signature `({ name: string, value: string }, event)` */
    onChange: PropTypes.func,
    /** Called with signature `({ name: string, value: string }, event)` */
    onFocus: PropTypes.func,
    /** Called with signature `({ name: string, value: string }, event)` */
    onKeyDown: PropTypes.func,
}
