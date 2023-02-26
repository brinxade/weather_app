export default {
    apiToApp: (json) => {
        let labels = [];
        let values = [];
            
        json.data[0].coordinates[0].dates.forEach((item) => {
            labels.push((new Date(item.date)).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' }));
            values.push(item.value);
        });
            
        return {labels, values};
    }
};