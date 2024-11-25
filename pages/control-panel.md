---
layout: minimal
title:  "Applications Dashboard"
blurb: "Welcome to the applications dashboard."

enterprise: true
company-subscription: true
control-panel: true
authenticated: true


---
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
<style>
.table-container {
display: flex;
justify-content: space-around;
width: 100%;
margin-top: 20px;
}
.data-table {
width: 45%;
}
 .stat-box {
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 20px;
            text-align: center;
            background-color: #f8f9fa;
            margin: 10px;
            box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        }
        .stat-title {
            font-size: 1.5rem;
            margin-bottom: 10px;
        }
        .stat-number {
            font-size: 2.5rem;
            font-weight: bold;
            color: #007bff;
        }
</style>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>


<!-- Start Hero Area -->
<section id="hero-area" class="hero-area admin-invisible hidden">
<!-- Single Slider -->
<div class="hero-inner">
    <div class="container">







     
	<div class="row ">
	    <div class="col-lg-6 co-12">
		<div class="home-slider">
		    <div class="hero-text">
			<h3 class="wow fadeInUp" data-wow-delay=".3s" style="visibility: visible; animation-delay: 0.3s; animation-name: fadeInUp;">Admin Console</h3>
			<h1 class="wow fadeInUp" data-wow-delay=".5s" style="visibility: visible; animation-delay: 0.5s; animation-name: fadeInUp;">Please Log In</h1>
			<p class="wow fadeInUp" data-wow-delay=".7s" style="visibility: visible; animation-delay: 0.7s; animation-name: fadeInUp;">Never miss a match.</p>



<div class="button wow fadeInUp" data-wow-delay=".9s" style="visibility: visible; animation-delay: 0.9s; animation-name: fadeInUp;">
			    <span href="http://www.twitter.com/scrumtuous" class="btn primary"><i class="lni lni-alarm"></i> Metrics Dashboard</span>
								<span href="https://github.com/scrumtuous" class="btn"><i class="lni lni-wallet"></i>Admin Panel</span>
			</div>
		    </div>
		</div>
	    </div>
	    <div class="col-lg-6 col-12">
		<div class="hero-image">
		    <div class="waves-block">
			<div class="waves wave-1"></div>
			<div class="waves wave-2"></div>
		    </div>
		    <img src="assets/images/phone.png" alt="#">
		</div>
	    </div>
	</div>
    </div>
</div>
<!--/ End Single Slider -->
</section>
<!--/ End Hero Area -->










