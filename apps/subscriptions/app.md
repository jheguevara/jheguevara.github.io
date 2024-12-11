---
layout: minimal-app
icon: "notifications_active"
title: "Subscription Costs"
blurb: "Here is the current subscription pricing."
access: "internal-user"
authenticated: true
top-level-link: false
priority: 1
---

<style>
#pricing_table {
    font-family: 'Poppins', sans-serif;
    background-color: #f7f8fc;
    padding: 40px 20px;
    color: #333;
}

#pricing_table .section-title span {
    display: block;
    color: #ffac4b;
    font-weight: bold;
    margin-bottom: 10px;
    text-align: center;
}

#pricing_table .section-title h2 {
    text-align: center;
    font-size: 32px;
    color: #333;
}

#pricing_table .section-title p {
    text-align: center;
    color: #666;
    margin-bottom: 40px;
}

#pricing_table .single-table {
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    text-align: center;
    margin-bottom: 20px;
}

#pricing_table .table-head h3 {
    font-size: 24px;
    color: #333;
}

#pricing_table .table-head .discount {
    color: #28a745;
    font-weight: bold;
    font-size: 20px;
}

#pricing_table .table-head h4 {
    color: #888;
    margin-top: 10px;
}

#pricing_table .table-content p {
    font-size: 16px;
    color: #555;
    margin: 10px 0;
}

#pricing_table .table-bottom .choose-plan-btn {
    display: inline-block;
    padding: 10px 20px;
    background: linear-gradient(90deg, #ffac4b, #28a745);
    color: #fff;
    border-radius: 5px;
    text-decoration: none;
    font-size: 16px;
    font-weight: bold;
}

#pricing_table .table-bottom .choose-plan-btn:hover {
    opacity: 0.9;
}
</style>

<!-- Start Pricing Table Area -->
<section id="pricing_table" class="pricing-table section">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="section-title">
                    <span>Pricing Plan</span>
                    <h2>Choose Your Plan</h2>
                    <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.</p>
                </div>
            </div>
        </div>
        <div class="row">
            <!-- Gold Plan -->
            <div class="col-lg-4 col-md-6 col-12">
                <div class="single-table">
                    <div class="table-head">
                        <h3>Gold</h3>
                        <p class="discount">Discounted!</p>
                        <p>Log in for pricing.</p>
                        <h4>Small Pack</h4>
                    </div>
                    <div class="table-content">
                        <p>2 Productivity Apps</p>
                        <p>10 Users</p>
                    </div>
                    <div class="table-bottom">
                        <a href="#" class="choose-plan-btn">Choose Plan →</a>
                    </div>
                </div>
            </div>
            <!-- Platinum Plan -->
            <div class="col-lg-4 col-md-6 col-12">
                <div class="single-table">
                    <div class="table-head">
                        <h3>Platinum</h3>
                        <p class="discount">Discounted!</p>
                        <p>Call for pricing.</p>
                        <h4>Medium Pack</h4>
                    </div>
                    <div class="table-content">
                        <p>5 Productivity Apps</p>
                        <p>25 Users</p>
                    </div>
                    <div class="table-bottom">
                        <a href="#" class="choose-plan-btn">Choose Plan →</a>
                    </div>
                </div>
            </div>
            <!-- Diamond Plan -->
            <div class="col-lg-4 col-md-6 col-12">
                <div class="single-table">
                    <div class="table-head">
                        <h3>Diamond</h3>
                        <p class="discount">Discounted!</p>
                        <p>Log in for pricing.</p>
                        <h4>Large Pack</h4>
                    </div>
                    <div class="table-content">
                        <p>10 Productivity Apps</p>
                        <p>Unlimited Users</p>
                    </div>
                    <div class="table-bottom">
                        <a href="#" class="choose-plan-btn">Choose Plan →</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<!-- End Pricing Table Area -->






<script>
let checkInterval;
// Function to update pricing tables
function updatePricingTables(products) {
products.forEach(product => {
// Find the corresponding pricing table based on the product name
const pricingTable = document.querySelector(`.pricingTable[data-plan="${product.name}"]`);

if (pricingTable) {
// Update price (assuming price is retrieved from default_price or set statically for simplicity)
pricingTable.querySelector('.price-value').textContent = "$" + product.defaultPrice; // Modify as needed to extract the price

// Update features
const featuresList = pricingTable.querySelector('.pricingContent ul');
featuresList.innerHTML = ''; // Clear existing features

product.marketing_features.forEach(feature => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<i class="ti-check"></i> ${feature.name}`;
    featuresList.appendChild(listItem);
});
}
});
}

// Function to check if userdata is loaded
function checkAndLoadUserData() {
if (typeof userdata !== 'undefined' && userdata.allproducts && userdata.allproducts.data) {
// Data is available, update pricing tables and clear the interval
updatePricingTables(userdata.allproducts.data);
clearInterval(checkInterval);
}
}

// Wait for the page to fully load
window.addEventListener('load', () => {
// Start checking every 500ms if userdata is loaded
const checkInterval = setInterval(checkAndLoadUserData, 500);
});
</script>
	
	


