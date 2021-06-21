import { Button, ButtonStrip } from '@dhis2-ui/button'
import { storiesOf } from '@storybook/react'
import React, { useState } from 'react'
import { ModalActions, ModalContent, ModalTitle } from '../index.js'
import { Modal } from './modal.js'

window.onClose = window.Cypress && window.Cypress.cy.stub()

const StatefuleComponent = () => {
    const [counter, setCounter] = useState(0)

    return (
        <div>
            <p>
                Current counter:
                <span id="counter-value">{counter}</span>
            </p>

            <button
                id="increment-counter"
                onClick={() => setCounter(counter + 1)}
            >
                Add 1 to counter
            </button>
        </div>
    )
}

storiesOf('Modal', module)
    .add('With onClose', () => (
        <Modal small onClose={window.onClose}>
            <ModalTitle>Title</ModalTitle>
            <ModalContent>Content</ModalContent>
            <ModalActions>
                <ButtonStrip end>
                    <Button secondary>Secondary action</Button>
                    <Button primary>Primary action</Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    ))
    .add('Bottom-aligned, with onClose', () => (
        <Modal small onClose={window.onClose} position="bottom">
            <ModalTitle>Title</ModalTitle>
            <ModalContent>Content</ModalContent>
            <ModalActions>
                <ButtonStrip end>
                    <Button secondary>Secondary action</Button>
                    <Button primary>Primary action</Button>
                </ButtonStrip>
            </ModalActions>
        </Modal>
    ))
    .add('With children', () => <Modal>I am a child</Modal>)
    .add('With stateful children', () => {
        const [hide, setHide] = useState(false)

        return (
            <div>
                <button id="show-modal" onClick={() => setHide(false)}>
                    Show
                </button>

                <Modal hide={hide}>
                    <ModalTitle>Can be hidden</ModalTitle>

                    <ModalContent>
                        <StatefuleComponent />
                    </ModalContent>

                    <ModalActions>
                        <button id="hide-modal" onClick={() => setHide(true)}>
                            Hide modal
                        </button>
                    </ModalActions>
                </Modal>
            </div>
        )
    })