<section id="testimonials" class="section testimonials style2 admin-visible pt-20">
        <div class="container">

  <div class="row justify-content-center">
            <div class="col-lg-6 d-flex">
                <div class="stat-box flex-fill">
                    <div class="stat-title">Total Opportunities Created</div>
                    <div id="totalJobsCount" class="stat-number">0</div>
                </div>
                <div class="stat-box flex-fill">
                    <div class="stat-title">Total Jobs Run</div>
                    <div id="createdOpportunitiesCount" class="stat-number">0</div>
                </div>
            </div>
        </div>
  <div class="row">
    <div class="col-lg-4 col-md-6 mb-4">
      <canvas id="dailySignups" width="300" height="250"></canvas>
    </div>
    <div class="col-lg-4 col-md-6 mb-4">
      <canvas id="opportunityNotifications" width="300" height="250"></canvas>
    </div>
    <div class="col-lg-4 col-md-6 mb-4">
      <canvas id="opportunityMatches" width="300" height="250"></canvas>
    </div>
  </div>










 

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-chart-geo"></script>
    <script src="https://cdn.jsdelivr.net/npm/world-atlas/countries-50m.json"></script>


        <div class="row gy-4">
            <!-- Visitors Over Time -->
            <div class="col-lg-6 col-12">
                <p class="text-center">Visitors Over Time</p>
                <canvas id="visitorsChart"></canvas>
            </div>

            <!-- Top Pages by Views -->
            <div class="col-lg-6 col-12">
                <p class="text-center">Top Pages by Views</p>
                <canvas id="topPagesChart"></canvas>
            </div>

            <!-- Geographic Distribution of Visitors -->
            <div class="col-lg-6 col-12">
                <p class="text-center">Geographic Distribution of Visitors</p>
                <canvas id="geoChart"></canvas>
            </div>

            <!-- Bounce Rate by Day -->
            <div class="col-lg-6 col-12">
                <p class="text-center">Bounce Rate by Day</p>
                <canvas id="bounceRateChart"></canvas>
            </div>
        </div>

    <script>
        const apiBaseUrl = "https://ga.milesahead.team/api";

        // Visitors Over Time Chart
        async function fetchVisitorsOverTime() {
            try {
                const response = await fetch(`${apiBaseUrl}/visitors-over-time`);
                const data = await response.json();

                const labels = Object.keys(data);
                const values = Object.values(data).map(value => parseInt(value));

                const ctx = document.getElementById('visitorsChart').getContext('2d');
                new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Visitors',
                            data: values,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 2,
                            fill: false
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            x: { title: { display: true, text: 'Date' } },
                            y: { title: { display: true, text: 'Visitors' }, beginAtZero: true }
                        }
                    }
                });
            } catch (error) {
                console.error("Error fetching Visitors Over Time data:", error);
            }
        }

        // Top Pages by Views Chart
        async function fetchTopPages() {
            try {
                const response = await fetch(`${apiBaseUrl}/top-pages`);
                const data = await response.json();

                const labels = Object.keys(data);
                const values = Object.values(data).map(value => parseInt(value));

                const ctx = document.getElementById('topPagesChart').getContext('2d');
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Page Views',
                            data: values,
                            backgroundColor: 'rgba(54, 162, 235, 0.6)',
                            borderColor: 'rgba(54, 162, 235, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            x: { title: { display: true, text: 'Page' } },
                            y: { title: { display: true, text: 'Views' }, beginAtZero: true }
                        }
                    }
                });
            } catch (error) {
                console.error("Error fetching Top Pages data:", error);
            }
        }

        // Geographic Distribution of Visitors Chart
        async function fetchGeographicDistribution() {
            try {
                const response = await fetch(`${apiBaseUrl}/geo-distribution`);
                const data = await response.json();

                const mapData = await fetch("https://cdn.jsdelivr.net/npm/world-atlas/countries-50m.json")
                    .then(res => res.json());

                const chartData = ChartGeo.topojson.feature(mapData, mapData.objects.countries).features.map((country) => {
                    const countryName = country.properties.name;
                    const visitors = data[countryName] || 0;
                    const color = visitors > 0 ? `rgba(54, 162, 235, ${0.2 + (visitors / 100)})` : 'rgba(211, 211, 211, 0.8)';

                    return { feature: country, value: visitors, color: color };
                });

                const ctx = document.getElementById('geoChart').getContext('2d');
                new Chart(ctx, {
                    type: 'choropleth',
                    data: {
                        labels: Object.keys(data),
                        datasets: [{
                            label: 'Visitors by Country',
                            data: chartData,
                            outline: ChartGeo.topojson.mesh(mapData, mapData.objects.countries),
                            backgroundColor: chartData.map(d => d.color)
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            projection: { axis: 'x', projection: 'equalEarth' }
                        }
                    }
                });
            } catch (error) {
                console.error("Error fetching Geographic Distribution data:", error);
            }
        }

        // Bounce Rate by Day Chart
        async function fetchBounceRate() {
            try {
                const response = await fetch(`${apiBaseUrl}/bounce-rate`);
                const data = await response.json();

                const labels = Object.keys(data);
                const values = Object.values(data).map(value => parseFloat(value));

                const ctx = document.getElementById('bounceRateChart').getContext('2d');
                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels,
                        datasets: [{
                            label: 'Bounce Rate (%)',
                            data: values,
                            backgroundColor: 'rgba(255, 99, 132, 0.6)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            x: { title: { display: true, text: 'Date' } },
                            y: { title: { display: true, text: 'Bounce Rate (%)' }, beginAtZero: true }
                        }
                    }
                });
            } catch (error) {
                console.error("Error fetching Bounce Rate data:", error);
            }
        }

        // Initialize all charts
        fetchVisitorsOverTime();
        fetchTopPages();
        fetchGeographicDistribution();
        fetchBounceRate();
    </script>









  

