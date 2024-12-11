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

<!-- Start Pricing Table Area -->
<section id="pricing_table" class="pricing-table section">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="section-title">
                        <span>Pricing Plan</span>
                        <h2>Choose Your Plan</h2>
                        <p>There are many variations of passages of Lorem
                            Ipsum available, but the majority have suffered alteration in some form.</p>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-4 col-md-6 col-12">
                    <!-- Single Table -->
                    <div class="single-table pricingTable" data-plan="Gold Level">
                        <!-- Table Head -->
                        <div class="table-head">
                            <div class="price">
              <h3 class="heading">Gold</h3>
			   <div class="price">
                                <p class="amount"><span class="price-value">$149</span></p>
                            </div>
              
              <span class="month">monthly</span>
                            </div>
                            <div class="title">
                                <h4>Small Pack</h4>
                            </div>
                        </div>
	   <div class="pricingContent table-list">
              <ul><li><i class="ti-check"></i> 88 GB Disk Space</li><li><i class="ti-check"></i> 99 Email Accounts</li><li><i class="ti-check"></i> 22 subdomains</li><li><i class="ti-check"></i> 11 Domains</li></ul>
            </div>
                        <!-- End Table Head -->
                        <!-- Table List -->
                        <!-- End Table List -->
                        <!-- Table Bottom -->
                        <div class="button">
                            <a class="btn" href="#">Choose Plan <i class="lni lni-arrow-right"></i></a>
                        </div>
                        <!-- End Table Bottom -->
                    </div>
                    <!-- End Single Table-->
                </div>
                                <div class="col-lg-4 col-md-6 col-12">
                    <!-- Single Table -->
                    <div class="single-table pricingTable" data-plan="Platinum Level">
                        <!-- Table Head -->
                        <div class="table-head">
                            <div class="price">
              <h3 class="heading">Platinum</h3>
			   <div class="price">
                                <p class="amount"><span class="price-value">$200</span></p>
                            </div>
              
              <span class="month">monthly</span>
                            </div>
                            <div class="title">
                                <h4>Medium Pack</h4>
                            </div>
                        </div>
	   <div class="pricingContent table-list">
              <ul><li><i class="ti-check"></i> 500GB Disk Space</li><li><i class="ti-check"></i> 150 Email Accounts</li><li><i class="ti-check"></i> 100 subdomains</li><li><i class="ti-check"></i> 15 Domains</li></ul>
            </div>
                        <!-- End Table Head -->
                        <!-- Table List -->
                        <!-- End Table List -->
                        <!-- Table Bottom -->
                        <div class="button">
                            <a class="btn" href="#">Choose Plan <i class="lni lni-arrow-right"></i></a>
                        </div>
                        <!-- End Table Bottom -->
                    </div>
                    <!-- End Single Table-->
                </div>
                                <div class="col-lg-4 col-md-6 col-12">
                    <!-- Single Table -->
                    <div class="single-table pricingTable" data-plan="Diamond Level">
                        <!-- Table Head -->
                        <div class="table-head">
                            <div class="price">
              <h3 class="heading">Diamond</h3>
			   <div class="price">
                                <p class="amount"><span class="price-value">$500</span></p>
                            </div>
              
              <span class="month">monthly</span>
                            </div>
                            <div class="title">
                                <h4>Large Pack</h4>
                            </div>
                        </div>
	   <div class="pricingContent table-list">
              <ul><li><i class="ti-check"></i> 1150GB Disk Space</li><li><i class="ti-check"></i> 250 Email Accounts</li><li><i class="ti-check"></i> 1000 subdomains</li><li><i class="ti-check"></i> 55 Domains</li></ul>
            </div>
                        <!-- End Table Head -->
                        <!-- Table List -->
                        <!-- End Table List -->
                        <!-- Table Bottom -->
                        <div class="button">
                            <a class="btn" href="#">Choose Plan <i class="lni lni-arrow-right"></i></a>
                        </div>
                        <!-- End Table Bottom -->
                    </div>
                    <!-- End Single Table-->
                </div>
            </div>
        </div>
</section>
<!--/ End Pricing Table Area -->





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
	
	


