# Implementation Guide: Coffey Insurance Landing Page System

## Overview
This guide covers the deployment and management of 10 city-specific landing pages + 1 index page for A/B testing form types vs AI assistants.

## Page Structure & Testing Groups

### Group A - Standard JotForm Pages (5 cities)
**Form Type:** Traditional embedded JotForm  
**Cities:**
- Rome, GA (30161) - trap-page-rome-30161.html
- Mountain Brook, AL (35223) - trap-page-mountain-brook-35223.html  
- Alpharetta, GA (30004) - trap-page-alpharetta-30004.html
- Madison, AL (35758) - trap-page-madison-35758.html
- Peachtree City, GA (30269) - trap-page-peachtree-city-30269.html

**JotForm Embed Code:**
```html
<script type="text/javascript" src="https://form.jotform.com/jsform/[FORM_ID]"></script>
```

### Group B - AI Agent Pages (5 cities)
**Form Type:** JotForm AI Agent iframe  
**Cities:**
- Suwanee, GA (30024) - trap-page-suwanee-30024.html
- Woodstock, GA (30188) - trap-page-woodstock-30188.html
- Helena, AL (35080) - trap-page-helena-35080.html
- Hoover, AL (35244) - trap-page-hoover-35244.html
- Owens Cross Roads, AL (35763) - trap-page-owens-cross-roads-35763.html

**AI Agent Embed Code:**
```html
<iframe src="https://agent.jotform.com/[AGENT_ID]" 
        width="100%" 
        height="600" 
        frameborder="0">
</iframe>
```

### Index Page
- index-page.html - Hub page listing all cities with test group indicators

## Banner Updates Required

### Current Banner Text to Replace:
1. "Special: Multi-Policy Discount Event This Month for [City] Residents"
2. "Limited Time: Free Policy Review for [City] Residents"

### New Banner Options (Choose based on testing):
```html
<!-- Option 1: Savings Focus -->
<div class="urgency-banner">
    ⚡ Save up to $[AMOUNT]/year on Auto & Home Insurance - [City] Residents <span class="countdown" id="countdown"></span>
</div>

<!-- Option 2: Bundle Focus -->
<div class="urgency-banner">
    🏠🚗 Bundle & Save: [City] Residents Save Average $[AMOUNT]/year <span class="countdown" id="countdown"></span>
</div>

<!-- Option 3: Local Agent Focus -->
<div class="urgency-banner">
    📍 Your Local [City] Agent: Compare Rates & Save $[AMOUNT]+ <span class="countdown" id="countdown"></span>
</div>

<!-- Option 4: Trust Focus -->
<div class="urgency-banner">
    ✓ Trusted by [NUMBER]+ [County] County Families - Save Average $[AMOUNT] <span class="countdown" id="countdown"></span>
</div>
```

### Savings Amounts by City:
- Rome, GA: $427
- Mountain Brook, AL: $523
- Alpharetta, GA: $487
- Madison, AL: $451
- Peachtree City, GA: $469
- Suwanee, GA: $478
- Woodstock, GA: $456
- Helena, AL: $442
- Hoover, AL: $498
- Owens Cross Roads, AL: $465

## Google Tag Manager (GTM) Setup

### 1. Create Custom Variables
```javascript
// Page Type Variable
function() {
  var path = window.location.pathname;
  if (path.includes('trap-page')) {
    if (path.includes('suwanee') || path.includes('woodstock') || 
        path.includes('helena') || path.includes('hoover') || 
        path.includes('owens-cross-roads')) {
      return 'AI Agent';
    }
    return 'Standard Form';
  }
  return 'Index';
}

// City Variable
function() {
  var path = window.location.pathname;
  var cityMatch = path.match(/trap-page-([^-]+(?:-[^-]+)*)-\d{5}\.html/);
  return cityMatch ? cityMatch[1].replace(/-/g, ' ') : 'Unknown';
}

// ZIP Code Variable
function() {
  var path = window.location.pathname;
  var zipMatch = path.match(/(\d{5})\.html/);
  return zipMatch ? zipMatch[1] : 'Unknown';
}
```