<div class="row "></div>
<div class="row">
    <!-- Feedback By App Table -->
    <div class="col-lg-6 mb-4">
      <h5>Feedback By App</h5>
      <table id="feedbackByApp" class="display table table-striped table-bordered">
        <thead>
          <tr>
            <th>App Name</th>
            <th>Submitter</th>
            <th>Ranking</th>
            <th>Received Date</th>
            <th>Completion Status</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Notifications</td><td>J. Doe</td><td>7</td><td>01/10</td><td style="color: green;">Complete</td></tr>
          <tr><td>Opportunities</td><td>M. Lee</td><td>5</td><td>02/15</td><td style="color: orange;">In Progress</td></tr>
          <tr><td>Website</td><td>A. Fox</td><td>9</td><td>03/01</td><td style="color: green;">Complete</td></tr>
          <tr><td>General</td><td>K. Roe</td><td>3</td><td>04/05</td><td style="color: red;">Pending</td></tr>
          <tr><td>Notifications</td><td>S. Kay</td><td>6</td><td>05/18</td><td style="color: orange;">In Progress</td></tr>
          <tr><td>Opportunities</td><td>R. Poe</td><td>8</td><td>06/22</td><td style="color: green;">Complete</td></tr>
          <tr><td>Website</td><td>B. Jae</td><td>4</td><td>07/09</td><td style="color: red;">Pending</td></tr>
          <tr><td>General</td><td>H. Doe</td><td>2</td><td>08/12</td><td style="color: orange;">In Progress</td></tr>
          <tr><td>Notifications</td><td>T. Fox</td><td>10</td><td>09/21</td><td style="color: green;">Complete</td></tr>
          <tr><td>Opportunities</td><td>Y. Poe</td><td>1</td><td>10/30</td><td style="color: red;">Pending</td></tr>
        </tbody>
      </table>
    </div>

    <!-- Feedback Status Table -->
    <div class="col-lg-6 mb-4">
      <h5>Service Tickets by Date</h5>
      <table id="feedbackStatus" class="display table table-striped table-bordered">
        <thead>
          <tr>
            <th>App Name</th>
            <th>Submitter</th>
            <th>Ranking</th>
            <th>Received Date</th>
            <th>Completion Status</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Website</td><td>P. Kay</td><td>7</td><td>01/02</td><td style="color: green;">Complete</td></tr>
          <tr><td>General</td><td>D. Roe</td><td>5</td><td>02/07</td><td style="color: orange;">In Progress</td></tr>
          <tr><td>Notifications</td><td>G. Poe</td><td>9</td><td>03/14</td><td style="color: green;">Complete</td></tr>
          <tr><td>Opportunities</td><td>L. Fox</td><td>3</td><td>04/18</td><td style="color: red;">Pending</td></tr>
          <tr><td>General</td><td>C. Doe</td><td>6</td><td>05/20</td><td style="color: orange;">In Progress</td></tr>
          <tr><td>Notifications</td><td>N. Lee</td><td>8</td><td>06/25</td><td style="color: green;">Complete</td></tr>
          <tr><td>Opportunities</td><td>Q. Jae</td><td>4</td><td>07/11</td><td style="color: red;">Pending</td></tr>
          <tr><td>Website</td><td>V. Poe</td><td>2</td><td>08/13</td><td style="color: orange;">In Progress</td></tr>
          <tr><td>General</td><td>U. Doe</td><td>10</td><td>09/19</td><td style="color: green;">Complete</td></tr>
          <tr><td>Notifications</td><td>Z. Kay</td><td>1</td><td>10/28</td><td style="color: red;">Pending</td></tr>
        </tbody>
      </table>
    </div>
  </div>



  

            <div class="row">
                <div class="col-12">
                    <div class="section-title style2">
                        <span>Applications Dashboard</span>
                        <h2>Control Panel</h2>
                        <p>Welcome to your control panel.</p>
                    </div>
                </div>
            </div>
            <div class="row">
                
