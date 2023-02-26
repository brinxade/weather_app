export const Utility = {
    getTodaysDateFormatted: () => {
        let d = new Date()
        return d.toISOString().split('T')[0];
    }
};