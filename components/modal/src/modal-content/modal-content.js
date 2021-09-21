import { spacers } from '@dhis2/ui-constants'
import PropTypes from 'prop-types'
import React from 'react'

export const ModalContent = ({ children, className, dataTest }) => (
    <div className={className} data-test={dataTest}>
        {children}

        <style jsx>{`
            div {
                flex-grow: 1;
                margin: ${spacers.dp24} 0;
                padding: 0 ${spacers.dp24};
                overflow-y: auto;
            }
        `}</style>
    </div>
)

ModalContent.defaultProps = {
    dataTest: 'dhis2-uicore-modalcontent',
}

ModalContent.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    dataTest: PropTypes.string,
}
