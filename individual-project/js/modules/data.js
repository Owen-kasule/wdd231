export const fetchData = async () => {
    try {
        const response = await fetch('../data/data.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
};

export const filterData = (data, criteria) => {
    return data.filter(item => item.category === criteria);
};

export const formatData = (data) => {
    return data.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        image: item.image
    }));
};