import PropTypes from 'prop-types'
import React from 'react'

export const ModalActions = ({ children, dataTest }) => (
    <div data-test={dataTest}>
        {children}

        <style jsx>{`
            div {
                order: 3;
                display: flex;
                justify-content: flex-end;
                align-self: flex-end;
            }
        `}</style>
    </div>
)

ModalActions.defaultProps = {
    dataTest: 'dhis2-uicore-modalactions',
}

ModalActions.propTypes = {
    children: PropTypes.node,
    dataTest: PropTypes.string,
}
