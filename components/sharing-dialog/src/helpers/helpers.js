import {
    ACCESS_VIEW_ONLY,
    ACCESS_NONE,
    ACCESS_VIEW_AND_EDIT,
    SHARE_TARGET_EXTERNAL,
    SHARE_TARGET_PUBLIC,
} from '../constants.js'

/**
 * Returns a function, that, as long as it continues to be invoked, will not be triggered. The
 * function will be called after it stops being called for N milliseconds. If `immediate` is
 * passed, trigger the function on the leading edge, instead of the trailing.
 */

export const debounce = (func, wait, immediate) => {
    let timeout

    return (...args) => {
        const context = this

        const later = () => {
            timeout = null

            if (!immediate) {
                func.apply(context, args)
            }
        }

        const callNow = immediate && !timeout

        clearTimeout(timeout)
        timeout = setTimeout(later, wait)

        if (callNow) {
            func.apply(context, args)
        }
    }
}

/**
 * Access and constant conversion
 */

const convertAccessStringToConstant = (access) => {
    if (access === undefined) {
        return ACCESS_NONE
    }

    if (typeof access === 'boolean') {
        return access ? ACCESS_VIEW_ONLY : ACCESS_NONE
    }

    if (access.startsWith('rw')) {
        return ACCESS_VIEW_AND_EDIT
    } else if (access.startsWith('r-')) {
        return ACCESS_VIEW_ONLY
    } else {
        return ACCESS_NONE
    }
}

export const convertAccessToConstantObject = (accessString) => {
    if (typeof accessString === 'boolean') {
        return {
            data: ACCESS_NONE,
            metadata: convertAccessStringToConstant(accessString),
        }
    }
    const metadataAccessString = accessString?.substring(0, 2)
    const dataAccessString = accessString?.substring(2, 4)

    return {
        data: convertAccessStringToConstant(dataAccessString),
        metadata: convertAccessStringToConstant(metadataAccessString),
    }
}

export const convertConstantToAccessString = (constant) => {
    switch (constant) {
        case ACCESS_NONE:
            return '--'
        case ACCESS_VIEW_ONLY:
            return 'r-'
        case ACCESS_VIEW_AND_EDIT:
            return 'rw'
        default:
            return '--'
    }
}

export const convertConstantObjectToAccess = (accessObject) => {
    return `${convertConstantToAccessString(
        accessObject.metadata
    )}${convertConstantToAccessString(accessObject.data)}----`
}

/**
 * Replaces access property with constants used internally
 */

export const replaceAccessWithConstant = ({ access, ...rest }) => ({
    ...rest,
    access: convertAccessToConstantObject(access),
})

/**
 * Helper to check whether to allow removing for the selected target
 */

const permanentTargets = [SHARE_TARGET_EXTERNAL, SHARE_TARGET_PUBLIC]

export const isRemovableTarget = (target) => {
    // Do not allow removal of permanent targets
    return !permanentTargets.includes(target)
}

/**
 * Mutation payload creators
 */

export const createOnChangePayload = ({ object, type, access, id }) => {
    switch (type) {
        case 'public': {
            const data = {
                object: {
                    ...object,
                    publicAccess: convertConstantObjectToAccess(access),
                },
            }
            return data
        }
        case 'group': {
            const userGroupAccesses = object.userGroupAccesses.map((group) => {
                if (group.id !== id) {
                    return group
                }

                return {
                    ...group,
                    access: convertConstantObjectToAccess(access),
                }
            })
            const data = {
                object: {
                    ...object,
                    userGroupAccesses,
                },
            }
            console.log(data)
            return data
        }
        case 'user': {
            const userAccesses = object.userAccesses.map((user) => {
                if (user.id !== id) {
                    return user
                }

                return {
                    ...user,
                    access: convertConstantObjectToAccess(access),
                }
            })
            const data = {
                object: {
                    ...object,
                    userAccesses,
                },
            }
            return data
        }
    }
}

export const createOnAddPayload = ({ object, type, id, access, name }) => {
    switch (type) {
        case 'group': {
            const data = {
                object: {
                    ...object,
                    userGroupAccesses: [
                        ...object.userGroupAccesses,
                        {
                            id,
                            name,
                            access: convertConstantObjectToAccess(access),
                        },
                    ],
                },
            }
            return data
        }
        case 'user': {
            const data = {
                object: {
                    ...object,
                    userAccesses: [
                        ...object.userAccesses,
                        {
                            id,
                            name,
                            access: convertConstantObjectToAccess(access),
                        },
                    ],
                },
            }
            return data
        }
    }
}

export const createOnRemovePayload = ({ object, type, id }) => {
    switch (type) {
        case 'group': {
            const userGroupAccesses = object.userGroupAccesses.filter(
                (group) => group.id !== id
            )
            const data = {
                object: {
                    ...object,
                    userGroupAccesses,
                },
            }
            return data
        }
        case 'user': {
            const userAccesses = object.userAccesses.filter(
                (user) => user.id !== id
            )
            const data = {
                object: {
                    ...object,
                    userAccesses,
                },
            }
            return data
        }
    }
}
