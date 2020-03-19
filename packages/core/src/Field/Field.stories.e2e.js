import React from 'react'
import { storiesOf } from '@storybook/react'
import { Field } from './Field.js'

storiesOf('Field', module).add('With children', () => (
    <Field>I am a child</Field>
))
