export const comments = [
    {
        id: 1,
        text: 'Hello, how are you?',
        children: []
    },
    {
        id: 2,
        text: 'I am fine, thank you!',
        children: [
            {
                id: 4,
                text: 'I am good, thank you!',
                children: [
                    {
                        id: 5,
                        text: 'I am great, thank you!',
                        children: []
                    }
                ]
            },
            {
                id: 6,
                text: 'I am great, thank you!',
                children: []
            }
        ]
    }
]

export default comments;