### 2. Key Events to Track
- **Page Views**: Track form type, city, ZIP
- **Form Interactions**: Start, progress, completion
- **Calculator Usage**: Coverage type selected, savings shown
- **Phone Clicks**: Header, hero, mobile sticky
- **Quote Starts**: Via calculator, sidebar, CTA buttons
- **Exit Intent**: Popup shown, closed, converted

### 3. Recommended GTM Tags
```javascript
// Enhanced Form Submission (GA4)
{
  "event": "form_submit",
  "form_type": "{{Page Type Variable}}",
  "city": "{{City Variable}}",
  "zip_code": "{{ZIP Code Variable}}",
  "form_location": "{{Click Element}}"
}

// Phone Call Tracking
{
  "event": "phone_click",
  "phone_type": "{{Text}}",
  "city": "{{City Variable}}",
  "click_location": "{{Click Element}}"
}
```

## Tracking & Optimization Tips

### 1. Set Up A/B Test Tracking
- Create custom dimension for Form Type (Standard vs AI)
- Track time to form start, completion rates
- Monitor phone call conversions by form type
- Compare quality of leads between groups

### 2. Conversion Rate Optimization
- **Test Banner Variations**: Rotate through 4 banner options monthly
- **Calculator Positioning**: Test above/below fold placement
- **Exit Intent Timing**: Test 15s, 30s, 45s delays on mobile
- **CTA Button Text**: Test "Get Quote" vs "Calculate Savings" vs "Start Now"

### 3. Performance Monitoring
```javascript
// Page Load Performance
window.addEventListener('load', function() {
  var loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
  gtag('event', 'page_load_time', {
    'event_category': 'performance',
    'value': loadTime,
    'city': '[CITY_NAME]'
  });
});
```

### 4. Lead Quality Scoring
Track these indicators for lead quality:
- Time spent on page before form start
- Calculator interaction before quote
- Number of pages viewed
- FAQ sections expanded
- Return visitor status

## Scaling Recommendations

### 1. Content Variations by Performance
- Create 2-3 testimonial sets per city
- Rotate hero images seasonally
- Update savings amounts quarterly based on actual data
- Add neighborhood-specific content for top performers

### 2. Technical Optimizations
- Implement lazy loading for images
- Minimize CSS/JS for Core Web Vitals
- Use WebP images with fallbacks
- Consider AMP versions for mobile

### 3. Expansion Strategy
**Next Cities to Consider (based on market data):**
- **Georgia**: Marietta, Johns Creek, Kennesaw, Duluth
- **Alabama**: Vestavia Hills, Homewood, Trussville, Auburn

### 4. API Integrations to Consider
- Real-time rate comparison API
- Weather alert integration for urgency
- Local claim statistics API
- Google Reviews API for fresh testimonials

## Maintenance Checklist

### Weekly
- [ ] Check all forms are loading properly
- [ ] Verify phone numbers are correct
- [ ] Review conversion rates by city
- [ ] Update countdown timers if needed

### Monthly
- [ ] Rotate banner messaging
- [ ] Update testimonials
- [ ] Review and optimize underperforming cities
- [ ] A/B test analysis and adjustments

### Quarterly
- [ ] Update savings amounts based on actual data
- [ ] Refresh local content and statistics
- [ ] Review GTM tracking for accuracy
- [ ] Competitive analysis and adjustments

## Common Issues & Solutions

### Form Not Loading
- Check JotForm/AI Agent ID is correct
- Verify no JavaScript conflicts
- Test in incognito mode

### Low Conversion Rate
- Test different banner messages
- Simplify form fields
- Add trust signals near form
- Reduce page load time

### High Bounce Rate
- Ensure mobile responsiveness
- Check page load speed
- Verify local content relevance
- Test different hero messages

## Contact for Support
- **Technical Issues**: [Dev team contact]
- **Form/AI Agent Setup**: [JotForm admin contact]
- **GTM/Analytics**: [Analytics team contact]
- **Content Updates**: [Marketing team contact]

---
*Last Updated: [Current Date]*  
*Version: 1.0*