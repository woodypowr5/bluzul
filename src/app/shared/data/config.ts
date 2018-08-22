export const Config = {
    defaults: {
        gameState: {
            status: 'init',
            numPlayers: 2,
            boards: [],
            whoseTurn: 1
        },
        numPlayers: [
            null,
            null,
            {
                numFactories: 5
            },
            {
                numFactories: 7
            },
            {
                numFactories: 9
            }
        ]
    }
};
