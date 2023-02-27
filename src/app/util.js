export const Utility = {
    getTodaysDateFormatted: () => {
        let d = new Date()
        return d.toISOString().split('T')[0];
    },
    getMockData: (size, start) => {
        // A poorly designed mock data function that mimics extreme weather decline :)
        let labels = [...Array(size).keys()].map(i => i + start);
        let data = [];

        const min = 0;
        const max = 40;

        for(let i = 0; i < labels.length; i++) {
            data.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }

        return {labels, data};
    }
};