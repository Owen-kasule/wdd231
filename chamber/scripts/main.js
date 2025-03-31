// Execute when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Set copyright year and last modified date
    const yearSpan = document.getElementById("year");
    const lastModifiedSpan = document.getElementById("lastModified");
    
    // Set current year for copyright
    yearSpan.textContent = new Date().getFullYear();
    
    // Set last modified date
    lastModifiedSpan.textContent = `Last Modified: ${document.lastModified}`;
    
    // Set default view to grid when page loads
    const memberList = document.querySelector('.members-container');
    if (memberList) {
        memberList.classList.add("grid");
        memberList.classList.remove("list");
        
        // Set active state on grid view button
        const gridButton = document.getElementById("grid-view");
        if (gridButton) {
            gridButton.classList.add("active");
        }
        
        const listButton = document.getElementById("list-view");
        if (listButton) {
            listButton.classList.remove("active");
        }
    }
    
    // Add code for home page functionality
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/chamber/')) {
        // Load home page specific data
        fetchWeather();
        displaySpotlights();
    } else if (window.location.pathname.includes('directory.html')) {
        // Directory page specific code
        loadMemberData();
    }
});

// Fetch weather data from OpenWeatherMap
async function fetchWeather() {
    const weatherContainer = document.querySelector('.weather-content');
    const forecastContainer = document.querySelector('.forecast-container');
    
    if (!weatherContainer || !forecastContainer) return;
    
    try {
        // OpenWeatherMap API Key (you'll need to get your own from openweathermap.org)
        const apiKey = '89540797c21bfa3ad421fc16961d7690';
        const city = 'Kampala';
        
        // Current weather
        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (!weatherResponse.ok) {
            throw new Error(`HTTP error! Status: ${weatherResponse.status}`);
        }
        const weatherData = await weatherResponse.json();
        
        // Format current weather
        const temp = Math.round(weatherData.main.temp);
        const description = weatherData.weather[0].description
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        const icon = weatherData.weather[0].icon;
        
        // Update current weather
        weatherContainer.innerHTML = `
            <img class="weather-icon" src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
            <h3>${description}</h3>
            <p class="temperature">${temp}°C</p>
            <p>Humidity: ${weatherData.main.humidity}%</p>
            <p>Wind: ${weatherData.wind.speed} m/s</p>
        `;
        
        // Get forecast data (3 day forecast)
        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        if (!forecastResponse.ok) {
            throw new Error(`HTTP error! Status: ${forecastResponse.status}`);
        }
        const forecastData = await forecastResponse.json();
        
        // Process forecast data (take readings at noon for each day)
        const forecasts = forecastData.list
            // Filter for readings around noon (12:00)
            .filter(item => item.dt_txt.includes('12:00:00'))
            // Take the first 3 days
            .slice(0, 3);
        
        // Display forecast
        forecastContainer.innerHTML = '';
        forecasts.forEach(day => {
            const date = new Date(day.dt * 1000);
            const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
            const temp = Math.round(day.main.temp);
            const icon = day.weather[0].icon;
            const description = day.weather[0].description
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
                
            forecastContainer.innerHTML += `
                <div class="forecast-day">
                    <p>${dayName}</p>
                    <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">
                    <p>${temp}°C</p>
                </div>
            `;
        });
        
    } catch (error) {
        console.error("Error fetching weather data:", error);
        weatherContainer.innerHTML = `<p>Weather data currently unavailable. Please try again later.</p>`;
        forecastContainer.innerHTML = '';
    }
}

// Display spotlight members
async function displaySpotlights() {
    const spotlightsContainer = document.querySelector('.spotlights-container');
    
    if (!spotlightsContainer) return;
    
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const members = await response.json();
        
        // Filter members with gold or silver membership levels
        const spotlightEligible = members.filter(member => 
            member.membership_level === 2 || member.membership_level === 3
        );
        
        // Randomly select 3 members
        const randomSpotlights = spotlightEligible
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);
            
        // Clear container
        spotlightsContainer.innerHTML = '';
        
        // Display spotlights
        randomSpotlights.forEach(member => {
            // Get image name without extension for webp support
            const imageName = member.image.split('.')[0];
            
            // Determine member level text
            let memberLevelText = "Silver Member";
            if (member.membership_level === 3) {
                memberLevelText = "Gold Member";
            }
            
            spotlightsContainer.innerHTML += `
                <div class="spotlight ${member.membership_level === 3 ? 'membership-gold' : 'membership-silver'}">
                    <picture>
                        <source srcset="images/${imageName}.webp" type="image/webp">
                        <img src="images/${member.image}" alt="${member.name} Logo" width="100" height="100">
                    </picture>
                    <h3>${member.name}</h3>
                    <p class="membership-level">${memberLevelText}</p>
                    <p>${member.phone}</p>
                    <p>${member.address}</p>
                    <a href="${member.website}" target="_blank">Visit Website</a>
                </div>
            `;
        });
        
    } catch (error) {
        console.error("Error loading spotlight members:", error);
        spotlightsContainer.innerHTML = `
            <div class="error-message" style="grid-column: 1/-1; text-align: center; padding: 20px;">
                <p>Unable to load spotlight members. Please try again later.</p>
            </div>
        `;
    }
}

// Toggle between grid and list view
function toggleView(viewType) {
    const memberList = document.querySelector('.members-container');
    
    if (!memberList) {
        console.error("Members container not found");
        return;
    }
    
    if (viewType === "grid") {
        memberList.classList.remove("list");
        memberList.classList.add("grid");
        document.getElementById("grid-view").classList.add("active");
        document.getElementById("list-view").classList.remove("active");
    } else {
        memberList.classList.remove("grid");
        memberList.classList.add("list");
        document.getElementById("list-view").classList.add("active");
        document.getElementById("grid-view").classList.remove("active");
    }
}

// Load and display member data for directory page
async function loadMemberData() {
    const memberList = document.querySelector('.members-container');
    
    if (!memberList) return;
    
    memberList.innerHTML = `<div class="loading">Loading directory data...</div>`;
    
    try {
        const response = await fetch("data/members.json");
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error("Error loading member data:", error);
        memberList.innerHTML = `<div class="error">Error loading directory data. Please try again later.</div>`;
    }
}

// Display members in directory page
function displayMembers(members) {
    const memberList = document.querySelector('.members-container');
    
    if (!memberList) return;
    
    memberList.innerHTML = "";
    
    members.forEach(member => {
        const imageName = member.image.split('.')[0];
        let memberLevelText = "Member";
        if (member.membership_level === 2) memberLevelText = "Silver Member";
        if (member.membership_level === 3) memberLevelText = "Gold Member";
        
        const memberClass = member.membership_level === 3 ? 'membership-gold' : 
                           member.membership_level === 2 ? 'membership-silver' : '';
        
        const card = document.createElement('div');
        card.className = `member-card ${memberClass}`;
        card.innerHTML = `
            <picture>
                <source srcset="images/${imageName}.webp" type="image/webp">
                <img src="images/${member.image}" alt="${member.name} Logo" width="100" height="100">
            </picture>
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <p class="membership-level">${memberLevelText}</p>
            <p>${member.description || ''}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;
        
        memberList.appendChild(card);
    });
}