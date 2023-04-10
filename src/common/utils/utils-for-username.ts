export const utilsForUsername = (str: string) => {
    if (str === '') {
        return 'emptyField'
    }
    if (str?.match('^[a-zA-Zа-яА-Я]+$')) {
        return 'letterField'
    }
    if (str?.match('^[0-9]+$')) {
        return 'numberField'
    }
    if (str?.match('^[a-zA-Zа-яА-Я0-9]+$')) {
        return 'emptyField'
    }

    return 'error'

}
