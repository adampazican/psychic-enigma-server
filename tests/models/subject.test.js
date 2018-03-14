const Subject = require('../../models/subject')

test('should throw error if name is empty', async () => {
    const subject = new Subject()

    subject
        .validate()
        .catch(err => expect(err.name).toBe('ValidationError'))
})

test('should throw error if image url is invalid', () => {
    const subject =  new Subject({ name: 'Jozko', image: '2012.asd'})

    subject
        .validate()
        .catch(err => expect(err.name).toBe('ValidationError'))

})

test('happy path', () => {
    const subject = new Subject({
        name: 'Jozko',
        image: 'https://athemes.com/wp-content/uploads/Original-JPG-Image.jpg'
    })

    const err = subject.validateSync()
    expect(err).toBeUndefined()
})