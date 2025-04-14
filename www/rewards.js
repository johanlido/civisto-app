document.addEventListener('DOMContentLoaded', function () {
    const rewardsGrid = document.querySelector('.rewards-grid');

    // Mocked rewards data
    const rewards = [
        { title: "Community Hero Badge", description: "Awarded for submitting 10 reports.", icon: "award" },
        { title: "Eco Warrior Badge", description: "Awarded for reporting 5 environmental issues.", icon: "leaf" },
        { title: "Safety Star Badge", description: "Awarded for reporting 3 safety hazards.", icon: "shield" },
        { title: "Traffic Tamer Badge", description: "Awarded for reporting 5 traffic issues.", icon: "truck" },
        { title: "Graffiti Guardian Badge", description: "Awarded for reporting 3 graffiti incidents.", icon: "edit" },
    ];

    // Render rewards
    rewards.forEach(reward => {
        const rewardCard = document.createElement('div');
        rewardCard.classList.add('reward-card');
        rewardCard.innerHTML = `
            <div class="reward-icon">
                <i data-feather="${reward.icon}"></i>
            </div>
            <div class="reward-details">
                <h3>${reward.title}</h3>
                <p>${reward.description}</p>
            </div>
        `;
        rewardsGrid.appendChild(rewardCard);
    });

    // Replace Feather icons
    feather.replace();
});
