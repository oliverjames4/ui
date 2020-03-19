import { Form as FormControl } from 'react-final-form'
import propTypes from '@dhis2/prop-types'

export { FormControl }

FormControl.propTypes = {
    active: propTypes.string,
    dirty: propTypes.bool,
    dirtyFields: propTypes.object,
    dirtySinceLastSubmit: propTypes.bool,
    error: propTypes.string,
    errors: propTypes.object,
    form: propTypes.shape({
        batch: propTypes.func,
        blur: propTypes.string,
        change: propTypes.func,
        destroyOnUnregister: propTypes.bool,
        focus: propTypes.func,
        getFieldState: propTypes.func,
        getRegisteredFields: propTypes.func,
        getState: propTypes.func,
        initialize: propTypes.func,
        isValidationPaused: propTypes.bool,
        mutators: propTypes.object,
        pauseValidation: propTypes.func,
        registerField: propTypes.func,
        reset: propTypes.func,
        resetFieldState: propTypes.func,
        resumeValidation: propTypes.func,
        submit: propTypes.func,
        subscribe: propTypes.func,
    }),
    handleSubmit: propTypes.func,
    hasSubmitErrors: propTypes.bool,
    hasValidationErrors: propTypes.bool,
    initialValues: propTypes.object,
    invalid: propTypes.bool,
    modified: propTypes.object,
    pristine: propTypes.bool,
    submitError: propTypes.string,
    submitErrors: propTypes.object,
    submitFailed: propTypes.bool,
    submitSucceeded: propTypes.bool,
    submitting: propTypes.bool,
    touched: propTypes.object,
    valid: propTypes.bool,
    validating: propTypes.bool,
    values: propTypes.object,
    visited: propTypes.object,
}
