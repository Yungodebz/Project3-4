document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        renderJobListings(data);
        setupFilters(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  });
  
  function renderJobListings(jobs) {
    const container = document.querySelector('.container');
    container.innerHTML = ''; // Clear existing listings
  
    jobs.forEach(job => {
      const jobListing = document.createElement('div');
      jobListing.classList.add('job-listing');
      if (job.featured) {
        jobListing.classList.add('featured');
      }
  
      jobListing.innerHTML = `
        <div class="logo-container">
          <img src="${job.logo}" alt="${job.company} Logo" class="logo">
        </div>
        <div class="job-info">
          <div class="job-header">
            <span class="company">${job.company}</span>
            ${job.new ? '<span class="new">NEW!</span>' : ''}
            ${job.featured ? '<span class="featured-tag">FEATURED</span>' : ''}
          </div>
          <div class="job-title">${job.position}</div>
          <div class="job-details">
            <span class="posted">${job.postedAt}</span>
            <span class="contract">${job.contract}</span>
            <span class="location">${job.location}</span>
          </div>
        </div>
        <div class="job-tags">
          ${job.languages.map(lang => <span class="tag">${lang}</span>).join('')}
          ${job.tools.map(tool => <span class="tag">${tool}</span>).join('')}
        </div>
      `;
  
      container.appendChild(jobListing);
    });
  }
  
  function setupFilters(jobs) {
    const filters = new Set();
  
    jobs.forEach(job => {
      job.languages.forEach(lang => filters.add(lang));
      job.tools.forEach(tool => filters.add(tool));
    });
}