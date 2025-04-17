export function fetchData() {
    // For now, return a simple promise with data
    return Promise.resolve({
        name: "Techrooot",
        services: ["Healthcare", "Education", "Agriculture", "Business"]
    });
}

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