{% for page in site.pages %}
  {% if page.path contains 'apps/' and page.control-panel %}
    <div class="col-lg-4 col-md-6 col-12">
  
      <div class="single-testimonial">
        <div class="top-section">

          {% assign show_default_icon = true %}

          {% if page.authenticated %}
              <i class="lni lni-lock" title="Authentication Required"></i>
              {% assign show_default_icon = false %}
          {% endif %}

          {% if page.control-panel %}
              <i class="lni lni-cog" title="Control Panel"></i>
              {% assign show_default_icon = false %}
          {% endif %}

          {% if page.subscription-product %}
              <i class="lni lni-user" title="Personal Subscription Required"></i>
              {% assign show_default_icon = false %}
          {% endif %}

          {% if page.corporate-subscription %}
              <i class="lni lni-network" title="Corporate Subscription Required"></i>
              {% assign show_default_icon = false %}
          {% endif %}

          {% if page.enterprise %}
              <i class="lni lni-apartment" title="Enterprise Access Required"></i>
              {% assign show_default_icon = false %}
          {% endif %}

          {% if show_default_icon %}
              <i class="lni lni-world" title="All Access"></i>
          {% endif %}

          <h3><a href="{{ page.url }}">{{ page.title }}</a></h3>
        </div>
        <p>{{ page.blurb }}</p>
      </div>

    </div>
  {% endif %}
{% endfor %}
               
                
            </div>
        </div>
    </section>

<script>
   function countUp(elementId, targetValue, duration) {
            let startValue = 0;
            let increment = targetValue / (duration / 10);
            let currentValue = startValue;

            const interval = setInterval(() => {
                currentValue += increment;
                if (currentValue >= targetValue) {
                    currentValue = targetValue;
                    clearInterval(interval);
                }
                document.getElementById(elementId).innerText = Math.floor(currentValue);
            }, 10);
        }

        // Fetch data from the API
        async function fetchStats() {
            try {
                const response = await fetch("https://counts.milesahead.team/api/opportunities/stats");
                const data = await response.json();
                countUp("totalJobsCount", data.totalJobsCount, 2000); // Animate over 2 seconds
                countUp("createdOpportunitiesCount", data.createdOpportunitiesCount, 2000); // Animate over 2 seconds
            } catch (error) {
                console.error("Error fetching stats:", error);
            }
        }

  // Helper function to generate random data within a range
  function getRandomData(num, min, max) {
    return Array.from({ length: num }, () => Math.floor(Math.random() * (max - min + 1)) + min);
  }

  // 1. Daily Sign-ups Chart
  new Chart(document.getElementById('dailySignups'), {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Daily Sign-ups',
        data: getRandomData(7, 10, 50),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true
      }]
    },
    options: { responsive: true }
  });

  // 2.  Notifications Per Day
  new Chart(document.getElementById('opportunityNotifications'), {
    type: 'bar',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Opportunity Notifications Sent',
        data: getRandomData(7, 20, 100),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      }]
    },
    options: { responsive: true }
  });

  // 3. Opportunity Matches Found
  new Chart(document.getElementById('opportunityMatches'), {
    type: 'bar',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Opportunity Matches Found',
        data: getRandomData(7, 10, 50),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      }]
    },
    options: { responsive: true }
  });

  // 4. Time on Page (in seconds)
  new Chart(document.getElementById('timeOnPage'), {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Time on Page (seconds)',
        data: getRandomData(7, 30, 300),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true
      }]
    },
    options: { responsive: true }
  });

  // 5. Site Visitors
  new Chart(document.getElementById('siteVisitors'), {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{
        label: 'Site Visitors',
        data: getRandomData(7, 100, 1000),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true
      }]
    },
    options: { responsive: true }
  });

  // 6. Country of Origin (Pie Chart)
new Chart(document.getElementById('countryOfOrigin'), {
  type: 'bar',
  data: {
    labels: ['USA', 'Canada', 'UK', 'Germany', 'India'],
    datasets: [{
      label: 'Country of Origin',
      data: getRandomData(5, 10, 300),
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)'
      ]
    }]
  },
  options: {
    indexAxis: 'y',  // Makes the bar chart horizontal
    responsive: true,
    scales: {
      x: {
        beginAtZero: true
      }
    }
  }
});
</script>
<script>
  // Initialize DataTables for both tables
  $(document).ready(function() {
    $('#serviceTickets').DataTable({
      paging: false,
      searching: false,
      info: false
    });
    $('#feedbackTickets').DataTable({
      paging: false,
      searching: false,
      info: false
    });
  });
</script>

