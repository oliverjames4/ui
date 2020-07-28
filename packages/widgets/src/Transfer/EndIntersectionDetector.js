import { IntersectionDetector } from '@dhis2/ui-core'
import propTypes from '@dhis2/prop-types'
import React from 'react'

export const EndIntersectionDetector = ({ rootRef, onEndReached }) => (
    <div>
        <IntersectionDetector
            rootRef={rootRef}
            onChange={({ isIntersecting }) => isIntersecting && onEndReached()}
        />

        <style jsx>{`
            div {
                width: 100%;
                height: 50px;
                position: absolute;
                z-index: -1;
                bottom: 0;
                left: 0;
            }
        `}</style>
    </div>
)

EndIntersectionDetector.propTypes = {
    rootRef: propTypes.shape({
        current: propTypes.instanceOf(HTMLElement),
    }).isRequired,
    onEndReached: propTypes.func.isRequired,
}
